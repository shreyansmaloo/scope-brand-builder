import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ProductsProvider } from "./context/ProductsContext";
import { PartnersProvider } from "./context/PartnersContext";
import { NewsProvider } from "./context/NewsContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/layout/WhatsAppButton";
import ScrollToTop from "./components/layout/ScrollToTop";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import RequestSample from "./pages/RequestSample";
import News from "./pages/News";
import Principals from "./pages/Principals";
import NotFound from "./pages/NotFound";
import PrincipalDetail from "./pages/PrincipalDetail";
import Careers from "./pages/Careers";
import ProductDetail from "./pages/ProductDetail";
import NewHomePage from "./pages/NewHomePage";
import HeroVariants from "./pages/HeroVariants";
import CreativeHome from "./pages/CreativeHome";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

// Layout that wraps public pages with Navbar + Footer
const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
    <WhatsAppButton />
  </>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PartnersProvider>
          <ProductsProvider>
            <NewsProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  {/* Admin — standalone, no navbar/footer */}
                  <Route path="/admin" element={<Admin />} />

                  {/* Public site — all wrapped with Navbar + Footer */}
                  <Route element={<PublicLayout />}>
                    <Route path="/" element={<NewHomePage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/pharma" element={<Navigate to="/products?industry=pharma" replace />} />
                    <Route path="/cosmetics" element={<Navigate to="/products?industry=cosmetics" replace />} />
                    <Route path="/food" element={<Navigate to="/products?industry=food" replace />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/request-sample" element={<RequestSample />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/principals" element={<Principals />} />
                    <Route path="/principals/:id" element={<PrincipalDetail />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/creative-home" element={<CreativeHome />} />
                    <Route path="/hero-variants" element={<HeroVariants />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </NewsProvider>
          </ProductsProvider>
        </PartnersProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
