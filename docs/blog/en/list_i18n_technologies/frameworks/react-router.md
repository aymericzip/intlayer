---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: React Router i18n - locale routes that get indexed
description: How to add locale-prefixed routes in React Router v7, why the answer differs between framework mode and SPA mode, and how to avoid hydration mismatches.
keywords:
  - react router i18n
  - React Router v7
  - locale routing
  - hydration mismatch
  - hreflang
  - react-i18next
  - Intlayer
slugs:
  - blog
  - i18n-technologies
  - frameworks
  - react-router
author: aymericzip
---

# React Router i18n: locale routes that actually get indexed

Adding a translation library to a React Router app is the easy part. The hard part is the routing: a `:locale` segment at the root of the tree, a redirect from `/` to the right language, and HTML that already contains the right words when a crawler reads it. This post covers the routing shape, why framework mode and SPA mode give different answers, and the hydration bug everyone hits once.

<iframe title="How to translate an React Router v7 (File-System Routes) app using Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

## Table of Contents

<TOC/>

## The symptom

You wired up a translation library, the language switcher works, and then you check what Google sees:

```bash
curl -s https://example.com/fr/about | grep "<h1"
# <h1>About us</h1>
```

The French page serves English HTML. The switcher works in the browser because the locale is resolved in a `useEffect`, after hydration. Crawlers, link previews and `curl` never get that far. This is a routing problem, not a translation problem, and no message library fixes it for you.

If you want the general React library comparison, that is [a different post](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/react.md). This one is about React Router specifically.

## The routing shape

There is one correct shape, and every library agrees on it: put the locale as the first segment of the route tree, so it is a real URL, not a state.

```txt
/            -> redirect to the negotiated locale
/about       -> default locale (or redirect, depending on your mode)
/fr/about    -> French
/es/about    -> Spanish
```

Two rules follow from it:

- **The URL is the source of truth.** A cookie or `navigator.language` may pick which URL to send someone to, but once you are on `/fr/about`, the page is French, no matter what the cookie says.
- **An unknown prefix is a 404, not a fallback.** If `/de/about` renders the English page with a 200, you have just created a duplicate of every page in your site for every string someone types.

The `/` redirect is where Accept-Language belongs. In framework mode it is a few lines in the root loader:

```ts fileName="app/root.tsx"
import { defaultLocale, getLocaleFromStorage, localeDetector } from "intlayer";
import { redirect } from "react-router";
import type { Route } from "./+types/root";

export const loader = ({ request }: Route.LoaderArgs) => {
  const cookies = new Map(
    (request.headers.get("cookie") ?? "")
      .split("; ")
      .map((pair) => pair.split("=") as [string, string])
  );

  const locale =
    // 1. an explicit choice the visitor already made
    getLocaleFromStorage({
      getCookie: (name) => cookies.get(name) ?? null,
      getHeader: (name) => request.headers.get(name),
    }) ??
    // 2. Accept-Language
    localeDetector(Object.fromEntries(request.headers)) ??
    // 3. the floor
    defaultLocale;

  return redirect(`/${locale}`);
};
```

`getLocaleFromStorage` only reads the sources you hand it, so skipping `getCookie` means a returning visitor's saved language is quietly ignored.

Redirect with a 302, not a 301. The negotiated locale depends on the visitor, and a permanent redirect gets cached by browsers and CDNs for the wrong one.

## Framework mode and SPA mode are not the same problem

React Router v7 absorbed Remix. Framework mode is the Remix half: a `react-router.config.ts`, loaders, and server rendering. Library mode is the old `react-router-dom`, mounted client-side into a static `index.html`. The i18n answer differs, and it is worth being blunt about it.

|                        | Framework mode (`ssr: true`) | Framework mode (`ssr: false`)                | Library / SPA                   |
| :--------------------- | :--------------------------- | :------------------------------------------- | :------------------------------ |
| Where locale resolves  | `loader`, per request        | Build time, per prerendered route            | Browser, after JS loads         |
| First HTML byte        | Correct language             | Correct language if the route is prerendered | Whatever the bundle defaults to |
| `<html lang>`          | Correct                      | Correct                                      | Patched after hydration         |
| hreflang in the source | Yes                          | Yes                                          | No                              |

