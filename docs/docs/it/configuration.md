---
createdAt: 2024-08-13
updatedAt: 2025-06-29
title: Configurazione
description: Scopri come configurare Intlayer per la tua applicazione. Comprendi le varie impostazioni e opzioni disponibili per personalizzare Intlayer secondo le tue esigenze.
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
---

# Documentazione della Configurazione di Intlayer

## Panoramica

I file di configurazione di Intlayer consentono la personalizzazione di vari aspetti del plugin, come l'internazionalizzazione, il middleware e la gestione dei contenuti. Questo documento fornisce una descrizione dettagliata di ogni proprietà nella configurazione.

---

## Supporto per File di Configurazione

Intlayer accetta formati di file di configurazione JSON, JS, MJS e TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Esempio di file di configurazione

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  middleware: {
    noPrefix: false,
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "This is a test application",
  },
  build: {
    importMode: "dynamic",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  middleware: {
    noPrefix: false,
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "This is a test application",
  },
  build: {
    importMode: "dynamic",
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"],
  },
  "content": {
    "typesDir": "content/types",
  },
  "middleware": {
    "noPrefix": false,
  },
}
```

---

## Riferimento Configurazione

Le sezioni seguenti descrivono le varie impostazioni di configurazione disponibili per Intlayer.

---

### Configurazione Internazionalizzazione

Definisce le impostazioni relative all'internazionalizzazione, inclusi i locali disponibili e il locale predefinito per l'applicazione.

#### Proprietà

- **locales**:

  - _Tipo_: `string[]`
  - _Predefinito_: `['en']`
  - _Descrizione_: L'elenco dei locali supportati nell'applicazione.
  - _Esempio_: `['en', 'fr', 'es']`

- **requiredLocales**:
  - _Tipo_: `string[]`
  - _Predefinito_: `[]`
  - _Descrizione_: L'elenco dei locali richiesti nell'applicazione.
  - _Esempio_: `[]`
  - _Nota_: Se vuoto, tutti i locali sono richiesti in modalità `strict`.
  - _Nota_: Assicurarsi che i locali richiesti siano anche definiti nel campo `locales`.
- **strictMode**:

  - _Tipo_: `string`
  - _Predefinito_: `inclusive`
  - _Descrizione_: Garantisce implementazioni rigorose di contenuti internazionalizzati utilizzando TypeScript.
  - _Nota_: Se impostato su "strict", la funzione di traduzione `t` richiederà che ogni locale dichiarato sia definito. Se manca un locale o se un locale non è dichiarato nella configurazione, verrà generato un errore.
  - _Nota_: Se impostato su "inclusive", la funzione di traduzione `t` richiederà che ogni locale dichiarato sia definito. Se manca un locale, verrà generato un avviso. Tuttavia, accetterà se un locale non è dichiarato nella configurazione ma esiste.
  - _Nota_: Se impostato su "loose", la funzione di traduzione `t` accetterà qualsiasi locale esistente.

- **defaultLocale**:

  - _Tipo_: `string`
  - _Predefinito_: `'en'`
  - _Descrizione_: Il locale predefinito utilizzato come fallback se il locale richiesto non viene trovato.
  - _Esempio_: `'en'`
  - _Nota_: Questo viene utilizzato per determinare il locale quando non è specificato nell'URL, nei cookie o nell'intestazione.

---

### Configurazione Editor

Definisce le impostazioni relative all'editor integrato, inclusi la porta del server e lo stato attivo.

#### Proprietà

- **applicationURL**:

  - _Tipo_: `string`
  - _Predefinito_: `http://localhost:3000`
  - _Descrizione_: L'URL dell'applicazione. Utilizzato per limitare l'origine dell'editor per motivi di sicurezza.
  - _Esempio_:
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Nota_: L'URL dell'applicazione. Utilizzato per limitare l'origine dell'editor per motivi di sicurezza. Se impostato su `'*'`, l'editor è accessibile da qualsiasi origine.

