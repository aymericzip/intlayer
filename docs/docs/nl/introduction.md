---
createdAt: 2025-08-23
updatedAt: 2026-09-05
title: Introductie
description: Ontdek hoe Intlayer werkt. Bekijk de stappen die Intlayer in uw applicatie gebruikt. Ontdek wat de verschillende pakketten doen.
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
    changes: "Init history"
author: aymericzip
---

# Intlayer Documentatie

Welkom bij de officiële Intlayer-documentatie! Hier vindt u alles wat u nodig hebt om Intlayer te integreren, configureren en te beheersen voor al uw behoeften op het gebied van internationalisering (i18n), of u nu werkt met Next.js, React, Vite, Express of een andere JavaScript-omgeving.

## Introductie

### Wat is Intlayer?

**Intlayer** is een bibliotheek voor internationalisering die speciaal is ontworpen voor JavaScript-ontwikkelaars. Het maakt de declaratie van uw content overal in uw code mogelijk. Het zet de declaratie van meertalige content om in gestructureerde woordenboeken om deze eenvoudig in uw code te integreren. Door TypeScript te gebruiken, maakt **Intlayer** uw ontwikkeling robuuster en efficiënter.

Intlayer biedt ook een optionele visuele editor waarmee u uw content eenvoudig kunt bewerken en beheren. Deze editor is met name handig voor ontwikkelaars die de voorkeur geven aan een visuele interface voor contentbeheer, of voor teams die content genereren zonder zich zorgen te hoeven maken over code.

### Gebruiksvoorbeeld

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
      nl: "Hallo Wereld",
    }),
  },
} satisfies Dictionary;

export default componentContent;
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
        "es": "Hola Mundo",
        "nl": "Hallo Wereld"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### Waarom Intlayer boven alternatieven?

Vergeleken met grote oplossingen zoals `next-intl` of `i18next`, is Intlayer een oplossing met geïntegreerde optimalisaties zoals:

<AccordionGroup>
<Accordion header="Bundelgrootte (Bundle size)">

Laad in plaats van enorme JSON-bestanden naar uw pagina's alleen de benodigde content. Intlayer helpt **uw bundel- en paginagroottes met wel 50% te verkleinen**.

</Accordion>

<Accordion header="Onderhoudbaarheid (Maintainability)">

Het afbakenen (scoping) van de content van uw applicatie **vergemakkelijkt het onderhoud** voor grootschalige applicaties. U kunt een enkele feature-map dupliceren of verwijderen zonder de mentale last om uw hele content-codebase te moeten doorzoeken. Bovendien is Intlayer **volledig getypeerd (fully typed)** om de nauwkeurigheid van uw content te garanderen.

</Accordion>

<Accordion header="AI Agent">

