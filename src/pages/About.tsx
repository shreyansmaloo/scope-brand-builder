import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Eye, Gem, Award, Globe, Truck, GraduationCap, FileText, Users, Handshake, ShieldCheck, Linkedin, ChevronLeft, ChevronRight } from "lucide-react";

const timeline = [
  { year: "1959", title: "Founded as Kawarlal Excipients", desc: "Mr. Vijaylal Kawarlal establishes the company in Chennai" },
  { year: "1980s", title: "Cosmetics Expansion", desc: "Entry into personal care and cosmetic ingredients market" },
  { year: "1990s", title: "Quality Certifications", desc: "ISO certification & Dun & Bradstreet rating achieved" },
  { year: "2000s", title: "Pan-India Presence", desc: "Operations expand across 5 metro cities" },
  { year: "2010s", title: "400+ Products", desc: "Portfolio crosses 400 products, Food vertical added" },
  { year: "2020s", title: "Digital Transformation", desc: "Modern logistics and expanded principal partnerships" },
];

const values = [
  { icon: Target, title: "Mission", desc: "To identify and bring the latest products and technologies for pharmaceutical, cosmetic, and food formulations, Health and Wellness.", bg: "bg-primary text-primary-foreground" },
  { icon: Eye, title: "Vision", desc: "To be India's most trusted and comprehensive excipient partner.", bg: "bg-teal text-teal-foreground" },
  { icon: Gem, title: "Values", desc: "Trust, Transparency, and Fair Play in every relationship.", bg: "bg-card text-foreground border border-border" },
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
            {/* Timeline line */}
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
                  {/* Dot on timeline */}
                  <div className="relative z-10 mb-6 flex items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent shadow-lg shadow-accent/20">
                      <span className="font-display text-sm font-bold text-accent-foreground">{item.year}</span>
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="ml-2 h-0.5 flex-1 bg-accent/20" />
                    )}
                  </div>

                  {/* Card */}
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
