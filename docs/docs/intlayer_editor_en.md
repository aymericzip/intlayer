# Intlayer Editor Documentation

The Intlayer Editor is a tool that transforms your application into a visual editor. With Intlayer Editor, your teams can manage your site's content in all configured languages.

![Intlayer Editor Interface](https://github.com/aypineau/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

The `intlayer-editor` package is based on Intlayer and is available for JavaScript applications, such as React (Create React App), Vite + React, and Next.js.

For more details on how to install the package, see the relevant section below:

### Integrating with Next.js

For integration with Next.js, refer to the [setup guide](https://github.com/aypineau/intlayer/blob/main/docs/docs/intlayer_with_nextjs_en.md).

### Integrating with Create React App

For integration with Create React App, refer to the [setup guide](https://github.com/aypineau/intlayer/blob/main/docs/docs/intlayer_with_create_react_app_en.md).

### Integrating with Vite + React

For integration with Vite + React, refer to the [setup guide](https://github.com/aypineau/intlayer/blob/main/docs/docs/intlayer_with_vite+react_en.md).

## How Intlayer Editor Works

Each time you make a change using Intlayer Editor, the server automatically inserts your changes into your [Intlayer declaration files](https://github.com/aypineau/intlayer/blob/main/docs/docs/content_declaration/get_started_en.md), wherever these files are declared in your project.

In this way, you don't have to worry about where the file is declared or about finding your key in your dictionary collection.

## Installation

Once Intlayer is configured in your project, simply install `intlayer-editor` as a development dependency:

```bash
npm install intlayer-editor -D
```

```bash
yarn install intlayer-editor -D
```

```bash
pnpm install intlayer-editor -D
```

In your Intlayer configuration file, you can customize the editor settings:

```typescript
const config: IntlayerConfig = {
  // ... other configuration settings
  editor: {
    enabled: process.env.NODE_ENV === "development", // If false, the editor is inactive and cannot be accessed.
    port: 3000, // Port of the intlayer-editor backend
  },
};
```

To see all available parameters, refer to the [configuration documentation](https://github.com/aypineau/intlayer/blob/main/docs/docs/configuration_en.md).

### Start Editing

To start editing, launch the editor server using `npx intlayer-editor start`.

You can also create a custom script in your `package.json` file:

```json5
{
  scripts: {
    "start:editor": "npx intlayer-editor start",
  },
}
```

To start both the Next.js server and the Intlayer Editor simultaneously, you can use the [concurrently](https://github.com/open-cli-tools/concurrently) tool:

```json5
{
  scripts: {
    dev: "next dev",
    "start:editor": "npx intlayer-editor start",
    "dev:all": "concurrently \"npm run dev:nextjs\" \"npm run dev:intlayer-editor\"",
  },
}
```

## Using the Editor

When the editor is installed, enabled, and started, you can view each field indexed by Intlayer by hovering over your content with your cursor.

![Hovering over content](https://github.com/aypineau/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

If your content is outlined, you can long-press it to display the edit drawer.
