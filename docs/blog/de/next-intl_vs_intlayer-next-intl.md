---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "next-intl vs @intlayer/next-intl: Gleiche API, Unterschiedliches Bundle"
description: Was sich ändert, wenn die next-intl-Importe einer Next.js-App vom @intlayer/next-intl-Kompatibilitäts-Adapter bereitgestellt werden. Bundle-Größe, Speicherlecks, Komponentengröße und Hydration gemessen an denselben Code, plus was der Adapter behält, ignoriert und nicht ersetzen kann.
keywords:
  - next-intl
  - use-intl
  - "@intlayer/next-intl"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer-next-intl
author: aymericzip
---

# next-intl VS @intlayer/next-intl | Gleiche API, Unterschiedliches Bundle

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/next-intl` ist ein Compat-Adapter: Er stellt die `next-intl` API (`useTranslations`, `getTranslations`, `useLocale`, `t.rich()`, ICU Plurals, `NextIntlClientProvider`...) bereit und serviert diese aus von Intlayer kompilierten Dictionaries. Der Application Code ändert sich nicht. Das Bundle schon.

Dieser Artikel vergleicht die beiden auf derselben Next.js-Anwendung, einmal gebaut mit `next-intl` und einmal mit dem Adapter. Die Zahlen stammen von [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), einer Open-Source-Suite, die aufzeichnet, was der Browser tatsächlich herunterlädt. Wenn Sie den `next-intl` vs Intlayer Vergleich als Bibliotheken möchten, lesen Sie [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/next-intl_vs_intlayer.md). Dieser Artikel handelt davon, was der Adapter ändert, wenn Sie Ihre Komponenten unverändert lassen.

<TOC/>

> **tl;dr**: Bei derselben Next.js-App reduzierte der Austausch von `next-intl` gegen `@intlayer/next-intl` das JavaScript pro Seite von **153,6 KB auf 147,5 KB** gzip, die durchschnittliche Komponente von **21,8 KB auf 8,1 KB**, Zeichenlecks fremder Seiten von **~90% auf 0%** und Hydration von **14,7 ms auf 12,8 ms**, ohne eine Komponente zu bearbeiten. Bei TanStack Start reduzierte das Äquivalent `use-intl` (`@intlayer/use-intl`) Komponenten von **76-87 KB auf 9-11 KB** und Locale-Wechsel von **7-21 ms auf 4-9 ms**. Der Adapter kostet **8,0 KB** Runtime gegenüber **14,7 KB** für `next-intl` und **5,5 KB** für natives `next-intlayer`. Navigation und Middleware werden auf Intlayers Routing-Konfiguration neu implementiert; lokalisierte `pathnames` sind die einzige Funktion, die nicht übernommen wird.

## Was `@intlayer/next-intl` ist

`next-intl` ist eine Runtime: `getRequestConfig` lädt eine `messages/{locale}.json` pro Request, `NextIntlClientProvider` sendet sie an den Client, und `useTranslations("about")` liest zur Render-Zeit Schlüssel aus diesem Objekt. Jede Optimierung (Namespaces, `pick(messages, [...])` pro Seite, Lazy Loading) musst du selbst schreiben.

`@intlayer/next-intl` behält den ersten und letzten Teil dieser Kette bei und ersetzt den mittleren. Deine Komponenten rufen weiterhin `useTranslations("about")` auf; was sie erhalten, kommt aus einem zur Build-Zeit kompilierten Intlayer Dictionary, auf die jeweilige Komponente begrenzt, nur in der aktiven Sprache.

Drei Mechanismen machen das möglich:

1. **Import-Aliasing.** `createNextIntlPlugin()` aus `@intlayer/next-intl/plugin` umhüllt `withIntlayer` und fügt Webpack / Turbopack-Aliase hinzu, damit `next-intl`, `next-intl/server`, `next-intl/navigation` und `next-intl/middleware` zu `@intlayer/next-intl` aufgelöst werden. Kein Import in deiner Codebase wird umbenannt.
2. **JSON als Quelle der Wahrheit.** Das `syncJSON`-Plugin liest deine vorhandenen `messages/{locale}.json`, teilt ihre Top-Level-Keys in ein Dictionary pro Namespace auf und schreibt Übersetzungen in dieselben Dateien zurück, wenn die CLI oder das CMS diese aktualisiert. Der Workflow deiner Übersetzer bleibt unverändert.
3. **Call-site binding.** Der Intlayer-Optimierungspass (Babel oder SWC) schreibt `useTranslations("about")` in einen Aufruf um, der das `about`-Wörterbuch direkt empfängt. Die Komponente greift nicht mehr auf einen globalen Message-Tree zu; sie greift auf ihren eigenen Content zu.

```tsx fileName="app/[locale]/about/page.tsx"
// Ihr Code, unverändert
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="Was der Compiler ausgibt (vereinfacht)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslations } from "@intlayer/next-intl";

