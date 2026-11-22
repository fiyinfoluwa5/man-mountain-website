import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { slides } from '../assets/content'

export default function Slider() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = slides.length
  const go = (k) => setI((k + n) % n)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (paused || reduce || n < 2) return
    const t = setInterval(() => setI((v) => (v + 1) % n), 6000)
    return () => clearInterval(t)
  }, [paused, n])

  return (
    <section
      className="slider"
      aria-roledescription="carousel"
      aria-label="Featured services"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="slides" style={{ transform: `translateX(-${i * 100}%)` }}>
        {slides.map((s, k) => (
          <article
            key={s.title}
            className={k === i ? 'slide on' : 'slide'}
            role="group"
            aria-roledescription="slide"
            aria-label={`${k + 1} of ${n}`}
            aria-hidden={k !== i}
          >
            <div className="container slide-in">
              <div>
                <h2>{s.title}</h2>
                <p>{s.text}</p>
                <Link className="btn" to={s.to} tabIndex={k === i ? 0 : -1}>Learn more</Link>
              </div>
              <figure className="shot">
                <img src={s.image} alt={s.alt || ''} onError={(e) => { e.currentTarget.style.visibility = 'hidden' }} />
              </figure>
            </div>
          </article>
        ))}
      </div>

      <div className="s-controls container">
        <div className="s-btns">
          <button className="s-arrow" onClick={() => go(i - 1)} aria-label="Previous slide">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button className="s-arrow" onClick={() => go(i + 1)} aria-label="Next slide">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        <div className="s-dots">
          {slides.map((s, k) => (
            <button key={s.title} className={k === i ? 'on' : ''} onClick={() => go(k)} aria-label={`Go to slide ${k + 1}`} aria-current={k === i} />
          ))}
        </div>
      </div>
    </section>
  )
}