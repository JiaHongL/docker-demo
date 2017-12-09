FROM ubuntu:14.04
MAINTAINER Joe 
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update
RUN apt-get -y install dialog 
RUN apt-get -y install apt-utils
RUN apt-get -y install curl
RUN apt-get -y install sudo
RUN curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
RUN apt-get -y install nodejs 
RUN npm install gulp@3.9.1 -g 
WORKDIR /app
EXPOSE 3000 35729

