FROM node:0.12-onbuild

# Install docker
RUN apt-get install lxc-docker

# Install compose/machine
RUN curl -L https://github.com/docker/compose/releases/download/1.3.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
RUN curl -L https://github.com/docker/machine/releases/download/v0.3.0/docker-machine_linux-amd64 > /usr/local/bin/docker-machine
RUN chmod +x /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-machine

EXPOSE 3000
