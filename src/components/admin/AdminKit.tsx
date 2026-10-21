import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { Badge, Icon, Modal, SmartImage } from "@/components/ui-kit";
import { uid } from "@/lib/store";

/* ---------- Toast ---------- */
type Toast = { id: number; msg: string; tone: "ok" | "err" };
const ToastCtx = createContext<(msg: string, tone?: "ok" | "err") => void>(() => {});
export const useToast = () => useContext(ToastCtx);
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((msg: string, tone: "ok" | "err" = "ok") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2" aria-live="polite">
        {toasts.map((t) => <div key={t.id} className={`rounded-lg px-4 py-3 text-sm font-medium shadow-lift animate-in slide-in-from-bottom-2 ${t.tone === "ok" ? "bg-primary text-primary-foreground" : "bg-destructive text-destructive-foreground"}`}>{t.msg}</div>)}
      </div>
    </ToastCtx.Provider>
  );
}

/* ---------- Confirm ---------- */
export function ConfirmDialog({ open, title, message, confirmLabel = "Delete", onConfirm, onClose }: { open: boolean; title: string; message: string; confirmLabel?: string; onConfirm: () => void; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-sm text-muted-foreground">{message}</p>
      <div className="mt-6 flex justify-end gap-2">
        <button className="btn btn-outline" onClick={onClose}>Cancel</button>
        <button className="btn btn-danger" onClick={() => { onConfirm(); onClose(); }}>{confirmLabel}</button>
      </div>
    </Modal>
  );
}

