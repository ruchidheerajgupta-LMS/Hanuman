import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import LogoMark from '../ui/LogoMark'

const NAV_LINKS = [
  { label: 'Product', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Compliance', href: '#compliance' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Why Us', href: '#about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = useCallback((selector) => {
    if (isHome) {
      const el = document.querySelector(selector)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/' + selector)
    }
  }, [isHome, navigate])

  const goHome = useCallback((e) => {
    e.preventDefault()
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }, [isHome, navigate])

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <a href="/" className="nav-logo" onClick={goHome}>
          <div className="nav-logo-mark"><LogoMark /></div>
          <span className="nav-logo-text">TrainTrack</span>
        </a>
        <div className="nav-links">
          {NAV_LINKS.map(({ label, href, isRoute }) => (
            <button key={href} className="nav-link" onClick={() => isRoute ? navigate(href) : scrollTo(href)}>
              {label}
            </button>
          ))}
        </div>
        <button className="nav-cta-ghost" onClick={() => navigate('/manage')}>Sign In</button>
        <button className="nav-cta-primary" onClick={() => scrollTo('#audit')}>Book Compliance Audit</button>
      </div>
    </nav>
  )
}
