#!/bin/bash

set -x

ssh -o "StrictHostKeyChecking no" travis@188.166.18.204 -p 18665
cd /var/www/vaquerosyzapatillas.com/api
mkdir pollas


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