export function PageHeader({ title, text, action }: { title: string; text?: string | undefined; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div><h1 className="text-2xl font-semibold text-primary">{title}</h1>{text && <p className="mt-1 text-sm text-muted-foreground">{text}</p>}</div>
      {action}
    </div>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border bg-surface p-5 md:p-6 ${className}`}>{children}</div>;
}

/* ---------- Generic field ---------- */
export type FieldDef = { key: string; label: string; type: "text" | "textarea" | "select" | "image" | "checkbox"; options?: string[]; required?: boolean; help?: string };

export function FormField({ def, value, onChange, error }: { def: FieldDef; value: unknown; onChange: (v: unknown) => void; error?: string | undefined }) {
  const id = `fld-${def.key}`;
  if (def.type === "checkbox")
    return <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" className="h-4 w-4 accent-secondary" checked={!!value} onChange={(e) => onChange(e.target.checked)} />{def.label}</label>;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">{def.label}{def.required && <span className="text-destructive"> *</span>}</label>
      {def.type === "textarea" ? <textarea id={id} rows={4} className="field" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />
        : def.type === "select" ? <select id={id} className="field" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}><option value="">Select…</option>{def.options?.map((o) => <option key={o}>{o}</option>)}</select>
        : <input id={id} className="field" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} placeholder={def.type === "image" ? "https://… or upload below" : ""} />}
      {def.type === "image" && <ImageUpload onLoad={onChange} preview={String(value ?? "")} />}
      {def.help && <p className="mt-1 text-xs text-muted-foreground">{def.help}</p>}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function ImageUpload({ onLoad, preview }: { onLoad: (v: string) => void; preview: string }) {
  const [err, setErr] = useState("");
  return (
    <div className="mt-2 flex items-center gap-3">
      {preview && <SmartImage src={preview} alt="Preview" className="h-14 w-20 rounded" />}
      <label className="btn btn-outline !py-1.5 text-xs">Upload image
        <input type="file" accept="image/*" className="sr-only" onChange={(e) => {
          const f = e.target.files?.[0]; if (!f) return;
          if (f.size > 700_000) { setErr("Please choose an image under 700 KB (browser storage is limited)."); return; }
          setErr(""); const r = new FileReader(); r.onload = () => onLoad(String(r.result)); r.readAsDataURL(f);
        }} />
      </label>
      {err && <span className="text-xs text-destructive">{err}</span>}
    </div>
  );
}

/* ---------- Generic collection manager ---------- */
type Rec = { id: string; visible?: boolean };
export function CollectionManager<T extends Rec>({ title, text, singular, items, setItems, fields, makeNew, idPrefix, primary, secondary, imageKey, searchKeys, filter }: {
  title: string; text?: string; singular: string; items: T[]; setItems: (v: T[]) => void; fields: FieldDef[]; makeNew: () => Omit<T, "id">; idPrefix: string;
  primary: keyof T; secondary?: keyof T; imageKey?: keyof T; searchKeys?: (keyof T)[]; filter?: { key: keyof T; options: string[] };
}) {
  const toast = useToast();
  const [editing, setEditing] = useState<T | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [del, setDel] = useState<T | null>(null);
  const [q, setQ] = useState("");
  const [f, setF] = useState("");

  const shown = useMemo(() => items.filter((it) => (!f || filter && it[filter.key] === f) && (!q || (searchKeys ?? [primary]).some((k) => String(it[k] ?? "").toLowerCase().includes(q.toLowerCase())))), [items, q, f, filter, searchKeys, primary]);

  const openNew = () => { setIsNew(true); setErrors({}); setEditing({ id: "", ...makeNew() } as T); };
  const save = () => {
    if (!editing) return;
    const errs: Record<string, string> = {};
    fields.forEach((d) => { if (d.required && !String((editing as unknown as Record<string, unknown>)[d.key] ?? "").trim()) errs[d.key] = `${d.label} is required.`; });
    setErrors(errs);
    if (Object.keys(errs).length) { toast("Please fix the highlighted fields.", "err"); return; }
    if (isNew) setItems([...items, { ...editing, id: uid(idPrefix) }]);
    else setItems(items.map((i) => (i.id === editing.id ? editing : i)));
    toast(`${singular} ${isNew ? "added" : "updated"}.`);
    setEditing(null);
  };

  return (
    <div>
      <PageHeader title={title} text={text} action={<button className="btn btn-teal" onClick={openNew}><Icon.Plus width={16} height={16} />Add {singular}</button>} />
      {(searchKeys || filter) && (
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          {searchKeys && <input className="field sm:max-w-xs" placeholder="Search…" aria-label={`Search ${title}`} value={q} onChange={(e) => setQ(e.target.value)} />}
          {filter && <select className="field sm:max-w-xs" aria-label="Filter" value={f} onChange={(e) => setF(e.target.value)}><option value="">All categories</option>{filter.options.map((o) => <option key={o}>{o}</option>)}</select>}
        </div>
      )}
      <Panel className="!p-0">
        {shown.length === 0 ? (
          <div className="py-14 text-center text-sm text-muted-foreground"><Icon.Inbox className="mx-auto mb-2" width={28} height={28} />{items.length ? "No entries match your search." : `No ${title.toLowerCase()} yet. Add your first one.`}</div>
        ) : (
          <ul className="divide-y">
            {shown.map((it) => (
              <li key={it.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                {imageKey && <SmartImage src={String(it[imageKey] ?? "")} alt="" className="h-14 w-20 shrink-0 rounded" />}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-foreground">{String(it[primary] ?? "")}</p>
                  {secondary && <p className="truncate text-xs text-muted-foreground">{String(it[secondary] ?? "")}</p>}
                </div>
                <div className="flex items-center gap-2">
                  {"visible" in it && (
                    <button onClick={() => { setItems(items.map((x) => x.id === it.id ? { ...x, visible: !x.visible } : x)); toast(it.visible ? "Hidden from website." : "Now visible on website."); }}
                      className="rounded-md border px-2.5 py-1 text-xs font-medium hover:bg-muted" aria-label={it.visible ? "Hide" : "Show"}>
                      {it.visible ? <Badge tone="ok">Visible</Badge> : <Badge tone="muted">Hidden</Badge>}
                    </button>
                  )}
                  <button className="rounded-md p-2 text-primary hover:bg-muted" aria-label={`Edit ${String(it[primary])}`} onClick={() => { setIsNew(false); setErrors({}); setEditing({ ...it }); }}><Icon.Edit width={18} height={18} /></button>
                  <button className="rounded-md p-2 text-destructive hover:bg-destructive/10" aria-label={`Delete ${String(it[primary])}`} onClick={() => setDel(it)}><Icon.Trash width={18} height={18} /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
      <Modal open={!!editing} onClose={() => setEditing(null)} title={`${isNew ? "Add" : "Edit"} ${singular}`}>
        {editing && (
          <form onSubmit={(e) => { e.preventDefault(); save(); }} className="space-y-4">
            {fields.map((d) => <FormField key={d.key} def={d} value={(editing as unknown as Record<string, unknown>)[d.key]} error={errors[d.key]} onChange={(v) => setEditing({ ...editing, [d.key]: v })} />)}
            <div className="flex justify-end gap-2 pt-2"><button type="button" className="btn btn-outline" onClick={() => setEditing(null)}>Cancel</button><button type="submit" className="btn btn-teal">Save</button></div>
          </form>
        )}
      </Modal>
      <ConfirmDialog open={!!del} onClose={() => setDel(null)} title={`Delete ${singular}?`} message={`“${String(del?.[primary] ?? "")}” will be permanently removed from the demo data.`}
        onConfirm={() => { if (del) { setItems(items.filter((i) => i.id !== del.id)); toast(`${singular} deleted.`); } }} />
    </div>
  );
}
