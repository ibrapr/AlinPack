# Alin Pack — Premium B2B Packaging Machines Website

Modern, responsive, multilingual (English + Hebrew RTL) website for **Alin Pack** — a custom packaging machines company operating since 2007.

Built with **Next.js 14 (App Router)**, **React 18**, **TypeScript**, **Tailwind CSS**, and an embedded translation system. Free to deploy on **Vercel**.

---

## Highlights

- **Next.js 14 App Router** with locale-prefixed routing (`/en/...`, `/he/...`)
- **Full i18n** with JSON translation files (English + Hebrew RTL)
- **Premium industrial design** — black / red / white / light-gray theme, soft shadows, rounded cards
- **Machine ↔ Product relationship logic** — click a product to see all compatible machines, and vice-versa
- **SEO ready** — per-page metadata, Open Graph, sitemap, robots, JSON-LD Organization schema
- **Smart sticky transparent navbar** that transitions on scroll, switches text colors over hero
- **Mobile-first** with hamburger menu, sticky CTAs, smooth transitions
- **Floating WhatsApp button** on every page + WhatsApp CTA on every machine / product
- **Search + filtering** on the machines catalog
- **Reusable components** — Navbar, Footer, Hero, ProductCard, MachineCard, CTASection, LanguageSwitcher, FAQ, ContactForm, and more
- **Free deploy** — no paid backend, no external API keys required

---

## Project structure

```
.
├── app/
│   ├── [locale]/
│   │   ├── about/page.tsx
│   │   ├── clients/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── machines/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── services/page.tsx
│   │   ├── layout.tsx          # locale layout (html/body, Navbar, Footer, i18n)
│   │   ├── not-found.tsx
│   │   └── page.tsx            # Home
│   ├── globals.css
│   ├── layout.tsx              # minimal root layout
│   ├── not-found.tsx           # global 404 (with html/body)
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── sections/               # page-level sections (Hero variants, Stats, etc.)
│   ├── ContactForm.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── JsonLd.tsx
│   ├── LanguageSwitcher.tsx
│   ├── Logo.tsx
│   ├── MachineCard.tsx
│   ├── MachineIllustration.tsx
│   ├── MachineThumb.tsx
│   ├── MachinesExplorer.tsx
│   ├── Navbar.tsx
│   ├── PageHero.tsx
│   ├── ProductCard.tsx
│   ├── ProductIcon.tsx
│   ├── ProductsExplorer.tsx
│   └── WhatsAppButton.tsx
├── data/
│   ├── clients.ts              # clients + success stories
│   ├── machines.ts             # machine catalog + relationship helpers
│   ├── products.ts             # product catalog
│   ├── services.ts             # services list
│   └── types.ts                # shared data types
├── i18n/
│   ├── config.ts               # locales, directions, validators
│   ├── getDictionary.ts        # dictionary lookup + interpolation
│   └── translations/
│       ├── en.json
│       └── he.json
├── lib/
│   ├── contact.ts              # phone / WhatsApp / maps helpers
│   └── utils.ts
├── middleware.ts               # locale detection + redirect
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## Quick start

### 1. Prerequisites

- **Node.js 18.17+** (recommended Node 20 LTS)
- **npm**, **pnpm**, or **yarn**

### 2. Install dependencies

```bash
npm install
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be auto-redirected to your preferred locale (`/en` or `/he`).

### 4. Build for production

```bash
npm run build
npm start
```

