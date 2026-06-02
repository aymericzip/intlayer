---
createdAt: 2026-03-31
updatedAt: 2026-05-31
title: i18n Vanilla JS - Guida completa per tradurre Vanilla JS
description: La migliore soluzione per dimensione del bundle, SEO, prestazioni & manutenibilità. Rendi il tuo Vanilla JS sito web multilingue nel 2026, traduzione LLM, Agent Skills & MCP.
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

La co-localizzazione dei contenuti **riduce il contesto necessario** dai Large Language Models (LLM). Intlayer viene fornito anche con una suite di strumenti, come una **CLI** per verificare le traduzioni mancanti,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** e **[capacità dell'agente](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, per rendere l'esperienza dello sviluppatore (DX) ancora più fluida per gli agenti IA.

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

> Le tue dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione a patto che siano incluse nella directory `contentDir` (per impostazione predefinita, `./src`). E corrispondano all'estensione del file di dichiarazione del contenuto (per impostazione predefinita, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).
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
