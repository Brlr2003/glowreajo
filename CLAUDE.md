# GlowReaJo — Project Standards & Constraints

## Project Overview

Korean skincare (K-beauty) e-commerce app for the Jordanian market.
- **Currency:** JOD (Jordanian Dinar) — always use `formatPrice()` from `src/lib/formatPrice.ts`
- **Target audience:** Jordan-based skincare enthusiasts

---

## Project Structure (DO NOT deviate from this)

```
glowreajo/
├── CLAUDE.md                # THIS FILE — read before every task
├── docker-compose.yml       # PostgreSQL 15 (port 5433) + Redis 7 (port 6379)
├── .gitignore
├── backend/                 # Medusa.js v2 backend
│   ├── medusa-config.ts     # defineConfig from @medusajs/framework/utils
│   ├── .env                 # Environment variables (never commit secrets)
│   ├── tsconfig.json        # strict: false (required for Medusa + ts-node)
│   └── src/
│       ├── api/             # Custom API routes (file-based routing)
│       │   ├── middlewares.ts
│       │   └── store/otp/   # OTP send/verify routes
│       └── scripts/
│           └── seed.ts      # Database seed script
├── storefront/              # Next.js 16 App Router
│   ├── next.config.ts
│   ├── postcss.config.mjs   # Uses @tailwindcss/postcss (NOT tailwindcss)
│   ├── .env.local           # NEXT_PUBLIC_MEDUSA_BACKEND_URL, NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
│   ├── public/              # Static assets (robots.txt, images)
│   └── src/
│       ├── app/             # Next.js App Router pages
│       │   ├── layout.tsx   # Root layout (fonts, metadata, providers)
│       │   ├── providers.tsx # Client providers wrapper
│       │   ├── template.tsx # Page transition animation wrapper
│       │   ├── page.tsx     # Home page
│       │   ├── shop/        # Shop page with filters
│       │   ├── product/[handle]/ # Product detail page
│       │   ├── checkout/    # Multi-step checkout
│       │   ├── order/success/ # Order confirmation
│       │   ├── about/       # About page
│       │   ├── contact/     # Contact page
│       │   ├── loading.tsx  # Global loading skeleton
│       │   ├── error.tsx    # Global error boundary
│       │   ├── not-found.tsx # 404 page
│       │   └── sitemap.ts   # Dynamic sitemap
│       ├── components/
│       │   ├── ui/          # Reusable primitives (Button, Input, Badge, etc.)
│       │   ├── shared/      # Shared composites (SectionTitle, Container)
│       │   ├── layout/      # Layout components (Header, Footer, CartDrawer, etc.)
│       │   ├── home/        # Home page sections (HeroSection, BestSellers, etc.)
│       │   ├── product/     # Product components (ProductCard, ProductGallery, etc.)
│       │   ├── checkout/    # Checkout step components
│       │   └── shop/        # Shop page components (FilterSidebar, ProductGrid, etc.)
│       ├── context/         # React Context providers (CartContext, ToastContext)
│       ├── lib/             # Utilities (medusa-client, formatPrice, cn, animations, etc.)
│       └── styles/
│           └── globals.css  # Tailwind v4 @theme + global styles
```

### Where things go:
- **New page?** → `src/app/<route>/page.tsx`
- **New UI primitive?** → `src/components/ui/`
- **New section for a page?** → `src/components/<page-name>/`
- **New utility function?** → `src/lib/`
- **New React hook?** → `src/hooks/` (create dir if needed)
- **New context/provider?** → `src/context/`
- **New API route?** → `backend/src/api/store/<route>/route.ts`

---

## Tech Stack (DO NOT change these)

| Layer | Technology | Version |
|-------|-----------|---------|
| Backend | Medusa.js v2 | latest |
| Frontend | Next.js | 16+ |
| React | React | 19+ |
| Styling | Tailwind CSS | v4 (NOT v3) |
| Animations | Framer Motion | 12+ |
| Icons | Lucide React | latest |
| Language | TypeScript | 5+ |
| Database | PostgreSQL | 15 |
| Cache | Redis | 7 |

---

## Code Rules (MUST follow)

### File Size
- **Max 200 lines per component file.** If exceeding, split into sub-components.
- **Max 150 lines for utility files.**
- **Max 300 lines for page files** (pages compose components, so they can be slightly longer).

### DRY Principle
- **Never duplicate code.** If logic appears in 2+ places, extract it.
- Shared styles → Tailwind `@theme` tokens or utility classes in `globals.css`
- Shared logic → `src/lib/` utility functions
- Shared UI → `src/components/ui/` components
- Shared data-fetching patterns → custom hooks in `src/hooks/`

