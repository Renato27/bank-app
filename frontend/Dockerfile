FROM node:18 as build-stage

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y bash git apt-utils

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build


FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY /docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
