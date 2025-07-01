---
docName: dictionary__per_locale_file
url: https://intlayer.org/doc/concept/per-locale-file
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/per_locale_file.md
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Deklaration von `Per-Locale` Inhaltsdeklaration in Intlayer
description: Entdecken Sie, wie Inhalte pro Gebietsschema in Intlayer deklariert werden. Folgen Sie der Dokumentation, um die verschiedenen Formate und Anwendungsfälle zu verstehen.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Per-Locale
  - TypeScript
  - JavaScript
---

# Deklaration von `Per-Locale` Inhaltsdeklaration in Intlayer

Intlayer unterstützt zwei Möglichkeiten, mehrsprachige Inhalte zu deklarieren:

- Eine einzelne Datei mit allen Übersetzungen
- Eine Datei pro Gebietsschema (Per-Locale-Format)

Diese Flexibilität ermöglicht:

- Einfache Migration von anderen i18n-Tools
- Unterstützung für automatisierte Übersetzungs-Workflows
- Klare Organisation der Übersetzungen in separate, gebietsschema-spezifische Dateien

## Einzelne Datei mit mehreren Übersetzungen

Dieses Format ist ideal für:

- Schnelle Iteration im Code.
- Nahtlose Integration mit dem CMS.

Dies ist der empfohlene Ansatz für die meisten Anwendungsfälle. Es zentralisiert die Übersetzungen, was die Iteration und Integration mit dem CMS erleichtert.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Übersetzungsobjekt für "hello-world"
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

export default helloWorldContent;
```

```js fileName="hello-world.content.cjs" contentDeclarationFormat="json"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Übersetzungsobjekt für "hello-world"
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="hello-world.content.ts" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> Empfohlen: Dieses Format ist am besten geeignet, wenn Sie den visuellen Editor von Intlayer verwenden oder Übersetzungen direkt im Code verwalten.

## Pro-Locale-Format

Dieses Format ist nützlich, wenn:

- Sie Übersetzungen unabhängig versionieren oder überschreiben möchten.
- Sie maschinelle oder menschliche Übersetzungs-Workflows integrieren.

Sie können Übersetzungen auch in einzelne Lokalisierungsdateien aufteilen, indem Sie das Feld locale angeben:

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Wichtig
  content: { multilingualContent: "Titel meiner Komponente" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Wichtig
  content: { multilingualContent: "Título de mi componente" },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Wörterbuch für englische Lokalisierung
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Wichtig
  content: { multilingualContent: "Titel meiner Komponente" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Wörterbuch für spanische Lokalisierung
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Wichtig
  content: { multilingualContent: "Título de mi componente" },
};

export default helloWorldContent;
```

```js fileName="hello-world.en.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Wichtig
  content: {
    multilingualContent: "Titel meiner Komponente",
  },
};

module.exports = helloWorldContent;
```

```tsx fileName="hello-world.es.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Wichtig
  content: {
    multilingualContent: "Título de mi componente",
  },
};

module.exports = helloWorldContent;
```

```json5 fileName="hello-world.en.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "en", // Wichtig
  "content": {
    "multilingualContent": "Titel meiner Komponente",
  },
}
```

```json5 fileName="hello-world.es.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "es", // Wichtig
  "content": {
    "multilingualContent": "Título de mi componente",
  },
}
```

> Wichtig: Stellen Sie sicher, dass das Feld locale definiert ist. Es teilt Intlayer mit, welche Sprache die Datei repräsentiert.

> Hinweis: In beiden Fällen muss die Inhaltsdeklarationsdatei dem Namensmuster `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` folgen, damit sie von Intlayer erkannt wird. Der Suffix `.[locale]` ist optional und wird nur als Namenskonvention verwendet.

## Formate mischen

Sie können beide Deklarationsansätze für denselben Content-Schlüssel kombinieren. Zum Beispiel:

- Deklarieren Sie Ihren Basisinhalt statisch in einer Datei wie index.content.ts.
- Fügen Sie spezifische Übersetzungen in separaten Dateien hinzu oder überschreiben Sie sie, z. B. index.fr.content.ts oder index.content.json.

Diese Konfiguration ist besonders nützlich, wenn:

- Sie die anfängliche Inhaltsstruktur im Code definieren möchten.
- Sie planen, Übersetzungen später mithilfe eines CMS oder automatisierter Tools zu erweitern oder zu vervollständigen.

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### Beispiel

Hier eine mehrsprachige Inhaltsdeklarationsdatei:

```tsx fileName="Components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH,
  content: {
    multilingualContent: "Titel meiner Komponente",
    projectName: "Mein Projekt",
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```json fileName="Components/MyComponent/index.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

Intlayer führt automatisch eine Zusammenführung von mehrsprachigen und sprachspezifischen Dateien durch.

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // Standard-Sprache ist ENGLISCH, daher wird der ENGLISCHE Inhalt zurückgegeben

console.log(JSON.stringify(intlayer, null, 2));
// Ergebnis:
// {
//  "multilingualContent": "Titel meiner Komponente",
//  "projectName": "Mein Projekt"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// Ergebnis:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "Mein Projekt"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// Ergebnis:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "Mein Projekt"
// }
```

### Automatische Übersetzungserstellung

Verwenden Sie die [intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md), um fehlende Übersetzungen basierend auf Ihren bevorzugten Diensten automatisch zu ergänzen.

## Dokumentationsverlauf

- 5.5.10 - 29.06.2025: Historie initialisiert
