# Stage 1: Install ALL dependencies (needed for build)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN --mount=type=cache,id=npm-deps,target=/root/.npm npm install --no-audit

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_OPTIONS="--max-old-space-size=2048"
RUN npx medusa build

# Stage 3: Production dependencies only
FROM node:20-alpine AS prod-deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN --mount=type=cache,id=npm-prod,target=/root/.npm npm install --no-audit --omit=dev && \
    npm cache clean --force

# Stage 4: Production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 medusa && \
    adduser --system --uid 1001 medusa

# Use --chown on COPY to avoid a separate chown layer (saves ~700MB)
COPY --from=builder --chown=medusa:medusa /app/dist ./dist
COPY --from=builder --chown=medusa:medusa /app/dist/public ./public
COPY --from=prod-deps --chown=medusa:medusa /app/node_modules ./node_modules
COPY --from=builder --chown=medusa:medusa /app/package.json ./package.json
COPY --from=builder --chown=medusa:medusa /app/medusa-config.ts ./medusa-config.ts
COPY --from=builder --chown=medusa:medusa /app/tsconfig.json ./tsconfig.json
COPY --from=builder --chown=medusa:medusa /app/src ./src

RUN mkdir -p /app/static && chown medusa:medusa /app/static
USER medusa
EXPOSE 9000

CMD ["npm", "run", "start"]