- **port**:

  - _Tipo_: `number`
  - _Predefinito_: `8000`
  - _Descrizione_: La porta utilizzata dal server dell'editor visivo.

- **editorURL**:

  - _Tipo_: `string`
  - _Predefinito_: `'http://localhost:8000'`
  - _Descrizione_: L'URL del server dell'editor. Utilizzato per limitare l'origine dell'editor per motivi di sicurezza.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Nota_: L'URL del server dell'editor da raggiungere dall'applicazione. Utilizzato per limitare le origini che possono interagire con l'applicazione per motivi di sicurezza. Se impostato su `'*'`, l'editor è accessibile da qualsiasi origine. Dovrebbe essere impostato se la porta viene modificata o se l'editor è ospitato su un dominio diverso.

- **cmsURL**:

  - _Tipo_: `string`
  - _Predefinito_: `'https://intlayer.org'`
  - _Descrizione_: L'URL del CMS di Intlayer.
  - _Esempio_: `'https://intlayer.org'`
  - _Nota_: L'URL del CMS di Intlayer.

- **backendURL**:

  - _Tipo_: `string`
  - _Predefinito_: `https://back.intlayer.org`
  - _Descrizione_: L'URL del server backend.
  - _Esempio_: `http://localhost:4000`

- **enabled**:

  - _Tipo_: `boolean`
  - _Predefinito_: `true`
  - _Descrizione_: Indica se l'applicazione interagisce con l'editor visivo.
  - _Esempio_: `process.env.NODE_ENV !== 'production'`
  - _Nota_: Se true, l'editor sarà in grado di interagire con l'applicazione. Se false, l'editor non sarà in grado di interagire con l'applicazione. In ogni caso, l'editor può essere abilitato solo dall'editor visivo. Disabilitare l'editor per ambienti specifici è un modo per rafforzare la sicurezza.

- **clientId**:

  - _Tipo_: `string` | `undefined`
  - _Predefinito_: `undefined`
  - _Descrizione_: clientId e clientSecret consentono ai pacchetti intlayer di autenticarsi con il backend utilizzando l'autenticazione oAuth2. Un token di accesso viene utilizzato per autenticare l'utente relativo al progetto. Per ottenere un token di accesso, vai su https://intlayer.org/dashboard/project e crea un account.
  - _Esempio_: `true`
  - _Nota_: Importante: Il clientId e il clientSecret devono essere mantenuti segreti e non condivisi pubblicamente. Assicurati di conservarli in un luogo sicuro, come variabili di ambiente.

- **clientSecret**:

  - _Tipo_: `string` | `undefined`
  - _Predefinito_: `undefined`
  - _Descrizione_: clientId e clientSecret consentono ai pacchetti Intlayer di autenticarsi con il backend utilizzando l'autenticazione oAuth2. Un token di accesso viene utilizzato per autenticare l'utente relativo al progetto. Per ottenere un token di accesso, vai su https://intlayer.org/dashboard/project e crea un account.
  - _Esempio_: `true`
  - _Nota_: Importante: Il clientId e il clientSecret devono essere mantenuti segreti e non condivisi pubblicamente. Assicurarsi di conservarli in un luogo sicuro, come variabili di ambiente.

- **hotReload**:

  - _Tipo_: `boolean`
  - _Predefinito_: `false`
  - _Descrizione_: Indica se l'applicazione deve ricaricare automaticamente le configurazioni dei locali quando viene rilevata una modifica.
  - _Esempio_: `true`
  - _Nota_: Ad esempio, quando viene aggiunto o aggiornato un nuovo dizionario, l'applicazione aggiornerà il contenuto da visualizzare nella pagina.
  - _Nota_: Poiché il ricaricamento automatico richiede una connessione continua al server, è disponibile solo per i clienti del piano `enterprise`.

- **dictionaryPriorityStrategy**:
  - _Tipo_: `string`
  - _Predefinito_: `'local_first'`
  - _Descrizione_: La strategia per dare priorità ai dizionari nel caso in cui siano presenti sia dizionari locali che remoti. Se impostato su `'distant_first'`, l'applicazione darà priorità ai dizionari remoti rispetto a quelli locali. Se impostato su `'local_first'`, l'applicazione darà priorità ai dizionari locali rispetto a quelli remoti.
  - _Esempio_: `'distant_first'`

