---
createdAt: 2026-06-12
updatedAt: 2026-08-22
title: Variants
description: Use the variant metadata field in Intlayer content files to declare named or structured content alternatives — A/B tests, seasonal banners, feature-flagged copy, CMS records, user-specific content — and switch between them at runtime without code changes.
keywords:
  - Variants
  - A/B Testing
  - Feature Flags
  - Dynamic Content
  - Dynamic Records
  - CMS
  - Intlayer
  - Internationalization
slugs:
  - doc
  - concept
  - variants
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "Update to Next.js >= 9.4.0 architecture"
  - version: 9.0.0
    date: 2026-06-12
    changes: "Release of the variants feature"
  - version: 9.1.0
    date: 2026-06-26
    changes: "`variant` now accepts a string or an object — the former `meta` / dynamic records are declared as object variants"
  - version: 9.1.1
    date: 2026-07-31
    changes: "A variant declares only the keys it overrides; undeclared variants fall back to the default entry"
  - version: 9.1.2
    date: 2026-08-04
    changes: "Providers accept an ambient `variant` prop; selectors accept an ordered preference chain"
author: aymericzip
---

# Variants

A **variant** is a set of content files that share the same dictionary `key` but each carry a different `variant` value. Intlayer serves the appropriate file based on the selector passed to `useIntlayer`.

The `variant` value can take **two forms**:

- **A string** — a single named alternative (A/B tests, seasonal banners, feature flags).
- **An object** — a structured discriminator addressed by a set of fields (CMS records, user-specific copy, any content keyed by an opaque ID). The whole object is the identity: the selector must provide an **equal** object to resolve the entry.

> The object form replaces the former `meta` field. Anywhere you previously wrote `meta: { id, … }`, write `variant: { id, … }`, and select it with `{ variant: { id, … } }`.

## Named (string) variants

Each file represents one named alternative. Omitting `variant` (or setting it to `"default"`) marks it as the fallback.

```ts fileName="hero-banner.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "hero-banner",
  variant: "default",
  content: {
    headline: t({
      en: "Build faster with Intlayer",
      fr: "Développez plus vite avec Intlayer",
    }),
    cta: t({ en: "Get started", fr: "Commencer" }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="hero-banner.black-friday.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "hero-banner",
  variant: "black_friday",
  content: {
    headline: t({
      en: "50 % off — today only",
      fr: "−50 % — aujourd'hui seulement",
    }),
    cta: t({ en: "Shop now", fr: "Acheter maintenant" }),
  },
} satisfies Dictionary;

export default dictionary;
```

### Partial variants

A variant declares **only the keys it overrides**; the rest are inherited from the default entry.

```ts fileName="hero-banner.summer.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "hero-banner",
  variant: "summer",
  content: {
    headline: t({
      en: "Build faster all summer",
      fr: "Développez plus vite tout l'été",
    }),
  },
} satisfies Dictionary;

export default dictionary;
```

```tsx
useIntlayer("hero-banner", { variant: "summer" });
// → { headline: "Build faster all summer", cta: "Get started" } — `cta` inherited

useIntlayer("hero-banner", { variant: "never-declared" });
// → the default entry
```

So you only add a variant file where the wording actually differs. A key resolves to `null` only when it declares variants but no default entry.

### Consuming named variants

