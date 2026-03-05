FROM node:alpine as build

COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine

# COPY --from=build /dist /usr/share/nginx/html
# COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf
RUN npm install -g serve
RUN serve build
EXPOSE 3000
CMD [ "nginx", "-g", "daemon off;" ]