#!/bin/sh

DIST=$1
shift

if [ "$DIST" == "" ]; then
    DIST=spa
fi

CWD=$(pwd)
LWD="$( cd "$( dirname "$0}" )" >/dev/null 2>&1 && pwd )"
cd $LWD/..

GITBRANCH=`git rev-parse --abbrev-ref HEAD`
export GITCOMMIT=`git rev-parse HEAD | head -c 8`

rm -rf dist
mkdir -p "dist/git-$DIST"
cd "dist/git-$DIST"
git clone https://github.com/Stinger911/ds-test.git .
git branch -m gh-pages
cd ../..
GITCOMMIT=$GITCOMMIT npx quasar build -m $DIST
cd "dist/git-$DIST"
rm -rf .
cp -r ../$DIST/ ./
git add .
git commit -m "$DIST release for $GITBRANCH/$GITCOMMIT"
git push --set-upstream origin gh-pages
cd $CWD
