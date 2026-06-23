import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

export default function TrainerCurrency() {
  const requirements = [
    { icon: '🎓', bg: 'var(--teal-light)', title: 'TAE40122 (or equivalent)', desc: 'Certificate IV in Training and Assessment — the minimum qualification for VET trainers and assessors under the 2025 Standards.' },
    { icon: '🏭', bg: 'var(--blue-light)', title: 'Vocational Competency', desc: 'Current industry skills directly relevant to the training being delivered. This means real, recent experience in the industry — not just a qualification.' },
    { icon: '📚', bg: 'var(--amber-light)', title: 'Current Industry Skills', desc: 'Evidence of ongoing engagement with the industry — conferences, site visits, consulting, part-time work, or professional memberships.' },
    { icon: '🔄', bg: 'var(--coral-light)', title: 'Professional Development', desc: 'Continuous improvement of VET knowledge and skills — pedagogical training, assessment moderation, compliance updates, and technology skills.' },
  ]

  const evidence = [
    'Current resume/CV showing recent industry roles',
    'Professional development log (minimum annually)',
    'Industry engagement records — site visits, advisory committees, consulting',
    'Conference and workshop attendance certificates',
    'Professional membership records (e.g., industry associations)',
    'Peer observation and feedback records',
    'Assessment validation participation records',
    'Published articles, presentations, or thought leadership',
  ]

  return (
    <PageLayout title="Trainer Currency" breadcrumb="Trainer Currency">
      <div className="page-content">
        <span className="page-tag page-tag-blue">COMPLIANCE GUIDE</span>
        <h2>Trainer and assessor currency — a practical guide</h2>
        <p>Trainer currency is one of the most scrutinised areas in ASQA audits. The 2025 Standards require RTOs to demonstrate that every trainer and assessor holds current vocational competency and industry skills. Here's how to get it right.</p>
      </div>

      <div className="page-feature-grid">
        {requirements.map((r, i) => (
          <div className="page-feature-card" key={i}>
            <div className="page-feature-icon" style={{ background: r.bg }}>{r.icon}</div>
            <h3>{r.title}</h3>
            <p>{r.desc}</p>
          </div>
        ))}
      </div>

      <div className="page-card">
        <h3>What constitutes evidence of currency?</h3>
        <p>ASQA expects RTOs to maintain documented evidence that trainers remain current in both their vocational area and their training practice. Acceptable evidence includes:</p>
        <ul>
          {evidence.map((e, i) => <li key={i}>{e}</li>)}
        </ul>
      </div>

      <div className="page-card">
        <h3>Common audit findings</h3>
        <ul>
          <li><strong>No documented evidence of industry engagement</strong> — "I still work in the industry" isn't enough. Document it.</li>
          <li><strong>Expired qualifications</strong> — TAE40116 superseded? Trainers need to upgrade or demonstrate equivalence.</li>
          <li><strong>PD records are vague</strong> — "Attended conference" needs details: what conference, what was learned, how it applies.</li>
          <li><strong>No link between PD and training delivery</strong> — Currency evidence must relate to the specific units being delivered.</li>
        </ul>
      </div>

      <div className="page-card">
        <h3>How TrainTrack manages trainer currency</h3>
        <ul>
          <li>Digital trainer profiles with qualification upload, expiry tracking, and automated renewal alerts</li>
          <li>Professional development log with date, activity, relevance, and evidence attachment</li>
          <li>Industry engagement register mapped to scope items</li>
          <li>Dashboard showing trainer coverage per qualification and flagging gaps</li>
          <li>Automatic alerts 90, 60, and 30 days before qualifications expire</li>
        </ul>
      </div>

      <div className="page-cta-box">
        <h2>Never miss a currency expiry</h2>
        <p>TrainTrack automates trainer currency tracking and alerts.</p>
        <Link to="/company/contact?enquiry=demo" className="btn-primary">Book a Demo</Link>
      </div>
    </PageLayout>
  )
}
