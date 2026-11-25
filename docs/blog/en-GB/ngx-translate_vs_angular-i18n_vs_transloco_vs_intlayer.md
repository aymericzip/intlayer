---
createdAt: 2026-11-24
updatedAt: 2026-11-24
priority: 8
title: "ngx-translate vs Angular i18n vs Transloco vs Intlayer (2026)"
description: "ngx-translate, @angular/localize, Transloco or Intlayer? Compare Angular i18n libraries on runtime switching, type safety, lazy loading, plurals and SSR."
keywords:
  - ngx-translate
  - Transloco
  - angular i18n
  - "@angular/localize"
  - angular internationalisation
  - ngx-translate vs transloco
  - Intlayer
  - i18n library comparison
slugs:
  - blog
  - ngx-translate-vs-angular-i18n-vs-transloco-vs-intlayer
author: aymericzip
---

# ngx-translate vs Angular i18n vs Transloco vs Intlayer

Angular is the only major framework that ships its own i18n, and it takes the opposite approach from the libraries the community built around it. `@angular/localize` translates at build time and produces one app per language. `ngx-translate` and Transloco translate at runtime from JSON files. Intlayer compiles content at build time but keeps a single app that switches language at runtime.

This post compares the four on what decides the choice in practice: how the locale switches, where the content lives, what the compiler catches, and what loads in the browser.

## Table of Contents

<TOC/>

## The short version

- **`@angular/localize`** (Angular i18n): zero runtime cost and native ICU, but one build and one deployment per locale, and switching language reloads the app.
- **`ngx-translate`**: the oldest and simplest runtime option. One JSON file per locale loaded over HTTP, untyped keys, plurals through a plugin.
- **Transloco**: the runtime option built for larger apps. Scopes load translations per feature, and a plugin ecosystem covers ICU, locale formatting and key extraction.
- **Intlayer**: content declared next to each component, typed at build time, split per component and per locale, with runtime switching. Requires a custom esbuild builder.

> To see where each library comes from, read the [history of JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/history_of_i18n.md).

- [history of JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/history_of_i18n.md)

## Build-time or runtime: the decision that splits the field

**`@angular/localize`** inlines translations into the compiled templates. `ng build --localize` outputs `dist/app/en`, `dist/app/fr` and so on, each one containing only its own language. Nothing is fetched and nothing is interpreted at runtime, which makes it the fastest option once loaded. The cost is operational: N builds to test, N folders to deploy, a server or CDN rule to route `/fr/` to the right one, and a full page load when the user changes language. `ng serve` also runs a single locale at a time.

**`ngx-translate` and Transloco** keep one build. A service fetches `fr.json` when the locale changes and every pipe or directive re-renders. Switching is instant, but the first render waits for the HTTP request, keys are plain strings, and with SSR the loader must work on the server too (absolute URLs or a file-system loader, plus `TransferState` to avoid fetching twice).

**Intlayer** also keeps one build, but content is compiled into the bundle rather than fetched as a raw JSON file. `useIntlayer()` returns a Signal, so a locale change updates the components that read it, without a reload.

One Angular detail is easy to miss with runtime libraries: `DatePipe`, `CurrencyPipe` and `DecimalPipe` read `LOCALE_ID`, which is fixed at bootstrap. Switching language with `ngx-translate` does not change how dates and prices are formatted. Transloco solves it with `@jsverse/transloco-locale`, Intlayer with `useDate`, `useNumber` and `useCurrency` that follow the active locale. `@angular/localize` does not have the problem, since each build has its own `LOCALE_ID`. The [date, time and number formatting guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/date_time_number_formatting_locales.md) covers the `Intl` side.

- [date, time and number formatting guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/date_time_number_formatting_locales.md)

## Feature comparison

