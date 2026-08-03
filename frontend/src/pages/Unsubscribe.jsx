import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'
import api from '../api/client'

export default function Unsubscribe() {
  const [searchParams] = useSearchParams()
  const email = (searchParams.get('email') || '').trim()

  const [status, setStatus] = useState('idle') // idle | working | done | error
  const [error, setError] = useState(null)

  const handleConfirm = async () => {
    setStatus('working')
    setError(null)
    try {
      await api.post(`/unsubscribe?email=${encodeURIComponent(email)}`)
      setStatus('done')
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again, or email us directly.')
      setStatus('error')
    }
  }

  return (
    <PageLayout title="Unsubscribe" breadcrumb="Unsubscribe">
      <div className="page-content" style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
        {!email ? (
          <p>No email address was provided in the link. Please use the unsubscribe link from the email you received.</p>
        ) : status === 'done' ? (
          <>
            <h2>You're unsubscribed</h2>
            <p><strong>{email}</strong> won't receive further emails from us.</p>
          </>
        ) : (
          <>
            <h2>Unsubscribe from TrainTrack emails</h2>
            <p>Confirm you'd like to stop receiving emails at <strong>{email}</strong>.</p>
            {error && <p style={{ color: 'var(--red, #dc2626)' }}>{error}</p>}
            <button
              className="btn-primary"
              onClick={handleConfirm}
              disabled={status === 'working'}
              style={{ marginTop: '1rem' }}
            >
              {status === 'working' ? 'Unsubscribing…' : 'Confirm Unsubscribe'}
            </button>
          </>
        )}
      </div>
    </PageLayout>
  )
}
