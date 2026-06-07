---
createdAt: 2025-11-20
updatedAt: 2026-05-31
title: "SvelteKit i18n - Complete guide to translate your app"
description: "No more i18next. The 2026 guide to building a multilingual (i18n) SvelteKit app. Translate with AI agents and optimise bundle size, SEO and performances."
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - SvelteKit
  - JavaScript
  - SSR
slugs:
  - doc
  - environment
  - sveltekit
applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
applicationShowcase: https://intlayer-sveltekit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Add init command"
  - version: 7.1.10
    date: 2025-11-20
    changes: "Initial history"
---

# Translate your SvelteKit website using Intlayer | Internationalisation (i18n)

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-sveltekit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-175 md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-sveltekit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-175 md:aspect-16/9 md:w-full"
  title="Demo - intlayer-sveltekit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Table of Contents

<TOC/>

## Why Intlayer over alternatives?

Compared to main solutions like `svelte-i18n` or `i18next`, Intlayer is a solution that comes with integrated optimizations such as:

<AccordionGroup>

<Accordion header="Full SvelteKit coverage">

Intlayer is optimized to work perfectly with SvelteKit by offering **multilingual routing**, **SSR support**, and all the features needed for scaling internationalization (i18n).

</Accordion>

<Accordion header="Bundle size">

Instead of loading massive JSON files into your pages, load only the necessary content. Intlayer helps **reduce your bundle and page sizes by up to 50%**.

</Accordion>

<Accordion header="Maintainability">

Scoping your application's content **facilitates maintenance** for large-scale applications. You can duplicate or delete a single feature folder without the mental burden of reviewing your entire content codebase. Additionally, Intlayer is **fully typed** to ensure your content's accuracy.

</Accordion>

<Accordion header="AI Agent">

Co-locating content **reduces the context needed** by Large Language Models (LLMs). Intlayer also comes with a suite of tools, such as a **CLI** to test for missing translations,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, and **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, to make the developer experience (DX) even smoother for AI agents.

</Accordion>

<Accordion header="Automation">

Use automation to translate in your CI/CD pipeline using the LLM of your choice at the cost of your AI provider. Intlayer also offers a **compiler** to automate content extraction, as well as a [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) to help **translate in the background**.

</Accordion>

<Accordion header="Performance">

Connecting massive JSON files to components can lead to performance and reactivity issues. Intlayer optimizes your content loading at build time.

</Accordion>

<Accordion header="Scaling with none-dev">

