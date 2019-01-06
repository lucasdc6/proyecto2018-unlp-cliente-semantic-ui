FROM node:lts as builder

LABEL maintainer="Lucas Di Cunzolo <lucasdicunzolo@gmail.com>"

WORKDIR /usr/src/app

COPY . .

RUN yarn && \
    yarn build

FROM nginx:1.13.12-alpine
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
