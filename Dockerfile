FROM node:18-bullseye

WORKDIR /app

# don't npm install on every build, let docker cache it
COPY package.json package-lock.json ./
RUN npm install --production


# what should we do about DB?
# 1. the server should create one for itself if there isn't one
#	* that task itself involves some knowledge that isn't any of the server's
#     business, like importing products from figma
# 	* I guess we could just ship an empty DB within the image?
# 	* Still, I feel that it shouldn't be any of the containers business
#
# 2. the server should just expect it to be there
#	that is, our deployment scripts must create it if there isn't one
#
# Well i don't know... let's FOR NOW just do that manually, a then we'll see

COPY dist dist

COPY server.js .
COPY db db
COPY validators.js .
# we're also going to serve static files with express, FOR NOW

ENV STATIC_PATH=/app/dist
ENV NODE_ENV=production
ENV DB_FILE=/app/db/stripeshop.db
ENV API_PORT=3002

CMD node server.js

EXPOSE 3002

# COPY scripts/setup_prod.sh .
# RUN ./setupd_prod.sh

#COPY . .
#CMD npm run dev
#CMD npx vite --port 3000 --host
#EXPOSE 3000

#VOLUME /db /app