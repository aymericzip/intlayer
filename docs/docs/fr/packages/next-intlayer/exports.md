---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du package next-intlayer
description: Intégration spécifique à Next.js pour Intlayer, fournissant un middleware et des providers pour App Router et Page Router.
keywords:
  - next-intlayer
  - nextjs
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentation unifiée pour toutes les exportations
---

# Package next-intlayer

Le package `next-intlayer` fournit les outils nécessaires pour intégrer Intlayer dans des applications Next.js. Il prend en charge à la fois l'App Router et le Page Router, y compris le middleware pour le routage basé sur la locale.

## Installation

```bash
npm install next-intlayer
```

## Exportations

### Middleware

Importer :

```tsx
import "next-intlayer/middleware";
```

| Fonction             | Description                                                                                                                                                                            | Documentation associée                                                                                                           |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerMiddleware` | Middleware Next.js pour gérer le routage et les redirections basés sur la locale. Détecte la locale à partir des en-têtes/cookies et redirige vers le chemin approprié pour la locale. | [intlayerMiddleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/next-intlayer/intlayerMiddleware.md) |

### Helpers de configuration

Import:

```tsx
import "next-intlayer/server";
```

| Function           | Description                                                                                                                                                                                                 | Doc associée |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `withIntlayer`     | Helper asynchrone pour envelopper la configuration Next.js, garantissant que les dictionnaires Intlayer sont préparés avant la build. Prépare les fichiers de contenu et configure les plugins webpack/SWC. | -            |
| `withIntlayerSync` | Helper synchrone pour envelopper la configuration Next.js, idéal pour les configurations où l'async n'est pas possible/souhaité. Ne prépare pas les dictionnaires au démarrage du serveur.                  | -            |

### Fournisseurs

Importer :

```tsx
import "next-intlayer";
```

ou

```tsx
import "next-intlayer/server";
```

| Composant                | Description                                                                                                                            | Doc associée |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `IntlayerClientProvider` | Provider pour les composants côté client dans le App Router de Next.js. Enveloppe `IntlayerProvider` de `react-intlayer`.              | -            |
| `IntlayerServerProvider` | Provider pour les composants côté serveur dans Next.js (App Router). Fournit le contexte de la locale sur le serveur.                  | -            |
| `IntlayerServer`         | Wrapper côté serveur pour le contenu Intlayer dans l'App Router. Assure une gestion appropriée des locales dans les Server Components. | -            |

### Hooks (côté client)

Importer :

```tsx
import "next-intlayer";
```

Réexporte la plupart des hooks depuis `react-intlayer`.

| Hook                   | Description                                                                                                                                                 | Documentation associée                                                                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Hook côté client qui sélectionne un dictionnaire par sa clé et retourne son contenu. Utilise la locale provenant du contexte si elle n'est pas fournie.     | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Hook qui transforme un objet dictionnaire et retourne le contenu pour la locale courante. Traite les traductions `t()`, les énumérations, etc.              | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Hook qui gère des dictionnaires asynchrones. Accepte une map de dictionnaires basée sur des promesses et la résout pour la locale courante.                 | -                                                                                                                       |
| `useDictionaryDynamic` | Hook qui gère des dictionnaires dynamiques chargés par clé. Utilise React Suspense en interne pour les états de chargement.                                 | -                                                                                                                       |
| `useLocale`            | Hook côté client pour récupérer la locale courante et une fonction pour la définir. Amélioré pour Next.js App Router avec prise en charge de la navigation. | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useLocale.md)         |
| `useRewriteURL`        | Hook côté client pour gérer les réécritures d'URL. Met automatiquement à jour l'URL si une règle de réécriture localisée plus "propre" existe.              | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/next-intlayer/useRewriteURL.md)  |
| `useLocalePageRouter`  | Hook spécifique au Page Router de Next.js pour la gestion des locales. Gère les redirections et les rechargements de page lors des changements de locale.   | -                                                                                                                       |
| `useI18n`              | Hook qui fournit une fonction de traduction `t()` pour accéder au contenu imbriqué par clé. Imite le pattern i18next/next-intl.                             | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Hook qui fournit un objet `Intl` lié à la locale. Injecte automatiquement la locale courante et utilise une mise en cache optimisée.                        | -                                                                                                                       |
| `useLoadDynamic`       | Hook pour charger des dictionnaires dynamiques en utilisant React Suspense. Accepte une clé et une promesse, met en cache les résultats.                    | -                                                                                                                       |

### Fonctions (côté serveur)

Import :

```tsx
import "next-intlayer/server";
```

| Fonction               | Description                                                                                                                                                          | Documentation associée                                                                                         |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `t`                    | Version côté serveur de la fonction de traduction pour l'App Router de Next.js. Renvoie la traduction du contenu multilingue pour la locale du serveur.              | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/dictionary/translation.md) |
| `getLocale`            | Fonction utilitaire pour extraire la locale courante depuis les en-têtes et cookies de Next.js. Conçue pour les Server Components, Server Actions ou Route Handlers. | -                                                                                                              |
| `generateStaticParams` | Génère des paramètres statiques pour les routes dynamiques de Next.js en fonction des locales configurées. Renvoie un tableau d'objets de locale pour le pré-rendu.  | -                                                                                                              |
| `locale`               | Fonction pour obtenir ou définir la locale dans le contexte serveur (App Router). Fournit la gestion des locales dans les Server Components.                         | -                                                                                                              |

### Types

Importer :

```tsx
import "next-intlayer";
```

| Type                   | Description                                                                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `NextPageIntlayer`     | Type pour les pages Next.js avec prise en charge d'Intlayer. Type générique incluant le paramètre locale.                                       |
| `Next14PageIntlayer`   | Type pour les pages Next.js 14 avec prise en charge d'Intlayer.                                                                                 |
| `Next15PageIntlayer`   | Type pour les pages Next.js 15 avec prise en charge d'Intlayer.                                                                                 |
| `NextLayoutIntlayer`   | Type pour les layouts Next.js avec prise en charge d'Intlayer. Type générique incluant le paramètre locale.                                     |
| `Next14LayoutIntlayer` | Type pour les layouts Next.js 14 avec prise en charge d'Intlayer.                                                                               |
| `Next15LayoutIntlayer` | Type pour les layouts Next.js 15 avec prise en charge d'Intlayer.                                                                               |
| `LocalParams`          | Type pour les paramètres de route Next.js comportant la locale. Objet avec la propriété `locale`.                                               |
| `LocalPromiseParams`   | Type pour les paramètres de route Next.js comportant la locale (version asynchrone). Promise qui résout en un objet avec la propriété `locale`. |
