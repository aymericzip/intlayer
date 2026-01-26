---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja hooka useLocale | solid-intlayer
description: Zobacz, jak używać hooka useLocale w pakiecie solid-intlayer
keywords:
  - useLocale
  - locale
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
  - useLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Ujednolicona dokumentacja dla wszystkich eksportów
---

# Dokumentacja hooka useLocale

Hook `useLocale` pozwala zarządzać bieżącym locale w Twojej aplikacji Solid. Umożliwia dostęp do aktualnego locale (jako accessor), locale domyślnego, dostępnych locale oraz funkcji do aktualizacji locale.

## Użycie

```tsx
import { useLocale } from "solid-intlayer";

const LocaleSwitcher = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  // Komponent wyświetlający selector do zmiany lokalizacji
  return (
    <select value={locale()} onChange={(e) => setLocale(e.currentTarget.value)}>
      {availableLocales.map((loc) => (
        <option value={loc} selected={loc === locale()}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## Opis

Hook zwraca obiekt z następującymi właściwościami:

1. **locale**: Solid accessor (`() => string`) zwracający bieżący locale.
2. **defaultLocale**: Domyślny locale zdefiniowany w Twoim `intlayer.config.ts`.
3. **availableLocales**: Tablica wszystkich locale obsługiwanych przez Twoją aplikację.
4. **setLocale**: Funkcja do aktualizacji locale aplikacji. Obsługuje także persystencję (ciasteczka / local storage), jeśli jest włączona.

## Parametry

- **props** (opcjonalnie):
  - **onLocaleChange**: Funkcja callback wywoływana za każdym razem, gdy zmienia się locale.
  - **isCookieEnabled**: Czy zapisywać locale w cookie.
