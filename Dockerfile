FROM node:21-alpine AS builder

RUN mkdir /app

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./

RUN npm install

COPY . ./

EXPOSE 4000

CMD ["npm", "run", "start:prod"]