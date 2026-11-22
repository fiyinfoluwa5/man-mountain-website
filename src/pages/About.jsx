import { useState } from 'react'
import { company, aboutPage as a } from '../assets/content'

export default function About() {
  const [photo, setPhoto] = useState(true)

  return (
    <>
      <header className="page-head page-head-sm">
        <div className="container">
          <h1>About us</h1>
          <p>Who we are and how we work.</p>
        </div>
      </header>

      <section className="container">
        <div className={photo ? 'ab-open' : 'ab-open no-photo'}>
          <p className="ab-lead">{a.lead[0]}<strong>{a.lead[1]}</strong>{a.lead[2]}</p>
          {photo && (
            <figure className="shot">
              <img src="/about.jpg" alt={company.name} onError={() => setPhoto(false)} />
            </figure>
          )}
        </div>
      </section>

      <section className="container ab-story-grid">
        <div>
          <h2 className="ab-h">Our story</h2>
          <ol className="ab-line">
            {a.story.map((s) => (
              <li key={s.title}>
                <span className="ab-when">{s.when}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <aside className="ab-facts">
          {a.facts.map(([big, small]) => (
            <div className="ab-fact" key={big}><b>{big}</b><span>{small}</span></div>
          ))}
        </aside>
      </section>

      <section className="ab-div">
        <div className="container">
          <h2 className="ab-h">Specialist divisions</h2>
          <p className="ab-sub">{a.divisionsIntro}</p>
          <ul className="ab-div-grid">
            {a.divisions.map((d) => <li key={d}>{d}</li>)}
          </ul>
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