import { useState } from 'react'
import { Link } from 'react-router-dom'
import Share from '../components/Share'
import { posts } from '../assets/content'

const icon = {
  user: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  calendar: 'M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z',
  search: 'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
}

function Svg({ d }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
}

export default function Blog() {
  const [q, setQ] = useState('')
  const term = q.trim().toLowerCase()
  const shown = posts.filter((p) => !term || `${p.title} ${p.excerpt}`.toLowerCase().includes(term))

  return (
    <>
      <header className="page-head page-head-sm">
        <div className="container">
          <h1>Blog</h1>
          <p>Welcome to Man Mountain &amp; Company Limited.</p>
        </div>
      </header>

      <section className="section blog-section">
        <div className="container blog-layout">
          <ol className="bl">
            {shown.map((p) => (
              <li key={p.slug}>
                <h2><Link to={`/blog/${p.slug}`}>{p.title}</Link></h2>
                <p className="bl-meta">
                  {p.author && <span><Svg d={icon.user} />By {p.author}</span>}
                  <span><Svg d={icon.calendar} />{p.date}</span>
                </p>
                <p className="bl-excerpt">{p.excerpt}</p>
                <div className="bl-foot">
                  <Link className="bl-btn" to={`/blog/${p.slug}`}>Read more</Link>
                  <Share slug={p.slug} title={p.title} />
                </div>
              </li>
            ))}
            {shown.length === 0 && <li className="bl-none">No posts match your search.</li>}
          </ol>

          <aside className="blog-side">
            <form className="bs-search" role="search" onSubmit={(e) => e.preventDefault()}>
              <input type="search" placeholder="Search here ..." aria-label="Search posts" value={q} onChange={(e) => setQ(e.target.value)} />
              <button type="submit" aria-label="Search"><Svg d={icon.search} /></button>
            </form>

            <h3 className="bs-title">Recent Posts</h3>
            <ul className="bs-list">
              {posts.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                  <span>{p.date}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  )
}