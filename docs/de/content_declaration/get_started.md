# Getting Started die Erklärung Ihres Inhalts

## Dateien Erweiterungen

Standardmäßig überwacht Intlayer alle Dateien mit den folgenden Erweiterungen auf Inhaltsdeklarationen:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

Die Anwendung sucht standardmäßig nach Dateien, die dem Glob-Muster `./src/**/*.content.{ts,tsx,js,jsx,mjs,cjs}` entsprechen.

Diese Standarderweiterungen sind für die meisten Anwendungen geeignet. Wenn Sie jedoch spezifische Anforderungen haben, konsultieren Sie den [Inhaltserweiterungsanpassungsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md#content-configuration) für Anweisungen zur Verwaltung dieser.

Für eine vollständige Liste der Konfigurationsoptionen besuchen Sie die Konfigurationsdokumentation.

## Deklarieren Sie Ihren Inhalt

Erstellen und verwalten Sie Ihre Inhaltswörterbücher:

```typescript fileName="src/app/[locale]/page.content.ts" codeFormat="typescript"
import { t, enu, type DeclarationContent } from "intlayer";

interface Content {
  getStarted: {
    main: string;
    pageLink: string;
  };
  numberOfCar: string;
}

export default {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "Weniger als minus ein Auto",
      "-1": "Minus ein Auto",
      "0": "Keine Autos",
      "1": "Ein Auto",
      ">5": "Einige Autos",
      ">19": "Viele Autos",
    }),
  },
} satisfies Dictionary<Content>;
```

```javascript fileName="src/app/[locale]/page.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
export default {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "Weniger als minus ein Auto",
      "-1": "Minus ein Auto",
      0: "Keine Autos",
      1: "Ein Auto",
      ">5": "Einige Autos",
      ">19": "Viele Autos",
    }),
  },
};
```

```javascript fileName="src/app/[locale]/page.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
module.exports = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
    numberOfCar: enu({
      "<-1": "Weniger als minus ein Auto",
      "-1": "Minus ein Auto",
      0: "Keine Autos",
      1: "Ein Auto",
      ">5": "Einige Autos",
      ">19": "Viele Autos",
    }),
  },
};
```

```json5 fileName="src/app/[locale]/page.content.json"  codeFormat="json"
{
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "translation",
        "translation": {
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar",
        },
      },
      "pageLink": "src/app/page.tsx",
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Weniger als minus ein Auto",
        "-1": "Minus ein Auto",
        "0": "Keine Autos",
        "1": "Ein Auto",
        ">5": "Einige Autos",
        ">19": "Viele Autos",
      },
    },
  },
}
```
