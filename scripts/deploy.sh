#!/bin/bash

set -x

ssh -o "StrictHostKeyChecking no" travis@188.166.18.204 -p 18665 /bin/bash << EOF
  cd /var/www/vaquerosyzapatillas.com/api
  docker login repo.treescale.com --username=nulpas --password=$TREESCALE_PS
  docker rm vyz --force
  docker pull repo.treescale.com/nulpas/vyz-api:latest
  docker run --name vyz -d -p 4001:4001 --network="host" repo.treescale.com/nulpas/vyz-api:latest
EOF
