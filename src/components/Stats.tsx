import { motion } from "framer-motion";

const stats = [
  {
    icon: "fas fa-code-branch",
    value: "10+",
    label: "Projets Déployés",
    subtext: "Web, Mobile & Microservices"
  },
  {
    icon: "fas fa-user-graduate",
    value: "2+ ans",
    label: "Formation BTS GL",
    subtext: "Institut Universitaire de la Côte"
  },
  {
    icon: "fas fa-cubes",
    value: "8+",
    label: "Technologies Maîtrisées",
    subtext: "Spring Boot, Angular, React, Docker..."
  },
  {
    icon: "fas fa-award",
    value: "100%",
    label: "Engagement & Qualité",
    subtext: "Architecture Propre & Mobile First"
  }
];

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <div className="stat-icon">
                <i className={stat.icon} />
              </div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <h4>{stat.label}</h4>
                <p>{stat.subtext}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}