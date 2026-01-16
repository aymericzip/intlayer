---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Intlayer CMS | Externalise your content into the Intlayer CMS
description: Externalise your content into the Intlayer CMS to delegate the management of your content to your team.
keywords:
  - CMS
  - Visual Editor
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cms
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 6.0.1
    date: 2025-09-22
    changes: Add live sync documentation
  - version: 6.0.0
    date: 2025-09-04
    changes: Replace `hotReload` field with `liveSync`
  - version: 5.5.10
    date: 2025-06-29
    changes: Initialise history
---

# Intlayer Content Management System (CMS) Documentation

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

The Intlayer CMS is an application that allows you to externalise the content of an Intlayer project.

For this, Intlayer introduces the concept of 'remote dictionaries'.

![Intlayer CMS Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Understanding remote dictionaries

Intlayer distinguishes between 'local' and 'remote' dictionaries.

- A 'local' dictionary is a dictionary that is declared in your Intlayer project. Such as the declaration file of a button, or your navigation bar. Externalising your content does not make sense in this case because this content is not supposed to change often.

- A 'remote' dictionary is a dictionary that is managed through the Intlayer CMS. It could be useful to allow your team to manage your content directly on your website, and also aims to use A/B testing features and SEO automatic optimisation.

## Visual editor vs CMS

The [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md) editor is a tool that allows you to manage your content in a visual editor for local dictionaries. Once a change is made, the content will be replaced in the code-base. This means that the application will be rebuilt and the page will be reloaded to display the new content.

In contrast, the Intlayer CMS is a tool that allows you to manage your content in a visual editor for remote dictionaries. Once a change is made, the content will **not** impact your code-base. The website will automatically display the updated content.

## Integrating

For more details on how to install the package, see the relevant section below:

### Integrating with Next.js

For integration with Next.js, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_15.md).

### Integrating with Create React App

For integration with Create React App, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_create_react_app.md).

### Integrating with Vite + React

For integration with Vite + React, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_vite+react.md).

## Configuration

Run the following command to login to the Intlayer CMS:

```bash packageManager="npm"
npx intlayer login
```

```bash packageManager="yarn"
yarn intlayer login
```

```bash packageManager="pnpm"
pnpm intlayer login
```

```bash packageManager="bun"
bunx intlayer login
```

This will open your default browser to complete the authentication process and receive the necessary credentials (Client ID and Client Secret) to use Intlayer services.