const AboutPage = () => {
  const t = useTranslations(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

Dieses Rewrite ist der Grund, warum die Spalten "component-size" und "page-leakage" unten verschoben werden: Eine Seite lädt nur die Dictionaries der Komponenten, die sie rendert, und nur in dem Locale, das bereitgestellt wird.

## Was der Adapter behält, ignoriert und nicht ersetzt

| `next-intl` API                                                      | Mit `@intlayer/next-intl`                                                                                                                                                  |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useTranslations("ns")` / `getTranslations("ns")`                    | ✅ Beibehalten. An das `ns` Dictionary zur Compile-Zeit gebunden. Schlüssel sind typisiert gegen Ihren Content.                                                            |
| `getTranslations({ locale, namespace })`                             | ✅ Beibehalten                                                                                                                                                             |
| `t("key", { name })`, `t.rich()`, `t.markup()`, `t.raw()`            | ✅ Beibehalten. ICU plurals, `select`, `selectordinal`, `#`, `{ts, date, long}` werden durch Intlayers ICU-Resolver verarbeitet                                            |
| `useLocale()` / `getLocale()` / `setRequestLocale()` / `setLocale`   | ✅ Beibehalten                                                                                                                                                             |
| `useFormatter()`                                                     | ✅ Beibehalten. `dateTime`, `number`, `relativeTime`, `list`, `dateTimeRange` werden zu nativem `Intl` weitergeleitet                                                      |
| `NextIntlClientProvider`                                             | ✅ Beibehalten. Die Props `messages`, `timeZone` und `now` werden **akzeptiert, aber ignoriert** (eine Entwicklerwarnung informiert Sie darüber)                           |
| `getMessages()`                                                      | ✅ Beibehalten für Kompatibilität; nicht mehr erforderlich                                                                                                                 |
| `getRequestConfig()` in `src/i18n.ts`                                | ⚠️ Nicht erforderlich. Wörterbücher werden zur Build-Zeit kompiliert; es gibt kein Laden von Pro-Request-Nachrichten                                                       |
| `defineRouting()`                                                    | ✅ Beibehalten. Ausgelassene Felder (`locales`, `defaultLocale`, `localePrefix`) werden aus `intlayer.config.ts` gelesen                                                   |
| `createNavigation()`, `Link`, `redirect`, `usePathname`, `useRouter` | ✅ Beibehalten. Neu implementiert auf Intlayer's Routing-Konfiguration; das `routing`-Argument wird akzeptiert, aber ignoriert                                             |
| `pathnames` (lokalisierte Routennamen)                               | ❌ Für Typisierung akzeptiert, **nicht interpoliert**. Behalten Sie einfache Pfadnamen oder verschieben Sie diese Zuordnung zu Intlayer's `rewrite`                        |
| `createMiddleware()`                                                 | ✅ Beibehalten. Gibt Intlayer's Proxy zurück; setzt das `NEXT_LOCALE`-Cookie, damit `useLocale()` und Ihr Switcher weiterhin funktionieren                                 |
| `NEXT_LOCALE` Cookie                                                 | ✅ Standardmäßig gelesen (es sei denn, Sie konfigurieren `routing.storage` selbst)                                                                                         |
| Bare `useTranslations()` ohne Namespace                              | ⚠️ Funktioniert, aber die Aufrufstelle ist nicht gebunden: sie wird durch die Runtime-Registry aufgelöst. Übergeben Sie einen Namespace, um die Bundle-Gewinne zu erhalten |

## Der Benchmark

### Was wurde gemessen

Die [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) Suite erstellt **dieselbe Anwendung** mit jedem Setup: **10 Seiten** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 Locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identische Komponenten und identischer Inhalt. Seiten werden in `en` und `fr` gemessen.

`next-intl` wurde mit vier Ladestrategien entwickelt, von der naiven Einrichtung (`messages/{locale}.json` vollständig geladen) bis zur optimalen Lösung (ein Namespace pro Route + pro-Seite `pick()`). Der Adapter wurde auf **denselben Komponenten wie die naive Einrichtung** entwickelt, wobei nur `next.config.ts` und `intlayer.config.ts` geändert wurden. Er hat keine "scoped"-Variante: Der Compiler scoped den Inhalt pro Komponente, daher sind seine `static`- und `dynamic`-Zeilen bereits gescoped.

Für jeden Build zeichnet die Suite auf:

- **Lib size**: gzip-Größe einer leeren Komponente, die nur die i18n-Bibliothek importiert. Die fixen Kosten der Runtime.
- **Page JS**: gzip JavaScript, das pro Seite heruntergeladen wird, gemittelt über alle Seiten und Locales.
- **Locale leak %**: Anteil der übersetzten Strings im heruntergeladenen JS, die zu einem Locale gehören, das der Benutzer **nicht** anzeigt.
- **Page leak %**: Anteil der übersetzten Strings im heruntergeladenen JS, die zu einer Seite gehören, auf der sich der Benutzer **nicht** befindet.
- **Component avg**: durchschnittliche gzip-Größe jeder Komponente, die isoliert kompiliert wird. Zeigt, wie viel i18n-Runtime und Katalog eine einzelne Komponente mit sich bringt.
- **E2E reactivity**: Wanduhrzeit zwischen der Auswahl eines neuen Locales und dem Aktualisieren von `html[lang]` im DOM (Playwright, 5 Iterationen).
- **Hydration**: Dauer der React-Hydration-Phase.

> Die nachfolgenden Zahlen stammen aus dem Durchlauf vom **2026-09-12** mit `next-intl` / `use-intl` 4.14.2 und `@intlayer/*` 9.5.1. Die Test-Anwendung ist absichtlich klein (einige Dutzend Strings pro Locale), sodass die Leak-Prozentsätze ein **Muster** beschreiben: Sie wachsen mit Ihrem Inhalt, während die Runtime-Kosten konstant bleiben.

### Ergebnisse auf Next.js

Wählen Sie die Metriken und Bibliotheken aus, die für Sie wichtig sind:

<I18nBenchmark framework="nextjs" vertical/>

| Setup                     | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (no i18n)        | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |     11.8 ms |
| `next-intl`               | static         |       14.7 KB |         153.6 KB |        4.2% |     89.8% |            21.8 KB |        16.0 ms |     14.7 ms |
| `next-intl`               | dynamic        |       14.7 KB |         153.6 KB |        9.7% |     89.9% |            21.8 KB |        15.6 ms |     14.8 ms |
| `next-intl`               | scoped-static  |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            80.1 KB |        17.9 ms |     17.4 ms |
| `next-intl`               | scoped-dynamic |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            22.9 KB |        17.8 ms |     16.8 ms |
| **`@intlayer/next-intl`** | static         |    **8.0 KB** |     **147.5 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **14.5 ms** | **12.8 ms** |
| **`@intlayer/next-intl`** | dynamic        |    **8.0 KB** |     **148.7 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **11.7 ms** | **12.8 ms** |
| `next-intlayer` (native)  | static         |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             8.5 KB |        15.5 ms |     16.9 ms |
| `next-intlayer` (native)  | dynamic        |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             6.9 KB |        15.3 ms |     15.9 ms |

**Wie man es liest**

- **Gleiche Komponenten, 6 KB weniger pro Seite.** Der Adapter-Build der naiven App landet bei **147.5 KB**, unter jeder `next-intl`-Konfiguration, einschließlich der vollständig optimierten (153.6 KB). Die Runtime selbst ist der Unterschied: 8.0 KB gegenüber 14.7 KB, auf jeder Seite zu zahlen.
- **Lecks gehen auf 0% ohne Änderung einer Komponente.** Das naive `next-intl`-Setup versendet ~90% von fremdsprachigen Seiten-Strings auf jeder Seite. Um 0% mit `next-intl` zu erreichen, sind die `scoped-*`-Setups erforderlich: ein Namespace pro Route und `pick(messages, [...])` auf jeder Seite. Der Adapter erreicht 0% aus dem naiven Code, weil der Optimize-Pass jeden `useTranslations("ns")` an sein eigenes Dictionary bindet.
- **Komponenten schrumpfen um das 2,7-fache.** Eine isoliert kompilierte Komponente belegt durchschnittlich **21,8 KB** mit `next-intl` (sie erreicht den Provider und den Message-Tree) und **8,1 KB** mit dem Adapter. Im `scoped-static`-Setup von `next-intl` geht diese Zahl _auf_ 80 KB, weil jede Route's Namespace-Datei von der Seite aus erreichbar wird, die sie auswählt.
- **Hydration ist 2 ms schneller** (12,8 vs 14,7 ms): Es gibt kein Message-Objekt, das vor der React-Hydration aus der RSC-Payload deserialisiert werden muss.
- **Der Adapter ist nicht die native Runtime.** `next-intlayer` liegt bei **141,3 KB**, +0,3 KB über der Base-App, mit einer 5,5 KB Runtime. Der Adapter bietet die `next-intl` API-Oberfläche (`useFormatter`, `t.rich`, der ICU-Resolver) auf top von Intlayers Core, daher 8,0 KB und +6 KB pro Seite. Es ist die Brücke, nicht das Ziel.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Vollständige Tabelle, jede Bibliothek und jede Strategie, im [Next.js-Benchmark-Bericht](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/nextjs.md).

### Ergebnisse auf TanStack Start (`use-intl`)

`use-intl` ist der Framework-agnostische Core von `next-intl`. Sein Adapter, `@intlayer/use-intl`, folgt dem gleichen Design mit einem Vite-Plugin (`@intlayer/use-intl/plugin`).

| Setup                    | Strategie      | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ------------------------ | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (no i18n)       | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |         8.1 ms |     21.6 ms |
| `use-intl`               | static         |       14.1 KB |         179.8 KB |       50.0% |     89.8% |            76.0 KB |         6.7 ms |     15.3 ms |
| `use-intl`               | dynamic        |       14.1 KB |         119.4 KB |        0.0% |     89.8% |            75.9 KB |         7.0 ms |     15.4 ms |
| `use-intl`               | scoped-static  |       14.1 KB |         128.7 KB |        0.0% |      0.0% |            87.1 KB |        20.9 ms |     24.8 ms |
| `use-intl`               | scoped-dynamic |       14.1 KB |         128.7 KB |        0.0% |      0.0% |            87.1 KB |        13.3 ms |     25.9 ms |
| **`@intlayer/use-intl`** | static         |    **7.3 KB** |         135.8 KB |       49.7% |  **0.0%** |        **10.9 KB** |     **4.2 ms** | **10.5 ms** |
| **`@intlayer/use-intl`** | dynamic        |    **7.3 KB** |     **129.7 KB** |    **0.0%** |  **0.0%** |         **9.3 KB** |     **8.7 ms** |     16.1 ms |
| `intlayer` (native)      | static         |        5.0 KB |         125.8 KB |       50.0% |      0.0% |             8.1 KB |         3.2 ms |     11.5 ms |
| `intlayer` (native)      | dynamic        |        5.0 KB |         118.6 KB |        0.0% |      0.0% |             6.3 KB |         3.6 ms |     14.1 ms |

**Wie man es liest**

- **Pro-Seite Bytes sind ein Unentschieden gegen das optimierte `use-intl`.** `@intlayer/use-intl` im `dynamic` Modus (129.7 KB) liegt innerhalb von 1 KB von `use-intl`'s `scoped-dynamic` (128.7 KB) und 10 KB _über_ `use-intl`'s einfachem `dynamic` (119.4 KB). Diese einfache `dynamic` Zeile leckt immer noch 90% der Strings von Fremdseiten; die Bytegröße ist niedrig, weil der Inhalt der Test-App klein ist. Der 0% Wert des Adapters bleibt flach, wenn der Inhalt wächst.
- **Komponenten sind 7-9x kleiner.** `use-intl` Komponenten sind im Durchschnitt **76-87 KB** in jeder Strategie, weil `useTranslations` an das gesamte Message-Objekt des Providers gebunden ist. Der Adapter hat durchschnittlich **9-11 KB**.
- **Locale-Wechsel ist schneller.** Die optimierten `use-intl` Setups benötigen **13-21 ms** um `html[lang]` zu aktualisieren; der Adapter benötigt **4-9 ms**. Weniger Komponenten werden neu gerendert, und nichts wird aus einem Message-Baum neu ausgewählt.
- **`static` behält jedes Locale.** Die `static` Zeile des Adapters zeigt 49,7% Locale-Leckage, dasselbe wie natives Intlayer im `static` Modus: alle Locales werden gebündelt, nur die Dictionaries der Seite. Eine Konfigurationszeile (`importMode: 'dynamic'`) entfernt es.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Vollständige Tabelle im [TanStack Start-Benchmark-Bericht](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md).

## Warum sich die Zahlen ändern

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Nichts in der Komponente hat sich geändert, daher stammen die Verbesserungen vollständig davon, woran `useTranslations` gebunden ist.

**Mit `next-intl`** ist die Bindung der Provider. `NextIntlClientProvider` erhält das gesamte `messages`-Objekt für das Locale; jeder `useTranslations("about")`-Aufruf liest daraus. Der Bundler sieht eine Komponente, die einen Hook importiert, der einen Context liest, und kann nicht wissen, dass nur der `about`-Zweig verwendet wird. Die Routen unten teilen sich alle das gleiche Message-Objekt, daher zeigt die Spalte page-leak ~90%, bis du die Datei selbst aufteilst, und der Overhead wächst auf zwei Achsen gleichzeitig, Seiten und Sprachen:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── messages
│   ├── en.json                       # jeder Namespace, jede Seite
│   └── fr.json
└── src
    ├── i18n.ts                       # getRequestConfig({ messages: await import(...) })
    ├── middleware.ts                 # createMiddleware(routing)
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider messages={messages}>
        └── about/page.tsx            # useTranslations("about")
```

**Mit `@intlayer/next-intl`** ist die Bindung das Dictionary. `syncJSON` wandelt `messages/en.json` in ein Dictionary pro Top-Level-Key um; der Compiler löst auf, welche Komponente `useTranslations("about")` aufruft, und übergibt ihr `about` direkt, in der aktiven Sprache, als Import, den der Bundler nachverfolgen und aufteilen kann.

```bash
.
├── intlayer.config.ts                # syncJSON({ source: ({ locale }) => `./messages/${locale}.json` })
├── messages
│   ├── en.json                       # unverändert, immer noch die Quelle der Wahrheit
│   └── fr.json
├── .intlayer/                        # generiert: ein Dictionary pro Namespace, pro Locale
└── src
    ├── middleware.ts                 # createMiddleware() gibt nun Intlayers Proxy zurück
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider> (keine messages prop)
        └── about/page.tsx            # useTranslations("about")  ← unverändert
```

`src/i18n.ts` und die `messages` prop entfallen. Alles andere bleibt identisch.

## Migration in drei Schritten

<Steps>
<Step number={1} title="Installation">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

Der Befehl erkennt `next-intl` und installiert `intlayer`, `next-intlayer`, `@intlayer/next-intl` und `@intlayer/sync-json-plugin`. Behalten Sie `next-intl` installiert: Es ist eine Peer-Abhängigkeit des Adapters und stellt die Typen bereit.

</Step>
<Step number={2} title="Intlayer auf deine Messages hinweisen">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" bündelt jedes Locale; "dynamic" lädt das aktive on Demand
    importMode: "dynamic",
  },
  plugins: [
    syncJSON({
      // ICU Platzhalter: {name}, {count, plural, one {# item} other {# items}}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

`messages/{locale}.json` bleibt an seinem Platz. Jeder Top-Level-Schlüssel wird zu einem Dictionary; `useTranslations("about")` wird dem `about` Dictionary zugeordnet.

</Step>
<Step number={3} title="next.config.ts umhüllen">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

`createNextIntlPlugin()` setzt `withIntlayer` zusammen (Content Watching, Dictionary Compilation, der Optimize Pass) und die `next-intl` → `@intlayer/next-intl` Aliases für Webpack und Turbopack. Bauen Sie, und die Zahlen in den obigen Tabellen sind Ihre.

</Step>
</Steps>

### Was Sie danach löschen können

| Datei / Muster                                | Grund                                                                                                                |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `getRequestConfig` in `src/i18n.ts`           | Kein per-Request Message Loading. Behalten Sie die Datei nur, wenn sie auch `createNavigation` Helfer exportiert     |
| `messages={...}` auf `NextIntlClientProvider` | Der Adapter liest die kompilierte Ausgabe; das Prop wird ignoriert und protokolliert eine Warnung in der Entwicklung |
| `await getMessages()` in Layouts              | Gleicher Grund                                                                                                       |
| Pro-Seite `pick(messages, [...])`             | Der Compiler führt das Picking pro Komponente durch                                                                  |

### Was du darüber hinaus gewinnst

- **Typisierte Keys.** `useTranslations("about")` ist gegen das kompilierte `about`-Dictionary typisiert. `t("does.not.exist")` ist ein TypeScript-Fehler, kein Runtime-Fallback.
- **`npx intlayer test`** schlägt fehl in CI, wenn einem Locale ein Schlüssel fehlt. **`npx intlayer fill`** übersetzt die fehlenden Schlüssel mit dem Anbieter Ihrer Wahl (OpenAI, Anthropic, Mistral, Gemini...) unter Verwendung Ihres eigenen Schlüssels und schreibt das Ergebnis zurück in `messages/{locale}.json`.
- **Visual Editor und CMS** arbeiten mit denselben Dictionaries, sodass Nicht-Entwickler `messages/fr.json` durch eine Benutzeroberfläche bearbeiten können und die Datei aktualisiert wird.
- **Schrittweise Migration zu `.content.ts`.** Jede Komponente kann von `useTranslations("about")` zu `useIntlayer("about")` mit einer Co-located Content-Datei wechseln, eins nach dem anderen. JSON- und `.content.ts`-Dictionaries koexistieren und werden zusammengeführt.

## Zu beachtende Limits vor dem Start

<AccordionGroup>
<Accordion header="Routing-Konfiguration wird nach intlayer.config.ts verlagert">

`createNavigation(routing)` und `createMiddleware(routing)` behalten ihre Signatur, ignorieren jedoch das Argument: Sprachen, Standardsprache und Präfixstrategie stammen aus Intlayers `routing`-Konfiguration. Wenn Sie die lokalisierten `pathnames` von `next-intl` (`/about` zu `/a-propos`) verwenden, interpoliert der Adapter diese nicht; `routing.rewrite` von Intlayer deckt diesen Fall ab, ist jedoch eine separate Änderung.

</Accordion>
<Accordion header="useTranslations() ohne Namespace ist nicht gebunden">

Der Optimierungsschritt benötigt einen statischen Namespace, um zu wissen, welches Wörterbuch importiert werden soll. Ein Aufruf ohne Namespace funktioniert weiterhin über eine Laufzeit-Registry, die jedes Wörterbuch referenziert, was genau dem Leakage entspricht, das Sie vermeiden wollten. Übergeben Sie den Namespace.

</Accordion>
<Accordion header="Der Adapter ist nicht umsonst">

8.0 KB Laufzeit gegenüber 5.5 KB für `next-intlayer` und +6-7 KB pro Seite gegenüber dem nativen Build. Er bezahlt für die `next-intl`-API-Oberfläche. Wenn jeder Teil auf `useIntlayer` umgestellt ist, entfernen Sie den Adapter.

</Accordion>
<Accordion header="messages, timeZone und now auf dem Provider werden ignoriert">

Die Formatierer basieren auf nativem `Intl` und nur die Sprache beeinflusst ihre Ausgabe. Wenn Sie für hydratationsstabile Daten auf eine erzwungene Zeitzone oder ein festes `now` angewiesen sind, handhaben Sie dies am Aufrufort. Siehe [Datums-, Uhrzeit- und Zahlenformatierung](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/date_time_number_formatting_locales.md).

</Accordion>
</AccordionGroup>

## Wann sollte man welche verwenden?

<AccordionGroup>
<Accordion header="Bei next-intl bleiben">

Ihre Anwendung ist klein, das Bundle stellt kein Problem dar und Ihr Team verwaltet Namespaces und `pick()` pro Seite problemlos manuell.

</Accordion>
<Accordion header="@intlayer/next-intl verwenden">

Sie nutzen bereits `next-intl` und möchten die Bundle-, Leakage- und Hydratationsvorteile, typisierte Schlüssel und die CLI / CMS-Tools ohne Neuschreiben nutzen. Dies ist der empfohlene Einstiegspunkt für jede bestehende `next-intl`-Codebasis.

</Accordion>
<Accordion header="Nativ werden (next-intlayer)">

Für neue Projekte oder sobald der Adapter seinen Dienst getan hat. Es ist das leichteste der drei (5.5 KB, +0.3 KB pro Seite) und schaltet synchrone Serverkomponenten, komponentenspezifische `.content.ts`-Dateien und den vollen Funktionsumfang frei. Starten Sie mit [Intlayer mit Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Bleibt mein Anwendungscode wirklich unberührt?">

Auf Next.js ja für Komponenten: Der Benchmark-Build änderte nur `next.config.ts` und `intlayer.config.ts`. `getRequestConfig` in `src/i18n.ts`, die `messages`-Prop auf dem Provider und `pick()`-Aufrufe pro Seite werden zu totem Code, den Sie danach löschen können.

</Question>

<Question title="Was passiert mit ICU-Nachrichten?">

Sie funktionieren weiterhin. `t("key", { count })`, `t.rich()`, `t.markup()`, `select`, `selectordinal`, `#` und `{ts, date, long}` werden über Intlayers ICU-Resolver aufgelöst. Siehe [ICU-Nachrichtenformat](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/icu_message_format.md).

</Question>

<Question title="Warum ist der Adapter schwerer als natives next-intlayer?">

Er trägt die `next-intl`-API-Oberfläche zusätzlich zum Intlayer-Kern: `useFormatter`, `t.rich`, den ICU-Resolver, die Navigationshelfer. Das sind 8.0 KB gegenüber 5.5 KB und +6 KB pro Seite. Er ist die Brücke, nicht das Endziel.

</Question>

<Question title="Kann ich Komponente für Komponente migrieren?">

Ja. Jede Komponente kann von `useTranslations("about")` zu `useIntlayer("about")` mit einer danebenliegenden `.content.ts`-Datei wechseln. JSON- und `.content.ts`-Wörterbücher koexistieren und verschmelzen.

</Question>

<Question title="Funktionieren lokalisierte Pfadnamen?">

Nicht über die `pathnames` von `next-intl`: Der Adapter akzeptiert sie für die Typisierung, interpoliert sie jedoch nicht. Verwenden Sie stattdessen `routing.rewrite` von Intlayer, das die lokalisierten Literale in die Typregistry überträgt.

</Question>

</FAQ>

## Verwandte Vergleiche

Gleiche Adapter-Serie:

- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18next_vs_intlayer-i18next.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/lingui_vs_intlayer-lingui.md)
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/vue-i18n_vs_intlayer-vue-i18n.md)

