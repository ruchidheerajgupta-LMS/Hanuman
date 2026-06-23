import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

export default function StudentManagement() {
  const features = [
    { icon: '👤', bg: 'var(--teal-light)', title: 'Unified Student Profiles', desc: 'Complete 360° view of every learner — enrolment history, progress, USI, contact details, and compliance status in one place.' },
    { icon: '📋', bg: 'var(--blue-light)', title: 'Enrolment Pipeline', desc: 'Track students from enquiry through to completion with drag-and-drop pipeline stages and automated status transitions.' },
    { icon: '📊', bg: 'var(--amber-light)', title: 'Progress Tracking', desc: 'Real-time dashboards showing unit completions, assessment results, and projected completion dates for every student.' },
    { icon: '📁', bg: 'var(--coral-light)', title: 'Document Management', desc: 'Upload, verify, and store student documents — USIs, proof of identity, RPL evidence, and training plans.' },
    { icon: '🔔', bg: 'var(--teal-light)', title: 'Automated Notifications', desc: 'Trigger SMS and email alerts for enrolment confirmations, upcoming assessments, overdue submissions, and more.' },
    { icon: '🏷️', bg: 'var(--blue-light)', title: 'Cohort & Group Management', desc: 'Organise students into cohorts, campuses, or custom groups for bulk operations and targeted reporting.' },
  ]

  return (
    <PageLayout title="Student Management (SMS)" breadcrumb="Student Management">
      <div className="page-content">
        <span className="page-tag page-tag-teal">CORE MODULE</span>
        <h2>Everything about your learners — in one place</h2>
        <p>TrainTrack's Student Management System replaces spreadsheets, paper forms, and disconnected tools with a single, AVETMISS-ready platform built exclusively for Australian RTOs.</p>
        <p>From first enquiry to certificate issuance, every interaction is tracked, searchable, and audit-ready.</p>
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
        <h3>Designed for AVETMISS from day one</h3>
        <p>Every student field maps directly to NAT files — no manual data wrangling. When audit day comes, export compliant data in two clicks.</p>
        <ul>
          <li>NAT00080 (Client) auto-populated from student profiles</li>
          <li>NAT00085 (Client Contact) with validated addresses</li>
          <li>NAT00100 (Prior Education) captured at enrolment</li>
          <li>NAT00120 (Enrolment) linked to training plan dates</li>
        </ul>
      </div>

      <div className="page-cta-box">
        <h2>Simplify student administration</h2>
        <p>Manage every stage of the student lifecycle — from enquiry to certificate.</p>
        <Link to="/company/contact?enquiry=demo" className="btn-primary">Book a Demo</Link>
      </div>
    </PageLayout>
  )
}