### Configurazione Middleware

Impostazioni che controllano il comportamento del middleware, inclusa la gestione di cookie, intestazioni e prefissi URL per la gestione dei locali.

#### Proprietà

- **headerName**:

  - _Tipo_: `string`
  - _Predefinito_: `'x-intlayer-locale'`
  - _Descrizione_: Il nome dell'intestazione HTTP utilizzata per determinare il locale.
  - _Esempio_: `'x-custom-locale'`
  - _Nota_: Utile per la determinazione del locale basata su API.

- **cookieName**:

  - _Tipo_: `string`
  - _Predefinito_: `'intlayer-locale'`
  - _Descrizione_: Il nome del cookie utilizzato per memorizzare il locale.
  - _Esempio_: `'custom-locale'`
  - _Nota_: Utilizzato per mantenere il locale tra le sessioni.

- **prefixDefault**:

  - _Tipo_: `boolean`
  - _Predefinito_: `false`
  - _Descrizione_: Indica se includere il locale predefinito nell'URL.
  - _Esempio_: `true`
  - _Nota_:
    - Se `true` e `defaultLocale = 'en'`: path = `/en/dashboard` o `/fr/dashboard`
    - Se `false` e `defaultLocale = 'en'`: path = `/dashboard` o `/fr/dashboard`

- **basePath**:

  - _Tipo_: `string`
  - _Predefinito_: `''`
  - _Descrizione_: Il percorso base per gli URL dell'applicazione.
  - _Esempio_: `'/my-app'`
  - _Nota_:
    - Se l'applicazione è ospitata su `https://example.com/my-app`
    - Il percorso base è `'/my-app'`
    - L'URL sarà `https://example.com/my-app/en`
    - Se il percorso base non è impostato, l'URL sarà `https://example.com/en`

- **serverSetCookie**:

  - _Tipo_: `string`
  - _Predefinito_: `'always'`
  - _Descrizione_: Regola per impostare il cookie della lingua sul server.
  - _Opzioni_: `'always'`, `'never'`
  - _Esempio_: `'never'`
  - _Nota_: Controlla se il cookie della lingua viene impostato su ogni richiesta o mai.

- **noPrefix**:

  - _Tipo_: `boolean`
  - _Predefinito_: `false`
  - _Descrizione_: Indica se omettere il prefisso della lingua dagli URL.
  - _Esempio_: `true`
  - _Nota_:
    - Se `true`: Nessun prefisso nell'URL
    - Se `false`: Prefisso nell'URL
    - Esempio con `basePath = '/my-app'`:
      - Se `noPrefix = false`: L'URL sarà `https://example.com/my-app/en`
      - Se `noPrefix = true`: L'URL sarà `https://example.com`

- **detectLocaleOnPrefetchNoPrefix**:

  - _Tipo_: `boolean`
  - _Predefinito_: `false`
  - _Descrizione_: Controlla se la rilevazione del locale avviene durante le richieste di prefetch di Next.js.
  - _Esempio_: `true`
  - _Nota_: Questa impostazione influisce su come Next.js gestisce il prefetch del locale:
    - **Scenario di esempio:**
      - La lingua del browser dell'utente è `'fr'`
      - La pagina corrente è `/fr/about`
      - Il link fa prefetch di `/about`
    - **Con `detectLocaleOnPrefetchNoPrefix: true`:**
      - Il prefetch rileva il locale `'fr'` dal browser
      - Reindirizza il prefetch a `/fr/about`
    - **Con `detectLocaleOnPrefetchNoPrefix: false` (predefinito):**
      - Il prefetch usa il locale predefinito
      - Reindirizza il prefetch a `/en/about` (assumendo che `'en'` sia il predefinito)
    - **Quando usare `true`:**
      - La tua app usa link interni non localizzati (es. `<a href="/about">`)
      - Vuoi un comportamento di rilevazione del locale coerente tra richieste normali e di prefetch
    - **Quando usare `false` (predefinito):**
      - La tua app usa link con prefisso del locale (es. `<a href="/fr/about">`)
      - Vuoi ottimizzare le prestazioni del prefetch
      - Vuoi evitare potenziali loop di reindirizzamento

