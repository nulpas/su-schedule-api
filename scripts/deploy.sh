#!/bin/bash

set -x

ssh -o "StrictHostKeyChecking no" travis@188.166.18.204 -p 18665 /bin/bash << EOF
  cd /var/www/vaquerosyzapatillas.com/api
  pm2 delete vyz.js -s
  rm -rf *
  rm -rf .*
  git clone https://github.com/nulpas/su-schedule-api.git
  cd su-schedule-api
  yarn
  yarn build
  mv dist/* ../
  mv src/migrations ../
  mv node_modules ../
  mv package.json ../
  mv ecosystem.config.js ../
  cd ../
  rm -rf su-schedule-api
  mv index.js vyz.js
  mv index.js.map vyz.js.map
  export JWT_SECRET=${JWT_SECRET}
  export SALT_ROUNDS=${SALT_ROUNDS}
  export NODE_ENV=${NODE_ENV}
  yarn start:pro
EOF
