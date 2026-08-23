import SEO from "@/components/seo/SEO";
import StructuredData, { generateBreadcrumbSchema } from "@/components/seo/StructuredData";
import CTASection from "@/components/sections/CTASection";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Target, Eye, Gem, Award, Globe, Truck,
  Handshake, ShieldCheck, Linkedin, ChevronDown,
  Quote, Building2, Beaker, Leaf
} from "lucide-react";

const timeline = [
  { year: "1959", title: "Entrepreneurship Begins", desc: "Late Kawarlal Jain leaves his job to start his own venture, founded on integrity and trust.", icon: Building2, color: "bg-primary" },
  { year: "1965", title: "Chemical Trading", desc: "Began chemical trading in Chennai's local markets.", icon: Beaker, color: "bg-primary" },
  { year: "1971", title: "Pharma Excipients", desc: "Our Charirmain Late Vijaylalji Jain entered the pharmaceutical excipients distribution business.", icon: ShieldCheck, color: "bg-primary" },
  { year: "1975", title: "Pan-India Distribution", desc: "Pan-India sales established through a robust distributor network.", icon: Globe, color: "bg-primary" },
  { year: "1980", title: "Global Imports", desc: "Began importing excipients from global markets.", icon: Truck, color: "bg-primary" },
  { year: "1990", title: "Mumbai Office", desc: "Mumbai branch office and warehouse established.", icon: Building2, color: "bg-primary" },
  { year: "1995", title: "Delhi & Hyderabad", desc: "Branch offices opened in Delhi and Hyderabad.", icon: Globe, color: "bg-primary" },
  { year: "2004", title: "Manufacturing Begins", desc: "Started excipients manufacturing at the Valsad factory.", icon: Beaker, color: "bg-primary" },
  { year: "2006", title: "Food Division", desc: "Launched a dedicated food ingredients division.", icon: Leaf, color: "bg-primary" },
  { year: "2008", title: "Ahmedabad Operations", desc: "Ahmedabad office and warehouse operations started.", icon: Building2, color: "bg-primary" },
  { year: "2010", title: "Personal Care Ingredients", desc: "Entered the personal care ingredients segment.", icon: Beaker, color: "bg-primary" },
  { year: "2015", title: "Baroda Facility", desc: "Second manufacturing facility established in Baroda.", icon: ShieldCheck, color: "bg-primary" },
  { year: "2016", title: "Application Lab", desc: "Started personal care application lab in Mumbai.", icon: ShieldCheck, color: "bg-primary" },
  { year: "2020", title: "50+ Brands", desc: "Representing 50+ global suppliers across India.", icon: Handshake, color: "bg-primary" },
  { year: "2022", title: "Exports Begin", desc: "Began exports to international markets.", icon: Globe, color: "bg-primary" },
  { year: "2025", title: "US Office", desc: "United States branch office established.", icon: Building2, color: "bg-primary" },
];

const values = [
  { icon: Target, title: "Mission", desc: "To curate and deliver world-class products and advanced technologies for pharmaceutical formulations, health, and wellness.", bar: "bg-primary" },
  { icon: Eye, title: "Values", desc: "Trust, transparency, and integrity are the enduring pillars that define every relationship we foster.", bar: "bg-primary/50" },
  { icon: Gem, title: "Experience", desc: "Elevating your business through the depth and distinction of over 175 years of collective industry expertise.", bar: "bg-primary/20" },
];



