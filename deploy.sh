#!/usr/bin/env sh

eval "$(docker-machine env machineq)"
docker build -t mozart .
docker stop $(docker ps -a -q)
docker run -d -p 80:3000 mozart
