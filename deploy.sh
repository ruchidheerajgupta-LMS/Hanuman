#!/usr/bin/env bash
# =============================================================================
# Hanuman Marketing Portal — Zero-downtime deployment script (UpCloud)
# Usage:
#   ./deploy.sh              — full deploy (pull + build + restart)
#   ./deploy.sh --skip-build — restart only, no rebuild
# =============================================================================
set -euo pipefail

APP_DIR="/opt/hanuman"
COMPOSE="docker compose -f docker-compose.prod.yml"
LOG_FILE="/var/log/hanuman-deploy.log"

log()  { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"; }
fail() { log "✗ ERROR: $*"; exit 1; }

cd "$APP_DIR" || fail "App directory $APP_DIR not found. Run upcloud-setup.sh first."

log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log "▶  Starting Hanuman deployment"
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ── 1. Pull latest code ───────────────────────────────────────────────────────
log "Pulling latest code..."
git pull origin master

# ── 2. Load environment ───────────────────────────────────────────────────────
[ -f .env ] || fail ".env file not found. Copy .env.production.example to .env and fill in values."
set -o allexport; source .env; set +o allexport

# ── 3. Build images ───────────────────────────────────────────────────────────
if [[ "${1:-}" != "--skip-build" ]]; then
  log "Building Docker images..."
  $COMPOSE build --parallel
fi

# ── 4. Rolling restart ────────────────────────────────────────────────────────
SERVICES=(redis lead-service gateway-service frontend)

wait_healthy() {
  local svc="$1"
  for i in {1..24}; do
    local state
    state=$($COMPOSE ps --format json "$svc" 2>/dev/null \
      | python3 -c "import sys,json; data=sys.stdin.read().strip(); rows=json.loads(data) if data.startswith('[') else [json.loads(l) for l in data.splitlines() if l]; print(rows[0].get('Health','unknown') if rows else 'unknown')" 2>/dev/null \
      || echo "unknown")
    if [[ "$state" == "healthy" ]]; then
      log "  ✓ $svc healthy"
      return 0
    fi
    sleep 5
  done
  fail "$svc did not become healthy after 120s"
}

for svc in "${SERVICES[@]}"; do
  log "Deploying $svc..."
  $COMPOSE up -d --no-deps "$svc"
  wait_healthy "$svc"
done

# ── 5. Reload nginx ───────────────────────────────────────────────────────────
log "Reloading nginx..."
$COMPOSE up -d --no-deps nginx
sleep 3
$COMPOSE exec -T nginx nginx -s reload 2>/dev/null && log "  ✓ nginx reloaded" || log "  ℹ nginx reload skipped (first deploy)"

# ── 6. Prune old images ───────────────────────────────────────────────────────
log "Pruning old Docker images..."
docker image prune -f --filter "until=24h" | tee -a "$LOG_FILE"

log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log "✅  Deployment complete"
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
$COMPOSE ps
