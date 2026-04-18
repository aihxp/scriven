# 36-02 Summary

`generateSkillManifest()` now builds from the same `collectCommandEntries()` inventory that runtime installers use. This removed duplicate sacred rows such as `/scr:concordance` versus `/scr:sacred:concordance`, and `test/installer.test.js` now locks that behavior.
