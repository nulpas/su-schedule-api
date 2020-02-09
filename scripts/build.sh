#!/bin/bash

cp -R src/migrations dist
cp package.json dist
cp dist/index.js dist/vyz.js
cp dist/index.js.map dist/vyz.js.map
rm -rf dist/swagger.yml
