---
createdAt: 2026-01-21
updatedAt: 2026-06-25
title: Documentation du package react-native-intlayer
description: Support React Native pour Intlayer, fournissant des providers, des hooks, des polyfills et la configuration Metro.
keywords:
  - react-native-intlayer
  - react-native
  - internationalisation
  - i18n
slugs:
  - doc
  - packages
  - react-native-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Ré-exporter l'intégralité de l'API react-intlayer (hooks, utilitaires, sous-chemins format/html/markdown) pour qu'une application React Native ne dépende que de react-native-intlayer"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Documentation unifiée pour tous les exports"
author: aymericzip
---

# Package react-native-intlayer

Le package `react-native-intlayer` fournit les outils nécessaires pour intégrer Intlayer dans les applications React Native. Il ré-exporte l'intégralité de l'API `react-intlayer` (hooks et utilitaires) avec un `IntlayerProvider` prêt pour React Native, ainsi que les polyfills et la configuration Metro requis par React Native.

> Dans une application React Native, importez **tout** depuis `react-native-intlayer`. Vous n'avez pas besoin d'installer ni d'importer `react-intlayer` directement.

## Installation

```bash
npm install react-native-intlayer
```

## Exports

### Provider

| Composant          | Description                                                                                                                             |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Composant Provider qui enveloppe votre application et fournit le contexte Intlayer. Applique automatiquement les polyfills nécessaires. |

```tsx
import { IntlayerProvider } from "react-native-intlayer";
```

### Hooks et utilitaires

Ces éléments sont ré-exportés depuis `react-intlayer`, vous pouvez donc les importer directement depuis `react-native-intlayer` :

| Export                                                                                                            | Description                                                |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `useIntlayer`                                                                                                     | Accède au contenu localisé pour une clé de dictionnaire.   |
| `useLocale`                                                                                                       | Lit et modifie la locale courante.                         |
| `useDictionary`, `useDictionaryAsync`, `useDictionaryDynamic`, `useLoadDynamic`                                   | Charge le contenu du dictionnaire de différentes manières. |
| `useI18n`                                                                                                         | Hook compatible i18next.                                   |
| `t`                                                                                                               | Aide à la traduction en ligne.                             |
| `getIntlayer`, `getDictionary`                                                                                    | Accesseurs de contenu impératifs.                          |
| `localeCookie`, `localeInStorage`, `setLocaleCookie`, `setLocaleInStorage`, `useLocaleCookie`, `useLocaleStorage` | Aides à la persistance de la locale.                       |

```tsx
import { useIntlayer, useLocale, t } from "react-native-intlayer";
```

### Polyfill

| Fonction           | Description                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| `intlayerPolyfill` | Fonction qui applique les polyfills nécessaires pour que React Native prenne en charge Intlayer. |

```tsx
import { intlayerPolyfill } from "react-native-intlayer";
```

> Le polyfill est appliqué automatiquement lorsque vous importez `IntlayerProvider`. Appelez `intlayerPolyfill` manuellement uniquement si vous avez besoin des polyfills avant le montage du provider.

### Formateurs

Les hooks de formatage numérique, de date et autres basés sur Intl sont disponibles depuis le sous-chemin `/format` :

```tsx
import { useNumber, useDate } from "react-native-intlayer/format";
```

### Rendu Markdown et HTML

```tsx
import { MarkdownProvider } from "react-native-intlayer/markdown";
import { HTMLProvider } from "react-native-intlayer/html";
```

### Configuration Metro

Le package `react-native-intlayer` fournit des utilitaires de configuration Metro pour garantir qu'Intlayer fonctionne correctement avec React Native.

| Fonction                  | Description                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | Fonction asynchrone qui prépare Intlayer et fusionne la configuration Metro.                      |
| `configMetroIntlayerSync` | Fonction synchrone qui fusionne la configuration Metro sans préparer les ressources d'Intlayer.   |
| `exclusionList`           | Crée un motif RegExp pour le blockList de Metro afin d'exclure des fichiers de contenu du bundle. |

```tsx
import { configMetroIntlayer } from "react-native-intlayer/metro";
```
