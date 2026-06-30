---
createdAt: 2025-08-23
updatedAt: 2026-06-29
title: Intlayer CMS | Externalize your content into the Intlayer CMS
description: Externalize your content into the Intlayer CMS to delegate the management of your content to your team.
keywords:
  - CMS
  - Visual Editor
  - Internationalization
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
  - version: 9.0.0
    date: 2026-06-30
    changes: "Add Self-Hosting section: Docker Compose bootstrap, service inventory, SDK configuration, optional features, and upgrade notes"
  - version: 9.0.0
    date: 2026-06-29
    changes: "Add @intlayer/api SDK (createIntlayerCMS) section for programmatic CMS access"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Add live sync documentation"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Replace `hotReload` field by `liveSync`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author: aymericzip
---

# Intlayer Content Management System (CMS) Documentation

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

The Intlayer CMS is an Application that allows you to externalize your content of an Intlayer project.

For that, Intlayer introduce the concept of 'distant dictionaries'.

![Intlayer CMS Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Table of Contents

<TOC/>

---

## Understanding distant dictionaries

Intlayer make a difference between 'local' and 'remote' dictionaries.

- A 'local' dictionary is a dictionary that is declared in your Intlayer project. Such as the declaration file of a button, or your navigation bar. Externalizing your content do not make sense in this case because this content is not supposed to change often.

- A 'remote' dictionary is a dictionary that is managed through the Intlayer CMS. It could be useful to allow your team to manage your content in direct on your website, and also aims to use A/B testing features and SEO automatic optimization.

## Visual editor vs CMS

The [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) editor is a tool that allows you to manage your content in a visual editor for local dictionaries. Once a change is made, the content will be replaced in the code-base. That means that the application will be rebuilt and the page will be reloaded to display the new content.

In contrast, the Intlayer CMS is a tool that allows you to manage your content in a visual editor for distant dictionaries. Once a change is made, the content will **not** impact your code-base. And the website will automatically display the changed content.

## Integrating

For more details on how to install the package, see the relevant section below:

### Integrating with Next.js

For integration with Next.js, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md).

### Integrating with Create React App

For integration with Create React App, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md).

### Integrating with Vite + React

For integration with Vite + React, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md).

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
bun x intlayer login
```

This will open your default browser to complete the authentication process and receive the necessary credentials (Client ID and Client Secret) to use Intlayer services.

In your Intlayer configuration file, you can customize the CMS settings:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
     * They allow the identify the user who is editing the content.
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

> If you don't have a client ID and client secret, you can obtain them by creating a new client in the [Intlayer Dashboard - Projects](https://app.intlayer.org/projects).

> To see all available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

## Using the CMS

### Push your configuration

To configure the Intlayer CMS, you can use the [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/en/cli/index.md) commands.

```bash packageManager="npm"
npx intlayer config push
```

```bash packageManager="yarn"
yarn intlayer config push
```

```bash packageManager="pnpm"
pnpm intlayer config push
```

```bash packageManager="bun"
bun x intlayer config push
```

> If you use environment variables in your `intlayer.config.ts` configuration file, you can specify the desired environment using the `--env` argument:

```bash packageManager="npm"
npx intlayer config push --env production
```

```bash packageManager="yarn"
yarn intlayer config push --env production
```

```bash packageManager="pnpm"
pnpm intlayer config push --env production
```

```bash packageManager="bun"
bun x intlayer config push --env production
```

This command uploads your configuration to the Intlayer CMS.

### Push a dictionary

To transform your locale dictionaries in a distant dictionary, you can use the [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/en/cli/index.md) commands.

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key
```

> If you use environment variables in your `intlayer.config.ts` configuration file, you can specify the desired environment using the `--env` argument:

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key --env production
```

This command uploads your initial content dictionaries, making them available for asynchronous fetching and editing through the Intlayer platform.

### Edit the dictionary

Then you will be able to see and manage your dictionary in the [Intlayer CMS](https://app.intlayer.org/content).

## Programmatic access with the `@intlayer/api` SDK

Beyond the CLI and the visual editor, Intlayer ships a typed SDK in the [`@intlayer/api`](https://www.npmjs.com/package/@intlayer/api) package. It lets you treat the CMS as a **headless content database**: you can fetch projects, fetch dictionaries, and push or update them directly from your own application, scripts, or CI pipeline.

The SDK handles authentication for you. As long as your `clientId` and `clientSecret` are available (in your Intlayer configuration or environment), it obtains and refreshes an OAuth2 access token automatically and signs every request.

### Installation

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="bun"
bun add @intlayer/api
```

