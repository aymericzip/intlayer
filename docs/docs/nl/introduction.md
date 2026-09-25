---
createdAt: 2025-08-23
updatedAt: 2026-09-06
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

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/content_file" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/translation" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/enumeration" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/condition" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/insertion" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/function_fetching" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/markdown" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/file" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/nesting" />
</TechGrid>

### Omgevingen & Integraties

We hebben Intlayer gebouwd met flexibiliteit in gedachten, en bieden een naadloze integratie met populaire frameworks en build-tools:

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_nextjs_16" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_nextjs_15" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_nextjs_14" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_nextjs_page_router" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_tanstack" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_tanstack+solid" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_vite+react" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_react_router_v7" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_remix_3" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_create_react_app" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_react_native+expo" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_lynx+react" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_astro" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_astro_react" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_astro_vue" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_astro_svelte" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_astro_solid" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_astro_preact" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_astro_lit" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_vite+vue" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_nuxt" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_vite+svelte" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_svelte_kit" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_vite+solid" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_solid_start" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_vite+preact" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_angular_21" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_angular_19" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_analog" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_vite+lit" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_vite+vanilla" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_vanilla" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_htmx" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_express" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_nestjs" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_fastify" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_hono" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_adonisjs" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_elysia" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_storybook" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_next-intl" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_with_next-i18next" />
</TechGrid>

Elke integratiegids bevat best practices voor het gebruik van de functies van Intlayer, zoals **server-side rendering (SSR)**, **dynamische routering** of **client-side rendering**, zodat u een snelle, SEO-vriendelijke en zeer schaalbare applicatie kunt behouden.

## Bijdragen & Feedback

We waarderen de kracht van open-source en community-gedreven ontwikkeling. Als u verbeteringen wilt voorstellen, een nieuwe gids wilt toevoegen of problemen in onze documenten wilt corrigeren, stuur dan gerust een Pull Request in of open een Issue op onze [GitHub repository](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Klaar om uw applicatie sneller en efficiënter te vertalen?** Duik in onze documentatie om vandaag nog met Intlayer te beginnen. Ervaar een robuuste, gestroomlijnde benadering van internationalisering die uw content georganiseerd houdt en uw team productiever maakt.
