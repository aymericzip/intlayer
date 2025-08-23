---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Intlayer und next-i18next
description: Integrieren Sie Intlayer mit next-i18next für eine Next.js-App
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-i18next
---

# Next.js Internationalisierung (i18n) mit next-i18next und Intlayer

Sowohl next-i18next als auch Intlayer sind Open-Source-Internationalisierungs- (i18n) Frameworks, die für Next.js-Anwendungen entwickelt wurden. Sie werden häufig für die Verwaltung von Übersetzungen, Lokalisierung und Sprachwechsel in Softwareprojekten verwendet.

Beide Lösungen umfassen drei Hauptkonzepte:

1. **Inhaltsdeklaration**: Die Methode zur Definition des übersetzbaren Inhalts Ihrer Anwendung.
   - Im Falle von `i18next` als `resource` bezeichnet, ist die Inhaltsdeklaration ein strukturiertes JSON-Objekt, das Schlüssel-Wert-Paare für Übersetzungen in einer oder mehreren Sprachen enthält. Siehe [i18next-Dokumentation](https://www.i18next.com/translation-function/essentials) für weitere Informationen.
   - Im Falle von `Intlayer` als `content declaration file` bezeichnet, kann die Inhaltsdeklaration eine JSON-, JS- oder TS-Datei sein, die die strukturierten Daten exportiert. Siehe [Intlayer-Dokumentation](https://intlayer.org/fr/doc/concept/content) für weitere Informationen.

2. **Utilities**: Werkzeuge zum Erstellen und Interpretieren von Inhaltsdeklarationen in der Anwendung, wie `getI18n()`, `useCurrentLocale()` oder `useChangeLocale()` für next-i18next und `useIntlayer()` oder `useLocale()` für Intlayer.

3. **Plugins und Middlewares**: Funktionen zur Verwaltung von URL-Weiterleitungen, Bündeloptimierung und mehr, wie `next-i18next/middleware` für next-i18next oder `intlayerMiddleware` für Intlayer.

## Intlayer vs. i18next: Hauptunterschiede

Um die Unterschiede zwischen i18next und Intlayer zu erkunden, prüfen Sie unseren [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/i18next_vs_next-intl_vs_intlayer.md) Blog-Beitrag.

## So generieren Sie next-i18next-Wörterbücher mit Intlayer

### Warum Intlayer mit next-i18next verwenden?

Intlayer-Inhaltsdeklarationsdateien bieten im Allgemeinen eine bessere Entwicklererfahrung. Sie sind flexibler und wartungsfreundlicher aufgrund zweier Hauptvorteile:

1. **Flexible Platzierung**: Eine Intlayer-Inhaltsdeklarationsdatei kann überall im Dateibaum der Anwendung platziert werden, was die Verwaltung von duplizierten oder gelöschten Komponenten vereinfacht, ohne nicht verwendete Inhaltsdeklarationen zu hinterlassen.

   Beispiel-Dateistrukturen:

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # Inhaltsdeklarationsdatei
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # Inhaltsdeklarationsdatei
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # Inhaltsdeklarationsdatei
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # Inhaltsdeklarationsdatei
               └── index.jsx
   ```

2. **Zentralisierte Übersetzungen**: Intlayer speichert alle Übersetzungen in einer einzigen Datei und stellt sicher, dass keine Übersetzung fehlt. Bei der Verwendung von TypeScript werden fehlende Übersetzungen automatisch erkannt und als Fehler gemeldet.

### Installation

```bash packageManager="npm"
npm install intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add intlayer i18next next-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add intlayer i18next next-i18next i18next-resources-to-backend
```

### Konfigurieren von Intlayer, um i18next-Wörterbücher zu exportieren

> Der Export von i18next-Ressourcen garantiert keine 1:1-Kompatibilität mit anderen Frameworks. Es wird empfohlen, eine auf Intlayer basierende Konfiguration zu verwenden, um Probleme zu minimieren.

Um i18next-Ressourcen zu exportieren, konfigurieren Sie Intlayer in einer `intlayer.config.ts`-Datei. Beispielkonfigurationen:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    dictionaryOutput: ["i18next"],
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

Hier ist die Fortsetzung und Korrektur der verbleibenden Teile Ihres Dokuments:

---

### Importieren von Wörterbüchern in Ihre i18next-Konfiguration

Um die generierten Ressourcen in Ihre i18next-Konfiguration zu importieren, verwenden Sie `i18next-resources-to-backend`. Nachfolgend einige Beispiele:

```typescript fileName="i18n/client.ts" codeFormat="typescript"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language: string, namespace: string) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
const i18next = require("i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next.use(
  resourcesToBackend(
    (language, namespace) =>
      import(`../i18next/resources/${language}/${namespace}.json`)
  )
);
```

### Inhaltsdeklaration

Beispiele für Inhaltsdeklarationsdateien in verschiedenen Formaten:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default content;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const content = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "my-content",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my-content",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

### Erstellen der next-i18next Ressourcen

Um die next-i18next Ressourcen zu erstellen, führen Sie den folgenden Befehl aus:

```bash packageManager="npm"
npx run intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Dies generiert Ressourcen im Verzeichnis `./i18next/resources`. Die erwartete Ausgabe:

```bash
.
└── i18next
    └── resources
       └── en
           └── my-content.json
       └── fr
           └── my-content.json
       └── es
           └── my-content.json
```

Hinweis: Der i18next-Namespace entspricht dem Intlayer-Deklarationsschlüssel.

### Next.js-Plugin implementieren

Sobald konfiguriert, implementieren Sie das Next.js-Plugin, um Ihre i18next-Ressourcen neu zu erstellen, wann immer die Intlayer-Inhaltsdeklarationsdateien aktualisiert werden.

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Verwendung von Inhalten in Next.js-Komponenten

Nachdem Sie das Next.js-Plugin implementiert haben, können Sie den Inhalt in Ihren Komponenten verwenden:

```typescript fileName="src/components/myComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

const IndexPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};

export default IndexPage;
```

```jsx fileName="src/components/myComponent/index.mjx" codeFormat="esm"
import { useTranslation } from "react-i18next";

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```

```jsx fileName="src/components/myComponent/index.cjx" codeFormat="commonjs"
const { useTranslation } = require("react-i18next");

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("my-content.title")}</h1>
      <p>{t("my-content.description")}</p>
    </div>
  );
};
```
