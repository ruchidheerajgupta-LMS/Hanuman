import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [premium, setPremium] = useState(
    () => localStorage.getItem('hm_theme') === 'premium'
  )

  useEffect(() => {
    if (premium) {
      document.documentElement.classList.add('premium')
      localStorage.setItem('hm_theme', 'premium')
    } else {
      document.documentElement.classList.remove('premium')
      localStorage.setItem('hm_theme', 'classic')
    }
  }, [premium])

  return (
    <button className="theme-toggle" onClick={() => setPremium(p => !p)} title="Switch visual theme">
      <span className={`theme-toggle-opt${!premium ? ' active' : ''}`}>◻ Classic</span>
      <span className={`theme-toggle-opt${premium  ? ' active' : ''}`}>✦ Premium</span>
    </button>
  )
}
