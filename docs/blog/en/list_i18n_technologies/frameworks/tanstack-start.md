---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "TanStack Start i18n: locale routing, SSR and the type tax"
description: How to wire i18n into TanStack Start, a $locale route segment, beforeLoad negotiation, SSR and prerender, and why the generated route tree fights back.
keywords:
  - tanstack start i18n
  - TanStack Router locale
  - TanStack Start internationalization
  - locale routing
  - react-i18next
  - SSR hydration
  - prerender
slugs:
  - blog
  - i18n-technologies
  - frameworks
  - tanstack-start
author: aymericzip
---

# TanStack Start i18n: locale routing, SSR and the type tax

TanStack Start ships no i18n layer, and unlike Next.js or Nuxt there is no first-party module to fill the gap. So the interesting question is not "which library", it is how a locale fits into a generated, type-safe route tree without breaking every `Link` in the app. This post covers the wiring: the route segment, the negotiation, SSR and prerender, and the honest state of the options.

<iframe title="The best i18n solution for Tanstack Start? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

## Table of Contents

<TOC/>

## Put the locale in the URL, not in a cookie

The tempting shortcut is a cookie: read it on the server, set the locale, done. It works in development and fails everywhere else. One URL then serves several languages, so you cannot emit `hreflang`, you cannot prerender a page per locale, and a crawler sees whichever language your negotiation happens to pick.

A route segment fixes all three at once. In TanStack Router's file-based routing that means a directory:

```txt
src/routes/
  __root.tsx
  {-$locale}/
    route.tsx        // locale layout + validation
    index.tsx        // /en, /fr, /
    about.tsx        // /en/about, /fr/about
    $.tsx            // catch-all 404 inside the locale
```

The braces make the segment optional. `{-$locale}` matches `/about` and `/fr/about`, which is what you want when the default locale has no prefix. If every locale is prefixed, use plain `$locale` instead. Be careful stacking it with other dynamic segments in the same route, `{-$locale}/$slug` is ambiguous by construction.

## Negotiate in `beforeLoad`, not in a component

`beforeLoad` runs on the server and on the client, before the route renders, and it can throw a redirect. That is the right hook for locale work: an unknown prefix must 404 rather than silently resolve.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const { isValid, localePrefix } = validatePrefix(params.locale);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
});
```

Without that check, `/xx/about` matches the segment, renders in your default language, and gets indexed as a duplicate of `/about`. This is the single most common i18n bug I see on file-based routers.

`Accept-Language` negotiation for a first visit belongs one layer lower, in server middleware, so the redirect happens before the router boots. Intlayer's Vite plugin registers a proxy that does this and writes the locale cookie; if you wire it yourself, remember to exclude `/api` and asset paths.

## The type tax nobody mentions

This is the part that surprises people. TanStack Router generates `routeTree.gen.ts` and types every `to` prop against it. Add a locale directory and every path in your app changes shape:

```tsx
// before
<Link to="/about" />

// after: this no longer type-checks
<Link to="/{-$locale}/about" params={{ locale: "fr" }} />
```

You do not want that literal in three hundred call sites. The usual fix is one wrapper component that strips the prefix from the public type and re-adds it at runtime:

```tsx fileName="src/components/localized-link.tsx"
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import { useLocale } from "react-intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type StripLocalePrefix<T extends string | undefined> =
  T extends `/${typeof LOCALE_ROUTE}/${infer Rest}` ? `/${Rest}` : T;

export type To = StripLocalePrefix<LinkComponentProps["to"]>;

export const LocalizedLink = (
  props: { to?: To } & Omit<LinkComponentProps, "to">
) => {
  const { locale } = useLocale();
  const { localePrefix } = getPrefix(locale);

  return (
    <Link
      {...props}
      to={`/${LOCALE_ROUTE}${props.to}` as LinkComponentProps["to"]}
      params={{
        locale: localePrefix,
        ...(typeof props.params === "object" ? props.params : {}),
      }}
    />
  );
};
```

Do the same for `useNavigate`. Budget an afternoon for this and a codemod pass over existing links: it is real work, and it is independent of which translation library you pick.

## SSR, hydration and prerender

Resolve the locale from route params in the root shell, and server and client cannot disagree, because both read the same URL:

```tsx fileName="src/routes/__root.tsx"
const localeRoute = getRouteApi("/{-$locale}");

