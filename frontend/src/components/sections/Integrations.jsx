const INTEGRATIONS = [
  { abbr: 'TGA', name: 'Training.gov.au', desc: 'Live scope sync. Out-of-scope enrolment warnings.', badge: 'Native', badgeBg: 'var(--teal-light)', badgeColor: 'var(--teal-mid)' },
  { abbr: 'USI', name: 'USI Registry', desc: 'USI collection, status tracking, and missing-USI alerts.', badge: 'Native', badgeBg: 'var(--teal-light)', badgeColor: 'var(--teal-mid)' },
  { abbr: 'NCVER', name: 'NCVER AVETMISS', desc: 'All NAT formats. State variations supported.', badge: 'Native', badgeBg: 'var(--teal-light)', badgeColor: 'var(--teal-mid)' },
  { abbr: 'Xero', name: 'Xero', desc: 'Invoices, payment plans, credit notes auto-sync.', badge: 'Native', badgeBg: 'var(--teal-light)', badgeColor: 'var(--teal-mid)' },
  { abbr: 'MYOB', name: 'MYOB', desc: 'Two-way sync. BAS and payroll chart of accounts.', badge: 'Native', badgeBg: 'var(--teal-light)', badgeColor: 'var(--teal-mid)' },
  { abbr: 'Stripe', name: 'Stripe', desc: 'Online payments, plans, refunds. AUD-native, PCI-DSS.', badge: 'Native', badgeBg: 'var(--teal-light)', badgeColor: 'var(--teal-mid)' },
  { abbr: 'M365', name: 'Microsoft 365', desc: 'SSO, Azure AD, OneDrive trainer evidence sync.', badge: 'Enterprise', badgeBg: 'var(--blue-light)', badgeColor: 'var(--blue)' },
  { abbr: 'API', name: 'REST API', desc: 'Full read/write. Webhooks. OpenAPI 3.0 documented.', badge: 'Growth+', badgeBg: 'var(--amber-light)', badgeColor: 'var(--amber)' },
]

const DELAYS = ['', 'fade-up-delay-1', 'fade-up-delay-2', 'fade-up-delay-3']

export default function Integrations() {
  return (
    <section className="section int-section" id="integrations">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <span className="eyebrow">Integrations</span>
          <h2>Plugs into the tools RTOs actually use.</h2>
          <p style={{ marginTop: '1rem' }}>Native connections to Australian government systems, your accounting package, and the business tools your admin team already runs.</p>
        </div>
        <div className="int-grid">
          {INTEGRATIONS.map((ig, i) => (
            <div key={ig.abbr} className={`int-card fade-up ${DELAYS[i % 4]}`}>
              <div className="int-logo-box">{ig.abbr}</div>
              <div className="int-name">{ig.name}</div>
              <div className="int-desc">{ig.desc}</div>
              <span className="int-badge" style={{ background: ig.badgeBg, color: ig.badgeColor }}>{ig.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
