---
createdAt: 2026-09-23
updatedAt: 2026-09-23
title: Ist Intlayer leichter als Paraglide?
description: Paraglide wirkt in i18n-Benchmarks nahezu kostenlos, da der Code direkt in Ihr Repository generiert wird. Hier erfahren Sie, wo dieses Gewicht wirklich landet, warum Locale-Abfragen pro Knoten Leistung kosten und wie Intlayers dynamisches Laden nur eine einzige Locale statt aller ausliefert.
keywords:
  - Paraglide
  - Intlayer
  - Internationalisierung
  - i18n
  - Bundle size
  - Tree shaking
  - Benchmark
  - Blog
slugs:
  - blog
  - is-intlayer-lighter-than-paraglide
author: aymericzip
---

# Ist Intlayer leichter als Paraglide?

Ja.

`Paraglide` genießt den Ruf, die leichteste i18n-Lösung auf dem Markt zu sein, und auf den ersten Blick bestätigt der [Benchmark](https://intlayer.org/de/doc/benchmark/tanstack) diesen Eindruck: Die Bibliotheksgröße liegt nahe bei null. Doch eine Bibliotheksgröße von null bedeutet keineswegs null ausgelieferte Bytes. Es bedeutet lediglich, dass die Bytes an einer Stelle liegen, die diese Metrik nicht erfasst.

<TOC/>

## Wichtigste Erkenntnisse

**Die Bibliotheksgröße ist versteckt, nicht verschwunden:**

Paraglide generiert seine Runtime und Nachrichtenfunktionen direkt in Ihre Codebase. Dieser Code wird an den Browser ausgeliefert, wird aber als _Ihr_ Code gewertet und nicht als der Code der Bibliothek.

**Kein Provider bedeutet keinen kostenlosen Gewinn:**

Jeder Aufruf von `m.my_key()` ermittelt die Locale eigenständig und liest bei jedem gerenderten Knoten das Cookie oder den Storage aus, anstatt den Wert einmalig aus einem Kontext zu beziehen.

**Kein dynamisches Laden:**

Paraglide importiert jede Locale einer Nachricht in Ihr Client-Bundle. Intlayer mit `importMode: 'dynamic'` oder `'fetch'` lädt ausschließlich die Locale, die gerade gerendert wird.

**Tree Shaking ist nicht garantiert:**

In einigen unserer Benchmarks griff das von Paraglide beworbene Tree Shaking nicht. Prüfen Sie Ihr eigenes Bundle.

## Wo landet das Gewicht von Paraglide?

In den Benchmark-Berichten misst die Metrik „Bibliotheksgröße“ den Provider und die Hooks jeder i18n-Bibliothek in einer leeren Komponente, bevor Inhalte hinzugefügt werden.

| Bibliothek (TanStack Start)   | Lib-Größe (gz) | Lib-Größe (min) |
| ----------------------------- | -------------- | --------------- |
| `@inlang/paraglide-js@2.15.1` | 1.8 KB         | 4.5 KB          |
| `react-intlayer@9.5.1`        | 5.0 KB         | 15.2 KB         |

Isoliert betrachtet gewinnt Paraglide. Aber Paraglide ist ein Compiler: Es liest Ihre `messages/*.json`-Dateien und schreibt einen `paraglide/`-Ordner in Ihr Repository, der eine `runtime.js` (Locale-Erkennung, Cookie- und Storage-Strategien, URL-Lokalisierung) sowie eine JavaScript-Funktion pro Nachricht enthält.

```bash
src/paraglide/
├── runtime.js      # Locale-Erkennung, Strategien, URL-Hilfsfunktionen
├── server.js
├── messages.js     # Reexportiert alle Nachrichten
└── messages/
    ├── _index.js
    ├── en.js
    └── fr.js
```

Da dieser Code in Ihrem `src/`-Ordner liegt und mit einem relativen Pfad importiert wird, rechnet der Bundler ihn Ihrer Anwendung zu und nicht einem Paket in `node_modules`. Die Spalte für die Bibliotheksgröße zeigt fast nichts an, während dieselbe Logik weiterhin im Bundle Ihrer Seite ausgeliefert wird.

Code zu generieren ist an sich keine schlechte Idee: Die generierte Runtime enthält nur die Logik, die Ihre Konfiguration tatsächlich benötigt (Präfix-Strategie, Cookie vs. Local Storage usw.). Intlayer erreicht dasselbe Ergebnis auf andere Weise, indem zur Build-Zeit Umgebungsvariablen injiziert werden, sodass der Bundler Zweige entfernt, die Ihre Konfiguration nicht nutzt. Beide Ansätze sind letztlich 3- bis 10-mal leichter als `i18next` oder `next-intl`.

Der faire Vergleich ist daher nicht die Bibliotheksgröße. Es ist **das tatsächlich pro Seite übertragene JavaScript**.

## Gemessenes Seitengewicht

TanStack Start App, 10 Seiten, gemessen auf den Routen `en` und `fr`, gzippt:

| Setup                              | Seiten-JS Ø (gz) | Über Basis  | Locale-Leak | Leak anderer Seiten |
| ---------------------------------- | ---------------- | ----------- | ----------- | ------------------- |
| Basis (ohne i18n)                  | 111.0 KB         | -           | 0.0%        | 0.0%                |
| `paraglide` (jede Strategie)       | 125.1 KB         | +14.1 KB    | 49.7%       | 0.0%                |
| `intlayer` (`importMode: static`)  | 125.8 KB         | +14.8 KB    | 50.0%       | 0.0%                |
| `intlayer` (`importMode: dynamic`) | **118.6 KB**     | **+7.6 KB** | **0.0%**    | **0.0%**            |

Next.js 16 App Router, dieselbe Anwendung:

| Setup             | Seiten-JS Ø (gz) | Über Basis  |
| ----------------- | ---------------- | ----------- |
| Basis (ohne i18n) | 141.0 KB         | -           |
| `paraglide-next`  | 155.3 KB         | +14.3 KB    |
| `next-intlayer`   | **141.3 KB**     | **+0.3 KB** |

<I18nBenchmark framework="tanstack" vertical/>

> Vollständige Daten im [TanStack Start Benchmark-Bericht](https://intlayer.org/de/doc/benchmark/tanstack) und im [Next.js Benchmark-Bericht](https://intlayer.org/de/doc/benchmark/nextjs). Jedes Bundle kann im [Benchmark-Repository](https://github.com/intlayer-org/benchmark-i18n) eingesehen werden.

Zwei Aspekte stechen hervor:

- Im `static`-Modus liefert Intlayer praktisch denselben Inhalt wie Paraglide aus (125.8 KB vs. 125.1 KB). Das ist zu erwarten: Beide enthalten jede Locale der Nachrichten, die eine Seite verwendet.
- Paraglide verharrt unabhängig von der Strategie bei 125.1 KB, da es keinen dynamischen Modus bietet. Jede Zeile in der obigen Tabelle entspricht der statischen Variante.

## Kein Provider: Eine vermeintlich gute Idee

Paraglide kommt ohne Provider aus. Sie importieren eine Nachricht und rufen sie direkt auf:

```tsx fileName="Hero.tsx"
import { m } from "../paraglide/messages.js";

export const Hero = () => (
  <section>
    <h1>{m.hero_title()}</h1>
    <p>{m.hero_description()}</p>
    <button>{m.hero_cta()}</button>
  </section>
);
```

Kein Kontext, kein Wrapper, kein Hook. Das wirkt unkompliziert. Doch die Locale muss dennoch ermittelt werden. Jede generierte Nachrichtenfunktion sieht vereinfacht etwa so aus:

```js fileName="paraglide/messages/_index.js"
export const hero_title = (inputs = {}, options = {}) => {
  const locale = options.locale ?? getLocale(); // wird bei jedem Aufruf ermittelt

  if (locale === "en") return en.hero_title(inputs);
  if (locale === "fr") return fr.hero_title(inputs);
  // ...ein Zweig pro Locale
};
```

Und `getLocale()` durchläuft die konfigurierten Strategien (Cookie, Local Storage, URL, Basis-Locale), um die aktuelle Locale zu bestimmen. Jeder gerenderte Textknoten (`<>{m.my_key()}</>`) führt also seine eigene Locale-Auflösung aus, einschließlich des Auslesens von `document.cookie` im Browser. Eine Seite mit 200 übersetzten Zeichenfolgen ermittelt die Locale 200 Mal pro Rendervorgang und erneut bei jedem Re-Render.

Eine providerbasierte Bibliothek liest die Locale **ein einziges Mal** aus, speichert sie in einem Kontext (oder Signal bzw. Store), und jeder Knoten liest einen bereits im Speicher vorhandenen Wert. Der Provider kostet wenige hundert Bytes. Ihn wegzulassen kostet CPU-Leistung bei jedem Render. Das spiegelt sich im Benchmark wider: Paraglides Seitenlade- und Sprachwechselzeiten liegen auf TanStack Start durchweg hinter Intlayer (22.1 ms vs. 14.6 ms beim Seitenaufbau, 4.3 ms vs. 3.2 ms bei der E2E-Reaktivität).

## Entwicklererlebnis (DX)

Die Source of Truth von Paraglide ist JSON, aber Sie importieren die JSON-Dateien nie direkt. Stattdessen importieren Sie die generierte `.js`-Datei:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "hero_title": "Ship your app in every language"
}
```

```json fileName="messages/de.json"
{
  "hero_title": "Veröffentlichen Sie Ihre App in jeder Sprache"
}
```

```tsx fileName="Hero.tsx"
// Existiert erst, nachdem der Compiler die Datei aus dem JSON neu generiert hat
import { m } from "../paraglide/messages.js";

export const Hero = () => <h1>{m.hero_title()}</h1>;
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      de: "Veröffentlichen Sie Ihre App in jeder Sprache",
      en: "Ship your app in every language",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
```

  </Tab>
</Tabs>

Dieser Workflow bringt Nachteile mit sich:

- Jede Änderung an einer JSON-Datei erfordert eine Neugenerierung, bevor der Import aufgelöst werden kann oder Typen aktualisiert werden.
- Der generierte `paraglide/`-Ordner wird entweder committed (was Merge-Konflikte in generierten Dateien bei jedem Text-PR bedeutet) oder ignoriert (was einen Generierungsschritt vor jedem Type-Check, Test und CI-Job erfordert).
- Jede Zeichenkette wird zu einem Funktionsaufruf. Konstanten werden überall zu `m.key()`, selbst an Stellen, an denen ein einfacher Wert genügen würde.

## Tree Shaking: Überprüfen Sie Ihr Bundle

Paraglides zentrales Versprechen lautet, dass ungenutzte Nachrichten per Tree Shaking entfernt werden, da jede Nachricht ein eigener Export ist. Im Benchmark mit Svelte + Vite funktioniert das wie beworben.

In anderen Konfigurationen funktionierte es nicht. In unserem [Next.js](https://intlayer.org/de/doc/benchmark/nextjs)-Lauf wiegen Paraglides Seiten 14 KB mehr als die Basisanwendung, während `next-intlayer` lediglich 0.3 KB hinzufügt. Frühere Durchläufe auf TanStack Start zeigten zudem, dass Nachrichten anderer Seiten im Bundle der Route landeten.

Tree Shaking hängt von Ihrem Bundler (Turbopack, Rolldown, Rollup), der Import-Syntax (`import { m }` vs. `import * as m`) und der Side-Effect-Analyse ab. Wenn Sie Paraglide wegen seiner Größe wählen, öffnen Sie Ihren Bundle-Visualizer und überprüfen Sie, ob das Versprechen in Ihrer Anwendung greift.

## Kein dynamisches Laden

Hier liegt die strukturelle Grenze. Paraglide bietet keine Möglichkeit, nur eine Locale auf einmal zu laden: Jede Nachrichtenfunktion importiert statisch die Implementierung jeder Sprache, sodass alle Sprachen im Client-Bundle landen.

Bei 2 Sprachen wird die Hälfte der Übersetzungsdaten verschwendet, was den oben gemessenen ~50% Locale-Leak entspricht. Bei 10 Sprachen sind es 90%. Bei 30 Sprachen 97%.

Der Wechsel zu dynamischem Laden würde das Problem nicht beheben: Bei einer Funktion pro Nachricht würde das verzögerte Laden jeder einzelnen Funktion tausende Anfragen bedeuten.

Intlayer lässt Ihnen die Wahl, global oder pro Wörterbuch:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic", // 'static' | 'dynamic' | 'fetch'
  },
};

export default config;
```

| `importMode` | Was an den Client ausgeliefert wird                     | vs. Paraglide                   |
| ------------ | ------------------------------------------------------- | ------------------------------- |
| `static`     | Alle Locales der Wörterbücher, die die Seite verwendet  | Theoretisch derselbe Inhalt     |
| `dynamic`    | Nur die aktuelle Locale, Lazy-Loading pro Wörterbuch    | **N-mal kleiner** bei N Locales |
| `fetch`      | Nur die aktuelle Locale, bezogen über die Live Sync API | **N-mal kleiner** bei N Locales |

Mit der [Build-Transformation](https://intlayer.org/de/doc/concept/bundle-optimization) und `importMode: 'static'` lädt Intlayer in der Theorie exakt denselben Inhalt wie Paraglide. Mit `'dynamic'` oder `'fetch'` lädt es nur das, was die aktuelle Locale benötigt: Bei einer App in N Sprachen ist die Übersetzungs-Nutzlast um den Faktor N kleiner als bei Paraglide.

## Wann Paraglide weiterhin passt

<AccordionGroup>
<Accordion header="Svelte + Vite mit wenigen Locales">

Wenn Ihr Stack auf Svelte mit Vite basiert und Sie zwei oder drei Sprachen unterstützen, funktioniert Tree Shaking wie beworben und der Overhead durch zusätzliche Sprachen bleibt gering.

</Accordion>
<Accordion header="Bestehender inlang-Workflow">

Wenn Ihr Team bereits das inlang-Ökosystem nutzt (Fink, Sherlock, Message-Format-Plugins), lässt sich Paraglide nahtlos integrieren.

</Accordion>
</AccordionGroup>

## Testen Sie es in Ihrer Anwendung

Prüfen Sie Bundle-Größe und Locale-Leaks Ihrer Live-Anwendung mit dem kostenlosen [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner):

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

So richten Sie Intlayer ein:

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

## Weiterführende Literatur

- [TanStack Start i18n Benchmark](https://intlayer.org/de/doc/benchmark/tanstack)
- [Next.js i18n Benchmark](https://intlayer.org/de/doc/benchmark/nextjs)
- [Bundle-Optimierung und `importMode`](https://intlayer.org/de/doc/concept/bundle-optimization)
- [So wählen Sie eine React i18n-Bibliothek aus](https://intlayer.org/de/blog/how-to-pick-react-i18n-library)
- [Plädoyer für compilergestützte Internationalisierung](https://intlayer.org/de/blog/compiler-vs-declarative-i18n)
