---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: Comment internationaliser votre application Next.js avec next-i18next
description: Configurez l'i18n avec next-i18next : meilleures pratiques et conseils SEO pour les applications Next.js multilingues, couvrant l'internationalisation, l'organisation du contenu et la configuration technique.
keywords:
  - next-i18next
  - i18next
  - Internationalization
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - nextjs-internationalization-using-next-i18next
applicationTemplate: https://github.com/aymericzip/next-i18next-template
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Version initiale
---

# Comment internationaliser votre application Next.js avec next-i18next en 2026

## Table des matières

<TOC/>

## Qu'est-ce que next-i18next ?

**next-i18next** est une solution d'internationalisation (i18n) populaire pour les applications Next.js. Alors que le package original `next-i18next` était conçu pour le Pages Router, ce guide vous montre comment implémenter i18next avec le moderne **App Router** en utilisant directement `i18next` et `react-i18next`.

Avec cette approche, vous pouvez :

- **Organiser les traductions** en utilisant des namespaces (par exemple, `common.json`, `about.json`) pour une meilleure gestion du contenu.
- **Charger les traductions efficacement** en ne chargeant que les namespaces nécessaires pour chaque page, réduisant ainsi la taille du bundle.
- **Supporter à la fois les composants serveur et client** avec une gestion appropriée du SSR et de l'hydratation.
- **Assurer le support TypeScript** avec une configuration locale et des clés de traduction typées en toute sécurité.
- **Optimiser pour le SEO** avec une internationalisation appropriée des métadonnées, sitemap et robots.txt.

> En alternative, vous pouvez également vous référer au [guide next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/i18n_using_next-intl.md), ou utiliser directement [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_16.md).

> Voir la comparaison dans [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/next-i18next_vs_next-intl_vs_intlayer.md).

## Pratiques à suivre

Avant de plonger dans l'implémentation, voici quelques pratiques que vous devriez suivre :

- **Définir les attributs HTML `lang` et `dir`**
- Dans votre layout, calculez `dir` en utilisant `getLocaleDirection(locale)` et définissez `<html lang={locale} dir={dir}>` pour une accessibilité et un SEO appropriés.
- **Séparer les messages par namespace**
  Organisez les fichiers JSON par locale et namespace (par exemple, `common.json`, `about.json`) pour ne charger que ce dont vous avez besoin.
- **Minimiser la charge côté client**
  Sur les pages, envoyez uniquement les namespaces nécessaires à `NextIntlClientProvider` (par exemple, `pick(messages, ['common', 'about'])`).
- **Préférer les pages statiques**
  Utilisez autant que possible des pages statiques pour de meilleures performances et un meilleur SEO.
- **I18n dans les composants serveur**
  Les composants serveur, comme les pages ou tous les composants non marqués comme `client`, sont statiques et peuvent être pré-rendus lors de la compilation. Nous devrons donc leur passer les fonctions de traduction en tant que props.
- **Configurer les types TypeScript**
- Pour vos locales, assurez la sécurité des types dans toute votre application.
- **Proxy pour la redirection**
  Utilisez un proxy pour gérer la détection de la locale et le routage, et rediriger l'utilisateur vers l'URL préfixée par la locale appropriée.
- **Internationalisation de vos métadonnées, sitemap, robots.txt**
  Internationalisez vos métadonnées, sitemap, robots.txt en utilisant la fonction `generateMetadata` fournie par Next.js afin d'assurer une meilleure découverte par les moteurs de recherche dans toutes les locales.
- **Localiser les liens**
  Localisez les liens en utilisant le composant `Link` pour rediriger l'utilisateur vers l'URL préfixée par la locale appropriée. Il est important d'assurer la découverte de vos pages dans toutes les locales.
- **Automatiser les tests et les traductions**
  Automatiser les tests et les traductions permet de gagner du temps dans la maintenance de votre application multilingue.

