---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: Come internazionalizzare la tua applicazione Next.js usando next-i18next
description: Configura l'i18n con next-i18next: best practice e consigli SEO per app Next.js multilingue, coprendo internazionalizzazione, organizzazione dei contenuti e configurazione tecnica.
slugs:
  - blog
  - nextjs-internationalization-using-next-i18next
applicationTemplate: https://github.com/aymericzip/next-i18next-template
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Versione iniziale
---

# Come internazionalizzare la tua applicazione Next.js usando next-i18next nel 2025

## Indice

<TOC/>

## Cos'è next-i18next?

**next-i18next** è una popolare soluzione di internazionalizzazione (i18n) per applicazioni Next.js. Mentre il pacchetto originale `next-i18next` è stato progettato per il Pages Router, questa guida ti mostra come implementare i18next con il moderno **App Router** utilizzando direttamente `i18next` e `react-i18next`.

Con questo approccio, puoi:

- **Organizzare le traduzioni** usando namespace (ad esempio, `common.json`, `about.json`) per una migliore gestione dei contenuti.
- **Caricare le traduzioni in modo efficiente** caricando solo i namespace necessari per ogni pagina, riducendo la dimensione del bundle.
- **Supportare sia componenti server che client** con una corretta gestione di SSR e hydration.
- **Garantire il supporto a TypeScript** con configurazione locale e chiavi di traduzione tipizzate.
- **Ottimizza per la SEO** con una corretta internazionalizzazione di metadata, sitemap e robots.txt.

> In alternativa, puoi anche fare riferimento alla [guida next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_with_next-intl.md), oppure utilizzare direttamente [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_16.md).

> Vedi il confronto in [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/next-i18next_vs_next-intl_vs_intlayer.md).

## Pratiche da seguire

Prima di entrare nell'implementazione, ecco alcune pratiche da seguire:

- **Imposta gli attributi HTML `lang` e `dir`**
- Nel tuo layout, calcola `dir` usando `getLocaleDirection(locale)` e imposta `<html lang={locale} dir={dir}>` per una corretta accessibilità e SEO.
- **Dividi i messaggi per namespace**
  Organizza i file JSON per locale e namespace (ad esempio, `common.json`, `about.json`) per caricare solo ciò di cui hai bisogno.
- **Minimizza il payload client**
  Nelle pagine, invia solo i namespace richiesti a `NextIntlClientProvider` (ad esempio, `pick(messages, ['common', 'about'])`).
- **Preferisci pagine statiche**
  Usa pagine statiche il più possibile per migliori prestazioni e SEO.
- **I18n nei componenti server**
  I componenti server, come le pagine o tutti i componenti non marcati come `client`, sono statici e possono essere prerenderizzati al momento della build. Quindi dovremo passare loro le funzioni di traduzione come props.
- **Configura i tipi TypeScript**
- Per le tue localizzazioni, assicurati la sicurezza dei tipi in tutta la tua applicazione.
- **Proxy per il reindirizzamento**
  Usa un proxy per gestire il rilevamento della localizzazione e il routing, e reindirizzare l'utente all'URL corretto con prefisso locale.
- **Internazionalizzazione dei tuoi metadata, sitemap, robots.txt**
  Internazionalizza i tuoi metadata, sitemap, robots.txt usando la funzione `generateMetadata` fornita da Next.js per garantire una migliore scoperta da parte dei motori di ricerca in tutte le localizzazioni.
- **Localizza i Link**
  Localizza i Link usando il componente `Link` per reindirizzare l'utente all'URL corretto con prefisso locale. È importante garantire la scoperta delle tue pagine in tutte le localizzazioni.
- **Automatizza test e traduzioni**
  Automatizzare test e traduzioni aiuta a risparmiare tempo nella manutenzione della tua applicazione multilingue.

> Consulta la nostra documentazione che elenca tutto ciò che devi sapere sull'internazionalizzazione e SEO: [Internazionalizzazione (i18n) con next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/internationalization_and_SEO.md).

---

## Guida passo-passo per configurare i18next in un'applicazione Next.js

<iframe
  src="https://stackblitz.com/github/aymericzip/next-i18next-template?embed=1&ctl=1&file=src/app/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Come internazionalizzare la tua applicazione usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"

