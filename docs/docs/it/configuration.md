---
createdAt: 2024-08-13
updatedAt: 2025-09-16
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
history:
  - version: 7.5.0
    date: 2025-12-17
    changes: Aggiunta opzione `buildMode`
  - version: 6.0.0
    date: 2025-09-16
    changes: Aggiunta modalità di importazione `live`
  - version: 6.0.0
    date: 2025-09-04
    changes: Sostituito il campo `hotReload` con `liveSync` e aggiunti i campi `liveSyncPort` e `liveSyncURL`
  - version: 5.6.1
    date: 2025-07-25
    changes: Sostituito `activateDynamicImport` con l'opzione `importMode`
  - version: 5.6.0
    date: 2025-07-13
    changes: Modificata la directory di contenuto predefinita da `['src']` a `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: Aggiunti i comandi `docs`
---

# Documentazione di Configurazione di Intlayer

## Panoramica

I file di configurazione di Intlayer permettono la personalizzazione di vari aspetti del plugin, come l'internazionalizzazione, il middleware e la gestione dei contenuti. Questo documento fornisce una descrizione dettagliata di ogni proprietà nella configurazione.

---

## Indice

<TOC/>

---

## Formati di File di Configurazione Supportati

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
    locales: [Locales.ENGLISH], // località supportate
  },
  content: {
    autoFill: "./{{fileName}}.content.json", // percorso per il riempimento automatico del contenuto
    contentDir: ["src", "../ui-library"], // directory dei contenuti
  },
  middleware: {
    noPrefix: false, // se true, disabilita il prefisso della località
  },
  editor: {
    applicationURL: "https://example.com", // URL dell'applicazione per l'editor
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY, // chiave API per AI
    applicationContext: "This is a test application", // contesto dell'applicazione per AI
  },
  build: {
    importMode: "dynamic", // modalità di importazione durante la build
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH], // località supportate
  },
  content: {
    contentDir: ["src", "../ui-library"], // directory dei contenuti
  },
  middleware: {
    noPrefix: false, // se true, disabilita il prefisso della località
  },
  editor: {
    applicationURL: "https://example.com", // URL dell'applicazione editor
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY, // chiave API per AI
    applicationContext: "Questa è un'applicazione di test", // contesto dell'applicazione per AI
  },
  build: {
    importMode: "dynamic", // modalità di importazione
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"], // località supportate
  },
  "content": {
    "contentDir": ["src", "../ui-library"], // directory dei contenuti
  },
  "middleware": {
    "noPrefix": false, // se true, disabilita il prefisso della località
  },
  "editor": {
    "applicationURL": "https://example.com", // URL dell'applicazione editor
  },
  "ai": {
    "apiKey": "XXXX",
    "applicationContext": "Questa è un'applicazione di test",
  },
  "build": {
    "importMode": "dynamic",
  },
}
```

---

## Riferimento alla Configurazione

Le sezioni seguenti descrivono le varie impostazioni di configurazione disponibili per Intlayer.

---

### Configurazione dell'Internazionalizzazione

Definisce le impostazioni relative all'internazionalizzazione, incluse le località disponibili e la località predefinita per l'applicazione.

#### Proprietà

- **locales**:
  - _Tipo_: `string[]`
  - _Predefinito_: `['en']`
  - _Descrizione_: L'elenco delle località supportate nell'applicazione.
  - _Esempio_: `['en', 'fr', 'es']`

- **requiredLocales**:
  - _Tipo_: `string[]`
  - _Predefinito_: `[]`
  - _Descrizione_: L'elenco delle località obbligatorie nell'applicazione.
  - _Esempio_: `[]`
  - _Nota_: Se vuoto, tutte le localizzazioni sono richieste in modalità `strict`.
  - _Nota_: Assicurarsi che le localizzazioni richieste siano anche definite nel campo `locales`.
