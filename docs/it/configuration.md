# Intlayer Configurazione Documentazione

## Panoramica

I file di configurazione di Intlayer consentono la personalizzazione di vari aspetti del plugin, come l'internazionalizzazione, il middleware e la gestione dei contenuti. Questo documento fornisce una descrizione dettagliata di ogni proprietà nella configurazione.

---

## Supporto ai File di Configurazione

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

// Configurazione di esempio
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
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
// Configurazione di esempio
const config = {
  internationalization: {
    locales: [Locales.ENGLISH],
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
// Configurazione di esempio
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

## Riferimento alla Configurazione

Le sezioni seguenti descrivono le varie impostazioni di configurazione disponibili per Intlayer.

---

### Configurazione dell'Internazionalizzazione

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
  - _Nota_: Questo viene utilizzato per determinare il locale quando non è specificato nell'URL, nel cookie o nell'intestazione.

---

### Configurazione dell'Editor

Definisce le impostazioni relative all'editor integrato, inclusi la porta del server e lo stato attivo.

#### Proprietà

- **applicationURL**:

  - _Tipo_: `string`
  - _Predefinito_: `'*'`
  - _Descrizione_: L'URL dell'applicazione. Utilizzato per limitare l'origine dell'editor per motivi di sicurezza.
  - _Esempio_:
    - `'*'`
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
    - `''*'`
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
  - _Descrizione_: clientId e clientSecret consentono ai pacchetti Intlayer di autenticarsi con il backend utilizzando l'autenticazione oAuth2. Un token di accesso viene utilizzato per autenticare l'utente relativo al progetto. Per ottenere un token di accesso, vai su https://intlayer.org/dashboard/project e crea un account.
  - _Esempio_: `true`
  - _Nota_: Importante: il clientId e il clientSecret devono essere mantenuti segreti e non condivisi pubblicamente. Assicurati di conservarli in un luogo sicuro, come le variabili di ambiente.

- **clientSecret**:

  - _Tipo_: `string` | `undefined`
  - _Predefinito_: `undefined`
  - _Descrizione_: clientId e clientSecret consentono ai pacchetti Intlayer di autenticarsi con il backend utilizzando l'autenticazione oAuth2. Un token di accesso viene utilizzato per autenticare l'utente relativo al progetto. Per ottenere un token di accesso, vai su https://intlayer.org/dashboard/project e crea un account.
  - _Esempio_: `true`
  - _Nota_: Importante: il clientId e il clientSecret devono essere mantenuti segreti e non condivisi pubblicamente. Assicurati di conservarli in un luogo sicuro, come le variabili di ambiente.

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

...
