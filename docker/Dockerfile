FROM ubuntu:14.04
MAINTAINER Joe 
RUN apt-get update
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get -y install dialog 
RUN apt-get -y install apt-utils
RUN apt-get -y install git
RUN apt-get -y install curl
RUN apt-get -y install sudo
RUN curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get -y install nodejs 
RUN npm install gulp -g 