> Consultez notre documentation listant tout ce que vous devez savoir sur l'internationalisation et le SEO : [Internationalisation (i18n) avec next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/fr/internationalization_and_SEO.md).

---

## Guide étape par étape pour configurer i18next dans une application Next.js

<iframe
  src="https://stackblitz.com/github/aymericzip/next-i18next-template?embed=1&ctl=1&file=src/app/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Comment internationaliser votre application avec Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"

> Voir [Application Template](https://github.com/aymericzip/next-i18next-template) sur GitHub.

Voici la structure du projet que nous allons créer :

```bash
.
├── i18n.config.ts
└── src # Src est optionnel
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
    │       ├── (home) # / (Groupe de routes pour ne pas polluer toutes les pages avec les messages home)
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

### Étape 1 : Installer les dépendances

Installez les paquets nécessaires en utilisant npm :

```bash packageManager="npm"
npm install i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add i18next react-i18next i18next-resources-to-backend
```

- **i18next** : Le framework principal d'internationalisation qui gère le chargement et la gestion des traductions.
- **react-i18next** : Les bindings React pour i18next qui fournissent des hooks comme `useTranslation` pour les composants clients.
- **i18next-resources-to-backend** : Un plugin qui permet le chargement dynamique des fichiers de traduction, vous permettant de charger uniquement les namespaces dont vous avez besoin.

### Étape 2 : Configurez votre projet

Créez un fichier de configuration pour définir vos locales supportées, la locale par défaut, et des fonctions utilitaires pour la localisation des URLs. Ce fichier sert de source unique de vérité pour votre configuration i18n et garantit la sécurité des types dans toute votre application.

Centraliser la configuration des locales évite les incohérences et facilite l'ajout ou la suppression de locales à l'avenir. Les fonctions utilitaires assurent une génération cohérente des URLs pour le SEO et le routage.

```ts fileName="i18n.config.ts"
// Définir les locales supportées comme un tableau const pour la sécurité des types
// L'assertion 'as const' permet à TypeScript d'inférer des types littéraux au lieu de string[]
export const locales = ["en", "fr"] as const;

// Extraire le type Locale à partir du tableau locales
// Cela crée un type union : "en" | "fr"
export type Locale = (typeof locales)[number];

// Définir la locale par défaut utilisée lorsqu'aucune locale n'est spécifiée
export const defaultLocale: Locale = "en";

// Langues de droite à gauche nécessitant une gestion spéciale de la direction du texte
export const rtlLocales = ["ar", "he", "fa", "ur"] as const;

// Vérifie si une locale nécessite une direction de texte RTL (de droite à gauche)
// Utilisé pour des langues comme l'arabe, l'hébreu, le persan et l'ourdou
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

// Génère un chemin localisé pour une locale et un chemin donnés
// Les chemins de la locale par défaut n'ont pas de préfixe (ex. "/about" au lieu de "/en/about")
// Les autres locales sont préfixées (ex. "/fr/about")
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// URL de base pour les URLs absolues (utilisé dans les sitemaps, métadonnées, etc.)
const ORIGIN = "https://example.com";

// Génère une URL absolue avec le préfixe de la locale
// Utilisé pour les métadonnées SEO, sitemaps, et URLs canoniques
export function absoluteUrl(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}

// Utilisé pour définir le cookie de la locale dans le navigateur
export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 an
    "SameSite=Lax",
  ].join("; ");
}
```

### Étape 3 : Centraliser les espaces de noms de traduction

Créez une source unique de vérité pour chaque namespace que votre application expose. Réutiliser cette liste permet de garder le code serveur, client et les outils synchronisés et active une typage fort pour les helpers de traduction.

```ts fileName="src/i18n.namespaces.ts"
export const namespaces = ["common", "about"] as const;

