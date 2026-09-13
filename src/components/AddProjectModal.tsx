import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "../data/projects";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (project: Project) => void;
}

const SECRET_CODE = "2026";

const emptyDraft = {
  title: "",
  category: "",
  description: "",
  tags: "",
  icon: "fas fa-code",
  mockupLabel: "Aperçu du projet",
  demoUrl: ""
};

export default function AddProjectModal({ isOpen, onClose, onAdd }: AddProjectModalProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [draft, setDraft] = useState(emptyDraft);

  const reset = () => {
    setUnlocked(false);
    setCode("");
    setCodeError("");
    setDraft(emptyDraft);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleVerifyCode = (e: FormEvent) => {
    e.preventDefault();
    if (code === SECRET_CODE) {
      setUnlocked(true);
      setCodeError("");
    } else {
      setCodeError("Code secret incorrect. Accès refusé !");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const id = draft.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `projet-${Date.now()}`;

    const newProject = {
      id: `${id}-${Date.now()}`,
      theme: "ihm" as const,
      category: draft.category || "Projet",
      title: draft.title,
      description: draft.description,
      tags: draft.tags.split(",").map((t) => t.trim()).filter(Boolean),
      icon: draft.icon || "fas fa-code",
      mockupLabel: draft.mockupLabel || "Aperçu du projet",
      demoUrl: draft.demoUrl.trim() || undefined,
      action: draft.demoUrl.trim()
        ? { type: "link" as const, label: "Voir en ligne", icon: "fas fa-external-link-alt", href: draft.demoUrl.trim() }
        : { type: "disabled" as const, label: "Démo indisponible", icon: "fas fa-ban" }
    };

    onAdd(newProject as Project);
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal active"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="modal-header">
              <h3>
                <i className="fas fa-plus-circle" style={{ color: "var(--accent)", marginRight: "8px" }} />
                Ajouter un projet
              </h3>
              <button className="close-modal" onClick={handleClose} aria-label="Fermer">
                &times;
              </button>
            </div>

            {!unlocked ? (
              <form onSubmit={handleVerifyCode} className="form-group" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <label>Cette action est protégée. Entrez le code secret pour continuer.</label>
                <input
                  type="password"
                  className="form-control"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Code secret"
                  autoFocus
                />
                {codeError && <p style={{ color: "var(--danger)", fontSize: "0.85rem", margin: 0 }}>{codeError}</p>}
                <button type="submit" className="btn-predict">
                  Déverrouiller
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div className="form-group">
                  <label>Titre du projet</label>
                  <input
                    required
                    className="form-control"
                    value={draft.title}
                    onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Catégorie</label>
                  <input
                    className="form-control"
                    placeholder="ex : Web & Cloud"
                    value={draft.category}
                    onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    required
                    className="form-control"
                    style={{ minHeight: "80px", resize: "vertical" }}
                    value={draft.description}
                    onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Tags (séparés par des virgules)</label>
                  <input
                    className="form-control"
                    placeholder="React, Node.js, PostgreSQL"
                    value={draft.tags}
                    onChange={(e) => setDraft({ ...draft, tags: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Icône (classe FontAwesome)</label>
                  <input
                    className="form-control"
                    value={draft.icon}
                    onChange={(e) => setDraft({ ...draft, icon: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Lien du projet en ligne (génère le QR code)</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://mon-projet.vercel.app"
                    value={draft.demoUrl}
                    onChange={(e) => setDraft({ ...draft, demoUrl: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-predict">
                  <i className="fas fa-check" style={{ marginRight: "6px" }} />
                  Publier le projet
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}