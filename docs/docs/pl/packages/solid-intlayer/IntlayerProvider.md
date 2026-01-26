---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja komponentu IntlayerProvider | solid-intlayer
description: Zobacz, jak używać komponentu IntlayerProvider w pakiecie solid-intlayer
keywords:
  - IntlayerProvider
  - provider
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - IntlayerProvider
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Ujednolicona dokumentacja dla wszystkich eksportów
---

# Dokumentacja komponentu IntlayerProvider

Komponent `IntlayerProvider` jest komponentem root, który dostarcza kontekst internacjonalizacji do Twojej aplikacji Solid. Zarządza stanem bieżącego locale i zapewnia, że wszystkie komponenty potomne mają dostęp do tłumaczeń.

## Użycie

```tsx
tsx;
import { IntlayerProvider } from "solid-intlayer";

const App = () => (
  <IntlayerProvider>
    <MyComponent />
  </IntlayerProvider>
);
```

## Opis

Komponent `IntlayerProvider` pełni następujące role:

1. **Zarządzanie stanem**: Inicjalizuje i przechowuje bieżącą locale, używając signals dla reaktywności.
2. **Ustalanie lokalizacji**: Określa początkową locale na podstawie cookies, preferencji przeglądarki lub domyślnej konfiguracji.
3. **Wstrzykiwanie kontekstu**: Udostępnia locale oraz funkcję `setLocale` dowolnemu komponentowi za pomocą hooków takich jak `useIntlayer` lub `useLocale`.
4. **Utrwalanie**: Automatycznie synchronizuje zmiany locale z cookies lub local storage, aby zachować preferencje użytkownika między sesjami.

## Właściwości (props)

- **locale** (opcjonalne): Ręcznie ustawia bieżącą locale.
  /// - **defaultLocale** (optional): Nadpisuje domyślny locale z konfiguracji.
  /// - **setLocale** (optional): Dostarcza niestandardową funkcję ustawiającą locale.
  /// - **disableEditor** (optional): Wyłącza integrację edytora wizualnego.
  /// - **isCookieEnabled** (optional): Włącza lub wyłącza przechowywanie w cookie.
  ///
