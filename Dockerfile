# syntax=docker/dockerfile:1

#
# base
#

# TODO: I've tried node 19 and it resulted in some errors during the install
# of better-sqlite3. Perhaps it could be solved by upgrading the latter?
FROM node:18-bullseye as base
# must be set to UID of the user owning the current directory
ARG USERID

# We don't call npm as root anymore, but keeping this line as a residue from
# the times when we did. For some reason, npm couldn't create this directory
# by itself
RUN mkdir -p /root/.npm

# We're giving the user 'node' the same UID that the local user owning the
# current directory has, so that npm can write package-lock.json and the
# current directory, which are necessary for 'npm install' to work.
#
# Another approach could be to call 'npm install' as root and then chown
# node_modules, but for reasons mysterious, calling npm install as root
# failed with errors. I didn't investigate.
RUN groupmod -g $USERID node
RUN usermod -u $USERID -g $USERID node
USER node

WORKDIR /app





#
# builder
#

# This is a multi-stage build. The builder stage has everything needed to
# build the project, and the 'production' stage only has what's needed to run
# it. See https://docs.docker.com/build/building/multi-stage/

FROM node:18-bullseye AS builder
WORKDIR /app
ARG DB_FILE

COPY package.json package-lock.json ./
RUN npm ci

COPY scripts scripts

RUN mkdir /db
#TODO: get_stripes is too expensive, should probably make it idempotent and
#uncomment this
#RUN node scripts/get_stripes.js --svg stripes.json
COPY stripes.json .

RUN node scripts/create_db.js "$DB_FILE" scripts/create_db.sql
RUN node scripts/populate_db.js "$DB_FILE" ./stripes.json

COPY . .
RUN npx vite build



#
# production
#

FROM node:18-alpine as production
ARG API_PORT
ARG DB_FILE

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

RUN mkdir /db
COPY --from=builder "$DB_FILE" "$DB_FILE"
RUN chown -R node:node /db
VOLUME /db

RUN mkdir dist
COPY --from=builder /app/dist dist/
COPY server.js db.js validators.js ./

EXPOSE $API_PORT

# don't run things as root
USER node
