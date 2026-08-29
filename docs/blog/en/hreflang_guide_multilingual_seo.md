---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "Hreflang, guide for multilingual SEO"
description: "What hreflang is, the rules search engines enforce, why x-default is almost always wrong, and how to generate correct tags in Next.js and TanStack Start."
keywords:
  - hreflang
  - SEO
  - Internationalization
  - Intlayer
  - i18n
  - Sitemap
  - Canonical
  - Next.js
  - TanStack Start
slugs:
  - blog
  - hreflang-guide-multilingual-seo
author: aymericzip
---

# Hreflang: the guide for multilingual SEO

You translated your app. You shipped `/en`, `/fr`, `/es`. And French users still land on the English page.

Translating is the easy half. The hard half is telling search engines that these pages are the **same page in another language**, not three documents competing with each other. That is what `hreflang` does, and it is where most multilingual sites quietly lose their traffic.

---

## What hreflang actually is

An annotation on a page saying: _this URL has equivalent versions over there, for those languages._

```html
<link rel="alternate" hreflang="en" href="https://example.com/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="es" href="https://example.com/es/about" />
<link rel="alternate" hreflang="x-default" href="https://example.com/about" />
```

It buys you two things: the right version shown to the right user, and your locales consolidated into one cluster instead of cannibalising each other as duplicates.

It is worth being clear about what it is not. It is **not a redirect** — it is a hint, and Google may override it. It is **not a ranking boost** — it changes _which_ version ranks, not _whether_ you rank. And Bing ignores it entirely, relying on `content-language` and geo-targeting instead.

---

## Where to declare it

Three placements, all valid. Pick one and stay there — the same cluster declared in two places is how sets drift apart.

**HTML `<head>`** is the usual choice. One caveat: tags injected after hydration are unreliable. If your framework only adds them client-side, the crawler may never see them.

**XML sitemap** is better at scale. Ten locales across 5 000 pages means 50 000 `<link>` elements shipped to browsers for nothing; in a sitemap it costs your pages zero bytes.

**HTTP `Link` header** is the only option for non-HTML files like PDFs.

---

## The rules

### Self-reference and reciprocity

The set on `/fr/about` must include `hreflang="fr"` pointing at `/fr/about`. And if `/about` points at `/fr/about`, `/fr/about` must point back. Google calls a one-way reference a "no return tag" and drops it.

In practice this means **every page in a cluster ships the identical set of links**. Generating them from one shared locale list is not a convenience, it is the only way to stay correct once you have more than two locales.

### Absolute URLs, always

```html
<!-- Silently ignored -->
<link rel="alternate" hreflang="fr" href="/fr/about" />

<!-- Correct -->
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
```

The reason is worth understanding rather than memorising. `hreflang` is a cross-document reference: search engines build a cluster keyed by URL, shared across every page in it. A relative path only has meaning relative to the document it sits in, so it cannot express that. It also cannot cross a host — and an alternate very often does, when a locale lives on `example.fr` or `fr.example.com`. In a sitemap or an HTTP header there is no base document to resolve against at all.

This has a direct consequence in code. `getLocalizedUrl("/about", "fr")` returns `/fr/about` — relative in, relative out. For `hreflang` you must feed it an absolute URL:

```ts
getLocalizedUrl("/about", "fr"); // → "/fr/about"          ❌ dropped
getLocalizedUrl("https://example.com/about", "fr"); // → "https://example.com/fr/about"  ✅
```

The one exception is a framework that resolves relative values for you before rendering: Next.js expands relative `alternates` against `metadataBase`. Fine — but the rule applies to the **emitted HTML**, so check with `curl`, not the DevTools inspector.

### Language codes

ISO 639-1 for the language, ISO 3166-1 Alpha 2 for the optional region: `fr`, `fr-CA`, `pt-BR`.

Two traps catch almost everyone. A region alone is invalid — `hreflang="ca"` is Catalan, not Canada; you need `en-CA` or `fr-CA`. And `en-UK` does not exist: the country code for the United Kingdom is `GB`, so it is `en-GB`.

Only add a region when you genuinely serve that region different content — different prices, different legal notices. `fr` and `fr-FR` on identical content is noise.

### x-default