export type Namespace = (typeof namespaces)[number];
```

### Étape 4 : Typage fort des clés de traduction avec TypeScript

Augmentez `i18next` pour pointer vers vos fichiers de langue canoniques (généralement en anglais). TypeScript en déduit alors les clés valides par namespace, ce qui permet de vérifier les appels à `t()` de bout en bout.

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

> Astuce : Stockez cette déclaration sous `src/types` (créez le dossier s'il n'existe pas). Next.js inclut déjà `src` dans `tsconfig.json`, donc l'augmentation est prise en compte automatiquement. Sinon, ajoutez ce qui suit dans votre fichier `tsconfig.json` :

```json5 fileName="tsconfig.json"
{
  "include": ["src/types/**/*.ts"],
}
```

Avec cela en place, vous pouvez compter sur l'autocomplétion et les vérifications à la compilation :

```tsx
import { useTranslation, type TFunction } from "react-i18next";

const { t } = useTranslation("about");

// OK, typé : t("counter.increment")
// ERREUR, erreur de compilation : t("doesNotExist")
export type AboutTranslator = TFunction<"about">;
```

### Étape 5 : Configurer l'initialisation i18n côté serveur

Créez une fonction d'initialisation côté serveur qui charge les traductions pour les composants serveur. Cette fonction crée une instance i18next distincte pour le rendu côté serveur, garantissant que les traductions sont chargées avant le rendu.

Les composants serveur ont besoin de leur propre instance i18next car ils s'exécutent dans un contexte différent des composants client. Le préchargement des traductions côté serveur évite un affichage fugace de contenu non traduit et améliore le SEO en s'assurant que les moteurs de recherche voient le contenu traduit.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces, type Namespace } from "@/i18n.namespaces";

// Configurer le chargement dynamique des ressources pour i18next
// Cette fonction importe dynamiquement les fichiers JSON de traduction en fonction de la locale et du namespace
// Exemple : locale="fr", namespace="about" -> importe "@/locales/fr/about.json"
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

const DEFAULT_NAMESPACES = [
  namespaces[0],
] as const satisfies readonly Namespace[];

/**
 * Initialiser une instance i18next pour le rendu côté serveur
 *
 * @returns Instance i18next initialisée prête pour une utilisation côté serveur
 */
export async function initI18next(
  locale: string,
  ns: readonly Namespace[] = DEFAULT_NAMESPACES
) {
  // Crée une nouvelle instance i18next (séparée de l'instance côté client)
  const i18n = createInstance();

  // Initialise avec l'intégration React et le chargeur backend
  await i18n
    .use(initReactI18next) // Active le support des hooks React
    .use(backend) // Active le chargement dynamique des ressources
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns, // Charge uniquement les namespaces spécifiés pour de meilleures performances
      defaultNS: "common", // Namespace par défaut lorsqu'aucun n'est spécifié
      interpolation: { escapeValue: false }, // N'échappe pas le HTML (React gère la protection XSS)
      react: { useSuspense: false }, // Désactive Suspense pour la compatibilité SSR
      returnNull: false, // Retourne une chaîne vide au lieu de null pour les clés manquantes
      initImmediate: false, // Différer l'initialisation jusqu'au chargement des ressources (SSR plus rapide)
    });
  return i18n;
}
```

### Étape 6 : Créer un Provider i18n côté client

Créez un provider composant client qui enveloppe votre application avec le contexte i18next. Ce provider reçoit des traductions préchargées depuis le serveur afin d'éviter un flash de contenu non traduit (FOUC) et d'éviter les requêtes en double.

Les composants client ont besoin de leur propre instance i18next qui s'exécute dans le navigateur. En acceptant des ressources préchargées depuis le serveur, nous assurons une hydratation fluide et évitons le flash de contenu. Le provider gère également dynamiquement les changements de locale et le chargement des namespaces.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance, type ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";

// Configurer le chargement dynamique des ressources côté client
// Même modèle que côté serveur, mais cette instance s'exécute dans le navigateur
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: readonly Namespace[];
  // Ressources préchargées depuis le serveur (évite le FOUC - Flash of Untranslated Content)
  // Format : { namespace : translationBundle }
  resources?: Record<Namespace, ResourceLanguage>;
  children: React.ReactNode;
};

