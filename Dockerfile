FROM nginx:alpine
LABEL maintainer="Joshua Crim"

RUN apk add nano git

RUN git clone https://github.com/jshcrm/sui.git && cp -r ./sui/* /usr/share/nginx/html

EXPOSE 80
