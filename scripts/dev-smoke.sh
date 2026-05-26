#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

readonly LOGFILE=$(mktemp)
readonly POLL_ATTEMPTS=30
readonly POLL_INTERVAL=0.5
readonly POST_START_WAIT=2

cleanup() {
  kill "$DEV_PID" 2>/dev/null || true
  rm -f "$LOGFILE"
}
trap cleanup EXIT

pkill -f "pnpm.*(run|dlx).*dev" 2>/dev/null || true

# --- Start dev server in background ---
pnpm run dev --no-open > "$LOGFILE" 2>&1 &
DEV_PID=$!

# --- Poll for server readiness ---
detect_port() {
  grep -o 'http://localhost:[0-9]*' "$LOGFILE" 2>/dev/null |
    head -1 |
    grep -o '[0-9]*$'
}

server_up=false
for ((i = 0; i < POLL_ATTEMPTS; i++)); do
  if ! kill -0 "$DEV_PID" 2>/dev/null; then
    echo "FAIL: dev server died during startup"
    head -20 "$LOGFILE" | sed 's/^/  /'
    exit 1
  fi
  port=$(detect_port) || true
  if [ -n "$port" ] && curl -sf "http://localhost:$port" > /dev/null 2>&1; then
    server_up=true
    break
  fi
  sleep "$POLL_INTERVAL"
done

if [ "$server_up" = false ]; then
  echo "FAIL: dev server failed to start (timeout)"
  head -20 "$LOGFILE" | sed 's/^/  /'
  exit 1
fi

# --- Wait for late HMR / dependency errors ---
sleep "$POST_START_WAIT"

if ! kill -0 "$DEV_PID" 2>/dev/null; then
  echo "FAIL: dev server started but crashed"
  head -20 "$LOGFILE" | sed 's/^/  /'
  exit 1
fi

# --- Check for real errors (not React dev warnings sent to console.error) ---
error_pat='(Error:|Error during|MISSING_EXPORT|Build failed|optimization failed|uncaught|unhandled|ENOSPC|error: script "dev" exited)'
if grep -qE "$error_pat" "$LOGFILE" 2>/dev/null; then
  echo "FAIL: errors in dev server output"
  grep -E "$error_pat" "$LOGFILE" | head -10 | sed 's/^/  /'
  exit 1
fi

echo "PASS"
