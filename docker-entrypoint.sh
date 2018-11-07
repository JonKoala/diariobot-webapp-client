#!/bin/bash

npm run build:simple
http-server dist -g -p $DIARIOBOT_CLIENT_PORT
