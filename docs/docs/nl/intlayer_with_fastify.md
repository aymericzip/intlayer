---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Fastify i18n - Hoe een Fastify-app te vertalen in 2026
description: Ontdek hoe u uw Fastify-backend meertalig kunt maken. Volg de documentatie voor internationalisering (i18n) en vertaling.
keywords:
  - Internationalisering
  - Documentatie
  - Intlayer
  - Fastify
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: "init-commando toegevoegd"
  - version: 7.6.0
    date: 2025-12-31
    changes: "Geschiedenis geïnitialiseerd"
---

# Vertaal uw Fastify backend-website met Intlayer | Internationalisering (i18n)

`fastify-intlayer` is een krachtige internationaliseringsplug-in (i18n) voor Fastify-applicaties, ontworpen om uw backend-services wereldwijd toegankelijk te maken door gelokaliseerde antwoorden te bieden op basis van de voorkeuren van de client.

> Bekijk de pakketimplementatie op GitHub: https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer

### Praktische Use Cases

- **Backend-fouten weergeven in de taal van de gebruiker**: Wanneer er een fout optreedt, verbetert het weergeven van berichten in de moedertaal van de gebruiker het begrip en vermindert het frustratie. Dit is vooral handig voor dynamische foutmeldingen die kunnen worden weergegeven in front-end componenten zoals toasts of modals.
- **Meertalige inhoud ophalen**: Voor applicaties die inhoud uit een database ophalen, zorgt internationalisering ervoor dat u die inhoud in meerdere talen kunt aanbieden. Dit is cruciaal voor platforms zoals e-commercesites of contentmanagementsystemen die productbeschrijvingen, artikelen und andere inhoud in de voorkeurstaal van de gebruiker moeten weergeven.
- **Meertalige e-mails verzenden**: Of het nu gaat om transactionele e-mails, marketingcampagnes of meldingen, het verzenden van e-mails in de taal van de ontvanger kan de betrokkenheid en effectiviteit aanzienlijk verhogen.
- **Meertalige pushmeldingen**: Voor mobiele applicaties kan het verzenden van pushmeldingen in de voorkeurstaal van de gebruiker de interactie en retentie verbeteren. Deze persoonlijke touch kan meldingen relevanter en actiegerichter maken.
- **Andere communicatie**: Elke vorm van communicatie vanuit de backend, zoals sms-berichten, systeemwaarschuwingen of gebruikersinterface-updates, profiteert ervan in de taal van de gebruiker te zijn, wat de duidelijkheid garandeert en de algehele gebruikerservaring verbetert.

Door de backend te internationaliseren, respecteert uw applicatie niet alleen culturele verschillen, maar sluit deze ook beter aan bij de behoeften van de wereldmarkt, wat een belangrijke stap is bij het wereldwijd opschalen van uw diensten.

