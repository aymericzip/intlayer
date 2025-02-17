# Intlayer Configuration Documentation

## Panoramica

I file di configurazione di Intlayer consentono la personalizzazione di vari aspetti del plugin, come l'internazionalizzazione, il middleware e la gestione dei contenuti. Questo documento fornisce una descrizione dettagliata di ciascuna proprietà nella configurazione.

---

## Supporto per File di Configurazione

Intlayer accetta i formati di file di configurazione JSON, JS, MJS e TS:

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
    locales: [Locales.ITALIAN],
  },
  content: {
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ITALIAN],
  },
  content: {
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["it"],
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

## Riferimento di Configurazione

Le seguenti sezioni descrivono le varie impostazioni di configurazione disponibili per Intlayer.

---

### Configurazione dell'Internazionalizzazione

Definisce le impostazioni relative all'internazionalizzazione, comprese le localizzazioni disponibili e la localizzazione predefinita per l'applicazione.

#### Proprietà

- **locales**:
  - _Tipo_: `string[]`
  - _Predefinito_: `['it']`
  - _Descrizione_: L'elenco delle localizzazioni supportate nell'applicazione.
  - _Esempio_: `['it', 'fr', 'es']`
- **strictMode**:

  - _Tipo_: `string`
  - _Predefinito_: `inclusive`
  - _Descrizione_: Assicura implementazioni forti di contenuti internazionalizzati utilizzando TypeScript.
  - _Nota_: Se impostato su "strict", la funzione di traduzione `t` richiederà che ciascuna localizzazione dichiarata sia definita. Se una localizzazione è assente, o se una localizzazione non è dichiarata nella tua configurazione, verrà generato un errore.
  - _Nota_: Se impostato su "inclusive", la funzione di traduzione `t` richiederà che ciascuna localizzazione dichiarata sia definita. Se una localizzazione è assente, verrà generato un avviso. Ma verrà accettato se una localizzazione non è dichiarata nella tua configurazione, ma esiste.
  - _Nota_: Se impostato su "loose", la funzione di traduzione `t` accetterà qualsiasi localizzazione esistente.

- **defaultLocale**:
  - _Tipo_: `string`
  - _Predefinito_: `'it'`
  - _Descrizione_: La localizzazione predefinita utilizzata come fallback se la localizzazione richiesta non viene trovata.
  - _Esempio_: `'it'`
  - _Nota_: Questo viene utilizzato per determinare la localizzazione quando nessuna è specificata nell'URL, nei cookie o nell'intestazione.

---

### Configurazione dell'Editor

Definisce le impostazioni relative all'editor integrato, incluso il numero di porta del server e il suo stato attivo.

#### Proprietà

- **backendURL**:

  - _Tipo_: `string`
  - _Predefinito_: `https://back.intlayer.org`
  - _Descrizione_: L'URL del server backend.
  - _Esempio_: `http://localhost:4000`

- **enabled**:

  - _Tipo_: `boolean`
  - _Predefinito_: `true`
  - _Descrizione_: Indica se l'editor è attivo.
  - _Esempio_: `true`
  - _Nota_: Può essere impostato utilizzando NODE_ENV o un'altra variabile ambientale dedicata.

- **clientId**:

  - _Tipo_: `string` | `undefined`
  - _Predefinito_: `undefined`
  - _Descrizione_: clientId e clientSecret consentono ai pacchetti di intlayer di autenticarsi con il backend utilizzando l'autenticazione oAuth2. Un token di accesso viene utilizzato per autenticare l'utente relativo al progetto. Per ottenere un token di accesso, visita https://intlayer.org/dashboard/project e crea un account.
  - _Esempio_: `true`
  - _Nota_: Importante: clientId e clientSecret devono essere mantenuti segreti e non condivisi pubblicamente. Assicurati di tenerli in un luogo sicuro, come le variabili ambientali.

- **clientSecret**:
  - _Tipo_: `string` | `undefined`
  - _Predefinito_: `undefined`
  - _Descrizione_: clientId e clientSecret consentono ai pacchetti di intlayer di autenticarsi con il backend utilizzando l'autenticazione oAuth2. Un token di accesso viene utilizzato per autenticare l'utente relativo al progetto. Per ottenere un token di accesso, visita https://intlayer.org/dashboard/project e crea un account.
  - _Esempio_: `true`
  - _Nota_: Importante: clientId e clientSecret devono essere mantenuti segreti e non condivisi pubblicamente. Assicurati di tenerli in un luogo sicuro, come le variabili ambientali.

### Configurazione del Middleware

Impostazioni che controllano il comportamento del middleware, incluso come l'applicazione gestisce i cookie, le intestazioni e i prefissi URL per la gestione delle localizzazioni.

#### Proprietà

- **headerName**:
  - _Tipo_: `string`
  - _Predefinito_: `'x-intlayer-locale'`
  - _Descrizione_: Il nome dell'intestazione HTTP utilizzato per determinare la localizzazione.
  - _Esempio_: `'x-custom-locale'`
  - _Nota_: Questo è utile per la determinazione della localizzazione basata su API.
- **cookieName**:
  - _Tipo_: `string`
  - _Predefinito_: `'intlayer-locale'`
  - _Descrizione_: Il nome del cookie utilizzato per memorizzare la localizzazione.
  - _Esempio_: `'custom-locale'`
  - _Nota_: Utilizzato per mantenere la localizzazione tra le sessioni.
- **prefixDefault**:
  - _Tipo_: `boolean`
  - _Predefinito_: `true`
  - _Descrizione_: Se includere o meno la localizzazione predefinita nell'URL.
  - _Esempio_: `false`
  - _Nota_: Se `false`, gli URL per la localizzazione predefinita non avranno un prefisso di localizzazione.
- **basePath**:
  - _Tipo_: `string`
  - _Predefinito_: `''`
  - _Descrizione_: Il percorso base per le URL dell'applicazione.
  - _Esempio_: `'/my-app'`
  - _Nota_: Questo influisce su come vengono costruiti gli URL per l'applicazione.
- **serverSetCookie**:
  - _Tipo_: `string`
  - _Predefinito_: `'always'`
  - _Descrizione_: Regola per impostare il cookie della localizzazione sul server.
  - _Opzioni_: `'always'`, `'never'`
  - _Esempio_: `'never'`
  - _Nota_: Controlla se il cookie della localizzazione viene impostato in ogni richiesta o mai.
- **noPrefix**:
  - _Tipo_: `boolean`
  - _Predefinito_: `false`
  - _Descrizione_: Se omettere o meno il prefisso della localizzazione dagli URL.
  - _Esempio_: `true`
  - _Nota_: Se `true`, gli URL non conterranno informazioni sulla localizzazione.

---

### Configurazione dei Contenuti

Impostazioni relative alla gestione dei contenuti all'interno dell'applicazione, inclusi nomi delle directory, estensioni dei file e configurazioni derivate.

#### Proprietà

- **watch**:
  - _Tipo_: `boolean`
  - _Predefinito_: `process.env.NODE_ENV === 'development'`
  - _Descrizione_: Indica se Intlayer dovrebbe monitorare le modifiche nei file di dichiarazione dei contenuti nell'app per ricostruire i dizionari correlati.
- **fileExtensions**:
  - _Tipo_: `string[]`
  - _Predefinito_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Descrizione_: Estensioni dei file da cercare quando si costruiscono i dizionari.
  - _Esempio_: `['.data.ts', '.data.js', '.data.json']`
  - _Nota_: Personalizzare le estensioni dei file può aiutare ad evitare conflitti.
- **baseDir**:
  - _Tipo_: `string`
  - _Predefinito_: `process.cwd()`
  - _Descrizione_: La directory base per il progetto.
  - _Esempio_: `'/path/to/project'`
  - _Nota_: Questo viene utilizzato per risolvere tutte le directory relative a Intlayer.
- **dictionaryOutput**:
  - _Tipo_: `string[]`
  - _Predefinito_: `['intlayer']`
  - _Descrizione_: Il tipo di output del dizionario da utilizzare, ad esempio, `'intlayer'` oppure `'i18next'`.
- **contentDirName**:
  - _Tipo_: `string`
  - _Predefinito_: `'src'`
  - _Descrizione_: Il nome della directory in cui sono memorizzati i contenuti.
  - _Esempio_: `'data'`, `'content'`, `'locales'`
  - _Nota_: Se non si trova a livello della directory base, aggiornare il `contentDir`.
- **contentDir**:

  - _Tipo_: `string`
  - _DerivatoDa_: `'baseDir'` / `'contentDirName'`
  - _Descrizione_: Il percorso della directory in cui sono memorizzati i contenuti.

- **resultDirName**:
  - _Tipo_: `string`
  - _Predefinito_: `'.intlayer'`
  - _Descrizione_: Il nome della directory in cui sono memorizzati i risultati.
  - _Esempio_: `'outputOFIntlayer'`
  - _Nota_: Se questa directory non è a livello base, aggiornare `resultDir`.
- **resultDir**:

  - _Tipo_: `string`
  - _DerivatoDa_: `'baseDir'` / `'resultDirName'`
  - _Descrizione_: Il percorso della directory per memorizzare risultati intermedi o di output.

- **moduleAugmentationDirName**:

  - _Tipo_: `string`
  - _Predefinito_: `'types'`
  - _Descrizione_: Directory per l'aumento del modulo, che consente suggerimenti migliori da parte dell'IDE e il controllo dei tipi.
  - _Esempio_: `'intlayer-types'`
  - _Nota_: Assicurati di includere questo in `tsconfig.json`.

- **moduleAugmentationDir**:

  - _Tipo_: `string`
  - _DerivatoDa_: `'baseDir'` / `'moduleAugmentationDirName'`
  - _Descrizione_: Il percorso per l'aumento del modulo e definizioni di tipo aggiuntive.

- **dictionariesDirName**:
  - _Tipo_: `string`
  - _Predefinito_: `'dictionary'`
  - _Descrizione_: Directory per memorizzare i dizionari.
  - _Esempio_: `'translations'`
  - _Nota_: Se non è a livello della directory dei risultati, aggiornare `dictionariesDir`.
- **dictionariesDir**:

  - _Tipo_: `string`
  - _DerivatoDa_: `'resultDir'` / `'dictionariesDirName'`
  - _Descrizione_: La directory per memorizzare i dizionari di localizzazione.

- **i18nextResourcesDirName**:
  - _Tipo_: `string`
  - _Predefinito_: `'i18next_dictionary'`
  - _Descrizione_: Directory per memorizzare i dizionari i18n.
  - _Esempio_: `'translations'`
  - _Nota_: Se non è a livello della directory dei risultati, aggiornare `i18nextResourcesDir`.
  - _Nota_: Assicurati che l'output dei dizionari i18n includa i18next per costruire i dizionari per i18next.
- **i18nextResourcesDir**:

  - _Tipo_: `string`
  - _DerivatoDa_: `'resultDir'` / `'i18nextResourcesDirName'`
  - _Descrizione_: La directory per memorizzare i dizionari i18n.
  - _Nota_: Assicurati che questa directory sia configurata per il tipo di output i18next.

- **typeDirName**:

  - _Tipo_: `string`
  - _Predefinito_: `'types'`
  - _Descrizione_: Directory per memorizzare i tipi di dizionario.
  - _Esempio_: `'intlayer-types'`
  - _Nota_: Se non è a livello della directory dei risultati, aggiornare `typesDir`.

- **typesDir**:

  - _Tipo_: `string`
  - _DerivatoDa_: `'resultDir'` / `'typeDirName'`
  - _Descrizione_: La directory per memorizzare i tipi di dizionario.

- **mainDirName**:
  - _Tipo_: `string`
  - _Predefinito_: `'main'`
  - _Descrizione_: Directory per memorizzare i file principali.
  - _Esempio_: `'intlayer-main'`
  - _Nota_: Se non è a livello della directory dei risultati, aggiornare `mainDir`.
- **mainDir**:
  - _Tipo_: `string`
  - _DerivatoDa_: `'resultDir'` / `'mainDirName'`
  - _Descrizione_: La directory in cui sono memorizzati i file principali dell'applicazione.
- **excludedPath**:
  - _Tipo_: `string[]`
  - _Predefinito_: `['node_modules']`
  - _Descrizione_: Directory escluse dalla ricerca dei contenuti.
  - _Nota_: Questa impostazione non è ancora utilizzata, ma è pianificata per implementazioni future.

### Configurazione del Logger

Impostazioni che controllano il logger, incluso il livello di registrazione e il prefisso da utilizzare.

#### Proprietà

- **enabled**:
  - _Tipo_: `boolean`
  - _Predefinito_: `true`
  - _Descrizione_: Indica se il logger è abilitato.
  - _Esempio_: `true`
  - _Nota_: Può essere impostato utilizzando NODE_ENV o un'altra variabile ambientale dedicata.
- **level**:
  - _Tipo_: `'info' | 'warn' | 'debug' | 'log'`
  - _Predefinito_: `'log'`
  - _Descrizione_: Il livello del logger.
  - _Esempio_: `'info'`
  - _Nota_: Il livello del logger. Può essere 'log', 'info', 'warn', 'error' o 'debug'.
- **prefix**:
  - _Tipo_: `string`
  - _Predefinito_: `'[intlayer] '`
  - _Descrizione_: Il prefisso del logger.
  - _Esempio_: `'[my custom prefix] '`
  - _Nota_: Il prefisso del logger.