/**
 * Fournisseur i18n côté client qui enveloppe l'application avec le contexte i18next
 * Reçoit les ressources préchargées depuis le serveur pour éviter de recharger les traductions
 */
export default function I18nProvider({
  locale,
  namespaces = [allNamespaces[0]] as const,
  resources,
  children,
}: Props) {
  // Crée une instance i18n une seule fois en utilisant l'initialiseur lazy de useState
  // Cela garantit que l'instance est créée une seule fois, pas à chaque rendu
  const [i18n] = useState(() => {
    const i18nInstance = createInstance();

    i18nInstance
      .use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        // Si des ressources sont fournies (depuis le serveur), les utiliser pour éviter un chargement côté client
        // Cela prévient le FOUC et améliore la performance du chargement initial
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        returnNull: false, // Empêche le retour de valeurs indéfinies
      });

    return i18nInstance;
  });

  // Met à jour la langue lorsque la prop locale change
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // Assure que tous les namespaces requis sont chargés côté client
  // Utilisation de join("|") comme dépendance pour comparer correctement les tableaux
  useEffect(() => {
    i18n.loadNamespaces(namespaces);
  }, [namespaces.join("|"), i18n]);

  // Fournir l'instance i18n à tous les composants enfants via le contexte React
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

### Étape 7 : Définir les routes dynamiques pour les locales

Configurez le routage dynamique pour les locales en créant un répertoire `[locale]` dans votre dossier app. Cela permet à Next.js de gérer le routage basé sur la locale où chaque locale devient un segment d'URL (par exemple, `/en/about`, `/fr/about`).

L'utilisation de routes dynamiques permet à Next.js de générer des pages statiques pour toutes les locales au moment de la compilation, améliorant ainsi les performances et le SEO. Le composant layout définit les attributs HTML `lang` et `dir` en fonction de la locale, ce qui est crucial pour l'accessibilité et la compréhension par les moteurs de recherche.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

// Désactiver les paramètres dynamiques - toutes les locales doivent être connues au moment de la compilation
// Cela garantit la génération statique pour toutes les routes de locales
export const dynamicParams = false;

/**
 * Génère des paramètres statiques pour toutes les locales au moment de la compilation
 * Next.js pré-rendra les pages pour chaque locale retournée ici
 * Exemple : [{ locale: "en" }, { locale: "fr" }]
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Composant de layout racine qui gère les attributs HTML spécifiques à la locale
 * Définit l'attribut lang et la direction du texte (ltr/rtl) en fonction de la locale
 */
export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // Valider la locale à partir des paramètres de l'URL
  // Si une locale invalide est fournie, revenir à la locale par défaut
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  // Déterminer la direction du texte en fonction de la locale
  // Les langues RTL comme l'arabe nécessitent dir="rtl" pour un rendu correct du texte
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

### Étape 8 : Créez vos fichiers de traduction

Créez des fichiers JSON pour chaque locale et namespace. Cette structure vous permet d'organiser les traductions de manière logique et de ne charger que ce dont vous avez besoin pour chaque page.

Organiser les traductions par namespace (par exemple, `common.json`, `about.json`) permet le découpage du code (code splitting) et réduit la taille du bundle. Vous ne chargez que les traductions nécessaires pour chaque page, ce qui améliore les performances.

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

```json fileName="src/locales/fr/home.json"
{
  "title": "Accueil",
  "description": "Description de la page d'accueil",
  "welcome": "Bienvenue",
  "greeting": "Bonjour le monde!",
  "aboutPage": "Page À propos",
  "documentation": "Documentation"
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

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter",
    "description": "Cliquez sur le bouton pour augmenter le compteur"
  }
}
```

### Étape 9 : Utiliser les traductions dans vos pages

