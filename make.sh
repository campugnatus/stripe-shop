#!/bin/bash

# this is the entry point for the whole lifecycle of the project

set -e

if [[ ! -f package.json ]]; then
	echo "Must be run at the project's root"
fi

# We use this variable all the way down in the Dockerfile. We can't set it
# there, as there are no bind mount during the build stage, nor in
# docker-compose.yml, as we can only declare constants there. Sooo we set it
# right here.
export USERID=$(stat -c %u package.json)

if [[ -n $(which docker-compose) ]]; then
	COMPOSE_CMD="docker-compose"
else
	COMPOSE_CMD="docker compose"
fi

COMPOSE="$COMPOSE_CMD
	--env-file dev.env
	-f docker-compose.dev.yml
"

case "$1" in
	# single command to start the dev server
	dev) $COMPOSE up --remove-orphans ;;

	# Alternatively, you can run these two. Unlike the dev) option above,
	# they're interactive, i.e. they can receive input from STDIN.
	api) $COMPOSE run --rm --service-ports api ;;
	app) $COMPOSE run --rm --service-ports app ;;

	compose) shift 1; $COMPOSE $@ ;;

	clean)
		rm -r node_modules
		rm -r db
	;;

	console)
		# for the times when you want to do something inside of the
		# container... like npm install

		# -i = interactive
		# -t = open terminal
		# -v = volume
		# -w = working dir inside the container
		# -p expose port on the host
		docker run --rm \
		-v "$(pwd)/db:/db" \
		-v "$(pwd):/app" \
		--env-file docker-compose.dev.env \
		--add-host=docker.host.internal:host-gateway \
		-w /app -it \
		-p 3000:3000 \
		-p 3002:3002 \
		-u node \
		stripeshop-base \
		/bin/bash
	;;

	build)
		source prod.env
		docker build \
			--build-arg USERID=$USERID \
			-t kotomka/stripeshop \
			.
	;;

	stage)
		# trying to emulate production environment as closely as possible
		docker compose -f docker-compose.prod.yml up --remove-orphans
	;;

	setup-prod)
		# stripeshop runs in docker, listening on 127.0.0.1:3002.
		# To make it visible to the outer world we use a reverse-proxy,
		# nginx config is included
		#
		# make sure nginx is installed
		# nginx -v
		#
		# add nginx.conf to sites-enabled
		# cp nginx.conf /etc/nginx/sites-available/stripeshop
		# cd /etc/nginx/sites-enabled
		# ln -s ../sites-available/stripeshop .
		#
		# create log directory
		# mkdir /var/log/stripeshop for nginx to be able to write logs there
		#
		# restart nginx
		# sudo systemctl restart nginx
	;;

	deploy)
		set -x # print the commands being executed
		docker push kotomka/stripeshop
		# TODO: receive user@server from an argument
		scp docker-compose.prod.yml shadoy@shevchuk.net:
		ssh shadoy@shevchuk.net docker pull kotomka/stripeshop
		ssh shadoy@shevchuk.net docker-compose -f docker-compose.prod.yml up --remove-orphans --detach
	;;
esac
