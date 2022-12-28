TODO: check the dependencies somewhere in scripts?

Prerequisites:
	* docker v20.10.17, docker-compose v2.6.0

The entry point is ./make.sh

	./make.sh dev		to run in dev mode with hot reloading
	./make.sh build		to build docker images for deployment
	./make.sh stage		to run the containers locally as if in production