#### Default variant

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → default variant

      return (
        <section>
          <h1>{headline}</h1>
          <a>{cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "next-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → default variant

      return (
        <section>
          <h1>{headline}</h1>
          <a>{cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="Hero.vue" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { headline, cta } = useIntlayer("hero-banner");
    </script>

    <template>
      <section>
        <h1>{{ headline }}</h1>
        <a>{{ cta }}</a>
      </section>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="Hero.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("hero-banner");
    </script>

    <section>
      <h1>{$content.headline}</h1>
      <a>{$content.cta}</a>
    </section>
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "preact-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → default variant

      return (
        <section>
          <h1>{headline}</h1>
          <a>{cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "solid-intlayer";

    export const Hero = () => {
      const content = useIntlayer("hero-banner");
      // → default variant

      return (
        <section>
          <h1>{content().headline}</h1>
          <a>{content().cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="hero.component.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-hero",
      template: `
        <section>
          <h1>{{ content().headline }}</h1>
          <a>{{ content().cta }}</a>
        </section>
      `,
    })
    export class HeroComponent {
      content = useIntlayer("hero-banner");
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="hero.js"
    import { useIntlayer } from "vanilla-intlayer";

    const { headline, cta } = useIntlayer("hero-banner");

    document.body.innerHTML = `
      <section>
        <h1>${headline}</h1>
        <a>${cta}</a>
      </section>
    `;
    ```

  </Tab>
</Tabs>

#### Named variant

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

#### Named variant with explicit locale

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "fr",
});
```

## Object (structured) variants

An object variant addresses content by an arbitrary set of key-value pairs declared in the `variant` field — making it possible to model CMS records, user-specific copy, or any content whose key is an opaque ID. The **whole object** is the identity: the selector must provide an equal object for the entry to resolve.

```ts fileName="product.abc.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "product",
  variant: { id: "prod_abc", userId: "user_123" },
  content: {
    name: t({ en: "Widget Pro", fr: "Widget Pro" }),
    description: t({ en: "The best widget.", fr: "Le meilleur widget." }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="product.abcd.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "product",
  variant: { id: "prod_abcd", userId: "user_123" },
  content: {
    name: t({ en: "Widget Lite", fr: "Widget Lite" }),
    description: t({ en: "A lighter option.", fr: "Une option plus légère." }),
  },
} satisfies Dictionary;

export default dictionary;
```

### Consuming object variants

Pass the matching object to `variant`. Every field declared on the dictionary must be provided and equal; otherwise the result is `null`. Field order does not matter.

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Product = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: productId, userId },
      });

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "next-intlayer";

    export const Product = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: productId, userId },
      });

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="Product.vue" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script setup>
    import { useIntlayer } from "vue-intlayer";

    const props = defineProps({
      productId: String,
      userId: String,
    });

    const content = useIntlayer("product", {
      variant: { id: props.productId, userId: props.userId },
    });
    </script>

    <template>
      <p v-if="content">{{ content.description }}</p>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="Product.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";

    export let productId: string;
    export let userId: string;

    const content = useIntlayer("product", {
      variant: { id: productId, userId },
    });
    </script>

    {#if $content}
      <p>{$content.description}</p>
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "preact-intlayer";

    export const Product = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: productId, userId },
      });

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "solid-intlayer";

    export const Product = (props: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: props.productId, userId: props.userId },
      });

      return (
        <>
          {content() && <p>{content().description}</p>}
        </>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="product.component.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { Component, Input, OnInit } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-product",
      template: `
        @if (content()) {
          <p>{{ content().description }}</p>
        }
      `,
    })
    export class ProductComponent implements OnInit {
      @Input() productId!: string;
      @Input() userId!: string;

      content: any;

      ngOnInit() {
        this.content = useIntlayer("product", {
          variant: { id: this.productId, userId: this.userId },
        });
      }
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="product.js"
    import { useIntlayer } from "vanilla-intlayer";

    const content = useIntlayer("product", {
      variant: { id: "prod_abcd", userId: "user_123" },
    });

    if (content) {
      document.body.innerHTML = `<p>${content.description}</p>`;
    }
    ```

  </Tab>
</Tabs>

#### With explicit locale

```tsx
const content = useIntlayer("product", {
  variant: { id: "prod_abc", userId: "user_123" },
  locale: "fr",
});
```

#### Missing field — no match

```ts
// Returns null: `userId` is missing, so the object does not match the declared variant
const content = useIntlayer("product", { variant: { id: "prod_abc" } });
```

## Ambient variant

Some variant dimensions are fixed for a whole session — the tenant, the school type, the plan tier. They are resolved once, and no component should have to pass them by hand.

> Do not wrap `useIntlayer` in your own hook to inject them. The build-time optimization only rewrites a literal `useIntlayer("key")` imported from the framework package, so nothing behind a wrapper gets bundled.

Declare the variant once on the provider instead, exactly like `locale`:

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="App.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerProvider } from "react-intlayer";

    export const App = ({ locale, schoolType }) => (
      <IntlayerProvider locale={locale} variant={schoolType}>
        <Hero />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    <Tabs>
      <Tab label="Intlayer >=9.4" value=">=9.4">
        ```tsx fileName="layout.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
        import { IntlayerProvider } from "next-intlayer/server";

        export default async function Layout({ children, params }) {
          const { locale } = await params;
          const schoolType = await getSchoolType();

          return (
            <IntlayerProvider locale={locale} variant={schoolType}>
              {children}
            </IntlayerProvider>
          );
        }
        ```
      </Tab>
      <Tab label="Intlayer <9.4" value="<9.4">
        ```tsx fileName="layout.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
        import { IntlayerServerProvider } from "next-intlayer/server";
        import { IntlayerClientProvider } from "next-intlayer";

        export default async function Layout({ children, params }) {
          const { locale } = await params;
          const schoolType = await getSchoolType();

          return (
            <IntlayerServerProvider locale={locale} variant={schoolType}>
              <IntlayerClientProvider locale={locale} variant={schoolType}>
                {children}
              </IntlayerClientProvider>
            </IntlayerServerProvider>
          );
        }
        ```
      </Tab>
    </Tabs>

  </Tab>
  <Tab label="Vue" value="vue">
    ```ts fileName="main.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { createApp } from "vue";
    import { installIntlayer } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    installIntlayer(app, { locale: "en", variant: schoolType });

    app.mount("#app");
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="+layout.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { setupIntlayer } from "svelte-intlayer";

    export let schoolType: string;

    setupIntlayer("en", schoolType);
    </script>

    <slot />
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="App.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerProvider } from "preact-intlayer";

    export const App = ({ locale, schoolType }) => (
      <IntlayerProvider locale={locale} variant={schoolType}>
        <Hero />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="App.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerProvider } from "solid-intlayer";

    export const App = (props) => (
      <IntlayerProvider locale={props.locale} variant={props.schoolType}>
        <Hero />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="app.config.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { ApplicationConfig } from "@angular/core";
    import { provideIntlayer } from "angular-intlayer";

    export const appConfig: ApplicationConfig = {
      providers: [provideIntlayer("en", true, schoolType)],
    };
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="main.js"
    import { installIntlayer } from "vanilla-intlayer";

    installIntlayer({ locale: "en", variant: schoolType });
    ```

  </Tab>
</Tabs>

Every dictionary read below the provider now resolves against that variant, and a call-site selector always wins:

```tsx
useIntlayer("hero-banner");
// → the provider variant

useIntlayer("hero-banner", { variant: "summer" });
// → "summer" — replaces the provider variant, it is not extended
```

### Forms

The `variant` prop accepts three forms:

| Form                                                      | Meaning                         |
| --------------------------------------------------------- | ------------------------------- |
| `variant="school1"`                                       | one named variant for every key |
| `variant={["school1", "default"]}`                        | an ordered preference chain     |
| `variant={{ "hero-banner": "school1", default: "base" }}` | one variant per dictionary key  |

#### Preference chain

A chain is tried left to right against the entries each key declares, and the first declared one wins. When none is declared, the implicit default entry is used — exactly as for a single value.

```tsx
<IntlayerProvider variant={["school1", "school2"]} />
// `hero-banner` declares no `school1` entry but declares `school2` → "school2"
// a key declaring neither                                          → the default entry
```

So `["black_friday", "summer"]` reads as "black friday if this key has one, else summer, else default". Chains are also accepted at the call site:

```tsx
useIntlayer("hero-banner", { variant: ["black_friday", "summer"] });
```

> Note this is the mirror image of the array accepted by the `variant` **field** of a content file: there an array _declares_ one entry per element, here it _consumes_ them in priority order.

#### Per-key map

Address each dictionary key separately. The reserved `default` entry covers every key not listed:

```tsx
<IntlayerProvider
  variant={{
    "hero-banner": "school1",
    product: ["school1", "default"],
    default: "base",
  }}
/>
```

> On a provider a plain object is **always** read as the per-key map, never as an object variant — the two are structurally identical. To pin an object variant globally, nest it under an entry: `variant={{ default: { id: "prod_abc" } }}`.

Because the map's keys are checked against your declared dictionary keys, a typo — or an object variant written directly, such as `variant={{ id: "prod_abc" }}` — is a compile-time error.

## Loading mode

Object variants are often loaded lazily. Set `importMode` on the dictionary to control this:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product",
  importMode: "fetch", // or "dynamic"
  variant: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

See [bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md) for details on `static`, `dynamic`, and `fetch` modes.

## Typical use-cases

- A/B copy tests driven by an experiment key
- Seasonal or promotional banners
- Feature-flagged messaging
- Locale-specific marketing campaigns
- Per-product marketing copy managed in a CMS
- User-specific or account-specific content
- Any content keyed by an opaque runtime ID
