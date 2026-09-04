import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { articles as defaultArticles, type NewsArticle } from "@/data/news";
import { fetchServerData, saveServerData, resetServerData } from "@/lib/serverStore";

interface NewsCtx {
  articles: NewsArticle[];
  addArticle: (a: Omit<NewsArticle, "id" | "slug">) => void;
  updateArticle: (a: NewsArticle) => void;
  deleteArticle: (id: string) => void;
  resetToDefault: () => void;
  isCustomized: boolean;
}

const NewsContext = createContext<NewsCtx>(null!);

export const useNews = () => useContext(NewsContext);

export const NewsProvider = ({ children }: { children: React.ReactNode }) => {
  const [articles, setArticles] = useState<NewsArticle[]>(defaultArticles);
  const [isCustomized, setIsCustomized] = useState(false);

  useEffect(() => {
    fetchServerData<NewsArticle[]>("news").then(data => {
      if (data && data.length) {
        setArticles(data);
        setIsCustomized(true);
      }
    });
  }, []);

  const persist = (next: NewsArticle[]) => {
    setArticles(next);
    setIsCustomized(true);
    saveServerData("news", next).then(ok => {
      if (!ok) toast.error("Failed to save — changes may not persist.");
    });
  };

  const addArticle = (a: Omit<NewsArticle, "id" | "slug">) => {
    const id = `news_${Date.now()}`;
    const slug = a.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    persist([...articles, { ...a, id, slug }]);
  };

  const updateArticle = (a: NewsArticle) => {
    const slug = a.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    persist(articles.map(x => (x.id === a.id ? { ...a, slug } : x)));
  };

  const deleteArticle = (id: string) =>
    persist(articles.filter(x => x.id !== id));

  const resetToDefault = () => {
    setArticles(defaultArticles);
    setIsCustomized(false);
    resetServerData("news").then(ok => {
      if (!ok) toast.error("Failed to reset — please try again.");
    });
  };

  return (
    <NewsContext.Provider value={{ articles, addArticle, updateArticle, deleteArticle, resetToDefault, isCustomized }}>
      {children}
    </NewsContext.Provider>
  );
};
