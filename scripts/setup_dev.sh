#!/bin/bash

# this script is supposed to be run inside a container
# is there a point mentioning this? aren't they all?

# print out every command that's being executed
#set -x

# abandon ship at the first sign of trouble
set -e

if [[ ! -f package.json ]]; then
	echo "Must be called from the project root"
	exit 1
fi

if [[ $(whoami) != root ]]; then
	echo "Must be run as root"
	exit 1
fi



#
# npm install
#

mkdir -p node_modules
chown -R node:node node_modules
su node -c 'npm install'


#
# init db
#

echo ""
# same as: sqlite3 "$DB_FILE" < db/create_db.sql
node scripts/create_db.js "$DB_FILE" scripts/create_db.sql
node scripts/populate_db.js "$DB_FILE" ./stripes.json
chown node:node "$DB_FILE"
