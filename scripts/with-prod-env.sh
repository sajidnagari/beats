#!/usr/bin/env sh
set -e

if [ ! -f .env.production ]; then
  echo "Missing .env.production. Copy .env.production.example to .env.production and set production DATABASE_URL + AUTH_SECRET." >&2
  exit 1
fi

exec dotenv -e .env.production -- "$@"
