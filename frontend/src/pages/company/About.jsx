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
    { num: '140+', label: 'RTOs trust TrainTrack' },
    { num: '50,000+', label: 'Active student enrolments' },
    { num: '99.9%', label: 'Platform uptime' },
    { num: '4.8/5', label: 'Customer satisfaction' },
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

      <div className="page-card" style={{ marginTop: '2rem' }}>
        <h3>Our team</h3>
        <p>We're a small, focused team of RTO compliance experts, software engineers, and VET educators based in Melbourne. Every team member has hands-on experience in the VET sector — whether as an RTO manager, auditor, trainer, or compliance consultant.</p>
        <p>When you call TrainTrack support, you speak to someone who understands the difference between a TAS and a TAE, who knows what NAT00120 contains, and who's been through an ASQA audit themselves.</p>
      </div>

      <div className="page-cta-box">
        <h2>Ready to see TrainTrack in action?</h2>
        <p>Book a demo with our team and see why 140+ RTOs trust us.</p>
        <Link to="/#audit" className="btn-primary">Book a Demo</Link>
      </div>
    </PageLayout>
  )
}
