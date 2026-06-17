---
createdAt: 2024-08-11
updatedAt: 2026-06-17
title: Review Document
description: Learn how to review documentation files for quality, consistency, and completeness across different locales.
keywords:
  - Review
  - Document
  - Documentation
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
history:
  - version: 9.0.0
    date: 2026-06-17
    changes: "Add --log option"
author: aymericzip
---

# Review Document

The `doc review` command analyses documentation files for quality, consistency, and completeness across different locales.

## Key Points:

- Split large markdown files into chunks to stay within the AI model's context window limits.
- Optimize the chunks to review, and skip the parts that are already translated, and not changed.
- Process files, chunks, and locales in parallel using a queue system to increase speed.

```bash packageManager="npm"
npx intlayer doc review
```

```bash packageManager="yarn"
yarn intlayer doc review
```

```bash packageManager="pnpm"
pnpm intlayer doc review
```

```bash packageManager="bun"
bun x intlayer doc review
```

It can be used to review files that are already translated, and to check if the translation is correct.

For most use cases,

- prefer using the `doc translate` when the translated version of this file is not available.
- prefer using the `doc review` when the translated version of this file already exists.

> Note that the review process consumes more entry tokens than the translate process to review the same file entirely. However, the review process will optimise the chunks to review, and will skip the parts that are not changed.

## Arguments:

**File list options:**

- **`--doc-pattern [docPattern...]`**: Glob patterns to match documentation files to review.

  > Example: `npx intlayer doc review --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Glob patterns to exclude from review.

  > Example: `npx intlayer doc review --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Skip the file if it has been modified before the specified time.
  - Can be an absolute time such as "2025-12-05" (string or Date)
  - Can be a relative time in ms `1 * 60 * 60 * 1000` (1 hour)
  - This option checks the update time of the file using the `fs.stat` method. Therefore, it could be affected by Git or other tools that modify the file.

  > Example: `npx intlayer doc review --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Skip the file if it has been modified within the specified time.
  - Can be an absolute time such as "2025-12-05" (string or Date)
  - Can be a relative time in ms `1 * 60 * 60 * 1000` (1 hour)
  - This option checks the update time of the file using the `fs.stat` method. Therefore, it could be affected by Git or other tools that modify the file.

  > Example: `npx intlayer doc review --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: Skip the file if it already exists.

  > Example: `npx intlayer doc review --skip-if-exists`

**Review mode options:**

- **`--log`**: Log-only mode. Do not translate with AI; instead log the blocks that need attention (with line numbers and content) for the base and target locales, to help another agent generate the translations.

  > Example: `npx intlayer doc review --log`

**Entry output options:**

- **`--locales [locales...]`**: Target locales to review documentation for.

  > Example: `npx intlayer doc review --locales fr es de`

- **`--base-locale [baseLocale]`**: Source locale (base document) to compare with.

  > Example: `npx intlayer doc review --base-locale en`

**File processing options:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Number of files to process simultaneously for review.

  > Example: `npx intlayer doc review --nb-simultaneous-file-processed 5`

**AI options:**

- **`--model [model]`**: The AI model to use for review (e.g., `gpt-3.5-turbo`).
- **`--provider [provider]`**: The AI provider to use for review.
- **`--temperature [temperature]`**: Temperature setting for the AI model.
- **`--api-key [apiKey]`**: Provide your own API key for the AI service.
- **`--application-context [applicationContext]`**: Provide additional context for the AI review.
- **`--data-serialization [dataSerialization]`**: The data serialization format to use for the AI features of Intlayer. Options: `json` (standard, reliable), `toon` (fewer tokens, less consistent).
- **`--custom-prompt [prompt]`**: Customise the base prompt used for review. (Note: For most use cases, the `--custom-instructions` option is recommended instead.)

  > Example: `npx intlayer doc review --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**Environment variables options:**

- **`--env`**: Specify the environment (e.g., `development`, `production`).
- **`--env-file [envFile]`**: Provide a custom environment file to load variables from.
- **`--base-dir`**: Specify the base directory for the project.
- **`--no-cache`**: Disable the cache.

  > Example: `npx intlayer doc review --base-dir ./docs --env-file .env.production.local`

**Log options:**

- **`--verbose`**: Enable verbose logging for debugging. (defaults to true when using CLI)

  > Example: `npx intlayer doc review --verbose`

**Custom instructions options:**

- **`--custom-instructions [customInstructions]`**: Custom instructions added to the prompt. Useful for applying specific rules regarding formatting, URL translation, etc.

  > Example: `npx intlayer doc review --custom-instructions "Avoid translating URLs, and keep the markdown format"`

  > Example: `npx intlayer doc review --custom-instructions "$(cat ./instructions.md)"`

**Git options:**

- **`--git-diff`**: Only run on files that include changes from base (default `origin/main`) to current branch (default: `HEAD`).
- **`--git-diff-base`**: Specify the base reference for git diff (default `origin/main`).
- **`--git-diff-current`**: Specify the current reference for git diff (default: `HEAD`).
- **`--uncommitted`**: Include uncommitted changes.
- **`--unpushed`**: Include unpushed changes.
- **`--untracked`**: Include untracked files.

  > Example: `npx intlayer doc review --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Example: `npx intlayer doc review --uncommitted --unpushed --untracked`

> Note that the output file path will be determined by replacing the following patterns:
>
> - `/{{baseLocale}}/` with `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` with `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` with `_{{locale}}.`
> - `{{baseLocale}}_` with `{{locale}}_`
> - `.{{baseLocaleName}}.` with `.{{localeName}}.`
>
> If the pattern is not found, the output file will add `.{{locale}}` to the file extension. For example, `./my/file.md` will be reviewed and updated to `./my/file.fr.md` for the French locale.
