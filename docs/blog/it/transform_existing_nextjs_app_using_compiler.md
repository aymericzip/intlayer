---
createdAt: 2026-01-10
updatedAt: 2026-09-06
priority: 8
title: "Come rendere multilingue (i18n) un'applicazione Next.js esistente a posteriori (Guida i18n 2026)"
description: "La guida 2026 per rendere multilingue (i18n) un'app Next.js esistente senza complesse refactoring. Scopri l'estrazione automatica, traduzione AI e routing con Intlayer."
keywords:
  - Next.js i18n
  - Internazionalizzazione
  - Tradurre app Next.js esistente
  - Next.js 16
  - Intlayer
  - Multilingue
  - React i18n
  - Compilatore
  - Traduzione AI
  - SEO
slugs:
  - blog
  - transform-existing-nextjs-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "Update to Next.js >= 9.4.0 architecture"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Initial release"
author: aymericzip
---

# Come rendere multilingue (i18n) un'applicazione Next.js esistente a posteriori (Guida i18n 2026)

Aggiungere l'internazionalizzazione (i18n) a un progetto Next.js fin dal primo giorno è relativamente semplice. Ma cosa succede quando hai già un'applicazione Next.js matura e in produzione in una sola lingua e devi renderla multilingue **a posteriori**?

Con librerie tradizionali come `next-intl` o `next-i18next`, il processo è spesso estenuante:

- Cercare manualmente stringhe hardcoded in centinaia di file JSX/TSX.
- Creare file JSON nidificati e inventare chiavi di traduzione arbitrarie (`pages.dashboard.header.title`, ecc.).
- Sostituire il testo con chiamate a hook (`t('...')`).
- Ristrutturare l'intera cartella `app/` in `app/[locale]/...`, rompendo rotte esistenti e indicizzazione sui motori di ricerca.

Nel 2026 non devi riscrivere il tuo codice. Con **Intlayer**, puoi integrare l'i18n in un'applicazione Next.js esistente in pochi minuti grazie all'estrazione automatica, alla traduzione con IA e a un routing flessibile.

> Cerchi la guida tecnica completa passo-passo per Next.js 16 App Router? Consulta la nostra documentazione: [Tradurre Next.js 16 con Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_16.md).

## Indice

<TOC/>

## Il dilemma del retrofit: Perché internazionalizzare un'app esistente è difficile

Tre ostacoli principali affrontano gli sviluppatori:

1. **Interruzione della codebase**: Estrarre manualmente testi in dizionari JSON impone modifiche a quasi tutti i componenti.
2. **Vincoli di routing**: Le librerie tradizionali forzano lo spostamento di layout e pagine in un segmento `[locale]`.
3. **Lavoro noioso di traduzione**: Tradurre dizionari in decine di lingue richiede infiniti copia-incolla.

Intlayer risolve tutto con **estrazione assistita da compilatore**, **dizionari dichiarativi** e **routing non invasivo**.

## Estrazione automatica dei contenuti (senza ricerca manuale)

### Opzione A: Estrattore da CLI (`npx intlayer extract`)

Esegui il comando di estrazione sul tuo progetto:

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm dlx intlayer extract
```

```bash packageManager="yarn"
yarn dlx intlayer extract
```

```bash packageManager="bun"
bunx intlayer extract
```

Questo comando estrae automaticamente il testo e crea file dichiarativi (`.content.ts`) accanto ai tuoi componenti.

### Opzione B: Compilatore Intlayer (Estrazione al build)

Continua a scrivere testo normale nei componenti. Al momento del build, il compilatore estrae i testi e inietta i contenuti localizzati:

```tsx fileName="src/app/page.tsx"
// Write normal React code. The compiler extracts the text automatically
export default function HomePage() {
  return (
    <section>
      <h1>Welcome to our platform</h1>
      <p>Start exploring our modern features today.</p>
    </section>
  );
}
```

Dietro le quinte, Intlayer genera il dizionario e collega il componente al suo contenuto localizzato, eliminando completamente la necessità di refactoring manuale.

In questo caso, verrà generato un file `src/app/page.content.ts` con il seguente contenuto:

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({ en: "Welcome to our platform" }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
    }),
  },
};

export default content;
```

