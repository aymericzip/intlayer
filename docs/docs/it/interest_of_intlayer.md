---
createdAt: 2024-08-14
updatedAt: 2026-05-31
title: Interesse per Intlayer
description: Scopri i vantaggi e i benefici dell'utilizzo di Intlayer nei tuoi progetti. Comprendi perché Intlayer si distingue tra gli altri framework.
keywords:
  - Benefici
  - Vantaggi
  - Intlayer
  - Framework
  - Confronto
slugs:
  - doc
  - why
history:
  - version: 8.11.2
    date: 2026-05-31
    changes: "Aggiunta la sezione Perché Intlayer rispetto alle alternative"
  - version: 7.3.1
    date: 2025-11-27
    changes: "Rilascio del Compilatore"
  - version: 5.8.0
    date: 2025-08-19
    changes: "Aggiornata la tabella comparativa"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inizializzazione della cronologia"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Perché dovresti considerare Intlayer?

## Cos'è Intlayer?

**Intlayer** è una libreria di internazionalizzazione progettata specificamente per gli sviluppatori JavaScript. Consente la dichiarazione del tuo contenuto ovunque nel tuo codice. Converte le dichiarazioni di contenuto multilingue in dizionari strutturati per integrarsi facilmente nel tuo codice. Utilizzando TypeScript, **Intlayer** rende il tuo sviluppo più solido ed efficiente.

## Perché Intlayer rispetto alle alternative?

Rispetto alle soluzioni principali come `next-intl` o `i18next`, Intlayer è una soluzione che include ottimizzazioni integrate come:

<AccordionGroup>

<Accordion header="Dimensione del bundle">

Invece di caricare enormi file JSON nelle tue pagine, carica solo il contenuto strettamente necessario. Intlayer aiuta a **ridurre la dimensione del bundle e delle pagine fino al 50%**.

</Accordion>

<Accordion header="Manutenibilità">

Delineare il contenuto della tua applicazione a livello di componente **facilita la manutenzione** per applicazioni su larga scala. Puoi duplicare o eliminare una singola cartella di funzionalità senza il carico mentale di dover rivedere l'intera base di codice del contenuto. Inoltre, Intlayer è **completamente tipizzato** per garantire l'accuratezza del tuo contenuto.

</Accordion>

<Accordion header="Agente IA">

Co-localizzare il contenuto **riduce il contesto necessario** per i modelli di linguaggio di grandi dimensioni (LLM). Intlayer include anche una suite di strumenti, come una **CLI** per verificare le traduzioni mancanti, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md)** e **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md)**, per rendere l'esperienza sviluppatore (DX) ancora più fluida per gli agenti IA.

</Accordion>

<Accordion header="Funzionalità">

Intlayer offre una serie di funzionalità aggiuntive che altre soluzioni i18n non hanno, come il [supporto per Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/markdown.md), il [recupero di contenuto esterno](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/function_fetching.md), il [caricamento del contenuto da file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/file.md), l'[aggiornamento del contenuto in tempo reale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/live.md), l'[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) e molto altro.

</Accordion>

<Accordion header="Automazione">

Usa l'automazione per tradurre nella tua pipeline CI/CD utilizzando l'LLM che preferisci al costo del tuo fornitore di IA. Intlayer offre anche un **compilatore** per automatizzare l'estrazione del contenuto, oltre a una [piattaforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) per aiutarti a **tradurre in background**.

</Accordion>

<Accordion header="Prestazioni">

Il collegamento di enormi file JSON ai componenti può causare problemi di prestazioni e reattività. Intlayer ottimizza il caricamento del contenuto in fase di compilazione (build).

</Accordion>

<Accordion header="Collaborazione con non sviluppatori">

Molto più di una semplice soluzione i18n, Intlayer fornisce un **[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) auto-ospitato** e un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)** per aiutarti a gestire il tuo contenuto multilingue in **tempo reale**, rendendo fluida la collaborazione con traduttori, copywriter e altri membri del team. Il contenuto può essere memorizzato localmente e/o in remoto.

</Accordion>

<Accordion header="Design cross-framework">

