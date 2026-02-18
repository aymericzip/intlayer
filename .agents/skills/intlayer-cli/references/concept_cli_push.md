---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Push Dictionaries
description: Learn how to push your dictionaries to the Intlayer editor and CMS.
keywords:
  - Push
  - Dictionaries
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - push
---

# Push Dictionaries

```bash
npx intlayer dictionary push
```

If [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) is installed, you can also push dictionaries to the editor. This command will allow to make the dictionaries available to [the editor](https://app.intlayer.org/). By this way, you can share your dictionaries with your team and edit your content without editing the code of your application.

## Aliases:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

## Arguments:

**Dictionary options:**

- **`-d`, `--dictionaries`**: ids of the dictionaries to pull. If not specified, all dictionaries will be pushed.

  > Example: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: ids of the dictionaries to pull (alias for --dictionaries).

  > Example: `npx intlayer dictionary push --dictionary my-dictionary-id my-other-dictionary-id`

**Configuration options:**

- **`--base-dir`**: Specify the base directory for the project. To retrieve the intlayer configuration, the command will look for the `intlayer.config.{ts,js,json,cjs,mjs}` file in the base directory.

  > Example: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Disable the cache.

  > Example: `npx intlayer build --no-cache`

**Environment variables options:**

- **`--env`**: Specify the environment (e.g., `development`, `production`). Useful in the case you use environment variables in your intlayer configuration file.
- **`--env-file`**: Provide a custom environment file to load variables from. Useful in the case you use environment variables in your intlayer configuration file.

  > Example: `npx intlayer dictionary push --env-file .env.production.local`

  > Example: `npx intlayer dictionary push --env production`

**Output options:**

- **`-r`, `--delete-locale-dictionary`**: Skip the question that asking to delete the locales directories once the dictionaries are pushed, and remove them. By default, if the dictionary is defined locally, it will overwrite distant dictionaries content.

  > Example: `npx intlayer dictionary push -r`

  > Example: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: Skip the question that asking to delete the locales directories once the dictionaries are pushed, and keep them. By default, is the dictionary is defined locally, it will overwrite distant dictionaries content.

  > Example: `npx intlayer dictionary push -k`

  > Example: `npx intlayer dictionary push --keep-locale-dictionary`

**Preparation options:**

- **`--build`**: Build the dictionaries before pushing to ensure the content is up to date. True will force the build, false will skip the build, undefined will allow using the cache of the build.

**Log options:**

- **`--verbose`**: Enable verbose logging for debugging. (default to true using CLI)

**Git options:**

- **`--git-diff`**: Only run on dictionaries that includes changes from base (default `origin/main`) to current branch (default: `HEAD`).
- **`--git-diff-base`**: Specify the base reference for git diff (default `origin/main`).
- **`--git-diff-current`**: Specify the current reference for git diff (default: `HEAD`).
- **`--uncommitted`**: Include uncommitted changes.
- **`--unpushed`**: Include unpushed changes.
- **`--untracked`**: Include untracked files.

  > Example: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Example: `npx intlayer dictionary push --uncommitted --unpushed --untracked`
