const FEATURES = [
  {
    pain: 'Pain: Manual AVETMISS errors before NCVER deadline',
    title: 'AVETMISS NAT Export + Pre-Validation',
    desc: 'Generate NAT00030, 00060, 00080 and all required files in one click. A live validator runs before export — flagging every missing outcome, invalid activity type, and duplicate USI. Supports SVTS, Smart & Skilled, and Skills Assure state variations.',
  },
  {
    pain: 'Pain: Chasing USIs before census cuts off funding',
    title: 'USI Collection & Compliance Tracking',
    desc: 'Every student record captures and stores their USI at enrolment. Dashboard alerts flag any active student with a missing or unverified USI. Automated reminder sequences chase students before your funding deadline — so your register is clean when it counts.',
  },
  {
    pain: 'Pain: Assessment compliance without a paper trail',
    title: 'Digital Signatures on Every Assessment',
    desc: 'Students sign declarations on-screen using a finger or stylus. Assessors counter-sign on the grading screen. Both signatures are embedded into the PDF cover sheet and timestamped — giving you a compliant, audit-ready record with zero paper handling.',
  },
  {
    pain: 'Pain: No proof practical delivery actually happened',
    title: 'Observation Checklists for Workplace Delivery',
    desc: 'Assessors complete structured observation checklists criterion-by-criterion, with a Satisfactory / Not Yet Satisfactory outcome per element. Notes recorded on mobile in the field. Final result auto-calculated from checklist outcomes — suitable for ASQA evidence standards.',
  },
  {
    pain: 'Pain: RPL assessed by email with evidence attached to nothing',
    title: 'RPL Workflow — Evidence to Determination',
    desc: 'Students upload evidence mapped to each unit element directly in the portal. Trainers review all evidence in a structured review screen, record an outcome per element (Sufficient / Insufficient), then make a formal determination: Granted, Not Granted, or Partial RPL. Full audit trail attached to the student record.',
  },
  {
    pain: 'Pain: Assessments on mobile devices with patchy connectivity',
    title: 'Mobile-Responsive Assessment Portal',
    desc: 'TrainTrack is fully mobile-responsive — students complete assessments and trainers mark attendance from any smartphone or tablet without installing an app. The interface is optimised for touch screens and works across all modern mobile browsers, on both iOS and Android.',
  },
  {
    pain: 'Pain: Trainer files out of date at the worst possible moment',
    title: 'Trainer Currency & Qualifications Tracker',
    desc: 'Automated alerts fire 90, 60, and 30 days before currency lapses. Each trainer\'s qualifications, industry experience, and teaching evidence are stored in structured profiles. Generates a Standards Clauses 1.13–1.16 evidence report on demand — exactly what ASQA asks for.',
  },
  {
    pain: 'Pain: Students not knowing their assessment was graded',
    title: 'Automated Notification Engine',
    desc: 'Trainers are notified when work is submitted; students are notified when it\'s graded — with their outcome. New enrolments trigger welcome emails. Low attendance triggers a warning to student and admin at 80%. Cohort broadcasts (email + SMS) reach a whole intake in one click.',
  },
  {
    pain: 'Pain: Hours spent marking multiple-choice and fill-in-the-blank questions by hand',
    title: 'Instant Auto-Marking',
    desc: "Multiple-choice, fill-in-the-blank, and matching questions mark themselves the second a student submits. Upload an existing Word or PDF assessment and TrainTrack extracts the questions for you — no re-typing. Written and practical responses still go to a qualified assessor, exactly as ASQA requires.",
  },
  {
    pain: 'Pain: Certificates issued weeks after competency is achieved',
    title: 'Branded PDF Certificates — Auto-Generated',
    desc: 'Certificates issue the moment a student achieves all unit outcomes, generated as branded PDFs with your RTO logo and colours. Every certificate carries a unique serial number and QR code linking to a live verification portal. Employers confirm authenticity in five seconds.',
  },
  {
    pain: 'Pain: Scope drift — enrolling into a qualification no longer on your scope',
    title: 'Live Training.gov.au Scope Sync',
    desc: 'Connects to the TGA API and syncs your registered scope daily. Attempting to enrol a student into an out-of-scope qualification triggers a compliance warning before the record is saved. No more accidental off-scope delivery.',
  },
  {
    pain: 'Pain: Building an ASQA audit pack under pressure in 48 hours',
    title: 'Audit Evidence Pack Generator',
    desc: 'Select any Standards for RTOs 2025 clause (1–8) and TrainTrack compiles the relevant records — trainer files, student outcomes, attendance, assessment sign-offs — into a structured evidence folder exported as a PDF or organised ZIP. What used to take two days takes twenty minutes.',
  },
]

const DELAYS = ['', 'fade-up-delay-1', 'fade-up-delay-2']

export default function KillerFeatures() {
  return (
    <section className="section kf-section" id="compliance">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <span className="eyebrow">Feature Deep Dive</span>
          <h2>Built for every RTO pain point.</h2>
          <p style={{ marginTop: '1rem' }}>
            Twelve features. Twelve problems eliminated. Each one built because an RTO manager
            told us it was costing them hours, compliance risk, or student complaints every week.
          </p>
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
