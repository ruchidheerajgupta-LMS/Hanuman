import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Loader2, AlertCircle, Shield, GraduationCap } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import api from '../api/client'

export default function ManageLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      const res = await api.post('/gateway/login', { email, password, remember_me: rememberMe })
      const { user, tenant } = res.data.data

      if (user.role === 'owner') {
        window.location.href = `https://localhost/login?sso=1`
      } else {
        window.location.href = `https://localhost/login?sso=1`
      }
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed. Please check your credentials.'
      setError(msg)
      setSubmitting(false)
    }
  }

  return (
    <div>
      <Navbar />

      <div className="manage-login-page">
        <div className="manage-login-card">
          {/* Logo header */}
          <div className="manage-login-header">
            <div className="manage-login-icon">
              <GraduationCap size={28} strokeWidth={1.8} />
            </div>
            <h2>TrainTrack Management</h2>
            <p>Sign in to manage your RTO subscription, users, and platform settings.</p>
          </div>

          <form onSubmit={handleSubmit} className="manage-login-form">
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
            >
              {submitting ? (
                <><Loader2 size={18} className="spin" /> Signing in...</>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="manage-legal-notice">
            <p>
              By signing in I indicate acceptance of the{' '}
              <Link to="/end-user-agreement">End User Agreement</Link>{' '}
              and acknowledge the{' '}
              <Link to="/privacy-policy">Privacy Policy</Link>.
            </p>
          </div>

          <p className="manage-login-footer">
            <Shield size={14} />
            Protected by TrainTrack&rsquo;s secure authentication.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
