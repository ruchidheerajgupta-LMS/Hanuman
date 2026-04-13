import AuditForm from '../forms/AuditForm'

const STEPS = [
  { num: 1, title: 'Review your AVETMISS history', desc: 'We look at your submission track record and flag the error patterns most likely to appear in your next export.' },
  { num: 2, title: 'Assess your trainer currency exposure', desc: 'Standards Clauses 1.13–1.16 are the most common ASQA non-compliance. We check your exposure in minutes.' },
  { num: 3, title: 'Identify your top 3 compliance risks', desc: 'Leave with a prioritised, actionable list — whether you use TrainTrack or not.' },
  { num: 4, title: 'See how TrainTrack closes each gap', desc: 'Only if relevant — we show you exactly which feature solves each specific risk in your RTO.' },
]

export default function AuditCTA() {
  return (
    <section className="audit-section" id="audit">
      <div className="container">
        <div className="audit-inner">
          <div>
            <span className="eyebrow">Free 15-Minute Session</span>
            <h2>Book your Compliance Audit.</h2>
            <p>No demo. No sales pitch. An honest review of your current compliance posture — conducted by an ex-RTO manager — and a clear list of what to fix first.</p>
            <div className="audit-steps">
              {STEPS.map((s) => (
                <div key={s.num} className="audit-step">
                  <div className="audit-step-num">{s.num}</div>
                  <div>
                    <div className="audit-step-title">{s.title}</div>
                    <div className="audit-step-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <AuditForm />
        </div>
      </div>
    </section>
  )
}
