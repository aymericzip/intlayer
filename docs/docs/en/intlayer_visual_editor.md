---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Intlayer Visual Editor | Edit your content using a visual editor
description: Discover how to use the Intlayer Editor to manage your multilingual website. Follow the steps in this online documentation to set up your project in a few minutes.
keywords:
  - Editor
  - Internationalization
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - editor
---

# Intlayer Visual Editor Documentation

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

The Intlayer Visual Editor is a tool that will wrap your website to interact with your content declaration files using a visual editor.

![Intlayer Visual Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

The `intlayer-editor` package is based on Intlayer and is available for JavaScript applications, such as React (Create React App), Vite + React, and Next.js.

## Visual editor vs CMS

The Intlayer Visual editor is a tool that allows you to manage your content in a visual editor for local dictionaries. Once a change is made, the content will be replaced in the code-base. That means that the application will be rebuilt and the page will be reloaded to display the new content.

In contrast, the [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) is a tool that allows you to manage your content in a visual editor for distant dictionaries. Once a change is made, the content will **not** impact your code-base. And the website will automatically display the changed content.

## Integrate Intlayer into your application

For more details on how to integrate intlayer, see the relevant section below:

### Integrating with Next.js

For integration with Next.js, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md).

### Integrating with Create React App

For integration with Create React App, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md).

### Integrating with Vite + React

For integration with Vite + React, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md).

## How Intlayer Editor Works

The visual editor in an application that includes two things:

- A frontend application that will display your website into a iframe. If your website uses Intlayer, the visual editor will automatically detect your content, and will allow you to interact with it. Once a modification is made, you will be able to download your changes.

- Once you clicked the download button, the visual editor will send a request to the server to replace your content declaration files with the new content (wherever these files are declared in your project).

> Note that for now, Intlayer Editor will write your content declaration files as JSON files.

## Installation

Once Intlayer is configured in your project, simply install `intlayer-editor` as a development dependency:

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

## Configuration

In your Intlayer configuration file, you can customize the editor settings:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... other configuration settings
  editor: {
    /**
     * Required
     * The URL of the application.
     * This is the URL targeted by the visual editor.
     * Example: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Optional
     * Default as `true`. If `false`, the editor is inactive and cannot be accessed.
     * Can be used to disable the editor for specific environments for security reason, such as production.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * Optional
     * Default as `8000`.
     * The port of the editor server.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Optional
     * Default as "http://localhost:8000"
     * The URL of the editor server.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... other configuration settings
  editor: {
    /**
     * Required
     * The URL of the application.
     * This is the URL targeted by the visual editor.
     * Example: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Optional
     * Default as `true`. If `false`, the editor is inactive and cannot be accessed.
     * Can be used to disable the editor for specific environments for security reason, such as production.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * Optional
     * Default as `8000`.
     * The port used by the visual editor server.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Optional
     * Default as "http://localhost:8000"
     * The URL of the editor server to reach from the application. Used to restrict the origins that can interact with the application for security reasons. If set to `'*'`, the editor is accessible from any origin. Should be set if port is changed, or if the editor is hosted on a different domain.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... other configuration settings
  editor: {
    /**
     * Required
     * The URL of the application.
     * This is the URL targeted by the visual editor.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Optional
     * Default as `8000`.
     * The port of the editor server.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Optional
     * Default as "http://localhost:8000"
     * The URL of the editor server.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * Optional
     * Default as `true`. If `false`, the editor is inactive and cannot be accessed.
     * Can be used to disable the editor for specific environments for security reason, such as production.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> To see all available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

## Using the Editor

1. When the editor is installed, you can start the editor using the following command:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **Note that you should run your application in parallel.** The application URL should match the one you set in the editor configuration (`applicationURL`).

2. Then, open the URL provided. By default `http://localhost:8000`.

   You can view each field indexed by Intlayer by hovering over your content with your cursor.

   ![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. If your content is outlined, you can long-press it to display the edit drawer.

## Environment configuration

The editor can be configured to use a specific environment file. This is useful when you want to use the same configuration file for development and production.

To use a specific environment file, you can use the `--env-file` or `-f` flag when starting the editor:

```bash packageManager="npm"
npx intlayer-editor start -f .env.development
```

```bash packageManager="yarn"
yarn intlayer-editor start -f .env.development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -f .env.development
```

> Note that the environment file should be located in the root directory of your project.

Or you can use the `--env` or `-e` flag to specify the environment:

```bash packageManager="npm"
npx intlayer-editor start -e development
```

```bash packageManager="yarn"
yarn intlayer-editor start -e development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -e development
```

## Debug

If you encounter any issues with the visual editor, check the following:

- The visual editor and the application are running.

- The [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) configuration are correctly set in your Intlayer configuration file.

  - Required fields:
    - The application URL should match the one you set in the editor configuration (`applicationURL`).

- The visual editor use an iframe to display your website. Ensure that the Content Security Policy (CSP) of your website allows the CMS url as `frame-ancestors` ('http://localhost:8000' by default). Check the editor console for any error.

## Doc History

| Version | Date       | Changes      |
| ------- | ---------- | ------------ |
| 5.5.10  | 2025-06-29 | Init history |