In your Intlayer configuration file, you can customise the CMS settings:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... other configuration settings
  editor: {
    /**
     * Required
     *
     * The URL of the application.
     * This is the URL targeted by the visual editor.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Required
     *
     * Client ID and client secret are required to enable the editor.
     * They allow the identification of the user who is editing the content.
     * They can be obtained by creating a new client in the Intlayer Dashboard - Projects (https://app.intlayer.org/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Optional
     *
     * In the case you are self-hosting the Intlayer CMS, you can set the URL of the CMS.
     *
     * The URL of the Intlayer CMS.
     * By default, it is set to https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Optional
     *
     * In the case you are self-hosting the Intlayer CMS, you can set the URL of the backend.
     *
     * The URL of the Intlayer CMS.
     * By default, it is set to https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
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
     *
     * The URL of the application.
     * This is the URL targeted by the visual editor.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Required
     *
     * Client ID and client secret are required to enable the editor.
     * They allow the identification of the user who is editing the content.
     * They can be obtained by creating a new client in the Intlayer Dashboard - Projects (https://app.intlayer.org/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Optional
     *
     * In the case you are self-hosting the Intlayer CMS, you can set the URL of the CMS.
     *
     * The URL of the Intlayer CMS.
     * By default, it is set to https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Optional
     *
     * In the case you are self-hosting the Intlayer CMS, you can set the URL of the backend.
     *
     * The URL of the Intlayer backend.
     * By default, it is set to https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
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
     *
     * The URL of the application.
     * This is the URL targeted by the visual editor.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Required
     *
     * Client ID and client secret are required to enable the editor.
     * They allow the identification of the user who is editing the content.
     * They can be obtained by creating a new client in the Intlayer Dashboard - Projects (https://app.intlayer.org/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Optional
     *
     * In the case you are self-hosting the Intlayer CMS, you can set the URL of the CMS.
     *
     * The URL of the Intlayer CMS.
     * By default, it is set to https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Optional
     *
     * If you are self-hosting the Intlayer CMS, you can set the URL of the backend.
     *
     * The URL of the Intlayer CMS backend.
     * By default, it is set to https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> If you do not have a client ID and client secret, you can obtain them by creating a new client in the [Intlayer Dashboard - Projects](https://app.intlayer.org/projects).

> To see all available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

## Using the CMS

### Push your configuration

To configure the Intlayer CMS, you can use the [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/en-GB/intlayer_cli.md) commands.

```bash
npx intlayer config push
```

> If you use environment variables in your `intlayer.config.ts` configuration file, you can specify the desired environment using the `--env` argument:

```bash
npx intlayer config push --env production
```

This command uploads your configuration to the Intlayer CMS.

### Push a dictionary

To transform your locale dictionaries into a remote dictionary, you can use the [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/en-GB/intlayer_cli.md) commands.

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> If you use environment variables in your `intlayer.config.ts` configuration file, you can specify the desired environment using the `--env` argument:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

This command uploads your initial content dictionaries, making them available for asynchronous fetching and editing through the Intlayer platform.

### Edit the dictionary

You will then be able to view and manage your dictionary in the [Intlayer CMS](https://app.intlayer.org/content).

## Live sync

Live Sync allows your app to reflect CMS content changes at runtime. No rebuild or redeploy is required. When enabled, updates are streamed to a Live Sync server that refreshes the dictionaries your application reads.

> Live Sync requires a continuous server connection and is available on the enterprise plan.

Enable Live Sync by updating your Intlayer configuration:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... other configuration settings
  editor: {
    /**
     * Enables hot reloading of locale configurations when changes are detected.
     * For example, when a dictionary is added or updated, the application updates
     * the content displayed on the page.
     *
     * Because hot reloading requires a continuous connection to the server, it is
     * only available for clients of the `enterprise` plan.
     *
     * Default: false
     */
    liveSync: true,
  },
  build: {
    /**
     * Controls how dictionaries are imported:
     *
     * - "live": Dictionaries are fetched dynamically using the Live Sync API.
     *   Replaces useIntlayer with useDictionaryDynamic.
     *
     * Note: Live mode uses the Live Sync API to fetch dictionaries. If the API call
     * fails, dictionaries are imported dynamically.
     * Note: Only dictionaries with remote content and "live" flags use live mode.
     * Others use dynamic mode for performance.
     */
    importMode: "live",
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
     * Enables hot reloading of locale configurations when changes are detected.
     * For example, when a dictionary is added or updated, the application updates
     * the content displayed on the page.
     *
     * Because hot reloading requires a continuous connection to the server, it is
     * only available for clients of the `enterprise` plan.
     *
     * Default: false
     */
    liveSync: true,
  },
  build: {
    /**
     * Controls how dictionaries are imported:
     *
     * - "live": Dictionaries are fetched dynamically using the Live Sync API.
     *   Replaces useIntlayer with useDictionaryDynamic.
     *
     * Note: Live mode uses the Live Sync API to fetch dictionaries. If the API call
     * fails, dictionaries are imported dynamically.
     * Note: Only dictionaries with remote content and "live" flags use live mode.
     * Others use dynamic mode for performance.
     */
    importMode: "live",
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
     * Enables hot reloading of locale configurations when changes are detected.
     * For example, when a dictionary is added or updated, the application updates
     * the content displayed on the page.
     *
     * Because hot reloading requires a continuous connection to the server, it is
     * only available for clients of the `enterprise` plan.
     *
     * Default: false
     */
    liveSync: true,

    /**
     * The port of the Live Sync server.
     *
     * Default: 4000
     */
    liveSyncPort: 4000,

    /**
     * The URL of the Live Sync server.
     *
     * Default: http://localhost:{liveSyncPort}
     */
    liveSyncURL: "https://live.example.com",
  },
  build: {
    /**
     * Controls how dictionaries are imported:
     *
     * - "live": Dictionaries are fetched dynamically using the Live Sync API.
     *   Replaces useIntlayer with useDictionaryDynamic.
     *
     * Note: Live mode uses the Live Sync API to fetch dictionaries. If the API call
     * fails, dictionaries are imported dynamically.
     * Note: Only dictionaries with remote content and "live" flags use live mode.
     * Others use dynamic mode for performance.
     */
    importMode: "live",
  },
};

