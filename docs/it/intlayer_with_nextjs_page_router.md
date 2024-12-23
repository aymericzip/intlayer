# Iniziare l'Internazionalizzazione (i18n) con Intlayer e Next.js utilizzando Page Router

## Che cos'è Intlayer?

**Intlayer** è una libreria innovativa e open-source per l'internazionalizzazione (i18n) progettata per semplificare il supporto multilingue nelle applicazioni web moderne. Intlayer si integra perfettamente con il più recente framework **Next.js**, inclusa la sua tradizionale **Page Router**.

Con Intlayer, puoi:

- **Gestire facilmente le traduzioni** utilizzando dizionari dichiarativi a livello di componente.
- **Localizzare dinamicamente i metadati**, le rotte e i contenuti.
- **Garantire il supporto per TypeScript** con tipi generati automaticamente, migliorando l'autocompletamento e la rilevazione degli errori.
- **Beneficiare di funzionalità avanzate**, come il rilevamento e il cambio dinamico della lingua.

> Nota: Intlayer è compatibile con Next.js 12, 13, 14 e 15. Se stai utilizzando Next.js App Router, fai riferimento alla [guida App Router](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_14.md). Per Next.js 15, segui questa [guida](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md).

---

## Guida passo passo per configurare Intlayer in un'applicazione Next.js utilizzando Page Router

### Passo 1: Installa le dipendenze

Installa i pacchetti necessari utilizzando il tuo gestore di pacchetti preferito:

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

Crea un file di configurazione per definire le lingue supportate dalla tua applicazione:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Aggiungi altre lingue qui
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Per un elenco completo delle opzioni di configurazione disponibili, fai riferimento alla [documentazione sulla configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

### Passo 3: Integra Intlayer con la configurazione di Next.js

Modifica la tua configurazione di Next.js per incorporare Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // La tua configurazione esistente di Next.js
};

export default withIntlayer(nextConfig);
```

### Passo 4: Configura il middleware per il rilevamento della lingua

Imposta un middleware per rilevare automaticamente e gestire la lingua preferita dell'utente:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Passo 5: Definisci le rotte dinamiche per la lingua

Implementa il routing dinamico per servire contenuti localizzati in base alla lingua dell'utente.

1. **Crea pagine specifiche per la lingua:**

   Rinomina il file della tua pagina principale per includere il segmento dinamico `[locale]`.

   ```bash
   mv src/pages/index.tsx src/pages/[locale]/index.tsx
   ```

2. **Aggiorna `_app.tsx` per gestire la localizzazione:**

   Modifica il tuo `_app.tsx` per includere i provider di Intlayer.

   ```tsx
   // src/pages/_app.tsx

   import { AppProps } from "next/app";
   import { IntlayerClientProvider } from "next-intlayer";
   import { IntlayerServerProvider } from "next-intlayer/server";
   import intlayerConfig from "../../intlayer.config";

   function MyApp({ Component, pageProps }: AppProps) {
     const { locale } = pageProps;

     return (
       <IntlayerClientProvider locale={locale}>
         <Component {...pageProps} />
       </IntlayerClientProvider>
     );
   }

   export default MyApp;
   ```

3. **Imposta `getStaticPaths` e `getStaticProps`:**

   Nel tuo `[locale]/index.tsx`, definisci i percorsi e le props per gestire le diverse lingue.

   ```tsx
   // src/pages/[locale]/index.tsx

   import { GetStaticPaths, GetStaticProps } from "next";
   import { useIntlayer } from "next-intlayer";
   import { Locales } from "intlayer";

   const HomePage = () => {
     return <div>{/* Il tuo contenuto qui */}</div>;
   };

   export const getStaticPaths: GetStaticPaths = async () => {
     const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH]; // Aggiungi le tue lingue qui

     const paths = locales.map((locale) => ({
       params: { locale },
     }));

     return { paths, fallback: false };
   };

   export const getStaticProps: GetStaticProps = async ({ params }) => {
     const locale = params?.locale as string;

     return {
       props: {
         locale,
       },
     };
   };

   export default HomePage;
   ```

### Passo 6: Dichiarare i tuoi contenuti

Crea e gestisci i tuoi dizionari di contenuto per memorizzare le traduzioni.

```tsx
// src/pages/[locale]/home.content.ts
import { t, type DeclarationContent } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Welcome to My Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "Get started by editing this page.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies DeclarationContent;