More than just an i18n solution, Intlayer provides an **self-hosted [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** and a **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** to help you manage your multilingual content in **real-time**, making collaboration with translators, copywriters, and other team members seamless. Content can be stored locally and/or remotely.

</Accordion>
</AccordionGroup>

---

## Step-by-Step Guide to Set Up Intlayer in a SvelteKit Application

To get started, create a new SvelteKit project. Here is the final structure that we will make:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

<Steps>

<Step number={1} title="Install Dependencies">

Install the necessary packages using npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bun x intlayer init
```

- **intlayer**: The core i18n package.
- **svelte-intlayer**: Provides context providers and stores for Svelte/SvelteKit.
- **vite-intlayer**: The Vite plugin to integrate content declarations with the build process.

</Step>

<Step number={2} title="Configuration of your project">

Create a config file in your project root:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

</Step>

<Step number={3} title="Integrate Intlayer in Your Vite Configuration">

Update your `vite.config.ts` to include the Intlayer plugin. This plugin manages the transpilation of your content files.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // order matters, Intlayer should be placed before SvelteKit
});
```

</Step>

<Step number={4} title="Declare Your Content">

Create your content declaration files anywhere in your `src` folder (e.g., `src/lib/content` or alongside your components). These files define the translatable content for your application using the `t()` function for each locale.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

</Step>

<Step number={5} title="Utilise Intlayer in Your Components">

Now you can use the `useIntlayer` function in any Svelte component. It returns a reactive store that automatically updates when the locale changes. The function will automatically respect the current locale (both during SSR and client-side navigation).

> **Note:** `useIntlayer` returns a Svelte store, so you need to use the `---
> createdAt: 2025-11-20
> updatedAt: 2026-05-31
> title: How to translate an SvelteKit app – i18n guide 2026
> description: Discover how to make your SvelteKit website multilingual. Follow the documentation to internationalise (i18n) and translate it using Server-Side Rendering (SSR).
> keywords:

- Internationalisation
- Documentation
- Intlayer
- SvelteKit
- JavaScript
- SSR
  slugs:
- doc
- environment
- sveltekit
  applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
  history:
- version: 7.1.10
  date: 2025-11-20
  changes: Init history

---

# Translate your SvelteKit website using Intlayer | Internationalisation (i18n)

</Step>

</Steps>

## Table of Contents

<TOC/>

## What is Intlayer?

**Intlayer** is an innovative, open-source internationalisation (i18n) library designed to simplify multilingual support in modern web applications. It works seamlessly with **SvelteKit's** Server-Side Rendering (SSR) capabilities.

With Intlayer, you can:

- **Easily manage translations** using declarative dictionaries at the component level.
- **Dynamically localise metadata**, routes, and content.
- **Ensure TypeScript support** with autogenerated types.
- **Leverage SvelteKit's SSR** for SEO-friendly internationalisation.

---

## Step-by-Step Guide to Set Up Intlayer in a SvelteKit Application

To get started, create a new SvelteKit project. Here is the final structure that we will make:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

<Steps>

<Step number={1} title="Install Dependencies">

Install the necessary packages using npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bun x intlayer init
```

- **intlayer**: The core i18n package.
- **svelte-intlayer**: Provides context providers and stores for Svelte/SvelteKit.
- **vite-intlayer**: The Vite plugin to integrate content declarations with the build process.

</Step>

<Step number={2} title="Configuration of your project">

Create a config file in your project root:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

</Step>

<Step number={3} title="Integrate Intlayer in Your Vite Configuration">

Update your `vite.config.ts` to include the Intlayer plugin. This plugin manages the transpilation of your content files.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // order matters, Intlayer should be placed before SvelteKit
});
```

</Step>

<Step number={4} title="Declare Your Content">

Create your content declaration files anywhere in your `src` folder (e.g., `src/lib/content` or alongside your components). These files define the translatable content for your application using the `t()` function for each locale.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

</Step>

<Step number={5} title="Utilise Intlayer in Your Components">

prefix to access its reactive value (e.g., `$content.title`).

```svelte fileName="src/lib/components/Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  // "hero-section" corresponds to the key defined in Step 4
  const content = useIntlayer("hero-section");
</script>

<!-- Render content as simple content  -->
<h1>{$content.title}</h1>
<!-- To render the content editable using the editor -->
<h1>{@const Title = $content.title}<Title /></h1>
<!-- To render the content as a string -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>
```

</Step>

<Step number={6} title="Set up routing" isOptional={true}>

The following steps show how to set up locale-based routing in SvelteKit. This allows your URLs to include the locale prefix (e.g., `/en/about`, `/fr/about`) for better SEO and user experience.

```bash
.
└─── src
    ├── app.d.ts                  # Define the locale type
    ├── hooks.server.ts           # Manage locale routing
    ├── lib
    │   └── getLocale.ts          # Check the locale from the header, cookies
    ├── params
    │   └── locale.ts             # Define the locale parameter
    └── routes
        ├── [[locale=locale]]     # Wrap in a route group to set the locale
        │   ├── +layout.svelte    # Local layout for the route
        │   ├── +layout.ts
        │   ├── +page.svelte
        │   ├── +page.ts
        │   └── about
        │       ├── +page.svelte
        │       └── +page.ts
        └── +layout.svelte         # Root layout for fonts and global styles
