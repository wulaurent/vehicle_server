#!/bin/sh

cd /app

npm link

exec "$@"
