---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentation du package remix-intlayer
description: Intégration Remix 3 pour Intlayer, fournissant middleware, contexte, hooks et formateurs pour le routage par locale et la gestion de contenu.
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Documentation unifiée pour tous les exports"
author: aymericzip
---

# Package remix-intlayer

Le package `remix-intlayer` fournit les outils nécessaires pour intégrer Intlayer dans les applications Remix 3. Conçu entièrement sur les standards web (`Request`, `Response`, `Headers` et `URL`), il propose un middleware de routeur pour le routage par locale et les réécritures internes, le stockage de contexte, des hooks et des utilitaires de formatage pour une gestion simple du contenu multilingue.

## Installation

```bash
npm install remix-intlayer
```

## Exports

### Middleware

Import :

```tsx
import { intlayer } from "remix-intlayer";
```

| Fonction   | Description                                                                                                                                                                                                                | Doc associée                                                                                                            |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Middleware de routeur Remix 3 qui gère le routage par locale (redirections et réécritures internes), résout la locale de la requête, la persiste dans les cookies/en-têtes et initialise la portée du contexte de requête. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/remix-intlayer/intlayerMiddleware.md) |

### Contexte

Import :

```tsx
import { Intlayer, INTLAYER_CONTEXT_PROPERTY } from "remix-intlayer";
```

| Export                      | Type         | Description                                                                                                                                    | Doc associée                                                                                                  |
| --------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `Intlayer`                  | `ContextKey` | Clé de RequestContext contenant l'`IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) pour la requête actuelle.                    | [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/remix-intlayer/Intlayer.md) |
| `INTLAYER_CONTEXT_PROPERTY` | `string`     | Nom de propriété (`'intlayer'`) installé directement sur le contexte de requête, accessible via `context.intlayer` et `context.get(Intlayer)`. | -                                                                                                             |

### Hooks

Import :

```tsx
import { useIntlayer, useDictionary, useLocale } from "remix-intlayer";
```

| Hook            | Description                                                                                                                                              | Doc associée                                                                                                            |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Sélectionne un dictionnaire par sa clé et retourne son contenu pour la locale de la requête en cours. Lit automatiquement depuis le contexte de requête. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | Transforme un objet dictionnaire importé et retourne son contenu pour la locale de la requête actuelle. Supporte les sélecteurs.                         | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | Retourne la locale résolue de la requête actuelle, avec la `defaultLocale` et les `availableLocales` configurées.                                        | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/remix-intlayer/useLocale.md)         |

### Utilitaires

Import :

```tsx
import { createLocaleRouting, getIntlayerState } from "remix-intlayer";
```

| Fonction              | Description                                                                                                                             | Doc associée |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `createLocaleRouting` | Fonction pure qui détermine les actions de routage (`redirect`, `rewrite` ou `pass`) selon la requête, la configuration et les options. | -            |
| `getIntlayerState`    | Lit l'`IntlayerState` actuel (`locale`, `defaultLocale`, `availableLocales`) depuis le stockage de requête `AsyncLocalStorage`.         | -            |

### Formateurs (remix-intlayer/format)

Import :

```tsx
import {
  useIntl,
  useDate,
  useNumber,
  useCurrency,
  usePercentage,
  useRelativeTime,
  useList,
  useUnit,
  useCompact,
} from "remix-intlayer/format";
```

| Hook              | Description                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| `useIntl`         | Retourne une instance Intl liée à la locale de la requête avec gestion du cache et abonnements.                 |
| `useDate`         | Retourne une fonction de formatage de date liée à la locale de la requête (`Intl.DateTimeFormat`).              |
| `useNumber`       | Retourne une fonction de formatage de nombre liée à la locale de la requête (`Intl.NumberFormat`).              |
| `useCurrency`     | Retourne une fonction de formatage de devise liée à la locale de la requête.                                    |
| `usePercentage`   | Retourne une fonction de formatage de pourcentage liée à la locale de la requête.                               |
| `useRelativeTime` | Retourne une fonction de formatage de temps relatif liée à la locale de la requête (`Intl.RelativeTimeFormat`). |
| `useList`         | Retourne une fonction de formatage de liste liée à la locale de la requête (`Intl.ListFormat`).                 |
| `useUnit`         | Retourne une fonction de formatage d'unité liée à la locale de la requête.                                      |
| `useCompact`      | Retourne une fonction de formatage compact de nombre liée à la locale de la requête (ex. `1.5K`).               |

### Utilitaires HTML (remix-intlayer/html)

Import :

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "remix-intlayer/html";
```

| Export            | Type       | Description                                                                            |
| ----------------- | ---------- | -------------------------------------------------------------------------------------- |
| `renderHTML`      | `Function` | Fonction utilitaire pour effectuer le rendu des nœuds HTML hors interface utilisateur. |
| `useHTML`         | `Hook`     | Hook pour obtenir le contexte et la configuration du fournisseur HTML.                 |
| `useHTMLRenderer` | `Hook`     | Hook pour obtenir une fonction de rendu HTML pré-configurée.                           |

### Utilitaires Markdown (remix-intlayer/markdown)

Import :

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "remix-intlayer/markdown";
```

| Export                | Type       | Description                                                      |
| --------------------- | ---------- | ---------------------------------------------------------------- |
| `compileMarkdown`     | `Function` | Compile des chaînes markdown en représentation structurée.       |
| `renderMarkdown`      | `Function` | Rend le contenu markdown en nœuds de sortie.                     |
| `parseMarkdown`       | `Function` | Analyse le contenu markdown brut en AST.                         |
| `useMarkdown`         | `Hook`     | Hook pour accéder au contexte du fournisseur markdown.           |
| `useMarkdownRenderer` | `Hook`     | Hook pour obtenir une fonction de rendu Markdown pré-configurée. |

### Types

Import :

```tsx
import type {
  IntlayerState,
  IntlayerMiddlewareOptions,
  LocaleRoutingOptions,
  LocaleRoutingAction,
  LocaleRoutingRequest,
  UseLocaleResult,
} from "remix-intlayer";
```

| Type                        | Description                                                                                           |
| --------------------------- | ----------------------------------------------------------------------------------------------------- |
| `IntlayerState`             | Objet d'état contenant `locale`, `defaultLocale` et `availableLocales` stocké dans le contexte Remix. |
| `IntlayerMiddlewareOptions` | Options de configuration transmises au middleware `intlayer()`.                                       |
| `LocaleRoutingOptions`      | Options personnalisant les préfixes de locale, la détection et les redirections.                      |
| `LocaleRoutingAction`       | Union discriminée représentant la décision de routage : `redirect`, `rewrite` ou `pass`.              |
| `LocaleRoutingRequest`      | Représentation minimale de la requête requise par `createLocaleRouting`.                              |
| `UseLocaleResult`           | Type de retour de `useLocale()`, contenant `locale`, `defaultLocale` et `availableLocales`.           |
