import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Badge, Icon, Modal } from "@/components/ui-kit";
import { ConfirmDialog, PageHeader, Panel, useToast } from "@/components/admin/AdminKit";
import { ENQUIRY_TYPES, useEnquiries, type Enquiry } from "@/data/content";

export const Route = createFileRoute("/admin/enquiries")({ component: Page });

const STATUSES: Enquiry["status"][] = ["New", "In Progress", "Resolved"];
const tone = { New: "blue", "In Progress": "warn", Resolved: "ok" } as const;

function Page() {
  const [items, setItems] = useEnquiries();
  const toast = useToast();
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [view, setView] = useState<Enquiry | null>(null);
  const [del, setDel] = useState<Enquiry | null>(null);
  const shown = useMemo(() => items.filter((e) => (!type || e.type === type) && `${e.name} ${e.email} ${e.subject}`.toLowerCase().includes(q.toLowerCase())), [items, q, type]);
  const setStatus = (id: string, status: Enquiry["status"]) => { setItems(items.map((e) => (e.id === id ? { ...e, status } : e))); setView((v) => (v && v.id === id ? { ...v, status } : v)); toast(`Marked as ${status}.`); };

  return (
    <div>
      <PageHeader title="Enquiries" text="Demo submissions saved in this browser from the website contact form." />
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input className="field sm:max-w-xs" placeholder="Search name, email, subject" aria-label="Search enquiries" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="field sm:max-w-xs" aria-label="Filter by type" value={type} onChange={(e) => setType(e.target.value)}><option value="">All types</option>{ENQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}</select>
      </div>
      <Panel className="!p-0">
        {shown.length === 0 ? <div className="py-14 text-center text-sm text-muted-foreground"><Icon.Inbox className="mx-auto mb-2" width={28} height={28} />{items.length ? "No enquiries match your filters." : "No enquiries yet."}</div> : (
          <ul className="divide-y">{shown.map((e) => (
            <li key={e.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1"><p className="truncate font-medium">{e.subject}</p><p className="truncate text-xs text-muted-foreground">{e.name} · {e.email} · {e.type} · {new Date(e.createdAt).toLocaleString()}</p></div>
              <Badge tone={tone[e.status]}>{e.status}</Badge>
              <select className="field !w-36 !py-1.5 text-xs" aria-label="Status" value={e.status} onChange={(ev) => setStatus(e.id, ev.target.value as Enquiry["status"])}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
              <button className="btn btn-outline !px-3 !py-1.5 text-xs" onClick={() => setView(e)}>View</button>
              <button className="rounded-md p-2 text-destructive hover:bg-destructive/10" aria-label="Delete enquiry" onClick={() => setDel(e)}><Icon.Trash width={18} height={18} /></button>
            </li>))}</ul>
        )}
      </Panel>
      <Modal open={!!view} onClose={() => setView(null)} title={view?.subject ?? ""}>
        {view && <dl className="space-y-3 text-sm">
          {([["Name", view.name], ["Email", view.email], ["Phone", view.phone || "—"], ["Type", view.type], ["Received", new Date(view.createdAt).toLocaleString()], ["Status", view.status]] as const).map(([k, v]) => <div key={k} className="flex gap-4"><dt className="w-24 shrink-0 text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>)}
          <div><dt className="text-muted-foreground">Message</dt><dd className="mt-1 whitespace-pre-wrap rounded-md bg-muted p-3">{view.message}</dd></div>
        </dl>}
      </Modal>
      <ConfirmDialog open={!!del} onClose={() => setDel(null)} title="Delete enquiry?" message="This enquiry will be permanently removed." onConfirm={() => { if (del) { setItems(items.filter((x) => x.id !== del.id)); toast("Enquiry deleted."); } }} />
    </div>
  );
}