```html
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

One concept that is the most frequently forgotten, and badly understood, is `x-default` — less than 30% of apps implement it properly.

It is the fallback for users whose language matches nothing in your set. A Dutch speaker on a site offering English, French, and Spanish matches no entry; without `x-default`, Google picks for you.

What people get wrong is what it means. `x-default` is **not "the English version"** and **not "the default locale"**, even though it usually points there. It means _the page for users this set does not cover_. That is why it is legitimate — and often better — to point it at a language-selector or geo-redirecting landing page rather than at `/en`. If you have no such page, your primary language is the sensible answer.

Two things to keep straight: `x-default` is one extra entry in the set, not a replacement for the self-referencing one, and like every other entry it must appear identically on every page in the cluster.

---

## The canonical trap

Each localized page must be **its own canonical**:

```html
<!-- On https://example.com/fr/about -->
<link rel="canonical" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="en" href="https://example.com/about" />
```

Pointing every locale's canonical at the English version instead:

```html
<!-- On https://example.com/fr/about — kills the page -->
<link rel="canonical" href="https://example.com/about" />
```

says the French page is a duplicate that should not be indexed, while `hreflang` says it is the page to serve French users. The signals contradict, canonical wins, and your French pages fall out of the index.

**Canonical is self-referential per locale. `hreflang` describes the cluster.**

---

## Choosing a URL structure

`hreflang` annotates URLs, so the structure comes first.

| Structure          | Example           | Trade-off                                                  |
| ------------------ | ----------------- | ---------------------------------------------------------- |
| **Subdirectories** | `example.com/fr/` | One domain, shared authority — weaker geo-signal           |
| **Subdomains**     | `fr.example.com`  | Easy to add or drop a locale — may read as a separate site |
| **ccTLDs**         | `example.fr`      | Strongest country signal — authority built per domain      |

Subdirectories are the right default for most projects. Reach for ccTLDs only when you really operate as separate country businesses.

The one structure to avoid: serving different languages at the **same URL** based on `Accept-Language` or IP. Crawlers see one version and index one version; everything else is invisible.

> Intlayer covers all three through `routing.mode` and `routing.domains`. See [custom domains](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_domains.md) and the [configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

---

## Implementation

Hand-writing these tags does not survive contact with a second locale. Derive them from your locale list instead.

<Steps>

<Step number={1} title="Emit the cluster on every page">

Same set everywhere, canonical per locale, absolute URLs, `x-default` included.

<Tabs>

<Tab label="Next.js" value="nextjs">

The Metadata API exposes `alternates.languages`, and `getMultilingualUrls` builds the whole record from your configured locales:

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

const SITE_URL = "https://example.com";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  /**
   * getMultilingualUrls(`${SITE_URL}/about`) returns:
   * {
   *   en: 'https://example.com/about',
   *   fr: 'https://example.com/fr/about',
   *   es: 'https://example.com/es/about',
   * }
   */
  const multilingualUrls = getMultilingualUrls(`${SITE_URL}/about`);

  return {
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": `${SITE_URL}/about` },
    },
  };
};
```

Full setup: [Next.js 16 i18n guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md).

</Tab>

<Tab label="TanStack Start" value="tanstack">

The route's `head` function builds the links. `localeMap` iterates your configured locales, so adding a locale to the config adds it everywhere at once:

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getLocalizedUrl, localeMap } from "intlayer";

const SITE_URL = "https://example.com";

export const Route = createFileRoute("/{-$locale}/about")({
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const url = `${SITE_URL}/about`;

    return {
      links: [
        { rel: "canonical", href: getLocalizedUrl(url, locale) },

        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(url, mapLocale),
        })),

        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(url, defaultLocale),
        },
      ],
    };
  },
});
```

`head` runs on the server, so the tags land in the initial HTML. Full setup: [TanStack Start i18n guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_tanstack.md).

</Tab>

</Tabs>

</Step>

<Step number={2} title="Or move it all to the sitemap">

At scale, keep the annotations out of your pages entirely. `generateSitemap` emits `xhtml:link` alternates per entry, reading locales and routing mode from your config:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { generateSitemap } from "intlayer";

const sitemap = generateSitemap(
  [
    { path: "/", changefreq: "daily", priority: 1.0 },
    { path: "/about", changefreq: "monthly", priority: 0.8 },
  ],
  { siteUrl: "https://example.com" }
);
```

Two options worth knowing:

- `xhtmlLinks` (default `true`) — alternates are emitted only where locale URLs actually differ. In `no-prefix` mode every locale shares one URL, so they are skipped unless `routing.domains` gives locales their own hostnames.
- `entryPerLocale` (default `false`) — by default one `<url>` entry carries all the alternates. Both forms are valid, but only a URL listed as a `<loc>` counts as _submitted_ in Search Console; alternate-only locales stay discoverable yet attributed to no sitemap. Turning this on gives every localized URL its own entry with the full alternate set repeated. It multiplies entries by locale count, so watch the 50 000 URL / 50 MB limit and split into a sitemap index past it.

</Step>

<Step number={3} title="Verify what the crawler receives">

`hreflang` fails silently, so check it rather than assume it.

Read the source, not the inspector — `curl https://example.com/fr/about | grep hreflang` shows what a crawler gets; DevTools shows the DOM after JavaScript ran. Then follow each alternate and confirm it points back with the identical set, and that none of them redirect. Search Console's International Targeting report catches the rest across the whole site.

For a multilingual-specific crawl, the [Intlayer SEO Scanner](https://intlayer.org/i18n-seo-scanner) checks missing tags, broken alternates, and canonical conflicts across your localized pages.

</Step>

</Steps>

---

## Checklist

- [ ] Each locale has a distinct, crawlable URL
- [ ] Every page self-references, and every reference is reciprocal
- [ ] The same set ships on every page in the cluster
- [ ] All `href` values are absolute in the emitted HTML
- [ ] Codes are ISO 639-1 + ISO 3166-1 Alpha 2 (`en-GB`, not `en-UK`)
- [ ] `x-default` is present, and points where unmatched users should go
- [ ] Canonical is self-referential per locale
- [ ] Tags are server-rendered, not injected after hydration
- [ ] Declared in exactly one place
- [ ] No alternate redirects

---

## Wrapping up

`hreflang` is simple and unforgiving. One missing return tag, one relative URL, one cross-locale canonical, and the cluster is discarded with no error anywhere. Every one of those comes from writing the tags by hand.

Derive the set from a single locale list, render it server-side, keep canonical self-referential, and give `x-default` the thought it deserves. Do that once and correctness stops being something you maintain.

### Going further

- [SEO and Internationalization](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/internationalization_and_SEO.md) — the broader multilingual SEO picture
- [SEO and i18n in Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/nextjs-multilingual-seo-comparison.md) — `next-intl` vs `next-i18next` vs Intlayer
- [Next.js 16 i18n guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md)
- [TanStack Start i18n guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_tanstack.md)
- [Custom domains per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_domains.md)
- [Configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)
