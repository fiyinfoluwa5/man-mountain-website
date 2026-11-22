import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { company, social } from '../assets/content'
import mark from '../assets/logo1.png'
import bupa from '../assets/bupa.png'

const useful = [
  ['/about', 'About Us'], ['/services', 'Services'],
  ['/claims', 'Claims Services'], ['/contact', 'Contact'],
  ['/privacy', 'Privacy Policy'], ['/terms', 'Terms & Condition'],
]

const icons = {
  facebook: { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  x: { label: 'X (Twitter)', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  linkedin: { label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Opens the visitor's email app. Swap for Mailchimp or a similar service when you have one.
  const subscribe = (e) => {
    e.preventDefault()
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent('Mailing list signup')}&body=${encodeURIComponent('Please add this address to the mailing list: ' + email)}`
  }

  return (
    <footer className="ft">
      <div className="container ft-top">
        <div>
          <img className="ft-mark" src={mark} alt="" />
          <p className="ft-lead">{company.about}</p>
        </div>

        <div className="ft-news">
          <h3>Newsletter</h3>
          <p>Do you want to keep abreast of all our products and insurance services? Quickly fill the form below with your email address to join our mailing list</p>
          <form className="ft-form" onSubmit={subscribe}>
            <input type="email" required placeholder="Enter your e-mail here" aria-label="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit" aria-label="Join the mailing list">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
            </button>
          </form>
        </div>
      </div>

      <div className="container ft-nav">
        <h3>Useful Links</h3>
        <ul className="ft-links">
          {useful.map(([to, label]) => <li key={to}><Link to={to}>{label}</Link></li>)}
        </ul>
      </div>

      <div className="container ft-meta">
        <div>
          <h3>Partner</h3>
          <img className="ft-partner" src={bupa} alt="Bupa" />
        </div>

        <div className="ft-contact">
          <h3>Contact</h3>
          <div><span>Address</span><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`} target="_blank" rel="noopener noreferrer">{company.address}</a></div>
          <div><span>Phone</span><a href={`tel:${company.tel}`}>{company.phone}</a></div>
          <div><span>Email</span><a href={`mailto:${company.email}`}>{company.email}</a></div>
        </div>

        <div>
          <h3>Follow us</h3>
          <div className="ft-social">
            {Object.entries(social).filter(([, url]) => url).map(([key, url]) => (
              <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={icons[key].label} title={icons[key].label}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icons[key].path} /></svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="ft-base">
        <div className="container">
          &copy; Copyright {company.name} {new Date().getFullYear()}. All rights reserved. Designed and Developed by{' '}
          <a href="http://jotmosystemsltd.com" target="_blank" rel="noopener noreferrer">jotmosystemsltd.com</a>
        </div>
      </div>

      {showTop && (
        <button className="to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4l-8 8h5v8h6v-8h5z" /></svg>
        </button>
      )}
    </footer>
  )
}