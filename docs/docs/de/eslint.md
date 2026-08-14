---
createdAt: 2026-08-12
updatedAt: 2026-08-13
title: ESLint Plugin | Linting-Regeln für Intlayer
description: Erkennen Sie hartcodierte Zeichenketten, dynamische Aufrufe, die der Intlayer-Compiler nicht optimieren kann, und ungenutzte Wörterbuchinhalte mit eslint-plugin-intlayer. Funktioniert mit ESLint und oxlint für React, Vue, Svelte, Angular und Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Linting
  - i18n
  - Internationalisierung
  - no-raw-text
  - Hartcodierte Zeichenketten
  - Ungenutzte Übersetzungen
  - Toter Inhalt
  - React
  - Vue
  - Svelte
  - Angular
slugs:
  - doc
  - eslint
history:
  - version: 9.3.1
    date: 2026-08-12
    changes: "Initialer Verlauf"
author: aymericzip
---

# ESLint x OXLint Plugin

`eslint-plugin-intlayer` erkennt die typischen i18n-Fehler, die TypeScript nicht erfassen kann:

1. **Hartcodierter Text**, der nie in einem Wörterbuch deklariert wurde.
2. **Dynamische Aufrufe**, die die Typüberprüfung bestehen und ausgeführt werden, die der Intlayer-Compiler jedoch nicht optimieren kann.
3. **Toter Inhalt** — Wörterbücher und Felder, die an keiner Stelle im Projekt gelesen werden (Opt-in).

Unbekannte Wörterbuchschlüssel, unbekannte Feldpfade und fehlende Locales sind bereits Kompilierungsfehler, weshalb das Plugin diese nicht wiederholt.

## Installation

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

Erfordert ESLint 9 oder höher (Flat Config). ESLint 10 wird unterstützt.

## Verwendung

Das Plugin funktioniert sowohl in ESLint als auch in [oxlint](https://oxc.rs) — dieselben Regeln, dieselben Optionen.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Oder fügen Sie eine Konfiguration ein und legen die Schweregrade selbst fest:

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  ...intlayer.configs.recommended,
  {
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
      "intlayer/no-unused-content": "warn",
    },
  },
];
```

  </Tab>
  <Tab label="oxlint" value="oxlint">

```json fileName=".oxlintrc.json"
{
  "jsPlugins": ["eslint-plugin-intlayer"],
  "rules": {
    "intlayer/no-raw-text": "warn",
    "intlayer/static-dictionary-key": "error",
    "intlayer/no-dynamic-field-access": "error",
    "intlayer/enforce-adapter-import": "warn"
  }
}
```

Zwei Hinweise: Die JS-Plugin-Unterstützung von oxlint befindet sich noch im Alpha-Stadium und oxlint unterstützt keine benutzerdefinierten Parser — `.vue`-, `.svelte`-, `.astro`-Dateien und Angular-Templates werden dort daher nicht geprüft. Führen Sie oxlint für Ihre JS/TS/JSX-Dateien aus und behalten Sie ESLint für den Rest bei.

`no-unused-content` wird oben absichtlich weggelassen: Die Regel benötigt das Arbeitsverzeichnis und den Pfad der geprüften Datei aus dem Regelkontext, was die Alpha-Bridge für JS-Plugins nicht garantiert. Führen Sie diese Regel unter ESLint aus.

  </Tab>
</Tabs>

### Konfigurationen

| Konfiguration   | `no-raw-text`                     | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | --------------------------------- | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                              | error                   | error                     | off                      | off                 |
| `strict`        | error (+ Nicht-JSX-Zeichenfolgen) | error                   | error                     | error                    | off                 |
| `contract-only` | off                               | error                   | error                     | off                      | off                 |

`recommended` belässt `no-raw-text` absichtlich bei `warn`: Bei Anwendung auf eine bestehende Codebasis werden alle unübersetzten Zeichenfolgen auf einmal gemeldet, was Ihren Build nicht von Tag eins an blockieren sollte.

`enforce-adapter-import` ist standardmäßig deaktiviert — aktivieren Sie die Regel bei Bedarf explizit.

`no-unused-content` ist in allen Konfigurationen standardmäßig deaktiviert, einschließlich `strict`. Es ist die einzige Regel, die Ihre Intlayer-Konfiguration liest und Ihre Quelldateien vom Dateisystem durchsucht. Die Aktivierung sollte daher eine bewusste Entscheidung sein und nicht automatisch über ein Preset erfolgen.

## Regeln

### `no-raw-text`

Meldet benutzerorientierten Text, der nicht in einem Wörterbuch deklariert ist. Verwendet dieselbe Erkennung wie `intlayer extract`, sodass Markennamen, CSS-Klassen und technische Bezeichner ignoriert werden.

```jsx
// ✗ Gemeldet
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ Gültig
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