### How it works: authenticator + endpoints

The SDK is split into **two separate imports** on purpose, to keep your bundle small:

1. `createIntlayerCMS` — creates a lightweight **authenticator**. It only carries the credentials and the managed access token; it knows nothing about any specific domain.
2. `dictionaryEndpoint`, `projectEndpoint`, … — per-domain **endpoint binders**, each imported from its own subpath (`@intlayer/api/dictionary`, `@intlayer/api/project`, …). You pass the authenticator to the endpoint you need.

Because each endpoint is imported separately, your bundle includes only the domains you actually use — importing `dictionaryEndpoint` never pulls in the project, AI, or any other domain client.

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

// The configuration is optional: when omitted, the credentials are read from
// `@intlayer/config/built`, which resolves the INTLAYER_CLIENT_ID and
// INTLAYER_CLIENT_SECRET environment variables.
export const cmsAuthenticator = createIntlayerCMS();
```

> [!WARNING]
> The CMS credentials (`clientId` / `clientSecret`) grant **write access** to your content. Only ever create the authenticator on the **server side** (server actions, route handlers, scripts, CI). Never import it into client-side code or expose your credentials to the browser.

If you prefer not to rely on the build-time configuration, pass the credentials explicitly:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

export const cmsAuthenticator = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    // Optional, for self-hosted backends:
    // backendURL: process.env.INTLAYER_BACKEND_URL,
  },
});
```

> Get your credentials by creating a new access key in the [Intlayer Dashboard - Projects](https://app.intlayer.org/projects).

### Fetch projects

```typescript fileName="projects.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { projectEndpoint } from "@intlayer/api/project";

const cmsAuthenticator = createIntlayerCMS();

// List the projects accessible with your credentials
const { data: projects } =
  await projectEndpoint(cmsAuthenticator).getProjects();

// Read aggregated localization insights of the selected project
const { data: insights } =
  await projectEndpoint(cmsAuthenticator).getProjectInsights();
```

### Fetch dictionaries

```typescript fileName="read-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// List every remote dictionary of the project
const { data: dictionaries } =
  await dictionaryEndpoint(cmsAuthenticator).getDictionaries();

// Or get a single dictionary by key
const { data: dictionary } = await dictionaryEndpoint(
  cmsAuthenticator
).getDictionary("my-first-dictionary-key");
```

### Push and update dictionaries

Use the CMS as a database to write content back:

```typescript fileName="write-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// Create a new dictionary
await dictionaryEndpoint(cmsAuthenticator).addDictionary({
  key: "my-first-dictionary-key",
  content: { title: "Hello world" },
});

// Upsert a batch of dictionaries (create or update them in one call)
await dictionaryEndpoint(cmsAuthenticator).pushDictionaries([
  { key: "home", content: { title: "Home" } },
  { key: "about", content: { title: "About" } },
]);

// Update an existing dictionary
await dictionaryEndpoint(cmsAuthenticator).updateDictionary({
  id: "<dictionary-id>",
  key: "home",
  content: { title: "Updated title" },
});
```

> Tip: reuse the bound endpoint to avoid repeating yourself:
>
> ```typescript codeFormat="typescript"
> const dictionary = dictionaryEndpoint(cmsAuthenticator);
> await dictionary.pushDictionaries([myDictionary]);
> const { data } = await dictionary.getDictionaries();
> ```

### Extracting a single method

Every endpoint method is already authenticated and standalone (it carries its own token handling), so you can extract one and pass it around — for example to inject it as a dependency:

```typescript fileName="push.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const dictionary = dictionaryEndpoint(createIntlayerCMS());

// Already authenticated — refreshes the token automatically on each call
export const pushDictionaries = dictionary.pushDictionaries;

// Usage
await pushDictionaries([{ key: "home", content: { title: "Home" } }]);
```

## Live sync

Live Sync lets your app reflect CMS content changes at runtime. No rebuild or redeploy required. When enabled, updates are streamed to a Live Sync server that refreshes the dictionaries your application reads.

Enable Live Sync by updating your Intlayer configuration:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
  dictionary: {
    /**
     * Controls how dictionaries are imported:
     *
     * - "fetch": Dictionaries are fetched dynamically using the Live Sync API.
     *   Replaces useIntlayer with useDictionaryDynamic.
     *
     * Note: Live mode uses the Live Sync API to fetch dictionaries. If the API call
     * fails, dictionaries are imported dynamically.
     * Note: Only dictionaries with remote content and "live" flags use live mode.
     * Others use dynamic mode for performance.
     */
    importMode: "fetch",
  },
};

