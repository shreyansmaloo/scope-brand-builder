import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, ClipboardList, Package, Microscope, Plus, Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProducts } from "@/context/ProductsContext";
import SEO from "@/components/seo/SEO";
import StructuredData, { generateBreadcrumbSchema } from "@/components/seo/StructuredData";
import { toast } from "sonner";

const schema = z.object({
  industry: z.string().min(1, "Please select an industry"),
  items: z.array(z.object({
    product: z.string().trim().min(1, "Select a product"),
    grade: z.string().optional(),
    quantity: z.string().trim().min(1, "Specify quantity"),
    purpose: z.string().max(500).optional(),
  })).min(1, "Add at least one product"),
  firstName: z.string().trim().min(1, "First name is required").max(100),
  secondName: z.string().trim().min(1, "Second name is required").max(100),
  company: z.string().trim().min(1, "Company name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(1, "Phone number is required").max(20),
  altPhone: z.string().trim().max(20).optional(),
  address1: z.string().trim().min(1, "Address Line 1 is required").max(200),
  address2: z.string().trim().max(200).optional(),
  area: z.string().trim().min(1, "Area is required").max(100),
  pincode: z.string().trim().min(1, "Pin code is required").max(20),
  city: z.string().trim().min(1, "City is required").max(100),
  state: z.string().trim().min(1, "State is required").max(100),
  country: z.string().trim().min(1, "Country is required").max(100),
});

type SampleForm = z.infer<typeof schema>;

const INDUSTRY_LABELS: Record<string, string> = {
  pharma: "Pharma",
  cosmetics: "Personal Care & Cosmetics",
  food: "Food & Nutrition",
};

const steps = [
  { icon: ClipboardList, label: "We review your request", desc: "Within 24 hours" },
  { icon: Package, label: "Sample dispatched", desc: "From our nearest warehouse" },
  { icon: Microscope, label: "Technical follow-up", desc: "Our team follows up for feedback" },
];

const inputClass = "mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent";
const labelClass = "font-body text-sm font-medium text-foreground";

// Per-item grade picker — needs to watch its own product field
const GradeField = ({
  index, industry, register, control,
}: {
  index: number;
  industry: string;
  register: any;
  control: any;
}) => {
  const { products } = useProducts();
  const productName = useWatch({ control, name: `items.${index}.product` });

  const grades = useMemo(() => {
    if (!productName || !industry) return [];
    return products
      .filter(p => p.industry === industry && p.name === productName && p.grade && p.grade !== "-")
      .map(p => p.grade!)
      .filter((g, i, arr) => arr.indexOf(g) === i)
      .sort();
  }, [productName, industry, products]);

  if (grades.length === 0) return null;

  return (
    <div className="mt-3">
      <label className={labelClass}>Grade *</label>
      <select {...register(`items.${index}.grade`)} className={inputClass}>
        <option value="">Select grade...</option>
        {grades.map(g => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
    </div>
  );
};

const RequestSample = () => {
  const { products } = useProducts();
  const [searchParams] = useSearchParams();
  const initialProduct = searchParams.get("product") || "";
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  const { register, handleSubmit, control, formState: { errors }, trigger, watch, setValue, } = useForm<SampleForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      industry: "",
      items: [{ product: initialProduct, grade: "", quantity: "", purpose: "" }],
      firstName: "",
      secondName: "",
      company: "",
      email: "",
      phone: "",
      altPhone: "",
      address1: "",
      address2: "",
      area: "",
      pincode: "",
      city: "",
      state: "",
      country: "India",
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const selectedIndustry = watch("industry");

  // Unique product names for selected industry
  const productOptions = useMemo(() => {
    if (!selectedIndustry) return [];
    return [...new Set(
      products
        .filter(p => p.industry === selectedIndustry)
        .map(p => p.name)
    )].sort();
  }, [selectedIndustry]);

  const onSubmit = async (data: SampleForm) => {
    const payload = {
      firstName:  data.firstName,
      secondName: data.secondName,
      company:    data.company,
      email:      data.email,
      phone:      data.phone,
      altPhone:   data.altPhone || '',
      address1:   data.address1,
      address2:   data.address2 || '',
      area:       data.area,
      pincode:    data.pincode,
      city:       data.city,
      state:      data.state,
      country:    data.country,
      industry:   INDUSTRY_LABELS[data.industry] || data.industry,
      items:      data.items,
    };

    const promise = fetch('/send-email.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(async (res) => {
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Server error');
      return json;
    });

    toast.promise(promise, {
      loading: 'Submitting your sample request...',
      success: () => {
        setSubmitted(true);
        return 'Sample request submitted successfully!';
      },
      error: (err) => {
        console.error('Send error:', err);
        return 'Failed to submit request. Please try again.';
      },
    });
  };

  const nextStep = async () => {
    if (step === 1) {
      const valid = await trigger(["industry", "items"]);
      if (valid) setStep(2);
    }
  };

  const industryReg = register("industry");

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.scope-india.com" },
    { name: "Request Sample", url: "https://www.scope-india.com/request-sample" },
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
              <CheckCircle className="h-16 w-16 text-accent" />
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

                      {/* Industry — single for the whole request */}
                      <div className="mb-6 rounded-xl border border-border bg-card p-4 shadow-sm">
                        <label className={labelClass}>Industry *</label>
                        <select
                          {...industryReg}
                          onChange={(e) => {
                            industryReg.onChange(e);
                            fields.forEach((_, i) => {
                              setValue(`items.${i}.product`, "");
                              setValue(`items.${i}.grade`, "");
                            });
                          }}
                          className={inputClass}
                        >
                          <option value="">Select industry...</option>
                          {Object.entries(INDUSTRY_LABELS).map(([val, label]) => (
                            <option key={val} value={val}>{label}</option>
                          ))}
                        </select>
                        {errors.industry && (
                          <p className="mt-1 font-body text-xs text-destructive">{errors.industry.message}</p>
                        )}
                      </div>

                      {/* Product items */}
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

                            {/* Product name */}
                            <div>
                              <label className={labelClass}>Product Name *</label>
                              {(() => {
                                const productReg = register(`items.${index}.product`);
                                return (
                                  <select
                                    {...productReg}
                                    disabled={!selectedIndustry}
                                    className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                                    onChange={(e) => {
                                      productReg.onChange(e);
                                      setValue(`items.${index}.grade`, "");
                                    }}
                                  >
                                    <option value="">
                                      {selectedIndustry ? "Select a product..." : "Select an industry first"}
                                    </option>
                                    {productOptions.map((name) => (
                                      <option key={name} value={name}>{name}</option>
                                    ))}
                                  </select>
                                );
                              })()}
                              {errors.items?.[index]?.product && (
                                <p className="mt-1 font-body text-xs text-destructive">{errors.items[index]?.product?.message}</p>
                              )}
                            </div>

                            {/* Grade — only shown when the selected product has multiple grades */}
                            <GradeField
                              index={index}
                              industry={selectedIndustry}
                              register={register}
                              control={control}
                            />

                            {/* Quantity + Purpose */}
                            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                              <div>
                                <label className={labelClass}>Quantity *</label>
                                <input {...register(`items.${index}.quantity`)} placeholder="e.g. 500g, 1kg" className={inputClass} />
                                {errors.items?.[index]?.quantity && (
                                  <p className="mt-1 font-body text-xs text-destructive">{errors.items[index]?.quantity?.message}</p>
                                )}
                              </div>
                              <div>
                                <label className={labelClass}>Purpose / Application</label>
                                <input {...register(`items.${index}.purpose`)} placeholder="e.g. Tablet formulation R&D" className={inputClass} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => append({ product: "", grade: "", quantity: "", purpose: "" })}
                        disabled={!selectedIndustry}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-accent/30 py-3 font-body text-sm font-medium text-accent transition-colors hover:border-accent hover:bg-accent-pale disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Plus className="h-4 w-4" /> Add Another Product
                      </button>

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
                      <h2 className="font-display text-lg font-semibold text-foreground mb-4">Your Details & Shipping Address</h2>

                      <div className="space-y-4">
                        {/* Name Fields */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="s-firstName" className={labelClass}>First Name *</label>
                            <input {...register("firstName")} id="s-firstName" placeholder="e.g. Jane" className={inputClass} />
                            {errors.firstName && <p className="mt-1 font-body text-xs text-destructive">{errors.firstName.message}</p>}
                          </div>
                          <div>
                            <label htmlFor="s-secondName" className={labelClass}>Second Name *</label>
                            <input {...register("secondName")} id="s-secondName" placeholder="e.g. Doe" className={inputClass} />
                            {errors.secondName && <p className="mt-1 font-body text-xs text-destructive">{errors.secondName.message}</p>}
                          </div>
                        </div>

                        {/* Company & Email */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="s-company" className={labelClass}>Company Name *</label>
                            <input {...register("company")} id="s-company" placeholder="e.g. Acme Corporation" className={inputClass} />
                            {errors.company && <p className="mt-1 font-body text-xs text-destructive">{errors.company.message}</p>}
                          </div>
                          <div>
                            <label htmlFor="s-email" className={labelClass}>Email Address *</label>
                            <input {...register("email")} id="s-email" type="email" placeholder="e.g. name@company.com" className={inputClass} />
                            {errors.email && <p className="mt-1 font-body text-xs text-destructive">{errors.email.message}</p>}
                          </div>
                        </div>

                        {/* Phone Fields */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="s-phone" className={labelClass}>Phone Number *</label>
                            <input {...register("phone")} id="s-phone" placeholder="e.g. +91 98765 43210" className={inputClass} />
                            {errors.phone && <p className="mt-1 font-body text-xs text-destructive">{errors.phone.message}</p>}
                          </div>
                          <div>
                            <label htmlFor="s-altPhone" className={labelClass}>Alternative Phone Number</label>
                            <input {...register("altPhone")} id="s-altPhone" placeholder="e.g. +91 98765 43211" className={inputClass} />
                            {errors.altPhone && <p className="mt-1 font-body text-xs text-destructive">{errors.altPhone.message}</p>}
                          </div>
                        </div>

                        {/* Address Lines */}
                        <div>
                          <label htmlFor="s-address1" className={labelClass}>Address Line 1 *</label>
                          <input {...register("address1")} id="s-address1" placeholder="Flat, House no., Building, Company" className={inputClass} />
                          {errors.address1 && <p className="mt-1 font-body text-xs text-destructive">{errors.address1.message}</p>}
                        </div>

                        <div>
                          <label htmlFor="s-address2" className={labelClass}>Address Line 2 (Optional)</label>
                          <input {...register("address2")} id="s-address2" placeholder="Street, Sector, Block, Landmark" className={inputClass} />
                          {errors.address2 && <p className="mt-1 font-body text-xs text-destructive">{errors.address2.message}</p>}
                        </div>

                        {/* Area & Pin Code */}
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="s-area" className={labelClass}>Area / Locality *</label>
                            <input {...register("area")} id="s-area" placeholder="e.g. Egmore" className={inputClass} />
                            {errors.area && <p className="mt-1 font-body text-xs text-destructive">{errors.area.message}</p>}
                          </div>
                          <div>
                            <label htmlFor="s-pincode" className={labelClass}>Pin Code *</label>
                            <input {...register("pincode")} id="s-pincode" placeholder="e.g. 600008" className={inputClass} />
                            {errors.pincode && <p className="mt-1 font-body text-xs text-destructive">{errors.pincode.message}</p>}
                          </div>
                        </div>

                        {/* City, State & Country */}
                        <div className="grid gap-4 sm:grid-cols-3">
                          <div>
                            <label htmlFor="s-city" className={labelClass}>City *</label>
                            <input {...register("city")} id="s-city" placeholder="e.g. Chennai" className={inputClass} />
                            {errors.city && <p className="mt-1 font-body text-xs text-destructive">{errors.city.message}</p>}
                          </div>
                          <div>
                            <label htmlFor="s-state" className={labelClass}>State *</label>
                            <input {...register("state")} id="s-state" placeholder="e.g. Tamil Nadu" className={inputClass} />
                            {errors.state && <p className="mt-1 font-body text-xs text-destructive">{errors.state.message}</p>}
                          </div>
                          <div>
                            <label htmlFor="s-country" className={labelClass}>Country *</label>
                            <input {...register("country")} id="s-country" placeholder="e.g. India" className={inputClass} />
                            {errors.country && <p className="mt-1 font-body text-xs text-destructive">{errors.country.message}</p>}
                          </div>
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
