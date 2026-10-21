import { createFileRoute } from "@tanstack/react-router";
import { CollectionManager } from "@/components/admin/AdminKit";
import { useActivities } from "@/data/content";

export const Route = createFileRoute("/admin/hospital-activities")({ component: Page });

function Page() {
  const [items, setItems] = useActivities();
  return (
    <CollectionManager title="Hospital Activities" singular="Activity" items={items} setItems={setItems} idPrefix="act"
      primary="title" secondary="description" imageKey="image" searchKeys={["title"]}
      makeNew={() => ({ title: "", description: "", image: "", visible: true })}
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "description", label: "Description", type: "textarea", required: true },
        { key: "image", label: "Image URL", type: "image" },
        { key: "visible", label: "Visible on website", type: "checkbox" },
      ]} />
  );
}
