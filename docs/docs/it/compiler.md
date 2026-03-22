---
createdAt: 2025-09-09
updatedAt: 2026-03-12
title: Compiler Intlayer | Estrazione automatica dei contenuti per i18n
description: Automatizza il tuo processo di internazionalizzazione con il compilatore Intlayer. Estrai contenuti direttamente dai tuoi componenti per un i18n più veloce ed efficiente in Vite, Next.js e altro.
keywords:
  - Intlayer
  - Compiler
  - Internazionalizzazione
  - i18n
  - Automazione
  - Estrazione
  - Velocità
  - Vite
  - Next.js
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - compiler
history:
  - version: 8.2.0
    date: 2026-03-10
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.7
    date: 2026-02-25
    changes: "Aggiorna le opzioni del compilatore"
  - version: 7.3.1
    date: 2025-11-27
    changes: "Rilascio Compiler"
---

# Intlayer Compiler | Estrazione Automatica dei Contenuti per i18n

## Cos'è Intlayer Compiler?

Il **Intlayer Compiler** è uno strumento potente progettato per automatizzare il processo di internazionalizzazione (i18n) nelle tue applicazioni. Scansiona il tuo codice sorgente (JSX, TSX, Vue, Svelte) alla ricerca di dichiarazioni di contenuto, le estrae e genera automaticamente i file di dizionario necessari. Questo ti permette di mantenere i contenuti co-localizzati con i tuoi componenti mentre Intlayer gestisce la sincronizzazione e la gestione dei dizionari.

## Perché Usare Intlayer Compiler?

- **Automazione**: Elimina il copia-incolla manuale dei contenuti nei dizionari.
- **Velocità**: Estrazione dei contenuti ottimizzata per garantire che il processo di build rimanga veloce.
- **Esperienza Sviluppatore**: Mantieni le dichiarazioni di contenuto esattamente dove vengono utilizzate, migliorando la manutenibilità.
- **Aggiornamenti in tempo reale**: Supporta Hot Module Replacement (HMR) per un feedback immediato durante lo sviluppo.

Consulta il post sul blog [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/compiler_vs_declarative_i18n.md) per un confronto più approfondito.

## Perché non usare Intlayer Compiler?

Sebbene il compiler offra un'esperienza eccellente "funziona subito", introduce anche alcuni compromessi di cui dovresti essere consapevole:

- **Ambiguità euristica**: Il compiler deve indovinare cosa è contenuto orientato all'utente rispetto alla logica dell'applicazione (ad esempio, `className="active"`, codici di stato, ID prodotto). In codebase complesse, questo può portare a falsi positivi o stringhe mancate che richiedono annotazioni manuali ed eccezioni.
- **Estrazione solo statica**: L'estrazione basata sul compiler si basa sull'analisi statica. Le stringhe che esistono solo in fase di esecuzione (codici di errore API, campi CMS, ecc.) non possono essere scoperte o tradotte dal compiler da solo, quindi hai ancora bisogno di una strategia i18n di runtime complementare.

Per un confronto architetturale più approfondito, consulta il post sul blog [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/compiler_vs_declarative_i18n.md).

Come alternativa, per automatizzare il tuo processo i18n mantenendo il pieno controllo del tuo contenuto, Intlayer fornisce anche un comando di auto-estrazione `intlayer extract` (vedi [documentazione CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md)), o il comando `Intlayer: extract content to Dictionary` dall'estensione Intlayer VS Code (vedi [documentazione estensione VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/vs_code_extension.md)).

## Utilizzo

<Tabs>
 <Tab value='vite'>

### Vite

Per le applicazioni basate su Vite (React, Vue, Svelte, ecc.), il modo più semplice per utilizzare il compiler è tramite il plugin `vite-intlayer`.

#### Installazione

```bash
npm install vite-intlayer
```

#### Configurazione

Aggiorna il tuo `vite.config.ts` per includere il plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Aggiunge il plugin del compiler
  ],
});
```

See complete tutorial: [Intlayer Compiler with Vite+React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react_compiler.md)

#### Supporto per Framework

Il plugin Vite rileva e gestisce automaticamente diversi tipi di file:

- **React / JSX / TSX**: Gestito nativamente.
- **Vue**: Richiede `@intlayer/vue-compiler`.
- **Svelte**: Richiede `@intlayer/svelte-compiler`.

Assicurati di installare il pacchetto compiler appropriato per il tuo framework:

```bash
# Per Vue
npm install @intlayer/vue-compiler

