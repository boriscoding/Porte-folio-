import { certifications } from "../data/projects";

export default function Certifications() {
  return (
    <section id="certifications" className="certifications-section">
      <div className="container">
        <h2 className="section-title">Formations & Certifications</h2>
        <div className="cert-grid">
          {certifications.map((cert) => (
            <div className="cert-card" key={cert.title + cert.description}>
              <i className={cert.icon} />
              <h4>{cert.title}</h4>
              <p>{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
