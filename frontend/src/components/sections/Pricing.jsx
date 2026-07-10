import { useNavigate } from 'react-router-dom'

// Set to true when pricing is ready to publish
const SHOW_PRICING = false

const TIERS = [
  {
    name: 'Starter',
    dollar: '$299',
    enrolmentLabel: 'Up to 50 active enrolments',
    enrolmentColor: 'var(--accent)',
    storageLabel: '10 GB document storage included',
    features: [
      'Student management',
      'Assessment builder',
      'Attendance tracking',
      'AVETMISS export',
      'Basic analytics',
    ],
    excluded: ['RPL workflow'],
    pricingNote: '$1,000 onboarding · $3.50/extra enrolment · $2.50/GB extra storage',
    btnClass: 'price-btn-outline',
    btnText: 'Get Started',
  },
  {
    name: 'Professional',
    dollar: '$699',
    featured: true,
    enrolmentLabel: 'Up to 100 active enrolments',
    enrolmentColor: 'var(--accent)',
    storageLabel: '25 GB document storage included',
    features: [
      'Everything in Starter',
      'RPL workflow',
      'Advanced analytics',
      'Team Lead role',
      'CSV bulk import',
      'Priority support',
    ],
    excluded: [],
    pricingNote: '$2,000 onboarding · $2.50/extra enrolment · $2.00/GB extra storage',
    btnClass: 'price-btn-solid',
    btnText: 'Get Started',
  },
  {
    name: 'Enterprise',
    dollar: '$999',
    dollarSuffix: '+',
    enrolmentLabel: 'Unlimited enrolments',
    enrolmentColor: '#f59e0b',
    storageLabel: '100 GB document storage included',
    features: [
      'Everything in Professional',
      'Dedicated onboarding',
      'Custom integrations',
      'SLA & 24/7 support',
      'White-label options',
      'Multi-campus support',
    ],
    excluded: [],
    pricingNote: '$3,000+ onboarding · custom pricing · $1.50/GB extra storage',
    btnClass: 'price-btn-outline',
    btnText: 'Contact Us',
  },
]

export default function Pricing() {
  const navigate = useNavigate()
  const enquire = (plan) => navigate(`/company/contact?plan=${encodeURIComponent(plan)}`)

  return (
    <section className="section pricing-section" id="pricing">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 48px' }}>
          <span className="eyebrow" style={{ letterSpacing: '0.12em' }}>Simple, Transparent Pricing</span>
          <h2 style={{ marginTop: 12 }}>
            Choose the Plan That{' '}
            <span style={{ color: 'var(--accent)' }}>Fits Your RTO</span>
          </h2>
          <p style={{ marginTop: '1rem', color: 'var(--muted)', fontSize: 16 }}>
            All plans include onboarding, support, and Australian data hosting. No lock-in contracts.
          </p>
        </div>

        <div className="pricing-grid">
          {TIERS.map((t, i) => (
            <div key={t.name} className={`price-card${t.featured ? ' featured' : ''} fade-up${i > 0 ? ` fade-up-delay-${i}` : ''}`}>
              {t.featured && <div className="price-popular">Most Popular</div>}

              <div className="price-name" style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{t.name}</div>

              {SHOW_PRICING ? (
                <div className="price-amount" style={{ marginBottom: 4 }}>
                  <span className="price-dollar" style={{ fontSize: 52, fontWeight: 800, lineHeight: 1 }}>{t.dollar}</span>
                  {t.dollarSuffix && <span style={{ fontSize: 28, fontWeight: 700, alignSelf: 'flex-start', marginTop: 8 }}>{t.dollarSuffix}</span>}
                  <span className="price-period" style={{ fontSize: 13, marginLeft: 4, alignSelf: 'flex-end', paddingBottom: 8 }}>per month</span>
                </div>
              ) : (
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--accent)', marginBottom: 4 }}>Pricing on request</div>
              )}

              <div style={{ fontSize: 14, fontWeight: 700, color: t.enrolmentColor, marginBottom: t.storageLabel ? 4 : 20 }}>
                {t.enrolmentLabel}
              </div>
              {t.storageLabel && (
                <div style={{ fontSize: 13, fontWeight: 600, color: t.enrolmentColor, opacity: 0.8, marginBottom: 20 }}>
                  {t.storageLabel}
                </div>
              )}

              <div className="price-divider" />

              {t.features.map(f => (
                <div key={f} className="price-feature">
                  <span className="price-check">✓</span>
                  <span className="price-feat-text">{f}</span>
                </div>
              ))}
              {t.excluded.map(f => (
                <div key={f} className="price-feature" style={{ opacity: 0.4 }}>
                  <span style={{ marginRight: 8, fontWeight: 700, fontSize: 13 }}>✕</span>
                  <span className="price-feat-text">{f}</span>
                </div>
              ))}

              {SHOW_PRICING && t.pricingNote && (
                <div style={{ fontSize: 12, marginTop: 20, marginBottom: 4, opacity: t.featured ? 0.7 : 0.55 }}>
                  {t.pricingNote}
                </div>
              )}

              <button className={`price-btn ${t.btnClass}`} onClick={() => enquire(t.name)}>{t.btnText}</button>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 12, textAlign: 'center', marginTop: 24, opacity: 0.5 }}>
          All prices in AUD. GST not included. Active enrolment = a student enrolled in at least one unit this month.
        </p>
      </div>
    </section>
  )
}
