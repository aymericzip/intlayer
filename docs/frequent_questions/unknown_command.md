---
docName: unknown_command
url: https://intlayer.org/doc/faq/unknown-command
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/frequent_questions/unknown_command.md
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Unknown command
description: Learn how to fix the unknown command error.
keywords:
  - unknown
  - command
  - error
  - intlayer
  - fill
  - build
  - verbose
  - terminal
  - restart
  - local
---

# error: unknown command fill / build / etc

If `npx intlayer fill --verbose` gives:

```
error: unknown command 'fill'
```

but you're sure the `fill` command _should_ exist, here are the steps to resolve it:

## 1. **Ensure you're using the latest version**

Run:

```bash
npx intlayer --version                  # current locale intlayer version
npx intlayer@latest --version           # current latest intlayer version
```

This forces `npx` to pull the most recent version. Then try again:

```bash
npx intlayer@latest build --verbose
```

## 2. **Check if the command is registered**

You can check with:

```bash
npx intlayer --help                     # provide informations related to the commands
```

See if the command appears in the command list.

Go to the repo, and confirm that your command is exported and registered in the CLI entry point. Intlayer used `commander` as framework.

Code regarding the CLI:
https://github.com/aymericzip/intlayer/blob/main/packages/%40intlayer/cli/src/cli.ts

## 4. **Restart your terminal**

Sometimes a terminal restart is needed to recognize new commands.

## 5. **If you’re developing `intlayer`, rebuild and link it**

If you're developing `intlayer` locally:

```bash
# In the intlayer directory
npm install
npm run build
npm link
```

Then in another terminal:

```bash
intlayer fill --verbose
```

This uses the local version you’re working on.

## 6. **Clear npx cache (if you're stuck with an older version)**

```bash
npx clear-npx-cache
```

Or manually delete cached intlayer packages:

```bash
rm -rf ~/.npm/_npx
```

Check equivalent if you use pnpm, yarn, bun or other package manager
