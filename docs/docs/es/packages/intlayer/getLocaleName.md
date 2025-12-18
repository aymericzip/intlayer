---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentación de la función getLocaleName | intlayer
description: Vea cómo usar la función getLocaleName para el paquete intlayer
keywords:
  - getLocaleName
  - traducción
  - Intlayer
  - intlayer
  - Internacionalización
  - Documentación
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getLocaleName
history:
  - version: 7.5.0
    date: 2025-12-18
    changes: Agregar polyfills para React Native y entornos más antiguos
  - version: 5.5.10
    date: 2025-06-29
    changes: Historial inicial
---

# Documentación: Función `getLocaleName` en `intlayer`

## Descripción

La función `getLocaleName` devuelve el nombre localizado de un locale dado (`targetLocale`) en el locale de visualización (`displayLocale`). Si no se proporciona un `targetLocale`, devuelve el nombre del `displayLocale` en su propio idioma.

## Parámetros

- `displayLocale: Locales`
  - **Descripción**: El locale en el que se mostrará el nombre del locale objetivo.
  - **Tipo**: Enum o cadena que representa locales válidos.

- `targetLocale?: Locales`
  - **Descripción**: El locale cuyo nombre se desea localizar.
  - **Tipo**: Opcional. Enum o cadena que representa locales válidos.

## Retorna

- **Tipo**: `string`
- **Descripción**: El nombre localizado del `targetLocale` en el `displayLocale`, o el propio nombre del `displayLocale` si no se proporciona `targetLocale`. Si no se encuentra una traducción, devuelve `"Unknown locale"`.

## Ejemplo de uso

```typescript codeFormat="typescript"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Salida: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Salida: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Salida: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Salida: "English"

getLocaleName(Locales.FRENCH); // Salida: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Salida: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Salida: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Salida: "French"

getLocaleName(Locales.CHINESE); // Salida: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Salida: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Salida: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Salida: "Chinese"

getLocaleName("unknown-locale"); // Salida: "Unknown locale"
```

```javascript codeFormat="esm"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Salida: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Salida: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Salida: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Salida: "English"

getLocaleName(Locales.FRENCH); // Salida: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Salida: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Salida: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Salida: "French"

getLocaleName(Locales.CHINESE); // Salida: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Salida: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Salida: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Salida: "Chinese"

getLocaleName("unknown-locale"); // Salida: "Unknown locale"
```

```javascript codeFormat="commonjs"
const { Locales, getLocaleName } = require("intlayer");

getLocaleName(Locales.ENGLISH); // Salida: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Salida: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Salida: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Salida: "English"

getLocaleName(Locales.FRENCH); // Salida: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Salida: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Salida: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Salida: "French"

getLocaleName(Locales.CHINESE); // Salida: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Salida: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Salida: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Salida: "Chinese"

getLocaleName("unknown-locale"); // Salida: "Unknown locale"
```

## Casos Especiales

- **No se proporciona `targetLocale`:**
  - La función devuelve por defecto el propio nombre del `displayLocale`.
- **Traducciones faltantes:**
  - Si `localeNameTranslations` no contiene una entrada para el `targetLocale` o el `displayLocale` específico, la función recurre al `ownLocalesName` o devuelve `"Unknown locale"`.

## Polyfills para React Native y entornos más antiguos

La función `getLocaleName` depende de la API `Intl.DisplayNames`, que no está disponible en React Native o entornos JavaScript más antiguos. Si estás usando `getLocaleName` en estos entornos, necesitas agregar polyfills.

Importa los polyfills temprano en tu aplicación, idealmente en tu archivo de entrada (por ejemplo, `index.js`, `App.tsx`, o `main.tsx`):

```typescript
import "intl";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-displaynames/polyfill";
```

Para más detalles, consulta la [documentación de polyfills de FormatJS](https://formatjs.io/docs/polyfills/intl-displaynames/).
