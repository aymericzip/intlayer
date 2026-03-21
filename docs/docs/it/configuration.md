---
createdAt: 2024-08-13
updatedAt: 2026-03-20
title: Configurazione (Configuration)
description: Scopri come configurare Intlayer per la tua applicazione. Comprendi le varie impostazioni e opzioni disponibili per personalizzare Intlayer in base alle tue esigenze.
keywords:
  - Configurazione
  - Impostazioni
  - Personalizzazione
  - Intlayer
  - Opzioni
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.4.0
    date: 2026-03-20
    changes: Aggiunta la notazione per oggetto per locale per 'compiler.output' e 'dictionary.fill'
  - version: 8.3.0
    date: 2026-03-11
    changes: Spostato 'baseDir' dalla configurazione 'content' alla configurazione 'system'
  - version: 8.2.0
    date: 2026-03-09
    changes: Aggiornate le opzioni del compilatore (compiler), aggiunto il supporto per 'output' e 'noMetadata'
  - version: 8.1.7
    date: 2026-02-25
    changes: Aggiornate le opzioni del compilatore
  - version: 8.1.5
    date: 2026-02-23
    changes: Aggiunta l'opzione del compilatore 'build-only' e il prefisso del dizionario
  - version: 8.0.6
    date: 2026-02-12
    changes: Aggiunto il supporto per i fornitori Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face e Together.ai
  - version: 8.0.5
    date: 2026-02-06
    changes: Aggiunto `dataSerialization` alla configurazione AI
  - version: 8.0.0
    date: 2026-01-24
    changes: Rinominata la modalità di importazione `live` in `fetch` per descrivere meglio il meccanismo sottostante.
  - version: 8.0.0
    date: 2026-01-22
    changes: Spostata la configurazione di build `importMode` nella configurazione `dictionary`.
  - version: 8.0.0
    date: 2026-01-22
    changes: Aggiunta l'opzione `rewrite` alla configurazione del routing
  - version: 8.0.0
    date: 2026-01-18
    changes: Separata la configurazione di sistema dalla configurazione di contenuto. Spostati i percorsi interni nella proprietà `system`. Aggiunto `codeDir` per separare i file di contenuto e la trasformazione del codice.
  - version: 8.0.0
    date: 2026-01-18
    changes: Aggiunte le opzioni del dizionario `location` e `schema`
  - version: 7.5.1
    date: 2026-01-10
    changes: Aggiunto il supporto per i formati di file JSON5 e JSONC
  - version: 7.5.0
    date: 2025-12-17
    changes: Aggiunta l'opzione `buildMode`
  - version: 7.0.0
    date: 2025-10-25
    changes: Aggiunta la configurazione `dictionary`
  - version: 7.0.0
    date: 2025-10-21
    changes: Sostituito `middleware` con la configurazione del routing `routing`
  - version: 7.0.0
    date: 2025-10-12
    changes: Aggiunta l'opzione `formatCommand`
  - version: 6.2.0
    date: 2025-10-12
    changes: Aggiornata l'opzione `excludedPath`
  - version: 6.0.2
    date: 2025-09-23
    changes: Aggiunta l'opzione `outputFormat`
  - version: 6.0.0
    date: 2025-09-21
    changes: Rimossi il campo `dictionaryOutput` e il campo `i18nextResourcesDir`
  - version: 6.0.0
    date: 2025-09-16
    changes: Aggiunta la modalità di importazione `live`
  - version: 6.0.0
    date: 2025-09-04
    changes: Sostituito il campo `hotReload` con `liveSync`, e aggiunti i campi `liveSyncPort` e `liveSyncURL`
  - version: 5.6.1
    date: 2025-07-25
    changes: Sostituito `activateDynamicImport` con l'opzione `importMode`
  - version: 5.6.0
    date: 2025-07-13
    changes: Modificato il contentDir predefinito da `['src']` a `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: Aggiunti i comandi `docs`
---

# Documentazione della Configurazione di Intlayer

## Panoramica

I file di configurazione di Intlayer consentono di personalizzare vari aspetti del plugin, come l'internazionalizzazione (internationalization), il middleware e la gestione dei contenuti. Questa documentazione fornisce una descrizione approfondita di ogni proprietà nella configurazione.

---

## Tabella dei Contenuti

<TOC/>

---

## Formati dei file di configurazione supportati

Intlayer accetta i formati di file di configurazione JSON, JS, MJS e TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Esempio di file di configurazione

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * Esempio di file di configurazione Intlayer che mostra tutte le opzioni disponibili.
 */
const config: IntlayerConfig = {
  /**
   * Configurazione delle impostazioni di internazionalizzazione.
   */
  internationalization: {
    /**
     * Elenco delle locali (locales) supportate nell'applicazione.
     * Predefinito: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * Elenco delle locali obbligatorie che devono essere definite in ogni dizionario.
     * Se vuoto, tutte le locali sono obbligatorie in modalità `strict`.
     * Predefinito: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Livello di rigore per il contenuto internazionalizzato.
     * - "strict": Errore se manca una locale dichiarata o se non è dichiarata.
     * - "inclusive": Avviso se manca una locale dichiarata.
     * - "loose": Accetta qualsiasi locale esistente.
     * Predefinito: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * La locale predefinita utilizzata come fallback nel caso in cui la locale richiesta non venga trovata.
     * Predefinito: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Impostazioni che controllano le operazioni del dizionario e il comportamento di fallback.
   */
  dictionary: {
    /**
     * Controlla come vengono importati i dizionari.
     * - "static": Importato staticamente al momento della build.
     * - "dynamic": Importato dinamicamente usando Suspense.
     * - "fetch": Recuperato dinamicamente tramite la Live Sync API.
     * Predefinito: "static"
     */
    importMode: "static",

    /**
     * Strategia per compilare automaticamente le traduzioni mancanti usando l'AI.
     * Può essere un valore booleano o un pattern di percorso per salvare il contenuto compilato.
     * Predefinito: true
     */
    fill: true,

    /**
     * La posizione fisica dei file del dizionario.
     * - "local": Memorizzato nel file system locale.
     * - "remote": Memorizzato nell'Intlayer CMS.
     * - "hybrid": Memorizzato sia localmente che nell'Intlayer CMS.
     * - "plugin" (o qualsiasi stringa personalizzata): Fornita da un plugin o da una sorgente personalizzata.
     * Predefinito: "local"
     */
    location: "local",

    /**
     * Se il contenuto debba essere trasformato automaticamente (es. da Markdown a HTML).
     * Predefinito: false
     */
    contentAutoTransformation: false,
  },

  /**
   * Configurazione del routing e del middleware.
   */
  routing: {
    /**
     * Strategia di routing per le locali.
     * - "prefix-no-default": Aggiunge un prefisso a tutte le locali tranne quella predefinita (es. /dashboard, /fr/dashboard).
     * - "prefix-all": Aggiunge un prefisso a tutte le locali (es. /en/dashboard, /fr/dashboard).
     * - "no-prefix": Nessuna locale nell'URL.
     * - "search-params": Usa ?locale=...
     * Predefinito: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Dove memorizzare la locale selezionata dall'utente.
     * Opzioni: 'cookie', 'localStorage', 'sessionStorage', 'header' o un array di questi.
     * Predefinito: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Il percorso di base per gli URL dell'applicazione.
     * Predefinito: ""
     */
    basePath: "",

    /**
     * Regole di rewrite URL personalizzate per percorsi specifici per locale.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * Impostazioni relative alla ricerca e all'elaborazione dei file di contenuto.
   */
  content: {
    /**
     * Estensioni dei file per la scansione dei dizionari.
     * Predefinito: ['.content.ts', '.content.js', '.content.json', ecc.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Directory in cui si trovano i file .content.
     * Predefinito: ["."]
     */
    contentDir: ["src"],

    /**
     * Dove si trova il codice sorgente.
     * Utilizzato per l'ottimizzazione della build e la trasformazione del codice.
     * Predefinito: ["."]
     */
    codeDir: ["src"],

    /**
     * Pattern esclusi dalla scansione.
     * Predefinito: ['node_modules', '.intlayer', ecc.]
     */
    excludedPath: ["node_modules"],

    /**
     * Se monitorare le modifiche e ricostruire i dizionari durante lo sviluppo.
     * Predefinito: true in modalità sviluppo
     */
    watch: true,

    /**
     * Comando utilizzato per formattare i file .content appena creati / aggiornati.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Configurazione dell'Editor Visuale (Visual Editor).
   */
  editor: {
    /**
     * Se l'editor visuale è abilitato.
     * Predefinito: false
     */
    enabled: true,

    /**
     * L'URL della tua applicazione per la validazione dell'origine (origin validation).
     * Predefinito: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * Porta per il server dell'editor locale.
     * Predefinito: 8000
     */
    port: 8000,

    /**
     * L'URL pubblico per l'editor.
     * Predefinito: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * URL dell'Intlayer CMS.
     * Predefinito: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * URL dell'API Backend.
     * Predefinito: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Se abilitare la sincronizzazione dei contenuti in tempo reale.
     * Predefinito: false
     */
    liveSync: true,
  },

  /**
   * Impostazioni per la traduzione e la creazione basate sull'AI.
   */
  ai: {
    /**
     * Il fornitore AI da utilizzare.
     * Opzioni: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Predefinito: 'openai'
     */
    provider: "openai",

    /**
     * Modello del fornitore selezionato da utilizzare.
     */
    model: "gpt-4o",

    /**
     * Chiave API del fornitore.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Contesto globale per guidare l'AI nella creazione delle traduzioni.
     */
    applicationContext:
      "Questa è un'applicazione per la prenotazione di viaggi.",

    /**
     * URL del percorso di base per l'API AI.
     */
    baseURL: "http://localhost:3000",

    /**
     * Serializzazione dei dati (Data Serialization)
     *
     * Opzioni:
     * - "json": Predefinito, robusto; consuma più token.
     * - "toon": Consuma meno token, potrebbe non essere coerente come JSON.
     *
     * Predefinito: "json"
     */
    dataSerialization: "json",
  },

  /**
   * Impostazioni di build e ottimizzazione.
   */
  build: {
    /**
     * Modalità di esecuzione della build.
     * - "auto": Viene compilato automaticamente durante la build dell'applicazione.
     * - "manual": Richiede un comando di build esplicito.
     * Predefinito: "auto"
     */
    mode: "auto",

    /**
     * Se ottimizzare il bundle finale rimuovendo i dizionari inutilizzati.
     * Predefinito: true in produzione
     */
    optimize: true,

    /**
     * Formato di output per i file del dizionario generati.
     * Predefinito: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Indica se la build debba controllare i tipi TypeScript.
     * Predefinito: false
     */
    checkTypes: false,
  },

  /**
   * Configurazione del log (Logger).
   */
  log: {
    /**
     * Livello di log.
     * - "default": Logging standard.
     * - "verbose": Logging di debug approfondito.
     * - "disabled": Disabilita il logging.
     * Predefinito: "default"
     */
    mode: "default",

    /**
     * Prefisso per tutti i messaggi di log.
     * Predefinito: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * Configurazione di sistema (per uso avanzato)
   */
  system: {
    /**
     * Directory per memorizzare i dizionari localizzati.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Directory per il TypeScript module augmentation.
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Directory per memorizzare i dizionari non fusi (unmerged).
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Directory per memorizzare i tipi di dizionario.
     */
    typesDir: ".intlayer/types",

    /**
     * Directory in cui vengono memorizzati i file principali dell'applicazione.
     */
    mainDir: ".intlayer/main",

    /**
     * Directory in cui vengono memorizzati i file di configurazione.
     */
    configDir: ".intlayer/config",

    /**
     * Directory in cui vengono memorizzati i file di cache.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Configurazione del Compilatore (Per uso avanzato)
   */
  compiler: {
    /**
     * Indica se il compilatore debba essere abilitato.
     *
     * - false: Disabilita il compilatore.
     * - true: Abilita il compilatore.
     * - "build-only": Salta il compilatore durante lo sviluppo e accelera il tempo di avvio.
     *
     * Predefinito: false
     */
    enabled: true,

    /**
     * Definisce il percorso per i file di output. Sostituisce `outputDir`.
     *
     * - I percorsi con `./` sono risolti rispetto alla directory del componente.
     * - I percorsi con `/` sono risolti rispetto alla radice del progetto (`baseDir`).
     *
     * - L'inclusione della variabile `{{locale}}` nel percorso attiverà la creazione di dizionari separati per lingua.
     *
     * Esempio:
     * ```ts
     * {
     *   // Crea file .content.ts multilingue accanto al componente
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Equivalente usando una template string
     * }
     * ```
     *
     * ```ts
     * {
     *   // Crea JSON centralizzati per lingua nella radice del progetto
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Equivalente usando una template string
     * }
     * ```
     *
     * Elenco delle variabili:
     *   - `fileName`: Nome del file.
     *   - `key`: Chiave del contenuto.
     *   - `locale`: Locale del contenuto.
     *   - `extension`: Estensione del file.
     *   - `componentFileName`: Nome del file del componente.
     *   - `componentExtension`: Estensione del file del componente.
     *   - `format`: Formato del dizionario.
     *   - `componentFormat`: Formato del dizionario del componente.
     *   - `componentDirPath`: Percorso della directory del componente.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Indica se i componenti debbano essere salvati dopo essere stati trasformati.
     * In questo modo, il compilatore può essere eseguito una sola volta per trasformare l'applicazione e poi rimosso.
     */
    saveComponents: false,

    /**
     * Inserisce solo il contenuto nel file generato. Utile per l'output JSON per lingua per i18next o ICU MessageFormat.
     */
    noMetadata: false,

    /**
     * Prefisso della chiave del dizionario
     */
    dictionaryKeyPrefix: "", // Aggiungi un prefisso opzionale alle chiavi del dizionario estratte
  },

  /**
   * Schemi personalizzati (Schemas) per validare il contenuto dei dizionari.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Configurazione dei plugin (Plugins).
   */
  plugins: [],
};

export default config;
````

---

## Riferimento della Configurazione (Configuration Reference)

Le sezioni seguenti descrivono le varie opzioni di configurazione disponibili in Intlayer.

---

### Configurazione di Internazionalizzazione (Internationalization Configuration)

Definisce le impostazioni relative all'internazionalizzazione, incluse le locali disponibili e la locale predefinita per l'applicazione.

| Campo             | Tipo       | Descrizione                                                                                                              | Esempio              | Nota                                                                                                                                                                                                                                                                                        |
| ----------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | `string[]` | Elenco delle locali supportate nell'applicazione. Predefinito: `[Locales.ENGLISH]`                                       | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                             |
| `requiredLocales` | `string[]` | Elenco delle locali obbligatorie nell'applicazione. Predefinito: `[]`                                                    | `[]`                 | Se vuoto, tutte le locali sono obbligatorie in modalità `strict`. Assicurati che le locali obbligatorie siano definite anche nel campo `locales`.                                                                                                                                           |
| `strictMode`      | `string`   | Garantisce un'implementazione robusta del contenuto internazionalizzato utilizzando TypeScript. Predefinito: `inclusive` |                      | Se `"strict"`: la funzione `t` richiede che ogni locale dichiarata sia definita — genera un errore se ne manca una o se non è dichiarata. Se `"inclusive"`: avverte per le locali mancanti ma accetta le locali esistenti non dichiarate. Se `"loose"`: accetta qualsiasi locale esistente. |
| `defaultLocale`   | `string`   | Locale predefinita utilizzata come fallback se la locale richiesta non viene trovata. Predefinito: `Locales.ENGLISH`     | `'en'`               | Utilizzata per determinare la locale quando non ne viene specificata nessuna in URL, cookie o intestazione (header).                                                                                                                                                                        |

---

### Configurazione dell'Editor (Editor Configuration)

Definisce le impostazioni relative all'editor integrato, inclusa la porta del server e lo stato di attività.

| Campo                        | Tipo                      | Descrizione                                                                                                                                                                                                   | Esempio                                                                               | Nota                                                                                                                                                                                                                                                             |
| ---------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | `string`                  | L'URL della tua applicazione. Predefinito: `''`                                                                                                                                                               | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Utilizzato per limitare le origini (origins) dell'editor per motivi di sicurezza. Se impostato su `'*'`, l'editor è accessibile da qualsiasi origine.                                                                                                            |
| `port`                       | `number`                  | Porta utilizzata dal server dell'Editor Visuale. Predefinito: `8000`                                                                                                                                          |                                                                                       |                                                                                                                                                                                                                                                                  |
| `editorURL`                  | `string`                  | URL del server dell'editor. Predefinito: `'http://localhost:8000'`                                                                                                                                            | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Utilizzato per limitare le origini che possono interagire con l'applicazione. Se impostato su `'*'`, accessibile da qualsiasi origine. Deve essere impostato se si cambia porta o se l'editor è ospitato su un dominio diverso.                                  |
| `cmsURL`                     | `string`                  | URL dell'Intlayer CMS. Predefinito: `'https://intlayer.org'`                                                                                                                                                  | `'https://intlayer.org'`                                                              |                                                                                                                                                                                                                                                                  |
| `backendURL`                 | `string`                  | URL del server backend. Predefinito: `https://back.intlayer.org`                                                                                                                                              | `http://localhost:4000`                                                               |                                                                                                                                                                                                                                                                  |
| `enabled`                    | `boolean`                 | Indica se l'app interagirà con l'editor visuale. Predefinito: `true`                                                                                                                                          | `process.env.NODE_ENV !== 'production'`                                               | Se `false`, l'editor non può interagire con l'app. Disabilitarlo per ambienti specifici migliora la sicurezza.                                                                                                                                                   |
| `clientId`                   | `string &#124; undefined` | Consente ai pacchetti intlayer di autenticarsi con il backend utilizzando oAuth2. Per ricevere un token di accesso, vai su [intlayer.org/project](https://app.intlayer.org/project). Predefinito: `undefined` |                                                                                       | Tienilo segreto; memorizzalo nelle variabili d'ambiente.                                                                                                                                                                                                         |
| `clientSecret`               | `string &#124; undefined` | Consente ai pacchetti intlayer di autenticarsi con il backend utilizzando oAuth2. Per ricevere un token di accesso, vai su [intlayer.org/project](https://app.intlayer.org/project). Predefinito: `undefined` |                                                                                       | Tienilo segreto; memorizzalo nelle variabili d'ambiente.                                                                                                                                                                                                         |
| `dictionaryPriorityStrategy` | `string`                  | Strategia per dare priorità ai dizionari quando esistono sia dizionari locali che remoti. Predefinito: `'local_first'`                                                                                        | `'distant_first'`                                                                     | `'distant_first'`: Priorità ai remoti rispetto ai locali. `'local_first'`: Priorità ai locali rispetto ai remoti.                                                                                                                                                |
| `liveSync`                   | `boolean`                 | Indica se il server dell'applicazione debba ricaricare i contenuti a caldo quando viene rilevata una modifica nel CMS / Editor Visuale / Backend. Predefinito: `true`                                         | `true`                                                                                | Quando un dizionario viene aggiunto/aggiornato, l'app aggiorna il contenuto della pagina. Il live sync esternalizza il contenuto a un altro server, il che può influire leggermente sulle prestazioni. Si raccomanda di ospitare entrambi sulla stessa macchina. |
| `liveSyncPort`               | `number`                  | Porta del server Live Sync. Predefinito: `4000`                                                                                                                                                               | `4000`                                                                                |                                                                                                                                                                                                                                                                  |
| `liveSyncURL`                | `string`                  | URL del server Live Sync. Predefinito: `'http://localhost:{liveSyncPort}'`                                                                                                                                    | `'https://example.com'`                                                               | Punta a localhost per impostazione predefinita; può essere modificato in un server Live Sync remoto.                                                                                                                                                             |

### Configurazione del Routing (Routing Configuration)

Impostazioni che controllano il comportamento del routing, inclusa la struttura URL, la memorizzazione della locale e la gestione del middleware.

| Campo      | Tipo                                                                                                                                                 | Descrizione                                                                                                                                                                       | Esempio                                                                                                                                                                                                     | Nota                                                                                                                                                                                                                                                                            |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `'prefix-no-default' &#124; 'prefix-all' &#124; 'no-prefix' &#124; 'search-params'`                                                                  | Modalità di routing URL per la gestione delle locali. Predefinito: `'prefix-no-default'`                                                                                          | `'prefix-no-default'`: `/dashboard` (en) o `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: la locale viene gestita tramite altri mezzi. `'search-params'`: usa `/dashboard?locale=fr` | Non influisce sulla gestione dei cookie o sul locale storage.                                                                                                                                                                                                                   |
| `storage`  | `false &#124; 'cookie' &#124; 'localStorage' &#124; 'sessionStorage' &#124; 'header' &#124; CookiesAttributes &#124; StorageAttributes &#124; Array` | Configurazione per memorizzare la locale sul client. Predefinito: `['cookie', 'header']`                                                                                          | `'localStorage'`, `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                               | Vedi la tabella delle Opzioni di Memoria sotto.                                                                                                                                                                                                                                 |
| `basePath` | `string`                                                                                                                                             | Il percorso di base per gli URL dell'applicazione. Predefinito: `''`                                                                                                              | `'/my-app'`                                                                                                                                                                                                 | Se l'applicazione è su `https://example.com/my-app`, basePath è `'/my-app'` e gli URL diventano come `https://example.com/my-app/en`.                                                                                                                                           |
| `rewrite`  | `Record<string, StrictModeLocaleMap<string>>`                                                                                                        | Regole di rewrite URL personalizzate che sovrascrivono la modalità di routing predefinita per percorsi specifici. Supporta parametri dinamici `[param]`. Predefinito: `undefined` | Vedi esempio sotto                                                                                                                                                                                          | Le regole di rewrite hanno la precedenza su `mode`. Funziona con Next.js e Vite. `getLocalizedUrl()` applica automaticamente le regole corrispondenti. Vedi [Rewrite URL Personalizzati](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/custom_url_rewrites.md). |

**Esempio di `rewrite`**:

```typescript
routing: {
  mode: "prefix-no-default", // Strategia di fallback
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

#### Opzioni di Memoria (Storage Options)

| Valore             | Descrizione                                                                   | Nota                                                                                                                                                                                                           |
| ------------------ | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'cookie'`         | Salva la locale nei cookie — accessibile sia lato client che lato server.     | Per la conformità GDPR, assicurati di ottenere il consenso appropriato dell'utente. Personalizzabile tramite `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`). |
| `'localStorage'`   | Salva la locale nel browser senza data di scadenza — solo lato client.        | Non scade finché non viene esplicitamente cancellato. Il proxy Intlayer non può accedervi. Personalizzabile tramite `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`).                   |
| `'sessionStorage'` | Salva la locale per la durata della sessione della pagina — solo lato client. | Cancellato quando si chiude la scheda/finestra. Il proxy Intlayer non può accedervi. Personalizzabile tramite `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`).                       |
| `'header'`         | Salva o trasmette la locale tramite intestazioni HTTP — solo lato server.     | Utile per le chiamate API. Il lato client non può accedervi. Personalizzabile tramite `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                                                       |

#### Attributi del Cookie (Cookie Attributes)

Quando si utilizza la memorizzazione tramite cookie, è possibile configurare attributi aggiuntivi:

| Campo      | Tipo                                  | Descrizione                                                   |
| ---------- | ------------------------------------- | ------------------------------------------------------------- |
| `name`     | `string`                              | Nome del cookie. Predefinito: `'INTLAYER_LOCALE'`             |
| `domain`   | `string`                              | Dominio del cookie. Predefinito: `undefined`                  |
| `path`     | `string`                              | Percorso del cookie. Predefinito: `undefined`                 |
| `secure`   | `boolean`                             | Richiede HTTPS. Predefinito: `undefined`                      |
| `httpOnly` | `boolean`                             | Flag HTTP-only. Predefinito: `undefined`                      |
| `sameSite` | `'strict' &#124; 'lax' &#124; 'none'` | Politica SameSite.                                            |
| `expires`  | `Date &#124; number`                  | Data di scadenza o numero di giorni. Predefinito: `undefined` |

