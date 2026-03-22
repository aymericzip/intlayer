---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: Hono i18n - Hoe een Hono-app te vertalen in 2026
description: Ontdek hoe u uw Hono-backend meertalig kunt maken. Volg de documentatie voor internationalisering (i18n) en vertaling.
keywords:
  - Internationalisering
  - Documentatie
  - Intlayer
  - Hono
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - hono
applicationTemplate: https://github.com/aymericzip/intlayer-hono-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: "Init commando toegevoegd"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geschiedenis geïnitialiseerd"
---

# Vertaal uw Hono-backend website met Intlayer | Internationalisering (i18n)

`hono-intlayer` is een krachtige middleware voor internationalisering (i18n) voor Hono-applicaties, ontworpen om uw backend-services wereldwijd toegankelijk te maken door gelokaliseerde antwoorden te bieden op basis van de voorkeuryen van de klant.

### Praktische gebruikssituaties

- **Backend-fouten weergeven in de taal van de gebruiker**: Wanneer er een fout optreedt, verbetert het weergeven van berichten in de moedertaal van de gebruiker het begrip en vermindert het frustratie. Dit is vooral handig voor dynamische foutmeldingen die kunnen worden getoond in front-end componenten zoals toasts or modals.

- **Meertalige inhoud ophalen**: Voor applicaties die inhoud uit een database halen, zorgt internationalisering ervoor dat u deze inhoud in meerdere talen kunt aanbieden. Dit is cruciaal voor platforms zoals e-commerce sites of content management systemen die productbeschrijvingen, artikelen en andere inhoud moeten weergeven in de taal die de voorkeur heeft van de gebruiker.

- **Meertalige e-mails verzenden**: Of het nu gaat om transactionele e-mails, marketingcampagnes of meldingen, het verzenden van e-mails in de taal van de ontvanger kan de betrokkenheid en effectiviteit aanzienlijk verhogen.

- **Meertalige pushmeldingen**: Voor mobilene applicaties kan het verzenden van pushmeldingen in de voorkeurstaal van een gebruiker de interactie en retentie verbeteren. Dit persoonlijke tintje kan ervoor zorgen dat meldingen relevanter en bruikbaarder aanvoelen.

- **Andere communicatie**: Elke vorm van communicatie vanuit de backend, zoals sms-berichten, systeemwaarschuwingen of updates van de gebruikersinterface, heeft baat bij de taal van de gebruiker, wat zorgt voor duidelijkheid en de algehele gebruikerservaring verbetert.

Door de backend te internationaliseren, respecteert uw applicatie niet alleen culturele verschillen, ale sluit deze ook beter aan bij de behoeften van de wereldwijde markt, wat een sleutelstap is bij het wereldwijd opschalen van uw diensten.

## Aan de slag

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-hono-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Hoe u uw applicatie kunt internationaliseren met Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Zie [Applicatiesjabloon](https://github.com/aymericzip/intlayer-hono-template) op GitHub.

### Installatie

Om `hono-intlayer` te gaan gebruiken, installeert u het pakket met npm:

```bash packageManager="npm"
npm install intlayer hono-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
bunx intlayer init
```

### Configuratie

Configureer de internationaliseringsinstellingen door een `intlayer.config.ts` aan te maken in de root van uw project:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Declareer uw inhoud

Maak en beheer uw inhoudsdeclaraties om vertalingen op te slaan:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Uw inhoudsdeclaraties kunnen overal in uw applicatie worden gedefinieerd, zolang ze zijn opgenomen in de `contentDir` map (standaard `./src`). En overeenkomen met de bestandsextensie van de inhoudsdeclaratie (standaard `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Raadpleeg voor meer details de [documentatie voor inhoudsdeclaratie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/content_file.md).

### Hono-applicatie instellen

Stel uw Hono-applicatie in om `hono-intlayer` te gebruiken:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// Internationaliseringsverzoekhandler laden
app.use("*", intlayer());

// Routes
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// Internationaliseringsverzoekhandler laden
app.use("*", intlayer());

// Routes
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const { Hono } = require("hono");
const { intlayer, t, getDictionary, getIntlayer } = require("hono-intlayer");
const dictionaryExample = require("./index.content");

const app = new Hono();

// Internationaliseringsverzoekhandler laden
app.use("*", intlayer());

// Routes
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

module.exports = app;
```

### Compatibiliteit

`hono-intlayer` is volledig compatibel met:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/packages/react-intlayer/index.md) voor React-applicaties
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/packages/next-intlayer/index.md) voor Next.js-applicaties
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/packages/vite-intlayer/index.md) voor Vite-applicaties

Het werkt ook naadloos met elke internationaliseringsoplossing in verschillende omgevingen, inclusief browsers en API-verzoeken. U kunt de middleware aanpassen om de landinstelling te detecteren via headers of cookies:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Andere configuratie-opties
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Andere configuratie-opties
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Andere configuratie-opties
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

Standaard zal `hono-intlayer` de `Accept-Language` header interpreteren om de voorkeurstaal van de klant te bepalen.

> Voor meer informatie over configuratie en geavanceerde onderwerpen, bezoek onze [documentatie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/configuration.md).

### TypeScript configureren

`hono-intlayer` maakt gebruik van de robuuste mogelijkheden van TypeScript om het internationaliseringsproces te verbeteren. De statische typering van TypeScript zorgt ervoor dat met elke vertaalsleutel rekening wordt gehouden, waardoor het risico op ontbrekende vertalingen wordt verminderd en de onderhoudbaarheid wordt verbeterd.

![Automatische aanvulling](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Vertaalfout](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Zorg ervoor dat de automatisch gegenereerde types (standaard in ./types/intlayer.d.ts) zijn opgenomen in uw tsconfig.json-bestand.

```json5 fileName="tsconfig.json"
{
  // ... Uw bestaande TypeScript-configuraties
  "include": [
    // ... Uw bestaande TypeScript-configuraties
    ".intlayer/**/*.ts", // Inclusief de automatisch gegenereerde types
  ],
}
```

### VS Code-extensie

Om uw ontwikkelervaring met Intlayer te verbeteren, kunt u de officiële **Intlayer VS Code-extensie** installeren.

[Installeren vanaf de VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Deze extensie biedt:

- **Automatische aanvulling** voor vertaalsleutels.
- **Real-time foutdetectie** voor ontbrekende vertalingen.
- **Inline voortonen** van vertaalde inhoud.
- **Snelle acties** om eenvoudig vertalingen te maken en bij te werken.

Raadpleeg voor meer informatie over het gebruik van de extensie de [documentatie van de Intlayer VS Code-extensie](https://intlayer.org/nl/doc/vs-code-extension).

### Git-configuratie

Het wordt aanbevolen om de door Intlayer gegenereerde bestanden te negeren. Hiermee kunt u voorkomen dat u ze toevoegt aan uw Git-repository.

Om dit te doen, kunt u de volgende instructies toevoegen aan uw `.gitignore`-bestand:

```plaintext fileName=".gitignore"
# De door Intlayer gegenereerde bestanden negeren
.intlayer
```
