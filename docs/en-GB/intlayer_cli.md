# Intlayer CLI

## Install Package

Install the necessary packages using npm:

```bash
npm install intlayer-cli
```

```bash
yarn add intlayer-cli
```

```bash
pnpm add intlayer-cli
```

> Note: if `intlayer` package is already installed, the cli is automatically installed. You can skip this step.

## intlayer-cli package

`intlayer-cli` package intend to transpile your [intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md) declarations into dictionaries.

This package will transpile all intlayer files, such as `src/**/*.content.{ts|js|mjs|cjs|json}`. [See how to declare your Intlayer declaration files](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

To interpret intlayer dictionaries you can interpreters, such as [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/react-intlayer/README.md), or [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/next-intlayer/README.md)

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
npx intlayer push
```

If [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_editor.md) is installed, you can also push dictionaries to the editor. This command will allow to make the dictionaries available to the editor at [https://intlayer.org/dashboard/content](https://intlayer.org/dashboard/content). By this way, you can share your dictionaries with your team and edit your content without editing the code of your application.

##### Arguments:

- `-d`, `--dictionaries`: ids of the dictionaries to pull. If not specified, all dictionaries will be pushed.
  > Example: `npx intlayer push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Skip the question that asking to delete the locales directories once the dictionaries are pushed, and remove them. By default, is the dictionary is defined locally, it will overwrite distant dictionaries content.
  > Example: `npx intlayer push -r`
- `-k`, `--keepLocaleDictionary`: Skip the question that asking to delete the locales directories once the dictionaries are pushed, and keep them. By default, is the dictionary is defined locally, it will overwrite distant dictionaries content.
  > Example: `npx intlayer push -k`

### Pull distant dictionaries

```bash
npx intlayer pull
```

If [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_editor.md) is installed, you can also pull dictionaries from the editor. By this way, you can overwrite the content of your dictionaries for the need of your application.

##### Arguments:

- `-d, --dictionaries`: Ids of the dictionaries to pull. If not specified, all dictionaries will be pulled.
  > Example: `npx intlayer pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : Path to the directory where the new dictionaries will be saved. If not specified, the news dictionaries will be saved in the `./intlayer-dictionaries` directory of the project. If a `filePath` fields is specified in your dictionary content, the dictionaries will not consider this argument and will be saved in the specified `filePath` directory.
  > Example: `npx intlayer pull --newDictionariesPath ./my-dictionaries`

## Use intlayer commands in your `package.json`:

```json
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull"
}
```
