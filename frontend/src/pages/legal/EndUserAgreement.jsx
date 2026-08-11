import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

export default function EndUserAgreement() {
  return (
    <PageLayout title="End User Agreement" breadcrumb="End User Agreement" description="TrainTrack's end user agreement — terms and conditions for using our RTO management platform.">
      <div className="page-content legal-page">
        <p className="legal-effective">Effective Date: 1 January 2026</p>

        <p>
          This End User Agreement (&ldquo;Agreement&rdquo;) is a legal agreement between you (&ldquo;User&rdquo;, &ldquo;you&rdquo;)
          and TrackLearning (ABN 77 965 391 392), trading as TrainTrack (&ldquo;TrainTrack&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) for use of the
          TrainTrack platform, including all associated services, websites, and applications.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the TrainTrack platform, you agree to be bound by this Agreement and our{' '}
          <Link to="/privacy-policy">Privacy Policy</Link>. If you do not agree to these terms, you must not use the platform.
        </p>

        <h2>2. Account Registration &amp; Security</h2>
        <ul>
          <li>You must provide accurate, complete, and current information during registration.</li>
          <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
          <li>You must notify your RTO administrator immediately of any unauthorised use of your account.</li>
          <li>Accounts are provided by your Registered Training Organisation (RTO) and are subject to their policies.</li>
        </ul>

        <h2>3. Permitted Use</h2>
        <p>The TrainTrack platform is provided for legitimate RTO management purposes, including:</p>
        <ul>
          <li>Student enrolment and lifecycle management</li>
          <li>Assessment creation, submission, and grading</li>
          <li>Attendance tracking and timetable management</li>
          <li>AVETMISS reporting and compliance management</li>
          <li>Communication between staff and students</li>
        </ul>

        <h2>4. Prohibited Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the platform for any unlawful purpose or in violation of any applicable laws</li>
          <li>Attempt to gain unauthorised access to other user accounts or system resources</li>
          <li>Upload malicious software, viruses, or harmful code</li>
          <li>Share your login credentials with any other person</li>
          <li>Scrape, data-mine, or extract data from the platform by automated means</li>
          <li>Interfere with or disrupt the integrity or performance of the platform</li>
          <li>Use the platform to harass, abuse, or harm another person</li>
        </ul>

        <h2>5. Intellectual Property</h2>
        <p>
          All content, features, and functionality of the TrainTrack platform — including software, text, graphics,
          logos, and design — are owned by TrackLearning and are protected by Australian and international
          intellectual property laws. Your use of the platform does not grant you any ownership rights.
        </p>

        <h2>6. Data &amp; Privacy</h2>
        <p>
          Your use of the platform is also governed by our <Link to="/privacy-policy">Privacy Policy</Link>,
          which describes how we collect, use, store, and protect your personal information in accordance
          with the Australian Privacy Act 1988 and the Australian Privacy Principles (APPs).
        </p>

        <h2>7. Multi-Tenant Architecture</h2>
        <p>
          TrainTrack operates a multi-tenant architecture where each RTO&rsquo;s data is logically isolated.
          You may only access data belonging to the RTO that issued your account. Cross-tenant data access
          is strictly prohibited and may result in immediate account termination.
        </p>

        <h2>8. Service Availability</h2>
        <ul>
          <li>We aim for 99.9% platform uptime but do not guarantee uninterrupted access.</li>
          <li>Scheduled maintenance will be communicated in advance where possible.</li>
          <li>We are not liable for service interruptions caused by factors beyond our control.</li>
        </ul>

        <h2>9. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by Australian law, TrainTrack&rsquo;s liability for any claim
          arising from your use of the platform is limited to the fees paid by your RTO for the
          service in the 12 months preceding the claim. We are not liable for indirect, incidental,
          or consequential damages.
        </p>

        <h2>10. Termination</h2>
        <p>
          Your access to the platform may be suspended or terminated by your RTO administrator
          or by TrainTrack at any time for breach of this Agreement. Upon termination, your right
          to use the platform ceases immediately.
        </p>

        <h2>11. Changes to This Agreement</h2>
        <p>
          We may update this Agreement from time to time. Material changes will be communicated
          via the platform or email. Continued use of the platform after changes constitutes
          acceptance of the updated terms.
        </p>

        <h2>12. Governing Law</h2>
        <p>
          This Agreement is governed by the laws of the State of Victoria, Australia. Any disputes
          arising from this Agreement will be subject to the exclusive jurisdiction of the courts
          of Victoria.
        </p>

        <h2>13. Contact</h2>
        <p>For questions about this Agreement, contact us at:</p>
        <ul>
          <li>Email: <a href="mailto:contact@traintrack.work">contact@traintrack.work</a></li>
        </ul>

        <div className="legal-back">
          <Link to="/manage">&larr; Back to Sign In</Link>
        </div>
      </div>
    </PageLayout>
  )
}
