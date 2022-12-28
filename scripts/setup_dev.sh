#!/bin/bash

# this script is supposed to be run inside a container
# is there a point mentioning this? aren't they all?

# it runs every time the dev server is started, and as such it's supposed to
# be idempotent. If it becomes too much of a hassle to keep it idempotent,
# we'll probably have to refactor it into a separate step

# print out every command that's being executed
# set -x

# abandon ship at the first sign of trouble
set -e

if [[ ! -f package.json ]]; then
	echo "Must be called from the project root"
	exit 1
fi

USERID=$(stat -c %u package.json)
echo "Who owns package.json? " $USERID
echo "And who am i? " $(id)




npm install



#
# init db
#

echo ""
# same as: sqlite3 "$DB_FILE" < db/create_db.sql
node scripts/create_db.js "$DB_FILE" scripts/create_db.sql
node scripts/populate_db.js "$DB_FILE" ./stripes.json
