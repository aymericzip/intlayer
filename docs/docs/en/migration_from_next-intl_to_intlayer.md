---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrate from next-intl to Intlayer | Internationalization (i18n)"
description: "Learn how to migrate your Next.js app from next-intl to Intlayer — step by step, without breaking your existing code. Use the @intlayer/next-intl compat adapter for a zero-disruption transition."
keywords:
  - next-intl
  - intlayer
  - migration
  - internationalization
  - i18n
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - migration
  - next-intl
history:
  - version: 8.13.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migrating from next-intl to Intlayer

## Why migrate from next-intl to Intlayer?

<AccordionGroup>

<Accordion header="Bundle size">

Instead of loading massive JSON files into your pages, load only the necessary content. Intlayer helps **reduce your bundle and page sizes by up to 50%**.

</Accordion>

<Accordion header="Maintainability">

Scoping your application's content **facilitates maintenance** for large-scale applications. You can duplicate or delete a single feature folder without the mental burden of reviewing your entire content codebase. Additionally, Intlayer is **fully typed** to ensure your content's accuracy.

Intlayer is also the solution with the **most active development** in the i18n ecosystem — issues are fixed fast, new framework adapters land regularly, and the core API is continuously refined based on real-world production feedback.

</Accordion>

<Accordion header="AI Agent">

Co-locating content **reduces the context needed** by Large Language Models (LLMs). Intlayer also comes with a suite of tools, such as a **CLI** to test for missing translations, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, and **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, to make the developer experience (DX) even smoother for AI agents.

</Accordion>

<Accordion header="Automation">

Use automation to translate in your CI/CD pipeline using the LLM of your choice at the cost of your AI provider. Intlayer also offers a **compiler** to automate content extraction, as well as a [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) to help **translate in the background**.

</Accordion>

<Accordion header="Performance">

Connecting massive JSON files to components can lead to performance and reactivity issues. Intlayer optimizes your content loading at build time.

</Accordion>

<Accordion header="Scaling with non-dev">

More than just an i18n solution, Intlayer provides a **self-hosted [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** and a **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** to help you manage your multilingual content in **real-time**, making collaboration with translators, copywriters, and other team members seamless. Content can be stored locally and/or remotely.

</Accordion>

</AccordionGroup>

---

## Migration strategy

The recommended approach for existing apps is the **compat adapter**: install `@intlayer/next-intl`, which exposes the **exact same API** as `next-intl` but delegates all translation work to Intlayer under the hood.

You keep your existing `useTranslations`, `getTranslations`, `NextIntlClientProvider` and friends — **the only change is the import path**. No refactoring of call signatures, prop shapes, or component structure is required.

Over time you can optionally migrate individual files to Intlayer's richer `.content.ts` format to unlock the visual editor, CMS, and per-component content scoping — but that step is entirely optional and can be done incrementally.

---

## Table of Contents

<TOC/>

---

## Quick migration

The following steps are the minimum required to get your existing `next-intl` app running on Intlayer with zero code changes.

<Steps>

<Step number={1} title="Install Dependencies">

Install the Intlayer core packages and the `@intlayer/next-intl` compat adapter:

```bash packageManager="npm"
npm install intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
bun x intlayer init
```

> Keep `next-intl` installed — it is still required for **URL routing** (`createNavigation`, `createMiddleware`, `Link`, `redirect`, `usePathname`, `useRouter`). The compat adapter does **not** replace the routing layer.

</Step>

<Step number={2} title="Configure Intlayer">

The `intlayer init` command creates a starter `intlayer.config.ts`. Update it to match your existing locales and point the `syncJSON` plugin at your message files:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Add all your existing locales here
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // 'icu' matches next-intl's ICU placeholder syntax: {name}, {count, plural, ...}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

> **`source`** maps a locale to its JSON file path. **`location`** tells the Intlayer watcher which folder to monitor for changes. The `format: 'icu'` option ensures ICU placeholders like `{name}` and `{count, plural, one {# item} other {# items}}` are parsed correctly.

> For a complete list of configuration options, see the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Step>

<Step number={3} title="Add the Intlayer Plugin to Next.js">

Wrap your existing Next.js config with `createNextIntlPlugin` from `@intlayer/next-intl/plugin`. This wrapper composes `withIntlayer` **and** registers the `next-intl` → `@intlayer/next-intl` aliases for you:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* your existing config options */
};

