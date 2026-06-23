import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

export default function Avetmiss8Guide() {
  const natFiles = [
    { code: 'NAT00010', name: 'Training Organisation', required: 'Yes' },
    { code: 'NAT00020', name: 'Training Organisation Delivery Location', required: 'Yes' },
    { code: 'NAT00030', name: 'Course (Program)', required: 'Yes' },
    { code: 'NAT00060', name: 'Subject (Unit of Competency)', required: 'Yes' },
    { code: 'NAT00080', name: 'Client (Student)', required: 'Yes' },
    { code: 'NAT00085', name: 'Client Postal Details', required: 'Yes' },
    { code: 'NAT00090', name: 'Disability', required: 'If applicable' },
    { code: 'NAT00100', name: 'Prior Educational Achievement', required: 'Yes' },
    { code: 'NAT00120', name: 'Enrolment (Training Activity)', required: 'Yes' },
    { code: 'NAT00130', name: 'Program (Qualification) Completed', required: 'Yes' },
  ]

  return (
    <PageLayout title="AVETMISS 8 Guide" breadcrumb="AVETMISS 8 Guide">
      <div className="page-content">
        <span className="page-tag page-tag-blue">COMPLIANCE GUIDE</span>
        <h2>The practical RTO guide to AVETMISS Release 8</h2>
        <p>AVETMISS (Australian Vocational Education and Training Management Information Statistical Standard) Release 8 defines the data standard that all RTOs must use when reporting to NCVER. This guide covers what you need to know.</p>
      </div>

      <div className="page-card">
        <h3>What is AVETMISS 8?</h3>
        <p>AVETMISS Release 8 is the current data standard for reporting VET activity in Australia. It specifies the format, field definitions, and validation rules for the NAT (National AVETMISS Transfer) files that RTOs submit to NCVER.</p>
        <p>All RTOs registered with ASQA, TAC, or state regulators must report using AVETMISS 8. Reports are typically submitted quarterly for government-funded students and annually for fee-for-service students.</p>
      </div>

      <div className="page-card">
        <h3>NAT file reference</h3>
        <table className="page-compare-table">
          <thead>
            <tr>
              <th>File</th>
              <th>Description</th>
              <th>Required</th>
            </tr>
          </thead>
          <tbody>
            {natFiles.map((f, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600, color: 'var(--navy)' }}>{f.code}</td>
                <td>{f.name}</td>
                <td>{f.required}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="page-card">
        <h3>Common AVETMISS errors and how to fix them</h3>
        <ul>
          <li><strong>Missing USI</strong> — Every student must have a verified USI before outcomes can be reported. TrainTrack validates USIs at enrolment.</li>
          <li><strong>Invalid outcome codes</strong> — Outcome 20 (C) and 30 (NYC) must match actual assessment records. TrainTrack syncs outcomes from the LMS automatically.</li>
          <li><strong>Date mismatches</strong> — Activity start/end dates must be logically consistent. TrainTrack flags overlapping or impossible date ranges before export.</li>
          <li><strong>Missing address fields</strong> — Postcode, state, and suburb must all be present and valid. TrainTrack uses address auto-complete with validation.</li>
          <li><strong>Duplicate enrolments</strong> — Same student, same unit, same delivery period. TrainTrack's duplicate detection prevents these at data entry.</li>
        </ul>
      </div>

      <div className="page-card">
        <h3>Reporting deadlines</h3>
        <ul>
          <li><strong>Government-funded students:</strong> Quarterly — by the end of the month following each quarter</li>
          <li><strong>Fee-for-service students:</strong> Annually — by March of the following year</li>
          <li><strong>Total VET Activity (TVA):</strong> Annual submission covering all student activity</li>
        </ul>
      </div>

      <div className="page-cta-box">
        <h2>Automate AVETMISS with TrainTrack</h2>
        <p>Stop wrestling with NAT files. Let TrainTrack generate, validate, and export for you.</p>
        <Link to="/company/contact?enquiry=demo" className="btn-primary">Book a Demo</Link>
      </div>
    </PageLayout>
  )
}
