---
createdAt: 2024-08-13
updatedAt: 2026-04-08
title: Configurazione
description: Scopri come configurare Intlayer per la tua applicazione. Comprendi le diverse impostazioni e opzioni disponibili per personalizzare Intlayer secondo le tue necessità.
keywords:
  - configurazione
  - impostazioni
  - personalizzazione
  - Intlayer
  - opzioni
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.7.0
    date: 2026-04-08
    changes: "Aggiunte le opzioni `prune` e `minify` alla configurazione di build"
  - version: 8.7.0
    date: 2026-04-03
    changes: "Aggiunta l'opzione `currentDomain`"
  - version: 8.4.0
    date: 2026-03-20
    changes: "Aggiunta la notazione ad oggetto per 'compiler.output' e 'dictionary.fill' per locale"
  - version: 8.3.0
    date: 2026-03-11
    changes: "Spostato 'baseDir' dalla configurazione 'content' alla configurazione 'system'"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Aggiornate le opzioni del compilatore, aggiunto supporto per 'output' e 'noMetadata'"
  - version: 8.1.7
    date: 2026-02-25
    changes: "Aggiornate le opzioni del compilatore"
  - version: 8.1.5
    date: 2026-02-23
    changes: "Aggiunta l'opzione del compilatore 'build-only' e il prefisso del dizionario"
  - version: 8.0.6
    date: 2026-02-12
    changes: "Aggiunto supporto per i fornitori Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face e Together AI"
  - version: 8.0.5
    date: 2026-02-06
    changes: "Aggiunto `dataSerialization` alla configurazione AI"
  - version: 8.0.0
    date: 2026-01-24
    changes: "Rinominata la modalità di importazione `live` in `fetch` per descrivere meglio il meccanismo sottostante."
  - version: 8.0.0
    date: 2026-01-22
    changes: "Spostata la configurazione di build `importMode` nella configurazione `dictionary`."
  - version: 8.0.0
    date: 2026-01-22
    changes: "Aggiunta l'opzione `rewrite` alla configurazione del routing"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Separata la configurazione di sistema dalla configurazione del contenuto. Spostati i percorsi interni alla proprietà `system`. Aggiunto `codeDir` per separare i file di contenuto dalle trasformazioni del codice."
  - version: 8.0.0
    date: 2026-01-18
    changes: "Aggiunte le opzioni del dizionario `location` e `schema`"
  - version: 7.5.1
    date: 2026-01-10
    changes: "Aggiunto supporto per i formati di file JSON5 e JSONC"
  - version: 7.5.0
    date: 2025-12-17
    changes: "Aggiunta l'opzione `buildMode`"
  - version: 7.0.0
    date: 2025-10-25
    changes: "Aggiunta la configurazione `dictionary`"
  - version: 7.0.0
    date: 2025-10-21
    changes: "Sostituito `middleware` con la configurazione `routing`"
  - version: 7.0.0
    date: 2025-10-12
    changes: "Aggiunta l'opzione `formatCommand`"
  - version: 6.2.0
    date: 2025-10-12
    changes: "Aggiornata l'opzione `excludedPath`"
  - version: 6.0.2
    date: 2025-09-23
    changes: "Aggiunta l'opzione `outputFormat`"
  - version: 6.0.0
    date: 2025-09-21
    changes: "Rimosse le proprietà `dictionaryOutput` e `i18nextResourcesDir`"
  - version: 6.0.0
    date: 2025-09-16
    changes: "Aggiunta la modalità di importazione `live`"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Sostituita la proprietà `hotReload` con `liveSync` e aggiunte le proprietà `liveSyncPort`, `liveSyncURL`"
  - version: 5.6.1
    date: 2025-07-25
    changes: "Sostituita l'opzione `activateDynamicImport` con `importMode`"
  - version: 5.6.0
    date: 2025-07-13
    changes: "Cambiata la `contentDir` predefinita da `['src']` a `['.']`"
  - version: 5.5.11
    date: 2025-06-29
    changes: "Aggiunti i comandi `docs`"
---

# Documentazione della configurazione di Intlayer

## Panoramica

I file di configurazione di Intlayer consentono di personalizzare vari aspetti del plugin, come l'internazionalizzazione (i18n), il middleware e la gestione dei contenuti. Questo documento fornisce una descrizione dettagliata di ogni proprietà nella configurazione.

---

## Sommario

<TOC/>

---

## Supporto File di Configurazione

Intlayer accetta formati di file di configurazione JSON, JS, MJS e TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Esempio di File di Configurazione

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * Esempio di file di configurazione Intlayer con tutte le opzioni disponibili.
 */