**A pure SPA cannot do multilingual SEO properly.** Google will render JavaScript eventually, but it is a second pass, it is not guaranteed per URL, and other crawlers (Bing, social previews, LLM fetchers) mostly do not render at all. If your locale only exists after hydration, your localized URLs are, at best, indexed slowly and inconsistently.

If you are stuck in library mode, the realistic middle ground is prerendering. Framework mode with `ssr: false` plus a `prerender` list emits real HTML per locale at build time and still deploys as static files:

```ts fileName="react-router.config.ts"
import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  prerender: ["/", "/about", "/fr", "/fr/about", "/es", "/es/about"],
} satisfies Config;
```

That works for a fixed set of pages. For thousands of URLs, or anything personalized, you need a server.

## Declaring the locale segment: config routes vs file-system routes

React Router v7 supports both. Config routes are explicit, in `app/routes.ts`:

```ts fileName="app/routes.ts"
import { route, type RouteConfig } from "@react-router/dev/routes";

export default [
  route("/:locale?", "routes/page.tsx"),
  route("/:locale?/about", "routes/about/page.tsx"),
] satisfies RouteConfig;
```

File-system routes encode the same thing in filenames, where `($locale)` is an optional dynamic segment and `.` separates path segments:

```txt
app/routes/
├── ($locale)._index.tsx         # /  and  /fr
├── ($locale)._index.content.ts
├── ($locale).about.tsx          # /about  and  /fr/about
└── ($locale).about.content.ts
```

One gotcha with `flatRoutes`: any file in `routes/` becomes a route, including colocated content files. You have to exclude them explicitly, or `about.content.ts` becomes a URL.

