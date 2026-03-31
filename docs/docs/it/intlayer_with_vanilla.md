---
createdAt: 2026-03-31
updatedAt: 2026-03-31
title: i18n Vanilla JS - Come tradurre un'app Vanilla JS nel 2026
description: Scopri come rendere multilingue il tuo sito web Vanilla JS. Segui la documentazione per internazionalizzarlo (i18n) e tradurlo.
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
history:
  - version: 8.4.10
    date: 2026-03-31
    changes: "Inizializzazione cronologia"
---

# Traduci il tuo sito web Vanilla JS usando Intlayer | Internazionalizzazione (i18n)

## Sommario

<TOC/>

## Cos'è Intlayer?

**Intlayer** è un'innovativa libreria di internazionalizzazione (i18n) open-source progettata per semplificare il supporto multilingue nelle moderne applicazioni web.

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente metadati**, rotte e contenuti.
- **Garantire il supporto TypeScript** con tipi autogenerati, migliorando l'autocompletamento e il rilevamento degli errori.
- **Beneficiare di funzionalità avanzate**, come il rilevamento e il cambio dinamico della lingua.

Questa guida dimostra come utilizzare Intlayer in un'applicazione Vanilla JavaScript **senza utilizzare un gestore di pacchetti o un bundler** (come Vite, Webpack, ecc.).

Se la tua applicazione utilizza un bundler (come Vite), ti consigliamo di seguire la [Guida Vite + Vanilla JS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+vanilla.md) invece.

Utilizzando il bundle standalone, puoi importare Intlayer direttamente nei tuoi file HTML tramite un singolo file JavaScript, rendendolo perfetto per progetti legacy o semplici siti statici.

---

## Guida passo-passo per configurare Intlayer in un'applicazione Vanilla JS

### Passaggio 1: Installazione delle dipendenze

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

### Passaggio 2: Configurazione del progetto

Crea un file di configurazione per configurare le lingue della tua applicazione:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

> Attraverso questo file di configurazione, puoi impostare URL localizzati, reindirizzamento middleware, nomi dei cookie, la posizione e l'estensione delle tue dichiarazioni di contenuto, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, fai riferimento alla [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

### Passaggio 3: Importare il bundle nel tuo HTML

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

### Passaggio 4: Bootstrap Intlayer nel tuo punto di ingresso

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

### Passaggio 5: Dichiarare il Contenuto

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { insert, t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { insert, t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
      es: "Haga clic en il logotipo de Vite para obtener più informazioni",
    }),
  },
};

module.exports = appContent;
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

### Passaggio 6: Utilizzare Intlayer nel tuo JavaScript

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

### (Opzionale) Passaggio 7: Cambiare la lingua del tuo contenuto

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

### (Opzionale) Passaggio 8: Cambiare gli attributi HTML di lingua e direzione

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

### (Opzionale) Passaggio 9: Caricamento lazy dei dizionari per lingua

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
