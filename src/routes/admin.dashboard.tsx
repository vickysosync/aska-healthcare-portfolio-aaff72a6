import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge, Icon } from "@/components/ui-kit";
import { PageHeader, Panel } from "@/components/admin/AdminKit";
import { useActivities, useEnquiries, useGallery, useProducts, useServices, useTeam } from "@/data/content";

export const Route = createFileRoute("/admin/dashboard")({ component: Dashboard });

function Dashboard() {
  const [services] = useServices(); const [products] = useProducts(); const [acts] = useActivities();
  const [gallery] = useGallery(); const [team] = useTeam(); const [enq] = useEnquiries();
  const vis = <T extends { visible: boolean }>(a: T[]) => a.filter((x) => x.visible).length;
  const stats = [
    { label: "Total Enquiries", value: enq.length, sub: `${enq.filter((e) => e.status === "New").length} new`, to: "/admin/enquiries" as const },
    { label: "Services", value: services.length, sub: `${vis(services)} visible`, to: "/admin/services" as const },
    { label: "Products", value: products.length, sub: `${vis(products)} visible`, to: "/admin/products" as const },
    { label: "Gallery Images", value: gallery.length, sub: `${vis(gallery)} visible`, to: "/admin/gallery" as const },
  ];
  const statusTone = { New: "blue", "In Progress": "warn", Resolved: "ok" } as const;
  return (
    <div>
      <PageHeader title="Dashboard" text="Overview of your website content and enquiries." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} to={s.to} className="card-lift rounded-xl border bg-surface p-5">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-3xl font-semibold text-primary">{s.value}</p>
            <p className="mt-1 text-xs text-secondary">{s.sub}</p>
          </Link>
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Panel>
          <div className="mb-4 flex items-center justify-between"><h2 className="font-semibold text-primary">Recent Enquiries</h2><Link to="/admin/enquiries" className="text-sm text-secondary hover:underline">View all</Link></div>
          {enq.length === 0 ? <div className="py-10 text-center text-sm text-muted-foreground"><Icon.Inbox className="mx-auto mb-2" width={28} height={28} />No enquiries yet. Submissions from the website contact form will appear here.</div> : (
            <ul className="divide-y">{enq.slice(0, 5).map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-3 py-3"><div className="min-w-0"><p className="truncate text-sm font-medium">{e.subject}</p><p className="truncate text-xs text-muted-foreground">{e.name} · {e.type} · {new Date(e.createdAt).toLocaleDateString()}</p></div><Badge tone={statusTone[e.status]}>{e.status}</Badge></li>
            ))}</ul>
          )}
        </Panel>
        <div className="space-y-6">
          <Panel>
            <h2 className="mb-4 font-semibold text-primary">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {([["/admin/products", "Manage products"], ["/admin/services", "Edit services"], ["/admin/gallery", "Update gallery"], ["/admin/site-settings", "Site settings"]] as const).map(([to, l]) => <Link key={to} to={to} className="rounded-md border px-3 py-2.5 font-medium text-primary hover:border-secondary hover:text-secondary">{l}</Link>)}
            </div>
          </Panel>
          <Panel>
            <h2 className="mb-3 font-semibold text-primary">Content Overview</h2>
            <dl className="space-y-2 text-sm">
              {[["Hospital activities", acts.length, vis(acts)], ["Leadership profiles", team.length, vis(team)], ["Resolved enquiries", enq.length, enq.filter((e) => e.status === "Resolved").length]].map(([l, t, v]) => (
                <div key={l as string} className="flex justify-between"><dt className="text-muted-foreground">{l}</dt><dd className="font-medium">{v} / {t}</dd></div>
              ))}
            </dl>
          </Panel>
        </div>
      </div>
    </div>
  );
}