- **strictMode**:
  - _Tipo_: `string`
  - _Predefinito_: `inclusive`
  - _Descrizione_: Garantisce implementazioni rigorose dei contenuti internazionalizzati usando typescript.
  - _Nota_: Se impostato su "strict", la funzione di traduzione `t` richiederà che ogni localizzazione dichiarata sia definita. Se manca una localizzazione, o se una localizzazione non è dichiarata nella tua configurazione, genererà un errore.
  - _Nota_: Se impostato su "inclusive", la funzione di traduzione `t` richiederà che ogni localizzazione dichiarata sia definita. Se manca una localizzazione, genererà un avviso. Ma accetterà se una localizzazione non è dichiarata nella tua configurazione, ma esiste.
  - _Nota_: Se impostato su "loose", la funzione di traduzione `t` accetterà qualsiasi locale esistente.

- **defaultLocale**:
  - _Tipo_: `string`
  - _Predefinito_: `'en'`
  - _Descrizione_: La locale predefinita utilizzata come fallback se la locale richiesta non viene trovata.
  - _Esempio_: `'en'`
  - _Nota_: Viene utilizzata per determinare la locale quando nessuna è specificata nell'URL, nel cookie o nell'header.

---

### Configurazione dell'Editor

Definisce le impostazioni relative all'editor integrato, incluso il porto del server e lo stato attivo.

#### Proprietà

- **applicationURL**:
  - _Tipo_: `string`
  - _Predefinito_: `http://localhost:3000`
  - _Descrizione_: L'URL dell'applicazione. Usato per limitare l'origine dell'editor per motivi di sicurezza.
  - _Esempio_:
    - `'http://localhost:3000'`
    - `'https://example.com'`
- `process.env.INTLAYER_EDITOR_URL`
  - _Nota_: L'URL dell'applicazione. Utilizzato per limitare l'origine dell'editor per motivi di sicurezza. Se impostato a `'*'`, l'editor è accessibile da qualsiasi origine.

- **port**:
  - _Tipo_: `number`
  - _Predefinito_: `8000`
  - _Descrizione_: La porta utilizzata dal server dell'editor visuale.

- **editorURL**:
  - _Tipo_: `string`
  - _Predefinito_: `'http://localhost:8000'`
  - _Descrizione_: L'URL del server dell'editor. Utilizzato per limitare l'origine dell'editor per motivi di sicurezza.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Nota_: L'URL del server dell'editor da raggiungere dall'applicazione. Usato per limitare le origini che possono interagire con l'applicazione per motivi di sicurezza. Se impostato a `'*'`, l'editor è accessibile da qualsiasi origine. Deve essere impostato se la porta viene cambiata o se l'editor è ospitato su un dominio diverso.

- **cmsURL**:
  - _Tipo_: `string`
  - _Predefinito_: `'https://intlayer.org'`
  - _Descrizione_: L'URL del CMS Intlayer.
  - _Esempio_: `'https://intlayer.org'`
  - _Nota_: L'URL del CMS Intlayer.

- **backendURL**:
  - _Tipo_: `string`
  - _Predefinito_: `https://back.intlayer.org`
  - _Descrizione_: L'URL del server backend.
  - _Esempio_: `http://localhost:4000`

- **enabled**:
  - _Tipo_: `boolean`
  - _Predefinito_: `true`
  - _Descrizione_: Indica se l'applicazione interagisce con l'editor visuale.
  - _Esempio_: `process.env.NODE_ENV !== 'production'`
  - _Nota_: Se true, l'editor sarà in grado di interagire con l'applicazione. Se false, l'editor non potrà interagire con l'applicazione. In ogni caso, l'editor può essere abilitato solo dall'editor visuale. Disabilitare l'editor per ambienti specifici è un modo per rafforzare la sicurezza.

- **clientId**:
  - _Tipo_: `string` | `undefined`
  - _Predefinito_: `undefined`
  - _Descrizione_: clientId e clientSecret permettono ai pacchetti intlayer di autenticarsi con il backend utilizzando l'autenticazione oAuth2. Un token di accesso viene utilizzato per autenticare l'utente relativo al progetto. Per ottenere un token di accesso, vai su https://intlayer.org/dashboard/project e crea un account.
  - _Esempio_: `true`
  - _Nota_: Importante: clientId e clientSecret devono essere mantenuti segreti e non condivisi pubblicamente. Assicurati di conservarli in un luogo sicuro, come le variabili d'ambiente.

