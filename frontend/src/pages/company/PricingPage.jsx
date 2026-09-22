import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageLayout from '../../components/layout/PageLayout'

// Pricing is quoted directly in outbound campaigns, so it stays visible here too.
const SHOW_PRICING = true

// Kept in sync with components/sections/Pricing.jsx (homepage) and the
// pitch deck's slide 10 -- same tiers, numbers, and feature lists everywhere
// on the site, not just here.
const TIERS = [
  {
    name: 'Starter', dollar: '$299', period: '/ month',
    note: 'Up to 50 active enrolments. 10 GB document storage included.',
    features: [
      'Student management',
      'Assessment builder',
      'Attendance tracking',
      'AVETMISS export',
      'Basic analytics',
    ],
    excluded: ['RPL workflow'],
    pricingNote: '$1,000 onboarding · $3.50/extra enrolment · $2.50/GB extra storage',
  },
  {
    name: 'Professional', dollar: '$699', period: '/ month', featured: true,
    note: 'Up to 100 active enrolments. 25 GB document storage included.',
    features: [
      'Everything in Starter',
      'RPL workflow',
      'Advanced analytics',
      'Team Lead role',
      'CSV bulk import',
      'Priority support',
    ],
    pricingNote: '$2,000 onboarding · $2.50/extra enrolment · $2.00/GB extra storage',
  },
  {
    name: 'Enterprise', dollar: '$999', dollarSuffix: '+', period: '/ month',
    note: 'Unlimited enrolments. 100 GB document storage included.',
    features: [
      'Everything in Professional',
      'Dedicated onboarding',
      'Custom integrations',
      'SLA & 24/7 support',
      'White-label options',
      'Multi-campus support',
    ],
    pricingNote: '$3,000+ onboarding · custom pricing · $1.50/GB extra storage',
  },
]

const FAQ = [
  { q: 'What counts as an "active enrolment"?', a: 'Any student with at least one unit enrolment in a non-completed, non-withdrawn status during the billing period.' },
  { q: 'What happens if I go over my plan\'s enrolment cap?', a: 'You\'re not cut off — extra enrolments are billed per-student at your plan\'s overage rate (shown under each plan above), so there\'s no hard wall stopping you from enrolling students.' },
  { q: 'Can I switch plans?', a: 'Absolutely. Upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.' },
  { q: 'Is there a setup fee?', a: 'Yes — a one-off onboarding fee applies on every plan (shown under each plan above), covering data migration and initial setup. It scales with plan tier.' },
  { q: 'What about data migration?', a: 'CSV bulk import is included from the Professional plan up. Enterprise customers get assisted migration with dedicated support as part of onboarding.' },
  { q: 'Where is my data hosted?', a: 'All data is hosted in Australia on ISO 27001 certified infrastructure. Data never leaves the country.' },
  { q: 'Is there a free trial?', a: 'Not currently — but you can book a free 15-minute compliance audit to see the platform reviewed against your own RTO\'s setup before committing to anything.' },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function PricingPage() {
  return (
    <PageLayout title="Pricing" breadcrumb="Pricing" description="TrainTrack pricing — Starter $299/month, Professional $699/month, Enterprise from $999/month. No lock-in contracts. Built for Australian RTOs.">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>
      <div className="page-content">
        <h2>Fair-go pricing for every RTO</h2>
        <p>No lock-in contracts. All plans include onboarding, support, and Australian data hosting. <Link to="/contact" style={{ color: 'var(--teal-mid)' }}>Contact us</Link> if you're not sure which plan fits.</p>
      </div>

      <div className="page-feature-grid page-three-grid" style={{ marginTop: '2rem' }}>
        {TIERS.map((t, i) => (
          <div className="page-feature-card" key={i} style={t.featured ? { border: '2px solid var(--teal)', position: 'relative' } : {}}>
            {t.featured && <span className="page-tag page-tag-teal" style={{ position: 'absolute', top: 12, right: 12 }}>MOST POPULAR</span>}
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>{t.name}</p>
            {SHOW_PRICING && (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                <span style={{ fontSize: 36, fontWeight: 700, color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>{t.dollar}</span>
                {t.dollarSuffix && <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)' }}>{t.dollarSuffix}</span>}
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
              {t.excluded?.map((f, fi) => (
                <div key={fi} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13, opacity: 0.4 }}>
                  <span style={{ fontWeight: 700 }}>✕</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            {SHOW_PRICING && t.pricingNote && (
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 16, marginBottom: 0 }}>{t.pricingNote}</p>
            )}
            <Link to={`/company/contact?plan=${encodeURIComponent(t.name)}`} className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: 20 }}>
              {t.name === 'Enterprise' ? 'Contact Us' : 'Get Started'}
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
