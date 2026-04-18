# 40-01 Summary

Phase 40 defined save and undo as clean manuscript checkpoints. The chosen contract is that `.manuscript/STATE.md` must be updated inside the same checkpoint commit, and undo must target the explicit latest `.manuscript/` commit rather than assuming `HEAD`.
