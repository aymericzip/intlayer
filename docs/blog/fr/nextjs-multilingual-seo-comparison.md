---
createdAt: 2025-09-28
updatedAt: 2025-09-28
title: SEO et i18n dans Next.js
description: Apprenez à configurer le SEO multilingue dans votre application Next.js en utilisant next-intl, next-i18next et Intlayer.
keywords:
  - Intlayer
  - SEO
  - Internationalisation
  - Next.js
  - i18n
  - JavaScript
  - React
  - next-intl
  - next-i18next
slugs:
  - blog
  - seo
  - i18n
  - nextjs
---

# SEO et i18n dans Next.js : Traduire ne suffit pas

Lorsque les développeurs pensent à l'internationalisation (i18n), le premier réflexe est souvent : _traduire le contenu_. Mais on oublie généralement que l'objectif principal de l'internationalisation est de rendre votre site web plus visible dans le monde.
Si votre application Next.js multilingue n'indique pas aux moteurs de recherche comment explorer et comprendre vos différentes versions linguistiques, la plupart de vos efforts risquent de passer inaperçus.

Dans ce blog, nous allons explorer **pourquoi l'i18n est une superpuissance du SEO** et comment l'implémenter correctement dans Next.js avec `next-intl`, `next-i18next` et `Intlayer`.

---

## Pourquoi le SEO et l'i18n

Ajouter des langues ne concerne pas seulement l'expérience utilisateur (UX). C'est aussi un levier puissant pour la **visibilité organique**. Voici pourquoi :

1. **Meilleure découvrabilité :** Les moteurs de recherche indexent les versions localisées et les classent pour les utilisateurs recherchant dans leur langue maternelle.
2. **Éviter le contenu dupliqué :** Les balises canoniques et alternates appropriées indiquent aux crawlers quelle page appartient à quelle locale.
3. **Meilleure UX :** Les visiteurs arrivent immédiatement sur la bonne version de votre site.
4. **Avantage concurrentiel :** Peu de sites mettent en œuvre correctement le SEO multilingue, ce qui signifie que vous pouvez vous démarquer.

---

## Meilleures pratiques pour le SEO multilingue dans Next.js

Voici une liste de contrôle que toute application multilingue devrait mettre en œuvre :

- **Définir les balises méta `hreflang` dans `<head>`**  
  Aide Google à comprendre quelles versions existent pour chaque langue.

- **Lister toutes les pages traduites dans `sitemap.xml`**  
  Utilisez le schéma `xhtml` pour que les crawlers puissent facilement trouver les alternatives.

- **Exclure les routes privées/localisées dans `robots.txt`**  
  Par exemple, ne pas laisser `/dashboard`, `/fr/dashboard`, `/es/dashboard` être indexés.

- **Utiliser des liens localisés**  
  Exemple : `<a href="/fr/about">À propos</a>` au lieu de lier vers la version par défaut `/about`.

Ce sont des étapes simples — mais les ignorer peut vous coûter en visibilité.

---

## Exemples d'implémentation

Les développeurs oublient souvent de référencer correctement leurs pages selon les locales, voyons donc comment cela fonctionne en pratique avec différentes bibliothèques.

### **next-intl**

<Tabs>
  <TabItem label="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

// Fonction pour obtenir le chemin localisé selon la locale
function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  // Récupère les traductions pour la locale et le namespace "about"
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

// ... Reste du code de la page
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
      changeFrequency: "mensuel",
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

/** Préfixer le chemin avec la locale sauf si c'est la locale par défaut */
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/** Helper pour URL absolue */
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

  // Importer dynamiquement le fichier JSON correct
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
  return <h1>À propos</h1>;
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
      changeFrequency: "monthly", // fréquence de changement
      priority: 0.7, // priorité du sitemap
      alternates: { languages }, // langues alternatives
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
   * Génère un objet contenant toutes les URL pour chaque locale.
   *
   * Exemple :
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Retourne
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

// ... Reste du code de la page
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

> Intlayer fournit une fonction `getMultilingualUrls` pour générer des URLs multilingues pour votre sitemap.

  </TabItem>
</Tabs>

---

## Conclusion

Bien gérer l’i18n dans Next.js ne consiste pas seulement à traduire du texte, mais à s’assurer que les moteurs de recherche et les utilisateurs savent exactement quelle version de votre contenu afficher.
Configurer hreflang, les sitemaps et les règles robots est ce qui transforme les traductions en une véritable valeur SEO.

Alors que next-intl et next-i18next offrent des moyens solides pour mettre cela en place, ils nécessitent généralement beaucoup de configuration manuelle pour maintenir la cohérence entre les locales.

C’est là que Intlayer brille vraiment :

Il est livré avec des helpers intégrés comme getMultilingualUrls, rendant l’intégration de hreflang, sitemap et robots presque sans effort.

Les métadonnées restent centralisées au lieu d’être dispersées dans des fichiers JSON ou des utilitaires personnalisés.

Il est conçu pour Next.js dès le départ, vous passez donc moins de temps à déboguer la configuration et plus de temps à déployer.

Si votre objectif n’est pas seulement de traduire, mais de faire évoluer le SEO multilingue sans friction, Intlayer vous offre la configuration la plus propre et la plus pérenne.
