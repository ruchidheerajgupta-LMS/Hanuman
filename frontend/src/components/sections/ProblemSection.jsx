const PROBLEMS = [
  { icon: '📊', title: 'Manual AVETMISS exports', desc: 'Hours fixing NAT file errors the night before the NCVER deadline. Every. Single. Year.' },
  { icon: '✍️', title: 'No compliant digital signatures', desc: 'Paper cover sheets, scanned PDFs, emailed consent forms. None of it holds up under an ASQA audit.' },
  { icon: '🧑‍🏫', title: 'Trainer currency gaps at audit time', desc: 'Expired TAE qualifications, missing industry evidence, no structured PD log. An ASQA finding that costs your registration.' },
  { icon: '📋', title: 'RPL managed over email', desc: 'Evidence attached to nothing. No structured determination. No audit trail. An ASQA finding waiting to happen.' },
]

const SOLUTIONS = [
  'SMS + LMS unified — one record, zero re-entry.',
  'Digital signatures on every assessment — student and assessor.',
  'Trainer currency tracking — 90/60/30-day expiry alerts.',
  'RPL: structured evidence upload + formal trainer determination.',
  'AVETMISS NAT export with pre-submission validation.',
  'Branded PDF certificates auto-issued on competency.',
  'Automated notifications — students and trainers always in the loop.',
]

export default function ProblemSection() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="section problem-section" id="about">
      <div className="container">
        <div className="problem-grid">
          <div>
            <span className="eyebrow">The RTO Reality</span>
            <h2>Sound familiar?</h2>
            <p style={{ marginTop: '1rem', maxWidth: 480 }}>
              Your assessments are on paper. Your RPL evidence is in an email thread. Your trainer
              currency files are out of date. And your ASQA evidence pack is a folder of screenshots.
            </p>
            <div className="problem-items">
              {PROBLEMS.map((p, i) => (
                <div key={p.title} className={`problem-item fade-up${i > 0 ? ` fade-up-delay-${i}` : ''}`}>
                  <div className="problem-icon">{p.icon}</div>
                  <div>
                    <div className="problem-item-title">{p.title}</div>
                    <div className="problem-item-desc">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="fade-up">
            <div className="solution-card">
              <h3>TrainTrack was built by people who've managed RTOs.</h3>
              <p>
                We know exactly what's broken — because we lived it. Every feature exists to eliminate
                a real problem that's costing Australian RTOs time, compliance risk, and sleep.
              </p>
              <div className="solution-points">
                {SOLUTIONS.map((s) => (
                  <div key={s} className="solution-point">
                    <div className="solution-check">✓</div>{s}
                  </div>
                ))}
              </div>
              <button
                className="btn-primary"
                style={{ marginTop: '1.75rem', width: '100%', justifyContent: 'center' }}
                onClick={() => scrollTo('audit')}
              >
                See how it works for your RTO →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
