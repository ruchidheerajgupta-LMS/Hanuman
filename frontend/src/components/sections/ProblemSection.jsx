const PROBLEMS = [
  { icon: '📊', title: 'Manual AVETMISS exports', desc: 'Hours spent fixing NAT file errors the night before submission. Every. Single. Time.' },
  { icon: '🧑‍🏫', title: 'Trainer currency a guessing game', desc: "Finding out a trainer's industry currency lapsed during an ASQA audit. The worst possible moment." },
  { icon: '🔄', title: 'Triple data entry', desc: 'Enrolling a student in the SMS, then the LMS, then the finance system. Three chances to make an error.' },
  { icon: '📜', title: 'Certificates issued weeks late', desc: 'Students waiting months for their qualification. Admin chasing the compliance manager chasing the trainer.' },
]

const SOLUTIONS = [
  'One platform. SMS + LMS, unified database.',
  'AVETMISS validates before you export.',
  'USI verified at enrolment — automatically.',
  'Certificates issue the moment competency is achieved.',
  'Trainer currency alerts 90 days before they lapse.',
  'ASQA evidence pack generated on demand.',
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
              You're managing student records in one system, delivering training in another, and doing
              your AVETMISS export in a spreadsheet — at 9pm the night before the NCVER deadline.
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
              <p>We know exactly what's broken — because we lived it. Every feature in TrainTrack exists to eliminate a real problem that costs real RTOs time, money, and sleep.</p>
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