> Consulta il [Template dell'Applicazione](https://github.com/aymericzip/next-i18next-template) su GitHub.

Ecco la struttura del progetto che andremo a creare:

```bash
.
├── i18n.config.ts
└── src # Src è opzionale
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── types
    │   └── i18next.d.ts
    ├── app
    │   ├── proxy.ts
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (Route Group per non inquinare tutte le pagine con i messaggi della home)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### Passo 1: Installa le Dipendenze

Installa i pacchetti necessari usando npm:

```bash packageManager="npm"
npm install i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add i18next react-i18next i18next-resources-to-backend
```

- **i18next**: Il framework principale di internazionalizzazione che gestisce il caricamento e la gestione delle traduzioni.
- **react-i18next**: Binding React per i18next che forniscono hook come `useTranslation` per i componenti client.
- **i18next-resources-to-backend**: Un plugin che permette il caricamento dinamico dei file di traduzione, consentendoti di caricare solo i namespace di cui hai bisogno.

### Passo 2: Configura il tuo Progetto

Crea un file di configurazione per definire le localizzazioni supportate, la localizzazione predefinita e le funzioni di supporto per la localizzazione degli URL. Questo file funge da unica fonte di verità per la tua configurazione i18n e garantisce la sicurezza dei tipi in tutta l'applicazione.

Centralizzare la configurazione delle localizzazioni previene incoerenze e rende più semplice aggiungere o rimuovere localizzazioni in futuro. Le funzioni di supporto assicurano una generazione coerente degli URL per SEO e routing.

```ts fileName="i18n.config.ts"
// Definisci le localizzazioni supportate come array const per la sicurezza dei tipi
// L'asserzione 'as const' fa sì che TypeScript inferisca tipi letterali invece di string[]
export const locales = ["en", "fr"] as const;

// Estrai il tipo Locale dall'array delle localizzazioni
// Questo crea un tipo unione: "en" | "fr"
export type Locale = (typeof locales)[number];

// Imposta la localizzazione predefinita usata quando nessuna localizzazione è specificata
export const defaultLocale: Locale = "en";

// Lingue da destra a sinistra che necessitano di una gestione speciale della direzione del testo
export const rtlLocales = ["ar", "he", "fa", "ur"] as const;

// Verifica se una localizzazione richiede la direzione del testo RTL (da destra a sinistra)
// Usato per lingue come arabo, ebraico, persiano e urdu
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

// Genera un percorso localizzato per una data localizzazione e percorso
// I percorsi della localizzazione predefinita non hanno prefisso (es. "/about" invece di "/en/about")
// Le altre localizzazioni sono prefissate (es. "/fr/about")
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// URL base per URL assoluti (usati in sitemap, metadata, ecc.)
const ORIGIN = "https://example.com";

// Genera un URL assoluto con prefisso locale
// Usato per metadata SEO, sitemap e URL canonici
export function absoluteUrl(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}

// Usato per impostare il cookie della localizzazione nel browser
export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 anno
    "SameSite=Lax",
  ].join("; ");
}
```

### Passo 3: Centralizzare i Namespace di Traduzione

Crea una fonte unica di verità per ogni namespace che la tua applicazione espone. Riutilizzare questa lista mantiene sincronizzati il server, il client e il codice degli strumenti, e abilita il typing forte per gli helper di traduzione.

```ts fileName="src/i18n.namespaces.ts"
export const namespaces = ["common", "about"] as const;

export type Namespace = (typeof namespaces)[number];
```

### Passo 4: Tipizzare Fortemente le Chiavi di Traduzione con TypeScript

Estendi `i18next` per puntare ai tuoi file linguistici canonici (di solito in inglese). TypeScript inferisce così le chiavi valide per namespace, quindi le chiamate a `t()` sono verificate end-to-end.

```ts fileName="src/types/i18next.d.ts"
import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof import("@/locales/en/common.json");
      about: typeof import("@/locales/en/about.json");
    };
  }
}
```

> Suggerimento: conserva questa dichiarazione sotto `src/types` (crea la cartella se non esiste). Next.js include già `src` in `tsconfig.json`, quindi l'augmentazione viene rilevata automaticamente. In caso contrario, aggiungi quanto segue al tuo file `tsconfig.json`:

```json5 fileName="tsconfig.json"
{
  "include": ["src/types/**/*.ts"],
}
```

Con questo in atto puoi fare affidamento sull'autocompletamento e sui controlli a tempo di compilazione:

```tsx
import { useTranslation, type TFunction } from "react-i18next";

const { t } = useTranslation("about");

