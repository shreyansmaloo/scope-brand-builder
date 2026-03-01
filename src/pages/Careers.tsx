import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Briefcase, Heart, Users, TrendingUp, Globe, ShieldCheck, Send, Upload, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/seo/SEO";
import StructuredData, { generateBreadcrumbSchema } from "@/components/seo/StructuredData";

const whyJoin = [
  { icon: Heart, title: "People-First Culture", desc: "A family-run business since 1959 that values every team member's growth and well-being." },
  { icon: TrendingUp, title: "Growth Opportunities", desc: "Expand your career across pharma, cosmetics and food verticals with continuous learning." },
  { icon: Globe, title: "Global Exposure", desc: "Work with world-renowned principals from USA, Europe, Japan and more." },
  { icon: ShieldCheck, title: "Ethical Foundation", desc: "Trust, transparency and fair play are the corner stones of everything we do." },
  { icon: Users, title: "Collaborative Team", desc: "A dedicated technical sales force with 160+ years of collective experience." },
  { icon: Briefcase, title: "Industry Leadership", desc: "Be part of India's most comprehensive excipient partner with 400+ products." },
];

const openRoles = [
  { 
    title: "Technical Sales Executive — Pharma", 
    location: "Mumbai / Chennai", 
    type: "Full-time", 
    desc: "Drive sales of pharmaceutical excipients to formulators across India.",
    responsibilities: [
      "Identify and develop new business opportunities across the pharmaceutical sector.",
      "Conduct technical presentations and trials of excipients at client R&D centers.",
      "Maintain strong relationships with key decision-makers and formulation scientists.",
      "Collaborate with principal partners to understand new product applications."
    ],
    requirements: [
      "B.Pharm / M.Pharm or degree in Chemistry / Chemical Engineering.",
      "2-5 years of technical sales experience in the pharmaceutical or related industry.",
      "Strong communication, negotiation, and interpersonal skills.",
      "Willingness to travel extensively to client sites."
    ],
    rules: "Field-based role with regular office reporting. Performance-linked incentives apply."
  },
  { 
    title: "Business Development Manager — Cosmetics", 
    location: "Mumbai", 
    type: "Full-time", 
    desc: "Expand our personal care and cosmetics ingredient portfolio across key accounts.",
    responsibilities: [
      "Drive revenue growth across personal care and color cosmetics segments.",
      "Introduce novel active ingredients and functional raw materials to formulators.",
      "Track market trends and competitor activities to refine sales strategies.",
      "Work closely with our internal technical team to provide formulation support."
    ],
    requirements: [
      "B.Tech/M.Tech in Cosmetic Technology or related scientific discipline.",
      "5+ years experience in B2B sales of cosmetic ingredients.",
      "Established network within the Indian personal care manufacturing industry.",
      "Strategic mindset with proven ability to close complex enterprise deals."
    ],
    rules: "Hybrid work model based in Mumbai. Expected to attend key industry trade shows."
  },
  { 
    title: "Supply Chain Coordinator", 
    location: "Chennai", 
    type: "Full-time", 
    desc: "Manage logistics, warehousing and cold-chain operations for timely delivery.",
    responsibilities: [
      "Coordinate end-to-end import logistics and customs clearance.",
      "Manage inventory levels across multiple warehouses to ensure stock availability.",
      "Monitor cold-chain shipments and ensure strict GDP (Good Distribution Practice) compliance.",
      "Liaise with freight forwarders, transporters, and internal sales teams."
    ],
    requirements: [
      "Bachelor's degree with specialization in Supply Chain or Logistics Management.",
      "3+ years of experience, preferably handling pharmaceutical or chemical products.",
      "Proficiency in ERP systems and advanced Excel skills.",
      "Excellent problem-solving abilities and attention to detail."
    ],
    rules: "On-site role at our Chennai headquarters/warehouse facility."
  },
  { 
    title: "Regulatory Affairs Specialist", 
    location: "Chennai / Remote", 
    type: "Full-time", 
    desc: "Support compliance documentation for pharmaceutical and food ingredients.",
    responsibilities: [
      "Review and maintain regulatory documentation from global principals.",
      "Assist clients with technical queries, DMFs, and compliance certificates.",
      "Ensure all imported products adhere to FSSAI and FDA guidelines.",
      "Stay updated on changing domestic regulatory requirements."
    ],
    requirements: [
      "M.Pharm or MSc in Regulatory Affairs or related field.",
      "2-4 years experience in regulatory compliance within pharma/food ingredient sector.",
      "Strong understanding of Indian and global regulatory frameworks.",
      "Meticulous attention to detail and excellent technical writing skills."
    ],
    rules: "Flexible remote work option available with occasional travel to headquarters."
  },
];

const applicationSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(10, "Phone is required").max(20),
  role: z.string().min(1, "Please select a role"),
  experience: z.string().min(1, "Please specify experience"),
  message: z.string().trim().max(1000).optional(),
});

type ApplicationForm = z.infer<typeof applicationSchema>;

const Careers = () => {
  const { toast } = useToast();
  const [expandedRole, setExpandedRole] = useState<number | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue } = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: ApplicationForm) => {
    // Simulate submission
    await new Promise(r => setTimeout(r, 1000));
    toast({ title: "Application Submitted!", description: "We'll get back to you within 5 business days." });
    reset();
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.scope-india.com" },
    { name: "Careers", url: "https://www.scope-india.com/careers" }
  ]);

  return (
    <main>
      <SEO 
        title="Careers at Scope Ingredients | Join Our Team"
        description="Build your career with India's leading ingredient distributor. Explore open positions in sales, supply chain, and regulatory affairs."
        canonical="https://www.scope-india.com/careers"
      />
      <StructuredData data={breadcrumbSchema} />
      {/* Hero */}
      <section className="bg-primary pt-32 pb-20">
        <div className="container-scope">
          <p className="font-body text-sm text-primary-foreground/50">
            <Link to="/" className="hover:text-accent">Home</Link> &gt; Careers
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 font-display text-h1 font-bold text-primary-foreground"
          >
            Build Your Career With Us
          </motion.h1>
          <p className="mt-4 max-w-xl font-body text-lg text-primary-foreground/60">
            Join a team that's been shaping India's ingredient industry for over six decades
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="section-padding bg-background">
        <div className="container-scope">
          <h2 className="text-center font-display text-h2 font-bold text-foreground">Why Join Scope?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center font-body text-muted-foreground">
            At Scope Ingredients, we believe good business ethics go a long way in contributing towards the betterment of the society we live in.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyJoin.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-accent/30"
              >
                <item.icon className="h-8 w-8 text-accent" />
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles & Application Form Section */}
      <section className="section-padding bg-background relative" id="apply">
        <div className="container-scope">
          <div className="grid gap-16 lg:grid-cols-12">
            
            {/* Left Column: Open Positions */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2 className="font-display text-h2 font-bold text-foreground">Open Positions</h2>
                <p className="mt-4 font-body text-muted-foreground">
                  Explore opportunities to join our team of industry experts. We are always looking for passionate individuals driven by excellence.
                </p>
              </div>

              <div className="space-y-4">
                {openRoles.map((role, i) => (
                  <motion.div
                    key={role.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="overflow-hidden rounded-2xl border border-border/50 bg-card transition-all hover:border-accent/30 shadow-sm"
                  >
                    <button
                      onClick={() => setExpandedRole(expandedRole === i ? null : i)}
                      className="flex w-full items-center justify-between p-6 text-left"
                    >
                      <div>
                        <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors">{role.title}</h3>
                        <div className="mt-2 flex flex-wrap items-center gap-3">
                          <span className="flex items-center gap-1.5 font-body text-sm text-muted-foreground">
                             <Globe className="h-4 w-4" /> {role.location}
                          </span>
                          <span className="flex items-center gap-1.5 font-body text-sm text-muted-foreground">
                            <Briefcase className="h-4 w-4" /> {role.type}
                          </span>
                        </div>
                      </div>
                      <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${expandedRole === i ? "rotate-180" : ""}`} />
                    </button>
                    {expandedRole === i && (
                      <div className="border-t border-border/50 px-6 pb-8 pt-6">
                        <p className="font-body text-base text-text-secondary leading-relaxed mb-6">{role.desc}</p>
                        
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-display text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-accent" /> What we are looking for
                            </h4>
                            <ul className="list-disc pl-5 space-y-1.5 font-body text-sm text-muted-foreground">
                              {role.responsibilities.map((resp, idx) => (
                                <li key={idx}>{resp}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-display text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                              <Users className="h-4 w-4 text-accent" /> The right candidate
                            </h4>
                            <ul className="list-disc pl-5 space-y-1.5 font-body text-sm text-muted-foreground">
                              {role.requirements.map((req, idx) => (
                                <li key={idx}>{req}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="rounded-lg bg-accent/5 p-4 border border-accent/10">
                            <h4 className="font-display text-sm font-bold text-foreground mb-1 flex items-center gap-2">
                               <ShieldCheck className="h-4 w-4 text-accent" /> Role Guidelines
                            </h4>
                            <p className="font-body text-sm text-muted-foreground">{role.rules}</p>
                          </div>
                        </div>

                        <div className="mt-8">
                          <Button 
                            onClick={() => {
                              setValue("role", role.title);
                              document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
                              // Highlight effect on form
                              const formEl = document.getElementById("apply-form");
                              if (formEl) {
                                formEl.classList.add("ring-2", "ring-accent", "ring-offset-4", "ring-offset-background");
                                setTimeout(() => {
                                  formEl.classList.remove("ring-2", "ring-accent", "ring-offset-4", "ring-offset-background");
                                }, 1500);
                              }
                            }}
                            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 font-display text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-light"
                          >
                            Apply for this role <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: Sticky Application Form */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-24 rounded-3xl border border-border/50 bg-card p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300" id="apply-form">
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">Apply Now</h2>
                  <p className="mt-2 font-body text-sm text-muted-foreground">
                    Submit your application and we'll connect within 5 business days.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
                   <div className="grid gap-5 sm:grid-cols-2">
                     <div>
                       <Label htmlFor="name" className="font-display text-xs font-semibold text-foreground uppercase tracking-wider">Full Name *</Label>
                       <Input id="name" {...register("name")} className="mt-1.5 bg-background border-border/50 focus-visible:ring-accent" placeholder="Your full name" />
                       {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                     </div>
                     <div>
                       <Label htmlFor="email" className="font-display text-xs font-semibold text-foreground uppercase tracking-wider">Email *</Label>
                       <Input id="email" type="email" {...register("email")} className="mt-1.5 bg-background border-border/50 focus-visible:ring-accent" placeholder="you@example.com" />
                       {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                     </div>
                   </div>

                   <div className="grid gap-5 sm:grid-cols-2">
                     <div>
                       <Label htmlFor="phone" className="font-display text-xs font-semibold text-foreground uppercase tracking-wider">Phone *</Label>
                       <Input id="phone" type="tel" {...register("phone")} className="mt-1.5 bg-background border-border/50 focus-visible:ring-accent" placeholder="+91 98765 43210" />
                       {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
                     </div>
                     <div>
                       <Label htmlFor="experience" className="font-display text-xs font-semibold text-foreground uppercase tracking-wider">Experience *</Label>
                       <select
                         id="experience"
                         {...register("experience")}
                         className="mt-1.5 flex h-10 w-full rounded-md border border-border/50 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                       >
                         <option value="">Select experience</option>
                         <option value="0-2">0–2 years</option>
                         <option value="2-5">2–5 years</option>
                         <option value="5-10">5–10 years</option>
                         <option value="10+">10+ years</option>
                       </select>
                       {errors.experience && <p className="mt-1 text-xs text-destructive">{errors.experience.message}</p>}
                     </div>
                   </div>

                   <div>
                     <Label htmlFor="role" className="font-display text-xs font-semibold text-foreground uppercase tracking-wider">Position *</Label>
                     <select
                       id="role"
                       {...register("role")}
                       className="mt-1.5 flex h-10 w-full rounded-md border border-border/50 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
                     >
                       <option value="">Select a role</option>
                       {openRoles.map(r => (
                         <option key={r.title} value={r.title}>{r.title}</option>
                       ))}
                       <option value="General Application">General Application</option>
                     </select>
                     {errors.role && <p className="mt-1 text-xs text-destructive">{errors.role.message}</p>}
                   </div>

                   <div>
                     <Label htmlFor="resume" className="font-display text-xs font-semibold text-foreground uppercase tracking-wider">Resume / CV</Label>
                     <div className="mt-1.5 flex items-center justify-center rounded-xl border-2 border-dashed border-border/60 bg-background/50 px-6 py-6 transition-colors hover:border-accent/40 cursor-pointer">
                       <div className="text-center">
                         <Upload className="mx-auto h-6 w-6 text-muted-foreground/70" />
                         <p className="mt-2 font-body text-sm text-foreground/80">
                           Upload your resume
                         </p>
                         <p className="mt-0.5 font-body text-[11px] text-muted-foreground">PDF, DOC up to 5MB</p>
                       </div>
                     </div>
                   </div>

                   <div>
                     <Label htmlFor="message" className="font-display text-xs font-semibold text-foreground uppercase tracking-wider">Cover Note (Optional)</Label>
                     <Textarea id="message" {...register("message")} className="mt-1.5 bg-background border-border/50 focus-visible:ring-accent resize-none" rows={3} placeholder="Tell us why you'd be a great fit..." />
                   </div>

                   <Button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-accent py-5 font-display text-sm font-semibold text-accent-foreground hover:bg-accent-light shadow-md hover:shadow-lg transition-all">
                     {isSubmitting ? "Submitting..." : "Submit Application"}
                   </Button>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
};

export default Careers;
