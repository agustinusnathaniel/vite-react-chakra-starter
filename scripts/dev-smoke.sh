#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# Kill any prior dev servers to avoid port conflicts
pkill -f "pnpm.*run dev" 2>/dev/null || true
sleep 1

logfile=$(mktemp)
pnpm run dev > "$logfile" 2>&1 &
pid=$!

server_up=false
port=""
for i in $(seq 1 60); do
  if ! kill -0 "$pid" 2>/dev/null; then break; fi
  # Detect port from server output (handles auto-increment when port is in use)
  port=$(awk -F'[/ ]' '/Local:/ {for(i=1;i<=NF;i++) if($i ~ /^localhost:[0-9]+$/) {split($i,a,":"); print a[2]; exit}}' "$logfile" 2>/dev/null)
  if [ -n "$port" ] && curl -sf "http://localhost:$port" > /dev/null 2>&1; then
    server_up=true
    break
  fi
  sleep 0.5
done

if [ "$server_up" = false ]; then
  echo "FAIL: dev server failed to start"
  kill "$pid" 2>/dev/null || true
  sed 's/^/  /' "$logfile"
  rm -f "$logfile"
  exit 1
fi

# Let it run 5s more to surface late errors (HMR, deps)
sleep 5

if ! kill -0 "$pid" 2>/dev/null; then
  echo "FAIL: dev server started but crashed"
  sed 's/^/  /' "$logfile"
  kill "$pid" 2>/dev/null || true
  rm -f "$logfile"
  exit 1
fi

# Real errors (not React dev warnings via console.error)
if grep -qE '(Error:|Error during|MISSING_EXPORT|Build failed|optimization failed|uncaught|unhandled|ENOSPC|error: script "dev" exited)' "$logfile" 2>/dev/null; then
  echo "FAIL: errors in dev server output"
  grep -E '(Error:|Error during|MISSING_EXPORT|Build failed|optimization failed|uncaught|unhandled|ENOSPC|error: script "dev" exited)' "$logfile" | head -10 | sed 's/^/  /'
  kill "$pid" 2>/dev/null || true
  rm -f "$logfile"
  exit 1
fi

kill "$pid" 2>/dev/null || true
rm -f "$logfile"
echo "PASS"
