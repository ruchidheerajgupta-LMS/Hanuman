import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

export default function AiGrading() {
  const features = [
    { icon: '🤖', bg: 'var(--teal-light)', title: 'Instant AI Feedback', desc: 'Students receive detailed, constructive feedback within seconds of submission — not days. AI evaluates against unit competency criteria.' },
    { icon: '📏', bg: 'var(--blue-light)', title: 'Rubric-Aligned Scoring', desc: 'AI grades map to your existing rubrics and assessment tools. Configure competency descriptors per unit for precision grading.' },
    { icon: '👨‍🏫', bg: 'var(--amber-light)', title: 'Trainer Review Layer', desc: 'AI suggests a grade; the trainer confirms or adjusts. Full transparency — trainers see exactly why the AI scored each criterion.' },
    { icon: '🔒', bg: 'var(--coral-light)', title: 'Academic Integrity', desc: 'Built-in plagiarism detection and AI-content flagging. Every submission is checked before grading starts.' },
  ]

  const savings = [
    { label: 'Time to grade one assessment', before: '15-25 min', after: '2-3 min' },
    { label: 'Feedback turnaround', before: '3-7 days', after: 'Instant' },
    { label: 'Consistency across markers', before: 'Variable', after: '95%+ alignment' },
    { label: 'Student satisfaction', before: 'Mixed', after: '4.7/5 avg' },
  ]

  return (
    <PageLayout title="AI Grading" breadcrumb="AI Grading">
      <div className="page-content">
        <span className="page-tag page-tag-amber">AI-POWERED</span>
        <h2>Grade smarter, not harder</h2>
        <p>TrainTrack's AI Grading Engine analyses written submissions against your rubrics, provides detailed feedback, and suggests competency outcomes — giving trainers hours back every week.</p>
        <p>Unlike generic AI tools, our engine understands competency-based training, ASQA expectations, and the nuance between Competent and Not Yet Competent.</p>
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
        <h3>Before vs. After AI Grading</h3>
        <table className="page-compare-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Before TrainTrack</th>
              <th>With AI Grading</th>
            </tr>
          </thead>
          <tbody>
            {savings.map((s, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600, color: 'var(--navy)' }}>{s.label}</td>
                <td className="cross">{s.before}</td>
                <td className="check">{s.after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="page-card">
        <h3>How does AI Grading comply with ASQA?</h3>
        <p>TrainTrack's AI grading is designed as a <strong>trainer-assist tool</strong>, not a replacement. ASQA requires that qualified assessors make final competency decisions — our system ensures:</p>
        <ul>
          <li>Every AI-suggested grade includes the reasoning, visible to the trainer</li>
          <li>Final Competent / Not Yet Competent decisions are always confirmed by a qualified assessor</li>
          <li>Full audit trail of AI suggestion → trainer review → final outcome</li>
          <li>Assessment validation records link AI performance data to continuous improvement actions</li>
        </ul>
      </div>

      <div className="page-cta-box">
        <h2>Give your trainers superhuman speed</h2>
        <p>See AI Grading in action with a live demo using your own assessments.</p>
        <Link to="/company/contact?enquiry=demo" className="btn-primary">Book a Demo</Link>
      </div>
    </PageLayout>
  )
}
