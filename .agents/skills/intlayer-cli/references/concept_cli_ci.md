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
    changes: Add CI command
---

# CI Command

```bash
npx intlayer ci <command...>
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

```bash
npx intlayer ci fill --verbose --mode complete
```

### Use in CI/CD pipelines

In your CI/CD configuration (e.g., GitHub Actions, GitLab CI), set the `INTLAYER_PROJECT_CREDENTIALS` as a secret:

```yaml
# GitHub Actions example
env:
  INTLAYER_PROJECT_CREDENTIALS: ${{ secrets.INTLAYER_PROJECT_CREDENTIALS }}

steps:
  - name: Fill dictionaries
    run: npx intlayer ci fill
```

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
