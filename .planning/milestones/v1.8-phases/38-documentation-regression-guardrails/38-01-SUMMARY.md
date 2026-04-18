# 38-01 Summary

The new `test/command-surface-coherence.test.js` guards against two drift classes: top-level sacred command refs that should be namespaced, and slash-prefixed adapted labels that are not installed commands. `test/commands.test.js` now also walks nested sacred command files.
