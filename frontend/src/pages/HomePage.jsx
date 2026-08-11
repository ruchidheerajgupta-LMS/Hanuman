import useScrollAnimation from '../hooks/useScrollAnimation'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Seo from '../components/layout/Seo'
import OrganizationSchema from '../components/layout/OrganizationSchema'
import Hero from '../components/sections/Hero'
import ProofBar from '../components/sections/ProofBar'
import ProblemSection from '../components/sections/ProblemSection'
import FeaturePillars from '../components/sections/FeaturePillars'
import DashboardDemo from '../components/sections/DashboardDemo'
import KillerFeatures from '../components/sections/KillerFeatures'
import Pricing from '../components/sections/Pricing'
import CompareTable from '../components/sections/CompareTable'
import Integrations from '../components/sections/Integrations'
import Testimonials from '../components/sections/Testimonials'
import AuditCTA from '../components/sections/AuditCTA'

export default function HomePage() {
  const ref = useScrollAnimation()

  return (
    <div ref={ref}>
      <Seo
        title="TrainTrack — Australia's RTO Management System"
        description="TrainTrack merges your SMS and LMS into one ASQA-aligned platform. AVETMISS exports in two clicks. USI validated automatically. Built for Australian RTOs."
        path="/"
        rawTitle
      />
      <OrganizationSchema />
      <Navbar />
      <Hero />
      <ProofBar />
      <ProblemSection />
      <FeaturePillars />
      <DashboardDemo />
      <KillerFeatures />
      <Pricing />
      <CompareTable />
      <Integrations />
      <Testimonials />
      <AuditCTA />
      <Footer />
    </div>
  )
}
