import { useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const DURATION = 700 // how long the loader shows, in milliseconds

export default function PageLoader() {
  const { pathname } = useLocation()
  const [show, setShow] = useState(true)

 
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShow(false)
      return
    }
    setShow(true)
    const t = setTimeout(() => setShow(false), DURATION)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <div className={show ? 'pl-overlay' : 'pl-overlay pl-off'} role="status" aria-live="polite" aria-hidden={!show}>
      <span className="pl-sr">Loading</span>
      <section className="pl-dots" aria-hidden="true">
        <div className="pl-dot"></div>
        <div className="pl-dot"></div>
        <div className="pl-dot"></div>
        <div className="pl-dot"></div>
        <div className="pl-dot"></div>
      </section>
    </div>
  )
}