import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().min(1, "Company is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().max(20).optional(),
  industry: z.string().optional(),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const branches = [
  { city: "Chennai", state: "Tamil Nadu", address: "No. 19, Marshalls Road, Egmore, Chennai – 600 008" },
  { city: "Mumbai", state: "Maharashtra", address: "[PLACEHOLDER - Update with actual address]" },
  { city: "Delhi", state: "NCR", address: "[PLACEHOLDER - Update with actual address]" },
  { city: "Bengaluru", state: "Karnataka", address: "[PLACEHOLDER - Update with actual address]" },
  { city: "Hyderabad", state: "Telangana", address: "[PLACEHOLDER - Update with actual address]" },
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact form submitted:", { ...data, email: "[redacted]" });
    setSubmitted(true);
  };

  return (
    <main>
      <section className="bg-primary pt-32 pb-20">
        <div className="container-scope">
          <p className="font-body text-sm text-primary-foreground/50">
            <Link to="/" className="hover:text-accent">Home</Link> &gt; Contact
          </p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4 font-display text-h1 font-bold text-primary-foreground">
            Get in Touch
          </motion.h1>
          <p className="mt-4 max-w-xl font-body text-lg text-primary-foreground/60">
            Our team is here to help with product enquiries, samples, technical support, or partnerships.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-scope">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <div>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center rounded-2xl bg-card p-12 text-center shadow-lg">
                  <CheckCircle className="h-16 w-16 text-teal" />
                  <h2 className="mt-4 font-display text-xl font-bold text-foreground">Thank You!</h2>
                  <p className="mt-2 font-body text-text-secondary">We'll respond within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="font-body text-sm font-medium text-foreground">Full Name *</label>
                      <input {...register("name")} id="name" className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                      {errors.name && <p className="mt-1 font-body text-xs text-destructive">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="company" className="font-body text-sm font-medium text-foreground">Company *</label>
                      <input {...register("company")} id="company" className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                      {errors.company && <p className="mt-1 font-body text-xs text-destructive">{errors.company.message}</p>}
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="font-body text-sm font-medium text-foreground">Email *</label>
                      <input {...register("email")} id="email" type="email" className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                      {errors.email && <p className="mt-1 font-body text-xs text-destructive">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="font-body text-sm font-medium text-foreground">Phone</label>
                      <input {...register("phone")} id="phone" className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="industry" className="font-body text-sm font-medium text-foreground">Industry</label>
                    <select {...register("industry")} id="industry" className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                      <option value="">Select industry</option>
                      <option value="pharma">Pharma</option>
                      <option value="cosmetics">Cosmetics</option>
                      <option value="food">Food</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="subject" className="font-body text-sm font-medium text-foreground">Subject *</label>
                    <input {...register("subject")} id="subject" className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                    {errors.subject && <p className="mt-1 font-body text-xs text-destructive">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="font-body text-sm font-medium text-foreground">Message *</label>
                    <textarea {...register("message")} id="message" rows={4} className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                    {errors.message && <p className="mt-1 font-body text-xs text-destructive">{errors.message.message}</p>}
                  </div>
                  <button type="submit" className="flex items-center gap-2 rounded-full bg-accent px-8 py-3 font-display text-sm font-semibold text-accent-foreground hover:bg-accent-light hover:shadow-xl transition-all">
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="space-y-6">
              <div className="card-scope p-6">
                <div className="flex gap-4">
                  <MapPin className="h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground">Registered Office</h3>
                    <p className="mt-1 font-body text-sm text-text-secondary">No. 19, Marshalls Road, Egmore, Chennai – 600 008, Tamil Nadu</p>
                  </div>
                </div>
              </div>
              <div className="card-scope p-6">
                <div className="flex gap-4">
                  <Phone className="h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground">Phone</h3>
                    <a href="tel:+914440400400" className="mt-1 block font-body text-sm text-text-secondary hover:text-accent">+91 44 4040 0400</a>
                    <a href="tel:+914440400405" className="block font-body text-sm text-text-secondary hover:text-accent">+91 44 4040 0405</a>
                  </div>
                </div>
              </div>
              <div className="card-scope p-6">
                <div className="flex gap-4">
                  <Mail className="h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground">Email</h3>
                    <a href="mailto:sales@scope-india.com" className="mt-1 block font-body text-sm text-text-secondary hover:text-accent">sales@scope-india.com</a>
                  </div>
                </div>
              </div>
              <div className="card-scope p-6">
                <div className="flex gap-4">
                  <Clock className="h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground">Business Hours</h3>
                    <p className="mt-1 font-body text-sm text-text-secondary">Mon–Sat, 9:00 AM – 6:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branch Offices */}
      <section className="section-padding bg-card">
        <div className="container-scope">
          <h2 className="font-display text-h2 font-bold text-foreground">Branch Offices</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {branches.map((branch) => (
              <div key={branch.city} className="card-scope p-5">
                <MapPin className="h-5 w-5 text-accent" />
                <h3 className="mt-2 font-display text-base font-semibold text-foreground">{branch.city}</h3>
                <p className="font-body text-xs text-teal">{branch.state}</p>
                <p className="mt-2 font-body text-xs text-text-secondary">{branch.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
