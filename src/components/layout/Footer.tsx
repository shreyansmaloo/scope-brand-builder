import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Linkedin, Twitter } from "lucide-react";
import logoImg from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="relative surface-dark border-t border-border/50">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, rgb(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container-scope relative section-padding">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-block">
              <img src={logoImg} alt="Scope Ingredients" className="h-16 w-auto invert hue-rotate-180" />
            </Link>
            <p className="mt-4 font-body text-sm leading-relaxed text-surface-dark-foreground/75">
              India's most comprehensive excipient partner since 1959. Pharma, Cosmetics & Food ingredients.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" className="rounded-full bg-surface-dark-muted p-2 transition-colors hover:bg-primary hover:text-white" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary">
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
                  <Link to={item.href} className="font-body text-sm text-surface-dark-foreground/75 transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary">
              Our Verticals
            </h4>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Pharmaceuticals", href: "/products?industry=pharma" },
                { label: "Cosmetics & Personal Care", href: "/products?industry=cosmetics" },
                { label: "Food Ingredients", href: "/products?industry=food" },
                { label: "All Principals", href: "/principals" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="font-body text-sm text-surface-dark-foreground/75 transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary">
              Contact
            </h4>
            <ul className="mt-4 space-y-4">
              <li className="flex gap-3 font-body text-sm text-surface-dark-foreground/75">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                No. 19, Marshalls Road, S-10, Raja Annamalai Bldg. Egmore, Chennai 600008
              </li>
              <li>
                <a href="tel:+914440400400" className="flex items-center gap-3 font-body text-sm text-surface-dark-foreground/75 hover:text-primary">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  +91 44 40 400 400
                </a>
              </li>
              <li>
                <a href="mailto:sales@scope-india.com" className="flex items-center gap-3 font-body text-sm text-surface-dark-foreground/75 hover:text-primary">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
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
