import { createContext, useContext, useState } from "react";
import { products as defaultProducts, type Product } from "@/data/products";

const STORAGE_KEY = "scope_products_v1";

interface ProductsCtx {
  products: Product[];
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  resetToDefault: () => void;
  isCustomized: boolean;
}

const ProductsContext = createContext<ProductsCtx>(null!);

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultProducts;
    } catch {
      return defaultProducts;
    }
  });

  const [isCustomized, setIsCustomized] = useState(() => !!localStorage.getItem(STORAGE_KEY));

  const persist = (next: Product[]) => {
    setProducts(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setIsCustomized(true);
  };

  const addProduct = (p: Omit<Product, "id">) =>
    persist([...products, { ...p, id: `custom_${Date.now()}` }]);

  const updateProduct = (p: Product) =>
    persist(products.map(x => (x.id === p.id ? p : x)));

  const deleteProduct = (id: string) =>
    persist(products.filter(x => x.id !== id));

  const resetToDefault = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProducts(defaultProducts);
    setIsCustomized(false);
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, resetToDefault, isCustomized }}>
      {children}
    </ProductsContext.Provider>
  );
};