|                          | `@angular/localize`                                   | `ngx-translate`                                    | Transloco                                           | Intlayer                                                       |
| :----------------------- | :---------------------------------------------------- | :------------------------------------------------- | :-------------------------------------------------- | :------------------------------------------------------------- |
| **Translation applied**  | Build time, inlined                                   | Runtime                                            | Runtime                                             | Build time compiled, resolved at runtime                       |
| **Builds per release**   | One per locale                                        | One                                                | One                                                 | One                                                            |
| **Locale switch**        | Page reload to another build                          | Instant                                            | Instant                                             | Instant                                                        |
| **Where content lives**  | Source text in templates, translations in XLIFF/JSON  | One JSON per locale                                | One JSON per locale, plus one per scope             | `.content.ts` (or JSON) next to each component, or centralised |
| **Plurals / ICU**        | ✅ Native ICU in templates                            | ⚠️ Plugin (`ngx-translate-messageformat-compiler`) | ⚠️ Plugin (`@jsverse/transloco-messageformat`)      | ✅ `plural()` with CLDR rules, ⚠️ ICU strings partial          |
| **Typed keys**           | Not applicable, the source text is the message        | ❌ No                                              | ❌ No, Keys Manager finds missing keys from the CLI | ✅ Generated, a wrong key fails `ng build`                     |
| **Missing translations** | Build warning, or error with `i18nMissingTranslation` | Shows the raw key at runtime                       | Fallback language at runtime, CLI check             | Flagged by TypeScript, `intlayer test` in CI                   |
| **Lazy loading**         | Not needed, each build holds one locale               | Whole locale file, split by hand                   | ✅ Per scope (route or component)                   | ✅ Per component and per locale                                |
| **Signals**              | Not applicable, text is static                        | Pipe and Observables                               | `translateSignal()`                                 | `useIntlayer()` returns a Signal                               |
| **Build setup**          | `ng add @angular/localize`, locales in `angular.json` | None                                               | None                                                | `@angular-builders/custom-esbuild` and an esbuild plugin       |
| **Translator workflow**  | ✅ XLIFF, the format TMS tools expect                 | JSON                                               | JSON                                                | `.content.ts`/JSON, sync plugins, visual editor, CLI AI fill   |

A few rows need context.

**Message IDs in `@angular/localize`.** Without a custom ID (`i18n="@@cartTitle"`), each message's ID is a hash of its source text. Fix a typo in the English copy and every translation of that message is orphaned until the translators redo it. Set custom IDs from day one.

**Splitting with `ngx-translate`.** The default loader downloads the full `fr.json`, so every page carries the strings of every other page. You can split by feature with a custom loader or several `TranslateService` instances, but nothing enforces it. The [per-component vs centralised i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/per-component_vs_centralized_i18n.md) post covers the trade-off.

- [per-component vs centralised i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/per-component_vs_centralized_i18n.md)

**Scopes in Transloco.** A scope is a folder of JSON files (`i18n/cart/en.json`) loaded when a route or component provides it. It is the closest runtime libraries get to per-component content, and it works well as long as shared components do not reach into another feature's scope.

**Intlayer's builder.** Angular CLI does not expose esbuild plugins, so Intlayer needs `@angular-builders/custom-esbuild` in `angular.json`. It is a small change, but it is a third-party builder to keep in step with Angular upgrades. The [Angular setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_angular_21.md) shows the full configuration.

- [Angular setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_angular_21.md)

## Commit activity

`@angular/localize` lives in the `angular/angular` monorepo, so its commit count is not comparable and is left out.

<GithubCommits repositories="ngx-translate/core,jsverse/transloco,aymericzip/intlayer" />

## npm downloads

<NpmDownloads packages="@angular/localize,@ngx-translate/core,@jsverse/transloco,angular-intlayer" period="last-6-months" />

Downloads measure history more than current choices: `ngx-translate` is still installed by every app started before Transloco existed, and AI assistants keep suggesting it because it dominates the code they were trained on. Transloco moved from `@ngneat/transloco` to `@jsverse/transloco` in 2024, and the old scope is still downloaded.

## The same component with each library

A cart summary with a title and a plural. The template barely changes, what changes is where the strings live and what the compiler knows about them.

<Tabs defaultTab="angular-localize">
  <Tab label="@angular/localize" value="angular-localize">

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2 i18n="@@cartTitle">Your cart</h2>
      <p i18n="@@cartItems">
        {count(), plural, one {{{ count() }} item} other {{{ count() }} items}}
      </p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

```bash
ng extract-i18n --output-path src/locale
ng build --localize
```

```xml fileName="src/locale/messages.fr.xlf"
<trans-unit id="cartTitle" datatype="html">
  <source>Your cart</source>
  <target>Votre panier</target>
</trans-unit>
<trans-unit id="cartItems" datatype="html">
  <source>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> item} other {<x id="INTERPOLATION"/> items}}</source>
  <target>{VAR_PLURAL, plural, one {<x id="INTERPOLATION"/> article} other {<x id="INTERPOLATION"/> articles}}</target>
</trans-unit>
```

