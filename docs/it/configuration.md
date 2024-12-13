# Intlayer Configurazione Documentazione

## Panoramica

I file di configurazione di Intlayer consentono la personalizzazione di vari aspetti del plugin, come l'internazionalizzazione, il middleware e la gestione dei contenuti. Questo documento fornisce una descrizione dettagliata di ogni proprietà nella configurazione.

---

## Supporto File di Configurazione

Intlayer accetta formati di file di configurazione JSON, JS, MJS e TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Esempio di file di configurazione

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ITALIAN], // Locale Italiano
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

```javascript
// intlayer.config.cjs

const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ITALIAN], // Locale Italiano
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

```json5
// .intlayerrc

{
  "internationalization": {
    "locales": ["it"], // Locale Italiano
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

Le seguenti sezioni descrivono le varie impostazioni di configurazione disponibili per Intlayer.

---

### Configurazione Internazionalizzazione

Definisce le impostazioni relative all'internazionalizzazione, incluse le localizzazioni disponibili e la localizzazione predefinita per l'applicazione.

#### Proprietà

- **locales**:
  - _Tipo_: `string[]`
  - _Predefinito_: `['it']`
  - _Descrizione_: L'elenco delle localizzazioni supportate nell'applicazione.
  - _Esempio_: `['it', 'fr', 'es']`
- **strictMode**:

  - _Tipo_: `string`
  - _Predefinito_: `required_only`
  - _Descrizione_: Assicurati implementazioni solide di contenuti internazionalizzati usando TypeScript.
  - _Nota_: Se impostato su "strict", la funzione di traduzione `t` richiederà che ogni localizzazione dichiarata sia definita. Se manca una localizzazione, o se una localizzazione non è dichiarata nella tua configurazione, verrà generato un errore.
  - _Nota_: Se impostato su "required_only", la funzione di traduzione `t` richiederà che ogni localizzazione dichiarata sia definita. Se manca una localizzazione, verrà generato un avviso, ma verrà accettato se una localizzazione non è dichiarata nella tua configurazione, ma esiste.
  - _Nota_: Se impostato su "loose", la funzione di traduzione `t` accetterà qualsiasi localizzazione esistente.

- **defaultLocale**:
  - _Tipo_: `string`
  - _Predefinito_: `'it'`
  - _Descrizione_: La localizzazione predefinita utilizzata come fallback se la localizzazione richiesta non viene trovata.
  - _Esempio_: `'it'`
  - _Nota_: Questo viene utilizzato per determinare la localizzazione quando nessuna è specificata nell'URL, nel cookie o nell'intestazione.

---

### Configurazione Editor

Definisce le impostazioni relative all'editor integrato, inclusi il porto del server e lo stato attivo.

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
  - _Nota_: Può essere impostato usando NODE_ENV, o un'altra variabile di ambiente dedicata.

- **clientId**:

  - _Tipo_: `string` | `undefined`
  - _Predefinito_: `undefined`
  - _Descrizione_: clientId e clientSecret consentono ai pacchetti intlayer di autenticarsi con il backend utilizzando l'autenticazione oAuth2. Un token di accesso viene utilizzato per autenticare l'utente relativo al progetto. Per ottenere un token di accesso, vai su https://back.intlayer.org/dashboard/project e crea un account.
  - _Esempio_: `true`
  - _Nota_: Importante: Il clientId e il clientSecret devono essere mantenuti segreti e non condivisi pubblicamente. Assicurati di tenerli in un luogo sicuro, come le variabili di ambiente.

- **clientSecret**:
  - _Tipo_: `string` | `undefined`
  - _Predefinito_: `undefined`
  - _Descrizione_: clientId e clientSecret consentono ai pacchetti intlayer di autenticarsi con il backend utilizzando l'autenticazione oAuth2. Un token di accesso viene utilizzato per autenticare l'utente relativo al progetto. Per ottenere un token di accesso, vai su https://back.intlayer.org/dashboard/project e crea un account.
  - _Esempio_: `true`
  - _Nota_: Importante: Il clientId e il clientSecret devono essere mantenuti segreti e non condivisi pubblicamente. Assicurati di tenerli in un luogo sicuro, come le variabili di ambiente.

### Configurazione Middleware

Impostazioni che controllano il comportamento del middleware, incluso come l'applicazione gestisce cookie, intestazioni e prefissi URL per la gestione delle localizzazioni.

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
  - _Nota_: Usato per persistere la localizzazione tra le sessioni.
- **prefixDefault**:
  - _Tipo_: `boolean`
  - _Predefinito_: `true`
  - _Descrizione_: Se includere la localizzazione predefinita nell'URL.
  - _Esempio_: `false`
  - _Nota_: Se `false`, gli URL per la localizzazione predefinita non avranno un prefisso di localizzazione.
- **basePath**:
  - _Tipo_: `string`
  - _Predefinito_: `''`
  - _Descrizione_: Il percorso base per gli URL dell'applicazione.
  - _Esempio_: `'/my-app'`
  - _Nota_: Questo influisce su come vengono costruiti gli URL per l'applicazione.
- **serverSetCookie**:
  - _Tipo_: `string`
  - _Predefinito_: `'always'`
  - _Descrizione_: Regola per impostare il cookie della localizzazione sul server.
  - _Opzioni_: `'always'`, `'never'`
  - _Esempio_: `'never'`
  - _Nota_: Controlla se il cookie della localizzazione viene impostato ad ogni richiesta o mai.
- **noPrefix**:
  - _Tipo_: `boolean`
  - _Predefinito_: `false`
  - _Descrizione_: Se omettere il prefisso della localizzazione dagli URL.
  - _Esempio_: `true`
  - _Nota_: Se `true`, gli URL non contengono informazioni sulla localizzazione.

---

### Configurazione del Contenuto

Impostazioni relative alla gestione dei contenuti all'interno dell'applicazione, inclusi nomi delle directory, estensioni dei file e configurazioni derivate.

#### Proprietà

- **watch**:
  - _Tipo_: `boolean`
  - _Predefinito_: `process.env.NODE_ENV === 'development'`
  - _Descrizione_: Indica se Intlayer dovrebbe monitorare i cambiamenti nei file di dichiarazione dei contenuti nell'app per ricostruire i dizionari correlati.
- **fileExtensions**:
  - _Tipo_: `string[]`
  - _Predefinito_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Descrizione_: Estensioni di file da cercare quando si costruiscono dizionari.
  - _Esempio_: `['.data.ts', '.data.js', '.data.json']`
  - _Nota_: Personalizzare le estensioni dei file può aiutare a evitare conflitti.
- **baseDir**:
  - _Tipo_: `string`
  - _Predefinito_: `process.cwd()`
  - _Descrizione_: La directory base per il progetto.
  - _Esempio_: `'/path/to/project'`
  - _Nota_: Questo viene utilizzato per risolvere tutte le directory relative a Intlayer.
- **dictionaryOutput**:
  - _Tipo_: `string[]`
  - _Predefinito_: `['intlayer']`
  - _Descrizione_: Il tipo di uscita del dizionario da utilizzare, es. `'intlayer'` o `'i18next'`.
- **contentDirName**:
  - _Tipo_: `string`
  - _Predefinito_: `'src'`
  - _Descrizione_: Il nome della directory in cui sono memorizzati i contenuti.
  - _Esempio_: `'data'`, `'content'`, `'locales'`
  - _Nota_: Se non è a livello della directory base, aggiorna `contentDir`.
- **contentDir**:

  - _Tipo_: `string`
  - _DerivatoDa_: `'baseDir'` / `'contentDirName'`
  - _Descrizione_: Il percorso della directory in cui sono memorizzati i contenuti.

- **resultDirName**:
  - _Tipo_: `string`
  - _Predefinito_: `'.intlayer'`
  - _Descrizione_: Il nome della directory in cui sono memorizzati i risultati.
  - _Esempio_: `'outputOFIntlayer'`
  - _Nota_: Se questa directory non è a livello base, aggiorna `resultDir`.
- **resultDir**:

  - _Tipo_: `string`
  - _DerivatoDa_: `'baseDir'` / `'resultDirName'`
  - _Descrizione_: Il percorso della directory per memorizzare risultati intermedi o di output.

- **moduleAugmentationDirName**:

  - _Tipo_: `string`
  - _Predefinito_: `'types'`
  - _Descrizione_: Directory per l'aumento del modulo, che consente suggerimenti migliori dell'IDE e il controllo dei tipi.
  - _Esempio_: `'intlayer-types'`
  - _Nota_: Assicurati di includere questo in `tsconfig.json`.

- **moduleAugmentationDir**:

  - _Tipo_: `string`
  - _DerivatoDa_: `'baseDir'` / `'moduleAugmentationDirName'`
  - _Descrizione_: Il percorso per l'augmentation del modulo e ulteriori definizioni di tipo.

- **dictionariesDirName**:
  - _Tipo_: `string`
  - _Predefinito_: `'dictionary'`
  - _Descrizione_: Directory per memorizzare i dizionari.
  - _Esempio_: `'translations'`
  - _Nota_: Se non è a livello della directory di risultato, aggiorna `dictionariesDir`.
- **dictionariesDir**:

  - _Tipo_: `string`
  - _DerivatoDa_: `'resultDir'` / `'dictionariesDirName'`
  - _Descrizione_: La directory per memorizzare i dizionari di localizzazione.

- **i18nDictionariesDirName**:
  - _Tipo_: `string`
  - _Predefinito_: `'i18n_dictionary'`
  - _Descrizione_: Directory per memorizzare i dizionari i18n.
  - _Esempio_: `'translations'`
  - _Nota_: Se non è a livello della directory di risultato, aggiorna `i18nDictionariesDir`.
  - _Nota_: Assicurati che l'uscita dei dizionari i18n includa i18next per costruire i dizionari per i18next.
- **i18nDictionariesDir**:

  - _Tipo_: `string`
  - _DerivatoDa_: `'resultDir'` / `'i18nDictionariesDirName'`
  - _Descrizione_: La directory per memorizzare i dizionari i18n.
  - _Nota_: Assicurati che questa directory sia configurata per il tipo di output i18next.

- **typeDirName**:

  - _Tipo_: `string`
  - _Predefinito_: `'types'`
  - _Descrizione_: Directory per memorizzare i tipi di dizionario.
  - _Esempio_: `'intlayer-types'`
  - _Nota_: Se non è a livello della directory di risultato, aggiorna `typesDir`.

- **typesDir**:

  - _Tipo_: `string`
  - _DerivatoDa_: `'resultDir'` / `'typeDirName'`
  - _Descrizione_: La directory per memorizzare i tipi di dizionario.

- **mainDirName**:
  - _Tipo_: `string`
  - _Predefinito_: `'main'`
  - _Descrizione_: Directory per memorizzare i file principali.
  - _Esempio_: `'intlayer-main'`
  - _Nota_: Se non è a livello della directory di risultato, aggiorna `mainDir`.
- **mainDir**:
  - _Tipo_: `string`
  - _DerivatoDa_: `'resultDir'` / `'mainDirName'`
  - _Descrizione_: La directory in cui sono memorizzati i file principali dell'applicazione.
- **excludedPath**:
  - _Tipo_: `string[]`
  - _Predefinito_: `['node_modules']`
  - _Descrizione_: Directory escluse dalla ricerca dei contenuti.
  - _Nota_: Questa impostazione non è ancora utilizzata, ma pianificata per implementazioni future.
