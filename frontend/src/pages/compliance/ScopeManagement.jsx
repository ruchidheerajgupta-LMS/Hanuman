import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

export default function ScopeManagement() {
  const features = [
    { icon: '📋', bg: 'var(--teal-light)', title: 'Scope Register', desc: 'A live view of your registration scope synced with training.gov.au. See every qualification and unit you\'re approved to deliver.' },
    { icon: '🔔', bg: 'var(--blue-light)', title: 'Change Alerts', desc: 'Automatic notifications when training packages on your scope are updated, superseded, or removed from the national register.' },
    { icon: '📐', bg: 'var(--amber-light)', title: 'Teach-Out Planning', desc: 'When a qualification is superseded, TrainTrack identifies affected students and creates a teach-out plan with transition timelines.' },
    { icon: '✅', bg: 'var(--coral-light)', title: 'Scope Extension Support', desc: 'Preparing to add qualifications? TrainTrack generates a scope extension checklist covering TAS, trainers, resources, and industry consultation.' },
  ]

  return (
    <PageLayout title="Scope Management" breadcrumb="Scope Management" description="Manage your RTO's scope of registration with live training.gov.au sync — track qualifications, units, and delivery locations in one place.">
      <div className="page-content">
        <span className="page-tag page-tag-blue">COMPLIANCE GUIDE</span>
        <h2>Managing your RTO scope of registration</h2>
        <p>Your scope of registration defines what qualifications and units your RTO is approved to deliver and assess. Managing scope isn't a one-time task — it requires ongoing monitoring as training packages change.</p>
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
        <h3>What happens when a qualification is superseded?</h3>
        <p>When a training package is updated on training.gov.au, RTOs typically have a 12-month teach-out period for the superseded qualification. During this time you must:</p>
        <ul>
          <li>Identify all currently enrolled students in the superseded qualification</li>
          <li>Determine which students can complete within the teach-out period</li>
          <li>Transition remaining students to the new qualification with credit transfer</li>
          <li>Update your TAS for the new qualification</li>
          <li>Ensure trainers have current competency in any new units</li>
          <li>Update assessment tools to reflect new unit requirements</li>
          <li>Apply to ASQA for scope extension to add the new qualification</li>
        </ul>
      </div>

      <div className="page-card">
        <h3>Scope extension checklist</h3>
        <p>Adding a new qualification to your scope? Use this checklist to prepare your ASQA application:</p>
        <ol>
          <li>Confirm market demand and student numbers for the qualification</li>
          <li>Develop a Training and Assessment Strategy (TAS)</li>
          <li>Secure qualified trainers with TAE + vocational competency</li>
          <li>Develop or source assessment tools mapped to unit requirements</li>
          <li>Conduct industry consultation and document feedback</li>
          <li>Ensure facilities, equipment, and resources are adequate</li>
          <li>Submit scope extension application via ASQA portal</li>
        </ol>
      </div>

      <div className="page-cta-box">
        <h2>Stay on top of scope changes</h2>
        <p>TrainTrack monitors training.gov.au and alerts you to changes affecting your scope.</p>
        <Link to="/company/contact?enquiry=demo" className="btn-primary">Book a Demo</Link>
      </div>
    </PageLayout>
  )
}