// OK, tipizzato: t("counter.increment")
// ERRORE, errore di compilazione: t("doesNotExist")
export type AboutTranslator = TFunction<"about">;
```

### Passo 5: Configurare l'inizializzazione i18n lato server

Crea una funzione di inizializzazione lato server che carica le traduzioni per i componenti server. Questa funzione crea un'istanza separata di i18next per il rendering lato server, assicurando che le traduzioni siano caricate prima del rendering.

I componenti server necessitano di una propria istanza di i18next perché vengono eseguiti in un contesto diverso rispetto ai componenti client. Il pre-caricamento delle traduzioni sul server previene il flash di contenuti non tradotti e migliora la SEO garantendo che i motori di ricerca vedano contenuti tradotti.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces, type Namespace } from "@/i18n.namespaces";

// Configura il caricamento dinamico delle risorse per i18next
// Questa funzione importa dinamicamente i file JSON di traduzione basati su locale e namespace
// Esempio: locale="fr", namespace="about" -> importa "@/locales/fr/about.json"
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

const DEFAULT_NAMESPACES = [
  namespaces[0],
] as const satisfies readonly Namespace[];

/**
 * Inizializza l'istanza di i18next per il rendering lato server
 *
 * @returns Istanza di i18next inizializzata pronta per l'uso lato server
 */
export async function initI18next(
  locale: string,
  ns: readonly Namespace[] = DEFAULT_NAMESPACES
) {
  // Crea una nuova istanza di i18next (separata dall'istanza lato client)
  const i18n = createInstance();

  // Inizializza con integrazione React e caricatore backend
  await i18n
    .use(initReactI18next) // Abilita il supporto ai React hooks
    .use(backend) // Abilita il caricamento dinamico delle risorse
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns, // Carica solo i namespace specificati per migliori prestazioni
      defaultNS: "common", // Namespace di default quando non specificato
      interpolation: { escapeValue: false }, // Non eseguire l'escape dell'HTML (React gestisce la protezione XSS)
      react: { useSuspense: false }, // Disabilita Suspense per compatibilità SSR
      returnNull: false, // Restituisce stringa vuota invece di null per chiavi mancanti
      initImmediate: false, // Rinvia l'inizializzazione fino a quando le risorse sono caricate (SSR più veloce)
    });
  return i18n;
}
```

### Passo 6: Creare il Provider i18n lato Client

Crea un provider componente client che avvolge la tua applicazione con il contesto i18next. Questo provider riceve traduzioni pre-caricate dal server per prevenire il flash di contenuti non tradotti (FOUC) ed evitare richieste duplicate.

I componenti client necessitano della propria istanza i18next che gira nel browser. Accettando risorse pre-caricate dal server, assicuriamo un'idratazione fluida e preveniamo il lampeggio dei contenuti. Il provider gestisce anche dinamicamente i cambi di locale e il caricamento dei namespace.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance, type ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";

// Configura il caricamento dinamico delle risorse per il client
// Stesso schema del server, ma questa istanza gira nel browser
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: readonly Namespace[];
  // Risorse pre-caricate dal server (previene FOUC - Flash of Untranslated Content)
  // Formato: { namespace: translationBundle }
  resources?: Record<Namespace, ResourceLanguage>;
  children: React.ReactNode;
};

/**
 * Provider i18n lato client che avvolge l'app con il contesto i18next
 * Riceve risorse pre-caricate dal server per evitare di rifare il fetch delle traduzioni
 */
export default function I18nProvider({
  locale,
  namespaces = [allNamespaces[0]] as const,
  resources,
  children,
}: Props) {
  // Crea l'istanza i18n una sola volta usando l'inizializzatore lazy di useState
  // Questo assicura che l'istanza venga creata una sola volta, non a ogni render
  const [i18n] = useState(() => {
    const i18nInstance = createInstance();

    i18nInstance
      .use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        // Se le risorse sono fornite (dal server), usale per evitare il fetching lato client
        // Questo previene il FOUC e migliora le prestazioni di caricamento iniziale
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        returnNull: false, // Previene il ritorno di valori undefined
      });

    return i18nInstance;
  });

  // Aggiorna la lingua quando la prop locale cambia
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // Assicura che tutti i namespace richiesti siano caricati lato client
  // Usa join("|") come dipendenza per confrontare correttamente gli array
  useEffect(() => {
    i18n.loadNamespaces(namespaces);
  }, [namespaces.join("|"), i18n]);

  // Fornire l'istanza i18n a tutti i componenti figli tramite il contesto React
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

### Passo 7: Definire le Rotte Dinamiche per le Locali

Configura il routing dinamico per le localizzazioni creando una directory `[locale]` nella cartella della tua app. Questo permette a Next.js di gestire il routing basato sulla locale, dove ogni locale diventa un segmento dell'URL (es. `/en/about`, `/fr/about`).

