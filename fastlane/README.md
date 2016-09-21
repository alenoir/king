fastlane documentation
================
# Installation
```
sudo gem install fastlane
```
# Available Actions
## Android
### android build
```
fastlane android build
```
Deploy a new version to the Google Play Store
### android beta
```
fastlane android beta
```


----

## iOS
### ios build
```
fastlane ios build
```
Responsible for building and signing the app
### ios beta
```
fastlane ios beta
```
Build and upload a new build to Apple TestFlight

This action will also do a build version bump and push it to git.

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [https://fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [GitHub](https://github.com/fastlane/fastlane/tree/master/fastlane).