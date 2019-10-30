FROM node:10-slim

WORKDIR /src
COPY . /src

RUN rm -rf .env && cp .env.docker .env
RUN npm install
