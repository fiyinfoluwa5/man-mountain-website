export default function Hero({ title, text, children }) {
  return (
    <section className="hero">
      <div className="container">
        <h1>{title}</h1>
        <p>{text}</p>
        <div className="hero-actions">{children}</div>
      </div>
    </section>
  )
}