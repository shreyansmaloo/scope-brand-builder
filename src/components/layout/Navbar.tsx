import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown, Search } from "lucide-react";
import logoImg from "@/assets/logo.png";

const searchPlaceholders = [
  "Search products, ingredients, principals...",
  "Searching for some principle...",
  "Searching for some medicine...",
  "Searching for excipients...",
  "Searching for cosmetics...",
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Industry",
    href: "#",
    children: [
      {
        label: "Pharmaceuticals",
        href: "/pharma",
        sub: [
          { label: "Solid Orals", href: "/pharma#solid-orals" },
          { label: "Liquid Orals", href: "/pharma#liquid-orals" },
          { label: "Topicals", href: "/pharma#topicals" },
        ],
      },
      {
        label: "Cosmetics & Personal Care",
        href: "/cosmetics",
        sub: [
          { label: "Emollients", href: "/cosmetics#emollients" },
          { label: "Actives", href: "/cosmetics#actives" },
          { label: "Emulsifiers", href: "/cosmetics#emulsifiers" },
        ],
      },
      {
        label: "Food & Nutraceuticals",
        href: "/food",
        sub: [
          { label: "Stabilizers", href: "/food#stabilizers" },
          { label: "Sweeteners", href: "/food#sweeteners" },
          { label: "Functional Actives", href: "/food#actives" },
        ],
      },
    ],
  },
  { label: "Products", href: "/products" },
  { label: "Principals", href: "/principals" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileIndustryOpen, setMobileIndustryOpen] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    
    // Add escape key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false); // Also close mobile drawer on escape
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
    setActiveDropdown(null);
    setSearchOpen(false);
    setSearchQuery("");
    setMobileIndustryOpen(false);
  }, [location]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const isHome = location.pathname === "/";
  const navBg = scrolled || !isHome;

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navBg
            ? "bg-primary/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
        initial={false}
        animate={{ height: scrolled ? 56 : 100 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container-scope flex h-full items-center justify-between">
          {/* Left: Logo */}
          <div className="flex flex-1 items-center justify-start">
            <Link to="/" className="flex flex-col items-center">
              <img
                src={logoImg}
                alt="Scope Ingredients"
                className="w-auto object-contain transition-all duration-300"
                style={{ height: scrolled ? 36 : 56 }}
              />
            </Link>
          </div>

          {/* Center: Desktop nav */}
          <div className="hidden shrink-0 items-center justify-center gap-0.5 lg:flex">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.href === "#" ? (
                  <button
                    className={`flex items-center gap-1 rounded-lg px-3 py-2 font-body text-sm font-medium transition-colors ${
                      ["/pharma", "/cosmetics", "/food"].includes(location.pathname)
                        ? "text-accent"
                        : "text-primary-foreground/80 hover:text-accent"
                    }`}
                  >
                    {link.label}
                    {link.children && <ChevronDown className="h-3 w-3" />}
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className={`flex items-center gap-1 rounded-lg px-3 py-2 font-body text-sm font-medium transition-colors ${
                      location.pathname === link.href
                        ? "text-accent"
                        : "text-primary-foreground/80 hover:text-accent"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Industry Mega-menu */}
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="fixed left-0 right-0 top-full mt-0 border-t border-border/10 bg-card shadow-2xl"
                    >
                      <div className="container-scope grid grid-cols-3 gap-8 py-8">
                        {link.children.map((child) => (
                          <div key={child.label} className="space-y-2">
                            <Link
                              to={child.href}
                              className="flex items-center gap-2 rounded-lg px-3 py-2.5 font-display text-sm font-bold text-foreground transition-colors hover:bg-accent-pale hover:text-accent"
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                                {child.label === "Pharmaceuticals" ? "💊" : child.label === "Cosmetics & Personal Care" ? "✨" : "🌿"}
                              </span>
                              {child.label}
                            </Link>
                            {"sub" in child && child.sub?.map((sub) => (
                              <Link
                                key={sub.label}
                                to={sub.href}
                                className="block rounded-md px-3 py-1.5 pl-14 font-body text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                              >
                                {sub.label}
                              </Link>
                            ))}
                            <Link
                              to={child.href}
                              className="block px-3 pl-14 font-body text-xs font-medium text-accent hover:underline"
                            >
                              View all →
                            </Link>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="hidden flex-1 items-center justify-end gap-3 lg:flex">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-primary-foreground/70 transition-colors hover:bg-primary-light hover:text-accent"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
              <span className="hidden xl:inline">Search</span>
            </button>
            <Link
              to="/request-sample"
              className="rounded-full bg-accent px-5 py-2 font-display text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-light hover:shadow-lg"
            >
              Request Sample
            </Link>
          </div>

          {/* Mobile: search + hamburger */}
          <div className="flex flex-1 items-center justify-end gap-2 lg:hidden">
            <button
              className="rounded-lg p-2 text-primary-foreground"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              className="rounded-lg p-2 text-primary-foreground"
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
              className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/80 p-4 backdrop-blur-sm"
              onClick={() => setSearchOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl overflow-hidden rounded-2xl border border-primary-muted/20 bg-primary shadow-2xl"
              >
                <form onSubmit={handleSearch} className="relative flex items-center">
                  <Search className="absolute left-6 h-6 w-6 text-primary-foreground/50" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={searchPlaceholders[placeholderIndex]}
                    className="h-20 w-full bg-transparent pl-16 pr-20 font-display text-xl text-primary-foreground placeholder:text-primary-foreground/40 placeholder:transition-opacity placeholder:duration-500 focus:outline-none"
                  />
                  <div className="absolute right-4 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => { setSearchQuery(""); setSearchOpen(false); }}
                      className="rounded-full p-2 text-primary-foreground/50 transition-colors hover:bg-primary-light hover:text-primary-foreground"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </form>
                {/* Optional suggestions area could go below here */}
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
              className="fixed inset-y-0 left-0 z-[70] w-4/5 max-w-sm border-r border-primary-muted/20 bg-primary pt-6 shadow-2xl lg:hidden"
            >
              <div className="flex h-full flex-col overflow-y-auto px-6 pb-8">
                {/* Header with Close Button */}
                <div className="mb-6 flex items-center justify-between pb-4 border-b border-primary-muted/20">
                  <span className="font-display text-lg font-bold text-primary-foreground tracking-wider">MENU</span>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="rounded-full bg-primary-light p-2 text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.label} className="border-b border-primary-muted/10 last:border-0">
                      {link.children ? (
                        <div>
                          <button
                            onClick={() => setMobileIndustryOpen(!mobileIndustryOpen)}
                            className="flex w-full items-center justify-between py-4 font-display text-lg font-medium text-primary-foreground transition-colors hover:text-accent"
                          >
                            {link.label}
                            <ChevronDown className={`h-5 w-5 transition-transform ${mobileIndustryOpen ? "rotate-180 text-accent" : ""}`} />
                          </button>
                          <AnimatePresence>
                            {mobileIndustryOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden pb-4 pl-4"
                              >
                                {link.children.map((child) => (
                                  <Link
                                    key={child.label}
                                    to={child.href}
                                    className="block py-2.5 font-body text-base text-primary-foreground/70 transition-colors hover:text-accent"
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          to={link.href}
                          className="block py-4 font-display text-lg font-medium text-primary-foreground transition-colors hover:text-accent"
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer Actions */}
                <div className="mt-8 space-y-6 pt-6 border-t border-primary-muted/20">
                  <Link
                    to="/request-sample"
                    className="block w-full rounded-full bg-accent py-3.5 text-center font-display text-sm font-semibold text-accent-foreground transition-transform active:scale-95"
                    onClick={() => setMobileOpen(false)}
                  >
                    Request a Sample
                  </Link>
                  <a href="tel:+914440400400" className="flex items-center justify-center gap-2 font-body text-sm text-primary-foreground/60 transition-colors hover:text-accent">
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
