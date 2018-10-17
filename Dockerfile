FROM node:8.12

WORKDIR /app

ADD . /app

RUN npm install

EXPOSE 8080
CMD [ "bash", "npm_start.sh" ]