# Per Svelte
npm install @intlayer/svelte-compiler
```

 </Tab>
 <Tab value='nextjs'>

### Next.js (Babel)

Per Next.js o altre applicazioni basate su Webpack che utilizzano Babel, puoi configurare il compiler usando il plugin `@intlayer/babel`.

#### Installazione

```bash
npm install @intlayer/babel
```

#### Configurazione

Aggiorna il tuo `babel.config.js` (o `babel.config.json`) per includere il plugin di estrazione. Forniamo un helper `getExtractPluginOptions` per caricare automaticamente la tua configurazione Intlayer.

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Extract content from components into dictionaries
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    // Optimize imports by replacing useIntlayer with direct dictionary imports
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

Questa configurazione garantisce che il contenuto dichiarato nei tuoi componenti venga estratto automaticamente e utilizzato per generare i dizionari durante il processo di build.

See complete tutorial: [Intlayer Compiler with Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_compiler.md)

 </Tab>
</Tabs>

### Configurazione personalizzata

Per personalizzare il comportamento del compiler, puoi aggiornare il file `intlayer.config.ts` nella radice del tuo progetto.

````ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  compiler: {
    /**
     * Indica se il compilatore deve essere abilitato.
     * Imposta su 'build-only' per saltare il compilatore durante lo sviluppo e accelerare i tempi di avvio.
     */
    enabled: true,

    /**
     * Definisce il percorso dei file di output. Sostituisce `outputDir`.
     *
     * - I percorsi `./` sono risolti rispetto alla directory del componente.
     * - I percorsi `/` sono risolti rispetto alla radice del progetto (`baseDir`).
     *
     * - L'inserimento della variabile `{{locale}}` nel percorso attiverà la generazione di dizionari separati per lingua.
     *
     * Esempio:
     * ```ts
     * {
     *   // Crea file .content.ts multilingue vicino al componente
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Equivalente usando una stringa template
     * }
     * ```
     *
     * ```ts
     * {
     *   // Crea file JSON centralizzati per lingua nella radice del progetto
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Equivalente usando una stringa template
     * }
     * ```
     *
     * Elenco variabili:
     *   - `fileName`: Il nome del file.
     *   - `key`: La chiave del contenuto.
     *   - `locale`: La lingua del contenuto.
     *   - `extension`: L'estensione del file.
     *   - `componentFileName`: Il nome del file del componente.
     *   - `componentExtension`: L'estensione del file del componente.
     *   - `format`: Il formato del dizionario.
     *   - `componentFormat`: Il formato del dizionario del componente.
     *   - `componentDirPath`: Il percorso della directory del componente.
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Indica se i componenti devono essere salvati dopo essere stati trasformati.
     * In questo modo, il compilatore può essere eseguito una sola volta per trasformare l'app e poi rimosso.
     */
    saveComponents: false,

    /**
     * Inserisci solo il contenuto nel file generato. Utile per gli output JSON di i18next o ICU MessageFormat per lingua.
     *
     * - `output: ({ locale, key }) => `./locale/${locale}/${key}.json`,`
     */
    noMetadata: false,

    /**
     * Prefisso chiave dizionario
     */
    dictionaryKeyPrefix: "", // Aggiungi un prefisso opzionale per le chiavi del dizionario estratte
  },
};

export default config;
````

### Riferimento alla configurazione del compilatore

Le seguenti proprietà possono essere configurate nel blocco `compiler` del file `intlayer.config.ts`:

- **enabled**:
  - _Tipo_: `boolean | 'build-only'`
  - _Predefinito_: `true`
  - _Descrizione_: Indica se il compilatore deve essere abilitato.

- **dictionaryKeyPrefix**:
  - _Tipo_: `string`
  - _Predefinito_: `''`
  - _Descrizione_: Prefisso per le chiavi del dizionario estratte.

- **transformPattern**:
  - _Tipo_: `string | string[]`
  - _Predefinito_: `['**/*.{js,ts,mjs,cjs,jsx,tsx,vue,svelte}', '!**/node_modules/**']`
  - _Descrizione_: (Deprecato: usa invece `build.traversePattern`) Modelli per attraversare il codice da ottimizzare.

- **excludePattern**:
  - _Tipo_: `string | string[]`
  - _Predefinito_: `['**/node_modules/**']`
  - _Descrizione_: (Deprecato: usa invece `build.traversePattern`) Modelli da escludere dall'ottimizzazione.

- **output**:
  - _Type_: `FilePathPattern`
  - _Default_: `({ key }) => 'compiler/${key}.content.json'`
  - _Descrizione_: Definisce il percorso dei file di output. Sostituisce `outputDir`. Gestisce variabili dinamiche come `{{locale}}`, `{{key}}`, `{{fileName}}`, `{{extension}}`, `{{format}}`, `{{dirPath}}`, `{{componentFileName}}`, `{{componentExtension}}`, `{{componentFormat}}`. Può essere impostato come stringa utilizzando il formato `'my/{{var}}/path'` o come funzione.
  - _Nota_: `./**/*` I percorsi sono risolti relativamente al componente. `/**/*` i percorsi sono risolti relativamente al `baseDir` di Intlayer.
  - _Nota_: Se la lingua è impostata nel percorso, i dizionari verranno generati per lingua.
  - _Esempio_: `output: ({ locale, key }) => 'compiler/${locale}/${key}.json'`

- **noMetadata**:
  - _Tipo_: `boolean`
  - _Predefinito_: `false`
  - _Descrizione_: Indica se i metadati devono essere salvati nel file. Se vero, il compilatore non salverà i metadatati dei dizionari (chiave, contenitore del contenuto). Utile per output JSON i18next o ICU MessageFormat per lingua.
  - _Nota_: Utile se utilizzato con il plugin `loadJSON`.
  - _Esempio_:
    Se `true`:
    ```json
    {
      "key": "value"
    }
    ```
    Se `false`:
    ```json
    {
      "key": "value",
      "content": {
        "key": "value"
      }
    }
    ```

- **saveComponents**:
  - _Tipo_: `boolean`
  - _Predefinito_: `false`
  - _Descrizione_: Indica se i componenti devono essere salvati dopo essere stati trasformati.

### Riempire le traduzioni mancanti

Intlayer fornisce uno strumento CLI per aiutarti a riempire le traduzioni mancanti. Puoi usare il comando `intlayer` per testare e riempire le traduzioni mancanti dal tuo codice.

```bash
npx intlayer test         # Testa se ci sono traduzioni mancanti
```

```bash
npx intlayer fill         # Riempi le traduzioni mancanti
```

### Estrazione

Intlayer fornisce uno strumento CLI per estrarre contenuti dal tuo codice. Puoi usare il comando `intlayer extract` per estrarre i contenuti dal tuo codice.

```bash
npx intlayer extract
```

> Per maggiori dettagli, fare riferimento alla [documentazione CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md)
