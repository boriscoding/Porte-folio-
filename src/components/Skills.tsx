import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number; // Niveau en pourcentage (ex: 85)
  icon: string;
  color: string;
}

interface SkillCategory {
  title: string;
  categoryIcon: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Développement Front-End",
    categoryIcon: "fas fa-laptop-code",
    skills: [
      { name: "Angular", level: 85, icon: "fab fa-angular", color: "#dd0031" },
      { name: "React & Next.js", level: 88, icon: "fab fa-react", color: "#61dafb" },
      { name: "JavaScript / TypeScript", level: 90, icon: "fab fa-js", color: "#f7df1e" },
      { name: "HTML5 / CSS3 / SCSS", level: 92, icon: "fab fa-html5", color: "#e34f26" }
    ]
  },
  {
    title: "Back-End & Architecture",
    categoryIcon: "fas fa-server",
    skills: [
      { name: "Spring Boot (Java)", level: 85, icon: "fab fa-java", color: "#5382a1" },
      { name: "Node.js / Express", level: 82, icon: "fab fa-node-js", color: "#68a063" },
      { name: "PHP", level: 78, icon: "fab fa-php", color: "#777bb4" },
      { name: "Architecture Microservices", level: 80, icon: "fas fa-cubes", color: "#3b82f6" }
    ]
  },
  {
    title: "Bases de Données & DevOps",
    categoryIcon: "fas fa-database",
    skills: [
      { name: "PostgreSQL & MySQL", level: 84, icon: "fas fa-database", color: "#336791" },
      { name: "Docker & Conteneurs", level: 75, icon: "fab fa-docker", color: "#2496ed" },
      { name: "Git & Versioning", level: 88, icon: "fab fa-git-alt", color: "#f05032" }
    ]
  },
  {
    title: "Conception & Outils",
    categoryIcon: "fas fa-pen-nib",
    skills: [
      { name: "Conception UML / Modélisation", level: 85, icon: "fas fa-project-diagram", color: "#10b981" },
      { name: "Illustrator & Photoshop", level: 70, icon: "fas fa-palette", color: "#ff9a00" }
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2 className="section-title">Mes Compétences Techniques</h2>
        <p className="skills-subtitle">
          Estimation de mon niveau de maîtrise basé sur mes projets académiques, personnels et professionnels.
        </p>

        <div className="skills-grid">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              className="skills-category-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: catIdx * 0.15 }}
            >
              <div className="category-header">
                <i className={cat.categoryIcon} />
                <h3>{cat.title}</h3>
              </div>

              <div className="skills-list">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">
                        <i className={skill.icon} style={{ color: skill.color }} />
                        {skill.name}
                      </span>
                      <motion.span
                        className="skill-percentage"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>

                    {/* Jauge d'animation */}
                    <div className="progress-bar-bg">
                      <motion.div
                        className="progress-bar-fill"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.2,
                          delay: 0.2,
                          ease: [0.25, 1, 0.5, 1] // Courbe d'animation fluide
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}