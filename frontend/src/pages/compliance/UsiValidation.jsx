import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

export default function UsiValidation() {
  const steps = [
    { title: 'Student provides their USI', desc: 'During online enrolment or manual entry, the student provides their 10-character Unique Student Identifier.' },
    { title: 'USI recorded on the student profile', desc: 'TrainTrack stores the USI against the student record and marks it as collected. Admin staff can then verify the USI manually via the USI Registry portal and update the status.' },
    { title: 'Status tracked in the dashboard', desc: 'Each student record shows a USI status — Collected, Verified, or Missing. Dashboard alerts flag any active student without a recorded USI.' },
    { title: 'Ongoing compliance', desc: 'TrainTrack flags any student with a missing USI before AVETMISS export, preventing data rejections at NCVER lodgement.' },
  ]

  return (
    <PageLayout title="USI Validation" breadcrumb="USI Validation" description="Automatic USI (Unique Student Identifier) validation for Australian RTOs — verify student USIs instantly and avoid AVETMISS rejections.">
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
        <h3>How TrainTrack handles USI compliance</h3>
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
          { icon: '📋', bg: 'var(--teal-light)', title: 'USI Status Tracking', desc: 'Every student record shows USI status — Collected, Verified, or Missing. No student slips through.' },
          { icon: '🔔', bg: 'var(--amber-light)', title: 'Missing USI Alerts', desc: 'Dashboard warnings flag any active student without a recorded USI, ensuring your register is complete before lodgement.' },
          { icon: '🛡️', bg: 'var(--blue-light)', title: 'AVETMISS Export Guard', desc: 'TrainTrack blocks AVETMISS export for students with missing USIs — preventing NCVER rejections before they happen.' },
          { icon: '📁', bg: 'var(--coral-light)', title: 'USI Exemption Tracking', desc: 'Track students with valid USI exemptions (e.g., international students on certain visa types) with documentation.' },
        ].map((f, i) => (
          <div className="page-feature-card" key={i}>
            <div className="page-feature-icon" style={{ background: f.bg }}>{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="page-cta-box">
        <h2>Stay on top of USI compliance</h2>
        <p>Keep your student register complete and AVETMISS-ready at all times.</p>
        <Link to="/company/contact?enquiry=demo" className="btn-primary">Book a Demo</Link>
      </div>
    </PageLayout>
  )
}
