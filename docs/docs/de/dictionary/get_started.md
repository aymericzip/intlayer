---
docName: dictionary__get_started
url: https://intlayer.org/doc/concept/content
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Wörterbuch | Erste Schritte
description: Entdecken Sie, wie Sie Wörterbücher in Ihrer mehrsprachigen Website deklarieren und verwenden. Folgen Sie den Schritten in dieser Online-Dokumentation, um Ihr Projekt in wenigen Minuten einzurichten.
keywords:
  - Erste Schritte
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Erste Schritte bei der Deklaration Ihres Inhalts

<iframe title="i18n, Markdown, JSON… eine einzige Lösung, um alles zu verwalten | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Dateierweiterungen

Standardmäßig überwacht Intlayer alle Dateien mit den folgenden Erweiterungen für Inhaltsdeklarationen:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

Die Anwendung sucht standardmäßig nach Dateien, die dem Glob-Muster `./src/**/*.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}` entsprechen.

Diese Standarderweiterungen sind für die meisten Anwendungen geeignet. Wenn Sie jedoch spezielle Anforderungen haben, lesen Sie bitte die [Anleitung zur Anpassung der Inhaltserweiterungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md#content-configuration) für Anweisungen zur Verwaltung.

Für eine vollständige Liste der Konfigurationsoptionen besuchen Sie die Konfigurationsdokumentation.

## Deklarieren Sie Ihren Inhalt

Erstellen und verwalten Sie Ihre Wörterbücher:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  conditionalContent: string;
  markdownContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hallo Welt",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Weniger als minus ein Auto",
      "-1": "Minus ein Auto",
      "0": "Keine Autos",
      "1": "Ein Auto",
      ">5": "Einige Autos",
      ">19": "Viele Autos",
    }),
    conditionalContent: cond({
      true: "Validierung ist aktiviert",
      false: "Validierung ist deaktiviert",
    }),
    insertionContent: insert("Hallo {{name}}!"),
    nestedContent: nest(
      "navbar", // Der Schlüssel des Wörterbuchs zum Verschachteln
      "login.button" // [Optional] Der Pfad zum Inhalt, der verschachtelt werden soll
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# Markdown-Beispiel"),

    /*
     * Nur verfügbar mit `react-intlayer` oder `next-intlayer`
     */
    jsxContent: <h1>Mein Titel</h1>,
  },
} entspricht Dictionary<Content>; // [optional] Dictionary ist generisch und ermöglicht es Ihnen, die Formatierung Ihres Wörterbuchs zu stärken
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hallo Welt",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Weniger als minus ein Auto",
      "-1": "Minus ein Auto",
      "0": "Keine Autos",
      "1": "Ein Auto",
      ">5": "Einige Autos",
      ">19": "Viele Autos",
    }),
    conditionalContent: cond({
      true: "Validierung ist aktiviert",
      false: "Validierung ist deaktiviert",
    }),
    insertionContent: insert("Hallo {{name}}!"),
    nestedContent: nest(
      "navbar", // Der Schlüssel des Wörterbuchs, das verschachtelt werden soll
      "login.button" // [Optional] Der Pfad zum Inhalt, der verschachtelt werden soll
    ),
    markdownContent: md("# Markdown-Beispiel"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Nur verfügbar mit `react-intlayer` oder `next-intlayer`
    jsxContent: <h1>Mein Titel</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hallo Welt",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`, // Umgebungsvariable für Node-Umgebung
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "Französischer Inhalt",
      es: "Spanischer Inhalt",
    }),
    quantityContent: enu({
      "<-1": "Weniger als minus ein Auto",
      "-1": "Minus ein Auto",
      "0": "Keine Autos",
      "1": "Ein Auto",
      ">5": "Einige Autos",
      ">19": "Viele Autos",
    }),
    conditionalContent: cond({
      true: "Validierung ist aktiviert",
      false: "Validierung ist deaktiviert",
    }),
    insertionContent: insert("Hallo {{name}}!"),
    nestedContent: nest(
      "navbar", // Der Schlüssel des Wörterbuchs zum Einbetten
      "login.button" // [Optional] Der Pfad zum einzubettenden Inhalt
    ),
    markdownContent: md("# Markdown-Beispiel"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Nur verfügbar mit `react-intlayer` oder `next-intlayer`
    jsxContent: <h1>Mein Titel</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "seite",
  "content": {
    "verschachtelterInhalt": {
      "verschachtelterInhalt2": {
        "stringInhalt": "Hallo Welt",
        "nummerInhalt": 123,
        "booleanInhalt": true,
      },
      "verschachteltesArray": [1, 2, 3],
    },
    "mehrsprachigerInhalt": {
      "nodeType": "translation",
      "translation": {
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "Französischer Inhalt",
        "es": "Spanischer Inhalt",
      },
    },
    "mengenInhalt": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "Keine Autos",
        "1": "Ein Auto",
        "<-1": "Weniger als minus ein Auto",
        "-1": "Minus ein Auto",
        ">5": "Einige Autos",
        ">19": "Viele Autos",
      },
    },
    "bedingterInhalt": {
      "nodeType": "condition",
      "condition": {
        "true": "Validierung ist aktiviert",
        "false": "Validierung ist deaktiviert",
      },
    },
    "einfügeInhalt": {
      "nodeType": "insertion",
      "insertion": "Hallo {{name}}!",
    },
    "verschachtelterInhalt": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownInhalt": {
      "nodeType": "markdown",
      "markdown": "# Markdown Beispiel",
    },
    "dateiInhalt": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
    },
    "jsxInhalt": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["Mein Titel"],
      },
    },
  },
}
```

## Funktionsverschachtelung

Sie können ohne Probleme Funktionen in andere Funktionen verschachteln.

Beispiel:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` gibt `['Hi', ' ', 'John Doe']` zurück
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Zusammengesetzter Inhalt, der Bedingung, Enumeration und mehrsprachigen Inhalt verschachtelt
    // `getIntlayer('page','en').advancedContent(true)(10)` gibt 'Multiple items found' zurück
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "Ein Artikel gefunden",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Mehrere Artikel gefunden",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "Keine gültigen Daten verfügbar",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` gibt `['Hi', ' ', 'John Doe']` zurück
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Zusammengesetzter Inhalt, der Bedingung, Enumeration und mehrsprachigen Inhalt verschachtelt
    // `getIntlayer('page','en').advancedContent(true)(10)` gibt 'Mehrere Artikel gefunden' zurück
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
/        }),
        ">1": t({
          en: "Mehrere Elemente gefunden",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "Keine gültigen Daten verfügbar",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` gibt `['Hi', ' ', 'John Doe']` zurück
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Zusammengesetzter Inhalt, der Bedingung, Aufzählung und mehrsprachigen Inhalt verschachtelt
    // `getIntlayer('page','en').advancedContent(true)(10)` gibt 'Mehrere Elemente gefunden' zurück
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "Keine Elemente gefunden",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "Ein Element gefunden",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Mehrere Elemente gefunden",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "Keine gültigen Daten verfügbar",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            "en": "Hi",
            "fr": "Salut",
            "es": "Hola",
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        "true": {
          "nodeType": "enumeration",
          "enumeration": {
            "0": {
              "nodeType": "translation",
              "translation": {
                "en": "No items found",
                "de": "Keine Elemente gefunden",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "de": "Ein Element gefunden",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "de": "Mehrere Elemente gefunden",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "No valid data available",
            "de": "Keine gültigen Daten verfügbar",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

## Zusätzliche Ressourcen

Für weitere Details zu Intlayer verweisen wir auf die folgenden Ressourcen:

- [Dokumentation zur pro-Locale Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/per_locale_file.md)
- [Dokumentation zum Übersetzungsinhalt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/translation.md)
- [Dokumentation zum Enumerationsinhalt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/enumeration.md)
- [Bedingungsinhalt Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/condition.md)
- [Einfügeinhalt Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/insertion.md)
- [Dateiinhalt Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/file.md)
- [Verschachtelungsinhalt Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/nesting.md)
- [Markdown-Inhalt Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/markdown.md)
- [Funktionsabruf Inhalt Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/function_fetching.md)

## Dokumentationshistorie

- 5.5.10 - 2025-06-29: Initiale Historie
