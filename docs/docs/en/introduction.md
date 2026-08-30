---
createdAt: 2025-08-23
updatedAt: 2026-08-29
title: Introduction
description: Discover how Intlayer works. See the steps used by Intlayer in your application. See what does the different packages do.
keywords:
  - Introduction
  - Get started
  - Intlayer
  - Application
  - Packages
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author: aymericzip
---

# Intlayer Documentation

Welcome to the official Intlayer documentation! Here, you'll find everything you need to integrate, configure, and master Intlayer for all your internationalization (i18n) needs, whether you’re working with Next.js, React, Vite, Express, or another JavaScript environment.

## Introduction

### What is Intlayer?

**Intlayer** is an internationalization library designed specifically for JavaScript developers. It allow the declaration of your content everywhere in your code. It converts declaration of multilingual content into structured dictionaries to integrate easily in your code. Using TypeScript, **Intlayer** make your development stronger and more efficient.

Intlayer also provides an optional visual editor that allows you to easily edit and manage your content. This editor is particularly useful for developers who prefer a visual interface for content management, or for teams generating content without having to worry about code.

### Example of usage

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### Why Intlayer over alternatives?

Compared to main solutions like `next-intl` or `i18next`, Intlayer is a solution that comes with integrated optimizations such as:

<AccordionGroup>

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

## Main Features

Intlayer offers a variety of features tailored to meet the needs of modern web development. Below are the key features, with links to detailed documentation for each:

- **Internationalization Support**: Enhance your application's global reach with built-in support for internationalization.
- **Visual Editor**: Improve your development workflow with editor plugins designed for Intlayer. Check out the [Visual Editor Guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md).
- **Configuration Flexibility**: Customize your setup with extensive configuration options detailed in the [Configuration Guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).
- **Advanced CLI Tools**: Manage your projects efficiently using Intlayer's command line interface. Explore the capabilities in the [CLI Tools Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

## Core Concepts

### Dictionary

Organize your multilingual content close to your code to keep everything consistent and maintainable.

- **[Get Started](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)**  
  Learn the basics of declaring your content in Intlayer.

- **[Translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/translation.md)**  
  Understand how translations are generated, stored, and utilized in your application.

- **[Enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/enumeration.md)**  
  Easily manage repeated or fixed sets of data across various languages.

- **[Condition](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/condition.md)**  
  Learn how to use conditional logic in Intlayer to create dynamic content.

- **[Insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/insertion.md)**
  Discover how to insert values in a string using insertion placeholders.

- **[Function Fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/function_fetching.md)**  
  See how to dynamically fetch content with custom logic to match your project’s workflow.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown.md)**  
  Learn how to use Markdown in Intlayer to create rich content.

- **[File embeddings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/file.md)**  
  Discover how to embed externals files in Intlayer to use them in the content editor.

- **[Nesting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/nesting.md)**  
  Understand how to nest content in Intlayer to create complex structures.

### Environments & Integrations

We’ve built Intlayer with flexibility in mind, offering seamless integration across popular frameworks and build tools:

- **[Intlayer with Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md)**
- **[Intlayer with Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_15.md)**
- **[Intlayer with Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md)**
- **[Intlayer with Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md)**
- **[Intlayer with React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_create_react_app.md)**
- **[Intlayer with Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react.md)**
- **[Intlayer with React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react_router_v7.md)**
- **[Intlayer with Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_tanstack.md)**
- **[Intlayer with React Native and Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react_native+expo.md)**
- **[Intlayer with Lynx and React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_lynx+react.md)**
- **[Intlayer with Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+preact.md)**
- **[Intlayer with Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+vue.md)**
- **[Intlayer with Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nuxt.md)**
- **[Intlayer with Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+svelte.md)**
- **[Intlayer with SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_svelte_kit.md)**
- **[Intlayer with Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_express.md)**
- **[Intlayer with NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nestjs.md)**
- **[Intlayer with Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_hono.md)**
- **[Intlayer with Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_angular_21.md)**

Each integration guide includes best practices for using Intlayer’s features, like **server-side rendering**, **dynamic routing**, or **client-side rendering**, so you can maintain a fast, SEO-friendly, and highly scalable application.

