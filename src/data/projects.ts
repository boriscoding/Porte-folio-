export type ProjectTheme = "agri" | "malimba" | "sante" | "ihm";

export interface Project {
  id: string;
  theme: ProjectTheme;
  category: string;
  title: string;
  description: string;
  tags: string[];
  icon: string; // classe Font Awesome pour le mockup visuel
  mockupLabel: string;
  /** URL publique du projet déployé — si renseignée, un bouton QR Code apparaît sur la carte */
  demoUrl?: string;
  action:
    | { type: "link"; label: string; icon: string; href?: string }
    | { type: "disabled"; label: string; icon: string }
    | { type: "modal"; label: string; icon: string; modalId: string };
}

export const projects: Project[] = [
  {
    id: "agriconnect",
    theme: "agri",
    category: "Logistique & Agrotech",
    title: "AgriConnect",
    description:
      "Plateforme complète dédiée à l'optimisation de la chaîne logistique agricole, permettant la connexion et la gestion de flux entre producteurs et transporteurs.",
    tags: ["Spring Boot", "Angular", "Microservices", "PostgreSQL"],
    icon: "fas fa-leaf",
    mockupLabel: "[AgriConnect]",
   demoUrl: "https://agrilinkbycam.netlify.app", // decommentez une fois deploye
    action: { type: "disabled", label: "Bientôt disponible", icon: "fas fa-link" },
  },
  {
    id: "malimba",
    theme: "malimba",
    category: "Application Web Interactive",
    title: "Projet Malimba",
    description:
      "Application premium mettant en avant une gestion dynamique et fluide des flux utilisateurs ainsi qu'un design d'interface soigné et interactif.",
    tags: ["Web Dev", "UX/UI", "Architecture Logicielle"],
    icon: "fas fa-gem",
    mockupLabel: "[Malimba]",
    action: { type: "disabled", label: "Client Privé", icon: "fas fa-link" },
  },
  {
    id: "cardio",
    theme: "sante",
    category: "Intelligence Artificielle & Santé",
    title: "Prédiction de Maladies Cardiaques",
    description:
      "Application web interactive exploitant une logique algorithmique et de Machine Learning pour évaluer les probabilités et niveaux de risque de pathologies cardiaques (hypertension, arythmie).",
    tags: ["Machine Learning", "JavaScript", "UI Modale", "Algorithmes"],
    icon: "fas fa-heartbeat",
    mockupLabel: "[Cardio Predict]",
   demoUrl: "https://malimbaunivers.com", // decommentez une fois deploye
    action: { type: "modal", label: "Lancer la Simulation", icon: "fas fa-play", modalId: "cardio" },
  },
  {
    id: "ihm",
    theme: "ihm",
    category: "Desktop Architecture",
    title: "Interfaces Homme-Machine (IHM)",
    description:
      "Conception et développement d'applications de bureau robustes et ergonomiques fondées sur l'architecture et le pattern MVC.",
    tags: ["Java Swing", "MVC", "Modélisation BD"],
    icon: "fas fa-desktop",
    mockupLabel: "[Java Swing]",
    action: { type: "disabled", label: "Code source", icon: "fas fa-code" },
  },
];

export interface Certification {
  icon: string;
  title: string;
  description: string;
}

export const certifications: Certification[] = [
  {
    icon: "fab fa-free-code-camp",
    title: "freeCodeCamp",
    description: "Spécialisation avancée en modèles de langage (LLMs) et Agents IA.",
  },
  {
    icon: "fas fa-mobile-alt",
    title: "freeCodeCamp",
    description: "Cursus approfondi en Développement Mobile moderne.",
  },
];

export interface StackItem {
  icon: string;
  title: string;
  description: string;
}

export const stackItems: StackItem[] = [
  {
    icon: "fas fa-server",
    title: "Backend & DevOps",
    description: "Spring Boot, Microservices, Docker, Docker Compose",
  },
  {
    icon: "fas fa-code",
    title: "Frontend & Mobile",
    description: "Angular, Frameworks Mobiles, HTML5/CSS3",
  },
  {
    icon: "fas fa-database",
    title: "Bases de données",
    description: "PostgreSQL, MongoDB, MySQL",
  },
  {
    icon: "fas fa-robot",
    title: "Intelligence Artificielle",
    description: "LLMs, Agents IA, Ingénierie de Prompts",
  },
];