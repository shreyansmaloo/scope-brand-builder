import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — Linkedin is deprecated in lucide-react but not yet replaced; same usage as rest of codebase
import { Linkedin as LinkedinIcon, ChevronLeft, ChevronRight, X } from "lucide-react";

const team = [
  { name: "Shri Vijaylal Kawarlal Vaid", title: "Founder & Visionary", linkedin: "#", photo: "/members/vijaylal-vaid.jpeg" },
  { name: "Ramesh V Jain", title: "Director", linkedin: "#", photo: "/members/ramesh-jain.jpeg" },
  { name: "Sachin V Jain", title: "Director", linkedin: "#", photo: "/members/sachin-jain.jpeg" },
  { name: "Ashish V Jain", title: "Director", linkedin: "#", photo: "/members/ashish-jain.jpeg" },
  { name: "Ritesh Jain", title: "Executive Director - Personal Care", linkedin: "#", photo: "/members/ritesh-jain.jpeg" },
  { name: "Rohit Jain", title: "Executive Director - Personal Care", linkedin: "#", photo: "/members/rohit-jain.jpeg" },
  { name: "Hriday Jain", title: "Executive Director - Food", linkedin: "#", photo: "/members/hriday-jain.jpeg" },
];

const initials = (name: string) =>
  name.split(" ").filter((n) => n.toLowerCase() !== "shri").slice(0, 2).map((n) => n[0]).join("");

const Avatar = ({ member, size = 24 }: { member: typeof team[0]; size?: number }) => (
  <div className={`rounded-full overflow-hidden bg-primary text-primary-foreground flex items-center justify-center shrink-0`} style={{ width: size, height: size }}>
    {member.photo
      ? <img src={member.photo} alt={member.name} className="h-full w-full object-cover object-top" />
      : <span className="font-bold" style={{ fontSize: size * 0.3 }}>{initials(member.name)}</span>}
  </div>
);

