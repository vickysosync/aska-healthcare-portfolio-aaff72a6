import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Emblem, Icon } from "@/components/ui-kit";
import { ToastProvider } from "@/components/admin/AdminKit";
import { useSession } from "@/data/content";
import { useHydrated } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [
    { title: "Admin | ASKA Healthcare" },
    { name: "description", content: "ASKA Healthcare website content management (demo)." },
    { property: "og:title", content: "Admin | ASKA Healthcare" },
    { property: "og:description", content: "ASKA Healthcare website content management (demo)." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex" },
  ] }),
  component: AdminLayout,
});

const NAV = [
  { to: "/admin/dashboard", label: "Dashboard", I: Icon.Grid },
  { to: "/admin/services", label: "Services", I: Icon.Heart },
  { to: "/admin/products", label: "Products", I: Icon.Box },
  { to: "/admin/hospital-activities", label: "Hospital Activities", I: Icon.Building },
  { to: "/admin/gallery", label: "Gallery", I: Icon.Image },
  { to: "/admin/about", label: "About Us", I: Icon.Info },
  { to: "/admin/team", label: "Leadership", I: Icon.Users },
  { to: "/admin/enquiries", label: "Enquiries", I: Icon.Inbox },
  { to: "/admin/contact-settings", label: "Contact Settings", I: Icon.Phone },
  { to: "/admin/site-settings", label: "Site Settings", I: Icon.Settings },
] as const;

function AdminLayout() {
  const hydrated = useHydrated();
  const [session, setSession] = useSession();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  useEffect(() => { if (hydrated && !session) nav({ to: "/admin/login", replace: true }); }, [hydrated, session, nav]);
  if (!hydrated || !session) return <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Checking access…</div>;

  return (
    <ToastProvider>
      <div className="min-h-screen bg-background lg:pl-64">
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-primary text-primary-foreground transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex h-16 items-center gap-3 border-b border-primary-foreground/10 px-5"><Emblem className="h-8 w-8" /><span className="font-display font-semibold">ASKA Admin</span></div>
          <nav className="space-y-0.5 p-3" aria-label="Admin">
            {NAV.map(({ to, label, I }) => (
              <Link key={to} to={to} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-primary-foreground/75 hover:bg-primary-foreground/10 hover:text-primary-foreground" activeProps={{ className: "!bg-secondary !text-secondary-foreground" }}>
                <I width={18} height={18} />{label}
              </Link>
            ))}
          </nav>
          <div className="absolute inset-x-0 bottom-0 border-t border-primary-foreground/10 p-3">
            <Link to="/" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-primary-foreground/75 hover:bg-primary-foreground/10">↗ View website</Link>
          </div>
        </aside>
        {open && <div className="fixed inset-0 z-30 bg-foreground/40 lg:hidden" onClick={() => setOpen(false)} />}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-surface px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button className="rounded-md p-2 text-primary lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle sidebar"><Icon.Menu /></button>
            <span className="hidden text-sm font-semibold text-primary sm:block">ASKA HEALTHCARE PRIVATE LIMITED</span>
            <span className="rounded bg-warning/15 px-2 py-0.5 text-[10px] font-semibold uppercase">Demo</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block"><p className="text-sm font-medium">Administrator</p><p className="text-xs text-muted-foreground">{session.email}</p></div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-primary">A</span>
            <button className="btn btn-outline !px-3 !py-2" onClick={() => { setSession(null); nav({ to: "/admin/login" }); }}><Icon.Logout width={16} height={16} /><span className="hidden sm:inline">Logout</span></button>
          </div>
        </header>
        <main className="p-4 md:p-8"><Outlet /></main>
      </div>
    </ToastProvider>
  );
}
