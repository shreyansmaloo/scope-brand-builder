import SEO from "@/components/seo/SEO";
import StructuredData, { generateBreadcrumbSchema } from "@/components/seo/StructuredData";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Target, Eye, Gem, Award, Globe, Truck, GraduationCap,
  FileText, Users, Handshake, ShieldCheck, Linkedin,
  ChevronLeft, ChevronRight, Quote, Building2, Beaker, Leaf
} from "lucide-react";

const timeline = [
  {
    year: "1959",
    title: "Founded as Kawarlal Excipients",
    desc: "Mr. Vijaylal Kawarlal establishes the company in Chennai as a single-window excipient solution provider",
    icon: Building2,
    color: "from-accent to-accent-light",
  },
  {
    year: "1980s",
    title: "Cosmetics Expansion",
    desc: "Entry into personal care and cosmetic ingredients market",
    icon: Beaker,
    color: "from-teal to-teal-light",
  },
  {
    year: "1990s",
    title: "Quality Certifications",
    desc: "ISO 9001:2008 certification & Dun & Bradstreet rating achieved",
    icon: ShieldCheck,
    color: "from-accent to-accent-light",
  },
  {
    year: "2000s",
    title: "Pan-India Presence",
    desc: "Operations expand across 5 metro cities with certified warehouse facilities",
    icon: Globe,
    color: "from-teal to-teal-light",
  },
  {
    year: "2010s",
    title: "400+ Products",
    desc: "Portfolio crosses 400 products, Food vertical added with global partnerships",
    icon: Leaf,
    color: "from-accent to-accent-light",
  },
  {
    year: "2020s",
    title: "Digital Transformation",
    desc: "Modern logistics, cold chain capabilities and expanded principal partnerships across 3 continents",
    icon: Truck,
    color: "from-teal to-teal-light",
  },
];

const values = [
  { icon: Target, title: "Mission", desc: "To identify and bring the latest products and technologies for pharmaceutical formulations, Health and Wellness.", bg: "bg-primary text-primary-foreground" },
  { icon: Eye, title: "Vision", desc: "To conduct our business in a caring, socially and environmentally responsible way.", bg: "bg-teal text-teal-foreground" },
  { icon: Gem, title: "Values", desc: "Trust, Transparency and Fair Play remains the corner stone of all our relationships.", bg: "bg-accent text-accent-foreground" },
];

const expertise = [
  { icon: FlaskIcon, label: "Specialty Excipients Marketing" },
  { icon: Globe, label: "Global Principal Representation" },
  { icon: Truck, label: "Logistics, Warehousing & Cold Chain" },
  { icon: GraduationCap, label: "R&D Network — Universities & Institutes" },
  { icon: FileText, label: "Regulatory & Compliance Support" },
  { icon: Users, label: "Dedicated Technical Sales Team" },
  { icon: ShieldCheck, label: "ISO 9001 & D&B Certified" },
  { icon: Handshake, label: "Long-term Collaborative Partnerships" },
];

function FlaskIcon(props: any) {
  return <Award {...props} />;
}

const team = [
  { name: "Shri Vijaylal Kawarlal Vaid", title: "Founder & Visionary", linkedin: "#" },
  { name: "Ramesh V Jain", title: "Director", linkedin: "#" },
  { name: "Sachin V Jain", title: "Director", linkedin: "#" },
  { name: "Ashish V Jain", title: "Director", linkedin: "#" },
  { name: "Ritesh Jain", title: "Executive Director - Personal Care", linkedin: "#" },
  { name: "Rohit Jain", title: "Executive Director - Personal Care", linkedin: "#" },
  { name: "Hriday Jain", title: "Executive Director - Food", linkedin: "#" },
];

