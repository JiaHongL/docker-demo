FROM ubuntu:14.04
MAINTAINER Joe 
RUN apt-get update
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get -y install dialog 
RUN apt-get -y install apt-utils
RUN apt-get -y install curl
RUN apt-get -y install sudo
RUN curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
RUN apt-get -y install nodejs 
WORKDIR /server
EXPOSE 8080
