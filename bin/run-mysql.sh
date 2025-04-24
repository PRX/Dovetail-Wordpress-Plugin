#!/usr/bin/env bash

set -a && source .env && set +a

docker exec -t \
  -i "dovetail-wordpress-plugin-${DB_HOST}-1" /bin/bash \
  -c "mysql -u${DB_USER} -p${DB_PASSWORD} ${DB_NAME}"
