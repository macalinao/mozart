#!/usr/bin/env sh

eval "$(docker-machine env machineq)"
docker build -t mozart .
docker run -d -p 3000:80 mozart
