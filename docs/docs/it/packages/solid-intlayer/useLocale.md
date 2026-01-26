---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione dell'hook useLocale | solid-intlayer
description: Scopri come usare l'hook useLocale per il pacchetto solid-intlayer
keywords:
  - useLocale
  - locale
  - Intlayer
  - intlayer
  - Internazionalizzazione
  - Documentazione
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
    changes: Documentazione unificata per tutte le esportazioni
---

# Documentazione dell'hook useLocale

L'hook `useLocale` ti permette di gestire la locale corrente nella tua applicazione Solid. Fornisce l'accesso alla locale corrente (come accessor), alla locale di default, alle locali disponibili e a una funzione per aggiornare la locale.

## Utilizzo

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

## Descrizione

L'hook restituisce un oggetto con le seguenti proprietà:

1. **locale**: Un accessor Solid (`() => string`) che ritorna la locale corrente.
2. **defaultLocale**: La locale predefinita definita nel tuo `intlayer.config.ts`.
3. **availableLocales**: Un array di tutte le locale supportate dalla tua applicazione.
4. **setLocale**: Una funzione per aggiornare la locale dell'applicazione. Gestisce anche la persistenza (cookie/local storage) se abilitata.

## Parametri

- **props** (opzionale):
  - **onLocaleChange**: Una funzione di callback chiamata ogni volta che la locale cambia.
  - **isCookieEnabled**: Se abilitare la persistenza della locale tramite cookie.
