import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { jobOpenings as defaultOpenings, type JobOpening } from "@/data/careers";
import { fetchServerData, saveServerData, resetServerData } from "@/lib/serverStore";

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
  const [openings, setOpenings] = useState<JobOpening[]>(defaultOpenings);
  const [isCustomized, setIsCustomized] = useState(false);

  useEffect(() => {
    fetchServerData<JobOpening[]>("careers").then(data => {
      if (data && data.length) {
        setOpenings(data);
        setIsCustomized(true);
      }
    });
  }, []);

  const persist = (next: JobOpening[]) => {
    setOpenings(next);
    setIsCustomized(true);
    saveServerData("careers", next).then(ok => {
      if (!ok) toast.error("Failed to save. Changes may not persist.");
    });
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
    setOpenings(defaultOpenings);
    setIsCustomized(false);
    resetServerData("careers").then(ok => {
      if (!ok) toast.error("Failed to reset. Please try again.");
    });
  };

  return (
    <CareersContext.Provider value={{ openings, addOpening, updateOpening, deleteOpening, resetToDefault, isCustomized }}>
      {children}
    </CareersContext.Provider>
  );
};
