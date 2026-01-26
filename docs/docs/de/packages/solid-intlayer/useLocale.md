---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: useLocale Hook-Dokumentation | solid-intlayer
description: Anleitung zur Verwendung des useLocale-Hooks im solid-intlayer-Paket
keywords:
  - useLocale
  - locale
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
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
    changes: Vereinheitlichte Dokumentation für alle Exporte
---

# useLocale Hook-Dokumentation

Der `useLocale`-Hook ermöglicht das Verwalten der aktuellen Locale in Ihrer Solid-Anwendung. Er bietet Zugriff auf die aktuelle Locale (als Accessor), die Standard-Locale, verfügbare Locales und eine Funktion zum Aktualisieren der Locale.

## Verwendung

```tsx
import { useLocale } from "solid-intlayer";

const LocaleSwitcher = () => {
  const { locale, setLocale, availableLocales } = useLocale();

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

## Beschreibung

Der Hook gibt ein Objekt mit den folgenden Eigenschaften zurück:

1. **locale**: Ein Solid-Accessor (`() => string`), der die aktuelle locale zurückgibt.
2. **defaultLocale**: Die Standard-Locale, die in Ihrer `intlayer.config.ts` definiert ist.
3. **availableLocales**: Ein Array aller von Ihrer Anwendung unterstützten Locales.
4. **setLocale**: Eine Funktion, um die Locale der Anwendung zu aktualisieren. Sie kümmert sich auch um die Persistenz (Cookies/Local Storage), falls aktiviert.

## Parameter

- **props** (optional):
  - **onLocaleChange**: Eine Callback-Funktion, die aufgerufen wird, sobald sich die locale ändert.
  - **isCookieEnabled**: Ob die locale in einem Cookie gespeichert werden soll.
