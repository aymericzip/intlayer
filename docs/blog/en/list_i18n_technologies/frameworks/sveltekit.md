---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "SvelteKit i18n: routing, SSR, and shared state"
description: SvelteKit ships no i18n. How to wire locale routing with an optional param or the reroute hook, and why a module-level locale store leaks between SSR requests.
keywords:
  - sveltekit i18n
  - SvelteKit internationalization
  - svelte-i18n
  - Paraglide
  - reroute hook
  - hooks.server.ts
  - locale routing
  - Svelte 5 runes
slugs:
  - blog
  - i18n-technologies
  - frameworks
  - sveltekit
author: aymericzip
---

# SvelteKit i18n: routing, SSR, and the state you cannot share

SvelteKit has no built-in i18n. You pick a message library, then you wire locale routing and locale detection into `load` and the server hooks yourself, and that second half is where SvelteKit differs from a plain SPA. This post covers the two routing options, the SSR bug that only shows up under real traffic, and how the current libraries compare.

## Table of Contents

<TOC/>

## The bug you will not see in dev

Start with the failure mode, because a lot of SvelteKit i18n snippets you will find contain it.

```ts fileName="src/routes/[[lang]]/+layout.ts"
import { locale, waitLocale } from "svelte-i18n";

export const load = async ({ params }) => {
  locale.set(params.lang ?? "en");
  await waitLocale();
};
```

`locale` is a store created once, at module scope. On the client that is fine: one browser, one user, one value. On the server, the module is evaluated once per process and every concurrent request reads and writes the same store.

So request A sets `fr` and yields at an `await`. Request B sets `en`. Request A resumes and renders English. You will never reproduce it locally, because your dev server handles one request at a time and you are one user. It shows up as a bug report saying "the page was in the wrong language once" that nobody can reproduce either.

This is not specific to i18n: SvelteKit's own docs warn about server-side shared state in general. A current-locale store is just the most common way for an app to trip over it.

## The shape that works

Resolve the locale once per request, put it on `event.locals`, hand it to the component tree through `load` data. Nothing about the current user is ever stored in a module.

```ts fileName="src/hooks.server.ts"
import type { Handle } from "@sveltejs/kit";
import { detectLocale } from "$lib/detectLocale";

export const handle: Handle = async ({ event, resolve }) => {
  const locale = detectLocale(event); // URL segment, then cookie, then Accept-Language
  event.locals.locale = locale;

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", locale),
  });
};
```

```ts fileName="src/routes/+layout.server.ts"
export const load = ({ locals }) => ({ locale: locals.locale });
```

Two details are easy to skip. `event.locals` needs a type in `src/app.d.ts` or `locals.locale` is `any`. And `%lang%` only works if `src/app.html` actually contains `<html lang="%lang%">`, which is the single line that decides whether screen readers and search engines see the right language.

## Routing: `[[lang]]` versus `reroute`

The old approach is an optional route parameter. You create `src/routes/[[lang]]/` and move the entire app inside it, with a matcher in `src/params/lang.ts` so unknown prefixes 404 instead of being treated as a page slug.

The newer approach is the `reroute` hook. The URL the visitor sees keeps its locale prefix, but SvelteKit matches it against a route tree that has no locale segment at all.

```ts fileName="src/hooks.ts"
import type { Reroute } from "@sveltejs/kit";

const locales = ["en", "fr", "es"];

export const reroute: Reroute = ({ url }) => {
  const [, first, ...rest] = url.pathname.split("/");

  if (locales.includes(first)) {
    return `/${rest.join("/")}`;
  }
};
```

| Concern                     | `[[lang]]` optional param              | `reroute` hook                                             |
| :-------------------------- | :------------------------------------- | :--------------------------------------------------------- |
| Route tree                  | everything nested one directory deeper | untouched, `/about` stays `src/routes/about`               |
| Where the locale comes from | `params.lang` in every `load`          | `event.locals`, passed down as `load` data                 |
| Adding a page               | must live inside the group             | anywhere                                                   |
| Client-side navigation      | handled by the router                  | `src/hooks.ts` is universal, so it runs in the browser too |
| Requirement                 | any version                            | SvelteKit 2.3+                                             |

`reroute` is usually the better answer now, for one reason: your route directory stops encoding a routing concern. Nested layouts, `+error.svelte` and every relative path go back to meaning what they say, and a contributor who has never touched i18n can add a page without knowing about the group.

The honest cost: `params.lang` disappears, so anything that used it reads `data.locale` instead, and the prerenderer finds pages by crawling links, so `/fr/about` is only prerendered if something links to it.

Whichever you pick, links still need the prefix added by hand, and a locale switcher should render as `<a href>` pointing at the localized URL. Crawlers do not click buttons. See the [hreflang guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/hreflang_guide_multilingual_seo.md) for the tags that go with it.

## Svelte 5 runes change the syntax, not the sharing

In runes mode, reactive local state is `$state`, derived values are `$derived`, and `$:` is gone. It is tempting to read that as "stores are legacy, use runes", and then to write this in a `.svelte.ts` file:

