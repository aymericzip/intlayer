---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Introductie
description: Ontdek hoe Intlayer werkt. Bekijk de stappen die Intlayer gebruikt in uw applicatie. Bekijk wat de verschillende pakketten doen.
keywords:
  - Introductie
  - Aan de slag
  - Intlayer
  - Applicatie
  - Pakketten
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geschiedenis geïnitialiseerd"
---

# Intlayer Documentatie

Welkom bij de officiële Intlayer-documentatie! Hier vindt u alles wat u nodig hebt om Intlayer te integreren, configureren en beheersen voor al uw internationaliseringsbehoeften (i18n), of u nu werkt met Next.js, React, Vite, Express of een andere JavaScript-omgeving.

## Introductie

### Wat is Intlayer?

**Intlayer** is een internationaliseringsbibliotheek die speciaal is ontworpen voor JavaScript-ontwikkelaars. Hiermee kunt u uw inhoud overal in uw code declareren. Het zet declaraties van meertalige inhoud om in gestructureerde woordenboeken die eenvoudig in uw code te integreren zijn. Door gebruik te maken van TypeScript maakt **Intlayer** uw ontwikkeling krachtiger en efficiënter.

Intlayer biedt ook een optionele visuele editor waarmee u uw inhoud eenvoudig kunt bewerken en beheren. Deze editor is vooral handig voor ontwikkelaars die de voorkeur geven aan een visuele interface voor inhoudsbeheer, of voor teams die inhoud genereren zonder zich zorgen te hoeven maken over code.

### Gebruiksvoorbeeld

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
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

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

## Belangrijkste kenmerken

Intlayer biedt een verscheidenheid aan functies die zijn afgestemd op de behoeften van moderne webontwikkeling. Hieronder staan de belangrijkste functies, met links naar gedetailleerde documentatie voor elk:

- **Internationaliseringsondersteuning**: Vergroot het wereldwijde bereik van uw applicatie met ingebouwde ondersteuning voor internationalisering.
- **Visuele editor**: Verbeter uw ontwikkelingsworkflow met editor-plugins die zijn ontworpen voor Intlayer. Bekijk de [Gids voor de visuele editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_visual_editor.md).
- **Flexibiliteit in configuratie**: Pas uw installatie aan met uitgebreide configuratie-opties die worden beschreven in de [Configuratiegids](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/configuration.md).
- **Geavanceerde CLI-tools**: Beheer uw projecten efficiënt met de opdrachtregelinterface van Intlayer. Verken de mogelijkheden in de [Documentatie voor CLI-tools](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/index.md).

## Kernbegrippen

### Woordenboek (Dictionary)

Organiseer uw meertalige inhoud dicht bij uw code om alles consistent en onderhoudbaar te houden.

- **[Aan de slag](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/content_file.md)**  
  Leer de basisprincipes van het declareren van uw inhoud in Intlayer.

- **[Vertaling](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/translation.md)**  
  Begrijp hoe vertalingen worden gegenereerd, opgeslagen en gebruikt in uw applicatie.

- **[Opsomming (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/enumeration.md)**  
  Beheer eenvoudig herhaalde of vaste sets gegevens in verschillende talen.

- **[Voorwaarde (Condition)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/condition.md)**  
  Leer hoe u voorwaardelijke logica in Intlayer gebruikt om dynamische inhoud te maken.

- **[Invoeging (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/insertion.md)**
  Ontdek hoe u waarden in een string kunt invoegen met behulp van plaatshouders.

- **[Functie ophalen (Function Fetching)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/function_fetching.md)**  
  Zie hoe u dynamisch inhoud kunt ophalen met aangepaste logica die past bij de workflow van uw project.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/markdown.md)**  
  Leer hoe u Markdown in Intlayer gebruikt om rijke inhoud te maken.

- **[Bestand-embeddings (File embeddings)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/file.md)**  
  Ontdek hoe u externe bestanden in Intlayer kunt insluiten voor gebruik in de inhoudseditor.

- **[Nesting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/nesting.md)**  
  Begrijp hoe u inhoud in Intlayer kunt nesten om complexe structuren te creëren.

### Omgevingen en integraties

We hebben Intlayer gebouwd met flexibiliteit in het achterhoofd, en bieden naadloze integratie met populaire frameworks en buildtools:

- **[Intlayer met Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_nextjs_16.md)**
- **[Intlayer met Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_nextjs_15.md)**
- **[Intlayer met Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_nextjs_14.md)**
- **[Intlayer met Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_nextjs_page_router.md)**
- **[Intlayer met React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_create_react_app.md)**
- **[Intlayer met Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_tanstack.md)**
- **[Intlayer met React Native en Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_react_native+expo.md)**
- **[Intlayer met Lynx en React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_lynx+react.md)**
- **[Intlayer met Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_vite+preact.md)**
- **[Intlayer met Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_vite+vue.md)**
- **[Intlayer met Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_nuxt.md)**
- **[Intlayer met Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_vite+svelte.md)**
- **[Intlayer met SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_svelte_kit.md)**
- **[Intlayer met Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_express.md)**
- **[Intlayer met NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_nestjs.md)**
- **[Intlayer met Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_hono.md)**
- **[Intlayer met Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_angular.md)**

Elke integratiegids bevat best practices voor het gebruik van de functies van Intlayer, zoals **server-side rendering**, **dynamische routering** of **client-side rendering**, zodat u een snelle, SEO-vriendelijke en zeer schaalbare applicatie kunt onderhouden.

## Bijdragen en feedback

We waarderen de kracht van open-source en community-gedreven ontwikkeling. Als u verbeteringen wilt voorstellen, een nieuwe gids wilt toevoegen of problemen in onze documentatie wilt corrigeren, stuur dan gerust een Pull Request of open een issue op onze [GitHub-repository](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Klaar om uw applicatie sneller en efficiënter te vertalen?** Duik in onze documentatie om Intlayer vandaag nog te gaan gebruiken. Ervaar een robuuste, gestroomlijnde aanpak van internationalisering die uw inhoud georganiseerd houdt en uw team productiever maakt.
