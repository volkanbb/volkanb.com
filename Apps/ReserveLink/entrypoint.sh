#!/bin/sh

# Exit on error
set -e

echo "Starting ReserveLink Initialization..."

# Run seeding
# This is safe now because we made seed.py idempotent
python seed.py

echo "Initialization complete. Starting Gunicorn..."

# Start Gunicorn
exec gunicorn -b 0.0.0.0:5000 run:app
