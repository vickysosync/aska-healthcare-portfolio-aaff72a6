import { createFileRoute } from "@tanstack/react-router";
import { CollectionManager } from "@/components/admin/AdminKit";
import { PRODUCT_CATEGORIES, useProducts } from "@/data/content";

export const Route = createFileRoute("/admin/products")({ component: Page });

function Page() {
  const [items, setItems] = useProducts();
  return (
    <CollectionManager title="Products" singular="Product" text="Illustrative pharmaceutical portfolio entries." items={items} setItems={setItems} idPrefix="prd"
      primary="name" secondary="category" imageKey="image" searchKeys={["name", "category"]} filter={{ key: "category", options: PRODUCT_CATEGORIES }}
      makeNew={() => ({ name: "", category: "", description: "", image: "", status: "Illustrative Demo Product", availability: "On Enquiry", visible: true })}
      fields={[
        { key: "name", label: "Product name", type: "text", required: true },
        { key: "category", label: "Category", type: "select", options: PRODUCT_CATEGORIES, required: true },
        { key: "description", label: "Description", type: "textarea", required: true, help: "Avoid composition, dosage, or therapeutic claims unless verified." },
        { key: "image", label: "Image URL", type: "image" },
        { key: "status", label: "Demo status", type: "select", options: ["Illustrative Demo Product", "Sample Portfolio Item", "Verified Offering"], required: true },
        { key: "availability", label: "Availability label", type: "select", options: ["On Enquiry", "To Be Confirmed", "Available", "Unavailable"] },
        { key: "visible", label: "Visible on website", type: "checkbox" },
      ]} />
  );
}
