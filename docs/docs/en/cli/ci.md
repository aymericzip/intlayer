---
createdAt: 2026-01-06
updatedAt: 2026-01-06
title: CI Command
description: Learn how to use the Intlayer CI command to run Intlayer commands with auto-injected credentials in CI/CD pipelines and monorepos.
keywords:
  - CI
  - CI/CD
  - Automation
  - Monorepo
  - Credentials
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - ci
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: "Add CI command"
author: aymericzip
---

# CI Command

```bash packageManager="npm"
npx intlayer ci <command...>
```

```bash packageManager="yarn"
yarn intlayer ci <command...>
```

```bash packageManager="pnpm"
pnpm intlayer ci <command...>
```

```bash packageManager="bun"
bun x intlayer ci <command...>
```

The CI command is designed for automation and CI/CD pipelines. It automatically injects credentials from the `INTLAYER_PROJECT_CREDENTIALS` environment variable and can run Intlayer commands across multiple projects in a monorepo.

## How it works

The CI command operates in two modes:

1. **Single Project Mode**: If the current working directory matches one of the project paths in `INTLAYER_PROJECT_CREDENTIALS`, it runs the command for that specific project only.

2. **Iteration Mode**: If no specific project context is detected, it iterates over all configured projects and runs the command for each one.

## Environment Variable

The command requires the `INTLAYER_PROJECT_CREDENTIALS` environment variable to be set. This variable should contain a JSON object mapping project paths to their credentials:

```json
{
  "packages/app": {
    "clientId": "your-client-id-1",
    "clientSecret": "your-client-secret-1"
  },
  "packages/admin": {
    "clientId": "your-client-id-2",
    "clientSecret": "your-client-secret-2"
  }
}
```

## Package Manager Detection

The CI command automatically detects which package manager is being used (npm, yarn, pnpm, or bun) based on the `npm_config_user_agent` environment variable and uses the appropriate command to execute Intlayer.

## Arguments

- **`<command...>`**: The Intlayer command to execute (e.g., `fill`, `push`, `build`). You can pass any Intlayer command and its arguments.

  > Example: `npx intlayer ci fill --verbose`
  >
  > Example: `npx intlayer ci push`
  >
  > Example: `npx intlayer ci build`

## Examples

### Run a command in single project mode

If you're in a project directory that matches one of the paths in `INTLAYER_PROJECT_CREDENTIALS`:

```bash
cd packages/app
npx intlayer ci fill
```

This will run the `fill` command with credentials automatically injected for the `packages/app` project.

### Run a command across all projects

If you're in a directory that doesn't match any project path, the command will iterate over all configured projects:

```bash
cd /path/to/monorepo
npx intlayer ci push
```

This will run the `push` command for each project configured in `INTLAYER_PROJECT_CREDENTIALS`.

### Pass additional flags

You can pass any flags to the underlying Intlayer command:

```bash packageManager="npm"
npx intlayer ci fill --verbose --mode complete
```

```bash packageManager="yarn"
yarn intlayer ci fill --verbose --mode complete
```

```bash packageManager="pnpm"
pnpm intlayer ci fill --verbose --mode complete
```

```bash packageManager="bun"
bun x intlayer ci fill --verbose --mode complete
```

### Use in CI/CD pipelines

Running `intlayer init` scaffolds two ready-to-use GitHub Actions workflows for you (see [Scaffolded GitHub Actions](#scaffolded-github-actions) below). The example here shows the equivalent setup using the `ci` command for a monorepo, where credentials are injected per project from `INTLAYER_PROJECT_CREDENTIALS`.

> **AI access**: The `fill` command needs AI access to generate translations. The credentials injected by `ci` from `INTLAYER_PROJECT_CREDENTIALS` (Intlayer CMS access keys) grant AI access through the Intlayer backend, so no separate AI provider key is required. If you prefer to use your own provider key instead, pass `--provider`, `--model`, and `--api-key` to `intlayer ci fill`. The `test` command does not require AI access.

```yaml fileName=".github/workflows/intlayer-ci.yml"
name: Intlayer CI

on:
  pull_request:
    branches:
      - main

permissions:
  contents: write
  pull-requests: write

jobs:
  intlayer:
    runs-on: ubuntu-latest
    env:
      # CMS access keys per project. They also grant AI access for `fill`.
      INTLAYER_PROJECT_CREDENTIALS: ${{ secrets.INTLAYER_PROJECT_CREDENTIALS }}
    steps:
      - name: ⬇️ Checkout repository
        uses: actions/checkout@v4
        with:
          persist-credentials: true
          fetch-depth: 0

      - name: 🟢 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: 📦 Install dependencies
        run: npm ci

      - name: 🤖 Fill missing translations
        run: npx intlayer ci fill --git-diff --mode complete

      - name: 🧪 Test for missing translations
        run: npx intlayer ci test
```

## Scaffolded GitHub Actions

When you run `intlayer init`, Intlayer detects your package manager (npm, yarn, pnpm, or bun) and scaffolds two GitHub Actions workflows under `.github/workflows/`, with commands matching that package manager:

- **`intlayer-fill.yml`** — On every pull request, builds the dictionaries and runs `intlayer fill --git-diff --mode complete` to generate missing translations for the changed dictionaries, then commits the result back to the PR branch.
- **`intlayer-test.yml`** — On every pull request, builds the dictionaries and runs `intlayer test`, failing the check when required locales are missing translations.

Existing workflow files are never overwritten. To skip scaffolding entirely, run:

```bash
npx intlayer init --no-github-actions
```

### Providing AI access to the fill workflow

The scaffolded `intlayer-fill.yml` requires AI access. Two options are available (configured in the workflow's `env` block):

1. **Your own AI provider key** — Add an `AI_API_KEY` secret in your repository settings (Settings → Secrets and variables → Actions). The workflow forwards it via `--provider`, `--model`, and `--api-key`.
2. **Intlayer CMS access keys** — Add `INTLAYER_CLIENT_ID` and `INTLAYER_CLIENT_SECRET` secrets and wire them into your `intlayer.config` `editor` section. CMS access keys grant AI access through the Intlayer backend.

The `intlayer-test.yml` workflow does not require any AI access.

## Error Handling

- If `INTLAYER_PROJECT_CREDENTIALS` is not set, the command will exit with an error.
- If `INTLAYER_PROJECT_CREDENTIALS` is not valid JSON, the command will exit with an error.
- If a project path doesn't exist, it will be skipped with a warning.
- If any project fails, the command will exit with a non-zero status code.

## Use Cases

- **Monorepo automation**: Run Intlayer commands across multiple projects in a monorepo
- **CI/CD pipelines**: Automate dictionary management in continuous integration workflows
- **Bulk operations**: Perform the same operation on multiple Intlayer projects at once
- **Secret management**: Securely manage credentials for multiple projects using environment variables

## Security Best Practices

- Store `INTLAYER_PROJECT_CREDENTIALS` as encrypted secrets in your CI/CD platform
- Never commit credentials to version control
- Use environment-specific credentials for different deployment environments
- Rotate credentials regularly
