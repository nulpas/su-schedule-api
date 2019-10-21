#!/bin/bash

#if [ $NODE_ENV == 'production' ] ; then
  openssl aes-256-cbc -K $encrypted_d80369b7a19f_key -iv $encrypted_d80369b7a19f_iv -in travis_rsa.enc -out travis_rsa -d
#fi
