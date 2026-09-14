---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "next-intl vs Intlayer: 2026 Benchmark & Comparison"
description: Bundle size, content leakage, locale-switch reactivity and developer experience measured on Next.js and TanStack Start. Which i18n library should you pick in 2026?
keywords:
  - next-intl
  - use-intl
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - next-intl-vs-intlayer
author: aymericzip
---

# next-intl VS Intlayer | Next.js Internationalisierung (i18n) Benchmark

`next-intl` ist die beliebteste i18n-Bibliothek für Next.js. Intlayer ist eine compiler-basierte, component-scoped Alternative. Beide lokalisieren eine App Router-Anwendung. Die Frage ist, was jede Bibliothek kostet, sobald die App erstellt ist.

Dieser Artikel ist kein Tutorial. Es ist ein Vergleich, der durch Zahlen aus [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) gestützt wird, einer Open-Source-Benchmark-Suite, die die gleiche Anwendung mit jeder Bibliothek erstellt und misst, was der Browser tatsächlich herunterlädt und ausführt.

<TOC/>

> **tl;dr**: In derselben Next.js-App fügt `next-intl` auf jeder Seite **+12,6 KB gzip** JavaScript hinzu, versus **+0,3 KB** für Intlayer. Ohne zusätzlichen Aufwand liefert `next-intl` **~90% der Strings von Fremdsprachen-Seiten** mit jeder Seite mit. Um 0% Speicherlecks mit `next-intl` zu erreichen, ist Namespace-Scoping und per-Seite `pick(messages, [...])` erforderlich. Intlayer erreicht 0% standardmäßig, da sein Compiler Inhalte pro Komponente scopet. Wenn Sie die `next-intl`-API mit Intlayers Ausgabe möchten, zeigte der `@intlayer/next-intl`-Adapter **147,5 KB** pro Seite versus **153,6 KB** mit dem Original.

## Kurz gesagt

- **next-intl** - Leichtgewichtig, gut dokumentiert, ICU-Nachrichtenformat, First-Class-App-Router-Unterstützung mit Middleware, Formattern und Navigations-Helfern. Inhalte befinden sich in zentralisierten JSON-Katalogen; Leistungsoptimierungen (Namespaces, Message-Picking pro Seite, Lazy Loading) sind deine Verantwortung.
- **Intlayer** - Komponentenzentriertes Inhaltsmodell. `.content.ts`-Wörterbücher befinden sich neben der Komponente, der sie dienen. Ein Build-Time-Compiler führt Tree-Shaking durch und lazy-loaded sie pro Komponente und pro Locale. Strikte TypeScript-Typen werden aus deinen Inhalten generiert, und fehlende Übersetzungen schlagen zur Build-Zeit fehl. Wird mit Middleware, SEO-Helfern, einem Visual Editor / CMS und KI-gestützter Übersetzung ausgeliefert.

| Bibliothek            | GitHub Stars                                                                                                                                                                   | Gesamte Commits                                                                                                                                                                    | Letzter Commit                                                                                                                                      | Erste Version | NPM Version                                                                                                   | NPM Downloads                                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | April 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   |
| `amannn/next-intl`    | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       | Nov 2020      | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) |

> Badges werden automatisch aktualisiert. Snapshots werden sich im Laufe der Zeit ändern.

## Nebeneinander-Funktionsvergleich