The English text stays in the template. Translators work on the extracted XLIFF, and each locale becomes its own build. Strings in TypeScript use the `$localize` tag.

  </Tab>
  <Tab label="ngx-translate" value="ngx-translate">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="public/i18n/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="public/i18n/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-cart-summary",
  imports: [TranslatePipe],
  template: `
    <section>
      <h2>{{ "cart.title" | translate }}</h2>
      <p>{{ "cart.items" | translate: { count: count() } }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

The ICU plural only works with `ngx-translate-messageformat-compiler`, the default parser only replaces `{{count}}`. `"cart.titel"` compiles and renders the raw key at runtime.

  </Tab>
  <Tab label="Transloco" value="transloco">

  <Tabs group="locale">
  <Tab value="en" label="English">

```json fileName="public/i18n/cart/en.json"
{
  "title": "Your cart",
  "items": "{count, plural, one {# item} other {# items}}"
}
```

  </Tab>
  <Tab value="fr" label="French">

```json fileName="public/i18n/cart/fr.json"
{
  "title": "Votre panier",
  "items": "{count, plural, one {# article} other {# articles}}"
}
```

  </Tab>
  </Tabs>

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { provideTranslocoScope, TranslocoDirective } from "@jsverse/transloco";

@Component({
  selector: "app-cart-summary",
  imports: [TranslocoDirective],
  providers: [provideTranslocoScope("cart")],
  template: `
    <section *transloco="let t; prefix: 'cart'">
      <h2>{{ t("title") }}</h2>
      <p>{{ t("items", { count: count() }) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
}
```

The `cart` scope is fetched when the component is first rendered. ICU plurals need `@jsverse/transloco-messageformat`. Keys are untyped, `transloco-keys-manager` reports missing and unused ones.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/app/cart-summary/cart-summary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ "en-GB": "Your basket", en: "Your cart", fr: "Votre panier" }),
    items: t({
      "en-GB": plural({ one: "{{count}} item", other: "{{count}} items" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```ts fileName="src/app/cart-summary/cart-summary.component.ts"
import { Component, input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-cart-summary",
  template: `
    <section>
      <h2>{{ content().title }}</h2>
      <p>{{ content().items(count()) }}</p>
    </section>
  `,
})
export class CartSummaryComponent {
  count = input.required<number>();
  content = useIntlayer("cart-summary");
}
```

All locales sit in one file beside the component. Types are generated at build, so `content().titel` fails `ng build`, and a locale missing from `t()` is flagged in the editor.

  </Tab>
</Tabs>

## Which one fits your app

<AccordionGroup>
<Accordion header="Public site, few interactions, SEO first">

`@angular/localize`. Each locale is a separate build with its own URL, prerendered pages ship already translated, and there is no i18n runtime to load. The one-build-per-locale cost is low when the app is mostly content and language changes are rare. Pair it with correct `hreflang` tags, see the [hreflang guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/hreflang_guide_multilingual_seo.md).

- [hreflang guide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/hreflang_guide_multilingual_seo.md)

</Accordion>
<Accordion header="Dashboard or SaaS where users switch language in-app">

A runtime option. Reloading into another build loses in-memory state, and a language menu that reloads the app feels broken. `ngx-translate` is enough for a small app with two or three locales. Transloco is the safer runtime pick past a dozen features, thanks to scopes.

</Accordion>
<Accordion header="Translations come from a TMS or an agency">

`@angular/localize` exports XLIFF, which every TMS reads, and the source text in the template gives translators real context. `ngx-translate` and Transloco JSON is also widely supported. Check that your vendor handles ICU plurals before choosing a runtime library, since both need a plugin for them.

</Accordion>
<Accordion header="Large app, many lazy routes, bundle budget">

Transloco scopes or Intlayer. Both avoid shipping every feature's strings to every route. The difference is enforcement: a Transloco scope is a convention, an Intlayer dictionary is bundled only where `useIntlayer()` imports it. See [bundle optimisation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/bundle_optimization.md) and [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dynamic_dictionaries/index.md).

- [bundle optimisation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/bundle_optimization.md)
- [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dynamic_dictionaries/index.md)

</Accordion>
<Accordion header="Type safety is a requirement">

Only Intlayer types keys out of the box. With `ngx-translate` and Transloco, a typo in a key compiles and shows up in production as a raw key. Transloco Keys Manager can catch it in CI, which is better than nothing but not the same as a compile error. The [detecting missing translations](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/detecting_missing_translations.md) post compares the approaches.

- [detecting missing translations](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/detecting_missing_translations.md)

</Accordion>
<Accordion header="Translations will be produced by AI">

Colocated content plus a CLI that fills missing locales is the shortest path. Intlayer's [`fill` command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/fill.md) runs with your own API key and only re-translates what changed. With XLIFF or JSON catalogues, you will script the same loop yourself.

- [`fill` command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/fill.md)

</Accordion>
</AccordionGroup>

## Where each one falls short

- **`@angular/localize`**: one build and one deployment per locale, reload on language change, hashed IDs that orphan translations when source text changes, and no way to load translations from a CMS after build without bootstrapping tricks.
- **`ngx-translate`**: untyped keys, plurals and ICU through a plugin, the full locale file on every page, an impure pipe that re-evaluates on every change detection, and no `LOCALE_ID` handling for dates and numbers.
- **Transloco**: untyped keys, ICU through a plugin, and scopes that are a convention rather than a guarantee. Several plugins to assemble for what `@angular/localize` gives natively.
- **Intlayer**: a third-party builder in `angular.json`, a smaller Angular community than the other three, partial ICU support, and content spread across the codebase by design, so exporting one file for a translator needs the [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-json.md) or the CLI.

- [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-json.md)

## Migrating from ngx-translate

The [`@intlayer/ngx-translate` compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/ngx-translate.md) keeps `TranslateService`, the `translate` pipe and the `[translate]` directive working while Intlayer serves the content, so templates can be moved one at a time. The [migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/migration_from_ngx-translate_to_intlayer.md) walks through it. For Transloco or `@angular/localize`, the [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-json.md) can keep existing JSON catalogues as the source of truth during the move.

- [`@intlayer/ngx-translate` compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/ngx-translate.md)
- [migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/migration_from_ngx-translate_to_intlayer.md)
- [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-json.md)

## Frequently Asked Questions

<FAQ>

<Question title="Is ngx-translate still maintained?">

Yes. After years of low activity, the project got a new maintainer in 2024 and has since shipped standalone APIs such as `provideTranslateService`. Its design has not changed: runtime JSON, string keys, plurals through a plugin.

</Question>

<Question title="ngx-translate or Transloco for a new Angular app?">

Transloco, unless the app is small. It covers what `ngx-translate` does and adds scopes, signal helpers, SSR guidance and tooling for keys. The two APIs are close enough that switching later is mostly mechanical, but there is no reason to start with the simpler one if the app will grow.

</Question>

<Question title="Can @angular/localize switch language without a reload?">

Not as designed. Translations are inlined at build time, so another language means another build. You can call `loadTranslations()` before bootstrap to load translations at runtime, but switching still requires restarting the app.

</Question>

<Question title="Which option is best for Angular SEO?">

The library matters less than the routing: one URL per locale, `hreflang` tags, `<html lang>` and translated server-rendered HTML. `@angular/localize` gets those almost for free since each locale is a separate build. Runtime libraries need SSR and localised routes to match it. See [internationalisation and SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/internationalization_and_SEO.md).

- [internationalisation and SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/internationalization_and_SEO.md)

</Question>

<Question title="Does Intlayer work with Analog?">

Yes, through Vite. See the [Analog guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_analog.md).

- [Analog guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_analog.md)

</Question>

</FAQ>

## Going further

- [Set up Intlayer in Angular 22](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_angular_21.md)
- [Set up Intlayer in Angular 19](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_angular_19.md)
- [i18n benchmarks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/index.md)
- [Compiler vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/compiler_vs_declarative_i18n.md)
- [ICU message format](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/icu_message_format.md)
- [Compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/index.md)

Same comparison for

- [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/how_to_pick_react_i18n_library.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/how_to_pick_vue_i18n_library.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/how_to_pick_svelte_i18n_library.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en-GB/how_to_pick_solid_i18n_library.md)
