# GlowReaJo

Korean skincare e-commerce for Jordan. Built with Medusa.js v2 + Next.js 14.

## Setup

### Prerequisites
- Node.js 20+
- Docker & Docker Compose

### 1. Start Infrastructure
```bash
docker-compose up -d
```

### 2. Backend
```bash
cd backend
cp .env.template .env
npm install
npx medusa db:migrate
npx medusa exec ./src/scripts/seed.ts
npm run dev
```
Backend runs at http://localhost:9000
Admin dashboard at http://localhost:9000/app

### 3. Storefront
```bash
cd storefront
npm install
npm run dev
```
Storefront runs at http://localhost:3000

## Project Structure
```
glowreajo/
├── backend/          # Medusa.js v2
│   ├── src/
│   │   ├── api/      # Custom API routes (OTP)
│   │   └── scripts/  # Seed data
│   └── medusa-config.ts
├── storefront/       # Next.js 14 App Router
│   ├── src/
│   │   ├── app/      # Pages
│   │   ├── components/
│   │   ├── context/
│   │   └── lib/
│   └── tailwind.config.ts
├── docker-compose.yml
└── CLAUDE.md
```
