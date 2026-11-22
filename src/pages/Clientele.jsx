import { useState } from 'react'
import { company, clientele as c } from '../assets/content'

export default function Clientele() {
  const [pick, setPick] = useState('All')
  const shown = pick === 'All' ? c.groups : c.groups.filter((g) => g.industry === pick)

  return (
    <>
      <header className="page-head page-head-sm">
        <div className="container">
          <h1>Clientele</h1>
          <p>Welcome to Man Mountain & company Ltd.</p>
        </div>
      </header>

      <section className="container cli-filter">
        <p className="cli-lead">{c.intro}</p>
        <div className="cli-chips" role="group" aria-label="Filter by industry">
          {['All', ...c.groups.map((g) => g.industry)].map((name) => (
            <button key={name} type="button" aria-pressed={pick === name} onClick={() => setPick(name)}>
              {name}
            </button>
          ))}
        </div>
      </section>

      <section className="container cli-list">
        {shown.map((g) => (
          <div className="cli-row" key={g.industry}>
            <div className="cli-name">
              <h2>{g.industry}</h2>
              <span>{g.names.length} {g.names.length === 1 ? 'client' : 'clients'}</span>
            </div>
            <ul className="cli-names">
              {g.names.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="cli-mv">
        <div className="container">
          <div>
            <h2>Mission statement</h2>
            <p>{c.mission}</p>
          </div>
          <div>
            <h2>Vision statement</h2>
            <p>{c.vision}</p>
          </div>
        </div>
      </section>

      <section className="contact-band">
        <div className="container">
          <h2>Have a job in mind?</h2>
          <p>Tell us what you need and we will reply with next steps.</p>
          <div className="hero-actions">
            <a className="btn" href={`tel:${company.tel}`}>Call {company.phone}</a>
            <a className="btn btn-line" href={`mailto:${company.email}`}>Email us</a>
          </div>
        </div>
      </section>
    </>
  )
}