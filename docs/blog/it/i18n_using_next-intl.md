---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: Come internazionalizzare la tua applicazione Next.js usando next-intl
description: Configura l'i18n con next-intl - migliori pratiche e consigli SEO per app Next.js multilingue, coprendo internazionalizzazione, organizzazione dei contenuti e configurazione tecnica.
slugs:
  - blog
  - nextjs-internationalization-using-next-intl
applicationTemplate: https://github.com/aymericzip/next-intl-template
history:
  - version: 7.0.0
    date: 2025-11-01
    changes: Versione iniziale
---

# Come internazionalizzare la tua applicazione Next.js usando next-intl nel 2025

## Indice

<TOC/>

## Cos'è next-intl?

**next-intl** è una popolare libreria di internazionalizzazione (i18n) progettata specificamente per Next.js App Router. Fornisce un modo fluido per costruire applicazioni Next.js multilingue con eccellente supporto TypeScript e ottimizzazioni integrate.

> Se preferisci, puoi anche fare riferimento alla [guida next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/i18n_using_next-i18next.md), oppure utilizzare direttamente [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_next-intl.md).

> Vedi il confronto in [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/next-i18next_vs_next-intl_vs_intlayer.md).

## Pratiche da seguire

Prima di entrare nell'implementazione, ecco alcune pratiche che dovresti seguire:

- **Imposta gli attributi HTML `lang` e `dir`**  
  Nel tuo layout, calcola `dir` usando `getLocaleDirection(locale)` e imposta `<html lang={locale} dir={dir}>` per una corretta accessibilità e SEO.
- **Dividi i messaggi per namespace**  
  Organizza i file JSON per locale e namespace (es. `common.json`, `about.json`) per caricare solo ciò di cui hai bisogno.
- **Minimizza il payload client**  
  Nelle pagine, invia solo i namespace richiesti a `NextIntlClientProvider` (es. `pick(messages, ['common', 'about'])`).
- **Preferisci pagine statiche**  
  Usa pagine statiche il più possibile per migliori prestazioni e SEO.
- **I18n nei componenti server**  
  I componenti server, come le pagine o tutti i componenti non contrassegnati come `client`, sono statici e possono essere prerenderizzati durante la fase di build. Quindi dovremo passare loro le funzioni di traduzione come props.
- **Configura i tipi TypeScript**  
  Per i tuoi locali, per garantire la sicurezza dei tipi in tutta l'applicazione.
- **Proxy per il reindirizzamento**  
  Usa un proxy per gestire il rilevamento della lingua e il routing, e reindirizzare l'utente all'URL con il prefisso della lingua appropriata.
- **Internazionalizzazione dei tuoi metadata, sitemap, robots.txt**  
  Internazionalizza i tuoi metadata, sitemap, robots.txt usando la funzione `generateMetadata` fornita da Next.js per garantire una migliore scoperta da parte dei motori di ricerca in tutte le lingue.
- **Localizza i Link**  
  Localizza i Link usando il componente `Link` per reindirizzare l'utente all'URL con il prefisso della lingua appropriata. È importante garantire la scoperta delle tue pagine in tutte le lingue.
- **Automatizza test e traduzioni**  
  Automatizzare test e traduzioni aiuta a risparmiare tempo nella manutenzione della tua applicazione multilingue.

> Consulta la nostra documentazione che elenca tutto ciò che devi sapere sull'internazionalizzazione e SEO: [Internationalization (i18n) with next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/internationalization_and_SEO.md).

---

## Guida passo-passo per configurare next-intl in un'applicazione Next.js

<iframe
  src="https://stackblitz.com/github/aymericzip/next-intl-template?embed=1&ctl=1&file=src/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Come internazionalizzare la tua applicazione usando Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

