import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, ClipboardList, Package, Microscope, Plus, Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { products } from "@/data/products";
import SEO from "@/components/seo/SEO";
import StructuredData, { generateBreadcrumbSchema } from "@/components/seo/StructuredData";

const schema = z.object({
  items: z.array(z.object({
    product: z.string().trim().min(1, "Select a product"),
    quantity: z.string().trim().min(1, "Specify quantity"),
    purpose: z.string().max(500).optional(),
  })).min(1, "Add at least one product"),
  name: z.string().trim().min(1, "Required").max(100),
  company: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().max(20).optional(),
  city: z.string().max(50).optional(),
  address: z.string().max(500).optional(),
});

type SampleForm = z.infer<typeof schema>;

const steps = [
  { icon: ClipboardList, label: "We review your request", desc: "Within 24 hours" },
  { icon: Package, label: "Sample dispatched", desc: "From our nearest warehouse" },
  { icon: Microscope, label: "Technical follow-up", desc: "Our team follows up for feedback" },
];

const inputClass = "mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent";
const labelClass = "font-body text-sm font-medium text-foreground";

const RequestSample = () => {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [productSearch, setProductSearch] = useState("");

  const { register, handleSubmit, control, formState: { errors }, trigger } = useForm<SampleForm>({
    resolver: zodResolver(schema),
    defaultValues: { items: [{ product: "", quantity: "", purpose: "" }] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    (p.inci && p.inci.toLowerCase().includes(productSearch.toLowerCase()))
  ).slice(0, 20);

  const onSubmit = () => {
    setSubmitted(true);
  };

  const nextStep = async () => {
    if (step === 1) {
      const valid = await trigger("items");
      if (valid) setStep(2);
    }
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.scope-india.com" },
    { name: "Request Sample", url: "https://www.scope-india.com/request-sample" }
  ]);

  return (
    <main>
      <SEO 
        title="Request Ingredient Samples | Scope Ingredients India"
        description="Request free samples of pharmaceutical, cosmetic, and food ingredients for your R&D and formulation needs. Quick dispatch across India."
        canonical="https://www.scope-india.com/request-sample"
      />
      <StructuredData data={breadcrumbSchema} />
      <section className="bg-primary pt-32 pb-20">
        <div className="container-scope">
          <p className="font-body text-sm text-primary-foreground/50">
            <Link to="/" className="hover:text-accent">Home</Link> &gt; Request a Sample
          </p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4 font-display text-h1 font-bold text-primary-foreground">
            Request Free Samples
          </motion.h1>
          <p className="mt-4 max-w-xl font-body text-lg text-primary-foreground/60">
            Select products, specify quantities, and submit — our team handles the rest.
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
            <div>
              {/* Step indicator */}
              <div className="mb-8 flex items-center justify-center gap-4">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full font-display text-sm font-bold transition-colors ${
                      step >= s ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {s}
                    </div>
                    <span className={`font-body text-sm font-medium ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                      {s === 1 ? "Select Products" : "Your Details"}
                    </span>
                    {s < 2 && <div className={`h-0.5 w-12 ${step > s ? "bg-accent" : "bg-border"}`} />}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h2 className="font-display text-lg font-semibold text-foreground mb-4">Select Products</h2>

                      <div className="space-y-4">
                        {fields.map((field, index) => (
                          <div key={field.id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-display text-xs font-semibold text-accent">Product {index + 1}</span>
                              {fields.length > 1 && (
                                <button type="button" onClick={() => remove(index)} className="flex items-center gap-1 rounded-lg px-2 py-1 font-body text-xs text-destructive hover:bg-destructive/10">
                                  <Trash2 className="h-3 w-3" /> Remove
                                </button>
                              )}
                            </div>

                            <div>
                              <label htmlFor={`items.${index}.product`} className={labelClass}>Product Name *</label>
                              <select {...register(`items.${index}.product`)} className={inputClass}>
                                <option value="">Select a product...</option>
                                {products.map((p) => (
                                  <option key={p.id} value={p.name}>{p.name} ({p.principal})</option>
                                ))}
                              </select>
                              {errors.items?.[index]?.product && (
                                <p className="mt-1 font-body text-xs text-destructive">{errors.items[index]?.product?.message}</p>
                              )}
                            </div>

                            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                              <div>
                                <label htmlFor={`items.${index}.quantity`} className={labelClass}>Quantity *</label>
                                <input {...register(`items.${index}.quantity`)} placeholder="e.g. 500g, 1kg" className={inputClass} />
                                {errors.items?.[index]?.quantity && (
                                  <p className="mt-1 font-body text-xs text-destructive">{errors.items[index]?.quantity?.message}</p>
                                )}
                              </div>
                              <div>
                                <label htmlFor={`items.${index}.purpose`} className={labelClass}>Purpose / Application</label>
                                <input {...register(`items.${index}.purpose`)} placeholder="e.g. Tablet formulation R&D" className={inputClass} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => append({ product: "", quantity: "", purpose: "" })}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-accent/30 py-3 font-body text-sm font-medium text-accent transition-colors hover:border-accent hover:bg-accent-pale"
                      >
                        <Plus className="h-4 w-4" /> Add Another Product
                      </button>

                      {errors.items?.message && (
                        <p className="mt-2 font-body text-xs text-destructive">{errors.items.message}</p>
                      )}

                      <button
                        type="button"
                        onClick={nextStep}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3 font-display text-sm font-semibold text-accent-foreground hover:bg-accent-light transition-all"
                      >
                        Next: Your Details <ArrowRight className="h-4 w-4" />
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                      <h2 className="font-display text-lg font-semibold text-foreground mb-4">Your Details</h2>

                      <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="s-name" className={labelClass}>Full Name *</label>
                            <input {...register("name")} id="s-name" className={inputClass} />
                            {errors.name && <p className="mt-1 font-body text-xs text-destructive">{errors.name.message}</p>}
                          </div>
                          <div>
                            <label htmlFor="s-company" className={labelClass}>Company *</label>
                            <input {...register("company")} id="s-company" className={inputClass} />
                            {errors.company && <p className="mt-1 font-body text-xs text-destructive">{errors.company.message}</p>}
                          </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="s-email" className={labelClass}>Email *</label>
                            <input {...register("email")} id="s-email" type="email" className={inputClass} />
                            {errors.email && <p className="mt-1 font-body text-xs text-destructive">{errors.email.message}</p>}
                          </div>
                          <div>
                            <label htmlFor="s-phone" className={labelClass}>Phone</label>
                            <input {...register("phone")} id="s-phone" className={inputClass} />
                          </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="s-city" className={labelClass}>City</label>
                            <input {...register("city")} id="s-city" className={inputClass} />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="s-address" className={labelClass}>Shipping Address</label>
                          <textarea {...register("address")} id="s-address" rows={2} className={inputClass} />
                        </div>
                      </div>

                      <div className="mt-6 flex gap-3">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="flex items-center gap-2 rounded-full border border-border px-6 py-3 font-display text-sm font-semibold text-foreground hover:bg-muted transition-all"
                        >
                          <ArrowLeft className="h-4 w-4" /> Back
                        </button>
                        <button
                          type="submit"
                          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent py-3 font-display text-sm font-semibold text-accent-foreground hover:bg-accent-light transition-all"
                        >
                          Submit Request <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* What Happens Next */}
      <section className="section-padding bg-card">
        <div className="container-scope">
          <h2 className="text-center font-display text-h2 font-bold text-foreground">What Happens Next?</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <s.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">{s.label}</h3>
                <p className="mt-1 font-body text-sm text-text-secondary">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default RequestSample;
