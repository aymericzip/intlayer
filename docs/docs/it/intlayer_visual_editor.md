---
createdAt: 2024-08-11
updatedAt: 2026-08-30
title: Editor Visual Intlayer | Modifica il tuo contenuto utilizzando un editor visuale
description: Scopri come utilizzare l’Editor Intlayer per gestire il tuo sito web multilingue. Segui i passi in questa documentazione online per configurare il tuo progetto in pochi minuti.
keywords:
  - Editor
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - editor
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Cronologia iniziale"
author: aymericzip
---

# Documentazione dell'Editor Visivo di Intlayer

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

L'Editor Visivo di Intlayer è uno strumento che avvolge il tuo sito web per interagire con i tuoi file di dichiarazione dei contenuti utilizzando un editor visivo.

![Interfaccia dell'Editor Visivo di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

Il pacchetto `intlayer-editor` si basa su Intlayer ed è disponibile per applicazioni JavaScript, come React (Create React App), Vite + React e Next.js.

## Editor visivo vs CMS

L'Editor Visivo di Intlayer è uno strumento che ti consente di gestire i tuoi contenuti in un editor visivo per dizionari locali. Una volta apportata una modifica, il contenuto verrà sostituito nella base di codice. Ciò significa che l'applicazione verrà ricostruita e la pagina verrà ricaricata per visualizzare il nuovo contenuto.

Al contrario, il [CMS di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) è uno strumento che ti consente di gestire i tuoi contenuti in un editor visivo per dizionari remoti. Una volta apportata una modifica, il contenuto **non** influenzerà la tua base di codice. E il sito web mostrerà automaticamente il contenuto modificato.

## Integrare Intlayer nella tua applicazione

Per maggiori dettagli su come integrare Intlayer, consulta la sezione pertinente qui sotto:

### Integrazione con Next.js

Per l'integrazione con Next.js, consulta la [guida di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_15.md).

### Integrazione con Create React App

Per l'integrazione con Create React App, consulta la [guida di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_create_react_app.md).

### Integrazione con Vite + React

Per l'integrazione con Vite + React, consulta la [guida di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+react.md).

## Come funziona l'Editor di Intlayer

L'editor visivo in un'applicazione include due elementi:

- Un'applicazione frontend che visualizzerà il tuo sito web in un iframe. Se il tuo sito web utilizza Intlayer, l'editor visivo rileverà automaticamente i tuoi contenuti e ti consentirà di interagire con essi. Una volta effettuata una modifica, potrai scaricare le tue modifiche.

- Una volta cliccato il pulsante di download, l'editor visivo invierà una richiesta al server per sostituire i tuoi file di dichiarazione dei contenuti con il nuovo contenuto (dovunque questi file siano dichiarati nel tuo progetto).

> Nota che, per ora, l'Editor di Intlayer scriverà i tuoi file di dichiarazione dei contenuti come file JSON.

## Installazione

Una volta che Intlayer è configurato nel tuo progetto, installa semplicemente `intlayer-editor` come dipendenza di sviluppo:

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

```bash packageManager="bun"
bun add intlayer-editor --dev
```

Con il flag `--with`, puoi avviare l'editor in parallelo con un altro comando:

```json5 fileName="package.json"
{
  "scripts": {
    "start:editor": "npx intlayer-editor start --with 'next dev --turbopack'",
  },
}
```

## Configurazione

Nel file di configurazione di Intlayer, puoi personalizzare le impostazioni dell'editor:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... altre impostazioni di configurazione
  editor: {
    /**
     * Obbligatorio
     * L'URL dell'applicazione.
     * Questo è l'URL mirato dall'editor visivo.
     * Esempio: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Opzionale
     * Di default è `true`. Se `false`, l'editor è inattivo e non può essere accessibile.
     * Può essere utilizzato per disabilitare l'editor in ambienti specifici per motivi di sicurezza, come la produzione.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * Opzionale
     * Di default è `8000`.
     * La porta del server dell'editor.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Opzionale
     * Di default è "http://localhost:8000"
     * L'URL del server dell'editor.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

> Per vedere tutti i parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

## Utilizzo dell'Editor

1. Quando l'editor è installato, puoi avviare l'editor utilizzando il seguente comando:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **Nota che dovresti eseguire la tua applicazione in parallelo.** L'URL dell'applicazione dovrebbe corrispondere a quello impostato nella configurazione dell'editor (`applicationURL`).

> **Nota il comando è riesportato dal package `intlayer`. Puoi usare `npx intlayer editor start` invece.**

2. Poi, apri l'URL fornito. Di default `http://localhost:8000`.

   Puoi visualizzare ogni campo indicizzato da Intlayer passando il cursore sopra il tuo contenuto.

   ![Passando il cursore sopra il contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. Se il tuo contenuto è delineato, puoi tenerlo premuto a lungo per visualizzare il cassetto di modifica.

## Configurazione dell'ambiente

L'editor può essere configurato per utilizzare un file di ambiente specifico. Questo è utile quando vuoi usare lo stesso file di configurazione per sviluppo e produzione.

Per utilizzare un file di ambiente specifico, puoi usare il flag `--env-file` o `-f` quando avvii l'editor:

```bash packageManager="npm"
npx intlayer-editor start -f .env.development
```

```bash packageManager="yarn"
yarn intlayer-editor start -f .env.development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -f .env.development
```

> Nota che il file di ambiente dovrebbe trovarsi nella directory principale del tuo progetto.

Oppure puoi usare il flag `--env` o `-e` per specificare l'ambiente:

```bash packageManager="npm"
npx intlayer-editor start -e development
```

```bash packageManager="yarn"
yarn intlayer-editor start -e development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -e development
```

## Debug

Se riscontri problemi con l'editor visivo, controlla quanto segue:

- L'editor visivo e l'applicazione sono in esecuzione.

- La configurazione [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) è correttamente impostata nel file di configurazione di Intlayer.
  - Campi obbligatori:
    - L'URL dell'applicazione dovrebbe corrispondere a quello impostato nella configurazione dell'editor (`applicationURL`).

- L'editor visuale utilizza un iframe per visualizzare il tuo sito web. Assicurati che la Content Security Policy (CSP) del tuo sito consenta l'URL del CMS come `frame-ancestors` ('http://localhost:8000' per impostazione predefinita). Controlla la console dell'editor per eventuali errori.

## Domande frequenti

<FAQ>

<Question title="Qual è la differenza tra l'editor visivo e il CMS?">

L'editor visivo modifica i dizionari locali e riscrive la modifica nel tuo codice, quindi passa attraverso la tua consueta revisione e deployment. Il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) modifica i dizionari remoti, che cambiano sul sito in esecuzione senza un deployment. L'editor è adatto ai contenuti di proprietà degli sviluppatori; il CMS è adatto ai contenuti di proprietà di un team di marketing.

</Question>

<Question title="Quanto aggiunge l'i18n alla dimensione del mio bundle?">

Molto meno di una configurazione basata su namespace, perché una pagina non scarica mai un catalogo che non renderizza. Il markup renderizzato lato server risolve i suoi contenuti sul server, e il compilatore in fase di build sostituisce le chiamate `useIntlayer` con le esatte voci del dizionario che un componente utilizza, quindi le chiavi e le lingue non utilizzate vengono eliminate. I [dizionari dinamici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/index.md) suddividono il resto per locale. Misurato rispetto alle alternative abituali, Intlayer riduce la dimensione del bundle e delle pagine fino al 50%. Vedi [ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md) e il [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/index.md).

</Question>

<Question title="Posso migrare da `i18next`, `next-intl` o `react-i18next` senza riscrivere i miei componenti?">

Sì, e ci sono due percorsi. Puoi migrare il contenuto progressivamente con la [guida alla migrazione da i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_i18next_to_intlayer.md) o la [guida alla migrazione da next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_next-intl_to_intlayer.md). Oppure puoi mantenere interamente la tua API attuale: gli [adattatori di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md) espongono esattamente la stessa API di `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` e `Lingui`, ma servita dai dizionari Intlayer, quindi cambiano gli import e il codice dei componenti no.

</Question>

<Question title="Posso mantenere i miei file di traduzione JSON esistenti?">

Sì. Il [plugin di sincronizzazione JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md) mantiene i tuoi file `/messages/{locale}/{namespace}.json` come fonte di verità e genera dizionari Intlayer da essi, in entrambe le direzioni. Un [plugin di sincronizzazione PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-po.md) fa lo stesso per i cataloghi gettext, e i [file per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/per_locale_file.md) ti permettono di dividere il contenuto per lingua invece di raggruppare i locale in un unico file.

</Question>

<Question title="Devo spostare il mio contenuto chiave per chiave?">

No. Esegui `npx intlayer extract` e Intlayer legge i tuoi file sorgente, estrae le stringhe visibili all'utente e scrive un file `.content` accanto a ciascuno, così puoi rivedere un diff invece di copiare le stringhe in un catalogo una alla volta. Vedi il [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/extract.md).

Per una pipeline completamente automatizzata, il [Compilatore Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md) fa lo stesso in fase di build sul codice sorgente JSX, TSX, Vue e Svelte, generando i dizionari ad ogni modifica così non ci sono chiavi da mantenere a mano. Funziona per analisi statica, quindi le stringhe che esistono solo a runtime restano fuori portata, e ha bisogno di alcune annotazioni per distinguere il testo visibile all'utente dalla logica applicativa.

</Question>

<Question title="Quali strumenti di editor e agenti AI sono disponibili?">

Cinque componenti, tutti opzionali:

- **[Estensione VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/vs_code_extension.md)**: salta da una chiave `useIntlayer` al file di contenuto che la dichiara, estrai il contenuto da un componente ed esegui build, fill, test, push e pull dalla palette dei comandi o da una scheda Intlayer dedicata.
- **[Server LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md)**: la stessa consapevolezza in qualsiasi editor che parla LSP, con vai alla definizione, trova tutti i riferimenti, anteprime al passaggio del mouse di un valore tradotto, autocompletamento di chiavi e campi, e un avviso quando una chiave non è dichiarata da nessuna parte. Risolve anche le chiamate `i18next`, `react-i18next`, `next-intl` e `use-intl`, il che aiuta durante la migrazione.
- **[Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md)**: espone la documentazione di Intlayer e la CLI a Cursor, VS Code, Claude Desktop, Claude Code e ChatGPT, così un assistente risponde in base alla documentazione aggiornata invece di tirare a indovinare, e può eseguire da solo comandi come `intlayer fill`.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md)**: competenze mirate come `intlayer-config`, `intlayer-cli` e `intlayer-content`, più una per framework, che insegnano a un agente la tua configurazione di routing e i tipi di nodo dei contenuti.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/eslint.md)**: `no-raw-text` segnala le stringhe hardcoded, con ulteriori regole per le chiavi statiche dei dizionari e i contenuti non utilizzati.

</Question>

<Question title="Dove viene eseguito l'editor visivo?">

Sulla tua infrastruttura. Carica la tua applicazione in un iframe e comunica con un server editor locale, quindi il tuo contenuto non lascia mai il tuo ambiente. È questo che lo rende utilizzabile per progetti che non possono inviare testi a un servizio ospitato.

</Question>

<Question title="Gli editor devono saper programmare?">

No. Aprono il sito, cliccano su un pezzo di testo e lo modificano sul posto. L'editor risolve quale voce del dizionario è alla base di quel testo e scrive la modifica nel file di contenuto giusto, così un traduttore non deve trovare il file o conoscere la chiave.

</Question>

<Question title="Modificare tramite l'editor visivo cambia i miei file sorgente?">

Sì, è l'intento. La modifica finisce nel file di dichiarazione dei contenuti nel tuo codice, quindi appare come un normale diff che puoi rivedere e committare, e l'applicazione si ricostruisce per mostrarla.

</Question>

<Question title="L'editor mostra una pagina bianca o si rifiuta di caricare il mio sito. Cosa dovrei controllare?">

L'editor mostra la tua applicazione in un iframe, quindi la tua Content Security Policy deve permettere l'origine dell'editor come `frame-ancestors`, che è `http://localhost:8000` per impostazione predefinita. Verifica anche che l'`applicationURL` nella configurazione del tuo editor corrisponda all'URL da cui la tua app viene effettivamente servita. La console dell'editor segnala entrambi i problemi.

</Question>

<Question title="Posso usare l'editor visivo in produzione?">

È progettato per lo sviluppo e lo staging, dove una ricostruzione dopo una modifica è accettabile. Per modificare il contenuto su un sito live senza un deployment, usa invece il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) e i suoi dizionari remoti.

</Question>

<Question title="L'editor visivo è gratuito?">

Sì. L'editor visivo fa parte del progetto open source, sotto licenza Apache 2.0, uso commerciale incluso. Solo il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) ospitato è un servizio a pagamento, e può anche essere [auto-ospitato](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/self_hosting.md).

</Question>

</FAQ>