### TypeScript
- Use explicit types for function parameters, especially in lambdas: `(p: any) =>` NOT `(p) =>`
- Use `any` for Medusa API response objects (Medusa types don't resolve via ts-node)
- Use `useRef<T>(null)` — React 19 requires explicit initial value
- Backend tsconfig has `strict: false` — do NOT change this

### Component Patterns
- All components are functional with hooks — NO class components
- Use `"use client"` directive only when component needs interactivity
- Use `memo()` for components rendered in lists (e.g., ProductCard)
- Named exports for components: `export function Header()` NOT `export default function Header()`
- Use `cn()` helper (from `src/lib/cn.ts`) for conditional classNames

### Styling (Tailwind CSS v4)
- **`@import "tailwindcss"` + `@theme {}` blocks** — NOT `@tailwind` directives
- **NO `tailwind.config.ts`** — all theme tokens defined in `globals.css` via `@theme {}`
- PostCSS config uses `@tailwindcss/postcss` plugin — NOT `tailwindcss`
- Use design tokens from `@theme`: `text-primary`, `bg-surface`, `shadow-soft`, etc.
- Use `rounded-2xl` for cards, `rounded-full` for buttons/badges
- RTL-ready: use logical properties (`padding-inline`, `margin-inline`) where possible

### Animations (Framer Motion)
- Import animation presets from `src/lib/animations.ts`
- Only animate `transform` and `opacity` for performance
- Use `whileInView` with `once: true` for scroll animations
- Stagger delay: 50-80ms between items
- Use `AnimatePresence` for enter/exit animations

### Images
- **Always use `next/image`** — never raw `<img>` tags
- Always provide `sizes` prop for responsive images
- Use `priority` for above-the-fold images (hero, first products)
- Product images come from `src/lib/demo-images.ts` (replace with real URLs in production)
- `next.config.ts` allows all HTTPS remote images (`hostname: "**"`)

### Data Fetching
- Use `@medusajs/js-sdk` via the client in `src/lib/medusa-client.ts`
- All store API calls require the publishable API key (configured in `.env.local`)
- Client-side fetching with `useEffect` + `useState` for product data
- Always handle loading and error states

### Cart & State
- Cart state managed via `CartContext` (useReducer + localStorage)
- Toast notifications via `ToastContext`
- NO external state management libraries (no Redux, no Zustand)

---

## Commands

| Action | Command |
|--------|---------|
| Start backend | `cd backend && npm run dev` |
| Start storefront | `cd storefront && npm run dev` |
| Start Docker | `docker compose up -d` |
| Run seed | `cd backend && npx medusa exec ./src/scripts/seed.ts` |
| Build storefront | `cd storefront && npm run build` |
| Run migrations | `cd backend && npx medusa db:migrate` |

### Ports
- **Storefront:** http://localhost:5000
- **Backend API:** http://localhost:9000
- **Admin Dashboard:** http://localhost:9000/app
- **PostgreSQL:** localhost:5433 (NOT 5432 — avoids local PG conflict)
- **Redis:** localhost:6379

### Admin Credentials
- Email: admin@glowreajo.com
- Password: admin123

---

## Known Gotchas (Learned from errors — DO NOT repeat)

1. **`@medusajs/framework/http`** does NOT resolve via ts-node → use `any` types for API route handlers
2. **`@medusajs/framework/types`** does NOT resolve via ts-node → use `{ container: any }` in seed scripts
3. **`defineConfig`** is in `@medusajs/framework/utils` (NOT `@medusajs/utils`)
4. **Campaign objects** require `campaign_identifier` field (e.g., `campaign_identifier: "GLOW20"`)
5. **Publishable API key** must be linked to a sales channel via admin API before store APIs work
6. **macOS AirPlay Receiver** occupies port 5000 on some Macs — if port conflict, disable AirPlay Receiver in System Settings
7. **`docker-compose` (hyphen)** is v1 and deprecated — use `docker compose` (space, v2)
8. **`create-medusa-app`** CLI hangs in non-interactive environments — set up manually
9. **`create-next-app`** CLI also hangs in non-interactive environments — set up manually
10. **`useRef<T>()`** fails in React 19 — always pass initial value: `useRef<T>(null)`
11. **Store API routes** under `/store/*` require `x-publishable-api-key` header
12. **OTP routes** also need the publishable API key header (they're under `/store/`)

---

## When Adding New Features

1. Read this file first
2. Check if a similar component/utility already exists before creating new ones
3. Follow the file structure above — no new top-level directories
4. Keep files under 200 lines
5. Use existing design tokens from `globals.css @theme`
6. Test that `npm run build` passes after changes
7. If you discover a new gotcha, add it to the "Known Gotchas" section above
