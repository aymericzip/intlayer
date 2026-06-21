---
createdAt: 2025-06-18
updatedAt: 2026-05-31
title: "Nuxt i18n - Complete guide to translate your app"
description: "No more i18next. The 2026 guide to building a multilingual (i18n) Nuxt app. Translate with AI agents and optimize bundle size, SEO and performances."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - nuxt-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-nuxt-4-template
applicationShowcase: https://intlayer-nuxt-4-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=nhUcUAVQ6eQ
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Add init command"
  - version: 7.3.13
    date: 2025-12-08
    changes: "Unused TypeScript configuration"
  - version: 7.3.11
    date: 2025-12-07
    changes: "Update LocaleSwitcher, SEO, metadata"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Initial history"
author: aymericzip
---

# Translate your Nuxt and Vue website using Intlayer | Internationalization (i18n)

## Table of Contents

<TOC/>

## Why Intlayer over alternatives?

Compared to main solutions like `@nuxtjs/i18n` or `i18next`, Intlayer is a solution that comes with integrated optimizations such as:

<AccordionGroup>

<Accordion header="Full Nuxt coverage">

Intlayer is optimized to work perfectly with Nuxt by offering **multilingual routing**, **middleware for locale detection**, **sitemap**, and all the features needed for scaling internationalization (i18n).

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

## Step-by-Step Guide to Set Up Intlayer in a Nuxt Application

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="How to translate an Nuxt and Vue app using Intlayer? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-nuxt-4-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-nuxt-4-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-nuxt-4-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

See [Application Template](https://github.com/aymericzip/intlayer-nuxt-4-template) on GitHub.

<Steps>

<Step number={1} title="Install Dependencies">

Install the necessary packages using npm:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> the `--interactive` flag is optional. Use `intlayer-cli init` if you're an AI agent.

> This command will detect your environment and install the required packages. For example:

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install --save-dev nuxt-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add --save-dev nuxt-intlayer
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add --save-dev nuxt-intlayer
```

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add --dev nuxt-intlayer
```

- **intlayer**

  The core package that provides internationalization tools for configuration management, translation, [content declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), transpilation, and [CLI commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **vue-intlayer**
  The package that integrates Intlayer with Vue application. It the composables for the Vue components.

- **nuxt-intlayer**
  The Nuxt module that integrates Intlayer with Nuxt applications. It provides automatic setup, middleware for locale detection, cookie management, and URL redirection.

</Step>

<Step number={2} title="Configuration of your project">

Create a config file to configure the languages of your application:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Through this configuration file, you can set up localized URLs, middleware redirection, cookie names, the location and extension of your content declarations, disable Intlayer logs in the console, and more. For a complete list of available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Step>

<Step number={3} title="Integrate Intlayer in Your Nuxt Configuration">

Add the intlayer module to your Nuxt configuration:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... Your existing Nuxt configuration
  modules: ["nuxt-intlayer"],
});
```

> The `nuxt-intlayer` module automatically handles the integration of Intlayer with Nuxt. It sets up the content declaration building, monitors files in development mode, provides middleware for locale detection, and manages localized routing.

</Step>

<Step number={4} title="Declare Your Content">

Create and manage your content declarations to store translations:

```tsx fileName="content/home-page.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { type Dictionary, t } from "intlayer";

const content = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
    metaTitle: t({
      en: "Welcome | My Application",
      fr: "Bienvenue | Mon Application",
      es: "Bienvenido | Mi Aplicación",
    }),
    metaDescription: t({
      en: "Discover your multilingual Nuxt app homepage powered by Intlayer.",
      fr: "Découvrez la page d'accueil multilingue de votre application Nuxt propulsée par Intlayer.",
      es: "Descubre la página de inicio multilingüe de tu aplicación Nuxt impulsada por Intlayer.",
    }),
  },
} satisfies Dictionary;

export default content;
```

> Your content declarations can be defined anywhere in your application as long as they are included in the `contentDir` directory (by default, `./src`). And match the content declaration file extension (by default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> For more details, refer to the [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

</Step>

<Step number={5} title="Utilize Intlayer in Your Code">

Access your content dictionaries throughout your Nuxt application using the `useIntlayer` composable:

```vue fileName="components/HelloWorld.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";

