---
createdAt: 2024-08-14
updatedAt: 2025-09-27
title: Waarom Intlayer?
description: Ontdek de voordelen en pluspunten van het gebruik van Intlayer in uw projecten. Begrijp waarom Intlayer uitblinkt tussen andere frameworks.
keywords:
  - Voordelen
  - Pluspunten
  - Intlayer
  - Framework
  - Vergelijking
slugs:
  - doc
  - why
history:
  - version: 7.3.1
    date: 2025-11-27
    changes: "Release Compiler"
  - version: 5.8.0
    date: 2025-08-19
    changes: "Vergelijkingstabel bijgewerkt"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Initiële geschiedenis"
---

# Waarom zou u Intlayer overwegen?

## Wat is Intlayer?

**Intlayer** is een internationaliseringsbibliotheek die specifiek is ontworpen voor JavaScript-ontwikkelaars. Het stelt u in staat om uw inhoud overal in uw code te declareren. Het zet meertalige inhoudsdeclaraties om in gestructureerde woordenboeken die eenvoudig in uw code kunnen worden geïntegreerd. Door gebruik te maken van TypeScript maakt **Intlayer** uw ontwikkeling robuuster en efficiënter.

## Waarom is Intlayer gecreëerd?

Intlayer is gecreëerd om een veelvoorkomend probleem op te lossen dat alle populaire i18n-bibliotheken beïnvloedt, zoals `next-intl`, `react-i18next`, `react-intl`, `next-i18next`, `react-intl` en `vue-i18n`.

Al deze oplossingen hanteren een gecentraliseerde aanpak voor het vermelden en beheren van uw inhoud. Bijvoorbeeld:

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

Dit type architectuur vertraagt het ontwikkelingsproces en maakt de codebase complexer om te onderhouden om verschillende redenen:

1. **Voor elke nieuwe component die wordt gemaakt, moet u:**
   - De nieuwe bron/namespace aanmaken in de map `locales`
   - Vergeet niet de nieuwe namespace in uw pagina te importeren
   - Uw inhoud vertalen (vaak handmatig gedaan door kopiëren/plakken van AI-providers)

2. **Voor elke wijziging aan uw componenten moet u:**
   - De gerelateerde bron/namespace zoeken (ver weg van de component)
   - Uw inhoud vertalen
   - Zorgen dat uw inhoud up-to-date is voor elke taal
   - Controleren of uw namespace geen ongebruikte sleutels/waarden bevat
   - Zorgen dat de structuur van uw JSON-bestanden voor alle talen hetzelfde is

Bij professionele projecten die deze oplossingen gebruiken, worden vaak lokalisatieplatforms gebruikt om de vertaling van uw inhoud te beheren. Dit kan echter snel duur worden voor grote projecten.

Om dit probleem op te lossen, hanteert Intlayer een aanpak waarbij uw inhoud per component wordt gescopet en uw inhoud dicht bij uw component wordt gehouden, zoals we vaak doen met CSS (`styled-components`), typen, documentatie (`storybook`) of unit-tests (`jest`).

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

Deze aanpak stelt u in staat om:

1. **De ontwikkelingssnelheid te verhogen**
   - `.content.{{ts|mjs|cjs|json}}`-bestanden kunnen worden gemaakt met een VSCode-extensie
   - Autocomplete AI-tools in uw IDE (zoals GitHub Copilot) kunnen u helpen bij het declareren van uw inhoud, waardoor kopiëren/plakken wordt verminderd

2. **Uw codebase op te schonen**
   - Complexiteit verminderen
   - Onderhoudbaarheid verhogen

3. **Uw componenten en hun gerelateerde inhoud gemakkelijker te dupliceren (bijv. login/registratiecomponenten, enz.)**
   - Door het risico te beperken dat de inhoud van andere componenten wordt beïnvloed
   - Door uw inhoud van de ene applicatie naar de andere te kopiëren/plakken zonder externe afhankelijkheden

4. **Vervuiling van uw codebase met ongebruikte sleutels/waarden voor ongebruikte componenten te vermijden**
   - Als u een component niet gebruikt, zal Intlayer de bijbehorende inhoud niet importeren
   - Als u een component verwijdert, zult u er gemakkelijker aan denken om de bijbehorende inhoud te verwijderen omdat deze in dezelfde map aanwezig is

