---
createdAt: 2025-12-30
updatedAt: 2026-09-29
priority: 5
title: "intlayer init: Set Up Intlayer in Your Project"
description: "Run intlayer init to add Intlayer to an existing project: it detects your framework, installs packages and writes the configuration files."
keywords:
  - Initialize
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 9.5.13
    date: 2026-09-29
    changes: "init only installs the packages and sets up the framework; add one sub-command per setup step; --interactive fails without a terminal"
  - version: 9.5.6
    date: 2026-09-21
    changes: "Add init infra sub-command"
  - version: 8.6.4
    date: 2026-03-31
    changes: "Add --no-gitignore option"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Add init command"
author: aymericzip
---

# Initialize Intlayer

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

The `init` command installs the Intlayer packages and sets up your framework (configuration file, TypeScript, bundler plugin, middleware/proxy, providers). It's the recommended way to get started with Intlayer.

Everything else (CI workflows, AI skills, MCP server, editor tooling, lint rules, CMS, infrastructure) is opt-in: pick it from the `--interactive` checklist, or run its [dedicated sub-command](#set-up-one-step-at-a-time).

## Aliases:

- `npx intlayer init`

## Arguments:

- `--project-root [projectRoot]` - Optional. Specify the project root directory. If not provided, the command will search for the project root starting from the current working directory.
- `--no-gitignore` - Optional. Skip the automatic update of the `.gitignore` file. If this flag is set, `.intlayer` will not be added to `.gitignore`.
- `--no-framework-setup` - Optional. Only install the packages, without touching the project files.
- `--routing <routing>` - Optional. Locale routing: `prefix-no-default` (default), `prefix-all`, `no-prefix`, `search-params` or `none`.
- `-i, --interactive` - Optional. Pick the setup steps from a checklist (packages, CI, skills, MCP, VS Code, LSP, lint, CMS, infrastructure, …) instead of running the default set. Needs a terminal: without one (AI agent, CI), the command fails and lists the sub-commands to run instead.
- `--no-github-actions` - Optional. With `--interactive`, never scaffold the GitHub Actions workflows, even if selected.

## What it does:

The `init` command performs the following setup tasks:

1. **Validates project structure** - Ensures you're in a valid project directory with a `package.json` file
2. **Installs the packages** - Installs the missing Intlayer packages for your stack (e.g. `react-intlayer`, `vite-intlayer`) and upgrades the outdated ones
3. **Updates `.gitignore`** - Adds `.intlayer` to your `.gitignore` file to exclude generated files from version control (can be skipped with `--no-gitignore`)
4. **Configures TypeScript** - Updates all `tsconfig.json` files to include Intlayer type definitions (`.intlayer/**/*.ts`)
5. **Creates configuration file** - Generates an `intlayer.config.ts` (for TypeScript projects) or `intlayer.config.mjs` (for JavaScript projects) with default settings
6. **Updates the bundler / framework config** - Adds the Intlayer plugin to your Vite, Next.js, Nuxt, Astro, … configuration, and scaffolds the middleware/proxy and providers when the framework supports it

## Set up one step at a time

Every step of the `--interactive` checklist has its own sub-command. They never prompt when their values are passed as flags, so they are safe to run from an AI agent or a CI job.

| Command                                                               | What it sets up                                                                              |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `intlayer init packages`                                              | Installs the missing Intlayer packages and upgrades the outdated ones                        |
| `intlayer init project [--routing <routing>]`                         | Configuration file, TypeScript, bundler plugin, middleware/proxy, providers and `.gitignore` |
| `intlayer init github-actions`                                        | The `fill` and `test` GitHub Actions workflows                                               |
| `intlayer init vscode-extension`                                      | Recommends the Intlayer extension in `.vscode/extensions.json`                               |
| `intlayer init lsp`                                                   | The Intlayer language server in `.vscode/settings.json`                                      |
| `intlayer init eslint`                                                | The Intlayer lint rules (ESLint / oxlint), when the project already lints                    |
| `intlayer init skills [--platform <platform>] [--skills <skills…>]`   | The Intlayer documentation as AI agent skills                                                |
| `intlayer init mcp [--platform <platform>] [--transport <stdio/sse>]` | The Intlayer MCP server                                                                      |
| `intlayer init extension [--browser <chrome/firefox>]`                | Opens the store page of the Intlayer browser extension                                       |
| `intlayer init cms`                                                   | Logs in to the Intlayer CMS through your browser and stores the credentials in `.env`        |
| `intlayer init infra --mode <desktop/docker/compose>`                 | The desktop app or a self-hosted stack                                                       |

### From an AI agent or a CI job

An AI agent's shell has no terminal, so a prompt cannot be answered. Use the default command, then the sub-commands you need:

```bash
npx intlayer init
npx intlayer init skills --platform Claude
npx intlayer init mcp --platform Claude --transport stdio
```

Without a terminal:

- `init skills` installs the skills matching your stack unless `--skills` is set (e.g. `--skills Usage Content React`).
- `init skills` and `init mcp` use the detected AI platform (Claude Code, Cursor, VS Code, Windsurf, …) unless `--platform` is set, and fail with the list of platforms when none is detected.
- `init mcp` uses the `stdio` transport unless `--transport` is set.
- `init infra` requires `--mode`, and `init extension` only prints the store links unless `--browser` is set.

The MCP server is always configured inside the project (for Claude Code, in `.mcp.json`).

## Examples:

### Basic initialization:

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

This will initialize Intlayer in the current directory, automatically detecting the project root.

### Initialize with custom project root:

```bash packageManager="npm"
npx intlayer init --project-root ./my-project
```

```bash packageManager="yarn"
yarn intlayer init --project-root ./my-project
```

```bash packageManager="pnpm"
pnpm intlayer init --project-root ./my-project
```

```bash packageManager="bun"
bun x intlayer init --project-root ./my-project
```

This will initialize Intlayer in the specified directory.

### Initialize without updating .gitignore:

```bash packageManager="npm"
npx intlayer init --no-gitignore
```

```bash packageManager="yarn"
yarn intlayer init --no-gitignore
```

```bash packageManager="pnpm"
pnpm intlayer init --no-gitignore
```

```bash packageManager="bun"
bun x intlayer init --no-gitignore
```

This will set up all configuration files but will not modify your `.gitignore`.

### Set up the infrastructure (desktop app or self-hosting):

```bash
npx intlayer init infra
```

Downloads and runs the hosted installer (`https://intlayer.org/install.sh`, or `install.ps1` on Windows), which asks how you want to run Intlayer:

- **Desktop app**: installs the native dashboard on your machine, connected to the Intlayer Cloud.
- **All-in-one Docker**: dashboard + API + MongoDB + Redis + MinIO in a single container.
- **Docker Compose**: one container per service, for scalable self-hosting.

Skip the menu with `--mode`:

```bash
npx intlayer init infra --mode compose
```

The same step is offered by `npx intlayer init --interactive`. See the [`init infra` reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/infra.md) for the installer settings, and the [self-hosting guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/self_hosting.md) for what each mode sets up.

- [`init infra` reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/infra.md)
- [self-hosting guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/self_hosting.md)

## Example output:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## Notes:

- The command is idempotent - you can run it multiple times safely. It will skip steps that are already configured.
- If a configuration file already exists, it won't be overwritten.
- TypeScript config files without an `include` array (e.g., solution-style configs with references) are skipped.
- The command will exit with an error if no `package.json` is found in the project root.
