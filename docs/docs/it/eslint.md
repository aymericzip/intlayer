---
createdAt: 2026-08-12
updatedAt: 2026-08-13
title: Plugin ESLint | Regole di lint per Intlayer
description: Rileva stringhe hardcoded, chiamate dinamiche che il compilatore Intlayer non può ottimizzare e contenuti di dizionario inutilizzati, con eslint-plugin-intlayer. Funziona con ESLint e oxlint, su React, Vue, Svelte, Angular e Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Linting
  - i18n
  - Internazionalizzazione
  - no-raw-text
  - Stringhe hardcoded
  - Traduzioni inutilizzate
  - Contenuto inutilizzato
  - React
  - Vue
  - Svelte
  - Angular
slugs:
  - doc
  - eslint
history:
  - version: 9.3.1
    date: 2026-08-12
    changes: "Cronologia iniziale"
author: aymericzip
---

# Plugin ESLint x OXLint

`eslint-plugin-intlayer` rileva i tipi di errori i18n che TypeScript non può individuare:

1. **Testo hardcoded** che non è mai stato inserito in un dizionario.
2. **Chiamate dinamiche** che superano il controllo dei tipi e vengono eseguite, ma che il compilatore Intlayer non può ottimizzare.
3. **Contenuto inutilizzato (dead content)** — dizionari e campi che nessun elemento nel progetto legge (attivazione opzionale).

Le chiavi di dizionario sconosciute, i percorsi di campo sconosciuti e le impostazioni internazionali mancanti sono già errori di compilazione, quindi il plugin non li ripete.

## Installazione

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

Richiede ESLint 9 o versione successiva (flat config). ESLint 10 è supportato.

## Utilizzo

Il plugin funziona sia in ESLint che in [oxlint](https://oxc.rs) — stesse regole, stesse opzioni.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Oppure espandi una configurazione e imposta tu stesso le severità:

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  ...intlayer.configs.recommended,
  {
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
      "intlayer/no-unused-content": "warn",
    },
  },
];
```

  </Tab>
  <Tab label="oxlint" value="oxlint">

```json fileName=".oxlintrc.json"
{
  "jsPlugins": ["eslint-plugin-intlayer"],
  "rules": {
    "intlayer/no-raw-text": "warn",
    "intlayer/static-dictionary-key": "error",
    "intlayer/no-dynamic-field-access": "error",
    "intlayer/enforce-adapter-import": "warn"
  }
}
```

Due precisazioni: il supporto ai plugin JS in oxlint è ancora in versione alfa e oxlint non supporta parser personalizzati — quindi i file `.vue`, `.svelte`, `.astro` e i template Angular non vengono analizzati lì. Esegui oxlint sui tuoi file JS/TS/JSX e mantieni ESLint per il resto.

`no-unused-content` è intenzionalmente esclusa sopra: necessita della directory di lavoro e del percorso del file analizzato dal contesto della regola, cosa che il bridge alfa del plugin JS non garantisce. Eseguila sotto ESLint.

  </Tab>
</Tabs>

### Configurazioni

| Configurazione  | `no-raw-text`                     | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | --------------------------------- | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                              | error                   | error                     | off                      | off                 |
| `strict`        | error (+ letterali esterni a JSX) | error                   | error                     | error                    | off                 |
| `contract-only` | off                               | error                   | error                     | off                      | off                 |

`recommended` mantiene deliberatamente `no-raw-text` su `warn`: applicarla a una base di codice esistente fa emergere tutte le stringhe non tradotte contemporaneamente, il che non dovrebbe interrompere la build dal primo giorno.

`enforce-adapter-import` è disabilitata per impostazione predefinita — attivala esplicitamente se lo desideri.

`no-unused-content` è disattivata in ogni configurazione, inclusa `strict`. È l'unica regola che legge la configurazione di Intlayer ed esamina i file sorgente dal disco, pertanto la sua attivazione dovrebbe essere una scelta deliberata anziché un'impostazione predefinita.

## Regole

### `no-raw-text`

Segnala il testo rivolto all'utente che non è dichiarato in un dizionario. Utilizza lo stesso rilevamento di `intlayer extract`, pertanto i nomi di brand, le classi CSS e gli identificatori tecnici vengono ignorati.

```jsx
// ✗ Segnalato
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ Corretto
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

I file di dichiarazione del contenuto (`*.content.ts`, …) vengono ignorati.

Per correggere un intero file in una volta, esegui `npx intlayer extract` e lascia che il compilatore sposti le stringhe in un dizionario al posto tuo.

**Opzioni**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Attributi il cui valore è testo rivolto all'utente.
      // Predefinito: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Elementi il cui contenuto non è mai testo rivolto all'utente.
      // Predefinito: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Espressioni regolari per il testo da non segnalare mai.
      ignorePatterns: ["^Powered by"],

      // Segnala anche i letterali di stringa fuori dal markup. Predefinito: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Richiede che la chiave del dizionario sia un valore letterale stringa.

Il compilatore può precaricare un dizionario solo quando può leggere la chiave direttamente nel punto di chiamata. Con una chiave calcolata, salta silenziosamente l'ottimizzazione e include invece tutti i dizionari nel bundle.