const config: IntlayerConfig = {
  /**
   * Configurazione delle impostazioni di internazionalizzazione.
   */
  internationalization: {
    /**
     * Elenco dei locale supportati nell'applicazione.
     * Predefinito: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * Elenco dei locale richiesti da definire in ogni dizionario.
     * Se vuoto, tutti i locale sono richiesti in modalità `strict`.
     * Predefinito: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Livello di rigore per i contenuti internazionalizzati.
     * - "strict": Errore in caso di locale dichiarati mancanti o non dichiarati.
     * - "inclusive": Avviso in caso di locale dichiarati mancanti.
     * - "loose": Accetta qualsiasi locale esistente.
     * Predefinito: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * Locale predefinito utilizzato come fallback se il locale richiesto non è disponibile.
     * Predefinito: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Impostazioni che controllano le operazioni del dizionario e il comportamento del contenuto mancante.
   */
  dictionary: {
    /**
     * Controlla come vengono importati i dizionari.
     * - "static": Importazione statica al momento del build.
     * - "dynamic": Importazione dinamica utilizzando Suspense.
     * - "fetch": Recupero dinamico tramite l'API Live Sycn.
     * Predefinito: "static"
     */
    importMode: "static",

    /**
     * Strategia per compilare automaticamente le traduzioni mancanti utilizzando l'IA.
     * Può essere un booleano o un pattern di percorso per salvare il contenuto compilato.
     * Predefinito: true
     */
    fill: true,

    /**
     * Posizione fisica dei file del dizionario.
     * - "local": Memorizzato nel file system locale.
     * - "remote": Memorizzato nel CMS Intlayer.
     * - "hybrid": Memorizzato sia localmente che nel CMS Intlayer.
     * - "plugin" (o qualsiasi stringa personalizzata): Fornito da un plugin o da una sorgente personalizzata.
     * Predefinito: "local"
     */
    location: "local",

    /**
     * Se trasformare automaticamente il contenuto (es. Markdown in HTML).
     * Predefinito: false
     */
    contentAutoTransformation: false,
  },

  /**
   * Configurazione del routing e del middleware.
   */
  routing: {
    /**
     * Strategia di routing per locale.
     * - "prefix-no-default": Prefisso per tutti i locale tranne quello predefinito (es. /dashboard, /fr/dashboard).
     * - "prefix-all": Prefisso per tutti i locale (es. /en/dashboard, /fr/dashboard).
     * - "no-prefix": Nessun locale nell'URL.
     * - "search-params": Usa ?locale=...
     * Predefinito: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Dove memorizzare il locale selezionato dall'utente.
     * Opzioni: 'cookie', 'localStorage', 'sessionStorage', 'header' o un array di questi.
     * Predefinito: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Percorso base dell'URL dell'applicazione.
     * Predefinito: ""
     */
    basePath: "",

    /**
     * Regole di riscrittura URL personalizzate per percorsi specifici locali.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),

    /**
     * Mappa i locale ai nomi host del dominio per il routing basato sul dominio.
     * Gli URL per questi locale saranno assoluti (es. https://intlayer.cn/).
     * Il dominio implica il locale, quindi non viene aggiunto alcun prefisso di locale al percorso.
     * Predefinito: undefined
     */
    domains: {
      en: "intlayer.org",
      zh: "intlayer.cn",
    },
  },

  /**
   * Impostazioni per la scoperta e l'elaborazione dei file di contenuto.
   */
  content: {
    /**
     * Estensioni di file per scansionare i dizionari.
     * Predefinito: ['.content.ts', '.content.js', '.content.json', ecc.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Directory in cui si trovano i file .content.
     * Predefinito: ["."]
     */
    contentDir: ["src"],

    /**
     * Directory del codice sorgente.
     * Utilizzato per l'ottimizzazione del build e la trasformazione del codice.
     * Predefinito: ["."]
     */
    codeDir: ["src"],

    /**
     * Pattern da escludere dalla scansione.
     * Predefinito: ['node_modules', '.intlayer', ecc.]
     */
    excludedPath: ["node_modules"],

    /**
     * Se monitorare le modifiche e rigenerare i dizionari durante lo sviluppo.
     * Predefinito: true in modalità sviluppo
     */
    watch: true,

    /**
     * Comando per formattare i file .content appena creati / aggiornati.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Configurazione dell'Editor Visuale.
   */
  editor: {
    /**
     * Se l'editor visuale è abilitato.
     * Predefinito: false
     */
    enabled: true,

    /**
     * L'URL della tua applicazione per la convalida dell'origine.
     * Predefinito: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * La porta del server dell'editor locale.
     * Predefinito: 8000
     */
    port: 8000,

    /**
     * L'URL pubblico per l'editor.
     * Predefinito: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * L'URL del CMS Intlayer.
     * Predefinito: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * L'URL del server API di backend.
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
   * Impostazioni per le traduzioni e la generazione tramite IA.
   */
  ai: {
    /**
     * Fornitore IA da utilizzare.
     * Opzioni: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Predefinito: 'openai'
     */
    provider: "openai",

    /**
     * Modello da utilizzare per il fornitore selezionato.
     */
    model: "gpt-4o",

    /**
     * La chiave API per il fornitore.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Contesto globale per guidare l'IA durante la generazione delle traduzioni.
     */
    applicationContext: "Questa è un'applicazione di prenotazione viaggi.",

    /**
     * URL base per l'API IA.
     */
    baseURL: "http://localhost:3000",

    /**
     * Serializzazione dei dati
     *
     * Opzioni:
     * - "json": predefinito, affidabile; utilizza più token.
     * - "toon": più veloce, meno token, meno stabile di JSON.
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
     * Modalità di esecuzione del build.
     * - "auto": Build automatica durante il build dell'applicazione.
     * - "manual": Richiede il comando di build esplicito.
     * Predefinito: "auto"
     */
    mode: "auto",

    /**
     * Se ottimizzare il bundle dell'applicazione rimuovendo i dizionari inutilizzati.
     * Predefinito: true in produzione
     */
    optimize: true,

    /**
     * Minifica i dizionari per ridurre le dimensioni del bundle.
     * Predefinito: true
     *
     * Note:
     * - Questa opzione verrà ignorata se `optimize` è disabilitato.
     * - Questa opzione verrà ignorata se `editor.enabled` è vero.
     */
    minify: true,

    /**
     * Rimuovi le chiavi non utilizzate nei dizionari.
     * Predefinito: true
     *
     * Note:
     * - Questa opzione verrà ignorata se `optimize` è disabilitato.
     */
    purge: true,

    /**
     * Formato di output per i file del dizionario generati.
     * Predefinito: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Se controllare i tipi di TypeScript durante il build.
     * Predefinito: false
     */
    checkTypes: false,
  },

  /**
   * Configurazione del Logger.
   */
  log: {
    /**
     * Livello di logging.
     * - "default": Logging standard.
     * - "verbose": Logging di debug dettagliato.
     * - "disabled": Nessun logging.
     * Predefinito: "default"
     */
    mode: "default",

    /**
     * Prefisso per tutti i messaggi nei log.
     * Predefinito: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * Configurazione di sistema (per uso avanzato)
   */
  system: {
    /**
     * Directory in cui memorizzare i dizionari localizzati.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Directory per l'aumento del modulo (module augmentation).
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Directory in cui memorizzare i dizionari non fusi (unmerged).
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Directory in cui memorizzare i tipi del dizionario.
     */
    typesDir: ".intlayer/types",

    /**
     * Directory in cui si trovano i file principali dell'applicazione.
     */
    mainDir: ".intlayer/main",

    /**
     * Directory in cui si trovano i file di configurazione compilati.
     */
    configDir: ".intlayer/config",

    /**
     * Directory per i file di cache.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Configurazione del compilatore (per uso avanzato)
   */
  compiler: {
    /**
     * Se il compilatore è abilitato.
     *
     * - false: disabilita il compilatore.
     * - true: abilita il compilatore.
     * - "build-only": salta il compilatore durante lo sviluppo per un avvio più rapido.
     *
     * Predefinito: false
     */
    enabled: true,

    /**
     * Determina il percorso del file di output. Sostituisce `outputDir`.
     *
     * - I percorsi che iniziano con `./` sono risolti rispetto alla directory del componente.
     * - I percorsi che iniziano con `/` sono risolti rispetto alla directory base del progetto (`baseDir`).
     *
     * - La presenza della variabile `{{locale}}` nel percorso abilita la generazione del dizionario per locale.
     *
     * Esempi:
     * ```ts
     * {
     *   // Genera file .content.ts multilingue accanto al componente
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Equivalente tramite stringa template
     * }
     * ```
     *
     * ```ts
     * {
     *   // Genera JSON centralizzati per locale nella base del progetto
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Equivalente tramite stringa template
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
     * Se salvare i componenti dopo averli trasformati.
     *
     * - Se impostato su `true`, il compilatore riscriverà il file del componente sul disco. Pertanto la trasformazione sarà permanente e il compilatore salterà la trasformazione per il processo successivo. In questo modo, il compilatore può trasformare l'app e poi può essere rimosso.
     *
     * - Se impostato su `false`, il compilatore inietterà la chiamata alla funzione `useIntlayer()` nel codice solo nell'output della build, mantenendo intatta la base di codice originale. La trasformazione verrà eseguita solo in memoria.
     */
    saveComponents: false,

    /**
     * Conserva solo il contenuto nel file generato. Utile per formati i18next o output JSON ICU MessageFormat per locale.
     */
    noMetadata: false,

    /**
     * Prefisso della chiave del dizionario
     */
    dictionaryKeyPrefix: "", // Aggiungi un prefisso opzionale alle chiavi del dizionario estratto
  },

  /**
   * Schemi personalizzati per la convalida del contenuto del dizionario.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Configurazione dei plugin.
   */
  plugins: [],
};

export default config;
````

---

## Guida di Riferimento alla Configurazione

Di seguito è riportata una descrizione dettagliata dei vari parametri di configurazione disponibili in Intlayer.

---

### Configurazione Internazionalizzazione (Internationalization)

Definisce le impostazioni relative all'internazionalizzazione, inclusi i locale disponibili e il locale predefinito.

| Campo             | Descrizione                                                                                   | Tipo       | Predefinito         | Esempio              | Commenti                                                                                                                                                                                                                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------- | ---------- | ------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `locales`         | Elenco dei locale supportati nell'applicazione.                                               | `string[]` | `[Locales.ENGLISH]` | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                                        |
| `requiredLocales` | Elenco dei locale richiesti nell'applicazione.                                                | `string[]` | `[]`                | `[]`                 | • Se vuoto, tutti i locale sono richiesti in modalità `strict`.<br/>• Assicurati che i locale richiesti siano definiti anche nel campo `locales`.                                                                                                                                                      |
| `strictMode`      | Garantisce un'implementazione forte dei contenuti internazionalizzati utilizzando TypeScript. | `string`   | `'inclusive'`       |                      | • Se `"strict"`: La definizione di ogni locale dichiarato è obbligatoria per la funzione `t` — errore se mancante o non dichiarato.<br/>• Se `"inclusive"`: Avviso per i locale mancanti ma permette l'uso di locale esistenti non dichiarati.<br/>• Se `"loose"`: Accetta qualsiasi locale esistente. |
| `defaultLocale`   | Locale predefinito utilizzato come fallback se il locale richiesto non è disponibile.         | `string`   | `Locales.ENGLISH`   | `'en'`               | Utilizzato per determinare il locale se non specificato nell'URL, nei cookie o negli header.                                                                                                                                                                                                           |

---

### Configurazione Editor (Editor)

Definisce le impostazioni per l'editor visuale, incluse la porta del server e lo stato di abilitazione.

| Campo                        | Descrizione                                                                                                                                                                         | Tipo                              | Predefinito                         | Esempio                                                                                         | Commenti                                                                                                                                                                                                                                                                              |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | L'URL della tua applicazione.                                                                                                                                                       | `string`                          | `undefined`                         | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Utilizzato per limitare l'origine dell'editor per motivi di sicurezza.<br/>• Se impostato su `'*'`, l'editor è accessibile da qualsiasi origine.                                                                                                                                    |
| `port`                       | La porta del server dell'editor visuale.                                                                                                                                            | `number`                          | `8000`                              |                                                                                                 |                                                                                                                                                                                                                                                                                       |
| `editorURL`                  | L'URL del server dell'editor.                                                                                                                                                       | `string`                          | `'http://localhost:8000'`           | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Utilizzato per limitare le origini che possono comunicare con l'applicazione.<br/>• Se impostato su `'*'`, è accessibile da qualsiasi origine.<br/>• Necessario se la porta viene cambiata o se l'editor è ospitato su un altro dominio.                                            |
| `cmsURL`                     | L'URL del CMS Intlayer.                                                                                                                                                             | `string`                          | `'https://app.intlayer.org'`        | `'https://app.intlayer.org'`                                                                    |                                                                                                                                                                                                                                                                                       |
| `backendURL`                 | L'URL del server di backend.                                                                                                                                                        | `string`                          | `https://back.intlayer.org`         | `http://localhost:4000`                                                                         |                                                                                                                                                                                                                                                                                       |
| `enabled`                    | Se l'applicazione deve comunicare con l'editor visuale.                                                                                                                             | `boolean`                         | `false`                             | `process.env.NODE_ENV !== 'production'`                                                         | • Se `false`, l'editor non potrà comunicare con l'applicazione.<br/>• Disabilitare questo per certi ambienti aumenta la sicurezza.                                                                                                                                                    |
| `clientId`                   | Permette ai pacchetti intlayer di autenticarsi con il backend tramite oAuth2. Visita [intlayer.org/project](https://app.intlayer.org/project) per ottenere il tuo token di accesso. | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Deve essere mantenuto segreto; usa le variabili d'ambiente.                                                                                                                                                                                                                           |
| `clientSecret`               | Permette ai pacchetti intlayer di autenticarsi con il backend tramite oAuth2. Visita [intlayer.org/project](https://app.intlayer.org/project) per ottenere il tuo token di accesso. | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Deve essere mantenuto segreto; usa le variabili d'ambiente.                                                                                                                                                                                                                           |
| `dictionaryPriorityStrategy` | Strategia di priorità del dizionario quando sono presenti sia dizionari locali che remoti.                                                                                          | `string`                          | `'local_first'`                     | `'distant_first'`                                                                               | • `'distant_first'`: Priorità ai dizionari remoti rispetto a quelli locali.<br/>• `'local_first'`: Priorità ai dizionari locali rispetto a quelli remoti.                                                                                                                             |
| `liveSync`                   | Se il server dell'applicazione ricarica istantaneamente il contenuto quando viene rilevata una modifica nel CMS <br/> Editor Visuale <br/> Server di Backend.                       | `boolean`                         | `true`                              | `true`                                                                                          | • Aggiorna il contenuto della pagina dell'applicazione quando i dizionari vengono aggiunti/aggiornati.<br/>• Live Sync accetta contenuti da un server esterno, il che potrebbe influire leggermente sulle prestazioni.<br/>• Si consiglia di ospitare entrambi sulla stessa macchina. |
| `liveSyncPort`               | La porta del server Live Sync.                                                                                                                                                      | `number`                          | `4000`                              | `4000`                                                                                          |                                                                                                                                                                                                                                                                                       |
| `liveSyncURL`                | L'URL del server Live Sync.                                                                                                                                                         | `string`                          | `'http://localhost:{liveSyncPort}'` | `'https://example.com'`                                                                         | Punta a localhost per impostazione predefinita; può essere cambiato per puntare a un server Live Sync remoto.                                                                                                                                                                         |

---

### Configurazione Routing (Routing)

Impostazioni che controllano il comportamento del routing, inclusa la struttura dell'URL, lo storage del locale e la gestione del middleware.

| Campo      | Descrizione                                                                                                                                                                                                               | Tipo                                                                                                                                                                                                         | Predefinito            | Esempio                                                                                                                                                                                 | Commenti                                                                                                                                                                                                                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mode`     | Modalità di routing URL per la gestione dei locale.                                                                                                                                                                       | `'prefix-no-default'` &#124; <br/> `'prefix-all'` &#124; <br/> `'no-prefix'` &#124; <br/> `'search-params'`                                                                                                  | `'prefix-no-default'`  | `'prefix-no-default'`: `/dashboard` (en) o `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: locale gestito diversamente. `'search-params'`: `/dashboard?locale=fr` | Non influisce sulla gestione dei cookie o sul local storage.                                                                                                                                                                                                                                                       |
| `storage`  | Configurazione per lo storage del locale sul client.                                                                                                                                                                      | `false` &#124; <br/> `'cookie'` &#124; <br/> `'localStorage'` &#124; <br/> `'sessionStorage'` &#124; <br/> `'header'` &#124; <br/> `CookiesAttributes` &#124; <br/> `StorageAttributes` &#124; <br/> `Array` | `['cookie', 'header']` | `'localStorage'` <br/> `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                      | Vedi la tabella dei parametri di storage sotto.                                                                                                                                                                                                                                                                    |
| `basePath` | Percorso base per gli URL dell'applicazione.                                                                                                                                                                              | `string`                                                                                                                                                                                                     | `''`                   | `'/my-app'`                                                                                                                                                                             | Se la tua app è su `https://example.com/my-app`, basePath è `'/my-app'` e gli URL sono `https://example.com/my-app/en`.                                                                                                                                                                                            |
| `rewrite`  | Regole di riscrittura URL personalizzate per sovrascrivere la modalità di routing predefinita per percorsi specifici. Supporta parametri dinamici `[param]`.                                                              | `Record<string, StrictModeLocaleMap<string>>`                                                                                                                                                                | `undefined`            | Vedi Esempio sotto                                                                                                                                                                      | • Regole di riscrittura con priorità più alta rispetto alla `mode`.<br/>• Funziona con Next.js e Vite.<br/>• `getLocalizedUrl()` applica automaticamente le regole appropriate.<br/>• Vedi [Riscritture URL Personalizzate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md). |
| `domains`  | Mappa i locale ai nomi host del dominio per il routing basato sul dominio. Quando impostato, gli URL per un locale usano quel dominio come base (URL assoluto) e non viene aggiunto alcun prefisso di locale al percorso. | `Partial<Record<Locale, string>>`                                                                                                                                                                            | `undefined`            | `{ zh: 'intlayer.zh', fr: 'intlayer.org' }`                                                                                                                                             | • Il protocollo è impostato su `https://` se non incluso nel nome host.<br/>• Il dominio stesso identifica il locale, quindi non viene aggiunto alcun prefisso `/zh/`.<br/>• `getLocalizedUrl('/', 'zh')` restituisce `https://intlayer.zh/`.                                                                      |

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

#### Parametri di Storage (Storage)

| Valore             | Commenti                                                                                                                                                                                                  | Descrizione                                                                       |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `'cookie'`         | • Garantire il consenso dell'utente appropriato per l'implementazione GDPR.<br/>• Configurabile tramite `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`). | Memorizza il locale in un cookie — accessibile sia dal client che dal server.     |
| `'localStorage'`   | • Non scade se non rimosso esplicitamente.<br/>• Intlayer Proxy non può accedervi.<br/>• Configurabile tramite `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`).                   | Memorizza il locale nel browser senza scadenza — solo lato client.                |
| `'sessionStorage'` | • Rimosso alla chiusura del tab/finestra.<br/>• Intlayer Proxy non può accedervi.<br/>• Configurabile tramite `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`).                  | Memorizza il locale per la durata della sessione della pagina — solo lato client. |
| `'header'`         | • Utile per chiamate API.<br/>• Il lato client non può accedervi.<br/>• Configurabile tramite `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                                          | Memorizza o passa il locale tramite header HTTP — solo lato server.               |

#### Attributi dei Cookie (Cookies Attributes)

Quando si utilizza lo storage in un cookie, è possibile impostare attributi aggiuntivi:

| Campo      | Descrizione                                                   | Tipo                                                  |
| ---------- | ------------------------------------------------------------- | ----------------------------------------------------- |
| `name`     | Nome del cookie. Predefinito: `'INTLAYER_LOCALE'`             | `string`                                              |
| `domain`   | Dominio del cookie. Predefinito: `undefined`                  | `string`                                              |
| `path`     | Percorso del cookie. Predefinito: `undefined`                 | `string`                                              |
| `secure`   | Richiede HTTPS. Predefinito: `undefined`                      | `boolean`                                             |
| `httpOnly` | Flag HTTP-only. Predefinito: `undefined`                      | `boolean`                                             |
| `sameSite` | Politica SameSite.                                            | `'strict'` &#124; <br/> `'lax'` &#124; <br/> `'none'` |
| `expires`  | Data di scadenza o numero di giorni. Predefinito: `undefined` | `Date` &#124; <br/> `number`                          |

#### Attributi dello Storage (Storage Attributes)

Quando si utilizza localStorage o sessionStorage:

| Campo  | Descrizione                                                       | Tipo                                             |
| ------ | ----------------------------------------------------------------- | ------------------------------------------------ |
| `type` | Tipo di storage.                                                  | `'localStorage'` &#124; <br/> `'sessionStorage'` |
| `name` | Nome della chiave nello storage. Predefinito: `'INTLAYER_LOCALE'` | `string`                                         |

#### Esempi di Configurazione

Ecco alcuni esempi di configurazione comuni per la nuova struttura di routing v7:

**Configurazione Base (Predefinita)**:

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

**Configurazione con Conformità GDPR**:

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

**Modalità Parametri di Ricerca (Search Params)**:

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

**Modalità Senza Prefisso con Storage Personalizzato**:

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

**Riscritture URL Personalizzate con Percorsi Dinamici**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Fallback per i percorsi non riscritti
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

### Configurazione Contenuto (Content)

Impostazioni per come i contenuti sono gestiti nell'applicazione, inclusi i nomi delle directory, le estensioni dei file e le configurazioni derivate.

| Campo            | Descrizione                                                                                                         | Tipo       | Predefinito                                                                                                                                                               | Esempio                                                                                                                                                                               | Commenti                                                                                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | Indica se Intlayer deve monitorare le modifiche nei file di dichiarazione del contenuto per rigenerare i dizionari. | `boolean`  | `true`                                                                                                                                                                    |                                                                                                                                                                                       |                                                                                                                                                                                              |
| `fileExtensions` | Estensioni dei file da scansionare durante la compilazione dei dizionari.                                           | `string[]` | `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.json5', '.content.jsonc', '.content.tsx', '.content.jsx']`                     | `['.data.ts', '.data.js', '.data.json']`                                                                                                                                              | Può aiutare a evitare conflitti di personalizzazione.                                                                                                                                        |
| `contentDir`     | Percorso della directory dove si trovano i file di definizione del contenuto (`.content.*`).                        | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library', require.resolve("@my-package/content"), '@my-package/content']`                                                                                          | Utilizzato per il monitoraggio dei file di contenuto e la rigenerazione dei dizionari.                                                                                                       |
| `codeDir`        | Directory del percorso in cui si trova il codice, rispetto alla directory base.                                     | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library']`                                                                                                                                                         | • Utilizzato per il monitoraggio dei file di codice per la trasformazione (rimozione di parti non necessarie, ottimizzazione).<br/>• Separare da `contentDir` può migliorare le prestazioni. |
| `excludedPath`   | Directory da escludere dalla scansione del contenuto.                                                               | `string[]` | `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']` |                                                                                                                                                                                       | Attualmente non utilizzato; pianificato per il futuro.                                                                                                                                       |
| `formatCommand`  | Comando per formattare i file di contenuto quando Intlayer li scrive localmente.                                    | `string`   | `undefined`                                                                                                                                                               | `'npx prettier --write "{{file}}" --log-level silent'` (Prettier), `'npx biome format "{{file}}" --write --log-level none'` (Biome), `'npx eslint --fix "{{file}}" --quiet'` (ESLint) | • `{{file}}` sarà sostituito dal percorso del file.<br/>• Se non definito, Intlayer tenta di dedurlo (testando prettier, biome, eslint).                                                     |

---

### Configurazione Dizionario (Dictionary)

Parametri che controllano le operazioni del dizionario, inclusi i comportamenti di auto-compilazione e la generazione dei contenuti.

| Campo                       | Descrizione                                                                                                                                                               | Tipo                                                                                                            | Predefinito | Esempio                                                                                     | Commenti                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fill`                      | Controlla come vengono generati i file di output della compilazione automatica (traduzione IA).                                                                           | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `true`      | `{ en: '/locales/en/{{key}}.json', fr: ({ key }) => '/locales/fr/${key}.json', es: false }` | • `true`: Percorso predefinito (stesso file della sorgente).<br/>• `false`: Disabilita.<br/>• Stringa template/Funzione abilita la generazione per locale.<br/>• Oggetto per locale: Ogni locale corrisponde al proprio template; `false` esclude quel locale.<br/>• L'inclusione di `{{locale}}` abilita la generazione per locale.<br/>• `fill` a livello di dizionario ha sempre la priorità su questa impostazione globale. |
| `description`               | Aiuta l'editor e il CMS a comprendere lo scopo del dizionario. Utilizzato anche come contesto per generare traduzioni tramite IA.                                         | `string`                                                                                                        | `undefined` | `'User profile section'`                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `locale`                    | Trasforma il dizionario in un formato per un locale specifico. Ogni campo dichiarato diventa un nodo di traduzione. Se mancante, il dizionario è considerato multilingue. | `LocalesValues`                                                                                                 | `undefined` | `'en'`                                                                                      | Usalo se il dizionario è per un locale specifico invece di contenere più traduzioni.                                                                                                                                                                                                                                                                                                                                            |
| `contentAutoTransformation` | Se trasformare automaticamente le stringhe di contenuto in nodi tipizzati (Markdown, HTML o inserimenti).                                                                 | `boolean` &#124; <br/> `{ markdown?: boolean; html?: boolean; insertion?: boolean }`                            | `false`     | `true`                                                                                      | • Markdown : `### Title` → `md('### Title')`.<br/>• HTML : `<div>Title</div>` → `html('<div>Title</div>')`.<br/>• Inserimento : `Hello {{name}}` → `insert('Hello {{name}}')`.                                                                                                                                                                                                                                                  |
| `location`                  | Indica dove sono memorizzati i file del dizionario e come sono sincronizzati con il CMS.                                                                                  | `'local'` &#124; <br/> `'remote'` &#124; <br/> `'hybrid'` &#124; <br/> `'plugin'` &#124; <br/> `string`         | `'local'`   | `'hybrid'`                                                                                  | • `'local'`: Solo gestione locale.<br/>• `'remote'`: Solo gestione remota (CMS).<br/>• `'hybrid'`: Sia gestione locale che remota.<br/>• `'plugin'` o stringa personalizzata: Gestione tramite plugin o sorgente personalizzata.                                                                                                                                                                                                |
| `importMode`                | Controlla come vengono importati i dizionari.                                                                                                                             | `'static'` &#124; <br/> `'dynamic'` &#124; <br/> `'fetch'`                                                      | `'static'`  | `'dynamic'`                                                                                 | • `'static'`: Importazione statica.<br/>• `'dynamic'`: Importazione dinamica tramite Suspense.<br/>• `'fetch'`: Recupero tramite l'API Live Sync; fallback a `'dynamic'` in caso di fallimento.<br/>• Richiede i plugin `@intlayer/babel` e `@intlayer/swc`.<br/>• Le chiavi devono essere dichiarate staticamente.<br/>• Ignorato se `optimize` è disattivato.<br/>• Non influisce su `getIntlayer`, `getDictionary`, ecc.     |
| `priority`                  | Priorità del dizionario. Quando si risolvono i conflitti tra i dizionari, i valori più alti vincono su quelli più bassi.                                                  | `number`                                                                                                        | `undefined` | `1`                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `live`                      | DEPRECATO — usa `importMode: 'fetch'`. Indica se il contenuto del dizionario debba essere recuperato dinamicamente tramite l'API Live Sycn.                               | `boolean`                                                                                                       | `undefined` |                                                                                             | Rinominato in `importMode: 'fetch'` in v8.0.0.                                                                                                                                                                                                                                                                                                                                                                                  |
| `schema`                    | Generato automaticamente da Intlayer per la convalida dello schema JSON.                                                                                                  | `'https://intlayer.org/schema.json'`                                                                            | Auto-gen    |                                                                                             | Non modificare manualmente.                                                                                                                                                                                                                                                                                                                                                                                                     |
| `title`                     | Aiuta a identificare i dizionari nell'editor e nel CMS.                                                                                                                   | `string`                                                                                                        | `undefined` | `'User Profile'`                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `tags`                      | Categorizza i dizionari e fornisce contesto o istruzioni per l'editor e l'IA.                                                                                             | `string[]`                                                                                                      | `undefined` | `['user', 'profile']`                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `version`                   | Versione del dizionario remoto; aiuta a tracciare quale versione è attualmente utilizzata.                                                                                | `string`                                                                                                        | `undefined` | `'1.0.0'`                                                                                   | • Gestito nel CMS.<br/>• Non modificare localmente.                                                                                                                                                                                                                                                                                                                                                                             |

**Esempio di `fill`**:

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

### Configurazione Logger (Log)

Parametri per personalizzare l'output dei log di Intlayer.

| Campo    | Descrizione                            | Tipo                                                           | Predefinito     | Esempio             | Commenti                                                                                                    |
| -------- | -------------------------------------- | -------------------------------------------------------------- | --------------- | ------------------- | ----------------------------------------------------------------------------------------------------------- |
| `mode`   | Indica la modalità del logger.         | `'default'` &#124; <br/> `'verbose'` &#124; <br/> `'disabled'` | `'default'`     | `'verbose'`         | • `'verbose'`: Logga più informazioni per il debug.<br/>• `'disabled'`: Disabilita completamente il logger. |
| `prefix` | Prefisso per tutti i messaggi nei log. | `string`                                                       | `'[intlayer] '` | `'[mio prefisso] '` |                                                                                                             |

---

### Configurazione IA (AI)

Impostazioni che controllano le funzionalità IA di Intlayer, inclusi il fornitore, il modello e la chiave API.

Questa configurazione è facoltativa se ti registri sulla [Dashboard Intlayer](https://app.intlayer.org/project) con una chiave di accesso. Intlayer gestirà automaticamente per te la soluzione IA più economica ed efficiente secondo le tue necessità. L'uso delle opzioni predefinite garantisce il miglior supporto a lungo termine man mano che Intlayer viene costantemente aggiornato per utilizzare i modelli più recenti.

Se preferisci utilizzare la tua chiave API o un modello specifico, puoi definire la tua configurazione IA.
Questa configurazione IA sarà utilizzata globalmente nel tuo ambiente Intlayer. I comandi CLI utilizzeranno queste impostazioni per impostazione predefinita per comandi come `fill`, così come l'SDK, l'Editor Visuale e il CMS. È possibile sovrascrivere questi valori predefiniti in casi specifici tramite i parametri del comando.

Intlayer supporta diversi fornitori IA per la massima flessibilità. I fornitori attualmente supportati sono:

- **OpenAI** (predefinito)
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

| Campo                | Descrizione                                                                                                                                             | Tipo                                                                                                                                                                                                                                                                                                                                                                                           | Predefinito | Esempio                                                       | Commenti                                                                                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`           | Fornitore IA da utilizzare per le funzionalità IA di Intlayer.                                                                                          | `'openai'` &#124; <br/> `'anthropic'` &#124; <br/> `'mistral'` &#124; <br/> `'deepseek'` &#124; <br/> `'gemini'` &#124; <br/> `'ollama'` &#124; <br/> `'openrouter'` &#124; <br/> `'alibaba'` &#124; <br/> `'fireworks'` &#124; <br/> `'groq'` &#124; <br/> `'huggingface'` &#124; <br/> `'bedrock'` &#124; <br/> `'googleaistudio'` &#124; <br/> `'googlevertex'` &#124; <br/> `'togetherai'` | `undefined` | `'anthropic'`                                                 | Fornitori diversi richiedono chiavi API diverse e hanno prezzi diversi.                                                                                                                   |
| `model`              | Modello IA da utilizzare per le funzionalità IA.                                                                                                        | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Nessuno     | `'gpt-4o-2024-11-20'`                                         | I modelli specifici dipendono dal fornitore.                                                                                                                                              |
| `temperature`        | Controlla la casualità della risposta IA.                                                                                                               | `number`                                                                                                                                                                                                                                                                                                                                                                                       | Nessuno     | `0.1`                                                         | Temperatura più alta = più creativo e meno affidabile.                                                                                                                                    |
| `apiKey`             | La tua chiave API per il fornitore selezionato.                                                                                                         | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Nessuno     | `process.env.OPENAI_API_KEY`                                  | Deve essere mantenuto segreto; usa le variabili d'ambiente.                                                                                                                               |
| `applicationContext` | Contesto aggiuntivo sulla tua applicazione per aiutare l'IA a generare traduzioni più accurate (dominio, pubblico di destinazione, tono, terminologia). | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Nessuno     | `'Mio contesto applicativo personalizzato'`                   | Può essere utilizzato per aggiungere regole (es: `"Non dovresti tradurre i tuoi URL"`).                                                                                                   |
| `baseURL`            | URL base per l'API IA.                                                                                                                                  | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Nessuno     | `'https://api.openai.com/v1'` <br/> `'http://localhost:5000'` | Può puntare a endpoint API IA locali o personalizzati.                                                                                                                                    |
| `dataSerialization`  | Formato di serializzazione dei dati per le funzionalità IA.                                                                                             | `'json'` &#124; <br/> `'toon'`                                                                                                                                                                                                                                                                                                                                                                 | `undefined` | `'toon'`                                                      | • `'json'`: predefinito, affidabile; utilizza più token.<br/>• `'toon'`: meno token, meno stabile.<br/>• Passa il contesto al modello come parametro aggiuntivo (reasoning effort, ecc.). |

---

### Configurazione Build (Build)

Parametri che controllano come Intlayer ottimizza e compila l'internazionalizzazione della tua applicazione.

Le opzioni di build sono applicate ai plugin `@intlayer/babel` e `@intlayer/swc`.

> In modalità sviluppo, Intlayer utilizza importazioni statiche dei dizionari per facilitare il processo di sviluppo.

> Durante l'ottimizzazione, Intlayer sostituirà le chiamate ai dizionari per ottimizzare il suddivisione del codice (chunking) in modo che il bundle risultante importi solo i dizionari effettivamente utilizzati.

| Campo             | Descrizione                                                                     | Tipo                             | Predefinito                                                                                                                                                                       | Esempio                                                                       | Commenti                                                                                                                                                                                                                                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | Controlla la modalità di build.                                                 | `'auto'` &#124; <br/> `'manual'` | `'auto'`                                                                                                                                                                          | `'manual'`                                                                    | • `'auto'`: Il build viene lanciato automaticamente durante il build dell'applicazione.<br/>• `'manual'`: Viene eseguito solo tramite un comando di build esplicito.<br/>• Può essere utilizzato per impedire il build dei dizionari (es. per evitare l'esecuzione in ambiente Node.js).                                                           |
| `optimize`        | Controlla se le ottimizzazioni del build debbano essere eseguite.               | `boolean`                        | `undefined`                                                                                                                                                                       | `process.env.NODE_ENV === 'production'`                                       | • Se non definito, l'ottimizzazione viene lanciata durante il build del framework (Vite/Next.js).<br/>• `true` forza l'ottimizzazione anche in modalità dev.<br/>• `false` la disabilita.<br/>• Se abilitato, sostituisce le chiamate ai dizionari per l'ottimizzazione del chunking.<br/>• Richiede i plugin `@intlayer/babel` e `@intlayer/swc`. |
| `minify`          | Minifica i dizionari per ridurre le dimensioni del bundle.                      | `boolean`                        | `true`                                                                                                                                                                            |                                                                               | • Indica se il bundle deve essere minificato.<br/>• Predefinito: `true` in produzione.<br/>• Questa opzione verrà ignorata se `optimize` è disabilitato.<br/>• Questa opzione verrà ignorata se `editor.enabled` è vero.                                                                                                                           |
| `purge`           | Rimuovi le chiavi non utilizzate nei dizionari.                                 | `boolean`                        | `true`                                                                                                                                                                            |                                                                               | • Indica se il bundle deve essere rimosso.<br/>• Predefinito: `true` in produzione.<br/>• Questa opzione verrà ignorata se `optimize` è disabilitato.                                                                                                                                                                                              |
| `checkTypes`      | Indica se il build debba controllare i tipi di TypeScript e loggare gli errori. | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | Può rallentare il processo di build.                                                                                                                                                                                                                                                                                                               |
| `outputFormat`    | Controlla il formato di output per i dizionari.                                 | `('esm' &#124; 'cjs')[]`         | `['esm', 'cjs']`                                                                                                                                                                  | `['cjs']`                                                                     |                                                                                                                                                                                                                                                                                                                                                    |
| `traversePattern` | Pattern che specifica i file da scansionare durante l'ottimizzazione.           | `string[]`                       | `['**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,svte}', '!**/node_modules/**', '!**/dist/**', '!**/.intlayer/**', '!**/*.config.*', '!**/*.test.*', '!**/*.spec.*', '!**/*.stories.*']` | `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']` | • Limita l'ottimizzazione ai file rilevanti per migliorare le prestazioni del build.<br/>• Ignorato se `optimize` è disattivato.<br/>• Utilizza pattern glob.                                                                                                                                                                                      |

---

### Configurazione di Sistema (System)

Queste impostazioni sono per utenti esperti e per la configurazione interna di Intlayer.

| Campo                     | Descrizione                                       | Tipo     | Predefinito                       | Esempio | Commenti |
| ------------------------- | ------------------------------------------------- | -------- | --------------------------------- | ------- | -------- |
| `dictionariesDir`         | Directory per i dizionari compilati.              | `string` | `'.intlayer/dictionary'`          |         |          |
| `moduleAugmentationDir`   | Directory per l'aumento del modulo TypeScript.    | `string` | `'.intlayer/types'`               |         |          |
| `unmergedDictionariesDir` | Directory per memorizzare i dizionari non fusi.   | `string` | `'.intlayer/unmerged_dictionary'` |         |          |
| `typesDir`                | Directory per i tipi generati.                    | `string` | `'.intlayer/types'`               |         |          |
| `mainDir`                 | Directory per i file principali di Intlayer.      | `string` | `'.intlayer/main'`                |         |          |
| `configDir`               | Directory per i file di configurazione compilati. | `string` | `'.intlayer/config'`              |         |          |
| `cacheDir`                | Directory per i file di cache.                    | `string` | `'.intlayer/cache'`               |         |          |

---

### Configurazione Compilatore (Compiler)

Impostazioni che controllano il compilatore Intlayer, che raccoglie i dizionari direttamente dai tuoi componenti.

| Campo                 | Descrizione                                                                                                                                                                                                                                                                                                               | Tipo                                                                                                            | Predefinito | Esempio                                                                                                                                                  | Commenti                                                                                                                                                                                                                                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`             | Indica se il compilatore debba essere attivo per raccogliere i dizionari.                                                                                                                                                                                                                                                 | `boolean` &#124; <br/> `'build-only'`                                                                           | `true`      | `'build-only'`                                                                                                                                           | `'build-only'` salta il compilatore durante lo sviluppo per build più veloci; viene eseguito solo durante i comandi di build.                                                                                                                                                                                                                             |
| `dictionaryKeyPrefix` | Prefisso per le chiavi del dizionario raccolte.                                                                                                                                                                                                                                                                           | `string`                                                                                                        | `''`        | `'mio-prefisso-'`                                                                                                                                        | Anteposto alla chiave generata (basata sul nome del file) per evitare conflitti.                                                                                                                                                                                                                                                                          |
| `saveComponents`      | Indica se i componenti debbano essere salvati dopo essere stati trasformati.                                                                                                                                                                                                                                              | `boolean`                                                                                                       | `false`     |                                                                                                                                                          | • Se impostato su `true`, il compilatore riscriverà il file del componente sul disco. La trasformazione sarà permanente e il compilatore potrà essere rimosso.<br/>• Se impostato su `false`, il compilatore inietterà la chiamata alla funzione `useIntlayer()` nel codice solo nell'output della build, mantenendo intatta la base di codice originale. |
| `output`              | Determina il percorso del file di output. Sostituisce `outputDir`. Supporta variabili template: `{{fileName}}`, <br/> `{{key}}`, <br/> `{{locale}}`, <br/> `{{extension}}`, <br/> `{{componentFileName}}`, <br/> `{{componentExtension}}`, <br/> `{{format}}`, <br/> `{{componentFormat}}`, <br/> `{{componentDirPath}}`. | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `undefined` | `'./{{fileName}}{{extension}}'` <br/> `'/locales/{{locale}}/{{key}}.json'` <br/> `{ en: ({ key }) => './locales/en/${key}.json', fr: '...', es: false }` | • Percorsi `./` risolti rispetto alla directory del componente.<br/>• Percorsi `/` rispetto alla base del progetto.<br/>• `{{locale}}` abilita la generazione per locale.<br/>• Supporta la notazione ad oggetto per locale.                                                                                                                              |
| `noMetadata`          | Se `true`, il compilatore rimuove i metadati del dizionario (chiave, wrapper del contenuto) dall'output.                                                                                                                                                                                                                  | `boolean`                                                                                                       | `false`     | `false` → `{"key":"mia-chiave","content":{"key":"valore"}}` <br/> `true` → `{"key":"valore"}`                                                            | • Utile per formati i18next o output JSON ICU MessageFormat.<br/>• Funziona bene con il plugin `loadJSON`.                                                                                                                                                                                                                                                |
| `dictionaryKeyPrefix` | Prefisso della chiave del dizionario                                                                                                                                                                                                                                                                                      | `string`                                                                                                        | `''`        |                                                                                                                                                          | Aggiungi un prefisso opzionale alle chiavi del dizionario estratto                                                                                                                                                                                                                                                                                        |

---

### Schemi Personalizzati (Custom Schemas)

| Campo     | Descrizione                                                                      | Tipo                        |
| --------- | -------------------------------------------------------------------------------- | --------------------------- |
| `schemas` | Consente di definire schemi Zod per convalidare la struttura dei tuoi dizionari. | `Record<string, ZodSchema>` |

---

### Plugin (Plugins)

| Campo     | Descrizione                                 | Tipo               |
| --------- | ------------------------------------------- | ------------------ |
| `plugins` | Elenco dei plugin di Intlayer da includere. | `IntlayerPlugin[]` |
