---
createdAt: 2024-08-11
updatedAt: 2026-08-30
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
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author: aymericzip
---

# Intlayer Visual Editor Documentation

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

The Intlayer Visual Editor is a tool that will wrap your website to interact with your content declaration files using a visual editor.

![Intlayer Visual Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

The `intlayer-editor` package is based on Intlayer and is available for JavaScript applications, such as React (Create React App), Vite + React, and Next.js.

## Visual editor vs CMS

The Intlayer Visual editor is a tool that allows you to manage your content in a visual editor for local dictionaries. Once a change is made, the content will be replaced in the code-base. That means that the application will be rebuilt and the page will be reloaded to display the new content.

In contrast, the [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md) is a tool that allows you to manage your content in a visual editor for distant dictionaries. Once a change is made, the content will **not** impact your code-base. And the website will automatically display the changed content.

## Integrate Intlayer into your application

For more details on how to integrate intlayer, see the relevant section below:

### Integrating with Next.js

For integration with Next.js, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_15.md).

### Integrating with Create React App

For integration with Create React App, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_create_react_app.md).

### Integrating with Vite + React

For integration with Vite + React, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_vite+react.md).

## How Intlayer Editor Works

The visual editor in an application that includes two things:

- A frontend application that will display your website into an iframe. If your website uses Intlayer, the visual editor will automatically detect your content, and will allow you to interact with it. Once a modification is made, you will be able to download your changes.

- Once you have clicked the download button, the visual editor will send a request to the server to replace your content declaration files with the new content (wherever these files are declared in your project).

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

```bash packageManager="bun"
bun add intlayer-editor --dev
```

With the `--with` flag, you can start the editor in parallel with another command:

```json5 fileName="package.json"
{
  "scripts": {
    "start:editor": "npx intlayer-editor start --with 'next dev --turbopack'",
  },
}
```

## Configuration

In your Intlayer configuration file, you can customise the editor settings:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
     * Can be used to disable the editor for specific environments for security reasons, such as production.
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

> To see all available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

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

> **Note the command is reexported by the `intlayer` package. You can use `npx intlayer editor start` instead.**

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

- The [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) configuration is correctly set in your Intlayer configuration file.
  - Required fields:
    - The application URL should match the one you set in the editor configuration (`applicationURL`).

- The visual editor uses an iframe to display your website. Ensure that the Content Security Policy (CSP) of your website allows the CMS URL as `frame-ancestors` (`http://localhost:8000` by default). Check the editor console for any error.

## Frequently Asked Questions

<FAQ>

<Question title="What is the difference between the visual editor and the CMS?">

The visual editor edits local dictionaries and writes the change back into your code base, so it goes through your usual review and deployment. The [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md) edits remote dictionaries, which change on the running site without a deployment. The editor suits content owned by developers; the CMS suits content owned by a marketing team.

</Question>

<Question title="How much does i18n add to my bundle size?">

Much less than a namespace based setup, because a page never downloads a catalogue it does not render. Server rendered markup resolves its content on the server, and the build time compiler replaces `useIntlayer` calls with the exact dictionary entries a component uses, so unused keys and unused languages are dropped. [Dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dynamic_dictionaries/index.md) split the rest per locale. Measured against the usual alternatives, Intlayer reduces bundle and page size by up to 50%. See [bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/bundle_optimization.md) and the [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/index.md).

</Question>

<Question title="Can I migrate from `i18next`, `next-intl` or `react-i18next` without rewriting my components?">

Yes, and there are two paths. You can migrate the content progressively with the [i18next migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/migration_from_i18next_to_intlayer.md) or the [next-intl migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/migration_from_next-intl_to_intlayer.md). Or you can keep your current API entirely: the [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/index.md) expose the exact same API as `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` and `Lingui`, but served by Intlayer dictionaries, so imports change and component code does not.

</Question>

<Question title="Can I keep my existing JSON translation files?">

Yes. The [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-json.md) keeps your `/messages/{locale}/{namespace}.json` files as the source of truth and generates Intlayer dictionaries from them, in both directions. A [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-po.md) does the same for gettext catalogues, and [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/per_locale_file.md) let you split content by language instead of grouping locales in one file.

</Question>

<Question title="Do I have to move my content key by key?">

No. Run `npx intlayer extract` and Intlayer reads your source files, pulls the user facing strings out and writes a `.content` file next to each one, so you review a diff instead of copying strings into a catalogue one at a time. See the [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/extract.md).

For a fully automated pipeline, the [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compiler.md) does the same at build time on JSX, TSX, Vue and Svelte source, generating the dictionaries on every change so there are no keys to maintain by hand. It works by static analysis, so strings that only exist at runtime stay out of reach, and it needs a few annotations to tell user facing text apart from application logic.

</Question>

<Question title="What editor and AI agent tooling is available?">

Five pieces, all optional:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/vs_code_extension.md)**: jump from a `useIntlayer` key to the content file that declares it, extract content from a component, and run build, fill, test, push and pull from the command palette or a dedicated Intlayer tab.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/lsp.md)**: the same awareness in any editor that speaks LSP, with go to definition, find all references, hover previews of a translated value, autocompletion of keys and fields, and a warning when a key is not declared anywhere. It also resolves `i18next`, `react-i18next`, `next-intl` and `use-intl` calls, which helps while you migrate.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/mcp_server.md)**: exposes the Intlayer documentation and CLI to Cursor, VS Code, Claude Desktop, Claude Code and ChatGPT, so an assistant answers from current docs instead of guessing, and can run commands such as `intlayer fill` itself.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/agent_skills.md)**: focused skills such as `intlayer-config`, `intlayer-cli` and `intlayer-content`, plus one per framework, that teach an agent your routing setup and the content node types.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/eslint.md)**: `no-raw-text` flags hardcoded strings, with further rules for static dictionary keys and unused content.

</Question>

<Question title="Where does the visual editor run?">

On your own infrastructure. It loads your application in an iframe and talks to a local editor server, so your content never leaves your environment. That is what makes it usable for projects that cannot send copy to a hosted service.

</Question>

<Question title="Do editors need to know how to code?">

No. They open the site, click on a piece of text and edit it in place. The editor resolves which dictionary entry backs that text and writes the change into the right content file, so a translator does not need to find the file or know the key.

</Question>

<Question title="Does editing through the visual editor change my source files?">

Yes, that is the intent. The change lands in the content declaration file in your code base, so it shows up as a normal diff you can review and commit, and the application rebuilds to display it.

</Question>

<Question title="The editor shows a blank page or refuses to load my site. What should I check?">

The editor displays your application in an iframe, so your Content Security Policy has to allow the editor origin as `frame-ancestors`, which is `http://localhost:8000` by default. Also confirm that the `applicationURL` in your editor configuration matches the URL your app is actually served from. The editor console reports both failures.

</Question>

<Question title="Can I use the visual editor in production?">

It is designed for development and staging, where a rebuild after an edit is acceptable. For editing content on a live site without a deployment, use the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md) and its remote dictionaries instead.

</Question>

<Question title="Is the visual editor free?">

Yes. The visual editor is part of the open source project, under the Apache 2.0 licence, commercial use included. Only the hosted [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md) is a paid service, and it can also be [self hosted](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/self_hosting.md).

</Question>

</FAQ>
