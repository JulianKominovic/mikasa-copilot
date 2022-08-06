#!/bin/bash
npm i jsdom --production
forever stopall
git fetch
git reset --hard HEAD
git merge origin/master
HOST=192.168.1.39 PORT=5000 forever start dist