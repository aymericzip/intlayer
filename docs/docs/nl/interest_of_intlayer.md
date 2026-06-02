---
createdAt: 2024-08-14
updatedAt: 2026-05-31
title: Voordelen van Intlayer
description: Ontdek de voordelen en troeven van het gebruik van Intlayer in uw projecten. Begrijp waarom Intlayer zich onderscheidt van andere frameworks.
keywords:
  - Voordelen
  - Troeven
  - Intlayer
  - Framework
  - Vergelijking
slugs:
  - doc
  - why
history:
  - version: 8.11.2
    date: 2026-05-31
    changes: "Sectie Waarom Intlayer boven alternatieven toegevoegd"
  - version: 7.3.1
    date: 2025-11-27
    changes: "Vrijgave van de Compiler"
  - version: 5.8.0
    date: 2025-08-19
    changes: "Vergelijkingstabel bijgewerkt"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Geschiedenis geïnitialiseerd"
---

# Waarom zou u Intlayer overwegen?

## Wat is Intlayer?

**Intlayer** is een internationaliseringsbibliotheek (i18n) die speciaal is ontworpen voor JavaScript-ontwikkelaars. Hiermee kunt u uw inhoud overal in uw code declareren. Het zet declaraties van meertalige inhoud om in gestructureerde woordenboeken die eenvoudig in uw code kunnen worden geïntegreerd. Door TypeScript te gebruiken, maakt **Intlayer** uw ontwikkeling robuuster en efficiënter.

## Waarom Intlayer boven alternatieven?

Vergeleken met belangrijke oplossingen zoals `next-intl` of `i18next`, is Intlayer een oplossing die wordt geleverd met geïntegreerde optimalisaties zoals:

<AccordionGroup>

<Accordion header="Pakketgrootte (Bundle size)">

In plaats van enorme JSON-bestanden in uw pagina's te laden, laadt u alleen de strikt noodzakelijke inhoud. Intlayer helpt **uw pakket- en paginagrootte tot wel 50% te verminderen**.

</Accordion>

<Accordion header="Onderhoudbaarheid">

Het afbakenen van de inhoud van uw applicatie op componentniveau **vergemakkelijkt het onderhoud** voor grootschalige applicaties. U kunt een enkele functionaliteitsmap kopiëren of verwijderen zonder de mentale belasting van het controleren van uw gehele inhoud-codebase. Bovendien is Intlayer **volledig getypeerd** om de nauwkeurigheid van uw inhoud te garanderen.

</Accordion>

<Accordion header="AI-agenten">

