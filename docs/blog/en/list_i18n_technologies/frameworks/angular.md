---
createdAt: 2025-01-16
updatedAt: 2026-09-02
title: Angular i18n - why the official one is build-time
description: How @angular/localize compiles one bundle per locale, why that blocks in-app language switching, and when ngx-translate, Transloco or Intlayer fit better.
keywords:
  - angular i18n
  - "@angular/localize"
  - ngx-translate
  - Transloco
  - Angular internationalization
  - XLIFF
  - Angular signals
  - Intlayer
slugs:
  - blog
  - i18n-technologies
  - frameworks
  - angular
author: aymericzip
---

# Angular i18n: build-time by default, and what that costs you

Angular is the only major front-end framework whose official i18n is build-time. `@angular/localize` extracts messages from your templates, merges a translation file per language, and emits one compiled application per locale. That single design choice decides your deployment shape, your SEO story, and whether an in-app language switcher is even possible.

## Table of Contents

<TOC/>

## The fact that drives every other decision

In React or Vue, "i18n" means a runtime lookup: a string goes in, a translated string comes out, and switching locale is a state change. In Angular's official path, the lookup happens at compile time. By the time the browser has the code, the text is already French.

That is why `LOCALE_ID` is not something you set at runtime in a localized build, and why the Angular docs talk about deploying `/fr/` and `/es/` as separate directories rather than about a language dropdown. If the concept itself is new, start with [what internationalization actually covers](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/what_is_internationalization.md).

## How `@angular/localize` works

You mark text in templates with the `i18n` attribute, and text in TypeScript with the `$localize` tagged template.

```html fileName="src/app/welcome.component.html"
<h1 i18n="site header|Banner shown on the home page@@welcomeTitle">Welcome</h1>

<p i18n>
  Updated {minutes, plural, =0 {just now} =1 {one minute ago} other {{{minutes}}
  minutes ago}}
</p>
```

```ts fileName="src/app/welcome.component.ts"
const greeting = $localize`Hello ${userName}:name:`;
```

Then you extract, translate, and build:

```bash
ng add @angular/localize
ng extract-i18n --format=xlf2 --output-path=src/locale
# hand src/locale/messages.xlf to translators, get messages.fr.xlf back
ng build --localize
```

The locales are declared in `angular.json`, next to the file that holds their translations:

```json fileName="angular.json"
{
  "projects": {
    "my-app": {
      "i18n": {
        "sourceLocale": "en-US",
        "locales": {
          "fr": {
            "translation": "src/locale/messages.fr.xlf",
            "baseHref": "/fr/"
          },
          "es": {
            "translation": "src/locale/messages.es.xlf",
            "baseHref": "/es/"
          }
        }
      },
      "architect": {
        "build": { "options": { "localize": true } }
      }
    }
  }
}
```

Two mechanics matter more than the syntax:

- **It is one compilation, then N translation passes.** Since Ivy, `ng build --localize` compiles once and rewrites the emitted bundles per locale. Build time does not multiply by your locale count, but the output does: you get one full copy of the app per language.
- **Message IDs are derived from the source text.** Change "Welcome" to "Welcome back" and the generated ID changes, so every existing translation for that message is orphaned. `@@welcomeTitle` pins the ID and avoids it, which is why you see custom IDs in every mature Angular codebase.

## The deployment shape

This is the part people underestimate. `--localize` gives you a folder per locale under `dist/`, and it is now your server's job to route to them.

| Concern         | What you have to do                                                      |
| :-------------- | :----------------------------------------------------------------------- |
| Path routing    | Serve `dist/.../fr/` at `/fr/`, matching the `baseHref` you declared     |
| Root URL        | Redirect `/` based on `Accept-Language`, or pick a default               |
| Language switch | A full navigation to another origin path, not a client-side state change |
| Dev server      | `ng serve --configuration=fr` serves one locale at a time                |
| CDN / cache     | One cache entry set per locale, one deploy artifact per locale           |

The SEO story that falls out of this is genuinely good. Each locale is a real URL serving fully translated HTML with no hydration flash, which is exactly what crawlers want. You still have to emit the `hreflang` tags yourself; see the [hreflang guide for multilingual SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/hreflang_guide_multilingual_seo.md).

## Where build-time i18n stops working

- **No in-app language switcher.** Switching locale means loading a different build at a different URL. For a marketing site that is fine. For an authenticated dashboard where a user flips language in their settings, it means a full reload and losing app state.
- **Extraction only sees static text.** Strings that come from an API, get assembled at runtime, or live in a config object are invisible to `ng extract-i18n`. You end up with a second, manual mechanism for those, which defeats the point.
- **The XLIFF round trip is slow.** Extract, send, wait, merge, rebuild. Nothing is wrong with it, but it does not fit a team that ships several times a day.
- **`$localize` in TypeScript is awkward.** It works, but interpolation uses the `${value}:name:` placeholder syntax, and there is no type checking of anything.

If none of those bite you, `@angular/localize` is a reasonable default and you should stop reading here.

## The runtime alternatives

