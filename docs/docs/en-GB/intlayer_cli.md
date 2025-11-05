---
createdAt: 2024-08-11
updatedAt: 2025-07-11
title: CLI
description: Discover how to use the Intlayer CLI to manage your multilingual website. Follow the steps in this online documentation to set up your project in a few minutes.
keywords:
  - CLI
  - Command Line Interface
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 5.5.11
    date: 2025-07-11
    changes: Update CLI command parameters documentation
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# Intlayer CLI

---

## Table of Contents

<TOC/>

---

## Install Package

Install the necessary packages using npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> If the `intlayer` package is already installed, the CLI is automatically installed. You can skip this step.

## intlayer-cli package

The `intlayer-cli` package is intended to transpile your [intlayer declarations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/dictionary/get_started.md) into dictionaries.

This package will transpile all intlayer files, such as `src/**/*.content.{ts|js|mjs|cjs|json}`. [See how to declare your Intlayer declaration files](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

To interpret intlayer dictionaries you can use interpreters, such as [react-intlayer](https://www.npmjs.com/package/react-intlayer), or [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Configuration File Support

Intlayer accepts multiple configuration file formats:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

To see how to configure available locales, or other parameters, refer to the [configuration documentation here](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/configuration.md).

## Run intlayer commands

### Build dictionaries

To build your dictionaries, you can run the commands:

```bash
npx intlayer build
```

or in watch mode

```bash
npx intlayer build --watch
```

This command will find your declaration content files by default as `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` and build the dictionaries in the `.intlayer` directory.

##### Aliases:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

### Push dictionaries

```bash
bash
npx intlayer dictionary push
```

If the [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/intlayer_visual_editor.md) is installed, you can also push dictionaries to the editor. This command will make the dictionaries available to [the editor](https://intlayer.org/dashboard). In this way, you can share your dictionaries with your team and edit your content without modifying the code of your application.

##### Aliases:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### Arguments:

**Dictionary options:**

- **`-d`, `--dictionaries`**: IDs of the dictionaries to push. If not specified, all dictionaries will be pushed.

  > Example: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

**Configuration options:**

- **`--base-dir`**: Specify the base directory for the project. To retrieve the intlayer configuration, the command will look for the `intlayer.config.{ts,js,json,cjs,mjs}` file in the base directory.

  > Example: `npx intlayer dictionary push --env-file .env.production.local`

**Environment variables options:**

- **`--env`**: Specify the environment (e.g., `development`, `production`). Useful if you use environment variables in your intlayer configuration file.
- **`--env-file`**: Provide a custom environment file to load variables from. Useful if you use environment variables in your intlayer configuration file.

  > Example: `npx intlayer dictionary push --env-file .env.production.local`

  > Example: `npx intlayer dictionary push --env production`

**Output options:**

- **`-r`, `--delete-locale-dictionary`**: Skip the question asking whether to delete the locales directories once the dictionaries are pushed, and remove them. By default, if the dictionary is defined locally, it will overwrite remote dictionaries' content.

  > Example: `npx intlayer dictionary push -r`

  > Example: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: Skip the question asking whether to delete the locales directories once the dictionaries are pushed, and keep them. By default, if the dictionary is defined locally, it will overwrite remote dictionaries' content.

  > Example: `npx intlayer dictionary push -k`

  > Example: `npx intlayer dictionary push --keep-locale-dictionary`

**Log options:**

- **`--verbose`**: Enable verbose logging for debugging.

**Git options:**

- **`--git-diff`**: Only run on dictionaries that include changes from the base (default `origin/main`) to the current branch (default: `HEAD`).
- **`--git-diff-base`**: Specify the base reference for git diff (default `origin/main`).
- **`--git-diff-current`**: Specify the current reference for git diff (default `HEAD`).
- **`--uncommitted`**: Include uncommitted changes.
- **`--unpushed`**: Include unpushed changes.
- **`--untracked`**: Include untracked files.

  > Example: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Example: `npx intlayer dictionary push --uncommitted --unpushed --untracked`

### Pull remote dictionaries

```bash
npx intlayer pull
```

If the [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) is installed, you can also pull dictionaries from the editor. This way, you can overwrite the content of your dictionaries to suit the needs of your application.

##### Aliases:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### Arguments:

**Dictionary options:**

- **`-d, --dictionaries`**: IDs of the dictionaries to pull. If not specified, all dictionaries will be pulled.

  > Example: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

**Configuration options:**

- **`--base-dir`**: Specify the base directory for the project. To retrieve the intlayer configuration, the command will look for the `intlayer.config.{ts,js,json,cjs,mjs}` file in the base directory.

  > Example: `npx intlayer dictionary push --env-file .env.production.local`

**Environment variables options:**

- **`--env`**: Specify the environment (e.g., `development`, `production`).
- **`--env-file`**: Provide a custom environment file to load variables from.
- **`--base-dir`**: Specify the base directory for the project. To retrieve the intlayer configuration, the command will look for the `intlayer.config.{ts,js,json,cjs,mjs}` file in the base directory.

  > Example: `npx intlayer dictionary push --env-file .env.production.local`

  > Example: `npx intlayer dictionary push --env production`

**Output options:**

- **`--new-dictionaries-path`**: Path to the directory where the new dictionaries will be saved. If not specified, the new dictionaries will be saved in the `./intlayer-dictionaries` directory of the project. If a `filePath` field is specified in your dictionary content, the dictionaries will not consider this argument and will be saved in the specified `filePath` directory.

**Log options:**

- **`--verbose`**: Enable verbose logging for debugging.

##### Example:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Fill / audit / translate dictionaries

```bash
npx intlayer fill
```

This command analyses your content declaration files for potential issues such as missing translations, structural inconsistencies, or type mismatches. If it finds any problems, **intlayer fill** will propose or apply updates to keep your dictionaries consistent and complete.

##### Aliases:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### Arguments:

**Files list options:**

- **`-f, --file [files...]`**: A list of specific content declaration files to audit. If not provided, all discovered `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` based on your configuration file setup will be audited.

  > Example: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: Filter dictionaries based on keys. If not provided, all dictionaries will be audited.

  > Example: `npx intlayer dictionary fill -k key1 key2`

- **`--excluded-keys [excludedKeys...]`**: Filter out dictionaries based on keys. If not provided, all dictionaries will be audited.

  > Example: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--path-filter [pathFilters...]`**: Filter dictionaries based on glob pattern for file paths.

  > Example: `npx intlayer dictionary fill --path-filter "src/home/**"`

**Entry output options:**

- **`--source-locale [sourceLocale]`**: The source locale to translate from. If not specified, the default locale from your configuration will be used.

- **`--output-locales [outputLocales...]`**: Target locales to translate to. If not specified, all locales from your configuration will be used except the source locale.

- **`--mode [mode]`**: Translation mode: 'complete', 'review', or 'missing-only'. Default is 'missing-only'.

**Git options:**

- **`--git-diff`**: Only run on dictionaries that include changes from base (default `origin/main`) to current branch (default: `HEAD`).
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

**Log options:**

- **`--verbose`**: Enable verbose logging for debugging.

##### Example:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

This command will translate content from English to French and Spanish for all content declaration files in the `src/home/` directory using the GPT-3.5 Turbo model.

### Manage Configuration

#### Get Configuration

The `configuration get` command retrieves the current configuration for Intlayer, particularly the locale settings. This is useful for verifying your setup.

```bash
npx intlayer configuration get
```

##### Aliases:

- `npx intlayer config get`
- `npx intlayer conf get`

##### Arguments:

- **`--env`**: Specify the environment (e.g., `development`, `production`).
- **`--env-file`**: Provide a custom environment file to load variables from.
- **`--base-dir`**: Specify the base directory for the project.
- **`--verbose`**: Enable verbose logging for debugging.

#### Push Configuration

The `configuration push` command uploads your configuration to the Intlayer CMS and editor. This step is necessary to enable the use of remote dictionaries in the Intlayer Visual Editor.

```bash
npx intlayer configuration push
```

##### Aliases:

- `npx intlayer config push`
- `npx intlayer conf push`

##### Arguments:

- **`--env`**: Specify the environment (e.g., `development`, `production`).
- **`--env-file`**: Provide a custom environment file to load variables from.
- **`--base-dir`**: Specify the base directory for the project.
- **`--verbose`**: Enable verbose logging for debugging.

By pushing the configuration, your project is fully integrated with the Intlayer CMS, enabling seamless dictionary management across teams.

### Documentation Management

The `doc` commands provide tools for managing and translating documentation files across multiple locales.

#### Translate Documentation

The `doc translate` command automatically translates documentation files from a base locale to target locales using AI translation services.

```bash
npx intlayer doc translate
```

##### Arguments:

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

**Entry output options:**

- **`--locales [locales...]`**: Target locales to translate documentation into.

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

  > Example: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**Log options:**

- **`--verbose`**: Enable verbose logging for debugging.

  > Example: `npx intlayer doc translate --verbose`

**Custom instructions options:**

- **`--custom-instructions [customInstructions]`**: Custom instructions added to the prompt. Useful to apply specific rules regarding formatting, URLs translation, etc.
  - Can be an absolute time such as "2025-12-05" (string or Date)
  - Can be a relative time in ms `1 * 60 * 60 * 1000` (1 hour)
  - This option checks the update time of the file using the `fs.stat` method. So it could be impacted by Git or other tools that modify the file.

  > Example: `npx intlayer doc translate --custom-instructions "Avoid translating URLs, and keep the markdown format"`

  > Example: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Git options:**

- **`--git-diff`**: Only run on dictionaries that include changes from base (default `origin/main`) to current branch (default: `HEAD`).
- **`--git-diff-base`**: Specify the base reference for git diff (default `origin/main`).
- **`--git-diff-current`**: Specify the current reference for git diff (default `HEAD`).
- **`--uncommitted`**: Include uncommitted changes.
- **`--unpushed`**: Include unpushed changes.
- **`--untracked`**: Include untracked files.

  > Example: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Example: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> Note that the output file path will be determined by replacing the following patterns
>
> - `/{{baseLocale}}/` by `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` by `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` by `_{{locale}}.`
> - `{{baseLocale}}_` by `{{locale}}_`
> - `.{{baseLocaleName}}.` by `.{{localeName}}.`
>
> If the pattern is not found, the output file will add the `.{{locale}}` at the extensions of the file. `./my/file.md` will be translated to `./my/file.fr.md` for the French locale.

#### Review Documentation

The `doc review` command analyses documentation files for quality, consistency, and completeness across different locales.

```bash
npx intlayer doc review
```

It can be used to review files that are already translated, and to check if the translation is correct.

For most use cases,

- prefer using the `doc translate` when the translated version of this file is not available.
- prefer using the `doc review` when the translated version of this file already exists.

> Note that the review process consumes more entry tokens than the translate process to review the same file entirely. However, the review process will optimise the chunks to review, and will skip the parts that are not changed.

##### Arguments:

The `doc review` command accepts the same arguments as `doc translate`, allowing you to review specific documentation files and apply quality checks.

If you have activated one of the git options, the command will only review the parts of the files that are being changed. The script will process by chunking the file and reviewing each chunk. If there are no changes in the chunk, the script will skip it to speed up the review process and limit the AI Provider API cost.

## Use intlayer commands in your `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

## CLI SDK

The CLI SDK is a library that allows you to use the Intlayer CLI in your own code.

```bash packageManager="npm"
npm install @intlayer/cli --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/cli --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli --save-dev
```

Example of usage:

```ts
import {
  push,
  pull,
  fill,
  build,
  docTranslate,
  docReview,
} from "@intlayer/cli";

push();
// ...
pull();
// ...
fill();
// ...
build();
// ...
docTranslate();
// ...
docReview();
// ...
```

## Debug intlayer command

### 1. **Ensure you're using the latest version**

Run:

```bash
npx intlayer --version                  # current locale intlayer version
npx intlayer@latest --version           # current latest intlayer version
```

### 2. **Check if the command is registered**

You can check with:

```bash
npx intlayer --help                     # Shows the list of available commands and usage information
npx intlayer dictionary build --help    # Shows the list of available options for a command
```

### 3. **Restart your terminal**

Sometimes a terminal restart is needed to recognise new commands.

### 4. **Clear npx cache (if you're stuck with an older version)**

```bash
npx clear-npx-cache
```