5. **De redeneringskosten voor AI-agenten te verlagen om uw meertalige inhoud te declareren**
   - Een AI-agent hoeft niet uw hele codebase te scannen om te weten waar uw inhoud moet worden geïmplementeerd
   - Vertalingen kunnen eenvoudig worden uitgevoerd door autocomplete AI-tools in uw IDE (zoals GitHub Copilot)

6. **De laadprestaties te optimaliseren**
   - Als een component lazy-loaded is, wordt de bijbehorende inhoud tegelijkertijd geladen

## Aanvullende functies van Intlayer

| Functie                                                                                                                   | Beschrijving                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Functie](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **Cross-Framework Ondersteuning**<br><br>Intlayer is compatibel met alle belangrijke frameworks en bibliotheken, waaronder Next.js, React, Vite, Vue.js, Nuxt, Preact, Express en meer.                                                                                                                                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **JavaScript-gestuurd inhoudbeheer**<br><br>Profiteer van de flexibiliteit van JavaScript om uw inhoud efficiënt te definiëren en te beheren. <br><br> - [Inhoudsdeclaratie](https://intlayer.org/doc/concept/content)                                                                                                                                                                                            |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Functie" width="700">  | **Compiler**<br><br>De Intlayer Compiler extraheert automatisch de inhoud uit de componenten en genereert de woordenboekbestanden.<br><br> - [Compiler](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **Inhoudsdeclaratiebestand per taal**<br><br>Versnel uw ontwikkeling door uw inhoud eenmalig te declareren, voorafgaand aan de automatische generatie.<br><br> - [Inhoudsdeclaratiebestand per taal](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **Type-Safe Omgeving**<br><br>Gebruik TypeScript om ervoor te zorgen dat uw inhoudsdefinities en code foutloos zijn, terwijl u ook profiteert van IDE-autocomplete.<br><br> - [TypeScript-configuratie](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **Vereenvoudigde Setup**<br><br>Snel aan de slag met minimale configuratie. Pas instellingen voor internationalisering, routing, AI, build en inhoudsverwerking eenvoudig aan. <br><br> - [Ontdek Next.js-integratie](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **Vereenvoudigde inhoudsopvraging**<br><br>U hoeft uw `t`-functie niet aan te roepen voor elk stukje inhoud. Haal al uw inhoud rechtstreeks op met een enkele hook.<br><br> - [React-integratie](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **Consistente Server Component-implementatie**<br><br>Perfect geschikt voor Next.js server components, gebruik dezelfde implementatie voor zowel client- als server-componenten, u hoeft uw `t`-functie niet door elke server-component door te geven. <br><br> - [Server Components](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **Georganiseerde Codebase**<br><br>Houd uw codebase georganiseerder: 1 component = 1 woordenboek in dezelfde map. Vertalingen dicht bij hun respectievelijke componenten verbeteren de onderhoudbaarheid en duidelijkheid. <br><br> - [Hoe Intlayer werkt](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **Verbeterde Routing**<br><br>Volledige ondersteuning voor app-routing, naadloos aangepast aan complexe applicatiestructuren, voor Next.js, React, Vite, Vue.js, enz.<br><br> - [Ontdek Next.js-integratie](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Markdown-ondersteuning**<br><br>Importeer en interpreteer lokale bestanden en externe Markdown voor meertalige inhoud zoals privacybeleid, documentatie, enz. Interpreteer en maak Markdown-metadata toegankelijk in uw code.<br><br> - [Inhoudsbestanden](https://intlayer.org/doc/concept/content/file)                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **Gratis Visuele Editor & CMS**<br><br>Een gratis visuele editor en CMS zijn beschikbaar voor contentschrijvers, waardoor de noodzaak voor een lokalisatieplatform vervalt. Houd uw inhoud gesynchroniseerd met Git, of externaliseer deze volledig of gedeeltelijk met het CMS.<br><br> - [Intlayer Editor](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms) |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **Tree-shakable inhoud**<br><br>Tree-shakable inhoud, waardoor de grootte van de uiteindelijke bundel wordt verminderd. Laadt inhoud per component, waardoor ongebruikte inhoud uit uw bundel wordt uitgesloten. Ondersteunt lazy loading om de laadefficiëntie van de app te verhogen. <br><br> - [App build optimalisatie](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **Static Rendering**<br><br>Blokkeert Static Rendering niet. <br><br> - [Next.js-integratie](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **AI-gestuurde vertaling**<br><br>Zet uw website met één klik om in 231 talen met behulp van de geavanceerde AI-gestuurde vertaaltools van Intlayer met uw eigen AI-provider/API-sleutel. <br><br> - [CI/CD-integratie](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [Auto-fill](https://intlayer.org/doc/concept/auto-fill)                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **MCP Server Integratie**<br><br>Biedt een MCP (Model Context Protocol) server voor IDE-automatisering, waardoor naadloos inhoudbeheer en i18n-workflows direct binnen uw ontwikkelomgeving mogelijk zijn. <br><br> - [MCP Server](https://github.com/aymericzip/intlayer/blob/main/docs/nl/mcp_server.md)                                                                                                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **VSCode Extensie**<br><br>Intlayer biedt een VSCode-extensie om u te helpen uw inhoud en vertalingen te beheren, uw woordenboeken te bouwen, uw inhoud te vertalen en meer. <br><br> - [VSCode Extensie](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **Interoperabiliteit**<br><br>Maakt interoperabiliteit met react-i18next, next-i18next, next-intl en react-intl mogelijk. <br><br> - [Intlayer en react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer en next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer en next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                       |
| Testen van ontbrekende vertalingen (CLI/CI)                                                                               | ✅ CLI: npx intlayer content test (CI-vriendelijke audit)                                                                                                                                                                                                                                                                                                                                                         |

## Vergelijking van Intlayer met andere oplossingen

| Functie                                         | `intlayer`                                                                                                                               | `react-i18next`                                                                                                               | `react-intl` (FormatJS)                                                                                                                       | `lingui`                                                                     | `next-intl`                                                                                                                   | `next-i18next`                                                                                                                | `vue-i18n`                                                         |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **Vertalingen nabij componenten**               | ✅ Ja, inhoud is samen met elke component geplaatst                                                                                      | ❌ Nee                                                                                                                        | ❌ Nee                                                                                                                                        | ❌ Nee                                                                       | ❌ Nee                                                                                                                        | ❌ Nee                                                                                                                        | ✅ Ja - bij gebruik van `Single File Components` (SFCs)            |
| **TypeScript-integratie**                       | ✅ Geavanceerd, automatisch gegenereerde strikte typen                                                                                   | ⚠️ Basis; extra configuratie nodig voor veiligheid                                                                            | ✅ Goed, maar minder strikt                                                                                                                   | ⚠️ Typeringen, configuratie nodig                                            | ✅ Goed                                                                                                                       | ⚠️ Basis                                                                                                                      | ✅ Goed (typen zijn beschikbaar; sleutelbeveiliging vereist setup) |
| **Detectie van ontbrekende vertalingen**        | ✅ TypeScript-foutmarkering en build-time fout/waarschuwing                                                                              | ⚠️ Meestal fallback-strings bij runtime                                                                                       | ⚠️ Fallback-strings                                                                                                                           | ⚠️ Extra configuratie nodig                                                  | ⚠️ Runtime fallback                                                                                                           | ⚠️ Runtime fallback                                                                                                           | ⚠️ Runtime fallback/waarschuwingen (configureerbaar)               |
| **Rijke inhoud (JSX/Markdown/componenten)**     | ✅ Directe ondersteuning                                                                                                                 | ⚠️ Beperkt / alleen interpolatie                                                                                              | ⚠️ ICU-syntaxis, geen echte JSX                                                                                                               | ⚠️ Beperkt                                                                   | ❌ Niet ontworpen voor rijke nodes                                                                                            | ⚠️ Beperkt                                                                                                                    | ⚠️ Beperkt (componenten via `<i18n-t>`, Markdown via plugins)      |
| **AI-gestuurde vertaling**                      | ✅ Ja, ondersteunt meerdere AI-providers. Bruikbaar met uw eigen API-sleutels. Houdt rekening met de context van uw applicatie en inhoud | ❌ Nee                                                                                                                        | ❌ Nee                                                                                                                                        | ❌ Nee                                                                       | ❌ Nee                                                                                                                        | ❌ Nee                                                                                                                        | ❌ Nee                                                             |
| **Visuele Editor**                              | ✅ Ja, lokale Visuele Editor + optioneel CMS; kan codebase-inhoud externaliseren; inbedbaar                                              | ❌ Nee / beschikbaar via externe lokalisatieplatforms                                                                         | ❌ Nee / beschikbaar via externe lokalisatieplatforms                                                                                         | ❌ Nee / beschikbaar via externe lokalisatieplatforms                        | ❌ Nee / beschikbaar via externe lokalisatieplatforms                                                                         | ❌ Nee / beschikbaar via externe lokalisatieplatforms                                                                         | ❌ Nee / beschikbaar via externe lokalisatieplatforms              |
| **Gelokaliseerde Routing**                      | ✅ Ja, ondersteunt gelokaliseerde paden uit de doos (werkt met Next.js & Vite)                                                           | ⚠️ Geen ingebouwde ondersteuning, vereist plugins (bijv. `next-i18next`) of aangepaste routerconfiguratie                     | ❌ Nee, alleen berichtformattering, routing moet handmatig                                                                                    | ⚠️ Geen ingebouwde ondersteuning, vereist plugins of handmatige configuratie | ✅ Ingebouwd, App Router ondersteunt `[locale]`-segment                                                                       | ✅ Ingebouwd                                                                                                                  | ✅ Ingebouwd                                                       |
| **Dynamische Routegeneratie**                   | ✅ Ja                                                                                                                                    | ⚠️ Plugin/ecosysteem of handmatige setup                                                                                      | ❌ Niet aangeboden                                                                                                                            | ⚠️ Plugin/handmatig                                                          | ✅ Ja                                                                                                                         | ✅ Ja                                                                                                                         | ❌ Niet aangeboden (Nuxt i18n biedt dit aan)                       |
| **Meervoudsvormen**                             | ✅ Enumeratie-gebaseerde patronen                                                                                                        | ✅ Configureerbaar (plugins zoals i18next-icu)                                                                                | ✅ (ICU)                                                                                                                                      | ✅ (ICU/messageformat)                                                       | ✅ Goed                                                                                                                       | ✅ Goed                                                                                                                       | ✅ Ingebouwde meervoudsregels                                      |
| **Formattering (datums, getallen, valuta)**     | ✅ Geoptimaliseerde formatters (Intl onder de motorkap)                                                                                  | ⚠️ Via plugins of aangepast Intl-gebruik                                                                                      | ✅ ICU-formatters                                                                                                                             | ✅ ICU/CLI-helpers                                                           | ✅ Goed (Intl-helpers)                                                                                                        | ✅ Goed (Intl-helpers)                                                                                                        | ✅ Ingebouwde datum/getal-formatters (Intl)                        |
| **Inhoudsformaat**                              | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml in ontwikkeling)                                                                             | ⚠️ .json                                                                                                                      | ✅ .json, .js                                                                                                                                 | ⚠️ .po, .json                                                                | ✅ .json, .js, .ts                                                                                                            | ⚠️ .json                                                                                                                      | ✅ .json, .js                                                      |
| **ICU-ondersteuning**                           | ⚠️ In ontwikkeling                                                                                                                       | ⚠️ Via plugin (i18next-icu)                                                                                                   | ✅ Ja                                                                                                                                         | ✅ Ja                                                                        | ✅ Ja                                                                                                                         | ⚠️ Via plugin (`i18next-icu`)                                                                                                 | ⚠️ Via aangepaste formatter/compiler                               |
| **SEO-helpers (hreflang, sitemap)**             | ✅ Ingebouwde tools: helpers voor sitemap, robots.txt, metadata                                                                          | ⚠️ Community-plugins/handmatig                                                                                                | ❌ Geen kernonderdeel                                                                                                                         | ❌ Geen kernonderdeel                                                        | ✅ Goed                                                                                                                       | ✅ Goed                                                                                                                       | ❌ Geen kernonderdeel (Nuxt i18n biedt helpers aan)                |
| **Ecosysteem / Gemeenschap**                    | ⚠️ Kleiner maar groeit snel en is reactief                                                                                               | ✅ Grootste en meest volwassen                                                                                                | ✅ Groot                                                                                                                                      | ⚠️ Kleiner                                                                   | ✅ Middelgroot, gericht op Next.js                                                                                            | ✅ Middelgroot, gericht op Next.js                                                                                            | ✅ Groot in Vue-ecosysteem                                         |
| **Server-side Rendering & Server Components**   | ✅ Ja, gestroomlijnd voor SSR / React Server Components                                                                                  | ⚠️ Ondersteund op paginaniveau, maar t-functies moeten over de componentenboom voor sub-server-componenten worden doorgegeven | ⚠️ Ondersteund op paginaniveau met extra setup, maar t-functies moeten over de componentenboom voor sub-server-componenten worden doorgegeven | ✅ Ondersteund, setup nodig                                                  | ⚠️ Ondersteund op paginaniveau, maar t-functies moeten over de componentenboom voor sub-server-componenten worden doorgegeven | ⚠️ Ondersteund op paginaniveau, maar t-functies moeten over de componentenboom voor sub-server-componenten worden doorgegeven | ✅ SSR via Nuxt/Vue SSR (geen RSC)                                 |
| **Tree-shaking (laad alleen gebruikte inhoud)** | ✅ Ja, per component tijdens build-tijd via Babel/SWC-plugins                                                                            | ⚠️ Laadt meestal alles (kan worden verbeterd met namespaces/code-splitting)                                                   | ⚠️ Laadt meestal alles                                                                                                                        | ❌ Niet standaard                                                            | ⚠️ Gedeeltelijk                                                                                                               | ⚠️ Gedeeltelijk                                                                                                               | ⚠️ Gedeeltelijk (met code-splitting/handmatige setup)              |
| **Lazy loading**                                | ✅ Ja, per taal / per woordenboek                                                                                                        | ✅ Ja (bijv. on-demand backends/namespaces)                                                                                   | ✅ Ja (gesplitste taalbundels)                                                                                                                | ✅ Ja (dynamische catalogusimports)                                          | ✅ Ja (per route/per taal), namespace-beheer nodig                                                                            | ✅ Ja (per route/per taal), namespace-beheer nodig                                                                            | ✅ Ja (asynchrone taalberichten)                                   |
| **Ongebruikte inhoud opschonen**                | ✅ Ja, per woordenboek tijdens build-tijd                                                                                                | ❌ Nee, alleen via handmatige namespace-segmentatie                                                                           | ❌ Nee, alle gedeclareerde berichten worden gebundeld                                                                                         | ✅ Ja, ongebruikte sleutels worden gedetecteerd en bij build verwijderd      | ❌ Nee, kan handmatig worden beheerd met namespace-beheer                                                                     | ❌ Nee, kan handmatig worden beheerd met namespace-beheer                                                                     | ❌ Nee, alleen mogelijk via handmatige lazy-loading                |
| **Beheer van grote projecten**                  | ✅ Moedigt modulariteit aan, geschikt voor design systems                                                                                | ⚠️ Goede bestandsdiscipline vereist                                                                                           | ⚠️ Centrale catalogi kunnen groot worden                                                                                                      | ⚠️ Kan complex worden                                                        | ✅ Modulair met setup                                                                                                         | ✅ Modulair met setup                                                                                                         | ✅ Modulair met Vue Router/Nuxt i18n setup                         |

---

## GitHub-sterren

GitHub-sterren zijn een sterke indicator voor de populariteit van een project, het vertrouwen van de gemeenschap en de relevantie op de lange termijn. Hoewel ze geen directe maatstaf zijn voor technische kwaliteit, weerspiegelen ze hoeveel ontwikkelaars het project nuttig vinden, de voortgang ervan volgen en het waarschijnlijk zullen adopteren. Voor het schatten van de waarde van een project helpen sterren om de tractie tussen alternatieven te vergelijken en bieden ze inzichten in de groei van het ecosysteem.

[![Star History Chart](https://api.star-history.com/chart?repos=formatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Caymericzip/intlayer%2Copral/inlang&type=date&legend=top-left)](https://www.star-history.com/#formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&opral/paraglide-js&aymericzip/intlayer)

---

## Interoperabiliteit

`intlayer` kan ook helpen bij het beheren van uw `react-intl`, `react-i18next`, `next-intl`, `next-i18next` en `vue-i18n` namespaces.

Met `intlayer` kunt u uw inhoud declareren in het formaat van uw favoriete i18n-bibliotheek, en intlayer genereert uw namespaces op de locatie van uw keuze (voorbeeld: `/messages/{{locale}}/{{namespace}}.json`).
