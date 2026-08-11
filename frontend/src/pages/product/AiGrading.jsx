import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

export default function AiGrading() {
  const features = [
    { icon: '📄', bg: 'var(--teal-light)', title: 'Import From Word or PDF', desc: 'Upload an existing assessment and TrainTrack automatically extracts the questions into a ready-to-use digital assessment — no manual re-typing.' },
    { icon: '⚡', bg: 'var(--blue-light)', title: 'Instant Auto-Marking', desc: 'Multiple-choice, fill-in-the-blank, and matching questions mark themselves the moment a student submits — no waiting for a trainer to be free.' },
    { icon: '👨‍🏫', bg: 'var(--amber-light)', title: 'Trainers Focus Where It Matters', desc: 'Written and practical responses still go to your qualified assessor for judgement — auto-marking just clears the objective questions off their desk first.' },
    { icon: '📊', bg: 'var(--coral-light)', title: 'One Marking Record', desc: 'Auto-marked and manually-marked results land in the same submission record, so nothing falls through the gap between the two.' },
  ]

  return (
    <PageLayout title="Smart Assessment Marking" breadcrumb="Smart Assessment Marking" description="Auto-mark multiple-choice, fill-in-the-blank, and matching questions instantly. Upload an existing Word or PDF assessment and TrainTrack extracts the questions for you.">
      <div className="page-content">
        <span className="page-tag page-tag-teal">SMART MARKING</span>
        <h2>Less re-typing, faster marking</h2>
        <p>Upload an existing Word or PDF assessment and TrainTrack extracts the questions straight into the assessment designer. Objective question types — multiple-choice, fill-in-the-blank, matching — mark themselves instantly.</p>
        <p>Written and practical assessments still go to a qualified assessor, exactly as ASQA requires — TrainTrack just takes the repetitive marking off their plate so they can spend their time on the judgement calls that actually need a human.</p>
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
        <h3>How does this fit ASQA's requirements?</h3>
        <p>Under the Standards for RTOs, a qualified assessor must make the final Competent / Not Yet Competent decision. TrainTrack's auto-marking never overrides that — it only applies to question types with a single objectively correct answer:</p>
        <ul>
          <li>Multiple-choice, fill-in-the-blank, and matching questions are marked instantly against the correct answer you set when building the assessment</li>
          <li>Written and practical responses always route to a qualified assessor for manual grading and feedback</li>
          <li>Every submission keeps one combined record, whichever way each question was marked</li>
        </ul>
      </div>

      <div className="page-cta-box">
        <h2>Cut the busywork out of marking</h2>
        <p>See it with your own assessment — upload one during a live demo.</p>
        <Link to="/company/contact?enquiry=demo" className="btn-primary">Book a Demo</Link>
      </div>
    </PageLayout>
  )
}
