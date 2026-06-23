import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

export default function About() {
  const values = [
    { icon: '🎯', bg: 'var(--teal-light)', title: 'Built for VET', desc: 'We don\'t build generic software and bolt on compliance. Every feature is designed for Australian RTOs from day one.' },
    { icon: '🤝', bg: 'var(--blue-light)', title: 'Partner, Not Vendor', desc: 'Fair pricing, no lock-in contracts, and a team that genuinely wants your RTO to succeed.' },
    { icon: '🛡️', bg: 'var(--amber-light)', title: 'Audit-Ready Always', desc: 'Compliance isn\'t a feature — it\'s the foundation. We stay ahead of regulatory changes so you don\'t have to.' },
    { icon: '🇦🇺', bg: 'var(--coral-light)', title: '100% Australian', desc: 'Australian-built, Australian-hosted, Australian-supported. Your data never leaves the country.' },
  ]

  const stats = [
    { num: '8', label: 'Integrated modules' },
    { num: '100%', label: 'AVETMISS 8.0 coverage' },
    { num: '🇦🇺', label: 'Australian-built & hosted' },
    { num: '0', label: 'Lock-in contracts' },
  ]

  return (
    <PageLayout title="About TrainTrack" breadcrumb="About">
      <div className="page-content">
        <h2>The RTO management platform built by people who get VET</h2>
        <p>TrainTrack was founded by former RTO operators and compliance managers who were frustrated by the gap between what generic SaaS platforms offered and what Australian RTOs actually needed.</p>
        <p>After years of wrestling with disconnected student management systems, manual AVETMISS exports, and compliance tools that created more work than they solved, we built the platform we always wished existed.</p>
      </div>

      <div className="page-feature-grid" style={{ marginTop: '2rem' }}>
        {stats.map((s, i) => (
          <div className="page-feature-card" key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--teal)', fontFamily: 'var(--font-display)' }}>{s.num}</div>
            <p style={{ marginBottom: 0, marginTop: 4 }}>{s.label}</p>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: '3rem' }}>Our values</h2>
      <div className="page-feature-grid">
        {values.map((v, i) => (
          <div className="page-feature-card" key={i}>
            <div className="page-feature-icon" style={{ background: v.bg }}>{v.icon}</div>
            <h3>{v.title}</h3>
            <p>{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="page-card" style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <img
          src="/Founder.jpeg"
          alt="Ruchi Gupta, Founder of TrainTrack"
          width="160"
          height="160"
          style={{ width: 160, height: 160, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: 'var(--shadow-md)' }}
        />
        <div style={{ flex: 1, minWidth: 260 }}>
          <h3 style={{ marginBottom: 4 }}>Meet the founder</h3>
          <p style={{ margin: '0 0 2px', fontWeight: 600, color: 'var(--navy)' }}>Ruchi Gupta</p>
          <p style={{ margin: '0 0 14px', color: 'var(--text-muted)', fontSize: 13 }}>Founder, TrainTrack · Training Advocate</p>
          <p style={{ fontStyle: 'italic', marginBottom: 0 }}>
            “I spent years inside RTOs — exporting AVETMISS by hand at 11pm before an audit, wrestling spreadsheets that never talked to each other. I built TrainTrack so no provider has to work that way again.”
          </p>
        </div>
      </div>

      <div className="page-cta-box">
        <h2>Ready to see TrainTrack in action?</h2>
        <p>We’re now onboarding our founding RTOs — book a demo and be among the first.</p>
        <Link to="/company/contact?enquiry=demo" className="btn-primary">Book a Demo</Link>
      </div>
    </PageLayout>
  )
}