defineProps({
  msg: String,
});

const {
  count,
  edit,
  checkOut,
  nuxtIntlayer,
  learnMore,
  nuxtDocs,
  readTheDocs,
} = useIntlayer("helloworld");
const countRef = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="countRef++">
      <count />
      {{ countRef }}
    </button>
    <p v-html="edit"></p>
  </div>

  <p>
    <checkOut />
    <a href="https://nuxt.com/docs/getting-started/introduction" target="_blank"
      >Nuxt</a
    >, <nuxtIntlayer />
  </p>
  <p>
    <learnMore />
    <a href="https://nuxt.com" target="_blank"><nuxtDocs /></a>.
  </p>
  <p class="read-the-docs"><readTheDocs /></p>
  <p class="read-the-docs">{{ readTheDocs }}</p>
</template>
```

#### Accessing Content in Intlayer

Intlayer offers different APIs to access your content:

- **Component-based syntax** (recommended):
  Use the `<myContent />`, or `<Component :is="myContent" />` syntax to render content as an Intlayer Node. This integrates seamlessly with the [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) and [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

- **String-based syntax**:
  Use `{{ myContent }}` to render the content as plain text, without Visual Editor support.

- **Raw HTML syntax**:
  Use `<div v-html="myContent" />` to render the content as raw HTML, without Visual Editor support.

- **Destructuration syntax**:
  The `useIntlayer` composable returns an Proxy with the content. This proxy can be destructured to access the content while keeping the reactivity.
  - Use `const content = useIntlayer("myContent");` And `{{ content.myContent }}` / `<content.myContent />`.
  - Or use `const { myContent } = useIntlayer("myContent");` And `{{ myContent}}` / `<myContent/>` to destructure the content.

</Step>

<Step number={6} title="Change the language of your content" isOptional={true}>

To change the language of your content, you can use the `setLocale` function provided by the `useLocale` composable. This function allows you to set the locale of the application and update the content accordingly.

Create a component to switch between languages using `NuxtLink`. **Using links instead of buttons for locale switching is a best practice for SEO and page discoverability**, as it allows search engines to crawl and index all localized versions of your pages:

```vue fileName="components/LocaleSwitcher.vue"
<script setup lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Nuxt auto-imports useRoute
const route = useRoute();
const { locale, availableLocales, setLocale } = useLocale();
</script>

<template>
  <nav class="locale-switcher">
    <NuxtLink
      v-for="localeEl in availableLocales"
      :key="localeEl"
      :to="getLocalizedUrl(route.fullPath, localeEl)"
      class="locale-link"
      :class="{ 'active-locale': localeEl === locale }"
      @click="setLocale(localeEl)"
    >
      {{ getLocaleName(localeEl) }}
    </NuxtLink>
  </nav>
</template>
```

> Using `NuxtLink` with proper `href` attributes (via `getLocalizedUrl`) ensures that search engines can discover all language variants of your pages. This is preferable to JavaScript-only locale switching, which search engine crawlers may not follow.

Then, set up your `app.vue` to use layouts:

```vue fileName="app.vue"
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

</Step>

<Step number={7} title="Add localized Routing to your application" isOptional={true}>

Nuxt automatically handles localized routing when using the `nuxt-intlayer` module. This creates routes for each language automatically based on your pages directory structure.

Example:

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

To create localized pages, simply create your Vue files in the `pages/` directory. Here are two example pages:

**Home page (`pages/index.vue`):**

