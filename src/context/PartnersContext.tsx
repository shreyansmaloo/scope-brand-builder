import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { partners as defaultPartners, type Partner } from "@/data/partners";
import { fetchServerData, saveServerData, resetServerData } from "@/lib/serverStore";
import { slugify } from "@/lib/utils";

interface PartnersCtx {
  partners: Partner[];
  addPartner: (p: Omit<Partner, "id">) => void;
  updatePartner: (p: Partner) => void;
  deletePartner: (id: string) => void;
  importAll: (partners: Partner[]) => void;
  resetToDefault: () => void;
  isCustomized: boolean;
}

const PartnersContext = createContext<PartnersCtx>(null!);

export const usePartners = () => useContext(PartnersContext);

export const PartnersProvider = ({ children }: { children: React.ReactNode }) => {
  const [partners, setPartners] = useState<Partner[]>(defaultPartners);
  const [isCustomized, setIsCustomized] = useState(false);

  useEffect(() => {
    fetchServerData<Partner[]>("partners").then(data => {
      if (data && data.length) {
        setPartners(data);
        setIsCustomized(true);
      }
    });
  }, []);

  const persist = (next: Partner[]) => {
    setPartners(next);
    setIsCustomized(true);
    saveServerData("partners", next).then(ok => {
      if (!ok) toast.error("Failed to save. Changes may not persist.");
    });
  };

  const addPartner = (p: Omit<Partner, "id">) => {
    const id = slugify(p.name);
    persist([...partners, { ...p, id }]);
  };

  const updatePartner = (p: Partner) =>
    persist(partners.map(x => (x.id === p.id ? p : x)));

  const deletePartner = (id: string) =>
    persist(partners.filter(x => x.id !== id));

  const importAll = (next: Partner[]) => persist(next);

  const resetToDefault = () => {
    setPartners(defaultPartners);
    setIsCustomized(false);
    resetServerData("partners").then(ok => {
      if (!ok) toast.error("Failed to reset. Please try again.");
    });
  };

  return (
    <PartnersContext.Provider value={{ partners, addPartner, updatePartner, deletePartner, importAll, resetToDefault, isCustomized }}>
      {children}
    </PartnersContext.Provider>
  );
};