Se usi framework diversi per parti diverse della tua applicazione (es. React, React-native, Vue, Angular, Svelte, ecc.), Intlayer fornisce un modo per **utilizzare una sintassi e un'implementazione comuni su tutti i principali framework frontend**. Sarai anche in grado di condividere la dichiarazione del tuo contenuto all'interno del tuo design system, delle app, del backend, ecc.

</Accordion>
</AccordionGroup>

## Perché è stato creato Intlayer?

Intlayer è stato creato per risolvere un problema comune che affligge tutte le librerie i18n principali come `next-intl`, `react-i18next`, `react-intl`, `next-i18next`, `react-intl` e `vue-i18n`.

Tutte queste soluzioni adottano un approccio centralizzato per elencare e gestire il tuo contenuto. Ad esempio:

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

O qui utilizzando i namespace:

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            └── index.tsx
```

Questo tipo di architettura rallenta il processo di sviluppo e rende la base di codice più complessa da mantenere per diversi motivi:

1. **Per qualsiasi nuovo componente creato, devi:**
   - Creare la nuova risorsa/namespace nella cartella `locales`
   - Ricordare di importare il nuovo namespace nella tua pagina
   - Tradurre il tuo contenuto (spesso fatto manualmente copiando/incollando da servizi IA)

2. **Per qualsiasi modifica apportata ai tuoi componenti, devi:**
   - Cercare la risorsa/namespace correlato (lontano dal componente)
   - Tradurre il tuo contenuto
   - Assicurarti che il tuo contenuto sia aggiornato per ogni lingua
   - Verificare che il tuo namespace non includa chiavi/valori inutilizzati
   - Assicurarti che la struttura dei tuoi file JSON sia identica per tutte le lingue

Nei progetti professionali che utilizzano queste soluzioni, vengono spesso utilizzate piattaforme di localizzazione per aiutare a gestire la traduzione del tuo contenuto. Tuttavia, questo può diventare rapidamente costoso per progetti di grandi dimensioni.

Per risolvere questo problema, Intlayer adotta un approccio che delimita il tuo contenuto per componente e lo mantiene vicino al componente stesso, come facciamo spesso con CSS (`styled-components`), tipi, documentazione (`storybook`) o unit test (`jest`).

```bash codeFormat="typescript"
.
└── components
    └── MyComponent
        ├── index.content.ts
        ├── index.test.tsx
        ├── index.stories.tsx
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── components
    └── MyComponent
        ├── index.content.cjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```bash codeFormat="esm"
.
└── components
    └── MyComponent
        ├── index.content.mjs
        ├── index.test.mjs
        ├── index.stories.mjs
        └── index.tsx
```

```tsx fileName="./components/MyComponent/index.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```tsx fileName="./components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

Questo approccio ti consente di:

1. **Aumentare la velocità di sviluppo**
   - I file `.content.{{ts|mjs|cjs|json}}` possono essere creati utilizzando un'estensione VSCode
   - Gli strumenti di autocompletamento IA nel tuo IDE (come GitHub Copilot) possono aiutarti a dichiarare il tuo contenuto, riducendo il copia/incolla

2. **Pulire la tua base di codice**
   - Ridurre la complessità
   - Aumentare la manutenibilità

3. **Duplicare i tuoi componenti e il loro contenuto relativo più facilmente (Esempio: componenti di login/registrazione, ecc.)**
   - Limitando il rischio di impattare il contenuto di altri componenti
   - Copiando/incollando il tuo contenuto da un'applicazione all'altra senza dipendenze esterne

4. **Evitare di inquinare la tua base di codice con chiavi/valori inutilizzati per componenti non utilizzati**
   - Se non usi un componente, Intlayer non importerà il suo contenuto correlato
   - Se elimini un componente, ricorderai più facilmente di rimuovere il suo contenuto correlato poiché sarà presente nella stessa cartella

5. **Ridurre il costo di ragionamento per gli agenti IA per dichiarare il tuo contenuto multilingue**
   - L'agente IA non dovrà scansionare l'intera base di codice per sapere dove implementare il tuo contenuto
   - Le traduzioni possono essere facilmente eseguite da strumenti di autocompletamento IA nel tuo IDE (come GitHub Copilot)

