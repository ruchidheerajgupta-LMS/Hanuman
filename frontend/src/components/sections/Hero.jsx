const STUDENTS = [
  { name: 'Emma Thornton', status: 'Active', statusClass: 'pill-green', usi: '✓ Valid', usiClass: 'pill-green', pct: 78, barColor: undefined },
  { name: 'Marcus Webb', status: 'Pending', statusClass: 'pill-amber', usi: '⚠ Chase', usiClass: 'pill-amber', pct: 42, barColor: '#EF9F27' },
  { name: 'Priya Nair', status: 'Enrolled', statusClass: 'pill-blue', usi: '✓ Valid', usiClass: 'pill-green', pct: 95, barColor: undefined },
  { name: 'James Okafor', status: 'Active', statusClass: 'pill-green', usi: '✓ Valid', usiClass: 'pill-green', pct: 61, barColor: undefined },
]

const STATS = [
  { val: '847', label: 'Active Students', delta: '↑ 12 this week', cls: 'db-stat-delta' },
  { val: '0', label: 'AVETMISS Issues', delta: '✓ Export ready', cls: 'db-stat-delta' },
  { val: '98%', label: 'USI Validated', delta: '↑ from 91%', cls: 'db-stat-delta' },
  { val: '14', label: 'Certs Issued Today', delta: 'Auto-generated', cls: 'db-stat-delta' },
]

const AVATARS = [
  { initials: 'JM', bg: '#1D9E75' },
  { initials: 'SR', bg: '#185FA5' },
  { initials: 'KT', bg: '#BA7517' },
  { initials: 'AP', bg: '#0F6E56' },
]

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero" id="home">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            ASQA 2025 Ready &middot; Works Offline &middot; Built for Australian RTOs
          </div>
          <h1>
            The RTO Platform That{' '}
            <span className="accent">Does More</span>{' '}
            — For Less.
          </h1>
          <p className="hero-sub">
            TrainTrack combines SMS, LMS, digital signatures, RPL, offline mobile assessments,
            and AVETMISS NAT export in one platform. Legacy platforms charge add-ons for half of
            that. We include it all — from $199/month.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => scrollTo('audit')}>
              📋 Book Free 15-Min Compliance Audit
            </button>
            <a href="/pitch-deck.html" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              ▶ Watch Product Tour
            </a>
          </div>
          <div className="hero-trust">
            <div className="trust-avatars">
              {AVATARS.map((a) => (
                <div key={a.initials} className="trust-avatar" style={{ background: a.bg }}>{a.initials}</div>
              ))}
            </div>
            <span>Trusted by 200+ Australian RTOs &middot; Rated 4.9/5 by RTO managers</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="dashboard-frame">
            <div className="dashboard-topbar">
              <div className="db-dot" style={{ background: '#E24B4A' }} />
              <div className="db-dot" style={{ background: '#EF9F27' }} />
              <div className="db-dot" style={{ background: '#1D9E75' }} />
              <div className="db-url">traintrack.com.au/dashboard</div>
            </div>
            <div className="db-stats">
              {STATS.map((s) => (
                <div key={s.label} className="db-stat">
                  <div className="db-stat-val">{s.val}</div>
                  <div className="db-stat-lbl">{s.label}</div>
                  <div className={s.cls}>{s.delta}</div>
                </div>
              ))}
            </div>
            <div className="db-table">
              <div className="db-thead">
                <span>Student</span><span>Status</span><span>USI</span><span>Progress</span>
              </div>
              {STUDENTS.map((s) => (
                <div key={s.name} className="db-row">
                  <span className="db-name">{s.name}</span>
                  <span><span className={`db-pill ${s.statusClass}`}>{s.status}</span></span>
                  <span><span className={`db-pill ${s.usiClass}`}>{s.usi}</span></span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div className="db-prog" style={{ flex: 1 }}>
                      <div className="db-prog-fill" style={{ width: `${s.pct}%`, background: s.barColor }} />
                    </div>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{s.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
