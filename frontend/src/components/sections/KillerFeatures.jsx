const FEATURES = [
  { pain: 'Pain: Manual AVETMISS errors', title: 'AVETMISS 8 Pre-Validation', desc: 'Run a live scan before export. Flags every NAT file error — missing outcomes, invalid activity types, duplicate USIs — before you submit to NCVER. Supports SVTS, Smart & Skilled, Skills Assure.' },
  { pain: 'Pain: Chasing USIs before census', title: 'Automated USI Verification', desc: 'Every enrolment verified in real-time via the DET API. Students without a USI receive automated reminder sequences. Your register never contains an unverified USI again.' },
  { pain: 'Pain: Trainer files out of date', title: 'Trainer Currency Tracker', desc: 'Automated alerts fire 90, 60, and 30 days before currency lapses. Generates a Standards Clauses 1.13–1.16 evidence report on demand. No more audit surprises.' },
  { pain: 'Pain: Hours marking written assessments', title: 'AI-Assisted Grading', desc: "AI surfaces suggested grades and key evidence points from student responses, benchmarked against your marking guide. Trainers review and confirm — they don't start from scratch." },
  { pain: 'Pain: Certificates issued weeks late', title: 'Auto Certificate + QR Codes', desc: 'Certificates issue the moment a student achieves all unit outcomes. Every document contains a unique QR code linking to a live verification portal. Employers confirm authenticity in 5 seconds.' },
  { pain: 'Pain: Scope drift from TGA registration', title: 'Live Training.gov.au Sync', desc: 'Connects to the TGA API and syncs your registered scope daily. Attempting to enrol into an out-of-scope qualification triggers a compliance warning before the record is saved.' },
  { pain: 'Pain: Paper enrolment forms', title: 'Branded Enrolment Engine', desc: 'Embed a fully branded enrolment widget on your website. Collects all AVETMISS fields, LLND responses, USI consent, and payment in one flow. Lands directly in the SMS — zero re-entry.' },
  { pain: 'Pain: Building ASQA audit packs under pressure', title: 'Audit Evidence Pack Generator', desc: 'Select any Standards clause (1–8) and TrainTrack compiles the relevant records, trainer files, and outcomes into a structured evidence folder — exported as PDF or organised zip.' },
  { pain: 'Pain: Attendance on paper rolls', title: 'Digital Attendance + Geo-Verify', desc: 'Trainers mark attendance via the app — students self-sign via QR code on arrival. For workplace delivery, optional geo-location check-in verifies training occurred on-site.' },
]

const DELAYS = ['', 'fade-up-delay-1', 'fade-up-delay-2']

export default function KillerFeatures() {
  return (
    <section className="section kf-section" id="compliance">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <span className="eyebrow">Feature Deep Dive</span>
          <h2>Built for every RTO pain point.</h2>
          <p style={{ marginTop: '1rem' }}>Twelve features. Twelve problems eliminated. Each one built because an RTO manager told us it was costing them hours every week.</p>
        </div>
        <div className="kf-grid" style={{ marginTop: '3rem' }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className={`kf-card fade-up ${DELAYS[i % 3]}`}>
              <div className="kf-pain">{f.pain}</div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
