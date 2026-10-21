import { createFileRoute } from "@tanstack/react-router";
import { CollectionManager } from "@/components/admin/AdminKit";
import { useTeam } from "@/data/content";

export const Route = createFileRoute("/admin/team")({ component: Page });

function Page() {
  const [items, setItems] = useTeam();
  return (
    <CollectionManager title="Leadership" singular="Profile" text="Display names and role labels only — please do not add unverified qualifications." items={items} setItems={setItems} idPrefix="team"
      primary="name" secondary="role" imageKey="image"
      makeNew={() => ({ name: "", role: "Director", image: "", visible: true })}
      fields={[
        { key: "name", label: "Display name", type: "text", required: true },
        { key: "role", label: "Role label", type: "text", required: true },
        { key: "image", label: "Profile image (optional)", type: "image" },
        { key: "visible", label: "Visible on website", type: "checkbox" },
      ]} />
  );
}
