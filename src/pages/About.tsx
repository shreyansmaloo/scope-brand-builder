import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Eye, Gem, Award, Globe, Truck, GraduationCap, FileText, Users, Handshake, ShieldCheck, Linkedin, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const timeline = [
  { year: "1959", title: "Founded as Kawarlal Excipients", desc: "Mr. Vijaylal Kawarlal establishes the company in Chennai as a single-window excipient solution provider" },
  { year: "1980s", title: "Cosmetics Expansion", desc: "Entry into personal care and cosmetic ingredients market" },
  { year: "1990s", title: "Quality Certifications", desc: "ISO 9001:2008 certification & Dun & Bradstreet rating achieved" },
  { year: "2000s", title: "Pan-India Presence", desc: "Operations expand across 5 metro cities with certified warehouse facilities" },
  { year: "2010s", title: "400+ Products", desc: "Portfolio crosses 400 products, Food vertical added with global partnerships" },
  { year: "2020s", title: "Digital Transformation", desc: "Modern logistics, cold chain capabilities and expanded principal partnerships across 3 continents" },
];

const values = [
  { icon: Target, title: "Mission", desc: "To identify and bring the latest products and technologies for pharmaceutical formulations, Health and Wellness.", bg: "bg-primary text-primary-foreground" },
  { icon: Eye, title: "Vision", desc: "To conduct our business in a caring, socially and environmentally responsible way.", bg: "bg-teal text-teal-foreground" },
  { icon: Gem, title: "Values", desc: "Trust, Transparency and Fair Play remains the corner stone of all our relationships.", bg: "bg-card text-foreground border border-border" },
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
  { name: "Vijaylal Kawarlal Jain", title: "Chairman" },
  { name: "Ramesh V Jain", title: "Director" },
  { name: "Sachin V Jain", title: "Director" },
  { name: "Ashish V Jain", title: "Director" },
];

const About = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTimeline = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 320;
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
        </div>
      </section>

      {/* Chairman's Message */}
      <section className="section-padding bg-background">
        <div className="container-scope">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl border border-border/50 bg-card p-8 md:p-12 shadow-[0_8px_40px_rgba(13,33,55,0.08)]"
            >
              <Quote className="absolute top-6 left-6 h-12 w-12 text-accent/20" />
              <div className="relative z-10">
                <h2 className="font-display text-h2 font-bold text-foreground">Chairman's Message</h2>
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
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="section-padding bg-card">
        <div className="container-scope">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-h2 font-bold text-foreground">Our Legacy</h2>
              <p className="mt-6 font-body text-base leading-relaxed text-muted-foreground">
                Scope Ingredients, formerly known as Kawarlal Excipients, was formed in 1959 by Chairman and Promoter, Mr. Vijaylal Kawarlal. The Company was founded with the ambition of providing single window excipients solutions. Now ably managed by a leadership team with a collective pharma experience of over 160 years.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-6">
                <div className="rounded-2xl border border-accent/20 bg-background px-6 py-4 text-center">
                  <p className="font-display text-2xl font-bold text-accent">160+</p>
                  <p className="font-body text-xs text-muted-foreground">Years Collective Experience</p>
                </div>
                <div className="rounded-2xl border border-accent/20 bg-background px-6 py-4 text-center">
                  <p className="font-display text-2xl font-bold text-accent">1959</p>
                  <p className="font-body text-xs text-muted-foreground">Year Founded</p>
                </div>
                <div className="rounded-2xl border border-accent/20 bg-background px-6 py-4 text-center">
                  <p className="font-display text-2xl font-bold text-accent">400+</p>
                  <p className="font-body text-xs text-muted-foreground">Products</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Horizontal Timeline */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="container-scope">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-h2 font-bold text-foreground">Our Journey</h2>
            <div className="hidden gap-2 sm:flex">
              <button
                onClick={() => scrollTimeline("left")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent hover:text-accent-foreground hover:border-accent"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollTimeline("right")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent hover:text-accent-foreground hover:border-accent"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="relative mt-12">
            <div className="absolute left-0 right-0 top-8 h-0.5 bg-accent/20" />
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide"
              style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
            >
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex-shrink-0"
                  style={{ width: 280, scrollSnapAlign: "start" }}
                >
                  <div className="relative z-10 mb-6 flex items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent shadow-lg shadow-accent/20">
                      <span className="font-display text-sm font-bold text-accent-foreground">{item.year}</span>
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="ml-2 h-0.5 flex-1 bg-accent/20" />
                    )}
                  </div>
                  <div className="rounded-2xl border border-border/50 bg-card p-5 shadow-[0_4px_24px_rgba(13,33,55,0.06)]">
                    <h3 className="font-display text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="section-padding bg-card">
        <div className="container-scope">
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-8 ${v.bg}`}
              >
                <v.icon className="h-8 w-8" />
                <h3 className="mt-4 font-display text-xl font-bold">{v.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed opacity-80">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-background">
        <div className="container-scope">
          <h2 className="text-center font-display text-h2 font-bold text-foreground">Leadership Team</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-primary ring-4 ring-accent/20">
                  <span className="font-display text-2xl font-bold text-primary-foreground">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">{member.name}</h3>
                <p className="font-body text-sm text-teal">{member.title}</p>
                <a href="#" className="mt-2 inline-block text-muted-foreground hover:text-accent" aria-label={`${member.name} LinkedIn`}>
                  <Linkedin className="h-4 w-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="section-padding bg-card">
        <div className="container-scope">
          <h2 className="text-center font-display text-h2 font-bold text-foreground">Our Expertise</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center font-body text-muted-foreground">
            Active in the marketing of specialty excipients for all kinds of drug delivery systems, representing the best global manufacturers in their respective areas.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {expertise.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-scope flex items-center gap-4 p-5"
              >
                <item.icon className="h-6 w-6 shrink-0 text-accent" />
                <span className="font-body text-sm font-medium text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
