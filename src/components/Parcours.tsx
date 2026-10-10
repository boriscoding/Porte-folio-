import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimelineItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  location?: string;
  description: string;
  skills: string[];
  type: "experience" | "education";
}

const experiences: TimelineItem[] = [
  {
    id: "exp-1",
    period: "Juin 2025 - Août 2025",
    role: "Stagiaire Développeur Logiciel",
    organization: "CFPD - Makepe",
    location: "Douala, Cameroun",
    description: "Conception et développement de modules applicatifs, participation aux travaux d'ingénierie logicielle et suivi de projets.",
    skills: ["Full-Stack", "Ingénierie Logicielle", "Travail d'Équipe"],
    type: "experience"
  },
  {
    id: "exp-2",
    period: "2025 - Présent",
    role: "Co-fondateur & Développeur Lead",
    organization: "Nexora Labs & Nexora Academy",
    location: "Douala, Cameroun",
    description: "Création d'une agence IT et centre de formation. Déploiement d'architectures microservices, API REST (Spring Boot, Node.js) et création de contenus pédagogiques en algorithmique et programmation.",
    skills: ["Spring Boot", "TypeScript", "Docker", "Architecture Microservices"],
    type: "experience"
  },
  {
    id: "exp-3",
    period: "Édition 2026",
    role: "Participant aux Ateliers & Conférences",
    organization: "Conférence ETSIA / ETDIA",
    description: "Participation active aux sessions techniques, ateliers et échanges sur les nouvelles technologies et l'innovation numérique.",
    skills: ["IA", "Innovation Numérique", "Conférence Tech"],
    type: "experience"
  }
];

const education: TimelineItem[] = [
  {
    id: "edu-0",
    period: "2026 - 2027",
    role: "Licence Génie Logiciel",
    organization: "Institut Universitaire de la Côte (IUC)",
    location: "Douala, Cameroun",
    description: "Poursuite du cursus en Génie Logiciel avec approfondissement en architecture logicielle, ingénierie des systèmes distribués et gestion de projets IT.",
    skills: ["Architecture Logicielle", "Gestion de Projet", "Systèmes Distribués"],
    type: "education"
  },
  {
    id: "edu-1",
    period: "Octobre 2024 - Juin 2026",
    role: "BTS Génie Logiciel",
    organization: "Institut Universitaire de la Côte (IUC)",
    location: "Douala, Cameroun",
    description: "Spécialisation en développement d'applications, bases de données relationnelles / non-relationnelles, modélisation UML et méthodes agiles.",
    skills: ["Java", "Angular", "Spring Boot", "SQL / NoSQL", "Docker"],
    type: "education"
  },
  {
    id: "edu-2",
    period: "Janvier 2023 - Janvier 2024",
    role: "Baccalauréat C (Scientifique)",
    organization: "Enseignement Secondaire",
    description: "Solide formation théorique en mathématiques, physique et raisonnement logique.",
    skills: ["Mathématiques", "Algorithmique", "Physique"],
    type: "education"
  },
  {
    id: "edu-3",
    period: "2025",
    role: "International Computer Science Competition (ICSC)",
    organization: "Compétition Internationale",
    description: "Qualification et résolution d'épreuves de haut niveau en algorithmique et sciences informatiques.",
    skills: ["Algorithmique Avancée", "Problem Solving"],
    type: "education"
  }
];

export default function Parcours() {
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");
  const items = activeTab === "experience" ? experiences : education;

  return (
    <section id="parcours" className="parcours-section">
      <div className="container">
        <h2 className="section-title">Mon Parcours</h2>
        
        {/* Selecteur d'onglets */}
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === "experience" ? "active" : ""}`}
            onClick={() => setActiveTab("experience")}
          >
            <i className="fas fa-briefcase" /> Expériences Pro
          </button>
          <button
            className={`tab-btn ${activeTab === "education" ? "active" : ""}`}
            onClick={() => setActiveTab("education")}
          >
            <i className="fas fa-graduation-cap" /> Formations & Diplômes
          </button>
        </div>

        {/* Ligne du temps */}
        <div className="timeline">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === "experience" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTab === "experience" ? 20 : -20 }}
              transition={{ duration: 0.4 }}
            >
              {items.map((item) => (
                <div key={item.id} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <span className="period">{item.period}</span>
                    <h3>{item.role}</h3>
                    <h4 className="organization">
                      {item.organization} {item.location && `• ${item.location}`}
                    </h4>
                    <p>{item.description}</p>
                    <div className="timeline-tags">
                      {item.skills.map((skill) => (
                        <span key={skill} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}