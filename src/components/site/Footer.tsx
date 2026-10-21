import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Emblem, Icon } from "@/components/ui-kit";
import { useContact, useSite } from "@/data/content";

export function Footer() {
  const [contact] = useContact();
  const [site] = useSite();
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  const h = "mb-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground";
  const a = "text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground";
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3"><Emblem /><span className="font-display text-lg font-semibold">ASKA HEALTHCARE</span></div>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">ASKA Healthcare Private Limited works across human healthcare activities, pharmaceutical products, and hospital-related activities from Mumbai, India.</p>
        </div>
        <div>
          <h3 className={h}>Quick Links</h3>
          <ul className="space-y-2.5">
            {[["home", "Home"], ["about", "About Us"], ["approach", "Our Approach"], ["gallery", "Gallery"], ["contact", "Contact Us"]].map(([id, l]) => <li key={id}><a className={a} href={`#${id}`}>{l}</a></li>)}
          </ul>
        </div>
        <div>
          <h3 className={h}>What We Do</h3>
          <ul className="space-y-2.5">
            <li><a className={a} href="#services">Healthcare Services</a></li>
            <li><a className={a} href="#products">Pharmaceutical Products</a></li>
            <li><a className={a} href="#hospital">Hospital Activities</a></li>
          </ul>
        </div>
        <div>
          <h3 className={h}>Contact</h3>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex gap-2"><Icon.Pin className="mt-0.5 shrink-0" />{contact.address}</li>
            <li><a className={`${a} flex gap-2`} href={`tel:${contact.phone.replace(/\s/g, "")}`}><Icon.Phone />{contact.phone}</a></li>
            <li><a className={`${a} flex gap-2`} href={`mailto:${contact.email}`}><Icon.Mail />{contact.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-primary-foreground/70 md:flex-row">
          <p>© {year} {contact.companyName}. All rights reserved.</p>
          <p className="font-semibold text-primary-foreground">{site.footerCredit || "Designed and development by SOSynch Ai Tech"}</p>
          <Link to="/admin/login" className="inline-flex items-center gap-1.5 rounded-md border border-primary-foreground/30 px-3 py-1.5 font-medium text-primary-foreground hover:bg-primary-foreground/10"><Icon.Shield width={14} height={14} />Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}
