import { createContext, useContext, useState } from "react";
import { partners as defaultPartners, type Partner } from "@/data/partners";

const STORAGE_KEY = "scope_partners_v1";

interface PartnersCtx {
  partners: Partner[];
  addPartner: (p: Omit<Partner, "id">) => void;
  updatePartner: (p: Partner) => void;
  deletePartner: (id: string) => void;
  resetToDefault: () => void;
  isCustomized: boolean;
}

const PartnersContext = createContext<PartnersCtx>(null!);

export const usePartners = () => useContext(PartnersContext);

export const PartnersProvider = ({ children }: { children: React.ReactNode }) => {
  const [partners, setPartners] = useState<Partner[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultPartners;
    } catch {
      return defaultPartners;
    }
  });

  const [isCustomized, setIsCustomized] = useState(() => !!localStorage.getItem(STORAGE_KEY));

  const persist = (next: Partner[]) => {
    setPartners(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setIsCustomized(true);
  };

  const addPartner = (p: Omit<Partner, "id">) => {
    const id = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    persist([...partners, { ...p, id }]);
  };

  const updatePartner = (p: Partner) =>
    persist(partners.map(x => (x.id === p.id ? p : x)));

  const deletePartner = (id: string) =>
    persist(partners.filter(x => x.id !== id));

  const resetToDefault = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPartners(defaultPartners);
    setIsCustomized(false);
  };

  return (
    <PartnersContext.Provider value={{ partners, addPartner, updatePartner, deletePartner, resetToDefault, isCustomized }}>
      {children}
    </PartnersContext.Provider>
  );
};
