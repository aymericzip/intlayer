---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: Next.js i18n - what the App Router makes you build
description: The App Router dropped built-in i18n routing. What you now write yourself, why Server and Client Components split the problem, and how libraries compare.
keywords:
  - next.js i18n
  - nextjs internationalization
  - App Router i18n
  - next-intl
  - locale middleware
  - generateStaticParams
  - Intlayer
slugs:
  - blog
  - i18n-technologies
  - frameworks
  - nextjs
author: aymericzip
---

# Next.js i18n: the App Router removed the easy part

Next.js used to ship locale routing in `next.config.js`. The App Router does not, so every current tutorial starts with a `[locale]` folder and a middleware you write yourself. This post covers what you actually have to build, the Server/Client Component split that makes Next.js harder than Vue or plain React, and how the main libraries handle both.

<iframe title="The best i18n solution for Next.js? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

## Table of Contents

<TOC/>

## The `i18n` config key is a Pages Router feature

This is the first thing people hit, and it fails silently:

```js fileName="next.config.js"
// Pages Router only. Ignored by the App Router.
module.exports = {
  i18n: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
};
```

No error, no redirect, no `Accept-Language` negotiation. If your app lives in `app/`, that block does nothing, and the routing is now your responsibility.

## What you have to build instead

Four pieces, in this order.

**1. A `[locale]` dynamic segment.** Every route moves under it, so `app/about/page.tsx` becomes `app/[locale]/about/page.tsx`. The root layout keeps the `<html>` tag, because that is where `lang` and `dir` have to be set from the resolved locale.

**2. Middleware for negotiation and redirect.** Something has to decide what `/about` means for a French visitor, redirect to `/fr/about`, and remember the choice in a cookie. In Next.js 16 the file is `proxy.ts`; before that, `middleware.ts`.

**3. `generateStaticParams`.** Without it, `[locale]` is a runtime parameter and nothing prerenders.

```tsx fileName="app/[locale]/layout.tsx"
export const generateStaticParams = () =>
  ["en", "fr", "es"].map((locale) => ({ locale }));
```

**4. `generateMetadata` with `alternates.languages`.** Locale-prefixed URLs without `hreflang` are duplicate content as far as a crawler is concerned. Sitemap and `robots.txt` need the same treatment, covered in [SEO and i18n in Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/nextjs-multilingual-seo-comparison.md).

None of this is hard. It is just four files that no library writes for you unless you pick one that does.

## The Server/Client split is the real Next.js problem

This is where Next.js differs from every other framework. A Server Component can read a translation synchronously, because the locale and the catalog are both available on the server:

```tsx fileName="app/[locale]/about/page.tsx"
const AboutPage = async ({ params }) => {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return <h1>{messages.about.title}</h1>;
};
```

A Client Component cannot. It runs in the browser, it has no filesystem, and it has no request. So the catalog has to cross the boundary, and the standard answer is a provider:

```tsx
<NextIntlClientProvider locale={locale} messages={messages}>
  {children}
</NextIntlClientProvider>
```

Whatever you put in `messages` is serialized into the Flight payload and shipped to the browser, on every page. Pass the whole catalog and every route carries every string in the app, including strings only Server Components render.

The mitigation is namespaces: split `en.json` into `en/about.json`, `en/nav.json`, and pass only what the page needs. It works, and it means each new page needs someone to remember which namespaces it uses. The [Next.js benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/nextjs.md) measures the result across ten pages and ten locales, including how much of one locale's content leaks into another's bundle.

## Static rendering is the second trap

If anything in the render path reads a request-time source, headers, cookies, or `searchParams`, the route opts into dynamic rendering. Locale detection is exactly that kind of read.

The symptom is a build that succeeds while quietly serving every page from the server. `next build` prints `ƒ` instead of `○` next to the route, and your CDN cache does nothing.

next-intl handles this with `setRequestLocale(locale)`, called at the top of the page so the locale comes from the URL segment instead of the request. It is easy to forget, and it has to be repeated in every page and layout. The benchmark notes that static rendering still breaks in some namespace-split setups.

## The options

| Library                          | Status                    | Client catalog                 | Notes                                                           |
| :------------------------------- | :------------------------ | :----------------------------- | :-------------------------------------------------------------- |
| `next-intl`                      | The current default       | Via `NextIntlClientProvider`   | ICU messages, good docs, `setRequestLocale` required for static |
| `next-i18next` / `react-i18next` | Legacy on App Router      | Via provider                   | Largest plugin ecosystem, heaviest in the benchmark             |
| `next-translate`                 | Maintained, lower profile | Per-page namespaces via plugin | Lightest `t()`-style option measured                            |
| Intlayer                         | Younger                   | Compiled per component         | Build plugin required, smaller ecosystem                        |

