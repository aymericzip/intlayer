---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "Lingui vs @intlayer/lingui: Gleiche Makros, Andere Runtime"
description: Was sich ändert, wenn eine React-App ihre Lingui-Makros behält, sie jedoch über den @intlayer/lingui Kompatibilitätsadapter bereitstellt. Komponentengröße, Hydratisierung, Leakage und JavaScript pro Seite gemessen am selben TanStack-Start-Code, inklusive der Bereiche, in denen der Adapter im Nachteil ist.
keywords:
  - Lingui
  - "@intlayer/lingui"
  - Intlayer
  - Kompatibilitätsadapter
  - Migration
  - Internationalisierung
  - i18n
  - Benchmark
  - Bundle-Größe
  - Blog
  - React
  - TanStack Start
  - Vite
slugs:
  - blog
  - lingui-vs-intlayer-lingui
author: aymericzip
---

# Lingui VS @intlayer/lingui | Gleiche Makros, Andere Runtime

`@intlayer/lingui` ist ein Kompatibilitätsadapter für `@lingui/core` und `@lingui/react`. Ihre Aufrufe von `` t`...` ``, `<Trans>`, `useLingui()` und `i18n._()` bleiben exakt unverändert; die Makros kompilieren weiterhin; was sich ändert, ist der Ursprung der Nachrichten zur Laufzeit. Statt eines einzigen kompilierten Katalogs pro Sprache ist jeder Aufrufpunkt an ein eigens dafür kompiliertes Intlayer-Wörterbuch gebunden.