---

### Configurazione del Contenuto

Impostazioni relative alla gestione dei contenuti all'interno dell'applicazione, inclusi nomi di directory, estensioni di file e configurazioni derivate.

#### Proprietà

- **watch**:

  - _Tipo_: `boolean`
  - _Predefinito_: `process.env.NODE_ENV === 'development'`
  - _Descrizione_: Indica se Intlayer deve monitorare le modifiche nei file di dichiarazione del contenuto nell'app per ricostruire i dizionari correlati.

- **fileExtensions**:

  - _Tipo_: `string[]`
  - _Predefinito_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Descrizione_: Estensioni di file da cercare durante la costruzione dei dizionari.
  - _Esempio_: `['.data.ts', '.data.js', '.data.json']`
  - _Nota_: Personalizzare le estensioni dei file può aiutare a evitare conflitti.

- **baseDir**:

  - _Tipo_: `string`
  - _Predefinito_: `process.cwd()`
  - _Descrizione_: La directory base per il progetto.
  - _Esempio_: `'/path/to/project'`
  - _Nota_: Viene utilizzata per risolvere tutte le directory relative a Intlayer.

- **dictionaryOutput**:

  - _Tipo_: `string[]`
  - _Predefinito_: `['intlayer']`
  - _Descrizione_: Il tipo di output del dizionario da utilizzare, ad esempio `'intlayer'` o `'i18next'`.

- **contentDir**:

  - _Tipo_: `string[]`
  - _Predefinito_: `['src']`
  - _Esempio_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _Descrizione_: Il percorso della directory in cui sono memorizzati i contenuti.

- **dictionariesDir**:

  - _Tipo_: `string`
  - _Predefinito_: `'.intlayer/dictionaries'`
  - _Descrizione_: Il percorso della directory per memorizzare risultati intermedi o di output.

- **moduleAugmentationDir**:

  - _Tipo_: `string`
  - _Predefinito_: `'.intlayer/types'`
  - _Descrizione_: Directory per l'augmentazione dei moduli, consentendo migliori suggerimenti IDE e controllo dei tipi.
  - _Esempio_: `'intlayer-types'`
  - _Nota_: Assicurati di includerlo in `tsconfig.json`.

- **unmergedDictionariesDir**:

  - _Tipo_: `string`
  - _Predefinito_: `'.intlayer/unmerged_dictionary'`
  - _Descrizione_: La directory per memorizzare i dizionari non uniti.
  - _Esempio_: `'translations'`

- **dictionariesDir**:

  - _Tipo_: `string`
  - _Predefinito_: `'.intlayer/dictionary'`
  - _Descrizione_: La directory per memorizzare i dizionari di localizzazione.
  - _Esempio_: `'translations'`

- **i18nextResourcesDir**:

  - _Tipo_: `string`
  - _Predefinito_: `'i18next_dictionary'`
  - _Descrizione_: La directory per memorizzare i dizionari i18n.
  - _Esempio_: `'translations'`
  - _Nota_: Assicurati che questa directory sia configurata per il tipo di output i18next.

- **typesDir**:

  - _Tipo_: `string`
  - _Predefinito_: `'types'`
  - _Descrizione_: La directory per memorizzare i tipi di dizionario.
  - _Esempio_: `'intlayer-types'`

- **mainDir**:

  - _Tipo_: `string`
  - _Predefinito_: `'main'`
  - _Descrizione_: La directory in cui sono memorizzati i file principali dell'applicazione.
  - _Esempio_: `'intlayer-main'`

