import { useEffect, useRef } from 'react'

export default function useScrollAnimation() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.12 }
    )

    const targets = el.querySelectorAll('.fade-up')
    targets.forEach((t) => observer.observe(t))

    return () => targets.forEach((t) => observer.unobserve(t))
  }, [])

  return ref
}
