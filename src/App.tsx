import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects"; // 👈 SANS ACCOLADES
import CardioModal from "./components/CardioModal";
import Certifications from "./components/Certifications";
import Stack from "./components/Stack";
import Footer from "./components/Footer";

function App() {
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = openModalId ? "hidden" : "";
  }, [openModalId]);

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Projects onOpenModal={(id) => setOpenModalId(id)} />
      <Certifications />
      <Stack />
      <Footer />
      <CardioModal
        isOpen={openModalId === "cardioModal"}
        onClose={() => setOpenModalId(null)}
      />
    </div>
  );
}

export default App;