export default homeContent;
```

Per ulteriori informazioni sulla dichiarazione dei contenuti, fai riferimento alla [guida alla dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/get_started.md).

### Passo 7: Utilizza il contenuto nel tuo codice

Accedi ai tuoi dizionari di contenuto in tutta l'applicazione per visualizzare il contenuto tradotto.

```tsx
// src/pages/[locale]/index.tsx

import { GetStaticPaths, GetStaticProps } from "next";
import { useIntlayer } from "next-intlayer";
import { Locales } from "intlayer";
import { ComponentExample } from "@component/ComponentExample";

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <ComponentExample />
      {/* Componenti aggiuntivi */}
    </div>
  );
};

// ... Resto del codice, inclusi getStaticPaths e getStaticProps

export default HomePage;
```

```tsx
// src/components/ComponentExample.tsx

import { useIntlayer } from "next-intlayer";

export const ComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Assicurati di avere una dichiarazione di contenuto corrispondente

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> **Nota:** Quando usi traduzioni negli attributi `string` (ad es., `alt`, `title`, `href`, `aria-label`), chiama il valore della funzione come segue:

```tsx
<img src={content.image.src.value} alt={content.image.value} />
```

### (Facoltativo) Passo 8: Internazionalizza i tuoi metadati

Per internazionalizzare metadati come titoli di pagina e descrizioni, utilizza la funzione `getStaticProps` insieme alla funzione `getTranslationContent` di Intlayer.

```tsx
// src/pages/[locale]/index.tsx

import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslationContent, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // I metadati possono essere utilizzati nell'intestazione o in altri componenti secondo necessità
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Contenuti aggiuntivi */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = <T,>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const metadata = {
    title: t({
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Welcome to my website.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

export default HomePage;

// ... Resto del codice incluso getStaticPaths
```

### (Facoltativo) Passo 9: Cambia la lingua del tuo contenuto

Per consentire agli utenti di cambiare lingua dinamicamente, utilizza la funzione `setLocale` fornita dal hook `useLocale`.

```tsx
// src/components/LanguageSwitcher.tsx

import { Locales } from "intlayer";
import { useLocalePageRouter } from "next-intlayer";

const LanguageSwitcher = () => {
  const { setLocale } = useLocalePageRouter();

  return (
    <div>
      <button onClick={() => setLocale(Locales.ENGLISH)}>English</button>
      <button onClick={() => setLocale(Locales.FRENCH)}>Français</button>
      <button onClick={() => setLocale(Locales.SPANISH)}>Español</button>
      {/* Aggiungi ulteriori pulsanti per altre lingue */}
    </div>
  );
};

export default LanguageSwitcher;
```

### Configura TypeScript

Intlayer utilizza l'augmentazione dei moduli per migliorare le capacità di TypeScript, fornendo una migliore sicurezza dei tipi e autocompletamento.

1. **Assicurati che TypeScript includa i tipi generati automaticamente:**

   Aggiorna il tuo `tsconfig.json` per includere i tipi generati automaticamente.

   ```json
   // tsconfig.json

   {
     "compilerOptions": {
       // Le tue configurazioni esistenti di TypeScript
     },
     "include": [
       "src",
       "types" // Includi i tipi generati automaticamente
     ]
   }
   ```

2. **Esempio dei vantaggi di TypeScript:**

   ![Esempio di autocompletamento](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

   ![Esempio di errore di traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

### Configurazione di Git

Per mantenere pulito il tuo repository e evitare di commettere file generati, è consigliabile ignorare i file creati da Intlayer.

1. **Aggiorna `.gitignore`:**

   Aggiungi le seguenti righe al tuo file `.gitignore`:

   ```plaintext
   # Ignora i file generati da Intlayer
   .intlayer
   ```

## Risorse aggiuntive

- **Documentazione di Intlayer:** [Repository GitHub](https://github.com/aymericzip/intlayer)
- **Guida alla dichiarazione dei contenuti:** [Dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/get_started.md)
- **Documentazione sulla configurazione:** [Guida alla configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md)

Seguendo questa guida, puoi integrare efficacemente Intlayer nella tua applicazione Next.js utilizzando Page Router, abilitando un supporto robusto e scalabile per l'internazionalizzazione nei tuoi progetti web.