module.exports = config;
```

Start the Live Sync server to wrap your application:

Example using Next.js:

```json5 fileName="package.json"
{
  "scripts": {
    // ... other scripts
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --process 'next start'",
  },
}
```

Example using Vite:

```json5 fileName="package.json"
{
  "scripts": {
    // ... other scripts
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --process 'vite start'",
  },
}
```

The Live Sync server wraps your application and automatically applies updated content as it arrives.

To receive change notifications from the CMS, the Live Sync server maintains an SSE connection to the backend. When content changes in the CMS, the backend forwards the update to the Live Sync server, which writes the new dictionaries. Your application will reflect the update on the next navigation or browser reload—no rebuild required.

Flow chart (CMS/Backend -> Live Sync Server -> Application Server -> Frontend):

![Live Sync Logic Schema](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

How it works:

![Live Sync Flow CMS/Backend/Live Sync Server/Application Server/Frontend Schema](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

### Development workflow (local)

- In development, all remote dictionaries are fetched when the application starts, so you can test updates quickly.
- To test Live Sync locally with Next.js, wrap your dev server:

```json5 fileName="package.json"
{
  "scripts": {
    // ... other scripts
    "dev": "npx intlayer live --process 'next dev'",
    // "dev": "npx intlayer live --process 'vite dev'", // For Vite
  },
}
```

Enable optimisation so Intlayer applies the Live import transformations during development:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimise: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimise: true,
    importMode: "live",
  },
};

module.exports = config;
```

This setup wraps your dev server with the Live Sync server, fetches remote dictionaries at startup, and streams updates from the CMS via SSE. Refresh the page to see changes.

Notes and constraints:

- Add the live sync origin to your site security policy (CSP). Ensure the live sync URL is allowed in `connect-src` (and `frame-ancestors` if relevant).
- Live Sync does not work with static output. For Next.js, the page must be dynamic to receive updates at runtime (e.g., use `generateStaticParams`, `generateMetadata`, `getServerSideProps`, or `getStaticProps` appropriately to avoid full static-only constraints).
- In the CMS, each dictionary has a `live` flag. Only dictionaries with `live=true` are fetched via the live sync API; others are imported dynamically and remain unchanged at runtime.
- The `live` flag is evaluated for each dictionary at build time. If remote content was not flagged `live=true` during build, you must rebuild to enable Live Sync for that dictionary.
- The live sync server must be able to write to `.intlayer`. In containers, ensure write access to `/.intlayer`.

## Debug

If you encounter any issues with the CMS, check the following:

- The application is running.

- The [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) configuration is correctly set in your Intlayer configuration file.
  - Required fields:
    - The application URL should match the one you set in the editor configuration (`applicationURL`).
    - The CMS URL

- Ensure that the project configuration was pushed to the Intlayer CMS.

- The visual editor uses an iframe to display your website. Ensure that the Content Security Policy (CSP) of your website allows the CMS URL as `frame-ancestors` ('https://app.intlayer.org' by default). Check the editor console for any errors.
