FROM node:alpine as build

RUN mkdir -p /certs 

COPY ./certs/domain.crt /certs/domain.crt
COPY ./certs/domain.key /certs/domain.key

COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build


FROM nginx:stable-alpine

COPY --from=build /build /usr/share/nginx/html
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /certs/ /etc/nginx/certs
EXPOSE 3000
CMD [ "nginx", "-g", "daemon off;" ]