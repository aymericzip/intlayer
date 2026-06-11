---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du package react-intlayer
description: Implémentation spécifique à React d'Intlayer, fournissant des hooks et des providers pour les applications React.
keywords:
  - react-intlayer
  - react
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - exports
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: "Documentation unifiée pour tous les exports"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Package react-intlayer

Le package `react-intlayer` fournit les outils nécessaires pour intégrer Intlayer dans les applications React. Il inclut des providers de contexte, des hooks et des composants pour gérer du contenu multilingue.

## Installation

```bash
npm install react-intlayer
```

## Exports

### Providers

Import:

```tsx
import "react-intlayer";
```

| Composant                 | Description                                                                                                                                     | Documentation associée                                                                                                        |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider`        | Le provider principal qui enveloppe votre application et fournit le contexte Intlayer. Inclut la prise en charge de l'éditeur par défaut.       | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/IntlayerProvider.md) |
| `IntlayerProviderContent` | Un composant provider axé sur le contenu sans les fonctionnalités de l'éditeur. Utilisez-le lorsque vous n'avez pas besoin de l'éditeur visuel. | -                                                                                                                             |
| `HTMLProvider`            | Provider pour les paramètres d'internationalisation liés au HTML. Permet de surcharger les composants pour les balises HTML.                    | -                                                                                                                             |

### Hooks

Import :

```tsx
import "react-intlayer";
```

| Hook                   | Description                                                                                                                                           | Documentation associée                                                                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useHTMLRenderer`      | Hook pour obtenir une fonction de rendu HTML préconfigurée.                                                                                           | -                                                                                                                       |
| `useMarkdownRenderer`  | Hook pour obtenir une fonction de rendu Markdown préconfigurée.                                                                                       | -                                                                                                                       |
| `useIntlayer`          | Hook côté client qui récupère un dictionnaire par sa clé et renvoie son contenu. Utilise la locale du contexte si aucune n'est fournie.               | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Hook qui transforme un objet de dictionnaire et renvoie le contenu pour la locale courante. Traite les traductions `t()`, les énumérations, etc.      | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Hook qui gère des dictionnaires asynchrones. Accepte une map de dictionnaires basée sur des promises et la résout pour la locale courante.            | -                                                                                                                       |
| `useDictionaryDynamic` | Hook qui gère des dictionnaires dynamiques chargés par clé. Utilise React Suspense en interne pour gérer les états de chargement.                     | -                                                                                                                       |
| `useLocale`            | Hook côté client pour obtenir la locale courante, la locale par défaut, les locales disponibles, et une fonction pour mettre à jour la locale.        | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useLocale.md)         |
| `useLocaleBase`        | Hook pour obtenir la locale actuelle et tous les champs associés (locale, defaultLocale, availableLocales, setLocale) depuis le contexte.             | -                                                                                                                       |
| `useRewriteURL`        | Hook côté client pour gérer les réécritures d'URL. Si une règle de réécriture existe pour le pathname et la locale actuels, elle mettra à jour l'URL. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useRewriteURL.md) |
| `useI18n`              | Hook qui fournit une fonction de traduction `t()` pour accéder au contenu imbriqué par clé. Imite le pattern i18next/next-intl.                       | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Hook qui fournit un objet `Intl` lié à la locale. Injecte automatiquement la locale courante et utilise un cache optimisé.                            | -                                                                                                                       |
| `useLocaleStorage`     | Hook qui fournit la persistance de la locale dans localStorage ou les cookies. Renvoie des fonctions getter et setter.                                | -                                                                                                                       |
| `useLocaleCookie`      | Déprécié. Utilisez `useLocaleStorage` à la place. Hook qui gère la persistance de la locale via les cookies.                                          | -                                                                                                                       |
| `useLoadDynamic`       | Hook pour charger des dictionnaires dynamiques en utilisant React Suspense. Accepte une clé et une promesse, met en cache les résultats.              | -                                                                                                                       |
| `useIntlayerContext`   | Hook qui fournit les valeurs du contexte client Intlayer actuel (locale, setLocale, etc.).                                                            | -                                                                                                                       |
| `useHTMLContext`       | Hook pour accéder aux overrides des composants HTML depuis le contexte HTMLProvider.                                                                  | -                                                                                                                       |

