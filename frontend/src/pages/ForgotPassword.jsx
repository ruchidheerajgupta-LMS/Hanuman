import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader2, AlertCircle, CheckCircle2, GraduationCap, Mail } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import api from '../api/client'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      await api.post('/gateway/forgot-password', { email })
      setSent(true)
    } catch (err) {
      const msg = err.response?.data?.error || 'Something went wrong. Please try again.'
      setError(msg)
    } finally {
      setSubmitting(false)
    }
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
            <p>Enter your email address and we&rsquo;ll send instructions to reset your password.</p>
          </div>

          {sent ? (
            <div className="manage-reset-success">
              <div className="manage-reset-success-icon">
                <CheckCircle2 size={40} strokeWidth={1.5} />
              </div>
              <h3>Check Your Email</h3>
              <p>
                If an account exists for <strong>{email}</strong>, your RTO administrator
                has been notified and will reset your password. You&rsquo;ll receive
                a temporary password via email shortly.
              </p>
              <p className="manage-reset-note">
                <Mail size={14} />
                If you don&rsquo;t receive an email, please contact your RTO administrator directly.
              </p>
              <Link to="/manage" className="manage-login-btn" style={{ textDecoration: 'none', marginTop: 16 }}>
                Back to Sign In
              </Link>
            </div>
          ) : (
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

              <button
                type="submit"
                className="manage-login-btn"
                disabled={submitting}
              >
                {submitting ? (
                  <><Loader2 size={18} className="spin" /> Sending...</>
                ) : (
                  'Send Reset Instructions'
                )}
              </button>

              <div style={{ textAlign: 'center', marginTop: 12 }}>
                <Link to="/manage" className="manage-forgot-link">
                  &larr; Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
