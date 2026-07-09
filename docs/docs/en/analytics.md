---
createdAt: 2026-07-08
updatedAt: 2026-07-08
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
  - version: 9.0.0
    date: 2026-07-08
    changes: "Init doc — @intlayer/analytics package, provider/node-level tracking, A/B testing, dashboard"
author: aymericzip
---

# Intlayer Analytics Documentation

`@intlayer/analytics` is an optional companion package that tells you **which content is actually shown** to your visitors — which page, in which locale, and which specific piece of translated content — so you can understand your audience and run **A/B tests on content**.

## Table of Contents

<TOC/>

---

## What it tracks

`@intlayer/analytics` batches three kinds of anonymous events:

| Event              | Captured where                                   | What it tells you                                                                                                         |
| ------------------ | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `page_view`        | Provider level (`IntlayerProvider`)              | Which page and locale a session viewed, on first load, route change, or locale switch.                                    |
| `content_exposure` | Node level (`useIntlayer` / interpreter plugins) | Which dictionary key / key path was actually resolved and displayed — and, when part of an experiment, which **variant**. |
| `conversion`       | Wherever you call `useConversion()`              | A goal reached (signup, click, purchase…) attributed to the A/B variant the session was exposed to.                       |

Events are collected in memory and sent as a **single batched request roughly every 20 seconds** — never on every keystroke or render — so analytics never impacts first render time or adds a request per interaction.

## How it powers A/B testing on content

Intlayer already lets you declare content [Variants](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/index.md) (e.g. a `hero-banner` dictionary with a `control` and a `black_friday` variant). `@intlayer/analytics` closes the loop:

1. `getVariant(experimentKey, variants)` deterministically assigns each anonymous session to a variant — a pure function of the session id and the experiment key, so the assignment is **stable across the session** and requires **no server round-trip** before first render (no flicker, no layout shift).
2. Every `content_exposure` event carries the `variant` that was shown.
3. `useConversion()` lets you attribute a goal (e.g. `"cta_click"`) to that variant.
4. The dashboard's experiment results endpoint compares conversion rates per variant, including statistical significance (a z-test).

## Installation

`@intlayer/analytics` is a **peer, optional** dependency — never installed automatically by a framework package. Add it alongside `intlayer`:

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

If you don't install it, every integration point resolves to a no-op — see [Zero-cost when not installed](#zero-cost-when-not-installed) below.

## Configuration

Analytics **reuses the existing `editor` configuration block** — there is no separate `analytics` config schema to fill in:

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

- `editor.backendURL` — the base URL analytics events are sent to (`POST {backendURL}/api/analytics/events`).
- `editor.clientId` — the public project key attributed to every ingested event. It also acts as the **enable switch**: analytics stays fully disabled (and tree-shaken, see below) until `clientId` is configured.

If you self-host Intlayer, analytics automatically points at your own instance since it shares `editor.backendURL`.

## Framework support

Analytics is wired into the shared `IntlayerProvider` from `react-intlayer`, so it is available today anywhere that provider is used:

| Framework                                                | Status                                                                                             |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| React                                                    | ✅ Available                                                                                       |
| Next.js (`next-intlayer`)                                | ✅ Available (via `react-intlayer`)                                                                |
| React Native / Expo (`react-native-intlayer`)            | ✅ Available (via `react-intlayer`)                                                                |
| Vue, Svelte, Angular, Solid, Preact, Lit, Astro, Vanilla | 🚧 Planned — same client, provider-level bindings following the `@intlayer/editor` rollout pattern |

## Usage

### Automatic provider-level tracking

No code changes are required. Once `@intlayer/analytics` is installed and `editor.clientId` is configured, `IntlayerProvider` automatically:

- initializes the analytics client on mount,
- records a `page_view` on initial load,
- records a `page_view` on every locale change,
- starts the ~20s flush loop and flushes any remaining events on unmount / tab close (via `navigator.sendBeacon`, falling back to `fetch(..., { keepalive: true })`).

### Automatic node-level tracking

Every time `useIntlayer` resolves a piece of content for display, the interpreter reports a `content_exposure` event for that exact `dictionaryKey` + key path + locale — again, no code changes required. Repeated exposures of the same node within a flush window are coalesced into a single event with a `count`, so a list re-rendering 50 times doesn't send 50 events.

### Tracking conversions for A/B tests

Use `useConversion()` to attribute a goal to the variant a session saw:

```tsx fileName="CTAButton.tsx" codeFormat="tsx"
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

### Resolving a variant client-side

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

## Privacy & performance

- **Anonymous by design**: sessions are identified by a rotating id; the backend only ever stores a **SHA-256 hash** of that id — never the raw id, never an IP address.
- **Location is coarse**: only a country code, derived from CDN geolocation headers (`cf-ipcountry`, `x-vercel-ip-country`, …) — no IP is read or stored.
- **URLs exclude search params** by default, so query strings are never captured.
- **Sampling**: `sampleRate` lets you keep only a fraction of content-exposure events on high-traffic apps.
- **Batched**: one request roughly every 20 seconds (`flushInterval`), or earlier if the buffer fills up (`maxBufferSize`) — never one request per event.

### Zero-cost when not installed

`@intlayer/analytics` follows the exact same optional-dependency pattern as `@intlayer/editor`:

- every integration point loads the package via a **dynamic `import()` wrapped in `try/catch`** — an app that never installs `@intlayer/analytics` never pays a bundle-size or runtime cost, and never sees an error;
- a compile-time env var (`INTLAYER_ANALYTICS_ENABLED`), automatically set to `'false'` by `@intlayer/config` whenever `editor.clientId` is not configured, lets bundlers **dead-code-eliminate** the whole integration;
- analytics is disabled inside the Intlayer editor/CMS preview iframe, so editor sessions are never counted as real traffic.

## Dashboard: Analytics page

Once your project has collected events, the **Analytics** page in the [Intlayer dashboard](https://app.intlayer.org/analytics) (visible in the sidebar once a project is selected) shows:

- **Active users** — distinct visitors over the selected rolling window (7 / 30 / 90 days).
- **Users today** and **users over the last 7 days**.
- **Page views** over the selected window.
- An **evolution graph** of daily distinct visitors.
- **Locales** and **Location** breakdown tabs, ranking your audience by locale and by country.

## Backend API reference

All read endpoints require authentication; ingestion is public and attributed by `clientId`.

| Method | Endpoint                                    | Description                                                                      |
| ------ | ------------------------------------------- | -------------------------------------------------------------------------------- |
| `POST` | `/api/analytics/events`                     | Ingest a batch of events (public, attributed by `clientId` in the body).         |
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

## Useful links

- [Dynamic Dictionaries - Collections & Variants](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)
- [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)
- [Configuration Reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)
- [Self-Hosting Guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/self_hosting.md)