Het samen plaatsen van code en inhoud (Co-location) **vermindert de benodigde context** voor Large Language Models (LLM's). Intlayer wordt ook geleverd met een reeks tools, zoals een **CLI** om te testen op ontbrekende vertalingen, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/mcp_server.md)** en **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/agent_skills.md)**, om de ontwikkelaarservaring (DX) voor AI-agenten nog soepeler te maken.

</Accordion>

<Accordion header="Functies">

Intlayer biedt een reeks extra functies die andere i18n-oplossingen niet hebben, zoals [Markdown-ondersteuning](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/markdown.md), [externe inhoud ophalen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/function_fetching.md), [bestandsinhoud laden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/dictionary/file.md), [live-inhoudsupdate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/cli/live.md), [visuele editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_visual_editor.md) en meer.

</Accordion>

<Accordion header="Automatisering">

Gebruik automatisering om te vertalen in uw CI/CD-pipeline met behulp van de LLM van uw keuze tegen de directe kosten van uw AI-provider. Intlayer biedt ook een **compiler** om inhoudsextractie te automatiseren, evenals een [webplatform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_CMS.md) om te helpen **vertalen op de achtergrond**.

</Accordion>

<Accordion header="Prestaties">

Het verbinden van enorme JSON-bestanden met componenten kan leiden tot prestatie- en reactiviteitsproblemen. Intlayer optimaliseert het laden van uw inhoud al tijdens de build-tijd.

</Accordion>

<Accordion header="Schalen met niet-ontwikkelaars">

Meer dan alleen een i18n-oplossing biedt Intlayer een **zelfgehoste [visuele editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_visual_editor.md)** en een **[volledig CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/nl/intlayer_CMS.md)** om u te helpen uw meertalige inhoud in **realtime** te beheren. Dit maakt de samenwerking met vertalers, copywriters en andere teamleden naadloos. Inhoud kan lokaal en/of extern worden opgeslagen.

</Accordion>

<Accordion header="Cross-framework ontwerp">

Als u verschillende frameworks gebruikt voor verschillende delen van uw applicatie (bijv. React, React-native, Vue, Angular, Svelte, enz.), biedt Intlayer een manier om **een gemeenschappelijke syntaxis en implementatie te gebruiken over alle belangrijke frontend-frameworks**. U kunt uw inhoudsdeclaratie ook delen in uw design-system, apps, backend, enz.

</Accordion>
</AccordionGroup>

## Waarom is Intlayer gemaakt?

Intlayer is gemaakt om een veelvoorkomend probleem op te lossen dat alle populaire i18n-bibliotheken treft, zoals `next-intl`, `react-i18next`, `react-intl`, `next-i18next`, `react-intl` en `vue-i18n`.

Al deze oplossingen kiezen voor een gecentraliseerde aanpak om uw inhoud op te lijsten en te beheren. Bijvoorbeeld:

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

Of hier met behulp van namespaces:

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

Dit type architectuur vertraagt het ontwikkelingsproces en maakt de codebase om verschillende redenen complexer in onderhoud:

1. **Voor elke nieuwe component die wordt gemaakt, moet u:**
   - De nieuwe bron/namespace in de map `locales` aanmaken
   - Erom denken om de nieuwe namespace op uw pagina te importeren
   - Uw inhoud vertalen (vaak handmatig gedaan door kopiëren/plakken van AI-providers)

2. **Voor elke wijziging die aan uw componenten wordt aangebracht, moet u:**
   - Zoeken naar de gerelateerde bron/namespace (ver weg van de component)
   - Uw inhoud vertalen
   - Ervoor zorgen dat uw inhoud up-to-date is voor elke taal (locale)
   - Controleren of uw namespace geen ongebruikte sleutels/waarden bevat
   - Ervoor zorgen dat de structuur van uw JSON-bestanden voor alle talen hetzelfde is

Bij professionele projecten die deze oplossingen gebruiken, worden vaak lokalisatieplatformen ingezet om de vertaling van uw inhoud te beheren. Dit kan echter snel kostbaar worden voor grote projecten.

Om dit probleem op te lossen, kiest Intlayer voor een benadering die uw inhoud per component afbakent en uw inhoud dicht bij uw component houdt, zoals we vaak doen met CSS (`styled-components`), types, documentatie (`storybook`) of unit-tests (`jest`).

```bash codeFormat="typescript"
.
└── components
    └── MyComponent
        ├── index.content.ts
        ├── index.test.tsx
        ├── index.stories.tsx
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── components
    └── MyComponent
        ├── index.content.cjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```bash codeFormat="esm"
.
└── components
    └── MyComponent
        ├── index.content.mjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```tsx fileName="./components/MyComponent/index.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```tsx fileName="./components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

Deze benadering stelt u in staat om:

1. **De ontwikkelingssnelheid te verhogen**
   - `.content.{{ts|mjs|cjs|json}}`-bestanden kunnen worden gemaakt met behulp van een VSCode-extensie
   - AI-autovervolledigingstools in uw IDE (zoals GitHub Copilot) kunnen u helpen uw inhoud te declareren, waardoor kopiëren/plakken wordt verminderd

2. **Uw codebase schoon te houden**
   - Complexiteit verminderen
   - Onderhoudbaarheid verhogen

3. **Uw componenten en hun gerelateerde inhoud eenvoudiger te dupliceren (bijvoorbeeld: login-/registratiecomponenten, enz.)**
   - Door het risico te beperken dat de inhoud van andere componenten wordt beïnvloed
   - Door uw inhoud van de ene applicatie naar de andere te kopiëren/plakken zonder externe afhankelijkheden

4. **Te voorkomen dat uw codebase wordt vervuild met ongebruikte sleutels/waarden voor ongebruikte componenten**
   - Als u een component niet gebruikt, importeert Intlayer de gerelateerde inhoud niet
   - Als u een component verwijdert, zult u er gemakkelijker aan denken om de gerelateerde inhoud te verwijderen, aangezien deze in dezelfde map aanwezig is

5. **De redeneerkosten voor AI-agenten te verlagen om uw meertalige inhoud te declareren**
   - De AI-agent hoeft niet uw hele codebase te scannen om te weten waar hij uw inhoud moet implementeren
   - Vertalingen kunnen eenvoudig worden gedaan door AI-autovervolledigingstools in uw IDE (zoals GitHub Copilot)

6. **Laadprestaties te optimaliseren**
   - Als een component lazy-loaded is, wordt de bijbehorende inhoud op hetzelfde moment geladen

## Extra functies van Intlayer

| Functie                                                                                                                   | Beschrijving                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **Cross-Framework Ondersteuning**<br><br>Intlayer is compatibel met alle belangrijke frameworks en bibliotheken, waaronder Next.js, React, Vite, Vue.js, Nuxt, Preact, Express en meer.                                                                                                                                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **JavaScript-gestuurd Inhoudsbeheer**<br><br>Benut de flexibiliteit van JavaScript om uw inhoud efficiënt te definiëren en te beheren. <br><br> - [Inhoudsdeclaratie](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Feature" width="700">  | **Compiler**<br><br>De Intlayer Compiler extraheert automatisch de inhoud uit de componenten en genereert de woordenboekbestanden.<br><br> - [Compiler](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **Inhoudsdeclaratiebestand per taal**<br><br>Versnel uw ontwikkeling door uw inhoud eenmalig te declareren, vóór de automatische generatie.<br><br> - [Inhoudsdeclaratiebestand per taal](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **Type-Safe Omgeving**<br><br>Gebruik TypeScript om ervoor te zorgen dat uw inhoudsdefinities en code foutloos zijn, terwijl u ook profiteert van IDE-autovervollediging.<br><br> - [TypeScript-configuratie](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **Vereenvoudigde Setup**<br><br>Ga snel aan de slag met minimale configuratie. Pas instellingen voor internationalisering, routing, AI, build en inhoudsverwerking met gemak aan. <br><br> - [Verken Next.js-integratie](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **Vereenvoudigd Ophalen van Inhoud**<br><br>Het is niet nodig om uw `t`-functie aan te roepen voor elk stukje inhoud. Haal al uw inhoud direct op met behulp van een enkele hook.<br><br> - [React-integratie](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **Consistente Implementatie van Server Components**<br><br>Perfect geschikt voor Next.js server components: gebruik dezelfde implementatie voor zowel client als server components, zonder dat u uw `t`-functie door de hele componentenboom hoeft door te geven. <br><br> - [Server Components](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                     |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **Georganiseerde Codebase**<br><br>Houd uw codebase georganiseerder: 1 component = 1 woordenboek in dezelfde map. Vertalingen dicht bij hun respectievelijke componenten verbeteren de onderhoudbaarheid en duidelijkheid. <br><br> - [Hoe Intlayer werkt](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **Verbeterde Routing**<br><br>Volledige ondersteuning van app-routing, die zich naadloos aanpast aan complexe applicatiestructuren, voor Next.js, React, Vite, Vue.js, enz.<br><br> - [Verken Next.js-integratie](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Markdown-ondersteuning**<br><br>Importeer en interpreteer lokale bestanden en externe Markdown voor meertalige inhoud zoals privacybeleid, documentatie, enz. Interpreteer Markdown-metadata en maak deze toegankelijk in uw code.<br><br> - [Inhoudsbestanden](https://intlayer.org/doc/concept/content/file)                                                                                                      |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **Gratis Visuele Editor & CMS**<br><br>Een gratis visuele editor en CMS zijn beschikbaar voor contentschrijvers, waardoor een extern lokalisatieplatform overbodig is. Houd uw inhoud gesynchroniseerd met behulp van Git, of externaliseer deze geheel of gedeeltelijk met het CMS.<br><br> - [Intlayer Editor](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms) |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **Tree-shakable Inhoud**<br><br>Tree-shakable inhoud, waardoor de grootte van het uiteindelijke pakket wordt verminderd. Laadt inhoud per component en sluit alle ongebruikte inhoud uit uw pakket uit. Ondersteunt lazy loading om de laadefficiëntie van de app te verbeteren. <br><br> - [App build-optimalisatie](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                     |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **Statische Rendering**<br><br>Blokeert statische rendering niet. <br><br> - [Next.js-integratie](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **AI-gestuurde Vertaling**<br><br>Vertaal uw website met slechts één klik in 231 talen met behulp van de geavanceerde AI-gestuurde vertaaltools van Intlayer met uw eigen AI-provider/API-sleutel. <br><br> - [CI/CD-integratie](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [Automatisch invullen](https://intlayer.org/doc/concept/auto-fill)        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **MCP Serverintegratie**<br><br>Biedt een MCP (Model Context Protocol) server voor IDE-automatisering, waardoor naadloos inhoudsbeheer en i18n-workflows direct binnen uw ontwikkelomgeving mogelijk zijn. <br><br> - [MCP Server](https://github.com/aymericzip/intlayer/blob/main/docs/nl/mcp_server.md)                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **VSCode-extensie**<br><br>Intlayer biedt een VSCode-extensie om u te helpen uw inhoud en vertalingen te beheren, uw woordenboeken te bouwen, uw inhoud te vertalen en meer. <br><br> - [VSCode-extensie](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **Interoperabiliteit**<br><br>Maakt interoperabiliteit met react-i18next, next-i18next, next-intl en react-intl mogelijk. <br><br> - [Intlayer en react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer en next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer en next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                           |
| Testen op ontbrekende vertalingen (CLI/CI)                                                                                | ✅ CLI: npx intlayer content test (CI-vriendelijke audit)                                                                                                                                                                                                                                                                                                                                                             |

## Vergelijking van Intlayer met andere oplossingen

| Functie                                         | `intlayer`                                                                                                                                      | `react-i18next`                                                                                                         | `react-intl` (FormatJS)                                                                                                                        | `lingui`                                                            | `next-intl`                                                                                                            | `next-i18next`                                                                                                         | `vue-i18n`                                                     |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Vertalingen dicht bij componenten**           | ✅ Ja, inhoud co-located met elke component                                                                                                     | ❌ Nee                                                                                                                  | ❌ Nee                                                                                                                                         | ❌ Nee                                                              | ❌ Nee                                                                                                                 | ❌ Nee                                                                                                                 | ✅ Ja - met behulp van `Single File Components` (SFC's)        |
| **TypeScript-integratie**                       | ✅ Geavanceerd, automatisch gegenereerde strikte types                                                                                          | ⚠️ Basis; extra configuratie voor veiligheid                                                                            | ✅ Goed, maar minder streng                                                                                                                    | ⚠️ Typingen, configuratie nodig                                     | ✅ Goed                                                                                                                | ⚠️ Basis                                                                                                               | ✅ Goed (types beschikbaar; sleutelbeveiliging vereist setup)  |
| **Detectie van ontbrekende vertalingen**        | ✅ TypeScript-foutmarkering en build-tijd fout/waarschuwing                                                                                     | ⚠️ Meestal fallback-strings bij runtime                                                                                 | ⚠️ Fallback-strings                                                                                                                            | ⚠️ Vereist extra configuratie                                       | ⚠️ Runtime fallback                                                                                                    | ⚠️ Runtime fallback                                                                                                    | ⚠️ Runtime fallback/waarschuwingen (configureerbaar)           |
| **Rijke inhoud (JSX/Markdown/componenten)**     | ✅ Directe ondersteuning                                                                                                                        | ⚠️ Beperkt / alleen interpolatie                                                                                        | ⚠️ ICU-syntaxis, geen echte JSX                                                                                                                | ⚠️ Beperkt                                                          | ❌ Niet ontworpen voor rijke knooppunten                                                                               | ⚠️ Beperkt                                                                                                             | ⚠️ Beperkt (componenten via `<i18n-t>`, Markdown via plug-ins) |
| **AI-gestuurde vertaling**                      | ✅ Ja, ondersteunt meerdere AI-providers. Te gebruiken met eigen API-sleutels. Houdt rekening met de context van uw applicatie en inhoudsbereik | ❌ Nee                                                                                                                  | ❌ Nee                                                                                                                                         | ❌ Nee                                                              | ❌ Nee                                                                                                                 | ❌ Nee                                                                                                                 | ❌ Nee                                                         |
| **Visuele Editor**                              | ✅ Ja, lokale visuele editor + optioneel CMS; kan codebase-inhoud externaliseren; embeddable                                                    | ❌ Nee / beschikbaar via externe lokalisatieplatformen                                                                  | ❌ Nee / beschikbaar via externe lokalisatieplatformen                                                                                         | ❌ Nee / beschikbaar via externe lokalisatieplatformen              | ❌ Nee / beschikbaar via externe lokalisatieplatformen                                                                 | ❌ Nee / beschikbaar via externe lokalisatieplatformen                                                                 | ❌ Nee / beschikbaar via externe lokalisatieplatformen         |
| **Gelokaliseerde Routing**                      | ✅ Ja, ondersteunt gelokaliseerde paden direct (werkt met Next.js & Vite)                                                                       | ⚠️ Niet ingebouwd, vereist plug-ins (bijv. `next-i18next`) of aangepaste routerconfiguratie                             | ❌ Nee, alleen berichtopmaak, routing moet handmatig                                                                                           | ⚠️ Niet ingebouwd, vereist plug-ins of handmatige configuratie      | ✅ Ingebouwd, App Router ondersteunt `[locale]` segment                                                                | ✅ Ingebouwd                                                                                                           | ✅ Ingebouwd                                                   |
| **Dynamische routegeneratie**                   | ✅ Ja                                                                                                                                           | ⚠️ Plug-in/ecosysteem of handmatige installatie                                                                         | ❌ Niet meegeleverd                                                                                                                            | ⚠️ Plug-in/handmatig                                                | ✅ Ja                                                                                                                  | ✅ Ja                                                                                                                  | ❌ Niet meegeleverd (Nuxt i18n biedt dit)                      |
| **Meervoudsvormen**                             | ✅ Op enumeratie gebaseerde patronen                                                                                                            | ✅ Configureerbaar (plug-ins zoals i18next-icu)                                                                         | ✅ (ICU)                                                                                                                                       | ✅ (ICU/messageformat)                                              | ✅ Goed                                                                                                                | ✅ Goed                                                                                                                | ✅ Ingebouwde meervoudsregels                                  |
| **Formattering (data, getallen, valuta's)**     | ✅ Geoptimaliseerde formatters (Intl onder de motorkap)                                                                                         | ⚠️ Via plug-ins of aangepast Intl-gebruik                                                                               | ✅ ICU-formatters                                                                                                                              | ✅ ICU/CLI-helpers                                                  | ✅ Goed (Intl-helpers)                                                                                                 | ✅ Goed (Intl-helpers)                                                                                                 | ✅ Ingebouwde datum-/getalformatters (Intl)                    |
| **Inhoudsformaat**                              | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml WIP)                                                                                                | ⚠️ .json                                                                                                                | ✅ .json, .js                                                                                                                                  | ⚠️ .po, .json                                                       | ✅ .json, .js, .ts                                                                                                     | ⚠️ .json                                                                                                               | ✅ .json, .js                                                  |
| **ICU-ondersteuning**                           | ⚠️ WIP                                                                                                                                          | ⚠️ Via plug-in (i18next-icu)                                                                                            | ✅ Ja                                                                                                                                          | ✅ Ja                                                               | ✅ Ja                                                                                                                  | ⚠️ Via plug-in (`i18next-icu`)                                                                                         | ⚠️ Via aangepaste formatter/compiler                           |
| **SEO-helpers (hreflang, sitemap)**             | ✅ Ingebouwde tools: helpers voor sitemap, robots.txt, metadata                                                                                 | ⚠️ Community-plug-ins/handmatig                                                                                         | ❌ Niet core                                                                                                                                   | ❌ Niet core                                                        | ✅ Goed                                                                                                                | ✅ Goed                                                                                                                | ❌ Niet core (Nuxt i18n biedt helpers)                         |
| **Ecosystem / Community**                       | ⚠️ Kleiner maar groeit snel en reageert snel                                                                                                    | ✅ Grootste en meest volwassen                                                                                          | ✅ Groot                                                                                                                                       | ⚠️ Kleiner                                                          | ✅ Middelgroot, Next.js-gericht                                                                                        | ✅ Middelgroot, Next.js-gericht                                                                                        | ✅ Groot in Vue-ecosysteem                                     |
| **Server-side Rendering & Server Components**   | ✅ Ja, gestroomlijnd voor SSR / React Server Components                                                                                         | ⚠️ Ondersteund op paginaniveau, maar moet t-functies doorgeven in de componentenboom voor servercomponents van kinderen | ⚠️ Ondersteund op paginaniveau met extra configuratie, maar moet t-functies doorgeven in de componentenboom voor servercomponents van kinderen | ✅ Ondersteund, setup vereist                                       | ⚠️ Ondersteund op paginaniveau, maar moet t-functies doorgeven in de componentenboom for servercomponents van kinderen | ⚠️ Ondersteund op paginaniveau, maar moet t-functies doorgeven in de componentenboom for servercomponents van kinderen | ✅ SSR via Nuxt/Vue SSR (geen RSC)                             |
| **Tree-shaking (laad alleen gebruikte inhoud)** | ✅ Ja, per component tijdens build-tijd via Babel/SWC plug-ins                                                                                  | ⚠️ Laadt meestal alles (kan worden verbeterd met namespaces/code-splitting)                                             | ⚠️ Laadt meestal alles                                                                                                                         | ❌ Niet standaard                                                   | ⚠️ Gedeeltelijk                                                                                                        | ⚠️ Gedeeltelijk                                                                                                        | ⚠️ Gedeeltelijk (met code-splitting/handmatige setup)          |
| **Lazy loading**                                | ✅ Ja, per taal / per woordenboek                                                                                                               | ✅ Ja (bijv. backends/namespaces op aanvraag)                                                                           | ✅ Ja (gesplitste taalbundels)                                                                                                                 | ✅ Ja (dynamische catalogus-imports)                                | ✅ Ja (per route/per taal), namespacebeheer nodig                                                                      | ✅ Ja (per route/per taal), namespacebeheer nodig                                                                      | ✅ Ja (async taalberichten)                                    |
| **Ongebruikte inhoud verwijderen**              | ✅ Ja, per woordenboek tijdens build-tijd                                                                                                       | ❌ Nee, alleen via handmatige namespace-segmentatie                                                                     | ❌ Nee, alle gedeclareerde berichten worden gebundelt                                                                                          | ✅ Ja, ongebruikte sleutels gedetecteerd en verwijderd bij de build | ❌ Nee, kan handmatig worden beheerd met namespacebeheer                                                               | ❌ Nee, kan handmatig worden beheerd met namespacebeheer                                                               | ❌ Nee, alleen mogelijk via handmatige lazy-loading            |
| **Beheer van grote projecten**                  | ✅ Stimuleert modulariteit, zeer geschikt voor design-systemen                                                                                  | ⚠️ Vereist goede bestandsdiscipline                                                                                     | ⚠️ Centrale catalogi kunnen erg groot worden                                                                                                   | ⚠️ Kan complex worden                                               | ✅ Modulair met instelling                                                                                             | ✅ Modulair met instelling                                                                                             | ✅ Modulair met Vue Router/Nuxt i18n setup                     |

## GitHub-sterren

GitHub-sterren zijn een sterke indicator van de populariteit van een project, het vertrouwen van de gemeenschap en de relevantie op de lange termijn. Hoewel ze geen directe meting van de technische kwaliteit zijn, weerspiegelen ze hoeveel ontwikkelaars het project nuttig vinden, de voortgang ervan volgen en het waarschijnlijk zullen adopteren. Om de waarde van een project te schatten, helpen sterren om de tractie tussen alternatieven te vergelijken en bieden ze inzicht in de groei van het ecosysteem.

[![Star History Chart](https://api.star-history.com/chart?repos=aymericzip/intlayer%2Cformatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Ccodingcommons/typesafe-i18n%2Copral/paraglide-js&type=date&legend=top-left)](https://www.star-history.com/#aymericzip/intlayer&formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&codingcommons/typesafe-i18n&opral/paraglide-js)

---

## Interoperabiliteit

`intlayer` kan u ook helpen bij het beheren van uw `react-intl`, `react-i18next`, `next-intl`, `next-i18next` en `vue-i18n` namespaces.

Door `intlayer` te gebruiken, kunt u uw inhoud declareren in het formaat van uw favoriete i18n-bibliotheek, en intlayer genereert uw namespaces op de locatie van uw keuze (voorbeeld: `/messages/{{locale}}/{{namespace}}.json`).