### Fonctions

Import:

```tsx
import "react-intlayer";
```

| Fonction             | Description                                                                                                                                               | Doc liée                                                                                               |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `renderHTML`         | Utilitaire autonome pour rendre du HTML en dehors des composants.                                                                                         | -                                                                                                      |
| `renderMarkdown`     | Utilitaire autonome pour rendre du Markdown en dehors des composants.                                                                                     | -                                                                                                      |
| `t`                  | Fonction de traduction côté client qui retourne la traduction du contenu multilingue fourni. Utilise la locale du contexte si elle n'est pas fournie.     | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/translation.md) |
| `getDictionary`      | Traite les objets dictionnaire et renvoie le contenu pour la locale spécifiée. Traite les traductions `t()`, les énumérations, le markdown, le HTML, etc. | -                                                                                                      |
| `getIntlayer`        | Récupère un dictionnaire par sa clé depuis la déclaration générée et renvoie son contenu pour la locale spécifiée. Version optimisée de `getDictionary`.  | -                                                                                                      |
| `setLocaleInStorage` | Définit la locale dans le stockage (local storage ou cookie selon la configuration).                                                                      | -                                                                                                      |
| `setLocaleCookie`    | Déprécié. Utilisez `setLocaleInStorage` à la place. Définit la locale dans un cookie.                                                                     | -                                                                                                      |
| `localeInStorage`    | Récupère la locale depuis le stockage (localStorage ou cookie).                                                                                           | -                                                                                                      |
| `localeCookie`       | Obsolète. Utilisez `localeInStorage` à la place. Récupère la locale depuis le cookie.                                                                     | -                                                                                                      |

### Composants

Importer :

```tsx
import "react-intlayer";
```

ou

```tsx
import "react-intlayer/markdown";
```

| Composant          | Description                                                                                                                                                      | Documentation associée                                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `HTMLRenderer`     | Rend du contenu HTML avec des composants personnalisés.                                                                                                          | -                                                                                                                             |
| `MarkdownProvider` | Provider pour le contexte de rendu markdown. Permet de remplacer des composants pour les éléments markdown.                                                      | -                                                                                                                             |
| `MarkdownRenderer` | Rend du contenu markdown avec des composants personnalisés. Prend en charge toutes les fonctionnalités standard du markdown et la syntaxe spécifique à Intlayer. | [MarkdownRenderer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/packages/react-intlayer/MarkdownRenderer.md) |

### Types

Import :

```tsx
import "react-intlayer";
```

| Type           | Description                                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| `IntlayerNode` | Type représentant un nœud dans l'arbre de contenu Intlayer. Utilisé pour la manipulation de contenu typée. |

### Côté serveur (react-intlayer/server)

Import :

```tsx
import "react-intlayer/server";
```

| Export                   | Type        | Description                                              |
| ------------------------ | ----------- | -------------------------------------------------------- |
| `IntlayerServerProvider` | `Component` | Provider pour le rendu côté serveur.                     |
| `IntlayerServer`         | `Component` | Wrapper côté serveur pour le contenu Intlayer.           |
| `t`                      | `Function`  | Version côté serveur de la fonction de traduction.       |
| `useLocale`              | `Hook`      | Hook pour accéder à la locale côté serveur.              |
| `useIntlayer`            | `Hook`      | Version côté serveur de `useIntlayer`.                   |
| `useDictionary`          | `Hook`      | Version côté serveur de `useDictionary`.                 |
| `useI18n`                | `Hook`      | Version côté serveur de `useI18n`.                       |
| `locale`                 | `Function`  | Fonction pour obtenir ou définir la locale côté serveur. |
