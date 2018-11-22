#!/bin/bash

npm run build
http-server dist -g -p $DIARIOBOT_CLIENT_PORT
