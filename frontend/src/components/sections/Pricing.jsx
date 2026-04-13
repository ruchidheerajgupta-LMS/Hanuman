const TIERS = [
  {
    tier: 'Tier 1', name: 'Compliance Core', dollar: '$299', period: '/ month',
    note: 'Up to 100 active enrolments. Additional units at $2.50 each. No lock-in contract.',
    features: [
      'Full SMS + LMS, unified database',
      'AVETMISS 8 export with validation',
      'Automated USI verification',
      'Trainer currency tracking',
      'Digital certificates + QR codes',
      'Branded online enrolment engine',
      'Australian email support',
    ],
    btnClass: 'price-btn-outline', btnText: 'Book Compliance Audit',
  },
  {
    tier: 'Tier 2', name: 'Growth', dollar: '$149', period: '/ month base',
    note: '+ $1.80 per active enrolment unit. Pay only for students you teach. Scales automatically.',
    featured: true,
    features: [
      'Everything in Compliance Core',
      'AI-assisted assessment grading',
      'Audit evidence pack generator',
      'Xero / MYOB financial sync',
      'Training.gov.au scope sync',
      'Stripe payment processing',
      'Priority phone + video support (AEST)',
    ],
    btnClass: 'price-btn-solid', btnText: 'Start Free 30-Day Trial',
  },
  {
    tier: 'Tier 3', name: 'Enterprise', dollar: 'Custom', period: '',
    dollarStyle: { fontSize: 32 },
    note: 'For RTOs with 500+ enrolments, multi-site delivery, or government funding streams.',
    features: [
      'Everything in Growth',
      'Dedicated account manager (ex-RTO)',
      'Custom AVETMISS state variations',
      'SSO + Active Directory integration',
      'White-label learner portal',
      'AU-hosted data sovereignty guaranteed',
      'SLA-backed 99.9% uptime',
    ],
    btnClass: 'price-btn-outline', btnText: 'Talk to Our Team',
  },
]

export default function Pricing() {
  const scrollTo = () => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="section pricing-section" id="pricing">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <span className="eyebrow">Fair-Go Pricing</span>
          <h2>Priced like a partner. Not a vendor.</h2>
          <p style={{ marginTop: '1rem' }}>No per-seat fees. No surprise overages. No 12-month lock-in on the starter plan. Pay for the students you actually enrol.</p>
        </div>
        <div className="pricing-grid">
          {TIERS.map((t, i) => (
            <div key={t.name} className={`price-card${t.featured ? ' featured' : ''} fade-up${i > 0 ? ` fade-up-delay-${i}` : ''}`}>
              {t.featured && <div className="price-popular">Most Popular</div>}
              <div className="price-tier">{t.tier}</div>
              <div className="price-name">{t.name}</div>
              <div className="price-amount">
                <span className="price-dollar" style={t.dollarStyle}>{t.dollar}</span>
                {t.period && <span className="price-period">{t.period}</span>}
              </div>
              <p className="price-note">{t.note}</p>
              <div className="price-divider" />
              {t.features.map((f) => (
                <div key={f} className="price-feature">
                  <span className="price-check">✓</span>
                  <span className="price-feat-text">{f}</span>
                </div>
              ))}
              <button className={`price-btn ${t.btnClass}`} onClick={scrollTo}>{t.btnText}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