## Contributing & Feedback

We value the power of open-source and community-driven development. If you’d like to propose improvements, add a new guide, or correct any issues in our docs, feel free to submit a Pull Request or open an issue on our [GitHub repository](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Ready to translate your application faster and more efficiently?** Dive into our docs to start using Intlayer today. Experience a robust, streamlined approach to internationalization that keeps your content organized and your team more productive.

## Frequently Asked Questions

<FAQ>

<Question title="What is Intlayer used for?">

Intlayer is an internationalization (i18n) library for JavaScript and TypeScript applications. You declare the content of a component next to that component in a `.content.ts` file, Intlayer compiles those declarations into typed dictionaries at build time, and your components read them through a hook such as `useIntlayer`. It covers translation, plural rules, gender, Markdown, locale aware routing, SEO metadata, AI assisted translation and a visual editor for non developers.

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

<Question title="What are the different solutions available to internationalize a JavaScript app?">

The field falls into three generations:

- **Runtime catalog libraries**: `i18next`, `react-i18next`, `next-i18next`, `vue-i18n`, `ngx-translate`. Messages live in JSON namespaces loaded at runtime. Mature and framework agnostic, but untyped and shipped whole.
- **Compile time message libraries**: `Lingui`, `Paraglide`, `react-intl` and `next-intl` with an extraction step. Better bundle behaviour and some typing, still centralized catalogs.
- **Content layer libraries**: `Intlayer`. Content is declared per component and compiled per component, so typing, tree shaking, tooling and editing come from the same source.

See [why Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/interest_of_intlayer.md) for the detailed comparison, and the [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/index.md) for measured bundle and performance numbers.

</Question>

<Question title="Which frameworks does Intlayer support?">

React, Next.js, Vite, TanStack Start, React Router, Vue, Nuxt, Svelte, SvelteKit, Angular, Solid, Preact, Lit, Astro with every island framework, React Native with Expo, Lynx, and on the server Express, Fastify, NestJS, Hono, Elysia and AdonisJS. Each has its own guide under [environments](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/introduction.md).

</Question>

<Question title="Why declare content next to the component instead of in a central JSON file?">

Three reasons. A page ships only the entries its components render, instead of a whole namespace, which is what cuts bundle size. A feature folder can be copied or deleted in one piece, without hunting through a shared catalog for orphaned keys. And an LLM or an agent editing a component sees its content in the same folder, which is why co-location makes AI assisted work reliable. See [how Intlayer works](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/how_works_intlayer.md).

</Question>

<Question title="How do I translate my app automatically with AI?">

Run `npx intlayer fill`. The CLI detects missing translations and fills them with the LLM of your choice, using your own provider and API key, so you pay the AI provider directly. `--git-diff` restricts the run to the content changed on the branch, which keeps it cheap in CI. See the [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/fill.md) and [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/CI_CD.md).

</Question>

<Question title="How do I find missing translations?">

Run `npx intlayer test`. It fails when a declared locale is missing content, so an untranslated string never reaches production. The [VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/vs_code_extension.md) shows the same errors inline, and the [ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/eslint.md) flags hardcoded strings with its `no-raw-text` rule. See [testing your content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/testing.md).

</Question>

<Question title="Do I need to put the locale in the URL?">

No. `routing.mode` accepts `"prefix-no-default"` (the default, `/about` and `/fr/about`), `"prefix-all"`, `"no-prefix"` and `"search-params"`, and `routing.domains` maps each locale to its own domain. Whatever the scheme, `getMultilingualUrls` builds the `hreflang` alternates for your metadata and sitemap. See the [configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Question>

<Question title="How can translators and content editors work without touching the code?">

The [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) runs on your own infrastructure and lets anyone click on the text of your running app to edit it, writing the change back to the code base. The [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) externalizes content so it can change without a deployment, with [live sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/live.md) applying updates at runtime.

</Question>

<Question title="Is Intlayer free and open source?">

Yes. Intlayer is open source under the Apache 2.0 license, and the library, CLI, compiler and visual editor are free to use, commercial projects included. The hosted CMS is an optional paid service, and it can also be [self hosted](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/self_hosting.md).

</Question>

</FAQ>
