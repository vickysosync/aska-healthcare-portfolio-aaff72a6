import { useMemo, useState } from "react";
import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import { Badge, Icon, Modal, SectionHeading, SmartImage } from "@/components/ui-kit";
import { ContactForm } from "@/components/site/ContactForm";
import {
  PRODUCT_CATEGORIES, useAbout, useActivities, useContact, useGallery, useProducts, useServices, useSite, useSteps, useTeam, useValues,
  type GalleryItem, type Product, type Service,
} from "@/data/content";

export function Hero() {
  const [site] = useSite();
  return (
    <section id="home" className="relative overflow-hidden bg-primary">
      <div className="absolute inset-0 cross-pattern opacity-30" aria-hidden />
      <div className="container-x relative grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div className="animate-fade-up text-primary-foreground">
          <p className="eyebrow !text-accent">{site.heroLabel}</p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] md:text-5xl lg:text-6xl">{site.heroHeading}</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">{site.heroText}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#services" className="btn btn-teal">{site.ctaPrimary}<Icon.Arrow width={16} height={16} /></a>
            <a href="#contact" className="btn btn-ghost-light">{site.ctaSecondary}</a>
          </div>
          <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-primary-foreground/15 pt-6 text-sm">
            {["Human Healthcare", "Pharmaceuticals", "Hospital Activities"].map((t) => (
              <div key={t} className="flex items-start gap-2 text-primary-foreground/80"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />{t}</div>
            ))}
          </div>
        </div>
        <div className="relative animate-fade-up [animation-delay:150ms]">
          <div className="overflow-hidden rounded-xl shadow-lift ring-1 ring-primary-foreground/10">
            <img src={heroImg} alt="Healthcare professionals reviewing information on a tablet in a modern clinical corridor" width={1600} height={1008} className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]" />
          </div>
          <div className="absolute -bottom-5 left-5 hidden max-w-[240px] rounded-lg bg-surface p-4 shadow-lift sm:block">
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary">Based in Mumbai</p>
            <p className="mt-1 text-sm text-foreground">Healthcare, pharmaceutical & hospital-related activities.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  const [about] = useAbout();
  const [team] = useTeam();
  const [values] = useValues();
  const leaders = team.filter((t) => t.visible);
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div className="relative">
          <SmartImage src={aboutImg} alt="Gloved hands arranging packaged medicines on pharmacy shelves" className="aspect-[6/7] w-full rounded-xl" />
          <div className="absolute -right-4 -top-4 -z-10 h-full w-full rounded-xl bg-accent" aria-hidden />
        </div>
        <div>
          <SectionHeading eyebrow="About ASKA Healthcare" title={about.heading} />
          <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
            <p>{about.intro}</p><p>{about.focus}</p><p>{about.commitment}</p>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {values.slice(0, 4).map((v) => <li key={v.id} className="flex items-center gap-2 text-sm font-medium text-primary"><Icon.Shield className="text-secondary" width={18} height={18} />{v.title}</li>)}
          </ul>
        </div>
      </div>

      <div className="container-x mt-20 grid gap-6 md:grid-cols-2">
        {[["Our Mission", about.mission, Icon.Heart], ["Our Vision", about.vision, Icon.Star]].map(([t, txt, I]) => {
          const Ico = I as typeof Icon.Heart;
          return (
            <div key={t as string} className="rounded-xl border bg-surface p-8 shadow-soft">
              <Ico className="text-secondary" width={28} height={28} />
              <h3 className="mt-4 text-2xl font-semibold text-primary">{t as string}</h3>
              <p className="mt-3 text-lg leading-relaxed text-foreground">“{txt as string}”</p>
              <p className="mt-4 text-xs text-muted-foreground">Proposed brand statement.</p>
            </div>
          );
        })}
      </div>

      {leaders.length > 0 && (
        <div className="container-x mt-20">
          <SectionHeading eyebrow="Leadership" title="Company Leadership" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:max-w-3xl">
            {leaders.map((m) => (
              <div key={m.id} className="flex items-center gap-5 rounded-xl border bg-surface p-6">
                {m.image ? <SmartImage src={m.image} alt={m.name} className="h-16 w-16 rounded-full" /> : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent font-display text-xl font-semibold text-primary">{m.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}</div>
                )}
                <div><p className="font-display text-lg font-semibold text-primary">{m.name}</p><p className="text-sm text-secondary">{m.role}</p></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export function ServicesSection() {
  const [services] = useServices();
  const [sel, setSel] = useState<Service | null>(null);
  const list = services.filter((s) => s.visible);
  return (
    <section id="services" className="bg-accent/50 py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Healthcare Services" title="Areas of Healthcare Activity" text="An overview of the healthcare areas ASKA Healthcare engages in. Descriptions are illustrative and specifics are discussed on enquiry." />
        </div>
        {list.length === 0 ? <p className="mt-10 text-muted-foreground">No services are currently listed.</p> : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s, i) => (
              <article key={s.id} className="card-lift group flex flex-col overflow-hidden rounded-xl border bg-surface">
                <div className="overflow-hidden"><SmartImage src={s.image} alt={s.title} className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-105" /></div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold text-secondary">0{i + 1} · {s.category}</p>
                  <h3 className="mt-2 text-xl font-semibold text-primary">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                  <button onClick={() => setSel(s)} className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-secondary hover:gap-2.5 transition-all">Learn More<Icon.Arrow width={16} height={16} /></button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <Modal open={!!sel} onClose={() => setSel(null)} title={sel?.title ?? ""}>
        {sel && <>
          <SmartImage src={sel.image} alt={sel.title} className="aspect-video w-full rounded-lg" />
          <Badge>{sel.category}</Badge>
          <p className="mt-4 leading-relaxed text-foreground">{sel.description}</p>
          <p className="mt-3 leading-relaxed text-muted-foreground">{sel.details}</p>
          <a href="#contact" onClick={() => setSel(null)} className="btn btn-teal mt-6">Enquire about this</a>
        </>}
      </Modal>
    </section>
  );
}

export function ProductsSection() {
  const [products] = useProducts();
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<Product | null>(null);
  const list = useMemo(() => products.filter((p) => p.visible && (cat === "All" || p.category === cat) && (`${p.name} ${p.category}`.toLowerCase().includes(q.trim().toLowerCase()))), [products, cat, q]);
  return (
    <section id="products" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Pharmaceutical Products" title="Product Portfolio" text="Browse our portfolio by category. All entries below are illustrative demo items and must be verified before being treated as actual company offerings." />
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {["All", ...PRODUCT_CATEGORIES].map((c) => (
              <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${cat === c ? "border-primary bg-primary text-primary-foreground" : "bg-surface text-primary hover:border-secondary"}`}>{c}</button>
            ))}
          </div>
          <label className="relative block lg:w-72">
            <span className="sr-only">Search products</span>
            <Icon.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" width={18} height={18} />
            <input className="field !pl-10" placeholder="Search products or categories" value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
        </div>
        {list.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed bg-surface py-16 text-center">
            <Icon.Search className="mx-auto text-muted-foreground" width={32} height={32} />
            <p className="mt-3 font-semibold text-primary">No products match your search</p>
            <p className="mt-1 text-sm text-muted-foreground">Try a different keyword or category.</p>
            <button className="btn btn-outline mt-5" onClick={() => { setQ(""); setCat("All"); }}>Clear filters</button>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((p) => (
              <article key={p.id} className="card-lift flex flex-col overflow-hidden rounded-xl border bg-surface">
                <div className="relative"><SmartImage src={p.image} alt={p.name} className="aspect-square w-full" /><span className="absolute left-3 top-3"><Badge tone="blue">{p.status}</Badge></span></div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-medium text-secondary">{p.category}</p>
                  <h3 className="mt-1 font-semibold text-primary">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                  <div className="mt-4 flex items-center justify-between"><Badge tone="muted">{p.availability}</Badge><button onClick={() => setSel(p)} className="text-sm font-semibold text-secondary hover:underline">View Details</button></div>
                </div>
              </article>
            ))}
          </div>
        )}
        <p className="mt-8 flex gap-2 rounded-lg bg-muted p-4 text-xs leading-relaxed text-muted-foreground"><Icon.Info className="shrink-0" width={16} height={16} />Disclaimer: Displayed product entries are illustrative and must be verified before being treated as actual company offerings. No medical, therapeutic, or regulatory claims are made. Prescription medicines should only be used under the guidance of a qualified medical practitioner.</p>
      </div>
      <Modal open={!!sel} onClose={() => setSel(null)} title={sel?.name ?? ""}>
        {sel && <>
          <SmartImage src={sel.image} alt={sel.name} className="aspect-video w-full rounded-lg" />
          <div className="mt-4 flex flex-wrap gap-2"><Badge>{sel.category}</Badge><Badge tone="blue">{sel.status}</Badge><Badge tone="muted">{sel.availability}</Badge></div>
          <p className="mt-4 leading-relaxed text-foreground">{sel.description}</p>
          <p className="mt-4 text-xs text-muted-foreground">This is an illustrative entry. Please contact the company to verify availability and details.</p>
          <a href="#contact" onClick={() => setSel(null)} className="btn btn-teal mt-6">Enquire about this product</a>
        </>}
      </Modal>
    </section>
  );
}

export function HospitalSection() {
  const [acts] = useActivities();
  const list = acts.filter((a) => a.visible);
  return (
    <section id="hospital" className="bg-primary py-20 text-primary-foreground md:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow !text-accent">Hospital Activities</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Supporting Healthcare Institutions</h2>
          <p className="mt-4 leading-relaxed text-primary-foreground/75">Illustrative categories of hospital-related business activities. ASKA Healthcare does not operate a hospital, employ doctors, or provide emergency or clinical treatment.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-6">
          {list.map((a, i) => (
            <article key={a.id} className={`group relative overflow-hidden rounded-xl ${i < 2 ? "md:col-span-3" : "md:col-span-2"}`}>
              <SmartImage src={a.image} alt={a.title} className={`w-full transition-transform duration-700 group-hover:scale-105 ${i < 2 ? "aspect-[16/9]" : "aspect-[4/3]"}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
              <div className="absolute bottom-0 p-5"><h3 className="text-lg font-semibold">{a.title}</h3><p className="mt-1 text-sm text-primary-foreground/80">{a.description}</p></div>
            </article>
          ))}
        </div>
        <a href="#contact" className="btn btn-teal mt-10">Discuss a Healthcare Requirement<Icon.Arrow width={16} height={16} /></a>
      </div>
    </section>
  );
}

const VALUE_ICONS = [Icon.Heart, Icon.Shield, Icon.Star, Icon.Chat, Icon.Users, Icon.Link];
export function WhySection() {
  const [values] = useValues();
  return (
    <section id="why" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeading center eyebrow="Why ASKA Healthcare" title="Values That Guide Our Work" text="The principles we intend to bring to every healthcare engagement." />
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => { const I = VALUE_ICONS[i % VALUE_ICONS.length]!; return (
            <div key={v.id} className="bg-surface p-8 transition-colors hover:bg-accent/40">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-secondary"><I /></span>
              <h3 className="mt-5 text-lg font-semibold text-primary">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
            </div>); })}
        </div>
      </div>
    </section>
  );
}

export function ApproachSection() {
  const [steps] = useSteps();
  return (
    <section id="approach" className="bg-accent/50 py-20 md:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Our Approach" title="How We Handle Every Enquiry" />
        <ol className="relative mt-14 grid gap-8 lg:grid-flow-col lg:auto-cols-fr lg:gap-6">
          <span className="absolute left-5 top-0 h-full w-px bg-secondary/30 lg:left-0 lg:top-5 lg:h-px lg:w-full" aria-hidden />
          {steps.map((s, i) => (
            <li key={s.id} className="relative flex gap-5 lg:block">
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground ring-4 ring-background">{i + 1}</span>
              <div className="lg:mt-6"><h3 className="font-semibold text-primary">{s.title}</h3><p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.description}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function GallerySection() {
  const [gallery] = useGallery();
  const [sel, setSel] = useState<GalleryItem | null>(null);
  const list = gallery.filter((g) => g.visible);
  return (
    <section id="gallery" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Gallery" title="Healthcare in Focus" text="Representative imagery of healthcare environments. People shown are not ASKA Healthcare personnel." />
        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-4">
          {list.map((g, i) => (
            <button key={g.id} onClick={() => setSel(g)} className="group relative mb-4 block w-full overflow-hidden rounded-lg break-inside-avoid" aria-label={`Preview: ${g.caption}`}>
              <SmartImage src={g.image} alt={g.caption} className={`w-full transition-transform duration-500 group-hover:scale-105 ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`} />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 to-transparent p-3 text-left text-sm text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">{g.caption}</span>
            </button>
          ))}
        </div>
      </div>
      <Modal wide open={!!sel} onClose={() => setSel(null)} title={sel?.caption ?? ""}>
        {sel && <SmartImage src={sel.image.replace(/w=\d+/, "w=1600")} alt={sel.caption} className="max-h-[70vh] w-full rounded-lg !object-contain" />}
      </Modal>
    </section>
  );
}

export function ContactSection() {
  const [c] = useContact();
  return (
    <section id="contact" className="bg-accent/50 py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeading eyebrow="Contact Us" title="Let's Discuss Your Requirement" text="Reach out for general, product, service, or collaboration enquiries." />
          <div className="mt-8 space-y-5 rounded-xl bg-primary p-7 text-primary-foreground">
            <p className="font-display text-lg font-semibold">{c.companyName}</p>
            <p className="flex gap-3 text-sm text-primary-foreground/80"><Icon.Pin className="shrink-0" />{c.address}</p>
            <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="flex gap-3 text-sm hover:text-accent"><Icon.Phone />{c.phone}</a>
            <a href={`mailto:${c.email}`} className="flex gap-3 text-sm hover:text-accent"><Icon.Mail />{c.email}</a>
          </div>
        </div>
        <div className="rounded-xl border bg-surface p-6 shadow-soft md:p-8">
          <h3 className="mb-6 text-xl font-semibold text-primary">Send an Enquiry</h3>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
