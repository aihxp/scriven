---
description: View or modify project settings.
argument-hint: ""
---

# Settings

You are showing or modifying the project settings.

## Prerequisites

- `.manuscript/config.json` must exist

## What to do

1. Load `.manuscript/config.json`
2. If no arguments, display current settings in a readable format:
   - Work type and group
   - Command unit (how commands adapt)
   - Autopilot profile (if set)
   - Developer mode (on/off)
   - Voice drift threshold
   - Export defaults
3. If the writer wants to change a setting, update `config.json` accordingly
4. Report what changed

## Tone

Straightforward. Settings are utilitarian.
