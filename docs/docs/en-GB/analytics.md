---
createdAt: 2026-07-08
updatedAt: 2026-08-22
title: Intlayer Analytics | Track content exposure and run A/B tests
description: Discover how @intlayer/analytics tracks page/locale views and content exposure, and how to use it to run A/B tests on your Intlayer content.
keywords:
  - Analytics
  - A/B Testing
  - Audience
  - Internationalization
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - analytics
history:
  - version: 9.3.3
    date: 2026-08-22
    changes: "Enable analytics by default - active as soon as `@intlayer/analytics` is installed"
  - version: 9.0.0
    date: 2026-07-08
    changes: "Init doc - @intlayer/analytics package, provider/node-level tracking, A/B testing, dashboard"
author: aymericzip
---

# Intlayer Analytics Documentation

`@intlayer/analytics` is an optional companion package that tells you **which content is actually shown** to your visitors - which page, in which locale, and which specific piece of translated content - so you can understand your audience and run **A/B tests on content**.

## Table of Contents

<TOC/>

---

## What it tracks

`@intlayer/analytics` batches three kinds of anonymous events:

| Event              | Captured where                                   | What it tells you                                                                                                         |
| ------------------ | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `page_view`        | Provider level (the Intlayer provider)           | Which page and locale a session viewed, on first load, route change, or locale switch.                                    |
| `content_exposure` | Node level (`useIntlayer` / interpreter plugins) | Which dictionary key / key path was actually resolved and displayed - and, when part of an experiment, which **variant**. |
| `conversion`       | Wherever you call `useConversion()`              | A goal reached (signup, click, purchase…) attributed to the A/B variant the session was exposed to.                       |

Events are collected in memory and sent as a **single batched request roughly every 20 seconds** - never on every keystroke or render - so analytics never impacts first render time or adds a request per interaction.

## How it powers A/B testing on content

Intlayer already lets you declare content [Variants](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/index.md) (e.g. a `hero-banner` dictionary with a default and a `black_friday` variant). `@intlayer/analytics` closes the loop:

1. `useExperiment(experimentKey, variants)` deterministically assigns each anonymous session to a variant - a pure function of the session id and the experiment key, so the assignment is **stable across the session** and requires **no server round-trip** before first render (no flicker, no layout shift).
2. Every `content_exposure` event carries the `variant` that was shown.
3. `useConversion()` lets you attribute a goal (e.g. `"cta_click"`) to that variant.
4. The dashboard's experiment results endpoint compares conversion rates per variant, including statistical significance (a z-test).

## Installation

`@intlayer/analytics` is an **optional dependency** of every framework package (`react-intlayer`, `next-intlayer`, `vue-intlayer`, …), so most projects already have it. Install it explicitly if your setup skips optional dependencies (`npm install --no-optional`, `NODE_ENV=production` installs of some package managers, …):

```bash packageManager="npm"
npm install @intlayer/analytics
```

```bash packageManager="yarn"
yarn add @intlayer/analytics
```

```bash packageManager="pnpm"
pnpm add @intlayer/analytics
```

```bash packageManager="bun"
bun add @intlayer/analytics
```

Installing the package is all it takes to turn analytics on: `analytics.enabled` defaults to `true`, and Intlayer resolves it to `false` whenever the package cannot be found in your project. If you don't install it, every integration point resolves to a no-op - see [Zero-cost when not installed](#zero-cost-when-not-installed) below.

## Configuration

Analytics needs no configuration to start: it is **enabled by default** and **reuses the existing `editor` configuration block** for its endpoint and project key.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    backendURL: "https://back.intlayer.org", // Also used as the analytics ingestion endpoint
    clientId: "your-client-id", // Also used as the analytics project key
    clientSecret: "your-client-secret",
  },
};

export default config;
```

- `editor.backendURL` - the base URL analytics events are sent to (`POST {backendURL}/api/analytics/events`).
- `editor.clientId` - the **public** project key. It identifies the project when the SDK requests an ingest token, and acts as an **enable switch**: analytics stays fully disabled (and tree-shaken, see below) until `clientId` is configured.
- `editor.clientSecret` - **never used by analytics, and never sent to the browser.** It is a server-only credential; see [How events are authenticated](#how-events-are-authenticated).

If you self-host Intlayer, analytics automatically points at your own instance since it shares `editor.backendURL`.

### Calling the API from the browser

The same token backs a small credential-free client, so a static site or SPA can read its CMS content at runtime with no server, no server action, and no secret in the bundle:

```ts fileName="content.ts"
import { createPublicClient } from "@intlayer/api/public";