- **clientSecret**:
  - _Tipo_: `string` | `undefined`
  - _Predefinito_: `undefined`
  - _Descrizione_: clientId e clientSecret permettono ai pacchetti intlayer di autenticarsi con il backend utilizzando l'autenticazione oAuth2. Un token di accesso viene utilizzato per autenticare l'utente relativo al progetto. Per ottenere un token di accesso, vai su https://intlayer.org/dashboard/project e crea un account.
  - _Esempio_: `true`
  - _Nota_: Importante: clientId e clientSecret devono essere mantenuti segreti e non condivisi pubblicamente. Assicurati di conservarli in un luogo sicuro, come variabili d'ambiente.

- **dictionaryPriorityStrategy**:
  - _Tipo_: `string`
  - _Predefinito_: `'local_first'`
  - _Descrizione_: La strategia per dare priorità ai dizionari nel caso in cui siano presenti sia dizionari locali che remoti. Se impostato su `'distant_first'`, l'applicazione darà priorità ai dizionari remoti rispetto a quelli locali. Se impostato su `'local_first'`, l'applicazione darà priorità ai dizionari locali rispetto a quelli remoti.
  - _Esempio_: `'distant_first'`

- **liveSync**:
  - _Tipo_: `boolean`
  - _Predefinito_: `false`
  - _Descrizione_: Indica se il server dell'applicazione deve ricaricare dinamicamente il contenuto dell'applicazione quando viene rilevata una modifica nel CMS / Visual Editor / Backend.
  - _Esempio_: `true`
  - _Nota_: Ad esempio, quando un nuovo dizionario viene aggiunto o aggiornato, l'applicazione aggiornerà il contenuto da visualizzare nella pagina.
  - _Nota_: La sincronizzazione live necessita di esternalizzare il contenuto dell'applicazione su un altro server. Ciò significa che può influire leggermente sulle prestazioni dell'applicazione. Per limitare questo, consigliamo di ospitare l'applicazione e il server di sincronizzazione live sulla stessa macchina. Inoltre, la combinazione di sincronizzazione live e `optimize` può generare un numero considerevole di richieste al server di sincronizzazione live. A seconda della tua infrastruttura, consigliamo di testare entrambe le opzioni e la loro combinazione.

- **liveSyncPort**:
  - _Tipo_: `number`
  - _Predefinito_: `4000`
  - _Descrizione_: La porta del server di sincronizzazione live.
  - _Esempio_: `4000`
  - _Nota_: La porta del server di sincronizzazione live.

- **liveSyncURL**:
  - _Tipo_: `string`
  - _Predefinito_: `'http://localhost:{liveSyncPort}'`
  - _Descrizione_: L'URL del server di sincronizzazione live.
  - _Esempio_: `'https://example.com'`
  - _Nota_: Punta a localhost di default ma può essere cambiato in qualsiasi URL nel caso di un server di sincronizzazione live remoto.

### Configurazione del Middleware

Impostazioni che controllano il comportamento del middleware, incluso come l'applicazione gestisce cookie, header e prefissi URL per la gestione della localizzazione.

#### Proprietà

- **headerName**:
  - _Tipo_: `string`
  - _Predefinito_: `'x-intlayer-locale'`
  - _Descrizione_: Il nome dell'header HTTP usato per determinare la localizzazione.
  - _Esempio_: `'x-custom-locale'`
  - _Nota_: Utile per la determinazione della localizzazione basata su API.

- **cookieName**:
  - _Tipo_: `string`
  - _Predefinito_: `'intlayer-locale'`
  - _Descrizione_: Il nome del cookie usato per memorizzare la localizzazione.
  - _Esempio_: `'custom-locale'`
  - _Nota_: Utilizzato per mantenere la localizzazione tra le sessioni.

