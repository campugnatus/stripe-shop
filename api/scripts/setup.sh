#!/bin/bash

# this script is supposed to be idempotent

# abandon ship at the first sign of trouble
set -e

npm install

# PONDER: should these be volumes instead? One one hand, it would make the
# setup closer to prod. On the other, it would make them harder to access,
# e.g. with sqlitebrowser. Volumes are somewhere deep in docker internals and
# you have to be root to even read them
mkdir -p zips
mkdir -p db
mkdir -p stripes

#
# get stripes
#

# PONDER: should this be in the top-level setup.sh? On one hand, it kinda
# belongs there. On the other, it would complicate the setup, e.g. requiring
# an additional 'setup' container in prod
node scripts/get_stripes.js --svg --verbose stripes

#
# init dev db
#
if [[ -z "$DB_FILE" ]]; then
	echo "Error: DB_FILE environment variable undefined"
	exit 1
fi
if [[ ! -f "$DB_FILE" ]]; then
	node scripts/create_db.js "$DB_FILE" scripts/create_db.sql
	node scripts/populate_db.js "$DB_FILE" stripes/stripes.json
fi
