---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja pakietu react-native-intlayer
description: Wsparcie React Native dla Intlayer, zapewniające providerów i polyfille.
keywords:
  - react-native-intlayer
  - react-native
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-native-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Ujednolicona dokumentacja dla wszystkich eksportów
---

# Pakiet react-native-intlayer

Pakiet `react-native-intlayer` dostarcza niezbędne narzędzia do integracji Intlayer z aplikacjami React Native. Zawiera provider oraz polyfille wspierające obsługę lokalizacji.

## Instalacja

```bash
npm install react-native-intlayer
```

## Eksporty

### Provider

| Komponent          | Opis                                                                             |
| ------------------ | -------------------------------------------------------------------------------- |
| `IntlayerProvider` | Komponent Provider, który otacza Twoją aplikację i udostępnia kontekst Intlayer. |

Import:

```tsx
import "react-native-intlayer";
```

### Polyfill

| Funkcja            | Opis                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| `intlayerPolyfill` | Funkcja, która stosuje niezbędne polyfille dla React Native, aby wspierać Intlayer. |

Import:

```tsx
import "react-native-intlayer";
```

### Konfiguracja Metro

Pakiet `react-native-intlayer` dostarcza narzędzia do konfiguracji Metro, aby zapewnić prawidłowe działanie Intlayer z React Native.

| Funkcja                   | Opis                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | Funkcja asynchroniczna, która przygotowuje Intlayer i scala konfigurację Metro.             |
| `configMetroIntlayerSync` | Funkcja synchroniczna, która scala konfigurację Metro bez przygotowywania zasobów Intlayer. |
| `exclusionList`           | Tworzy wzorzec RegExp dla blockList Metro, aby wykluczyć pliki zawartości z bundla.         |

Import:

```tsx
import "react-native-intlayer/metro";
```
