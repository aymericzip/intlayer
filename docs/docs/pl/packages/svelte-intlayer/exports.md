---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja pakietu svelte-intlayer
description: Integracja specyficzna dla Svelte dla Intlayer, zapewniająca funkcje konfiguracji i store'y dla aplikacji Svelte.
keywords:
  - svelte-intlayer
  - svelte
  - internacjonalizacja
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Ujednolicono dokumentację dla wszystkich eksportów
---

# Pakiet svelte-intlayer

Pakiet `svelte-intlayer` dostarcza niezbędne narzędzia do integracji Intlayer z aplikacjami Svelte. Zawiera funkcje konfiguracji oraz store'y do obsługi treści wielojęzycznych.

## Instalacja

```bash
npm install svelte-intlayer
```

## Eksporty

### Konfiguracja

Import:

```tsx
import "svelte-intlayer";
```

| Funkcja         | Opis                                                           |
| --------------- | -------------------------------------------------------------- |
| `setupIntlayer` | Funkcja do skonfigurowania Intlayer w Twojej aplikacji Svelte. |

### Store

Import:

```tsx
import "svelte-intlayer";
```

| Store           | Opis                                               |
| --------------- | -------------------------------------------------- |
| `intlayerStore` | Svelte store, który zawiera bieżący stan Intlayer. |

### Hooki (Kontekst)

Import:

```tsx
import "svelte-intlayer";
```

| Funkcja                | Opis                                                                                                                                                  | Powiązany dokument                                                                                                       |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `useIntlayer`          | Opiera się na `useDictionary`, ale wstrzykuje zoptymalizowaną wersję słownika z wygenerowanej deklaracji.                                             | -                                                                                                                        |
| `useDictionary`        | Przetwarza obiekty wyglądające na słowniki (klucz, zawartość). Przetwarza tłumaczenia `t()`, enumeracje itp.                                          | -                                                                                                                        |
| `useDictionaryAsync`   | Tak jak `useDictionary`, ale obsługuje asynchroniczne słowniki.                                                                                       | -                                                                                                                        |
| `useDictionaryDynamic` | Tak jak `useDictionary`, ale obsługuje słowniki dynamiczne.                                                                                           | -                                                                                                                        |
| `useLocale`            | Zwraca bieżący locale oraz funkcję do jego ustawienia.                                                                                                | -                                                                                                                        |
| `useRewriteURL`        | Funkcja po stronie klienta do zarządzania przepisywaniem URL. Automatycznie aktualizuje adres URL, jeśli istnieje zlokalizowana reguła przepisywania. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/svelte-intlayer/useRewriteURL.md) |
| `useIntl`              | Zwraca obiekt Intl dla bieżącego locale.                                                                                                              | -                                                                                                                        |

### Markdown

Import:

```tsx
import "svelte-intlayer";
```

| Funkcja               | Opis                                                                |
| --------------------- | ------------------------------------------------------------------- |
| `setIntlayerMarkdown` | Funkcja do ustawiania kontekstu markdown w Twojej aplikacji Svelte. |
