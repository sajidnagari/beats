#!/usr/bin/env sh
set -e

if [ -f .env.local ]; then
  ENV_FILE=".env.local"
elif [ -f .env ]; then
  ENV_FILE=".env"
else
  echo "Missing .env.local (or .env). Copy .env.local.example to .env.local and set DATABASE_URL + AUTH_SECRET." >&2
  exit 1
fi

exec dotenv -e "$ENV_FILE" -- "$@"
