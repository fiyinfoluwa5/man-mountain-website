import { useEffect, useRef, useState } from 'react'

// One logo plate. If the picture file can't be found, the insurer's name is shown instead.
function Tile({ item }) {
  const [bad, setBad] = useState(false)
  return (
    <li className="lg-tile">
      {bad
        ? <span>{item.name}</span>
        : <img src={item.logo} alt={item.name} loading="lazy" onError={() => setBad(true)} />}
    </li>
  )
}

export default function Logos({ items }) {
  const track = useRef(null)
  const hold = useRef(false)
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const move = (dir) => {
    const el = track.current
    if (!el) return
    const first = el.firstElementChild
    const step = first ? first.getBoundingClientRect().width + 16 : 240
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
    const behavior = reduce ? 'auto' : 'smooth'
    if (dir > 0 && atEnd) el.scrollTo({ left: 0, behavior })
    else el.scrollBy({ left: dir * step, behavior })
  }

  // Slides on its own every 3.5 seconds, and stops while someone is hovering or has focus inside.
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => { if (!hold.current) move(1) }, 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      className="lg"
      onMouseEnter={() => { hold.current = true }}
      onMouseLeave={() => { hold.current = false }}
      onFocus={() => { hold.current = true }}
      onBlur={() => { hold.current = false }}
    >
      <button className="lg-btn" onClick={() => move(-1)} aria-label="Previous insurers">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
      </button>
      <ul className="lg-track" ref={track}>
        {items.map((it) => <Tile key={it.name} item={it} />)}
      </ul>
      <button className="lg-btn" onClick={() => move(1)} aria-label="Next insurers">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  )
}