- **excludedPath**:
  - _Tipo_: `string[]`
  - _Predefinito_: `['node_modules']`
  - _Descrizione_: Directory escluse dalla ricerca di contenuti.
  - _Nota_: Questa impostazione non è ancora utilizzata, ma è prevista per implementazioni future.

### Configurazione del Logger

Impostazioni che controllano il logger, incluso il prefisso da utilizzare.

#### Proprietà

- **mode**:

  - _Tipo_: `string`
  - _Predefinito_: `default`
  - _Descrizione_: Indica la modalità del logger.
  - _Opzioni_: `default`, `verbose`, `disabled`
  - _Esempio_: `default`
  - _Nota_: La modalità del logger. La modalità verbose registrerà più informazioni, ma può essere utilizzata per scopi di debug. La modalità disabled disabiliterà il logger.

- **prefix**:

  - _Tipo_: `string`
  - _Predefinito_: `'[intlayer] '`
  - _Descrizione_: Il prefisso del logger.
  - _Esempio_: `'[my custom prefix] '`
  - _Nota_: Il prefisso del logger.

### Configurazione AI

Impostazioni che controllano le funzionalità AI di Intlayer, incluso il provider, il modello e la chiave API.
Questa configurazione è opzionale se sei registrato sulla [Dashboard di Intlayer](https://intlayer.org/dashboard/project) utilizzando una chiave di accesso. Intlayer gestirà automaticamente la soluzione AI più efficiente ed economica per le tue esigenze. Utilizzare le opzioni predefinite garantisce una migliore manutenibilità a lungo termine poiché Intlayer si aggiorna continuamente per utilizzare i modelli più rilevanti.

Se preferisci utilizzare la tua chiave API o un modello specifico, puoi definire la tua configurazione AI personalizzata. Questa configurazione AI sarà utilizzata globalmente in tutto il tuo ambiente Intlayer. I comandi CLI utilizzeranno queste impostazioni come predefinite per i comandi (ad esempio `fill`), così come l'SDK, l'Editor Visivo e il CMS. Puoi sovrascrivere questi valori predefiniti per casi d'uso specifici utilizzando i parametri dei comandi.
Intlayer supporta più provider AI per una maggiore flessibilità e scelta. I provider attualmente supportati sono:

- **OpenAI** (predefinito)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**

#### Proprietà

- **provider**:

  - _Tipo_: `string`
  - _Predefinito_: `'openai'`
  - _Descrizione_: Il provider da utilizzare per le funzionalità AI di Intlayer.
  - _Opzioni_: `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`
  - _Esempio_: `'anthropic'`
  - _Nota_: I diversi provider possono richiedere chiavi API diverse e avere modelli di prezzo differenti.

- **model**:

  - _Tipo_: `string`
  - _Predefinito_: Nessuno
  - _Descrizione_: Il modello da utilizzare per le funzionalità AI di Intlayer.
  - _Esempio_: `'gpt-4o-2024-11-20'`
  - _Nota_: Il modello specifico da utilizzare varia in base al provider.

- **temperature**:

  - _Tipo_: `number`
  - _Predefinito_: Nessuno
  - _Descrizione_: La temperatura controlla la casualità delle risposte dell'AI.
  - _Esempio_: `0.1`
  - _Nota_: Una temperatura più alta renderà l'AI più creativa e meno prevedibile.

- **apiKey**:

  - _Tipo_: `string`
  - _Predefinito_: Nessuno
  - _Descrizione_: La tua chiave API per il provider selezionato.
  - _Esempio_: `process.env.OPENAI_API_KEY`
  - _Nota_: Importante: le chiavi API devono essere mantenute segrete e non condivise pubblicamente. Assicurati di conservarle in un luogo sicuro, come le variabili d'ambiente.

- **applicationContext**:
  - _Tipo_: `string`
  - _Predefinito_: Nessuno
  - _Descrizione_: Fornisce un contesto aggiuntivo sulla tua applicazione al modello AI, aiutandolo a generare traduzioni più precise e contestualmente appropriate. Questo può includere informazioni sul dominio della tua applicazione, pubblico target, tono o terminologia specifica.

### Configurazione del Build

Impostazioni che controllano come Intlayer ottimizza e compila l'internazionalizzazione della tua applicazione.

Le opzioni di build si applicano ai plugin `@intlayer/babel` e `@intlayer/swc`.

> In modalità sviluppo, Intlayer utilizza importazioni statiche per i dizionari per semplificare l'esperienza di sviluppo.

> Durante l'ottimizzazione, Intlayer sostituirà le chiamate ai dizionari per ottimizzare il chunking, in modo che il bundle finale importi solo i dizionari che vengono effettivamente utilizzati.

#### Proprietà

- **optimize**:

  - _Tipo_: `boolean`
  - _Predefinito_: `process.env.NODE_ENV === 'production'`
  - _Descrizione_: Controlla se il build deve essere ottimizzato.
  - _Esempio_: `true`
  - _Nota_: Quando abilitato, Intlayer sostituirà tutte le chiamate dei dizionari per ottimizzare il chunking. In questo modo il bundle finale importerà solo i dizionari utilizzati. Tutte le importazioni rimarranno come importazioni statiche per evitare l'elaborazione asincrona durante il caricamento dei dizionari.
  - _Nota_: Intlayer sostituirà tutte le chiamate di `useIntlayer` con la modalità definita dall'opzione `importMode` e `getIntlayer` con `getDictionary`.
  - _Nota_: Questa opzione si basa sui plugin `@intlayer/babel` e `@intlayer/swc`.
  - _Nota_: Assicurati che tutte le chiavi siano dichiarate staticamente nelle chiamate `useIntlayer`. ad esempio: `useIntlayer('navbar')`.

- **importMode**:

  - _Tipo_: `'static' | 'dynamic' | 'async'`
  - _Predefinito_: `'static'`
  - _Descrizione_: Controlla come vengono importati i dizionari.
  - _Esempio_: `'dynamic'`
  - _Nota_: Modalità disponibili:
    - "static": I dizionari vengono importati staticamente. Sostituisce `useIntlayer` con `useDictionary`.
    - "dynamic": I dizionari vengono importati dinamicamente utilizzando Suspense. Sostituisce `useIntlayer` con `useDictionaryDynamic`.
    - "async": I dizionari vengono importati dinamicamente in modo asincrono. Sostituisce `useIntlayer` con `await useDictionaryAsync`.
  - _Nota_: Le importazioni dinamiche si basano su Suspense e possono influire leggermente sulle prestazioni di rendering.
  - _Nota_: Se disabilitato, tutte le lingue verranno caricate contemporaneamente, anche se non vengono utilizzate.
  - _Nota_: Questa opzione si basa sui plugin `@intlayer/babel` e `@intlayer/swc`.
  - _Nota_: Assicurati che tutte le chiavi siano dichiarate staticamente nelle chiamate `useIntlayer`. ad esempio: `useIntlayer('navbar')`.
  - _Nota_: Questa opzione verrà ignorata se `optimize` è disabilitato.
  - _Nota_: Nella maggior parte dei casi, `"dynamic"` verrà utilizzato per le applicazioni React, `"async"` per le applicazioni Vue.js.
  - _Nota_: Questa opzione non influenzerà le funzioni `getIntlayer`, `getDictionary`, `useDictionary`, `useDictionaryAsync` e `useDictionaryDynamic`.

- **traversePattern**:
  - _Tipo_: `string[]`
  - _Predefinito_: `['**/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx}', '!**/node_modules/**']`
  - _Descrizione_: Pattern che definiscono quali file devono essere attraversati durante l'ottimizzazione.
    - _Esempio_: `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']`
  - _Nota_: Usa questo per limitare l'ottimizzazione ai file di codice rilevanti e migliorare le prestazioni del build.
  - _Nota_: Questa opzione verrà ignorata se `optimize` è disabilitato.
  - _Nota_: Usa il pattern glob.

## Cronologia della documentazione

- 5.5.11 - 2025-06-29: Aggiunti comandi `docs`