Dieser Artikel analysiert diesen Austausch anhand derselben TanStack-Start-Anwendung, einmal mit Lingui und einmal mit dem Adapter gebaut. Die Messwerte stammen aus [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Für einen direkten Vergleich der beiden Bibliotheken lesen Sie [Lingui vs Intlayer](https://intlayer.org/de/blog/lingui-vs-intlayer). Hier geht es darum, was der Adapter bewirkt und wo er keine Vorteile bringt.

<TOC/>

> **tl;dr**: In derselben TanStack-Start-App reduzierte `@intlayer/lingui` die durchschnittliche Komponentengröße von **85,5 KB auf 12,8 KB** gzip, die Hydratisierung von **28 ms auf 19,7 ms** und den Sprachwechsel von **5,9 ms auf 2,9 ms**, während die Makros unangetastet blieben. Im einfachen Setup (alle Kataloge vorab geladen) beseitigte er zudem **90% Seiten-Leakage** und 12 KB pro Seite. Im lazy-loaded Setup liefert er jedoch **137 KB pro Seite gegenüber 115 KB** bei reinem Lingui aus: Der Adapter löst ICU zur Laufzeit auf, während Lingui vorkompilierte Token-Arrays bereitstellt. Das Leakage der Quellsprache (~9-10%) ist auf beiden Seiten identisch, da es aus dem in den Komponenten eingebetteten `message`-Fallback stammt und nicht aus der Runtime. Der Adapter ist ein Vite-Plugin; gemessen wurde auf TanStack Start.

## Was `@intlayer/lingui` ist

Lingui besteht aus einem Compiler und einer Runtime. Makros in Ihrem Quellcode werden in einen `.po`- (oder JSON-)Katalog pro Sprache extrahiert, in ein JS-Modul pro Sprache kompiliert und über `i18n.load()` + `i18n.activate()` in eine globale `I18n`-Instanz geladen. Jedes `useLingui()` abonniert diese Instanz; jeder `_()`-Aufruf sucht seine ID im aktiven Katalog.

`@intlayer/lingui` behält die Makros und die API bei und ersetzt das Nachschlagen im Gesamtkatalog:

1. **Import-Aliasing.** Das `lingui()`-Plugin aus `@intlayer/lingui/plugin` umschließt `vite-intlayer` und fügt Einträge in `resolve.alias` hinzu, sodass `@lingui/core` und `@lingui/react` auf `@intlayer/lingui` verweisen. Ihre Importe bleiben unverändert.
2. **Kataloge als Source of Truth.** Das `syncJSON`-Plugin (oder `syncPO` für `.po`-Dateien) liest Ihre bestehenden Kataloge ein und überführt sie in Intlayer-Wörterbücher, wobei Übersetzungen zurückgeschrieben werden, sobald das CLI oder das CMS Aktualisierungen vornimmt. Mit `splitKeys: "key-prefix"` wird ein flacher Katalog aus punktierten IDs (`footer.github`, `hero.title`) in kleine Wörterbücher pro Präfix aufgeteilt, anstelle einer einzigen 244-KB-Datei.
3. **Bindung am Aufrufpunkt.** Der Intlayer-Optimierungsdurchlauf sammelt die an `_`, `t` und `<Trans>` übergebenen IDs in jeder Datei und stellt der Komponente nur die passenden Wörterbücher bereit. `<Trans id="hero.title">` bindet sich autonom; `useLingui()` bindet alle in der Datei verwendeten Präfixe. IDs ohne Punkt (gehashte IDs, `mockBanner`) greifen auf das zentrale `messages`-Fallback-Wörterbuch von Lingui zurück.

```tsx fileName="src/components/Hero.tsx"
// Ihr Code, unverändert
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";

const Hero = () => {
  const { _ } = useLingui();
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle">Every byte counts</Trans>
    </section>
  );
};
```

```tsx fileName="Was der Compiler ausgibt (vereinfacht)"
import _dicHash_hero from "../.intlayer/dictionaries/hero.mjs";
import {
  useDictionary as useLingui,
  TransDictionary as Trans,
} from "@intlayer/lingui";

const Hero = () => {
  const { _ } = useLingui(_dicHash_hero);
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle" dictionary={_dicHash_hero}>
        Every byte counts
      </Trans>
    </section>
  );
};
```

Die Komponente greift nicht mehr auf die globale Instanz und den dahinterliegenden Gesamtkatalog zu. Sie greift nur auf `hero` zu. Genau das ist der Grund, warum die Komponentengröße in der Tabelle unten um den Faktor 7 sinkt.

## Was der Adapter beibehält, ignoriert und nicht ersetzt

| Lingui-API                                                | Mit `@intlayer/lingui`                                                                                           |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Makros `` t`...` ``, `msg`, `plural`, `select`, `<Trans>` | ✅ Beibehalten. Belassen Sie `@lingui/babel-plugin-lingui-macro` oder `@lingui/swc-plugin` im Build vor Intlayer |
| `useLingui()` → `{ i18n, _, t }`                          | ✅ Beibehalten. Funktioniert auch außerhalb eines Providers (Sprache abgeleitet aus `react-intlayer`)            |
| `i18n._(id, values)`, `i18n.t()`                          | ✅ Beibehalten. Löst explizite sowie gehashte IDs zuverlässig auf                                                |
| ICU-Pluralformen, `select`, `selectordinal`, `#`          | ✅ Beibehalten, über den ICU-Resolver von Intlayer                                                               |
| `i18n.date()`, `i18n.number()`, `formats`                 | ✅ Beibehalten, basierend auf nativem `Intl`                                                                     |
| `I18nProvider`                                            | ✅ Beibehalten. Kapselt einen `IntlayerProvider`; hört auf `i18n.on("change")`, damit `activate()` re-rendert    |
| `i18n.activate(locale)`                                   | ✅ Beibehalten                                                                                                   |
| `i18n.load(locale, messages)` / `loadAndActivate()`       | ⚠️ Als **Laufzeit-Fallback** akzeptiert. Kompilierte Wörterbücher haben Vorrang; Dev-Warnung empfiehlt Ausbau    |
| `setupI18n({ messages, missing })`                        | ⚠️ `messages` werden als Laufzeit-Fallback gemergt; `missing` wird ignoriert                                     |
| `lingui extract` / `lingui compile`                       | ✅ Bleibt Ihr gewohnter Workflow. Richten Sie `syncPO` / `syncJSON` auf die extrahierten Kataloge aus            |
| `defaultComponent` auf `I18nProvider`                     | ⚠️ Im Kontext gespeichert, wird beim Rendern nicht angewendet                                                    |
| Next.js                                                   | ❌ Das Plugin umschließt `vite-intlayer`. Nur für Vite, TanStack Start und React Router                          |

## Der Benchmark

### Was gemessen wurde

Die [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) Suite baut **dieselbe Anwendung** in jedem Setup: **10 Seiten** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 Sprachen** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identische Komponenten und identischer Inhalt. Gemessen werden die Seiten in `en` und `fr`.

Lingui wurde in vier Ladestrategien getestet: vom Vorab-Import aller kompilierten Kataloge (`static`) bis hin zu einem dynamisch pro Route geladenen Katalog (`scoped-dynamic`). Der Adapter wurde auf denselben **Komponenten** getestet, wobei lediglich `vite.config.ts` und `intlayer.config.ts` angepasst wurden. Die Zeile `static` bündelt alle Sprachen; die Zeile `dynamic` (`importMode: 'dynamic'`) lädt die aktive Sprache nach Bedarf nach. Es gibt keine "scoped"-Variante: Der Optimierungsdurchlauf kapselt ohnehin auf Aufrufpunkt-Ebene.

Für jeden Build erfasst die Testsuite:

- **Lib size**: gzip-Größe einer leeren Komponente, die nur die i18n-Bibliothek importiert.
- **Page JS**: gzip-JavaScript-Downloadmenge pro Seite, gemittelt über alle Seiten und Sprachen.
- **Locale leak %**: Anteil übersetzter Zeichenketten im heruntergeladenen JS, die zu einer Sprache gehören, die der Benutzer **nicht** betrachtet.
- **Page leak %**: Anteil übersetzter Zeichenketten im heruntergeladenen JS, die zu einer Seite gehören, auf der sich der Benutzer **nicht** befindet.
- **Component avg**: durchschnittliche gzip-Größe jeder isoliert kompilierten Komponente.
- **E2E reactivity**: gemessene Zeitspanne zwischen der Auswahl einer neuen Sprache und der Aktualisierung von `html[lang]` im DOM (Playwright, 5 Durchläufe).
- **Hydration**: Dauer der React-Hydratisierungsphase.

> Die Werte unten stammen aus dem Testlauf vom **2026-09-12** mit `@lingui/react` 6.6.0 und `@intlayer/lingui` 9.5.1. Die Testanwendung ist bewusst kompakt gehalten (einige Dutzend Strings pro Sprache), weshalb die Leakage-Prozentsätze ein **Muster** beschreiben: Sie wachsen mit zunehmendem Inhalt, während die Laufzeitkosten konstant bleiben.

### Ergebnisse auf TanStack Start

| Setup                  | Strategie      | Lib size (gz) | Page JS Ø (gz) | Locale-Leak | Seiten-Leak | Komponente Ø (gz) | E2E-Reaktivität | Hydratisierung |
| ---------------------- | -------------- | ------------: | -------------: | ----------: | ----------: | ----------------: | --------------: | -------------: |
| **base** (ohne i18n)   | -              |        0,0 KB |       111,0 KB |        0,0% |        0,0% |            0,7 KB |          8,1 ms |        21,6 ms |
| Lingui                 | static         |       11,2 KB |       152,2 KB |       50,0% |       90,0% |           58,0 KB |          3,9 ms |        19,9 ms |
| Lingui                 | dynamic        |       11,2 KB |   **115,2 KB** |        9,3% |        0,0% |           85,5 KB |          5,9 ms |        28,0 ms |
| Lingui                 | scoped-static  |       11,2 KB |       120,8 KB |        4,0% |        0,0% |          147,9 KB |          7,1 ms |        33,9 ms |
| Lingui                 | scoped-dynamic |       11,2 KB |       120,2 KB |        8,6% |        0,0% |           83,7 KB |         42,1 ms |        32,9 ms |
| **`@intlayer/lingui`** | static         |   **10,3 KB** |       140,5 KB |       50,0% |    **0,0%** |       **14,9 KB** |      **3,3 ms** |    **11,3 ms** |
| **`@intlayer/lingui`** | dynamic        |   **10,3 KB** |       137,0 KB |        9,9% |    **0,0%** |       **12,8 KB** |      **2,9 ms** |    **19,7 ms** |
| `intlayer` (nativ)     | static         |        5,0 KB |       125,8 KB |       50,0% |        0,0% |            8,1 KB |          3,2 ms |        11,5 ms |
| `intlayer` (nativ)     | dynamic        |        5,0 KB |       118,6 KB |        0,0% |        0,0% |            6,3 KB |          3,6 ms |        14,1 ms |

**Interpretation der Messwerte**

- **Komponenten: 7x kleiner.** Dies ist der Haupteffekt des Adapters. Eine isoliert kompilierte Lingui-Komponente wiegt je nach Strategie im Schnitt **58 bis 148 KB**, weil `useLingui()` auf die globale Instanz und alle darin geladenen Kataloge zugreift. Dieselbe Komponente mit dem Adapter wiegt durchschnittlich nur **12,8 bis 14,9 KB**: Sie importiert ausschließlich ihre eigenen Wörterbücher und den ICU-Resolver.
- **Hydratisierung: 8 bis 14 ms schneller.** `i18n.load()` + `i18n.activate()` laufen auf dem Client, bevor React hydratisieren kann; je stärker Lingui lazy-loaded ist, desto länger dauert dieser Schritt (28 bis 34 ms). Mit dem Adapter stehen Wörterbücher als statische Importe bereit, die der Bundler bereits im Seiten-Chunk platziert hat: **11,3 ms** im `static`- und **19,7 ms** im `dynamic`-Modus.
- **Sprachwechsel: 2x schneller und ohne Leistungseinbruch.** Linguis optimiertes `scoped-dynamic`-Setup benötigt **42 ms**, um `html[lang]` zu aktualisieren, da der Routen-Katalog erst angefordert, geladen und aktiviert werden muss, bevor die Änderung sichtbar wird. Der Adapter bleibt in beiden Modi bei stabilen **2,9 bis 3,3 ms**.
- **Das naive Setup wird ohne Aufwand saniert.** Statisches Lingui liefert jeden Katalog auf jeder Seite aus: 152,2 KB und 90% Seiten-Leakage. Der statische Adapter: 140,5 KB, 0% Seiten-Leakage bei denselben Komponenten.
- **Dateigröße pro Seite: Lingui gewinnt in `dynamic` um 22 KB.** Dieser Punkt muss offen benannt werden. Lingui kompiliert Nachrichten zur Build-Zeit in Token-Arrays und liefert eine minimale 11-KB-Runtime aus, die diese lediglich abläuft. Der Adapter liefert den ICU-Resolver von Intlayer (ca. 15 KB mehr an `@intlayer/core` im Vergleich zum nativen Build), die Adapter-Schicht (~10 KB) und `react-intlayer` (~6 KB) mit. Bei dieser App sind das **137,0 KB gegenüber 115,2 KB**. Wenn die absolute Seitengröße Ihre einzige Kennzahl ist und Sie bereits lazy-loaded Lingui nutzen, bietet der Adapter hier keinen Vorteil.
- **Sprach-Leakage ist auf beiden Seiten vergleichbar.** 9,3% bei Lingui, 9,9% beim Adapter im Modus `dynamic`. Dies rührt aus den Komponenten selbst: `i18n._({ id: "careers-benefits.pay", message: "Top-of-market compensation" })` transportiert die englische Quelle als Fallback, und ebenso die Makro-Ausgabe, sofern das Message-Feld nicht bereinigt wird. Dieses Englisch landet im `fr`-Chunk, unabhängig davon, welches System die Übersetzung bereitstellt. Natives `intlayer` (`.content.ts`, ohne Inline-Quelltext) erreicht hier 0%.

## Warum sich die Zahlen verändern und warum eine konstant bleibt

Zwei Faktoren bestimmen diese Ergebnisse: **woran eine Komponente gebunden ist** und **in welchem Format die Nachrichten transportiert werden**.

**Bindung.** Bei Lingui ist die Einheit die Sprache. Die Datei `messages.mjs` für `fr` bildet ein einzelnes Modul; jede Komponente, welche die Instanz importiert, hat Zugriff auf den gesamten Inhalt, sodass der Bundler nicht feingranularer aufteilen kann. Beim Adapter ist die Einheit der Aufrufpunkt: `hero` und `footer` sind getrennte Importe, die pro Komponente aufgeteilt und bedarfsgerecht geladen werden. Das begründet die Gewinne bei Komponentengröße, Hydratisierung und Seiten-Leakage.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en/messages.mjs              # Lingui-Compile-Ausgabe, eine pro Sprache
    │   └── fr/messages.mjs
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")
```

```bash
.
├── intlayer.config.ts                   # syncJSON({ splitKeys: "key-prefix" })
├── .intlayer/                           # generiert: ein Wörterbuch pro ID-Präfix, pro Sprache
└── src
    ├── locales
    │   ├── en/messages.json             # unverändert, bleibt die Source of Truth
    │   └── fr/messages.json
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")  ← unverändert
```

**Format.** Der Kompilierungsschritt von Lingui wandelt `{count, plural, one {# item} other {# items}}` in ein Token-Array um; die Runtime parst niemals ICU-Syntax. Der Adapter behält die Nachricht als Text bei und verarbeitet sie mit dem ICU-Resolver von Intlayer. Dies ist ein fixer Overhead von rund 15 KB pro Seite, und der Grund, warum die `dynamic`-Zeile bei den reinen Bytes zurückbleibt, während sie überall sonst gewinnt. Natives Intlayer vermeidet dies, da Wörterbücher in `.content.ts` Knoten wie `enu()` / `insert()` verwenden, die der Compiler im Vorfeld auflöst.

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

Der Befehl erkennt Lingui automatisch, prüft `lingui.config.ts` zur Wahl von `syncPO` (`.po`-Kataloge) oder `syncJSON` (JSON-Kataloge), installiert `intlayer`, `react-intlayer`, `@intlayer/lingui` und das passende Sync-Plugin und tauscht `@lingui/vite-plugin` in `vite.config.ts` gegen das Adapter-Plugin aus. Behalten Sie `@lingui/core`, `@lingui/react` und Ihr Makro-Plugin installiert: Die Makros kompilieren weiterhin und der Adapter nutzt die Lingui-Typen.

</Step>
<Step number={2} title="Intlayer mit Ihren Katalogen verknüpfen">

Für JSON-Kataloge (`format: "minimal"` in `lingui.config.ts`):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./src/locales/${locale}/${key}.json`,
      // Gruppiert punktierte IDs nach ihrem ersten Segment: `footer.github` → Wörterbuch `footer`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

Für `.po`-Kataloge ersetzen Sie `syncJSON` durch `syncPO` aus `@intlayer/sync-po-plugin` mit dem gleichen `source`-Muster unter Nutzung der Dateiendung `.po`. Siehe die [Sync PO Plugin Dokumentation](https://intlayer.org/de/doc/plugin/sync-po).

`splitKeys: "key-prefix"` ist der entscheidende Hebel für die drastische Verkleinerung der Komponenten. Die Katalogdatei behält ihre flache Struktur; die Aufteilung existiert nur in den generierten Wörterbüchern, und das Zurückschreiben führt die Schlüssel wieder zusammen.

</Step>
<Step number={3} title="Plugin hinzufügen">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact({
      // Makro-Plugin beibehalten; es muss vor dem Intlayer-Durchlauf ausgeführt werden
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

`lingui()` integriert `vite-intlayer` (Content-Watching, Wörterbuch-Kompilierung, Optimierungsdurchlauf) und richtet Aliase ein, die `@lingui/core` und `@lingui/react` auf den Adapter umleiten. Nach dem Build stehen Ihnen die gemessenen Verbesserungen direkt zur Verfügung.

</Step>
</Steps>

### Was Sie danach entfernen können

| Datei / Muster                                       | Grund                                                                                          |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `await import(\`./locales/${locale}/messages.mjs\`)` | Wörterbücher werden von den nutzenden Komponenten importiert. `i18n.load()` dient als Fallback |
| `i18n.load()` / `i18n.loadAndActivate()`             | Behalten Sie `i18n.activate(locale)`; entfernen Sie das manuelle Laden von Katalogen           |
| `lingui compile` im Build-Skript                     | Nur wenn Sie JSON / `.po` als Quelle nutzen und keine vorkompilierten Module mehr importieren  |

### Was Sie jenseits von Dateigrößen gewinnen

- **Erkennung fehlender Übersetzungen.** `npx intlayer test` lässt die CI fehlschlagen, wenn einer Sprache ein Schlüssel fehlt; `lingui extract` liefert lediglich Statistiken.
- **`npx intlayer fill`** übersetzt fehlende Einträge mit dem KI-Anbieter Ihrer Wahl (OpenAI, Anthropic, Mistral, Gemini...) und schreibt sie direkt in Ihre Kataloge zurück.
- **Visual Editor und CMS** greifen auf dieselben Wörterbücher zu, wodurch `.po`- und JSON-Dateien von nicht-technischen Teammitgliedern über eine Benutzeroberfläche gepflegt werden können.
- **Schrittweiser Übergang zu `.content.ts`.** Eine Komponente kann jederzeit von `useLingui()` auf `useIntlayer("hero")` mit einer lokal abgelegten Content-Datei umgestellt werden. Beide Wörterbuch-Arten koexistieren reibungslos.

## Grenzen, die Sie vor dem Start kennen sollten

- **Der Seiten-Overhead im `dynamic`-Modus.** Wie oben erläutert: Rechnen Sie bei einer kleineren Anwendung mit rund +20 KB pro Seite gegenüber einem lazy-loaded Lingui-Setup. Dieser Abstand wächst nicht mit weiterem Inhalt (er ist durch den Resolver bedingt, nicht durch Kataloge), schrumpft jedoch auch nicht.
- **Quellsprachen-Leakage bleibt bestehen.** Message-Deskriptoren und kompilierte Makros enthalten den englischen Quelltext als Fallback. Wer dies vollständig vermeiden möchte, muss das Feld `message` entfernen oder die Komponente auf `.content.ts` umstellen.
- **`i18n.load()` ist nur ein Notfall-Fallback.** Wer weiterhin vorkompilierte Kataloge importiert und `load()` aufruft, bindet das alte und das neue Bundle gleichzeitig ein. Entfernen Sie diese Importe.
- **Nur für Vite.** Es gibt kein Next.js-Plugin für `@intlayer/lingui`. Next.js-Projekte mit Lingui sollten sich direkt mit [`next-intlayer`](https://intlayer.org/de/doc/environment/nextjs) befassen.
- **`defaultComponent` wird nicht angewendet.** Wenn Sie sich darauf verlassen, um jedes `<Trans>` automatisch zu kapseln, ergänzen Sie diesen Wrapper explizit im Code.

## Wann welches System einsetzen?

- **Bleiben Sie bei Lingui**, wenn Sie bereits das `scoped-dynamic`-Setup nutzen, Ihr Fokus rein auf minimalen Bytes pro Seite liegt und 42 ms beim Sprachwechsel sowie 30 ms Hydratisierung für Ihr Produkt unproblematisch sind.
- **Nutzen Sie `@intlayer/lingui`**, wenn Sie Lingui einsetzen und leichtere Komponenten, schnellere Hydratisierung, flüssigen Sprachwechsel, 0% Seiten-Leakage im Standard-Setup, typisierte IDs, CI-Prüfungen und KI-Übersetzung wünschen, ohne ein einziges Makro anfassen zu müssen. Es ist die ideale Brücke für bestehende Lingui-Projekte.
- **Wechseln Sie zu nativem Intlayer (`react-intlayer`)**, sobald Komponenten grundlegend überarbeitet werden. Es ist das einzige Setup in der Vergleichstabelle mit **0% Sprach-Leakage**, 5 KB Runtime und lediglich +7,6 KB pro Seite im Vergleich zur Basisanwendung.

## Weiterführende Vergleiche

- [Lingui vs Intlayer](https://intlayer.org/de/blog/lingui-vs-intlayer) (Bibliotheksvergleich auf demselben Benchmark)
- [next-intl vs @intlayer/next-intl](https://intlayer.org/de/blog/next-intl-vs-intlayer-next-intl) (Adapter-Vergleichsserie)
- [i18next vs @intlayer/i18next](https://intlayer.org/de/blog/i18next-vs-intlayer-i18next) (Adapter-Vergleichsserie)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/de/blog/vue-i18n-vs-intlayer-vue-i18n) (Adapter-Vergleichsserie)
- [Kompatibilitätsadapter-Referenz: Lingui](https://intlayer.org/de/doc/compatibility/lingui)
- [Compiler vs deklaratives i18n](https://intlayer.org/de/blog/compiler-vs-declarative-i18n)

## Fazit

`@intlayer/lingui` bindet Aufrufpunkte in Lingui neu an: Statt einer globalen Instanz und eines monolytischen Katalogs greift jede Komponente auf ein für sie kompiliertes Wörterbuch zu. In derselben TanStack-Start-App resultiert dies in **7x kleineren Komponenten**, **8 bis 14 ms schnellerer Hydratisierung**, **2x schnellerem Sprachwechsel** ohne 42-ms-Verzögerung, ganz ohne Anpassung Ihrer Makros. Da Fallback-Texte in den Komponenten unverändert bleiben, bleibt das Quelltext-Leakage bestehen, und die Runtime-ICU-Auflösung führt dazu, dass das lazy-loaded Setup etwa 20 KB mehr pro Seite benötigt als reines Lingui. Prüfen Sie anhand Ihrer Performance-Ziele, welche Kennzahlen für Sie ausschlaggebend sind.

Alle Rohdaten, Testanwendungen und Benchmark-Skripte finden Sie im [Benchmark Bloom Repository](https://github.com/intlayer-org/benchmark-bloom). Sie können die Messungen eigenständig reproduzieren.

Weitere Hintergründe bietet die Dokumentation ['Warum Intlayer?'](https://intlayer.org/de/doc/why).