- **prefixDefault**:
  - _Tipo_: `boolean`
  - _Predefinito_: `false`
  - _Descrizione_: Se includere la localizzazione predefinita nell'URL.
  - _Esempio_: `true`
  - _Nota_:
    - Se `true` e `defaultLocale = 'en'`: percorso = `/en/dashboard` o `/fr/dashboard`
    - Se `false` e `defaultLocale = 'en'`: percorso = `/dashboard` o `/fr/dashboard`

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
  - _Nota_: Controlla se il cookie della lingua viene impostato ad ogni richiesta o mai.

- **noPrefix**:
  - _Tipo_: `boolean`
  - _Predefinito_: `false`
  - _Descrizione_: Se omettere il prefisso della lingua dagli URL.
  - _Esempio_: `true`
  - _Nota_:
    - Se `true`: Nessun prefisso nell'URL
    - Se `false`: Prefisso nell'URL
    - Esempio con `basePath = '/my-app'`:
      - Se `noPrefix = false`: l'URL sarà `https://example.com/my-app/en`
      - Se `noPrefix = true`: l'URL sarà `https://example.com`

---

### Configurazione del Contenuto

Impostazioni relative alla gestione del contenuto all'interno dell'applicazione, inclusi nomi delle directory, estensioni dei file e configurazioni derivate.

#### Proprietà

- **autoFill**:
  - _Tipo_: `boolean | string | { [key in Locales]?: string }`
  - _Predefinito_: `undefined`
  - _Descrizione_: Indica come il contenuto dovrebbe essere compilato automaticamente usando l'IA. Può essere dichiarato globalmente nel file `intlayer.config.ts`.
  - _Esempio_: true
  - _Esempio_: `'./{{fileName}}.content.json'`
  - _Esempio_: `{ fr: './{{fileName}}.fr.content.json', es: './{{fileName}}.es.content.json' }`
  - _Nota_: La configurazione di auto compilazione. Può essere:
    - booleano: Abilita l'auto compilazione per tutte le localizzazioni
    - stringa: Percorso a un singolo file o modello con variabili
    - oggetto: Percorsi file per ogni localizzazione

- **watch**:
  - _Tipo_: `boolean`
  - _Predefinito_: `process.env.NODE_ENV === 'development'`
  - _Descrizione_: Indica se Intlayer deve monitorare le modifiche nei file di dichiarazione del contenuto nell'app per ricostruire i dizionari correlati.

- **fileExtensions**:
  - _Tipo_: `string[]`
  - _Predefinito_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Descrizione_: Estensioni dei file da cercare durante la costruzione dei dizionari.
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
  - _Predefinito_: `['.']`
  - _Esempio_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _Descrizione_: Il percorso della directory dove è memorizzato il contenuto.

- **dictionariesDir**:
  - _Tipo_: `string`
  - _Predefinito_: `'.intlayer/dictionaries'`
  - _Descrizione_: Il percorso della directory per memorizzare risultati intermedi o output.

- **moduleAugmentationDir**:
  - _Tipo_: `string`
  - _Predefinito_: `'.intlayer/types'`
  - _Descrizione_: Directory per l'augmentation dei moduli, che permette migliori suggerimenti IDE e controllo dei tipi.
  - _Esempio_: `'intlayer-types'`
  - _Nota_: Assicurarsi di includere questa directory in `tsconfig.json`.

- **unmergedDictionariesDir**:
  - _Tipo_: `string`
  - _Predefinito_: `'.intlayer/unmerged_dictionary'`
  - _Descrizione_: La directory per memorizzare dizionari non uniti.
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
  - _Nota_: Assicurarsi che questa directory sia configurata per il tipo di output i18next.

- **typesDir**:
  - _Tipo_: `string`
  - _Predefinito_: `'types'`
  - _Descrizione_: La directory per memorizzare i tipi di dizionario.
  - _Esempio_: `'intlayer-types'`

- **mainDir**:
  - _Tipo_: `string`
  - _Predefinito_: `'main'`
  - _Descrizione_: La directory dove sono memorizzati i file principali dell'applicazione.
  - _Esempio_: `'intlayer-main'`

- **excludedPath**:
  - _Tipo_: `string[]`
  - _Predefinito_: `['node_modules']`
  - _Descrizione_: Directory escluse dalla ricerca dei contenuti.
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
  - _Nota_: La modalità del logger. La modalità verbose registra più informazioni, ma può essere usata per scopi di debug. La modalità disabled disabilita il logger.

