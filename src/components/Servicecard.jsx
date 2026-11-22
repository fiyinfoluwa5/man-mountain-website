export default function ServiceCard({ title, text }) {
  return (
    <article className="row">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}