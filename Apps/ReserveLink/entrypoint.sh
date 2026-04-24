#!/bin/sh

# Exit on error
set -e

echo "Starting ReserveLink Initialization..."

echo "Ensuring database exists..."
python -c "
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import os

db_url = os.getenv('DATABASE_URL')
# Extract connection details for default 'postgres' db
base_url = db_url.rsplit('/', 1)[0] + '/postgres'

try:
    conn = psycopg2.connect(base_url)
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cur = conn.cursor()
    cur.execute(\"SELECT 1 FROM pg_catalog.pg_database WHERE datname = 'reservation_db'\")
    exists = cur.fetchone()
    if not exists:
        print('Creating database reservation_db...')
        cur.execute('CREATE DATABASE reservation_db')
    cur.close()
    conn.close()
except Exception as e:
    print(f'Error ensuring DB exists: {e}')
"

# Run seeding
python seed.py

echo "Initialization complete. Starting Gunicorn..."

# Start Gunicorn
exec gunicorn -b 0.0.0.0:5000 run:app
