import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { runCardioPrediction, type CardioResult } from "../utils/cardioPrediction";

interface CardioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CardioModal({ isOpen, onClose }: CardioModalProps) {
  const [age, setAge] = useState(45);
  const [bps, setBps] = useState(125);
  const [chol, setChol] = useState(190);
  const [smoker, setSmoker] = useState(false);
  const [result, setResult] = useState<CardioResult | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(runCardioPrediction({ age, bps, chol, smoker }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal active"
          id="cardioModal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="modal-header">
              <h3>
                <i className="fas fa-heartbeat" /> Simulateur Cardio Predict
              </h3>
              <button className="close-modal" onClick={onClose} aria-label="Fermer">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form id="cardioForm" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="age">Âge du patient (ans)</label>
                  <input
                    type="number"
                    id="age"
                    className="form-control"
                    min={1}
                    max={120}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bps">Pression Artérielle Systolique (mmHg)</label>
                  <input
                    type="number"
                    id="bps"
                    className="form-control"
                    min={80}
                    max={220}
                    value={bps}
                    onChange={(e) => setBps(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="chol">Taux de Cholestérol total (mg/dL)</label>
                  <input
                    type="number"
                    id="chol"
                    className="form-control"
                    min={100}
                    max={400}
                    value={chol}
                    onChange={(e) => setChol(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Habitudes de vie (Tabagisme)</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="smoker"
                        checked={!smoker}
                        onChange={() => setSmoker(false)}
                      />{" "}
                      Non-fumeur
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="smoker"
                        checked={smoker}
                        onChange={() => setSmoker(true)}
                      />{" "}
                      Fumeur actif
                    </label>
                  </div>
                </div>
                <button type="submit" className="btn-predict">
                  Analyser le risque
                </button>
              </form>

              {result && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className={`result-box active result-${result.level}`}
                >
                  <div id="resultStatus">{result.status}</div>
                  <div className="result-score" id="resultPercentage">
                    {result.riskPercentage} %
                  </div>
                  <p id="resultAdvice">{result.advice}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}