import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export default function QRCodeModal({ isOpen, onClose, url, title }: QRCodeModalProps) {
  const [copied, setCopied] = useState(false);
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&data=${encodeURIComponent(url)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard indisponible, on ignore silencieusement
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal active"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{ maxWidth: "340px", textAlign: "center" }}
          >
            <div className="modal-header">
              <h3>
                <i className="fas fa-qrcode" style={{ color: "var(--accent)", marginRight: "8px" }} />
                Accès rapide
              </h3>
              <button className="close-modal" onClick={onClose} aria-label="Fermer">
                &times;
              </button>
            </div>

            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem" }}>{title}</p>

            <div
              style={{
                background: "#fff",
                display: "inline-block",
                padding: "12px",
                borderRadius: "12px",
                maxWidth: "100%"
              }}
            >
              <img
                src={qrSrc}
                alt={`QR code vers ${title}`}
                style={{ width: "min(220px, 100%)", height: "auto", display: "block" }}
              />
            </div>

            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                margin: "1rem 0 0.4rem",
                wordBreak: "break-all"
              }}
            >
              {url}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "0.8rem" }}>
              <button
                onClick={handleCopy}
                style={{
                  flex: "1 1 120px",
                  padding: "9px",
                  backgroundColor: "var(--bg-elevated-2, #334155)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-soft, #475569)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.85rem"
                }}
              >
                <i className={copied ? "fas fa-check" : "fas fa-copy"} style={{ marginRight: "6px" }} />
                {copied ? "Copié !" : "Copier le lien"}
              </button>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: "1 1 120px",
                  padding: "9px",
                  backgroundColor: "var(--accent)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <i className="fas fa-external-link-alt" style={{ marginRight: "6px" }} />
                Ouvrir
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}