| Feature                                             | `next-intlayer` (Intlayer)                                                                          | `next-intl`                                                                                                                                |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Übersetzungen neben Komponenten**                 | ✅ Ja, `.content.ts` kolokalisiert mit jeder Komponente                                             | ❌ Nein, zentralisierte `messages/{locale}.json`                                                                                           |
| **TypeScript-Integration**                          | ✅ Strenge Typen automatisch generiert aus Inhalt                                                   | ✅ Gut, Schlüssel typisiert über `global.d.ts` Erweiterung                                                                                 |
| **Erkennung fehlender Übersetzungen**               | ✅ TypeScript-Fehler + Build-Zeit-Fehler/Warnung                                                    | ⚠️ Runtime-Fallback + Konsolenwarnung                                                                                                      |
| **Rich content (JSX / Markdown / components)**      | ✅ Direkte Unterstützung                                                                            | ⚠️ `t.rich()` / `t.markup()` mit Tag-Platzhaltern                                                                                          |
| **ICU support**                                     | ⚠️ WIP                                                                                              | ✅ Ja                                                                                                                                      |
| **Formatting (dates, numbers, currencies)**         | ✅ `useNumber`, `useDate`, ... (Intl unter der Haube)                                               | ✅ `useFormatter()` (Intl unter der Haube)                                                                                                 |
| **Lokalisierte Routing & Middleware**               | ✅ Integrierte Proxy/Middleware, `getMultilingualUrls`                                              | ✅ Integrierte Middleware, `Link`, `redirect`, `usePathname`                                                                               |
| **SEO-Helfer (hreflang, sitemap, robots)**          | ✅ Integrierte Helfer                                                                               | ⚠️ Manuell, basierend auf Routing-Konfiguration                                                                                            |
| **Synchrone Server-Komponenten**                    | ✅ `useIntlayer` aus `next-intlayer/server` funktioniert in jeder untergeordneten Server-Komponente | ⚠️ `getTranslations` ist asynchron; synchrone untergeordnete Komponenten benötigen `t` als Props                                           |
| **Statisches Rendering**                            | ✅ Blockiert das statische Rendering nicht                                                          | ⚠️ Erfordert `setRequestLocale()`; Namespace-Kataloge haben in unseren Tests immer noch Seiten aus dem statischen Rendering ausgeschlossen |
| **Tree-shaking (nur verwendete Inhalte versenden)** | ✅ Pro Komponente, pro Sprache, automatisiert durch den Compiler                                    | ⚠️ Manuell: Namespaces + `pick(messages, [...])` pro Seite                                                                                 |
| **Lazy Loading**                                    | ✅ `importMode: 'dynamic'` (eine Zeile Konfiguration)                                               | ⚠️ Manuell: dynamische Importe in `getRequestConfig`                                                                                       |
| **Nicht verwendete Inhalte bereinigen**             | ✅ Ungenutzte Wörterbücher werden zur Build-Zeit entfernt                                           | ❌ Nicht integriert                                                                                                                        |
| **Testen fehlender Übersetzungen (CLI / CI)**       | ✅ `npx intlayer content test`                                                                      | ⚠️ Nicht integriert; Dokumentation schlägt `npx @lingual/i18n-check` vor                                                                   |
| **KI-gestützte Übersetzung**                        | ✅ Integriert, verwendet deine eigenen Provider-Schlüssel                                           | ❌ Nein                                                                                                                                    |
| **Visual Editor / CMS**                             | ✅ Kostenloser Visual Editor + optionales CMS                                                       | ❌ Nein (externe Lokalisierungsplattformen)                                                                                                |
| **MCP server & Agent Skills**                       | ✅ Ja                                                                                               | ❌ Nein                                                                                                                                    |
| **Ökosystem / Gemeinschaft**                        | ⚠️ Kleiner aber wächst schnell                                                                      | ✅ Groß, die Next.js-Referenz                                                                                                              |

## Die Benchmark

### Was wurde gemessen

Die [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) Suite erstellt **die gleiche Anwendung** mit jeder Bibliothek: **10 Seiten** (Home, About, Blog, Karrieren, Kontakt, FAQ, Preise, Produkte, Einstellungen, Team), **10 Sprachen** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identische Komponenten und identischer Inhalt. Seiten werden in `en` und `fr` gemessen. Jede Bibliothek wird in bis zu vier **Ladestrategien** implementiert, von der naiven Einrichtung bis zur optimalen:

| Strategie          | Beschreibung                                                                                  | Wer macht das                            |
| ------------------ | --------------------------------------------------------------------------------------------- | ---------------------------------------- |
| **static**         | Jedes Locale und jede Seite zusammen gebündelt                                                | Schnelle Prototypen, KI-generierter Code |
| **dynamic**        | Nur das aktive Locale wird geladen, aber alle Seiten auf einmal                               | Die meisten Projekte                     |
| **scoped-static**  | Pro-Route Namespaces, kein Lazy Loading                                                       | Selten                                   |
| **scoped-dynamic** | Pro-Route Namespaces + Lazy Loading. Nur die aktuelle Seite im aktuellen Locale wird gesendet | Apps mit striktem Performance-Budget     |

