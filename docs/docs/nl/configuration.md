---
createdAt: 2024-08-13
updatedAt: 2026-03-20
title: Configuratie (Configuration)
description: Leer hoe u Intlayer configureert voor uw applicatie. Begrijp de verschillende instellingen en opties die beschikbaar zijn om Intlayer aan uw behoeften aan te passen.
keywords:
  - Configuratie
  - Instellingen
  - Aanpassing
  - Intlayer
  - Opties
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.4.0
    date: 2026-03-20
    changes: "Objectnotatie per locale toegevoegd voor 'compiler.output' en 'dictionary.fill'"
  - version: 8.3.0
    date: 2026-03-11
    changes: "'baseDir' verplaatst van 'content' configuratie naar 'system' configuratie"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Compileropties bijgewerkt, ondersteuning voor 'output' en 'noMetadata' toegevoegd"
  - version: 8.1.7
    date: 2026-02-25
    changes: "Compileropties bijgewerkt"
  - version: 8.1.5
    date: 2026-02-23
    changes: "'build-only' compileroptie en dictionary prefix toegevoegd"
  - version: 8.0.6
    date: 2026-02-12
    changes: "Ondersteuning toegevoegd voor providers Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face en Together.ai"
  - version: 8.0.5
    date: 2026-02-06
    changes: "`dataSerialization` toegevoegd aan AI-configuratie"
  - version: 8.0.0
    date: 2026-01-24
    changes: "De importmodus `live` is hernoemd naar `fetch` om het onderliggende mechanisme beter te beschrijven."
  - version: 8.0.0
    date: 2026-01-22
    changes: "De build-configuratie `importMode` is verplaatst naar de `dictionary` configuratie."
  - version: 8.0.0
    date: 2026-01-22
    changes: "De optie `rewrite` toegevoegd aan de routingconfiguratie"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Systeemconfiguratie gescheiden van contentconfiguratie. Interne paden verplaatst naar de eigenschap `system`. `codeDir` toegevoegd om contentbestanden te scheiden van codetransformatie."
  - version: 8.0.0
    date: 2026-01-18
    changes: "Dictionary-opties `location` en `schema` toegevoegd"
  - version: 7.5.1
    date: 2026-01-10
    changes: "Ondersteuning voor JSON5- en JSONC-bestandsformaten toegevoegd"
  - version: 7.5.0
    date: 2025-12-17
    changes: "Optie `buildMode` toegevoegd"
  - version: 7.0.0
    date: 2025-10-25
    changes: "Configuratie `dictionary` toegevoegd"
  - version: 7.0.0
    date: 2025-10-21
    changes: "`middleware` vervangen door `routing` configuratie"
  - version: 7.0.0
    date: 2025-10-12
    changes: "Optie `formatCommand` toegevoegd"
  - version: 6.2.0
    date: 2025-10-12
    changes: "Optie `excludedPath` bijgewerkt"
  - version: 6.0.2
    date: 2025-09-23
    changes: "Optie `outputFormat` toegevoegd"
  - version: 6.0.0
    date: 2025-09-21
    changes: "Velden `dictionaryOutput` en `i18nextResourcesDir` verwijderd"
  - version: 6.0.0
    date: 2025-09-16
    changes: "Modus `live` import toegevoegd"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Veld `hotReload` vervangen door `liveSync` en velden `liveSyncPort`, `liveSyncURL` toegevoegd"
  - version: 5.6.1
    date: 2025-07-25
    changes: "`activateDynamicImport` vervangen door de optie `importMode`"
  - version: 5.6.0
    date: 2025-07-13
    changes: "Standaard `contentDir` gewijzigd van `['src']` naar `['.']`"
  - version: 5.5.11
    date: 2025-06-29
    changes: "Opdrachten `docs` toegevoegd"
---

# Intlayer-configuratiedocumentatie

## Overzicht

Intlayer-configuratiebestanden stellen u in staat om verschillende aspecten van de plugin aan te passen, zoals internationalisering, middleware en contentbeheer. Dit document geeft een gedetailleerde beschrijving van elke eigenschap in de configuratie.

---

## Inhoudsopgave

<TOC/>

---

## Ondersteuning voor configuratiebestanden

Intlayer accepteert JSON-, JS-, MJS- en TS-configuratiebestandsformaten:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Voorbeeld van een configuratiebestand

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * Voorbeeld van een Intlayer-configuratiebestand met alle beschikbare opties.
 */
