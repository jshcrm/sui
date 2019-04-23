FROM nginx:alpine
LABEL maintainer="Joshua Crim"

RUN apk add nano
RUN apt install git

RUN git clone git@github.com:jshcrm/sui.git && cp ./sui/* /usr/share/nginx/html

EXPOSE 80
