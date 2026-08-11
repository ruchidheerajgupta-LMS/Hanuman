import { useNavigate } from 'react-router-dom'
import LogoMark from '../components/ui/LogoMark'
import Seo from '../components/layout/Seo'

export default function PitchDeck() {
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#000' }}>
      <Seo title="Product Overview" path="/pitch-deck" noindex />
      {/* Thin header bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', height: 48, flexShrink: 0,
        background: 'rgba(15,23,42,0.95)', borderBottom: '1px solid rgba(255,255,255,0.08)',
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 24, height: 24 }}><LogoMark /></div>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 14, fontFamily: "'DM Serif Display', serif" }}>
            TrainTrack
          </span>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, marginLeft: 4 }}>/ Product Overview</span>
        </div>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.7)', borderRadius: 6, padding: '5px 14px',
            fontSize: 13, cursor: 'pointer', fontWeight: 500,
          }}
        >
          ← Back
        </button>
      </div>

      {/* Full-viewport iframe */}
      <iframe
        src="/pitch-deck.html"
        title="TrainTrack Product Overview"
        style={{ flex: 1, border: 'none', display: 'block' }}
        allow="fullscreen"
      />
    </div>
  )
}
