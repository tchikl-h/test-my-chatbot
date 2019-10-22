FROM node:12-slim

WORKDIR /src
COPY . /src

RUN rm -rf .env && cp .env.docker .env
RUN apt-get update && apt-get install python build-essential -y
RUN npm install
RUN npm uninstall node-sass && npm install node-sass