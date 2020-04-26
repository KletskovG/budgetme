FROM node:12-alpine as build-stage
WORKDIR /
RUN ls -la
COPY package*.json /
RUN npm install
COPY ./ /
ARG configuration=production
RUN npm run build

FROM nginx:1.15
COPY --from=build-stage /build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf