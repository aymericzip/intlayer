# Intlayer Visual Editor Documentation

The Intlayer Visual Editor is a tool that will wrap your website to interact with your content declaration files using a visual editor.

![Intlayer Visual Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

The `intlayer-editor` package is based on Intlayer and is available for JavaScript applications, such as React (Create React App), Vite + React, and Next.js.

## Visual editor vs CMS

The Intlayer Visual editor is a tool that allows you to manage your content in a visual editor for local dictionaries. Once a change is made, the content will be replaced in the code-base. That means that the application will be rebuilt and the page will be reloaded to display the new content.

In contrast, the [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_CMS.md) is a tool that allows you to manage your content in a visual editor for distant dictionaries. Once a change is made, the content will **not** impact your code-base. And the website will automatically display the changed content.

## Integrate Intlayer into your application

For more details on how to integrate intlayer, see the relevant section below:

### Integrating with Next.js

For integration with Next.js, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_nextjs_15.md).

### Integrating with Create React App

For integration with Create React App, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_create_react_app.md).

### Integrating with Vite + React

For integration with Vite + React, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_vite+react.md).

## How Intlayer Editor Works

The visual editor in an application that includes two things:

- A frontend application that will display your website into a iframe. If your website uses Intlayer, the visual editor will automatically detect your content, and will allow you to interact with it. Once a modification is made, you will be able to download your changes.

- Once you clicked the download button, the visual editor will send a request to the server to replace your content declaration files with the new content (wherever these files are declared in your project).

> Note that for now, Intlayer Editor will write your content declaration files as JSON files.

## Installation

Once Intlayer is configured in your project, simply install `intlayer-editor` as a development dependency:

```bash packageManager="npm"
npm install intlayer-editor -D
```

```bash packageManager="yarn"
yarn add intlayer-editor -D
```

```bash packageManager="pnpm"
pnpm add intlayer-editor -D
```

## Configuration

### 1. Enable the Editor in your intlayer.config.ts file

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

> To see all available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en/configuration.md).

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

2. Then, open the URL provided. By default `http://localhost:8000`.

   You can view each field indexed by Intlayer by hovering over your content with your cursor.

   ![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. If your content is outlined, you can long-press it to display the edit drawer.
