FROM node:8.12

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm config set registry http://registry.npmjs.org/ && npm install

COPY . .

COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 8080