L'uso di rotte dinamiche consente a Next.js di generare pagine statiche per tutte le localizzazioni al momento della build, migliorando le prestazioni e la SEO. Il componente layout imposta gli attributi HTML `lang` e `dir` in base alla locale, cosa cruciale per l'accessibilità e la comprensione da parte dei motori di ricerca.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

// Disabilita parametri dinamici - tutte le localizzazioni devono essere conosciute al momento della build
// Questo garantisce la generazione statica per tutte le rotte delle localizzazioni
export const dynamicParams = false;

/**
 * Genera parametri statici per tutte le localizzazioni al momento della build
 * Next.js pre-renderizzerà le pagine per ogni localizzazione restituita qui
 * Esempio: [{ locale: "en" }, { locale: "fr" }]
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Componente layout root che gestisce gli attributi HTML specifici per la localizzazione
 * Imposta l'attributo lang e la direzione del testo (ltr/rtl) in base alla localizzazione
 */
export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // Valida la locale dai parametri URL
  // Se viene fornita una locale non valida, si utilizza la locale predefinita
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  // Determina la direzione del testo in base alla locale
  // Le lingue RTL come l'arabo necessitano di dir="rtl" per una corretta visualizzazione del testo
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

### Passo 8: Crea i tuoi file di traduzione

Crea file JSON per ogni locale e namespace. Questa struttura ti permette di organizzare le traduzioni in modo logico e caricare solo ciò che ti serve per ogni pagina.

Organizzare le traduzioni per namespace (ad esempio, `common.json`, `about.json`) consente di effettuare il code splitting e ridurre la dimensione del bundle. Carichi solo le traduzioni necessarie per ogni pagina, migliorando le prestazioni.

```json fileName="src/locales/en/common.json"
{
  "appTitle": "Next.js i18n App",
  "appDescription": "Example Next.js application with internationalization using i18next"
}
```

```json fileName="src/locales/fr/common.json"
{
  "appTitle": "Application Next.js i18n",
  "appDescription": "Exemple d'application Next.js avec internationalisation utilisant i18next"
}
```

```json fileName="src/locales/en/home.json"
{
  "title": "Home",
  "description": "Home page description",
  "welcome": "Welcome",
  "greeting": "Hello, world!",
  "aboutPage": "About Page",
  "documentation": "Documentation"
}
```

```json fileName="src/locales/it/home.json"
{
  "title": "Home",
  "description": "Descrizione della pagina principale",
  "welcome": "Benvenuto",
  "greeting": "Ciao, mondo!",
  "aboutPage": "Pagina Informazioni",
  "documentation": "Documentazione"
}
```

```json fileName="src/locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "description": "Click the button to increase the counter"
  }
}
```

```json fileName="src/locales/it/about.json"
{
  "title": "Informazioni",
  "description": "Descrizione della pagina Informazioni",
  "counter": {
    "label": "Contatore",
    "increment": "Incrementa",
    "description": "Clicca il pulsante per aumentare il contatore"
  }
}
```

### Passo 9: Utilizzare le Traduzioni nelle Tue Pagine

Crea un componente pagina che inizializza i18next sul server e passa le traduzioni sia ai componenti server che client. Questo assicura che le traduzioni siano caricate prima del rendering e previene il lampeggiamento del contenuto.

L'inizializzazione lato server carica le traduzioni prima che la pagina venga renderizzata, migliorando la SEO e prevenendo il FOUC (Flash Of Unstyled Content). Passando le risorse pre-caricate al provider client, evitiamo richieste duplicate e garantiamo un'idratazione fluida.

