#!/bin/bash

set -x

ssh -o "StrictHostKeyChecking no" travis@188.166.18.204 -p 18665 /bin/bash << EOF
  cd /var/www/vaquerosyzapatillas.com/api
  rm -rf *
  rm -rf .*
  git clone https://github.com/nulpas/su-schedule-api.git
  cd su-schedule-api
  yarn
  yarn build
  mv dist/* ../
  mv node_modules ../
  mv package.json ../
  cd ../
  rm -rf su-schedule-api
  yarn start:pro
  pm2 status
EOF

#eval "$(ssh-agent -s)"
#ssh-add ~/.ssh/id_rsa
#
#echo ${TRAVIS_BUILD_DIR}
#pwd
#ls -la ~/.ssh/
#cd public
#git init
#
#git remote add deploy "travis@website.com:/var/www/vaquerosyzapatillas.com/api"
#git config user.name "Travis CI"
#git config user.email "your.email+travis@gmail.com"
#
#git add .
#git commit -m "Deploy"
#git push --force deploy master
