import { createFileRoute } from "@tanstack/react-router";
import { CollectionManager } from "@/components/admin/AdminKit";
import { useServices } from "@/data/content";

export const Route = createFileRoute("/admin/services")({ component: Page });

function Page() {
  const [items, setItems] = useServices();
  return (
    <CollectionManager title="Services" singular="Service" text="Healthcare service cards shown on the website." items={items} setItems={setItems} idPrefix="svc"
      primary="title" secondary="category" imageKey="image" searchKeys={["title", "category"]}
      makeNew={() => ({ title: "", category: "", description: "", details: "", image: "", visible: true })}
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "category", label: "Category", type: "text", required: true },
        { key: "description", label: "Short description", type: "textarea", required: true },
        { key: "details", label: "Detail text (Learn More)", type: "textarea" },
        { key: "image", label: "Image URL", type: "image" },
        { key: "visible", label: "Visible on website", type: "checkbox" },
      ]} />
  );
}
