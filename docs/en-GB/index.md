# Intlayer Documentation

Welcome to the official **Intlayer** documentation! Here, you'll find everything you need to integrate, configure, and master Intlayer for all your internationalization (i18n) needs,whether you’re working with **Next.js**, **React**, **Vite**, **Express**, or another JavaScript environment.

Intlayer offers a flexible, modern approach to translating your application. Our docs will guide you from installation and setup through advanced features like **AI-powered translation**, **TypeScript** definitions, and **server component** support—empowering you to create a seamless, multilingual experience.

---

## Getting Started

- **[Introduction](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/introduction.md)**  
  Get an overview of how Intlayer works, its core features, and why it’s a game-changer for i18n.

- **[How Intlayer Works](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/how_works_intlayer.md)**  
  Dive into the architectural design and learn how Intlayer handles everything from content declaration to translation delivery.

- **[Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/configuration.md)**  
  Customize Intlayer to suit your project’s needs. Explore middleware options, directory structures, and advanced settings.

- **[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_cli.md)**  
  Manage content and translations using our command-line tool. Discover how to push and pull content, automate translations, and more.

- **[Intlayer Editor](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_editor.md)**  
  Simplify collaboration with non-developers and power your translations with AI—directly in our free, intuitive CMS.

---

## Core Concepts

### Content Declaration

Organise your multilingual content close to your code to keep everything consistent and maintainable.

- **[Get Started](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/content_declaration/get_started.md)**  
  Learn the basics of declaring your content in Intlayer.

- **[Translation](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/content_declaration/translation.md)**  
  Understand how translations are generated, stored, and utilised in your application.

- **[Enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/content_declaration/enumeration.md)**  
  Easily manage repeated or fixed sets of data across various languages.

- **[Function Fetching](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/content_declaration/function_fetching.md)**  
  See how to dynamically fetch content with custom logic to match your project’s workflow.

---

## Environments & Integrations

We’ve built Intlayer with flexibility in mind, offering seamless integration across popular frameworks and build tools:

- **[Intlayer with Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_nextjs_15.md)**
- **[Intlayer with Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_nextjs_14.md)**
- **[Intlayer with Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_nextjs_page_router.md)**
- **[Intlayer with React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_create_react_app.md)**
- **[Intlayer with Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_vite+react.md)**
- **[Intlayer with Express](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_express.md)**

Each integration guide includes best practices for using Intlayer’s features—like **server-side rendering**, **dynamic routing**, or **client-side rendering**—so you can maintain a fast, SEO-friendly, and highly scalable application.

---

## Packages

Intlayer’s modular design offers dedicated packages for specific environments and needs:

### `intlayer`

Core utility functions to configure and manage your i18n setup.

- **[getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/packages/intlayer/getConfiguration.md)**
- **[getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/packages/intlayer/getHTMLTextDir.md)**
- **[getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/packages/intlayer/getLocaleLang.md)**
- **[getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/packages/intlayer/getLocaleName.md)**
- **[getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/packages/intlayer/getLocalizedUrl.md)**
- **[getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/packages/intlayer/getMultilingualUrls.md)**
- **[getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/packages/intlayer/getPathWithoutLocale.md)**
- **[getTranslationContent](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/packages/intlayer/getTranslationContent.md)**
- **[getEnumerationContent](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/packages/intlayer/getEnumerationContent.md)**

### `express-intlayer`

Leverage Intlayer within **Express**-based apps:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/packages/express-intlayer/t.md)**  
  A minimal, straightforward translation helper for your server routes and views.

### `react-intlayer`

Enhance your **React** applications with powerful hooks:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/packages/react-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/packages/react-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/packages/react-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/packages/react-intlayer/useLocale.md)**

### `next-intlayer`

Seamlessly integrate with **Next.js**:

- **[t](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/packages/next-intlayer/t.md)**
- **[useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/packages/next-intlayer/useIntlayer.md)**
- **[useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/packages/next-intlayer/useDictionary.md)**
- **[useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/packages/next-intlayer/useLocale.md)**

---

## Additional Resources

- **[Blog: Intlayer and i18next](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_i18next.md)**  
  Learn how Intlayer complements and compares with the popular **i18next** library.

- **[Live Tutorial on YouTube](https://youtu.be/W2G7KxuSD4c?si=GyU_KpVhr61razRw)**  
  Watch a comprehensive demo and learn how to integrate Intlayer in real-time.

---

## Contributing & Feedback

We value the power of open-source and community-driven development. If you’d like to propose improvements, add a new guide, or correct any issues in our docs, feel free to submit a Pull Request or open an issue on our [GitHub repository](https://github.com/aymericzip/intlayer/blob/main/docs).

**Ready to translate your application faster and more efficiently?** Dive into our docs to start using Intlayer today. Experience a robust, streamlined approach to internationalization that keeps your content organised and your team more productive.

Happy translating!  
— The Intlayer Team
