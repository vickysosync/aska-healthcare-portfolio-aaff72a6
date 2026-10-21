import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/admin/AdminKit";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { useContact } from "@/data/content";

export const Route = createFileRoute("/admin/contact-settings")({ component: Page });

function Page() {
  const [c, setC] = useContact();
  return (
    <div className="max-w-2xl">
      <PageHeader title="Contact Settings" text="Updates the contact section, footer, and links across the website." />
      <SettingsForm title="Contact details" value={c as unknown as Record<string, unknown>} onSave={(v) => setC(v as unknown as typeof c)} fields={[
        { key: "companyName", label: "Company name", type: "text", required: true },
        { key: "phone", label: "Phone number", type: "text", required: true },
        { key: "email", label: "Email address", type: "text", required: true },
        { key: "address", label: "Address", type: "textarea", required: true },
      ]} />
    </div>
  );
}