```ts fileName="app/routes.ts"
import { flatRoutes } from "@react-router/fs-routes";
import { configuration } from "intlayer";

export default flatRoutes({
  ignoredRouteFiles: configuration.content.fileExtensions.map(
    (extension) => `**/*${extension}`
  ),
});
```

Both variants are documented in full: [config routes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react_router_v7.md) and [file-system routes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react_router_v7_fs_routes.md).

## The hydration mismatch

This is the bug that costs an afternoon. The server renders `/fr/about` in French. The client boots, a provider reads `localStorage` or `navigator.language`, decides the user is English, and React throws a hydration error, then silently re-renders the whole tree.

The fix is an order of precedence, applied identically on both sides:

1. **The URL param.** If the route has a locale segment, it wins. Always.
2. **Cookie or storage.** Only consulted when the URL carries no locale, and only to decide where to redirect.
3. **`Accept-Language`.** Server-side only, as a last resort on `/`.
4. **Default locale.** The floor.

Concretely: the provider must be given the locale from the loader, not left to find it itself.

```tsx fileName="app/root.tsx"
export function Layout({ children }: { children: React.ReactNode }) {
  const { locale } = useLoaderData<typeof loader>() ?? {};

  return (
    <html lang={locale}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
}
```

`navigator.language` and `localStorage` do not exist on the server. Any code path that reads them during render, rather than inside an effect or a redirect decision, is a hydration mismatch waiting for its first non-English visitor.

## SEO: three things, none of them optional

**hreflang.** Every localized version of a page must point at every other one, including itself, plus an `x-default`. Emit it from the route's `links` export so it lands in the HTML:

```tsx fileName="app/routes/($locale).about.tsx"
import { getMultilingualUrls } from "intlayer";

export const links: Route.LinksFunction = () => {
  const urls = getMultilingualUrls("https://example.com/about");

  return Object.entries(urls).map(([locale, href]) => ({
    rel: "alternate",
    hrefLang: locale,
    href,
  }));
};
```

Full ruleset in the [hreflang guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/hreflang_guide_multilingual_seo.md).

**Canonical.** Self-referencing, per locale. `/fr/about` is canonical to itself, never to `/about`. Pointing localized pages at the default one tells Google to drop them.

**The switcher must be links.** A `<button onClick={setLocale}>` is invisible to a crawler, so the alternate URLs are never discovered by following the page. Render `<Link to={getLocalizedUrl(pathWithoutLocale, targetLocale)}>` and keep the user on the same route instead of bouncing them to the home page.

## The options

| Library         | Locale resolution in loaders                                       | Type-safe keys                 | Note                                                        |
| :-------------- | :----------------------------------------------------------------- | :----------------------------- | :---------------------------------------------------------- |
| `react-i18next` | Manual: one instance per request, or you leak locale between users | Opt-in via declaration merging | The default. Largest ecosystem, most Stack Overflow answers |
| Lingui          | Manual, with an explicit `i18n.activate` per request               | Yes, via extraction            | ICU messages, compiled catalogs, small runtime              |
| Intlayer        | Built in: `getIntlayer(key, params.locale)` in loaders and `meta`  | Generated, on by default       | Build plugin required, smaller ecosystem                    |

The `react-i18next` trap in framework mode is worth naming: the default singleton `i18n` instance is module scope, which on a server is shared across concurrent requests. Two visitors on different locales at the same time can get each other's language. You need a request-scoped instance, which the library supports but does not do for you.

## Intlayer with React Router v7

Content is declared in a file next to the route that renders it, and a Vite plugin compiles those declarations at build time.

```ts fileName="app/routes/($locale).about.content.ts"
import { t, type Dictionary } from "intlayer";

const aboutContent = {
  key: "about",
  content: {
    title: t({ en: "About us", fr: "À propos", es: "Sobre nosotros" }),
    description: t({
      en: "Who we are and what we build.",
      fr: "Qui nous sommes et ce que nous construisons.",
      es: "Quiénes somos y qué construimos.",
    }),
  },
} satisfies Dictionary;

export default aboutContent;
```

The route reads it in three places: `loader` for validation, `meta` for the tags, and the component for the body.

```tsx fileName="app/routes/($locale).about.tsx"
import { getIntlayer, validatePrefix } from "intlayer";
import { useIntlayer } from "react-intlayer";
import { data } from "react-router";
import type { Route } from "./+types/($locale).about";

export const loader = ({ params }: Route.LoaderArgs) => {
  const { isValid } = validatePrefix(params.locale);

  if (!isValid) {
    throw data("Locale not supported", { status: 404 });
  }
};

export const meta: Route.MetaFunction = ({ params }) => {
  const content = getIntlayer("about", params.locale);

  return [
    { title: content.title },
    { content: content.description, name: "description" },
  ];
};

export default function AboutPage() {
  const { title, description } = useIntlayer("about");

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

`validatePrefix` is what turns an unknown prefix into a 404 instead of a duplicate page. `getIntlayer` is the synchronous read used outside React, which is what `meta` needs.

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-router-v7-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-react-router-v7.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-react-router-v7-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Setup is `npx intlayer init`, then `intlayer()` next to `reactRouter()` in `vite.config.ts`. If you do not want the locale in the URL at all, `routing.mode` also accepts `"prefix-all"`, `"no-prefix"` and `"search-params"`, documented in the [configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

**What it costs you.** The build plugin is mandatory: no plugin, no dictionaries, so a plain `tsc` build or a test runner that bypasses Vite needs configuring. The ecosystem is much smaller than i18next's, and the project is young, so you will occasionally be the first person to hit a bug. ICU message format is still incomplete, which matters if your translation vendor ships ICU strings today.

On an existing `react-i18next` codebase, the [compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/react-i18next.md) aliases `react-i18next` and `i18next` at the bundler level, so `useTranslation`, `<Trans>` and suffix plurals keep working while Intlayer serves the content. The [migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_react-i18next_to_intlayer.md) covers moving off it afterwards.

## Common mistakes

- **Resolving the locale in a `useEffect`.** It works on screen and fails for every crawler and every link preview.
- **301 on the `/` redirect.** The target is per-visitor, so a permanent redirect is cached for the wrong language.
- **Falling back instead of 404-ing on an unknown prefix.** `/de/*` returning 200 duplicates your entire site.
- **A module-scope i18n instance on the server.** Concurrent requests share it. Scope it per request.
- **Canonical pointing at the default locale.** It asks Google to de-index the translations you just paid for.
- **Forgetting `ignoredRouteFiles` with `flatRoutes`.** Colocated content files silently become routes.

## Going further

- [Set up Intlayer with React Router v7 config routes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react_router_v7.md)
- [The file-system routes variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react_router_v7_fs_routes.md)
- [i18n library benchmark: bundle size and locale-switch timings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/index.md)
- [Drop-in `react-i18next` compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/react-i18next.md) and the [full migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_react-i18next_to_intlayer.md)
- [i18n solutions for React, compared](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/react.md)
- [hreflang for multilingual SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/hreflang_guide_multilingual_seo.md)
- [Internationalization and SEO in practice](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/internationalization_and_SEO.md)
- [Custom URL rewrites for localized paths](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md)