```tsx fileName="src/app/[locale]/about/index.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";
import type { ResourceLanguage } from "i18next";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

/**
 * Componente server della pagina che gestisce l'inizializzazione di i18n
 * Pre-carica le traduzioni sul server e le passa ai componenti client
 */
export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  // Definisce quali namespace di traduzione questa pagina necessita
  // Riutilizza la lista centralizzata per sicurezza di tipo e completamento automatico
  const pageNamespaces = allNamespaces;

  // Inizializza i18next sul server con i namespace richiesti
  // Questo carica i file JSON di traduzione lato server
  const i18n = await initI18next(locale, pageNamespaces);

  // Ottieni una funzione di traduzione fissa per il namespace "about"
  // getFixedT blocca il namespace, quindi t("title") invece di t("about:title")
  const tAbout = i18n.getFixedT(locale, "about");

  // Estrai i bundle di traduzione dall'istanza i18n
  // Questi dati vengono passati a I18nProvider per idratare l'i18n lato client
  // Previene il FOUC (Flash of Untranslated Content) e evita richieste duplicate
  const resources = Object.fromEntries(
    pageNamespaces.map((ns) => [ns, i18n.getResourceBundle(locale, ns)])
  ) satisfies Record<Namespace, ResourceLanguage>;

  return (
    <I18nProvider
      locale={locale}
      namespaces={pageNamespaces}
      resources={resources}
    >
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

### Passo 10: Usare le Traduzioni nei Componenti Client

I componenti client possono utilizzare il hook `useTranslation` per accedere alle traduzioni. Questo hook fornisce l'accesso alla funzione di traduzione e all'istanza i18n, permettendo di tradurre contenuti e accedere alle informazioni sulla locale.

I componenti client necessitano dei React hooks per accedere alle traduzioni. Il hook `useTranslation` si integra perfettamente con i18next e fornisce aggiornamenti reattivi quando la locale cambia.

> Assicurati che la pagina/provider includa solo i namespace necessari (es. `about`).  
> Se usi React < 19, memorizza in cache formatter pesanti come `Intl.NumberFormat`.

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Esempio di componente client che utilizza React hooks per le traduzioni
 * Può usare hook come useState, useEffect e useTranslation
 */
const ClientComponent = () => {
  // L'hook useTranslation fornisce accesso alla funzione di traduzione e all'istanza i18n
  // Specifica il namespace per caricare solo le traduzioni del namespace "about"
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // Crea un formatter numerico sensibile alla locale
  // i18n.language fornisce la locale corrente (es. "en", "fr")
  // Intl.NumberFormat formatta i numeri secondo le convenzioni della locale
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Format del numero usando la formattazione specifica della locale */}
      <p className="text-5xl font-bold text-white m-0">
        {numberFormat.format(count)}
      </p>
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

### Passo 11: Usare le Traduzioni nei Componenti Server

I componenti server non possono utilizzare React hooks, quindi ricevono le traduzioni tramite props dai loro componenti genitori. Questo approccio mantiene i componenti server sincroni e consente loro di essere annidati all'interno di componenti client.

I componenti server che potrebbero essere annidati sotto confini client devono essere sincroni. Passando stringhe tradotte e informazioni sulla localizzazione come props, evitiamo operazioni asincrone e garantiamo un rendering corretto.

```tsx fileName="src/components/ServerComponent.tsx"
import type { TFunction } from "i18next";

type ServerComponentProps = {
  // Funzione di traduzione passata dal componente server genitore
  // I componenti server non possono usare hooks, quindi le traduzioni arrivano tramite props
  t: TFunction<"about">;
  locale: string;
  count: number;
};

/**
 * Esempio di componente server - riceve le traduzioni tramite props
 * Può essere annidato all'interno di componenti client (componenti server asincroni)
 * Non può usare React hooks, quindi tutti i dati devono provenire da props o operazioni asincrone
 */
const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  // Format numero lato server usando la locale
  // Questo viene eseguito sul server durante SSR, migliorando il caricamento iniziale della pagina
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-5xl font-bold text-white m-0">{formatted}</p>
      {/* Usa la funzione di traduzione passata come prop */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl font-semibold text-white">
          {t("counter.label")}
        </span>
        <span className="text-sm opacity-80 italic">
          {t("counter.description")}
        </span>
      </div>
    </div>
  );
};

export default ServerComponent;
```

---

### (Opzionale) Passo 12: Cambiare la lingua del tuo contenuto

Per cambiare la lingua del tuo contenuto in Next.js, il modo consigliato è utilizzare URL con prefisso locale e link di Next.js. L'esempio qui sotto legge la locale corrente dalla rotta, la rimuove dal pathname, e rende un link per ogni locale disponibile.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n.config";

export default function LocaleSwitcher() {
  const params = useParams();
  const pathname = usePathname();

  const activeLocale = (params?.locale as Locale | undefined) ?? defaultLocale;

  const getLocaleLabel = (locale: Locale): string => {
    try {
      const displayNames = new Intl.DisplayNames([locale], {
        type: "language",
      });
      return displayNames.of(locale) ?? locale.toUpperCase();
    } catch {
      return locale.toUpperCase();
    }
  };

  const basePath = useMemo(() => {
    if (!pathname) return "/";

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return "/";

    const maybeLocale = segments[0] as Locale;

    if ((locales as readonly string[]).includes(maybeLocale)) {
      const rest = segments.slice(1).join("/");
      return rest ? `/${rest}` : "/";
    }

    return pathname;
  }, [pathname]);

  return (
    <nav aria-label="Selettore della lingua">
      {(locales as readonly Locale[]).map((locale) => {
        const isActive = locale === activeLocale;

        const href =
          locale === defaultLocale ? basePath : `/${locale}${basePath}`;

        return (
          <Link
            key={locale}
            href={href}
            aria-current={isActive ? "page" : undefined}
            onClick={() => {
              document.cookie = getCookie(locale);
            }}
          >
            {getLocaleLabel(locale)}
          </Link>
        );
      })}
    </nav>
  );
}
```