Créez un composant de page qui initialise i18next côté serveur et transmet les traductions aux composants serveur et client. Cela garantit que les traductions sont chargées avant le rendu et évite les clignotements de contenu.

L'initialisation côté serveur charge les traductions avant que la page ne soit rendue, améliorant ainsi le SEO et évitant le FOUC (Flash Of Unstyled Content). En passant les ressources préchargées au fournisseur client, on évite les requêtes redondantes et on assure une hydratation fluide.

```tsx fileName="src/app/[locale]/about/index.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";
import type { ResourceLanguage } from "i18next";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

/**
 * Composant serveur de la page qui gère l'initialisation de i18n
 * Précharge les traductions côté serveur et les transmet aux composants clients
 */
export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  // Définir les namespaces de traduction nécessaires pour cette page
  // Réutiliser la liste centralisée pour la sécurité de type et l'autocomplétion
  const pageNamespaces = allNamespaces;

  // Initialiser i18next côté serveur avec les namespaces requis
  // Cela charge les fichiers JSON de traduction côté serveur
  const i18n = await initI18next(locale, pageNamespaces);

  // Obtenir une fonction de traduction fixe pour l'espace de noms "about"
  // getFixedT verrouille l'espace de noms, donc t("title") au lieu de t("about:title")
  const tAbout = i18n.getFixedT(locale, "about");

  // Extraire les bundles de traduction de l'instance i18n
  // Ces données sont passées à I18nProvider pour hydrater l'i18n côté client
  // Évite le FOUC (Flash of Untranslated Content) et empêche les requêtes en double
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

### Étape 10 : Utiliser les traductions dans les composants client

Les composants client peuvent utiliser le hook `useTranslation` pour accéder aux traductions. Ce hook fournit l'accès à la fonction de traduction ainsi qu'à l'instance i18n, ce qui vous permet de traduire du contenu et d'accéder aux informations de locale.

Les composants client ont besoin des hooks React pour accéder aux traductions. Le hook `useTranslation` s'intègre parfaitement avec i18next et offre des mises à jour réactives lorsque la locale change.

> Assurez-vous que la page/le provider inclut uniquement les namespaces dont vous avez besoin (par exemple, `about`).  
> Si vous utilisez React < 19, mémoïsez les formateurs lourds comme `Intl.NumberFormat`.

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Exemple de composant client utilisant les hooks React pour les traductions
 * Peut utiliser des hooks comme useState, useEffect et useTranslation
 */
const ClientComponent = () => {
  // Le hook useTranslation donne accès à la fonction de traduction et à l'instance i18n
  // Spécifie le namespace pour ne charger que les traductions du namespace "about"
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // Crée un formateur de nombres sensible à la locale
  // i18n.language fournit la locale actuelle (ex : "en", "fr")
  // Intl.NumberFormat formate les nombres selon les conventions de la locale
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Formater le nombre en utilisant le format spécifique à la locale */}
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

### Étape 11 : Utiliser les traductions dans les composants serveur

Les composants serveur ne peuvent pas utiliser les hooks React, ils reçoivent donc les traductions via les props de leurs composants parents. Cette approche maintient les composants serveur synchrones et permet de les imbriquer à l'intérieur des composants client.

Les composants serveur qui pourraient être imbriqués sous des frontières client doivent être synchrones. En passant les chaînes traduites et les informations de locale via les props, nous évitons les opérations asynchrones et assurons un rendu correct.

```tsx fileName="src/components/ServerComponent.tsx"
import type { TFunction } from "i18next";

type ServerComponentProps = {
  // Fonction de traduction passée depuis le composant serveur parent
  // Les composants serveur ne peuvent pas utiliser les hooks, donc les traductions arrivent via les props
  t: TFunction<"about">;
  locale: string;
  count: number;
};

