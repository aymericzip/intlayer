---
createdAt: 2024-08-14
updatedAt: 2025-09-27
title: Interesse di Intlayer
description: Scopri i benefici e i vantaggi dell'utilizzo di Intlayer nei tuoi progetti. Capisci perché Intlayer si distingue tra gli altri framework.
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
  - version: 7.3.1
    date: 2025-11-27
    changes: "Rilascio del Compilatore"
  - version: 5.8.0
    date: 2025-08-19
    changes: "Aggiornamento della tabella comparativa"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inizio cronologia"
---

# Perché dovresti considerare Intlayer?

## Cos'è Intlayer?

**Intlayer** è una libreria di internazionalizzazione progettata specificamente per gli sviluppatori JavaScript. Permette la dichiarazione dei tuoi contenuti ovunque nel tuo codice. Converte le dichiarazioni di contenuti multilingue in dizionari strutturati per integrarsi facilmente nel tuo codice. Usando TypeScript, **Intlayer** rende il tuo sviluppo più solido ed efficiente.

## Perché è stato creato Intlayer?

Intlayer è stato creato per risolvere un problema comune che affligge tutte le comuni librerie i18n come `next-intl`, `react-i18next`, `react-intl`, `next-i18next`, `react-intl` e `vue-i18n`.

Tutte queste soluzioni adottano un approccio centralizzato per elencare e gestire i tuoi contenuti. Ad esempio:

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

O qui usando i namespace:

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

1. **Per ogni nuovo componente creato, dovresti:**
   - Creare la nuova risorsa/namespace nella cartella `locales`
   - Ricordarti di importare il nuovo namespace nella tua pagina
   - Tradurre i tuoi contenuti (spesso fatto manualmente copiando/incollando da fornitori di IA)

2. **Per ogni modifica apportata ai tuoi componenti, dovresti:**
   - Cercare la risorsa/namespace correlata (lontana dal componente)
   - Tradurre i tuoi contenuti
   - Assicurarti che il tuo contenuto sia aggiornato per ogni locale
   - Verificare che il tuo namespace non includa chiavi/valori non utilizzati
   - Assicurarti che la struttura dei tuoi file JSON sia la stessa per tutti i locale

Sui progetti professionali che utilizzano queste soluzioni, vengono spesso utilizzate piattaforme di localizzazione per aiutare a gestire la traduzione dei tuoi contenuti. Tuttavia, questo può diventare rapidamente costoso per i progetti di grandi dimensioni.

Per risolvere questo problema, Intlayer adotta un approccio che delimita i tuoi contenuti per componente e li mantiene vicini al componente stesso, come spesso facciamo con i CSS (`styled-components`), i tipi, la documentazione (`storybook`) o i test unitari (`jest`).

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
   - I file `.content.{{ts|mjs|cjs|json}}` possono essere creati utilizzando un'estensione di VSCode
   - Gli strumenti di completamento automatico IA nel tuo IDE (come GitHub Copilot) possono aiutarti a dichiarare i tuoi contenuti, riducendo il copia/incolla

2. **Pulire la tua base di codice**
   - Ridurre la complessità
   - Aumentare la manutenibilità

3. **Duplicare i tuoi componenti e i relativi contenuti più facilmente (Esempio: componenti di login/registrazione, ecc.)**
   - Limitando il rischio di impattare sui contenuti di altri componenti
   - Copiando/incollando i tuoi contenuti da un'applicazione all'altra senza dipendenze esterne

4. **Evitare di inquinare la tua base di codice con chiavi/valori non utilizzati per componenti non utilizzati**
   - Se non usi un componente, Intlayer non importerà il relativo contenuto
   - Se elimini un componente, ti ricorderai più facilmente di rimuovere il relativo contenuto poiché sarà presente nella stessa cartella

5. **Ridurre il costo di ragionamento per gli agenti IA per dichiarare i tuoi contenuti multilingue**
   - L'agente IA non dovrà scansionare l'intera base di codice per sapere dove implementare i tuoi contenuti
   - Le traduzioni possono essere eseguite facilmente dagli strumenti di completamento automatico IA nel tuo IDE (come GitHub Copilot)

