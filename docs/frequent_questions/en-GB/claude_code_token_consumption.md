---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: How to limit Claude Code token consumption to generate translations
description: Why translating with Claude Code burns tokens, what Intlayer does instead (filters translated keys, chunks JSON, translates markdown block by block), and how to reuse your Claude subscription with claude setup-token.
keywords:
  - claude code
  - tokens
  - token consumption
  - setup-token
  - i18n
  - internationalisation
  - translation
  - fill
  - mcp
  - agent
slugs:
  - frequent-questions
  - claude-code-token-consumption
author: aymericzip
---

# How to limit Claude Code token consumption to generate translations

## Problem Description

Asking Claude Code (or any coding agent) to translate your content is the most expensive way to do it. For each run, the agent has to:

- Load the complete JSON or content file into its context, even the keys that are already translated.
- Search the related files to figure out where the content lives and how it is structured.
- Work out which locales are missing and should be generated.
- Re-read your custom instructions every time ("transform URLs this way", "keep the brand name in English", "use the informal form").
- Rewrite the whole file, including the parts that did not change.

All of that is re-sent on every turn, so the cost grows with `size of the content × number of locales × number of turns`, and any drift in formatting or keys has to be caught by hand.

## What Intlayer does instead

The interest of Intlayer is to do that work outside the agent, with a pipeline built for translation:

- **Filters existing translations** to limit token usage. Keys already translated in your JSON are stripped out, and only the missing ones are sent to the model.
- **Translates markdown block by block.** For documentation, [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/doc-translate.md) and [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/doc-review.md) compare each block with the base document and skip the blocks that are already translated or unchanged.
- **Chunks your JSON** if it is too large, to stay in the best part of the context window.
- **Flattens and reconstructs your JSON** to optimise token consumption.
- **Inserts custom prompts** for specific rules regarding your brand and wording (`applicationContext`, `--custom-instructions`), so you write them once instead of repeating them in every conversation.
- **Validates the structure** to ensure consistency and prevent key drift, and preserves formatting (markdown, HTML, insertions, plurals).
- **Implements retry management** when the output is malformed.
- **Queues and parallelises requests** across files, chunks and locales to increase speed.

None of that goes through the agent's context. The rule of thumb: let the agent decide **what** to internationalise, and let Intlayer do the repetitive work.

## Solution

### 1. Delegate extraction to `intlayer extract`

Instead of asking the agent to rewrite each component by hand, let it run the [`extract`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/extract.md) command. It moves hard-coded strings into a `.content` file next to the component without loading the whole file into the agent's context.

```bash
npx intlayer extract --file src/components/Header.tsx
```

### 2. Delegate translation to `intlayer fill`

Never ask the agent to translate. The [`fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/fill.md) command applies the pipeline above: it only sends the missing keys, chunks them, runs the locales in parallel and writes the result back into your content files.

```bash
npx intlayer fill
```

A few flags keep the run small:

- `--git-diff` (or `--uncommitted`) only processes the dictionaries changed in the current branch.
- `--file` or `--keys` targets specific content files.
- `--output-locales fr es` limits the run to the locales you actually need now.
- `--skip-metadata` skips title, description and tags generation.
- `--data-serialization toon` sends a more compact payload to the model (fewer tokens, slightly less consistent output).

```bash
npx intlayer fill --git-diff --output-locales fr es --skip-metadata
```

### 3. Translate markdown with `doc translate` and `doc review`

Asking an agent to translate a `.md` file means pasting the whole document, for every locale, on every change. The [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/doc-translate.md) and [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/doc-review.md) commands work block by block instead.

Use `doc translate` when the translated file does not exist yet. It chunks the markdown, translates it in parallel and writes the target files:

```bash
npx intlayer doc translate --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

Use `doc review` when the translated file already exists. It compares each block with the base document, skips the blocks that are already translated or unchanged, and only sends the diverging ones:

```bash
npx intlayer doc review --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

Both commands accept your rules once, instead of you repeating them in every prompt:

```bash
npx intlayer doc translate --custom-instructions "Do not translate URLs. Keep the markdown structure and the code blocks untouched."
```

Two modes of `doc review` are useful when the agent still needs to be in the loop, without any AI call from Intlayer:

- `--mode report` logs the blocks that need attention, with line numbers, so the agent only touches those blocks.
- `--mode synthesis` only logs which documents are up to date and which still have blocks to edit.

```bash
npx intlayer doc review --mode report --locales fr
```

### 4. Let the agent call the CLI through the MCP server

With the [Intlayer MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/mcp_server.md), the agent answers from the current documentation and runs `intlayer fill` or `intlayer doc review` itself instead of re-implementing it in the conversation.

```bash
claude mcp add intlayer npx -y @intlayer/mcp
```

Installing the [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/agent_skills.md) with `npx intlayer init skills` also stops the agent from guessing the Intlayer API and re-reading the docs on every task.

### 5. Reuse your Claude subscription with `claude setup-token`

Running the i18n setup in your interactive Claude Code session keeps the whole conversation history in context. Move the heavy lifting to a short headless session instead.

Generate a long-lived token from your Claude subscription:

```bash
claude setup-token
```

Store it as `CLAUDE_CODE_OAUTH_TOKEN` (in a `.env` file or your CI secrets), then reuse it for a one-shot session that runs the Intlayer commands:

```bash
CLAUDE_CODE_OAUTH_TOKEN=... claude -p "Run npx intlayer extract on src/components, then npx intlayer fill --uncommitted"
```

The session only carries that prompt and the command output, not your whole conversation. The same token works in the [Claude Code GitHub Action](https://github.com/anthropics/claude-code-action) to run `intlayer fill` on every pull request.

> The token issued by `claude setup-token` authenticates Claude Code only. It cannot be used as an Anthropic API key in `ai.apiKey`. For the translation itself, `intlayer fill` uses your [Intlayer account](https://app.intlayer.org) (free tier included) or your own provider key configured in [`ai`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md#ai-configuration).

## Summary

| Task                    | Who does it              | Tokens in the agent context |
| ----------------------- | ------------------------ | --------------------------- |
| Decide what to localise | Claude Code              | Low                         |
| Extract strings         | `intlayer extract`       | None                        |
| Translate content       | `intlayer fill`          | None                        |
| Translate documentation | `intlayer doc translate` | None                        |
| Update documentation    | `intlayer doc review`    | None                        |
| Run the commands        | Headless Claude Code     | Prompt + command output     |
