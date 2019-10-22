#!/bin/bash

set -x
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa

pwd
cd public
git init

git remote add deploy "travis@website.com:/var/www/vaquerosyzapatillas.com/api"
git config user.name "Travis CI"
git config user.email "your.email+travis@gmail.com"

git add .
git commit -m "Deploy"
git push --force deploy master
