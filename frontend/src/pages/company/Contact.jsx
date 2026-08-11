import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'
import api from '../../api/client'

const EmailIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
  </svg>
)

const CONTACT_ITEMS = [
  {
    Icon: EmailIcon,
    label: 'Email',
    value: 'contact@traintrack.work',
    href: 'mailto:contact@traintrack.work',
    sub: 'We reply within one business day',
  },
  {
    Icon: PhoneIcon,
    label: 'Phone',
    value: '+61 475 290 060',
    href: 'tel:+61475290060',
    sub: 'Monday – Friday, 8am – 6pm AEST',
  },
]

export default function Contact() {
  const [searchParams] = useSearchParams()
  const plan = searchParams.get('plan')
  const enquiry = searchParams.get('enquiry')   // 'demo' | 'sales' (from the product tour)

  const prefillMessage = plan
    ? `I'm interested in the ${plan} plan and would like to know more.`
    : enquiry === 'demo'
      ? "I'd like to book a free 30-minute demo of TrainTrack."
      : enquiry === 'sales'
        ? "I'd like to talk to your sales team about TrainTrack."
        : ''

  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', rto: '', message: prefillMessage })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await api.post('/contact', {
        name: form.name,
        email: form.email,
        subject: plan
          ? `${plan} plan enquiry${form.rto ? ` — ${form.rto}` : ''}`
          : enquiry === 'demo'
            ? `Demo request${form.rto ? ` — ${form.rto}` : ''}`
            : enquiry === 'sales'
              ? `Sales enquiry${form.rto ? ` — ${form.rto}` : ''}`
              : (form.rto ? `Website enquiry — ${form.rto}` : 'Website enquiry'),
        message: form.message,
      })
      setSent(true)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again, or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageLayout title="Contact Us" breadcrumb="Contact" description="Get in touch with TrainTrack — book a demo, ask a question, or talk to our Australian support team about RTO compliance software.">
      <div className="page-feature-grid" style={{ marginBottom: '2rem' }}>
        <div className="page-content">
          <h2>Get in touch</h2>
          <p>Whether you have a question about features, pricing, compliance, or anything else — our team is ready to help.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
            {CONTACT_ITEMS.map(({ Icon, label, value, href, sub }) => (
              <div key={label} className="page-card" style={{ marginTop: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                    background: 'var(--teal-light)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--teal-mid)',
                  }}>
                    <Icon />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                      {label}
                    </div>
                    <a href={href} style={{
                      fontSize: 17, fontWeight: 700, color: 'var(--navy)',
                      textDecoration: 'none', display: 'block', lineHeight: 1.2,
                    }}
                      onMouseEnter={e => e.target.style.color = 'var(--teal-mid)'}
                      onMouseLeave={e => e.target.style.color = 'var(--navy)'}
                    >
                      {value}
                    </a>
                    <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>{sub}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="page-card">
            <h3>Send us a message</h3>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%', background: 'var(--teal-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--teal-mid)"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3 style={{ marginBottom: 8 }}>Thanks for reaching out!</h3>
                <p style={{ color: 'var(--muted)' }}>We'll get back to you within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div style={{
                    background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c',
                    borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13,
                  }}>{error}</div>
                )}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--navy)' }}>Name</label>
                  <input type="text" required placeholder="Your name" value={form.name} onChange={set('name')} style={{
                    width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)',
                    fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box',
                  }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--navy)' }}>Email</label>
                  <input type="email" required placeholder="you@rto.edu.au" value={form.email} onChange={set('email')} style={{
                    width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)',
                    fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box',
                  }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--navy)' }}>RTO Name</label>
                  <input type="text" placeholder="Your RTO (optional)" value={form.rto} onChange={set('rto')} style={{
                    width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)',
                    fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box',
                  }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--navy)' }}>Message</label>
                  <textarea required rows={4} placeholder="How can we help?" value={form.message} onChange={set('message')} style={{
                    width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)',
                    fontSize: 14, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box',
                  }} />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
