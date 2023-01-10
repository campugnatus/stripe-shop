# Stripe Shop

This is [stripeshop.top](https://stripeshop.top), a fully functional toy shop
selling digital stripes, kind of ironically but also for real.

Work in progress. Some features are missing. Some bugs are present. Code needs
some polish.

## Tech stack

* Vue.js 3
* Tailwind
* Node.js
* Express.js
* SQLite
* Docker

## How to build

Prerequisites:

* docker v20.10.17, docker-compose v2.6.0

The entry point is ./make.sh

	./make.sh dev		to run in dev mode with hot reloading
	./make.sh build		to build docker images for deployment
	./make.sh stage		to run the containers locally as if in production

# License

GPL