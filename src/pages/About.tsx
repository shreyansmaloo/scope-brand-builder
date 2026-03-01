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
  { name: "Vijaylal Kawarlal Jain", title: "Chairman & Founder", linkedin: "#" },
  { name: "Ramesh V Jain", title: "Director", linkedin: "#" },
  { name: "Sachin V Jain", title: "Director", linkedin: "#" },
  { name: "Ashish V Jain", title: "Director", linkedin: "#" },
];

const About = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTimeline = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 340;
      scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  return (
    <main>
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
                    <span className="font-display text-lg font-bold text-primary-foreground">VKJ</span>
                  </div>
                  <div>
                    <p className="font-display text-base font-semibold text-foreground">Vijaylal Kawarlal Jain</p>
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
            <div className="absolute left-0 right-0 top-[52px] h-[2px] bg-gradient-to-r from-accent/40 via-teal/40 to-accent/40" />

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
              style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
            >
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex-shrink-0 group"
                  style={{ width: 300, scrollSnapAlign: "start" }}
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

      {/* Leadership */}
      <section className="section-padding bg-background">
        <div className="container-scope">
          <div className="text-center">
            <span className="section-tag">Our People</span>
            <h2 className="mt-4 font-display text-h2 font-bold text-foreground">Leadership Team</h2>
            <p className="mx-auto mt-3 max-w-xl font-body text-sm text-muted-foreground">
              A collective pharma experience of over 160 years, driving Scope's vision for excellence.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl border border-border/50 bg-card p-6 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
              >
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-primary ring-4 ring-accent/10 transition-all group-hover:ring-accent/30">
                  <span className="font-display text-2xl font-bold text-primary-foreground">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-base font-semibold text-foreground">{member.name}</h3>
                <p className="mt-1 font-body text-sm text-accent">{member.title}</p>
                <a
                  href={member.linkedin}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1.5 font-body text-xs text-primary transition-colors hover:bg-accent/10 hover:text-accent"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="section-padding bg-card">
        <div className="container-scope">
          <div className="text-center">
            <span className="section-tag">What We Do</span>
            <h2 className="mt-4 font-display text-h2 font-bold text-foreground">Our Expertise</h2>
            <p className="mx-auto mt-3 max-w-2xl font-body text-sm text-muted-foreground">
              Active in the marketing of specialty excipients for all kinds of drug delivery systems, representing the best global manufacturers in their respective areas.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {expertise.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border/50 bg-background p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                  <item.icon className="h-5 w-5 text-accent" />
                </div>
                <span className="mt-3 block font-body text-sm font-medium text-foreground leading-snug">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
