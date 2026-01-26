---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del hook useLocale | solid-intlayer
description: Vea cómo usar el hook useLocale para el paquete solid-intlayer
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
    changes: Unified documentation for all exports
---

# Documentación del hook useLocale

El hook `useLocale` te permite gestionar la locale actual en tu aplicación Solid. Proporciona acceso a la locale actual (como un accessor), la locale por defecto, las locales disponibles y una función para actualizar la locale.

## Uso

```tsx
import { useLocale } from "solid-intlayer";

tsx;
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

## Descripción

El hook devuelve un objeto con las siguientes propiedades:

1. **locale**: Un accessor de Solid (`() => string`) que devuelve la locale actual.
2. **defaultLocale**: La locale por defecto definida en tu `intlayer.config.ts`.
3. **availableLocales**: Un array con todas las locales soportadas por tu aplicación.
4. **setLocale**: Una función para actualizar la locale de la aplicación. También maneja la persistencia (cookies/almacenamiento local) si está habilitada.

## Parámetros

- **props** (opcional):
  - **onLocaleChange**: Una función callback llamada siempre que cambia la locale.
  - **isCookieEnabled**: Indica si persistir la locale en una cookie.
