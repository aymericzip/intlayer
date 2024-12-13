# Iniziare l'internazionalizzazione (i18n) con Intlayer e Next.js 15 App Router

## Che cos'è Intlayer?

**Intlayer** è una libreria innovativa e open-source di internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle moderne applicazioni web. Intlayer si integra senza soluzione di continuità con l'ultimo framework **Next.js 15**, incluso il suo potente **App Router**. È ottimizzato per lavorare con **Server Components** per un rendering efficiente ed è completamente compatibile con [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente i metadati**, le rotte e il contenuto.
- **Accedere alle traduzioni sia nei componenti lato client che lato server**.
- **Garantire il supporto TypeScript** con tipi generati automaticamente, migliorando l'autocompletamento e la rilevazione degli errori.
- **Beneficiare di funzionalità avanzate**, come il rilevamento e il cambio dinamico della lingua.

> Nota: Intlayer è compatibile con Next.js 12, 13, 14 e 15. Se stai utilizzando Next.js Page Router, puoi fare riferimento a questa [guida](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_page_router.md). Per Next.js 12, 13, 14 con App Router, fai riferimento a questa [guida](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_14.md).

---

## Guida Passo-Passo per Configurare Intlayer in un'Applicazione Next.js

### Passo 1: Installa le Dipendenze

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

### Passo 2: Configura il Tuo Progetto

Crea un file di configurazione per configurare le lingue della tua applicazione:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ITALIAN, // Modificato il nome della lingua per includere Italiano
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ITALIAN, // Modificato il valore predefinito
  },
};

export default config;
```

Per visualizzare tutti i parametri disponibili, fare riferimento alla [documentazione di configurazione qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

### Passo 3: Integra Intlayer nella Tua Configurazione Next.js

Configura il tuo setup Next.js per usare Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Passo 4: Configura il Middleware per il Rilevamento della Lingua

Imposta il middleware per rilevare la lingua preferita dall'utente:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Passo 5: Definisci Rotte Localizzate Dinamiche

Implementa il routing dinamico per i contenuti localizzati:

Cambia `src/app/page.ts` in `src/app/[locale]/page.ts`

Poi, implementa la funzione generateStaticParams nel layout della tua applicazione.

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // Linea da inserire

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => children;

export default RootLayout;
```

Poi aggiungi un nuovo layout nella tua directory `[locale]`:

```tsx
// src/app/[locale]/layout.tsx

import { type NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

### Passo 6: Dichiara il Tuo Contenuto

Crea e gestisci i tuoi dizionari di contenuto:

```tsx
// src/app/[locale]/page.content.ts
import { t, type DeclarationContent } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        it: "Inizia modificando", // Tradotto in Italiano
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies DeclarationContent;

export default pageContent;
```

[Guarda come dichiarare i tuoi file di dichiarazione Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/get_started.md).

### Passo 7: Utilizza il Contenuto nel Tuo Codice

Accedi ai tuoi dizionari di contenuto in tutta l'applicazione:

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const { title, content } = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <>
      {/**
       *   IntlayerServerProvider è usato per fornire la lingua ai figli del server
       *   Non funziona se impostato nel layout
       */}
      <IntlayerServerProvider locale={locale}>
        <PageContent />
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider è usato per fornire la lingua ai figli del client
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
  const content = useIntlayer("client-component-example"); // Crea la dichiarazione di contenuto correlata

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
  const content = useIntlayer("server-component-example"); // Crea la dichiarazione di contenuto correlata

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Nota: Se desideri utilizzare il tuo contenuto in un attributo `string` come `alt`, `title`, `href`, `aria-label`, ecc., devi chiamare il valore della funzione, come:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

Per un utilizzo più dettagliato di intlayer nei componenti Client o Server, vedi il [progetto NextJS qui](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx).

### (Opzionale) Passo 8: Internazionalizzazione dei tuoi metadati

Nel caso in cui tu voglia internazionalizzare i tuoi metadati, come il titolo della tua pagina, puoi utilizzare la funzione `generateMetadata` fornita da NextJS. All'interno della funzione usa la funzione `getTranslationContent` per tradurre i tuoi metadati.

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
   * Genera un oggetto contenente tutti gli url per ciascuna lingua.
   *
   * Esempio:
   * ```ts
   *  getLocalizedUrl('/about');
   *
   *  // Restituisce
   *  // {
   *  //   it: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls(url);

  /**
   * Ottieni l'URL localizzato per la lingua corrente
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
      it: "Il mio titolo",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      it: "La mia descrizione",
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

> Scopri di più sull'ottimizzazione dei metadati [nella documentazione ufficiale di Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

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

> Scopri di più sull'ottimizzazione della sitemap [nella documentazione ufficiale di Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap).

### (Opzionale) Passo 10: Cambia la lingua del tuo contenuto

Per cambiare la lingua del tuo contenuto, puoi utilizzare la funzione `setLocale` fornita dal hook `useLocale`. Questa funzione ti consente di impostare la lingua dell'applicazione e aggiornare il contenuto di conseguenza.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ITALIAN)}>Cambia Lingua</button> // Modificato per Italiano
  );
};
```

### Configura TypeScript

Intlayer utilizza l'augmented module per ottenere i vantaggi di TypeScript e rendere il tuo codice più robusto.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assicurati che la tua configurazione TypeScript includa i tipi generati automaticamente.

```json5
// tsconfig.json

{
  // tua configurazione personalizzata
  include: [
    "src",
    "types", // <- Includi i tipi generati automaticamente
  ],
}
```

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Questo ti permette di evitare di commetterli nel tuo repository Git.

Per farlo, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```gitignore
# Ignora i file generati da Intlayer
.intlayer
```