6. **Ottimizzare le prestazioni di caricamento**
   - Se un componente viene caricato in modalità lazy, il relativo contenuto verrà caricato contemporaneamente

## Funzionalità aggiuntive di Intlayer

| Funzionalità                                                                                                                  | Descrizione                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Funzionalità](https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true)                         | **Supporto Cross-Framework**<br><br>Intlayer è compatibile con tutti i principali framework e librerie, inclusi Next.js, React, Vite, Vue.js, Nuxt, Preact, Express e altri ancora.                                                                                                                                                                                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.jpg?raw=true)           | **Gestione dei contenuti alimentata da JavaScript**<br><br>Sfrutta la flessibilità di JavaScript per definire e gestire i tuoi contenuti in modo efficiente. <br><br> - [Dichiarazione del contenuto](https://intlayer.org/doc/concept/content)                                                                                                                                                                                       |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.jpg?raw=true" alt="Funzionalità" width="700"> | **Compilatore**<br><br>Il Compilatore Intlayer estrae automaticamente il contenuto dai componenti e genera i file dei dizionari.<br><br> - [Compilatore](https://intlayer.org/doc/compiler)                                                                                                                                                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true)     | **File di dichiarazione dei contenuti per locale**<br><br>Accelera il tuo sviluppo dichiarando i tuoi contenuti una sola volta, prima della generazione automatica.<br><br> - [File di dichiarazione dei contenuti per locale](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                      |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                          | **Ambiente Type-Safe**<br><br>Sfrutta TypeScript per garantire che le definizioni dei contenuti e il codice siano privi di errori, beneficiando al contempo dell'autocompletamento dell'IDE.<br><br> - [Configurazione TypeScript](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                             | **Configurazione Semplificata**<br><br>Inizia rapidamente con una configurazione minima. Regola le impostazioni per l'internazionalizzazione, il routing, l'IA, la build e la gestione dei contenuti con facilità. <br><br> - [Esplora l'integrazione con Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                       | **Recupero dei contenuti semplificato**<br><br>Non c'è bisogno di chiamare la tua funzione `t` per ogni pezzo di contenuto. Recupera tutti i tuoi contenuti direttamente utilizzando un unico hook.<br><br> - [Integrazione React](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                        | **Implementazione coerente dei Server Component**<br><br>Perfettamente adatto per i server component di Next.js, utilizza la stessa implementazione sia per i componenti client che server, senza necessità di passare la tua funzione `t` attraverso ogni server component. <br><br> - [Server Component](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                               | **Base di codice organizzata**<br><br>Mantieni la tua base di codice più organizzata: 1 componente = 1 dizionario nella stessa cartella. Le traduzioni vicine ai rispettivi componenti migliorano la manutenibilità e la chiarezza. <br><br> - [Come funziona Intlayer](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                             | **Routing Avanzato**<br><br>Supporto completo del routing delle app, adattandosi perfettamente alle strutture applicative complesse, per Next.js, React, Vite, Vue.js, ecc.<br><br> - [Esplora l'integrazione con Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                               |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                                | **Supporto Markdown**<br><br>Importa e interpreta file locale e Markdown remoto per contenuti multilingue come informative sulla privacy, documentazione, ecc. Interpreta e rendi accessibili i metadati Markdown nel tuo codice.<br><br> - [File di contenuto](https://intlayer.org/doc/concept/content/file)                                                                                                                        |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                           | **Editor Visuale e CMS Gratuiti**<br><br>Un editor visuale e un CMS gratuiti sono disponibili per i redattori di contenuti, eliminando la necessità di una piattaforma di localizzazione. Mantieni i tuoi contenuti sincronizzati usando Git, o esternalizzali totalmente o parzialmente con il CMS.<br><br> - [Intlayer Editor](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms) |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                                  | **Contenuto Tree-shakable**<br><br>Contenuto tree-shakable, riducendo le dimensioni del bundle finale. Carica i contenuti per componente, escludendo qualsiasi contenuto inutilizzato dal tuo bundle. Supporta il lazy loading per migliorare l'efficienza di caricamento dell'app. <br><br> - [Ottimizzazione della build dell'app](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                      |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                        | **Rendering Statico**<br><br>Non blocca il Rendering Statico. <br><br> - [Integrazione Next.js](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                          | **Traduzione basata su IA**<br><br>Trasforma il tuo sito web in 231 lingue con un solo clic utilizzando gli avanzati strumenti di traduzione basati su IA di Intlayer, utilizzando il tuo fornitore di IA/chiave API. <br><br> - [Integrazione CI/CD](https://intlayer.org/doc/concept/ci-cd) <br> - [CLI di Intlayer](https://intlayer.org/doc/concept/cli) <br> - [Auto fill](https://intlayer.org/doc/concept/auto-fill)           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                     | **Integrazione del Server MCP**<br><br>Fornisce un server MCP (Model Context Protocol) per l'automazione dell'IDE, consentendo una gestione fluida dei contenuti e flussi di lavoro i18n direttamente all'interno del proprio ambiente di sviluppo. <br><br> - [Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/it/mcp_server.md)                                                                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                        | **Estensione per VSCode**<br><br>Intlayer fornisce un'estensione per VSCode per aiutarti a gestire i tuoi contenuti e le tue traduzioni, costruire i tuoi dizionari, tradurre i tuoi contenuti e altro ancora. <br><br> - [Estensione per VSCode](https://intlayer.org/doc/vs-code-extension)                                                                                                                                         |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                        | **Interoperabilità**<br><br>Consente l'interoperabilità con react-i18next, next-i18next, next-intl e react-intl. <br><br> - [Intlayer e react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer e next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer e next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                                                       |
| Test delle traduzioni mancanti (CLI/CI)                                                                                       | ✅ CLI: npx intlayer content test (audit compatibile con CI)                                                                                                                                                                                                                                                                                                                                                                          |

## Confronto di Intlayer con altre soluzioni

| Funzionalità                                     | `intlayer`                                                                                                                           | `react-i18next`                                                                                           | `react-intl` (FormatJS)                                                                                                         | `lingui`                                                          | `next-intl`                                                                                               | `next-i18next`                                                                                            | `vue-i18n`                                                        |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Traduzioni vicine ai componenti**              | ✅ Sì, contenuto co-localizzato con ogni componente                                                                                  | ❌ No                                                                                                     | ❌ No                                                                                                                           | ❌ No                                                             | ❌ No                                                                                                     | ❌ No                                                                                                     | ✅ Sì - usando `Single File Components` (SFC)                     |
| **Integrazione TypeScript**                      | ✅ Avanzata, tipi stretti generati automaticamente                                                                                   | ⚠️ Base; configurazione extra per la sicurezza                                                            | ✅ Buona, ma meno stretta                                                                                                       | ⚠️ Tipizzazioni, necessita di configurazione                      | ✅ Buona                                                                                                  | ⚠️ Base                                                                                                   | ✅ Buona (tipi disponibili; sicurezza chiavi richiede setup)      |
| **Rilevamento traduzioni mancanti**              | ✅ Evidenziazione errori TypeScript ed errori/avvisi in fase di build                                                                | ⚠️ Principalmente stringhe di fallback a runtime                                                          | ⚠️ Stringhe di fallback                                                                                                         | ⚠️ Richiede configurazione extra                                  | ⚠️ Fallback a runtime                                                                                     | ⚠️ Fallback a runtime                                                                                     | ⚠️ Fallback/avvisi a runtime (configurabile)                      |
| **Contenuto ricco (JSX/Markdown/componenti)**    | ✅ Supporto diretto                                                                                                                  | ⚠️ Limitato / solo interpolazione                                                                         | ⚠️ Sintassi ICU, non vero JSX                                                                                                   | ⚠️ Limitato                                                       | ❌ Non progettato per nodi ricchi                                                                         | ⚠️ Limitato                                                                                               | ⚠️ Limitato (componenti tramite `<i18n-t>`, Markdown via plugin)  |
| **Traduzione basata su IA**                      | ✅ Sì, supporta più fornitori di IA. Utilizzabile con le proprie chiavi API. Considera il contesto dell'app e l'ambito del contenuto | ❌ No                                                                                                     | ❌ No                                                                                                                           | ❌ No                                                             | ❌ No                                                                                                     | ❌ No                                                                                                     | ❌ No                                                             |
| **Editor Visuale**                               | ✅ Sì, editor visuale locale + CMS opzionale; può esternalizzare i contenuti del codice; integrabile                                 | ❌ No / disponibile tramite piattaforme di localizzazione esterne                                         | ❌ No / disponibile tramite piattaforme di localizzazione esterne                                                               | ❌ No / disponibile tramite piattaforme di localizzazione esterne | ❌ No / disponibile tramite piattaforme di localizzazione esterne                                         | ❌ No / disponibile tramite piattaforme di localizzazione esterne                                         | ❌ No / disponibile tramite piattaforme di localizzazione esterne |
| **Routing Localizzato**                          | ✅ Sì, supporta percorsi localizzati nativamente (funziona con Next.js e Vite)                                                       | ⚠️ Nessuno integrato, richiede plugin (es. `next-i18next`) o configurazione router personalizzata         | ❌ No, solo formattazione messaggi, il routing deve essere manuale                                                              | ⚠️ Nessuno integrato, richiede plugin o configurazione manuale    | ✅ Integrato, App Router supporta il segmento `[locale]`                                                  | ✅ Integrato                                                                                              | ✅ Integrato                                                      |
| **Generazione dinamica delle rotte**             | ✅ Sì                                                                                                                                | ⚠️ Plugin/ecosistema o setup manuale                                                                      | ❌ Non fornito                                                                                                                  | ⚠️ Plugin/manuale                                                 | ✅ Sì                                                                                                     | ✅ Sì                                                                                                     | ❌ Non fornito (Nuxt i18n lo fornisce)                            |
| **Pluralizzazione**                              | ✅ Modelli basati su enumerazione                                                                                                    | ✅ Configurabile (plugin come i18next-icu)                                                                | ✅ (ICU)                                                                                                                        | ✅ (ICU/messageformat)                                            | ✅ Buona                                                                                                  | ✅ Buona                                                                                                  | ✅ Regole di pluralizzazione integrate                            |
| **Formattazione (date, numeri, valute)**         | ✅ Formattatori ottimizzati (Intl sotto il cofano)                                                                                   | ⚠️ Tramite plugin o uso personalizzato di Intl                                                            | ✅ Formattatori ICU                                                                                                             | ✅ Helper ICU/CLI                                                 | ✅ Buona (helper Intl)                                                                                    | ✅ Buona (helper Intl)                                                                                    | ✅ Formattatori date/numeri integrati (Intl)                      |
| **Formato del contenuto**                        | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml WIP)                                                                                     | ⚠️ .json                                                                                                  | ✅ .json, .js                                                                                                                   | ⚠️ .po, .json                                                     | ✅ .json, .js, .ts                                                                                        | ⚠️ .json                                                                                                  | ✅ .json, .js                                                     |
| **Supporto ICU**                                 | ⚠️ WIP                                                                                                                               | ⚠️ Tramite plugin (i18next-icu)                                                                           | ✅ Sì                                                                                                                           | ✅ Sì                                                             | ✅ Sì                                                                                                     | ⚠️ Tramite plugin (`i18next-icu`)                                                                         | ⚠️ Tramite formattatore/compilatore personalizzato                |
| **Helper SEO (hreflang, sitemap)**               | ✅ Strumenti integrati: helper per sitemap, robots.txt, metadati                                                                     | ⚠️ Plugin della community/manuale                                                                         | ❌ Non core                                                                                                                     | ❌ Non core                                                       | ✅ Buona                                                                                                  | ✅ Buona                                                                                                  | ❌ Non core (Nuxt i18n fornisce helper)                           |
| **Ecosistema / Community**                       | ⚠️ Più piccolo ma in rapida crescita e reattivo                                                                                      | ✅ Più grande e maturo                                                                                    | ✅ Grande                                                                                                                       | ⚠️ Più piccolo                                                    | ✅ Dimensioni medie, focalizzato su Next.js                                                               | ✅ Dimensioni medie, focalizzato su Next.js                                                               | ✅ Grande nell'ecosistema Vue                                     |
| **Server-side Rendering & Server Component**     | ✅ Sì, ottimizzato per SSR / React Server Component                                                                                  | ⚠️ Supportato a livello di pagina ma occorre passare le funzioni t nell'albero dei componenti per i figli | ⚠️ Supportato a livello di pagina con setup aggiuntivo, ma occorre passare le funzioni t nell'albero dei componenti per i figli | ✅ Supportato, setup richiesto                                    | ⚠️ Supportato a livello di pagina ma occorre passare le funzioni t nell'albero dei componenti per i figli | ⚠️ Supportato a livello di pagina ma occorre passare le funzioni t nell'albero dei componenti per i figli | ✅ SSR tramite Nuxt/Vue SSR (no RSC)                              |
| **Tree-shaking (carica solo i contenuti usati)** | ✅ Sì, per componente in fase di build tramite plugin Babel/SWC                                                                      | ⚠️ Solitamente carica tutto (può essere migliorato con namespace/code-splitting)                          | ⚠️ Solitamente carica tutto                                                                                                     | ❌ Non predefinito                                                | ⚠️ Parziale                                                                                               | ⚠️ Parziale                                                                                               | ⚠️ Parziale (con code-splitting/setup manuale)                    |
| **Lazy loading**                                 | ✅ Sì, per locale / per dizionario                                                                                                   | ✅ Sì (es. backend/namespace su richiesta)                                                                | ✅ Sì (bundle locale divisi)                                                                                                    | ✅ Sì (importazioni dinamiche catalogo)                           | ✅ Sì (per rotta/per locale), richiede gestione namespace                                                 | ✅ Sì (per rotta/per locale), richiede gestione namespace                                                 | ✅ Sì (messaggi locale asincroni)                                 |
| **Pulizia contenuti non usati**                  | ✅ Sì, per dizionario in fase di build                                                                                               | ❌ No, solo tramite segmentazione manuale dei namespace                                                   | ❌ No, tutti i messaggi dichiarati vengono inclusi nel bundle                                                                   | ✅ Sì, chiavi non usate rilevate e rimosse in build               | ❌ No, può essere gestito manualmente con la gestione dei namespace                                       | ❌ No, può essere gestito manualmente con la gestione dei namespace                                       | ❌ No, possibile solo tramite lazy-loading manuale                |
| **Gestione di progetti grandi**                  | ✅ Incoraggia la modularità, adatto per design-system                                                                                | ⚠️ Richiede una buona disciplina dei file                                                                 | ⚠️ I cataloghi centrali possono diventare grandi                                                                                | ⚠️ Può diventare complesso                                        | ✅ Modulare con setup                                                                                     | ✅ Modulare con setup                                                                                     | ✅ Modulare con setup Vue Router/Nuxt i18n                        |