> Vedi [Application Template](https://github.com/aymericzip/next-intl-template) su GitHub.

Ecco la struttura del progetto che andremo a creare:

```bash
.
├── global.ts
├── locales
│   ├── en
│   │  ├── common.json
│   │  └── about.json
│   ├── fr
│   │  ├── common.json
│   │  └── about.json
│   └── es
│      ├── common.json
│      └── about.json
└── src # Src è opzionale
    ├── proxy.ts
    ├── app
    │   ├── i18n.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (Gruppo di Rotte per non inquinare tutte le pagine con risorse home)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### Passo 1: Installa le Dipendenze

Installa i pacchetti necessari usando npm:

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

- **next-intl**: La libreria principale per l'internazionalizzazione del Next.js App Router che fornisce hook, funzioni server e provider client per la gestione delle traduzioni.

### Passo 2: Configura il tuo Progetto

Crea un file di configurazione che definisce le tue localizzazioni supportate e configura la richiesta di next-intl. Questo file funge da fonte unica di verità per la tua configurazione i18n e garantisce la sicurezza dei tipi in tutta la tua applicazione.

Centralizzare la configurazione delle localizzazioni previene incoerenze e rende più semplice aggiungere o rimuovere localizzazioni in futuro. La funzione `getRequestConfig` viene eseguita ad ogni richiesta e carica solo le traduzioni necessarie per ogni pagina, abilitando il code-splitting e riducendo la dimensione del bundle.

```tsx fileName="src/i18n.ts"
import { notFound } from "next/navigation";
import createMiddleware from "next-intl/middleware";
import { createNavigation } from "next-intl/navigation";

// Definisci le localizzazioni supportate con sicurezza dei tipi
export const locales = ["en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isRTL(locale: Locale | (string & {})) {
  // Verifica se la lingua è scritta da destra a sinistra
  return /^(ar|fa|he|iw|ur|ps|sd|ug|yi|ckb|ku)(-|$)/i.test(locale);
}

// Carica i messaggi dinamicamente per locale per abilitare il code-splitting
// Promise.all carica i namespace in parallelo per migliorare le prestazioni
async function loadMessages(locale: Locale) {
  // Carica solo i namespace necessari per il tuo layout/pagine
  const [common, home, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/home.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
    // ... I futuri file JSON dovrebbero essere aggiunti qui
  ]);

  return { common, home, about } as const;
}

// Helper per generare URL localizzati (es. /about vs /fr/about)
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// getRequestConfig viene eseguito ad ogni richiesta e fornisce i messaggi ai componenti server
// Qui è dove next-intl si integra con il rendering server-side di Next.js
export default async function getRequestConfig({
  requestLocale,
}: {
  requestLocale: Promise<string | undefined>;
}) {
  const requested: Locale = ((await requestLocale) as Locale) ?? defaultLocale;

  if (!locales.includes(requested)) notFound();

  return {
    locale: requested,
    messages: await loadMessages(requested),
  };
}

export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 anno
    "SameSite=Lax",
  ].join("; ");
}

const routingOptions = {
  locales,
  defaultLocale,
  localePrefix: "as-needed", // Cambia il percorso /en/... in /...
  // Opzionale: percorsi localizzati
  // pathnames: {
  //   '/': '/',
  //   '/about': {en: '/about', fr: '/a-propos', es: '/acerca-de'},
  //   '/blog/[slug]': '/blog/[slug]'
  // }
  //  localeDetection: true, // previene i redirect da "/" a "/en" basati sui cookie
} as const;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routingOptions);

export const proxy = createMiddleware(routingOptions);
```

### Passo 3: Definire le Rotte Dinamiche per le Locali

Configura il routing dinamico per le localizzazioni creando una cartella `[locale]` nella tua cartella app. Questo permette a Next.js di gestire il routing basato sulla localizzazione dove ogni locale diventa un segmento dell'URL (es. `/en/about`, `/fr/about`).

L'uso di rotte dinamiche consente a Next.js di generare pagine statiche per tutte le localizzazioni al momento della build, migliorando le prestazioni e la SEO. Il componente layout imposta gli attributi HTML `lang` e `dir` in base al locale, cosa cruciale per l'accessibilità e la comprensione da parte dei motori di ricerca.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import { getLocaleDirection, setRequestLocale } from "next-intl/server";

// Pre-generare pagine statiche per tutte le localizzazioni al momento della build (SSG)
// Questo migliora le prestazioni e la SEO
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Nel Next.js App Router, params è una Promise (può essere awaitata)
  // Questo permette di risolvere segmenti di route dinamici in modo asincrono
  const { locale } = await params;

  // Critico: setRequestLocale indica a next-intl quale locale usare per questa richiesta
  // Senza questo, getTranslations() non saprà quale locale usare nei componenti server
  setRequestLocale(locale);

  // Ottieni la direzione del testo (LTR/RTL) per un corretto rendering HTML
  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // I messaggi vengono caricati lato server. Invia solo ciò che è necessario al client.
  // Questo minimizza il bundle JavaScript inviato al browser
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Traduzioni/formattazioni strettamente lato server
  // Questi vengono eseguiti sul server e possono essere passati come props ai componenti
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider rende le traduzioni disponibili ai componenti client
    // Passa solo i namespace che i tuoi componenti client effettivamente usano
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### Passo 4: Crea i Tuoi File di Traduzione

Crea file JSON per ogni locale e namespace. Questa struttura ti permette di organizzare le traduzioni in modo logico e caricare solo ciò di cui hai bisogno per ogni pagina.

Organizzare le traduzioni per namespace (ad esempio, `common.json`, `about.json`) consente il code splitting e riduce la dimensione del bundle. Carichi solo le traduzioni necessarie per ogni pagina, migliorando le prestazioni.

```json fileName="locales/en/common.json"
{
  "welcome": "Welcome",
  "greeting": "Hello, world!"
}
```

```json fileName="locales/fr/common.json"
{
  "welcome": "Bienvenue",
  "greeting": "Bonjour le monde!"
}
```

```json fileName="locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

