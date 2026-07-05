import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Search } from "lucide-react";
import logoImg from "@/assets/logo.png";

const searchPlaceholders = [
  "Search products, ingredients, principals...",
  "Searching for excipients...",
  "Searching for cosmetics...",
  "Searching for food ingredients...",
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Principals", href: "/principals" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setSearchQuery("");
  }, [location]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  if (location.pathname === "/creative-home" || location.pathname === "/hero-variants") {
    return null;
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background shadow-sm transition-all duration-300"
        initial={false}
        animate={{ height: scrolled ? 64 : 88 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container-scope flex h-full items-center justify-between">
          {/* Left: Logo */}
          <div className="flex flex-1 items-center justify-start overflow-visible">
            <Link to="/" className="flex flex-col items-center overflow-visible">
              <img
                src={logoImg}
                alt="Scope Ingredients"
                className="w-auto object-contain transition-all duration-300"
                style={{
                  height: scrolled ? 52 : 68,
                }}
              />
            </Link>
          </div>

          {/* Center: Desktop nav */}
          <div className="hidden shrink-0 items-center justify-center gap-2 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`flex items-center gap-1 rounded-lg px-4 py-2 font-display text-[13px] font-semibold uppercase tracking-widest transition-colors ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="hidden flex-1 items-center justify-end gap-4 lg:flex">
            <form 
              onSubmit={handleSearch} 
              className="relative flex items-center w-full max-w-[240px] xl:max-w-[300px]"
            >
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholders[placeholderIndex]}
                  className="w-full rounded-full border border-border/60 bg-muted py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-foreground/40 transition-all focus:border-primary/30 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </form>
            <Link
              to="/request-sample"
              className="shrink-0 rounded-full bg-primary px-5 py-2.5 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-light hover:shadow-md"
            >
              Request Sample
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="flex flex-1 items-center justify-end gap-2 lg:hidden">
            <button
              className="rounded-lg p-2 text-foreground active:scale-95 transition-transform"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Search Modal Overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-dark/80 p-4 backdrop-blur-sm"
              onClick={() => setSearchOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
              >
                <form onSubmit={handleSearch} className="relative flex items-center">
                  <Search className="absolute left-6 h-6 w-6 text-muted-foreground" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={searchPlaceholders[placeholderIndex]}
                    className="h-20 w-full bg-transparent pl-16 pr-20 font-display text-xl text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                  <div className="absolute right-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => { setSearchQuery(""); setSearchOpen(false); }}
                      className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile drawer rendering */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Sliding Drawer element */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[70] w-4/5 max-w-sm border-r border-border bg-background pt-6 shadow-2xl lg:hidden"
            >
              <div className="flex h-full flex-col overflow-y-auto px-6 pb-8">
                <div className="mb-4 flex items-center justify-between pb-4 border-b border-border">
                  <span className="font-display text-lg font-bold text-foreground tracking-wider">MENU</span>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="rounded-full bg-muted p-2 text-foreground transition-all hover:bg-primary hover:text-primary-foreground active:scale-95"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile Search */}
                <div className="mb-6">
                  <form onSubmit={(e) => { handleSearch(e); setMobileOpen(false); }} className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full rounded-full border border-border bg-muted py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary/30 focus:outline-none transition-all"
                    />
                  </form>
                </div>

                <div className="flex-1 space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.label} className="border-b border-border/50 last:border-0">
                      <Link
                        to={link.href}
                        className={`block py-4 font-display text-lg font-medium transition-colors ${
                          location.pathname === link.href ? "text-primary" : "text-foreground/80 hover:text-primary"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-6 pt-6 border-t border-border">
                  <Link
                    to="/request-sample"
                    className="block w-full rounded-full bg-primary py-3.5 text-center font-display text-sm font-semibold text-primary-foreground transition-transform active:scale-95"
                    onClick={() => setMobileOpen(false)}
                  >
                    Request a Sample
                  </Link>
                  <a href="tel:+914440400400" className="flex items-center justify-center gap-2 font-body text-sm text-foreground/50 transition-colors hover:text-primary">
                    <Phone className="h-4 w-4" /> +91 44 4040 0400
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
