---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: Comment internationaliser votre application Next.js avec next-intl
description: Configurez l'i18n avec next-intl : meilleures pratiques et conseils SEO pour les applications Next.js multilingues, couvrant l'internationalisation, l'organisation du contenu et la configuration technique.
keywords:
  - next-intl
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - nextjs-internationalization-using-next-intl
applicationTemplate: https://github.com/aymericzip/next-intl-template
history:
  - version: 7.0.0
    date: 2025-11-01
    changes: Version initiale
---

# Comment internationaliser votre application Next.js avec next-intl en 2026

## Table des matières

<TOC/>

## Qu'est-ce que next-intl ?

**next-intl** est une bibliothèque d'internationalisation (i18n) populaire conçue spécifiquement pour le App Router de Next.js. Elle offre un moyen fluide de créer des applications Next.js multilingues avec un excellent support TypeScript et des optimisations intégrées.

> Si vous préférez, vous pouvez également consulter le [guide next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_next-i18next.md), ou utiliser directement [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_next-intl.md).

> Voir la comparaison dans [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/next-i18next_vs_next-intl_vs_intlayer.md).

## Pratiques à suivre

Avant de plonger dans l’implémentation, voici quelques bonnes pratiques à suivre :

- **Définir les attributs HTML `lang` et `dir`**  
  Dans votre layout, calculez `dir` en utilisant `getLocaleDirection(locale)` et définissez `<html lang={locale} dir={dir}>` pour une accessibilité et un SEO appropriés.
- **Séparer les messages par namespace**  
  Organisez les fichiers JSON par locale et namespace (par exemple, `common.json`, `about.json`) afin de ne charger que ce dont vous avez besoin.
- **Minimiser la charge côté client**  
  Sur les pages, envoyez uniquement les namespaces nécessaires à `NextIntlClientProvider` (par exemple, `pick(messages, ['common', 'about'])`).
- **Préférer les pages statiques**  
  Utilisez autant que possible des pages statiques pour de meilleures performances et un meilleur SEO.
- **I18n dans les composants serveur**  
  Les composants serveur, comme les pages ou tous les composants non marqués comme `client`, sont statiques et peuvent être pré-rendus lors de la compilation. Nous devrons donc leur passer les fonctions de traduction en tant que props.
- **Configurer les types TypeScript**  
  Pour vos locales afin d’assurer la sécurité des types dans toute votre application.
- **Proxy pour la redirection**  
  Utilisez un proxy pour gérer la détection de la locale et le routage, et rediriger l’utilisateur vers l’URL préfixée par la locale appropriée.
- **Internationalisation de vos métadonnées, sitemap, robots.txt**  
  Internationalisez vos métadonnées, sitemap, robots.txt en utilisant la fonction `generateMetadata` fournie par Next.js pour garantir une meilleure découverte par les moteurs de recherche dans toutes les locales.
- **Localiser les liens**

Localisez les liens en utilisant le composant `Link` pour rediriger l’utilisateur vers l’URL préfixée par la locale appropriée. Il est important d’assurer la découverte de vos pages dans toutes les locales.

- **Automatisez les tests et les traductions**  
  L’automatisation des tests et des traductions permet de gagner du temps dans la maintenance de votre application multilingue.

> Consultez notre documentation listant tout ce que vous devez savoir sur l’internationalisation et le SEO : [Internationalization (i18n) with next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/internationalization_and_SEO.md).

---

## Guide étape par étape pour configurer next-intl dans une application Next.js

<iframe
  src="https://stackblitz.com/github/aymericzip/next-intl-template?embed=1&ctl=1&file=src/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Démo CodeSandbox - Comment internationaliser votre application avec Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"