Co-locatie van content **vermindert de benodigde context** door grote taalmodellen (LLM's). Intlayer wordt ook geleverd met een reeks tools, zoals een **CLI** om te testen op ontbrekende vertalingen, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/mcp_server.md)** en **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/agent_skills.md)**, om de ontwikkelaarservaring (DX) voor AI-agenten nog soepeler te maken.

</Accordion>

<Accordion header="Automatisering">

Gebruik automatisering om te vertalen in uw CI/CD-pijplijn met behulp van de LLM van uw keuze, ten koste van uw AI-provider. Intlayer biedt ook een **compiler** om contentextractie te automatiseren, evenals een [webplatform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_CMS.md) om u te helpen **op de achtergrond te vertalen**.

</Accordion>

<Accordion header="Prestaties (Performance)">

Het verbinden van enorme JSON-bestanden aan componenten kan leiden tot prestatie- en reactiviteitsproblemen. Intlayer optimaliseert het laden van uw content op bouwtijd (build time).

</Accordion>

<Accordion header="Schalen zonder ontwikkelaars (Scaling with non-dev)">

Intlayer is veel meer dan alleen een i18n-oplossing en biedt een **[zelf-gehoste visuele editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_visual_editor.md)** en een **[volledig CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_CMS.md)** om u te helpen uw meertalige content in **real-time** te beheren. Dit maakt de samenwerking met vertalers, tekstschrijvers en andere teamleden naadloos. Content kan lokaal en/of op afstand worden opgeslagen.

</Accordion>
</AccordionGroup>

## Belangrijkste Kenmerken

Intlayer biedt een verscheidenheid aan functies die zijn afgestemd op de behoeften van moderne webontwikkeling. Hieronder staan de belangrijkste functies, met links naar gedetailleerde documentatie voor elk:

- **Internationaliseringsondersteuning**: Vergroot het wereldwijde bereik van uw applicatie met ingebouwde ondersteuning voor internationalisering.
- **Visuele Editor**: Verbeter uw ontwikkelingsworkflow met editor-plugins die zijn ontworpen voor Intlayer. Bekijk de [Visuele Editor Gids](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_visual_editor.md).
- **Configuratieflexibiliteit**: Pas uw setup aan met uitgebreide configuratieopties, beschreven in de [Configuratiegids](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/configuration.md).
- **Geavanceerde CLI Tools**: Beheer uw projecten efficiënt met de command-line interface van Intlayer. Ontdek de mogelijkheden in de [CLI Tools Documentatie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/index.md).

## Kernconcepten

### Woordenboek (Dictionary)

Organiseer uw meertalige content dicht bij uw code om alles consistent en onderhoudbaar te houden.

- **[Aan de slag](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/content_file.md)**  
  Leer de basisprincipes van het declareren van uw content in Intlayer.

- **[Vertaling (Translation)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/translation.md)**  
  Begrijp hoe vertalingen worden gegenereerd, opgeslagen en gebruikt in uw applicatie.

- **[Opsomming (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/enumeration.md)**  
  Beheer eenvoudig herhalende of vaste datasets in verschillende talen.

- **[Conditie (Condition)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/condition.md)**  
  Leer hoe u voorwaardelijke logica in Intlayer kunt gebruiken om dynamische content te creëren.

- **[Invoegen (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/insertion.md)**  
  Ontdek hoe u waarden in een string kunt invoegen met behulp van invoeg-placeholders.

- **[Functies Ophalen (Function Fetching)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/function_fetching.md)**  
  Bekijk hoe u dynamisch content kunt ophalen met aangepaste logica die past bij de workflow van uw project.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/markdown.md)**  
  Leer hoe u Markdown in Intlayer kunt gebruiken om rijke content te creëren.

- **[Bestandsinsluitingen (File Embeddings)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/file.md)**  
  Ontdek hoe u externe bestanden in Intlayer kunt insluiten voor gebruik in de content-editor.

- **[Nesten (Nesting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/nesting.md)**  
  Begrijp hoe u content in Intlayer kunt nesten om complexe structuren te creëren.

### Omgevingen & Integraties

We hebben Intlayer gebouwd met flexibiliteit in gedachten, en bieden een naadloze integratie met populaire frameworks en build-tools:

- **[Intlayer met Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_nextjs_16.md)**
- **[Intlayer met Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_nextjs_15.md)**
- **[Intlayer met Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_nextjs_14.md)**
- **[Intlayer met Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_nextjs_page_router.md)**
- **[Intlayer met Next.js zonder locale in de URL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_nextjs_no_locale_path.md)**
- **[Intlayer met Next.js (Intlayer Compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_nextjs_compiler.md)**
- **[Intlayer met Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_tanstack.md)**
- **[Intlayer met Tanstack Start + Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_tanstack+solid.md)**
- **[Intlayer met Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_vite+react.md)**
- **[Intlayer met Vite + React (Intlayer Compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_vite+react_compiler.md)**
- **[Intlayer met React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_react_router_v7.md)**
- **[Intlayer met React Router v7 (fs-routes)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_react_router_v7_fs_routes.md)**
- **[Intlayer met React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_create_react_app.md)**
- **[Intlayer met React Native en Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_react_native+expo.md)**
- **[Intlayer met Lynx en React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_lynx+react.md)**
- **[Intlayer met Astro](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_astro.md)**
- **[Intlayer met Astro + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_astro_react.md)**
- **[Intlayer met Astro + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_astro_vue.md)**
- **[Intlayer met Astro + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_astro_svelte.md)**
- **[Intlayer met Astro + Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_astro_solid.md)**
- **[Intlayer met Astro + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_astro_preact.md)**
- **[Intlayer met Astro + Lit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_astro_lit.md)**
- **[Intlayer met Astro + Vanilla JS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_astro_vanilla.md)**
- **[Intlayer met Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_vite+vue.md)**
- **[Intlayer met Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_nuxt.md)**
- **[Intlayer met Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_vite+svelte.md)**
- **[Intlayer met SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_svelte_kit.md)**
- **[Intlayer met Vite + Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_vite+solid.md)**
- **[Intlayer met SolidStart](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_solid_start.md)**
- **[Intlayer met Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_vite+preact.md)**
- **[Intlayer met Angular 22](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_angular_21.md)**
- **[Intlayer met Angular 19](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_angular_19.md)**
- **[Intlayer met Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_analog.md)**
- **[Intlayer met Vite + Lit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_vite+lit.md)**
- **[Intlayer met Vite + Vanilla JS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_vite+vanilla.md)**
- **[Intlayer met Vanilla JS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_vanilla.md)**
- **[Intlayer met htmx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_htmx.md)**
- **[Intlayer met Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_express.md)**
- **[Intlayer met NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_nestjs.md)**
- **[Intlayer met Fastify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_fastify.md)**
- **[Intlayer met Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_hono.md)**
- **[Intlayer met AdonisJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_adonisjs.md)**
- **[Intlayer met Elysia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_elysia.md)**
- **[Intlayer met Storybook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_storybook.md)**
- **[Intlayer met next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_next-intl.md)**
- **[Intlayer met next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_next-i18next.md)**

Elke integratiegids bevat best practices voor het gebruik van de functies van Intlayer, zoals **server-side rendering (SSR)**, **dynamische routering** of **client-side rendering**, zodat u een snelle, SEO-vriendelijke en zeer schaalbare applicatie kunt behouden.

## Bijdragen & Feedback

We waarderen de kracht van open-source en community-gedreven ontwikkeling. Als u verbeteringen wilt voorstellen, een nieuwe gids wilt toevoegen of problemen in onze documenten wilt corrigeren, stuur dan gerust een Pull Request in of open een Issue op onze [GitHub repository](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Klaar om uw applicatie sneller en efficiënter te vertalen?** Duik in onze documentatie om vandaag nog met Intlayer te beginnen. Ervaar een robuuste, gestroomlijnde benadering van internationalisering die uw content georganiseerd houdt en uw team productiever maakt.