---

## Stelle di GitHub

Le stelle di GitHub sono un forte indicatore della popolarità di un progetto, della fiducia della comunità e della pertinenza a lungo termine. Sebbene non siano una misura diretta della qualità tecnica, riflettono quanti sviluppatori trovano il progetto utile, ne seguono i progressi e sono propensi ad adottarlo. Per stimare il valore di un progetto, le stelle aiutano a confrontare la trazione tra le alternative e forniscono approfondimenti sulla crescita dell'ecosistema.

[![Star History Chart](https://api.star-history.com/chart?repos=formatjs/formatjs%2Ci18next/react-i18next%2Ci18next/i18next%2Ci18next/next-i18next%2Clingui/js-lingui%2Camannn/next-intl%2Cintlify/vue-i18n%2Caymericzip/intlayer%2Copral/inlang&type=date&legend=top-left)](https://www.star-history.com/#formatjs/formatjs&i18next/react-i18next&i18next/i18next&i18next/next-i18next&lingui/js-lingui&amannn/next-intl&intlify/vue-i18n&opral/paraglide-js&aymericzip/intlayer)

---

## Interoperabilità

`intlayer` può anche aiutare a gestire i tuoi namespace `react-intl`, `react-i18next`, `next-intl`, `next-i18next` e `vue-i18n`.

Usando `intlayer`, puoi dichiarare i tuoi contenuti nel formato della tua libreria i18n preferita, e intlayer genererà i tuoi namespace nella posizione di tua scelta (esempio: `/messages/{{locale}}/{{namespace}}.json`).
