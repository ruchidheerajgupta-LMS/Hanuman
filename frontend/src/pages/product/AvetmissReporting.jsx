import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

export default function AvetmissReporting() {
  const natFiles = [
    { code: 'NAT00010', name: 'Training Organisation', desc: 'Auto-populated from your RTO settings — TOID, legal name, ABN, and contact.' },
    { code: 'NAT00020', name: 'Training Organisation Delivery Location', desc: 'Managed from your campus/site configuration. Address validation included.' },
    { code: 'NAT00030', name: 'Course', desc: 'Mapped from training.gov.au packages. Scope items auto-synced.' },
    { code: 'NAT00060', name: 'Subject (Unit)', desc: 'Unit details including nominal hours, field of education, and VET flag.' },
    { code: 'NAT00080', name: 'Client (Student)', desc: 'Comprehensive student demographics — all 30+ AVETMISS fields captured at enrolment.' },
    { code: 'NAT00085', name: 'Client Contact', desc: 'Validated postal addresses and contact details.' },
    { code: 'NAT00100', name: 'Prior Education', desc: 'Captured at enrolment — prior qualifications and schooling levels.' },
    { code: 'NAT00120', name: 'Enrolment', desc: 'Unit enrolments with start dates, outcomes, hours, and funding details.' },
    { code: 'NAT00130', name: 'Qualification Completed', desc: 'Auto-generated when all units in a program are marked Competent.' },
  ]

  return (
    <PageLayout title="AVETMISS Reporting" breadcrumb="AVETMISS Reporting">
      <div className="page-content">
        <span className="page-tag page-tag-blue">REPORTING</span>
        <h2>AVETMISS exports in two clicks — not two days</h2>
        <p>TrainTrack generates all nine NAT files from data you've already entered during normal operations. No spreadsheet wrangling, no AVETMISS consultants, no panic before NCVER deadlines.</p>
      </div>

      <div className="page-card">
        <h3>All 9 NAT files — automatically</h3>
        <table className="page-compare-table">
          <thead>
            <tr>
              <th>NAT File</th>
              <th>Name</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {natFiles.map((f, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600, color: 'var(--navy)' }}>{f.code}</td>
                <td>{f.name}</td>
                <td>{f.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="page-feature-grid">
        {[
          { icon: '🔍', bg: 'var(--teal-light)', title: 'Pre-Submission Validation', desc: 'Run validation checks before exporting. TrainTrack flags missing data, invalid codes, and logical errors so you fix them before NCVER rejects your file.' },
          { icon: '📅', bg: 'var(--blue-light)', title: 'Scheduled Exports', desc: 'Set up automatic quarterly or annual exports. Files are generated, validated, and emailed to nominated contacts on schedule.' },
          { icon: '📊', bg: 'var(--amber-light)', title: 'Reporting Dashboard', desc: 'See completion rates, outcome breakdowns, and funding summaries at a glance. Filter by period, campus, course, or funding source.' },
          { icon: '🔄', bg: 'var(--coral-light)', title: 'Revision History', desc: 'Every export is versioned. Compare submissions, track corrections, and maintain a complete audit trail of all AVETMISS lodgements.' },
        ].map((f, i) => (
          <div className="page-feature-card" key={i}>
            <div className="page-feature-icon" style={{ background: f.bg }}>{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="page-cta-box">
        <h2>Never dread AVETMISS again</h2>
        <p>TrainTrack handles reporting so you can focus on training.</p>
        <Link to="/company/contact?enquiry=demo" className="btn-primary">See It in Action</Link>
      </div>
    </PageLayout>
  )
}
