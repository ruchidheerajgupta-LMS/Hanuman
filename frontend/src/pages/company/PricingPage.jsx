import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

// Set to true when pricing is ready to publish
const SHOW_PRICING = false

const TIERS = [
  {
    name: 'Compliance Core', dollar: '$299', period: '/ month',
    note: 'Up to 100 active enrolments. No lock-in contract.',
    features: [
      'Full SMS + LMS, unified database',
      'AVETMISS 8 export with validation',
      'USI collection and status tracking',
      'Trainer currency tracking',
      'Digital certificates + QR codes',
      'Branded online enrolment engine',
      'Australian email support',
      '10 GB document storage included',
    ],
  },
  {
    name: 'Growth', dollar: '$149', period: '/ month base', featured: true,
    note: 'Pay only for students you teach. Scales automatically.',
    features: [
      'Everything in Compliance Core',
      'AI-assisted assessment grading',
      'Audit evidence pack generator',
      'Xero / MYOB financial sync',
      'Training.gov.au scope sync',
      'Stripe payment processing',
      'Priority phone + video support (AEST)',
      '25 GB document storage included',
    ],
  },
  {
    name: 'Enterprise', dollar: 'Custom', period: '',
    note: 'For RTOs with 500+ enrolments, multi-site delivery, or government funding streams.',
    features: [
      'Everything in Growth',
      'Dedicated account manager (ex-RTO)',
      'Custom AVETMISS state variations',
      'SSO + Active Directory integration',
      'White-label learner portal',
      'AU-hosted data sovereignty guaranteed',
      'SLA-backed 99.9% uptime',
      '100 GB document storage included',
    ],
  },
]

const FAQ = [
  { q: 'Is there a free trial?', a: 'Yes! The Growth plan comes with a free 30-day trial. No credit card required. Full access to all features.' },
  { q: 'What counts as an "active enrolment"?', a: 'Any student with at least one unit enrolment in a non-completed, non-withdrawn status during the billing period.' },
  { q: 'Can I switch plans?', a: 'Absolutely. Upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.' },
  { q: 'Is there a setup fee?', a: 'No setup fee for Compliance Core or Growth plans. Enterprise includes white-glove onboarding and data migration.' },
  { q: 'What about data migration?', a: 'We provide free CSV import tools for all plans. Enterprise customers get assisted migration with dedicated support.' },
  { q: 'Where is my data hosted?', a: 'All data is hosted in Australia on ISO 27001 certified infrastructure. Data never leaves the country.' },
  { q: 'How do I get pricing?', a: 'Pricing is tailored to your RTO\'s size and delivery model. Get in touch and we\'ll put together a proposal within one business day.' },
]

export default function PricingPage() {
  return (
    <PageLayout title="Pricing" breadcrumb="Pricing">
      <div className="page-content">
        <h2>Fair-go pricing for every RTO</h2>
        <p>No per-seat fees. No surprise overages. No 12-month lock-in on the starter plan. <Link to="/contact" style={{ color: 'var(--teal-mid)' }}>Contact us</Link> for pricing tailored to your RTO's size and needs.</p>
      </div>

      <div className="page-feature-grid page-three-grid" style={{ marginTop: '2rem' }}>
        {TIERS.map((t, i) => (
          <div className="page-feature-card" key={i} style={t.featured ? { border: '2px solid var(--teal)', position: 'relative' } : {}}>
            {t.featured && <span className="page-tag page-tag-teal" style={{ position: 'absolute', top: 12, right: 12 }}>MOST POPULAR</span>}
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>{t.name}</p>
            {SHOW_PRICING && (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                <span style={{ fontSize: 36, fontWeight: 700, color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>{t.dollar}</span>
                {t.period && <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{t.period}</span>}
              </div>
            )}
            {!SHOW_PRICING && (
              <div style={{ fontSize: 13, color: 'var(--teal-mid)', fontWeight: 600, marginBottom: 8 }}>Pricing on request</div>
            )}
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>{t.note}</p>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
              {t.features.map((f, fi) => (
                <div key={fi} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13 }}>
                  <span style={{ color: 'var(--teal)', fontWeight: 600 }}>✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <Link to={`/company/contact?plan=${encodeURIComponent(t.name)}`} className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: 20 }}>
              {t.featured ? 'Start Free Trial' : 'Get Started'}
            </Link>
          </div>
        ))}
      </div>

      <div className="page-card" style={{ marginTop: '3rem' }}>
        <h3>Frequently asked questions</h3>
        {FAQ.map((f, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, marginBottom: 4 }}>{f.q}</h3>
            <p style={{ fontSize: 13, marginBottom: 0 }}>{f.a}</p>
          </div>
        ))}
      </div>

      <div className="page-cta-box">
        <h2>Not sure which plan fits?</h2>
        <p>Talk to our team — we'll recommend the right plan based on your RTO's size and needs.</p>
        <Link to="/company/contact?enquiry=sales" className="btn-primary">Book a Call</Link>
      </div>
    </PageLayout>
  )
}
