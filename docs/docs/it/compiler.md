---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Intlayer Compiler | Estrazione Automatica dei Contenuti per i18n
description: Automatizza il tuo processo di internazionalizzazione con Intlayer Compiler. Estrai contenuti direttamente dai tuoi componenti per un i18n più veloce ed efficiente in Vite, Next.js e altro.
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
  - version: 7.3.1
    date: 2025-11-27
    changes: Rilascio Compiler
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

Come alternativa, per automatizzare il tuo processo i18n mantenendo il pieno controllo del tuo contenuto, Intlayer fornisce anche un comando di auto-estrazione `intlayer transform` (vedi [documentazione CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/transform.md)), o il comando `Intlayer: extract content to Dictionary` dall'estensione Intlayer VS Code (vedi [documentazione estensione VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/vs_code_extension.md)).

## Utilizzo

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

### Next.js (Babel)

Per Next.js o altre applicazioni basate su Webpack che utilizzano Babel, puoi configurare il compiler usando il plugin `@intlayer/babel`.

#### Installazione

```bash
npm install @intlayer/babel
```

#### Configurazione

Aggiorna il tuo `babel.config.js` (o `babel.config.json`) per includere il plugin di estrazione. Forniamo un helper `getCompilerOptions` per caricare automaticamente la tua configurazione Intlayer.

```js fileName="babel.config.js"
const { intlayerExtractBabelPlugin } = require("@intlayer/babel");
const { getCompilerOptions } = require("@intlayer/babel/compiler");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      intlayerExtractBabelPlugin,
      getCompilerOptions(), // Carica automaticamente le opzioni da intlayer.config.ts
    ],
  ],
};
```

Questa configurazione garantisce che il contenuto dichiarato nei tuoi componenti venga estratto automaticamente e utilizzato per generare i dizionari durante il processo di build.
