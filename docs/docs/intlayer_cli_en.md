# Intlayer CLI

## Install Package

Install the necessary packages using npm:

```bash
npm install intlayer-cli
```

```bash
yarn install intlayer-cli
```

```bash
pnpm install intlayer-cli
```

## intlayer-cli package

`intlayer-cli` package intend to transpile your [intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/readme_en.md) declarations into dictionaries.

This package will transpile all intlayer files, such as `src/**/*.content.{ts|js|mjs|cjs|json}`. [See how to declare your Intlayer declaration files](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/readme_en.md).

To interpret intlayer dictionaries you can interpreters, such as [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/react-intlayer/readme_en.md), or [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/next-intlayer/readme_en.md)

## Configuration File Support

Intlayer accepts multiple configuration file formats:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

To see how to configure available locales, or other parameters, refer to the [configuration documentation here](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration_en.md).

## Run intlayer commands

To build your dictionaries, you can run the commands:

```bash
npx intlayer transpile
```

or in watch mode

```bash
npx intlayer watch
```

## Use intlayer commands in your `package.json`:

```json
"scripts": {
  "transpile": "npx intlayer transpile",
  "transpile:watch": "npx intlayer watch"
}
```
