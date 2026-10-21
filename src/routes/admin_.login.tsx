import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Emblem, Icon } from "@/components/ui-kit";
import { checkCredentials, DEMO_ADMIN, useSession } from "@/data/content";
import { isEmail } from "@/lib/validation";
import { isStorageAvailable } from "@/lib/store";

export const Route = createFileRoute("/admin_/login")({
  head: () => ({ meta: [
    { title: "Admin Login | ASKA Healthcare" },
    { name: "description", content: "Demo admin access for the ASKA Healthcare website content manager." },
    { property: "og:title", content: "Admin Login | ASKA Healthcare" },
    { property: "og:description", content: "Demo admin access for the ASKA Healthcare website." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex" },
  ] }),
  component: Login,
});

function Login() {
  const [session, setSession] = useSession();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState<{ email?: string; pw?: string; form?: string }>({});
  const [busy, setBusy] = useState(false);
  const [storageOk, setStorageOk] = useState(true);
  useEffect(() => setStorageOk(isStorageAvailable()), []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: typeof err = {};
    if (!email.trim()) er.email = "Email is required."; else if (!isEmail(email)) er.email = "Enter a valid email address.";
    if (!pw) er.pw = "Password is required.";
    setErr(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      if (!checkCredentials(email, pw)) { setErr({ form: "Invalid email or password. Please try again." }); return; }
      setSession({ email: email.trim().toLowerCase() });
      nav({ to: "/admin/dashboard" });
    }, 400);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex">
        <div className="absolute inset-0 cross-pattern opacity-30" aria-hidden />
        <Link to="/" className="relative flex items-center gap-3"><Emblem /><span className="font-display text-lg font-semibold">ASKA HEALTHCARE</span></Link>
        <div className="relative"><h1 className="text-4xl font-semibold leading-tight">Website Content Manager</h1><p className="mt-4 max-w-md text-primary-foreground/75">Manage services, products, hospital activities, gallery, and enquiries for the ASKA Healthcare website.</p></div>
        <p className="relative text-xs text-primary-foreground/60">Designed and development by SOSynch Ai Tech</p>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden"><Emblem /><span className="font-display text-lg font-semibold text-primary">ASKA HEALTHCARE</span></div>
          <h2 className="text-2xl font-semibold text-primary">Admin sign in</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to manage website content.</p>
          {session && <p className="mt-4 rounded-md bg-accent p-3 text-sm">You're already signed in. <Link to="/admin/dashboard" className="font-semibold text-secondary underline">Go to dashboard</Link></p>}
          {!storageOk && <p className="mt-4 rounded-md bg-warning/15 p-3 text-sm">Browser storage is unavailable. Changes will not persist after refresh.</p>}
          <form onSubmit={submit} noValidate className="mt-6 space-y-4">
            {err.form && <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{err.form}</p>}
            <div><label htmlFor="em" className="mb-1.5 block text-sm font-medium">Email</label><input id="em" type="email" autoComplete="username" className="field" value={email} onChange={(e) => setEmail(e.target.value)} />{err.email && <p className="mt-1 text-xs text-destructive">{err.email}</p>}</div>
            <div>
              <label htmlFor="pw" className="mb-1.5 block text-sm font-medium">Password</label>
              <div className="relative"><input id="pw" type={show ? "text" : "password"} autoComplete="current-password" className="field !pr-10" value={pw} onChange={(e) => setPw(e.target.value)} />
                <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground" aria-label={show ? "Hide password" : "Show password"}>{show ? <Icon.EyeOff width={18} height={18} /> : <Icon.Eye width={18} height={18} />}</button></div>
              {err.pw && <p className="mt-1 text-xs text-destructive">{err.pw}</p>}
            </div>
            <button type="submit" disabled={busy} className="btn btn-teal w-full">{busy ? "Signing in…" : "Sign in"}</button>
          </form>
          <div className="mt-6 rounded-lg border border-dashed p-4 text-xs text-muted-foreground">
            <p className="font-semibold text-primary">Demo Admin Access</p>
            <p className="mt-1">Email: {DEMO_ADMIN.email}<br />Password: {DEMO_ADMIN.password}</p>
            <p className="mt-2">This is a frontend-only demo login and is not secure authentication.</p>
          </div>
          <Link to="/" className="mt-6 inline-block text-sm text-secondary hover:underline">← Back to website</Link>
        </div>
      </div>
    </div>
  );
}
