---
createdAt: 2025-09-28
updatedAt: 2025-09-28
title: SEO und i18n in Next.js
description: Erfahren Sie, wie Sie mehrsprachiges SEO in Ihrer Next.js-App mit next-intl, next-i18next und Intlayer einrichten.
keywords:
  - Intlayer
  - SEO
  - Internationalisierung
  - Next.js
  - i18n
  - JavaScript
  - React
  - next-intl
  - next-i18next
slugs:
  - seo
  - i18n
  - nextjs
---

# SEO und i18n in Next.js: Übersetzen allein reicht nicht aus

Wenn Entwickler an Internationalisierung (i18n) denken, ist der erste Reflex oft: _den Inhalt übersetzen_. Aber oft wird vergessen, dass das Hauptziel der Internationalisierung darin besteht, Ihre Website für die Welt sichtbarer zu machen.
Wenn Ihre mehrsprachige Next.js-App Suchmaschinen nicht mitteilt, wie sie Ihre verschiedenen Sprachversionen crawlen und verstehen sollen, kann ein Großteil Ihrer Mühe unbemerkt bleiben.

In diesem Blog werden wir untersuchen, **warum i18n eine SEO-Superkraft ist** und wie man es in Next.js mit `next-intl`, `next-i18next` und `Intlayer` korrekt implementiert.

---

## Warum SEO und i18n

Sprachen hinzuzufügen bedeutet nicht nur bessere Benutzererfahrung (UX). Es ist auch ein mächtiger Hebel für **organische Sichtbarkeit**. Hier ist der Grund:

1. **Bessere Auffindbarkeit:** Suchmaschinen indexieren lokalisierte Versionen und ranken sie für Nutzer, die in ihrer Muttersprache suchen.
2. **Vermeidung von doppeltem Inhalt:** Korrekte Canonical- und Alternate-Tags informieren Crawler darüber, welche Seite zu welcher Sprachversion gehört.
3. **Bessere UX:** Besucher landen sofort auf der richtigen Version Ihrer Website.
4. **Wettbewerbsvorteil:** Nur wenige Websites setzen mehrsprachiges SEO gut um, was bedeutet, dass Sie sich abheben können.

---

## Best Practices für mehrsprachiges SEO in Next.js

Hier ist eine Checkliste, die jede mehrsprachige App umsetzen sollte:

- **Setzen Sie `hreflang` Meta-Tags im `<head>`**  
  Hilft Google zu verstehen, welche Versionen für jede Sprache existieren.

- **Listen Sie alle übersetzten Seiten in der `sitemap.xml` auf**  
  Verwenden Sie das `xhtml`-Schema, damit Crawler Alternativen leicht finden können.

- **Schließen Sie private/lokalisierte Routen in der `robots.txt` aus**  
  z.B. sollten `/dashboard`, `/fr/dashboard`, `/es/dashboard` nicht indexiert werden.

- **Verwenden Sie lokalisierte Links**  
  Beispiel: `<a href="/fr/about">À propos</a>` anstelle eines Links zur Standardseite `/about`.

Dies sind einfache Schritte – aber das Überspringen kann Sie Sichtbarkeit kosten.

---

## Implementierungsbeispiele

Entwickler vergessen oft, ihre Seiten über verschiedene Sprachversionen hinweg korrekt zu referenzieren. Schauen wir uns daher an, wie dies in der Praxis mit verschiedenen Bibliotheken funktioniert.

### **next-intl**

<Tabs>
  <TabItem label="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

// Funktion zur Lokalisierung des Pfads basierend auf der Sprache
function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
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

// ... Rest des Seiten-Codes
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
      changeFrequency: "monatlich", // Häufigkeit der Änderung
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

/** Pfad mit Locale voranstellen, außer es ist die Standard-Locale */
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/** Absolute URL-Hilfe */
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

  // Dynamisch die korrekte JSON-Datei importieren
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
  return <h1>Über</h1>;
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
      changeFrequency: "monatlich", // Häufigkeit der Änderung
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
   * Generiert ein Objekt, das alle URLs für jede Locale enthält.
   *
   * Beispiel:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Gibt zurück
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

// ... Rest des Seiten-Codes
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

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Intlayer stellt eine Funktion `getMultilingualUrls` zur Verfügung, um mehrsprachige URLs für Ihre Sitemap zu generieren.

  </TabItem>
</Tabs>

---

## Fazit

i18n in Next.js richtig umzusetzen bedeutet nicht nur, Texte zu übersetzen, sondern sicherzustellen, dass Suchmaschinen und Nutzer genau wissen, welche Version Ihrer Inhalte angezeigt werden soll.
Die Einrichtung von hreflang, Sitemaps und Robots-Regeln verwandelt Übersetzungen in echten SEO-Wert.

Während next-intl und next-i18next solide Möglichkeiten bieten, dies zu realisieren, erfordern sie meist viel manuelle Einrichtung, um die Konsistenz über verschiedene Sprachen hinweg zu gewährleisten.

Hier zeigt Intlayer seine Stärken:

Es bietet integrierte Helfer wie getMultilingualUrls, die die Integration von hreflang, Sitemap und Robots nahezu mühelos machen.

Metadaten bleiben zentralisiert, anstatt über JSON-Dateien oder benutzerdefinierte Hilfsprogramme verstreut zu sein.

Es ist von Grund auf für Next.js konzipiert, sodass Sie weniger Zeit mit der Fehlerbehebung der Konfiguration verbringen und mehr Zeit mit der Auslieferung.

Wenn Ihr Ziel nicht nur die Übersetzung, sondern die reibungslose Skalierung von mehrsprachigem SEO ist, bietet Intlayer Ihnen die sauberste und zukunftssicherste Lösung.
