import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown, Search } from "lucide-react";
import logoImg from "@/assets/logo.png";

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
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
        animate={{ height: scrolled ? 56 : 80 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container-scope flex h-full items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logoImg}
              alt="Scope Ingredients"
              className="h-10 w-auto object-contain brightness-0 invert"
              style={{ maxHeight: scrolled ? 36 : 44 }}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-0.5 lg:flex">
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

          {/* Desktop right: search + CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="rounded-full p-2 text-primary-foreground/70 transition-colors hover:bg-primary-light hover:text-accent"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
            <a
              href="tel:+914440400400"
              className="flex items-center gap-1.5 font-body text-sm text-primary-foreground/70"
            >
              <Phone className="h-3.5 w-3.5" />
              +91 44 4040 0400
            </a>
            <Link
              to="/request-sample"
              className="rounded-full bg-accent px-5 py-2 font-display text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-light hover:shadow-lg"
            >
              Request a Sample
            </Link>
          </div>

          {/* Mobile: search + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
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

        {/* Search bar dropdown */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-primary-muted/20 bg-primary/98 backdrop-blur-md"
            >
              <form onSubmit={handleSearch} className="container-scope flex items-center gap-3 py-3">
                <Search className="h-5 w-5 shrink-0 text-primary-foreground/50" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, ingredients, principals..."
                  className="flex-1 bg-transparent font-body text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                  className="rounded-full p-1 text-primary-foreground/50 hover:text-primary-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-primary pt-20 lg:hidden"
          >
            <div className="flex h-full flex-col overflow-y-auto px-6 pb-32">
              {navLinks.map((link) => (
                <div key={link.label} className="border-b border-primary-muted/30">
                  {link.children ? (
                    <div>
                      <button
                        onClick={() => setMobileIndustryOpen(!mobileIndustryOpen)}
                        className="flex w-full items-center justify-between py-4 font-display text-lg font-medium text-primary-foreground"
                      >
                        {link.label}
                        <ChevronDown className={`h-5 w-5 transition-transform ${mobileIndustryOpen ? "rotate-180" : ""}`} />
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
                                className="block py-2 font-body text-base text-primary-foreground/80 hover:text-accent"
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
                      className="block py-4 font-display text-lg font-medium text-primary-foreground"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="mt-8">
                <Link
                  to="/request-sample"
                  className="block w-full rounded-full bg-accent py-3 text-center font-display text-sm font-semibold text-accent-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  Request a Sample
                </Link>
              </div>
              <div className="mt-6 flex items-center justify-center gap-4 text-primary-foreground/60">
                <a href="tel:+914440400400" className="flex items-center gap-2 font-body text-sm">
                  <Phone className="h-4 w-4" /> +91 44 4040 0400
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
