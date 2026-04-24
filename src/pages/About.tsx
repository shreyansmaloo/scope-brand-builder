import SEO from "@/components/seo/SEO";
import StructuredData, { generateBreadcrumbSchema } from "@/components/seo/StructuredData";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Target, Eye, Gem, Award, Globe, Truck, GraduationCap,
  FileText, Users, Handshake, ShieldCheck, Linkedin,
  ChevronLeft, ChevronRight, Quote, Building2, Beaker, Leaf
} from "lucide-react";

const timeline = [
  { year: "1959", title: "Entrepreneurship Begins", desc: "Late Vijay Kawarlal Jain leaves his job to start his own venture, founded on integrity and trust.", icon: Building2, color: "from-accent to-accent-light" },
  { year: "1965", title: "Chemical Trading", desc: "Began chemical trading in Chennai's local markets.", icon: Beaker, color: "from-teal to-teal-light" },
  { year: "1971", title: "Pharma Excipients", desc: "Entered the pharmaceutical excipients distribution business.", icon: ShieldCheck, color: "from-accent to-accent-light" },
  { year: "1975", title: "Pan-India Distribution", desc: "Pan-India sales established through a robust distributor network.", icon: Globe, color: "from-teal to-teal-light" },
  { year: "1980", title: "Global Imports", desc: "Began importing excipients from global markets.", icon: Truck, color: "from-accent to-accent-light" },
  { year: "1990", title: "Mumbai Office", desc: "Mumbai branch office and warehouse established.", icon: Building2, color: "from-teal to-teal-light" },
  { year: "1995", title: "Delhi & Hyderabad", desc: "Branch offices opened in Delhi and Hyderabad.", icon: Globe, color: "from-accent to-accent-light" },
  { year: "2004", title: "Manufacturing Begins", desc: "Started excipients manufacturing at the Valsad factory.", icon: Beaker, color: "from-teal to-teal-light" },
  { year: "2006", title: "Food Division", desc: "Launched a dedicated food ingredients division.", icon: Leaf, color: "from-accent to-accent-light" },
  { year: "2008", title: "Ahmedabad Operations", desc: "Ahmedabad office and warehouse operations started.", icon: Building2, color: "from-teal to-teal-light" },
  { year: "2010", title: "Cosmetic Ingredients", desc: "Entered cosmetic ingredients and personal care.", icon: Beaker, color: "from-accent to-accent-light" },
  { year: "2015", title: "Baroda Facility", desc: "Second manufacturing facility established in Baroda.", icon: ShieldCheck, color: "from-teal to-teal-light" },
  { year: "2020", title: "50+ Brands", desc: "Representing 50+ global brands across India.", icon: Handshake, color: "from-accent to-accent-light" },
  { year: "2022", title: "Exports Begin", desc: "Began exports to international markets.", icon: Globe, color: "from-teal to-teal-light" },
  { year: "2025", title: "US Office", desc: "United States branch office established.", icon: Building2, color: "from-accent to-accent-light" },
];

