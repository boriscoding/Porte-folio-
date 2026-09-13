import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import AddProjectModal from "./AddProjectModal";
import { useProjects } from "../hooks/useProjects";

interface ProjectsProps {
  onOpenModal: (modalId: string) => void;
}

export default function Projects({ onOpenModal }: ProjectsProps) {
  const { projects, addProject } = useProjects();
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <section id="projets" className="projects-section">
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px"
          }}
        >
          <h2 className="section-title" style={{ margin: 0 }}>
            Mes Réalisations
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAddOpen(true)}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid currentColor",
              background: "transparent",
              color: "inherit",
              cursor: "pointer",
              fontSize: "0.85rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <i className="fas fa-plus" /> Ajouter un projet
          </motion.button>
        </div>

        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpenModal={onOpenModal} />
        ))}
      </div>

      <AddProjectModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onAdd={addProject} />
    </section>
  );
}