**next-intl deserves the default position.** It is well built, the App Router integration is deliberate rather than retrofitted, the ICU support is real, and `defineRouting` gives you localized pathnames without hand-writing them. For most teams it is the right call, and the [step-by-step next-intl setup](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18n_using_next-intl.md) is a fine place to start.

Its cost shows up later. Getting namespaces, dynamic loading and TypeScript key types working together is real work, and the benchmark puts `NextIntlClientProvider` plus `useTranslations` at roughly 13 kB, about twice `next-intlayer`. `next-i18next` measures around 18 kB, roughly three times, which is the price of the i18next plugin ecosystem; the [next-i18next guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/i18n_using_next-i18next.md) covers that path.

## Intlayer: content resolved at build time

Intlayer's difference is where the catalog is decided. Content is declared per component, and a Next.js plugin compiles those declarations into per-component dictionaries, so the client bundle receives what a component renders rather than a catalog it has to be handed.

```ts fileName="src/components/about.content.ts"
import { t, type Dictionary } from "intlayer";

const aboutContent = {
  key: "about",
  content: {
    title: t({ en: "About us", fr: "À propos", es: "Sobre nosotros" }),
  },
} satisfies Dictionary;

export default aboutContent;
```

The same call works on both sides of the boundary, because `next-intlayer` resolves through the `react-server` export condition:

```tsx fileName="src/components/About.tsx"
import { useIntlayer } from "next-intlayer";

export const About = () => {
  const { title } = useIntlayer("about");

  return <h1>{title}</h1>;
};
```

Add `"use client"` to that file and nothing else changes. The provider is mounted once in `app/[locale]/layout.tsx` and covers both halves of the tree, and `generateStaticParams` is re-exported rather than written:

```tsx fileName="src/app/[locale]/layout.tsx"
export { generateStaticParams } from "next-intlayer";
```

Locale detection goes in `src/proxy.ts` as `export { intlayerProxy as proxy } from "next-intlayer/proxy"`, and `generateMetadata` uses `getMultilingualUrls()` to fill `alternates.languages`. Full setup in the [Next.js 16 guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md).

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-next-16-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-next-16-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

**What it costs you.** A build plugin is mandatory: no `withIntlayer()`, no dictionaries, and that is a step in every CI job. The ecosystem is much smaller than i18next's, so there are fewer Stack Overflow answers and fewer TMS integrations out of the box. The project is younger than both alternatives. And a per-component content model means you cannot hand a translator one `en.json` without tooling in between.

If you already run next-intl, the [`@intlayer/next-intl` compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/next-intl.md) aliases `next-intl` imports at the bundler level, so `useTranslations`, `getTranslations`, `t.rich()` and `next-intl/navigation` keep working while Intlayer serves the content. The [full migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_next-intl_to_intlayer.md) covers moving off the adapter afterwards.

## Common mistakes

- **Passing the whole message catalog to the client provider.** It is the single biggest source of oversized Next.js bundles. Namespace it, or use a model that scopes content for you.
- **Forgetting `setRequestLocale` with next-intl.** The page still works, it just stops being static, and nothing tells you.
- **A locale switcher built as a `<button>`.** Crawlers do not click. Render `<Link href={localizedPath}>` so the alternate URLs are discoverable.
- **`generateStaticParams` on the page but not the layout.** The layout needs it too, otherwise the segment stays dynamic.
- **Skipping `alternates.languages`.** Three locale-prefixed copies of a page with no `hreflang` compete with each other in search results.
- **Assuming you need `[locale]` at all.** If your app is behind a login and SEO is irrelevant, a cookie plus a provider is enough. See [running Intlayer without a locale path](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md).

## Going further

- [Next.js i18n benchmark: bundle size, leakage, static rendering](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/nextjs.md)
- [Set up i18n in a Next.js 16 App Router project](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md)
- [next-intl compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/next-intl.md) and the [next-intl migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_next-intl_to_intlayer.md)
- [next-i18next vs next-intl vs Intlayer, feature by feature](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-intl_vs_intlayer.md)
- [SEO and i18n in Next.js: translating is not enough](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/nextjs-multilingual-seo-comparison.md)
- [Per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md)
- [How bundle optimization works at build time](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md)
