import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Linkedin, Twitter } from "lucide-react";
import logoImg from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="relative surface-dark">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--accent)) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container-scope relative section-padding">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-block">
              <img src={logoImg} alt="Scope Ingredients" className="h-16 w-auto" />
            </Link>
            <p className="mt-4 font-body text-sm leading-relaxed text-surface-dark-foreground/70">
              India's most comprehensive excipient partner since 1959. Pharma, Cosmetics & Food ingredients.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" className="rounded-full bg-surface-dark-muted p-2 transition-colors hover:bg-accent" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-surface-dark-muted p-2 transition-colors hover:bg-accent" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {["ISO 9001", "D&B Rated", "CRISIL", "cGMP", "HACCP", "Kosher"].map((badge) => (
                <span key={badge} className="rounded-lg border border-surface-dark-muted/60 px-2.5 py-1 font-body text-[10px] text-surface-dark-foreground/60">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent/90">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Products", href: "/products" },
                { label: "News", href: "/news" },
                { label: "Careers", href: "/careers" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="font-body text-sm text-surface-dark-foreground/70 transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent/90">
              Our Verticals
            </h4>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Pharmaceuticals", href: "/pharma" },
                { label: "Cosmetics", href: "/cosmetics" },
                { label: "Food Ingredients", href: "/food" },
                { label: "All Principals", href: "/principals" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="font-body text-sm text-surface-dark-foreground/70 transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent/90">
              Contact
            </h4>
            <ul className="mt-4 space-y-4">
              <li className="flex gap-3 font-body text-sm text-surface-dark-foreground/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                No. 19, Marshalls Road, S-10, Raja Annamalai Bldg. Egmore, Chennai 600008
              </li>
              <li>
                <a href="tel:+914440400400" className="flex items-center gap-3 font-body text-sm text-surface-dark-foreground/70 hover:text-accent">
                  <Phone className="h-4 w-4 shrink-0 text-accent" />
                  +91 44 40 400 400
                </a>
              </li>
              <li>
                <a href="mailto:sales@scope-india.com" className="flex items-center gap-3 font-body text-sm text-surface-dark-foreground/70 hover:text-accent">
                  <Mail className="h-4 w-4 shrink-0 text-accent" />
                  sales@scope-india.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-surface-dark-muted/40 pt-8 text-center font-body text-xs text-surface-dark-foreground/50">
          © 2025 Scope Ingredients Pvt. Ltd. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
