import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/layout/WhatsAppButton";
import MobileBottomBar from "./components/layout/MobileBottomBar";
import Index from "./pages/Index";
import About from "./pages/About";
import Pharma from "./pages/Pharma";
import Cosmetics from "./pages/Cosmetics";
import Food from "./pages/Food";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import RequestSample from "./pages/RequestSample";
import News from "./pages/News";
import Principals from "./pages/Principals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/pharma" element={<Pharma />} />
          <Route path="/cosmetics" element={<Cosmetics />} />
          <Route path="/food" element={<Food />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request-sample" element={<RequestSample />} />
          <Route path="/news" element={<News />} />
          <Route path="/principals" element={<Principals />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
        <MobileBottomBar />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
