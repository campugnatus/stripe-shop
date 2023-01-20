# syntax=docker/dockerfile:1

#
# builder
#

# This is a multi-stage build. The builder stage has everything needed to
# build the project, and the 'production' stage only has what's needed to run
# it. See https://docs.docker.com/build/building/multi-stage/

# If we want variables from prod.env to be available here, we have to declare
# them individually as ARG or ENV and pass them down here from make.sh
# using --build-arg. I hate that cuz it's easy to forget one of the steps and
# nobody will complain -- the variables will just end up undefined.

FROM node:18-bullseye AS builder
ARG VITE_GOOGLE_CLIENT_ID
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build



#
# production
#

FROM nginx:1.23.3 as production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80