import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ConfirmDialog, PageHeader, Panel, useToast } from "@/components/admin/AdminKit";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { SECTION_LABELS, useSite, type SectionKey } from "@/data/content";
import { resetAllDemoData } from "@/lib/store";

export const Route = createFileRoute("/admin/site-settings")({ component: Page });

function Page() {
  const [site, setSite] = useSite();
  const toast = useToast();
  const [confirm, setConfirm] = useState(false);
  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Site Settings" text="Hero text, buttons, tagline, footer credit and visible sections." />
      <SettingsForm title="Hero & branding" value={site as unknown as Record<string, unknown>} onSave={(v) => setSite({ ...site, ...(v as unknown as typeof site) })} fields={[
        { key: "tagline", label: "Brand tagline", type: "text" },
        { key: "heroLabel", label: "Hero label", type: "text" },
        { key: "heroHeading", label: "Hero heading", type: "text", required: true },
        { key: "heroText", label: "Hero description", type: "textarea", required: true },
        { key: "ctaPrimary", label: "Primary button label", type: "text", required: true },
        { key: "ctaSecondary", label: "Secondary button label", type: "text", required: true },
        { key: "footerCredit", label: "Footer credit", type: "text", required: true },
      ]} />
      <Panel>
        <h2 className="mb-4 font-semibold text-primary">Visible sections</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {(Object.keys(SECTION_LABELS) as SectionKey[]).map((k) => (
            <label key={k} className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="h-4 w-4 accent-secondary" checked={site.sections[k]} onChange={(e) => { setSite({ ...site, sections: { ...site.sections, [k]: e.target.checked } }); toast("Section visibility updated."); }} />
              {SECTION_LABELS[k]}
            </label>
          ))}
        </div>
      </Panel>
      <Panel>
        <h2 className="font-semibold text-primary">Restore demo content</h2>
        <p className="mt-1 text-sm text-muted-foreground">Replaces all edited content and enquiries with the original demo data.</p>
        <button className="btn btn-danger mt-4" onClick={() => setConfirm(true)}>Reset to demo data</button>
      </Panel>
      <ConfirmDialog open={confirm} onClose={() => setConfirm(false)} title="Reset all demo data?" confirmLabel="Reset" message="All your changes and saved enquiries will be removed. This cannot be undone." onConfirm={() => { resetAllDemoData(); toast("Demo data restored."); }} />
    </div>
  );
}
