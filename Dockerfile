# syntax=docker/dockerfile:1

#
# dev
#

FROM node:18-bullseye as dev
WORKDIR /app

# must be set to UID of the user owning the current directory
ARG USERID

# We're giving the user 'node' the same UID that the local user owning the
# current directory has, so that npm can write package-lock.json and the
# current directory, which are necessary for 'npm install' to work.
#
# Another approach could be to call 'npm install' as root and then chown
# node_modules, but that's a whole other can of worms: npm drops superuser
# priveleges at some point and then it can't write its own cache, which for
# some reason only happens when using bind mounts but works fine when copying
# the files inside the container the production way. I dunno.
RUN groupmod -g $USERID node
RUN usermod -u $USERID -g $USERID node
USER node

