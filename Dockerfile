FROM node:12-slim

WORKDIR /src
COPY . /src

RUN rm -rf .env && cp .env.docker .env
RUN npm install

ENV HOST 0.0.0.0