const TESTIMONIALS = [
  {
    quote: '"We had our ASQA audit in October. Our auditor commented it was the cleanest evidence pack she\'d seen in ten years. TrainTrack generated 80% of it automatically."',
    initials: 'SM', bg: '#1D9E75', name: 'Sarah Mitchell', role: 'RTO Manager · Queensland, 250 students',
  },
  {
    quote: '"The pay-as-you-enrol model saved us over $8,000 in our first year compared to what we were paying Cloud Assess. And we got more features."',
    initials: 'DK', bg: '#185FA5', name: 'David Kowalski', role: 'Director · NSW RTO, 120 students',
  },
  {
    quote: '"The trainer currency tracker alone is worth the subscription. I used to spend two days before every audit pulling that evidence together. Now it takes five minutes."',
    initials: 'JT', bg: '#BA7517', name: 'Jennifer Tran', role: 'Compliance Manager · VIC RTO, 380 students',
  },
]

export default function Testimonials() {
  return (
    <section className="section testimonials-section">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          <span className="eyebrow">Social Proof</span>
          <h2>What RTO managers say.</h2>
        </div>
        <div className="testimonials-grid" style={{ marginTop: '3rem' }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className={`testimonial-card fade-up${i > 0 ? ` fade-up-delay-${i}` : ''}`}>
              <div className="stars">★★★★★</div>
              <p className="tcard-quote">{t.quote}</p>
              <div className="tcard-author">
                <div className="tcard-avatar" style={{ background: t.bg }}>{t.initials}</div>
                <div>
                  <div className="tcard-name">{t.name}</div>
                  <div className="tcard-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
