---
createdAt: 2024-08-14
updatedAt: 2026-08-30
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
author: aymericzip
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
   - I file `.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}` possono essere creati utilizzando un'estensione VSCode
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

| Funzionalità                                                                                                              | Descrizione                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                          | **Supporto Cross-Framework**<br><br>Intlayer è compatibile con tutti i principali framework e librerie, inclusi Next.js, React, Vite, Vue.js, Nuxt, Preact, Express e altri.                                                                                                                                                                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)       | **Gestione del contenuto basata su JavaScript**<br><br>Sfrutta la flessibilità di JavaScript per definire e gestire il tuo contenuto in modo efficiente.<br><br> - [Dichiarazione del contenuto](https://intlayer.org/doc/concept/content)                                                                                                                                                                                                                              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Feature" width="700">  | **Compilatore**<br><br>Il compilatore Intlayer estrae automaticamente il contenuto dai componenti e genera i file del dizionario.<br><br> - [Compilatore](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **File di dichiarazione del contenuto per singola lingua**<br><br>Velocizza il tuo sviluppo dichiarando il tuo contenuto una sola volta, prima della generazione automatica.<br><br> - [File di dichiarazione del contenuto per singola lingua](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **Ambiente Type-Safe**<br><br>Sfrutta TypeScript per garantire che le definizioni del tuo contenuto e il tuo codice siano privi di errori, beneficiando al contempo dell'autocompletamento dell'IDE.<br><br> - [Configurazione di TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **Configurazione semplificata**<br><br>Inizia rapidamente con una configurazione minima. Regola facilmente le impostazioni per internazionalizzazione, routing, IA, build e gestione del contenuto.<br><br> - [Esplora l'integrazione con Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **Recupero del contenuto semplificato**<br><br>Non c'è bisogno di chiamare la tua funzione `t` per ogni elemento del contenuto. Recupera tutto il tuo contenuto direttamente usando un singolo hook.<br><br> - [Integrazione con React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **Implementazione coerente dei componenti server**<br><br>Perfettamente adatto per i componenti server di Next.js, usa la stessa implementazione sia per i componenti client che server, senza bisogno di passare la tua funzione `t` attraverso ciascun componente server.<br><br> - [Componenti Server](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                                                              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **Base di codice organizzata**<br><br>Mantieni la tua base di codice più organizzata: 1 componente = 1 dizionario nella stessa cartella. Le traduzioni vicine ai rispettivi componenti migliorano la manutenibilità e la chiarezza.<br><br> - [Come funziona Intlayer](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **Routing potenziato**<br><br>Supporto completo del routing dell'app, adattandosi perfettamente a strutture applicative complesse, per Next.js, React, Vite, Vue.js, ecc.<br><br> - [Esplora l'integrazione con Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **Supporto Markdown**<br><br>Importa e interpreta file locali e Markdown remoto per contenuti multilingue come informative sulla privacy, documentazione, ecc. Interpreta e rendi accessibili i metadati Markdown nel tuo codice.<br><br> - [File di contenuto](https://intlayer.org/doc/concept/content/file)                                                                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **Editor visuale e CMS gratuiti**<br><br>Un editor visuale e un CMS gratuiti sono disponibili per i creatori di contenuti, eliminando la necessità di una piattaforma di localizzazione. Mantieni il tuo contenuto sincronizzato usando Git, o esternalizzalo totalmente o parzialmente con il CMS.<br><br> - [Editor di Intlayer](https://intlayer.org/doc/concept/editor) <br> - [CMS di Intlayer](https://intlayer.org/doc/concept/cms)                              |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **Contenuto Tree-shakable**<br><br>Contenuto tree-shakable, che riduce le dimensioni del bundle finale. Carica il contenuto per componente, escludendo qualsiasi contenuto non utilizzato dal bundle. Supporta il caricamento lazy per migliorare l'efficienza di caricamento dell'app.<br><br> - [Ottimizzazione della build dell'applicazione](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **Rendering statico**<br><br>Non blocca il rendering statico.<br><br> - [Integrazione con Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **Traduzione basata sull'IA**<br><br>Trasforma il tuo sito web in 231 lingue con un solo clic grazie agli strumenti avanzati di traduzione basati sull'IA di Intlayer utilizzando il tuo provider di IA/chiave API.<br><br> - [Integrazione CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [CLI di Intlayer](https://intlayer.org/doc/concept/cli) <br> - [Riempimento automatico](https://intlayer.org/doc/concept/auto-fill)                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **Integrazione Server MCP**<br><br>Fornisce un server MCP (Model Context Protocol) per l'automazione dell'IDE, abilitando una gestione trasparente del contenuto e dei flussi di lavoro i18n direttamente all'interno del tuo ambiente di sviluppo.<br><br> - [Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/it/mcp_server.md)                                                                                                                      |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **Estensione VSCode**<br><br>Intlayer fornisce un'estensione VSCode per aiutarti a gestire il tuo contenuto e le traduzioni, compilare i tuoi dizionari, tradurre il tuo contenuto e altro ancora.<br><br> - [Estensione VSCode](https://intlayer.org/doc/vs-code-extension)                                                                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **Interoperabilità**<br><br>Consente l'interoperabilità con react-i18next, next-i18next, next-intl e react-intl.<br><br> - [Intlayer e react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer e next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer e next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next) <br> - [Adattatori di compatibilità di Intlayer](https://intlayer.org/doc/compatibility) |
| Test delle traduzioni mancanti (CLI/CI)                                                                                   | ✅ CLI: npx intlayer content test (audit compatibile con CI)                                                                                                                                                                                                                                                                                                                                                                                                            |

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

Se desideri continuare a usare l'API della tua attuale libreria i18n, `intlayer` fornisce anche gli **adattatori di compatibilità (compat adapters)**: pacchetti che espongono esattamente la stessa API di `react-i18next`, `next-intl`, `react-intl`, `vue-i18n` e altre, ma serviti dai dizionari di Intlayer. Questo ti permette di migrare progressivamente senza riscrivere il tuo codice. Consulta la [documentazione degli adattatori di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/index.md).

## Domande frequenti

<FAQ>

<Question title="Quali sono le diverse soluzioni disponibili per internazionalizzare un'app JavaScript?">

Coesistono tre generazioni:

- **Librerie con cataloghi a runtime**: `i18next`, `react-i18next`, `next-i18next`, `vue-i18n`, `ngx-translate`, `svelte-i18n`. Namespace JSON caricati a runtime. Mature, indipendenti dal framework, non tipizzate e inviate per intero alla pagina.
- **Librerie di messaggi in fase di compilazione**: `Lingui`, `Paraglide`, e `next-intl` o `react-intl` con un passo di estrazione. Migliore comportamento del bundle e tipizzazione parziale, ma sempre un catalogo centralizzato.
- **Librerie a livello di contenuto**: `Intlayer`. Il contenuto è dichiarato e compilato per componente, quindi tipizzazione, tree shaking, strumenti di modifica e traduzione AI provengono tutti dalle stesse dichiarazioni.

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

<Question title="In cosa Intlayer è diverso da next-intl?">

`next-intl` è un livello di messaggi per Next.js: mantieni file JSON di messaggi per locale e li leggi attraverso `useTranslations`. Intlayer è un livello di contenuto: le dichiarazioni vivono accanto al componente, sono tipizzate dalla dichiarazione stessa e sono compilate per componente così una pagina invia solo ciò che renderizza. Intlayer copre anche ciò che `next-intl` lascia a te, ossia la traduzione AI, un editor visivo, un CMS e i controlli delle traduzioni mancanti in CI. Se vuoi mantenere l'API di `next-intl`, l'[adattatore di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md) la serve dai dizionari Intlayer.

</Question>

<Question title="In cosa Intlayer è diverso da i18next e react-i18next?">

`i18next` risolve le chiavi stringa contro i namespace a runtime, il che significa che una chiave rinominata o scritta male fallisce silenziosamente e ogni namespace toccato da una pagina viene scaricato per intero. Intlayer risolve il contenuto in fase di build contro i tipi generati, quindi una chiave errata è un errore di compilazione, e solo le voci che un componente renderizza raggiungono il bundle. `i18next` ha l'ecosistema di plugin più grande e una storia più lunga; Intlayer ha la tipizzazione, la dimensione del bundle e gli strumenti di modifica e automazione. Vedi la [guida alla migrazione da i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_i18next_to_intlayer.md) o l'[adattatore di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md).

</Question>

<Question title="Intlayer è più veloce o più leggero delle alternative?">

Su bundle e dimensione delle pagine, sì: non caricare cataloghi che una pagina non renderizza riduce la dimensione del bundle e delle pagine fino al 50% rispetto alle configurazioni basate su namespace. Il [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/index.md) pubblica il metodo e i numeri per framework, inclusi [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/nextjs.md), [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/tanstack.md), [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/vue.md) e [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/svelte.md), così puoi riprodurli invece di prendere l'affermazione per buona.

</Question>

<Question title="Vale la pena migrare un'app esistente?">

Dipende da cosa fa male oggi. Se il tuo problema è la dimensione del bundle, le traduzioni mancanti silenziose, o i traduttori che non possono lavorare senza uno sviluppatore, la migrazione si ripaga da sola. Se i tuoi cataloghi sono piccoli e stabili, il guadagno è minore. In ogni caso la migrazione non deve essere una riscrittura: gli [adattatori di compatibilità](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compat/index.md) mantengono la tua API attuale, e il [plugin di sincronizzazione JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md) mantiene i tuoi file JSON esistenti come fonte di verità mentre entrambi i livelli coesistono.

</Question>

<Question title="Cosa offre Intlayer che le altre librerie i18n non offrono?">

[Contenuto Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/markdown.md), [contenuto recuperato da una fonte esterna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md), caricamento di contenuto da file, [aggiornamenti di contenuto live](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/live.md), un [editor visivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md), un [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md), un [compilatore](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md) che estrae il contenuto dai componenti esistenti, [varianti di contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/variants.md) per l'A/B testing, [analytics](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/analytics.md) sull'esposizione dei contenuti, un [server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md), un [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md) e le [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md).

</Question>

<Question title="Posso usare Intlayer solo come gestore di traduzioni e mantenere la mia libreria attuale?">

Sì. Intlayer può generare i tuoi namespace nel formato e nella posizione che la tua libreria attuale si aspetta, per esempio `/messages/{locale}/{namespace}.json`, così ottieni la traduzione AI, l'editor e i controlli in CI mentre il codice della tua applicazione continua a usare la sua libreria i18n esistente.

</Question>

<Question title="Intlayer è gratuito e open source?">

Sì, sotto licenza Apache 2.0, uso commerciale incluso. Il CMS ospitato è un servizio a pagamento opzionale che può anche essere [auto-ospitato](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/self_hosting.md).

</Question>

</FAQ>
