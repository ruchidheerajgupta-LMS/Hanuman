const PILLARS = [
  {
    cls: 'p1', icon: '🛡️', iconCls: 'icon-teal',
    title: 'Compliance Mastery',
    desc: 'Always audit-ready. Every workflow maps to Standards for RTOs 2025.',
    items: [
      'AVETMISS 8 NAT export with pre-submission validation',
      'Automated USI verification via DET API',
      'Trainer currency alerts & Standards 1.13–1.16 evidence report',
      'Digital signatures — student + assessor on every assessment',
      'RPL workflow with structured trainer determination',
      'ASQA audit evidence pack generator (clause 1–8)',
      'Live training.gov.au scope sync — blocks off-scope enrolments',
    ],
  },
  {
    cls: 'p2', icon: '🔗', iconCls: 'icon-blue',
    title: 'All-in-One Advantage',
    desc: 'SMS and LMS share one database. Enrol once. Everything updates everywhere.',
    items: [
      'Unified student record — single source of truth',
      'Zero data silos between SMS and LMS',
      'Online enrolment flows directly into training plan',
      'Observation checklists for workplace and practical delivery',
      'Offline-capable PWA — works on job sites with no internet',
      'Multi-tenant: manage multiple RTO entities from one account',
      'Stripe payment processing at enrolment',
    ],
  },
  {
    cls: 'p3', icon: '⚡', iconCls: 'icon-amber',
    title: 'Operational Efficiency',
    desc: 'Train faster. Certify smarter. Stop doing manually what software should handle.',
    items: [
      'AI-assisted assessment grading with audit trail',
      'Branded PDF certificates auto-issued on competency',
      'Automated notifications — graded, enrolled, attendance alerts',
      'Cohort broadcast: email + SMS to whole intake in one click',
      'Digital attendance with optional geo-location verification',
      'Real-time analytics dashboard — completion, attendance, AVETMISS status',
      'Smart reporting: per-trainer, per-qualification, per-intake',
    ],
  },
]

export default function FeaturePillars() {
  return (
    <section className="section features-section" id="features">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <span className="eyebrow">One Platform. Every Obligation Covered.</span>
          <h2>Three pillars. Zero compromises.</h2>
          <p style={{ marginTop: '1rem' }}>
            Every compliance obligation, operational process, and learner interaction — handled in
            one place. No separate SMS. No separate LMS. No separate assessment portal.
          </p>
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
