---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Translate Document
description: Learn how to automatically translate documentation files using AI translation services.
keywords:
  - Translate
  - Document
  - Documentation
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-translate
---

# Translate Document

The `doc translate` command automatically translates documentation files from a base locale to target locales using AI translation services.

## Key Points:

- Split large markdown files into chunks to stay within the AI model's context window limits.
- Retry translation if the output format is incorrect.
- Incorporates application and file-specific context for improved translation accuracy.
- Preserves existing translations by not overwriting them.
- Processes files, chunks, and locales in parallel using a queue system to increase speed.

```bash
npx intlayer doc translate
```

## Arguments:

**File list options:**

- **`--doc-pattern [docPattern...]`**: Glob patterns to match documentation files to translate.

  > Example: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Glob patterns to exclude from translation.

  > Example: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Skip the file if it has been modified before the specified time.
  - Can be an absolute time such as "2025-12-05" (string or Date)
  - Can be a relative time in ms `1 * 60 * 60 * 1000` (1 hour)
  - This option checks the update time of the file using the `fs.stat` method. Therefore, it could be affected by Git or other tools that modify the file.

  > Example: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Skip the file if it has been modified within the specified time.
  - Can be an absolute time such as "2025-12-05" (string or Date)
  - Can be a relative time in ms `1 * 60 * 60 * 1000` (1 hour)
  - This option checks the update time of the file using the `fs.stat` method. Therefore, it could be affected by Git or other tools that modify the file.

  > Example: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: Skip the file if it already exists.

  > Example: `npx intlayer doc translate --skip-if-exists`

**Entry output options:**

- **`--locales [locales...]`**: Target locales to translate the documentation into.

  > Example: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: Source locale to translate from.

  > Example: `npx intlayer doc translate --base-locale en`

**File processing options:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Number of files to process simultaneously for translation.

  > Example: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**AI options:**

- **`--model [model]`**: The AI model to use for translation (e.g., `gpt-3.5-turbo`).
- **`--provider [provider]`**: The AI provider to use for translation.
- **`--temperature [temperature]`**: Temperature setting for the AI model.
- **`--api-key [apiKey]`**: Provide your own API key for the AI service.
- **`--application-context [applicationContext]`**: Provide additional context for the AI translation.
- **`--custom-prompt [prompt]`**: Customise the base prompt used for translation. (Note: For most use cases, the `--custom-instructions` option is recommended instead as it provides better control over translation behaviour.)

  > Example: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**Environment variables options:**

- **`--env`**: Specify the environment (e.g., `development`, `production`).
- **`--env-file [envFile]`**: Provide a custom environment file to load variables from.
- **`--base-dir`**: Specify the base directory for the project.
- **`--no-cache`**: Disable the cache.

  > Example: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**Log options:**

- **`--verbose`**: Enable verbose logging for debugging. (defaults to true when using CLI)

  > Example: `npx intlayer doc translate --verbose`

**Custom instructions options:**

- **`--custom-instructions [customInstructions]`**: Custom instructions added to the prompt. Useful for applying specific rules regarding formatting, URL translation, etc.
  - Can be an absolute time such as "2025-12-05" (string or Date)
  - Can be a relative time in ms `1 * 60 * 60 * 1000` (1 hour)
  - This option checks the update time of the file using the `fs.stat` method. Therefore, it could be affected by Git or other tools that modify the file.

  > Example: `npx intlayer doc translate --custom-instructions "Avoid translating URLs, and keep the markdown format"`

  > Example: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Git options:**

- **`--git-diff`**: Only run on dictionaries that include changes from the base (default `origin/main`) to the current branch (default: `HEAD`).
- **`--git-diff-base`**: Specify the base reference for git diff (default `origin/main`).
- **`--git-diff-current`**: Specify the current reference for git diff (default: `HEAD`).
- **`--uncommitted`**: Include uncommitted changes.
- **`--unpushed`**: Include unpushed changes.
- **`--untracked`**: Include untracked files.

  > Example: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Example: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> Note that the output file path will be determined by replacing the following patterns
>
> - `/{{baseLocale}}/` with `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` with `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` with `_{{locale}}.`
> - `{{baseLocale}}_` with `{{locale}}_`
> - `.{{baseLocaleName}}.` with `.{{localeName}}.`
>
> If the pattern is not found, the output file will add `.{{locale}}` to the file extension. For example, `./my/file.md` will be translated to `./my/file.fr.md` for the French locale.
