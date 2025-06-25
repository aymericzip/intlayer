---
docName: intlayer_cli
url: /doc/concept/cli
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_cli.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: CLI
description: Discover how to use the Intlayer CLI to manage your multilingual website. Follow the steps in this online documentation to set up your project in a few minutes.
keywords:
  - CLI
  - Command Line Interface
  - Internationalization
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Intlayer CLI

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

> If `intlayer` package is already installed, the cli is automatically installed. You can skip this step.

## intlayer-cli package

`intlayer-cli` package intend to transpile your [intlayer declarations](https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/get_started.md) into dictionaries.

This package will transpile all intlayer files, such as `src/**/*.content.{ts|js|mjs|cjs|json}`. [See how to declare your Intlayer declaration files](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

To interpret intlayer dictionaries you can interpreters, such as [react-intlayer](https://www.npmjs.com/package/react-intlayer), or [next-intlayer](https://www.npmjs.com/package/next-intlayer)

## Configuration File Support

Intlayer accepts multiple configuration file formats:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

To see how to configure available locales, or other parameters, refer to the [configuration documentation here](https://github.com/aymericzip/intlayer/blob/main/docs/en/configuration.md).

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

This command will find your declaration content files as default as `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. And build the dictionaries in the `.intlayer` directory.

##### Aliases:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

### Push dictionaries

```bash
npx intlayer dictionary push
```

If [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_visual_editor.md) is installed, you can also push dictionaries to the editor. This command will allow to make the dictionaries available to [the editor](https://intlayer.org/dashboard). By this way, you can share your dictionaries with your team and edit your content without editing the code of your application.

##### Aliases:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### Arguments:

- `-d`, `--dictionaries`: ids of the dictionaries to pull. If not specified, all dictionaries will be pushed.
  > Example: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Skip the question that asking to delete the locales directories once the dictionaries are pushed, and remove them. By default, is the dictionary is defined locally, it will overwrite distant dictionaries content.
  > Example: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: Skip the question that asking to delete the locales directories once the dictionaries are pushed, and keep them. By default, is the dictionary is defined locally, it will overwrite distant dictionaries content.
  > Example: `npx intlayer dictionary push -k`
- `--env`: Specify the environment (e.g., `development`, `production`).
- `--env-file`: Provide a custom environment file to load variables from.
- `--base-dir`: Specify the base directory for the project.
- `--verbose`: Enable verbose logging for debugging.
- `--git-diff`: Only run on dictionaries that includes changes from base (default `origin/main`) to current branch (default: `HEAD`).
- `--git-diff-base`: Specify the base reference for git diff (default `origin/main`).
- `--git-diff-current`: Specify the current reference for git diff (default: `HEAD`).
- `--uncommitted`: Include uncommitted changes.
- `--unpushed`: Include unpushed changes.
- `--untracked`: Include untracked files.

### Pull distant dictionaries

```bash
npx intlayer pull
```

If [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_visual_editor.md) is installed, you can also pull dictionaries from the editor. By this way, you can overwrite the content of your dictionaries for the need of your application.

##### Aliases:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### Arguments:

- `-d, --dictionaries`: Ids of the dictionaries to pull. If not specified, all dictionaries will be pulled.
  > Example: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : Path to the directory where the new dictionaries will be saved. If not specified, the news dictionaries will be saved in the `./intlayer-dictionaries` directory of the project. If a `filePath` fields is specified in your dictionary content, the dictionaries will not consider this argument and will be saved in the specified `filePath` directory.
- `--env`: Specify the environment (e.g., `development`, `production`).
- `--env-file`: Provide a custom environment file to load variables from.
- `--base-dir`: Specify the base directory for the project.
- `--verbose`: Enable verbose logging for debugging.

##### Example:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Fill / audit / translate dictionaries

```bash
npx intlayer fill
```

This command analyzes your content declaration files for potential issues such as missing translations, structural inconsistencies, or type mismatches. If it finds any problems, **intlayer fill** will propose or apply updates to keep your dictionaries consistent and complete.

##### Aliases:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### Arguments:

- `-f, --file [files...]`
  A list of specific content declaration files to audit. If not provided, all discovered `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` files will be audited.

- `--exclude [excludedGlobs...]`
  Globs pattern to exclude from the audit (e.g. `--exclude "src/test/**"`).

- `--source-locale [sourceLocale]`
  The source locale to translate from. If not specified, the default locale from your configuration will be used.

- `--output-locales [outputLocales...]`
  Target locales to translate to. If not specified, all locales from your configuration will be used except the source locale.

- `--mode [mode]`
  Translation mode: 'complete', 'review', or 'missing-only'. Default is 'missing-only'.

- `--git-diff`
  Filters dictionaries that includes changes from base (default `origin/main`) to current branch (default: `HEAD`).

- `--git-diff-base`
  Specify the base reference for git diff (default `origin/main`).

- `--git-diff-current`
  Specify the current reference for git diff (default: `HEAD`).

- `--uncommitted`
  Filters dictionaries that includes uncommitted changes.

- `--unpushed`
  Filters dictionaries that includes unpushed changes.

- `--untracked`
  Filters dictionaries that includes untracked files.

- `--keys [keys...]`
  Filter dictionaries based on specified keys.

- `--excluded-keys [excludedKeys...]`
  Filter out dictionaries based on specified keys.

- `--path-filter [pathFilters...]`
  Filter dictionaries based on glob pattern for file paths.

- `--model [model]`
  The AI model to use for the translation (e.g., `gpt-3.5-turbo`).

- `--provider [provider]`
  The AI provider to use for the translation.

- `--temperature [temperature]`
  Temperature setting for the AI model.

- `--api-key [apiKey]`
  Provide your own API key for the AI service.

- `--custom-prompt [prompt]`
  Provide a custom prompt for your translation instructions.

- `--application-context [applicationContext]`
  Provide additional context for the AI translation.

- `--env`
  Specify the environment (e.g., `development`, `production`).

- `--env-file [envFile]`
  Provide a custom environment file to load variables from.

- `--base-dir`
  Specify the base directory for the project.

- `--verbose`
  Enable verbose logging for debugging.

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

The `configuration push` command uploads your configuration to the Intlayer CMS and editor. This step is necessary to enable the use of distant dictionaries in the Intlayer Visual Editor.

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

## Use intlayer commands in your `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill"
}
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

Sometimes a terminal restart is needed to recognize new commands.

### 4. **Clear npx cache (if you're stuck with an older version)**

```bash
npx clear-npx-cache
```
