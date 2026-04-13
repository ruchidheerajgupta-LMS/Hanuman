import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <PageLayout title="Contact Us" breadcrumb="Contact">
      <div className="page-feature-grid" style={{ marginBottom: '2rem' }}>
        <div className="page-content">
          <h2>Get in touch</h2>
          <p>Whether you have a question about features, pricing, compliance, or anything else — our team is ready to help.</p>

          <div className="page-card" style={{ marginTop: '1.5rem' }}>
            <h3>📧 Email</h3>
            <p style={{ marginBottom: 0 }}>hello@traintrack.com.au</p>
          </div>

          <div className="page-card">
            <h3>📞 Phone</h3>
            <p style={{ marginBottom: 0 }}>1300 TRAIN TK (1300 872 468)<br />Monday – Friday, 8am – 6pm AEST</p>
          </div>

          <div className="page-card">
            <h3>📍 Office</h3>
            <p style={{ marginBottom: 0 }}>Level 12, 456 Collins Street<br />Melbourne VIC 3000</p>
          </div>
        </div>

        <div>
          <div className="page-card">
            <h3>Send us a message</h3>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                <h3>Thanks for reaching out!</h3>
                <p>We'll get back to you within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--navy)' }}>Name</label>
                  <input type="text" required placeholder="Your name" style={{
                    width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)',
                    fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box',
                  }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--navy)' }}>Email</label>
                  <input type="email" required placeholder="you@rto.edu.au" style={{
                    width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)',
                    fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box',
                  }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--navy)' }}>RTO Name</label>
                  <input type="text" placeholder="Your RTO (optional)" style={{
                    width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)',
                    fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box',
                  }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--navy)' }}>Message</label>
                  <textarea required rows={4} placeholder="How can we help?" style={{
                    width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)',
                    fontSize: 14, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box',
                  }} />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
