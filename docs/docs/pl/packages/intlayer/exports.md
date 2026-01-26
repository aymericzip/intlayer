---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja pakietu intlayer
description: Główny pakiet Intlayer, dostarczający podstawowe funkcje i typy do internacjonalizacji.
keywords:
  - intlayer
  - rdzeń
  - internacjonalizacja
  - i18n
slugs:
  - doc
  - packages
  - intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Ujednolicona dokumentacja dla wszystkich eksportów
---

# Pakiet intlayer

Pakiet `intlayer` jest biblioteką rdzeniową ekosystemu Intlayer. Dostarcza niezbędne funkcje, typy i narzędzia do zarządzania wielojęzyczną zawartością w aplikacjach JavaScript i TypeScript.

## Instalacja

```bash
npm install intlayer
```

## Eksporty

### Konfiguracja

Import:

```tsx
import "intlayer";
```

| Zmienna            | Typ                    | Opis                                                                                       | Powiązany dokument                                                                                                      |
| ------------------ | ---------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `configuration`    | `IntlayerConfig`       | Obiekt konfiguracji Intlayer.                                                              | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getConfiguration.md) |
| `getConfiguration` | `() => IntlayerConfig` | Zwraca obiekt konfiguracji Intlayer. (**Przestarzałe**: użyj `configuration` zamiast tego) | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getConfiguration.md) |
| `locales`          | `Locales[]`            | Lista wszystkich obsługiwanych lokalizacji.                                                | -                                                                                                                       |
| `requiredLocales`  | `Locales[]`            | Lista wszystkich wymaganych lokalizacji.                                                   | -                                                                                                                       |
| `defaultLocale`    | `Locales`              | Domyślna wartość locale.                                                                   | -                                                                                                                       |

### Typy

Import:

```tsx
import "intlayer";
```

| Typ                   | Opis                                                      |
| --------------------- | --------------------------------------------------------- |
| `Dictionary`          | Typ słownika używany do zdefiniowania struktury słownika. |
| `DeclarationContent`  | (**Przestarzałe**) Użyj zamiast tego `Dictionary<T>`.     |
| `IntlayerConfig`      | Typ definiujący konfigurację Intlayer.                    |
| `ContentNode`         | Węzeł w treści słownika.                                  |
| `Locale`              | Typ reprezentujący locale.                                |
| `LocalesValues`       | Możliwe wartości dla locale.                              |
| `StrictModeLocaleMap` | Mapa locale ze ścisłym sprawdzaniem typów.                |

### Funkcje zawartości

Import:

```tsx
import "intlayer";
```

| Funkcja                  | Typ        | Opis                                                                                                             | Powiązana dokumentacja                                                                                 |
| ------------------------ | ---------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t` / `getTranslation`   | `Function` | Wybiera zawartość na podstawie aktualnego locale.                                                                | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/translation.md) |
| `enu` / `getEnumeration` | `Function` | Wybiera zawartość na podstawie liczby.                                                                           | [enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/enumeration.md) |
| `cond` / `getCondition`  | `Function` | Wybiera zawartość na podstawie warunku logicznego.                                                               | [condition](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/condition.md)     |
| `gender`                 | `Function` | Wybiera zawartość na podstawie płci.                                                                             | [gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/gender.md)           |
| `insert`                 | `Function` | Wstawia wartości do ciągu tekstowego.                                                                            | [insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/insertion.md)     |
| `nest` / `getNesting`    | `Function` | Zagnieżdża inny słownik.                                                                                         | [nesting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/nesting.md)         |
| `md`                     | `Function` | Przetwarza zawartość Markdown.                                                                                   | [markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/markdown.md)       |
| `html`                   | `Function` | Przetwarza zawartość HTML.                                                                                       | [html](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/html.md)               |
| `file`                   | `Function` | Obsługuje zawartość pliku.                                                                                       | [file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/file.md)               |
| `getDictionary`          | `Function` | Przetwarza obiekty przypominające słowniki (klucz, zawartość). Obsługuje tłumaczenia `t()`, enumeracje itp.      | -                                                                                                      |
| `getIntlayer`            | `Function` | Bazuje na `getDictionary`, ale wstrzykuje zoptymalizowaną wersję słownika pochodzącą z wygenerowanej deklaracji. | -                                                                                                      |

### Narzędzia lokalizacji

Import:

```tsx
import "intlayer";
```

| Funkcja                | Typ        | Opis                                                          | Powiązana dokumentacja                                                                                                          |
| ---------------------- | ---------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `getLocale`            | `Function` | Wykrywa locale z ciągu znaków lub ścieżki.                    | [getLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocale.md)                       |
| `getLocaleLang`        | `Funkcja`  | Pobiera część językową locale.                                | [getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocaleLang.md)               |
| `getLocaleName`        | `Funkcja`  | Pobiera nazwę wyświetlaną dla locale.                         | [getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocaleName.md)               |
| `getLocalizedPath`     | `Funkcja`  | Rozwiązuje kanoniczną ścieżkę do wersji zlokalizowanej.       | [getLocalizedPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocalizedPath.md)         |
| `getCanonicalPath`     | `Function` | Konwertuje zlokalizowaną ścieżkę na kanoniczną.               | [getCanonicalPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getCanonicalPath.md)         |
| `getLocalizedUrl`      | `Function` | Generuje zlokalizowany URL.                                   | [getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocalizedUrl.md)           |
| `getMultilingualUrls`  | `Function` | Generuje adresy URL dla wszystkich obsługiwanych lokalizacji. | [getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getMultilingualUrls.md)   |
| `getPathWithoutLocale` | `Function` | Usuwa prefiks lokalizacji z ścieżki.                          | [getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getPathWithoutLocale.md) |
| `getPrefix`            | `Function` | Pobiera prefiks lokalizacji ze ścieżki.                       | [getPrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getPrefix.md)                       |
| `getHTMLTextDir`       | `Function` | Pobiera kierunek tekstu (LTR/RTL).                            | [getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getHTMLTextDir.md)             |
| `validatePrefix`       | `Function` | Waliduje prefiks lokalizacji.                                 | [validatePrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/validatePrefix.md)             |

### Narzędzia przeglądarki

Import:

```tsx
import "intlayer";
```

| Funkcja                | Typ        | Opis                                          |
| ---------------------- | ---------- | --------------------------------------------- |
| `getBrowserLocale`     | `Function` | Wykrywa preferowaną lokalizację przeglądarki. |
| `getCookie`            | `Function` | Pobiera wartość ciasteczka.                   |
| `getLocaleFromStorage` | `Function` | Pobiera lokalizację ze storage.               |
| `setLocaleInStorage`   | `Function` | Zapisuje lokalizację w storage.               |

### Formatery

Import:

```tsx
import "intlayer";
```

| Function       | Opis                                  |
| -------------- | ------------------------------------- |
| `number`       | Formatuje liczbę.                     |
| `currency`     | Formatuje wartość walutową.           |
| `percentage`   | Formatuje wartość procentową.         |
| `compact`      | Formatuje liczbę w postaci skróconej. |
| `date`         | Formatuje datę.                       |
| `relativeTime` | Formatuje czas względny.              |
| `units`        | Formatuje wartość z jednostkami.      |
| `Intl`         | Standardowy obiekt Intl.              |
