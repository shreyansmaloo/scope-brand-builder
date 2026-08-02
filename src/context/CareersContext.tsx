import { createContext, useContext, useState } from "react";
import { jobOpenings as defaultOpenings, type JobOpening } from "@/data/careers";

const STORAGE_KEY = "scope_careers_v1";

interface CareersCtx {
  openings: JobOpening[];
  addOpening: (o: Omit<JobOpening, "id">) => void;
  updateOpening: (o: JobOpening) => void;
  deleteOpening: (id: string) => void;
  resetToDefault: () => void;
  isCustomized: boolean;
}

const CareersContext = createContext<CareersCtx>(null!);

export const useCareers = () => useContext(CareersContext);

export const CareersProvider = ({ children }: { children: React.ReactNode }) => {
  const [openings, setOpenings] = useState<JobOpening[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultOpenings;
    } catch {
      return defaultOpenings;
    }
  });

  const [isCustomized, setIsCustomized] = useState(() => !!localStorage.getItem(STORAGE_KEY));

  const persist = (next: JobOpening[]) => {
    setOpenings(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setIsCustomized(true);
  };

  const addOpening = (o: Omit<JobOpening, "id">) => {
    const id = `${o.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}_${Date.now()}`;
    persist([...openings, { ...o, id }]);
  };

  const updateOpening = (o: JobOpening) =>
    persist(openings.map(x => (x.id === o.id ? o : x)));

  const deleteOpening = (id: string) =>
    persist(openings.filter(x => x.id !== id));

  const resetToDefault = () => {
    localStorage.removeItem(STORAGE_KEY);
    setOpenings(defaultOpenings);
    setIsCustomized(false);
  };

  return (
    <CareersContext.Provider value={{ openings, addOpening, updateOpening, deleteOpening, resetToDefault, isCustomized }}>
      {children}
    </CareersContext.Provider>
  );
};