---

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — Alin Pack website"
git branch -M main
git remote add origin https://github.com/<your-user>/alinpack-website.git
git push -u origin main
```

---

## Deploy to Vercel (free)

### Option A — One-click via dashboard

1. Sign in at [vercel.com](https://vercel.com).
2. **New Project → Import Git Repository** and pick the repo you just pushed.
3. Vercel auto-detects **Next.js**. Click **Deploy**.
4. Once built, Vercel gives you a `*.vercel.app` URL. Add a custom domain (e.g. `alinpack.com`) under **Settings → Domains**.

### Option B — Via CLI

```bash
npm install -g vercel
vercel          # first deploy (development preview)
vercel --prod   # production deploy
```

### Environment variables

The current build does **not** require any environment variables — the contact form uses a simulated submit (good enough for V1). When you wire up a real email handler (e.g. Resend, Formspree, or a Next.js Route Handler), add the keys in **Vercel → Settings → Environment Variables**.

---

## Adding / editing content

All site content is plain TypeScript / JSON:

- **Machines** — `data/machines.ts`
- **Products** — `data/products.ts`
- **Services** — `data/services.ts`
- **Clients & success stories** — `data/clients.ts`
- **Static copy** (page titles, hero text, etc.) — `i18n/translations/en.json` and `i18n/translations/he.json`

To link a machine to additional products, just add the product `slug` to the machine's `compatibleProductSlugs` array. The product detail page automatically picks up the new machine, and the machine card automatically shows the new product chip.

```ts
{
  slug: 'piston-filler-pf-3000',
  // ...
  compatibleProductSlugs: ['sauces', 'honey', 'tahini', 'spreads', 'cosmetics'],
}
```

---

## Multilingual content

Each translation field follows this pattern (per locale):

```ts
name: { en: 'Rotary Liquid Filler', he: 'ממלא נוזלים סיבובי' }
```

To add a new locale:

1. Add the locale code to `i18n/config.ts` (`locales` + `localeNames` + `localeDirections`).
2. Create `i18n/translations/<code>.json` (copy `en.json` and translate).
3. Add the `<code>` field to every `LocalizedString` in `data/`.

The middleware will pick up the new locale automatically.

---

## Customization checklist

- [ ] Replace the placeholder machine illustrations in `components/MachineThumb.tsx` and `components/MachineIllustration.tsx` with real product photos. Drop them in `/public/machines/` and switch the `<MachineThumb />` for `<Image src=... />`.
- [ ] Replace placeholder client names in `data/clients.ts` with real ones (logos can be placed in `/public/clients/` and rendered as `<Image />`).
- [ ] Wire the contact form in `components/ContactForm.tsx` to your email handler (e.g. Resend, Formspree, EmailJS, or a Next.js Route Handler).
- [ ] Add `OG` image at `/public/og.png` (1200×630) for richer link previews.
- [ ] Replace `https://alinpack.com` in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, and `components/JsonLd.tsx` with your actual production URL if different.

---

## Tech stack

| Layer        | Choice                                      |
| ------------ | ------------------------------------------- |
| Framework    | Next.js 14 (App Router)                     |
| UI           | React 18 + TypeScript                       |
| Styling      | Tailwind CSS 3                              |
| Icons        | lucide-react                                |
| i18n         | Custom JSON-based, locale-prefixed routes   |
| Hosting      | Vercel (free tier compatible)               |
| Data         | Local TypeScript modules — no DB required   |
| Forms        | Built-in (replace simulated submit with API)|

---

## Admin panel (`/admin`)

The site ships with a built-in admin for managing **machines**, **products**, and **clients** without touching code.

### What you can do

- **Machines**: add, edit, delete — including bilingual name/description, features, benefits, specs, FAQs, and which products each machine is compatible with.
- **Products**: add, edit, delete categories (dairy, sauces, etc.), bilingual packaging needs/types. Deleting a product automatically unlinks it from every machine.
- **Clients**: add/edit/delete the "Trusted by" companies shown on the homepage and clients page.

### How storage works

The admin has two modes:

1. **Local mode** (default, no setup): writes directly to `data/content/*.json` on disk. Perfect for local development — `npm run dev` picks up changes instantly. Not suitable for production (Vercel filesystem is read-only).
2. **GitHub mode** (production): commits changes back to your repo via the GitHub Contents API. Every save is a real commit, which triggers Vercel to redeploy in ~30 seconds. Free, fully audited via git history.

### Local setup

1. Copy the env template:
   ```bash
   cp .env.local.example .env.local
   ```
2. Set a strong admin password and session secret:
   ```dotenv
   ADMIN_PASSWORD=your-strong-password
   ADMIN_SESSION_SECRET=any-long-random-string-32+chars
   ```
3. Restart `npm run dev`, then visit **http://localhost:3000/admin/login**.

### Production setup (GitHub mode on Vercel)

1. Push the repo to GitHub.
2. In **GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens**, create a token with **Contents: read & write** access on this repo only. Copy the token.
3. In **Vercel → Project → Settings → Environment Variables**, add:
   ```
   ADMIN_PASSWORD          = <your strong password>
   ADMIN_SESSION_SECRET    = <long random string>
   GITHUB_TOKEN            = <the personal access token from step 2>
   GITHUB_OWNER            = <your GitHub username or org>
   GITHUB_REPO             = <repo name, e.g. alinpack-website>
   GITHUB_BRANCH           = main
   ```
4. Redeploy. Visit `https://your-domain.com/admin/login` and sign in.

Once `GITHUB_TOKEN` + `GITHUB_OWNER` + `GITHUB_REPO` are all set, the admin automatically switches from local-file mode to GitHub-commit mode (the dashboard shows which mode is active).

### Security notes

- The admin password is checked server-side with a constant-time comparison.
- Sessions use signed HTTP-only cookies that expire after 7 days.
- The `/admin` route is excluded from the public sitemap and marked `noindex`.
- For multi-user access, swap `lib/admin/auth.ts` with NextAuth + a free auth provider (Supabase, Auth0 free tier, etc.) — the rest of the admin code doesn't change.

---

## License

Private project for Alin Pack. All rights reserved © Alin Pack.