6. **Ottimizzare le prestazioni di caricamento**
   - Se un componente viene caricato in modalità lazy (lazy-loaded), il suo contenuto correlato verrà caricato nello stesso momento

## Funzionalità aggiuntive di Intlayer

| Funzionalità                                                                                                              | Descrizione                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **Supporto Cross-Framework**<br><br>Intlayer è compatibile con tutti i principali framework e librerie, inclusi Next.js, React, Vite, Vue.js, Nuxt, Preact, Express e altri.                                                                                                                                                                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **Gestione del contenuto basata su JavaScript**<br><br>Sfrutta la flessibilità di JavaScript per definire e gestire il tuo contenuto in modo efficiente.<br><br> - [Dichiarazione del contenuto](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                 |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Feature" width="700">  | **Compilatore**<br><br>Il compilatore Intlayer estrae automaticamente il contenuto dai componenti e genera i file del dizionario.<br><br> - [Compilatore](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **File di dichiarazione del contenuto per singola lingua**<br><br>Velocizza il tuo sviluppo dichiarando il tuo contenuto una sola volta, prima della generazione automatica.<br><br> - [File di dichiarazione del contenuto per singola lingua](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **Ambiente Type-Safe**<br><br>Sfrutta TypeScript per garantire che le definizioni del tuo contenuto e il tuo codice siano privi di errori, beneficiando al contempo dell'autocompletamento dell'IDE.<br><br> - [Configurazione di TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                    |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **Configurazione semplificata**<br><br>Inizia rapidamente con una configurazione minima. Regola facilmente le impostazioni per internazionalizzazione, routing, IA, build e gestione del contenuto.<br><br> - [Esplora l'integrazione con Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **Recupero del contenuto semplificato**<br><br>Non c'è bisogno di chiamare la tua funzione `t` per ogni elemento del contenuto. Recupera tutto il tuo contenuto direttamente usando un singolo hook.<br><br> - [Integrazione con React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **Implementazione coerente dei componenti server**<br><br>Perfettamente adatto per i componenti server di Next.js, usa la stessa implementazione sia per i componenti client che server, senza bisogno di passare la tua funzione `t` attraverso ciascun componente server.<br><br> - [Componenti Server](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **Base di codice organizzata**<br><br>Mantieni la tua base di codice più organizzata: 1 componente = 1 dizionario nella stessa cartella. Le traduzioni vicine ai rispettivi componenti migliorano la manutenibilità e la chiarezza.<br><br> - [Come funziona Intlayer](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **Routing potenziato**<br><br>Supporto completo del routing dell'app, adattandosi perfettamente a strutture applicative complesse, per Next.js, React, Vite, Vue.js, ecc.<br><br> - [Esplora l'integrazione con Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                      |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Supporto Markdown**<br><br>Importa e interpreta file locali e Markdown remoto per contenuti multilingue come informative sulla privacy, documentazione, ecc. Interpreta e rendi accessibili i metadati Markdown nel tuo codice.<br><br> - [File di contenuto](https://intlayer.org/doc/concept/content/file)                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **Editor visuale e CMS gratuiti**<br><br>Un editor visuale e un CMS gratuiti sono disponibili per i creatori di contenuti, eliminando la necessità di una piattaforma di localizzazione. Mantieni il tuo contenuto sincronizzato usando Git, o esternalizzalo totalmente o parzialmente con il CMS.<br><br> - [Editor di Intlayer](https://intlayer.org/doc/concept/editor) <br> - [CMS di Intlayer](https://intlayer.org/doc/concept/cms) |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **Contenuto Tree-shakable**<br><br>Contenuto tree-shakable, che riduce le dimensioni del bundle finale. Carica il contenuto per componente, escludendo qualsiasi contenuto non utilizzato dal bundle. Supporta il caricamento lazy per migliorare l'efficienza di caricamento dell'app.<br><br> - [Ottimizzazione della build dell'applicazione](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **Rendering statico**<br><br>Non blocca il rendering statico.<br><br> - [Integrazione con Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **Traduzione basata sull'IA**<br><br>Trasforma il tuo sito web in 231 lingue con un solo clic grazie agli strumenti avanzati di traduzione basati sull'IA di Intlayer utilizzando il tuo provider di IA/chiave API.<br><br> - [Integrazione CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [CLI di Intlayer](https://intlayer.org/doc/concept/cli) <br> - [Riempimento automatico](https://intlayer.org/doc/concept/auto-fill)      |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **Integrazione Server MCP**<br><br>Fornisce un server MCP (Model Context Protocol) per l'automazione dell'IDE, abilitando una gestione trasparente del contenuto e dei flussi di lavoro i18n direttamente all'interno del tuo ambiente di sviluppo.<br><br> - [Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/it/mcp_server.md)                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **Estensione VSCode**<br><br>Intlayer fornisce un'estensione VSCode per aiutarti a gestire il tuo contenuto e le traduzioni, compilare i tuoi dizionari, tradurre il tuo contenuto e altro ancora.<br><br> - [Estensione VSCode](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **Interoperabilità**<br><br>Consente l'interoperabilità con react-i18next, next-i18next, next-intl e react-intl.<br><br> - [Intlayer e react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer e next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer e next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                                             |
| Test delle traduzioni mancanti (CLI/CI)                                                                                   | ✅ CLI: npx intlayer content test (audit compatibile con CI)                                                                                                                                                                                                                                                                                                                                                                               |

## Confronto di Intlayer con altre soluzioni

| Funzionalità                                        | `intlayer`                                                                                                                                 | `react-i18next`                                                                                                                  | `react-intl` (FormatJS)                                                                                                                                         | `lingui`                                                                | `next-intl`                                                                                                                      | `next-i18next`                                                                                                                   | `vue-i18n`                                                                     |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Traduzioni vicine ai componenti**                 | ✅ Sì, contenuto colocalizzato con ciascun componente                                                                                      | ❌ No                                                                                                                            | ❌ No                                                                                                                                                           | ❌ No                                                                   | ❌ No                                                                                                                            | ❌ No                                                                                                                            | ✅ Sì - usando `Single File Components` (SFCs)                                 |
| **Integrazione con TypeScript**                     | ✅ Avanzata, tipi rigorosi autogenerati                                                                                                    | ⚠️ Di base; configurazione extra per sicurezza                                                                                   | ✅ Buona, ma meno rigorosa                                                                                                                                      | ⚠️ Digitazione, richiede configurazione                                 | ✅ Buona                                                                                                                         | ⚠️ Di base                                                                                                                       | ✅ Buona (tipi disponibili; la sicurezza delle chiavi richiede configurazione) |
| **Rilevamento traduzioni mancanti**                 | ✅ Evidenziazione errore TypeScript ed errore/avviso a build-time                                                                          | ⚠️ Principalmente stringhe di fallback a runtime                                                                                 | ⚠️ Stringhe di fallback                                                                                                                                         | ⚠️ Richiede una configurazione extra                                    | ⚠️ Fallback a runtime                                                                                                            | ⚠️ Fallback a runtime                                                                                                            | ⚠️ Fallback/avvisi a runtime (configurabile)                                   |
| **Contenuto ricco (JSX/Markdown/componenti)**       | ✅ Supporto diretto                                                                                                                        | ⚠️ Limitato / solo interpolazione                                                                                                | ⚠️ Sintassi ICU, non vero JSX                                                                                                                                   | ⚠️ Limitato                                                             | ❌ Non progettato per nodi ricchi                                                                                                | ⚠️ Limitato                                                                                                                      | ⚠️ Limitato (componenti tramite `<i18n-t>`, Markdown tramite plugin)           |
| **Traduzione basata sull'IA**                       | ✅ Sì, supporta più fornitori di IA. Utilizzabile con chiavi API proprie. Considera il contesto dell'applicazione e l'ambito del contenuto | ❌ No                                                                                                                            | ❌ No                                                                                                                                                           | ❌ No                                                                   | ❌ No                                                                                                                            | ❌ No                                                                                                                            | ❌ No                                                                          |
| **Editor Visuale**                                  | ✅ Sì, editor visuale locale + CMS opzionale; può esternalizzare il contenuto della base di codice; incorporabile                          | ❌ No / disponibile tramite piattaforme di localizzazione esterne                                                                | ❌ No / disponibile tramite piattaforme di localizzazione esterne                                                                                               | ❌ No / disponibile tramite piattaforme di localizzazione esterne       | ❌ No / disponibile tramite piattaforme di localizzazione esterne                                                                | ❌ No / disponibile tramite piattaforme di localizzazione esterne                                                                | ❌ No / disponibile tramite piattaforme di localizzazione esterne              |
| **Routing localizzato**                             | ✅ Sì, supporta percorsi localizzati fin da subito (funziona con Next.js & Vite)                                                           | ⚠️ Non integrato, richiede plugin (es. `next-i18next`) o config personalizzata del router                                        | ❌ No, solo formattazione dei messaggi, il routing deve essere manuale                                                                                          | ⚠️ Non integrato, richiede plugin o config manuale                      | ✅ Integrato, App Router supporta il segmento `[locale]`                                                                         | ✅ Integrato                                                                                                                     | ✅ Integrato                                                                   |
| **Generazione dinamica del percorso**               | ✅ Sì                                                                                                                                      | ⚠️ Setup manuale o plugin/ecosistema                                                                                             | ❌ Non fornito                                                                                                                                                  | ⚠️ Plugin/manuale                                                       | ✅ Sì                                                                                                                            | ✅ Sì                                                                                                                            | ❌ Non fornito (Nuxt i18n fornisce)                                            |
| **Pluralizzazione**                                 | ✅ Pattern basati su enumerazione                                                                                                          | ✅ Configurabile (plugin come i18next-icu)                                                                                       | ✅ (ICU)                                                                                                                                                        | ✅ (ICU/messageformat)                                                  | ✅ Buona                                                                                                                         | ✅ Buona                                                                                                                         | ✅ Regole di pluralizzazione integrate                                         |
| **Formattazione (date, numeri, valute)**            | ✅ Formattatori ottimizzati (Intl sotto il cofano)                                                                                         | ⚠️ Tramite plugin o utilizzo personalizzato di Intl                                                                              | ✅ Formattatori ICU                                                                                                                                             | ✅ Helper ICU/CLI                                                       | ✅ Buona (helper Intl)                                                                                                           | ✅ Buona (helper Intl)                                                                                                           | ✅ Formattatori di data/numero integrati (Intl)                                |
| **Formato del contenuto**                           | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml WIP)                                                                                           | ⚠️ .json                                                                                                                         | ✅ .json, .js                                                                                                                                                   | ⚠️ .po, .json                                                           | ✅ .json, .js, .ts                                                                                                               | ⚠️ .json                                                                                                                         | ✅ .json, .js                                                                  |
| **Supporto ICU**                                    | ⚠️ WIP                                                                                                                                     | ⚠️ Tramite plugin (i18next-icu)                                                                                                  | ✅ Sì                                                                                                                                                           | ✅ Sì                                                                   | ✅ Sì                                                                                                                            | ⚠️ Tramite plugin (`i18next-icu`)                                                                                                | ⚠️ Tramite formatore/compilatore personalizzato                                |
| **Helper SEO (hreflang, sitemap)**                  | ✅ Strumenti integrati: helper per sitemap, robots.txt, metadati                                                                           | ⚠️ Plugin della community/manual                                                                                                 | ❌ Non core                                                                                                                                                     | ❌ Non core                                                             | ✅ Buona                                                                                                                         | ✅ Buona                                                                                                                         | ❌ Non core (Nuxt i18n fornisce gli helper)                                    |
| **Ecosistema / Community**                          | ⚠️ Più piccolo ma in rapida crescita e reattivo                                                                                            | ✅ Più grande e maturo                                                                                                           | ✅ Grande                                                                                                                                                       | ⚠️ Più piccolo                                                          | ✅ Dimensioni medie, focalizzato su Next.js                                                                                      | ✅ Dimensioni medie, focalizzato su Next.js                                                                                      | ✅ Grande nell'ecosistema Vue                                                  |
| **Server-side Rendering & Server Components**       | ✅ Sì, ottimizzato per SSR / React Server Components                                                                                       | ⚠️ Supportato a livello di pagina ma è necessario passare le t-funzioni sull'albero dei componenti per i componenti server figli | ⚠️ Supportato a livello di pagina con configurazione aggiuntiva, ma è necessario passare le t-funzioni sull'albero dei componenti per i componenti server figli | ✅ Supportato, configurazione richiesta                                 | ⚠️ Supportato a livello di pagina ma è necessario passare le t-funzioni sull'albero dei componenti per i componenti server figli | ⚠️ Supportato a livello di pagina ma è necessario passare le t-funzioni sull'albero dei componenti per i componenti server figli | ✅ SSR tramite Nuxt/Vue SSR (no RSC)                                           |
| **Tree-shaking (carica solo contenuto utilizzato)** | ✅ Sì, per componente a build-time tramite plugin Babel/SWC                                                                                | ⚠️ Di solito carica tutto (può essere migliorato con namespace/code-splitting)                                                   | ⚠️ Di solito carica tutto                                                                                                                                       | ❌ Non predefinito                                                      | ⚠️ Parziale                                                                                                                      | ⚠️ Parziale                                                                                                                      | ⚠️ Parziale (con code-splitting/setup manuale)                                 |
| **Caricamento lazy (Lazy loading)**                 | ✅ Sì, per locale / per dizionario                                                                                                         | ✅ Sì (es. backend/namespace su richiesta)                                                                                       | ✅ Sì (split dei bundle di locale)                                                                                                                              | ✅ Sì (importazioni di cataloghi dinamici)                              | ✅ Sì (per rotta/per locale), richiede la gestione dei namespace                                                                 | ✅ Sì (per rotta/per locale), richiede la gestione dei namespace                                                                 | ✅ Sì (messaggi di locale asincroni)                                           |
| **Pura il contenuto non utilizzato**                | ✅ Sì, per dizionario a build-time                                                                                                         | ❌ No, solo tramite segmentazione manuale dei namespace                                                                          | ❌ No, tutti i messaggi dichiarati sono raggruppati                                                                                                             | ✅ Sì, le chiavi inutilizzate vengono rilevate ed eliminate nella build | ❌ No, può essere gestito manualmente con la gestione dei namespace                                                              | ❌ No, può essere gestito manualmente con la gestione dei namespace                                                              | ❌ No, possibile solo tramite caricamento lazy manuale                         |
| **Gestione di grandi progetti**                     | ✅ Incoraggia la modularità, adatto al design-system                                                                                       | ⚠️ Richiede una buona disciplina dei file                                                                                        | ⚠️ I cataloghi centrali possono diventare grandi                                                                                                                | ⚠️ Può diventare complesso                                              | ✅ Modulare con configurazione                                                                                                   | ✅ Modulare con configurazione                                                                                                   | ✅ Modulare con configurazione di Vue Router/Nuxt i18n                         |

## Stelle su GitHub

Le stelle su GitHub sono un forte indicatore della popolarità di un progetto, della fiducia della comunità e della pertinenza a lungo termine. Sebbene non siano una misura diretta della qualità tecnica, riflettono quanti sviluppatori trovano utile il progetto, seguono i suoi progressi ed è probabile che lo adottino. Per stimare il valore di un progetto, le stelle aiutano a confrontare l'attrazione tra le alternative e forniscono informazioni sulla crescita dell'ecosistema.

[![Star History Chart](https://api.star-history.com/chart?repos=aymericzip/intlayer%2Cformatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Ccodingcommons/typesafe-i18n%2Copral/paraglide-js&type=date&legend=top-left)](https://www.star-history.com/#aymericzip/intlayer&formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&codingcommons/typesafe-i18n&opral/paraglide-js)

---

## Interoperabilità

`intlayer` può anche aiutare a gestire i namespace `react-intl`, `react-i18next`, `next-intl`, `next-i18next` e `vue-i18n`.

Utilizzando `intlayer`, puoi dichiarare il tuo contenuto nel formato della tua libreria i18n preferita, e intlayer genererà i tuoi namespace nella posizione che preferisci (esempio: `/messages/{{locale}}/{{namespace}}.json`).
