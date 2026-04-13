const ROWS = [
  { feature: 'SMS + LMS unified database', tt: { type: 'yes' }, ca: { type: 'no', text: '✗ Separate' }, es: { type: 'no', text: '✗ Separate' } },
  { feature: 'Pay-as-you-enrol pricing', tt: { type: 'yes' }, ca: { type: 'no', text: 'Flat rate' }, es: { type: 'no', text: 'Flat rate' } },
  { feature: 'AVETMISS pre-submission validation', tt: { type: 'yes' }, ca: { type: 'part', text: 'Partial' }, es: { type: 'yes' } },
  { feature: 'AI-assisted grading', tt: { type: 'yes' }, ca: { type: 'no', text: '✗' }, es: { type: 'no', text: '✗' } },
  { feature: 'Trainer currency automation', tt: { type: 'yes' }, ca: { type: 'part', text: 'Manual' }, es: { type: 'part', text: 'Manual' } },
  { feature: 'TGA scope sync (live API)', tt: { type: 'yes' }, ca: { type: 'no', text: '✗' }, es: { type: 'no', text: '✗' } },
  { feature: 'Auto certificate + QR verification', tt: { type: 'yes' }, ca: { type: 'part', text: 'Manual trigger' }, es: { type: 'part', text: 'Partial' } },
  { feature: 'Australian phone support', tt: { type: 'yes' }, ca: { type: 'part', text: 'Email only' }, es: { type: 'part', text: 'Limited' } },
  { feature: 'No lock-in contracts', tt: { type: 'yes' }, ca: { type: 'part', text: '12-month min' }, es: { type: 'part', text: 'Annual' } },
]

function Cell({ cell }) {
  if (cell.type === 'yes') return <span className="ct-yes">✓</span>
  if (cell.type === 'no') return <span className="ct-no">{cell.text}</span>
  return <span className="ct-part">{cell.text}</span>
}

export default function CompareTable() {
  return (
    <section className="section-sm compare-section">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          <span className="eyebrow eyebrow-blue">Honest Comparison</span>
          <h2>How TrainTrack stacks up.</h2>
        </div>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th className="tt-col">TrainTrack</th>
                <th>Cloud Assess</th>
                <th>eSkilled</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.feature}>
                  <td>{r.feature}</td>
                  <td><Cell cell={r.tt} /></td>
                  <td><Cell cell={r.ca} /></td>
                  <td><Cell cell={r.es} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, textAlign: 'center', marginTop: 12 }}>
          Based on publicly available information, April 2026. Always verify current competitor pricing and features directly.
        </p>
      </div>
    </section>
  )
}
