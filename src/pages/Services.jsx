import { useState } from 'react'
import { Link } from 'react-router-dom'
import { company, servicesPage as sp } from '../assets/content'

export default function Services() {
  const [pick, setPick] = useState('All')
  const groups = [...new Set(sp.list.map((s) => s.group))]
  const shown = pick === 'All' ? sp.list : sp.list.filter((s) => s.group === pick)

  return (
    <>
      <header className="page-head page-head-sm">
        <div className="container">
          <h1>Services</h1>
          <p>What we can do for you.</p>
        </div>
      </header>

      <section className="container sv-top">
        <p className="sv-lead">{sp.lead}</p>
        <div className="cli-chips" role="group" aria-label="Filter by type of cover">
          {['All', ...groups].map((name) => (
            <button key={name} type="button" aria-pressed={pick === name} onClick={() => setPick(name)}>{name}</button>
          ))}
        </div>
        <p className="sv-count">{shown.length} {shown.length === 1 ? 'cover' : 'covers'}</p>
      </section>

      <section className="container sv-list">
        {shown.map((s) => {
          const paras = (Array.isArray(s.text) ? s.text : [s.text]).filter(Boolean)
          const pts = (s.points || []).filter(Boolean)
          return (
            <details className="sv" key={s.name}>
              <summary>
                <span className="sv-t">{s.name}</span>
                <span className="sv-g">{s.group}</span>
                <span className="sv-i" aria-hidden="true" />
              </summary>
              <div className={s.image ? 'sv-body has-img' : 'sv-body'}>
                <div>
                  {paras.length === 0 && pts.length === 0 && <p>{sp.fallback}</p>}
                  {paras.map((t, i) => <p key={i}>{t}</p>)}
                  {pts.length > 0 && <ul>{pts.map((t) => <li key={t}>{t}</li>)}</ul>}
                  <Link className="sv-link" to="/contact">Ask about this cover</Link>
                </div>
                {s.image && (
                  <figure className="shot">
                    <img src={s.image} alt={s.alt || ''} onError={(e) => { e.currentTarget.closest('figure').style.display = 'none' }} />
                  </figure>
                )}
              </div>
            </details>
          )
        })}
      </section>

      <section className="contact-band">
        <div className="container">
          <h2>Not sure which cover you need?</h2>
          <p>Our experts will advise you on the right cover.</p>
          <div className="hero-actions">
            <a className="btn" href={`tel:${company.tel}`}>Call {company.phone}</a>
            <a className="btn btn-line" href={`mailto:${company.email}`}>Email us</a>
          </div>
        </div>
      </section>
    </>
  )
}