# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_OPTIONS="--max-old-space-size=2048"
RUN npx medusa build

# Stage 3: Production — use the .medusa/server output
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 medusa && \
    adduser --system --uid 1001 medusa

# Copy the built server app
COPY --from=builder /app/.medusa/server ./
RUN npm ci --omit=dev 2>/dev/null || true
RUN chown -R medusa:medusa /app

USER medusa
EXPOSE 9000

CMD ["npx", "medusa", "start"]
