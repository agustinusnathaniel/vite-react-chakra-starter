#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

port=5173
dev_script=$(node -e "console.log(require('./package.json').scripts.dev||'')")
if echo "$dev_script" | grep -q -- "--port"; then
  port=$(echo "$dev_script" | grep -oP '--port \K\d+')
fi

logfile=$(mktemp)
pnpm run dev > "$logfile" 2>&1 &
pid=$!

server_up=false
for i in $(seq 1 60); do
  if ! kill -0 "$pid" 2>/dev/null; then break; fi
  if curl -sf "http://localhost:$port" > /dev/null 2>&1; then server_up=true; break; fi
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

if grep -qiE '(error|Error|ERR|MISSING_EXPORT|Build failed|optimization failed|uncaught|unhandled)' "$logfile" 2>/dev/null; then
  echo "FAIL: errors in dev server output"
  grep -iE '(error|Error|ERR|MISSING_EXPORT|Build failed|optimization failed|uncaught|unhandled)' "$logfile" | head -10 | sed 's/^/  /'
  kill "$pid" 2>/dev/null || true
  rm -f "$logfile"
  exit 1
fi

kill "$pid" 2>/dev/null || true
rm -f "$logfile"
echo "PASS"
