import { useEffect, useState } from "react";
import { FormField, Panel, useToast, type FieldDef } from "@/components/admin/AdminKit";

/** Edits a single settings object; saves only on submit. */
export function SettingsForm<T extends Record<string, unknown>>({ title, value, onSave, fields }: { title: string; value: T; onSave: (v: T) => void; fields: FieldDef[] }) {
  const toast = useToast();
  const [draft, setDraft] = useState<T>(value);
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => setDraft(value), [value]);
  return (
    <Panel>
      <h2 className="mb-4 font-semibold text-primary">{title}</h2>
      <form className="space-y-4" onSubmit={(e) => {
        e.preventDefault();
        const errs: Record<string, string> = {};
        fields.forEach((d) => { if (d.required && !String(draft[d.key] ?? "").trim()) errs[d.key] = `${d.label} is required.`; });
        setErrors(errs);
        if (Object.keys(errs).length) return toast("Please fill in the required fields.", "err");
        onSave(draft); toast("Changes saved.");
      }}>
        {fields.map((d) => <FormField key={d.key} def={d} value={draft[d.key]} error={errors[d.key]} onChange={(v) => setDraft({ ...draft, [d.key]: v })} />)}
        <div className="flex justify-end gap-2"><button type="button" className="btn btn-outline" onClick={() => setDraft(value)}>Discard</button><button className="btn btn-teal">Save changes</button></div>
      </form>
    </Panel>
  );
}
