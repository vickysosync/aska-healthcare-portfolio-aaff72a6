import { createFileRoute } from "@tanstack/react-router";
import { CollectionManager, PageHeader } from "@/components/admin/AdminKit";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { useAbout, useSteps, useValues } from "@/data/content";

export const Route = createFileRoute("/admin/about")({ component: Page });

function Page() {
  const [about, setAbout] = useAbout();
  const [values, setValues] = useValues();
  const [steps, setSteps] = useSteps();
  return (
    <div className="space-y-10">
      <div>
        <PageHeader title="About Us" text="Company introduction, mission, vision, values and workflow." />
        <SettingsForm title="Company introduction" value={about as unknown as Record<string, unknown>} onSave={(v) => setAbout(v as unknown as typeof about)} fields={[
          { key: "heading", label: "Section heading", type: "text", required: true },
          { key: "intro", label: "Company overview", type: "textarea", required: true },
          { key: "focus", label: "Healthcare & pharmaceutical focus", type: "textarea" },
          { key: "commitment", label: "Commitment statement", type: "textarea" },
          { key: "mission", label: "Mission", type: "textarea", required: true },
          { key: "vision", label: "Vision", type: "textarea", required: true },
        ]} />
      </div>
      <CollectionManager title="Company Values" singular="Value" items={values} setItems={setValues} idPrefix="val" primary="title" secondary="description"
        makeNew={() => ({ title: "", description: "" })}
        fields={[{ key: "title", label: "Title", type: "text", required: true }, { key: "description", label: "Description", type: "textarea", required: true }]} />
      <CollectionManager title="Approach Steps" singular="Step" text="Shown in order in the Our Approach section." items={steps} setItems={setSteps} idPrefix="stp" primary="title" secondary="description"
        makeNew={() => ({ title: "", description: "" })}
        fields={[{ key: "title", label: "Title", type: "text", required: true }, { key: "description", label: "Description", type: "textarea", required: true }]} />
    </div>
  );
}
