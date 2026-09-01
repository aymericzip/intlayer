---
createdAt: 2026-03-31
updatedAt: 2026-08-30
title: "Vanilla JS i18n - Guida completa per tradurre la tua applicazione"
description: "Niente più i18next. La guida 2026 per creare un'applicazione Vanilla JS multilingue (i18n). Traduci con agenti AI e ottimizza la dimensione del bundle, SEO e prestazioni."
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vanilla-template
applicationShowcase: https://intlayer-vanilla-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aggiornare l'uso dell'API useIntlayer di Solid all'accesso diretto alle proprietà"
  - version: 8.4.10
    date: 2026-03-31
    changes: "Inizializzazione cronologia"
author: aymericzip
---

# Traduci il tuo sito web Vanilla JS usando Intlayer | Internazionalizzazione (i18n)

<Tabs defaultTab="code">
  <Tab label="Codice" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vanilla-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vanilla-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vanilla-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Sommario

<TOC/>

## Perché Intlayer rispetto alle alternative?

Rispetto alle soluzioni principali come `i18next` o `i18n.js`, Intlayer è una soluzione dotata di ottimizzazioni integrate come:

<AccordionGroup>
<Accordion header="Copertura completa Vanilla JS">

Intlayer è ottimizzato per funzionare perfettamente con Vanilla JavaScript offrendo **gestione dei contenuti indipendente dal framework**, **supporto TypeScript** e tutte le funzionalità necessarie per scalare l'internazionalizzazione (i18n).

</Accordion>

<Accordion header="Dimensione del bundle">

Invece di caricare enormi file JSON nelle tue pagine, carica solo il contenuto necessario. Intlayer aiuta a **ridurre le dimensioni del bundle e della pagina fino al 50%**.

</Accordion>

<Accordion header="Manutenibilità">

L'ambito del contenuto dell'applicazione **facilita la manutenzione** per applicazioni su larga scala. Puoi duplicare o eliminare una singola cartella di funzionalità senza l'onere mentale di rivedere l'intera codebase dei contenuti. Inoltre, Intlayer è **completamente tipizzato (fully typed)** per garantire l'accuratezza dei tuoi contenuti.

</Accordion>

<Accordion header="Agente IA">

La co-localizzazione dei contenuti **riduce il contesto necessario** dai Large Language Models (LLM). Intlayer viene fornito anche con una suite di strumenti, come una **CLI** per verificare le traduzioni mancanti,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** e **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md)**, per rendere l'esperienza dello sviluppatore (DX) ancora più fluida per gli agenti IA.

</Accordion>

<Accordion header="Automazione">

Utilizza l'automazione per tradurre nella tua pipeline CI/CD utilizzando il LLM di tua scelta al costo del tuo provider di intelligenza artificiale. Intlayer offre anche un **compilatore** per automatizzare l'estrazione dei contenuti, nonché una [piattaforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) per aiutare a **tradurre in background**.

</Accordion>

<Accordion header="Prestazione">

La connessione di enormi file JSON ai componenti può portare a problemi di prestazioni e reattività. Intlayer ottimizza il caricamento dei contenuti in fase di compilazione.

</Accordion>

<Accordion header="Scalabilità con nessuno sviluppatore">

