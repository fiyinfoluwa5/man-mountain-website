import { useState } from 'react'
import { PageHead } from '../components/SectionTitle'
import { company, branches } from '../assets/content'

const paths = {
  pin: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
  phone: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
  mail: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
}

function Ico({ n }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={paths[n]} /></svg>
}

const mapSrc = (q) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=16&output=embed`
const dirHref = (q) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`

export default function Contact() {
  const [active, setActive] = useState(0)
  const [sent, setSent] = useState(false)
  const place = branches[active]

  const showOnMap = (k) => {
    setActive(k)
    document.getElementById('office-map')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  // Opens the visitor's email app with the message ready to send.
  // Swap for a form service (Formspree, Web3Forms) when you want messages sent automatically.
  const send = (e) => {
    e.preventDefault()
    const f = new FormData(e.target)
    const body = [
      f.get('message'),
      '',
      `Name: ${f.get('name')}`,
      `Email: ${f.get('email')}`,
      f.get('phone') ? `Phone: ${f.get('phone')}` : '',
    ].join('\n')
    const subject = f.get('subject') || `Enquiry from ${f.get('name')}`
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <>
      <PageHead title="Contact" intro="Tell us what you need." />

      <section className="map-band" id="office-map">
        <iframe
          key={active}
          title={`Map showing ${place.name}`}
          src={place.embed || mapSrc(place.address)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="map-tag">{place.name}</div>
      </section>

      <section className="offices-section">
        <div className="container">
          <h2>Our offices</h2>
          <ul className="offices">
            {branches.map((b, k) => (
              <li key={b.name + k} className={k === active ? 'office on' : 'office'}>
                <h3>{b.name}</h3>
                <ul className="office-lines">
                  <li><Ico n="pin" /><span>{b.address}</span></li>
                  {b.tel && <li><Ico n="phone" /><a href={`tel:${b.tel}`}>{b.phone}</a></li>}
                  {b.email && <li><Ico n="mail" /><a href={`mailto:${b.email}`}>{b.email}</a></li>}
                </ul>
                <div className="office-acts">
                  <button type="button" onClick={() => showOnMap(k)} aria-pressed={k === active}>
                    {k === active ? 'Showing on map' : 'View on map'}
                  </button>
                  <a href={dirHref(b.address)} target="_blank" rel="noopener noreferrer">Directions</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="msg-section">
        <div className="container msg-layout">
          <div className="msg-intro">
            <h2>Send us a message</h2>
            <p>Tell us what you need and we will reply with next steps.</p>
            <div className="msg-direct">
              <a href={`tel:${company.tel}`}><Ico n="phone" />{company.phone}</a>
              <a href={`mailto:${company.email}`}><Ico n="mail" />{company.email}</a>
            </div>
          </div>

          <form className="c-form" onSubmit={send}>
            <div className="form-row">
              <label>Your name<input name="name" required autoComplete="name" /></label>
              <label>Your email<input name="email" type="email" required autoComplete="email" /></label>
            </div>
            <div className="form-row">
              <label>Phone (optional)<input name="phone" type="tel" autoComplete="tel" /></label>
              <label>Subject (optional)<input name="subject" /></label>
            </div>
            <label>How can we help?<textarea name="message" rows="5" required /></label>
            <button className="btn" type="submit">Send message</button>
            {sent && <p className="c-note" role="status">Your email app should now open with your message ready to send. If nothing opened, please email us at {company.email}.</p>}
          </form>
        </div>
      </section>
    </>
  )
}