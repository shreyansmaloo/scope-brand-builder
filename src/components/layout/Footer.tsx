import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Linkedin, Twitter } from "lucide-react";
import logoImg from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="relative bg-primary text-primary-foreground">
      {/* Dot grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container-scope relative section-padding">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 */}
          <div>
            <Link to="/" className="inline-block">
              <img src={logoImg} alt="Scope Ingredients" className="h-16 w-auto" />
            </Link>
            <p className="mt-4 font-body text-sm leading-relaxed text-primary-foreground/60">
              India's most comprehensive excipient partner since 1959. Pharma, Cosmetics & Food ingredients.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" className="rounded-full bg-primary-light p-2 transition-colors hover:bg-accent" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-primary-light p-2 transition-colors hover:bg-accent" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {["ISO 9001", "D&B Rated", "CRISIL", "cGMP", "HACCP", "Kosher"].map(badge => (
                <span key={badge} className="rounded-lg border border-primary-muted/40 px-3 py-1 font-body text-xs text-primary-foreground/50">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground/40">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3">
              {["Home", "About", "Products", "News", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="font-body text-sm text-primary-foreground/60 transition-colors hover:text-accent"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground/40">
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
                  <Link
                    to={item.href}
                    className="font-body text-sm text-primary-foreground/60 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground/40">
              Contact
            </h4>
            <ul className="mt-4 space-y-4">
              <li className="flex gap-3 font-body text-sm text-primary-foreground/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                No. 19, Marshalls Road, S-10, Raja Annamalai Bldg. Egmore, Chennai 600008
              </li>
              <li>
                <a href="tel:+914440400400" className="flex items-center gap-3 font-body text-sm text-primary-foreground/60 hover:text-accent">
                  <Phone className="h-4 w-4 shrink-0 text-accent" />
                  +91 44 40 400 400
                </a>
              </li>
              <li>
                <a href="mailto:sales@scope-india.com" className="flex items-center gap-3 font-body text-sm text-primary-foreground/60 hover:text-accent">
                  <Mail className="h-4 w-4 shrink-0 text-accent" />
                  sales@scope-india.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-primary-muted/20 pt-8 text-center font-body text-xs text-primary-foreground/40">
          © 2025 Scope Ingredients Pvt. Ltd. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
