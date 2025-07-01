---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentación de la función getTranslation | intlayer
description: Vea cómo usar la función getTranslation para el paquete intlayer
keywords:
  - getTranslation
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
  - getTranslation
---

# Documentación: Función `getTranslationContent` en `intlayer`

## Descripción

La función `getTranslationContent` recupera el contenido correspondiente a una localidad específica de un conjunto de contenido de idioma personalizable. Si no se encuentra la localidad especificada, devuelve por defecto el contenido de la localidad predeterminada configurada en el proyecto.

## Parámetros

- `languageContent: CustomizableLanguageContent<Content>`

  - **Descripción**: Un objeto que contiene traducciones para varias localidades. Cada clave representa una localidad y su valor es el contenido correspondiente.
  - **Tipo**: `CustomizableLanguageContent<Content>`
    - `Content` puede ser de cualquier tipo, por defecto `string`.

- `locale: Locales`

  - **Descripción**: La localidad para la cual se desea obtener el contenido.
  - **Tipo**: `Locales`

## Retorna

- **Tipo**: `Content`
- **Descripción**: El contenido correspondiente a la localidad especificada. Si no se encuentra la localidad, se devuelve el contenido de la localidad predeterminada.

## Ejemplo de uso

### Uso básico

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Salida: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Salida: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Salida: "Bonjour"
```

### Localidad faltante:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Salida: "Hello" (contenido de la localidad predeterminada)
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Salida: "Hello" (contenido de la localidad predeterminada)
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Salida: "Hello" (contenido de la localidad predeterminada)
```

### Uso de Tipos de Contenido Personalizados:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Salida: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Salida: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Salida: "Bonjour"
```

## Casos Especiales

- **Localidad No Encontrada:**
  - Cuando la `locale` no se encuentra en el `languageContent`, la función devuelve el contenido para la localidad predeterminada.
- **Contenido de Idioma Incompleto:**
  - Si una localidad está parcialmente definida, la función no fusiona los contenidos. Recupera estrictamente el valor de la localidad especificada o recurre a la predeterminada.
- **Aplicación de TypeScript:**
  - Si las localidades en `languageContent` no coinciden con la configuración del proyecto, TypeScript exigirá que todas las localidades requeridas estén definidas, asegurando que el contenido sea completo y seguro en cuanto a tipos.

## Historial del Documento

- 5.5.10 - 2025-06-29: Inicio del historial
