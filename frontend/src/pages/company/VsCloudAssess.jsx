import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

export default function VsCloudAssess() {
  const rows = [
    { feature: 'SMS + LMS unified platform', tt: '✓', ca: '✗ Separate systems' },
    { feature: 'Pay-as-you-enrol pricing', tt: '✓', ca: 'Flat annual rate' },
    { feature: 'AVETMISS pre-submission validation', tt: '✓', ca: 'Partial' },
    { feature: 'AI-assisted assessment grading', tt: '✓', ca: '✗ Not available' },
    { feature: 'Trainer currency automation', tt: '✓', ca: 'Manual tracking' },
    { feature: 'training.gov.au scope sync (live API)', tt: '✓', ca: '✗ Not available' },
    { feature: 'Auto certificate + QR verification', tt: '✓', ca: 'Manual trigger' },
    { feature: 'Australian phone support', tt: '✓', ca: 'Email only' },
    { feature: 'No lock-in contracts', tt: '✓', ca: '12-month minimum' },
    { feature: 'Online enrolment engine', tt: '✓ Built-in', ca: 'Third-party integration' },
    { feature: 'Compliance dashboard', tt: '✓', ca: 'Limited' },
  ]

  return (
    <PageLayout title="TrainTrack vs Cloud Assess" breadcrumb="vs Cloud Assess">
      <div className="page-content">
        <span className="page-tag page-tag-blue">COMPARISON</span>
        <h2>TrainTrack vs Cloud Assess — an honest comparison</h2>
        <p>Cloud Assess is a well-known name in VET assessment tools. But if you're looking for a unified SMS + LMS + compliance platform, there are important differences to consider.</p>
        <p>This comparison is based on publicly available information. We encourage you to verify features directly with both providers.</p>
      </div>

      <div className="page-card">
        <h3>Feature comparison</h3>
        <table className="page-compare-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th style={{ color: 'var(--teal)' }}>TrainTrack</th>
              <th>Cloud Assess</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600, color: 'var(--navy)' }}>{r.feature}</td>
                <td className="check">{r.tt}</td>
                <td>{r.ca}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="page-card">
        <h3>Where Cloud Assess excels</h3>
        <p>To be fair, Cloud Assess has strengths that some RTOs value:</p>
        <ul>
          <li><strong>Mobile assessment capture</strong> — Their mobile app is strong for on-site practical assessments with photo/video evidence</li>
          <li><strong>Established market presence</strong> — Longer track record in the Australian VET market</li>
          <li><strong>Offline capability</strong> — Assessments can be completed offline and synced later</li>
        </ul>
      </div>

      <div className="page-card">
        <h3>Where TrainTrack leads</h3>
        <ul>
          <li><strong>Unified platform</strong> — SMS + LMS + compliance in one database. No integrations, no data silos, no double entry.</li>
          <li><strong>AI grading</strong> — Save trainers hours per week with AI-assisted written assessment evaluation.</li>
          <li><strong>Fair pricing</strong> — Pay per enrolment, not a flat annual fee. No lock-in contracts.</li>
          <li><strong>Compliance-first design</strong> — Built-in AVETMISS validation, trainer currency tracking, and audit evidence packs.</li>
          <li><strong>Australian support</strong> — Real phone support from people who understand VET. Not just a ticket queue.</li>
        </ul>
      </div>

      <div className="page-cta-box">
        <h2>See the TrainTrack difference</h2>
        <p>Book a demo and we'll show you how we compare — using your own data.</p>
        <Link to="/company/contact?enquiry=demo" className="btn-primary">Book a Demo</Link>
      </div>
    </PageLayout>
  )
}
