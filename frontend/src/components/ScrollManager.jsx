import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Global scroll behaviour for the SPA.
 *
 * React Router does not scroll to `#hash` targets on navigation, so links like
 * `/#audit` (every "Book a Demo" CTA) would land at the top of the homepage
 * instead of the booking form. This watches the location and:
 *   - with a hash → scrolls to that element (retrying while the destination
 *     route mounts its sections), and
 *   - without a hash → resets to the top on each page change.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      let cancelled = false
      let tries = 0
      const tryScroll = () => {
        if (cancelled) return
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        } else if (tries++ < 25) {
          // The target page may still be rendering — retry briefly (~1s max).
          setTimeout(tryScroll, 40)
        }
      }
      tryScroll()
      return () => { cancelled = true }
    }
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname, hash])

  return null
}
