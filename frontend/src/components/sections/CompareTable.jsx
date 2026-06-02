const ROWS = [
  {
    category: 'Pricing',
    feature: 'Per-enrolment pricing (not per-seat)',
    tt:  { type: 'yes' },
    ca:  { type: 'no',   text: '$3–5 per learner/mo' },
    axc: { type: 'no',   text: '$2–5 per learner/mo' },
  },
  {
    category: 'Pricing',
    feature: 'No 12-month lock-in on entry plan',
    tt:  { type: 'yes' },
    ca:  { type: 'part', text: 'Annual contract' },
    axc: { type: 'part', text: 'Annual contract' },
  },
  {
    category: 'Compliance',
    feature: 'AVETMISS 8 NAT file export',
    tt:  { type: 'yes' },
    ca:  { type: 'yes' },
    axc: { type: 'yes' },
  },
  {
    category: 'Compliance',
    feature: 'AVETMISS pre-submission validation',
    tt:  { type: 'yes' },
    ca:  { type: 'part', text: 'Basic checks' },
    axc: { type: 'part', text: 'Basic checks' },
  },
  {
    category: 'Compliance',
    feature: 'Automated USI verification (DET API)',
    tt:  { type: 'yes' },
    ca:  { type: 'yes' },
    axc: { type: 'yes' },
  },
  {
    category: 'Assessment',
    feature: 'Digital signatures — student + assessor',
    tt:  { type: 'yes' },
    ca:  { type: 'part', text: 'Add-on cost' },
    axc: { type: 'no',   text: '✗' },
  },
  {
    category: 'Assessment',
    feature: 'Observation checklists (practical delivery)',
    tt:  { type: 'yes' },
    ca:  { type: 'yes' },
    axc: { type: 'part', text: 'Limited' },
  },
  {
    category: 'Assessment',
    feature: 'RPL workflow (evidence upload + determination)',
    tt:  { type: 'yes' },
    ca:  { type: 'part', text: 'Basic' },
    axc: { type: 'part', text: 'Basic' },
  },
  {
    category: 'Mobile',
    feature: 'Offline PWA — submit assessments without internet',
    tt:  { type: 'yes' },
    ca:  { type: 'no',   text: '✗ Online only' },
    axc: { type: 'no',   text: '✗ Online only' },
  },
  {
    category: 'Operations',
    feature: 'Automated email notifications (grade, enrol, cert)',
    tt:  { type: 'yes' },
    ca:  { type: 'yes' },
    axc: { type: 'yes' },
  },
  {
    category: 'Operations',
    feature: 'Cohort broadcast messaging (email + SMS)',
    tt:  { type: 'yes' },
    ca:  { type: 'part', text: 'Email only' },
    axc: { type: 'yes' },
  },
  {
    category: 'Operations',
    feature: 'Branded PDF certificate auto-generation',
    tt:  { type: 'yes' },
    ca:  { type: 'yes' },
    axc: { type: 'yes' },
  },
  {
    category: 'Architecture',
    feature: 'Multi-tenant — manage multiple RTO entities',
    tt:  { type: 'yes' },
    ca:  { type: 'no',   text: 'Single-tenant' },
    axc: { type: 'no',   text: 'Single-tenant' },
  },
  {
    category: 'Architecture',
    feature: 'SMS + LMS in one unified database',
    tt:  { type: 'yes' },
    ca:  { type: 'no',   text: 'LMS only' },
    axc: { type: 'yes' },
  },
]

const CATEGORIES = [...new Set(ROWS.map((r) => r.category))]

function Cell({ cell }) {
  if (cell.type === 'yes') return <span className="ct-yes">✓</span>
  if (cell.type === 'no') return <span className="ct-no">{cell.text}</span>
  return <span className="ct-part">{cell.text}</span>
}

export default function CompareTable() {
  return (
    <section className="section-sm compare-section">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <span className="eyebrow eyebrow-blue">Honest Comparison</span>
          <h2>How TrainTrack stacks up.</h2>
          <p style={{ marginTop: '0.75rem', fontSize: 15 }}>
            We checked every competitor's feature list and pricing page. Here's what we found.
          </p>
        </div>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th className="tt-col">TrainTrack</th>
                <th>Cloud Assess</th>
                <th>aXcelerate</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map((cat) => (
                <>
                  <tr key={`cat-${cat}`} style={{ background: 'rgba(10,37,64,0.04)' }}>
                    <td colSpan={4} style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted)', padding: '8px 16px' }}>
                      {cat}
                    </td>
                  </tr>
                  {ROWS.filter((r) => r.category === cat).map((r) => (
                    <tr key={r.feature}>
                      <td>{r.feature}</td>
                      <td><Cell cell={r.tt} /></td>
                      <td><Cell cell={r.ca} /></td>
                      <td><Cell cell={r.axc} /></td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, textAlign: 'center', marginTop: 12, opacity: 0.6 }}>
          Based on publicly available information, May 2026. Always verify current competitor pricing and features directly.
        </p>
      </div>
    </section>
  )
}
