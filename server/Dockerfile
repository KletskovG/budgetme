FROM node:12-alpine

# Create app dir
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY dist/index.js dist/index.js

EXPOSE 4200

CMD ["node", "dist/index.js"];