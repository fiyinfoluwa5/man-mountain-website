export default function SectionTitle({ title, intro }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  )
}

export function PageHead({ title, intro }) {
  return (
    <header className="page-head">
      <div className="container">
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </header>
  )
}