Die Bibliotheken im direkten Vergleich:

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/next-intl_vs_intlayer.md), gleicher Benchmark
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/next-i18next_vs_next-intl_vs_intlayer.md)
- [Is next-intl outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/is_next-intl_outdated.md)

Referenzdokumentation:

- [Compat adapter: next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/next-intl.md)
- [Migrationsleitfaden: next-intl zu Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/migration_from_next-intl_to_intlayer.md)
- [Next.js-Benchmark-Bericht](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/nextjs.md) und [TanStack Start-Benchmark-Bericht](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/benchmark/tanstack.md)
- [Bundle-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md) und [der Intlayer-Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md)
- [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) und [KI-Übersetzung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/autoFill.md)

## Fazit

`@intlayer/next-intl` macht eine Sache: Es ändert, woran `useTranslations` gebunden ist, von einem Provider, der jede Nachricht enthält, zu einem für diese Komponente kompilierten Dictionary. In derselben Next.js-App, die **6 KB pro Seite** wert ist, **2,7x kleinere Komponenten**, **0% Lecks** und **2 ms Hydration**, bevor jemand eine Komponentendatei öffnet. Navigation und Middleware behalten ihre API auf Intlayers Routing-Konfiguration, und die native `next-intlayer`-Runtime bleibt noch leichter.

Alle Rohdaten, die Test-Apps und die Scripts befinden sich im [Benchmark Bloom Repository](https://github.com/intlayer-org/benchmark-bloom). Führen Sie es selbst aus.

Weitere Details finden Sie in der [Dokumentation "Why Intlayer?"](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/interest_of_intlayer.md).