Intlayer hat keine "scoped"-Variante: Der Compiler scoped Inhalte **pro Komponente** automatisch, daher sind seine `static`- und `dynamic`-Zeilen bereits scoped.

Für jeden Build zeichnet die Suite Folgendes auf:

- **Lib size**: gzip-Größe einer leeren Komponente, die nur die i18n-Bibliothek importiert. Die Fixkosten der Runtime.
- **Page JS**: gzip-JavaScript, das pro Seite heruntergeladen wird, gemittelt über alle Seiten und Sprachen.
- **Locale leak %**: Anteil der übersetzten Strings im heruntergeladenen JS, die zu einer Sprache gehören, die der Benutzer **nicht** ansieht (fingerprinted auf `en` und `fr`, also bedeutet 50 % "die andere gemessene Sprache ist vollständig vorhanden"; bei 10 gebündelten Sprachen ist der tatsächliche Verschwendung höher).
- **Page leak %**: Anteil der übersetzten Strings im heruntergeladenen JS, die zu einer Seite gehören, auf der sich der Benutzer **nicht** befindet.
- **Component avg**: durchschnittliche gzip-Größe jeder Komponente, die isoliert kompiliert wird. Zeigt, wie viel i18n-Runtime eine einzelne Komponente mit sich bringt.
- **E2E Reaktivität**: Echtzeit zwischen der Auswahl eines neuen Locale und der Aktualisierung von `html[lang]` im DOM (Playwright, 5 Iterationen).
- **Hydration**: Dauer der React-Hydration-Phase.

> Die folgenden Zahlen stammen aus dem Lauf vom **12.09.2026** mit `next-intl` 4.14.2, `use-intl` 4.14.2 und `intlayer` 9.5.1. Die Test-Anwendung ist absichtlich klein (einige Dutzend Strings pro Locale), daher beschreiben die Leckage-Prozentsätze ein **Muster**: Sie wachsen mit Ihrem Inhalt, während die Runtime-Kosten fest bleiben.

### Ergebnisse auf Next.js (App Router)

| Library                        | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity | Hydration |
| ------------------------------ | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | --------: |
| **base** (keine i18n)          | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |   11.8 ms |
| `next-intl`                    | static         |       14.7 KB |         153.6 KB |        4.2% |     89.8% |            21.8 KB |        16.0 ms |   14.7 ms |
| `next-intl`                    | dynamic        |       14.7 KB |         153.6 KB |        9.7% |     89.9% |            21.8 KB |        15.6 ms |   14.8 ms |
| `next-intl`                    | scoped-static  |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            80.1 KB |        17.9 ms |   17.4 ms |
| `next-intl`                    | scoped-dynamic |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            22.9 KB |        17.8 ms |   16.8 ms |
| **`next-intlayer`**            | static         |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **8.5 KB** |    **15.5 ms** |   16.9 ms |
| **`next-intlayer`**            | dynamic        |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **6.9 KB** |    **15.3 ms** |   15.9 ms |
| `@intlayer/next-intl` (compat) | static         |        8.0 KB |         147.5 KB |        0.0% |      0.0% |             8.1 KB |        14.5 ms |   12.8 ms |
| `@intlayer/next-intl` (compat) | dynamic        |        8.0 KB |         148.7 KB |        0.0% |      0.0% |             8.1 KB |        11.7 ms |   12.8 ms |

**Wie man es liest**