```vue fileName="pages/index.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("home-page");

useHead({
  title: content.metaTitle.raw,
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw,
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

**About page (`pages/about.vue`):**

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Use .raw for primitive string access
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Use .raw for primitive string access
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> Note: `useHead` is auto-imported in Nuxt. You can access content values using either `.value` (reactive) or `.raw` (primitive string) depending on your needs.

The `nuxt-intlayer` module will automatically:

- Detect the user's preferred locale
- Handle locale switching via URL
- Set the appropriate `<html lang="">` attribute
- Manage locale cookies
- Redirect users to the appropriate localized URL

</Step>

<Step number={8} title="Creating a Localized Link Component" isOptional={true}>

To ensure that your application's navigation respects the current locale, you can create a custom `Links` component. This component automatically prefixes internal URLs with the current language, which is essential for **SEO and page discoverability**.

```vue fileName="components/Links.vue"
<script setup lang="ts">
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

interface Props {
  href: string;
  locale?: string;
}

const props = defineProps<Props>();

const { locale: currentLocale } = useLocale();

// Compute the final path
const finalPath = computed(() => {
  // 1. Check if the link is external
  const isExternal = /^https?:\/\//.test(props.href || "");

  // 2. If external, return as is (NuxtLink handles the <a> tag generation)
  if (isExternal) return props.href;

  // 3. If internal, localize the URL
  const targetLocale = props.locale || currentLocale.value;
  return getLocalizedUrl(props.href, targetLocale);
});
</script>

<template>
  <NuxtLink :to="finalPath" v-bind="$attrs">
    <slot />
  </NuxtLink>
</template>
```

Then use this component throughout your application:

```vue fileName="layouts/default.vue"
<script setup lang="ts">
import Links from "~/components/Links.vue";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <slot />
    </main>

    <Links href="/">Home</Links>
    <Links href="/about">About</Links>
  </div>
</template>
```

> By using `NuxtLink` with localized paths, you ensure that:
>
> - Search engines can crawl and index all language versions of your pages
> - Users can share localized URLs directly
> - Browser history works correctly with locale-prefixed URLs

</Step>

<Step number={9} title="Handle Metadata and SEO" isOptional={true}>

Nuxt provides excellent SEO capabilities via the `useHead` composable (auto-imported). You can use Intlayer to handle localized metadata using the `.raw` or `.value` accessor to get the primitive string value:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

// useHead is auto-imported in Nuxt
const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // Use .raw for primitive string access
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // Use .raw for primitive string access
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> Alternatively, you can use the `import { getIntlayer } from "intlayer"` function to get the content without Vue reactivity.

> **Accessing content values:**
>
> - Use `.raw` to get the primitive string value (non-reactive)
> - Use `.value` to get the reactive value
> - Use `<content.key />` component syntax for Visual Editor support

Create the corresponding content declaration:

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      en: "About Us",
      fr: "À Propos",
      es: "Acerca de Nosotros",
    }),
  },
} satisfies Dictionary;

export default aboutPageContent;
```

```json fileName="pages/about-page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-page",
  "content": {
    "metaTitle": {
      "nodeType": "translation",
      "translation": {
        "en": "About Us - My Company",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa"
      }
    },
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "Learn more about our company and our mission",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About Us",
        "fr": "À Propos",
        "es": "Acerca de Nosotros"
      }
    }
  }
}
```

</Step>

<Step number="6b" title="Create a Layout with Navigation" isOptional={true}>

Nuxt layouts allow you to define a common structure for your pages. Create a default layout that includes the locale switcher and navigation:

```vue fileName="layouts/default.vue"
<script setup lang="ts">
import Links from "~/components/Links.vue";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <slot />
    </main>

    <Links href="/">Home</Links>
    <Links href="/about">About</Links>
  </div>
</template>
```

The `Links` component (shown below) ensures that internal navigation links are automatically localized.

</Step>

</Steps>

### Git Configuration

It is recommended to ignore the files generated by Intlayer. This allows you to avoid committing them to your Git repository.

To do this, you can add the following instructions to your `.gitignore` file:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### VS Code Extension

To improve your development experience with Intlayer, you can install the official **Intlayer VS Code Extension**.

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

This extension provides:

- **Autocompletion** for translation keys.
- **Real-time error detection** for missing translations.
- **Inline previews** of translated content.
- **Quick actions** to easily create and update translations.

For more details on how to use the extension, refer to the [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension).

---

### Go Further

To go further, you can implement the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) or externalize your content using the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).