- **prefix**:
  - _Tipo_: `string`
  - _Predefinito_: `'[intlayer] '`
  - _Descrizione_: Il prefisso del logger.
  - _Esempio_: `'[my custom prefix] '`
  - _Nota_: Il prefisso del logger.

### Configurazione AI

Impostazioni che controllano le funzionalità AI di Intlayer, inclusi provider, modello e chiave API.

Questa configurazione è opzionale se sei registrato sul [Cruscotto Intlayer](https://intlayer.org/dashboard/project) utilizzando una chiave di accesso. Intlayer gestirà automaticamente la soluzione AI più efficiente e conveniente per le tue esigenze. Utilizzare le opzioni predefinite garantisce una migliore manutenzione a lungo termine poiché Intlayer aggiorna continuamente per utilizzare i modelli più rilevanti.

Se preferisci utilizzare la tua chiave API o un modello specifico, puoi definire la tua configurazione AI personalizzata.
Questa configurazione AI sarà utilizzata globalmente in tutto il tuo ambiente Intlayer. I comandi CLI utilizzeranno queste impostazioni come valori predefiniti per i comandi (ad esempio `fill`), così come l’SDK, l’Editor Visivo e il CMS. Puoi sovrascrivere questi valori predefiniti per casi d’uso specifici utilizzando i parametri dei comandi.

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
  - _Nota_: Diversi provider potrebbero richiedere chiavi API differenti e avere modelli di prezzo diversi.

- **model**:
  - _Tipo_: `string`
  - _Predefinito_: Nessuno
  - _Descrizione_: Il modello da utilizzare per le funzionalità AI di Intlayer.
  - _Esempio_: `'gpt-4o-2024-11-20'`
  - _Nota_: Il modello specifico da utilizzare varia a seconda del provider.

- **temperature**:
  - _Tipo_: `number`
  - _Predefinito_: Nessuno
  - _Descrizione_: La temperatura controlla la casualità delle risposte dell'AI.
  - _Esempio_: `0.1`
  - _Nota_: Una temperatura più alta rende l'AI più creativa e meno prevedibile.

- **apiKey**:
  - _Tipo_: `string`
  - _Predefinito_: Nessuno
  - _Descrizione_: La tua chiave API per il provider selezionato.
  - _Esempio_: `process.env.OPENAI_API_KEY`
  - _Nota_: Importante: le chiavi API devono essere mantenute segrete e non condivise pubblicamente. Assicurati di conservarle in un luogo sicuro, come le variabili d'ambiente.

- **applicationContext**:
  - _Tipo_: `string`
  - _Predefinito_: Nessuno
  - _Descrizione_: Fornisce un contesto aggiuntivo sulla tua applicazione al modello AI, aiutandolo a generare traduzioni più accurate e contestualmente appropriate. Questo può includere informazioni sul dominio della tua app, il pubblico target, il tono o terminologia specifica.

- **baseURL**:
  - _Tipo_: `string`
  - _Predefinito_: Nessuno
  - _Descrizione_: L'URL di base per l'API AI.
  - _Esempio_: `'https://api.openai.com/v1'`
  - _Nota_: Può essere utilizzato per puntare a un endpoint API AI locale o personalizzato.

### Configurazione della Build

Impostazioni che controllano come Intlayer ottimizza e costruisce l'internazionalizzazione della tua applicazione.

Le opzioni di build si applicano ai plugin `@intlayer/babel` e `@intlayer/swc`.

> In modalità di sviluppo, Intlayer utilizza importazioni statiche per i dizionari per semplificare l'esperienza di sviluppo.

> Quando ottimizzato, Intlayer sostituirà le chiamate ai dizionari per ottimizzare il chunking, in modo che il bundle finale importi solo i dizionari effettivamente utilizzati.

#### Proprietà

- **mode**:
  - _Tipo_: `'auto' | 'manual'`
  - _Predefinito_: `'auto'`
  - _Descrizione_: Controlla la modalità della build.
  - _Esempio_: `'manual'`
  - _Nota_: Se 'auto', la build sarà abilitata automaticamente quando l'applicazione viene costruita.
  - _Nota_: Se 'manual', la build sarà impostata solo quando viene eseguito il comando di build.
  - _Nota_: Può essere utilizzato per disabilitare la build dei dizionari, ad esempio quando l'esecuzione in un ambiente Node.js dovrebbe essere evitata.

- **optimize**:
  - _Tipo_: `boolean`
  - _Predefinito_: `process.env.NODE_ENV === 'production'`
  - _Descrizione_: Controlla se la build deve essere ottimizzata.
  - _Esempio_: `true`
  - _Nota_: Quando abilitato, Intlayer sostituirà tutte le chiamate ai dizionari per ottimizzare il chunking. In questo modo il bundle finale importerà solo i dizionari utilizzati. Tutte le importazioni rimarranno come importazioni statiche per evitare l'elaborazione asincrona durante il caricamento dei dizionari.
  - _Nota_: Intlayer sostituirà tutte le chiamate di `useIntlayer` con la modalità definita dall'opzione `importMode` e `getIntlayer` con `getDictionary`.
  - _Nota_: Questa opzione si basa sui plugin `@intlayer/babel` e `@intlayer/swc`.
  - _Nota_: Assicurarsi che tutte le chiavi siano dichiarate staticamente nelle chiamate a `useIntlayer`. Es. `useIntlayer('navbar')`.

- **importMode**:
  - _Tipo_: `'static' | 'dynamic' | 'live'`
  - _Predefinito_: `'static'`
  - _Descrizione_: Controlla come vengono importati i dizionari.
  - _Esempio_: `'dynamic'`
  - _Nota_: Modalità disponibili:
    - "static": I dizionari sono importati staticamente. Sostituisce `useIntlayer` con `useDictionary`.
    - "dynamic": I dizionari sono importati dinamicamente usando Suspense. Sostituisce `useIntlayer` con `useDictionaryDynamic`.
  - "live": I dizionari vengono recuperati dinamicamente utilizzando l'API di sincronizzazione live. Sostituisce `useIntlayer` con `useDictionaryFetch`.
  - _Nota_: Gli import dinamici si basano su Suspense e possono influire leggermente sulle prestazioni di rendering.
  - _Nota_: Se disabilitato, tutte le localizzazioni verranno caricate contemporaneamente, anche se non vengono utilizzate.
  - _Nota_: Questa opzione si basa sui plugin `@intlayer/babel` e `@intlayer/swc`.
  - _Nota_: Assicurarsi che tutte le chiavi siano dichiarate staticamente nelle chiamate a `useIntlayer`, ad esempio `useIntlayer('navbar')`.
  - _Nota_: Questa opzione verrà ignorata se `optimize` è disabilitato.
  - _Nota_: Se impostato su "live", solo i dizionari che includono contenuti remoti e sono contrassegnati come "live" saranno trasformati in modalità live. Gli altri saranno importati dinamicamente in modalità "dynamic" per ottimizzare il numero di richieste di fetch e le prestazioni di caricamento.
  - _Nota_: La modalità live utilizzerà l'API di sincronizzazione live per recuperare i dizionari. Se la chiamata API fallisce, i dizionari saranno importati dinamicamente in modalità "dynamic".
  - _Nota_: Questa opzione non influenzerà le funzioni `getIntlayer`, `getDictionary`, `useDictionary`, `useDictionaryAsync` e `useDictionaryDynamic`.

- **traversePattern**:
  - _Tipo_: `string[]`
  - _Predefinito_: `['**\/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx}', '!**\/node_modules/**']`
  - _Descrizione_: Pattern che definiscono quali file devono essere attraversati durante l'ottimizzazione.
    - _Esempio_: `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _Nota_: Usare questo per limitare l'ottimizzazione ai file di codice rilevanti e migliorare le prestazioni di build.
  - _Nota_: Questa opzione sarà ignorata se `optimize` è disabilitato.
  - _Nota_: Usare pattern glob.