#### Attributi del Locale Storage (Locale Storage Attributes)

Quando si utilizza localStorage o sessionStorage:

| Campo  | Tipo                                     | Descrizione                                                   |
| ------ | ---------------------------------------- | ------------------------------------------------------------- |
| `type` | `'localStorage' &#124; 'sessionStorage'` | Tipo di memoria.                                              |
| `name` | `string`                                 | Nome della chiave memoriale. Predefinito: `'INTLAYER_LOCALE'` |

#### Esempi di Configurazione

Ecco alcuni esempi comuni di configurazione per la nuova struttura di routing v7:

**Configurazione di Base (Predefinita)**:

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

**Configurazione conforme alla GDPR**:

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

**Modalità Parametri di Ricerca (Search Parameters Mode)**:

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

**Modalità Senza Prefisso (No Prefix Mode) con memoria personalizzata**:

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

**Rewrite URL personalizzato con percorsi dinamici**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Strategia di fallback per i percorsi non riscritti
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

### Configurazione di Contenuto (Content Configuration)

Impostazioni relative all'elaborazione dei contenuti all'interno dell'applicazione (nomi di directory, estensioni di file e configurazioni derivate).

| Campo            | Tipo       | Descrizione                                                                                                                                                                                                                 | Esempio                             | Nota                                                                                                                                                |
| ---------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | `boolean`  | Indica se Intlayer debba monitorare le modifiche nei file di dichiarazione del contenuto per ricostruire i dizionari. Predefinito: `process.env.NODE_ENV === 'development'`                                                 |                                     |                                                                                                                                                     |
| `fileExtensions` | `string[]` | Estensioni dei file utilizzate per la scansione dei file di dichiarazione del contenuto. Predefinito: `['.content.ts', '.content.js', '.content.mjs', '.content.cjs', '.content.json', '.content.json5', '.content.jsonc']` | `['.content.ts', '.content.js']`    |                                                                                                                                                     |
| `contentDir`     | `string[]` | Percorsi alle directory in cui si trovano i file di dichiarazione del contenuto. Predefinito: `['.']`                                                                                                                       | `['src/content']`                   |                                                                                                                                                     |
| `codeDir`        | `string[]` | Percorsi alle directory in cui si trovano i file del codice sorgente della tua applicazione. Predefinito: `['.']`                                                                                                           | `['src']`                           | Utilizzato per ottimizzare la build e garantire che la trasformazione del codice e il ricaricamento a caldo siano applicati solo ai file necessari. |
| `excludedPath`   | `string[]` | Percorsi esclusi dalla scansione dei contenuti. Predefinito: `['node_modules', '.intlayer', '.next', 'dist', 'build']`                                                                                                      | `['src/styles']`                    |                                                                                                                                                     |
| `formatCommand`  | `string`   | Comando che verrà eseguito per formattare i file di contenuto appena creati o aggiornati. Predefinito: `undefined`                                                                                                          | `'npx prettier --write "{{file}}"'` | Utilizzato durante l'estrazione del contenuto o tramite l'editor visuale.                                                                           |

