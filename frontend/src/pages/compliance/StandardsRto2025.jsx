import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

export default function StandardsRto2025() {
  const clauses = [
    { num: '1', title: 'RTO Governance & Administration', desc: 'Fit and proper person requirements, financial viability, insurance obligations, and management system expectations.', tag: 'Governance' },
    { num: '2', title: 'Training & Assessment', desc: 'Trainer qualifications, assessment validation, competency-based delivery, industry engagement, and training package currency.', tag: 'Core' },
    { num: '3', title: 'Student Rights & Welfare', desc: 'Student support, complaints and appeals, fees and refunds, USI, and vulnerable learner protections.', tag: 'Students' },
    { num: '4', title: 'Stakeholder Engagement', desc: 'Industry consultation, graduate outcomes, employer feedback, and continuous improvement from stakeholder input.', tag: 'Industry' },
    { num: '5', title: 'Compliance & Reporting', desc: 'AVETMISS data quality, scope management, marketing accuracy, third-party arrangements, and regulatory notifications.', tag: 'Reporting' },
  ]

  return (
    <PageLayout title="Standards for RTOs 2025" breadcrumb="Standards for RTOs 2025">
      <div className="page-content">
        <span className="page-tag page-tag-blue">COMPLIANCE GUIDE</span>
        <h2>Your complete guide to the updated Standards for RTOs 2025</h2>
        <p>The Standards for Registered Training Organisations 2025 replace the 2015 standards with strengthened requirements around governance, training quality, and student outcomes. Here's what every RTO needs to know.</p>
      </div>

      <div className="page-card">
        <h3>Key changes from 2015 to 2025</h3>
        <ul>
          <li><strong>Strengthened governance</strong> — New fit-and-proper requirements for key personnel and directors</li>
          <li><strong>Outcome-focused</strong> — Greater emphasis on student and employer outcomes, not just process compliance</li>
          <li><strong>Industry engagement</strong> — Mandatory structured industry consultation for TAS development and validation</li>
          <li><strong>Student protections</strong> — Enhanced obligations for fee transparency, refund policies, and vulnerable learner support</li>
          <li><strong>Data quality</strong> — Higher expectations for AVETMISS accuracy and timely reporting</li>
          <li><strong>Third-party oversight</strong> — Stricter controls on partnership and subcontracting arrangements</li>
        </ul>
      </div>

      {clauses.map((c, i) => (
        <div className="page-card" key={i}>
          <span className="page-tag page-tag-blue">{c.tag.toUpperCase()}</span>
          <h3>Standard {c.num}: {c.title}</h3>
          <p>{c.desc}</p>
        </div>
      ))}

      <div className="page-card">
        <h3>How TrainTrack helps you comply</h3>
        <p>TrainTrack is updated to the 2025 standards. Our compliance tools include pre-built checklists, evidence mapping, and automated data quality checks — so you can demonstrate compliance without manual effort.</p>
        <ul>
          <li>Self-audit checklists mapped to every 2025 clause</li>
          <li>Evidence repository linked to specific standards</li>
          <li>Continuous improvement register with action tracking</li>
          <li>AVETMISS validation ensuring data quality before lodgement</li>
          <li>Trainer currency tracking with automatic expiry alerts</li>
        </ul>
      </div>

      <div className="page-cta-box">
        <h2>Ready for the 2025 Standards?</h2>
        <p>Get a free compliance gap analysis from our team.</p>
        <Link to="/#audit" className="btn-primary">Get a Free Compliance Audit</Link>
      </div>
    </PageLayout>
  )
}
