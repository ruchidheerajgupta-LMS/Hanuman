import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

export default function VsEskilled() {
  const rows = [
    { feature: 'SMS + LMS unified platform', tt: '✓', es: '✗ Separate systems' },
    { feature: 'Pay-as-you-enrol pricing', tt: '✓', es: 'Flat annual rate' },
    { feature: 'AVETMISS pre-submission validation', tt: '✓', es: '✓' },
    { feature: 'AI-assisted assessment grading', tt: '✓', es: '✗ Not available' },
    { feature: 'Trainer currency automation', tt: '✓', es: 'Manual tracking' },
    { feature: 'training.gov.au scope sync (live API)', tt: '✓', es: '✗ Not available' },
    { feature: 'Auto certificate + QR verification', tt: '✓', es: 'Partial' },
    { feature: 'Australian phone support', tt: '✓', es: 'Limited hours' },
    { feature: 'No lock-in contracts', tt: '✓', es: 'Annual contracts' },
    { feature: 'Online enrolment engine', tt: '✓ Built-in', es: 'Basic' },
    { feature: 'Compliance dashboard', tt: '✓', es: 'Limited' },
  ]

  return (
    <PageLayout title="TrainTrack vs eSkilled" breadcrumb="vs eSkilled">
      <div className="page-content">
        <span className="page-tag page-tag-blue">COMPARISON</span>
        <h2>TrainTrack vs eSkilled — an honest comparison</h2>
        <p>eSkilled is an Australian LMS with a focus on online assessment delivery. If you're comparing eSkilled with TrainTrack, here's what you need to know.</p>
        <p>This comparison is based on publicly available information. We encourage you to verify features directly with both providers.</p>
      </div>

      <div className="page-card">
        <h3>Feature comparison</h3>
        <table className="page-compare-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th style={{ color: 'var(--teal)' }}>TrainTrack</th>
              <th>eSkilled</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600, color: 'var(--navy)' }}>{r.feature}</td>
                <td className="check">{r.tt}</td>
                <td>{r.es}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="page-card">
        <h3>Where eSkilled excels</h3>
        <p>eSkilled has capabilities that some RTOs value:</p>
        <ul>
          <li><strong>Online assessment focus</strong> — Purpose-built for online knowledge-based assessments with strong question banks</li>
          <li><strong>Exam proctoring</strong> — Built-in proctoring features for supervised online exams</li>
          <li><strong>AVETMISS reporting</strong> — Solid AVETMISS export capabilities with validation</li>
        </ul>
      </div>

      <div className="page-card">
        <h3>Where TrainTrack leads</h3>
        <ul>
          <li><strong>Unified platform</strong> — SMS + LMS + compliance in one database. No separate systems to maintain.</li>
          <li><strong>AI grading</strong> — Automated feedback on written assessments, not just multiple-choice auto-marking.</li>
          <li><strong>Fair pricing</strong> — Pay-as-you-enrol model means you only pay for active students. No annual lock-in.</li>
          <li><strong>Compliance tools</strong> — Self-audit checklists, evidence repository, trainer currency tracking, and risk register — all built in.</li>
          <li><strong>Certificate + QR verification</strong> — Automated certificate generation with employer-facing QR verification.</li>
          <li><strong>Dedicated support</strong> — Australian phone support from VET industry professionals.</li>
        </ul>
      </div>

      <div className="page-cta-box">
        <h2>Compare for yourself</h2>
        <p>Book a demo and see TrainTrack alongside your current setup.</p>
        <Link to="/#audit" className="btn-primary">Book a Demo</Link>
      </div>
    </PageLayout>
  )
}