function RootDocument({ children }: { children: ReactNode }) {
  const locale = localeRoute.useParams()?.locale ?? defaultLocale;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

Read the locale from `navigator.language` or `localStorage` during render instead, and you get a hydration mismatch on every visitor whose browser disagrees with the server. The symptom is React error #418 in production and text that flickers from one language to another.

Prerendering is where the URL choice pays off. You expand your path list across locales and hand TanStack Start a page per localized route:

```ts fileName="vite.config.ts"
import { localeFlatMap } from "intlayer";

const pathList = ["", "/about", "/404"];

const localizedPages = localeFlatMap(({ urlPrefix }) =>
  pathList.map((path) => ({
    path: `${urlPrefix}${path}`,
    prerender: { enabled: true },
  }))
);
```

One gotcha specific to this stack: if you colocate content files inside `src/routes`, the router will try to turn them into routes. Exclude them with `routeFileIgnorePattern` in the `tanstackStart()` plugin options.

## Loaders vs static strings

Two different things get conflated. UI strings ("Add to cart", "Loading") are static, known at build time, and belong in the component, not in a loader. Localized _data_ (a product description from your CMS) is a fetch, and belongs in `loader` so it streams with the route.

Route metadata sits between the two, because `head` runs outside the React tree. You have three options and they trade off differently:

|                  | Sync read in `head`  | Async read in `head`                                               | Read in `loader`, use in `head`       |
| :--------------- | :------------------- | :----------------------------------------------------------------- | :------------------------------------ |
| `head` signature | synchronous          | `async`                                                            | synchronous, reads `loaderData`       |
| Locales shipped  | all declared locales | requested locale only                                              | requested locale only                 |
| Cost             | bigger route chunk   | dictionary import on the head critical path, so slightly worse LCP | content threaded through `loaderData` |

The loader variant with `staleTime: Infinity` is the one I would default to on a real site: loaders of matched routes run in parallel, and the result is cached per locale.

## The options today

The ecosystem here is thin. Most TanStack Start apps wire `react-i18next` by hand, because that is what the React answers on the internet describe, and it does work.

| Option          | How you wire it                                                                     | Note                                                                                                                                                                                   |
| :-------------- | :---------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `react-i18next` | Manual: provider in the root shell, catalogs per namespace, your own loader for SSR | Largest ecosystem. Around 17.3 kB in the [TanStack benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/tanstack.md), and namespace discipline is on you |
| `use-intl`      | Manual, same shape, ICU messages                                                    | Avoids the Next.js specific traps of `next-intl`; leakage problem is identical                                                                                                         |
| Lingui          | `lingui extract` / `lingui compile` in the build                                    | Compile step, ICU. I found the workflow heavier than it needed to be with no clear win here                                                                                            |
| Paraglide       | Codegen of message functions                                                        | The advertised tree-shaking did not hold up in the benchmark, and it re-reads the locale from storage per node instead of a store                                                      |
| Intlayer        | Vite plugin, build-time compilation                                                 | Covers routing, prerender and sitemap; smaller ecosystem                                                                                                                               |

None of them solve the route-tree typing problem for you. That wrapper is yours to write either way.

## Intlayer on TanStack Start

Intlayer's model is one content file per component, compiled at build time into per-component dictionaries. For this stack the practical difference is that locale routing, the prerender pass and the sitemap are covered by the same package rather than assembled from three.

```ts fileName="src/routes/{-$locale}/about.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "about",
  content: {
    title: t({ en: "About", fr: "À propos", es: "Acerca de" }),
    intro: t({
      en: "We build tooling for multilingual apps.",
      fr: "Nous construisons des outils pour les apps multilingues.",
      es: "Creamos herramientas para apps multilingües.",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";

export const Route = createFileRoute("/{-$locale}/about")({
  component: () => {
    const { title, intro } = useIntlayer("about");
    return (
      <>
        <h1>{title}</h1>
        <p>{intro}</p>
      </>
    );
  },
});
```

`useIntlayer` inside components, `getIntlayer` or `getIntlayerAsync` outside the React tree (route `head`, loaders, server functions). In a server function, `getLocale` reads the cookie or header for you. Setup is `npx intlayer init`, plus the `intlayer()` plugin in `vite.config.ts`. As a data point, intlayer.org itself runs on TanStack Start.

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-tanstack-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-tanstack-start-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

**What it costs you.** A build plugin is mandatory: no plugin, no dictionaries, and that includes your test runner config. The project is younger and much smaller than i18next, so when something breaks on a TanStack Start canary you are reading source, not Stack Overflow. ICU message format is not fully supported, which matters if a translation vendor delivers ICU strings today. And the per-component model means you cannot hand a translator one big JSON file without going through the CLI or the CMS.

Coming from an existing codebase, the [`@intlayer/react-i18next` compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/react-i18next.md) keeps `useTranslation()` and `t()` working while Intlayer serves the content, and the [migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_react-i18next_to_intlayer.md) covers moving off it afterwards.

## Common mistakes

- **Locale in a cookie only.** No `hreflang`, no prerender, one URL per page for every language. Fix the URL scheme first, pick the library second.
- **No prefix validation.** `/xx/about` rendering your default language is a duplicate-content bug that only shows up in Search Console, months later.
- **Reading the locale on the client during render.** Route params are the only source both sides agree on.
- **A `<button>` locale switcher.** Crawlers do not click. Render locale links as anchors pointing at the localized URL.
- **Content files inside `src/routes`.** They become routes unless you set `routeFileIgnorePattern`.
- **Awaiting dictionaries serially in `head`.** Use `Promise.all` if a head reads more than one.

## Going further

- [Full TanStack Start setup guide, step by step](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_tanstack.md)
- [TanStack Start i18n benchmark: bundle size, leakage, locale-switch timings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/tanstack.md)
- [Drop-in `react-i18next` compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/react-i18next.md) and the [react-i18next migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_react-i18next_to_intlayer.md)
- [The wider React i18n landscape](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/react.md)
- [Per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md)
- [Getting hreflang right on a multilingual site](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/hreflang_guide_multilingual_seo.md)
- [Routing modes, domains and URL schemes in the configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)
