import { useState } from 'react'
import api from '../../api/client'

const STUDENT_COUNTS = ['Under 50', '50–150', '150–400', '400–1,000', '1,000+']
const PAIN_POINTS = [
  'AVETMISS exports and errors',
  'Trainer currency tracking',
  'USI compliance',
  'ASQA audit preparation',
  'Double data entry / system silos',
  'Certificate issuance delays',
]

export default function AuditForm() {
  const [form, setForm] = useState({
    name: '', email: '', rto_name: '',
    student_count: '150–400',
    pain_point: 'AVETMISS exports and errors',
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errors, setErrors] = useState([])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrors([])

    try {
      await api.post('/leads/audit-booking', form)
      setStatus('success')
    } catch (err) {
      const data = err.response?.data
      setErrors(data?.errors || [data?.error || 'Something went wrong. Please try again.'])
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="audit-form-card">
        <div className="form-success">
          <h3 style={{ marginBottom: 8 }}>✓ Booked!</h3>
          <p style={{ color: 'var(--text-muted)' }}>Check your email for confirmation. An ex-RTO manager will be in touch within 24 hours.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="audit-form-card fade-up">
      <h3>Book Your Free Audit</h3>
      <p>Takes 2 minutes to book. 15 minutes of your time. Delivered by an ex-RTO manager.</p>
      <form onSubmit={onSubmit}>
        <div className="form-field">
          <label className="form-label" htmlFor="name">Your name</label>
          <input id="name" name="name" className="form-input" placeholder="Sarah Mitchell" value={form.name} onChange={onChange} required />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="email">Work email</label>
          <input id="email" name="email" type="email" className="form-input" placeholder="sarah@yourrto.edu.au" value={form.email} onChange={onChange} required />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="rto_name">RTO name</label>
          <input id="rto_name" name="rto_name" className="form-input" placeholder="Gladstone Training Group" value={form.rto_name} onChange={onChange} required />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="student_count">Number of active students</label>
          <select id="student_count" name="student_count" className="form-select" value={form.student_count} onChange={onChange}>
            {STUDENT_COUNTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="pain_point">Biggest compliance headache right now</label>
          <select id="pain_point" name="pain_point" className="form-select" value={form.pain_point} onChange={onChange}>
            {PAIN_POINTS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {errors.length > 0 && (
          <div className="form-error">{errors.join('. ')}</div>
        )}

        <button type="submit" className="form-submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Booking…' : 'Book My Free Compliance Audit →'}
        </button>
        <p className="form-privacy">🔒 Australian data sovereignty. No spam. You can reschedule anytime.</p>
      </form>
    </div>
  )
}
