# react-scripts-intlayer: NPM Package to use Intlayer in a React Create App application

**Intlayer** is a suite of packages designed specifically for JavaScript developers. It is compatible with frameworks like React, React, and Express.js.

**The `react-scripts-intlayer` package** Includes the `react-scripts-intlayer` commands and plugins for integrating Intlayer with the Create React App based application. These plugins are based on [craco](https://craco.js.org/) and includes additional configuration for the [Webpack](https://webpack.js.org/) bundler.

## Configuration

The `react-scripts-intlayer` package works seamlessly with the [`react-intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/packages/react-intlayer/index.md), and the [`intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/packages/intlayer/index.md). Have a look at the relevant documentation for more information.

## Installation

Install the necessary package using your preferred package manager:

```bash packageManager="npm"
npm install react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add react-scripts-intlayer
```

## Usage

### CLI Commands

The `react-scripts-intlayer` package provides the following CLI commands:

- `npx react-scripts-intlayer build`: Builds React application with the Intlayer configuration.
- `npx react-scripts-intlayer start`: Starts the development server with the Intlayer configuration.

### Replace package.json scripts

To use the `react-scripts-intlayer` package, you need to replace the `package.json` scripts with the following commands:

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## Use custom Webpack configuration

`react-scripts-intlayer` is based on [craco](https://craco.js.org/), which allows you to customize the Webpack configuration.
If you need to customize the Webpack configuration, you can also implement your own setup based on the intlayer craco plugin. [See example here](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

## Read the full Intlayer guide for React Create App

Intlayer provides a lot of features to help you internationalize your React application.
[See how to use intlayer with React Create App](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_create_react_app.md).
