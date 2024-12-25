# Documentation: `getTranslationContent` Function in `intlayer`

## Descripción:

La función `getTranslationContent` recupera el contenido correspondiente a un locale específico de un conjunto de contenido de idioma personalizable. Si el locale especificado no se encuentra, por defecto devuelve el contenido del locale predeterminado configurado en el proyecto.

## Parámetros:

- `languageContent: CustomizableLanguageContent<Content>`

  - **Descripción**: Un objeto que contiene traducciones para varios locales. Cada clave representa un locale, y su valor es el contenido correspondiente.
  - **Tipo**: `CustomizableLanguageContent<Content>`
    - `Content` puede ser de cualquier tipo, por defecto `string`.

- `locale: Locales`

  - **Descripción**: El locale para el cual se debe recuperar el contenido.
  - **Tipo**: `Locales`

## Retorna:

- **Tipo**: `Content`
- **Descripción**: El contenido correspondiente al locale especificado. Si el locale no se encuentra, se devuelve el contenido del locale predeterminado.

## Ejemplo de Uso:

### Uso Básico:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Bonjour"
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

console.log(content); // Output: "Bonjour"
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

console.log(content); // Output: "Bonjour"
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

console.log(content); // Output: "Hello" (contenido de locale predeterminado)
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

console.log(content); // Output: "Hello" (contenido de locale predeterminado)
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

console.log(content); // Output: "Hello" (contenido de locale predeterminado)
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

console.log(customContent.greeting); // Output: "Bonjour"
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

console.log(customContent.greeting); // Output: "Bonjour"
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

console.log(customContent.greeting); // Output: "Bonjour"
```

## Casos Extremos:

- **Locale No Encontrado:**
  - Cuando el `locale` no se encuentra en el `languageContent`, la función devuelve el contenido para el locale predeterminado.
- **Contenido de Idioma Incompleto:**

  - Si un locale está parcialmente definido, la función no fusiona contenidos. Recupera estrictamente el valor del locale especificado o vuelve al predeterminado.

- **Cumplimiento de TypeScript:**
  - Si los locales en `languageContent` no coinciden con la configuración del proyecto, TypeScript exigirá que se definan todos los locales requeridos, asegurando que el contenido sea completo y seguro en tipos.
