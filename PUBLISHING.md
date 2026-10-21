# Publishing ASKA Healthcare Portfolio

## Option 1 — Publish with Lovable (fastest)
1. Click **Publish** in the Lovable editor.
2. The site goes live at your Lovable URL; add a custom domain in Project Settings → Domains (paid plans).
3. Frontend changes need "Update" in the publish dialog after edits.

## Option 2 — Deploy from GitHub to Vercel
The code is already synced to `github.com/vickysosync/aska-healthcare-portfolio`.

1. Go to https://vercel.com/new and import the `aska-healthcare-portfolio` repository.
2. Vercel auto-detects Vite. Keep the defaults:
   - Build command: `npm run build` (or `bun run build`)
   - Output directory: `dist`
   - Install command: `npm install`
3. Click **Deploy**. Every future push to the main branch redeploys automatically.
4. Client-side routes (e.g. `/admin/login`) work out of the box on Vercel — no rewrite rules needed.

## Option 3 — Deploy from GitHub to Netlify
1. Go to https://app.netlify.com/start and pick the repository.
2. Build command: `npm run build`; Publish directory: `dist`.
3. Add a file `public/_redirects` containing `/* /index.html 200` so direct visits and refreshes on `/admin/*` routes serve the app instead of a 404.
4. Click **Deploy site**. Auto-deploys on every push to main.

## Verify after deploying
1. Open the live URL — the home page loads with the hero banner and images.
2. Refresh `/admin/login` directly — the sign-in page must appear (no 404).
3. Sign in with `admin@askahealthcare.demo` / `AskaAdmin@2026`, edit a service, and confirm it shows on the public site.
4. Submit a contact enquiry, then check it under Admin → Enquiries.
5. Check the browser tab shows the ASKA emblem and the page title "ASKA Healthcare Private Limited | Healthcare & Pharmaceutical Portfolio".

## Notes
- `npm install` and `npm run build` must succeed locally first; the build was verified before publishing.
- The admin login and enquiry form are demo features: credentials live in the frontend code and submissions are stored only in the visitor's browser. Do not use them for real messages.