const team = [
  { name: "Late Shri Vijaylal Kawarlal Vaid", title: "Founder & Visionary", linkedin: "#", photo: "/members/vijaylal-vaid.jpeg", bio: "Founded the company in 1959, leaving a secure job to build a business rooted in integrity and trust. Led its entry into pharmaceutical excipients distribution in 1971, laying the foundation for the pharma vertical that remains core to the business today. Under his guidance, the company grew from a local trading venture into a pan-India distribution network across pharma, personal care, and food ingredients. His insistence on transparency and genuine, long-term relationships continues to shape how the company works with principals and customers alike. He believed that a business built on trust would always outlast one built on short-term gain, and encouraged every branch office to operate with that same discipline. That founding philosophy remains the reference point the current leadership returns to as the company continues to grow." },
  { name: "Ramesh V Jain", title: "Managing Director", linkedin: "#", photo: "/members/ramesh-jain.jpeg", bio: "Part of the family leadership that has steered the company across more than six decades of growth. Has been closely involved in strengthening the pharmaceutical excipients business and the branch network that supports it across India. Works alongside the wider leadership team on principal relationships and long-term business strategy. Continues to uphold the standards of trust and reliability the company was built on as it expands into new markets. Has helped guide the company through its growth into imports from global markets and the setup of offices across multiple cities. Remains focused on ensuring the business stays grounded in the same values it started with, even as its scale continues to grow." },
  { name: "Sachin V Jain", title: "Director", linkedin: "#", photo: "/members/sachin-jain.jpeg", bio: "Contributes to the company's strategic direction as part of its family leadership team. Has supported the growth of the manufacturing operations, including the facilities established in Valsad and Baroda. Focused on strengthening operational efficiency and the supply chain that underpins the company's distribution business. Plays an active role in guiding the organisation's expansion across its pharma, personal care, and food verticals. Works closely with plant and warehouse teams to keep quality and delivery standards consistent across every location. Takes a hands-on interest in how manufacturing and distribution decisions affect customers and principals alike." },
  { name: "Ashish V Jain", title: "Director", linkedin: "#", photo: "/members/ashish-jain.jpeg", bio: "Brings a long-term view to the company's growth as part of its family leadership team. Has been involved in guiding the business through its expansion into new offices, warehouses, and international markets, including exports and the company's US branch. Works closely with principals and partners to build lasting business relationships. Committed to carrying forward the values on which the company was founded. Pays close attention to how the company represents itself to new markets and partners as it grows beyond India. Believes that steady, relationship-led growth is what will keep the company relevant for the next generation of customers." },
  { name: "Ritesh Jain", title: "Executive Director - Personal Care", linkedin: "#", photo: "/members/ritesh-jain.jpeg", bio: "Leads the Personal Care vertical, which the company entered in 2010 and has since grown into a significant part of its business. Has been closely involved with the personal care application lab set up in Mumbai in 2016, supporting formulation and technical work for customers. Works to build and maintain relationships with global principals in the personal care ingredients space. Focused on bringing new ingredient technologies and formulation trends to the Indian market. Spends considerable time with customers' R&D teams to understand where the market is heading and how the portfolio should evolve. Sees the application lab as central to how the division adds value beyond simply supplying ingredients." },
  { name: "Rohit Jain", title: "Executive Director - Personal Care", linkedin: "#", photo: "/members/rohit-jain.jpeg", bio: "Shares leadership of the Personal Care vertical, working on the commercial and business development side of the division. Supports the expansion of the company's personal care ingredient portfolio and its network of global supplier partnerships. Works closely with customers to understand formulation needs and match them with the right ingredient solutions. Focused on growing the division's presence across India's personal care manufacturing base. Regularly travels to meet principals and manufacturers to strengthen the division's supplier and customer network. Believes that close, consistent engagement with both sides of the business is what keeps the division competitive." },
  { name: "Hriday Jain", title: "Executive Director - Food", linkedin: "#", photo: "/members/hriday-jain.jpeg", bio: "Heads the Food ingredients vertical, which the company launched as a dedicated division in 2006. Works with global partners to bring food and nutraceutical ingredient solutions to customers across India. Focused on expanding the division's product categories and supplier network as demand for quality food ingredients grows. Committed to maintaining the same standards of quality and customer trust that define the company's other verticals. Keeps a close watch on shifting consumer trends in food and nutrition to ensure the division's offerings stay relevant. Works to build the same kind of long-term principal partnerships in food that have defined the company's pharma business for decades." },
];

