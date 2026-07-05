import { createContext, useContext, useState } from "react";
import { articles as defaultArticles, type NewsArticle } from "@/data/news";

const STORAGE_KEY = "scope_news_v1";

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
  const [articles, setArticles] = useState<NewsArticle[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultArticles;
    } catch {
      return defaultArticles;
    }
  });

  const [isCustomized, setIsCustomized] = useState(() => !!localStorage.getItem(STORAGE_KEY));

  const persist = (next: NewsArticle[]) => {
    setArticles(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setIsCustomized(true);
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
    localStorage.removeItem(STORAGE_KEY);
    setArticles(defaultArticles);
    setIsCustomized(false);
  };

  return (
    <NewsContext.Provider value={{ articles, addArticle, updateArticle, deleteArticle, resetToDefault, isCustomized }}>
      {children}
    </NewsContext.Provider>
  );
};
