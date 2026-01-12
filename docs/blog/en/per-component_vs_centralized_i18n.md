---
createdAt: 2025-09-10
updatedAt: 2025-09-10
title: Per-Component vs. Centralized i18n: A New Approach with Intlayer
description: A deep dive into internationalization strategies in React, comparing centralized, per-key, and per-component approaches, and introducing Intlayer.
keywords:
  - i18n
  - React
  - Internationalization
  - Intlayer
  - Optimization
  - Bundle Size
slugs:
  - blog
  - per-component-vs-centralized-i18n
---

# Per-Component vs. Centralized i18n

The per-component approach is not a new concept. For example, in the Vue ecosystem, `vue-i18n` supports [Single File Component (SFC) i18n](https://vue-i18n.intlify.dev/guide/advanced/sfc.html). Nuxt also offers [per-component translations](https://i18n.nuxtjs.org/docs/guide/per-component-translations), and Angular employs a similar pattern through its [Feature Modules](https://v17.angular.io/guide/feature-modules).

Even in a Flutter app, we can often find this pattern:

```bash
lib/
└── features/
    └── login/
        ├── login_screen.dart
        └── login_screen.i18n.dart  # <- Translations live here
```

```dart fileName='lib/features/login/login_screen.i18n.dart'
import 'package:i18n_extension/i18n_extension.dart';

extension Localization on String {
  static var _t = Translations.byText("en") +
      {
        "Hello": {
          "en": "Hello",
          "fr": "Bonjour",
        },
      };

  String get i18n => localize(this, _t);
}
```

However, in the React world, we mainly see different approaches, that I will group in three categories:

<Columns>
  <Column>

**Centralized approach** (i18next, next-intl, react-intl, lingui)

- (with no namespaces) considers a single source to retrieve content. By default, you load the content from all pages when your app loads.

  </Column>
  <Column>

**Granular approach** (intlayer, inlang)

- fine-grain the content retrieval per key, or per-component.

  </Column>
</Columns>

> In this blog, I won't focus on compiler-based solutions, which I already covered here: [Compiler vs Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/compiler_vs_declarative_i18n.md).
> Note that compiler-based i18n (e.g., Lingui) simply automates the extraction and loading of content. Under the hood, they often share the same limitations as others approaches.

> Note that the more you fine-grain how you retrieve your content, the more you risk inserting additional state and logic into your components.

Granular approaches are more flexible than centralized ones, but it's often a tradeoff. Even if "tree shaking" is advertised by that libraries, in practice, you'll often end up loading a page in every language.

So, broadly speaking, the decision breaks down like this:

- **More pages than languages** → Favor a granular approach
- **More languages than pages** → Lean toward a centralized approach

Of course, the library authors are aware of these limitations and provide workarounds.
Among them: splitting into namespaces, dynamically loading JSON files (`await import()`), or purging content at build time.

At the same time, you should know that when you dynamically load your content, you introduce additional requests to your server. Each extra `useState` or hook means an extra server request.

> To fix this point, Intlayer suggests grouping multiple content definitions under a same key, Intlayer will then merge that content.

But from all that solution, it's clear that the most popular approach is the centralized one.

### So why is the Centralized approach so popular?

- First, i18next was the first solution to become widely used, following a philosophy inspired by PHP and Java architectures (MVC), which rely on a strict separation of concerns (keeping content separate from code). It arrived in 2011, establishing its standards even before the massive shift toward Component-Based Architectures (like React).
- Then, once a library is widely adopted, it becomes difficult to shift the ecosystem to other patterns.
- Using a centralized approach also makes things easier in Translation Management Systems such as Crowdin, Phrase, or Localized.
- The logic behind a per-component approach is more complex than a centralized one and takes extra time to develop, especially when you have to solve problems like identifying where the content is located.

### Ok, but why not just stick to a Centralized approach?

Let me tell you why it can be problematic for your app:

- **Unused Data:**
  When a page loads, you often load the content from all other pages. (In a 10-page app, that's 90% unused content loaded). You lazy load a modal? The i18n library doesn't care, it loads the strings first anyway.
- **Performance:**
  For each re-render, every single one of your components is hydrated with a massive JSON payload, which impacts your app's reactivity as it grows.
- **Maintenance:**
  Maintaining large JSON files is painful. You have to jump across files to insert a translation, ensuring no translations are missing and no **orphan keys** are left behind.
- **Design-system:**
  It creates incompatibility with design systems (e.g., a `LoginForm` component) and constrains component duplication across different apps.

**"But we invented Namespaces!"**

Sure, and that's an massive move forward. Let's look at the comparison of the main bundle size of a Vite + React + React Router v7 + Intlayer setup. We simulated a 20-page application.

The first example does not include lazy-loaded translations per locale and no namespace splitting. The second includes content purging + dynamic loading for translations.

| Optimized bundle                                                                                                         | Bundle not optimized                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| ![no optimized bundle](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle_no_optimization.png?raw=true) | ![optimized bundle](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true) |

So thanks for namespaces, we moved from this structure:

```bash
locale/
├── en.json
├── fr.json
└── es.json
```

To this one:

```bash
locale/
├── en/
│   ├── common.json
│   ├── navbar.json
│   ├── footer.json
│   ├── home.json
│   └── about.json
├── fr/
│   └── ...
└── es/
    └── ...

```

Great! But is it enough? Not really. Now you have to finely manage what part of your app content should be loaded, and where.
Conclusion, the vast majority of projects just skip this part due to the complexity (see [next-i18next guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18n_using_next-i18next.md) for instance to see the challenges that represents (just) following good practices).
Consequently, those projects end up with the massive JSON loading problem explained earlier.

> Note that this problem is not specific to i18next, but to all centralized approaches listed above.

However, I want to remember your that not all granular approaches solve this. For instance, `vue-i18n SFC`'s or `inlang` approaches do not inherently lazy load the translations per locale, so you simply trade the bundle size problem for another one.

Moreover, without proper separation of concerns, it becomes much more difficult to extract and provide your translations to translators for review.

### How Intlayer's per-component approach solves this

Intlayer proceeds in several steps:

1. **Declaration:** Declare your content anywhere in your codebase using `*.content.{ts|jsx|cjs|json|json5|...}` files. This ensures separation of concerns while keeping content colocated. A content file can be per-locale or multilingual.
2. **Processing:** Intlayer runs a build step to process JS logic, handle missing translation fallbacks, generate TypeScript types, manage duplicated content, and fetch content from your CMS, and more.
3. **Purging:** When your app builds, Intlayer purges unused content (a bit like how Tailwind manages your classes) by replacing the content as follows:

**Declaration:**

```tsx
// src/MyComponent.tsx
export const MyComponent = () => {
  const content = useIntlayer("my-key");
  return <h1>{content.title}</h1>;
};
```

```tsx
// src/myComponent.content.ts
export const {
  key: "my-key",
  content: t({
    en: { title: "My title" },
    fr: { title: "Mon titre" }
  })
}

```

**Processing:** Intlayer builds the dictionary based on the `.content` file and generates:

```json5
// .intlayer/dynamic_dictionary/en/my-key.json
{
  "key": "my-key",
  "content": { "title": "My title" },
}
```

**Replacement:** Intlayer transforms your component during the application build.

**- Static Import Mode:**

```tsx
// Representation of the component in JSX-like syntax
export const MyComponent = () => {
  const content = useDictionary({
    key: "my-key",
    content: {
      nodeType: "translation",
      translation: {
        en: { title: "My title" },
        fr: { title: "Mon titre" },
      },
    },
  });

  return <h1>{content.title}</h1>;
};
```

**- Dynamic Import Mode:**

```tsx
// Representation of the component in JSX-like syntax
export const MyComponent = () => {
  const content = useDictionaryAsync({
    en: () =>
      import(".intlayer/dynamic_dictionary/en/my-key.json", {
        with: { type: "json" },
      }).then((mod) => mod.default),
    // Same for other languages
  });

  return <h1>{content.title}</h1>;
};
```

> `useDictionaryAsync` uses a Suspense-like mechanism to load the localized JSON only when needed.

**Key benefits of this per-component approach:**

- Keeping your content declaration close to your components allows better maintainability (e.g moving a components to another app or design system. Deleting the component folder remove the related content too, as you probably already do for your `.test`, `.stories`)

- A per-component approach prevents AI agents from needing to jump across all your different files. It treats all translations in one place, limiting the complexity of the task, and the amount of tokens used.

### Limitations

Of course, this approach comes with trade-offs:

- It makes things harder to connect to other l10n systems and extra tooling.
- You get locked in (which is basically already the case with any i18n solution due to their specific syntax).

That's the reason why Intlayer tries to provide a complete toolset for i18n (100% free and OSS), including AI translation using your own AI Provider and API keys. Intlayer also provides tooling to synchronize your JSON, functioning like ICU / vue-i18n / i18next message formatters to map the content to their specific formats.
