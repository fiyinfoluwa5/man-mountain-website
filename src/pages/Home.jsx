import { useEffect, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Slider from '../components/Slider'
import { company, values, history, insurers, servicesPage } from '../assets/content'
import Logos from '../components/Logos'

const tiles = [
  { name: 'Marine cargo', image: '/slides/marine-cargo.jpg', big: true },
  { name: 'Energy, oil and gas', image: '/slides/energy.jpg' },
  { name: 'Machinery breakdown', image: '/slides/machinery.jpg' },
  { name: 'Overseas medical', image: '/services/overseas-medical.jpg' },
  { name: 'Contractors’ all risk', image: '/services/contract.jpg' },
]


function useReveal() {
  useLayoutEffect(() => { document.documentElement.classList.add('js') }, [])
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      })
    }, { threshold: 0.15 })
    document.querySelectorAll('.rv').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}


function Count({ to, suffix = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = to + suffix; return }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const step = (t) => {
        const p = Math.min((t - t0) / 1400, 1)
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suffix
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [to, suffix])
  return <b ref={ref}>0{suffix}</b>
}


function Ticker({ items, variant }) {
  const rep = Math.max(1, Math.ceil(8 / items.length))
  const half = Array.from({ length: rep }, () => items).flat()
  return (
    <div className={`tk ${variant}`} aria-hidden="true">
      <div className="tk-track">
        {[...half, ...half].map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  )
}

export default function Home() {
  useReveal()
  const years = new Date().getFullYear() - 1984
  const covers = servicesPage.list.length


  return (
    <>
      <Slider />

      <Ticker items={servicesPage.list.map((s) => s.name)} variant="tk-gold" />

      <section className="container">
        <p className="intro">{company.summary}</p>
        <div className="stats-row">
          <div className="stat rv"><Count to={years} /><span>Years in business</span></div>
          <div className="stat rv"><Count to={covers} /><span>Types of cover we arrange</span></div>
          <div className="stat rv"><Count to={30} suffix="+" /><span>Staff, up from three</span></div>
          <div className="stat rv"><b>All</b><span>Classes of insurance licensed</span></div>
        </div>
      </section>

      <section className="container bento-sec">
        <h2 className="h-title rv">What we do</h2>
        <p className="h-sub rv">A few of the {covers} covers we arrange.</p>
        <div className="bento">
          {tiles.map((t) => (
            <Link key={t.name} className={t.big ? 'tile tile-big rv' : 'tile rv'} to="/services">
              <span className="tile-img" style={{ backgroundImage: `url(${t.image})` }} />
              <h3>{t.name}</h3>
            </Link>
          ))}
        </div>
        <Link className="tile-more rv" to="/services">
          <h3>All {covers} covers</h3>
          <span>See every service &rarr;</span>
        </Link>
      </section>

      <section className="claims-band">
        <div className="container">
          <h2 className="rv">Prompt settlement of all genuine claims is what we are known for.</h2>
          <p className="rv">Talk to us about a claim and we will tell you the next steps.</p>
          <Link className="btn rv" to="/claims">Talk to our claims team</Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="h-title rv">How we work</h2>
          <p className="h-sub rv">Three things our clients can count on.</p>
          <div className="pillars">
            {values.map((v) => (
              <div className="pillar rv" key={v.title}><h3>{v.title}</h3><p>{v.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container heritage">
          <div className="rv">
            <h2>Welcome to {company.name}</h2>
            <p>{company.name} is an incorporated insurance broker, registered and licensed as insurance brokers under the strict supervision of the National Insurance Commission and the Nigeria Council of Registered Insurance Brokers.</p>
          </div>
          <div className="her-line rv">
            {history.map((h, i) => (
              <div key={i}><b>{h.year}</b><h3>{h.title}</h3><span>{h.text}</span></div>
            ))}
          </div>
        </div>
      </section>

            <section className="section insurers">
        <div className="container">
          <h2 className="h-title rv">Insurers we work with</h2>
          <div className="rv"><Logos items={insurers} /></div>
        </div>
      </section>


      <section className="contact-band">
        <div className="container">
          <h2 className="rv">Have a job in mind?</h2>
          <p className="rv">Tell us what you need and we will reply with next steps.</p>
          <div className="hero-actions rv">
            <a className="btn" href={`tel:${company.tel}`}>Call {company.phone}</a>
            <a className="btn btn-line" href={`mailto:${company.email}`}>Email us</a>
          </div>
        </div>
      </section>
    </>
  )
}