import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Pharma",
    href: "/pharma",
    children: [
      { label: "Solid Orals", href: "/pharma#solid-orals" },
      { label: "Liquid Orals", href: "/pharma#liquid-orals" },
      { label: "Topicals", href: "/pharma#topicals" },
    ],
  },
  {
    label: "Cosmetics",
    href: "/cosmetics",
    children: [
      { label: "Emollients", href: "/cosmetics#emollients" },
      { label: "Actives", href: "/cosmetics#actives" },
      { label: "Emulsifiers", href: "/cosmetics#emulsifiers" },
    ],
  },
  {
    label: "Food",
    href: "/food",
    children: [
      { label: "Stabilizers", href: "/food#stabilizers" },
      { label: "Sweeteners", href: "/food#sweeteners" },
      { label: "Functional Actives", href: "/food#actives" },
    ],
  },
  { label: "Products", href: "/products" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

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
            <span className="font-display text-xl font-bold text-primary-foreground">
              Scope<span className="text-accent">.</span>
            </span>
            <span className="hidden font-body text-xs text-primary-foreground/70 sm:block">
              Ingredients
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 font-body text-sm font-medium transition-colors ${
                    location.pathname === link.href
                      ? "text-accent"
                      : "text-primary-foreground/80 hover:text-accent"
                  }`}
                >
                  {link.label}
                  {link.children && <ChevronDown className="h-3 w-3" />}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full mt-1 w-48 rounded-xl bg-card p-2 shadow-xl"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block rounded-lg px-3 py-2 font-body text-sm text-foreground transition-colors hover:bg-accent-pale hover:text-accent"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 lg:flex">
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

          {/* Mobile menu button */}
          <button
            className="rounded-lg p-2 text-primary-foreground lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
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
                  <Link
                    to={link.href}
                    className="block py-4 font-display text-lg font-medium text-primary-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
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