### (Opzionale) Passo 13: Costruire un componente Link localizzato

Riutilizzare URL localizzati in tutta la tua app mantiene la navigazione coerente e ottimizzata per la SEO. Avvolgi `next/link` in un piccolo helper che aggiunge il prefisso della locale attiva alle rotte interne lasciando intatti gli URL esterni.

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import NextLink, { type LinkProps } from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps, PropsWithChildren } from "react";
import {
  defaultLocale,
  type Locale,
  locales,
  localizedPath,
} from "@/i18n.config";

const isExternal = (href: string) => /^https?:\/\//.test(href);

type LocalizedLinkProps = PropsWithChildren<
  Omit<LinkProps, "href"> &
    Omit<ComponentProps<"a">, "href"> & { href: string; locale?: Locale }
>;

export default function LocalizedLink({
  href,
  locale,
  children,
  ...props
}: LocalizedLinkProps) {
  const params = useParams();
  const fallback = (params?.locale as Locale | undefined) ?? defaultLocale;
  const normalizedLocale = (locales as readonly string[]).includes(fallback)
    ? ((locale ?? fallback) as Locale)
    : defaultLocale;

  const normalizedPath = href.startsWith("/") ? href : `/${href}`;
  const localizedHref = isExternal(href)
    ? href
    : localizedPath(normalizedLocale, normalizedPath);

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}
```

> Suggerimento: Poiché `LocalizedLink` è un sostituto diretto, migra gradualmente sostituendo gli import e lasciando che il componente gestisca gli URL specifici per la locale.

### (Opzionale) Passo 14: Accedere alla locale attiva all'interno delle Server Actions

Le Server Actions spesso necessitano della locale corrente per email, logging o integrazioni di terze parti. Combina il cookie della locale impostato dal tuo proxy con l'header `Accept-Language` come fallback.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { cookies, headers } from "next/headers";
import { defaultLocale, locales, type Locale } from "@/i18n.config";

const KNOWN_LOCALES = new Set(locales as readonly string[]);

const normalize = (value: string | undefined): Locale | undefined => {
  if (!value) return undefined;
  const base = value.toLowerCase().split("-")[0];
  return KNOWN_LOCALES.has(base) ? (base as Locale) : undefined;
};

export async function getCurrentLocale(): Promise<Locale> {
  const cookieLocale = normalize(cookies().get("NEXT_LOCALE")?.value);

  if (cookieLocale) return cookieLocale;

  const headerLocale = normalize(headers().get("accept-language"));
  return headerLocale ?? defaultLocale;
}

// Esempio di un'azione server che utilizza la locale corrente
export async function stuffFromServer(formData: FormData) {
  const locale = await getCurrentLocale();

  // Usa la locale per effetti collaterali localizzati (email, CRM, ecc.)
  console.log(`Stuff from server with locale ${locale}`);
}
```

> Poiché l'helper si basa sui cookie e sugli header di Next.js, funziona nei Route Handlers, nelle Server Actions e in altri contesti esclusivamente server.

### (Opzionale) Passo 15: Internazionalizza i Tuoi Metadata

Tradurre i contenuti è importante, ma l'obiettivo principale dell'internazionalizzazione è rendere il tuo sito web più visibile al mondo. L'i18n è una leva incredibile per migliorare la visibilità del tuo sito web attraverso una corretta SEO.

I metadata correttamente internazionalizzati aiutano i motori di ricerca a comprendere quali lingue sono disponibili sulle tue pagine. Questo include l'impostazione dei meta tag hreflang, la traduzione di titoli e descrizioni, e l'assicurarsi che gli URL canonici siano correttamente impostati per ogni locale.

Ecco una lista di buone pratiche riguardanti la SEO multilingue:

- Imposta i meta tag hreflang nel tag `<head>` per aiutare i motori di ricerca a capire quali lingue sono disponibili nella pagina
- Elenca tutte le traduzioni delle pagine nel sitemap.xml utilizzando lo schema XML `http://www.w3.org/1999/xhtml`
- Non dimenticare di escludere le pagine con prefisso dal robots.txt (es. `/dashboard`, `/fr/dashboard`, `/es/dashboard`)
- Usa un componente Link personalizzato per reindirizzare alla pagina più localizzata (es. in francese `<a href="/fr/about">À propos</a>`)

