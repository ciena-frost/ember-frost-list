#!/bin/bash

source $(npm root -g)/pr-bumper/.travis/is-bump-commit.sh

if isBumpCommit
then
  echo "Skipping coverage check for version bump commit"
  exit 0
fi

if [ "$TRAVIS_NODE_VERSION" != "6.9.1" ]
then
  echo "Skipping coverage check for TRAVIS_NODE_VERSION ${TRAVIS_NODE_VERSION}"
  exit 0
fi

if [ "$EMBER_TRY_SCENARIO" != "default" ]
then
  echo "Skipping coverage check for EMBER_TRY_SCENARIO ${EMBER_TRY_SCENARIO}"
  exit 0
fi

pr-bumper check-coverage