Inhaltsdeklarationsdateien (`*.content.ts`, …) werden übersprungen.

Um eine Datei vollständig auf einmal zu korrigieren, führen Sie `npx intlayer extract` aus und lassen Sie den Compiler die Strings in ein Wörterbuch überführen.

**Optionen**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Attribute, deren Wert benutzerorientierter Text ist.
      // Standard: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Elemente, deren Inhalt niemals benutzerorientierter Text ist.
      // Standard: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Reguläre Ausdrücke für Text, der niemals gemeldet werden soll.
      ignorePatterns: ["^Powered by"],

      // Auch Zeichenketten-Literale außerhalb von Markup melden. Standard: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Erfordert, dass der Wörterbuchschlüssel ein Zeichenfolgen-Literal ist.

Der Compiler kann ein Wörterbuch nur dann vorladen, wenn er den Schlüssel direkt am Aufrufort lesen kann. Bei einem dynamisch berechneten Schlüssel wird die Optimierung stillschweigend übersprungen und stattdessen jedes Wörterbuch gebündelt.

```typescript
// ✗ Gemeldet
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Eine Variable ist immer noch kein Literal
const key = "home";
useIntlayer(key);

// ✓ Gültig
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Dies gilt für `useIntlayer`, `getIntlayer` und jeden Kompatibilitätsadapter (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Erfordert, dass das Feld, das Sie aus einem Wörterbuch lesen, statisch bekannt ist.

Der Compiler entfernt Felder, deren Verwendung er nicht erkennen kann. Ein berechneter Zugriff ist für ihn unsichtbar, sodass der Lesezugriff zur Laufzeit `undefined` zurückgeben kann.

```typescript
// ✗ Gemeldet
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ Gültig
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Bevorzugt den Kompatibilitätsadapter `@intlayer/*` gegenüber dem Originalpaket. Das Originalpaket löst nur dann zu Intlayer auf, wenn der Bundler-Alias konfiguriert ist; der Adapter funktioniert immer. Automatisch behebbar mit `--fix`.

```typescript
// ✗ Gemeldet
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ Gültig
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

### `no-unused-content`

**Standardmäßig deaktiviert.** Meldet Inhalte, die im Projekt nirgends gelesen werden, sowie Wörterbuchschlüssel, die an mehr als einer Stelle deklariert sind.

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ Gemeldet, wenn kein Aufrufer im Projekt "home" abfragt
  content: {
    title: t({ de: "Titel", en: "Title" }),

    // ✗ Gemeldet, wenn nichts `hero` liest
    hero: {
      subtitle: t({ de: "Untertitel", en: "Subtitle" }),
    },
  },
};
```

Im Gegensatz zu den anderen Regeln kann diese Regel nicht allein anhand der geprüften Datei entscheiden — ein Feld ist nur relativ zum gesamten Projekt ungenutzt. Bei der ersten Inhaltsdeklaration eines Lint-Laufs lädt sie Ihre Intlayer-Konfiguration, durchsucht die Quelldateien gemäß Konfiguration (`build.traversePattern`, `compiler.transformPattern`) und führt dieselbe Nutzungsanalyse aus, die auch `@intlayer/lsp` und das Durchstreichen von „ungenutzt“ in der VS Code-Erweiterung antreibt. Das Ergebnis wird für `cacheTtl` Millisekunden zwischengespeichert, sodass der Scan einmal pro Durchlauf und nicht für jede Datei ausgeführt wird.

