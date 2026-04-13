import useScrollAnimation from '../hooks/useScrollAnimation'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
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