const LeaderCard = ({ member, i, imageOnRight }: { member: (typeof team)[number]; i: number; imageOnRight: boolean }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      className="overflow-hidden rounded-3xl border border-border/40 bg-card p-5 shadow-sm sm:p-6"
    >
      <div className={`flex flex-col gap-6 lg:items-start lg:gap-8 ${imageOnRight ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
        <div className="order-2 min-w-0 flex-1 lg:order-none">
          <div className="flex items-center justify-center gap-3 lg:justify-start">
            <h3 className="font-display text-xl font-bold sm:text-2xl">{member.name}</h3>
            <a
              href={member.linkedin}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-background shadow-sm transition-transform hover:scale-105"
              aria-label={`${member.name} on LinkedIn`}
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>
          </div>
          <p className="mt-1 text-center font-body text-xs font-bold uppercase tracking-widest text-primary lg:text-left">{member.title}</p>
          <div className="mt-3 border-t border-border/60 pt-3">
            {member.bio.split("\n\n").map((para, pi) => (
              <p
                key={pi}
                className={`mt-2 font-body text-base leading-relaxed text-muted-foreground first:mt-0 lg:line-clamp-none ${expanded ? "" : "line-clamp-3"}`}
              >
                {para}
              </p>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-2 flex items-center gap-1 font-body text-sm font-semibold text-primary lg:hidden"
          >
            {expanded ? "Read less" : "Read more"}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>
        <div className="order-1 relative mx-auto aspect-[4/5] w-full max-w-[220px] shrink-0 overflow-hidden rounded-2xl shadow-md lg:order-none lg:mx-0">
          <img
            src={member.photo}
            alt={member.name}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </motion.div>
  );
};

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
        description="Learn about Scope India, India's leading pharmaceutical and personal care ingredient supplier. Six decades of excipient excellence & global principal representation."
        canonical="https://www.scope-india.com/about"
      />
      <StructuredData data={breadcrumbSchema} />
      {/* Hero */}
      <section className="bg-primary pt-32 pb-24 relative">
        <div className="container-scope">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 font-display text-h1 font-bold text-primary-foreground"
          >
            Six Decades of Excipient Excellence
          </motion.h1>
          <p className="mt-4 max-w-xl font-body text-lg text-primary-foreground/60">
            From a single-window operation in 1959 to India's most comprehensive excipient partner.
          </p>
        </div>
      </section>

      {/* Floating Stats Card Section */}
      <section className="relative z-20 -mt-12">
        <div className="container-scope">
          <div className="rounded-[2rem] border border-border/40 bg-card p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur-md">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {[
                { value: "1959", label: "Year Founded" },
                { value: "400+", label: "Products" },
                { value: "50+", label: "Global Brands" },
                { value: "175+", label: "Years Collective Experience" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary">
                    {stat.value}
                  </span>
                  <span className="mt-2 font-body text-sm sm:text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values + Chairman's Message — reorganized section */}
      <section className="pt-20 pb-20 lg:pt-24 lg:pb-32 bg-background">
        <div className="container-scope">
          {/* Chairman — modernized layout on top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2.5rem] border border-border/50 bg-gradient-to-br from-card via-card to-primary/5 p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(247,161,0,0.04)]"
          >
            <Quote className="absolute top-8 right-8 h-20 w-20 text-primary/10 pointer-events-none" />
            <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:gap-16 items-center">
              {/* Left Column: Portrait & Title */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center text-center w-full group/photo">
                <div className="relative shrink-0">
                  {/* Decorative background frame */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/10 rounded-[2.5rem] translate-x-3 translate-y-3 -z-10 transition-transform duration-500 group-hover/photo:translate-x-1.5 group-hover/photo:translate-y-1.5" />

                  {/* Image Container */}
                  <div className="relative w-64 sm:w-[280px] aspect-[3/4] overflow-hidden rounded-[2.5rem] border-4 border-background shadow-xl ring-1 ring-border/50 transition-all duration-500 group-hover/photo:-translate-y-1 group-hover/photo:shadow-[0_25px_60px_rgba(247,161,0,0.15)]">
                    <img
                      src="/members/vijaylal-vaid.jpeg"
                      alt="Shri Vijaylal Kawarlal Vaid"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover/photo:scale-105"
                    />
                    {/* Subtle warm overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none opacity-60 group-hover/photo:opacity-0 transition-opacity duration-500" />
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-display text-xl font-bold">Late. Shri Vijaylal Kawarlal Jain</h4>
                  <p className="font-body text-sm font-semibold uppercase tracking-widest text-primary mt-2">Founder & Chairman</p>
                </div>
              </div>

              {/* Right Column: Quotes & Message */}
              <div className="lg:col-span-8 flex flex-col items-start w-full">
                <span className="section-tag mb-6">Chairman's Message</span>
                <blockquote className="font-body text-lg md:text-xl font-medium leading-relaxed text-foreground italic w-full">
                  "The foundation of our company is rooted in the vision and values of Late. Shri Vijaylal Kawarlal Jain, whose entrepreneurial journey was driven by integrity, trust, and a deep sense of responsibility toward customers. He believed that true success in business comes from delivering genuine products, maintaining transparent relationships, and consistently supporting client needs."
                </blockquote>
                <p className="mt-6 font-body text-base leading-relaxed text-muted-foreground w-full">
                  "At Scope, our responsibility begins with our clients. We ensure the procurement of high-quality ingredients from globally reputed manufacturers, with every product undergoing stringent quality checks. We also strongly believe that ethical business practices contribute to the betterment of society."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mission / Vision / Values — 3-column grid below */}
          <div className="grid gap-6 sm:grid-cols-3 mt-16 sm:mt-24">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_16px_40px_rgba(247,161,0,0.12)]"
              >
                <span className="pointer-events-none absolute -top-2 right-5 select-none font-display text-6xl font-black text-primary/[0.06] transition-colors duration-300 group-hover:text-primary/[0.1]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-heading">{v.title}</h3>
                </div>
                <p className="relative mt-4 font-body text-sm leading-relaxed text-muted-foreground">{v.desc}</p>

                <div className={`absolute inset-x-0 bottom-0 h-1 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 ${v.bar}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scrolljacked Zigzag Timeline */}
      <section ref={scrollRef} className="relative h-[200vh] sm:h-[300vh] bg-secondary">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col bg-gradient-to-b from-secondary to-background">
          {/* Decorative ambient blobs */}
          <div className="absolute left-1/4 top-0 -z-10 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute right-1/4 bottom-0 -z-10 h-64 w-64 translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />

          {/* Header Content — normal flow so it always reserves its own space;
              previously an absolute overlay, which let the centered track
              below drift up into it on shorter/zoomed-in viewports. */}
          <div className="relative z-20 shrink-0 pt-20 px-5 sm:px-8 lg:px-12 xl:px-16">
            <div className="max-w-2xl">
              <span className="section-tag bg-background shadow-sm">Our History</span>
              <h2 className="mt-6 font-display text-h1 font-bold tracking-tight">
                A Journey of <span className="text-primary">Excellence</span>
              </h2>
              <p className="mt-4 font-body text-base text-muted-foreground leading-relaxed">
                Scroll down to explore our evolution from a single-window excipient provider in 1959 to India's most comprehensive ingredient partner.
              </p>
            </div>
          </div>

          {/* The Scrollable Track — centers within the space left after the header */}
          <div className="relative mt-6 sm:mt-8 min-h-[400px] sm:min-h-[600px] w-full flex-1 flex items-center">
            {/* Horizontal Scrolling Items */}
            <motion.div
              className="relative flex gap-6 sm:gap-12 px-[5vw] sm:px-[10vw] pt-[80px] pb-[80px] sm:pt-[150px] sm:pb-[150px] w-max"
              style={{
                x: useTransform(
                  useScroll({ target: scrollRef, offset: ["start start", "end end"] }).scrollYProgress,
                  [0, 1],
                  ["calc(0% + 0vw)", "calc(-100% + 100vw)"]
                )
              }}
            >
              {/* The Central Continuous Line (Inside the scroll container so it ends perfectly) */}
              <div className="absolute left-[calc(5vw+100px)] right-[calc(5vw+100px)] sm:left-[calc(10vw+175px)] sm:right-[calc(10vw+175px)] h-[3px] bg-border/40 top-1/2 -translate-y-1/2">
                {/* Dynamic Glowing Progress Bar linked to scroll */}
                <motion.div
                  className="h-full bg-primary origin-left shadow-[0_0_15px_rgba(247,161,0,0.5)]"
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
                  <div key={item.year} className="relative flex-shrink-0 h-[260px] w-[200px] sm:h-[400px] sm:w-[350px]">
                    {/* Timeline Node Dot */}
                    <div className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border-4 border-background bg-primary shadow-md z-20 transition-transform duration-300 hover:scale-125 hover:shadow-[0_0_20px_rgba(247,161,0,0.4)]">
                      <div className="h-2 w-2 rounded-full bg-background" />
                    </div>

                    {/* Connecting Vertical Line */}
                    <div
                      className={`absolute left-1/2 w-[2px] -translate-x-1/2 z-10 ${isEven
                        ? "bottom-1/2 top-[50px] bg-gradient-to-b from-transparent to-border/80"
                        : "top-1/2 bottom-[50px] bg-gradient-to-t from-transparent to-border/80"
                        }`}
                    />

                    {/* Content Card */}
                    <div
                      className={`absolute w-full rounded-2xl sm:rounded-[2rem] border border-border/40 bg-background p-4 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(247,161,0,0.12)] hover:border-primary/30 ${isEven ? "bottom-[calc(50%+24px)] sm:bottom-[calc(50%+40px)]" : "top-[calc(50%+24px)] sm:top-[calc(50%+40px)]"
                        }`}
                    >
                      {/* Giant Background Year */}
                      <span className="absolute -right-2 -top-5 hidden sm:block select-none font-display text-[104px] font-black text-secondary opacity-50 transition-transform duration-500 hover:-translate-x-2">
                        {item.year.slice(-2)}
                      </span>

                      <div className="relative z-10">
                        <div className="mb-2 sm:mb-6 flex items-center justify-between">
                          <span className="rounded-full bg-primary/10 px-2.5 py-1 sm:px-4 sm:py-1.5 font-display text-sm sm:text-lg font-bold text-primary">
                            {item.year}
                          </span>
                          <div className={`flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl ${item.color} text-background shadow-sm`}>
                            <item.icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                          </div>
                        </div>

                        <h3 className="font-display text-sm sm:text-xl font-bold leading-tight">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 sm:mt-3 font-body text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-2 sm:line-clamp-3">
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

      {/* Leadership */}
      <section className="section-padding bg-secondary">
        <div className="container-scope">
          <span className="section-tag">Our People</span>
          <h2 className="mt-4 font-display text-h2 font-bold tracking-tight">Leadership Team</h2>
          <p className="mt-3 max-w-2xl font-body text-base text-muted-foreground">
            A collective pharma experience of over 160 years, driving Scope's vision for excellence and innovation.
          </p>

          <div className="mt-16 space-y-5">
            {team.map((member, i) => (
              <LeaderCard key={member.name} member={member} i={i} imageOnRight={i % 2 === 0} />
            ))}
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
              <h2 className="mt-4 font-display text-h2 font-bold">Global Standards of Compliance</h2>
              <p className="mt-4 font-body text-base text-muted-foreground leading-relaxed">
                Trust and Transparency are the cornerstones of Scope India. We adhere to the highest global standards for quality management and corporate governance, ensuring our partners receive consistent and safe pharmaceutical and personal care ingredients.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="font-body text-sm font-semibold text-foreground">ISO 9001:2015 Certified Quality Management</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="font-body text-sm font-semibold text-foreground">Dun & Bradstreet (D&B) Rated Financial Stability</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="font-body text-sm font-semibold text-foreground">CRISIL Rated for Corporate Governance</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
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
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display font-bold">ISO 9001</h3>
                <p className="font-body text-xs text-muted-foreground mt-1">Certified QMS</p>
              </div>
              <div className="w-[70%] sm:w-auto shrink-0 snap-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm hover:shadow-md transition-all">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display font-bold">D&B Rated</h3>
                <p className="font-body text-xs text-muted-foreground mt-1">D-U-N-S Registered</p>
              </div>
              <div className="w-[70%] sm:w-auto shrink-0 snap-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm hover:shadow-md transition-all">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display font-bold">CRISIL</h3>
                <p className="font-body text-xs text-muted-foreground mt-1">Performance Rated</p>
              </div>
              <div className="w-[70%] sm:w-auto shrink-0 snap-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm hover:shadow-md transition-all">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display font-bold">Global</h3>
                <p className="font-body text-xs text-muted-foreground mt-1">Regulatory Standards</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection
        tag="Get Started Today"
        heading={<>Ready to Partner<br />with Us?</>}
        description="Talk to our team about how Scope's 65+ years of sourcing expertise can support your next formulation."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </main>
  );
};

export default About;
