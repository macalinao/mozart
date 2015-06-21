#!/usr/bin/env sh

eval "$(docker-machine env machineq)"
docker build -t mozart .
docker run -d -P mozart
