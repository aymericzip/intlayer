---
docName: roadmap
url: /doc/roadmap
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/roadmap.md
createdAt: 2025-03-01
updatedAt: 2025-03-01
title: Roadmap
description: Discover the roadmap of Intlayer. See all the features that Intlayer implemented, and is planning to implement.
keywords:
  - Roadmap
  - Intlayer
  - Internationalization
  - CMS
  - Content Management System
  - Visual Editor
---

# Intlayer: Feature Overview & Roadmap

Intlayer is a content management and internationalization solution designed to streamline how you declare, manage, and update content across your applications. It offers powerful features such as centralized or distributed content declaration, extensive internationalization options, Markdown support, conditional rendering, TypeScript/JavaScript/JSON integration, and more. Below is a comprehensive overview of what Intlayer currently provides, followed by upcoming roadmap features.

---

## Current Features

### 1. Content Declaration

#### Centralized or Distributed

- **Centralized**: Declare all your content in a single, large file at the base of your application, similar to i18next, so you can manage everything in one place.
- **Distributed**: Alternatively, split your content into separate files at the component or feature level for better maintainability. This keeps your content close to the relevant code (components, tests, Storybook, etc.). Removing a component ensures any associated content is also removed, preventing leftover data from cluttering your codebase.

> Resources:
>
> - [Content Declaration](https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/get_started.md)

### 2. Internationalization

- Support for **230 languages and locales** (including regional variants like French (France), English (Canada), English (UK), Portuguese (Portugal), etc.).
- Easily manage translations for all these locales from one place.

> Resources:
>
> - [Internationalization](https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/translation.md)

### 3. Markdown Support

- Declare content using **Markdown**, allowing you to automatically format text with paragraphs, headings, links, and more.
- Ideal for blog posts, articles, documentation pages, or any scenario where rich text formatting is needed.

> Resources:
>
> - [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/markdown.md)

### 4. External file support

- Import content from external files as text format, such as TXT, HTML, JSON, YAML, or CSV.
- Use the `file` function in Intlayer to embed external file content into a dictionary, ensuring seamless integration with the Intlayer Visual Editor and CMS.
- Supports dynamic content updates, meaning that when the source file is modified, the content updates automatically within Intlayer.
- Enables multilingual content management by linking language-specific Markdown files dynamically.

> Resources:
>
> - [File Content Embedding](https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/file.md)

### 5. Dynamic Content & Function Fetching

Intlayer provides various methods to insert and manage dynamic content, ensuring flexibility and adaptability in content delivery. This includes functions for dynamic content insertion, conditional rendering, enumeration, nesting, and function fetching.

1. Dynamic Content Insertion

   Use the insert function to define content with placeholders ({{name}}, {{age}}, etc.).

   Enables template-like content that adapts based on user input, API responses, or other dynamic data sources.

   Works seamlessly with TypeScript, ESM, CommonJS, and JSON configurations.

   Easily integrates with React Intlayer and Next Intlayer using useIntlayer.

2. Conditional Rendering

   Define content that adapts based on user-specific conditions, such as language or authentication status.

   Tailor personalized experiences without duplicating content across multiple files.

3. Enumeration & Pluralization

   Use the enu function to define content variations based on numeric values, ranges, or custom keys.

   Ensures automatic selection of the correct phrase based on a given value.

   Supports ordering rules, ensuring predictable behavior.

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

  - Makes it easy to integrate with external tools (like visual editors) due to its standardized format.

  > Resources:
  >
  > - [Content Declaration Formats](https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/content_extention_customization.md)

---

## Integration with Frameworks & Environments

### 1. Next.js

#### a. Server and Client Components

- Provides a **unified content management approach** for both server and client components.
- Offers a built-in context for server components, simplifying implementation compared to other solutions.

#### b. Metadata, Sitemaps, and robots.txt

- Fetch and inject content dynamically to generate metadata, sitemaps, or `robots.txt` files.

#### c. Middleware

- Add a middleware to **redirect users** to content based on their preferred language.

#### d. Turbopack and Webpack Compatibility

