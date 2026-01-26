---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentation du package react-native-intlayer
description: Support React Native pour Intlayer, fournissant des providers et des polyfills.
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
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentation unifiée pour tous les exports
---

# Package react-native-intlayer

Le package `react-native-intlayer` fournit les outils nécessaires pour intégrer Intlayer dans les applications React Native. Il inclut un provider et des polyfills pour la prise en charge des locales.

## Installation

```bash
npm install react-native-intlayer
```

## Exports

### Provider

| Composant          | Description                                                                         |
| ------------------ | ----------------------------------------------------------------------------------- |
| `IntlayerProvider` | Composant Provider qui enveloppe votre application et fournit le contexte Intlayer. |

Importation :

```tsx
import "react-native-intlayer";
```

### Polyfill

| Fonction           | Description                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| `intlayerPolyfill` | Fonction qui applique les polyfills nécessaires pour que React Native prenne en charge Intlayer. |

Importation :

```tsx
import "react-native-intlayer";
```

### Configuration Metro

Le package `react-native-intlayer` fournit des utilitaires de configuration Metro pour garantir qu'Intlayer fonctionne correctement avec React Native.

| Fonction                  | Description                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | Fonction asynchrone qui prépare Intlayer et fusionne la configuration Metro.                      |
| `configMetroIntlayerSync` | Fonction synchrone qui fusionne la configuration Metro sans préparer les ressources d'Intlayer.   |
| `exclusionList`           | Crée un motif RegExp pour le blockList de Metro afin d'exclure des fichiers de contenu du bundle. |

Import :

```tsx
import "react-native-intlayer/metro";
```
