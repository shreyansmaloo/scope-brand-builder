import SEO from "@/components/seo/SEO";
import StructuredData, { generateBreadcrumbSchema, generateFAQSchema } from "@/components/seo/StructuredData";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, FlaskConical, Droplets, Paintbrush, Syringe, Wind, Eye, Star, Layers } from "lucide-react";
import { getProductsByIndustry } from "@/data/products";
import { getPartnersByVertical } from "@/data/partners";
import heroPharma from "@/assets/hero-pharma.jpg";

const dosageForms = [
  { icon: FlaskConical, name: "Solid Orals", desc: "Binders, Fillers, Disintegrants, Lubricants" },
  { icon: Droplets, name: "Liquid Orals", desc: "Suspending agents, Sweeteners, Viscosity modifiers" },
  { icon: Paintbrush, name: "Topicals", desc: "Emollients, Emulsifiers, Thickeners, Film formers" },
  { icon: Syringe, name: "Parenterals", desc: "Solubilizers, Tonicity agents, Stabilizers" },
  { icon: Wind, name: "Inhalation", desc: "Carrier lactose, Dispersing agents" },
  { icon: Eye, name: "Ophthalmic & Otic", desc: "Viscosity enhancers, Preservatives, Buffers" },
  { icon: Star, name: "ODT / MUPS", desc: "Co-processed excipients for specialty delivery" },
  { icon: Layers, name: "Coatings", desc: "Film coatings, Enteric coatings, Sugar coatings" },
];

const Pharma = () => {
  const pharmaProducts = getProductsByIndustry("pharma");
  const pharmaPartners = getPartnersByVertical("pharma");

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.scope-india.com" },
    { name: "Pharmaceuticals", url: "https://www.scope-india.com/pharma" }
  ]);

  const faqs = [
    { question: "What types of pharmaceutical raw materials do you supply?", answer: "We supply a comprehensive range of over 400+ pharmaceutical excipients, covering solid orals, liquid orals, topicals, parenterals, ophthalmic, and advanced drug delivery systems like ODT and MUPS." },
    { question: "Are your excipients compliant with global regulatory standards?", answer: "Yes, all our pharmaceutical raw materials are sourced from globally recognized principals and comply with major pharmacopeias (USP, EP, JP, IP). We maintain strict CDSCO compliance and ISO 9001:2015 standards." },
    { question: "Do you provide technical formulation support?", answer: "Scope Ingredients provides complete technical support through our dedicated technical sales team and R&D network. We assist with formulation challenges, regulatory documentation (DMFs, COAs), and specialty excipient selection." }
  ];
  const faqSchema = generateFAQSchema(faqs);

  return (
    <main>
      <SEO 
        title="Pharmaceutical Raw Material Suppliers India | Scope India"
        description="We are top pharmaceutical raw material suppliers & pharma excipient distributors in India. Access robust API sourcing and regulatory compliant ingredients."
        canonical="https://www.scope-india.com/pharma"
      />
      <StructuredData data={{
        "@context": "https://schema.org",
        "@graph": [breadcrumbSchema, faqSchema]
      }} />
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-20">
        <img src={heroPharma} alt="Pharmaceutical facilities" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="container-scope relative">
          <p className="font-body text-sm text-primary-foreground/50">
            <Link to="/" className="hover:text-accent">Home</Link> &gt; Pharmaceuticals
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 font-display text-h1 font-bold text-primary-foreground"
          >
            Pharmaceutical Excipients
          </motion.h1>
          <p className="mt-4 max-w-xl font-body text-lg text-primary-foreground/60">
            Comprehensive solutions across every dosage form — from solid orals to parenterals
          </p>
        </div>
      </section>

      {/* Dosage Forms */}
      <section className="section-padding bg-background">
        <div className="container-scope">
          <h2 className="font-display text-h2 font-bold text-foreground">Explore by Dosage Form</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dosageForms.map((form, i) => (
              <motion.div
                key={form.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-scope group p-6"
              >
                <form.icon className="h-8 w-8 text-accent" />
                <h3 className="mt-3 font-display text-base font-semibold text-foreground">{form.name}</h3>
                <p className="mt-1 font-body text-sm text-text-secondary">{form.desc}</p>
                <Link
                  to={`/products?dosageForm=${encodeURIComponent(form.name)}`}
                  className="mt-3 inline-flex items-center gap-1 font-body text-sm text-accent opacity-0 transition-opacity group-hover:opacity-100"
                >
                  View Products <ArrowRight className="h-3 w-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pharma Principals */}
      <section className="section-padding bg-card">
        <div className="container-scope">
          <h2 className="font-display text-h2 font-bold text-foreground">Pharma Principals</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pharmaPartners.map((p) => (
              <Link to={`/principals/${p.id}`} key={p.id} className="card-scope flex items-center gap-4 p-4 hover:border-accent/30 transition-colors group">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-card border border-border">
                  <img 
                    src={`/logos/${p.id}.png`} 
                    alt={`${p.name} company logo`}
                    className="h-full w-full object-contain p-2"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const div = document.createElement("div");
                      div.className = "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-display text-sm font-bold";
                      div.textContent = p.name.substring(0, 2).toUpperCase();
                      target.parentElement?.appendChild(div);
                      target.parentElement?.classList.remove("bg-card", "border", "border-border");
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{p.name}</h4>
                  <p className="font-body text-xs text-muted-foreground">{p.country}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-background">
        <div className="container-scope max-w-4xl">
           <h2 className="font-display text-h2 font-bold text-foreground text-center">Frequently Asked Questions</h2>
           <Accordion type="single" collapsible className="mt-12 w-full space-y-6">
             {faqs.map((faq, i) => (
               <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-border bg-card px-6 transition-all hover:shadow-md overflow-hidden">
                 <AccordionTrigger className="text-left font-display text-lg font-bold text-foreground hover:no-underline">
                   {faq.question}
                 </AccordionTrigger>
                 <AccordionContent className="font-body text-text-secondary leading-relaxed text-base pt-2 pb-6">
                   {faq.answer}
                 </AccordionContent>
               </AccordionItem>
             ))}
           </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container-scope text-center">
          <h2 className="font-display text-h2 font-bold text-primary-foreground">
            Need Formulation Assistance?
          </h2>
          <p className="mt-3 font-body text-primary-foreground/60">Our technical team is ready to help.</p>
          <Link to="/contact" className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 font-display text-sm font-semibold text-accent-foreground hover:bg-accent-light">
            Get in Touch →
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Pharma;