export default withIntlayer(nextConfig);
```

> `createNextIntlPlugin()` wraps `withIntlayer`, automatically detects **Webpack** or **Turbopack**, wires up content watching, dictionary compilation, and — critically — **injects module aliases** so that your existing `import … from 'next-intl'` calls are transparently redirected to `@intlayer/next-intl` at build time. The routing entry `next-intl/routing` is left pointing at the real package. No source file changes are needed.
>
> Prefer the plain `withIntlayer` from `next-intlayer/server`? It will compile your dictionaries, but it does **not** add the `next-intl` aliases — you would then have to rename imports to `@intlayer/next-intl` manually (see Step 4).

> **You no longer need `getRequestConfig` or `loadMessages`.** With `next-intl`, you had to write a `src/i18n.ts` file that loaded JSON message bundles on every request via `getRequestConfig`. Intlayer compiles all dictionaries at **build time**, so there is no runtime loading step. You can delete that file entirely (or keep only the routing parts if you still use `createNavigation`).

</Step>

</Steps>

That's it for the quick migration. Your app now runs on Intlayer while keeping every `next-intl` import and API intact.

> **Typed translation keys — automatic.** Once Intlayer compiles your dictionaries, `useTranslations` and `getTranslations` are typed against your actual content. Keys are autocompleted in your IDE and invalid paths cause TypeScript errors at build time — no extra setup required.
>
> ```tsx
> // Client component — 'about' is a registered dictionary key
> const t = useTranslations("about");
> t("counter.label"); // ✓ autocompleted
> t("does.not.exist"); // ✗ TypeScript error
>
> // Server component
> const t = await getTranslations("about");
> t("counter.label"); // ✓ typed
> ```

---

## Complete migration

The steps below are optional and can be done incrementally. They unlock the full Intlayer feature set: visual editor, CMS, typed content files, AI-powered translation, and more.

<Steps>

<Step number={4} title="Explicit import renaming (optional)" isOptional={true}>

The `createNextIntlPlugin()` wrapper already handles `next-intl` → `@intlayer/next-intl` aliasing at the bundler level. If you prefer to make the dependency explicit in your source files (and use the plain `withIntlayer` plugin instead), you can rename imports manually:

| Before                                               | After                                                          |
| ---------------------------------------------------- | -------------------------------------------------------------- |
| `import { useTranslations } from 'next-intl'`        | `import { useTranslations } from '@intlayer/next-intl'`        |
| `import { useLocale } from 'next-intl'`              | `import { useLocale } from '@intlayer/next-intl'`              |
| `import { NextIntlClientProvider } from 'next-intl'` | `import { NextIntlClientProvider } from '@intlayer/next-intl'` |
| `import { getTranslations } from 'next-intl/server'` | `import { getTranslations } from '@intlayer/next-intl/server'` |
| `import { getLocale } from 'next-intl/server'`       | `import { getLocale } from '@intlayer/next-intl/server'`       |
| `import { setLocale } from 'next-intl/server'`       | `import { setLocale } from '@intlayer/next-intl/server'`       |
| `import { getMessages } from 'next-intl/server'`     | `import { getMessages } from '@intlayer/next-intl/server'`     |

> Always keep routing imports from the real `next-intl` — the compat adapter does **not** replace the URL routing layer:
>
> ```ts
> // ✅ Always keep these from the real 'next-intl'
> import { createNavigation } from "next-intl/routing";
> import { createMiddleware } from "next-intl/server";
> import { defineRouting } from "next-intl/routing";
> ```
>
> Alternatively, you can use `defineRouting` from `@intlayer/next-intl/routing` which merges locale config from your `intlayer.config.ts` automatically.

</Step>

<Step number={5} title="Enable AI-Powered Translation Automation" isOptional={true}>

Once Intlayer is wired up, you can use its CLI to fill missing translations automatically using the LLM of your choice:

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

Add an `OPENAI_API_KEY` (or your preferred provider key) to your `.env` file, then extend your `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // default
    // model: "gpt-4o-mini",   // default
  },
};

export default config;
```

> See [Intlayer CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) for all available options.

</Step>

</Steps>

---

## What you can delete after migration

Once `@intlayer/next-intl` is in place, the following `next-intl` boilerplate can be removed:

| File / pattern                                    | Why it's no longer needed                                                                                                                                        |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/i18n.ts` → `getRequestConfig` export         | Intlayer compiles dictionaries at build time; there is no per-request message loading. Keep the file only if it also exports `createNavigation` routing helpers. |
| `loadMessages()` / `getMessages()` call in layout | The `NextIntlClientProvider` from `@intlayer/next-intl` reads from compiled output; no `messages` prop is required.                                              |
| `locales/{locale}/*.json` imports in layout       | JSON bundles are only needed if you still use the `syncJSON` plugin. Once you migrate to `.content.ts` files you can delete the JSON folder.                     |

When you are ready to go further, Intlayer **automatically discovers all `.content.ts` and `.content.json` files anywhere in your codebase** (by default, anywhere inside `./src`). You can place an `about.content.ts` file right next to your `about/page.tsx` and Intlayer will pick it up at build time with no additional configuration — no imports, no registration, no centralized index file needed. This makes co-locating translations with pages and components completely frictionless.

---

## Configure TypeScript

Intlayer uses module augmentation to provide full TypeScript intellisense for your translation keys. Make sure your `tsconfig.json` includes the auto-generated types:

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

---

## Git Configuration

Add Intlayer's generated directory to your `.gitignore`:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

---

## Go Further

- **Visual Editor** — Manage translations visually in your browser: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)
- **CMS** — Externalize and manage content remotely: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)
- **VS Code Extension** — Get autocompletion and real-time translation error detection: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/vs_code_extension.md)
- **CLI Reference** — Full list of CLI commands: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)
- **Intlayer with Next.js** — Full setup guide for Next.js: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md)
