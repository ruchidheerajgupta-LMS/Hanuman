import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ThemeToggle from './components/ui/ThemeToggle'
import HomePage from './pages/HomePage'
import ManageLogin from './pages/ManageLogin'
import ForgotPassword from './pages/ForgotPassword'
import EndUserAgreement from './pages/legal/EndUserAgreement'
import PrivacyPolicy from './pages/legal/PrivacyPolicy'

// Product pages
import StudentManagement from './pages/product/StudentManagement'
import LearningManagement from './pages/product/LearningManagement'
import ComplianceTools from './pages/product/ComplianceTools'
import OnlineEnrolment from './pages/product/OnlineEnrolment'
import AvetmissReporting from './pages/product/AvetmissReporting'
import AiGrading from './pages/product/AiGrading'
import CertificatesQR from './pages/product/CertificatesQR'

// Compliance pages
import StandardsRto2025 from './pages/compliance/StandardsRto2025'
import Avetmiss8Guide from './pages/compliance/Avetmiss8Guide'
import UsiValidation from './pages/compliance/UsiValidation'
import AsqaAuditChecklist from './pages/compliance/AsqaAuditChecklist'
import TrainerCurrency from './pages/compliance/TrainerCurrency'
import ScopeManagement from './pages/compliance/ScopeManagement'

// Company pages
import About from './pages/company/About'
import VsCloudAssess from './pages/company/VsCloudAssess'
import VsEskilled from './pages/company/VsEskilled'
import PricingPage from './pages/company/PricingPage'
import Blog from './pages/company/Blog'
import Contact from './pages/company/Contact'
import PitchDeck from './pages/PitchDeck'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Product */}
        <Route path="/product/student-management" element={<StudentManagement />} />
        <Route path="/product/learning-management" element={<LearningManagement />} />
        <Route path="/product/compliance-tools" element={<ComplianceTools />} />
        <Route path="/product/online-enrolment" element={<OnlineEnrolment />} />
        <Route path="/product/avetmiss-reporting" element={<AvetmissReporting />} />
        <Route path="/product/ai-grading" element={<AiGrading />} />
        <Route path="/product/certificates-qr" element={<CertificatesQR />} />

        {/* Compliance */}
        <Route path="/compliance/standards-rto-2025" element={<StandardsRto2025 />} />
        <Route path="/compliance/avetmiss-8-guide" element={<Avetmiss8Guide />} />
        <Route path="/compliance/usi-validation" element={<UsiValidation />} />
        <Route path="/compliance/asqa-audit-checklist" element={<AsqaAuditChecklist />} />
        <Route path="/compliance/trainer-currency" element={<TrainerCurrency />} />
        <Route path="/compliance/scope-management" element={<ScopeManagement />} />

        {/* Company */}
        <Route path="/company/about" element={<About />} />
        <Route path="/company/vs-cloud-assess" element={<VsCloudAssess />} />
        <Route path="/company/vs-eskilled" element={<VsEskilled />} />
        <Route path="/company/pricing" element={<PricingPage />} />
        <Route path="/company/blog" element={<Blog />} />
        <Route path="/company/contact" element={<Contact />} />

        {/* Product tour / pitch deck */}
        <Route path="/pitch-deck" element={<PitchDeck />} />

        {/* Management */}
        <Route path="/manage" element={<ManageLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Legal */}
        <Route path="/end-user-agreement" element={<EndUserAgreement />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  )
}