/**
 * Exemple de composant serveur - reçoit les traductions via les props
 * Peut être imbriqué dans des composants client (composants serveur asynchrones)
 * Ne peut pas utiliser les hooks React, donc toutes les données doivent provenir des props ou d'opérations asynchrones
 */
const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  // Formater le nombre côté serveur en utilisant la locale
  // Cela s'exécute sur le serveur lors du SSR, améliorant le chargement initial de la page
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-5xl font-bold text-white m-0">{formatted}</p>
      {/* Utiliser la fonction de traduction passée en prop */}
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

### (Optionnel) Étape 12 : Changer la langue de votre contenu

Pour changer la langue de votre contenu dans Next.js, la méthode recommandée est d'utiliser des URLs préfixées par la locale et les liens Next.js. L'exemple ci-dessous lit la locale actuelle depuis la route, la supprime du pathname, et affiche un lien par locale disponible.

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
    <nav aria-label="Sélecteur de langue">
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

### (Optionnel) Étape 13 : Construire un composant Link localisé

Réutiliser les URLs localisées dans toute votre application permet de garder une navigation cohérente et optimisée pour le SEO. Enveloppez `next/link` dans un petit helper qui préfixe les routes internes avec la locale active tout en laissant les URLs externes intactes.

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

> Astuce : Comme `LocalizedLink` est un remplacement direct, migrez progressivement en échangeant les imports et en laissant le composant gérer les URLs spécifiques à la locale.

### (Optionnel) Étape 14 : Accéder à la locale active dans les Server Actions

Les Server Actions ont souvent besoin de la locale courante pour les emails, la journalisation ou les intégrations tierces. Combinez le cookie de locale défini par votre proxy avec l'en-tête `Accept-Language` en tant que solution de secours.

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

// Exemple d'une action serveur qui utilise la locale courante
export async function stuffFromServer(formData: FormData) {
  const locale = await getCurrentLocale();

  // Utiliser la locale pour des effets secondaires localisés (emails, CRM, etc.)
  console.log(`Stuff from server with locale ${locale}`);
}
```

> Parce que l'assistant s'appuie sur les cookies et les en-têtes de Next.js, il fonctionne dans les Route Handlers, les Server Actions, et d'autres contextes réservés au serveur.

### (Optionnel) Étape 15 : Internationalisez vos métadonnées

Traduire le contenu est important, mais l'objectif principal de l'internationalisation est de rendre votre site web plus visible dans le monde. L'i18n est un levier incroyable pour améliorer la visibilité de votre site via un SEO approprié.

Des métadonnées correctement internationalisées aident les moteurs de recherche à comprendre quelles langues sont disponibles sur vos pages. Cela inclut la mise en place des balises meta hreflang, la traduction des titres et descriptions, ainsi que la garantie que les URL canoniques sont correctement définies pour chaque locale.

Voici une liste de bonnes pratiques concernant le SEO multilingue :

- Définissez les balises meta hreflang dans la balise `<head>` pour aider les moteurs de recherche à comprendre quelles langues sont disponibles sur la page
- Listez toutes les traductions de pages dans le sitemap.xml en utilisant le schéma XML `http://www.w3.org/1999/xhtml`
- N'oubliez pas d'exclure les pages préfixées dans le fichier robots.txt (par exemple, `/dashboard`, `/fr/dashboard`, `/es/dashboard`)
- Utilisez un composant Link personnalisé pour rediriger vers la page la plus localisée (par exemple, en français `<a href="/fr/about">À propos</a>`)

Les développeurs oublient souvent de référencer correctement leurs pages selon les locales. Corrigeons cela :

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import {
  locales,
  defaultLocale,
  localizedPath,
  absoluteUrl,
} from "@/i18n.config";

