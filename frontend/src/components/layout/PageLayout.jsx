import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import useScrollAnimation from '../../hooks/useScrollAnimation'

export default function PageLayout({ children, title, breadcrumb }) {
  const ref = useScrollAnimation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div ref={ref}>
      <Navbar />
      <div className="page-hero">
        <div className="page-hero-bg" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <span>{breadcrumb || title}</span>
          </nav>
          <h1>{title}</h1>
        </div>
      </div>
      <div className="page-body">
        <div className="container">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  )
}