> Voir le [Modèle d’Application](https://github.com/aymericzip/next-intl-template) sur GitHub.

Voici la structure du projet que nous allons créer :

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
└── src # Src est optionnel
    ├── proxy.ts
    ├── app
    │   ├── i18n.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (Groupe de routes pour ne pas polluer toutes les pages avec les ressources de la page d'accueil)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### Étape 1 : Installer les dépendances

Installez les paquets nécessaires en utilisant npm :

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

- **next-intl** : La bibliothèque principale d'internationalisation pour Next.js App Router qui fournit des hooks, des fonctions serveur et des providers client pour gérer les traductions.

### Étape 2 : Configurer votre projet

Créez un fichier de configuration qui définit vos locales supportées et configure la gestion des requêtes de next-intl. Ce fichier sert de source unique de vérité pour votre configuration i18n et garantit la sécurité des types dans toute votre application.

Centraliser la configuration des locales évite les incohérences et facilite l'ajout ou la suppression de locales à l'avenir. La fonction `getRequestConfig` s'exécute à chaque requête et charge uniquement les traductions nécessaires pour chaque page, permettant ainsi le découpage du code (code-splitting) et réduisant la taille du bundle.

```tsx fileName="src/i18n.ts"
import { notFound } from "next/navigation";
import createMiddleware from "next-intl/middleware";
import { createNavigation } from "next-intl/navigation";

// Définir les locales supportées avec sécurité des types
export const locales = ["en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isRTL(locale: Locale | (string & {})) {
  // Vérifie si la locale est une langue s'écrivant de droite à gauche
  return /^(ar|fa|he|iw|ur|ps|sd|ug|yi|ckb|ku)(-|$)/i.test(locale);
}

// Charge dynamiquement les messages par locale pour permettre le découpage du code
// Promise.all charge les namespaces en parallèle pour de meilleures performances
async function loadMessages(locale: Locale) {
  // Charge uniquement les namespaces nécessaires à votre layout/pages
  const [common, home, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/home.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
    // ... Les futurs fichiers JSON doivent être ajoutés ici
  ]);

  return { common, home, about } as const;
}

// Assistant pour générer des URLs localisées (exemple : /about vs /fr/about)
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// getRequestConfig s'exécute à chaque requête et fournit les messages aux composants serveur
// C'est ici que next-intl s'intègre au rendu côté serveur de Next.js
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
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 an
    "SameSite=Lax",
  ].join("; ");
}

const routingOptions = {
  locales,
  defaultLocale,
  localePrefix: "as-needed", // Modifier la route /en/... en /...
  // Optionnel : chemins localisés
  // pathnames: {
  //   '/': '/',
  //   '/about': {en: '/about', fr: '/a-propos', es: '/acerca-de'},
  //   '/blog/[slug]': '/blog/[slug]'
  // }
  //  localeDetection: true, // empêcher les redirections "/" -> "/en" basées sur le cookie
} as const;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routingOptions);

export const proxy = createMiddleware(routingOptions);
```

### Étape 3 : Définir les routes dynamiques par locale

Configurez le routage dynamique pour les locales en créant un répertoire `[locale]` dans votre dossier app. Cela permet à Next.js de gérer le routage basé sur la locale où chaque locale devient un segment de l'URL (par exemple, `/en/about`, `/fr/about`).

L'utilisation de routes dynamiques permet à Next.js de générer des pages statiques pour toutes les locales lors de la compilation, améliorant ainsi les performances et le SEO. Le composant layout définit les attributs HTML `lang` et `dir` en fonction de la locale, ce qui est crucial pour l'accessibilité et la compréhension par les moteurs de recherche.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import { getLocaleDirection, setRequestLocale } from "next-intl/server";

// Pré-générer les pages statiques pour toutes les locales lors de la compilation (SSG)
// Cela améliore les performances et le SEO
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
  // Dans Next.js App Router, params est une Promise (peut être awaitée)
  // Cela permet de résoudre les segments de route dynamiques de manière asynchrone
  const { locale } = await params;

  // Critique : setRequestLocale indique à next-intl quelle locale utiliser pour cette requête
  // Sans cela, getTranslations() ne saura pas quelle locale utiliser dans les composants serveur
  setRequestLocale(locale);

  // Obtenir la direction du texte (LTR/RTL) pour un rendu HTML correct
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

  // Les messages sont chargés côté serveur. Envoyez uniquement ce qui est nécessaire au client.
  // Cela minimise le bundle JavaScript envoyé au navigateur
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Traductions/formatage strictement côté serveur
  // Ces fonctions s'exécutent côté serveur et peuvent être passées en props aux composants
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider rend les traductions disponibles aux composants clients
    // Ne passez que les namespaces que vos composants clients utilisent réellement
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

### Étape 4 : Créez vos fichiers de traduction

Créez des fichiers JSON pour chaque locale et namespace. Cette structure vous permet d’organiser les traductions de manière logique et de ne charger que ce dont vous avez besoin pour chaque page.

Organiser les traductions par namespace (par exemple, `common.json`, `about.json`) permet le découpage du code (code splitting) et réduit la taille du bundle. Vous ne chargez que les traductions nécessaires pour chaque page, ce qui améliore les performances.

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

### Étape 5 : Utiliser les traductions dans vos pages

Créez un composant de page qui charge les traductions côté serveur et les transmet aux composants serveur et client. Cela garantit que les traductions sont chargées avant le rendu et évite les clignotements de contenu.

Le chargement des traductions côté serveur améliore le SEO et empêche le FOUC (Flash of Untranslated Content). En utilisant `pick` pour envoyer uniquement les namespaces nécessaires au fournisseur client, nous minimisons la taille du bundle JavaScript envoyé au navigateur.

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

  // Les messages sont chargés côté serveur. Envoyez uniquement ce qui est nécessaire au client.
  // Cela minimise le bundle JavaScript envoyé au navigateur
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Traductions/formatage strictement côté serveur
  // Ceux-ci s'exécutent sur le serveur et peuvent être passés en props aux composants
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider rend les traductions disponibles pour les composants client
    // Ne passez que les namespaces réellement utilisés par vos composants client
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

### Étape 6 : Utiliser les traductions dans les composants client

Les composants client peuvent utiliser les hooks `useTranslations` et `useFormatter` pour accéder aux traductions et aux fonctions de formatage. Ces hooks lisent le contexte de `NextIntlClientProvider`.

Les composants client ont besoin des hooks React pour accéder aux traductions. Les hooks `useTranslations` et `useFormatter` s'intègrent parfaitement avec next-intl et fournissent des mises à jour réactives lorsque la locale change.

> N'oubliez pas d'ajouter les namespaces requis aux messages client de la page (incluez uniquement les namespaces dont vos composants client ont réellement besoin).

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponent = () => {
  // Se concentrer directement sur l'objet imbriqué
  // useTranslations/useFormatter sont des hooks qui lisent depuis le contexte NextIntlClientProvider
  // Ils ne fonctionnent que si le composant est enveloppé dans NextIntlClientProvider
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

### Étape 7 : Utiliser les traductions dans les composants serveur

Les composants serveur ne peuvent pas utiliser les hooks React, ils reçoivent donc les traductions et les formateurs via des props de leurs composants parents. Cette approche maintient les composants serveur synchrones et leur permet d’être imbriqués à l’intérieur des composants client.

Les composants serveur qui pourraient être imbriqués sous des frontières client doivent être synchrones. En passant des chaînes traduites et des valeurs formatées en tant que props, nous évitons les opérations asynchrones et assurons un rendu correct. Pré-calculer les traductions et le formatage dans le composant parent de la page.

```tsx fileName="src/components/ServerComponent.tsx"
// Les composants serveur imbriqués dans des composants client doivent être synchrones
// React ne peut pas sérialiser les fonctions asynchrones à travers la frontière serveur/client
// Solution : pré-calculer les traductions/formatages dans le parent et les passer en props
type ServerComponentProps = {
  formattedCount: string;
  label: string;
  increment: string;
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

> Dans votre page/layout, utilisez `getTranslations` et `getFormatter` depuis `next-intl/server` pour pré-calculer les traductions et le formatage, puis passez-les en props aux composants serveur.

---

### (Optionnel) Étape 8 : Changer la langue de votre contenu

Pour changer la langue de votre contenu avec next-intl, affichez des liens sensibles à la locale qui pointent vers le même chemin tout en changeant la locale. Le provider réécrit automatiquement les URLs, vous n'avez donc qu'à cibler la route actuelle.

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

  // Supprime le préfixe de locale du chemin pour obtenir le chemin de base
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
    <nav aria-label="Sélecteur de langue">
      <div>
        {(locales as readonly Locale[]).map((locale) => {
          const isActive = locale === activeLocale;
          // Construire le href selon que c'est la locale par défaut ou non
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

### (Optionnel) Étape 9 : Utiliser le composant Link localisé

`next-intl` fournit un sous-package `next-intl/navigation` qui contient un composant Link localisé appliquant automatiquement la locale active. Nous l'avons déjà extrait pour vous dans le fichier `@/i18n`, vous pouvez donc l'utiliser ainsi :

```tsx fileName="src/components/MyComponent.tsx"
import { Link } from "@/i18n";

return <Link href="/about">t("about.title")</Link>;
```

### (Optionnel) Étape 10 : Accéder à la locale active dans les Server Actions

Les Server Actions peuvent lire la locale courante en utilisant `next-intl/server`. Cela est utile pour envoyer des emails localisés ou stocker les préférences de langue avec les données soumises.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { getLocale } from "next-intl/server";

export async function getCurrentLocale() {
  return getLocale();
}

export async function handleContactForm(formData: FormData) {
  const locale = await getCurrentLocale();

  // Utilisez la locale pour sélectionner les modèles, les étiquettes d'analyse, etc.
  console.log(`Formulaire de contact reçu depuis la locale ${locale}`);
}
```

> `getLocale` lit la locale définie par le proxy `next-intl`, donc cela fonctionne partout sur le serveur : Route Handlers, Server Actions et fonctions edge.

### (Optionnel) Étape 11 : Internationalisez vos métadonnées

La traduction du contenu est importante, mais l'objectif principal de l'internationalisation est de rendre votre site web plus visible dans le monde. L'i18n est un levier incroyable pour améliorer la visibilité de votre site grâce à un SEO approprié.

Les métadonnées correctement internationalisées aident les moteurs de recherche à comprendre quelles langues sont disponibles sur vos pages. Cela inclut la définition des balises meta hreflang, la traduction des titres et descriptions, et la garantie que les URLs canoniques sont correctement définies pour chaque locale.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n";
import { getTranslations } from "next-intl/server";

// generateMetadata s'exécute pour chaque locale, générant des métadonnées optimisées pour le SEO
/// Cela aide les moteurs de recherche à comprendre les versions alternatives des langues
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

// ... Reste du code de la page
```

### (Optionnel) Étape 12 : Internationalisez votre Sitemap

Générez un sitemap qui inclut toutes les versions locales de vos pages. Cela aide les moteurs de recherche à découvrir et indexer toutes les versions linguistiques de votre contenu.

Un sitemap correctement internationalisé garantit que les moteurs de recherche peuvent trouver et indexer toutes les versions linguistiques de vos pages. Cela améliore la visibilité dans les résultats de recherche internationaux.

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * Obtenir une map de toutes les locales et leurs chemins localisés
 *
 * Exemple de sortie :
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

// Générer un sitemap avec toutes les variantes de locale pour un meilleur SEO
// Le champ alternates informe les moteurs de recherche des versions linguistiques
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

### (Optionnel) Étape 13 : Internationalisez votre fichier robots.txt

Créez un fichier robots.txt qui gère correctement toutes les versions locales de vos routes protégées. Cela garantit que les moteurs de recherche n'indexent pas les pages d'administration ou de tableau de bord dans aucune langue.

Configurer correctement le fichier robots.txt pour toutes les locales empêche les moteurs de recherche d'indexer des pages sensibles lorsque vos routes diffèrent selon la locale.

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
// Génère les chemins pour toutes les locales (par exemple, /admin, /fr/admin, /es/admin)
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

### (Optionnel) Étape 14 : Configurer un proxy pour le routage des locales

Créez un proxy pour détecter automatiquement la locale préférée de l'utilisateur et le rediriger vers l'URL préfixée par la locale appropriée. next-intl fournit une fonction proxy pratique qui gère cela automatiquement.

Le proxy garantit que les utilisateurs sont automatiquement redirigés vers leur langue préférée lorsqu'ils visitent votre site. Il sauvegarde également la préférence de l'utilisateur pour les visites futures, améliorant ainsi l'expérience utilisateur.

```ts fileName="src/proxy.ts"
import { proxy } from "@/i18n";

// Le middleware s'exécute avant les routes, gérant la détection de la locale et le routage
// localeDetection : true utilise l'en-tête Accept-Language pour détecter automatiquement la locale
export default proxy;

export const config = {
  // Ignorer l'API, les internes de Next et les ressources statiques
  // Regex : correspond à toutes les routes sauf celles commençant par api, _next, ou contenant un point (fichiers)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### (Optionnel) Étape 15 : Configurer les types TypeScript pour la locale

Configurer TypeScript vous aidera à bénéficier de l'autocomplétion et de la sécurité de type pour vos clés.

Pour cela, vous pouvez créer un fichier global.ts à la racine de votre projet et y ajouter le code suivant :

```ts fileName="global.ts"
import type { locales } from "@/i18n";

type Messages = {
  common: typeof import("./locales/en/common.json");
  home: typeof import("./locales/en/home.json");
  about: typeof import("./locales/en/about.json");
  // ... Les futurs fichiers JSON devront également être ajoutés ici
};

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: Messages;
  }
}
```

Ce code utilise l'augmentation de module pour ajouter les locales et les messages au type AppConfig de next-intl.

### (Optionnel) Étape 15 : Automatisez vos traductions avec Intlayer

Intlayer est une bibliothèque **gratuite** et **open-source** conçue pour assister le processus de localisation dans votre application. Alors que next-intl gère le chargement et la gestion des traductions, Intlayer aide à automatiser le flux de travail des traductions.

Gérer les traductions manuellement peut être chronophage et sujet à erreurs. Intlayer automatise les tests, la génération et la gestion des traductions, vous faisant gagner du temps et assurant la cohérence dans toute votre application.

Intlayer vous permet de :

- **Déclarer votre contenu où vous le souhaitez dans votre base de code**  
  Intlayer permet de déclarer votre contenu où vous le souhaitez dans votre base de code en utilisant des fichiers `.content.{ts|js|json}`. Cela permettra une meilleure organisation de votre contenu, assurant une meilleure lisibilité et maintenabilité de votre base de code.

- **Tester les traductions manquantes**
  Intlayer fournit des fonctions de test qui peuvent être intégrées dans votre pipeline CI/CD ou dans vos tests unitaires. En savoir plus sur [tester vos traductions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/testing.md).

- **Automatisez vos traductions**,
  Intlayer propose une CLI et une extension VSCode pour automatiser vos traductions. Cela peut être intégré dans votre pipeline CI/CD. En savoir plus sur [l'automatisation de vos traductions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/cli/index.md).
  Vous pouvez utiliser votre **propre clé API et le fournisseur d'IA de votre choix**. Il offre également des traductions contextuelles, voir [remplir le contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/autoFill.md).

- **Connecter du contenu externe**
  Intlayer vous permet de connecter votre contenu à un système de gestion de contenu externe (CMS). Pour le récupérer de manière optimisée et l’insérer dans vos ressources JSON. En savoir plus sur [la récupération de contenu externe](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/function_fetching.md).

- **Éditeur visuel**  
  Intlayer propose un éditeur visuel gratuit pour modifier votre contenu via une interface visuelle. En savoir plus sur [l’édition visuelle de vos traductions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md).

Et plus encore. Pour découvrir toutes les fonctionnalités offertes par Intlayer, veuillez consulter la [documentation sur l’intérêt d’Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md).
