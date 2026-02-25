---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - Trasforma un'app Next.js esistente in un'app multilingue (guida i18n 2026)
description: Scopri come rendere multilingue la tua applicazione Next.js esistente utilizzando Intlayer Compiler. Segui la documentazione per internazionalizzarla (i18n) e tradurla con l'IA.
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Compilatore
  - IA
slugs:
  - doc
  - ambiente
  - nextjs
  - compilatore
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Rilascio iniziale
---

# Come rendere multilingue (i18n) un'applicazione Next.js esistente (guida i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="La migliore soluzione i18n per Next.js? Scopri Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Codice" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Come internazionalizzare la tua applicazione con Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Vedi il [Template dell'Applicazione](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) su GitHub.

## Sommario

<TOC/>

## Perché è difficile internazionalizzare un'applicazione esistente?

Se hai mai provato ad aggiungere più lingue a un'app nata per una sola, conosci la fatica. Non è solo "difficile", è noioso. Devi passare al setaccio ogni file, scovare ogni stringa di testo e spostarla in file dizionario separati.

Poi arriva la parte rischiosa: sostituire tutto quel testo con hook di codice senza rompere layout o logica. È il tipo di lavoro che blocca lo sviluppo di nuove funzionalità per settimane e sembra un refactoring infinito.

## Cos'è l'Intlayer Compiler?

L'**Intlayer Compiler** è stato creato per saltare questo lavoro manuale. Invece di costringerti a estrarre le stringhe a mano, il compilatore lo fa per te. Scansiona il codice, trova il testo e usa l'IA per generare i dizionari dietro le quinte.
Quindi, modifica il codice durante la build per iniettare gli hook i18n necessari. In sostanza, continui a scrivere l'app come se fosse monolingua, e il compilatore gestisce automaticamente la trasformazione multilingue.

> Doc Compilatore: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/compiler.md)

### Limitazioni

Dato che il compilatore esegue l'analisi e la trasformazione del codice (inserendo hook e generando dizionari) a **tempo di compilazione**, può **rallentare il processo di build** dell'applicazione.

Per mitigare l'impatto durante lo sviluppo, puoi configurare il compilatore in modalità [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md) o disabilitarlo quando non necessario.

---

## Guida passo dopo passo per configurare Intlayer in un'applicazione Next.js

### Passo 1: Installare le dipendenze

Installa i pacchetti necessari utilizzando npm:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
bunx intlayer init
```

- **intlayer**

  Il pacchetto core che fornisce strumenti di internazionalizzazione per gestione della configurazione, traduzione, [dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md), transpilazione e [comandi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md).

- **next-intlayer**

  Il pacchetto che integra Intlayer con Next.js. Fornisce context provider e hook per l'internazionalizzazione di Next.js. Include inoltre il plugin Next.js per integra web Intlayer con [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), oltre a un proxy per rilevare la lingua preferita dell'utente, gestire i cookie e i reindirizzamenti URL.

### Passo 2: Configurare il progetto

Crea un file di configurazione per definire le lingue dell'applicazione:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.ITALIAN],
    defaultLocale: Locales.ITALIAN,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Può essere 'build-only' per limitare l'impatto in modalità dev
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Nessun prefisso, il default è "comp-"
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Questa applicazione è un'app di mappe",
  },
};

export default config;
```

> **Nota**: Assicurati di avere `OPEN_AI_API_KEY` impostata nelle variabili d'ambiente.

> Tramite questo file, puoi configurare URL localizzati, reindirizzamenti proxy, nomi dei cookie, posizione ed estensione delle dichiarazioni di contenuto, disabilitare i log di Intlayer e altro. Per l'elenco completo dei parametri, consulta la [documentazione della configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

### Passo 3: Integrare Intlayer nella configurazione Next.js

Configura il setup Next.js per usare Intlayer:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* opzioni di configurazione qui */
};

export default withIntlayer(nextConfig);
```

> Il plugin `withIntlayer()` integra Intlayer con Next.js. Assicura la creazione dei file di dichiarazione dei contenuti e li monitora in modalità sviluppo. Definisce le variabili d'ambiente Intlayer negli ambienti [Webpack](https://webpack.js.org/) o [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Inoltre, fornisce alias per ottimizzare le prestazioni e garantisce compatibilità con i Server Components.

### Passo 4: Configurare Babel

L'Intlayer Compiler richiede Babel per estrarre e ottimizzare i contenuti. Aggiorna il file `babel.config.js` (o `babel.config.json`) per includere i plugin Intlayer:

```typescript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

