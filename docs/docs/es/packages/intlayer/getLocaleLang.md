---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentación de la función getLocaleLang | intlayer
description: Vea cómo usar la función getLocaleLang para el paquete intlayer
keywords:
  - getLocaleLang
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
  - getLocaleLang
---

# Documentación: Función `getLocaleLang` en `intlayer`

## Descripción

La función `getLocaleLang` extrae el código de idioma de una cadena de localización. Soporta localizaciones con o sin códigos de país. Si no se proporciona ninguna localización, por defecto devuelve una cadena vacía.

## Parámetros

- `locale?: Locales`

  - **Descripción**: La cadena de localización (por ejemplo, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) de la cual se extrae el código de idioma.
  - **Tipo**: `Locales` (opcional)

## Retorna

- **Tipo**: `string`
- **Descripción**: El código de idioma extraído de la localización. Si no se proporciona la localización, devuelve una cadena vacía (`''`).

## Ejemplo de Uso

### Extrayendo Códigos de Idioma:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Output: "en"
getLocaleLang(Locales.ENGLISH); // Salida: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Salida: "fr"
getLocaleLang(Locales.FRENCH); // Salida: "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Salida: "en"
getLocaleLang(Locales.ENGLISH); // Salida: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Salida: "fr"
getLocaleLang(Locales.FRENCH); // Salida: "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Salida: "en"
getLocaleLang(Locales.ENGLISH); // Salida: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Salida: "fr"
getLocaleLang(Locales.FRENCH); // Salida: "fr"
```

## Casos Especiales

- **No se Proporciona Localización:**

  - La función devuelve una cadena vacía cuando `locale` es `undefined`.

- **Cadenas de Locale Malformadas:**
  - Si el `locale` no sigue el formato `idioma-país` (por ejemplo, `Locales.ENGLISH-US`), la función devuelve de forma segura la parte antes de `'-'` o la cadena completa si no hay `'-'` presente.

## Historial de Documentación

- 5.5.10 - 2025-06-29: Historial inicial
