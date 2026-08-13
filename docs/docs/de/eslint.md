---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: ESLint-Plugin | Lint-Regeln für Intlayer
description: Erkennen Sie hartkodierte Strings und dynamische Aufrufe, die der Intlayer-Compiler nicht optimieren kann, mit eslint-plugin-intlayer. Funktioniert mit ESLint und oxlint, über React, Vue, Svelte, Angular und Astro hinweg.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Linting
  - i18n
  - Internationalisierung
  - no-raw-text
  - Hartkodierte Strings
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
    changes: "Historie initialisiert"
author: aymericzip
---

# ESLint-x-OXLint-Plugin

`eslint-plugin-intlayer` erkennt die beiden Arten von i18n-Fehlern, die TypeScript nicht sehen kann:

1. **Hartkodierter Text**, der nie in ein Dictionary gelangt ist.
2. **Dynamische Aufrufe**, die die Typprüfung bestehen und laufen, die der Intlayer-Compiler aber nicht optimieren kann.

Unbekannte Dictionary-Keys, unbekannte Feldpfade und fehlende Locales sind bereits Compile-Fehler, deshalb wiederholt das Plugin sie nicht.

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

Erfordert ESLint 9 oder neuer (Flat Config).

## Verwendung

Das Plugin läuft sowohl in ESLint als auch in [oxlint](https://oxc.rs) — dieselben Regeln, dieselben Optionen.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Oder aktivieren Sie die Regeln einzeln:

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  {
    plugins: { intlayer },
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
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

Zwei Einschränkungen: Die JS-Plugin-Unterstützung von oxlint befindet sich noch im Alpha-Stadium, und oxlint unterstützt keine benutzerdefinierten Parser — `.vue`-, `.svelte`-, `.astro`-Dateien und Angular-Templates werden dort also nicht gelintet. Führen Sie oxlint über Ihre JS/TS/JSX-Dateien aus und behalten Sie ESLint für den Rest.

  </Tab>
</Tabs>

### Konfigurationen

| Konfiguration   | `no-raw-text`                    | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` |
| --------------- | -------------------------------- | ----------------------- | ------------------------- | ------------------------ |
| `recommended`   | warn                             | error                   | error                     | off                      |
| `strict`        | error (+ Literale außerhalb JSX) | error                   | error                     | error                    |
| `contract-only` | off                              | error                   | error                     | off                      |

`recommended` belässt `no-raw-text` bewusst auf `warn`: Richtet man die Regel auf eine bestehende Codebase, tauchen alle nicht übersetzten Strings auf einmal auf, was Ihren Build nicht schon am ersten Tag brechen sollte.

`enforce-adapter-import` ist standardmäßig deaktiviert — aktivieren Sie sie explizit, wenn Sie sie möchten.

## Regeln

### `no-raw-text`

Meldet nutzerseitigen Text, der nicht in einem Dictionary deklariert ist. Die Regel verwendet dieselbe Erkennung wie `intlayer extract`, sodass Markennamen, CSS-Klassen und technische Bezeichner ignoriert werden.

```jsx
// ✗ Gemeldet
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ In Ordnung
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

Content-Deklarationsdateien (`*.content.ts`, …) werden übersprungen.

Um eine ganze Datei auf einmal zu korrigieren, führen Sie `npx intlayer extract` aus und lassen Sie den Compiler die Strings für Sie in ein Dictionary verschieben.

**Optionen**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Attribute, deren Wert nutzerseitiger Text ist.
      // Standard: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Elemente, deren Inhalt nie nutzerseitiger Text ist.
      // Standard: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Reguläre Ausdrücke für Text, der nie gemeldet werden soll.
      ignorePatterns: ["^Powered by"],

      // Auch String-Literale außerhalb von Markup melden. Standard: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Verlangt, dass der Dictionary-Key ein String-Literal ist.

Der Compiler kann ein Dictionary nur dann vorab laden, wenn er den Key direkt an der Aufrufstelle lesen kann. Bei einem berechneten Key überspringt er die Optimierung stillschweigend und bündelt stattdessen jedes Dictionary.

```typescript
// ✗ Gemeldet
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Eine Variable ist trotzdem kein Literal
const key = "home";
useIntlayer(key);

// ✓ In Ordnung
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Das gilt für `useIntlayer`, `getIntlayer` und jeden Compat-Adapter (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Verlangt, dass das Feld, das Sie aus einem Dictionary lesen, statisch bekannt ist.

Der Compiler entfernt Felder, deren Verwendung er nicht sieht. Ein berechneter Zugriff ist für ihn unsichtbar, sodass der Lesevorgang zur Laufzeit `undefined` zurückgeben kann.

```typescript
// ✗ Gemeldet
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ In Ordnung
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Bevorzugt den `@intlayer/*`-Compat-Adapter gegenüber dem ursprünglichen Package. Das Original löst nur dann auf Intlayer auf, wenn der Bundler-Alias konfiguriert ist; der Adapter tut es immer. Mit `--fix` automatisch korrigierbar.

```typescript
// ✗ Gemeldet
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ In Ordnung
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

## Frameworks

Alle Regeln funktionieren über sämtliche Intlayer-Integrationen hinweg, auch innerhalb von Vue-, Svelte- und Angular-Templates. Sie müssen ESLint nur mitteilen, welcher Parser welchen Dateityp liest.

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

> **Bekannte Einschränkung.** In Vue- und Angular-Templates wird ein Ausdruck wie `{{ content[key] }}` von `no-dynamic-field-access` nicht geprüft. Dynamische Zugriffe, die im Script-Block geschrieben sind, werden normal erkannt.
