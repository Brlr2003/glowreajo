#!/usr/bin/env bash
set -euo pipefail

# GlowReaJo — Dev Environment Setup Script
# Run on the same droplet as production, as root

DEV_DOMAIN="dev.glowreajo.com"
API_DEV_DOMAIN="api-dev.glowreajo.com"
EMAIL="admin@glowreajo.com"
APP_DIR="/opt/glowreajo-dev"
REPO_URL="git@github.com:Brlr2003/glowreajo.git"

echo "==> Cloning repository for dev environment..."
if [ -d "$APP_DIR" ]; then
    echo "Dev directory already exists, pulling latest..."
    cd "$APP_DIR"
    git fetch origin dev
    git checkout dev
    git pull origin dev
else
    git clone -b dev "$REPO_URL" "$APP_DIR"
    cd "$APP_DIR"
fi

echo "==> Setting up dev environment file..."
if [ ! -f "$APP_DIR/.env.dev" ]; then
    cp "$APP_DIR/.env.dev.template" "$APP_DIR/.env.dev"
    echo ""
    echo "!!! IMPORTANT: Edit $APP_DIR/.env.dev with real secrets before continuing !!!"
    echo "    Generate secrets with: openssl rand -hex 32"
    echo "    Use DIFFERENT secrets than production!"
    echo ""
    read -rp "Press Enter after editing .env.dev..."
fi

echo "==> Updating Nginx config..."
cp "$APP_DIR/deploy/nginx.conf" /etc/nginx/sites-available/glowreajo
nginx -t && systemctl reload nginx

echo "==> Building and starting dev Docker containers..."
cd "$APP_DIR"
docker compose -f docker-compose.dev.yml --env-file .env.dev build
docker compose -f docker-compose.dev.yml --env-file .env.dev up -d

echo "==> Waiting for dev backend to be ready..."
sleep 10

echo "==> Running database migrations on dev..."
docker compose -f docker-compose.dev.yml exec -T backend npx medusa db:migrate

echo "==> Obtaining SSL certificates for dev domains..."
certbot --nginx -d "$DEV_DOMAIN" -d "$API_DEV_DOMAIN" --non-interactive --agree-tos -m "$EMAIL"

echo ""
echo "=== Dev environment setup complete! ==="
echo "  Dev Storefront: https://$DEV_DOMAIN"
echo "  Dev Backend:    https://$API_DEV_DOMAIN"
echo "  Dev Admin:      https://$API_DEV_DOMAIN/app"
echo ""
echo "Useful commands:"
echo "  docker compose -f $APP_DIR/docker-compose.dev.yml --env-file $APP_DIR/.env.dev logs -f"
echo "  docker compose -f $APP_DIR/docker-compose.dev.yml --env-file $APP_DIR/.env.dev restart"
echo "  docker compose -f $APP_DIR/docker-compose.dev.yml exec backend npx medusa exec ./src/scripts/seed.ts"
