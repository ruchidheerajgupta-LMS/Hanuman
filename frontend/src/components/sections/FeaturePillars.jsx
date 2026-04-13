const PILLARS = [
  {
    cls: 'p1', icon: '🛡️', iconCls: 'icon-teal',
    title: 'Compliance Mastery',
    desc: 'Always audit-ready. Standards for RTOs 2025 mapped to every workflow.',
    items: [
      'AVETMISS 8 export with pre-submission validation',
      'Automated USI verification via DET API',
      'Trainer currency alerts & evidence tracking',
      'ASQA audit evidence pack generator',
      'Standards for RTOs 2025 clause mapping',
      'Live training.gov.au scope sync',
    ],
  },
  {
    cls: 'p2', icon: '🔗', iconCls: 'icon-blue',
    title: 'All-in-One Advantage',
    desc: 'Your SMS and LMS share one database. Enrol once. Everything updates everywhere.',
    items: [
      'Unified student record — single source of truth',
      'Zero data silos between SMS and LMS',
      'Online enrolment flows directly to training plan',
      'Xero / MYOB financial sync built-in',
      'Stripe payment processing at enrolment',
      'Mobile-first learner portal, works offline',
    ],
  },
  {
    cls: 'p3', icon: '⚡', iconCls: 'icon-amber',
    title: 'Operational Efficiency',
    desc: 'Train faster. Certify smarter. Stop doing manually what software should handle.',
    items: [
      'AI-assisted assessment grading with audit trail',
      'Auto-certificates with QR tamper-proof codes',
      'Digital attendance + geo-verification',
      'Branded online enrolment engine',
      'Automated payment plans & fee reminders',
      'Smart reporting dashboard — real-time KPIs',
    ],
  },
]

export default function FeaturePillars() {
  return (
    <section className="section features-section" id="features">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <span className="eyebrow">One Platform. Every Obligation Covered.</span>
          <h2>Three pillars. Zero compromises.</h2>
          <p style={{ marginTop: '1rem' }}>Every compliance obligation, operational process, and learner interaction — handled in one place.</p>
        </div>
        <div className="pillar-grid">
          {PILLARS.map((p, i) => (
            <div key={p.title} className={`pillar-card ${p.cls} fade-up${i > 0 ? ` fade-up-delay-${i}` : ''}`}>
              <div className={`pillar-icon ${p.iconCls}`}>{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="pillar-list">
                {p.items.map((item) => (
                  <div key={item} className="pillar-item">{item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
