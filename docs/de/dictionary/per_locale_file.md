# Intlayer unterstützt zwei Möglichkeiten, mehrsprachige Inhalte zu deklarieren:

- Einzelne Datei mit allen Übersetzungen
- Eine Datei pro Sprache (Per-Locale-Format)

Diese Flexibilität ermöglicht:

- Einfache Migration von anderen i18n-Tools
- Unterstützung für automatisierte Übersetzungs-Workflows
- Klare Organisation der Übersetzungen in separate, sprachspezifische Dateien

## Einzelne Datei mit mehreren Übersetzungen

Dieses Format ist ideal für:

- Schnelle Iterationen im Code.
- Nahtlose Integration mit dem CMS.

Dies ist der empfohlene Ansatz für die meisten Anwendungsfälle. Es zentralisiert Übersetzungen, was die Iteration und Integration mit dem CMS erleichtert.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      de: "Titel meiner Komponente",
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
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      de: "Titel meiner Komponente",
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
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      de: "Titel meiner Komponente",
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
        "de": "Titel meiner Komponente",
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> Empfohlen: Dieses Format ist am besten geeignet, wenn Sie den visuellen Editor von Intlayer verwenden oder Übersetzungen direkt im Code verwalten.

## Per-Locale-Format

Dieses Format ist nützlich, wenn:

- Sie Übersetzungen unabhängig versionieren oder überschreiben möchten.
- Sie maschinelle oder manuelle Übersetzungs-Workflows integrieren.

Sie können Übersetzungen auch in einzelne Sprachdateien aufteilen, indem Sie das Feld `locale` angeben:

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Wichtig
  content: { multilingualContent: "Title of my component" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Wichtig
  content: { multilingualContent: "Título de mi componente" },
};
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Wichtig
  content: { multilingualContent: "Title of my component" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Wichtig
  content: { multilingualContent: "Title of my component" },
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
    multilingualContent: "Title of my component",
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
    "multilingualContent": "Title of my component",
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

> Wichtig: Stellen Sie sicher, dass das Feld `locale` definiert ist. Es gibt Intlayer an, welche Sprache die Datei repräsentiert.

> Hinweis: In beiden Fällen muss die Inhaltsdeklarationsdatei dem Namensmuster `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` folgen, um von Intlayer erkannt zu werden. Das Suffix `.[locale]` ist optional und dient nur als Namenskonvention.

## Formate mischen

Sie können beide Ansätze für denselben Inhalts-Schlüssel mischen. Zum Beispiel:

Deklarieren Sie Standard- oder Basisinhalte statisch (z. B. `index.content.ts`).

Fügen Sie sprachspezifische Inhalte in `index.content.json`, `index.fr.content.ts` usw. hinzu oder überschreiben Sie diese.

Dies ist besonders nützlich, wenn:

- Sie Ihre Basisinhalte statisch in Ihrem Code deklarieren und automatisch mit Übersetzungen im CMS ausfüllen möchten.

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
    multilingualContent: "Title of my component",
    projectName: "My project",
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
        "de": "Titel meiner Komponente",
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

Intlayer kombiniert mehrsprachige und per-Locale-Dateien automatisch.

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // Standard-Sprache ist ENGLISH, daher wird der ENGLISH-Inhalt zurückgegeben

console.log(JSON.stringify(intlayer, null, 2));
// Ergebnis:
// {
//  "multilingualContent": "Title of my component",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// Ergebnis:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// Ergebnis:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "My project"
// }
```

### Automatische Übersetzungsgenerierung

Verwenden Sie die [intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md), um fehlende Übersetzungen basierend auf Ihren bevorzugten Diensten automatisch auszufüllen.