// ─── VARIANT A: Current Org-Chart ─────────────────────────────────────────
const VariantA = () => {
  const Card = ({ member, delay = 0 }: { member: typeof team[0]; delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="group relative flex w-full max-w-[220px] flex-col overflow-hidden rounded-3xl border border-border/40 bg-card shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-md"
    >
      <div className="h-20 w-full shrink-0 bg-primary/10 group-hover:bg-primary/15 transition-colors" />
      <div className="relative -mt-12 flex flex-1 flex-col items-center px-4 pb-5">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white shadow-md ring-4 ring-card overflow-hidden">
          <Avatar member={member} size={96} />
        </div>
        <h4 className="mt-3 text-center font-display text-sm font-bold leading-tight text-foreground">{member.name}</h4>
        <p className="mt-1 text-center font-body text-[9px] font-semibold uppercase tracking-widest text-accent">{member.title}</p>
        <div className="mt-4 flex w-full justify-center border-t border-border/50 pt-4">
          <a href={member.linkedin} className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all">
            <LinkedinIcon className="h-3 w-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="section-padding bg-secondary">
      <div className="container-scope">
        <span className="section-tag">Our People</span>
        <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">Leadership Team</h2>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">A collective pharma experience of over 160 years.</p>
        <div className="mt-16 flex w-full max-w-4xl flex-col items-center gap-0 sm:gap-10 mx-auto">
          <div className="relative flex w-full justify-center">
            {team.slice(0, 1).map((m) => <Card key={m.name} member={m} />)}
            <div className="absolute top-full left-1/2 h-10 w-[2px] -translate-x-1/2 bg-border/80 hidden sm:block" />
          </div>
          <div className="relative w-full">
            <div className="absolute top-0 left-[16.66%] right-[16.66%] h-[2px] bg-border/80 hidden sm:block" />
            <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3 sm:pt-6">
              {team.slice(1, 4).map((m, i) => (
                <div key={m.name} className="relative flex justify-center">
                  <div className="absolute bottom-full left-1/2 h-6 w-[2px] -translate-x-1/2 bg-border/80 hidden sm:block" />
                  <Card member={m} delay={0.1 + i * 0.1} />
                </div>
              ))}
            </div>
            <div className="absolute top-full left-1/2 h-10 w-[2px] -translate-x-1/2 bg-border/80 hidden sm:block" />
          </div>
          <div className="relative w-full">
            <div className="absolute top-0 left-[16.66%] right-[16.66%] h-[2px] bg-border/80 hidden sm:block" />
            <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3 sm:pt-6">
              {team.slice(4, 7).map((m, i) => (
                <div key={m.name} className="relative flex justify-center">
                  <div className="absolute bottom-full left-1/2 h-6 w-[2px] -translate-x-1/2 bg-border/80 hidden sm:block" />
                  <Card member={m} delay={0.4 + i * 0.1} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── VARIANT B: Featured Founder + Tight Grid ─────────────────────────────
const VariantB = () => (
  <section className="section-padding bg-secondary">
    <div className="container-scope">
      <span className="section-tag">Our People</span>
      <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">Leadership Team</h2>
      <p className="mt-3 max-w-2xl text-base text-muted-foreground">A collective pharma experience of over 160 years.</p>
      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative overflow-hidden rounded-3xl bg-primary text-primary-foreground shadow-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
          <img src={team[0].photo} alt={team[0].name} className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" style={{ minHeight: 380 }} />
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
            <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-primary mb-1">{team[0].title}</p>
            <h3 className="font-display text-xl font-bold text-white leading-tight">{team[0].name}</h3>
            <a href={team[0].linkedin} className="mt-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-all">
              <LinkedinIcon className="h-3.5 w-3.5 text-white" />
            </a>
          </div>
        </motion.div>
        <div className="lg:col-span-2 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {team.slice(1).map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border/40 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img src={member.photo} alt={member.name} className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <p className="font-body text-[9px] font-bold uppercase tracking-widest text-accent">{member.title}</p>
                <h4 className="mt-1 font-display text-sm font-bold text-foreground leading-tight">{member.name}</h4>
                <a href={member.linkedin} className="mt-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                  <LinkedinIcon className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── VARIANT C: Horizontal Scroll Carousel ───────────────────────────────
const VariantC = () => {
  const [idx, setIdx] = useState(0);
  const visible = 3;
  const max = team.length - visible;

  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="container-scope">
        <div className="flex items-end justify-between">
          <div>
            <span className="section-tag">Our People</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">Leadership Team</h2>
            <p className="mt-3 max-w-lg text-base text-muted-foreground">A collective pharma experience of over 160 years.</p>
          </div>
          <div className="hidden sm:flex gap-2">
            <button onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0} className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all disabled:opacity-30">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => setIdx(Math.min(max, idx + 1))} disabled={idx >= max} className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all disabled:opacity-30">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="mt-12 overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: `calc(-${idx} * (100% / ${visible} + 24px / ${visible}))` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex-shrink-0 w-[calc(33.33%-16px)] rounded-3xl overflow-hidden border border-border/40 bg-card shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img src={member.photo} alt={member.name} className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <a href={member.linkedin} className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white">
                    <LinkedinIcon className="h-4 w-4" />
                  </a>
                </div>
                <div className="p-5">
                  <p className="font-body text-[10px] font-bold uppercase tracking-widest text-accent">{member.title}</p>
                  <h4 className="mt-1.5 font-display text-base font-bold text-foreground leading-tight">{member.name}</h4>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`h-2 rounded-full transition-all ${i === idx ? "w-6 bg-primary" : "w-2 bg-border"}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── VARIANT D: Row List ─────────────────────────────────────────────────
const VariantD = () => (
  <section className="section-padding bg-secondary">
    <div className="container-scope">
      <span className="section-tag">Our People</span>
      <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">Leadership Team</h2>
      <p className="mt-3 max-w-2xl text-base text-muted-foreground">A collective pharma experience of over 160 years.</p>
      <div className="mt-16 space-y-4">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="group flex items-center gap-5 rounded-2xl border border-border/40 bg-card px-6 py-4 shadow-sm hover:shadow-md hover:border-primary/20 transition-all"
          >
            <span className="font-display text-sm font-bold text-border w-6 shrink-0 text-center">{String(i + 1).padStart(2, "0")}</span>
            <div className="h-14 w-14 shrink-0 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
              <Avatar member={member} size={56} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-display text-base font-bold text-foreground leading-tight truncate">{member.name}</h4>
              <p className="font-body text-xs text-muted-foreground mt-0.5">{member.title}</p>
            </div>
            <div className="ml-auto shrink-0 flex items-center gap-3">
              {i === 0 && <span className="hidden sm:inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">Founder</span>}
              <a href={member.linkedin} className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                <LinkedinIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── VARIANT E: Mosaic Grid ───────────────────────────────────────────────
const VariantE = () => (
  <section className="section-padding bg-background">
    <div className="container-scope">
      <div className="text-center max-w-2xl mx-auto">
        <span className="section-tag">Our People</span>
        <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">Leadership Team</h2>
        <p className="mt-3 text-base text-muted-foreground">A collective pharma experience of over 160 years.</p>
      </div>
      <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="group col-span-2 row-span-2 relative overflow-hidden rounded-3xl bg-primary shadow-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
          <img src={team[0].photo} alt={team[0].name} className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" style={{ minHeight: 420 }} />
          <div className="absolute inset-x-0 bottom-0 z-20 p-7">
            <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white mb-3">Founder & Visionary</span>
            <h3 className="font-display text-2xl font-bold text-white leading-tight">{team[0].name}</h3>
            <a href={team[0].linkedin} className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white transition-all">
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
        {team.slice(1).map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (i + 1) * 0.06 }}
            className="group relative overflow-hidden rounded-2xl bg-card border border-border/40 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className="aspect-square overflow-hidden">
              <img src={member.photo} alt={member.name} className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-4">
              <p className="font-body text-[9px] font-bold uppercase tracking-widest text-accent leading-tight">{member.title}</p>
              <h4 className="mt-1 font-display text-sm font-bold text-foreground leading-tight">{member.name}</h4>
              <a href={member.linkedin} className="mt-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                <LinkedinIcon className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── VARIANT F: Dark Premium ──────────────────────────────────────────────
const VariantF = () => (
  <section className="section-padding bg-[#0e0e10]">
    <div className="container-scope">
      <div className="flex flex-col items-start">
        <span className="inline-flex items-center rounded-full border border-[#F69A1E]/30 bg-[#F69A1E]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#F69A1E]">Our People</span>
        <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">Leadership Team</h2>
        <p className="mt-3 max-w-2xl text-base text-white/40">A collective pharma experience of over 160 years.</p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4 rounded-3xl overflow-hidden border border-white/10">
        {/* Founder — full width top row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="group col-span-full flex flex-col sm:flex-row items-center gap-8 bg-[#111113] p-8 sm:p-10 border-b border-white/5"
        >
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full bg-[#F69A1E]/20 blur-xl scale-150" />
            <div className="relative h-28 w-28 rounded-full overflow-hidden ring-2 ring-[#F69A1E]/40">
              <Avatar member={team[0]} size={112} />
            </div>
          </div>
          <div>
            <span className="inline-block rounded-full bg-[#F69A1E]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#F69A1E] mb-3">{team[0].title}</span>
            <h3 className="font-display text-2xl font-bold text-white">{team[0].name}</h3>
            <p className="mt-2 text-sm text-white/40">Established the company's foundation on integrity, trust, and responsibility.</p>
          </div>
          <a href={team[0].linkedin} className="ml-auto shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 hover:border-[#F69A1E] hover:text-[#F69A1E] transition-all">
            <LinkedinIcon className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Remaining in 4-col grid */}
        {team.slice(1).map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="group flex flex-col gap-4 bg-[#111113] p-6 hover:bg-[#181820] transition-colors"
          >
            <div className="relative w-fit">
              <div className="absolute inset-0 rounded-full bg-[#F69A1E]/10 blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative h-16 w-16 rounded-full overflow-hidden ring-1 ring-white/10 group-hover:ring-[#F69A1E]/40 transition-all">
                <Avatar member={member} size={64} />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-body text-[9px] font-bold uppercase tracking-widest text-[#F69A1E]">{member.title}</p>
              <h4 className="mt-1 font-display text-sm font-bold text-white leading-tight">{member.name}</h4>
            </div>
            <a href={member.linkedin} className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/30 hover:border-[#F69A1E] hover:text-[#F69A1E] transition-all">
              <LinkedinIcon className="h-3 w-3" />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── VARIANT G: Click-to-Spotlight ───────────────────────────────────────
const VariantG = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected !== null ? team[selected] : null;

  return (
    <section className="section-padding bg-secondary">
      <div className="container-scope">
        <span className="section-tag">Our People</span>
        <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">Leadership Team</h2>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">Click a member to learn more.</p>

        {/* Avatar picker row */}
        <div className="mt-16 flex flex-wrap gap-4 justify-center">
          {team.map((member, i) => (
            <motion.button
              key={member.name}
              onClick={() => setSelected(selected === i ? null : i)}
              whileHover={{ y: -4 }}
              className={`group flex flex-col items-center gap-2 transition-all`}
            >
              <div className={`relative h-20 w-20 rounded-full overflow-hidden ring-4 transition-all duration-300 ${selected === i ? "ring-primary scale-110 shadow-[0_0_24px_rgba(246,154,30,0.35)]" : "ring-border/40 hover:ring-primary/40"}`}>
                <Avatar member={member} size={80} />
              </div>
              <span className={`font-body text-[10px] font-semibold uppercase tracking-widest transition-colors ${selected === i ? "text-primary" : "text-muted-foreground"}`}>
                {member.name.split(" ").filter((n) => n.toLowerCase() !== "shri").at(-1)}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="mt-10 relative flex flex-col sm:flex-row gap-8 items-center rounded-3xl border border-border/40 bg-card p-8 shadow-[0_20px_60px_rgba(246,154,30,0.06)]"
            >
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-white transition-all">
                <X className="h-3.5 w-3.5" />
              </button>
              <div className="h-36 w-36 shrink-0 rounded-2xl overflow-hidden shadow-xl ring-4 ring-primary/20">
                <Avatar member={active} size={144} />
              </div>
              <div>
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">{active.title}</span>
                <h3 className="mt-3 font-display text-2xl font-bold text-foreground">{active.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xl">
                  A dedicated leader with decades of expertise in the specialty chemicals and ingredients industry, helping Scope build lasting partnerships across India and globally.
                </p>
                <a href={active.linkedin} className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-all">
                  <LinkedinIcon className="h-3.5 w-3.5" /> View LinkedIn
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// ─── VARIANT H: Alternating Strips ───────────────────────────────────────
const VariantH = () => (
  <section className="section-padding bg-background">
    <div className="container-scope">
      <div className="text-center max-w-2xl mx-auto">
        <span className="section-tag">Our People</span>
        <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">Leadership Team</h2>
        <p className="mt-3 text-base text-muted-foreground">A collective pharma experience of over 160 years.</p>
      </div>

      <div className="mt-16 space-y-6">
        {team.map((member, i) => {
          const isEven = i % 2 === 0;
          return (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, x: isEven ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className={`group flex flex-col sm:flex-row ${isEven ? "" : "sm:flex-row-reverse"} items-center gap-6 rounded-3xl border border-border/40 bg-card p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all`}
            >
              {/* Photo */}
              <div className={`relative shrink-0`}>
                <div className={`absolute inset-0 rounded-2xl bg-primary/10 blur-xl scale-125 opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-2xl overflow-hidden shadow-md ring-2 ring-border/30 group-hover:ring-primary/30 transition-all">
                  <Avatar member={member} size={112} />
                </div>
              </div>

              {/* Divider */}
              <div className={`hidden sm:block w-[2px] self-stretch bg-gradient-to-b from-transparent via-border to-transparent rounded-full`} />

              {/* Text */}
              <div className={`flex-1 text-center sm:text-left ${!isEven ? "sm:text-right" : ""}`}>
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">{member.title}</span>
                <h3 className="mt-2 font-display text-xl font-bold text-foreground leading-tight">{member.name}</h3>
              </div>

              {/* LinkedIn */}
              <a href={member.linkedin} className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all`}>
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

// ─── VARIANT I: Minimal Chips ─────────────────────────────────────────────
const VariantI = () => (
  <section className="section-padding bg-secondary">
    <div className="container-scope">
      <div className="flex flex-col items-center text-center">
        <span className="section-tag">Our People</span>
        <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">Leadership Team</h2>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">A collective pharma experience of over 160 years, driving Scope's vision.</p>
      </div>

      {/* Founder chip — hero size */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 mx-auto w-fit"
      >
        <a href={team[0].linkedin} className="group inline-flex items-center gap-4 rounded-full border border-primary/30 bg-primary/5 px-6 py-4 shadow-sm hover:border-primary hover:bg-primary/10 hover:shadow-[0_8px_30px_rgba(246,154,30,0.15)] transition-all">
          <div className="h-16 w-16 rounded-full overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary transition-all">
            <Avatar member={team[0]} size={64} />
          </div>
          <div className="text-left">
            <p className="font-body text-[10px] font-bold uppercase tracking-widest text-primary">{team[0].title}</p>
            <h4 className="mt-0.5 font-display text-lg font-bold text-foreground">{team[0].name}</h4>
          </div>
          <LinkedinIcon className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      </motion.div>

      {/* Connecting dot */}
      <div className="flex justify-center my-4">
        <div className="w-[1px] h-8 bg-gradient-to-b from-primary/30 to-transparent" />
      </div>

      {/* Rest in flowing chip grid */}
      <div className="flex flex-wrap justify-center gap-3">
        {team.slice(1).map((member, i) => (
          <motion.a
            key={member.name}
            href={member.linkedin}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -3 }}
            className="group inline-flex items-center gap-3 rounded-full border border-border/50 bg-card px-5 py-3 shadow-sm hover:border-primary/40 hover:shadow-md hover:bg-primary/5 transition-all"
          >
            <div className="h-10 w-10 rounded-full overflow-hidden ring-1 ring-border/30 group-hover:ring-primary/30 transition-all shrink-0">
              <Avatar member={member} size={40} />
            </div>
            <div>
              <p className="font-body text-[9px] font-bold uppercase tracking-widest text-accent leading-none">{member.title.split(" - ")[0]}</p>
              <h4 className="mt-0.5 font-display text-sm font-bold text-foreground">{member.name}</h4>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

// ─── Main showcase ─────────────────────────────────────────────────────────
const VARIANTS = [
  { id: "A", label: "Org Chart (Current)", component: VariantA },
  { id: "B", label: "Featured + Grid", component: VariantB },
  { id: "C", label: "Carousel", component: VariantC },
  { id: "D", label: "Row List", component: VariantD },
  { id: "E", label: "Mosaic Grid", component: VariantE },
  { id: "F", label: "Dark Premium", component: VariantF },
  { id: "G", label: "Click Spotlight", component: VariantG },
  { id: "H", label: "Alternating Strips", component: VariantH },
  { id: "I", label: "Minimal Chips", component: VariantI },
];

const LeadershipVariants = () => {
  const [active, setActive] = useState("A");
  const current = VARIANTS.find((v) => v.id === active)!;
  const Component = current.component;

  return (
    <main className="pt-20">
      <div className="sticky top-16 z-30 bg-card/80 backdrop-blur border-b border-border shadow-sm">
        <div className="container-scope py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              onClick={() => setActive(v.id)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                active === v.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <span className="opacity-50 mr-1">{v.id}.</span> {v.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Component />
      </motion.div>
    </main>
  );
};

export default LeadershipVariants;
