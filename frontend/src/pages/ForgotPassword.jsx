import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader2, AlertCircle, GraduationCap, KeyRound, Copy, Check } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import api from '../api/client'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)   // { temp_password, first_name }
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res = await api.post('/gateway/forgot-password', { email })
      setResult(res.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result.temp_password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <Navbar />

      <div className="manage-login-page">
        <div className="manage-login-card">
          <div className="manage-login-header">
            <div className="manage-login-icon">
              <GraduationCap size={28} strokeWidth={1.8} />
            </div>
            <h2>Reset Your Password</h2>
            {!result && <p>Enter your account email to receive a temporary password.</p>}
          </div>

          {result ? (
            result.temp_password ? (
            /* ── SMTP off (dev): show the temp password inline ── */
            <div style={{ padding: '4px 0' }}>
              <div style={{
                background: '#f0fdf4', border: '1px solid #86efac',
                borderRadius: 10, padding: '14px 16px', marginBottom: 18,
              }}>
                <div style={{ fontWeight: 700, color: '#166534', marginBottom: 4 }}>
                  Hi {result.first_name}, your temporary password is ready
                </div>
                <div style={{ fontSize: 13, color: '#15803d' }}>
                  Use it to sign in below — you'll be prompted to set a new password immediately.
                </div>
              </div>

              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: '#f8fafc', border: '1px solid #e2e8f0',
                borderRadius: 8, padding: '12px 14px', marginBottom: 20,
              }}>
                <KeyRound size={16} style={{ color: '#64748b', flexShrink: 0 }} />
                <span style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 700, letterSpacing: '0.08em', flex: 1 }}>
                  {result.temp_password}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '4px 10px', borderRadius: 6,
                    border: '1px solid #e2e8f0',
                    background: copied ? '#f0fdf4' : '#fff',
                    cursor: 'pointer', fontSize: 12, fontWeight: 600,
                    color: copied ? '#166534' : '#475569',
                  }}
                >
                  {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
                </button>
              </div>

              <Link to="/manage" className="manage-login-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                Go to Sign In
              </Link>
            </div>
            ) : (
            /* ── Email sent: tell them to check their inbox ── */
            <div style={{ padding: '4px 0' }}>
              <div style={{
                background: '#f0fdf4', border: '1px solid #86efac',
                borderRadius: 10, padding: '16px', marginBottom: 20,
              }}>
                <div style={{ fontWeight: 700, color: '#166534', marginBottom: 4 }}>
                  Check your email
                </div>
                <div style={{ fontSize: 13, color: '#15803d' }}>
                  {result.message || 'If an account exists for this email, a temporary password has been sent to it.'}
                  {' '}It may take a minute to arrive — remember to check your spam folder.
                </div>
              </div>
              <Link to="/manage" className="manage-login-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                Go to Sign In
              </Link>
            </div>
            )
          ) : (
            /* ── Request form ── */
            <form onSubmit={handleSubmit} className="manage-login-form">
              {error && (
                <div className="manage-login-error">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <div className="manage-field">
                <label htmlFor="reset-email">Email Address</label>
                <input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@organisation.edu.au"
                  required
                  autoComplete="email"
                  autoFocus
                />
              </div>

              <button type="submit" className="manage-login-btn" disabled={submitting}>
                {submitting
                  ? <><Loader2 size={18} className="spin" /> Checking...</>
                  : 'Reset Password'}
              </button>

              <div style={{ textAlign: 'center', marginTop: 12 }}>
                <Link to="/manage" className="manage-forgot-link">&larr; Back to Sign In</Link>
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