```

</Step>

<Step number={7} title="Handle Server-Side Locale Detection">

In SvelteKit, the server needs to know the user's locale to render the correct content during SSR. We use `hooks.server.ts` to detect the locale from the URL or cookies.

Create or modify `src/hooks.server.ts`:

```typescript fileName="src/hooks.server.ts"
import type { Handle } from "@sveltejs/kit";
import { getLocalizedUrl } from "intlayer";
import { getLocale } from "$lib/getLocale";

export const handle: Handle = async ({ event, resolve }) => {
  const detectedLocale = getLocale(event);

  // Check if the current path already starts with a locale (e.g. /fr, /en)
  const pathname = event.url.pathname;
  const targetPathname = getLocalizedUrl(pathname, detectedLocale);

  // If NO locale is present in the URL (e.g. user visits "/"), redirect them
  if (targetPathname !== pathname) {
    return new Response(undefined, {
      headers: { Location: targetPathname },
      status: 307, // Temporary redirect
    });
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", detectedLocale),
  });
};
```

Then, create a helper to get the user's locale from the request event:

```typescript fileName="src/lib/getLocale.ts"
import {
  configuration,
  getLocaleFromStorage,
  localeDetector,
  type Locale,
} from "intlayer";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * Retrieve the user's locale from the request event.
 * This function is utilised in the `handle` hook within `src/hooks.server.ts`.
 *
 * It initially attempts to obtain the locale from the Intlayer storage (cookies or custom headers).
 * If the locale is not found, it defaults to the browser's "Accept-Language" negotiation.
 *
 * @param event - The request event from SvelteKit
 * @returns The user's locale
 */
export const getLocale = (event: RequestEvent): Locale => {
  const defaultLocale = configuration?.internationalization?.defaultLocale;

  // Attempt to retrieve locale from Intlayer storage (Cookies or headers)
  const storedLocale = getLocaleFromStorage({
    // SvelteKit cookies access
    getCookie: (name: string) => event.cookies.get(name) ?? null,
    // SvelteKit headers access
    getHeader: (name: string) => event.request.headers.get(name) ?? null,
  });

  if (storedLocale) {
    return storedLocale;
  }

  // Fallback to Browser "Accept-Language" negotiation
  const negotiatorHeaders: Record<string, string> = {};

  // Convert SvelteKit Headers object to a plain Record<string, string>
  event.request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // Check the locale from the `Accept-Language` header
  const userFallbackLocale = localeDetector(negotiatorHeaders);

  if (userFallbackLocale) {
    return userFallbackLocale;
  }

  // Return default locale if no match is found
  return defaultLocale;
};
```

> `getLocaleFromStorage` will check the locale from header or cookie depending on your configuration. See [Configuration](https://intlayer.org/doc/configuration) for more details.

> The `localeDetector` function will process the `Accept-Language` header and return the best match.

If the locale is not configured, we want to return a 404 error. To simplify this, we can create a `match` function to verify if the locale is valid:

```ts fileName="/src/params/locale.ts"
import { defaultLocale, locales, type Locale } from "intlayer";

export const match = (param: Locale = defaultLocale): boolean =>
  locales.includes(param);
```

> **Note:** Ensure your `src/app.d.ts` includes the locale definition:
>
> ```typescript
> declare global {
>   namespace App {
>     interface Locals {
>       locale: import("intlayer").Locale;
>     }
>   }
> }
> ```

For the `+layout.svelte` file, we can remove everything, to keep only static content, not related to i18n:

```svelte fileName="src/+layout.svelte"
<script lang="ts">
	 import './layout.css';

    let { children } = $props();
</script>

<div class="app">
	{@render children()}
</div>

<style>
	.app {
    /*  */
	}
</style>
```

Then, create a new page and layout under the `[[locale=locale]]` group:

```ts fileName="src/routes/[[locale=locale]]/+layout.ts"
import type { Load } from "@sveltejs/kit";
import { defaultLocale, type Locale } from "intlayer";

export const prerender = true;

