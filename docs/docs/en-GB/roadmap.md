---
createdAt: 2025-03-01
updatedAt: 2025-06-29
title: Roadmap
description: Discover the roadmap of Intlayer. See all the features that Intlayer has implemented, and is planning to implement.
keywords:
  - Roadmap
  - Intlayer
  - Internationalisation
  - CMS
  - Content Management System
  - Visual Editor
slugs:
  - doc
  - roadmap
---

# Intlayer: Feature Overview & Roadmap

Intlayer is a content management and internationalisation solution designed to streamline how you declare, manage, and update content across your applications. It offers powerful features such as centralised or distributed content declaration, extensive internationalisation options, Markdown support, conditional rendering, TypeScript/JavaScript/JSON integration, and more. Below is a comprehensive overview of what Intlayer currently provides, followed by upcoming roadmap features.

---

## Current Features

### 1. Content Declaration

#### Centralised or Distributed

- **Centralised**: Declare all your content in a single, large file at the base of your application, similar to i18next, so you can manage everything in one place.
- **Distributed**: Alternatively, split your content into separate files at the component or feature level for better maintainability. This keeps your content close to the relevant code (components, tests, Storybook, etc.). Removing a component ensures any associated content is also removed, preventing leftover data from cluttering your codebase.

> Resources:
>
> - [Content Declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/dictionary/get_started.md)

### 2. Internationalisation

- Support for **230 languages and locales** (including regional variants like French (France), English (Canada), English (UK), Portuguese (Portugal), etc.).
- Easily manage translations for all these locales from one place.

> Resources:
>
> - [Internationalisation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/dictionary/translation.md)

### 3. Markdown Support

- Declare content using **Markdown**, allowing you to automatically format text with paragraphs, headings, links, and more.
- Ideal for blog posts, articles, documentation pages, or any scenario where rich text formatting is needed.

> Resources:
>
> - [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/dictionary/markdown.md)

### 4. External file support

- Import content from external files as text format, such as TXT, HTML, JSON, YAML, or CSV.
- Use the `file` function in Intlayer to embed external file content into a dictionary, ensuring seamless integration with the Intlayer Visual Editor and CMS.
- Supports dynamic content updates, meaning that when the source file is modified, the content updates automatically within Intlayer.
- Enables multilingual content management by linking language-specific Markdown files dynamically.

> Resources:
>
> - [File Content Embedding](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/dictionary/file.md)

### 5. Dynamic Content & Function Fetching

Intlayer provides various methods to insert and manage dynamic content, ensuring flexibility and adaptability in content delivery. This includes functions for dynamic content insertion, conditional rendering, enumeration, nesting, and function fetching.

1. Dynamic Content Insertion

   Use the insert function to define content with placeholders ({{name}}, {{age}}, etc.).

   Enables template-like content that adapts based on user input, API responses, or other dynamic data sources.

   Works seamlessly with TypeScript, ESM, CommonJS, and JSON configurations.

   Easily integrates with React Intlayer and Next Intlayer using useIntlayer.

2. Conditional Rendering

   Define content that adapts based on user-specific conditions, such as language or authentication status.

   Tailor personalised experiences without duplicating content across multiple files.

3. Enumeration & Pluralisation

   Use the enu function to define content variations based on numeric values, ranges, or custom keys.

   Ensures automatic selection of the correct phrase based on a given value.

   Supports ordering rules, ensuring predictable behaviour.

4. Nesting & Sub-Content Referencing

   Use the nest function to reference and reuse content from another dictionary, reducing duplication.

   Supports structured and hierarchical content management for better maintainability.

5. Function Fetching

   Intlayer allows content to be declared as functions, enabling both synchronous and asynchronous content retrieval.

   Synchronous Functions: Content is generated dynamically at build time.

   Asynchronous Functions: Fetch data from external sources (e.g., APIs, databases) dynamically.

   Integration: Works with TypeScript, ESM, and CommonJS but is not supported in JSON or remote content files.

### 6. Content Declaration Formats

Intlayer supports **TypeScript** (also JavaScript) and **JSON** for declaring content.

- **TypeScript**:
  - Ensures your content structure is correct and that no translations are missing.
  - Offers strict or more flexible validation modes.
  - Allows dynamic data fetching from variables, functions, or external APIs.

- **JSON**:
  - Makes it easy to integrate with external tools (such as visual editors) due to its standardised format.

  > Resources:
  >
  > - [Content Declaration Formats](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)

### 7. Purging, bundle optimisation and dynamic imports

- Intlayer integrates `Babel` and `SWC` plugins to optimise your bundle and improve performance. It replaces imports, allowing only the dictionaries that are used to be imported into the bundle.
- By activating the option, Intlayer also allows dynamic importing of the dictionary content for the current locale only.

