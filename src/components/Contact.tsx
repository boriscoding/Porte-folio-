import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

/**
 * ====================== CONFIGURATION EMAILJS ======================
 * - SERVICE_ID  : EmailJS → Email Services
 * - TEMPLATE_ID : EmailJS → Email Templates
 * - PUBLIC_KEY  : EmailJS → Account → General → "Public Key"
 *                 (JAMAIS la Private Key dans le code front-end)
 *
 * Le template doit utiliser exactement ces variables :
 *   {{name}}, {{from_email}}, {{message}}, {{time}}
 * ======================================================================
 */
const EMAILJS_SERVICE_ID = "service_ngs51o5";
const EMAILJS_TEMPLATE_ID = "template_ouf7e7p";
const EMAILJS_PUBLIC_KEY = "dUo4AN0ZeOsXHLksC"; // ← clé PUBLIQUE (à mettre à jour si vous faites "Refresh Keys")

type SendState = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SendState>("idle");
  const [errorDetail, setErrorDetail] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setErrorDetail("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name,
          from_email: email,
          message,
          time: new Date().toLocaleString("fr-FR", {
            dateStyle: "long",
            timeStyle: "short",
          }),
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err: any) {
      const detail = err?.text || err?.message || JSON.stringify(err);
      console.error("Échec de l'envoi EmailJS — détail :", detail);
      setErrorDetail(detail);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <section id="contact-form" className="contact-form-section">
      <div className="container">
        <h2 className="section-title">Me contacter</h2>
        <p className="contact-subtitle">
          Un projet en tête, une opportunité, ou simplement envie d'échanger ?
          Écrivez-moi directement.
        </p>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="contact-name">Nom</label>
            <input
              id="contact-name"
              className="form-control"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              className="form-control"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              className="form-control"
              required
              style={{ minHeight: "120px", resize: "vertical" }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Votre message..."
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="btn-predict"
            disabled={status === "sending"}
          >
            {status === "sending" ? (
              <>
                <i className="fas fa-spinner fa-spin" /> Envoi en cours...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane" /> Envoyer le message
              </>
            )}
          </motion.button>

          {status === "success" && (
            <p className="contact-feedback contact-success">
              <i className="fas fa-check-circle" /> Message envoyé avec succès !
              Je vous répondrai rapidement.
            </p>
          )}
          {status === "error" && (
            <p className="contact-feedback contact-error">
              <i className="fas fa-exclamation-circle" /> Échec de l'envoi.
              Réessayez ou écrivez-moi directement par email.
              {errorDetail && <small> ({errorDetail})</small>}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}