/**
 * Génère les métadonnées SEO pour chaque version locale de la page
 * Cette fonction s'exécute pour chaque locale lors de la compilation
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Importer dynamiquement le fichier de traduction pour cette locale
  // Utilisé pour obtenir le titre et la description traduits pour les métadonnées
  const messages = (await import(`@/locales/${locale}/about.json`)).default;

  // Créer une correspondance hreflang pour toutes les locales
  // Aide les moteurs de recherche à comprendre les alternatives linguistiques
  // Format : { "en": "/about", "fr": "/fr/about" }
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      // URL canonique pour cette version locale
      canonical: absoluteUrl(locale, "/about"),
      // Alternatives linguistiques pour le SEO (balises hreflang)
      // "x-default" spécifie la version locale par défaut
      languages: {
        ...languages,
        "x-default": absoluteUrl(defaultLocale, "/about"),
      },
    },
  };
}

export default async function AboutPage() {
  return <h1>À propos</h1>;
}
```

### (Optionnel) Étape 16 : Internationalisez votre sitemap

Générez un sitemap qui inclut toutes les versions locales de vos pages. Cela aide les moteurs de recherche à découvrir et indexer toutes les versions linguistiques de votre contenu.

Un sitemap correctement internationalisé garantit que les moteurs de recherche peuvent trouver et indexer toutes les versions linguistiques de vos pages. Cela améliore la visibilité dans les résultats de recherche internationaux.

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * Obtenir une carte de toutes les locales et leurs chemins localisés
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

// Générer un sitemap avec toutes les variantes locales pour un meilleur SEO
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

### (Optionnel) Étape 17 : Internationalisez votre fichier robots.txt

Créez un fichier robots.txt qui gère correctement toutes les versions locales de vos routes protégées. Cela garantit que les moteurs de recherche n'indexent pas les pages d'administration ou de tableau de bord dans aucune langue.

Configurer correctement le fichier robots.txt pour toutes les locales empêche les moteurs de recherche d'indexer des pages sensibles dans n'importe quelle langue. Ceci est crucial pour la sécurité et la confidentialité.

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

// Génère les chemins pour toutes les locales (par exemple, /admin, /fr/admin, /es/admin)
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

### (Optionnel) Étape 18 : Configurer un Middleware pour le Routage des Locales

Créez un proxy pour détecter automatiquement la locale préférée de l'utilisateur et le rediriger vers l'URL préfixée par la locale appropriée. Cela améliore l'expérience utilisateur en affichant le contenu dans sa langue préférée.

Le middleware garantit que les utilisateurs sont automatiquement redirigés vers leur langue préférée lorsqu'ils visitent votre site. Il sauvegarde également la préférence de l'utilisateur dans un cookie pour les visites futures.

```ts fileName="src/proxy.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

// Expression régulière pour correspondre aux fichiers avec extensions (ex : .js, .css, .png)
// Utilisée pour exclure les ressources statiques du routage par locale
const PUBLIC_FILE = /\.[^/]+$/;

/**
 * Extraire la locale depuis l'en-tête Accept-Language
 * Gère les formats comme "fr-CA", "en-US", etc.
 * Reviens à la locale par défaut si la langue du navigateur n'est pas supportée
 */
const pickLocale = (accept: string | null) => {
  // Obtenir la première préférence de langue (ex : "fr-CA" depuis "fr-CA,en-US;q=0.9")
  const raw = accept?.split(",")[0] ?? defaultLocale;
  // Extraire le code de langue de base (ex : "fr" depuis "fr-CA")
  const base = raw.toLowerCase().split("-")[0];
  // Vérifier si cette locale est supportée, sinon utiliser la locale par défaut
  return (locales as readonly string[]).includes(base) ? base : defaultLocale;
};

