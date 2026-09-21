import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulation ou envoi via mailto / API
    const mailtoLink = `mailto:nzonteub@gmail.com?subject=${encodeURIComponent(
      formData.subject || "Contact Portfolio - " + formData.name
    )}&body=${encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Me Contacter</h2>
        <p className="contact-subtitle">
          Un projet en vue, une proposition de collaboration ou une opportunité de stage ?
          N'hésite pas à me contacter directement !
        </p>

        <div className="contact-grid">
          {/* Cartes d'informations de contact */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-envelope" />
              </div>
              <div>
                <h4>Email Direct</h4>
                <a href="mailto:nzonteub@gmail.com">nzonteub@gmail.com</a>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-phone-alt" />
              </div>
              <div>
                <h4>Téléphone / WhatsApp</h4>
                <a href="https://wa.me/237672017303" target="_blank" rel="noreferrer">
                  +237 672 01 73 03
                </a>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-map-marker-alt" />
              </div>
              <div>
                <h4>Localisation</h4>
                <p>Bonabéri - Mabanda, Douala, Cameroun</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fab fa-linkedin-in" />
              </div>
              <div>
                <h4>LinkedIn</h4>
                <a
                  href="https://linkedin.com/in/borisnzonteu"
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/borisnzonteu
                </a>
              </div>
            </div>

            {/* Boutons d'accès rapide */}
            <div className="quick-actions">
              <a
                href="https://wa.me/237672017303?text=Bonjour%20Boris,%20j'ai%20consulté%20ton%20portfolio..."
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp"
              >
                <i className="fab fa-whatsapp" /> Discuter sur WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Formulaire de message */}
          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="success-message">
                <i className="fas fa-paper-plane" />
                <h3>Message prêt à être envoyé !</h3>
                <p>Ton client de messagerie s'est ouvert pour valider l'envoi de ton courriel.</p>
                <button onClick={() => setSubmitted(false)} className="btn-reset">
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Ton nom ou entreprise"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Adresse Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="exemple@domaine.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Sujet</label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Opportunité, projet, question..."
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Décris ton projet ou ta demande..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-send">
                  <i className="fas fa-paper-plane" /> Envoyer le message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}