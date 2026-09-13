import { useEffect, useState } from "react";
import { projects as defaultProjects, type Project } from "../data/projects";

const STORAGE_KEY = "portfolio_custom_projects";

function loadCustomProjects(): Project[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Project[]) : [];
  } catch {
    return [];
  }
}

/**
 * Combine les projets par défaut (codés en dur) avec ceux ajoutés
 * dynamiquement depuis le site, persistés dans localStorage.
 */
export function useProjects() {
  const [customProjects, setCustomProjects] = useState<Project[]>(loadCustomProjects);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customProjects));
  }, [customProjects]);

  const addProject = (project: Project) => {
    setCustomProjects((prev) => [...prev, project]);
  };

  const removeProject = (id: string) => {
    setCustomProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return {
    projects: [...defaultProjects, ...customProjects],
    addProject,
    removeProject,
    isCustom: (id: string) => customProjects.some((p) => p.id === id)
  };
}