import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

export default function ComplianceTools() {
  const features = [
    { icon: '✅', bg: 'var(--teal-light)', title: 'Compliance Dashboard', desc: 'A single screen showing your RTO\'s compliance health — scope coverage, trainer currency, student outcomes, and AVETMISS readiness.' },
    { icon: '📋', bg: 'var(--blue-light)', title: 'Self-Audit Checklists', desc: 'Pre-built checklists aligned to the Standards for RTOs 2025. Work through each clause with evidence links and sign-off tracking.' },
    { icon: '🔄', bg: 'var(--amber-light)', title: 'Continuous Improvement', desc: 'Log improvement actions, link them to specific standards clauses, and track progress with due dates and responsible owners.' },
    { icon: '📊', bg: 'var(--coral-light)', title: 'Risk Register', desc: 'Identify, assess, and mitigate compliance risks with a built-in risk matrix, automatic alerts, and review schedules.' },
    { icon: '📁', bg: 'var(--teal-light)', title: 'Evidence Repository', desc: 'Centralised document storage mapped to standards clauses. When ASQA comes knocking, every piece of evidence is a click away.' },
    { icon: '🔔', bg: 'var(--blue-light)', title: 'Proactive Alerts', desc: 'Automated notifications for expiring trainer qualifications, scope changes, policy review dates, and reporting deadlines.' },
  ]

  return (
    <PageLayout title="Compliance Tools" breadcrumb="Compliance Tools">
      <div className="page-content">
        <span className="page-tag page-tag-blue">COMPLIANCE</span>
        <h2>Stay audit-ready every single day</h2>
        <p>TrainTrack's compliance tools are designed by ex-auditors who understand what ASQA looks for. Stop scrambling before audits — maintain continuous compliance instead.</p>
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
        <h3>Built for the Standards for RTOs 2025</h3>
        <p>Every compliance tool is mapped to the updated 2025 standards. As regulations change, TrainTrack updates — so you don't have to rebuild your compliance framework from scratch.</p>
      </div>

      <div className="page-cta-box">
        <h2>Never fear an ASQA audit again</h2>
        <p>See how TrainTrack keeps your RTO audit-ready.</p>
        <Link to="/#audit" className="btn-primary">Get a Free Compliance Audit</Link>
      </div>
    </PageLayout>
  )
}
