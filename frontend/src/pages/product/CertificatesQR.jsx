import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

export default function CertificatesQR() {
  const features = [
    { icon: '🎓', bg: 'var(--teal-light)', title: 'Auto-Generated Certificates', desc: 'When all units in a qualification are marked Competent, TrainTrack automatically generates the certificate and statement of attainment.' },
    { icon: '📐', bg: 'var(--blue-light)', title: 'Custom Templates', desc: 'Upload your RTO branded template. TrainTrack merges student data, qualification details, NRT logo, and issue dates automatically.' },
    { icon: '📲', bg: 'var(--amber-light)', title: 'QR Verification', desc: 'Every certificate includes a unique QR code. Employers scan it to verify authenticity, student name, qualification, and issue date.' },
    { icon: '🔐', bg: 'var(--coral-light)', title: 'Tamper-Proof Records', desc: 'Certificate records are cryptographically signed. Any modification to the source data invalidates the QR verification.' },
  ]

  const steps = [
    { title: 'Student completes all units', desc: 'The LMS tracks competency outcomes across all units in the qualification. When all are marked Competent, the system triggers certificate generation.' },
    { title: 'Certificate generated automatically', desc: 'TrainTrack merges student data into your branded template, adds the NRT logo, unique certificate number, and QR code.' },
    { title: 'Student notified and downloads', desc: 'Students receive an email with a secure download link. Certificates are also accessible from their student portal dashboard.' },
    { title: 'Employer verifies via QR', desc: 'Employers scan the QR code and see a verification page confirming the student name, qualification, and date of issue — without needing to contact your RTO.' },
  ]

  return (
    <PageLayout title="Certificates + QR" breadcrumb="Certificates + QR">
      <div className="page-content">
        <span className="page-tag page-tag-teal">CORE MODULE</span>
        <h2>Issue verifiable certificates in seconds</h2>
        <p>TrainTrack automates certificate generation and adds tamper-proof QR verification — so employers can confirm qualifications instantly, and your RTO never issues a fraudulent certificate.</p>
      </div>

      <div className="page-feature-grid">
        {features.map((f, i) => (
          <div className="page-feature-card" key={i}>
            <div className="page-feature-icon" style={{ background: f.bg }}>{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="page-card">
        <h3>End-to-end certificate workflow</h3>
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

      <div className="page-card">
        <h3>Compliance with AQF & ASQA requirements</h3>
        <ul>
          <li>Certificates include all fields required by the AQF Issuance Policy</li>
          <li>NRT logo automatically applied to nationally recognised qualifications</li>
          <li>Statement of Attainment generated for partial completions</li>
          <li>Certificate register maintained with full audit trail</li>
          <li>Reissue workflow with version tracking</li>
        </ul>
      </div>

      <div className="page-cta-box">
        <h2>Modernise your certificate issuance</h2>
        <p>QR-verified certificates build trust with employers and students alike.</p>
        <Link to="/company/contact?enquiry=demo" className="btn-primary">Book a Demo</Link>
      </div>
    </PageLayout>
  )
}
