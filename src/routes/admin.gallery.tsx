import { createFileRoute } from "@tanstack/react-router";
import { CollectionManager } from "@/components/admin/AdminKit";
import { useGallery } from "@/data/content";

export const Route = createFileRoute("/admin/gallery")({ component: Page });

function Page() {
  const [items, setItems] = useGallery();
  return (
    <CollectionManager title="Gallery" singular="Image" items={items} setItems={setItems} idPrefix="gal"
      primary="caption" imageKey="image" searchKeys={["caption"]}
      makeNew={() => ({ image: "", caption: "", visible: true })}
      fields={[
        { key: "image", label: "Image URL", type: "image", required: true },
        { key: "caption", label: "Caption / alt text", type: "text", required: true },
        { key: "visible", label: "Visible on website", type: "checkbox" },
      ]} />
  );
}
