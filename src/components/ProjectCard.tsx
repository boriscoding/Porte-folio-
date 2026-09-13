import { useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "../data/projects";

import QRCodeModal from "./QRCodeModal";

interface ProjectCardProps {
  project: Project;
  onOpenModal?: (modalId: string) => void;
}

export default function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const { theme, category, title, description, tags, icon, mockupLabel, action, demoUrl } = project;
  const [isQrOpen, setIsQrOpen] = useState(false);

  return (
    <>
      <motion.div
        className={`project-card theme-${theme}`}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ y: -6, transition: { duration: 0.2 } }}
        transition={{ duration: 0.6 }}
      >
        <div className="project-content">
          <span className="category">{category}</span>
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="tags">
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {action.type === "disabled" && (
              <button className="btn-demo" disabled style={{ opacity: 0.6, cursor: "not-allowed" }}>
                <i className={action.icon} /> {action.label}
              </button>
            )}

            {action.type === "link" && (
              <motion.a
                whileTap={{ scale: 0.95 }}
                className="btn-demo"
                href={action.href ?? "#"}
                target="_blank"
                rel="noreferrer"
              >
                <i className={action.icon} /> {action.label}
              </motion.a>
            )}

            {action.type === "modal" && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="btn-demo"
                onClick={() => action.modalId && onOpenModal?.(action.modalId)}
              >
                <i className={action.icon} /> {action.label}
              </motion.button>
            )}

            {demoUrl && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="btn-demo"
                onClick={() => setIsQrOpen(true)}
                title="Afficher le QR code"
                style={{ background: "transparent", border: "1px solid currentColor" }}
              >
                <i className="fas fa-qrcode" /> QR Code
              </motion.button>
            )}
          </div>
        </div>

        <div className="project-visual">
          <div className="mockup">
            <i className={icon} /> {mockupLabel}
          </div>
        </div>
      </motion.div>

      {demoUrl && (
        <QRCodeModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} url={demoUrl} title={title} />
      )}
    </>
  );
}