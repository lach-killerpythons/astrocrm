#!/bin/bash

# Exit immediately if any command fails
set -e

# Start PocketBase in the background
echo "🚀 Starting PocketBase..."
cd ./backend
./pocketbase serve &

# Capture PocketBase PID so we can stop it later if needed
PB_PID=$!

# Start Astro dev server
echo "🌌 Starting Astro dev server..."
cd ../astrocrm/astro-crm
npm run dev &

# Capture Astro PID
ASTRO_PID=$!

# Function to handle shutdown
cleanup() {
  echo ""
  echo "🛑 Stopping servers..."
  kill $PB_PID $ASTRO_PID
  wait $PB_PID $ASTRO_PID 2>/dev/null
  echo "✅ Servers stopped."
  exit 0
}

# Trap Ctrl+C (SIGINT) and call cleanup
trap cleanup SIGINT

# Wait for both processes to finish
wait

