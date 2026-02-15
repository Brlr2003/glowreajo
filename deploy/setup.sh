#!/usr/bin/env bash
set -euo pipefail

# GlowReaJo — Single Droplet Setup Script
# Run on a fresh Ubuntu 22.04+ DigitalOcean droplet as root

DOMAIN="glowreajo.com"
API_DOMAIN="api.glowreajo.com"
EMAIL="admin@glowreajo.com"
APP_DIR="/opt/glowreajo"
REPO_URL="https://github.com/Brlr2003/glowreajo.git"

echo "==> Updating system packages..."
apt-get update && apt-get upgrade -y

echo "==> Installing Docker..."
apt-get install -y ca-certificates curl gnupg
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

echo "==> Installing Nginx..."
apt-get install -y nginx

echo "==> Installing Certbot..."
apt-get install -y certbot python3-certbot-nginx

echo "==> Cloning repository..."
git clone "https://github.com/Brlr2003/glowreajo.git" "$APP_DIR" || echo "Repo already cloned, pulling latest..."
cd "$APP_DIR"
git pull origin main 2>/dev/null || true

echo "==> Setting up environment file..."
if [ ! -f "$APP_DIR/.env.production" ]; then
    cp "$APP_DIR/.env.production.template" "$APP_DIR/.env.production"
    echo ""
    echo "!!! IMPORTANT: Edit $APP_DIR/.env.production with real secrets before continuing !!!"
    echo "    Generate secrets with: openssl rand -hex 32"
    echo ""
    read -rp "Press Enter after editing .env.production..."
fi

echo "==> Configuring Nginx..."
cp "$APP_DIR/deploy/nginx.conf" /etc/nginx/sites-available/glowreajo
ln -sf /etc/nginx/sites-available/glowreajo /etc/nginx/sites-enabled/glowreajo
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "==> Building and starting Docker containers..."
cd "$APP_DIR"
docker compose -f docker-compose.prod.yml --env-file .env.production build
docker compose -f docker-compose.prod.yml --env-file .env.production up -d

echo "==> Waiting for backend to be ready..."
sleep 10

echo "==> Running database migrations..."
docker compose -f docker-compose.prod.yml exec backend npx medusa db:migrate

echo "==> Obtaining SSL certificates..."
certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" -d "$API_DOMAIN" --non-interactive --agree-tos -m "$EMAIL"

echo "==> Setting up auto-renewal..."
systemctl enable certbot.timer

echo ""
echo "=== Deployment complete! ==="
echo "  Storefront: https://$DOMAIN"
echo "  Backend:    https://$API_DOMAIN"
echo "  Admin:      https://$API_DOMAIN/app"
echo ""
echo "Useful commands:"
echo "  docker compose -f $APP_DIR/docker-compose.prod.yml --env-file $APP_DIR/.env.production logs -f"
echo "  docker compose -f $APP_DIR/docker-compose.prod.yml --env-file $APP_DIR/.env.production restart"
echo "  docker compose -f $APP_DIR/docker-compose.prod.yml exec backend npx medusa exec ./src/scripts/seed.ts"
