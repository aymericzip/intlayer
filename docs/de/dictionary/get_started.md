# Einstieg in die Deklaration Ihrer Inhalte

## Dateierweiterungen

Standardmäßig überwacht Intlayer alle Dateien mit den folgenden Erweiterungen für Inhaltsdeklarationen:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

Die Anwendung sucht standardmäßig nach Dateien, die dem Muster `./src/**/*.content.{ts,tsx,js,jsx,mjs,cjs}` entsprechen.

Diese Standarderweiterungen sind für die meisten Anwendungen geeignet. Wenn Sie jedoch spezielle Anforderungen haben, lesen Sie die [Anleitung zur Anpassung von Inhaltserweiterungen](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md#content-configuration), um Anweisungen zur Verwaltung zu erhalten.

Für eine vollständige Liste der Konfigurationsoptionen besuchen Sie die Konfigurationsdokumentation.

## Deklarieren Sie Ihren Inhalt

Erstellen und verwalten Sie Ihre Wörterbücher:

```tsx fileName="src/example.content.ts" codeFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

// Inhalte werden deklariert
interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
    };
    multilingualContent: string;
    quantityContent: string;
    conditionalContent: string;
    nestedContent: string;
    markdownContent: string;
    externalContent: string;
  };
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
    nestedContent: nest(
      "navbar", // Der Schlüssel des zu verschachtelnden Wörterbuchs
      "login.button" // [Optional] Der Pfad zum zu verschachtelnden Inhalt
    ),
    externalContent: async () => await fetch("https://example.com"),
    markdownContent: md("# Markdown-Beispiel"),

    /*
     * Nur verfügbar bei Verwendung von `react-intlayer` oder `next-intlayer`
     */
    jsxContent: <h1>Mein Titel</h1>,
  },
} satisfies Dictionary<Content>; // [optional] Dictionary ist generisch und ermöglicht es Ihnen, das Format Ihres Wörterbuchs zu stärken
```

```javascript fileName="src/example.content.mjs" codeFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

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
    nestedContent: nest(
      "navbar", // Der Schlüssel des zu verschachtelnden Wörterbuchs
      "login.button" // [Optional] Der Pfad zum zu verschachtelnden Inhalt
    ),
    markdownContent: md("# Markdown-Beispiel"),
    externalContent: async () => await fetch("https://example.com"),

    // Nur verfügbar bei Verwendung von `react-intlayer` oder `next-intlayer`
    jsxContent: <h1>Mein Titel</h1>,
  },
};
```

```javascript fileName="src/example.content.cjs" codeFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
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
    nestedContent: nest(
      "navbar", // Der Schlüssel des zu verschachtelnden Wörterbuchs
      "login.button" // [Optional] Der Pfad zum zu verschachtelnden Inhalt
    ),
    markdownContent: md("# Markdown-Beispiel"),
    externalContent: async () => await fetch("https://example.com"),

    // Nur verfügbar bei Verwendung von `react-intlayer` oder `next-intlayer`
    jsxContent: <h1>Mein Titel</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  codeFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "Hallo Welt",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "Französischer Inhalt",
        "es": "Spanischer Inhalt",
      },
    },
    "quantityContent": {
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
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "Validierung ist aktiviert",
        "false": "Validierung ist deaktiviert",
      },
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Markdown-Beispiel",
    },
    "jsxContent": {
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
