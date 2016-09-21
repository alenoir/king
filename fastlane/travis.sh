#!/bin/sh

# npm i

if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]; then
  #fastlane test
  exit $?
fi

fastlane ios beta