## Traduzione automatica con IA e il tuo LLM preferito

Traduci in pochi secondi con OpenAI, Anthropic, DeepSeek o Mistral usando la CLI integrata:

```bash packageManager="npm"
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
yarn dlx intlayer fill
```

```bash packageManager="bun"
bunx intlayer fill
```

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.GERMAN],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext:
      "Dashboard SaaS per produttività e collaborazione di team",
  },
};

export default config;
```

L'esecuzione di `npx intlayer fill` popola le dichiarazioni `.content.ts` con le traduzioni per tutte le lingue configurate:

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
      it: "Benvenuto nella nostra piattaforma",
    }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
      it: "Inizia a esplorare le nostre funzionalità moderne oggi stesso.",
    }),
  },
};

export default content;
```

Poiché Intlayer fornisce un `applicationContext` di alto livello all'LLM, le traduzioni generate mantengono le sfumature tecniche, il tono del brand e il contesto grammaticale molto meglio rispetto ai tradizionali strumenti automatizzati.

Per verificare che nessuna stringa sia stata dimenticata prima di andare in produzione:

```bash
npx intlayer test
```

## Aggiungi routing multilingue senza rompere le URL esistenti

Intlayer offre modalità di routing flessibili:

- **Parametri URL / Cookie (`search-params`)**: Mantieni intatta la struttura delle cartelle senza spostare nulla in `[locale]`.
- **Modalità prefisso (`prefix` / `prefix-all-locales`)**: Gestisci prefissi SEO-friendly senza complessità.

Configura l'integrazione con Next.js in pochi secondi:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* Your existing Next.js config */};

export default withIntlayer(nextConfig);
```

Avvolgi il tuo root layout con `IntlayerProvider`:

```tsx fileName="src/app/layout.tsx"
import type { ReactNode } from "react";
import { IntlayerProvider } from "next-intlayer";
import { getLocale } from "next-intlayer/server";
import { getHTMLTextDir } from "intlayer";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
}
```

## SEO multilingue

Genera automaticamente metadati localizzati e tag `hreflang` per farti scoprire in tutto il mondo:

```tsx fileName="src/app/page.tsx"
import type { Metadata } from "next";
import { getLocale } from "next-intlayer/server";
import { getIntlayer } from "intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const content = getIntlayer("home-page-metadata", locale);

  return {
    title: content.title,
    description: content.description,
  };
};
```

## Approfondimento: Pronto per la guida passo-passo?

Per seguire la guida tecnica completa con middleware, generazione statica (`generateStaticParams`) e Server Components, visita la documentazione ufficiale:

👉 **[Guida completa per tradurre Next.js 16 con Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_16.md)**

## Domande Frequenti (FAQ)

<FAQ>

<Question title="Posso rendere multilingue la mia app Next.js senza spostare file in app/[locale]?">

Sì. Intlayer supporta `routing.mode: "search-params"` e rilevamento tramite cookie/header, preservando le URL e la struttura esistente.

</Question>
<Question title="Devo sostituire manualmente tutte le stringhe di testo?">

No. Con `npx intlayer extract` o il compilatore Intlayer i testi vengono estratti automaticamente.

</Question>
<Question title="In che modo Intlayer riduce la dimensione del bundle rispetto a next-intl?">

Grazie all'estrazione mirata per componente e all'ottimizzazione macro in fase di build.

</Question>
<Question title="Posso usare l'IA per tradurre automaticamente la mia applicazione?">

Sì, con il comando `npx intlayer fill` integrato direttamente con i principali modelli LLM.

</Question>
</FAQ>
