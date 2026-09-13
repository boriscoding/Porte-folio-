import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Profile {
  name: string;
  title: string;
  gender: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
}

const DEFAULT_PROFILE: Profile = {
  name: "Boris Nzonteu Ngouo",
  title: "Développeur Génie Logiciel & Architecte Full-Stack / IA",
  gender: "Masculin",
  email: "nzonteub@gmail.com",
  phone: "+237 6XX XX XX XX",
  location: "Douala, Cameroun",
  avatar: ""
};

export default function Navbar() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const SECRET_CODE = "2026";

  // 1. Gestion du profil sauvegardé dans localStorage
  const [profile, setProfile] = useState<Profile>(() => {
    const saved = localStorage.getItem("user_profile");
    return saved ? (JSON.parse(saved) as Profile) : DEFAULT_PROFILE;
  });

  const [draftProfile, setDraftProfile] = useState<Profile>(profile);

  // 2. Le site est en mode sombre uniquement (plus de bascule clair/sombre)
  useEffect(() => {
    document.documentElement.classList.add("dark-mode");
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }, []);

  // États de la Modale et de la Sécurité
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showCodePrompt, setShowCodePrompt] = useState(false);
  const [enteredCode, setEnteredCode] = useState("");
  const [codeError, setCodeError] = useState("");

  const getAvatarUrl = (name: string, customAvatar?: string) => {
    if (customAvatar && customAvatar.trim() !== "") {
      return customAvatar;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3b82f6&color=fff&bold=true&size=128`;
  };

  const handleOpenModal = () => {
    setDraftProfile(profile);
    setIsProfileOpen(true);
  };

  const handleCloseModal = () => {
    setIsProfileOpen(false);
    setIsEditing(false);
    setShowCodePrompt(false);
    setEnteredCode("");
    setCodeError("");
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredCode === SECRET_CODE) {
      setIsEditing(true);
      setShowCodePrompt(false);
      setEnteredCode("");
      setCodeError("");
    } else {
      setCodeError("Code secret incorrect. Accès refusé !");
    }
  };

  // Enregistrement permanent dans le localStorage
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(draftProfile);
    localStorage.setItem("user_profile", JSON.stringify(draftProfile));
    setIsEditing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDraftProfile((prev: Profile) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="container flex-nav">
          <div className="logo-section" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenModal}
              style={{
                background: "none",
                border: "2px solid #3b82f6",
                borderRadius: "50%",
                padding: "2px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
              }}
              title="Voir mon profil"
            >
              <img
                src={getAvatarUrl(profile.name, profile.avatar)}
                alt={profile.name}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  objectFit: "cover"
                }}
              />
            </motion.button>

            <div className="logo">
              Dev<span>Portfolio</span>
            </div>
          </div>

          <ul className="nav-links" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <li>
              <a href="#projets">Projets</a>
            </li>
            <li>
              <a href="#certifications">Certifications</a>
            </li>
            <li>
              <a href="#stack">Compétences</a>
            </li>

            <li>
              <a href="#contact" className="btn-contact">
                Me contacter
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Modal Profil */}
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            className="modal active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && handleCloseModal()}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              backdropFilter: "blur(5px)"
            }}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{
                backgroundColor: "#1e293b",
                color: "#f8fafc",
                padding: "2rem",
                borderRadius: "16px",
                maxWidth: "480px",
                width: "90%",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
                position: "relative",
                maxHeight: "90vh",
                overflowY: "auto"
              }}
            >
              <button
                onClick={handleCloseModal}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "transparent",
                  border: "none",
                  color: "#94a3b8",
                  fontSize: "1.5rem",
                  cursor: "pointer"
                }}
                aria-label="Fermer"
              >
                &times;
              </button>

              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <img
                    src={getAvatarUrl(
                      isEditing ? draftProfile.name : profile.name,
                      isEditing ? draftProfile.avatar : profile.avatar
                    )}
                    alt={profile.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      border: "3px solid #3b82f6",
                      objectFit: "cover",
                      boxShadow: "0 4px 14px rgba(59, 130, 246, 0.4)"
                    }}
                  />

                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        position: "absolute",
                        bottom: "4px",
                        right: "0px",
                        backgroundColor: "#3b82f6",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "32px",
                        height: "32px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.4)"
                      }}
                      title="Changer la photo"
                    >
                      <i className="fas fa-camera" style={{ fontSize: "0.85rem" }} />
                    </button>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />

                {!isEditing ? (
                  <>
                    <h2 style={{ fontSize: "1.4rem", margin: "10px 0 4px 0", color: "#ffffff" }}>
                      {profile.name}
                    </h2>
                    <p style={{ color: "#60a5fa", fontSize: "0.95rem", margin: 0, fontWeight: 500 }}>
                      {profile.title}
                    </p>
                  </>
                ) : (
                  <h3 style={{ color: "#3b82f6", margin: "10px 0 0 0" }}>Mode Édition du Profil</h3>
                )}
              </div>

              {/* Verification Code Secret */}
              {showCodePrompt && (
                <form onSubmit={handleVerifyCode} style={{ marginBottom: "1.5rem", textAlign: "center" }}>
                  <p style={{ fontSize: "0.9rem", color: "#cbd5e1", marginBottom: "10px" }}>
                    Entrez le code secret pour déverrouiller l'édition :
                  </p>
                  <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                    <input
                      type="password"
                      placeholder="Code secret"
                      value={enteredCode}
                      onChange={(e) => setEnteredCode(e.target.value)}
                      required
                      style={{
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "1px solid #475569",
                        backgroundColor: "#0f172a",
                        color: "#fff",
                        outline: "none"
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#3b82f6",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      Valider
                    </button>
                  </div>
                  {codeError && (
                    <p style={{ color: "#ef4444", fontSize: "0.85rem", marginTop: "8px" }}>
                      {codeError}
                    </p>
                  )}
                </form>
              )}

              {/* Formulaire Edition */}
              {isEditing ? (
                <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Changer la photo de profil</label>
                    <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                          padding: "8px 12px",
                          backgroundColor: "#334155",
                          color: "#3b82f6",
                          border: "1px solid #475569",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                          fontWeight: 500
                        }}
                      >
                        <i className="fas fa-upload" style={{ marginRight: "6px" }} /> Importer un fichier
                      </button>
                      {draftProfile.avatar && (
                        <button
                          type="button"
                          onClick={() => setDraftProfile({ ...draftProfile, avatar: "" })}
                          style={{
                            padding: "8px 12px",
                            backgroundColor: "#334155",
                            color: "#ef4444",
                            border: "1px solid #475569",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "0.85rem"
                          }}
                        >
                          Réinitialiser
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Ou coller le lien (URL) d'une image</label>
                    <input
                      type="url"
                      placeholder="https://exemple.com/photo.jpg"
                      value={draftProfile.avatar}
                      onChange={(e) => setDraftProfile({ ...draftProfile, avatar: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Nom complet</label>
                    <input
                      type="text"
                      value={draftProfile.name}
                      onChange={(e) => setDraftProfile({ ...draftProfile, name: e.target.value })}
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Titre / Spécialité</label>
                    <input
                      type="text"
                      value={draftProfile.title}
                      onChange={(e) => setDraftProfile({ ...draftProfile, title: e.target.value })}
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Sexe</label>
                    <input
                      type="text"
                      value={draftProfile.gender}
                      onChange={(e) => setDraftProfile({ ...draftProfile, gender: e.target.value })}
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Email</label>
                    <input
                      type="email"
                      value={draftProfile.email}
                      onChange={(e) => setDraftProfile({ ...draftProfile, email: e.target.value })}
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Téléphone</label>
                    <input
                      type="text"
                      value={draftProfile.phone}
                      onChange={(e) => setDraftProfile({ ...draftProfile, phone: e.target.value })}
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Localisation</label>
                    <input
                      type="text"
                      value={draftProfile.location}
                      onChange={(e) => setDraftProfile({ ...draftProfile, location: e.target.value })}
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
                    <button
                      type="submit"
                      style={{
                        flex: 1,
                        padding: "10px",
                        backgroundColor: "#10b981",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      Enregistrer
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      style={{
                        flex: 1,
                        padding: "10px",
                        backgroundColor: "#64748b",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.95rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1" }}>
                    <i className="fas fa-user" style={{ color: "#3b82f6", width: "20px" }} />
                    <span><strong>Sexe :</strong> {profile.gender}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1" }}>
                    <i className="fas fa-envelope" style={{ color: "#3b82f6", width: "20px" }} />
                    <span><strong>Email :</strong> {profile.email}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1" }}>
                    <i className="fas fa-phone" style={{ color: "#3b82f6", width: "20px" }} />
                    <span><strong>Téléphone :</strong> {profile.phone}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1" }}>
                    <i className="fas fa-map-marker-alt" style={{ color: "#3b82f6", width: "20px" }} />
                    <span><strong>Localisation :</strong> {profile.location}</span>
                  </div>
                </div>
              )}

              {!isEditing && (
                <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {!showCodePrompt && (
                    <button
                      onClick={() => setShowCodePrompt(true)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#94a3b8",
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        textDecoration: "underline"
                      }}
                    >
                      <i className="fas fa-lock" style={{ marginRight: "6px" }} /> Modifier le profil
                    </button>
                  )}
                  <a
                    href={`mailto:${profile.email}`}
                    style={{
                      padding: "8px 18px",
                      backgroundColor: "#3b82f6",
                      color: "#ffffff",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      marginLeft: "auto"
                    }}
                  >
                    Envoyer un e-mail
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 12px",
  borderRadius: "6px",
  border: "1px solid #475569",
  backgroundColor: "#0f172a",
  color: "#f8fafc",
  fontSize: "0.9rem",
  marginTop: "4px",
  outline: "none"
};