# tahat.dev

Personal portfolio site.

## Deploy (Vercel + Namecheap)

1. Push this folder to a new GitHub repo (e.g. `portfolio`).
2. Go to vercel.com → sign in with GitHub → **Add New Project** → import the repo.
   No build settings needed — it's a plain static site.
3. Once deployed, go to your Vercel project → **Settings → Domains** → add `tahat.dev`.
4. Vercel will show you one or two DNS records to add.
5. Go to Namecheap → **Domain List** → `tahat.dev` → **Manage** → **Advanced DNS**, and add exactly the records Vercel showed you.
6. Wait for DNS to propagate (usually minutes, can take up to ~24h). Vercel auto-issues HTTPS once it sees the domain resolving.

## Updating project status

Each project block in `index.html` has a "Building" status tag. Once Request Tracer, Orbit Tracker, or Cost Monitor is actually finished:

- Change the description to past tense with real, measured results.
- Swap the `Building` status span for a link to the live repo or demo.
- Keep the tag honest — don't mark something done until it is.
