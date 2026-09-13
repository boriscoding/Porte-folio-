import { stackItems } from "../data/projects";

export default function Stack() {
  return (
    <section id="stack" className="stack-section">
      <div className="container grid-stack">
        {stackItems.map((item) => (
          <div className="stack-item" key={item.title}>
            <i className={item.icon} />
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
