#!/bin/bash

VERSION=`node -e "console.log(require('./package.json').version)"`
TMP_GH_PAGES_DIR=.gh-pages-demo

ember build --prod
git clone https://${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG} ${TMP_GH_PAGES_DIR} > /dev/null 2>&1
cd ${TMP_GH_PAGES_DIR}
git checkout gh-pages
git rm -rf *
cp -r ../dist/* .
git add --all
git commit -m "[ci skip] Automated gh-pages commit of ${VERSION}"
git push origin gh-pages > /dev/null 2>&1