```ts fileName="src/lib/locale.svelte.ts"
export const appLocale = $state({ value: "en" }); // still module scope, still shared
```

That has exactly the same SSR problem as the store above. A rune declared at module level is one value for the whole server process. Runes are per component instance only when they are declared inside a component.

The container that is genuinely per request is Svelte's context API: `setContext` in the root layout, `getContext` wherever you read. Context lives in the component tree, and the server builds one tree per request.

## The library options

| Library            | Message format                                  | Where the locale lives                    | Note                                                               |
| :----------------- | :---------------------------------------------- | :---------------------------------------- | :----------------------------------------------------------------- |
| `svelte-i18n`      | ICU, via `intl-messageformat`                   | module-level stores (`$locale`, `$_`)     | Most adopted, well documented, SSR wiring is on you                |
| Paraglide (inlang) | own syntax, compiled to plain functions         | read per call from URL, cookie or storage | Best tree-shaking story, generated files live in your repo         |
| `typesafe-i18n`    | own syntax, generated typed accessors           | you wire it                               | Strong types, no key strings, but you assemble the SvelteKit parts |
| Intlayer           | `t()` in `.content.ts` files, compiled at build | Svelte context, set from `load` data      | Build plugin required, smaller ecosystem                           |

Paraglide deserves a fair reading. Compiling each message into its own exported function means the bundler can drop the ones a route never calls, which is a better lever than any runtime lazy-loading scheme. The [Svelte benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/svelte.md) confirms the tree-shaking works as advertised in a Vite plus Svelte app. The trade-offs are also real: generated JavaScript is committed to the repo and regenerated before every push, which produces merge conflicts on shared branches, and because it resolves the locale per call instead of from a store, reactivity on locale change costs more work than it should.

The same benchmark puts `svelte-i18n` at roughly **15.9 kB** after bundling and minification, about **7×** `svelte-intlayer`. That number is the library itself, before any of your content, which is the part most comparisons leave out.

## Intlayer on SvelteKit

Intlayer declares content in a file next to the component that renders it, and a Vite plugin compiles those declarations into per-component dictionaries at build time.

```ts fileName="src/routes/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

The root layout calls `setupIntlayer` with the locale it received from `load`. That call uses Svelte's context, so the locale is scoped to the request's component tree rather than to a module. The official template uses the optional-param route group, but nothing stops you from feeding it `locals.locale` from a `reroute` setup instead.

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
  import type { Snippet } from "svelte";
  import { setupIntlayer } from "svelte-intlayer";
  import type { LayoutData } from "./$types";

  let { children, data }: { children: Snippet; data: LayoutData } = $props();

  $effect(() => {
    setupIntlayer(data.locale);
  });
</script>

{@render children()}
```

`useIntlayer` returns a Svelte store, so components read it with the `$` prefix:

```svelte fileName="src/routes/[[locale=locale]]/+page.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("home");
</script>

<svelte:head>
  <title>{$content.title.value}</title>
</svelte:head>

<h1>{$content.title}</h1>
```

Server-side detection is the `handle` hook from earlier, with `getLocaleFromStorage` and `localeDetector` doing the cookie and `Accept-Language` work, and `getLocalizedUrl` redirecting an unprefixed path. The [SvelteKit setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_svelte_kit.md) has the full file.

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-sveltekit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-sveltekit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-sveltekit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

**What it costs you.** The `intlayer()` Vite plugin is mandatory and has to be registered before `sveltekit()`, so plugin order becomes something you can get wrong. The ecosystem is far smaller than `svelte-i18n`'s, which means fewer answers when you hit an edge case. And the API is store-based while the rest of your Svelte 5 code is runes, so `$content.title` sits next to `$state` and means something different.

If you already run `svelte-i18n`, the [compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/svelte-i18n.md) aliases `svelte-i18n` at the bundler level so `$_`, `$t` and the ICU syntax keep working while Intlayer serves the content.

## Common mistakes

- **Setting a module-level locale during SSR.** Covered above. It is the one SvelteKit-specific i18n bug worth memorizing.
- **Forgetting `<html lang="%lang%">`.** The content is translated, the document still claims to be English, and `hreflang` alternates contradict the page.
- **Awaiting message loading in a client `load`.** It blocks navigation. Load messages in the server layout, or ship them with the route.
- **Rendering the locale switcher as a `<button>`.** No crawler will follow it, so the other languages stay undiscovered.
- **Assuming prerendering finds localized routes.** Nothing links to `/es/pricing` from your English tree unless you make it, and the crawler only follows links.

## Going further

- [Svelte i18n benchmark: bundle size, leakage and locale-switch timings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/svelte.md)
- [Full SvelteKit setup guide, hooks and localized links included](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_svelte_kit.md)
- [Drop-in `svelte-i18n` compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/svelte-i18n.md)
- [The wider Svelte i18n library landscape](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/svelte.md)
- [Per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md)
- [What internationalization actually covers](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/what_is_internationalization.md)
- [How bundle optimization works at build time](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md)
