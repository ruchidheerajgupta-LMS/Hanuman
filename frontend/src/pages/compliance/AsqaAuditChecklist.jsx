import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

export default function AsqaAuditChecklist() {
  const categories = [
    {
      title: 'Pre-Audit Preparation',
      items: [
        'Confirm audit scope and date with ASQA',
        'Identify which standards/clauses are under review',
        'Assign an internal audit coordinator',
        'Brief all staff on the audit process and their roles',
        'Prepare a quiet, professional space for auditors',
      ]
    },
    {
      title: 'Governance & Administration (Standard 1)',
      items: [
        'Fit and proper person declarations for all key personnel',
        'Current public liability and professional indemnity insurance',
        'Financial viability evidence (audited accounts or bank statements)',
        'Organisational chart with roles and responsibilities',
        'Business continuity and disaster recovery plans',
        'Privacy policy and data protection procedures',
      ]
    },
    {
      title: 'Training & Assessment (Standard 2)',
      items: [
        'Training and Assessment Strategy (TAS) for each qualification on scope',
        'Evidence of industry consultation for TAS development',
        'Assessment tools with mapping to unit requirements',
        'Assessment validation records (schedule, panel, outcomes, improvements)',
        'Trainer qualifications — TAE40122 or equivalent + current industry skills',
        'Evidence of trainer professional development and industry currency',
        'Reasonable adjustment procedures and evidence',
        'RPL policy and assessment tools',
      ]
    },
    {
      title: 'Student Records & Support (Standard 3)',
      items: [
        'Enrolment records with all AVETMISS-required fields',
        'Student handbook or pre-enrolment information',
        'Complaints and appeals policy with register',
        'Fee schedule, refund policy, and receipts',
        'Student support services documentation',
        'USI verification records for all students',
      ]
    },
    {
      title: 'Data & Reporting (Standard 5)',
      items: [
        'Most recent AVETMISS submission with validation report',
        'Evidence of data quality checks before lodgement',
        'Scope of registration documentation (training.gov.au)',
        'Marketing materials reviewed for accuracy and compliance',
        'Third-party arrangement agreements and monitoring evidence',
      ]
    },
  ]

  return (
    <PageLayout title="ASQA Audit Checklist" breadcrumb="ASQA Audit Checklist">
      <div className="page-content">
        <span className="page-tag page-tag-blue">COMPLIANCE GUIDE</span>
        <h2>The ultimate ASQA audit preparation checklist</h2>
        <p>Whether you're facing a site audit, desk audit, or compliance assessment, this checklist covers every document and piece of evidence ASQA typically requests. Use it to identify gaps before the auditor does.</p>
      </div>

      {categories.map((cat, ci) => (
        <div className="page-card" key={ci}>
          <h3>{cat.title}</h3>
          <ul>
            {cat.items.map((item, ii) => (
              <li key={ii}>{item}</li>
            ))}
          </ul>
        </div>
      ))}

      <div className="page-card">
        <h3>How TrainTrack makes audits painless</h3>
        <p>Every item on this checklist maps to a feature in TrainTrack. Instead of scrambling to gather documents from filing cabinets and shared drives, pull up audit-ready evidence from a single platform:</p>
        <ul>
          <li><strong>Compliance dashboard</strong> shows your readiness score across all standards</li>
          <li><strong>Evidence repository</strong> links documents to specific clauses</li>
          <li><strong>Self-audit checklists</strong> with sign-off tracking built in</li>
          <li><strong>One-click AVETMISS exports</strong> with pre-submission validation</li>
          <li><strong>Trainer profiles</strong> with qualification expiry alerts</li>
        </ul>
      </div>

      <div className="page-cta-box">
        <h2>Get audit-ready with TrainTrack</h2>
        <p>Book a free compliance audit and we'll help you identify gaps.</p>
        <Link to="/#audit" className="btn-primary">Get a Free Compliance Audit</Link>
      </div>
    </PageLayout>
  )
}
