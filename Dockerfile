FROM node:8.12

WORKDIR /usr/src/app

# install dependencies
COPY package*.json ./
RUN npm config set registry http://registry.npmjs.org/ && npm install

COPY . .

# add entrypoint
RUN apt-get update
RUN apt-get install dos2unix
RUN dos2unix docker-entrypoint.sh
COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["sh", "docker-entrypoint.sh"]

EXPOSE 8080
