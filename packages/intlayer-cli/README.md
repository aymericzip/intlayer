# Intlayer: Next-Level Content Management in JavaScript

**Intlayer** is an innovative Content Management System (CMS) designed specifically for JavaScript developers. It enables seamless transpilation of JavaScript content into structured dictionaries, making integration into your codebase straightforward and efficient.

## Why Choose Intlayer?

- **JavaScript-Powered Content Management**: Harness the flexibility of JavaScript to define and manage your content efficiently.
- **Type-Safe Environment**: Leverage TypeScript to ensure all your content definitions are precise and error-free.
- **Integrated Content Files**: Keep your translations close to their respective components, enhancing maintainability and clarity.
- **Simplified Setup**: Get up and running quickly with minimal configuration, especially optimized for Next.js projects.
- **Server Component Support**: Perfectly suited for Next.js server components, ensuring smooth server-side rendering.
- **Enhanced Routing**: Full support for Next.js app routing, adapting seamlessly to complex application structures.

### Install Package

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

`intlayer-cli` package intend to transpile your [intlayer](https://github.com/aypineau/intlayer/blob/main/packages/intlayer/readme.md) declarations into dictionaries.

This package will transpile all intlayer files, such as `src/**/*.content.{ts|js|mjs|cjs|json}`. [See how to declare your Intlayer declaration files](https://github.com/aypineau/intlayer/blob/main/packages/intlayer/readme.md).

To interpret intlayer dictionaries you can interpreters, such as [react-intlayer](https://github.com/aypineau/intlayer/blob/main/packages/react-intlayer/readme.md), or [next-intlayer](https://github.com/aypineau/intlayer/blob/main/packages/next-intlayer/readme.md)

## Configuration File Support

Intlayer accepts multiple configuration file formats:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

To see how to configure available locales, or other parameters, refer to the [configuration documentation here](https://github.com/aypineau/intlayer/blob/main/docs/configuration.md).

### Run intlayer commands

To build your dictionaries, you can run the commands:

```bash
npx intlayer transpile
```

or in watch mode

```bash
npx intlayer watch
```

### Use intlayer commands in your `package.json`:

```json
"scripts": {
  "transpile": "npx intlayer transpile",
  "transpile:watch": "npx intlayer watch"
}
```