**Optionen**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // Wörterbuchschlüssel melden, auf die nichts verweist. Standard: true
      reportUnusedDictionaries: true,

      // Inhaltsfelder melden, die nichts liest. Standard: true
      reportUnusedFields: true,

      // Schlüssel melden, die an mehr als einer Stelle deklariert sind. Standard: true
      reportDuplicateKeys: true,

      // Reguläre Ausdrücke für Feldpfade, die niemals gemeldet werden sollen.
      ignoreFields: ["^meta"],

      // Projekt-Root, ab dem der Scan startet. Standard: ESLint-Arbeitsverzeichnis
      baseDir: process.cwd(),

      // Wie lange ein Projektscan wiederverwendet wird, in ms. Standard: 30000
      cacheTtl: 30000,
    },
  ],
}
```

Verringern Sie `cacheTtl`, wenn Sie mit einem langlebigen Editor-Server linten und Ihre Änderungen schneller sehen möchten; setzen Sie `baseDir`, wenn ein einzelner Lint-Lauf mehrere Intlayer-Projekte in einem Monorepo umfasst.

> **Neigt zur Zurückhaltung.** Ein Fehlalarm würde eine Übersetzung löschen. Daher wird nichts gemeldet, wenn das Wörterbuch auf eine Weise verwendet wird, die die Analyse nicht nachverfolgen kann: das Inhaltsobjekt als Ganzes übergeben, eine gebundene Übersetzerfunktion (`const t = useTranslations("home")`), eine über direkten Import erreichte Deklaration (`useDictionary(myDictionary)`), ein `nest()` aus einem anderen Wörterbuch oder eine Feldliste, die durch einen Spread nicht-exhaustiv ist. Single-File-Komponenten (`.vue`, `.svelte`, `.astro`) gelten als Verwender aller Felder der genannten Wörterbücher, da ihre Script-Blöcke hier nicht analysiert werden.

`reportDuplicateKeys` liest die unzusammengeführten Wörterbücher, die der Build unter `.intlayer/` schreibt, und bleibt daher stumm, bis das Projekt mindestens einmal gebaut wurde. Zwei Deklarationen mit demselben Schlüssel werden zusammengeführt, was ein legitimes Muster ist — die Meldung existiert, da bei einem beidseitig definierten Feld stillschweigend nur einer der beiden Werte beibehalten wird.

Der Analysator wird aus `@intlayer/lsp` geladen, welches als ESM ausgeliefert wird. Die Regel benötigt daher eine Node-Version, die ein ES-Modul via `require()` laden kann — Node 20.19+ oder 22.12+. Bei älteren Versionen meldet sie nichts, anstatt den Lint-Lauf abbrechen zu lassen.

## Frameworks

Jede Regel funktioniert über alle Intlayer-Integrationen hinweg, einschließlich innerhalb von Vue-, Svelte- und Angular-Templates. Sie müssen ESLint lediglich mitteilen, welcher Parser jeden Dateityp liest.

| Framework                 | Dateien           | Parser                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Angular-Templates         | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import svelteParser from "svelte-eslint-parser";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
  ...intlayer.configs.recommended,

  {
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: { parser: tseslint.parser },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.component.html"],
    languageOptions: { parser: angularTemplateParser },
  },
];
```

Installieren Sie nur die Parser, die Ihr Projekt benötigt.

> **Bekannte Einschränkung.** In Vue- und Angular-Templates wird ein Ausdruck wie `{{ content[key] }}` nicht von `no-dynamic-field-access` geprüft. Dynamische Zugriffe im Script-Block werden normal erkannt.
