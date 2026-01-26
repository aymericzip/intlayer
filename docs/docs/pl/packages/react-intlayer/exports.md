---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja pakietu react-intlayer
description: Implementacja Intlayer specyficzna dla React, dostarczająca hooki i providery dla aplikacji React.
keywords:
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - exports
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Ujednolicona dokumentacja dla wszystkich eksportów
---

# Pakiet react-intlayer

Pakiet `react-intlayer` dostarcza niezbędne narzędzia do integracji Intlayer z aplikacjami React. Zawiera providery kontekstu, hooki i komponenty do obsługi treści wielojęzycznych.

## Instalacja

```bash
npm install react-intlayer
```

## Eksporty

### Providery

Import:

```tsx
import "react-intlayer";
```

| Komponent                 | Opis                                                                                                                   | Powiązana dokumentacja                                                                                                        |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider`        | Główny provider, który opakowuje Twoją aplikację i zapewnia kontekst Intlayer. Domyślnie zawiera wsparcie dla edytora. | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/IntlayerProvider.md) |
| `IntlayerProviderContent` | Komponent-provider skoncentrowany na treści, bez funkcji edytora. Użyj go, gdy nie potrzebujesz edytora wizualnego.    | -                                                                                                                             |
| `HTMLProvider`            | Provider ustawień internacjonalizacji dotyczących HTML. Umożliwia nadpisanie komponentów odpowiadających tagom HTML.   | -                                                                                                                             |

### Hooki

Import:

```tsx
import "react-intlayer";
```

| Hook                   | Opis                                                                                                                                                       | Powiązana dokumentacja                                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Hook po stronie klienta, który wybiera jeden słownik według jego klucza i zwraca jego zawartość. Używa locale z kontekstu, jeśli nie jest podane.          | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Hook, który przekształca obiekt słownika i zwraca zawartość dla bieżącego locale. Przetwarza tłumaczenia `t()`, enumeracje itp.                            | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Hook obsługujący asynchroniczne słowniki. Akceptuje mapę słowników opartą na Promise i rozwiązuje ją dla bieżącego locale.                                 | -                                                                                                                       |
| `useDictionaryDynamic` | Hook obsługujący dynamiczne słowniki ładowane po kluczu. Wykorzystuje wewnętrznie React Suspense do obsługi stanów ładowania.                              | -                                                                                                                       |
| `useLocale`            | Hook po stronie klienta do pobrania bieżącego locale, domyślnego locale, dostępnych locales oraz funkcji do zmiany locale.                                 | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useLocale.md)         |
| `useLocaleBase`        | Hook do pobierania bieżącego locale oraz wszystkich powiązanych pól (locale, defaultLocale, availableLocales, setLocale) z kontekstu.                      | -                                                                                                                       |
| `useRewriteURL`        | Hook po stronie klienta do zarządzania przepisywaniem URL. Jeśli dla bieżącej ścieżki (pathname) i locale istnieje reguła przepisywania, zaktualizuje URL. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useRewriteURL.md) |
| `useI18n`              | Hook, który dostarcza funkcję tłumaczącą `t()` do dostępu do zagnieżdżonej zawartości po kluczu. Naśladuje wzorzec i18next/next-intl.                      | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Hook, który zapewnia obiekt `Intl` powiązany z locale. Automatycznie wstrzykuje aktualne locale i korzysta z zoptymalizowanego cachingu.                   | -                                                                                                                       |
| `useLocaleStorage`     | Hook, który zapewnia trwałość ustawień lokalizacji w localStorage lub w ciasteczkach. Zwraca funkcje getter i setter.                                      | -                                                                                                                       |
| `useLocaleCookie`      | Przestarzały. Użyj zamiast tego `useLocaleStorage`. Hook, który zarządza trwałością ustawień lokalizacji w ciasteczkach.                                   | -                                                                                                                       |
| `useLoadDynamic`       | Hook do ładowania dynamicznych słowników z użyciem React Suspense. Przyjmuje klucz i promise, buforuje wyniki.                                             | -                                                                                                                       |
| `useIntlayerContext`   | Hook, który udostępnia bieżące wartości kontekstu klienta Intlayer (locale, setLocale, itp.).                                                              | -                                                                                                                       |
| `useHTMLContext`       | Hook do uzyskiwania dostępu do nadpisanych komponentów HTML z kontekstu HTMLProvider.                                                                      | -                                                                                                                       |

### Funkcje

Import:

```tsx
import "react-intlayer";
```

| Funkcja              | Opis                                                                                                                                                         | Powiązana dokumentacja                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `t`                  | Funkcja tłumacząca po stronie klienta, która zwraca tłumaczenie podanej wielojęzycznej zawartości. Używa lokalizacji z kontekstu, jeśli nie podano.          | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/translation.md) |
| `getDictionary`      | Przetwarza obiekty dictionary i zwraca zawartość dla określonego locale. Obsługuje tłumaczenia `t()`, enumeracje, markdown, HTML itp.                        | -                                                                                                      |
| `getIntlayer`        | Pobiera dictionary po jego kluczu z wygenerowanej deklaracji i zwraca jego zawartość dla określonego locale. Wersja zoptymalizowana funkcji `getDictionary`. | -                                                                                                      |
| `setLocaleInStorage` | Ustawia locale w storage (local storage lub cookie w zależności od konfiguracji).                                                                            | -                                                                                                      |
| `setLocaleCookie`    | Przestarzałe. Użyj zamiast tego `setLocaleInStorage`. Ustawia locale w cookie.                                                                               | -                                                                                                      |
| `localeInStorage`    | Pobiera locale z pamięci (local storage lub cookie).                                                                                                         | -                                                                                                      |
| `localeCookie`       | Przestarzałe. Użyj zamiast tego `localeInStorage`. Pobiera locale z cookie.                                                                                  | -                                                                                                      |

### Komponenty

Import:

```tsx
import "react-intlayer";
```

or

```tsx
import "react-intlayer/markdown";
```

| Komponent          | Opis                                                                                                                                                         | Powiązana dokumentacja                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `MarkdownProvider` | Dostawca kontekstu renderowania markdown. Pozwala na niestandardowe nadpisywanie komponentów dla elementów markdown.                                         | -                                                                                                                             |
| `MarkdownRenderer` | Renderuje treści markdown przy użyciu niestandardowych komponentów. Obsługuje wszystkie standardowe funkcje markdown oraz składnię specyficzną dla Intlayer. | [MarkdownRenderer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/MarkdownRenderer.md) |

### Typy

Import:

```tsx
import "react-intlayer";
```

| Typ            | Opis                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------- |
| `IntlayerNode` | Typ reprezentujący węzeł w drzewie treści Intlayer. Używany do bezpiecznej manipulacji treścią z zachowaniem typów. |

### Po stronie serwera (react-intlayer/server)

Import:

```tsx
import "react-intlayer/server";
```

| Eksport                  | Typ         | Opis                                                            |
| ------------------------ | ----------- | --------------------------------------------------------------- |
| `IntlayerServerProvider` | `Component` | Provider dla renderowania po stronie serwera.                   |
| `IntlayerServer`         | `Component` | Wrapper po stronie serwera dla treści Intlayer.                 |
| `t`                      | `Function`  | Wersja po stronie serwera funkcji tłumaczącej.                  |
| `useLocale`              | `Hook`      | Hook umożliwiający dostęp do locale po stronie serwera.         |
| `useIntlayer`            | `Hook`      | Wersja po stronie serwera hooka `useIntlayer`.                  |
| `useDictionary`          | `Hook`      | Wersja po stronie serwera hooka `useDictionary`.                |
| `useI18n`                | `Hook`      | Wersja po stronie serwera hooka `useI18n`.                      |
| `locale`                 | `Function`  | Funkcja do pobierania lub ustawiania locale po stronie serwera. |
