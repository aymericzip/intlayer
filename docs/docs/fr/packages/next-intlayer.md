---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du package next-intlayer
description: Intégration spécifique à Next.js pour Intlayer, fournissant un middleware et des providers pour l'App Router et le Page Router.
keywords:
  - next-intlayer
  - nextjs
  - react
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentation unifiée pour toutes les exportations
---

# Package next-intlayer

Le package `next-intlayer` fournit les outils nécessaires pour intégrer Intlayer dans les applications Next.js. Il prend en charge à la fois l'App Router et le Page Router, y compris un middleware pour le routage basé sur la locale.

## Installation

```bash
npm install next-intlayer
```

## Exportations

### Middleware

| Function             | Description                                                                       |
| -------------------- | --------------------------------------------------------------------------------- |
| `intlayerMiddleware` | Middleware Next.js pour gérer le routage et les redirections basés sur la locale. |

### Fournisseurs

| Composant                | Description                                                             |
| ------------------------ | ----------------------------------------------------------------------- |
| `IntlayerClientProvider` | Fournisseur pour les composants côté client dans Next.js.               |
| `IntlayerServerProvider` | Fournisseur pour les composants côté serveur dans Next.js (App Router). |

### Hooks (côté client)

Réexporte la plupart des hooks de `react-intlayer`.

| Hook            | Description                                                    |
| --------------- | -------------------------------------------------------------- |
| `useIntlayer`   | Sélectionne un dictionnaire par sa clé et renvoie son contenu. |
| `useDictionary` | Sélectionne un dictionnaire par sa clé et renvoie son contenu. |
| `useLocale`     | Renvoie la locale actuelle et une fonction pour la définir.    |
| `useI18n`       | Renvoie les valeurs du contexte Intlayer actuel.               |

### Fonctions (côté serveur)

| Function               | Description                                                                |
| ---------------------- | -------------------------------------------------------------------------- |
| `t`                    | Version côté serveur de la fonction de traduction pour Next.js App Router. |
| `generateStaticParams` | Génère des paramètres statiques pour les routes dynamiques de Next.js.     |

### Types

| Type                 | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| `NextPageIntlayer`   | Type pour les pages Next.js avec prise en charge d'Intlayer.   |
| `NextLayoutIntlayer` | Type pour les layouts Next.js avec prise en charge d'Intlayer. |
