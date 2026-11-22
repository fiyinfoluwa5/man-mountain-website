import { Link, useParams } from 'react-router-dom'
import { PageHead } from '../components/SectionTitle'
import Share from '../components/Share'
import { posts } from '../assets/content'

function Block({ b }) {
  if (typeof b === 'string') return <p>{b}</p>
  if (b.h) return <h2>{b.h}</h2>
  if (b.sub) return <h3>{b.sub}</h3>
  if (b.q) return <h4>{b.q}</h4>
  if (b.step) return <p><strong className="step">{b.step[0]}</strong> {b.step[1]}</p>
  if (b.ul) return <ul>{b.ul.map((t, i) => <li key={i}>{t}</li>)}</ul>
  if (b.note) return <p className="post-note">{b.note}</p>
  return null
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <>
        <PageHead title="Post not found" />
        <section className="section">
          <div className="container"><p><Link to="/blog">Back to the blog</Link></p></div>
        </section>
      </>
    )
  }

  return (
    <>
      <header className="page-head page-head-sm post-head">
        <div className="container">
          <h1>{post.title}</h1>
          <p className="post-meta">
            {post.author && <span>By {post.author}</span>}
            <span>{post.date}</span>
          </p>
        </div>
      </header>

      <section className="section blog-section">
        <div className="container blog-layout">
          <article className="post-body">
            {post.image && (
              <figure className={`post-figure pf-${post.image.style || 'frame'}`}>
                <img src={post.image.src} alt={post.image.alt} />
                {post.image.credit && <figcaption>{post.image.credit}</figcaption>}
              </figure>
            )}
            {post.body.map((b, i) => <Block key={i} b={b} />)}
            <div className="post-end">
              <Share slug={post.slug} title={post.title} />
              <Link className="post-back" to="/blog">Back to the blog</Link>
            </div>
          </article>

          <aside className="blog-side">
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