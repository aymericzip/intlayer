---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "next-intl vs Intlayer: Benchmark et Comparaison 2026"
description: Taille du bundle, fuite de contenu, réactivité du changement de locale et expérience développeur mesurés sur Next.js et TanStack Start. Quelle bibliothèque i18n devriez-vous choisir en 2026 ?
keywords:
  - next-intl
  - use-intl
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - next-intl-vs-intlayer
author: aymericzip
---

# next-intl VS Intlayer | Benchmark d'Internationalization (i18n) Next.js

`next-intl` est la bibliothèque i18n la plus populaire pour Next.js. Intlayer est une alternative basée sur un compilateur et scoped au niveau des composants. Les deux localisent une application App Router. La question est ce que chacune coûte une fois que l'application est construite.

Cet article n'est pas un tutoriel. C'est une comparaison étayée par des chiffres provenant de [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), une suite de benchmark open-source qui construit la même application avec chaque bibliothèque et mesure ce que le navigateur télécharge et exécute réellement.

<TOC/>

> **tl;dr**: Sur la même application Next.js, `next-intl` ajoute **+12.6 KB gzip** de JavaScript sur chaque page, versus **+0.3 KB** pour Intlayer. Sans travail supplémentaire, `next-intl` expédie **~90% des chaînes de pages étrangères** avec chaque page. Atteindre 0% de fuite avec `next-intl` nécessite la portée des namespaces et `pick(messages, [...])` par page. Intlayer atteint 0% par défaut, car son compilateur limite le contenu par composant. Si vous voulez l'API `next-intl` avec la sortie d'Intlayer, l'adaptateur `@intlayer/next-intl` a mesuré **147.5 KB** par page versus **153.6 KB** avec l'original.

## En résumé

- **next-intl** - Léger, bien documenté, format de message ICU, support de première classe pour App Router avec middleware, formatters et helpers de navigation. Le contenu réside dans des catalogues JSON centralisés ; les optimisations de performance (namespaces, picking de messages par page, lazy loading) sont de votre responsabilité.
- **Intlayer** - Modèle de contenu centré sur les composants. Les dictionnaires `.content.ts` se situent à côté du composant qu'ils servent, un compilateur au moment du build tree-shake et lazy-load les contenus par composant et par locale, des types TypeScript stricts sont générés à partir de votre contenu, et les traductions manquantes échouent au moment du build. Inclut middleware, helpers SEO, un Visual Editor / CMS et traduction assistée par IA.

| Bibliothèque          | Étoiles GitHub                                                                                                                                                                 | Commits totaux                                                                                                                                                                     | Dernier Commit                                                                                                                                      | Première Version | Version NPM                                                                                                   | Téléchargements NPM                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Avril 2024       | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   |
| `amannn/next-intl`    | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       | Nov 2020         | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) |

> Les badges se mettent à jour automatiquement. Les snapshots varieront au fil du temps.

## Comparaison des fonctionnalités côte à côte