Gli sviluppatori spesso dimenticano di riferire correttamente le loro pagine tra le diverse localizzazioni. Sistemiamolo:

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import {
  locales,
  defaultLocale,
  localizedPath,
  absoluteUrl,
} from "@/i18n.config";

/**
 * Genera i metadata SEO per ogni versione locale della pagina
 * Questa funzione viene eseguita per ogni locale al momento della build
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Importa dinamicamente il file di traduzione per questo locale
  // Usato per ottenere il titolo e la descrizione tradotti per i metadata
  const messages = (await import(`@/locales/${locale}/about.json`)).default;

  // Crea la mappatura hreflang per tutti i locali
  // Aiuta i motori di ricerca a comprendere le alternative linguistiche
  // Formato: { "en": "/about", "fr": "/fr/about" }
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      // URL canonico per questa versione locale
      canonical: absoluteUrl(locale, "/about"),
      // Alternative linguistiche per SEO (tag hreflang)
      // "x-default" specifica la versione locale predefinita
      languages: {
        ...languages,
        "x-default": absoluteUrl(defaultLocale, "/about"),
      },
    },
  };
}

export default async function AboutPage() {
  return <h1>Informazioni</h1>;
}
```

### (Opzionale) Passo 16: Internazionalizza la tua Sitemap

Genera una sitemap che includa tutte le versioni locali delle tue pagine. Questo aiuta i motori di ricerca a scoprire e indicizzare tutte le versioni linguistiche dei tuoi contenuti.

Una sitemap correttamente internazionalizzata garantisce che i motori di ricerca possano trovare e indicizzare tutte le versioni linguistiche delle tue pagine. Questo migliora la visibilità nei risultati di ricerca internazionali.

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * Ottieni una mappa di tutte le localizzazioni e i loro percorsi localizzati
 *
 * Esempio di output:
 * {
 *   "en": "https://example.com",
 *   "fr": "https://example.com/fr",
 *   "es": "https://example.com/es",
 *   "x-default": "https://example.com"
 * }
 */
const getLocalizedMap = (path: string) =>
  Object.fromEntries([
    ...locales.map((locale) => [locale, formatterLocalizedPath(locale, path)]),
    ["x-default", formatterLocalizedPath(defaultLocale, path)],
  ]);

// Genera la sitemap con tutte le varianti locali per una migliore SEO
// Il campo alternates informa i motori di ricerca sulle versioni linguistiche
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: { languages: getLocalizedMap("/") },
    },
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: getLocalizedMap("/about") },
    },
  ];
}
```

### (Opzionale) Passo 17: Internazionalizza il tuo robots.txt

Crea un file robots.txt che gestisca correttamente tutte le versioni locali delle tue rotte protette. Questo assicura che i motori di ricerca non indicizzino pagine di amministrazione o dashboard in nessuna lingua.

Configurare correttamente robots.txt per tutte le localizzazioni impedisce ai motori di ricerca di indicizzare pagine sensibili in qualsiasi lingua. Questo è cruciale per la sicurezza e la privacy.

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

// Genera i percorsi per tutte le localizzazioni (es. /admin, /fr/admin, /es/admin)
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => `/${locale}${path}`),
];

const disallow = [...withAllLocales("/dashboard"), ...withAllLocales("/admin")];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### (Opzionale) Passo 18: Configurare il Middleware per il Routing Locale

Crea un proxy per rilevare automaticamente la locale preferita dall'utente e reindirizzarlo all'URL con il prefisso della locale appropriata. Questo migliora l'esperienza utente mostrando i contenuti nella lingua preferita.

Il middleware garantisce che gli utenti vengano reindirizzati automaticamente alla loro lingua preferita quando visitano il tuo sito. Inoltre, salva la preferenza dell'utente in un cookie per visite future.

```ts fileName="src/proxy.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

// Regex per corrispondere ai file con estensioni (es. .js, .css, .png)
// Usato per escludere le risorse statiche dal routing della localizzazione
const PUBLIC_FILE = /\.[^/]+$/;

/**
 * Estrae la localizzazione dall'header Accept-Language
 * Gestisce formati come "fr-CA", "en-US", ecc.
 * Torna alla localizzazione predefinita se la lingua del browser non è supportata
 */
const pickLocale = (accept: string | null) => {
  // Ottiene la prima preferenza linguistica (es. "fr-CA" da "fr-CA,en-US;q=0.9")
  const raw = accept?.split(",")[0] ?? defaultLocale;
  // Estrae il codice base della lingua (es. "fr" da "fr-CA")
  const base = raw.toLowerCase().split("-")[0];
  // Controlla se supportiamo questa localizzazione, altrimenti usa quella predefinita
  return (locales as readonly string[]).includes(base) ? base : defaultLocale;
};