- **Laufzeit-Kosten.** Die Basis-Anwendung wiegt 141.0 KB pro Seite. `next-intl` bringt es auf 153.6 KB (**+12.6 KB gzip auf jeder Seite**), Intlayer auf 141.3 KB (**+0.3 KB**). Dieser Unterschied hängt nicht davon ab, wie viele Strings Sie haben: es ist die Library-Runtime.
- **Leakage.** In den zwei Setups, die die meisten Teams tatsächlich einsetzen (`static` und `dynamic`), liefert `next-intl` **~90% der Strings fremder Seiten** mit jeder Seite: das gesamte `en.json` wird in den Client Provider eingebunden. Um auf 0% zu kommen, sind die `scoped-*` Setups erforderlich: Kataloge in Namespaces aufteilen und dann `pick()` die richtigen auf jeder Seite. Intlayer liegt in beiden Zeilen ohne all das bei 0%.
- **Per-Page JS bewegte sich für `next-intl` zwischen Strategien nicht.** Der Testinhalt ist klein, daher ist das ~90% Leakage hier nur wenige KB. Bei einer echten App mit Hunderten von Strings pro Seite wird dieses Verhältnis zur dominanten Kosten. Währenddessen wird die +12,6 KB Runtime in jeder Konfiguration bezahlt.
- **Komponentengröße.** Eine Komponente, die `useTranslations()` aufruft, wird im Durchschnitt zu 21,8 KB kompiliert; die gleiche Komponente mit `useIntlayer()` wird zu 6,9 KB kompiliert. Im `scoped-static`-Setup springen die `next-intl`-Komponenten auf 80,1 KB, weil jede ihren Namespace-Katalog inline einfügt.
- **Reaktivität und Hydration** liegen für beide Bibliotheken auf Next.js im gleichen Bereich (15-18 ms). Keine von beiden ist hier ein Engpass.

### Ergebnisse auf TanStack Start (`use-intl`)

`use-intl` ist der Framework-agnostische Kern von `next-intl`. Gleiche API, gleiches Nachrichtenformat. Der Vergleich mit `intlayer` auf TanStack Start entfernt die Next.js-spezifischen Teile der Gleichung.

| Library                       | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |
| ----------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: |
| **base** (keine i18n)         | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |         8.1 ms |
| `use-intl`                    | static         |       14.1 KB |         179.8 KB |       50.0% |     89.8% |            76.0 KB |         6.7 ms |
| `use-intl`                    | dynamic        |       14.1 KB |         119.4 KB |        0.0% |     89.8% |            75.9 KB |         7.0 ms |
| `use-intl`                    | scoped-static  |       14.1 KB |         128.7 KB |        0.0% |      0.0% |            87.1 KB |        20.9 ms |
| `use-intl`                    | scoped-dynamic |       14.1 KB |         128.7 KB |        0.0% |      0.0% |            87.1 KB |        13.3 ms |
| **`intlayer`**                | static         |    **5.0 KB** |     **125.8 KB** |       50.0% |  **0.0%** |         **8.1 KB** |     **3.2 ms** |
| **`intlayer`**                | dynamic        |    **5.0 KB** |     **118.6 KB** |    **0.0%** |  **0.0%** |         **6.3 KB** |     **3.6 ms** |
| `@intlayer/use-intl` (compat) | dynamic        |        7.3 KB |         129.7 KB |        0.0% |      0.0% |             9.3 KB |         8.7 ms |

**So wird es gelesen**

- Das naive `use-intl`-Setup versendet **68.8 KB mehr JS pro Seite** als die Basis-App, wobei die Hälfte der Strings zur falschen Locale gehört und 90% zur falschen Seite.
- `use-intl` im `dynamic`-Modus landet bei 119,4 KB, nahe an Intlayers 118,6 KB, trägt aber immer noch **89,8% Seiten-Leakage**: alle Strings aller Seiten für das aktive Locale werden auf jeder Seite geladen. Das Scoping pro Route (`scoped-*`) entfernt das Leak, kostet aber zusätzliche ~9 KB Chunk-Overhead.
- Intlayer's `static`-Zeile hat bereits **0% Seiten-Leakage**: der Compiler bundelt nur die Dictionaries, die von den Komponenten auf der Seite verwendet werden. Das Aktivieren von `importMode: 'dynamic'` (eine Zeile in `intlayer.config.ts`) entfernt auch das Locale-Leakage.
- **Komponenten-Größe ist der Punkt, wo die Architektur sich zeigt**: 76-87 KB pro Komponente mit `use-intl` gegenüber 6-8 KB mit Intlayer. `useTranslations()` bindet jede Komponente an den globalen Message-Tree; `useIntlayer()` bindet sie an ihr eigenes Dictionary.
- **Locale-Wechsel** ist mit Intlayer 2x-4x schneller (3 ms vs 7-21 ms).

