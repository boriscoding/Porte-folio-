export interface CardioInput {
  age: number;
  bps: number; // Pression artérielle systolique (mmHg)
  chol: number; // Cholestérol total (mg/dL)
  smoker: boolean;
}

export type RiskLevel = "low" | "medium" | "high";

export interface CardioResult {
  riskPercentage: number;
  level: RiskLevel;
  status: string;
  advice: string;
}

/**
 * Algorithme d'évaluation du risque cardiaque (simulation).
 * Reproduit fidèlement la logique de l'implémentation JS d'origine.
 */
export function runCardioPrediction(input: CardioInput): CardioResult {
  const { age, bps, chol, smoker } = input;
  let score = 0;

  // Facteur Âge
  if (age > 60) score += 25;
  else if (age > 45) score += 15;
  else if (age > 35) score += 5;

  // Facteur Pression Artérielle (mmHg)
  if (bps >= 160) score += 30; // Hypertension sévère
  else if (bps >= 140) score += 20; // Hypertension modérée
  else if (bps >= 130) score += 10; // Pré-hypertension

  // Facteur Cholestérol (mg/dL)
  if (chol >= 240) score += 25;
  else if (chol >= 200) score += 12;

  // Facteur Tabagisme
  if (smoker) score += 20;

  // Normalisation du score de risque simulé entre 5% et 95%
  const riskPercentage = Math.min(Math.max(score, 5), 95);

  if (riskPercentage < 30) {
    return {
      riskPercentage,
      level: "low",
      status: "Risque : Faible",
      advice:
        "Profil stable. Continuez à maintenir une activité physique régulière et une alimentation équilibrée.",
    };
  }

  if (riskPercentage < 60) {
    return {
      riskPercentage,
      level: "medium",
      status: "Risque : Modéré",
      advice: "Quelques indicateurs demandent de la vigilance. Pensez à surveiller périodiquement votre tension.",
    };
  }

  return {
    riskPercentage,
    level: "high",
    status: "Risque : Élevé",
    advice:
      "Alerte : plusieurs facteurs critiques identifiés. Une consultation médicale de contrôle est vivement recommandée.",
  };
}
