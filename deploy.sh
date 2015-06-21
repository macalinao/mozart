#!/usr/bin/env sh

eval "$(docker-machine env machineq)"
docker stop $(docker ps -a -q)
docker build -t mozart .
docker run -d -p 80:3000 mozart
