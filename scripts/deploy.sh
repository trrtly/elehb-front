#!/bin/bash
TARGET_DIR=/data/webroot/product/elehb-front

if [[ $TRAVIS_BRANCH == "master" ]];then
  TARGET_DIR=/data/webroot/test/elehb-front
fi

rsync -r --delete-after --quiet -e "ssh -i ./deploy_key -p 22" ./dist/ root@$SSH_HOST:$TARGET_DIR