| Fonctionnalité                                          | `next-intlayer` (Intlayer)                                                                             | `next-intl`                                                                                                                      |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **Traductions près des composants**                     | ✅ Oui, `.content.ts` colocalisé avec chaque composant                                                 | ❌ Non, `messages/{locale}.json` centralisé                                                                                      |
| **Intégration TypeScript**                              | ✅ Types stricts générés automatiquement à partir du contenu                                           | ✅ Bon, clés typées via l'augmentation `global.d.ts`                                                                             |
| **Détection des traductions manquantes**                | ✅ Erreur TypeScript + erreur/avertissement au moment de la construction                               | ⚠️ Fallback au runtime + avertissement console                                                                                   |
| **Contenu riche (JSX / Markdown / composants)**         | ✅ Support direct                                                                                      | ⚠️ `t.rich()` / `t.markup()` avec placeholders de balises                                                                        |
| **Support ICU**                                         | ⚠️ WIP                                                                                                 | ✅ Oui                                                                                                                           |
| **Formatage (dates, nombres, devises)**                 | ✅ `useNumber`, `useDate`, ... (Intl sous le capot)                                                    | ✅ `useFormatter()` (Intl sous le capot)                                                                                         |
| **Routage localisé & middleware**                       | ✅ Proxy/middleware intégré, `getMultilingualUrls`                                                     | ✅ Middleware intégré, `Link`, `redirect`, `usePathname`                                                                         |
| **Helpers SEO (hreflang, sitemap, robots)**             | ✅ Helpers intégrés                                                                                    | ⚠️ Manuel, basé sur la configuration du routage                                                                                  |
| **Server components synchrones**                        | ✅ `useIntlayer` depuis `next-intlayer/server` fonctionne dans n'importe quel composant serveur enfant | ⚠️ `getTranslations` est async; les enfants synchrones ont besoin que `t` soit passé en tant que props                           |
| **Rendu statique**                                      | ✅ Ne bloque pas le rendu statique                                                                     | ⚠️ Nécessite `setRequestLocale()`; les catalogues avec namespace ont quand même exclu les pages du rendu statique dans nos tests |
| **Tree-shaking (livrer uniquement le contenu utilisé)** | ✅ Par composant, par locale, automatisé par le compilateur                                            | ⚠️ Manuel : namespaces + `pick(messages, [...])` par page                                                                        |
| **Chargement différé**                                  | ✅ `importMode: 'dynamic'` (une ligne de configuration)                                                | ⚠️ Imports dynamiques manuels dans `getRequestConfig`                                                                            |
| **Purge unused content**                                | ✅ Les dictionnaires inutilisés sont supprimés au moment de la compilation                             | ❌ Non intégré                                                                                                                   |
| **Testing missing translations (CLI / CI)**             | ✅ `npx intlayer content test`                                                                         | ⚠️ Non intégré; la documentation suggère `npx @lingual/i18n-check`                                                               |
| **AI-powered translation**                              | ✅ Intégré, utilise vos propres clés de fournisseur                                                    | ❌ Non                                                                                                                           |
| **Éditeur visuel / CMS**                                | ✅ Éditeur visuel gratuit + CMS optionnel                                                              | ❌ Non (plateformes de localisation externes)                                                                                    |
| **Serveur MCP & Agent Skills**                          | ✅ Oui                                                                                                 | ❌ Non                                                                                                                           |
| **Écosystème / communauté**                             | ⚠️ Plus petit mais croissance rapide                                                                   | ✅ Large, la référence Next.js                                                                                                   |

## Le benchmark

### Ce qui a été mesuré

La suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) construit **la même application** avec chaque bibliothèque : **10 pages** (accueil, à propos, blog, carrières, contact, FAQ, tarification, produits, paramètres, équipe), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), composants identiques et contenu identique. Les pages sont mesurées en `en` et `fr`. Chaque bibliothèque est implémentée dans jusqu'à quatre **stratégies de chargement**, de la configuration naïve à la configuration optimale :

| Stratégie          | Description                                                                                             | Qui fait cela                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **static**         | Chaque locale et chaque page regroupées ensemble                                                        | Prototypes rapides, code généré par IA            |
| **dynamic**        | Seule la locale active est chargée, mais toutes les pages à la fois                                     | La plupart des projets                            |
| **scoped-static**  | Espaces de noms par route, pas de chargement lazy                                                       | Rare                                              |
| **scoped-dynamic** | Espaces de noms par route + chargement lazy. Seule la page actuelle dans la locale actuelle est envoyée | Applications avec un budget de performance strict |

Intlayer n'a pas de variante "scoped" : le compilateur scopes le contenu **par composant** automatiquement, donc ses lignes `static` et `dynamic` sont déjà scoped.

Pour chaque build, la suite enregistre :