## Aan de slag

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-fastify-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Hoe u uw applicatie kunt internationaliseren met Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Bekijk het [Applicatiesjabloon](https://github.com/aymericzip/intlayer-fastify-template) op GitHub.

### Installatie

Om aan de slag te gaan met `fastify-intlayer`, installeert u het pakket met npm:

```bash packageManager="npm"
npm install intlayer fastify-intlayer
npx intlayer init

```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
pnpm intlayer init

```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
yarn intlayer init

```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
bunx intlayer init

```

### Configuratie

Configureer de internationaliseringsinstellingen door een `intlayer.config.ts`-bestand aan te maken in de root van uw project:

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

### Uw inhoud declareren

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
      "es-MX": "Ejemplo de inhoud devuelto en español (México)",
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
      "es-MX": "Ejemplo de inhoud devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de inhoud devuelto en español (España)",
      "es-MX": "Ejemplo de inhoud devuelto en español (México)",
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
        "es-MX": "Ejemplo de inhoud devuelto en español (México)"
      }
    }
  }
}
```

> Uw inhoudsdeclaraties kunnen overal in uw applicatie worden gedefinieerd, zolang ze zijn opgenomen in de `contentDir`-map (standaard `./src`). En ze moeten overeenkomen met de bestandsextensie van de inhoudsdeclaratie (standaard `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Voor meer details, zie de [documentatie over inhoudsdeclaratie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/content_file.md).

### Fastify-applicatie instellen

Stel uw Fastify-applicatie in om `fastify-intlayer` te gebruiken:

```typescript fileName="src/index.ts" codeFormat="typescript"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Internationaliseringsplug-in laden
await fastify.register(intlayer);

// Routes
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de inhoud renvoyé en français",
    "es-ES": "Ejemplo de inhoud devuelto en español (España)",
    "es-MX": "Ejemplo de inhoud devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Server starten
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Internationaliseringsplug-in laden
await fastify.register(intlayer);

// Routes
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de inhoud renvoyé en français",
    "es-ES": "Ejemplo de inhoud devuelto en español (España)",
    "es-MX": "Ejemplo de inhoud devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Server starten
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const Fastify = require("fastify");
const { intlayer, t, getDictionary, getIntlayer } = require("fastify-intlayer");
const dictionaryExample = require("./index.content");

const fastify = Fastify({ logger: true });

// Serverstart-wrapper voor async/await
const start = async () => {
  try {
    // Internationaliseringsplug-in laden
    await fastify.register(intlayer);

    // Routes
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        en: "Example of returned content in English",
        fr: "Exemple de inhoud renvoyé en français",
        "es-ES": "Ejemplo de inhoud devuelto en español (España)",
        "es-MX": "Ejemplo de inhoud devuelto en español (México)",
      });
    });

    fastify.get("/getIntlayer_example", async (_req, reply) => {
      return getIntlayer("index").exampleOfContent;
    });

    fastify.get("/getDictionary_example", async (_req, reply) => {
      return getDictionary(dictionaryExample).exampleOfContent;
    });

    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### Compatibiliteit

`fastify-intlayer` is volledig compatibel met:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/packages/react-intlayer/index.md) voor React-applicaties
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/packages/next-intlayer/index.md) voor Next.js-applicaties
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/packages/vite-intlayer/index.md) voor Vite-applicaties

Het werkt ook naadloos met elke internationaliseringsoplossing in verschillende omgevingen, inclusief browsers en API-aanvragen. U kunt de middleware aanpassen om de locale te detecteren via headers of cookies:

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

Standaard zal `fastify-intlayer` de `Accept-Language`-header interpreteren om de voorkeurstaal van de client te bepalen.

> Voor meer informatie over configuratie en geavanceerde onderwerpen, bezoek onze [documentatie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/configuration.md).

### TypeScript configureren

`fastify-intlayer` maakt gebruik van de robuuste mogelijkheden van TypeScript om het internationaliseringsproces te verbeteren. De statische typering van TypeScript zorgt ervoor dat met elke vertaalsleutel rekening wordt gehouden, waardoor het risico op ontbrekende vertalingen wordt verminderd en de onderhoudbaarheid wordt verbeterd.

Zorg ervoor dat de automatisch gegenereerde typen (standaard in ./types/intlayer.d.ts) zijn opgenomen in uw tsconfig.json-bestand.

```json5 fileName="tsconfig.json"
{
  // ... Uw bestaande TypeScript-configuraties
  "include": [
    // ... Uw bestaande TypeScript-configuraties
    ".intlayer/**/*.ts", // Automatisch gegenereerde typen opnemen
  ],
}
```

### VS Code-extensie

Om uw ontwikkelervaring met Intlayer te verbeteren, kunt u de officiële **Intlayer VS Code Extension** installeren.

[Installeren vanuit de VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Deze extensie biedt:

- **Autocomplete** voor vertaalsleutels.
- **Realtime foutdetectie** voor ontbrekende vertalingen.
- **Inline voorbeelden** van vertaalde inhoud.
- **Snelle acties** om eenvoudig vertalingen aan te maken en bij te werken.

Voor meer details over het gebruik van de extensie, zie de [Intlayer VS Code Extension-documentatie](https://intlayer.org/doc/vs-code-extension).

### Git-configuratie

Het wordt aanbevolen om de door Intlayer gegenereerde bestanden te negeren. Hiermee voorkomt u dat u ze naar uw Git-repository commit.

Hiervoor kunt u de volgende instructies toevoegen aan uw `.gitignore`-bestand:

```plaintext fileName=".gitignore"
# Door Intlayer gegenereerde bestanden negeren
.intlayer

```
