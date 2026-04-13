const NAV_ITEMS = ['Dashboard', 'Students', 'Trainers', 'Assessments', 'Compliance', 'Reports']
const SIDEBAR = [
  { icon: '⊞', label: 'Overview', active: true },
  { icon: '👥', label: 'Enrolments' },
  { icon: '📋', label: 'AVETMISS' },
  'divider',
  { icon: '🧑‍🏫', label: 'Trainers' },
  { icon: '📅', label: 'Attendance' },
  { icon: '🏅', label: 'Certificates' },
  'divider',
  { icon: '🛡️', label: 'Audit Tools' },
  { icon: '⚙️', label: 'Settings' },
]
const KPIS = [
  { val: '847', label: 'Active Enrolments', badge: '↑ 12 this week', cls: 'badge-up' },
  { val: '98.2%', label: 'USI Validated', badge: '15 auto-chased', cls: 'badge-up' },
  { val: '3', label: 'AVETMISS Flags', badge: '⚠ Review needed', cls: 'badge-warn' },
  { val: '14', label: 'Certs to Issue', badge: 'Auto-issue on', cls: 'badge-up' },
]
const COMPLIANCE_BARS = [
  { label: 'Standards Clause 1 — Trainers', pct: 94, color: '#1D9E75', valColor: '#5DCAA5' },
  { label: 'Standards Clause 3 — AQF', pct: 100, color: '#1D9E75', valColor: '#5DCAA5' },
  { label: 'USI Verification Rate', pct: 98, color: '#1D9E75', valColor: '#5DCAA5' },
  { label: 'Trainer Currency — Clause 1.13', pct: 87, color: '#EF9F27', valColor: '#FAC775' },
  { label: 'Assessment Validation', pct: 91, color: '#1D9E75', valColor: '#5DCAA5' },
]
const ACTIVITY = [
  { text: 'Emma Thornton — Cert III issued', val: '✓ Done', valColor: '#5DCAA5' },
  { text: 'Marcus Webb — USI reminder sent', val: '2h ago' },
  { text: 'J. Kim — AVETMISS flag raised', val: '⚠', valColor: '#FAC775' },
  { text: 'T. Brooks — Currency expiry 30d', val: 'Alert', valColor: '#FAC775' },
  { text: '3 new enrolments processed', val: 'Today' },
  { text: 'Scope sync — TGA updated', val: '✓', valColor: '#5DCAA5' },
]

export default function DashboardDemo() {
  return (
    <section className="dashboard-section" id="dashboard-demo">
      <div className="container">
        <span className="eyebrow">Live Product Preview</span>
        <h2>Your compliance command centre.</h2>
        <p>Everything you need to run an audit-ready RTO — in a single view.</p>
        <div className="full-dashboard fade-up">
          {/* Top nav */}
          <div className="db-navbar">
            <div className="db-nav-logo">TrainTrack</div>
            {NAV_ITEMS.map((n) => (
              <div key={n} className={`db-navitem${n === 'Dashboard' ? ' active' : ''}`}>{n}</div>
            ))}
            <div className="db-user">Sarah M. &middot; Gladstone RTO</div>
          </div>

          <div className="db-body">
            {/* Sidebar */}
            <div className="db-sidebar">
              {SIDEBAR.map((item, i) =>
                item === 'divider' ? (
                  <div key={`d${i}`} className="db-sidebar-divider" />
                ) : (
                  <div key={item.label} className={`db-sidebar-item${item.active ? ' active' : ''}`}>
                    <span className="db-sidebar-icon">{item.icon}</span> {item.label}
                  </div>
                )
              )}
            </div>

            {/* Content */}
            <div className="db-content">
              <div className="db-content-header">
                <div>
                  <div className="db-content-title">Good morning, Sarah</div>
                  <div className="db-content-sub">Thursday 9 April 2026 &middot; NCVER submission in 23 days</div>
                </div>
                <button className="db-action-btn">Run AVETMISS Validation</button>
              </div>

              <div className="db-kpi-row">
                {KPIS.map((k) => (
                  <div key={k.label} className="db-kpi">
                    <div className="db-kpi-val">{k.val}</div>
                    <div className="db-kpi-lbl">{k.label}</div>
                    <span className={`db-kpi-badge ${k.cls}`}>{k.badge}</span>
                  </div>
                ))}
              </div>

              <div className="db-two-col">
                <div className="db-panel">
                  <div className="db-panel-title">Compliance Status</div>
                  <div className="db-bar-row">
                    {COMPLIANCE_BARS.map((b) => (
                      <div key={b.label}>
                        <div className="db-bar-label">
                          <span>{b.label}</span>
                          <span style={{ color: b.valColor }}>{b.pct}%</span>
                        </div>
                        <div className="db-bar-track">
                          <div className="db-bar-fill" style={{ width: `${b.pct}%`, background: b.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="db-panel">
                  <div className="db-panel-title">Recent Activity</div>
                  {ACTIVITY.map((a) => (
                    <div key={a.text} className="db-list-item">
                      <span className="db-list-name">{a.text}</span>
                      <span className="db-list-val" style={a.valColor ? { color: a.valColor } : undefined}>{a.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