- Fully compatible with the new Next.js Turbopack as well as traditional Webpack.

> Resources:
>
> - [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_nextjs_15.md)

### 2. Vite

- Similar to Next.js, you can integrate Intlayer with Vite and use a **middleware** to redirect users to content based on their preferred language.

> Resources:
>
> - [Vite](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_vite+react.md)

### 3. Express

- Manage content and internationalize backend services built on Express.
- Personalize emails, error messages, push notifications, and more with localized text.

> Resources:
>
> - [Express](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_express.md)

### 4. React Native

- Integrate Intlayer with React Native to manage content and internationalize your mobile applications.
- Supports both iOS and Android platforms.

> Resources:
>
> - [React Native](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_react_native.md)

### 5. Lynx

- Integrate Intlayer with Lynx to manage content and internationalize your mobile applications.
- Supports both iOS and Android platforms.

> Resources:
>
> - [Lynx](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_lynx.md)

---

## Visual Editors and CMS

### 1. Local Visual Editor

- A **free, local visual editor** that lets you edit your application content by directly selecting elements on the page.
- Integrates AI features to help:
  - Generate or fix translations
  - Check syntax and spelling
  - Suggest improvements
- Can be hosted locally or deployed on a remote server.

> Resources:
>
> - [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_visual_editor.md)

### 2. Intlayer CMS (Remote)

- A **hosted CMS** solution that allows you to manage application content online, without touching your codebase.
- Provides AI-assisted features for declaring content, managing translations, and fixing syntax or spelling errors.
- Interact with your content via your live application interface.

> Resources:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_CMS.md)

---

## Intlayer CLI

- **Audit and Translation Generation**: Run audits on your content files to generate missing translations or identify unused ones.
- **Remote Interaction**: Publish your local content to the remote CMS or fetch remote content to integrate into your local application.
- Useful for **CI/CD pipelines**, ensuring your content is always synchronized with your code.

> Resources:
>
> - [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_cli.md)

---

## Environments

- Use **environment variables** to configure Intlayer differently across production, testing, and local environments.
- Define which visual editor or remote CMS project to target depending on your environment.

---

## Hot Content Updates

- When using remote dictionaries and the Intlayer CMS, you can **update your application’s content on the fly**, without needing to redeploy.

> Resources:
>
> - [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_CMS.md)

---

## Upcoming Features

### 1. A/B Testing & Personalization

- **Multivariate Testing**: Test different versions of a given piece of content to see which performs best (e.g., higher click rate).
- **Data-Driven Personalization**: Display different content based on user demographics (gender, age, location, etc.), or other behavior patterns.
- **Automated Iteration**: Allow AI to automatically test multiple versions and either pick the top performer or recommend options for admin approval.

### 2. Versioning

- Restore previous versions of your content with **content versioning**.
- Track changes over time and revert to earlier states if needed.

### 3. Automatic Translation

- For remote CMS users, **one-click translation generation** for any supported language.
- The system would generate translations in the background and then prompt you for validation or edits.

### 4. SEO Enhancements

- Tools to **analyze keywords**, user search intent, and emerging trends.
- Suggest improved content for better rankings, and track long-term performance.

### 5. Compatibility with More Frameworks

- Efforts are underway to support **Vue, Solid, Svelte, Angular**, and more.
- Aim to make Intlayer compatible with **any JavaScript-powered application**.

### 6. IDE Extensions

- Extensions for major IDEs to provide a **graphical interface** for managing local and remote translations.
- Features could include auto-generating content declaration files for components, direct integration with the Intlayer CMS, and real-time validation.

---

## Conclusion

Intlayer aims to be a one-stop solution for content management and internationalization. It focuses on flexibility (centralized or distributed files), broad language support, easy integration with modern frameworks and bundlers, and powerful AI-driven features. As new capabilities, such as A/B testing, versioning, and automated translations, become available, Intlayer will continue to simplify content workflows and elevate user experiences across different platforms.

Stay tuned for upcoming releases, and feel free to explore the existing features to see how Intlayer can help centralize and optimize your content management processes today!