const client = createPublicClient();

const keys = await client.getDictionaryKeys();
const [navbar] = await client.getDictionaries(["navbar"]);
```

It authenticates itself from `editor.clientId` - the exchange, caching and renewal are handled internally. The scopes bound what it can reach: published dictionary content and analytics ingestion. Anything else (pushing dictionaries, reading a project, spending AI credits) needs a real credential, and therefore a server or a signed-in user.

### Opting out

The optional `analytics` block tunes - or turns off - the collection:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  analytics: {
    enabled: false, // Default: true - opts the whole integration out of the bundle
    flushInterval: 20_000, // Milliseconds between two batched flushes
    sampleRate: 1, // Fraction of sessions to record, from 0 (none) to 1 (all)
  },
};

export default config;
```

Uninstalling `@intlayer/analytics` has the same effect as `enabled: false`. See the [Configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md#analytics-configuration) for the full field list.

## Usage

### Automatic provider-level tracking

No code changes are required. Once `@intlayer/analytics` is installed and `editor.clientId` is configured, the Intlayer provider you already mount automatically:

- initializes the analytics client on mount,
- records a `page_view` on initial load,
- records a `page_view` on every locale change,
- starts the ~20s flush loop and flushes any remaining events on unmount / tab close (via `navigator.sendBeacon`, falling back to `fetch(..., { keepalive: true })`).

The entry point differs per framework - but in every case it is the same one you already use to set Intlayer up, so there is nothing extra to add:

<Tabs group="framework">
  <Tab label="React" value="react">

    `IntlayerProvider` mounts the analytics provider internally.

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "react-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `next-intlayer` re-exports React's `IntlayerProvider`, so analytics is wired the same way.

    ```tsx fileName="app/[locale]/layout.tsx"
    import { IntlayerProvider } from "next-intlayer";

    const LocaleLayout = ({ children }) => (
      <IntlayerProvider>{children}</IntlayerProvider>
    );

    export default LocaleLayout;
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    The `intlayer` plugin registers the analytics hooks on the root component's lifecycle.

    ```javascript fileName="main.js"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);

    app.mount("#app");
    ```

    > With Nuxt, `nuxt-intlayer` installs the plugin for you - nothing to do.

  </Tab>
  <Tab label="Svelte" value="svelte">

    `setupIntlayer()` starts analytics from the component that sets Intlayer up.

    ```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
    <script lang="ts">
      import { setupIntlayer } from "svelte-intlayer";
      import type { Snippet } from "svelte";

      let { children, data }: { children: Snippet, data: LayoutData } = $props();

      $effect(() => {
        setupIntlayer(data.locale);
      });
    </script>

    {@render children()}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `IntlayerProvider` mounts the analytics provider internally.

    ```tsx fileName="app.tsx"
    import { IntlayerProvider } from "preact-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `IntlayerProvider` lazily mounts the analytics provider, so the chunk stays off the critical path.

    ```tsx fileName="App.tsx"
    import { IntlayerProvider } from "solid-intlayer";

    const App = () => (
      <IntlayerProvider>
        <Router />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `provideIntlayer()` already includes `provideIntlayerAnalytics()`.

    ```ts fileName="app.config.ts"
    import { provideIntlayer } from "angular-intlayer";
    import type { ApplicationConfig } from "@angular/core";

    export const appConfig: ApplicationConfig = {
      providers: [provideIntlayer()],
    };
    ```

    > Use `provideIntlayerAnalytics()` on its own only if you manage providers individually.

  </Tab>
</Tabs>

### Automatic node-level tracking

Every time `useIntlayer` resolves a piece of content for display, the interpreter reports a `content_exposure` event for that exact `dictionaryKey` + key path + locale - again, no code changes required. Repeated exposures of the same node within a flush window are coalesced into a single event with a `count`, so a list re-rendering 50 times doesn't send 50 events.

### Tracking conversions for A/B tests

`useConversion()` returns a callback that attributes a goal to the variant a session saw. It is exported from every framework package, with the same signature:

<Tabs group="framework">
  <Tab label="React" value="react">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "react-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          Get started
        </button>
      );
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    ```tsx fileName="CTAButton.tsx"
    "use client";

    import { useConversion } from "next-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          Get started
        </button>
      );
    };
    ```

    > `useConversion` is a client hook - mark the component `"use client"`.

  </Tab>
  <Tab label="Vue" value="vue">

    ```vue fileName="CTAButton.vue"
    <script setup lang="ts">
    import { useConversion } from "vue-intlayer";

    const trackConversion = useConversion();
    </script>

    <template>
      <button
        @click="
          trackConversion({
            experimentKey: 'homepage-hero',
            variant: 'black_friday',
            goal: 'cta_click',
          })
        "
      >
        Get started
      </button>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="CTAButton.svelte"
    <script lang="ts">
      import { useConversion } from "svelte-intlayer";

      const trackConversion = useConversion();
    </script>

    <button
      onclick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })}
    >
      Get started
    </button>
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "preact-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          Get started
        </button>
      );
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="CTAButton.tsx"
    import { useConversion } from "solid-intlayer";

    const CTAButton = () => {
      const trackConversion = useConversion();

      return (
        <button
          onClick={() =>
            trackConversion({
              experimentKey: "homepage-hero",
              variant: "black_friday",
              goal: "cta_click",
            })
          }
        >
          Get started
        </button>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="cta-button.component.ts"
    import { Component } from "@angular/core";
    import { useConversion } from "angular-intlayer";

    @Component({
      selector: "app-cta-button",
      template: `<button (click)="onClick()">Get started</button>`,
    })
    export class CtaButtonComponent {
      private trackConversion = useConversion();

      onClick() {
        this.trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        });
      }
    }
    ```

  </Tab>
