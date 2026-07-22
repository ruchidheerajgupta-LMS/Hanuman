import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react'
import api from '../api/client'
import LogoMark from '../components/ui/LogoMark'

export default function ManageLogin() {
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [brand, setBrand] = useState(null)
  const [step, setStep] = useState('email')          // 'email' → 'password'
  const [identifying, setIdentifying] = useState(false)

  // Password change state
  const [mustChangePassword, setMustChangePassword] = useState(false)
  const [ssoData, setSsoData] = useState(null)
  const [traintrackUrl, setTraintrackUrl] = useState(null)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPw, setShowNewPw] = useState(false)
  const [changingPw, setChangingPw] = useState(false)

  /* ── Fetch tenant branding if ?rto= is present ── */
  useEffect(() => {
    const rto = searchParams.get('rto')
    if (!rto) return
    let cancelled = false
    api.get(`/gateway/tenants/${encodeURIComponent(rto)}`)
      .then(res => {
        if (!cancelled && res.data?.data) setBrand(res.data.data)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [searchParams])

  /* ── Password validation rules ── */
  const pwRules = [
    { label: 'At least 8 characters', test: (pw) => pw.length >= 8 },
    { label: 'One uppercase letter', test: (pw) => /[A-Z]/.test(pw) },
    { label: 'One lowercase letter', test: (pw) => /[a-z]/.test(pw) },
    { label: 'One number', test: (pw) => /[0-9]/.test(pw) },
  ]
  const allRulesMet = pwRules.every(r => r.test(newPassword))
  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword

  /* ── Step 1: resolve the user's RTO branding from their email ── */
  const handleIdentify = async (e) => {
    e.preventDefault()
    setError(null)
    setIdentifying(true)
    try {
      const res = await api.post('/gateway/identify', { email })
      if (res.data?.data?.tenant) setBrand(res.data.data.tenant)
      setStep('password')
    } catch {
      setStep('password')   // neutral: continue regardless of lookup result
    } finally {
      setIdentifying(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      const res = await api.post('/gateway/login', { email, password, remember_me: rememberMe })
      const { user, tenant, must_change_password, traintrack_url } = res.data.data

      // If must_change_password, show the change password form instead of redirecting
      if (must_change_password) {
        setSsoData({ user, tenant, traintrack_url })
        setTraintrackUrl(traintrack_url)
        setMustChangePassword(true)
        setSubmitting(false)
        return
      }

      // Pass user data to TrainTrack via URL hash fragment
      // Hash is NOT sent to the server (stays client-side only)
      const ssoPayload = btoa(JSON.stringify({
        id: user.id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        tenant_id: user.tenant_id,
        tenant: tenant || null,
      }))

      window.location.href = `${traintrack_url}/sso#${ssoPayload}`
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed. Please check your credentials.'
      setError(msg)
      setSubmitting(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setError(null)

    if (!allRulesMet) {
      setError('Password does not meet all requirements')
      return
    }
    if (!passwordsMatch) {
      setError('Passwords do not match')
      return
    }

    setChangingPw(true)
    try {
      await api.post('/gateway/change-password', {
        email,
        current_password: password,
        new_password: newPassword,
      })

      // Password changed — now redirect to TrainTrack with SSO
      const { user, tenant, traintrack_url } = ssoData
      const ssoPayload = btoa(JSON.stringify({
        id: user.id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        tenant_id: user.tenant_id,
        tenant: tenant || null,
      }))

      window.location.href = `${traintrack_url}/sso#${ssoPayload}`
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to change password'
      setError(msg)
      setChangingPw(false)
    }
  }

  // Tenant brand colour is intentionally not used — the portal keeps its default
  // theme and shows only the RTO logo/name as branding.
  const accentColor = null

  return (
    <div>
      <div className="manage-login-page" style={accentColor ? { background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)` } : undefined}>
        <div className="manage-login-card">
          {/* Logo header */}
          <div className="manage-login-header">
            {brand?.logo_url ? (
              <img src={brand.logo_url} alt={brand.name} className="manage-brand-logo" />
            ) : (
              <div className="manage-login-icon" style={accentColor ? { background: accentColor } : undefined}>
                <LogoMark size={30} />
              </div>
            )}
            <h2>{brand?.name || 'TrainTrack'}</h2>
            {brand?.tagline && <p className="manage-brand-tagline">{brand.tagline}</p>}
            {mustChangePassword ? (
              <p style={{ color: '#d97706', fontWeight: 500, fontSize: 14 }}>
                <ShieldCheck size={16} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                Please set a new password to continue
              </p>
            ) : (
              <p>Access your account</p>
            )}
          </div>

          {/* ── Password Change Form ── */}
          {mustChangePassword ? (
            <form onSubmit={handleChangePassword} className="manage-login-form">
              {error && (
                <div className="manage-login-error">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <div className="manage-field">
                <label htmlFor="newPassword">New Password</label>
                <div className="manage-pw-wrap">
                  <input
                    id="newPassword"
                    type={showNewPw ? 'text' : 'password'}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    autoComplete="new-password"
                    autoFocus
                  />
                  <button
                    type="button"
                    className="manage-pw-toggle"
                    onClick={() => setShowNewPw(!showNewPw)}
                    tabIndex={-1}
                  >
                    {showNewPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="manage-field">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <div className="manage-pw-wrap">
                  <input
                    id="confirmPassword"
                    type={showNewPw ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    required
                    autoComplete="new-password"
                  />
                </div>
              </div>

              {/* Password rules checklist */}
              <div style={{ padding: '8px 0', fontSize: 13 }}>
                {pwRules.map((rule, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0', color: rule.test(newPassword) ? '#16a34a' : '#9ca3af' }}>
                    <CheckCircle2 size={14} />
                    <span>{rule.label}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0', color: passwordsMatch ? '#16a34a' : '#9ca3af' }}>
                  <CheckCircle2 size={14} />
                  <span>Passwords match</span>
                </div>
              </div>

              <button
                type="submit"
                className="manage-login-btn"
                disabled={changingPw || !allRulesMet || !passwordsMatch}
                style={accentColor ? { background: accentColor } : undefined}
              >
                {changingPw ? (
                  <><Loader2 size={18} className="spin" /> Saving...</>
                ) : (
                  'Set New Password & Continue'
                )}
              </button>
            </form>
          ) : step === 'email' ? (
            /* ── Step 1: Email ── */
            <form onSubmit={handleIdentify} className="manage-login-form">
              {error && (
                <div className="manage-login-error">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <div className="manage-field">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@organisation.edu.au"
                  required
                  autoComplete="email"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="manage-login-btn"
                disabled={identifying}
                style={accentColor ? { background: accentColor } : undefined}
              >
                {identifying ? (<><Loader2 size={18} className="spin" /> Checking…</>) : 'Continue'}
              </button>
            </form>
          ) : (
            /* ── Step 2: Password (branded) ── */
            <form onSubmit={handleSubmit} className="manage-login-form">
              {error && (
                <div className="manage-login-error">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <div className="manage-field">
                <label htmlFor="email">Email Address</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input id="email" type="email" value={email} readOnly style={{ flex: 1, background: 'rgba(0,0,0,0.03)' }} />
                  <button type="button" onClick={() => { setStep('email'); setPassword(''); setError(null) }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: accentColor || '#0ED4A0', fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap' }}>
                    Change
                  </button>
                </div>
              </div>

              <div className="manage-field">
                <label htmlFor="password">Password</label>
                <div className="manage-pw-wrap">
                  <input
                    id="password"
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    autoFocus
                  />
                  <button
                    type="button"
                    className="manage-pw-toggle"
                    onClick={() => setShowPw(!showPw)}
                    tabIndex={-1}
                  >
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="manage-options-row">
                <label className="manage-remember">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                  />
                  <span>Remember Me</span>
                </label>
                <Link to="/forgot-password" className="manage-forgot-link">
                  Forgot your password?
                </Link>
              </div>

              <button
                type="submit"
                className="manage-login-btn"
                disabled={submitting}
                style={accentColor ? { background: accentColor } : undefined}
              >
                {submitting ? (<><Loader2 size={18} className="spin" /> Signing in…</>) : 'Sign In'}
              </button>
            </form>
          )}

          <div className="manage-legal-notice">
            <p>
              By signing in I indicate acceptance of the{' '}
              <Link to="/end-user-agreement">End User Agreement</Link>{' '}
              and acknowledge the{' '}
              <Link to="/privacy-policy">Privacy Policy</Link>.
            </p>
          </div>

          {brand && (
            <p className="manage-powered-by">
              <LogoMark size={12} /> Powered by TrainTrack
            </p>
          )}

          <div style={{ textAlign: 'center', marginTop: 18 }}>
            <Link
              to="/"
              style={{
                fontSize: 13, color: '#64748b', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}
            >
              <ArrowLeft size={14} /> Back to traintrack.work
            </Link>
          </div>
        </div>

        {/* Background watermark logo */}
        <div className="manage-bg-logo" aria-hidden="true">
          {brand?.logo_url ? (
            <img src={brand.logo_url} alt="" className="manage-bg-logo-img" />
          ) : (
            <LogoMark size={320} />
          )}
        </div>
      </div>
    </div>
  )
}
