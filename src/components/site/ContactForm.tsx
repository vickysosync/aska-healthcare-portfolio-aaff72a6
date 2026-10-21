import { useState } from "react";
import { ENQUIRY_TYPES, useEnquiries, type Enquiry } from "@/data/content";
import { uid } from "@/lib/store";
import { validateEnquiry, type EnquiryInput, type Errors } from "@/lib/validation";

const empty: EnquiryInput = { name: "", email: "", phone: "", type: "", subject: "", message: "" };

export function ContactForm({ defaultType = "" }: { defaultType?: string }) {
  const [, setEnquiries] = useEnquiries();
  const [v, setV] = useState<EnquiryInput>({ ...empty, type: defaultType });
  const [errors, setErrors] = useState<Errors<EnquiryInput>>({});
  const [done, setDone] = useState(false);

  const set = (k: keyof EnquiryInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setV({ ...v, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateEnquiry(v);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const entry: Enquiry = { id: uid("enq"), ...Object.fromEntries(Object.entries(v).map(([k, x]) => [k, x.trim()])) as unknown as EnquiryInput, status: "New", createdAt: new Date().toISOString() };
    setEnquiries((p) => [entry, ...p]);
    setV({ ...empty, type: defaultType });
    setDone(true);
  };

  if (done)
    return (
      <div className="rounded-lg border border-secondary/30 bg-accent p-6" role="status">
        <h3 className="text-lg font-semibold text-primary">Thank you — your enquiry has been recorded.</h3>
        <p className="mt-2 text-sm text-muted-foreground">This is a demo form: your enquiry is saved in this browser only and has not been sent to the company inbox. For a real response, please use the email or phone details provided.</p>
        <button className="btn btn-outline mt-4" onClick={() => setDone(false)}>Submit another enquiry</button>
      </div>
    );

  const F = ({ id, label, req, children }: { id: keyof EnquiryInput; label: string; req?: boolean; children: React.ReactNode }) => (
    <div>
      <label htmlFor={`f-${id}`} className="mb-1.5 block text-sm font-medium text-foreground">{label}{req && <span className="text-destructive"> *</span>}</label>
      {children}
      {errors[id] && <p id={`e-${id}`} className="mt-1 text-xs text-destructive">{errors[id]}</p>}
    </div>
  );
  const aria = (id: keyof EnquiryInput) => ({ id: `f-${id}`, "aria-invalid": !!errors[id], "aria-describedby": errors[id] ? `e-${id}` : undefined });

  return (
    <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
      {F({ id: "name", label: "Full Name", req: true, children: <input className="field" value={v.name} onChange={set("name")} maxLength={100} {...aria("name")} /> })}
      {F({ id: "email", label: "Email Address", req: true, children: <input type="email" className="field" value={v.email} onChange={set("email")} maxLength={255} {...aria("email")} /> })}
      {F({ id: "phone", label: "Phone Number", children: <input type="tel" className="field" value={v.phone} onChange={set("phone")} maxLength={20} {...aria("phone")} /> })}
      {F({ id: "type", label: "Enquiry Type", req: true, children: (
        <select className="field" value={v.type} onChange={set("type")} {...aria("type")}>
          <option value="">Select a type</option>
          {ENQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>) })}
      <div className="sm:col-span-2">{F({ id: "subject", label: "Subject", req: true, children: <input className="field" value={v.subject} onChange={set("subject")} maxLength={150} {...aria("subject")} /> })}</div>
      <div className="sm:col-span-2">{F({ id: "message", label: "Message", req: true, children: <textarea rows={5} className="field" value={v.message} onChange={set("message")} maxLength={2000} {...aria("message")} /> })}</div>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">Demo form: submissions are stored in this browser and are not sent to a real inbox.</p>
        <button type="submit" className="btn btn-teal">Submit Enquiry</button>
      </div>
    </form>
  );
}
