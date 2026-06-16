import { Link } from 'react-router-dom'
import LogoMark from '../ui/LogoMark'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="footer-logo" style={{ textDecoration: 'none' }}>
              <div className="nav-logo-mark"><LogoMark /></div>
              <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 18, color: '#fff' }}>TrainTrack</span>
            </Link>
            <p className="footer-tagline">Australia's RTO Management System. Built for compliance. Designed for efficiency. Priced fairly.</p>
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <div className="footer-badge">ASQA 2025</div>
              <div className="footer-badge">AU Hosted</div>
              <div className="footer-badge">ISO 27001</div>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Product</div>
            <Link to="/product/student-management" className="footer-link">Student Management (SMS)</Link>
            <Link to="/product/learning-management" className="footer-link">Learning Management (LMS)</Link>
            <Link to="/product/compliance-tools" className="footer-link">Compliance Tools</Link>
            <Link to="/product/online-enrolment" className="footer-link">Online Enrolment</Link>
            <Link to="/product/avetmiss-reporting" className="footer-link">AVETMISS Reporting</Link>
            <Link to="/product/ai-grading" className="footer-link">AI Grading</Link>
            <Link to="/product/certificates-qr" className="footer-link">Certificates + QR</Link>
          </div>
          <div>
            <div className="footer-col-title">Compliance</div>
            <Link to="/compliance/standards-rto-2025" className="footer-link">Standards for RTOs 2025</Link>
            <Link to="/compliance/avetmiss-8-guide" className="footer-link">AVETMISS 8 Guide</Link>
            <Link to="/compliance/usi-validation" className="footer-link">USI Validation</Link>
            <Link to="/compliance/asqa-audit-checklist" className="footer-link">ASQA Audit Checklist</Link>
            <Link to="/compliance/trainer-currency" className="footer-link">Trainer Currency</Link>
            <Link to="/compliance/scope-management" className="footer-link">Scope Management</Link>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <Link to="/company/about" className="footer-link">About TrainTrack</Link>
            <a href="/pitch-deck.html" target="_blank" rel="noopener noreferrer" className="footer-link">Product Tour</a>
            <Link to="/company/vs-cloud-assess" className="footer-link">vs Cloud Assess</Link>
            <Link to="/company/vs-eskilled" className="footer-link">vs eSkilled</Link>
            <Link to="/company/pricing" className="footer-link">Pricing</Link>
            <Link to="/company/blog" className="footer-link">Blog</Link>
            <Link to="/company/contact" className="footer-link">Contact</Link>
            <Link to="/manage" className="footer-link">Manage Subscription</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 TrackLearning &middot; ABN 77 965 391 392 &middot; Melbourne, VIC &middot; All rights reserved.</span>
          <span style={{ display: 'flex', gap: 16 }}>
            <span style={{ color: 'rgba(255,255,255,0.35)', cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ color: 'rgba(255,255,255,0.35)', cursor: 'pointer' }}>Terms of Service</span>
            <span style={{ color: 'rgba(255,255,255,0.35)', cursor: 'pointer' }}>Security</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
