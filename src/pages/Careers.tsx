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

const whyJoin = [
  { icon: Heart, title: "People-First Culture", desc: "A family-run business since 1959 that values every team member's growth and well-being." },
  { icon: TrendingUp, title: "Growth Opportunities", desc: "Expand your career across pharma, cosmetics and food verticals with continuous learning." },
  { icon: Globe, title: "Global Exposure", desc: "Work with world-renowned principals from USA, Europe, Japan and more." },
  { icon: ShieldCheck, title: "Ethical Foundation", desc: "Trust, transparency and fair play are the corner stones of everything we do." },
  { icon: Users, title: "Collaborative Team", desc: "A dedicated technical sales force with 160+ years of collective experience." },
  { icon: Briefcase, title: "Industry Leadership", desc: "Be part of India's most comprehensive excipient partner with 400+ products." },
];

const openRoles = [
  { title: "Technical Sales Executive — Pharma", location: "Mumbai / Chennai", type: "Full-time", desc: "Drive sales of pharmaceutical excipients to formulators across India." },
  { title: "Business Development Manager — Cosmetics", location: "Mumbai", type: "Full-time", desc: "Expand our personal care and cosmetics ingredient portfolio across key accounts." },
  { title: "Supply Chain Coordinator", location: "Chennai", type: "Full-time", desc: "Manage logistics, warehousing and cold-chain operations for timely delivery." },
  { title: "Regulatory Affairs Specialist", location: "Chennai / Remote", type: "Full-time", desc: "Support compliance documentation for pharmaceutical and food ingredients." },
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

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: ApplicationForm) => {
    // Simulate submission
    await new Promise(r => setTimeout(r, 1000));
    toast({ title: "Application Submitted!", description: "We'll get back to you within 5 business days." });
    reset();
  };

  return (
    <main>
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

      {/* Open Roles */}
      <section className="section-padding bg-card">
        <div className="container-scope">
          <h2 className="text-center font-display text-h2 font-bold text-foreground">Open Positions</h2>
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {openRoles.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="overflow-hidden rounded-2xl border border-border/50 bg-background transition-all hover:border-accent/30"
              >
                <button
                  onClick={() => setExpandedRole(expandedRole === i ? null : i)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground">{role.title}</h3>
                    <div className="mt-1 flex flex-wrap gap-3">
                      <span className="font-body text-xs text-muted-foreground">{role.location}</span>
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 font-body text-xs font-medium text-accent">{role.type}</span>
                    </div>
                  </div>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${expandedRole === i ? "rotate-180" : ""}`} />
                </button>
                {expandedRole === i && (
                  <div className="border-t border-border/50 px-6 pb-6 pt-4">
                    <p className="font-body text-sm text-muted-foreground">{role.desc}</p>
                    <a href="#apply" className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 font-display text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-light">
                      Apply Now <Send className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="section-padding bg-background">
        <div className="container-scope">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-center font-display text-h2 font-bold text-foreground">Apply Now</h2>
            <p className="mt-4 text-center font-body text-muted-foreground">
              Submit your application and we'll get back to you within 5 business days.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name" className="font-display text-sm font-semibold text-foreground">Full Name *</Label>
                  <Input id="name" {...register("name")} className="mt-2" placeholder="Your full name" />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="font-display text-sm font-semibold text-foreground">Email *</Label>
                  <Input id="email" type="email" {...register("email")} className="mt-2" placeholder="you@example.com" />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="phone" className="font-display text-sm font-semibold text-foreground">Phone *</Label>
                  <Input id="phone" type="tel" {...register("phone")} className="mt-2" placeholder="+91 98765 43210" />
                  {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
                </div>
                <div>
                  <Label htmlFor="experience" className="font-display text-sm font-semibold text-foreground">Experience *</Label>
                  <select
                    id="experience"
                    {...register("experience")}
                    className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                <Label htmlFor="role" className="font-display text-sm font-semibold text-foreground">Position Applying For *</Label>
                <select
                  id="role"
                  {...register("role")}
                  className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                <Label htmlFor="resume" className="font-display text-sm font-semibold text-foreground">Resume / CV</Label>
                <div className="mt-2 flex items-center justify-center rounded-xl border-2 border-dashed border-border bg-card px-6 py-8 transition-colors hover:border-accent/40">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 font-body text-sm text-muted-foreground">
                      Drag & drop your resume or <span className="font-semibold text-accent cursor-pointer">browse</span>
                    </p>
                    <p className="mt-1 font-body text-xs text-muted-foreground/60">PDF, DOC up to 5MB</p>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="font-display text-sm font-semibold text-foreground">Cover Note</Label>
                <Textarea id="message" {...register("message")} className="mt-2" rows={4} placeholder="Tell us why you'd be a great fit..." />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-accent py-3 font-display text-sm font-semibold text-accent-foreground hover:bg-accent-light">
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Careers;
