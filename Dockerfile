# syntax=docker/dockerfile:1

FROM node:18-bullseye AS builder

# TODO: should these be here or in docker-compose.yml?
ENV DB_FILE=/db/stripeshop.db
ENV STATIC_PATH=/app/dist
ENV NODE_ENV=development
ENV API_PORT=3002

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

RUN mkdir scripts
COPY scripts ./scripts/

RUN mkdir /db
#RUN node scripts/get_stripes.js --svg stripes.json
RUN node scripts/create_db.js "$DB_FILE" scripts/create_db.sql
COPY stripes.json .
RUN node scripts/populate_db.js "$DB_FILE" ./stripes.json
VOLUME /db

COPY . .
RUN npx vite build

# COPY server.js .
# COPY db.js .
# COPY validators.js .

#CMD node server.js

EXPOSE $API_PORT



FROM node:18-alpine

ENV DB_FILE=/db/stripeshop.db
ENV STATIC_PATH=/app/dist
ENV NODE_ENV=production
ENV API_PORT=3002

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

RUN mkdir /db
COPY --from=builder "$DB_FILE" "$DB_FILE"

RUN mkdir dist
COPY --from=builder /app/dist dist/

COPY server.js .
COPY db.js .
COPY validators.js .

EXPOSE $API_PORT