// Use the generic Load type
export const load: Load = ({ params }) => {
  const locale: Locale = (params.locale as Locale) ?? defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from "svelte-intlayer";
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// Initialise Intlayer with the locale from the route
  $effect(() => {
      setupIntlayer(data.locale);
  });
	// Use the layout content dictionary
	const layoutContent = useIntlayer('layout');
</script>

<Header />

<main>
	{@render children()}
</main>

<footer>
	<p>
		{$layoutContent.footer.prefix.value}{' '}
		<a href="https://svelte.dev/docs/kit">{$layoutContent.footer.linkLabel.value}</a>{' '}
		{$layoutContent.footer.suffix.value}
	</p>
</footer>

<style>
  /*  */
</style>
```

```ts fileName="src/routes/[[locale=locale]]/+page.ts"
export const prerender = true;
```

```svelte fileName="src/routes/[[locale=locale]]/+page.svelte"
<script lang="ts">
	import { useIntlayer } from "svelte-intlayer";

	// Use the home content dictionary
	const homeContent = useIntlayer('home');
</script>

<svelte:head>
	<title>{$homeContent.title.value}</title>
</svelte:head>

<section>
	<h1>
		{$homeContent.title}
	</h1>
</section>

<style>
  /*  */
</style>
```

</Step>

<Step number={8} title="Internationalised Links" isOptional={true}>

For SEO, it is recommended to prefix your routes with the locale (e.g., `/en/about`, `/fr/about`). This component automatically prefixes any link with the current locale.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from "svelte-intlayer";

  let { href = "" } = $props();
  const { locale } = useLocale();

  // Helper to prefix URL with current locale
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

If you use `goto` from SvelteKit, you can use the same logic with `getLocalizedUrl` to navigate to the localised URL:

```typescript
import { goto } from "$app/navigation";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";

const { locale } = useLocale();
const localizedPath = getLocalizedUrl("/about", $locale);
goto(localizedPath); // Navigates to /en/about or /fr/about depending on locale
```

</Step>

<Step number={9} title="Language Switcher" isOptional={true}>

To allow users to switch languages, update the URL.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from "svelte-intlayer";
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (newLocale) => {
      const localizedPath = getLocalizedUrl($page.url.pathname, newLocale);
      goto(localizedPath);
    },
  });
</script>

<ul class="locale-list">
  {#each availableLocales as localeEl}
    <li>
      <a
        href={getLocalizedUrl($page.url.pathname, localeEl)}
        onclick={(e) => {
          e.preventDefault();
          setLocale(localeEl); // Will set the locale in the store and trigger onLocaleChange
        }}
        class:active={$locale === localeEl}
      >
        {getLocaleName(localeEl)}
      </a>
    </li>
  {/each}
</ul>

<style>
  /* */
</style>
```

</Step>

<Step number={10} title="Add backend proxy" isOptional={true}>

To add a backend proxy to your SvelteKit application, you can use the `intlayerProxy` function provided by the `vite-intlayer` plugin. This plugin will automatically detect the best locale for the user based on the URL, cookies, and browser language preferences.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayerProxy(), // should be placed first
    intlayer(),
    sveltekit(),
  ],],
});
```

</Step>

<Step number={11} title="Set up the intlayer editor / CMS" isOptional={true}>

To set up the intlayer editor, you must follow the [intlayer editor documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md).

To set up the intlayer CMS, you must follow the [intlayer CMS documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md).

To be able to visualise the intlayer editor selector, you will have to use the component syntax in your intlayer content.

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component");
</script>

<div>

  <!-- Render content as simple content  -->
  <h1>{$content.title}</h1>

  <!-- Render content as a component (required by the editor) -->
  {@const Component = $content.component}<Component />
</div>
```

</Step>

</Steps>

### Git Configuration

It is recommended to ignore the files generated by Intlayer.

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

---

### Go Further

- **Visual Editor**: Integrate the [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md) to edit translations directly from the UI.
- **CMS**: Externalise your content management using the [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md).

```

```
