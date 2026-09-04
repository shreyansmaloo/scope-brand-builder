import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { products as defaultProducts, type Product } from "@/data/products";
import { fetchServerData, saveServerData, resetServerData } from "@/lib/serverStore";

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
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [isCustomized, setIsCustomized] = useState(false);

  useEffect(() => {
    fetchServerData<Product[]>("products").then(data => {
      if (data && data.length) {
        setProducts(data);
        setIsCustomized(true);
      }
    });
  }, []);

  const persist = (next: Product[]) => {
    setProducts(next);
    setIsCustomized(true);
    saveServerData("products", next).then(ok => {
      if (!ok) toast.error("Failed to save — changes may not persist.");
    });
  };

  const addProduct = (p: Omit<Product, "id">) =>
    persist([...products, { ...p, id: `custom_${Date.now()}` }]);

  const updateProduct = (p: Product) =>
    persist(products.map(x => (x.id === p.id ? p : x)));

  const deleteProduct = (id: string) =>
    persist(products.filter(x => x.id !== id));

  const resetToDefault = () => {
    setProducts(defaultProducts);
    setIsCustomized(false);
    resetServerData("products").then(ok => {
      if (!ok) toast.error("Failed to reset — please try again.");
    });
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, resetToDefault, isCustomized }}>
      {children}
    </ProductsContext.Provider>
  );
};