const values = [
  { icon: Target, title: "Mission", desc: "To curate and deliver world-class products and advanced technologies for pharmaceutical formulations, health, and wellness.", bg: "bg-accent text-accent-foreground" },
  { icon: Eye, title: "Values", desc: "Trust, transparency, and integrity are the enduring pillars that define every relationship we foster.", bg: "bg-surface-dark text-surface-dark-foreground" },
  { icon: Gem, title: "Experience", desc: "Elevating your business through the depth and distinction of over 175 years of collective industry expertise.", bg: "bg-teal text-teal-foreground" },
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

const TeamCard = ({ member, delay = 0 }: { member: any, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4 }}
    className="group relative flex w-full max-w-[280px] flex-col overflow-hidden rounded-3xl border border-border/40 bg-card shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-md z-10"
  >
    <div className="h-20 w-full shrink-0 bg-gradient-to-br from-primary/10 to-transparent transition-colors group-hover:from-accent/10" />

    <div className="relative -mt-10 flex flex-1 flex-col items-center px-5 pb-6">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-4 ring-card transition-transform duration-500 group-hover:scale-110">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-primary-foreground overflow-hidden">
          <span className="font-display text-2xl font-bold">
            {member.name.split(" ").filter((n: string) => n.length > 0 && n.toLowerCase() !== "shri").map((n: string, idx: number) => idx < 2 ? n[0] : "").join("")}
          </span>
        </div>
      </div>

      <h4 className="mt-4 text-center font-display text-base font-bold leading-tight text-foreground">{member.name}</h4>
      <p className="mt-1.5 text-center font-body text-[10px] font-semibold uppercase tracking-widest text-accent">{member.title}</p>

      <div className="mt-auto flex w-full justify-center border-t border-border/50 pt-5">
        <a
          href={member.linkedin}
          className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          aria-label={`${member.name} LinkedIn`}
        >
          <Linkedin className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  </motion.div>
);

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
      <section className="surface-dark pt-32 pb-20">
        <div className="container-scope">
          <p className="font-body text-sm text-surface-dark-foreground/60">
            <Link to="/" className="hover:text-accent">Home</Link> &gt; About Us
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 font-display text-h1 font-bold text-surface-dark-foreground"
          >
            Six Decades of Excipient Excellence
          </motion.h1>
          <p className="mt-4 max-w-xl font-body text-lg text-surface-dark-foreground/70">
            From a single-window operation in 1959 to India's most comprehensive excipient partner.
          </p>

          <div className="mt-10 flex flex-wrap gap-8">
            {[
              { value: "1959", label: "Year Founded" },
              { value: "400+", label: "Products" },
              { value: "50+", label: "Global Brands" },
              { value: "175+", label: "Years Collective Experience" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="font-display text-3xl font-bold text-accent">{stat.value}</p>
                <p className="font-body text-xs text-surface-dark-foreground/60">{stat.label}</p>
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
                  "The foundation of our company is rooted in the vision and values of Late Vijay Kawarlal Jain, whose entrepreneurial journey was driven by integrity, trust, and a deep sense of responsibility toward customers. He believed that true success in business comes from delivering genuine products, maintaining transparent relationships, and consistently supporting client needs."
                </blockquote>
                <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
                  "At Scope, our responsibility begins with our clients. We ensure the procurement of high-quality ingredients from globally reputed manufacturers, with every product undergoing stringent quality checks. We also strongly believe that ethical business practices contribute to the betterment of society."
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
            <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-6 lg:col-span-2 lg:flex-col lg:overflow-visible lg:snap-none lg:pb-0 scrollbar-hide -mx-5 px-5 sm:mx-0 sm:px-0">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`w-[85%] sm:w-auto shrink-0 snap-center sm:shrink sm:flex-1 rounded-2xl p-6 ${v.bg}`}
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

      {/* Scrolljacked Zigzag Timeline */}
      <section ref={scrollRef} className="relative h-[300vh] bg-secondary">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center bg-gradient-to-b from-secondary to-background">
          {/* Decorative ambient blobs */}
          <div className="absolute left-1/4 top-0 -z-10 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute right-1/4 bottom-0 -z-10 h-64 w-64 translate-y-1/2 rounded-full bg-accent/10 blur-[100px]" />

          {/* Fixed Header Content */}
          <div className="absolute top-24 left-0 w-full px-5 sm:px-8 lg:px-12 xl:px-16 pointer-events-none z-10">
            <div className="max-w-2xl pointer-events-auto">
              <span className="section-tag bg-white shadow-sm">Our History</span>
              <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                A Journey of <span className="text-accent italic">Excellence</span>
              </h2>
              <p className="mt-4 font-body text-base text-muted-foreground leading-relaxed">
                Scroll down to explore our evolution from a single-window excipient provider in 1959 to India's most comprehensive ingredient partner.
              </p>
            </div>
          </div>

          {/* The Scrollable Track */}
          <div className="relative mt-32 h-[600px] w-full flex items-center">
            {/* Horizontal Scrolling Items */}
            <motion.div 
              className="relative flex gap-12 px-[5vw] sm:px-[10vw] pt-[150px] pb-[150px] w-max"
              style={{ 
                x: useTransform(
                  useScroll({ target: scrollRef, offset: ["start start", "end end"] }).scrollYProgress, 
                  [0, 1], 
                  ["calc(0% + 0vw)", "calc(-100% + 100vw)"]
                ) 
              }}
            >
              {/* The Central Continuous Line (Inside the scroll container so it ends perfectly) */}
              <div className="absolute left-[calc(5vw+160px)] right-[calc(5vw+160px)] sm:left-[calc(10vw+175px)] sm:right-[calc(10vw+175px)] h-[3px] bg-border/40 top-1/2 -translate-y-1/2">
                 {/* Dynamic Glowing Progress Bar linked to scroll */}
                 <motion.div 
                   className="h-full bg-gradient-to-r from-primary to-accent origin-left shadow-[0_0_15px_rgba(217,107,27,0.5)]" 
                   style={{ 
                     scaleX: useTransform(
                       useScroll({ target: scrollRef, offset: ["start start", "end end"] }).scrollYProgress, 
                       [0, 1], 
                       [0, 1]
                     )
                   }} 
                 />
              </div>
              {timeline.map((item, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div key={item.year} className="relative flex-shrink-0 h-[400px] w-[320px] sm:w-[350px]">
                    {/* Timeline Node Dot */}
                    <div className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-primary to-accent shadow-md z-20 transition-transform duration-300 hover:scale-125 hover:shadow-[0_0_20px_rgba(217,107,27,0.4)]">
                      <div className="h-2 w-2 rounded-full bg-white" />
                    </div>

                    {/* Connecting Vertical Line */}
                    <div 
                      className={`absolute left-1/2 w-[2px] -translate-x-1/2 z-10 ${
                        isEven 
                          ? "bottom-1/2 top-[50px] bg-gradient-to-b from-transparent to-border/80" 
                          : "top-1/2 bottom-[50px] bg-gradient-to-t from-transparent to-border/80"
                      }`} 
                    />

                    {/* Content Card */}
                    <div 
                      className={`absolute w-full rounded-[2rem] border border-border/40 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(230,126,34,0.12)] hover:border-accent/30 ${
                        isEven ? "bottom-[calc(50%+40px)]" : "top-[calc(50%+40px)]"
                      }`}
                    >
                      {/* Giant Background Year */}
                      <span className="absolute -right-4 -top-8 select-none font-display text-[100px] font-black text-secondary opacity-50 transition-transform duration-500 hover:-translate-x-2">
                        {item.year.slice(-2)}
                      </span>
                      
                      <div className="relative z-10">
                        <div className="mb-6 flex items-center justify-between">
                          <span className="rounded-full bg-primary/10 px-4 py-1.5 font-display text-lg font-bold text-primary">
                            {item.year}
                          </span>
                          <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white shadow-sm transition-transform duration-500 hover:rotate-6 hover:scale-110`}>
                            <item.icon className="h-5 w-5" />
                          </div>
                        </div>
                        
                        <h3 className="font-display text-xl font-bold text-foreground leading-tight">
                          {item.title}
                        </h3>
                        <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground line-clamp-3">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
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
              className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-6 scrollbar-hide -mx-5 px-5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:snap-none sm:pb-0"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-[70%] sm:w-auto shrink-0 snap-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm hover:shadow-md transition-all">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mb-4">
                  <Award className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-display font-bold text-foreground">ISO 9001</h3>
                <p className="font-body text-xs text-muted-foreground mt-1">Certified QMS</p>
              </div>
              <div className="w-[70%] sm:w-auto shrink-0 snap-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm hover:shadow-md transition-all">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal/10 mb-4">
                  <Building2 className="h-8 w-8 text-teal" />
                </div>
                <h3 className="font-display font-bold text-foreground">D&B Rated</h3>
                <p className="font-body text-xs text-muted-foreground mt-1">D-U-N-S Registered</p>
              </div>
              <div className="w-[70%] sm:w-auto shrink-0 snap-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm hover:shadow-md transition-all">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mb-4">
                  <Target className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-display font-bold text-foreground">CRISIL</h3>
                <p className="font-body text-xs text-muted-foreground mt-1">Performance Rated</p>
              </div>
              <div className="w-[70%] sm:w-auto shrink-0 snap-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm hover:shadow-md transition-all">
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
      <section className="section-padding bg-secondary relative overflow-hidden">
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

          <div className="mt-16 flex w-full max-w-5xl flex-col items-center gap-0 sm:gap-12 mx-auto relative">
            {/* --- Level 1: Founder --- */}
            <div className="relative flex w-full justify-center z-20">
              {team.slice(0, 1).map((member) => (
                <TeamCard key={member.name} member={member} delay={0} />
              ))}
              {/* Vertical line connecting to level 2 */}
              <div className="absolute top-full left-1/2 h-12 w-[2px] -translate-x-1/2 bg-border/80 hidden sm:block" />
            </div>

            {/* --- Level 2: Directors --- */}
            <div className="relative w-full z-10">
              {/* Horizontal line spanning columns (Connects centers of 1st and 3rd cards) */}
              <div className="absolute top-0 left-[16.66%] right-[16.66%] h-[2px] bg-border/80 hidden sm:block" />
              
              <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-3 sm:gap-6 sm:pt-8 relative">
                {team.slice(1, 4).map((member, i) => (
                  <div key={member.name} className="relative flex justify-center">
                    {/* Vertical line connecting up to horizontal line */}
                    <div className="absolute bottom-full left-1/2 h-8 w-[2px] -translate-x-1/2 bg-border/80 hidden sm:block" />
                    <TeamCard member={member} delay={0.1 + i * 0.1} />
                  </div>
                ))}
              </div>
              
              {/* Vertical line connecting down to level 3 */}
              <div className="absolute top-full left-1/2 h-12 w-[2px] -translate-x-1/2 bg-border/80 hidden sm:block" />
            </div>

            {/* --- Level 3: Executive Directors --- */}
            <div className="relative w-full z-0">
              {/* Horizontal line spanning columns */}
              <div className="absolute top-0 left-[16.66%] right-[16.66%] h-[2px] bg-border/80 hidden sm:block" />
              
              <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-3 sm:gap-6 sm:pt-8 relative">
                {team.slice(4, 7).map((member, i) => (
                  <div key={member.name} className="relative flex justify-center">
                    {/* Vertical line connecting up to horizontal line */}
                    <div className="absolute bottom-full left-1/2 h-8 w-[2px] -translate-x-1/2 bg-border/80 hidden sm:block" />
                    <TeamCard member={member} delay={0.4 + i * 0.1} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="section-padding relative bg-secondary">
        <div className="container-scope">
          <div className="flex flex-col items-start">
            <span className="section-tag">What We Do</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Core Expertise</h2>
            <p className="mt-3 max-w-2xl font-body text-base text-muted-foreground">
              Active in the marketing of specialty excipients for all kinds of drug delivery systems, representing the best global manufacturers in their respective areas.
            </p>
          </div>

          <div className="mt-12 flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-6 scrollbar-hide -mx-5 px-5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:snap-none sm:pb-0">
            {expertise.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="w-[85%] sm:w-auto shrink-0 snap-center sm:shrink-1 group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-card border border-border/50 p-6 shadow-sm transition-all hover:shadow-md hover:border-accent/30"
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