## Warum der Unterschied? Zentralisierte Kataloge vs. kompilierte Wörterbücher

`next-intl` folgt dem klassischen Modell: eine JSON pro Locale, geladen in `getRequestConfig`, gepusht in einen `NextIntlClientProvider`, gelesen durch `t("namespace.key")`.

```bash
.
├── messages
│   ├── en.json
│   └── fr.json
└── src
    ├── i18n
    │   ├── request.ts
    │   └── routing.ts
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                └── page.tsx
```

Die Runtime kann nicht wissen, welche Keys eine Seite verwenden wird, also ist der sichere Standard, den gesamten Katalog zu senden. Optimierung bedeutet, dass **Sie** den Katalog in Namespaces aufteilen, **Sie** entscheiden, welche Namespaces jede Seite benötigt, und **Sie** diese Zuordnung synchron halten, während sich Komponenten bewegen. Die `scoped-dynamic`-Zeile des Benchmarks ist die Belohnung für diese Arbeit, und die meisten Teams erreichen das nie.

Intlayer dreht die Verantwortung um. Inhalte werden neben der Komponente deklariert:

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           ├── page.tsx
    │           └── page.content.ts
    └── components
        └── Counter
            ├── index.tsx
            └── index.content.ts
```

Zur Build-Zeit sieht der Compiler (`@intlayer/swc` / `@intlayer/babel`), welche Komponente welches Dictionary importiert. Er bündelt nur diese Dictionaries, nur für die aktive Locale, und verwirft die, die nichts importiert. Das "scoped-dynamic" Pattern wird zur Ausgabe des Builds, anstatt eine Disziplin zu sein, die das Team beibehalten muss.

> Um die Nummern der `dynamic` Reihe zu erhalten, setzen Sie `dictionary.importMode: 'dynamic'` in `intlayer.config.ts`. Siehe die [Bundle-Optimierungs-Dokumentation](https://intlayer.org/doc/concept/bundle-optimization).

## Developer Experience

### Client-Komponente

**next-intl**

```json fileName="messages/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/Counter.tsx"
"use client";

import { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

export const Counter = () => {
  const t = useTranslations("counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button aria-label={t("label")} onClick={() => setCount((c) => c + 1)}>
        {t("increment")}
      </button>
    </div>
  );
};
```

> Denken Sie daran, den `counter`-Namespace in die Nachrichten einzubeziehen, die an `NextIntlClientProvider` auf jeder Seite übergeben werden, die diese Komponente rendert.

**Intlayer**

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ de: "Zähler", en: "Counter", fr: "Compteur" }),
    increment: t({ de: "Inkrementieren", en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter/index.tsx"
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

Nichts auf der Seite zu registrieren: die Komponente bringt ihren eigenen Inhalt mit.

### Synchrone Server-Komponente

Design-System-Komponenten (Navbar, Footer, Cards) sind oft Server-Komponenten, die als untergeordnete Elemente von Client-Komponenten gerendert werden, daher können sie nicht `async` sein.

**next-intl**

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  formattedCount: string;
};

export const ServerCounter = ({ t, formattedCount }: ServerCounterProps) => (
  <div>
    <p>{formattedCount}</p>
    <button aria-label={t("label")}>{t("increment")}</button>
  </div>
);
```

Die Seite muss `await getTranslations("counter")` und `await getFormatter()` aufrufen und die Ergebnisse dann als Props nach unten weiterleiten. Die Komponente ist nicht mehr in sich geschlossen.

**Intlayer**

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

### Metadaten

**next-intl**

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

const localizedPath = (locale: string, path: string) =>
  locale === routing.defaultLocale ? path : `/${locale}${path}`;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
};
```

**Intlayer**

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("about-metadata", locale);
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};
```

## Behalte die next-intl API, erhalte die Ausgabe von Intlayer

Du musst Komponenten nicht neu schreiben, um die oben genannten Benchmark-Zahlen zu erreichen. `@intlayer/next-intl` ist ein Drop-in-Adapter: Er behält `useTranslations`, `getTranslations`, `useFormatter`, `t.rich()`, ICU-Plurale und die `next-intl/navigation` Helper bei und stellt sie aus den vom Intlayer-Compiler kompilierten Intlayer-Wörterbüchern bereit.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

