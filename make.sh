#!/bin/bash

# this is the entry point for the whole lifecycle of the project

set -e

case "$1" in
	dev)
		docker-compose -f docker-compose.dev.yml up --remove-orphans
	;;

	console)
		docker run --rm \
		-v "$(pwd)/db:/db" \
		-v "$(pwd):/app" \
		-w /app -it \
		-p 3000:3000 \
		-p 3002:3002 \
		node:18-bullseye \
		/bin/bash
	;;

	build)
		npx vite build
		docker build -t stripeshop .
	;;

	stage)
		# trying to emulate production environment as closely as possible
		docker-compose -f docker-compose.prod.yml up --remove-orphans
	;;

	deploy)
		echo "uh.. coming soon? :)"
	;;
esac