/**
 * Proxy di Next.js per il rilevamento e il routing della locale
 * Viene eseguito ad ogni richiesta prima del rendering della pagina
 * Reindirizza automaticamente agli URL con prefisso locale quando necessario
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Salta il proxy per le internals di Next.js, le API routes e i file statici
  // Questi non devono avere il prefisso locale
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Controlla se l'URL ha già un prefisso locale
  // Esempio: "/fr/about" o "/en" restituirebbe true
  const hasLocale = (locales as readonly string[]).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // Se non c'è un prefisso di localizzazione, rileva la localizzazione e reindirizza
  if (!hasLocale) {
    // Prova a ottenere la localizzazione dal cookie prima (preferenza utente)
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

    // Usa la localizzazione del cookie se valida, altrimenti rileva dagli header del browser
    const locale =
      cookieLocale && (locales as readonly string[]).includes(cookieLocale)
        ? cookieLocale
        : pickLocale(request.headers.get("accept-language"));

    // Clona l'URL per modificare il pathname
    const url = request.nextUrl.clone();
    // Aggiungi il prefisso di localizzazione al pathname
    // Gestisci il percorso root in modo speciale per evitare doppio slash
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

    // Crea una risposta di redirect e imposta il cookie della lingua
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", locale, { path: "/" });
    return res;
  }
}

export const config = {
  matcher: [
    // Corrisponde a tutti i percorsi tranne:
    // - Rotte API (/api/*)
    // - Interni di Next.js (/_next/*)
    // - File statici (/static/*)
    // - File con estensioni (.*\\..*)
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

### (Opzionale) Passo 19: Automatizza le tue traduzioni usando Intlayer

Intlayer è una libreria **gratuita** e **open-source** progettata per assistere il processo di localizzazione nella tua applicazione. Mentre i18next gestisce il caricamento e la gestione delle traduzioni, Intlayer aiuta ad automatizzare il flusso di lavoro delle traduzioni.

Gestire manualmente le traduzioni può richiedere molto tempo ed essere soggetto a errori. Intlayer automatizza il testing, la generazione e la gestione delle traduzioni, facendoti risparmiare tempo e garantendo coerenza in tutta la tua applicazione.

Intlayer ti permette di:

- **Dichiarare i tuoi contenuti dove vuoi nella tua codebase**  
  Intlayer consente di dichiarare i tuoi contenuti dove vuoi nella tua codebase utilizzando file `.content.{ts|js|json}`. Questo permette una migliore organizzazione dei contenuti, assicurando una maggiore leggibilità e manutenibilità della tua codebase.

- **Testare le traduzioni mancanti**  
  Intlayer fornisce funzioni di test che possono essere integrate nella tua pipeline CI/CD o nei tuoi test unitari. Scopri di più su [come testare le tue traduzioni](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/testing.md).

- **Automatizza le tue traduzioni**,
  Intlayer fornisce una CLI e un'estensione per VSCode per automatizzare le tue traduzioni. Può essere integrato nella tua pipeline CI/CD. Scopri di più su [automatizzare le tue traduzioni](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md).
  Puoi utilizzare la tua **chiave API personale e il provider AI di tua scelta**. Fornisce inoltre traduzioni contestuali, vedi [riempi contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/autoFill.md).

- **Connetti contenuti esterni**
- **Automatizza le tue traduzioni**,  
  Intlayer fornisce una CLI e un'estensione VSCode per automatizzare le tue traduzioni. Può essere integrato nella tua pipeline CI/CD. Scopri di più su [automatizzare le tue traduzioni](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md).  
  Puoi utilizzare la tua **chiave API personale e il provider AI di tua scelta**. Offre inoltre traduzioni contestuali, vedi [riempimento contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/autoFill.md).

- **Connetti contenuti esterni**  
  Intlayer ti permette di connettere i tuoi contenuti a un sistema di gestione contenuti esterno (CMS). Per recuperarli in modo ottimizzato e inserirli nelle tue risorse JSON. Scopri di più su [recupero contenuti esterni](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/function_fetching.md).

- **Editor visuale**  
  Intlayer offre un editor visuale gratuito per modificare i tuoi contenuti usando un editor visuale. Scopri di più su [modifica visuale delle tue traduzioni](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md).

E altro ancora. Per scoprire tutte le funzionalità offerte da Intlayer, consulta la [documentazione sull'interesse di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/interest_of_intlayer.md).
