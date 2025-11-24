---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Fill Dictionaries
description: Learn how to fill, audit, and translate your dictionaries using AI.
keywords:
  - Fill
  - Audit
  - Translate
  - Dictionaries
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - fill
---

# Fill / audit / translate dictionaries

```bash
npx intlayer fill
```

This command analyzes your content declaration files for potential issues such as missing translations, structural inconsistencies, or type mismatches. If it finds any problems, **intlayer fill** will propose or apply updates to keep your dictionaries consistent and complete.

## Aliases:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

## Arguments:

**Files list options:**

- **`-f, --file [files...]`**: A list of specific content declaration files to audit. If not provided, all discovered `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` based on your configuration file setup will be audited.

  > Example: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: Filter dictionaries based on keys. If not provided, all dictionaries will be audited.

  > Example: `npx intlayer dictionary fill -k key1 key2`

- **`--key [keys...]`**: Filter dictionaries based on keys (alias for --keys).

  > Example: `npx intlayer dictionary fill --key key1 key2`

- **`--excluded-keys [excludedKeys...]`**: Filter out dictionaries based on keys. If not provided, all dictionaries will be audited.

  > Example: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--excluded-key [excludedKeys...]`**: Filter out dictionaries based on keys (alias for --excluded-keys).

  > Example: `npx intlayer dictionary fill --excluded-key key1 key2`

- **`--path-filter [pathFilters...]`**: Filter dictionaries based on glob pattern for file paths.

  > Example: `npx intlayer dictionary fill --path-filter "src/home/**"`

**Entry output options:**

- **`--source-locale [sourceLocale]`**: The source locale to translate from. If not specified, the default locale from your configuration will be used.

- **`--output-locales [outputLocales...]`**: Target locales to translate to. If not specified, all locales from your configuration will be used except the source locale.

- **`--mode [mode]`**: Translation mode: `complete`, `review`. Default is `complete`. `complete` will fill all missing content, `review` will fill missing content and review existing keys.

**Git options:**

- **`--git-diff`**: Only run on dictionaries that includes changes from base (default `origin/main`) to current branch (default: `HEAD`).
- **`--git-diff-base`**: Specify the base reference for git diff (default `origin/main`).
- **`--git-diff-current`**: Specify the current reference for git diff (default: `HEAD`).
- **`--uncommitted`**: Include uncommitted changes.
- **`--unpushed`**: Include unpushed changes.
- **`--untracked`**: Include untracked files.

  > Example: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Example: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**AI options:**

- **`--model [model]`**: The AI model to use for the translation (e.g., `gpt-3.5-turbo`).
- **`--provider [provider]`**: The AI provider to use for the translation.
- **`--temperature [temperature]`**: Temperature setting for the AI model.
- **`--api-key [apiKey]`**: Provide your own API key for the AI service.
- **`--custom-prompt [prompt]`**: Provide a custom prompt for your translation instructions.
- **`--application-context [applicationContext]`**: Provide additional context for the AI translation.

  > Example: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**Environment variables options:**

- **`--env`**: Specify the environment (e.g., `development`, `production`).
- **`--env-file [envFile]`**: Provide a custom environment file to load variables from.

  > Example: `npx intlayer fill --env-file .env.production.local`

  > Example: `npx intlayer fill --env production`

**Configuration options:**

- **`--base-dir`**: Specify the base directory for the project.

  > Example: `npx intlayer fill --base-dir ./src`

- **`--no-cache`**: Disable the cache.

  > Example: `npx intlayer build --no-cache`

**Preparation options:**

- **`--build`**: Build the dictionaries before pushing to ensure the content is up to date. True will force the build, false will skip the build, undefined will allow using the cache of the build.

- **`--skip-metadata`**: Skip filling missing metadata (description, title, tags) for dictionaries.

**Log options:**

- **`--verbose`**: Enable verbose logging for debugging. (default to true using CLI)

## Example:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

This command will translate content from English to French and Spanish for all content declaration files in the `src/home/` directory using the GPT-3.5 Turbo model.
