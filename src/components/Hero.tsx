import { motion } from "framer-motion";
import Background3D from "./Background3D";

export default function Hero() {
  return (
    <header className="hero" style={{ position: "relative", overflow: "hidden" }}>
      <Background3D />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Architecture Logicielle, <br />
          <span className="highlight">Full-Stack & IA</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Développeur en Génie Logiciel basé à Douala. Spécialisé dans les architectures
          microservices et l'intégration de technologies modernes.
        </motion.p>
      </div>
    </header>
  );
}