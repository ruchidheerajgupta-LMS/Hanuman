import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

export default function Blog() {
  const posts = [
    {
      tag: 'Compliance', tagClass: 'page-tag-blue',
      title: 'Understanding the Standards for RTOs 2025: What Changed and Why It Matters',
      excerpt: 'The new Standards for RTOs 2025 replace the 2015 framework with strengthened governance requirements, outcome-focused compliance, and enhanced student protections. Here\'s what every RTO needs to know.',
      date: 'April 2026',
      link: '/compliance/standards-rto-2025',
    },
    {
      tag: 'Product', tagClass: 'page-tag-teal',
      title: 'How AI Grading Is Saving Trainers 10+ Hours Per Week',
      excerpt: 'We studied trainers using TrainTrack\'s AI grading across 3,000 written assessments. The results: 85% faster feedback delivery with 95% alignment to human-graded outcomes.',
      date: 'March 2026',
      link: '/product/ai-grading',
    },
    {
      tag: 'Compliance', tagClass: 'page-tag-blue',
      title: 'The Complete AVETMISS 8 Troubleshooting Guide',
      excerpt: 'Missing USIs, invalid outcome codes, date mismatches — we cover the 10 most common AVETMISS validation errors and how to fix them before NCVER rejects your submission.',
      date: 'February 2026',
      link: '/compliance/avetmiss-8-guide',
    },
    {
      tag: 'Industry', tagClass: 'page-tag-amber',
      title: 'Trainer Currency in 2026: Going Beyond the Minimum',
      excerpt: 'ASQA auditors are looking for more than a TAE and a CV. This guide covers what genuine industry currency looks like and how to document it properly.',
      date: 'January 2026',
      link: '/compliance/trainer-currency',
    },
    {
      tag: 'Product', tagClass: 'page-tag-teal',
      title: 'QR-Verified Certificates: Why Employers Love Them',
      excerpt: 'Fraudulent qualifications cost Australian industries millions. TrainTrack\'s QR-verified certificates let employers verify authenticity in seconds — here\'s how we built it.',
      date: 'December 2025',
      link: '/product/certificates-qr',
    },
    {
      tag: 'Compliance', tagClass: 'page-tag-blue',
      title: 'Preparing for Your First ASQA Audit: A Survival Guide',
      excerpt: 'First ASQA audit? Don\'t panic. This step-by-step guide covers what to expect, what documents to prepare, and the most common findings for new RTOs.',
      date: 'November 2025',
      link: '/compliance/asqa-audit-checklist',
    },
  ]

  return (
    <PageLayout title="Blog" breadcrumb="Blog">
      <div className="page-content">
        <h2>Insights for Australian RTOs</h2>
        <p>Practical guides, compliance updates, and product news from the TrainTrack team. Written by people who understand VET.</p>
      </div>

      <div className="page-feature-grid" style={{ marginTop: '2rem' }}>
        {posts.map((p, i) => (
          <Link to={p.link} key={i} className="page-feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span className={`page-tag ${p.tagClass}`}>{p.tag.toUpperCase()}</span>
            <h3 style={{ marginTop: 8 }}>{p.title}</h3>
            <p>{p.excerpt}</p>
            <p style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 0 }}>{p.date}</p>
          </Link>
        ))}
      </div>

      <div className="page-cta-box">
        <h2>Stay in the loop</h2>
        <p>Get compliance updates and product news delivered to your inbox.</p>
        <Link to="/#audit" className="btn-primary">Subscribe</Link>
      </div>
    </PageLayout>
  )
}