Più di una semplice soluzione i18n, Intlayer fornisce un **[editor visivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** self-hosted e un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** per aiutarti gestisci i tuoi contenuti multilingue in **tempo reale**, semplificando la collaborazione con traduttori, copywriter e altri membri del team. I contenuti possono essere archiviati localmente e/o in remoto.

</Accordion>
</AccordionGroup>

---

## Guida passo-passo per configurare Intlayer in un'applicazione Vanilla JS

<Steps>

<Step number={1} title="Installazione delle dipendenze">

Installa i pacchetti necessari utilizzando npm:

```bash packageManager="npm"
# Genera un bundle standalone di intlayer e vanilla-intlayer
# Questo file verrà importato nel tuo file HTML
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inizializza intlayer con il file di configurazione
npx intlayer init --no-gitignore

# Costruisci i dizionari
npx intlayer build
```

```bash packageManager="pnpm"
# Genera un bundle standalone di intlayer e vanilla-intlayer
# Questo file verrà importato nel tuo file HTML
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inizializza intlayer con il file di configurazione
pnpm intlayer init --no-gitignore

# Costruisci i dizionari
pnpm intlayer build
```

```bash packageManager="yarn"
# Genera un bundle standalone di intlayer e vanilla-intlayer
# Questo file verrà importato nel tuo file HTML
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inizializza il file di configurazione intlayer, TypeScript se impostato, variabili d'ambiente
yarn intlayer init --no-gitignore

# Costruisci i dizionari
yarn intlayer build
```

```bash packageManager="bun"
# Genera un bundle standalone di intlayer e vanilla-intlayer
# Questo file verrà importato nel tuo file HTML
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inizializza intlayer con il file di configurazione
bun x intlayer init --no-gitignore

# Costruisci i dizionari
bun x intlayer build
```

- **intlayer**
  Il pacchetto principale che fornisce strumenti di internazionalizzazione per la gestione della configurazione, traduzione, [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md), transpilazione e [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md).

- **vanilla-intlayer**
  Il pacchetto che integra Intlayer con applicazioni JavaScript / TypeScript pure. Fornisce un singleton pub/sub (`IntlayerClient`) e helper basati su callback (`useIntlayer`, `useLocale`, ecc.) in modo che qualsiasi parte della tua app possa reagire ai cambiamenti di lingua senza dipendere da un framework UI.

> L'esportazione del raggruppamento (bundling) della CLI `intlayer standalone` produce una build ottimizzata mediante il tree-shaking dei pacchetti non utilizzati, delle lingue e della logica non essenziale (come reindirizzamenti o prefissi) specifica per la tua configurazione.

</Step>

<Step number={2} title="Configurazione del progetto">

Crea un file di configurazione per configurare le lingue della tua applicazione:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Le tue altre lingue
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Attraverso questo file di configurazione, puoi impostare URL localizzati, reindirizzamento middleware, nomi dei cookie, la posizione e l'estensione delle tue dichiarazioni di contenuto, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, fai riferimento alla [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

</Step>

<Step number={3} title="Importare il bundle nel tuo HTML">

Una volta generato il bundle `intlayer.js`, puoi importarlo nel tuo file HTML:

```html fileName="index.html"
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />

    <!-- Importa il bundle -->
    <script src="./intlayer.js" defer></script>
    <!-- Importa il tuo script principale -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

Il bundle espone `Intlayer` e `VanillaIntlayer` come oggetti globali su `window`.

</Step>

<Step number={4} title="Bootstrap Intlayer nel tuo punto di ingresso">

Nel tuo `src/main.js`, chiama `installIntlayer()` **prima** che venga renderizzato qualsiasi contenuto, in modo che il singleton globale della lingua sia pronto.

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// Deve essere chiamato prima di renderizzare qualsiasi contenuto i18n.
installIntlayer();
```

Se vuoi anche usare il renderer markdown, chiama `installIntlayerMarkdown()`:

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

</Step>

<Step number={5} title="Dichiarare il Contenuto">

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Haga clic en el logotipo de Vite para obtener più informazioni",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Vanilla",
    "viteLogoLabel": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite Logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "count": {
      "nodeType": "insertion",
      "insertion": {
        "nodeType": "translation",
        "translation": {
          "en": "count is {{count}}",
          "fr": "le compte est {{count}}",
          "es": "el recuento es {{count}}"
        }
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite logo to learn more",
        "fr": "Cliquez sur le logo Vite pour en savoir plus",
        "es": "Haga clic en el logotipo de Vite para obtener más información"
      }
    }
  }
}
```

> Le tue dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione a patto che siano incluse nella directory `contentDir` (per impostazione predefinita, `./src`). E corrispondano all'estensione del file di dichiarazione del contenuto (per impostazione predefinita, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> Per maggiori dettagli, fai riferimento alla [documentazione sulla dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

</Step>

<Step number={6} title="Utilizzare Intlayer nel tuo JavaScript">

L'oggetto `window.VanillaIntlayer` fornisce helper API: `useIntlayer(key, locale?)` restituisce il contenuto tradotto per una data chiave.

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// Ottieni il contenuto iniziale per la lingua corrente.
// Concatena .onChange() per essere avvisato ogni volta che la lingua cambia.
const content = useIntlayer("app").onChange((newContent) => {
  // Esegui il re-render o patcha solo i nodi DOM interessati
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// Rendering iniziale
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> Accedi ai valori finali come stringhe avvolgendoli in `String()`, che chiama il metodo `toString()` del nodo e restituisce il testo tradotto.
>
> Quando hai bisogno del valore per un attributo HTML nativo (es. `alt`, `aria-label`), usa direttamente `.value`:
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

</Step>

<Step number={7} title="Cambiare la lingua del tuo contenuto" isOptional={true}>

Per cambiare la lingua del tuo contenuto, usa la funzione `setLocale` esposta da `useLocale`.

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Lingua");

  const render = (currentLocale) => {
    select.innerHTML = availableLocales
      .map(
        (loc) =>
          `<option value="${loc}"${loc === currentLocale ? " selected" : ""}>
            ${getLocaleName(loc)}
          </option>`
      )
      .join("");
  };

  render(locale);
  container.appendChild(select);

  select.addEventListener("change", () => setLocale(select.value));

  // Mantieni il menu a discesa sincronizzato quando la lingua cambia da altrove
  return subscribe((newLocale) => render(newLocale));
}
```

