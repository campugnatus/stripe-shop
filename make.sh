#!/bin/bash

# this is the entry point for the whole lifecycle of the project

# abandon ship at the first sign of trouble
set -e

# We use this variable all the way down in the Dockerfile. We can't set it
# there, as there are no bind mount during the build stage, nor in
# docker-compose.yml, as we can only declare constants there. Sooo we set it
# right here.
USERID=$(stat -c %u .)
export USERID

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

	# for some manual control, e.g. you might want to call
	# sudo ./make.sh compose logs base -f
	compose) shift 1; $COMPOSE "$@" ;;

	clean)
		rm -r node_modules
		rm -r db
	;;

	# for the times when you want to do something inside of the container,
	# like npm install
	console)

		$COMPOSE run --rm --service-ports -it setup bash

		# -i = interactive
		# -t = open terminal
		# -v = volume
		# -w = working dir inside the container
		# -p expose port on the host
		# docker run \
		# 	--rm \
		# 	-v "$(pwd)/db:/db" \
		# 	-v "$(pwd):/app" \
		# 	--env-file dev.env \
		# 	--add-host=docker.host.internal:host-gateway \
		# 	-w /app -it \
		# 	-p 3000:3000 \
		# 	-p 3002:3002 \
		# 	-u node \
		# 	stripeshop-base \
		# 	/bin/bash
	;;

	build)
		$0 build_api
		$0 build_app
	;;

	build_api)
		source prod.env
		docker build \
			--build-arg DB_FILE="$DB_FILE" \
			--build-arg API_PORT="$API_PORT" \
			--target production \
			-t "$DOCKER_USERNAME/stripeshop-api" \
			api
	;;

	build_app)
		source prod.env
		docker build \
			--build-arg VITE_GOOGLE_CLIENT_ID="$VITE_GOOGLE_CLIENT_ID" \
			--target production \
			-t "$DOCKER_USERNAME/stripeshop-app" \
			app
	;;

	stage)
		# trying to emulate production environment as closely as possible
		docker compose --env-file prod.env -f docker-compose.prod.yml up --remove-orphans
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
		#
		# create prod.env

		# TODO: should all this be further automated? Should I put nginx &
		# exim in containers, as well?
	;;

	deploy)
		source prod.env
		set -x # print the commands being executed
		docker push "$DOCKER_USERNAME/stripeshop-app"
		docker push "$DOCKER_USERNAME/stripeshop-api"

		scp docker-compose.prod.yml $DEPLOY_TARGET:docker-compose.yml
		ssh $DEPLOY_TARGET docker pull $IMAGE_NAME
		ssh $DEPLOY_TARGET [[ ! -f prod.env ]] \
			&& echo "Warning: 'prod.env' doesn't exist on the server"
		ssh $DEPLOY_TARGET docker-compose up --remove-orphans --detach
	;;
esac
