---
docName: package__intlayer__getTranslation
url: https://intlayer.org/doc/packages/intlayer/getTranslation
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getTranslation.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentación de la función getTranslation | intlayer
description: Descubre cómo usar la función getTranslation para el paquete intlayer
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
---

# Documentación: Función `getTranslationContent` en `intlayer`

## Descripción

La función `getTranslationContent` recupera el contenido correspondiente a un locale específico de un conjunto de contenido de idioma personalizable. Si no se encuentra el locale especificado, por defecto devuelve el contenido del locale predeterminado configurado en el proyecto.

## Parámetros

- `languageContent: CustomizableLanguageContent<Content>`

  - **Descripción**: Un objeto que contiene traducciones para varios locales. Cada clave representa un locale y su valor es el contenido correspondiente.
  - **Tipo**: `CustomizableLanguageContent<Content>`
    - `Content` puede ser de cualquier tipo, por defecto es `string`.

- `locale: Locales`

  - **Descripción**: El locale para el cual se debe recuperar el contenido.
  - **Tipo**: `Locales`

## Retornos

- **Tipo**: `Content`
- **Descripción**: El contenido correspondiente al locale especificado. Si no se encuentra el locale, se devuelve el contenido del locale predeterminado.

## Ejemplo de Uso

### Uso Básico

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

### Locale Faltante:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Salida: "Hello" (contenido del locale predeterminado)
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

console.log(content); // Salida: "Hello" (contenido del locale predeterminado)
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

console.log(content); // Salida: "Hello" (contenido del locale predeterminado)
```

### Usando Tipos de Contenido Personalizados:

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

- **Locale No Encontrado:**
  - Cuando el `locale` no se encuentra en el `languageContent`, la función devuelve el contenido del locale predeterminado.
- **Contenido de Idioma Incompleto:**
  - Si un locale está definido parcialmente, la función no combina contenidos. Recupera estrictamente el valor del locale especificado o recurre al predeterminado.
- **Aplicación de TypeScript:**
  - Si los locales en `languageContent` no coinciden con la configuración del proyecto, TypeScript aplicará que todos los locales requeridos estén definidos, asegurando que el contenido sea completo y seguro en cuanto a tipos.
