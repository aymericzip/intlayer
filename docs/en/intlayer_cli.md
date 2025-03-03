# Intlayer CLI

## Install Package

Install the necessary packages using npm:

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
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

### Push dictionaries

```bash
npx intlayer dictionary push
```

If [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_visual_editor.md) is installed, you can also push dictionaries to the editor. This command will allow to make the dictionaries available to [the editor](https://intlayer.org/dashboard). By this way, you can share your dictionaries with your team and edit your content without editing the code of your application.

##### Aliases:

- `npx intlayer dictionaries push`

##### Arguments:

- `-d`, `--dictionaries`: ids of the dictionaries to pull. If not specified, all dictionaries will be pushed.
  > Example: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Skip the question that asking to delete the locales directories once the dictionaries are pushed, and remove them. By default, is the dictionary is defined locally, it will overwrite distant dictionaries content.
  > Example: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: Skip the question that asking to delete the locales directories once the dictionaries are pushed, and keep them. By default, is the dictionary is defined locally, it will overwrite distant dictionaries content.
  > Example: `npx intlayer dictionary push -k`
- `--env`: Specify the environment (e.g., `development`, `production`).

### Pull distant dictionaries

```bash
npx intlayer dictionary pull
```

If [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_visual_editor.md) is installed, you can also pull dictionaries from the editor. By this way, you can overwrite the content of your dictionaries for the need of your application.

##### Aliases:

- `npx intlayer dictionaries pull`

##### Arguments:

- `-d, --dictionaries`: Ids of the dictionaries to pull. If not specified, all dictionaries will be pulled.
  > Example: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : Path to the directory where the new dictionaries will be saved. If not specified, the news dictionaries will be saved in the `./intlayer-dictionaries` directory of the project. If a `filePath` fields is specified in your dictionary content, the dictionaries will not consider this argument and will be saved in the specified `filePath` directory.
- **`--env`**: Specify the environment (e.g., `development`, `production`).

##### Example:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Audit dictionaries

```bash
npx intlayer dictionary audit
```

This command analyzes your content declaration files for potential issues such as missing translations, structural inconsistencies, or type mismatches. If it finds any problems, **intlayer audit** will propose or apply updates to keep your dictionaries consistent and complete.

##### Aliases:

- `npx intlayer dictionaries audit`

##### Arguments:

- **`-f, --files [files...]`**  
  A list of specific content declaration files to audit. If not provided, all discovered `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` files will be audited.

- **`--exclude [excludedGlobs...]`**  
  Globs pattern to exclude from the audit (e.g. `--exclude "src/test/**"`).

- **`-m, --model [model]`**  
  The ChatGPT model to use for the audit (e.g., `gpt-3.5-turbo`).

- **`-p, --custom-prompt [prompt]`**  
  Provide a custom prompt for your audit instructions.

- **`-l, --async-limit [asyncLimit]`**  
  Maximum number of files to process concurrently.

- **`-k, --open-ai-api-key [openAiApiKey]`**  
  Provide your own OpenAI API key to bypass OAuth2 authentication.

- **`--env`**: Specify the environment (e.g., `development`, `production`).

##### Example:

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

This command will ignore any files under `tests/**` and use the `gpt-3.5-turbo` model to audit the discovered content declaration files. If any issues are found—like missing translations—they will be corrected in-place, preserving the original file structure.

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
- **`--verbose`**: Enable verbose logging for debugging.

By pushing the configuration, your project is fully integrated with the Intlayer CMS, enabling seamless dictionary management across teams.

## Use intlayer commands in your `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```