```typescript
// ✗ Segnalato
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Una variabile non è un letterale
const key = "home";
useIntlayer(key);

// ✓ Corretto
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Questo vale per `useIntlayer`, `getIntlayer` e tutti gli adattatori di compatibilità (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Richiede che il campo letto da un dizionario sia noto staticamente.

Il compilatore rimuove i campi che non vede utilizzati. Un accesso dinamico è invisibile per esso, quindi la lettura potrebbe restituire `undefined` a runtime.

```typescript
// ✗ Segnalato
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ Corretto
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Preferisce l'adattatore di compatibilità `@intlayer/*` rispetto al pacchetto originale. Il pacchetto originale si risolve in Intlayer solo quando è configurato l'alias del bundler; l'adattatore lo fa sempre. Corregibile automaticamente con `--fix`.

```typescript
// ✗ Segnalato
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ Corretto
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

### `no-unused-content`

**Disattivata per impostazione predefinita.** Segnala i contenuti che nessun elemento nel progetto legge, oltre alle chiavi di dizionario dichiarate in più punti.

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ Segnalato se nessun chiamante nel progetto richiede "home"
  content: {
    title: t({ it: "Titolo", en: "Title" }),

    // ✗ Segnalato se nulla legge `hero`
    hero: {
      subtitle: t({ it: "Sottotitolo", en: "Subtitle" }),
    },
  },
};
```

A differenza delle altre regole, questa non può rispondere solo dal file analizzato: un campo è inutilizzato solo rispetto all'intero progetto. Alla prima dichiarazione di contenuto di un'esecuzione di lint, carica la configurazione di Intlayer, analizza i file sorgente dichiarati da tale configurazione (`build.traversePattern`, `compiler.transformPattern`) ed esegue lo stesso analizzatore di utilizzo che alimenta `@intlayer/lsp` e il testo barrato "inutilizzato" nell'estensione VS Code. Il risultato viene memorizzato nella cache per `cacheTtl` millisecondi, pertanto la scansione avviene una volta per esecuzione anziché una volta per file.

**Opzioni**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // Segnala le chiavi di dizionario a cui nulla fa riferimento. Predefinito: true
      reportUnusedDictionaries: true,

      // Segnala i campi di contenuto che nulla legge. Predefinito: true
      reportUnusedFields: true,

      // Segnala le chiavi dichiarate in più posizioni. Predefinito: true
      reportDuplicateKeys: true,

      // Espressioni regolari per i percorsi di campo da non segnalare mai.
      ignoreFields: ["^meta"],

      // Directory radice del progetto da cui parte la scansione. Predefinito: directory di lavoro di ESLint
      baseDir: process.cwd(),

      // Durata del riutilizzo di una scansione del progetto, in ms. Predefinito: 30000
      cacheTtl: 30000,
    },
  ],
}
```

Riduci `cacheTtl` quando esegui il lint da un server dell'editor a lunga durata e desideri che le modifiche vengano riflesse prima; imposta `baseDir` quando una singola esecuzione di lint comprende diversi progetti Intlayer in un monorepo.

> **Predilige il silenzio.** Un falso positivo in questo caso eliminerebbe una traduzione, pertanto non viene segnalato nulla quando il dizionario viene utilizzato in un modo che l'analisi non può tracciare: l'oggetto contenuto passato nel suo insieme, una funzione di traduzione associata ad esso (`const t = useTranslations("home")`), una dichiarazione raggiunta tramite un'importazione diretta (`useDictionary(myDictionary)`), un `nest()` da un altro dizionario o un elenco di campi reso non esaustivo da uno spread. I componenti a file singolo (`.vue`, `.svelte`, `.astro`) contano come utilizzatori di ogni campo dei dizionari che menzionano, poiché i loro blocchi di script non vengono analizzati qui.

`reportDuplicateKeys` legge i dizionari non uniti che la build scrive sotto `.intlayer/`, quindi rimane inattiva finché il progetto non è stato compilato almeno una volta. Due dichiarazioni che condividono una chiave vengono unite, il che è un modello valido: la segnalazione esiste perché un campo definito su entrambi i lati mantiene silenziosamente solo uno dei due valori.

L'analizzatore viene caricato da `@intlayer/lsp`, distribuito come modulo ESM. La regola necessita pertanto di una versione di Node in grado di eseguire `require()` su un modulo ES — Node 20.19+ o 22.12+. Con versioni precedenti, non segnala nulla anziché interrompere l'esecuzione del lint.

## Frameworks

Tutte le regole funzionano su tutte le integrazioni Intlayer, compresi i template Vue, Svelte e Angular. Devi solo indicare a ESLint quale parser legge ciascun tipo di file.

| Framework                 | File              | Parser                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Template Angular          | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import svelteParser from "svelte-eslint-parser";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
  ...intlayer.configs.recommended,

  {
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: { parser: tseslint.parser },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.component.html"],
    languageOptions: { parser: angularTemplateParser },
  },
];
```

Installa solo i parser di cui il tuo progetto ha bisogno.

> **Limitazione nota.** Nei template Vue e Angular, un'espressione come `{{ content[key] }}` non viene verificata da `no-dynamic-field-access`. Le letture dinamiche scritte nel blocco script vengono invece rilevate normalmente.
