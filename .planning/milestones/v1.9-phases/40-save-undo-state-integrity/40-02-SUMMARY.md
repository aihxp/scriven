# 40-02 Summary

`save.md` now writes the `save` action row before staging and committing `.manuscript/`, so successful saves leave the worktree clean. `undo.md` now captures `{target hash}` from `git log -1 --format="%H|%s" .manuscript/`, applies `git revert {target hash} --no-commit`, updates `STATE.md`, then creates one final undo commit that includes both the revert and the state update.
