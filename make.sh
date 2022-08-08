#!/bin/bash

# this is the entry point for the whole lifecycle of the project

set -e

if [[ ! -f package.json ]]; then
	echo "Must be run at the project's root"
fi

case "$1" in
	dev)
		docker-compose -f docker-compose.dev.yml up --remove-orphans
	;;

	console)
		docker run --rm \
		-v "$(pwd)/db:/db" \
		-v "$(pwd):/app" \
		--add-host=docker.host.internal:host-gateway \
		-w /app -it \
		-p 3000:3000 \
		-p 3002:3002 \
		node:18-bullseye \
		/bin/bash
	;;

	build)
		docker build -t kotomka/stripeshop .
	;;

	stage)
		# trying to emulate production environment as closely as possible
		docker-compose -f docker-compose.prod.yml up --remove-orphans
	;;

	setup-prod)
		# stripeshop runs in docker, listening on 127.0.0.1:3002
		# to make it visible to the outer world one must use a reverse-proxy,
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
		set -x
		docker push kotomka/stripeshop
		scp docker-compose.prod.yml shadoy@shevchuk.net:
		ssh shadoy@shevchuk.net docker pull kotomka/stripeshop
		ssh shadoy@shevchuk.net docker-compose -f docker-compose.prod.yml up --remove-orphans --detach
	;;
esac