### Passo 5: Rilevare la lingua nelle pagine

Rimuovi tutto dal `RootLayout` e sostituiscilo con questo codice:

```tsx fileName="src/app/layout.tsx"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

### Passo 6: Compilare i componenti

Con il compilatore abilitato, **non devi più** dichiarare manualmente i dizionari (come i file `.content.ts`).

Puoi scrivere i contenuti direttamente nel codice come stringhe. Intlayer analizzerà il codice, genererà le traduzioni usando l'IA e sostituirà le stringhe con i contenuti localizzati durante la compilazione.

Scrivi i componenti con stringhe "hardcoded" nella lingua predefinita. Il compilatore farà il resto.

Esempio di come apparirà la pagina:

<Tabs>
  <Tab value="Code">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>Inizia a modificare</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
  <Tab value="Output">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        getStartedByEditing: "Get started by editing",
      },
      fr: {
        getStartedByEditing: "Commencez par éditer",
      },
      it: {
        getStartedByEditing: "Inizia a modificare",
      },
    }
  }
}
```

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
</Tabs>

- **`IntlayerClientProvider`** serve per fornire la lingua ai componenti client.
- **`IntlayerServerProvider`** serve per fornire la lingua ai componenti server figli.

### (Opzionale) Passo 7: Completare le traduzioni mancanti

Intlayer offre uno strumento CLI per completare le traduzioni mancanti. Usa il comando `intlayer` per testare e riempire le lacune nel codice.

```bash
npx intlayer test         # Verifica traduzioni mancanti
```

```bash
npx intlayer fill         # Completa traduzioni mancanti
```

> Per maggiori dettagli, fare riferimento alla [documentazione CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/ci.md)

### (Opzionale) Passo 8: Configurare il Proxy per il rilevamento lingua

Imposta un proxy per rilevare la lingua preferita dall'utente:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` rileva la lingua dell'utente e reindirizza all'URL corretto basandosi sulla [configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md). Consente anche di salvare la preferenza in un cookie.

### (Opzionale) Passo 8: Cambiare la lingua del contenuto

Per cambiare lingua in Next.js, si consiglia di usare il componente `Link` per reindirizzare alla pagina localizzata. `Link` permette il prefetching, evitando il ricaricamento completo della pagina.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Lingua - es. IT */}
              {localeItem}
            </span>
            <span>
              {/* Lingua nel proprio Locale - es. Italiano */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Lingua nel locale corrente - es. Francés se il locale è Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lingua in inglese - es. Italian */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> In alternativa, puoi usare `setLocale` dall'hook `useLocale`, ma non permetterà il prefetching. Consulta la [documentazione di `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/useLocale.md).

### (Opzionale) Passo 10: Ottimizzare il bundle

Con `next-intlayer`, i dizionari sono inclusi di default in ogni pagina. Per ottimizzare il bundle, Intlayer offre un plugin SWC opzionale che sostituisce le chiamate `useIntlayer` con macro. Così i dizionari appaiono solo dove servono davvero.

Installa `@intlayer/swc`. `next-intlayer` lo rileverà e userà automaticamente:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> Nota: Solo per Next.js 13+.

> Nota: Non installato di default perché i plugin SWC in Next.js sono ancora sperimentali.

> Nota: Se usi `importMode: 'dynamic'` o `'fetch'`, dovrai avvolgere le chiamate `useIntlayer` in un `Suspense`. Non potrai usarlo al livello superiore di Pagina / Layout.

### Configurare TypeScript

Intlayer usa la module augmentation per potenziare TypeScript.

![Autocompletamento](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Errore traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Assicurati che `tsconfig.json` includa i tipi generati.

```json5 fileName="tsconfig.json"
{
  // ... Config TS esistenti
  "include": [
    // ... Config TS esistenti
    ".intlayer/**/*.ts", // Includi i tipi autogenerati
  ],
}
```

### Configurazione Git

Ignora i file generati da Intlayer per evitare di includerli nel repository.

Nel file `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

### Estensione VS Code

Per una migliore esperienza, installa l'**Estensione ufficiale Intlayer per VS Code**.

[Installa dal Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Caratteristiche:

- **Autocompletamento** chiavi.
- **Rilevamento errori** in tempo reale.
- **Anteprime inline**.
- **Azioni rapide** per creare/aggiornare traduzioni.

Consulta la [documentazione dell'estensione](https://intlayer.org/doc/vs-code-extension) per i dettagli.

### Vai oltre

Puoi implementare l' [editor visuale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) o esternalizzare i contenuti col [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md).
