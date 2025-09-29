---
createdAt: 2025-09-28
updatedAt: 2025-09-28
title: SEO e i18n in Next.js
description: Impara come configurare la SEO multilingue nella tua app Next.js usando next-intl, next-i18next e Intlayer.
keywords:
  - Intlayer
  - SEO
  - Internazionalizzazione
  - Next.js
  - i18n
  - JavaScript
  - React
  - next-intl
  - next-i18next
slugs:
  - blog
  - blog-seo-i18n-nextjs
---

# SEO e i18n in Next.js: Tradurre non basta

Quando gli sviluppatori pensano all'internazionalizzazione (i18n), il primo riflesso è spesso: _tradurre il contenuto_. Ma di solito si dimentica che l'obiettivo principale dell'internazionalizzazione è rendere il tuo sito web più visibile al mondo.
Se la tua app Next.js multilingue non indica ai motori di ricerca come eseguire la scansione e comprendere le diverse versioni linguistiche, la maggior parte del tuo impegno potrebbe passare inosservata.

In questo blog, esploreremo **perché l’i18n è un superpotere per la SEO** e come implementarla correttamente in Next.js con `next-intl`, `next-i18next` e `Intlayer`.

---

## Perché SEO e i18n

Aggiungere lingue non riguarda solo l’esperienza utente (UX). È anche una leva potente per la **visibilità organica**. Ecco perché:

1. **Migliore scoperta:** I motori di ricerca indicizzano le versioni localizzate e le posizionano per gli utenti che cercano nella loro lingua madre.
2. **Evitare contenuti duplicati:** I tag canonical e alternate corretti indicano ai crawler quale pagina appartiene a quale locale.
3. **Migliore UX:** I visitatori arrivano immediatamente alla versione giusta del tuo sito.
4. **Vantaggio competitivo:** Pochi siti implementano correttamente la SEO multilingue, il che significa che puoi distinguerti.

---

## Best practice per la SEO multilingue in Next.js

Ecco una checklist che ogni app multilingue dovrebbe implementare:

- **Imposta i meta tag `hreflang` nel `<head>`**  
  Aiuta Google a capire quali versioni esistono per ogni lingua.

- **Elenca tutte le pagine tradotte in `sitemap.xml`**  
  Usa lo schema `xhtml` in modo che i crawler possano trovare facilmente le versioni alternative.

- **Escludi le rotte private/localizzate in `robots.txt`**  
  Ad esempio, non permettere che `/dashboard`, `/fr/dashboard`, `/es/dashboard` vengano indicizzate.

- **Usa link localizzati**  
  Esempio: `<a href="/fr/about">À propos</a>` invece di collegarti alla versione predefinita `/about`.

Questi sono passaggi semplici — ma saltarli può costarti visibilità.

---

## Esempi di Implementazione

Gli sviluppatori spesso dimenticano di riferire correttamente le loro pagine tra le diverse localizzazioni, quindi vediamo come funziona in pratica con diverse librerie.

### **next-intl**

<Tabs>
  <TabItem label="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

// Funzione per ottenere il percorso localizzato
function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  // Ottieni le traduzioni per il namespace "about"
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, url)])
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

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "mensile",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales.filter((l) => l !== defaultLocale).map((l) => `/${l}${path}`),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### **next-i18next**

  </TabItem>
  <TabItem label="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Prefisso del percorso con la locale a meno che non sia la locale predefinita */
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/** Helper per URL assoluti */
const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Importa dinamicamente il file JSON corretto
  const messages = (await import(`@/../public/locales/${locale}/about.json`))
    .default;

  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>Informazioni</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((l) => [l, abs(l, "/about")])
  );
  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((l) => l !== defaultLocale)
    .map((l) => localizedPath(l, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: `${ORIGIN}/sitemap.xml`,
  };
}
```

### **Intlayer**

  </TabItem>
  <TabItem label="intlayer">

````typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Genera un oggetto contenente tutti gli URL per ogni lingua.
   *
   * Esempio:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Restituisce
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... Resto del codice della pagina
````

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// Funzione per ottenere tutti gli URL multilingue da un array di URL
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]), // Blocca l'accesso a tutte le versioni multilingue di /dashboard
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Intlayer fornisce una funzione `getMultilingualUrls` per generare URL multilingue per la tua sitemap.

  </TabItem>
</Tabs>

---

## Conclusione

Gestire correttamente l'i18n in Next.js non significa solo tradurre il testo, ma assicurarsi che i motori di ricerca e gli utenti sappiano esattamente quale versione del tuo contenuto mostrare.
Configurare hreflang, sitemap e regole per i robots è ciò che trasforma le traduzioni in un vero valore SEO.

Mentre next-intl e next-i18next offrono modi solidi per collegare tutto questo, di solito richiedono molta configurazione manuale per mantenere la coerenza tra le diverse localizzazioni.

È qui che Intlayer brilla davvero:

Include helper integrati come getMultilingualUrls, rendendo quasi senza sforzo l'integrazione di hreflang, sitemap e robots.

I metadata rimangono centralizzati invece di essere sparsi tra file JSON o utility personalizzate.

È progettato per Next.js fin dalle fondamenta, così trascorri meno tempo a fare debug della configurazione e più tempo a rilasciare.

Se il tuo obiettivo non è solo tradurre ma scalare la SEO multilingue senza attriti, Intlayer ti offre la configurazione più pulita e a prova di futuro.
