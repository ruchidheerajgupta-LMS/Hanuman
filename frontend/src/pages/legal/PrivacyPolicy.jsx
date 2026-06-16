import { Link } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'

export default function PrivacyPolicy() {
  return (
    <PageLayout title="Privacy Policy" breadcrumb="Privacy Policy">
      <div className="page-content legal-page">
        <p className="legal-effective">Effective Date: 1 January 2026</p>

        <p>
          TrackLearning (ABN 77 965 391 392), trading as TrainTrack (&ldquo;TrainTrack&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
          is committed to protecting the privacy of your personal information. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you use the TrainTrack platform, in compliance
          with the Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
        </p>

        <h2>1. Information We Collect</h2>
        <h3>1.1 Personal Information</h3>
        <p>We may collect the following personal information:</p>
        <ul>
          <li>Full name, email address, phone number</li>
          <li>Date of birth, gender, and nationality</li>
          <li>Residential address</li>
          <li>Unique Student Identifier (USI)</li>
          <li>Emergency contact details</li>
          <li>Language and disability information (for AVETMISS reporting)</li>
          <li>Student numbers and enrolment records</li>
          <li>Assessment submissions and grades</li>
          <li>Attendance records</li>
        </ul>

        <h3>1.2 Technical Information</h3>
        <ul>
          <li>IP addresses and browser type</li>
          <li>Login timestamps and session data</li>
          <li>Device information</li>
        </ul>

        <h2>2. How We Collect Information</h2>
        <p>We collect personal information:</p>
        <ul>
          <li>Directly from you when you register or use the platform</li>
          <li>From your RTO when they create your account or enrol you</li>
          <li>Automatically through cookies and server logs when you access the platform</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use your personal information to:</p>
        <ul>
          <li>Provide and maintain the TrainTrack platform services</li>
          <li>Manage student enrolments, assessments, and attendance</li>
          <li>Generate AVETMISS reports as required by the National VET Data Policy</li>
          <li>Verify USI numbers with the USI Registry</li>
          <li>Issue qualifications and statements of attainment</li>
          <li>Communicate important platform and account updates</li>
          <li>Improve platform performance and user experience</li>
          <li>Comply with Australian regulatory requirements</li>
        </ul>

        <h2>4. Data Sharing &amp; Disclosure</h2>
        <p>We may share your personal information with:</p>
        <ul>
          <li><strong>Your RTO:</strong> Administrators, trainers, and assessors at your Registered Training Organisation who require access to perform their duties</li>
          <li><strong>Government bodies:</strong> NCVER, ASQA, and state/territory training authorities as required for AVETMISS reporting and compliance</li>
          <li><strong>USI Registry:</strong> For Unique Student Identifier verification</li>
        </ul>
        <p>We do <strong>not</strong> sell, rent, or trade your personal information to third parties for marketing purposes.</p>

        <h2>5. Data Storage &amp; Security</h2>
        <ul>
          <li>All data is stored on Australian-hosted servers</li>
          <li>We use industry-standard encryption (TLS/SSL) for data in transit</li>
          <li>Passwords are hashed using bcrypt and never stored in plain text</li>
          <li>Multi-tenant data isolation ensures your RTO&rsquo;s data is logically separated from other organisations</li>
          <li>JWT-based authentication with HttpOnly secure cookies</li>
          <li>Account lockout after repeated failed login attempts</li>
          <li>Regular security audits and vulnerability assessments</li>
        </ul>

        <h2>6. Data Retention</h2>
        <p>
          We retain personal information for as long as necessary to provide our services and comply with legal obligations.
          Student training records are retained in accordance with the Standards for RTOs 2015, which require a minimum of
          30 years for completion records and 7 years for other records.
        </p>

        <h2>7. Your Rights</h2>
        <p>Under the Australian Privacy Principles, you have the right to:</p>
        <ul>
          <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
          <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
          <li><strong>Complaint:</strong> Lodge a complaint if you believe your privacy has been breached</li>
        </ul>
        <p>
          To exercise these rights, contact your RTO administrator or reach out to us directly.
        </p>

        <h2>8. Cookies</h2>
        <p>
          The TrainTrack platform uses essential cookies for authentication and session management.
          These cookies are HttpOnly and Secure, meaning they cannot be accessed by client-side
          scripts and are only transmitted over encrypted connections.
        </p>

        <h2>9. Children&rsquo;s Privacy</h2>
        <p>
          The TrainTrack platform is not intended for use by individuals under the age of 15.
          If an RTO enrols students under 18, the RTO is responsible for obtaining appropriate
          parental or guardian consent.
        </p>

        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page
          with an updated effective date. We encourage you to review this policy periodically.
        </p>

        <h2>11. Contact Us</h2>
        <p>If you have questions or concerns about this Privacy Policy or our data practices, contact:</p>
        <ul>
          <li><strong>Privacy Officer:</strong> TrackLearning</li>
          <li>Email: <a href="mailto:contact@traintrack.work">contact@traintrack.work</a></li>
        </ul>
        <p>
          You may also lodge a complaint with the Office of the Australian Information Commissioner (OAIC)
          at <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer">www.oaic.gov.au</a>.
        </p>

        <div className="legal-back">
          <Link to="/manage">&larr; Back to Sign In</Link>
        </div>
      </div>
    </PageLayout>
  )
}
