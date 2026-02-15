# GlowReaJo — Coding Standards

## Project Structure
- Monorepo: `backend/` (Medusa.js v2) + `storefront/` (Next.js 14+ App Router)
- Backend runs on port 9000, storefront on port 3000

## Tech Stack
- **Backend:** Medusa.js v2, PostgreSQL 15, Redis 7
- **Storefront:** Next.js 14+, TypeScript, Tailwind CSS, Framer Motion
- **Currency:** JOD (Jordanian Dinar)

## Code Style
- TypeScript strict mode
- Functional components with hooks
- Named exports preferred
- Use `cn()` helper for conditional classNames (clsx + tailwind-merge)
- Framer Motion for all animations
- `next/image` for all images
- Format prices with `formatPrice()` utility

## File Naming
- Components: PascalCase (`ProductCard.tsx`)
- Utilities: camelCase (`formatPrice.ts`)
- Pages: Next.js App Router conventions (`page.tsx`, `layout.tsx`)

## Commands
- Backend: `cd backend && npm run dev`
- Storefront: `cd storefront && npm run dev`
- Docker: `docker-compose up -d` (PostgreSQL + Redis)
- Seed: `cd backend && npx medusa exec ./src/scripts/seed.ts`