const About = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTimeline = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 340;
      scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.scope-india.com" },
    { name: "About Us", url: "https://www.scope-india.com/about" }
  ]);

  return (
    <main>
      <SEO 
        title="About Scope India | Excipient Distributors India"
        description="Learn about Scope India, India's leading pharmaceutical and cosmetic ingredient supplier. Six decades of excipient excellence & global principal representation."
        canonical="https://www.scope-india.com/about"
      />
      <StructuredData data={breadcrumbSchema} />
      {/* Hero */}
      <section className="bg-primary pt-32 pb-20">
        <div className="container-scope">
          <p className="font-body text-sm text-primary-foreground/50">
            <Link to="/" className="hover:text-accent">Home</Link> &gt; About Us
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 font-display text-h1 font-bold text-primary-foreground"
          >
            Six Decades of Excipient Excellence
          </motion.h1>
          <p className="mt-4 max-w-xl font-body text-lg text-primary-foreground/60">
            From a single-window operation in 1959 to India's most comprehensive excipient partner
          </p>

          {/* Legacy stats inline in hero */}
          <div className="mt-10 flex flex-wrap gap-8">
            {[
              { value: "1959", label: "Year Founded" },
              { value: "160+", label: "Years Collective Experience" },
              { value: "400+", label: "Products" },
              { value: "35+", label: "Global Principals" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="font-display text-3xl font-bold text-accent">{stat.value}</p>
                <p className="font-body text-xs text-primary-foreground/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chairman's Message + Mission/Vision/Values — combined section */}
      <section className="section-padding bg-background">
        <div className="container-scope">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Chairman — takes 3 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative lg:col-span-3 rounded-3xl border border-border/50 bg-card p-8 md:p-10 shadow-[0_8px_40px_rgba(13,33,55,0.08)]"
            >
              <Quote className="absolute top-6 right-6 h-16 w-16 text-accent/10" />
              <div className="relative z-10">
                <span className="section-tag">Chairman's Message</span>
                <blockquote className="mt-6 font-body text-base leading-relaxed text-muted-foreground italic">
                  "Social responsibility can change lives for better. As we turn a new leaf, Scope is driven by this simple philosophy which reflects in the way we approach business and clients. Our responsibility begins with our clients first. We go to great detail to procure genuine ingredients from renowned companies and also pass through stringent quality tests; transparent transactions, backed by a professional sales force, ensuring that all business requirements are dealt timely to facilitate one's production schedule."
                </blockquote>
                <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
                  "We strongly believe that good business ethics go a long way in contributing towards the betterment of the society we live in."
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary ring-4 ring-accent/20">
                    <span className="font-display text-lg font-bold text-primary-foreground">VKV</span>
                  </div>
                  <div>
                    <p className="font-display text-base font-semibold text-foreground">Shri Vijaylal Kawarlal Vaid</p>
                    <p className="font-body text-sm text-accent">Chairman & Founder</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mission / Vision / Values — takes 2 cols, stacked */}
            <div className="flex flex-col gap-4 lg:col-span-2">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex-1 rounded-2xl p-6 ${v.bg}`}
                >
                  <div className="flex items-center gap-3">
                    <v.icon className="h-6 w-6" />
                    <h3 className="font-display text-lg font-bold">{v.title}</h3>
                  </div>
                  <p className="mt-3 font-body text-sm leading-relaxed opacity-80">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modern Timeline */}
      <section className="section-padding bg-card overflow-hidden">
        <div className="container-scope">
          <div className="flex items-end justify-between">
            <div>
              <span className="section-tag">Our History</span>
              <h2 className="mt-4 font-display text-h2 font-bold text-foreground">Our Journey</h2>
              <p className="mt-2 max-w-lg font-body text-sm text-muted-foreground">
                From a single-window excipient provider to India's most comprehensive ingredient partner.
              </p>
            </div>
            <div className="hidden gap-2 sm:flex">
              <button
                onClick={() => scrollTimeline("left")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground hover:border-accent"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollTimeline("right")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground hover:border-accent"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="relative mt-12">
            {/* Continuous line */}
            <div className="absolute left-0 right-0 top-[84px] h-[2px] bg-gradient-to-r from-accent/40 via-teal/40 to-accent/40" />

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-8 pt-8 px-4 -mx-4 scrollbar-hide"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex-shrink-0 group"
                  style={{ width: 300 }}
                >
                  {/* Icon circle on the line */}
                  <div className="relative z-10 mb-8 flex flex-col items-center">
                    <div className={`flex h-[104px] w-[104px] items-center justify-center rounded-full bg-gradient-to-br ${item.color} shadow-lg transition-transform group-hover:scale-110`}>
                      <div className="flex flex-col items-center">
                        <item.icon className="h-5 w-5 text-white/90" />
                        <span className="mt-1 font-display text-base font-bold text-white">{item.year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="rounded-2xl border border-border/50 bg-background p-6 shadow-sm transition-all group-hover:shadow-md group-hover:-translate-y-1">
                    <h3 className="font-display text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Compliance */}
      <section className="section-padding bg-background/50">
        <div className="container-scope">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
               <span className="section-tag">Quality & Trust</span>
               <h2 className="mt-4 font-display text-h2 font-bold text-foreground">Global Standards of Compliance</h2>
               <p className="mt-4 font-body text-base text-muted-foreground leading-relaxed">
                 Trust and Transparency are the cornerstones of Scope India. We adhere to the highest global standards for quality management and corporate governance, ensuring our partners receive consistent and safe pharmaceutical and cosmetic ingredients.
               </p>
               <ul className="mt-6 space-y-3">
                 <li className="flex items-center gap-3">
                   <ShieldCheck className="h-5 w-5 text-accent" />
                   <span className="font-body text-sm font-semibold text-foreground">ISO 9001:2015 Certified Quality Management</span>
                 </li>
                 <li className="flex items-center gap-3">
                   <ShieldCheck className="h-5 w-5 text-teal" />
                   <span className="font-body text-sm font-semibold text-foreground">Dun & Bradstreet (D&B) Rated Financial Stability</span>
                 </li>
                 <li className="flex items-center gap-3">
                   <ShieldCheck className="h-5 w-5 text-accent" />
                   <span className="font-body text-sm font-semibold text-foreground">CRISIL Rated for Corporate Governance</span>
                 </li>
                 <li className="flex items-center gap-3">
                   <ShieldCheck className="h-5 w-5 text-teal" />
                   <span className="font-body text-sm font-semibold text-foreground">CDSCO Compliant Supply Chain & Warehousing</span>
                 </li>
               </ul>
            </motion.div>
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
               <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm hover:shadow-md transition-all">
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mb-4">
                   <Award className="h-8 w-8 text-accent" />
                 </div>
                 <h3 className="font-display font-bold text-foreground">ISO 9001</h3>
                 <p className="font-body text-xs text-muted-foreground mt-1">Certified QMS</p>
               </div>
               <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm hover:shadow-md transition-all">
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal/10 mb-4">
                   <Building2 className="h-8 w-8 text-teal" />
                 </div>
                 <h3 className="font-display font-bold text-foreground">D&B Rated</h3>
                 <p className="font-body text-xs text-muted-foreground mt-1">D-U-N-S Registered</p>
               </div>
               <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm hover:shadow-md transition-all">
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mb-4">
                   <Target className="h-8 w-8 text-accent" />
                 </div>
                 <h3 className="font-display font-bold text-foreground">CRISIL</h3>
                 <p className="font-body text-xs text-muted-foreground mt-1">Performance Rated</p>
               </div>
               <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm hover:shadow-md transition-all">
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal/10 mb-4">
                   <Globe className="h-8 w-8 text-teal" />
                 </div>
                 <h3 className="font-display font-bold text-foreground">Global</h3>
                 <p className="font-body text-xs text-muted-foreground mt-1">Regulatory Standards</p>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-zinc-50 dark:bg-zinc-900/40 relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        
        <div className="container-scope relative z-10">
          <div className="flex flex-col items-start">
            <span className="section-tag">Our People</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Leadership Team</h2>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">
              A collective pharma experience of over 160 years, driving Scope's vision for excellence and innovation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-card border border-border/40 shadow-sm transition-all hover:shadow-md hover:-translate-y-1.5"
              >
                <div className="h-20 w-full shrink-0 bg-gradient-to-br from-primary/10 to-transparent transition-colors group-hover:from-accent/10" />
                
                <div className="relative -mt-10 flex flex-1 flex-col items-center px-5 pb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm ring-4 ring-card transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3 shrink-0">
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
                      <span className="font-display text-2xl font-bold">
                        {member.name.split(" ").filter(n => n.length > 0 && n.toLowerCase() !== "shri").map((n, idx) => idx < 2 ? n[0] : "").join("")}
                      </span>
                    </div>
                  </div>
                  
                  <h4 className="mt-4 font-display text-base font-bold text-foreground text-center leading-tight">{member.name}</h4>
                  <p className="mt-1.5 font-body text-[10px] font-semibold text-accent tracking-widest uppercase text-center">{member.title}</p>
                  
                  <div className="mt-auto w-full pt-5 flex justify-center border-t border-border/50">
                    <a
                      href={member.linkedin}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/5 text-primary transition-all hover:bg-[#0A66C2] hover:text-white mt-1"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="section-padding relative bg-zinc-50 dark:bg-zinc-950/50">
        <div className="container-scope">
          <div className="flex flex-col items-start">
            <span className="section-tag">What We Do</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Core Expertise</h2>
            <p className="mt-3 max-w-2xl font-body text-base text-muted-foreground">
              Active in the marketing of specialty excipients for all kinds of drug delivery systems, representing the best global manufacturers in their respective areas.
            </p>
          </div>
          
          <div className="mt-12 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {expertise.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-border/50 p-6 shadow-sm transition-all hover:shadow-md hover:border-accent/30"
              >
                <div className="absolute right-0 top-0 -mr-6 -mt-6 h-24 w-24 rounded-bl-full bg-accent/5 transition-transform duration-700 ease-out group-hover:scale-[2] group-hover:bg-accent/10" />
                
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-[14px] bg-primary/5 text-primary transition-colors duration-300 group-hover:bg-accent group-hover:text-white mb-6">
                  <item.icon className="h-6 w-6" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="font-display text-lg font-bold text-foreground leading-snug pr-2 transition-colors group-hover:text-accent">
                    {item.label}
                  </h3>
                  {/* Fake link arrow just for UI feel */}
                  <div className="mt-4 flex h-6 items-center justify-start opacity-0 -translate-x-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-accent">
                    <span className="text-xs font-semibold tracking-wide uppercase">Discover</span>
                    <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
