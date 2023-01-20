#!/bin/bash

# So we import the stripes and init the DB right on the server. Feels a bit
# out of place, tbh. We could do it during the build time, instead, embed
# them in the docker image, and initialize the volumes with that, but even so
# updating the stripes (re-importing them from figma and correspondingly
# updating the DB) would have to be done on the server, anyway, sooooo...

# abandon ship at the first sign of trouble
set -e

#
# import stripes from figma
#
node scripts/get_stripes.js --svg --verbose stripes

#
# init the database
#
if [[ -z "$DB_FILE" ]]; then
	echo "Error: DB_FILE environment variable undefined"
	exit 1
fi
if [[ ! -f "$DB_FILE" ]]; then
	node scripts/create_db.js "$DB_FILE" scripts/create_db.sql
	node scripts/populate_db.js "$DB_FILE" stripes/stripes.json
fi