---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: Documentation du paquet astro-intlayer
description: Intégration Astro pour Intlayer, fournissant la configuration pour le routage basé sur la locale, le middleware, les hooks, le store client et la gestion des dictionnaires.
keywords:
  - astro-intlayer
  - astro
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Ajout de la documentation des hooks useIntlayer, useDictionary, useLocale, du middleware et des formateurs"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Documentation unifiée pour tous les exports"
author: aymericzip
---

# Paquet astro-intlayer

Le paquet `astro-intlayer` fournit les outils nécessaires pour intégrer Intlayer dans des applications Astro. Il configure le routage basé sur la locale, la gestion des dictionnaires, la réécriture des pages lors du build, le middleware de requête et les hooks pour accéder au contenu multilingue à la fois dans les composants `.astro` rendus côté serveur et dans les scripts côté client.

## Installation

```bash
npm install astro-intlayer
```

## Exports

### Intégration

Le paquet `astro-intlayer` fournit une intégration Astro qui configure Intlayer dans votre projet.

Importation :

```tsx
import { intlayer } from "astro-intlayer";
```

ou importation par défaut dans `astro.config.mjs` :

```ts
import { defineConfig } from "astro/config";
import intlayer from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

| Fonction   | Description                                                                                                                                                                                                          | Documentation associée                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Intégration Astro qui prépare les dictionnaires, configure les plugins Vite (alias, proxy de routage, élagage), enregistre automatiquement le middleware de requête et émet des pages pré-rendues aux URL réécrites. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/astro-intlayer/intlayer.md) |

### Hooks (Serveur et Client)

Importation :

```tsx
import { useIntlayer, useDictionary, useLocale } from "astro-intlayer";
```

| Hook            | Description                                                                                                                                                                                               | Documentation associée                                                                                                  |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Sélectionne un dictionnaire par sa clé et retourne son contenu localisé. Dans le frontmatter `.astro`, il lit la locale de requête depuis `Astro.locals`. Dans `<script>`, il lit depuis le store client. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/astro-intlayer/useIntlayer.md)     |
| `useDictionary` | Transforme un objet dictionnaire et retourne le contenu pour la locale résolue. Fonctionne dans le frontmatter et les scripts client.                                                                     | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/astro-intlayer/useDictionary.md) |
| `useLocale`     | Retourne la locale actuelle, la locale par défaut, les locales disponibles et une fonction pour mettre à jour la locale.                                                                                  | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/astro-intlayer/useLocale.md)         |

### Middleware (astro-intlayer/middleware)

Importation :

```tsx
import { onRequest } from "astro-intlayer/middleware";
```

| Export      | Type                | Description                                                                                                                                                                  | Documentation associée                                                                                          |
| ----------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `onRequest` | `MiddlewareHandler` | Middleware Astro qui détecte la locale de la requête et attache `Astro.locals.intlayer`. Enregistré automatiquement par `intlayer()`, ou importé manuellement pour composer. | [onRequest](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/astro-intlayer/onRequest.md) |

### Utilitaires

Importation :

```tsx
import { getIntlayerLocals } from "astro-intlayer";
```

| Fonction            | Description                                                                                                                 | Documentation associée |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `getIntlayerLocals` | Fonction d'aide pour récupérer l'objet `IntlayerLocals` actuel depuis la portée de stockage de requête hors d'Astro.locals. | -                      |

### Utilitaires Client (astro-intlayer/client)

Importation :

```tsx
import {
  useIntlayer,
  useDictionary,
  useDictionaryDynamic,
  useLocale,
  useLocaleStorage,
  useLocaleCookie,
  getIntlayer,
  getDictionary,
  installIntlayer,
  setLocaleInStorage,
  setLocaleCookie,
  localeInStorage,
  localeCookie,
} from "astro-intlayer/client";
```

Lorsqu'il est importé dans le navigateur ou à l'intérieur de balises client `<script>`, `astro-intlayer` bascule automatiquement vers `astro-intlayer/client` (alimenté par `vanilla-intlayer`), fournissant les getters de dictionnaire côté client, les abonnements au store et les outils de persistance de locale.

### Formateurs (astro-intlayer/format)

Importation :

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
} from "astro-intlayer/format";
```

| Hook              | Description                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| `useIntl`         | Retourne une instance Intl liée à la locale de requête ou client avec fonctionnalités de cache et d'abonnement. |
| `useDate`         | Retourne une fonction de formatage de date pré-liée à la locale actuelle (`Intl.DateTimeFormat`).               |
| `useNumber`       | Retourne une fonction de formatage de nombre pré-liée à la locale actuelle (`Intl.NumberFormat`).               |
| `useCurrency`     | Retourne une fonction de formatage de devise pré-liée à la locale actuelle.                                     |
| `usePercentage`   | Retourne une fonction de formatage de pourcentage pré-liée à la locale actuelle.                                |
| `useRelativeTime` | Retourne une fonction de formatage de temps relatif pré-liée à la locale actuelle (`Intl.RelativeTimeFormat`).  |
| `useList`         | Retourne une fonction de formatage de liste pré-liée à la locale actuelle (`Intl.ListFormat`).                  |
| `useUnit`         | Retourne une fonction de formatage d'unité pré-liée à la locale actuelle.                                       |
| `useCompact`      | Retourne une fonction de formatage de nombre compact pré-liée à la locale actuelle (ex. `1.5K`).                |

### Utilitaires HTML (astro-intlayer/html)

Importation :

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "astro-intlayer/html";
```

| Export            | Type       | Description                                                            |
| ----------------- | ---------- | ---------------------------------------------------------------------- |
| `renderHTML`      | `Function` | Fonction utilitaire autonome pour rendre les nœuds HTML.               |
| `useHTML`         | `Hook`     | Hook pour obtenir le contexte du fournisseur HTML et sa configuration. |
| `useHTMLRenderer` | `Hook`     | Hook pour obtenir une fonction de rendu HTML préconfigurée.            |

### Utilitaires Markdown (astro-intlayer/markdown)

Importation :

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "astro-intlayer/markdown";
```

| Export                | Type       | Description                                                     |
| --------------------- | ---------- | --------------------------------------------------------------- |
| `compileMarkdown`     | `Function` | Compile des chaînes markdown en représentation structurée.      |
| `renderMarkdown`      | `Function` | Rend le contenu markdown en nœuds de sortie.                    |
| `parseMarkdown`       | `Function` | Analyse le contenu markdown brut en un AST.                     |
| `useMarkdown`         | `Hook`     | Hook pour obtenir le contexte du fournisseur markdown.          |
| `useMarkdownRenderer` | `Hook`     | Hook pour obtenir une fonction de rendu Markdown préconfigurée. |

### Types

Importation :

```tsx
import type {
  IntlayerLocals,
  UseLocaleProps,
  UseLocaleResult,
} from "astro-intlayer";
```

| Type              | Description                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| `IntlayerLocals`  | L'objet attaché à `Astro.locals.intlayer` contenant `locale`, `defaultLocale` et `availableLocales`.     |
| `UseLocaleProps`  | Propriétés de configuration facultatives acceptées par `useLocale()`.                                    |
| `UseLocaleResult` | Le type de retour de `useLocale()`, fournissant les propriétés de locale et les méthodes de mise à jour. |