---

### Configurazione del Dizionario (Dictionary Configuration)

Impostazioni che controllano le operazioni dei dizionari, incluso il comportamento del riempimento automatico e la generazione dei contenuti.

Questa configurazione del dizionario ha due scopi principali:

1. **Valori predefiniti**: Definire i valori predefiniti durante la creazione dei file di dichiarazione del contenuto.
2. **Comportamento di fallback**: Fornire valori di fallback quando campi specifici non sono definiti, consentendo di definire globalmente il comportamento delle operazioni sui dizionari.

Per ulteriori informazioni sui file di dichiarazione del contenuto e su come vengono applicati i valori di configurazione, consultare la [documentazione dei file di contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

| Campo                       | Tipo                                                                                            | Descrizione                                                                                                      | Esempio            | Nota                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | `boolean &#124; FilePathPattern &#124; Partial<Record<Locale, boolean &#124; FilePathPattern>>` | Controlla come vengono generati i file di output del riempimento automatico (traduzione AI). Predefinito: `true` | Vedi esempio sotto | `true`: Percorso predefinito (stesso file della sorgente). `false`: Disabilitato. I template di stringa/funzione generano file per locale. Oggetto per locale: ogni locale è mappata al proprio pattern; `false` salta quel locale. L'inclusione di `{{locale}}` attiva la generazione per locale. Il `fill` a livello di dizionario ha sempre la precedenza su questa configurazione globale. |
| `importMode`                | `'static' &#124; 'dynamic' &#124; 'fetch'`                                                      | Controlla come vengono importati i dizionari. Predefinito: `'static'`                                            | `'dynamic'`        | `'static'`: Importato staticamente. `'dynamic'`: Importato dinamicamente tramite Suspense. `'fetch'`: Recuperato dinamicamente tramite Live Sync API. Non influisce su `getIntlayer`, `getDictionary`, `useDictionary`, ecc.                                                                                                                                                                   |
| `location`                  | `'local' &#124; 'remote' &#124; 'hybrid' &#124; string`                                         | Dove vengono memorizzati i dizionari. Predefinito: `'local'`                                                     | `'remote'`         | `'local'`: file system. `'remote'`: Intlayer CMS. `'hybrid'`: entrambi.                                                                                                                                                                                                                                                                                                                        |
| `contentAutoTransformation` | `boolean`                                                                                       | Se i file di contenuto debbano essere trasformati automaticamente (es. da Markdown a HTML). Predefinito: `false` | `true`             | Utile per elaborare i campi Markdown tramite @intlayer/markdown.                                                                                                                                                                                                                                                                                                                               |

**Esempio di `fill`**:

```ts
dictionary: {
  fill: {
    en: '/locales/en/{{key}}.content.json',
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  }
}
```

---

### Configurazione AI (AI Configuration)

Definisce le impostazioni per le funzionalità alimentate dall'AI di Intlayer, come la traduzione build.

| Campo                | Tipo                   | Descrizione                                                                         | Esempio                                     | Nota                                                                                      |
| -------------------- | ---------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `provider`           | `string`               | Il fornitore AI da utilizzare.                                                      | `'openai'`, `'anthropic'`, `'googlevertex'` |                                                                                           |
| `model`              | `string`               | Il modello AI da utilizzare.                                                        | `'gpt-4o'`, `'claude-3-5-sonnet-20240620'`  |                                                                                           |
| `apiKey`             | `string`               | Chiave API per il fornitore selezionato.                                            | `process.env.OPENAI_API_KEY`                |                                                                                           |
| `applicationContext` | `string`               | Contesto aggiuntivo sulla tua app per migliorare la precisione della traduzione AI. | `'Piattaforma di studio per bambini.'`      |                                                                                           |
| `baseURL`            | `string`               | URL base opzionale per le chiamate API.                                             |                                             | Utile se stai usando un proxy o un deployment AI locale.                                  |
| `dataSerialization`  | `'json' &#124; 'toon'` | Definisce come inviare i dati all'AI. Predefinito: `'json'`                         | `'json'`                                    | `'json'`: più robusto e preciso. `'toon'`: consuma meno token ma può essere meno stabile. |

---

### Configurazione della Build (Build Configuration)

Impostazioni del processo di build e ottimizzazione di Intlayer.

| Campo          | Tipo                     | Descrizione                                                                                                              | Esempio | Nota |
| -------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------- | ---- |
| `mode`         | `'auto' &#124; 'manual'` | Indica se Intlayer debba essere eseguito automaticamente durante i passaggi di pre-build dell'app. Predefinito: `'auto'` |         |      |
| `optimize`     | `boolean`                | Indica se i dizionari compilati debbano essere ottimizzati per il runtime. Predefinito: `true` in produzione             |         |      |
| `outputFormat` | `('cjs' &#124; 'esm')[]` | Formato di output per i file del dizionario generati. Predefinito: `['cjs', 'esm']`                                      |         |      |
| `checkTypes`   | `boolean`                | Indica se Intlayer debba controllare i tipi nei file generati. Predefinito: `false`                                      |         |      |

---

### Configurazione di Sistema (System Configuration)

Queste impostazioni sono destinate a casi d'uso avanzati e per la configurazione interna di Intlayer.

| Campo                     | Tipo     | Descrizione                                     | Predefinito                       |
| ------------------------- | -------- | ----------------------------------------------- | --------------------------------- |
| `dictionariesDir`         | `string` | Directory dei dizionari compilati.              | `'.intlayer/dictionary'`          |
| `moduleAugmentationDir`   | `string` | Directory per TypeScript module augmentation.   | `'.intlayer/types'`               |
| `unmergedDictionariesDir` | `string` | Directory dei dizionari non fusi.               | `'.intlayer/unmerged_dictionary'` |
| `typesDir`                | `string` | Directory dei tipi generati.                    | `'.intlayer/types'`               |
| `mainDir`                 | `string` | Directory del file Intlayer principale.         | `'.intlayer/main'`                |
| `configDir`               | `string` | Directory dei file di configurazione compilati. | `'.intlayer/config'`              |
| `cacheDir`                | `string` | Directory dei file di cache.                    | `'.intlayer/cache'`               |

---

### Configurazione del Compilatore (Compiler Configuration)

Impostazioni per il compilatore Intlayer (`intlayer compiler`).

| Campo                 | Tipo                     | Descrizione                                                                                  | Predefinito |
| --------------------- | ------------------------ | -------------------------------------------------------------------------------------------- | ----------- |
| `enabled`             | `boolean`                | Indica se il compilatore è attivo.                                                           | `false`     |
| `output`              | `string &#124; Function` | Percorso di output per i dizionari estratti.                                                 |             |
| `saveComponents`      | `boolean`                | Indica se i file sorgente originali debbano essere sovrascritti con le versioni trasformate. | `false`     |
| `noMetadata`          | `boolean`                | Se `true`, il compilatore non includerà metadati nei file generati.                          | `false`     |
| `dictionaryKeyPrefix` | `string`                 | Prefisso opzionale della chiave del dizionario.                                              | `''`        |

---

### Configurazione del Logger (Logger Configuration)

Impostazioni per personalizzare l'output dei log di Intlayer.

| Campo    | Tipo                                           | Descrizione                     | Predefinito    |
| -------- | ---------------------------------------------- | ------------------------------- | -------------- |
| `mode`   | `'default' &#124; 'verbose' &#124; 'disabled'` | Modalità di logging.            | `'default'`    |
| `prefix` | `string`                                       | Prefisso per i messaggi di log. | `'[intlayer]'` |

---

### Schemi Personalizzati (Custom Schemas)

| Campo     | Tipo                        | Descrizione                                                                      |
| --------- | --------------------------- | -------------------------------------------------------------------------------- |
| `schemas` | `Record<string, ZodSchema>` | Ti permette di definire schemi Zod per validare la struttura dei tuoi dizionari. |

---

### Plugin (Plugins)

| Campo     | Tipo               | Descrizione                             |
| --------- | ------------------ | --------------------------------------- |
| `plugins` | `IntlayerPlugin[]` | Elenco dei plugin Intlayer da attivare. |
