# syntax=docker/dockerfile:1

#
# production
#

FROM node:18-bullseye as production
ARG API_PORT
ARG DB_FILE

WORKDIR /app

RUN apt update
RUN apt install -y iputils-ping net-tools

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY scripts scripts
# TODO: that's overly hardcoded... it won't SCALE, as they say
COPY server.js db.js validators.js ./

RUN mkdir /app/db
RUN mkdir /app/zips
RUN mkdir /app/stripes

RUN chown -R node:node /app

# having the directories created before these declarations initializes the
# volumes by the empty dirs owned by 'node'. If we didn't create them
# beforehand, they would be owned by root and the 'node' user wouldn't have
# the write access (which we need)
VOLUME /app/db
VOLUME /app/zips
VOLUME /app/stripes

EXPOSE $API_PORT

# don't run things as root
USER node

CMD node server.js