export default config;
```

Start the Live Sync server to wrap your application:

Example using standalone server:

```json5 fileName="package.json"
{
  "scripts": {
    // ... other scripts
    "live:start": "npx intlayer live",
  },
}
```

You can also use your application server in parallel using the `--process` argument.

Example using Next.js:

```json5 fileName="package.json"
{
  "scripts": {
    // ... other scripts
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --with 'next start'",
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
    "start": "npx intlayer live --with 'vite start'",
  },
}
```

The Live Sync server wraps your application and automatically applies updated content as it arrives.

To receive change notifications from the CMS, the Live Sync server maintains an SSE connection to the backend. When content changes in the CMS, the backend forwards the update to the Live Sync server, which writes the new dictionaries. Your application will reflect the update on the next navigation or browser reload, no rebuild required.

Flow chart (CMS/Backend -> Live Sync Server -> Application Server -> Frontend):

![Live Sync Flow CMS/Backend/Live Sync Server/Application Server/Frontend Schema](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

How it works:

![Live Sync Logic Schema](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

### Development workflow (local)

- In development, all remote dictionaries are fetched when the application starts, so you can test updates quickly.
- To test Live Sync locally with Next.js, wrap your dev server:

```json5 fileName="package.json"
{
  "scripts": {
    // ... other scripts
    "dev": "npx intlayer live --with 'next dev'",
    // "dev": "npx intlayer live --with 'vite dev'", // For Vite
  },
}
```

Enable optimization so Intlayer applies the Live import transformations during development:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  dictionary: {
    importMode: "fetch",
  },
  build: {
    optimize: true, // default: process.env.NODE_ENV === 'production'
  },
};

export default config;
```

This setup wraps your dev server with the Live Sync server, fetches remote dictionaries at startup, and streams updates from the CMS via SSE. Refresh the page to see changes.

Notes and constraints:

- Add the live sync origin to your site security policy (CSP). Ensure the live sync URL is allowed in `connect-src` (and `frame-ancestors` if relevant).
- Live Sync does not work with static output. For Next.js, the page must be dynamic to receive updates at runtime (e.g., use `generateStaticParams`, `generateMetadata`, `getServerSideProps`, or `getStaticProps` appropriately to avoid full static-only constraints).
- In the CMS, each dictionary has a `live` flag. Only dictionaries with `live=true` are fetched via the live sync API; others are imported dynamically and remain unchanged at runtime.
- The `live` flag is evaluated for each dictionary at build time. If remote content wasn't flagged `live=true` during build, you must rebuild to enable Live Sync for that dictionary.
- The live sync server must be able to write to `.intlayer`. In containers, ensure write access to `/.intlayer`.

## Self-Hosting

Intlayer can run entirely on your own infrastructure. A one-liner bootstraps the full stack (dashboard, API, database, object storage, and email) with Docker Compose:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

For the complete setup guide, environment variable reference, upgrade instructions, and backup/restore procedures, see the [Self-Hosting Guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/self_hosting.md).

---

## Debug

If you encounter any issues with the CMS, check the following:

- The application is running.

- The [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) configuration are correctly set in your Intlayer configuration file.
  - Required fields:
    - The application URL should match the one you set in the editor configuration (`applicationURL`).
    - The CMS URL

- Ensure that the project configuration was pushed to the Intlayer CMS.

- The visual editor use an iframe to display your website. Ensure that the Content Security Policy (CSP) of your website allows the CMS url as `frame-ancestors` ('https://app.intlayer.org' by default). Check the editor console for any error.
