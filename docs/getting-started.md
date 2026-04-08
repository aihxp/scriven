# Getting Started with Scriven

Go from zero to a drafted scene in under 10 minutes. This guide walks you through installation, project setup, and your first draft.

Want evidence first? Start with [Proof Artifacts](proof-artifacts.md). The watchmaker sample flow and the Voice DNA before/after bundle give you the fastest way to inspect what Scriven actually proves today.

## Prerequisites

- **An AI coding agent** -- Claude Code, Cursor, Gemini CLI, or another current Scriven installer target
- **Node.js 20+** -- needed for the installer only
- That's it. No other dependencies for the core writing workflow.

Before choosing a runtime, check [Runtime Support](runtime-support.md) for the current installer targets, install types, support levels, and verification status.

## Step 1: Install Scriven

Run the installer in your terminal:

```
npx scriven-cli@latest
```

This installs Scriven's slash commands into your AI agent. The installer auto-detects current runtime paths (Claude Code, Cursor, Gemini CLI, and other listed installer targets) and places everything where your agent expects it. Takes about 30 seconds.

Once installed, every `/scr:` command is available inside your agent's chat.

## Step 2: Explore the Demo (Optional)

Not sure what Scriven does? Try the demo before starting your own project:

```
/scr:demo
```

This creates a pre-built short story project -- a retired watchmaker who receives a letter from a daughter he never knew. The demo includes:

- 4 fully drafted scenes with distinct voice and style
- A complete voice profile (STYLE-GUIDE.md)
- Character files, plot graph, and thematic threads
- Editor notes on one scene so you can see the revision workflow
- 1 planned-but-undrafted scene so you can watch the drafter work

Explore at your own pace. When you're ready to start your own work, run `/scr:demo --clear` to clean up.

If you want a curated reading path instead of jumping straight into the demo files, open [Proof Artifacts](proof-artifacts.md) first. It maps the watchmaker sample to the exact files worth inspecting.

## Step 3: Start Your Project

Create a new writing project:

```
/scr:new-work
```

Scriven asks just 3 questions -- what you're writing, your premise, and whether you have existing material. That's it. No long setup forms, no configuration wizards.

From your answers, Scriven generates your project structure:

```
.manuscript/
  WORK.md          -- your project's identity
  OUTLINE.md       -- structure and unit breakdown
  STYLE-GUIDE.md   -- your Voice DNA profile
  CHARACTERS.md    -- cast and voice anchors
  THEMES.md        -- thematic threads
  PLOT-GRAPH.md    -- story arc and beats
  STATE.md         -- workflow position tracker
  config.json      -- project settings
```

Every file adapts to your work type. Writing a screenplay? You get acts and scenes. A research paper? Sections and argument maps. A Quran commentary? Surahs and doctrinal frameworks. Scriven supports 46 work types with tradition-native vocabulary.

## Step 4: Develop Your Story

Before drafting, shape your ideas:

```
/scr:discuss
```

This opens a collaborative conversation where you and the AI work through the creative decisions for your next unit -- pacing, voice, character dynamics, what to include, what to avoid. Scriven picks the 3-4 most relevant questions for your specific scene rather than running through a checklist.

Your decisions get saved to a context file that the drafter will use. Think of this as giving the drafter its marching orders.

If you'd rather jump straight to drafting, that works too -- Scriven will use sensible defaults from your voice profile.

## Step 5: Write Your First Draft

Draft your first unit:

```
/scr:draft
```

The drafter loads your Voice DNA (STYLE-GUIDE.md) and writes in your voice, not generic AI prose. Each atomic unit (scene, beat, passage) is drafted in a fresh context to prevent voice drift and keep quality consistent across the entire work.

After drafting, Scriven runs a voice-check pass to flag anything that drifted from your established style. You'll see a summary like: "Drafted Chapter 1: 2,400 words across 3 scenes. Voice consistency: 94%."

Your draft files appear in `.manuscript/` ready for you to read and revise.

## What's Next

Not sure what to do? There's one command that always knows:

```
/scr:next
```

`/scr:next` reads your project state and runs the right next step automatically. A writer who only ever types `/scr:next` can complete an entire manuscript from start to finish.

Beyond the core workflow, Scriven offers:

- **Revision** -- `/scr:editor-review`, `/scr:line-edit`, `/scr:continuity-check`
- **Publishing** -- `/scr:publish`, `/scr:export`, `/scr:cover-art`, `/scr:blurb`
- **Collaboration** -- `/scr:save`, `/scr:history`, `/scr:compare`
- **Navigation** -- `/scr:help`, `/scr:next`, `/scr:pause-work`

For the full command list, see [Command Reference](command-reference.md).
