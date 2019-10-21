#!/bin/bash
set -x
if [ $TRAVIS_BRANCH == 'master' ] ; then
    echo 'Deploy ready'
else
    echo "Not deploying, since this branch isn't master."
fi
