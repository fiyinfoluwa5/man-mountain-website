import { company, claimsPage as c } from '../assets/content'

export default function Claims() {
  return (
    <>
      <header className="page-head page-head-sm">
        <div className="container">
          <h1>Claims Services</h1>
          <p>{c.note}</p>
        </div>
      </header>

      <section className="container">
        <div className="cl-top">
          <p className="cl-lead">{c.lead}</p>
          <aside className="cl-call">
            <h3>Report a claim</h3>
            <p>Call or email our claims team and we will tell you the next steps.</p>
            <a href={`tel:${company.tel}`}>{company.phone}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </aside>
        </div>
      </section>

      <section className="container cl-steps-wrap">
        <h2 className="ab-h">{c.stepsHeading}</h2>
        <ol className="cl-steps">
          {c.steps.map((s, i) => (
            <li key={s.title + i}>
              <span className="cl-n">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {c.docs.length > 0 && (
        <section className="cl-docs">
          <div className="container">
            <h2 className="ab-h">Documents you will need</h2>
            <div className="cl-doc-grid">
              {c.docs.map((d) => (
                <div className="cl-doc" key={d.title}>
                  <h3>{d.title}</h3>
                  <ul>{d.items.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="contact-band">
        <div className="container">
          <h2>Have a claim to report?</h2>
          <p>Tell us what happened and we will reply with next steps.</p>
          <div className="hero-actions">
            <a className="btn" href={`tel:${company.tel}`}>Call {company.phone}</a>
            <a className="btn btn-line" href={`mailto:${company.email}`}>Email us</a>
          </div>
        </div>
      </section>
    </>
  )
}