/**
 * Proxy Next.js pour la détection et le routage des locales
 * S'exécute à chaque requête avant le rendu de la page
 * Redirige automatiquement vers les URLs préfixées par la locale si nécessaire
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorer le proxy pour les internes Next.js, les routes API et les fichiers statiques
  // Ceux-ci ne doivent pas être préfixés par une locale
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Vérifier si l'URL contient déjà un préfixe de locale
  // Exemple : "/fr/about" ou "/en" retournerait true
  const hasLocale = (locales as readonly string[]).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // S'il n'y a pas de préfixe de locale, détecter la locale et rediriger
  if (!hasLocale) {
    // Essayer d'obtenir la locale depuis le cookie en premier (préférence utilisateur)
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

    // Utiliser la locale du cookie si valide, sinon détecter depuis les en-têtes du navigateur
    const locale =
      cookieLocale && (locales as readonly string[]).includes(cookieLocale)
        ? cookieLocale
        : pickLocale(request.headers.get("accept-language"));

    // Cloner l'URL pour modifier le pathname
    const url = request.nextUrl.clone();
    // Ajouter le préfixe de locale au pathname
    // Gérer le chemin racine spécialement pour éviter un double slash
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

    // Créer une réponse de redirection et définir le cookie de langue
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", locale, { path: "/" });
    return res;
  }
}

export const config = {
  matcher: [
    // Correspond à tous les chemins sauf :
    // - Les routes API (/api/*)
    // - Les internals de Next.js (/_next/*)
    // - Les fichiers statiques (/static/*)
    // - Les fichiers avec extensions (.*\\..*)
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

### (Optionnel) Étape 19 : Automatisez vos traductions avec Intlayer

Intlayer est une bibliothèque **gratuite** et **open-source** conçue pour assister le processus de localisation dans votre application. Alors que i18next gère le chargement et la gestion des traductions, Intlayer aide à automatiser le flux de travail des traductions.

Gérer les traductions manuellement peut être chronophage et source d’erreurs. Intlayer automatise les tests, la génération et la gestion des traductions, vous faisant gagner du temps et assurant la cohérence dans toute votre application.

Intlayer vous permet de :

- **Déclarer votre contenu où vous le souhaitez dans votre base de code**  
  Intlayer permet de déclarer votre contenu où vous le souhaitez dans votre base de code en utilisant des fichiers `.content.{ts|js|json}`. Cela permettra une meilleure organisation de votre contenu, assurant une meilleure lisibilité et maintenabilité de votre base de code.

- **Tester les traductions manquantes**  
  Intlayer fournit des fonctions de test qui peuvent être intégrées dans votre pipeline CI/CD ou dans vos tests unitaires. En savoir plus sur [tester vos traductions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/testing.md).

- **Automatisez vos traductions**,
  Intlayer fournit une CLI et une extension VSCode pour automatiser vos traductions. Cela peut être intégré dans votre pipeline CI/CD. En savoir plus sur [l'automatisation de vos traductions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md).
  Vous pouvez utiliser votre **propre clé API, et le fournisseur d'IA de votre choix**. Il offre également des traductions contextuelles, voir [remplissage de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/autoFill.md).

- **Connecter du contenu externe**
- **Automatisez vos traductions**,  
  Intlayer fournit une CLI et une extension VSCode pour automatiser vos traductions. Cela peut être intégré dans votre pipeline CI/CD. En savoir plus sur [l'automatisation de vos traductions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md).  
  Vous pouvez utiliser votre **propre clé API et le fournisseur d'IA de votre choix**. Il propose également des traductions contextuelles, voir [remplissage automatique de contenu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/autoFill.md).

- **Connectez du contenu externe**  
  Intlayer vous permet de connecter votre contenu à un système de gestion de contenu externe (CMS). Pour le récupérer de manière optimisée et l'insérer dans vos ressources JSON. En savoir plus sur [la récupération de contenu externe](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/function_fetching.md).

- **Éditeur visuel**  
  Intlayer propose un éditeur visuel gratuit pour éditer votre contenu via un éditeur visuel. En savoir plus sur [l'édition visuelle de vos traductions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md).

Et plus encore. Pour découvrir toutes les fonctionnalités offertes par Intlayer, veuillez consulter la [documentation sur l'intérêt d'Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/interest_of_intlayer.md).