</Step>

<Step number={8} title="Cambiare gli attributi HTML di lingua e direzione" isOptional={true}>

Aggiorna gli attributi `lang` e `dir` del tag `<html>` per corrispondere alla lingua corrente per l'accessibilità e la SEO.

```javascript fileName="src/main.js"
const { getHTMLTextDir } = window.Intlayer;
const { installIntlayer, useLocale } = window.VanillaIntlayer;

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

</Step>

<Step number={9} title="Caricamento lazy dei dizionari per lingua" isOptional={true}>

Se desideri caricare i dizionari in modo lazy per lingua, puoi usare `useDictionaryDynamic`. Questo è utile se non vuoi raggruppare tutte le traduzioni nel file iniziale `intlayer.js`.

```javascript fileName="src/app.js"
const { installIntlayer, useDictionaryDynamic } = window.VanillaIntlayer;

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1").textContent = String(content.title);
});
```

> Nota: `useDictionaryDynamic` richiede che i dizionari siano disponibili come file ESM separati. Questo approccio viene in genere utilizzato se si dispone di un server web che serve i dizionari.
> </Step>

</Steps>

### Configurare TypeScript

Assicurati che la tua configurazione TypeScript includa i tipi autogenerati.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare l'**estensione ufficiale Intlayer per VS Code**.

[Installa dal Marketplace di VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione fornisce:

- **Autocompletamento** per le chiavi di traduzione.
- **Rilevamento degli errori in tempo reale** per le traduzioni mancanti.
- **Anteprime inline** del contenuto tradotto.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori dettagli su come utilizzare l'estensione, fai riferimento alla [documentazione dell'estensione Intlayer per VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Vai oltre

Per approfondire, puoi implementare l'[editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) o esternalizzare i tuoi contenuti utilizzando il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).

## Domande frequenti

<FAQ>

<Question title="Posso usare Intlayer senza un bundler o un framework?">

Sì. È ciò che copre questa guida. Importi il bundle `vanilla-intlayer` direttamente nel tuo HTML come mostra il passo 3, lo inizializzi nel tuo entry point e leggi il tuo contenuto con `useIntlayer`. Non è richiesto né Vite, né webpack, né alcuna pipeline di build.

</Question>

<Question title="Quanto aggiunge l'i18n al peso della mia pagina?">

Molto meno di un catalogo a runtime, perché una pagina non scarica mai una lingua che non renderizza. Il contenuto è risolto da dizionari compilati in anticipo, e il caricamento lazy per locale tiene le altre lingue fuori dal payload iniziale finché il visitatore non cambia. Misurato rispetto alle alternative abituali, Intlayer riduce la dimensione del bundle e delle pagine fino al 50%. Vedi [ottimizzazione del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md), [dizionari dinamici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/index.md) e il [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/benchmark/index.md).

</Question>

<Question title="Posso migrare da `i18next` senza riscrivere i miei script?">

In gran parte. Segui la [guida alla migrazione da i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/migration_from_i18next_to_intlayer.md) per spostare il contenuto. Puoi anche migrare gradualmente: il [plugin di sincronizzazione JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md) mantiene i tuoi cataloghi JSON esistenti come fonte di verità e genera dizionari Intlayer da essi, così entrambi i livelli restano sincronizzati mentre sposti gli script uno alla volta.

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

<Question title="Quali sono le diverse soluzioni disponibili per internazionalizzare un sito JavaScript puro?">

- **Un oggetto dizionario scritto a mano**, di solito un file JSON per lingua caricato con `fetch`: nessuna dipendenza, ma nessuna tipizzazione, nessuna regola di plurale, e nulla che ti dica che manca una traduzione.
- **`i18next`** da una CDN: maturo e indipendente dal framework, con un ecosistema di plugin, ma aggiunge un runtime e il proprio caricamento di cataloghi.
- **`Intlayer`**: contenuto dichiarato con regole di plurale e genere, rilevamento della locale, supporto da destra a sinistra e caricamento lazy per locale, più una CLI che riempie le traduzioni mancanti con l'AI e un editor visivo per i non sviluppatori.

Vedi [perché Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/interest_of_intlayer.md).

</Question>

<Question title="Come leggo una traduzione e la metto nel DOM?">

Chiama `useIntlayer` con la tua chiave di dizionario e scrivi tu stesso il valore nel nodo, come mostra il passo 6. Poiché non c'è alcun framework, nulla viene ri-renderizzato da solo: aggiorni i nodi quando la locale cambia, cosa che copre il passo 7.

</Question>

<Question title="Come viene rilevata la lingua del visitatore?">

Dalle fonti elencate in `routing.storage`, tipicamente prima un cookie, poi l'header `Accept-Language`, ricadendo sulla tua locale predefinita. Una lingua scelta esplicitamente dal visitatore viene persistita, quindi sopravvive alla visita successiva. Vedi il [riferimento di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

</Question>

<Question title="Come supporto le lingue da destra a sinistra come l'arabo o l'ebraico?">

Lo copre il passo 8. `getHTMLTextDir` ritorna `ltr`, `rtl` o `auto` per una locale, così imposti `lang` e `dir` sull'elemento `html` a partire dalla locale attiva e lasci che le proprietà logiche del tuo CSS facciano il resto.

</Question>

<Question title="I visitatori scaricano ogni lingua?">

Non se non vuoi che lo facciano. Il passo 9 copre il caricamento lazy dei dizionari per locale, così la pagina carica una lingua e ne recupera un'altra solo quando il visitatore cambia. Vedi [dizionari dinamici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/index.md).

</Question>

<Question title="Come traduco l'app automaticamente con l'AI?">

Esegui `npx intlayer fill`. Riempie le traduzioni mancanti con l'LLM di tua scelta, usando il tuo provider e la tua API key, e `--git-diff` limita l'esecuzione ai contenuti modificati nel branch. Vedi il [comando fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/fill.md) e l'[integrazione CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/CI_CD.md).

</Question>

<Question title="Intlayer supporta plurali, genere e rich text?">

Sì: [forme plurali](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/plurial.md), [contenuto basato sul genere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/gender.md), condizioni, [inserimenti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/markdown.md) e [formattatori](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/formatters.md) per numeri, date e valute.

</Question>

<Question title="Come possono i traduttori modificare il contenuto senza toccare il codice?">

Attraverso l'[editor visivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md), che gira sulla tua infrastruttura e permette a chiunque di modificare il testo sul posto nell'app in esecuzione, o il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md), che esternalizza il contenuto così può cambiare senza un deployment.

</Question>

<Question title="Intlayer è gratuito e open source?">

Sì, sotto licenza Apache 2.0, uso commerciale incluso. Il CMS ospitato è un servizio a pagamento opzionale che può anche essere [auto-ospitato](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/self_hosting.md).

</Question>

</FAQ>