- **Lib size** : taille gzip de un composant vide qui importe uniquement la bibliothèque i18n. Le coût fixe du runtime.
- **Page JS** : JavaScript gzip téléchargé par page, moyenné sur toutes les pages et locales.
- **Locale leak %** : part des chaînes traduites trouvées dans le JS téléchargé qui appartiennent à une locale que l'utilisateur n'est **pas** en train de consulter (fingerprint sur `en` et `fr`, donc 50% signifie « l'autre locale mesurée est entièrement présente » ; avec 10 locales bundlées, le vrai gaspillage est plus élevé).
- **Page leak %** : part des chaînes traduites trouvées dans le JS téléchargé qui appartiennent à une page sur laquelle l'utilisateur n'est **pas**.
- **Component avg** : taille gzip moyenne de chaque composant compilé isolément. Montre combien de runtime i18n un seul composant entraîne.
- **E2E reactivity**: temps écoulé entre la sélection d'une nouvelle locale et la mise à jour de `html[lang]` dans le DOM (Playwright, 5 itérations).
- **Hydration**: durée de la phase d'hydratation de React.

> Les chiffres ci-dessous proviennent de l'exécution datée du **2026-09-12** avec `next-intl` 4.14.2, `use-intl` 4.14.2 et `intlayer` 9.5.1. L'application de test est volontairement petite (quelques dizaines de chaînes par locale), donc les pourcentages de fuite décrivent un **pattern** : ils augmentent avec votre contenu tandis que le coût d'exécution reste fixe.

### Résultats sur Next.js (App Router)

| Library                        | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity | Hydration |
| ------------------------------ | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | --------: |
| **base** (sans i18n)           | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |   11.8 ms |
| `next-intl`                    | static         |       14.7 KB |         153.6 KB |        4.2% |     89.8% |            21.8 KB |        16.0 ms |   14.7 ms |
| `next-intl`                    | dynamic        |       14.7 KB |         153.6 KB |        9.7% |     89.9% |            21.8 KB |        15.6 ms |   14.8 ms |
| `next-intl`                    | scoped-static  |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            80.1 KB |        17.9 ms |   17.4 ms |
| `next-intl`                    | scoped-dynamic |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            22.9 KB |        17.8 ms |   16.8 ms |
| **`next-intlayer`**            | static         |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **8.5 KB** |    **15.5 ms** |   16.9 ms |
| **`next-intlayer`**            | dynamic        |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **6.9 KB** |    **15.3 ms** |   15.9 ms |
| `@intlayer/next-intl` (compat) | static         |        8.0 KB |         147.5 KB |        0.0% |      0.0% |             8.1 KB |        14.5 ms |   12.8 ms |
| `@intlayer/next-intl` (compat) | dynamic        |        8.0 KB |         148.7 KB |        0.0% |      0.0% |             8.1 KB |        11.7 ms |   12.8 ms |

**Comment le lire**

- **Coût du runtime.** L'application de base pèse 141.0 KB par page. `next-intl` la porte à 153.6 KB (**+12.6 KB gzip sur chaque page**), Intlayer à 141.3 KB (**+0.3 KB**). Cet écart ne dépend pas du nombre de chaînes que vous avez : c'est le runtime de la librairie.
- **Leakage.** Dans les deux configurations que la plupart des équipes déploient réellement (`static` et `dynamic`), `next-intl` livre **~90% des chaînes de pages étrangères** avec chaque page : l'ensemble du `en.json` est inséré dans le provider client. Pour atteindre 0%, il faut utiliser les configurations `scoped-*` : diviser les catalogues en namespaces, puis utiliser `pick()` pour sélectionner les bons dans chaque page. Intlayer est à 0% dans les deux lignes sans rien de tout cela.
- **Le JS par page n'a pas changé pour `next-intl` entre les stratégies.** Le contenu du test est petit, donc la fuite ~90% ne représente que quelques KB ici. Sur une vraie application avec des centaines de chaînes par page, ce ratio devient le coût dominant. Pendant ce temps, le runtime +12.6 KB est payé dans chaque configuration.
- **Taille des composants.** Un composant qui appelle `useTranslations()` compile à 21.8 KB en moyenne ; le même composant avec `useIntlayer()` compile à 6.9 KB. Dans la configuration `scoped-static`, les composants `next-intl` sautent à 80.1 KB car chacun intègre son catalogue de namespaces.
- **Réactivité et hydratation** sont dans le même ordre de grandeur pour les deux bibliothèques sur Next.js (15-18 ms). Aucune n'est un goulot d'étranglement ici.

### Résultats sur TanStack Start (`use-intl`)

`use-intl` est le cœur indépendant du framework de `next-intl`. Même API, même format de message. Le comparer à `intlayer` sur TanStack Start supprime les parties spécifiques à Next.js de l'équation.

| Library                       | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |
| ----------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: |
| **base** (pas d'i18n)         | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |         8.1 ms |
| `use-intl`                    | static         |       14.1 KB |         179.8 KB |       50.0% |     89.8% |            76.0 KB |         6.7 ms |
| `use-intl`                    | dynamic        |       14.1 KB |         119.4 KB |        0.0% |     89.8% |            75.9 KB |         7.0 ms |
| `use-intl`                    | scoped-static  |       14.1 KB |         128.7 KB |        0.0% |      0.0% |            87.1 KB |        20.9 ms |
| `use-intl`                    | scoped-dynamic |       14.1 KB |         128.7 KB |        0.0% |      0.0% |            87.1 KB |        13.3 ms |
| **`intlayer`**                | static         |    **5.0 KB** |     **125.8 KB** |       50.0% |  **0.0%** |         **8.1 KB** |     **3.2 ms** |
| **`intlayer`**                | dynamic        |    **5.0 KB** |     **118.6 KB** |    **0.0%** |  **0.0%** |         **6.3 KB** |     **3.6 ms** |
| `@intlayer/use-intl` (compat) | dynamic        |        7.3 KB |         129.7 KB |        0.0% |      0.0% |             9.3 KB |         8.7 ms |

**Comment le lire**

- La configuration naive `use-intl` embarque **68.8 KB de JS supplémentaires par page** par rapport à l'application de base, avec la moitié des chaînes appartenant à la mauvaise locale et 90% à la mauvaise page.
- `use-intl` en mode `dynamic` atteint 119.4 KB, proche des 118.6 KB d'Intlayer, mais porte toujours **89.8% de fuite de page** : toutes les chaînes de la locale active pour toutes les pages sont chargées sur chaque page. Les délimiter par route (`scoped-*`) supprime la fuite mais coûte un autre ~9 KB de surcharge de chunk.
- La ligne `static` d'Intlayer a déjà **0% de fuite de page** : le compilateur n'agrège que les dictionnaires utilisés par les composants de la page. L'activation de `importMode: 'dynamic'` (une ligne dans `intlayer.config.ts`) supprime aussi la fuite de locale.
- **La taille du composant montre où se trouve l'architecture** : 76-87 KB par composant avec `use-intl` versus 6-8 KB avec Intlayer. `useTranslations()` lie chaque composant à l'arborescence de messages globale ; `useIntlayer()` le lie à son propre dictionnaire.
- **Le changement de locale** est 2 à 4 fois plus rapide avec Intlayer (3 ms contre 7-21 ms).

## Pourquoi cet écart ? Catalogues centralisés vs dictionnaires compilés

`next-intl` suit le modèle classique : un JSON par locale, chargé dans `getRequestConfig`, poussé dans un `NextIntlClientProvider`, lu via `t("namespace.key")`.

```bash
.
├── messages
│   ├── en.json
│   └── fr.json
└── src
    ├── i18n
    │   ├── request.ts
    │   └── routing.ts
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                └── page.tsx
```

Le runtime ne peut pas connaître les clés qu'une page utilisera, donc la valeur par défaut sûre est d'envoyer l'ensemble du catalogue. Optimiser signifie **que vous** divisez le catalogue en namespaces, **que vous** décidez quels namespaces chaque page a besoin, et **que vous** mainteniez cette correspondance synchronisée lorsque les composants se déplacent. La ligne `scoped-dynamic` du benchmark est la récompense pour ce travail, et la plupart des équipes n'y arrivent jamais.

Intlayer inverse la responsabilité. Le contenu est déclaré à côté du composant :

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           ├── page.tsx
    │           └── page.content.ts
    └── components
        └── Counter
            ├── index.tsx
            └── index.content.ts
```

Au moment de la compilation, le compilateur (`@intlayer/swc` / `@intlayer/babel`) voit quel composant importe quel dictionnaire. Il regroupe uniquement ces dictionnaires, uniquement pour la locale active, et supprime ceux qu'aucun composant n'importe. Le pattern "scoped-dynamic" devient le résultat de la compilation au lieu d'une discipline que l'équipe doit maintenir.

> Pour obtenir les chiffres de la ligne `dynamic`, définissez `dictionary.importMode: 'dynamic'` dans `intlayer.config.ts`. Consultez la [documentation sur l'optimisation du bundle](https://intlayer.org/doc/concept/bundle-optimization).

## Expérience développeur

### Composant client

**next-intl**

```json fileName="messages/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/Counter.tsx"
"use client";

import { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

export const Counter = () => {
  const t = useTranslations("counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button aria-label={t("label")} onClick={() => setCount((c) => c + 1)}>
        {t("increment")}
      </button>
    </div>
  );
};
```

> N'oubliez pas d'inclure l'espace de noms `counter` dans les messages passés à `NextIntlClientProvider` sur chaque page qui rend ce composant.

**Intlayer**

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ fr: "Compteur", en: "Counter" }),
    increment: t({ fr: "Incrémenter", en: "Increment" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter/index.tsx"
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

export const Counter = () => {
  // Récupération des traductions du namespace "counter"
  const { label, increment } = useIntlayer("counter");
  // Fonction de formatage des nombres
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

Rien à enregistrer sur la page : le composant apporte son propre contenu.

### Composant serveur synchrone

Les éléments du design system (navbar, footer, cards) sont souvent des composants serveur rendus comme enfants de composants clients, ils ne peuvent donc pas être `async`.

**next-intl**

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  formattedCount: string;
};

export const ServerCounter = ({ t, formattedCount }: ServerCounterProps) => (
  <div>
    <p>{formattedCount}</p>
    <button aria-label={t("label")}>{t("increment")}</button>
  </div>
);
```

La page doit `await getTranslations("counter")` et `await getFormatter()`, puis transmettre les résultats en tant que props. Le composant n'est plus autonome.

**Intlayer**

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

### Métadonnées

**next-intl**

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

const localizedPath = (locale: string, path: string) =>
  locale === routing.defaultLocale ? path : `/${locale}${path}`;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
};
```

**Intlayer**

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("about-metadata", locale);
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};
```

## Conservez l'API next-intl, obtenez la sortie d'Intlayer

Vous n'avez pas besoin de réécrire les composants pour obtenir les chiffres de benchmark ci-dessus. `@intlayer/next-intl` est un adaptateur clé en main : il conserve `useTranslations`, `getTranslations`, `useFormatter`, `t.rich()`, les pluriels ICU et les helpers `next-intl/navigation`, et les sert à partir des dictionnaires Intlayer compilés par le compilateur Intlayer.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

Dans le benchmark, la build de compatibilité de la même application est passée de **153,6 KB à 147,5 KB** par page, de **21,8 KB à 8,1 KB** par composant, et de **~90% de fuite de page à 0%**, sans modifier le code de l'application. Vos fichiers `messages/{locale}.json` existants peuvent rester la source de vérité grâce au [plugin JSON sync](https://intlayer.org/doc/compatibility/next-intl).

Consultez le [guide de migration next-intl](https://intlayer.org/doc/migration/next-intl) pour les étapes détaillées.

## Quand choisir lequel ?

- **Choisissez next-intl** si vous voulez le standard de l'écosystème pour Next.js, vous dépendez d'ICU MessageFormat, votre application est de petite à moyenne taille, ou vous intégrez avec une plateforme de traduction (Crowdin, Phrase, Lokalise...) qui attend du JSON centralisé. Prévoyez du temps pour structurer les catalogues par namespace et sélectionner les messages par page si la performance compte.
- **Choisissez Intlayer** si vous voulez du **contenu scoped au composant**, du **TypeScript strict**, des **erreurs de clés manquantes à la compilation**, du **tree-shaking et lazy loading sans effort**, des composants serveur synchrones, et des outils éditoriaux intégrés (Visual Editor, CMS, traduction IA, serveur MCP). Particulièrement pertinent pour les codebases volumineuses et modulaires et les design systems.
- **Choisissez `@intlayer/next-intl`** si vous êtes déjà sur `next-intl` et voulez les gains de bundle sans réécriture complète.

## Comparaisons connexes

- [i18next vs Intlayer](https://intlayer.org/blog/i18next-vs-intlayer) (même benchmark)
- [Lingui vs Intlayer](https://intlayer.org/blog/lingui-vs-intlayer) (même benchmark)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark) (même benchmark)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer)
- [Is next-intl outdated?](https://intlayer.org/blog/is-next-intl-outdated)

## GitHub STARs

Les stars GitHub sont un indicateur fort de la popularité d'un projet, de la confiance de la communauté et de sa pertinence à long terme. Bien que ce ne soit pas une mesure directe de la qualité technique, ils reflètent le nombre de développeurs qui trouvent le projet utile, suivent sa progression et sont susceptibles de l'adopter.

[![Star History Chart](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#amannn/next-intl&aymericzip/intlayer)

## Conclusion

`next-intl` est une bibliothèque solide et bien maintenue, et le benchmark confirme qu'elle est loin d'être la pire option sur Next.js. Cependant, son modèle de catalogue centralisé place chaque optimisation sur les épaules du développeur : la configuration naïve fuit environ 90% du contenu de pages étrangères, et le runtime seul coûte +12,6 KB gzip sur chaque page.

Intlayer déplace ce travail vers le compilateur. Les dictionnaires par composant, le lazy loading par locale et la purge du contenu mort sont des sorties de build, pas des conventions. Le résultat sur la même application : **+0.3 KB par page**, **0% de fuite**, des composants **3x plus petits**, et un changement de locale **2x-4x plus rapide** sur TanStack Start.

Toutes les données brutes, les applications de test et les scripts se trouvent dans le [repository Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Exécutez-le vous-même.

Consultez la [documentation 'Why Intlayer?'](https://intlayer.org/doc/why) pour plus de détails.