### Passo 5: Utilizza le Traduzioni nelle Tue Pagine

Crea un componente pagina che carica le traduzioni sul server e le passa sia ai componenti server che client. Questo garantisce che le traduzioni siano caricate prima del rendering e previene il lampeggiamento del contenuto.

Il caricamento delle traduzioni lato server migliora la SEO e previene il FOUC (Flash of Untranslated Content). Utilizzando `pick` per inviare solo i namespace necessari al provider client, minimizziamo il bundle JavaScript inviato al browser.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // I messaggi vengono caricati lato server. Invia solo ciò che è necessario al client.
  // Questo minimizza il bundle JavaScript inviato al browser
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Traduzioni/formattazioni strettamente lato server
  // Queste vengono eseguite sul server e possono essere passate come props ai componenti
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider rende le traduzioni disponibili ai componenti client
    // Passa solo i namespace che i tuoi componenti client effettivamente usano
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### Passo 6: Usa le Traduzioni nei Componenti Client

I componenti client possono utilizzare gli hook `useTranslations` e `useFormatter` per accedere alle traduzioni e alle funzioni di formattazione. Questi hook leggono dal contesto `NextIntlClientProvider`.

I componenti client necessitano degli hook di React per accedere alle traduzioni. Gli hook `useTranslations` e `useFormatter` si integrano perfettamente con next-intl e forniscono aggiornamenti reattivi quando la locale cambia.

