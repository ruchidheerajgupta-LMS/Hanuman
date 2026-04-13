import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

export default function UsiValidation() {
  const steps = [
    { title: 'Student enters their USI', desc: 'During online enrolment or manual entry, the student provides their 10-character Unique Student Identifier.' },
    { title: 'Real-time API verification', desc: 'TrainTrack queries the USI Registry System API to verify the USI exists and matches the student\'s name and date of birth.' },
    { title: 'Instant result', desc: 'If valid, the USI is locked to the student profile. If invalid, the student is prompted to correct their details or create a new USI.' },
    { title: 'Ongoing compliance', desc: 'TrainTrack ensures no enrolment or outcome is reported to NCVER without a verified USI — preventing data rejections at lodgement.' },
  ]

  return (
    <PageLayout title="USI Validation" breadcrumb="USI Validation">
      <div className="page-content">
        <span className="page-tag page-tag-blue">COMPLIANCE GUIDE</span>
        <h2>USI validation — what RTOs need to know</h2>
        <p>The Unique Student Identifier (USI) is a 10-character reference number that creates a secure online record of all nationally recognised VET qualifications. Since 1 January 2015, RTOs cannot issue qualifications or statements of attainment without a verified USI.</p>
      </div>

      <div className="page-card">
        <h3>Why USI validation matters</h3>
        <ul>
          <li><strong>Legal requirement:</strong> It is an offence under the Student Identifiers Act 2014 to issue a qualification without a verified USI</li>
          <li><strong>AVETMISS compliance:</strong> NAT00120 (enrolment) records require a valid USI — submissions are rejected without one</li>
          <li><strong>Student records:</strong> The USI links all of a student's VET records across providers, enabling transcript access via the USI portal</li>
          <li><strong>Audit readiness:</strong> ASQA audits verify that RTOs have USI collection and verification processes in place</li>
        </ul>
      </div>

      <div className="page-card">
        <h3>How TrainTrack validates USIs</h3>
        {steps.map((s, i) => (
          <div className="page-step" key={i}>
            <div className="page-step-num">{i + 1}</div>
            <div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="page-feature-grid">
        {[
          { icon: '⚡', bg: 'var(--teal-light)', title: 'Real-Time Verification', desc: 'USIs are verified against the registry in under 2 seconds — no batch processing or manual checks required.' },
          { icon: '🛡️', bg: 'var(--blue-light)', title: 'Bulk Validation', desc: 'Migrating from another system? Upload a CSV and validate hundreds of USIs in one batch operation.' },
          { icon: '🔔', bg: 'var(--amber-light)', title: 'Missing USI Alerts', desc: 'Dashboard warnings flag any active student without a verified USI, ensuring no one slips through the cracks.' },
          { icon: '📋', bg: 'var(--coral-light)', title: 'USI Exemption Tracking', desc: 'Track students with valid USI exemptions (e.g., international students on certain visa types) with documentation.' },
        ].map((f, i) => (
          <div className="page-feature-card" key={i}>
            <div className="page-feature-icon" style={{ background: f.bg }}>{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="page-cta-box">
        <h2>Automate USI validation</h2>
        <p>Never issue a qualification without a verified USI again.</p>
        <Link to="/#audit" className="btn-primary">Book a Demo</Link>
      </div>
    </PageLayout>
  )
}
