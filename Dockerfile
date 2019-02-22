FROM node:8.15-alpine

# install global dependencies
RUN npm config set registry http://registry.npmjs.org/
RUN npm install -g http-server
RUN apk add --no-cache dos2unix

WORKDIR /usr/src/app

# install dependencies
COPY package*.json ./
RUN npm install

COPY . .

# add entrypoint
RUN dos2unix docker-entrypoint.sh
COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["sh", "docker-entrypoint.sh"]
