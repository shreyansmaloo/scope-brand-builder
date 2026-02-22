import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, ClipboardList, Package, Microscope } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  company: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().max(20).optional(),
  city: z.string().max(50).optional(),
  product: z.string().trim().min(1, "Required").max(200),
  industry: z.string().min(1, "Required"),
  quantity: z.string().max(100).optional(),
  purpose: z.string().max(1000).optional(),
  address: z.string().max(500).optional(),
});

type SampleForm = z.infer<typeof schema>;

const steps = [
  { icon: ClipboardList, label: "We review your request", desc: "Within 24 hours" },
  { icon: Package, label: "Sample dispatched", desc: "From our nearest warehouse" },
  { icon: Microscope, label: "Technical follow-up", desc: "Our team follows up for feedback" },
];

const RequestSample = () => {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SampleForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: SampleForm) => {
    console.log("Sample request submitted");
    setSubmitted(true);
  };

  return (
    <main>
      <section className="bg-primary pt-32 pb-20">
        <div className="container-scope">
          <p className="font-body text-sm text-primary-foreground/50">
            <Link to="/" className="hover:text-accent">Home</Link> &gt; Request a Sample
          </p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4 font-display text-h1 font-bold text-primary-foreground">
            Request a Free Sample
          </motion.h1>
          <p className="mt-4 max-w-xl font-body text-lg text-primary-foreground/60">
            Fill in the details below and our team will arrange sample dispatch within 3–5 business days.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-scope max-w-2xl">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center rounded-2xl bg-card p-12 text-center shadow-lg">
              <CheckCircle className="h-16 w-16 text-teal" />
              <h2 className="mt-4 font-display text-xl font-bold text-foreground">Sample Request Received!</h2>
              <p className="mt-2 font-body text-text-secondary">Our team will review your request within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <h2 className="font-display text-lg font-semibold text-foreground">Your Details</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="s-name" className="font-body text-sm font-medium text-foreground">Full Name *</label>
                  <input {...register("name")} id="s-name" className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                  {errors.name && <p className="mt-1 font-body text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="s-company" className="font-body text-sm font-medium text-foreground">Company *</label>
                  <input {...register("company")} id="s-company" className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                  {errors.company && <p className="mt-1 font-body text-xs text-destructive">{errors.company.message}</p>}
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="s-email" className="font-body text-sm font-medium text-foreground">Email *</label>
                  <input {...register("email")} id="s-email" type="email" className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                  {errors.email && <p className="mt-1 font-body text-xs text-destructive">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="s-phone" className="font-body text-sm font-medium text-foreground">Phone</label>
                  <input {...register("phone")} id="s-phone" className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
              </div>

              <h2 className="mt-8 font-display text-lg font-semibold text-foreground">Sample Details</h2>
              <div>
                <label htmlFor="s-product" className="font-body text-sm font-medium text-foreground">Product Name / Category *</label>
                <input {...register("product")} id="s-product" className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                {errors.product && <p className="mt-1 font-body text-xs text-destructive">{errors.product.message}</p>}
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="s-industry" className="font-body text-sm font-medium text-foreground">Industry *</label>
                  <select {...register("industry")} id="s-industry" className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                    <option value="">Select</option>
                    <option value="pharma">Pharma</option>
                    <option value="cosmetics">Cosmetics</option>
                    <option value="food">Food</option>
                  </select>
                  {errors.industry && <p className="mt-1 font-body text-xs text-destructive">{errors.industry.message}</p>}
                </div>
                <div>
                  <label htmlFor="s-qty" className="font-body text-sm font-medium text-foreground">Quantity Required</label>
                  <input {...register("quantity")} id="s-qty" className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
              </div>
              <div>
                <label htmlFor="s-purpose" className="font-body text-sm font-medium text-foreground">Purpose / Application</label>
                <textarea {...register("purpose")} id="s-purpose" rows={3} className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div>
                <label htmlFor="s-address" className="font-body text-sm font-medium text-foreground">Shipping Address</label>
                <textarea {...register("address")} id="s-address" rows={2} className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <button type="submit" className="w-full rounded-full bg-accent py-3 font-display text-sm font-semibold text-accent-foreground hover:bg-accent-light hover:shadow-xl transition-all">
                Submit Request →
              </button>
            </form>
          )}
        </div>
      </section>

      {/* What Happens Next */}
      <section className="section-padding bg-card">
        <div className="container-scope">
          <h2 className="text-center font-display text-h2 font-bold text-foreground">What Happens Next?</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div key={step.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <step.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">{step.label}</h3>
                <p className="mt-1 font-body text-sm text-text-secondary">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default RequestSample;