const config: IntlayerConfig = {
  /**
   * Configuratie van instellingen voor internationalisering.
   */
  internationalization: {
    /**
     * Lijst van ondersteunde locales in de applicatie.
     * Standaard: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * Lijst van vereiste locales die in elk woordenboek moeten worden gedefinieerd.
     * Indien leeg, zijn alle locales vereist in de `strict` modus.
     * Standaard: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Het striktheidsniveau voor geinternationaliseerde content.
     * - "strict": Geeft een foutmelding als een gedeclareerde locale ontbreekt of niet gedeclareerd is.
     * - "inclusive": Geeft een waarschuwing als een gedeclareerde locale ontbreekt.
     * - "loose": Accepteert elke bestaande locale.
     * Standaard: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * De standaard locale die wordt gebruikt als fallback als de gevraagde locale niet wordt gevonden.
     * Standaard: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Instellingen die operaties met woordenboeken en gedrag bij ontbrekende content regelen.
   */
  dictionary: {
    /**
     * Beheert de manier waarop woordenboeken worden geimporteerd.
     * - "static": Statische import tijdens de build.
     * - "dynamic": Dynamische import via Suspense.
     * - "fetch": Dynamisch ophalen via de Live Sync API.
     * Standaard: "static"
     */
    importMode: "static",

    /**
     * De strategie voor het automatisch invullen van ontbrekende vertalingen met AI.
     * Kan een boolean zijn of een pad-patroon om ingevulde content op te slaan.
     * Standaard: true
     */
    fill: true,

    /**
     * De fysieke locatie van de woordenboekbestanden.
     * - "local": Opgeslagen op het lokale bestandssysteem.
     * - "remote": Opgeslagen in de Intlayer CMS.
     * - "hybrid": Zowel lokaal als in de Intlayer CMS opgeslagen.
     * - "plugin" (of een aangepaste string): Geleverd door een plugin of aangepaste bron.
     * Standaard: "local"
     */
    location: "local",

    /**
     * Of content automatisch moet worden getransformeerd (bijv. Markdown naar HTML).
     * Standaard: false
     */
    contentAutoTransformation: false,
  },

  /**
   * Configuratie van routing en middleware.
   */
  routing: {
    /**
     * Strategie voor routing per locale.
     * - "prefix-no-default": Voorvoegsel voor alle locales behalve de standaard (bijv. /dashboard, /fr/dashboard).
     * - "prefix-all": Voorvoegsel voor alle locales (bijv. /en/dashboard, /fr/dashboard).
     * - "no-prefix": Geen locale in de URL.
     * - "search-params": Gebruik ?locale=...
     * Standaard: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Waar de door de gebruiker gekozen locale moet worden opgeslagen.
     * Opties: 'cookie', 'localStorage', 'sessionStorage', 'header' of een array hiervan.
     * Standaard: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Het basispad van de URL's van de applicatie.
     * Standaard: ""
     */
    basePath: "",

    /**
     * Aangepaste URL-herschrijfregels voor paden in specifieke locales.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * Instellingen voor het zoeken en verwerken van contentbestanden.
   */
  content: {
    /**
     * Bestandsextensies voor het scannen van woordenboeken.
     * Standaard: ['.content.ts', '.content.js', '.content.json', enz.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Mappen waar .content bestanden zich bevinden.
     * Standaard: ["."]
     */
    contentDir: ["src"],

    /**
     * Bronmap van de code.
     * Gebruikt voor build-optimalisaties en codetransformatie.
     * Standaard: ["."]
     */
    codeDir: ["src"],

    /**
     * Patronen om uit te sluiten van het scannen.
     * Standaard: ['node_modules', '.intlayer', enz.]
     */
    excludedPath: ["node_modules"],

    /**
     * Of wijzigingen moeten worden gevolgd en woordenboeken opnieuw moeten worden gegenereerd tijdens ontwikkeling.
     * Standaard: true in ontwikkelingsmodus
     */
    watch: true,

    /**
     * Opdracht voor het formatteren van nieuw aangemaakte / bijgewerkte .content bestanden.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Configuratie van de visuele editor.
   */
  editor: {
    /**
     * Of de visuele editor is ingeschakeld.
     * Standaard: false
     */
    enabled: true,

    /**
     * URL van uw applicatie voor origin-validatie.
     * Standaard: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * Poort voor de lokale editor server.
     * Standaard: 8000
     */
    port: 8000,

    /**
     * Publieke URL voor de editor.
     * Standaard: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * URL van de Intlayer CMS.
     * Standaard: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * URL van de backend API server.
     * Standaard: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Of content synchronisatie in real-time moet worden ingeschakeld.
     * Standaard: false
     */
    liveSync: true,
  },

  /**
   * Instellingen voor vertalingen en genereren met behulp van AI.
   */
  ai: {
    /**
     * Gebruikte AI-provider.
     * Opties: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Standaard: 'openai'
     */
    provider: "openai",

    /**
     * Gebruikte model van de gekozen provider.
     */
    model: "gpt-4o",

    /**
     * API sleutel van de provider.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Globale context voor het begeleiden van de AI bij het genereren van vertalingen.
     */
    applicationContext: "Dit is een applicatie voor het boeken van reizen.",

    /**
     * Basis URL voor de AI API.
     */
    baseURL: "http://localhost:3000",

    /**
     * Dataserialisatie
     *
     * Opties:
     * - "json": Standaard, betrouwbaar; verbruikt meer tokens.
     * - "toon": Minder tokens, minder stabiel dan JSON.
     *
     * Standaard: "json"
     */
    dataSerialization: "json",
  },

  /**
   * Instellingen voor build en optimalisatie.
   */
  build: {
    /**
     * Modus van uitvoering van de build.
     * - "auto": Automatische build tijdens build van de applicatie.
     * - "manual": Vereist een expliciete build-opdracht.
     * Standaard: "auto"
     */
    mode: "auto",

    /**
     * Of de resulterende bundel moet worden geoptimaliseerd door ongebruikte woordenboeken te verwijderen.
     * Standaard: true in productie
     */
    optimize: true,

    /**
     * Uitvoerformaat voor gegenereerde woordenboekbestanden.
     * Standaard: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Of de build TypeScript types moet controleren.
     * Standaard: false
     */
    checkTypes: false,
  },

  /**
   * Configuratie van de logger.
   */
  log: {
    /**
     * Log-niveau.
     * - "default": Standaard logging.
     * - "verbose": Gedetailleerde debug-logging.
     * - "disabled": Geen logging.
     * Standaard: "default"
     */
    mode: "default",

    /**
     * Voorvoegsel voor alle berichten in het log.
     * Standaard: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * Systeemconfiguratie (geavanceerde use cases)
   */
  system: {
    /**
     * Map voor het opslaan van gelocaliseerde woordenboeken.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Map voor module uitbreiding (module augmentation).
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Map voor het opslaan van ongevouwen (unmerged) woordenboeken.
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Map voor het opslaan van types van woordenboeken.
     */
    typesDir: ".intlayer/types",

    /**
     * Map waar de hoofdbestanden van de applicatie worden bewaard.
     */
    mainDir: ".intlayer/main",

    /**
     * Map waar de gecompileerde configuratiebestanden worden bewaard.
     */
    configDir: ".intlayer/config",

    /**
     * Map voor cachebestanden.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Compilerconfiguratie (geavanceerde use cases)
   */
  compiler: {
    /**
     * Of de compiler moet worden ingeschakeld.
     *
     * - false: Compiler uitschakelen.
     * - true: Compiler inschakelen.
     * - "build-only": Sla de compiler over tijdens ontwikkeling voor een snellere start.
     *
     * Standaard: false
     */
    enabled: true,

    /**
     * Definieert het pad voor de uitvoerbestanden. Vervangt `outputDir`.
     *
     * - Paden `./` worden relatief aan de map van de component opgelost.
     * - Paden `/` worden relatief aan de hoofdmap van het project (`baseDir`) opgelost.
     *
     * - De aanwezigheid van de variabele `{{locale}}` in het pad activeert het genereren van afzonderlijke woordenboeken voor elke locale.
     *
     * Voorbeeld:
     * ```ts
     * {
     *   // Meertalige .content.ts bestanden aanmaken naast de component
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Equivalent via een template string
     * }
     * ```
     *
     * ```ts
     * {
     *   // Gecentraliseerde JSON's aanmaken per locale in de hoofdmap van het project
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Equivalent via een template string
     * }
     * ```
     *
     * Lijst met variabelen:
     *   - `fileName`: Bestandsnaam.
     *   - `key`: Content-sleutel.
     *   - `locale`: Content-locale.
     *   - `extension`: Bestandsextensie.
     *   - `componentFileName`: Bestandsnaam van de component.
     *   - `componentExtension`: Bestandsextensie van de component.
     *   - `format`: Woordenboekformaat.
     *   - `componentFormat`: Woordenboekformaat van de component.
     *   - `componentDirPath`: Pad naar de map van de component.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Of componenten moeten worden bewaard na hun transformatie.
     * Op deze manier kan de compiler eenmalig worden uitgevoerd voor de transformatie van de applicatie en daarna worden verwijderd.
     */
    saveComponents: false,

    /**
     * Alleen de content in het gegenereerde bestand plaatsen. Handig voor uitvoer in i18next-formaat of ICU MessageFormat JSON per locale.
     */
    noMetadata: false,

    /**
     * Prefix voor woordenboeksleutel
     */
    dictionaryKeyPrefix: "", // Optionele prefix toevoegen voor geextraheerde woordenboeksleutels
  },

  /**
   * Aangepaste schema's voor validatie van woordenboekinhoud.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Configuratie van plugins.
   */
  plugins: [],
};

export default config;
````

---

## Configuratiegids

Hieronder worden de verschillende configuratieparameters beschreven die beschikbaar zijn in Intlayer.

---

### Internationaliseringsconfiguratie (Internationalization)

Definieert instellingen met betrekking tot internationalisering, waaronder beschikbare locales en de standaard locale.

| Veld              | Beschrijving                                                                                        | Type       | Standaard           | Voorbeeld            | Opmerking                                                                                                                                                                                                                                                                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------------- | ---------- | ------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | Lijst van ondersteunde locales in de applicatie.                                                    | `string[]` | `[Locales.ENGLISH]` | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                                                                                   |
| `requiredLocales` | Lijst van vereiste locales in de applicatie.                                                        | `string[]` | `[]`                | `[]`                 | • Indien leeg, zijn alle locales vereist in de `strict` modus.<br/>• Zorg ervoor dat vereiste locales ook zijn gedefinieerd in het veld `locales`.                                                                                                                                                                                                |
| `strictMode`      | Zorgt voor een robuuste implementatie van geinternationaliseerde content met behulp van TypeScript. | `string`   | `'inclusive'`       |                      | • Indien `"strict"`: de functie `t` vereist definitie van elke gedeclareerde locale — geeft een foutmelding als er een ontbreekt of niet gedeclareerd is.<br/>• Indien `"inclusive"`: waarschuwt voor ontbrekende locales, maar staat het gebruik van bestaande niet-gedeclareerde toe.<br/>• Indien `"loose"`: accepteert elke bestaande locale. |
| `defaultLocale`   | De standaard locale die wordt gebruikt als fallback als de gevraagde locale niet wordt gevonden.    | `string`   | `Locales.ENGLISH`   | `'en'`               | Wordt gebruikt om de locale te bepalen wanneer deze niet is opgegeven in de URL, cookie of header.                                                                                                                                                                                                                                                |

---

### Editorconfiguratie (Editor)

Definieert de instellingen voor de ingebouwde visuele editor, inclusief de serverpoort en inschakelingsstatus.

| Veld                         | Beschrijving                                                                                                                                                            | Type                              | Standaard                           | Voorbeeld                                                                                       | Opmerking                                                                                                                                                                                                                                                       |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | URL van de applicatie.                                                                                                                                                  | `string`                          | `undefined`                         | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Wordt gebruikt om de origin van de editor te beperken om veiligheidsredenen.<br/>• Indien ingesteld op `'*'`, is de editor toegankelijk vanaf elke origin.                                                                                                    |
| `port`                       | Poort die wordt gebruikt door de server van de visuele editor.                                                                                                          | `number`                          | `8000`                              |                                                                                                 |                                                                                                                                                                                                                                                                 |
| `editorURL`                  | URL van de editorserver.                                                                                                                                                | `string`                          | `'http://localhost:8000'`           | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Wordt gebruikt om origins te beperken die kunnen communiceren met de applicatie.<br/>• Indien ingesteld op `'*'`, is het toegankelijk vanaf elke origin.<br/>• Moet worden ingesteld als de poort is gewijzigd of de editor op een ander domein wordt gehost. |
| `cmsURL`                     | URL van de Intlayer CMS.                                                                                                                                                | `string`                          | `'https://app.intlayer.org'`        | `'https://app.intlayer.org'`                                                                    |                                                                                                                                                                                                                                                                 |
| `backendURL`                 | URL van de backendserver.                                                                                                                                               | `string`                          | `https://back.intlayer.org`         | `http://localhost:4000`                                                                         |                                                                                                                                                                                                                                                                 |
| `enabled`                    | Of de applicatie moet communiceren met de visuele editor.                                                                                                               | `boolean`                         | `false`                             | `process.env.NODE_ENV !== 'production'`                                                         | • Indien `false`, kan de editor niet communiceren met de applicatie.<br/>• Uitschakelen voor bepaalde omgevingen verhoogt de veiligheid.                                                                                                                        |
| `clientId`                   | Stelt intlayer-pakketten in staat om te authentiseren op de backend via oAuth2. Ga naar [intlayer.org/project](https://app.intlayer.org/project) voor uw toegangstoken. | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Moet geheim worden gehouden; gebruik omgevingsvariabelen.                                                                                                                                                                                                       |
| `clientSecret`               | Stelt intlayer-pakketten in staat om te authentiseren op de backend via oAuth2. Ga naar [intlayer.org/project](https://app.intlayer.org/project) voor uw toegangstoken. | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Moet geheim worden gehouden; gebruik omgevingsvariabelen.                                                                                                                                                                                                       |
| `dictionaryPriorityStrategy` | Strategie voor prioriteit van woordenboeken wanneer er zowel lokale als externe woordenboeken bestaan.                                                                  | `string`                          | `'local_first'`                     | `'distant_first'`                                                                               | • `'distant_first'`: geeft prioriteit aan externe woordenboeken boven lokale.<br/>• `'local_first'`: geeft prioriteit aan lokale woordenboeken boven externe.                                                                                                   |
| `liveSync`                   | Of de applicatieserver content onmiddellijk opnieuw moet laden bij detectie van wijzigingen in de CMS <br/> Visuele editor <br/> Backendserver.                         | `boolean`                         | `true`                              | `true`                                                                                          | • Bij toevoegen/bijwerken van een woordenboek vernieuwt de applicatie de pagina-inhoud.<br/>• Live Sync verplaatst content naar een andere server, wat de prestaties licht kan beinvloeden.<br/>• Het wordt aangeraden om beide op dezelfde machine te hosten.  |
| `liveSyncPort`               | Poort van de live sync server.                                                                                                                                          | `number`                          | `4000`                              | `4000`                                                                                          |                                                                                                                                                                                                                                                                 |
| `liveSyncURL`                | URL van de live sync server.                                                                                                                                            | `string`                          | `'http://localhost:{liveSyncPort}'` | `'https://example.com'`                                                                         | Verwijst standaard naar localhost; kan worden gewijzigd naar een externe live sync server.                                                                                                                                                                      |

---

### Routingconfiguratie (Routing)

Instellingen die het gedrag van routing regelen, inclusief URL-structuur, opslag van locales en beheer van middleware.

| Veld       | Beschrijving                                                                                                                                    | Type                                                                                                                                                                                                         | Standaard              | Voorbeeld                                                                                                                                                                                            | Opmerking                                                                                                                                                                                                                                                                         |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | URL routingmodus voor het beheer van locales.                                                                                                   | `'prefix-no-default'` &#124; <br/> `'prefix-all'` &#124; <br/> `'no-prefix'` &#124; <br/> `'search-params'`                                                                                                  | `'prefix-no-default'`  | `'prefix-no-default'`: `/dashboard` (en) of `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: locale wordt op andere manieren beheerd. `'search-params'`: `/dashboard?locale=fr` | Heeft geen invloed op het beheer van cookies of opslag van locales.                                                                                                                                                                                                               |
| `storage`  | Configuratie van de opslag van de locale op de client.                                                                                          | `false` &#124; <br/> `'cookie'` &#124; <br/> `'localStorage'` &#124; <br/> `'sessionStorage'` &#124; <br/> `'header'` &#124; <br/> `CookiesAttributes` &#124; <br/> `StorageAttributes` &#124; <br/> `Array` | `['cookie', 'header']` | `'localStorage'` <br/> `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                   | Zie de tabel met opslagparameters hieronder.                                                                                                                                                                                                                                      |
| `basePath` | Basispad voor de URL's van de applicatie.                                                                                                       | `string`                                                                                                                                                                                                     | `''`                   | `'/my-app'`                                                                                                                                                                                          | Als de applicatie op het adres `https://example.com/my-app` werkt, is basePath `'/my-app'` en worden URL's `https://example.com/my-app/en`.                                                                                                                                       |
| `rewrite`  | Aangepaste URL-herschrijfregels die de standaard routingmodus overschrijven voor specifieke paden. Ondersteunt dynamische parameters `[param]`. | `Record<string, StrictModeLocaleMap<string>>`                                                                                                                                                                | `undefined`            | Zie voorbeeld hieronder                                                                                                                                                                              | • Herschrijfregels hebben voorrang op `mode`.<br/>• Werkt met Next.js en Vite.<br/>• `getLocalizedUrl()` past automatisch de juiste regels toe.<br/>• Zie [Aangepaste URL-herschrijvingen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md). |

**Voorbeeld `rewrite`**:

```typescript
routing: {
  mode: "prefix-no-default", // Fallback-strategie
  rewrite: nextjsRewrite({
    "/about": {
      en: "/about",
      fr: "/a-propos",
    },
    "/product/[slug]": {
      en: "/product/[slug]",
      fr: "/produit/[slug]",
    },
    "/blog/[category]/[id]": {
      en: "/blog/[category]/[id]",
      fr: "/journal/[category]/[id]",
    },
  }),
}
```

#### Opslagparameters (Storage)

| Waarde             | Opmerking                                                                                                                                                                                                      | Beschrijving                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `'cookie'`         | • Zorg voor de juiste toestemming van de gebruiker voor naleving van de AVG.<br/>• Configureerbaar via `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`).       | Slaat de locale op in cookies — toegankelijk op zowel de client als de server.      |
| `'localStorage'`   | • Verloopt niet tenzij expliciet gewist.<br/>• Intlayer Proxy heeft hier geen toegang toe.<br/>• Configureerbaar via `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`).                  | Slaat de locale op in de browser zonder tijdslimiet — alleen aan de clientzijde.    |
| `'sessionStorage'` | • Wordt gewist bij het sluiten van het tabblad/venster.<br/>• Intlayer Proxy heeft hier geen toegang toe.<br/>• Configureerbaar via `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`). | Slaat de locale op voor de duur van de paginasessie — alleen aan de clientzijde.    |
| `'header'`         | • Handig voor API-aanroepen.<br/>• De clientzijde heeft hier geen toegang toe.<br/>• Configureerbaar via `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                                    | Slaat de locale op of geeft deze door via HTTP-headers — alleen aan de serverzijde. |

#### Cookie-attributen (Cookies Attributes)

Bij gebruik van opslag in cookies kunnen extra attributen worden ingesteld:

| Veld       | Beschrijving                                        | Type                                                  |
| ---------- | --------------------------------------------------- | ----------------------------------------------------- |
| `name`     | Naam van de cookie. Standaard: `'INTLAYER_LOCALE'`  | `string`                                              |
| `domain`   | Domein van de cookie. Standaard: `undefined`        | `string`                                              |
| `path`     | Pad van de cookie. Standaard: `undefined`           | `string`                                              |
| `secure`   | HTTPS vereisen. Standaard: `undefined`              | `boolean`                                             |
| `httpOnly` | Vlag HTTP-only. Standaard: `undefined`              | `boolean`                                             |
| `sameSite` | Beleid voor SameSite.                               | `'strict'` &#124; <br/> `'lax'` &#124; <br/> `'none'` |
| `expires`  | Vervaldatum of aantal dagen. Standaard: `undefined` | `Date` &#124; <br/> `number`                          |

#### Opslagattributen (Storage Attributes)

Bij gebruik van localStorage of sessionStorage:

| Veld   | Beschrijving                                                     | Type                                             |
| ------ | ---------------------------------------------------------------- | ------------------------------------------------ |
| `type` | Type opslag.                                                     | `'localStorage'` &#124; <br/> `'sessionStorage'` |
| `name` | Naam van de sleutel in de opslag. Standaard: `'INTLAYER_LOCALE'` | `string`                                         |

#### Configuratievoorbeelden

Hier zijn enkele veelvoorkomende configuratievoorbeelden voor de nieuwe v7-routingstructuur:

**Basisconfiguratie (standaard)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**Configuratie met naleving van de AVG**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: [
      {
        type: "localStorage",
        name: "user-locale",
      },
      {
        type: "cookie",
        name: "user-locale",
        secure: true,
        sameSite: "strict",
        httpOnly: false,
      },
    ],
    basePath: "",
  },
};

export default config;
```

**Modus zoekparameters (Search Params)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "search-params",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**Modus zonder voorvoegsel met aangepaste opslag**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "no-prefix",
    storage: {
      type: "sessionStorage",
      name: "app-locale",
    },
    basePath: "/my-app",
  },
};

export default config;
```

**Aangepaste URL-herschrijving met dynamische paden**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Fallback voor niet-herschreven paden
    storage: "cookie",
    rewrite: nextjsRewrite({
      "/about": {
        en: "/about",
        fr: "/a-propos",
      },
      "/product/[slug]": {
        en: "/product/[slug]",
        fr: "/produit/[slug]",
      },
      "/blog/[category]/[id]": {
        en: "/blog/[category]/[id]",
        fr: "/journal/[category]/[id]",
      },
    }),
  },
};

export default config;
```

---

### Contentconfiguratie (Content)

Instellingen met betrekking tot hoe content in de applicatie wordt beheerd, inclusief mapnamen, bestandsextensies en afgeleide configuraties.

| Veld             | Beschrijving                                                                                                       | Type       | Standaard                                                                                                                                                                 | Voorbeeld                                                                                                                                                                             | Opmerking                                                                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | Geeft aan of Intlayer wijzigingen in contentdeclaratiebestanden moet volgen voor regeneratie van de woordenboeken. | `boolean`  | `true`                                                                                                                                                                    |                                                                                                                                                                                       |                                                                                                                                                                                     |
| `fileExtensions` | Bestandsextensies voor het scannen tijdens de compilatie van woordenboeken.                                        | `string[]` | `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.json5', '.content.jsonc', '.content.tsx', '.content.jsx']`                     | `['.data.ts', '.data.js', '.data.json']`                                                                                                                                              | Aanpassing kan helpen conflicten te vermijden.                                                                                                                                      |
| `contentDir`     | Pad naar de map waar contentdefinitiebestanden (`.content.*`) worden bewaard.                                      | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library', require.resolve("@my-package/content")]`                                                                                                                 | Wordt gebruikt voor het volgen van contentbestanden en regeneratie van woordenboeken.                                                                                               |
| `codeDir`        | Pad naar de map waar code wordt bewaard, relatief aan de hoofdasmap.                                               | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library']`                                                                                                                                                         | • Wordt gebruikt voor het volgen van cadebestanden voor transformatie (verwijderen van onnodige delen, optimalisatie).<br/>• Scheiding van `contentDir` kan de prestaties verhogen. |
| `excludedPath`   | Mappen die zijn uitgesloten van het scannen van content.                                                           | `string[]` | `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']` |                                                                                                                                                                                       | Wordt nog niet gebruikt; gepland voor de toekomst.                                                                                                                                  |
| `formatCommand`  | Opdracht voor het formatteren van contentbestanden bij hun lokale schrijven door Intlayer.                         | `string`   | `undefined`                                                                                                                                                               | `'npx prettier --write "{{file}}" --log-level silent'` (Prettier), `'npx biome format "{{file}}" --write --log-level none'` (Biome), `'npx eslint --fix "{{file}}" --quiet'` (ESLint) | • `{{file}}` wordt vervangen door het pad naar het bestand.<br/>• Als het niet gedefinieerd is, bepaalt Intlayer dit automatisch (test prettier, biome, eslint).                    |

---

### Woordenboekconfiguratie (Dictionary)

Parameters die operaties met woordenboeken regelen, inclusief het gedrag bij automatisch invullen en het genereren van content.

| Veld                        | Beschrijving                                                                                                                                                                           | Type                                                                                                            | Standaard      | Voorbeeld                                                                                   | Opmerking                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | Beheert hoe de uitvoerbestanden van automatisch invullen (AI-vertaling) worden gegenereerd.                                                                                            | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `true`         | `{ en: '/locales/en/{{key}}.json', fr: ({ key }) => '/locales/fr/${key}.json', es: false }` | • `true`: standaardpad (hetzelfde bestand als de bron).<br/>• `false`: uitschakelen.<br/>• Sjabloon string/functie genereert bestanden per locale.<br/>• Object per locale: elke locale komt overeen met zijn sjabloon; `false` negeert deze locale.<br/>• Inclusie van `{{locale}}` activeert genereren per locale.<br/>• `fill` op woordenboek-niveau heeft altijd voorrang op deze globale instelling.      |
| `description`               | Helpt de editor en CMS het doel van het woordenboek te begrijpen. Wordt ook gebruikt als context voor het genereren van vertalingen met behulp van AI.                                 | `string`                                                                                                        | `undefined`    | `'User profile section'`                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                |
| `locale`                    | Transformeert het woordenboek naar een formaat voor een specifieke locale. Elk gedeclareerd veld wordt een vertaalnode. Indien afwezig, wordt het woordenboek als meertalig beschouwd. | `LocalesValues`                                                                                                 | `undefined`    | `'en'`                                                                                      | Gebruik dit als het woordenboek bedoeld is voor een specifieke locale, in plaats van meerdere vertalingen.                                                                                                                                                                                                                                                                                                     |
| `contentAutoTransformation` | Transformeert de contentstrings automatisch naar getypeerde nodes (markdown, HTML of invoeging).                                                                                       | `boolean` &#124; <br/> `{ markdown?: boolean; html?: boolean; insertion?: boolean }`                            | `false`        | `true`                                                                                      | • Markdown : `### Title` → `md('### Title')`.<br/>• HTML : `<div>Title</div>` → `html('<div>Title</div>')`.<br/>• Invoeging : `Hello {{name}}` → `insert('Hello {{name}}')`.                                                                                                                                                                                                                                   |
| `location`                  | Geeft aan waar de woordenboekbestanden worden bewaard en hoe ze worden gesynchroniseerd met de CMS.                                                                                    | `'local'` &#124; <br/> `'remote'` &#124; <br/> `'hybrid'` &#124; <br/> `'plugin'` &#124; <br/> `string`         | `'local'`      | `'hybrid'`                                                                                  | • `'local'`: alleen lokaal beheer.<br/>• `'remote'`: alleen extern beheer (CMS).<br/>• `'hybrid'`: zowel lokaal als extern beheer.<br/>• `'plugin'` of een aangepaste string: beheer door een plugin of aangepaste bron.                                                                                                                                                                                       |
| `importMode`                | Beheert de manier waarop woordenboeken worden geimporteerd.                                                                                                                            | `'static'` &#124; <br/> `'dynamic'` &#124; <br/> `'fetch'`                                                      | `'static'`     | `'dynamic'`                                                                                 | • `'static'`: statische import.<br/>• `'dynamic'`: dynamische import via Suspense.<br/>• `'fetch'`: ophalen via Live Sync API; uitstel tot `'dynamic'` bij mislukking.<br/>• Vereist plug-ins `@intlayer/babel` en `@intlayer/swc`.<br/>• Sleutels moeten statisch worden gedeclareerd.<br/>• Wordt genegeerd als `optimize` is uitgeschakeld.<br/>• Heeft geen invloed op `getIntlayer`, `getDictionary` enz. |
| `priority`                  | Prioriteit van het woordenboek. Hogere waarden winnen van lagere bij het oplossen van conflicten tussen woordenboeken.                                                                 | `number`                                                                                                        | `undefined`    | `1`                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                |
| `live`                      | Verouderd — gebruik `importMode: 'fetch'`. Geeft aan of de inhoud van het woordenboek dynamisch via de Live Sync API moet worden opgehaald.                                            | `boolean`                                                                                                       | `undefined`    |                                                                                             | Hernoemd naar `importMode: 'fetch'` in v8.0.0.                                                                                                                                                                                                                                                                                                                                                                 |
| `schema`                    | Automatisch gegenereerd door Intlayer voor validatie van het JSON-schema.                                                                                                              | `'https://intlayer.org/schema.json'`                                                                            | auto-generatie |                                                                                             | Niet handmatig bewerken.                                                                                                                                                                                                                                                                                                                                                                                       |
| `title`                     | Helpt bij het identificeren van het woordenboek in de editor en CMS.                                                                                                                   | `string`                                                                                                        | `undefined`    | `'User Profile'`                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                |
| `tags`                      | Categoriseert woordenboeken en biedt context of instructies voor de editor en AI.                                                                                                      | `string[]`                                                                                                      | `undefined`    | `['user', 'profile']`                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                |
| `version`                   | Versie van het externe woordenboek; helpt de momenteel gebruikte versie te volgen.                                                                                                     | `string`                                                                                                        | `undefined`    | `'1.0.0'`                                                                                   | • Beheerd in de CMS.<br/>• Niet lokaal bewerken.                                                                                                                                                                                                                                                                                                                                                               |

**Voorbeeld `fill`**:

```ts
dictionary: {
  fill: {
    en: "/locales/en/{{key}}.content.json",
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  },
};
```

---

### Loggerconfiguratie (Log)

Parameters voor het aanpassen van de loguitvoer van Intlayer.

| Veld     | Beschrijving                                | Type                                                           | Standaard       | Voorbeeld        | Opmerking                                                                                               |
| -------- | ------------------------------------------- | -------------------------------------------------------------- | --------------- | ---------------- | ------------------------------------------------------------------------------------------------------- |
| `mode`   | Geeft de loggermodus aan.                   | `'default'` &#124; <br/> `'verbose'` &#124; <br/> `'disabled'` | `'default'`     | `'verbose'`      | • `'verbose'`: logt meer informatie voor debuggen.<br/>• `'disabled'`: schakelt de logger volledig uit. |
| `prefix` | Voorvoegsel voor alle berichten in het log. | `string`                                                       | `'[intlayer] '` | `'[my prefix] '` |                                                                                                         |

---

### AI-configuratie (AI)

Instellingen die de AI-functies van Intlayer regelen, waaronder de provider, het model en de API-sleutel.

Deze configuratie is optioneel indien u geregistreerd bent in het [Intlayer Dashboard](https://app.intlayer.org/project) met een toegangssleutel. Intlayer zal automatisch de meest efficiente en kostenbesparende AI-oplossing voor uw behoeften beheren. Het gebruik van de standaardopties garandeert de beste ondersteuning op de lange termijn, aangezien Intlayer voortdurend wordt bijgewerkt om de meest actuele modellen te gebruiken.

Als u er de voorkeur aan geeft om uw eigen API-sleutel of een specifiek model te gebruiken, kunt u uw eigen AI-configuratie definieren.
Deze AI-configuratie wordt globaal gebruikt in uw Intlayer-omgeving. CLI-opdrachten zullen deze instellingen standaard gebruiken voor opdrachten zoals `fill`, net als de SDK, visuele editor en CMS. U kunt deze standaardwaarden voor specifieke use cases overschrijven via de parameters van de opdrachten.

Intlayer ondersteunt meerdere AI-providers voor maximale flexibiliteit. Momenteel worden de volgende providers ondersteund:

- **OpenAI** (Standaard)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Google AI Studio**
- **Google Vertex**
- **Meta Llama**
- **Ollama**
- **OpenRouter**
- **Alibaba Cloud**
- **Fireworks**
- **Hugging Face**
- **Groq**
- **Amazon Bedrock**
- **Together.ai**

| Veld                 | Beschrijving                                                                                                                        | Type                                                                                                                                                                                                                                                                                                                                                                                           | Standaard   | Voorbeeld                                                     | Opmerking                                                                                                                                                                                                   |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`           | Provider gebruikt voor AI-functies van Intlayer.                                                                                    | `'openai'` &#124; <br/> `'anthropic'` &#124; <br/> `'mistral'` &#124; <br/> `'deepseek'` &#124; <br/> `'gemini'` &#124; <br/> `'ollama'` &#124; <br/> `'openrouter'` &#124; <br/> `'alibaba'` &#124; <br/> `'fireworks'` &#124; <br/> `'groq'` &#124; <br/> `'huggingface'` &#124; <br/> `'bedrock'` &#124; <br/> `'googleaistudio'` &#124; <br/> `'googlevertex'` &#124; <br/> `'togetherai'` | `undefined` | `'anthropic'`                                                 | Verschillende providers vereisen verschillende API-sleutels en hebben verschillende prijzen.                                                                                                                |
| `model`              | Model gebruikt voor AI-functies.                                                                                                    | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Geen        | `'gpt-4o-2024-11-20'`                                         | Het specifieke model hangt af van de provider.                                                                                                                                                              |
| `temperature`        | Regelt de willekeur van de AI-antwoorden.                                                                                           | `number`                                                                                                                                                                                                                                                                                                                                                                                       | Geen        | `0.1`                                                         | Hogere temperatuur = creatiever en minder voorspelbaar.                                                                                                                                                     |
| `apiKey`             | Uw API-sleutel voor de gekozen provider.                                                                                            | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Geen        | `process.env.OPENAI_API_KEY`                                  | Moet geheim worden gehouden; gebruik omgevingsvariabelen.                                                                                                                                                   |
| `applicationContext` | Extra context over uw applicatie om de AI te helpen nauwkeurigere vertalingen te genereren (domein, doelgroep, toon, terminologie). | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Geen        | `'Mijn eigen applicatiecontext'`                              | Kan worden gebruikt om regels toe te voegen (bijv.: `"U moet URL's niet transformeren"`).                                                                                                                   |
| `baseURL`            | Basis URL voor de AI API.                                                                                                           | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Geen        | `'https://api.openai.com/v1'` <br/> `'http://localhost:5000'` | Kan verwijzen naar een lokaal of aangepast endpoint van de AI API.                                                                                                                                          |
| `dataSerialization`  | Formaat van de dataserialisatie voor AI-functies.                                                                                   | `'json'` &#124; <br/> `'toon'`                                                                                                                                                                                                                                                                                                                                                                 | `undefined` | `'toon'`                                                      | • `'json'`: standaard, betrouwbaar; verbruikt meer tokens.<br/>• `'toon'`: minder tokens, minder stabiel.<br/>• Extra parameters worden als context aan het model doorgegeven (redenaties-inspanning enz.). |

---

### Buildconfiguratie (Build)

Parameters die regelen hoe Intlayer de internationalisering van uw applicatie optimaliseert en compileert.

Build-opties worden toegepast op de plug-ins `@intlayer/babel` en `@intlayer/swc`.

> In ontwikkelingsmodus gebruikt Intlayer een statische import van woordenboeken om het ontwikkelingsproces te vereenvoudigen.

> Tijdens optimalisatie zal Intlayer aanroepen van woordenboeken vervangen voor optimalisatie van het splitsen van code (chunking), zodat de resulterende bundel alleen die woordenboeken importeert die daadwerkelijk worden gebruikt.

| Veld              | Beschrijving                                                                            | Type                             | Standaard                                                                                                                                                                         | Voorbeeld                                                                     | Opmerking                                                                                                                                                                                                                                                                                                                                             |
| ----------------- | --------------------------------------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | Beheert de buildmodus.                                                                  | `'auto'` &#124; <br/> `'manual'` | `'auto'`                                                                                                                                                                          | `'manual'`                                                                    | • `'auto'`: de build wordt automatisch gestart tijdens de build van de applicatie.<br/>• `'manual'`: wordt alleen uitgevoerd bij een expliciete build-opdracht.<br/>• Kan worden gebruikt om de build van woordenboeken uit te schakelen (bijv. om uitvoering in Node.js-omgevingen te stoppen).                                                      |
| `optimize`        | Beheert of er build-optimalisatie moet plaatsvinden.                                    | `boolean`                        | `undefined`                                                                                                                                                                       | `process.env.NODE_ENV === 'production'`                                       | • Indien niet gedefinieerd, wordt optimalisatie gestart bij de build van het framework (Vite/Next.js).<br/>• `true` forceert optimalisatie zelfs in dev-modus.<br/>• `false` schakelt het uit.<br/>• Indien ingeschakeld, vervangt het woordenboekaanroepen voor chunking-optimalisatie.<br/>• Vereist plug-ins `@intlayer/babel` en `@intlayer/swc`. |
| `checkTypes`      | Geeft aan of de build TypeScript types moet controleren en fouten moet loggen.          | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | Kan het buildproces vertragen.                                                                                                                                                                                                                                                                                                                        |
| `outputFormat`    | Beheert het uitvoerformaat van woordenboeken.                                           | `('esm' &#124; 'cjs')[]`         | `['esm', 'cjs']`                                                                                                                                                                  | `['cjs']`                                                                     |                                                                                                                                                                                                                                                                                                                                                       |
| `traversePattern` | Patronen die definieren welke bestanden tijdens de optimalisatie moeten worden gescand. | `string[]`                       | `['**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,svte}', '!**/node_modules/**', '!**/dist/**', '!**/.intlayer/**', '!**/*.config.*', '!**/*.test.*', '!**/*.spec.*', '!**/*.stories.*']` | `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']` | • Beperk de optimalisatie tot relevante bestanden voor het verhogen van de buildprestaties.<br/>• Zou worden genegeerd als `optimize` was uitgeschakeld.<br/>• Gebruikt glob-patronen.                                                                                                                                                                |

---

### Systeemconfiguratie (System)

Deze instellingen zijn bedoeld voor geavanceerde use cases en interne configuratie van Intlayer.

| Veld                      | Beschrijving                                       | Type     | Standaard                         | Voorbeeld | Opmerking |
| ------------------------- | -------------------------------------------------- | -------- | --------------------------------- | --------- | --------- |
| `dictionariesDir`         | Map voor de gecompileerde woordenboeken.           | `string` | `'.intlayer/dictionary'`          |           |           |
| `moduleAugmentationDir`   | Map voor TypeScript module uitbreidingen.          | `string` | `'.intlayer/types'`               |           |           |
| `unmergedDictionariesDir` | Map voor het opslaan van ongevouwen woordenboeken. | `string` | `'.intlayer/unmerged_dictionary'` |           |           |
| `typesDir`                | Map voor gegenereerde types.                       | `string` | `'.intlayer/types'`               |           |           |
| `mainDir`                 | Map van het Intlayer hoofdbestand.                 | `string` | `'.intlayer/main'`                |           |           |
| `configDir`               | Map van de gecompileerde configuratiebestanden.    | `string` | `'.intlayer/config'`              |           |           |
| `cacheDir`                | Map voor cachebestanden.                           | `string` | `'.intlayer/cache'`               |           |           |

---

### Compilerconfiguratie (Compiler)

Instellingen die de Intlayer-compiler regelen, die woordenboeken rechtstreeks uit uw componenten extraheert.

| Veld                  | Beschrijving                                                                                                                                                                                                                                                                                                                  | Type                                                                                                            | Standaard   | Voorbeeld                                                                                                                                                | Opmerking                                                                                                                                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`             | Geeft aan of de compiler moet worden ingeschakeld voor de extractie van woordenboeken.                                                                                                                                                                                                                                        | `boolean` &#124; <br/> `'build-only'`                                                                           | `true`      | `'build-only'`                                                                                                                                           | `'build-only'` slaat de compiler over tijdens ontwikkeling voor een snellere build; wordt alleen uitgevoerd bij build-opdrachten.                                                                               |
| `dictionaryKeyPrefix` | Voorvoegsel voor geextraheerde woordenboeksleutels.                                                                                                                                                                                                                                                                           | `string`                                                                                                        | `''`        | `'my-prefix-'`                                                                                                                                           | Wordt toegevoegd aan de gegenereerde sleutel (gebaseerd op de bestandsnaam) om conflicten te voorkomen.                                                                                                         |
| `saveComponents`      | Of componenten moeten worden opgeslagen na hun transformatie.                                                                                                                                                                                                                                                                 | `boolean`                                                                                                       | `false`     |                                                                                                                                                          | • Indien `true`, overschrijft het de originele bestanden met hun getransformeerde versies.<br/>• De compiler kan na eenmalige uitvoering worden verwijderd.                                                     |
| `output`              | Definieert het pad voor de uitvoerbestanden. Vervangt `outputDir`. Ondersteunt variabele sjablonen: `{{fileName}}`, <br/> `{{key}}`, <br/> `{{locale}}`, <br/> `{{extension}}`, <br/> `{{componentFileName}}`, <br/> `{{componentExtension}}`, <br/> `{{format}}`, <br/> `{{componentFormat}}`, <br/> `{{componentDirPath}}`. | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `undefined` | `'./{{fileName}}{{extension}}'` <br/> `'/locales/{{locale}}/{{key}}.json'` <br/> `{ en: ({ key }) => './locales/en/${key}.json', fr: '...', es: false }` | • Paden `./` worden relatief aan de map van de component opgelost.<br/>• Paden `/` relatief aan de hoofdasmap.<br/>• `{{locale}}` omvat generatie per locale.<br/>• Ondersteunt objectnotatie voor elke locale. |
| `noMetadata`          | Indien `true`, laat de compiler woordenboekmetadata (sleutel, contentwrapper) weg uit de uitvoer.                                                                                                                                                                                                                             | `boolean`                                                                                                       | `false`     | `false` → `{"key":"my-key","content":{"key":"value"}}` <br/> `true` → `{"key":"value"}`                                                                  | • Handig voor uitvoer in i18next-formaat of ICU MessageFormat JSON.<br/>• Werkt goed samen met de plug-in `loadJSON`.                                                                                           |
| `dictionaryKeyPrefix` | Voorvoegsel voor woordenboeksleutel                                                                                                                                                                                                                                                                                           | `string`                                                                                                        | `''`        |                                                                                                                                                          | Optionele prefix toevoegen voor geextraheerde woordenboeksleutels                                                                                                                                               |

---

### Aangepaste schema's (Custom Schemas)

| Veld      | Beschrijving                                                                                         | Type                        |
| --------- | ---------------------------------------------------------------------------------------------------- | --------------------------- |
| `schemas` | Stelt u in staat om Zod-schema's te definieren voor validatie van de structuur van uw woordenboeken. | `Record<string, ZodSchema>` |

---

### Plug-ins (Plugins)

| Veld      | Beschrijving                                | Type               |
| --------- | ------------------------------------------- | ------------------ |
| `plugins` | Lijst van Intlayer plug-ins om op te nemen. | `IntlayerPlugin[]` |
