const INDUSTRIES = ['Aged Care', 'Construction', 'Hospitality', 'Business Services', 'Information Technology', 'Community Services']

export default function ProofBar() {
  return (
    <div className="proof-bar">
      <div className="proof-inner">
        <span className="proof-label">Trusted by RTOs across:</span>
        <div className="proof-logos">
          {INDUSTRIES.map((i) => (
            <span key={i} className="proof-logo">{i}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