**ngx-translate** is the long-standing answer. You load JSON catalogs over HTTP through `TranslateHttpLoader`, and read them through the `translate` pipe, the `[translate]` directive, or `TranslateService.instant()` / `.get()` / `.stream()`. It is simple, everyone knows it, and locale switching is one service call. Its downside is age: development has been intermittent and maintenance has changed hands, and the API predates signals and standalone components.

**Transloco** (`@jsverse/transloco`) is the modern runtime option. Same idea, better ergonomics: the `*transloco="let t"` structural directive avoids one subscription per string, scopes let you split catalogs per feature and lazy-load them with the route, and the plugin ecosystem covers SSR and message extraction.

Both share the same structural cost: your keys are strings with no link back to the component that renders them. Delete a component and the keys stay in every locale file forever. That trade is the same one every catalog-based library makes, and it is covered in [per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md).

|                        | `@angular/localize` | ngx-translate             | Transloco                     | Intlayer                             |
| :--------------------- | :------------------ | :------------------------ | :---------------------------- | :----------------------------------- |
| Messages resolved      | Build time          | Runtime                   | Runtime                       | Build time, locale picked at runtime |
| Builds to deploy       | One per locale      | One                       | One                           | One                                  |
| Switch locale in place | No                  | Yes                       | Yes                           | Yes                                  |
| Message format         | ICU in templates    | `{{param}}` interpolation | Interpolation, ICU via plugin | Own node types, ICU still partial    |
| Typed keys             | No                  | No                        | Not out of the box            | Generated, on by default             |
| Extra build tooling    | `@angular/localize` | None                      | None                          | Custom Angular builder               |

## Signals, zoneless, and standalone

Modern Angular is standalone by default and moving to signals, and this changes what a good i18n integration looks like. Observable-based services still work, but you end up bridging with `toSignal()` or sprinkling `async` pipes to keep templates reactive under zoneless change detection.

A signal-based content API avoids that layer. In Intlayer's Angular adapter, `useIntlayer` returns a `Signal`, so the template re-renders on a locale change with no subscription and no pipe:

```ts fileName="src/app/cart-summary.content.ts"
import { t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    total: t({ en: "Total", fr: "Total", es: "Total" }),
    vatNotice: t({
      en: "VAT included",
      fr: "TVA incluse",
      es: "IVA incluido",
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```ts fileName="src/app/cart-summary.component.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-cart-summary",
  standalone: true,
  template: `
    <h2>{{ content().total }}</h2>
    <small>{{ content().vatNotice }}</small>
  `,
})
export class CartSummaryComponent {
  content = useIntlayer("cart-summary");
}
```

The content file sits next to the component that renders it, and a build plugin compiles those declarations into per-component dictionaries. Locale switching goes through `useLocale()`, which exposes `locale`, `availableLocales` and `setLocale`. One build serves every locale, and the compiler ships only the entries a route actually renders, which is the mechanism described in [bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md).

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-angular-22-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-angular-22-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-angular-22-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

**What it costs you on Angular specifically.** The setup is heavier than on Vite-based frameworks: you swap the default Angular builder for `@angular-builders/custom-esbuild` (or `custom-webpack` on older projects) and register a plugin file. That is a real intrusion into `angular.json`, and it is the first thing to weigh. The project is also younger and much smaller than ngx-translate's ecosystem, and ICU message format support is still partial, which matters if your translation vendor delivers ICU strings. Finally, Angular is not yet part of the [benchmark suite](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/index.md), which currently covers Next.js, TanStack Start, Vue, Solid and Svelte, so there are no published Angular bundle figures to point at.

If you already have an Angular codebase, both runtime libraries have compat adapters: [migrating from ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/ngx-translate.md) keeps `TranslateService`, the `translate` pipe and the `[translate]` directive working, and [migrating from Transloco](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/transloco.md) maps Transloco scopes onto dictionary keys so `*transloco` and `| transloco` keep resolving.

## Trade-offs and common mistakes

- **Not pinning message IDs.** Without `@@customId`, every copy edit silently orphans translations. Add custom IDs from day one, not after the first regression.
- **Choosing `@angular/localize` for a product with a user language setting.** It is the wrong shape. Decide this before writing 400 `i18n` attributes.
- **Forgetting `baseHref`.** Localized builds assume they are served from their own prefix. Lazy chunks 404 in production if the server does not match.
- **Switching locale with a button instead of a link.** Crawlers do not click. Render locale switchers as anchors pointing at the localized URL, whichever library you use.
- **Assuming per-component content is free.** You gain scoping and generated types, you lose the ability to hand a translator one big JSON file without tooling.
- **Skipping a CI check.** Missing translations are silent in every one of these libraries until someone loads the page. Add a check that fails the build, such as [`intlayer test`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/testing.md) or Transloco's keys manager.

## Going further

- [Set up i18n in an Angular 22 app with Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_angular_21.md), and the [Webpack-based Angular 19 guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_angular_19.md) for older projects
- [Migrate from ngx-translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/ngx-translate.md) or [from Transloco](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/transloco.md)
- [Keep your existing JSON catalogs with the sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-json.md)
- [i18n library benchmarks: bundle size and locale-switch cost](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/index.md)
- [Vue i18n: how it works and where it starts to hurt](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/vue.md), the same analysis for the other big framework
- [Per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md)
- [ICU message format, and when you actually need it](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/icu_message_format.md)
