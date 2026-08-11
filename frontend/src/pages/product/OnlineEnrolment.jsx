import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

export default function OnlineEnrolment() {
  const steps = [
    { title: 'Student fills out the form', desc: 'Branded, mobile-friendly enrolment form captures all AVETMISS-required fields, USI, LLN declaration, and payment details.' },
    { title: 'Automatic validation', desc: 'USI is collected and recorded against the student profile, address is standardised, and duplicate detection flags existing students.' },
    { title: 'Enrolment created instantly', desc: 'Approved enrolments auto-create student profiles, assign to the correct course/cohort, and trigger welcome emails.' },
    { title: 'Payment processed', desc: 'Integrated Stripe payments handle deposits, instalments, and VET Student Loans. Receipts sent automatically.' },
  ]

  const features = [
    { icon: '🎨', bg: 'var(--teal-light)', title: 'Custom Branding', desc: 'Your logo, colours, and domain. Students never leave your branded experience.' },
    { icon: '📱', bg: 'var(--blue-light)', title: 'Mobile-Optimised', desc: 'Responsive forms that work perfectly on phones, tablets, and desktops.' },
    { icon: '🔗', bg: 'var(--amber-light)', title: 'Embeddable Widget', desc: 'Drop the enrolment form directly onto your existing website with a single line of code.' },
    { icon: '💳', bg: 'var(--coral-light)', title: 'Payment Flexibility', desc: 'Full payment, deposits, instalments, invoice-later, or VET Student Loans — configure per course.' },
  ]

  return (
    <PageLayout title="Online Enrolment" breadcrumb="Online Enrolment" description="Digital online enrolment for Australian RTOs — capture, validate, and process student enrolments without the paperwork.">
      <div className="page-content">
        <span className="page-tag page-tag-teal">CORE MODULE</span>
        <h2>From enquiry to enrolled — in minutes, not days</h2>
        <p>Replace PDF forms and manual data entry with a sleek online enrolment experience that captures every AVETMISS field, collects and records USIs, and creates student records automatically.</p>
      </div>

      <div className="page-card">
        <h3>How it works</h3>
        {steps.map((s, i) => (
          <div className="page-step" key={i}>
            <div className="page-step-num">{i + 1}</div>
            <div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
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

      <div className="page-cta-box">
        <h2>Automate your enrolment process</h2>
        <p>RTOs using TrainTrack Online Enrolment see 3x faster processing times.</p>
        <Link to="/company/contact?enquiry=demo" className="btn-primary">Book a Demo</Link>
      </div>
    </PageLayout>
  )
}