Im Benchmark ist die Kompatibilitätsbuild derselben App von **153,6 KB auf 147,5 KB** pro Seite, von **21,8 KB auf 8,1 KB** pro Komponente und von **~90% Seiten-Leakage auf 0%** gesunken, wobei der Anwendungscode unverändert blieb. Ihre vorhandenen `messages/{locale}.json`-Dateien können durch das [JSON-Sync-Plugin](https://intlayer.org/doc/compatibility/next-intl) als Quelle der Wahrheit bleiben.

Siehe den [next-intl-Migrationsleitfaden](https://intlayer.org/doc/migration/next-intl) für eine Schritt-für-Schritt-Anleitung.

## Wann sollte man was wählen?

- **Wählen Sie next-intl**, wenn Sie den Ökosystem-Standard für Next.js mögen, Sie sich auf ICU MessageFormat verlassen, Ihre App klein bis mittelgroß ist, oder Sie mit einer Übersetzungsplattform (Crowdin, Phrase, Lokalise...) integrieren, die zentralisierte JSON erwartet. Planen Sie Zeit für das Namespace von Katalogen und wählen Sie Nachrichten pro Seite, wenn Performance wichtig ist.
- **Wählen Sie Intlayer**, wenn Sie **komponentengebundene Inhalte**, **striktes TypeScript**, **Build-Zeit-Fehler bei fehlenden Schlüsseln**, **müheloses Tree-Shaking und Lazy Loading**, synchrone Server Components und integrierte redaktionelle Tools (Visual Editor, CMS, AI-Übersetzung, MCP-Server) mögen. Besonders relevant für große, modulare Codebases und Design Systems.
- **Wählen Sie `@intlayer/next-intl`**, wenn Sie bereits `next-intl` verwenden und die Bundle-Gewinne ohne Umschreiben mögen.

## Verwandte Vergleiche

- [i18next vs Intlayer](https://intlayer.org/blog/i18next-vs-intlayer) (gleicher Benchmark)
- [Lingui vs Intlayer](https://intlayer.org/blog/lingui-vs-intlayer) (gleicher Benchmark)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark) (gleicher Benchmark)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer)
- [Is next-intl outdated?](https://intlayer.org/blog/is-next-intl-outdated)

## GitHub STARS

GitHub-Sterne sind ein starker Indikator für die Beliebtheit eines Projekts, das Vertrauen der Community und die langfristige Relevanz. Obwohl sie kein direktes Maß für technische Qualität sind, spiegeln sie wider, wie viele Entwickler das Projekt für nützlich befinden, dessen Fortschritt verfolgen und es wahrscheinlich einführen werden.

[![Star History Chart](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#amannn/next-intl&aymericzip/intlayer)

## Fazit

`next-intl` ist eine solide, gut gepflegte Bibliothek, und der Benchmark bestätigt, dass sie bei Next.js weit entfernt davon ist, die schlechteste Option zu sein. Aber sein zentralisiertes Katalog-Modell legt jede Optimierung in die Hände des Entwicklers: Das naive Setup leckt ~90% des Inhalts fremdsprachiger Seiten, und die Runtime allein kostet +12,6 KB gzip auf jeder Seite.

Intlayer verlagert diese Arbeit in den Compiler. Pro-Komponenten-Wörterbücher, Pro-Locale-Lazy-Loading und Dead-Content-Purging sind Build-Ausgaben, keine Konventionen. Das Ergebnis in derselben App: **+0,3 KB pro Seite**, **0% Leckageverlust**, Komponenten **3x kleiner**, und ein Locale-Wechsel **2x-4x schneller** auf TanStack Start.

Alle Rohdaten, die Test-Apps und die Scripts befinden sich im [Benchmark-Bloom-Repository](https://github.com/intlayer-org/benchmark-bloom). Führen Sie es selbst aus.

Weitere Informationen finden Sie in der [Dokumentation 'Why Intlayer?'](https://intlayer.org/doc/why).
