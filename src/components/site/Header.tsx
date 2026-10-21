import { useEffect, useState } from "react";
import { Emblem, Icon } from "@/components/ui-kit";
import { useSite, type SectionKey } from "@/data/content";

const NAV: { id: string; label: string; key?: SectionKey }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us", key: "about" },
  { id: "services", label: "Healthcare Services", key: "services" },
  { id: "products", label: "Pharmaceutical Products", key: "products" },
  { id: "hospital", label: "Hospital Activities", key: "hospital" },
  { id: "approach", label: "Our Approach", key: "approach" },
  { id: "contact", label: "Contact Us", key: "contact" },
];

export function Header() {
  const [site] = useSite();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const items = NAV.filter((n) => !n.key || site.sections[n.key]);

  useEffect(() => {
    const els = items.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const link = (id: string) => `rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors ${active === id ? "text-secondary" : "text-primary hover:text-secondary"}`;

  return (
    <header className="sticky top-0 z-50 border-b bg-surface/95 backdrop-blur">
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-3" aria-label="ASKA Healthcare home">
          <Emblem />
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold tracking-wide text-primary">ASKA HEALTHCARE</span>
            <span className="hidden text-[11px] text-muted-foreground sm:block">{site.tagline}</span>
          </span>
        </a>
        <nav className="hidden items-center xl:flex" aria-label="Main">
          {items.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={link(n.id)} aria-current={active === n.id ? "true" : undefined}>{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#contact" className="btn btn-teal hidden sm:inline-flex">Get in Touch</a>
          <button className="rounded-md p-2 text-primary xl:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <Icon.Close /> : <Icon.Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="border-t bg-surface xl:hidden" aria-label="Mobile">
          <div className="container-x flex flex-col py-3">
            {items.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className={`${link(n.id)} border-b border-border/60 py-3 last:border-0`}>{n.label}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn-teal mt-3">Get in Touch</a>
          </div>
        </nav>
      )}
    </header>
  );
}
