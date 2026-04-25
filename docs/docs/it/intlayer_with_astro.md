---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Astro i18n - Come tradurre un'applicazione Astro nel 2026
description: Scopri come aggiungere l'internazionalizzazione (i18n) al tuo sito Astro con Intlayer. Segui questa guida per rendere il tuo sito multilingue.
keywords:
  - internazionalizzazione
  - documentazione
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: "Aggiunto comando init"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Aggiornamento dell'integrazione, configurazione e utilizzo di Astro"
---

# Tradurre il tuo sito Astro con Intlayer | Internazionalizzazione (i18n)

## Cos'è Intlayer?

**Intlayer** è una libreria di internazionalizzazione (i18n) innovativa e open-source progettata per semplificare il supporto multilingue nelle moderne applicazioni web.

Con Intlayer puoi:

- **Gestire le traduzioni facilmente**: Utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare metadati, percorsi e contenuti dinamicamente**.
- **Garantire il supporto TypeScript**: Con tipi autogenerati per migliorare l'autocompletamento e il rilevamento degli errori.
- **Beneficiare di funzioni avanzate**: Come il rilevamento dinamico della lingua e il cambio di lingua.

---

## Guida passo dopo passo per configurare Intlayer in Astro

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Come internazionalizzare la tua applicazione con Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Controlla il [template dell'applicazione](https://github.com/aymericzip/intlayer-astro-template) su GitHub.

### Passaggio 1: Installare le dipendenze

Installa i pacchetti necessari utilizzando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install intlayer astro-intlayer
# Opzionale: Se aggiungi il supporto per le islands di React
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# Opzionale: Se aggiungi il supporto per le islands di React
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# Opzionale: Se aggiungi il supporto per le islands di React
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  Il pacchetto core che fornisce strumenti i18n per la gestione della configurazione, le traduzioni, la [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md), la transpilazione e i [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md).

- **astro-intlayer**
  Include il plugin di integrazione Astro per collegare Intlayer con il [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production), oltre al middleware per rilevare la lingua preferita dell'utente, gestire i cookie e gestire i reindirizzamenti degli URL.

### Passaggio 2: Configura il tuo progetto

Crea un file di configurazione per definire le lingue della tua applicazione:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.ITALIAN,
      // Le tue altre lingue
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Attraverso questo file di configurazione, puoi configurare URL localizzati, reindirizzamenti del middleware, nomi dei cookie, posizione ed estensioni delle dichiarazioni di contenuto, disabilitare i log di Intlayer nella console e altro ancora. Per un elenco completo dei parametri disponibili, consulta la [documentazione di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

### Passaggio 3: Integra Intlayer nella tua configurazione Astro

Aggiungi il plugin `intlayer` alla tua configurazione Astro.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Il plugin di integrazione `intlayer()` viene utilizzato per integrare Intlayer con Astro. Garantisce la generazione dei file di dichiarazione del contenuto e li monitora in modalità sviluppo. Definisce le variabili d'ambiente di Intlayer all'interno dell'applicazione Astro e fornisce alias per ottimizzare le prestazioni.

### Passaggio 4: Dichiara i tuoi contenuti

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      it: "Ciao mondo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Le dichiarazioni di contenuto possono essere definite in qualsiasi punto della tua applicazione, purché siano incluse nel `contentDir` (per impostazione predefinita `./src`) e corrispondano all'estensione dei file di dichiarazione del contenuto (per impostazione predefinita `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Per ulteriori informazioni, consulta la [documentazione sulla dichiarazione del contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md).

### Passaggio 5: Utilizzare il contenuto in Astro

Puoi consumare i dizionari direttamente nei tuoi file `.astro` utilizzando gli helper core esportati da `intlayer`.

```astro fileName="src/pages/index.astro"
---
import { getIntlayer } from "intlayer";
import appContent from "../app.content";

const { title } = getIntlayer('app');
---

<html lang="it">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
  </body>
</html>
```

### Passaggio 6: Routing localizzato

Crea segmenti di percorso dinamici per servire le pagine localizzate (ad esempio, `src/pages/[locale]/index.astro`):

```astro fileName="src/pages/[locale]/index.astro"
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

L'integrazione Astro aggiunge un middleware Vite che aiuta con il routing sensibile alla lingua e le definizioni d'ambiente durante lo sviluppo. Puoi anche creare collegamenti tra lingue diverse utilizzando la tua logica o strumenti `intlayer` come `getLocalizedUrl`.

### Passaggio 7: Continua a utilizzare i tuoi framework preferiti

Continua a costruire la tua applicazione utilizzando il framework che preferisci.

- Intlayer + React: [Intlayer con React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+react.md)
- Intlayer + Vue: [Intlayer con Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Intlayer con Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Intlayer con Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Intlayer con Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+preact.md)

### Configurazione TypeScript

Intlayer utilizza l'aumento dei moduli (module augmentation) per sfruttare TypeScript, rendendo la tua base di codice più robusta.

![Autocompletamento](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Errore di traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Assicurati che la tua configurazione TypeScript includa i tipi autogenerati.

```json5 fileName="tsconfig.json"
{
  // ... la tua configurazione TypeScript esistente
  "include": [
    // ... la tua configurazione TypeScript esistente
    ".intlayer/**/*.ts", // Includi i tipi autogenerati
  ],
}
```

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Ciò evita di salvarli nel tuo repository Git.

Per farlo, aggiungi le seguenti istruzioni al tuo file `.gitignore`:

```bash
# Ignora i file generati da Intlayer
.intlayer
```

### Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare l'**estensione ufficiale Intlayer per VS Code**.

[Installa dal VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione fornisce:

- **Autocompletamento** per le chiavi di traduzione.
- **Rilevamento degli errori in tempo reale** per le traduzioni mancanti.
- **Anteprima inline** del contenuto tradotto.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori informazioni sull'utilizzo dell'estensione, consulta la [documentazione dell'estensione VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Approfondisci

Se vuoi saperne di più, puoi anche implementare il [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) o utilizzare il [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) per esternalizzare i tuoi contenuti.