> Resources:
>
> - [Build Configuration](https://intlayer.org/doc/concept/configuration#build-configuration)

---

## Integration with Frameworks & Environments

### 1. Next.js

#### a. Server and Client Components

- Provides a **unified content management approach** for both server and client components.
- Offers a built-in context for server components, simplifying implementation compared to other solutions.

#### b. Metadata, Sitemaps, and robots.txt

- Fetch and inject content dynamically to generate metadata, sitemaps, or `robots.txt` files.

#### c. Middleware

- Add middleware to **redirect users** to content based on their preferred language.

#### d. Turbopack and Webpack Compatibility

- Fully compatible with the new Next.js Turbopack as well as traditional Webpack.

> Resources:
>
> - [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_15.md)

### 2. Vite

- Similar to Next.js, you can integrate Intlayer with Vite and use a **middleware** to redirect users to content based on their preferred language.

> Resources:
>
> - [Vite](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_vite+react.md)

### 3. Express

- Manage content and internationalise backend services built on Express.
- Personalise emails, error messages, push notifications, and more with localised text.

> Resources:
>
> - [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_express.md)

### 4. React Native

- Integrate Intlayer with React Native to manage content and internationalise your mobile applications.
- Supports both iOS and Android platforms.

> Resources:
>
> - [React Native](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_react_native.md)

### 5. Lynx

- Integrate Intlayer with Lynx to manage content and internationalise your mobile applications.
- Supports both iOS and Android platforms.

> Resources:
>
> - [Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_lynx.md)

### 6. Vue

- Integrate Intlayer with Vue to manage content and internationalise your Vite / Vue.js applications.

> Resources:
>
> - [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_vue.md)

### 7. Nuxt

- Integrate Intlayer with Nuxt to manage content and internationalise your Nuxt / Vue.js applications.
- Supports both server and client components.
- Integrates routing and middleware to redirect users to content based on their preferred language.

> Resources:
>
> - [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nuxt.md)

### 8. Preact

- Integrate Intlayer with Preact to manage content and internationalise your Preact applications.

> Resources:
>
> - [Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_preact.md)

---

## Visual Editors and CMS

### 1. Local Visual Editor

- A **free, local visual editor** that allows you to edit your application content by directly selecting elements on the page.
- Integrates AI features to assist with:
  - Generating or correcting translations
  - Checking syntax and spelling
  - Suggesting improvements
- Can be hosted locally or deployed on a remote server.

> Resources:
>
> - [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md)

### 2. Intlayer CMS (Remote)

- A **hosted CMS** solution that enables you to manage application content online, without modifying your codebase.
- Provides AI-assisted features for declaring content, managing translations, and correcting syntax or spelling errors.
- Interact with your content via your live application interface.

> Resources:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md)

---

## IDE Extensions

- Extensions for major IDEs to provide a **graphical interface** for managing local and remote translations.
- Features could include auto-generating content declaration files for components, direct integration with the Intlayer CMS, and real-time validation.

---

## MCP Server

- A **MCP server** that allows you to manage your content and translations using an integrated tool in your IDE.

---

## Intlayer CLI

- **Translation and file generation**: Run audits on your content files to generate missing translations and review inconsistencies.
- **Remote Interaction**: Push your local content to the remote CMS or pull remote content to integrate into your local application.
- **Doc translation and review**: Translate and review your documentation / files etc.

> Resources:
>
> - [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_cli.md)

---

## Environments

- Use **environment variables** to configure Intlayer differently across production, testing, and local environments.
- Define which visual editor or remote CMS project to target depending on your environment.

---

## Hot Content Updates

- When using remote dictionaries and the Intlayer CMS, you can **update your application’s content on the fly**, without needing to redeploy.

> Resources:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md)

---

## Upcoming Features

### 1. A/B Testing & Personalisation

- **Multivariate Testing**: Test different versions of a given piece of content to see which performs best (e.g., higher click rate).
- **Data-Driven Personalisation**: Display different content based on user demographics (gender, age, location, etc.), or other behaviour patterns.
- **Automated Iteration**: Allow AI to automatically test multiple versions and either pick the top performer or recommend options for admin approval.

### 2. Versioning

- Restore previous versions of your content with **content versioning**.
- Track changes over time and revert to earlier states if needed.

### 3. Automatic Translation

- For remote CMS users, **one-click translation generation** for any supported language.
- The system would generate translations in the background and then prompt you for validation or edits.

### 4. SEO Enhancements

- Tools to **analyse keywords**, user search intent, and emerging trends.
- Suggest improved content for better rankings, and track long-term performance.

### 5. Compatibility with More Frameworks

- Efforts are underway to support **Solid, Svelte, Angular**, and more.
- Aim to make Intlayer compatible with **any JavaScript-powered application**.

---

## Conclusion

Intlayer aims to be a one-stop solution for content management and internationalisation. It focuses on flexibility (centralised or distributed files), broad language support, easy integration with modern frameworks and bundlers, and powerful AI-driven features. As new capabilities, such as A/B testing, versioning, and automated translations, become available, Intlayer will continue to simplify content workflows and elevate user experiences across different platforms.

Stay tuned for upcoming releases, and feel free to explore the existing features to see how Intlayer can help centralise and optimise your content management processes today!

---

## Doc History

- 5.5.10 - 2025-06-30: Add Preact and Nuxt support, MCP Server, update CLI
- 5.5.10 - 2025-06-29: Init history
