---
createdAt: 2025-08-23
updatedAt: 2026-08-29
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
    date: 2026-07-08
    changes: "Move Live Sync section to its own page (live-sync.md), keep a short intro + link here"
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

Live Sync lets your app reflect CMS content changes at runtime — no rebuild or redeploy required. When enabled, updates are streamed to a Live Sync server that refreshes the dictionaries your application reads.

For the full setup guide (configuration, starting the Live Sync server, the local development workflow, and constraints), see the [Live Sync documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/live-sync.md).

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

## Frequently Asked Questions

<FAQ>

<Question title="What is the difference between the Intlayer CMS and the visual editor?">

The [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) edits local dictionaries and writes the change back into your code base, so the app is rebuilt and the change goes through your normal review and deployment. The CMS edits remote dictionaries: the change does not touch your code base and the running site picks it up without a deployment. Teams often use both, the editor for content owned by developers and the CMS for content that marketing changes weekly.

</Question>

<Question title="How much does i18n add to my bundle size?">

Much less than a namespace based setup, because a page never downloads a catalog it does not render. Server rendered markup resolves its content on the server, and the build time compiler replaces `useIntlayer` calls with the exact dictionary entries a component uses, so unused keys and unused languages are dropped. [Dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/index.md) split the rest per locale. Measured against the usual alternatives, Intlayer reduces bundle and page size by up to 50%. See [bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md) and the [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/index.md).

</Question>

<Question title="Can I migrate from `i18next`, `next-intl` or `react-i18next` without rewriting my components?">

Yes, and there are two paths. You can migrate the content progressively with the [i18next migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_i18next_to_intlayer.md) or the [next-intl migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_next-intl_to_intlayer.md). Or you can keep your current API entirely: the [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/index.md) expose the exact same API as `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` and `Lingui`, but served by Intlayer dictionaries, so imports change and component code does not.

</Question>

<Question title="Can I keep my existing JSON translation files?">

Yes. The [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-json.md) keeps your `/messages/{locale}/{namespace}.json` files as the source of truth and generates Intlayer dictionaries from them, in both directions. A [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-po.md) does the same for gettext catalogs, and [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/per_locale_file.md) let you split content by language instead of grouping locales in one file.

</Question>

<Question title="Do I have to move my content key by key?">

No. Run `npx intlayer extract` and Intlayer reads your source files, pulls the user facing strings out and writes a `.content` file next to each one, so you review a diff instead of copying strings into a catalog one at a time. See the [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md).

For a fully automated pipeline, the [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) does the same at build time on JSX, TSX, Vue and Svelte source, generating the dictionaries on every change so there are no keys to maintain by hand. It works by static analysis, so strings that only exist at runtime stay out of reach, and it needs a few annotations to tell user facing text apart from application logic.

</Question>

<Question title="What editor and AI agent tooling is available?">

Five pieces, all optional:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/vs_code_extension.md)**: jump from a `useIntlayer` key to the content file that declares it, extract content from a component, and run build, fill, test, push and pull from the command palette or a dedicated Intlayer tab.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**: the same awareness in any editor that speaks LSP, with go to definition, find all references, hover previews of a translated value, autocompletion of keys and fields, and a warning when a key is not declared anywhere. It also resolves `i18next`, `react-i18next`, `next-intl` and `use-intl` calls, which helps while you migrate.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**: exposes the Intlayer documentation and CLI to Cursor, VS Code, Claude Desktop, Claude Code and ChatGPT, so an assistant answers from current docs instead of guessing, and can run commands such as `intlayer fill` itself.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**: focused skills such as `intlayer-config`, `intlayer-cli` and `intlayer-content`, plus one per framework, that teach an agent your routing setup and the content node types.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/eslint.md)**: `no-raw-text` flags hardcoded strings, with further rules for static dictionary keys and unused content.

</Question>

<Question title="Which content should be moved to the CMS?">

Content that changes often and does not belong to a release: landing page copy, pricing wording, announcements, anything a marketing team owns. Content that is part of the interface, such as button labels and form errors, is better left as local dictionaries, where it is reviewed with the code that uses it.

</Question>

<Question title="What happens if the CMS is unreachable?">

The application falls back to the local declaration of the dictionary, so a network failure or an outage degrades to the content shipped with your build rather than to an empty page. This is why keeping a local declaration for every remote dictionary matters.

</Question>

<Question title="Can I self host the CMS?">

Yes. The CMS can run on your own infrastructure, which is the usual answer when content must not leave your network. See [self hosting Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/self_hosting.md).

</Question>

<Question title="Do content editors need a developer to publish a change?">

No. That is the point of remote dictionaries: an editor changes the text in the CMS and the site reflects it, with [live sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/live.md) applying the update at runtime instead of waiting for a build.

</Question>

<Question title="Can I automate the CMS instead of using the interface?">

Yes. The `@intlayer/api` SDK exposes the same endpoints as the interface, so you can fetch projects, read dictionaries and push updates from a script or a pipeline. The section above shows the authenticator and the endpoints.

</Question>

<Question title="Does the CMS support A/B testing translations?">

Yes. Remote dictionaries support [content variants](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/variants.md), and [analytics](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/analytics.md) reports how each variant is exposed, so a wording change can be measured rather than argued about.

</Question>

<Question title="Is the CMS free?">

The Intlayer library, CLI, compiler and visual editor are free and open source under the Apache 2.0 license. The hosted CMS is an optional paid service, and it can be [self hosted](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/self_hosting.md) instead.

</Question>

</FAQ>
