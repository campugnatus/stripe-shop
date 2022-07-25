# setup-dev:
# 	docker run --rm -it \
# 	-w /app \
# 	-v "`pwd`:/app" \
#   	-v node_modules:/app/node_modules \
# 	-v stripeshop_db:/db \
# 	node:18-bullseye \
# 	./scripts/setup_volumes.sh

# setup-dev:
# 	docker run --rm -it \
# 	-w /app \
# 	-v "`pwd`:/app" \
#  	-v node_modules:/app/node_modules \
# 	-v stripeshop_db:/db \
# 	node:18-bullseye \
# 	/bin/bash
# 	sh -c "`cat scripts/setup_volumes.sh`"

console:
	docker run --rm -v db:/db -v "$(pwd):/app" -w /app -it node:18-bullseye /bin/bash

dev:
	docker-compose -f docker-compose.dev.yml up --remove-orphans

build:
	echo "Coming soon"