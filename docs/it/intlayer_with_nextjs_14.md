# Iniziare a internazionalizzare (i18n) con Intlayer e Next.js 14 con App Router

## Cos'è Intlayer?

**Intlayer** è una libreria innovativa e open-source per l'internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle moderne applicazioni web. Intlayer si integra perfettamente con il più recente framework **Next.js 14**, incluso il suo potente **App Router**. È ottimizzato per lavorare con i **Server Components** per un rendering efficiente ed è completamente compatibile con [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) (da Next.js >= 15).

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente metadati**, percorsi e contenuti.
- **Accedere alle traduzioni sia nei componenti lato client che lato server**.
- **Assicurare il supporto TypeScript** con tipi generati automaticamente, migliorando il completamento automatico e la rilevazione degli errori.
- **Beneficiare di funzionalità avanzate**, come la rilevazione e il cambio dinamico delle lingue.

> Nota: Intlayer è compatibile con Next.js 12, 13, 14 e 15. Se stai utilizzando Next.js Page Router, puoi fare riferimento a questa [guida](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_page_router.md). Per Next.js 15 con o senza turbopack, fai riferimento a questa [guida](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md).

---

## Guida passo-passo per configurare Intlayer in un'applicazione Next.js

### Passo 1: Installare le dipendenze

Installa i pacchetti necessari utilizzando npm:

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### Passo 2: Configura il tuo progetto

Crea un file di configurazione per configurare le lingue della tua applicazione:

```typescript
// intlayer.config.ts

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

Per vedere tutti i parametri disponibili, fai riferimento alla [documentazione di configurazione qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

### Passo 3: Integra Intlayer nella tua configurazione Next.js

Configura il tuo setup Next.js per utilizzare Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Passo 4: Configura il Middleware per la Rilevazione della Lingua

Imposta il middleware per rilevare la lingua preferita dall'utente:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Passo 5: Definisci le rotte dinamiche per la lingua

Implementa il routing dinamico per i contenuti localizzati:

Cambia `src/app/page.ts` in `src/app/[locale]/page.ts`

Quindi, implementa la funzione generateStaticParams nella tua Layout dell'applicazione.

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // Rigo da inserire

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => children;

export default RootLayout;
```

Poi aggiungi un nuovo layout nella directory `[locale]`:

```tsx
// src/app/[locale]/layout.tsx

import { type Next14LayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

### Passo 6: Dichiarare il tuo contenuto

Crea e gestisci i tuoi dizionari di contenuti:

```tsx
// src/app/[locale]/page.content.ts
import { t, type DeclarationContent } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies DeclarationContent;

export default pageContent;
```

[Vedi come dichiarare i tuoi file di dichiarazione Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/get_started.md).

### Passo 7: Utilizza il contenuto nel tuo codice

Accedi ai tuoi dizionari di contenuto in tutta l'applicazione:

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
import { type Next14PageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>
      {/**
       *   IntlayerServerProvider viene utilizzato per fornire la lingua ai figli del server
       *   Non funziona se impostato nel layout
       */}
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider viene utilizzato per fornire la lingua ai figli del client
       *   Può essere impostato in qualsiasi componente genitore, incluso il layout
       */}
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </>
  );
};

export default Page;
```

```tsx
// src/components/ClientComponentExample.tsx

"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Crea dichiarazione di contenuto correlata

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Crea dichiarazione di contenuto correlata

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Nota: Se desideri utilizzare i tuoi contenuti in un attributo `string`, come `alt`, `title`, `href`, `aria-label`, ecc., devi chiamare il valore della funzione, come ad esempio:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

Per un utilizzo più dettagliato di intlayer nei componenti Client o Server, vedi il [nextJS esempio qui](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx).

### (Opzionale) Passo 8: Internazionalizzazione dei tuoi metadati

Nel caso tu voglia internazionalizzare i tuoi metadati, come il titolo della tua pagina, puoi usare la funzione `generateMetadata` fornita da NextJS. All'interno della funzione usa la funzione `getTranslationContent` per tradurre i tuoi metadati.

````typescript
// src/app/[locale]/layout.tsx o src/app/[locale]/page.tsx

import {
  type IConfigLocales,
  getTranslationContent,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const url = `/`;

  /**
   * Genera un oggetto contenente tutti gli url per ogni lingua.
   *
   * Esempio:
   * ```ts
   *  getLocalizedUrl('/about');
   *
   *  // Restituisce
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls(url);

  /**
   * Ottiene l'URL localizzato per la lingua corrente
   *
   * Esempio:
   * ```ts
   * const localizedUrl = getLocalizedUrl('/about', locale);
   *
   * Restituisce:
   * '/fr/about' per il locale francese
   * ```
   */
  const localizedUrl = getLocalizedUrl(url, locale);

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
    alternates: {
      canonical: url,
      languages: multilingualUrls,
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Resto del codice
````

> Scopri di più sull'ottimizzazione dei metadati [sulla documentazione ufficiale di Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Opzionale) Passo 9: Internazionalizzazione della tua sitemap

Per internazionalizzare la tua sitemap, puoi utilizzare la funzione `getMultilingualUrls` fornita da Intlayer. Questa funzione ti consente di generare URL multilingue per la tua sitemap.

```tsx
// src/app/sitemap.ts

import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const url = `https://example.com`;

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: getMultilingualUrls(url),
    },
  },
];

export default sitemap;
```

> Scopri di più sull'ottimizzazione della sitemap [sulla documentazione ufficiale di Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap).

### (Opzionale) Passo 10: Cambiare la lingua del tuo contenuto

Per cambiare la lingua del tuo contenuto, puoi usare la funzione `setLocale` fornita dal hook `useLocale`. Questa funzione ti consente di impostare la lingua dell'applicazione e aggiornare il contenuto di conseguenza.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>Cambia Lingua</button>
  );
};
```

### Configurare TypeScript

Intlayer usa l'augmented module per ottenere i benefici di TypeScript e rendere la tua base di codice più robusta.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assicurati che la tua configurazione TypeScript includa i tipi generati automaticamente.

```json5
// tsconfig.json

{
  // la tua configurazione personalizzata
  include: [
    "src",
    "types", // <- Includi i tipi generati automaticamente
  ],
}
```

### Configurazione di Git

Si consiglia di ignorare i file generati da Intlayer. Questo ti permette di evitare di commetterli nel tuo repository Git.

Per fare ciò, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```gitignore
# Ignora i file generati da Intlayer
.intlayer
```