</Tabs>

### Resolving a variant client-side

`useExperiment()` assigns the session to a variant and records the exposure that becomes the denominator of the conversion rate. Gate the variant-aware subtree on `isAssigned` so no visitor sees the control flash before the assignment resolves:

<Tabs group="framework">
  <Tab label="React" value="react">

    `variant` is a plain string.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "react-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">

    `variant` is a plain string. Assignment happens in the browser, so the component must be a client component.

    ```tsx fileName="Hero.tsx"
    "use client";

    import { useExperiment } from "next-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    `variant` and `isAssigned` are `Ref`s.

    ```vue fileName="Hero.vue"
    <script setup lang="ts">
    import { useExperiment } from "vue-intlayer";
    import HeroBanner from "./HeroBanner.vue";

    const { variant, isAssigned } = useExperiment("homepage-hero", [
      "default",
      "black_friday",
    ]);
    </script>

    <template>
      <HeroBanner v-if="isAssigned" :variant="variant" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    `variant` and `isAssigned` are stores - read them with the `$` prefix.

    ```svelte fileName="Hero.svelte"
    <script lang="ts">
      import { useExperiment } from "svelte-intlayer";
      import HeroBanner from "./HeroBanner.svelte";

      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);
    </script>

    {#if $isAssigned}
      <HeroBanner variant={$variant} />
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    `variant` is a plain string.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "preact-intlayer";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      if (!isAssigned) return null;

      return <HeroBanner variant={variant} />;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    `variant` and `isAssigned` are `Accessor`s - call them to read the value.

    ```tsx fileName="Hero.tsx"
    import { useExperiment } from "solid-intlayer";
    import { Show } from "solid-js";
    import { HeroBanner } from "./HeroBanner";

    export const Hero = () => {
      const { variant, isAssigned } = useExperiment("homepage-hero", [
        "default",
        "black_friday",
      ]);

      return (
        <Show when={isAssigned()}>
          <HeroBanner variant={variant()} />
        </Show>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    `variant` and `isAssigned` are `Signal`s - call them to read the value.

    ```typescript fileName="hero.component.ts"
    import { Component } from "@angular/core";
    import { useExperiment } from "angular-intlayer";
    import { HeroBannerComponent } from "./hero-banner.component";

    @Component({
      selector: "app-hero",
      imports: [HeroBannerComponent],
      template: `@if (experiment.isAssigned()) {
        <app-hero-banner [variant]="experiment.variant()" />
      }`,
    })
    export class HeroComponent {
      experiment = useExperiment("homepage-hero", ["default", "black_friday"]);
    }
    ```

  </Tab>
</Tabs>

Weights are optional - pass one per variant to skew the split, e.g. `useExperiment("homepage-hero", ["default", "black_friday"], [9, 1])`.

The child then reads the [Variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/variants.md) of the dictionary that matches:

```tsx fileName="HeroBanner.tsx"
import { useIntlayer } from "react-intlayer";

export const HeroBanner = ({ variant }: { variant: string }) => {
  const { headline, cta } = useIntlayer("hero-banner", { variant });

  return (
    <section>
      <h1>{headline}</h1>
      <a>{cta}</a>
    </section>
  );
};
```

> Reading the variant in a **child** is what makes this work outside React: in Vue, Svelte, Solid, and Angular the selector passed to `useIntlayer` is captured when the component sets up, so the read has to happen in a component that only mounts once the variant is known.

If the experiment covers a whole page rather than a single dictionary, hoist the variant onto the provider instead - see [Ambient variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/variants.md#ambient-variant). Every `useIntlayer` below then resolves against it with no call-site change.

If you need the raw assignment outside of a component, reach for the client directly:

```ts fileName="heroVariant.ts"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "default",
  "black_friday",
]);
```

> `getVariant` only assigns - it does not record the exposure. Prefer `useExperiment()`, otherwise the conversion rate has no denominator.

## Privacy & performance

- **Anonymous by design**: sessions are identified by a rotating id; the backend only ever stores a **SHA-256 hash** of that id - never the raw id, never an IP address.
- **Location is coarse**: only a country code, derived from CDN geolocation headers (`cf-ipcountry`, `x-vercel-ip-country`, …) - no IP is read or stored.
- **URLs exclude search params** by default, so query strings are never captured.
- **Sampling**: `sampleRate` lets you keep only a fraction of content-exposure events on high-traffic apps.
- **Batched**: one request roughly every 20 seconds (`flushInterval`), or earlier if the buffer fills up (`maxBufferSize`) - never one request per event.

### Zero-cost when not installed

`@intlayer/analytics` follows the exact same optional-dependency pattern as `@intlayer/editor`:

- every integration point loads the package via a **dynamic `import()` wrapped in `try/catch`** - an app that never installs `@intlayer/analytics` never pays a bundle-size or runtime cost, and never sees an error;
- a compile-time env var (`INTLAYER_ANALYTICS_ENABLED`), automatically set to `'false'` whenever the package is not installed, `analytics.enabled` is `false`, or `editor.clientId` is not configured, lets bundlers **dead-code-eliminate** the whole integration;
- analytics is disabled inside the Intlayer editor/CMS preview iframe, so editor sessions are never counted as real traffic.

## Dashboard: Analytics page

Once your project has collected events, the **Analytics** page in the [Intlayer dashboard](https://app.intlayer.org/analytics) (visible in the sidebar once a project is selected) shows:

- **Active users** - distinct visitors over the selected rolling window (7 / 30 / 90 days).
- **Users today** and **users over the last 7 days**.
- **Page views** over the selected window.
- An **evolution graph** of daily distinct visitors.
- **Locales** and **Location** breakdown tabs, ranking your audience by locale and by country.

## Backend API reference

All read endpoints require authentication; the token exchange and ingestion are public.

| Method | Endpoint                                    | Description                                                                      |
| ------ | ------------------------------------------- | -------------------------------------------------------------------------------- |
| `POST` | `/api/public/token`                         | Exchange the public `clientId` for a short-lived, scoped browser token.          |
| `POST` | `/api/analytics/events`                     | Ingest a batch of events (public, `analytics:ingest` scope).                     |
| `GET`  | `/api/analytics/overview`                   | Page/locale totals for the authenticated project.                                |
| `GET`  | `/api/analytics/audience?days=30`           | Distinct visitors, page views, daily series, locale + country breakdowns.        |
| `GET`  | `/api/analytics/content-stats`              | Per-content exposure totals, grouped by dictionary key / key path / locale.      |
| `GET`  | `/api/analytics/experiments/:experimentKey` | Per-variant conversion rates and statistical significance for an A/B experiment. |

You can also call these programmatically with the [CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md):

```ts fileName="analytics.ts"
import { createIntlayerCMS } from "@intlayer/api";
import { analyticsEndpoint } from "@intlayer/api/analytics";

const cms = createIntlayerCMS();

const { data: audience } = await analyticsEndpoint(cms).getAudience(30);
```

> **Server-side only.** `createIntlayerCMS()` authenticates with `clientId` + `clientSecret`, and the secret is never available in the browser - this snippet would issue unauthenticated requests if it ran there. Keep it in a route handler, server action, or script.

## Useful links

- [Dynamic Dictionaries - Collections & Variants](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)
- [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)
- [Configuration Reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)
- [Self-Hosting Guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/self_hosting.md)
