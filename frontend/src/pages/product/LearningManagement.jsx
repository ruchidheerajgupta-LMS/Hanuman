import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

export default function LearningManagement() {
  const features = [
    { icon: '📚', bg: 'var(--teal-light)', title: 'Course Builder', desc: 'Drag-and-drop course creation aligned to training.gov.au packages. Map units, clusters, and delivery sequences visually.' },
    { icon: '📝', bg: 'var(--blue-light)', title: 'Online Assessments', desc: 'Create knowledge quizzes, upload practical assessments, and set due dates with automatic reminders.' },
    { icon: '⚡', bg: 'var(--amber-light)', title: 'Instant Auto-Marking', desc: 'Multiple-choice, fill-in-the-blank, and matching questions mark themselves the moment a student submits — no waiting on a trainer.' },
    { icon: '📈', bg: 'var(--coral-light)', title: 'Competency Tracking', desc: 'Map assessment results to unit competency outcomes. Instantly see who is Competent, Not Yet Competent, or in progress.' },
    { icon: '💬', bg: 'var(--teal-light)', title: 'Discussion Forums', desc: 'Built-in per-course forums for peer collaboration, trainer Q&A, and evidence of participation for audits.' },
    { icon: '📱', bg: 'var(--blue-light)', title: 'Mobile-First Design', desc: 'Students access courses, submit assessments, and check results on any device — no app download required.' },
  ]

  return (
    <PageLayout title="Learning Management (LMS)" breadcrumb="Learning Management" description="Cloud-based Learning Management System (LMS) for Australian RTOs — course builder, online assessments, auto-marking, and mobile access.">
      <div className="page-content">
        <span className="page-tag page-tag-teal">CORE MODULE</span>
        <h2>Deliver training that's engaging, trackable, and compliant</h2>
        <p>TrainTrack's LMS is purpose-built for the VET sector. Unlike generic platforms, every feature understands competency-based training, training packages, and Australian compliance requirements.</p>
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
        <h3>Seamless integration with compliance</h3>
        <p>Assessment results flow directly into AVETMISS reporting. Competency outcomes auto-update student records and trigger certificate generation when all units are complete.</p>
      </div>

      <div className="page-card">
        <h3>Trainer dashboard</h3>
        <p>Trainers see pending assessments, overdue students, and AI-suggested grades in a single view. Bulk actions let them mark attendance, send reminders, and export reports in seconds.</p>
      </div>

      <div className="page-cta-box">
        <h2>Transform your training delivery</h2>
        <p>See how TrainTrack LMS reduces admin time by 60%.</p>
        <Link to="/company/contact?enquiry=demo" className="btn-primary">Book a Demo</Link>
      </div>
    </PageLayout>
  )
}
