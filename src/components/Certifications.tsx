import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Images importées depuis le dossier "asset" à la racine du projet
// (src/components/Certifications.tsx -> ../../asset/...)
import freecodecampImg from "../../asset/freecapcode.png";
import icscImg from "../../asset/icsc.jpg";

interface Certification {
  organism: string;
  year: string;
  title: string;
  certId: string;
  image: string;
  description: string;
  tags: string[];
  verifyUrl?: string;
}

const certifications: Certification[] = [
  {
    organism: "freeCodeCamp / CodeCamp",
    year: "2025",
    title: "JavaScript Algorithms and Data Structures",
    certId: "FCC-JS-2025",
    image: freecodecampImg,
    description:
      "Certification validant la maîtrise des bases de JavaScript : structures de données, algorithmes, programmation orientée objet et résolution de problèmes.",
    tags: ["#Algorithms", "#DataStructures"],
    verifyUrl:
      "https://freecodecamp.org/certification/fcccf6f0180-8aa7-47cd-815d-c41e2427297f/javascript-algorithms-and-data-structures-v8"
  },
  {
    organism: "ICSC Organism",
    year: "2025",
    title: "International Computer Science Competition",
    certId: "QR-2025-FF5FA6079FB",
    image: icscImg,
    description:
      "Participation à la compétition internationale d'informatique : résolution d'algorithmes et logique de programmation sous contrainte de temps.",
    tags: ["#Algorithmique", "#ProblemSolving"],
    verifyUrl: "https://icscompetition.org/verify"
  }
];

export default function Certifications() {
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="certifications-section">
      <div className="container">
        <h2 className="section-title">Certifications & Accréditations</h2>
        <p className="certifications-subtitle">
          Validation officielle de mes compétences techniques et théoriques
        </p>

        <div className="cert-grid">
          {certifications.map((cert, index) => (
            <motion.div
              className="cert-card-full"
              key={cert.certId}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="cert-card-header">
                <span className="cert-organism">{cert.organism}</span>
                <span className="cert-year">{cert.year}</span>
              </div>

              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-id">ID: {cert.certId}</p>

              <button
                type="button"
                className="cert-image-wrap cert-image-preview"
                onClick={() => setActiveCert(cert)}
                aria-label={`Agrandir le certificat ${cert.title}`}
              >
                <img
                  src={cert.image}
                  alt={`Certificat ${cert.title}`}
                  loading="lazy"
                  className="cert-image-blurred"
                />
                <div className="cert-image-overlay">
                  <p className="cert-image-description">{cert.description}</p>
                  <span className="cert-image-zoom">
                    <i className="fas fa-search-plus" /> Voir le certificat
                  </span>
                </div>
              </button>

              <div className="cert-footer">
                <div className="cert-tags">
                  {cert.tags.map((tag) => (
                    <span key={tag} className="cert-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="cert-verify-link"
                  >
                    Voir <i className="fas fa-arrow-right" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeCert && (
          <motion.div
            className="cert-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCert(null)}
          >
            <motion.div
              className="cert-lightbox-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="cert-lightbox-close"
                onClick={() => setActiveCert(null)}
                aria-label="Fermer"
              >
                <i className="fas fa-times" />
              </button>
              <img
                src={activeCert.image}
                alt={`Certificat complet ${activeCert.title}`}
                className="cert-lightbox-image"
              />
              <div className="cert-lightbox-caption">
                <h3>{activeCert.title}</h3>
                <p>{activeCert.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}