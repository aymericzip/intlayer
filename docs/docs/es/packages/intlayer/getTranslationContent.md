---
docName: package__intlayer__getTranslationContent
url: https://intlayer.org/doc/package/intlayer/getTranslationContent
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/intlayer/getTranslationContent.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Función getTranslation - Documentación de Intlayer JavaScript
description: Documentación para la función getTranslation en Intlayer, que recupera contenido localizado para locales específicos con respaldo al local predeterminado.
keywords:
  - getTranslation
  - intlayer
  - función
  - localización
  - i18n
  - JavaScript
  - traducción
  - locale
---

# Documentación: Función `getTranslation` en `intlayer`

## Descripción

La función `getTranslation` recupera el contenido correspondiente a un locale específico de un conjunto de contenido de idioma personalizable. Si el locale especificado no se encuentra, devuelve por defecto el contenido del locale predeterminado configurado en el proyecto.

## Parámetros

- `languageContent: CustomizableLanguageContent<Content>`

  - **Descripción**: Un objeto que contiene traducciones para varios locales. Cada clave representa un locale, y su valor es el contenido correspondiente.
  - **Tipo**: `CustomizableLanguageContent<Content>`
    - `Content` puede ser de cualquier tipo, por defecto `string`.

- `locale: Locales`

  - **Descripción**: El locale para el cual se desea obtener el contenido.
  - **Tipo**: `Locales`

## Retorna

- **Tipo**: `Content`
- **Descripción**: El contenido correspondiente al locale especificado. Si el locale no se encuentra, se devuelve el contenido del locale predeterminado.

## Ejemplo de Uso

### Uso Básico

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Salida: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Salida: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Salida: "Bonjour"
```

### Locale Ausente:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Salida: "Hello" (contenido del locale predeterminado)
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Salida: "Hello" (contenido del locale predeterminado)
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Salida: "Hello" (contenido del locale predeterminado)
```

### Uso de Tipos de Contenido Personalizados:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Salida: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Salida: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const customContent = getTranslation<Record<string, string>>(
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
  - Si un locale está parcialmente definido, la función no fusiona contenidos. Recupera estrictamente el valor del locale especificado o vuelve al predeterminado.
- **Aplicación de TypeScript:**
  - Si los locales en `languageContent` no coinciden con la configuración del proyecto, TypeScript exigirá que todos los locales requeridos estén definidos, asegurando que el contenido sea completo y seguro en cuanto a tipos.

## Historial del Documento

- 5.5.10 - 2025-06-29: Historial inicial
