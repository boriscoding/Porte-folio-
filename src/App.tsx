import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Projects from "./components/Projects";
import Skills from "./components/Skills"; // <--- Import ici
import Parcours from "./components/Parcours";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <Stats />
      <Projects onOpenModal={(id) => console.log("Modal:", id)} />
      <Skills /> {/* <--- Placé juste après les projets */}
      <Parcours />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}