> Non dimenticare di aggiungere i namespace richiesti ai messaggi client della pagina (includi solo i namespace di cui i tuoi componenti client hanno effettivamente bisogno).

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponent = () => {
  // Ambito direttamente sull'oggetto annidato
  // useTranslations/useFormatter sono hook che leggono dal contesto NextIntlClientProvider
  // Funzionano solo se il componente è racchiuso in NextIntlClientProvider
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

### Passo 7: Usare le Traduzioni nei Componenti Server

I componenti server non possono usare React hooks, quindi ricevono traduzioni e formatter tramite props dai loro componenti genitori. Questo approccio mantiene i componenti server sincroni e permette loro di essere annidati all'interno di componenti client.

I componenti server che potrebbero essere nidificati all'interno di confini client devono essere sincroni. Passando stringhe tradotte e valori formattati come props, evitiamo operazioni asincrone e garantiamo un rendering corretto. Pre-calcola traduzioni e formattazioni nel componente pagina genitore.

```tsx fileName="src/components/ServerComponent.tsx"
// I componenti server nidificati all'interno di componenti client devono essere sincroni
// React non può serializzare funzioni async attraverso il confine server/client
// Soluzione: pre-calcolare traduzioni/formati nel genitore e passarli come props
type ServerComponentProps = {
  formattedCount: string; // conteggio formattato
  label: string; // etichetta
  increment: string; // incremento
};

const ServerComponent = ({
  formattedCount,
  label,
  increment,
}: ServerComponentProps) => {
  return (
    <div>
      <p>{formattedCount}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

> Nella tua pagina/layout, usa `getTranslations` e `getFormatter` da `next-intl/server` per pre-calcolare traduzioni e formattazioni, quindi passale come props ai componenti server.

---

### (Opzionale) Passo 8: Cambiare la lingua del tuo contenuto

Per cambiare la lingua del tuo contenuto con next-intl, rendi i link consapevoli della locale che puntano allo stesso pathname cambiando la locale. Il provider riscrive automaticamente gli URL, quindi devi solo indirizzare la rotta corrente.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n";

const getLocaleLabel = (locale: Locale): string => {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: "language" });
    return displayNames.of(locale) ?? locale.toUpperCase();
  } catch {
    return locale.toUpperCase();
  }
};

const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  es: "🇪🇸",
};

export default function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();

  // Rimuove il prefisso della lingua dal pathname per ottenere il percorso base
  const getBasePath = (path: string) => {
    for (const locale of locales) {
      if (path.startsWith(`/${locale}`)) {
        return path.slice(locale.length + 1) || "/";
      }
    }
    return path;
  };

  const basePath = getBasePath(pathname);

  return (
    <nav aria-label="Selettore della lingua">
      <div>
        {(locales as readonly Locale[]).map((locale) => {
          const isActive = locale === activeLocale;
          // Costruisci l'href in base al fatto che sia la lingua predefinita
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
              <span>{localeFlags[locale]}</span>
              <span>{getLocaleLabel(locale)}</span>
              <span>{locale.toUpperCase()}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

### (Opzionale) Passo 9: Usa il componente Link localizzato

`next-intl` fornisce un sottopacchetto `next-intl/navigation` che contiene un componente Link localizzato che applica automaticamente la locale attiva. Lo abbiamo già estratto per te nel file `@/i18n`, quindi puoi usarlo così:

```tsx fileName="src/components/MyComponent.tsx"
import { Link } from "@/i18n";

return <Link href="/about">t("about.title")</Link>;
```

### (Opzionale) Passo 10: Accedi alla locale attiva all'interno delle Server Actions

Le Server Actions possono leggere la locale corrente usando `next-intl/server`. Questo è utile per inviare email localizzate o memorizzare le preferenze linguistiche insieme ai dati inviati.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { getLocale } from "next-intl/server";

export async function getCurrentLocale() {
  return getLocale();
}

export async function handleContactForm(formData: FormData) {
  const locale = await getCurrentLocale();

  // Usa la locale per selezionare template, etichette di analytics, ecc.
  console.log(`Modulo di contatto ricevuto dalla locale ${locale}`);
}
```

> `getLocale` legge la locale impostata dal proxy di `next-intl`, quindi funziona ovunque sul server: Route Handlers, Server Actions e funzioni edge.

### (Opzionale) Passo 11: Internazionalizza i tuoi Metadata

Tradurre i contenuti è importante, ma l'obiettivo principale dell'internazionalizzazione è rendere il tuo sito web più visibile al mondo. L'i18n è una leva incredibile per migliorare la visibilità del tuo sito web attraverso una corretta SEO.

I metadata opportunamente internazionalizzati aiutano i motori di ricerca a capire quali lingue sono disponibili sulle tue pagine. Questo include l'impostazione dei meta tag hreflang, la traduzione di titoli e descrizioni, e l'assicurarsi che gli URL canonici siano correttamente impostati per ogni locale.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n";
import { getTranslations } from "next-intl/server";

// generateMetadata viene eseguito per ogni locale, generando metadata ottimizzati per la SEO
// Questo aiuta i motori di ricerca a comprendere le versioni alternative in altre lingue
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... Resto del codice della pagina
```

### (Opzionale) Passo 12: Internazionalizza la tua Sitemap

Genera una sitemap che includa tutte le versioni locali delle tue pagine. Questo aiuta i motori di ricerca a scoprire e indicizzare tutte le versioni linguistiche dei tuoi contenuti.

Una sitemap correttamente internazionalizzata assicura che i motori di ricerca possano trovare e indicizzare tutte le versioni linguistiche delle tue pagine. Questo migliora la visibilità nei risultati di ricerca internazionali.

```tsx fileName="src/app/sitemap.ts"
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

// Genera una sitemap con tutte le varianti locali per una migliore SEO
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

### (Opzionale) Passo 13: Internazionalizza il tuo robots.txt

Crea un file robots.txt che gestisca correttamente tutte le versioni locali delle tue rotte protette. Questo assicura che i motori di ricerca non indicizzino pagine di amministrazione o dashboard in nessuna lingua.

Configurare correttamente robots.txt per tutte le localizzazioni impedisce ai motori di ricerca di indicizzare pagine sensibili quando le tue rotte sono diverse per ogni locale.

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
// Genera i percorsi per tutte le localizzazioni (es. /admin, /fr/admin, /es/admin)
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

### (Opzionale) Passo 14: Configurare un Proxy per il Routing della Locale

Crea un proxy per rilevare automaticamente la locale preferita dall'utente e reindirizzarlo all'URL con il prefisso della locale appropriata. next-intl fornisce una funzione proxy comoda che gestisce questo automaticamente.

Il proxy garantisce che gli utenti vengano automaticamente reindirizzati alla loro lingua preferita quando visitano il tuo sito. Inoltre, salva la preferenza dell'utente per le visite future, migliorando l'esperienza utente.

```ts fileName="src/proxy.ts"
import { proxy } from "@/i18n";

// Il middleware viene eseguito prima delle route, gestendo il rilevamento della locale e il routing
// localeDetection: true utilizza l'header Accept-Language per rilevare automaticamente la locale
export default proxy;

export const config = {
  // Salta API, internals di Next e asset statici
  // Regex: corrisponde a tutte le route tranne quelle che iniziano con api, _next, o che contengono un punto (file)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### (Opzionale) Passo 15: Configurare i tipi TypeScript per la Locale

Configurare TypeScript ti aiuterà ad ottenere l'autocompletamento e la sicurezza dei tipi per le tue chiavi.

Per questo, puoi creare un file global.ts nella radice del tuo progetto e aggiungere il seguente codice:

```ts fileName="global.ts"
import type { locales } from "@/i18n";

type Messages = {
  common: typeof import("./locales/en/common.json");
  home: typeof import("./locales/en/home.json");
  about: typeof import("./locales/en/about.json");
  // ... Anche i futuri file JSON dovrebbero essere aggiunti qui
};

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: Messages;
  }
}
```

Questo codice utilizzerà l'Aumento del Modulo (Module Augmentation) per aggiungere le locales e i messaggi al tipo AppConfig di next-intl.

### (Opzionale) Passo 15: Automatizza le tue traduzioni usando Intlayer

Intlayer è una libreria **gratuita** e **open-source** progettata per assistere il processo di localizzazione nella tua applicazione. Mentre next-intl gestisce il caricamento e la gestione delle traduzioni, Intlayer aiuta ad automatizzare il flusso di lavoro delle traduzioni.

Gestire le traduzioni manualmente può richiedere molto tempo ed essere soggetto a errori. Intlayer automatizza il testing, la generazione e la gestione delle traduzioni, facendoti risparmiare tempo e garantendo coerenza in tutta la tua applicazione.

Intlayer ti permette di:

- **Dichiarare i tuoi contenuti dove vuoi nella tua codebase**  
  Intlayer consente di dichiarare i tuoi contenuti dove vuoi nella tua codebase utilizzando file `.content.{ts|js|json}`. Questo permette una migliore organizzazione dei contenuti, garantendo una maggiore leggibilità e manutenibilità della tua codebase.

- **Testare le traduzioni mancanti**  
  Intlayer fornisce funzioni di test che possono essere integrate nella tua pipeline CI/CD o nei tuoi test unitari. Scopri di più su [testare le tue traduzioni](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/testing.md).

- **Automatizza le tue traduzioni**,
  Intlayer fornisce una CLI e un'estensione per VSCode per automatizzare le tue traduzioni. Può essere integrato nella tua pipeline CI/CD. Scopri di più su [automatizzare le tue traduzioni](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md).
  Puoi usare la tua **chiave API personale e il provider AI di tua scelta**. Fornisce inoltre traduzioni contestuali, vedi [riempi contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/autoFill.md).

- **Connetti contenuti esterni**
  Intlayer ti permette di collegare i tuoi contenuti a un sistema di gestione dei contenuti esterno (CMS). Per recuperarli in modo ottimizzato e inserirli nelle tue risorse JSON. Scopri di più su [recupero di contenuti esterni](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/function_fetching.md).

- **Editor visuale**  
  Intlayer offre un editor visuale gratuito per modificare i tuoi contenuti utilizzando un editor visuale. Scopri di più su [modifica visuale delle tue traduzioni](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md).

E altro ancora. Per scoprire tutte le funzionalità offerte da Intlayer, consulta la [documentazione sull'interesse di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/interest_of_intlayer.md).
