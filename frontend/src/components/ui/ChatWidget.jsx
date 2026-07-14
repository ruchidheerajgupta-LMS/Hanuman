import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import api from '../../api/client'

// Keep the launcher off full-screen / utility pages.
const HIDDEN_PREFIXES = ['/pitch-deck', '/manage', '/forgot-password']

// Owner WhatsApp number — digits only for wa.me. Overridable at build time via
// VITE_WHATSAPP_NUMBER; defaults to the configured business number.
const WHATSAPP_NUMBER = String(import.meta.env.VITE_WHATSAPP_NUMBER || '61475290060').replace(/\D/g, '')

function ChatGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}

function WhatsAppGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35zM12.05 21.5a9.5 9.5 0 0 1-4.85-1.33l-.35-.2-3.6.94.96-3.51-.23-.36a9.46 9.46 0 0 1-1.45-5.05c0-5.24 4.27-9.5 9.52-9.5 2.54 0 4.93.99 6.73 2.79a9.44 9.44 0 0 1 2.79 6.72c0 5.24-4.27 9.5-9.52 9.5zm8.09-17.6A11.44 11.44 0 0 0 12.05.5C5.8.5.73 5.57.73 11.81c0 2.01.53 3.97 1.53 5.7L.64 23.5l6.13-1.61a11.36 11.36 0 0 0 5.28 1.34c6.25 0 11.32-5.07 11.32-11.31 0-3.02-1.18-5.86-3.32-8z" />
    </svg>
  )
}

export default function ChatWidget() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  if (HIDDEN_PREFIXES.some(p => pathname.startsWith(p))) return null

  const startWhatsApp = () => {
    const name = form.name.trim()
    const email = form.email.trim()
    const message = form.message.trim()

    // Best-effort lead capture (also emails the owner). Only when we have enough
    // to store a valid contact — never blocks the WhatsApp hand-off.
    if (name && email && message) {
      api.post('/contact', {
        name,
        email,
        subject: 'Website chat enquiry',
        message,
      }).catch(() => {})
    }

    const parts = ['Hi TrainTrack team,']
    if (name) parts.push(`I'm ${name}.`)
    parts.push(message || "I'd like to have a quick chat.")
    const text = encodeURIComponent(parts.join(' '))
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener')
  }

  return (
    <>
      {open && (
        <div className="chat-widget-panel" role="dialog" aria-label="Chat with us">
          <div className="chat-widget-head">
            <div className="chat-widget-head-main">
              <div className="chat-widget-avatar">TT</div>
              <div>
                <div className="chat-widget-title">TrainTrack Team</div>
                <div className="chat-widget-sub">
                  <span className="chat-widget-dot" /> Typically replies within a few hours
                </div>
              </div>
            </div>
            <button className="chat-widget-close" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </div>

          <div className="chat-widget-body">
            <div className="chat-widget-greeting">
              👋 Hi there! Ask us anything — pricing, a demo, or a quick question.
              Add your details and we'll pick it up on WhatsApp.
            </div>
            <input
              className="chat-widget-input"
              placeholder="Your name"
              value={form.name}
              onChange={e => set('name', e.target.value)}
            />
            <input
              className="chat-widget-input"
              type="email"
              placeholder="Work email (so we can follow up)"
              value={form.email}
              onChange={e => set('email', e.target.value)}
            />
            <textarea
              className="chat-widget-input chat-widget-textarea"
              placeholder="How can we help?"
              rows={3}
              value={form.message}
              onChange={e => set('message', e.target.value)}
            />
            <button className="chat-widget-cta" onClick={startWhatsApp}>
              <WhatsAppGlyph /> Continue on WhatsApp
            </button>
            <a className="chat-widget-alt" href="/company/contact">Prefer email? Contact us →</a>
          </div>
        </div>
      )}

      <button
        className={`chat-widget-launcher${open ? ' is-open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : 'Chat with us'}
      >
        {open ? <span className="chat-widget-launcher-x">×</span> : <ChatGlyph />}
        {!open && <span className="chat-widget-launcher-label">Chat with us</span>}
      </button>
    </>
  )
}
