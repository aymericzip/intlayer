---
createdAt: 2026-01-21
updatedAt: 2026-06-25
title: Dokumentacja pakietu react-native-intlayer
description: Wsparcie React Native dla Intlayer, zapewniające providerów, hooki, polyfille i konfigurację Metro.
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
  - version: 9.0.0
    date: 2026-06-25
    changes: "Reeksportowanie pełnego API react-intlayer (hooki, narzędzia, podścieżki format/html/markdown), aby aplikacja React Native zależała tylko od react-native-intlayer"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Ujednolicona dokumentacja dla wszystkich eksportów"
author: aymericzip
---

# Pakiet react-native-intlayer

Pakiet `react-native-intlayer` dostarcza niezbędne narzędzia do integracji Intlayer z aplikacjami React Native. Reeksportuje pełne API `react-intlayer` (hooki i narzędzia) wraz z gotowym na React Native `IntlayerProvider`, a także polyfille i konfigurację Metro wymaganą przez React Native.

> W aplikacji React Native importuj **wszystko** z `react-native-intlayer`. Nie musisz instalować ani importować `react-intlayer` bezpośrednio.

## Instalacja

```bash
npm install react-native-intlayer
```

## Eksporty

### Provider

| Komponent          | Opis                                                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Komponent Provider, który otacza Twoją aplikację i udostępnia kontekst Intlayer. Automatycznie stosuje wymagane polyfille. |

```tsx
import { IntlayerProvider } from "react-native-intlayer";
```

### Hooki i narzędzia

Są reeksportowane z `react-intlayer`, więc możesz importować je bezpośrednio z `react-native-intlayer`:

| Eksport                                                                                                           | Opis                                                     |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `useIntlayer`                                                                                                     | Dostęp do zlokalizowanej zawartości dla klucza słownika. |
| `useLocale`                                                                                                       | Odczyt i zmiana bieżącej lokalizacji.                    |
| `useDictionary`, `useDictionaryAsync`, `useDictionaryDynamic`, `useLoadDynamic`                                   | Ładowanie zawartości słownika na różne sposoby.          |
| `useI18n`                                                                                                         | Hook kompatybilny z i18next.                             |
| `t`                                                                                                               | Pomocnik tłumaczenia inline.                             |
| `getIntlayer`, `getDictionary`                                                                                    | Imperatywne gettery zawartości.                          |
| `localeCookie`, `localeInStorage`, `setLocaleCookie`, `setLocaleInStorage`, `useLocaleCookie`, `useLocaleStorage` | Pomocniki trwałości lokalizacji.                         |

```tsx
import { useIntlayer, useLocale, t } from "react-native-intlayer";
```

### Polyfill

| Funkcja            | Opis                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| `intlayerPolyfill` | Funkcja, która stosuje niezbędne polyfille dla React Native, aby wspierać Intlayer. |

```tsx
import { intlayerPolyfill } from "react-native-intlayer";
```

> Polyfill jest stosowany automatycznie podczas importowania `IntlayerProvider`. Wywołaj `intlayerPolyfill` ręcznie tylko wtedy, gdy potrzebujesz polyfilli przed zamontowaniem providera.

### Formatery

Hooki do formatowania liczb, dat i inne oparte na Intl są dostępne z podścieżki `/format`:

```tsx
import { useNumber, useDate } from "react-native-intlayer/format";
```

### Renderowanie Markdown i HTML

```tsx
import { MarkdownProvider } from "react-native-intlayer/markdown";
import { HTMLProvider } from "react-native-intlayer/html";
```

### Konfiguracja Metro

Pakiet `react-native-intlayer` dostarcza narzędzia do konfiguracji Metro, aby zapewnić prawidłowe działanie Intlayer z React Native.

| Funkcja                   | Opis                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | Funkcja asynchroniczna, która przygotowuje Intlayer i scala konfigurację Metro.             |
| `configMetroIntlayerSync` | Funkcja synchroniczna, która scala konfigurację Metro bez przygotowywania zasobów Intlayer. |
| `exclusionList`           | Tworzy wzorzec RegExp dla blockList Metro, aby wykluczyć pliki zawartości z bundla.         |

```tsx
import { configMetroIntlayer } from "react-native-intlayer/metro";
```
