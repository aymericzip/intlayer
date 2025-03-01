# Documentación: Función `getTranslation` en `intlayer`

## Descripción

La función `getTranslation` recupera el contenido correspondiente a un locale específico de un conjunto de contenido de idioma personalizable. Si no se encuentra el locale especificado, por defecto devuelve el contenido del locale predeterminado configurado en el proyecto.

## Parámetros

- `languageContent: CustomizableLanguageContent<Content>`

  - **Descripción**: Un objeto que contiene traducciones para varios locales. Cada clave representa un locale y su valor es el contenido correspondiente.
  - **Tipo**: `CustomizableLanguageContent<Content>`
    - `Content` puede ser de cualquier tipo, por defecto es `string`.

- `locale: Locales`

  - **Descripción**: El locale para el cual se debe recuperar el contenido.
  - **Tipo**: `Locales`

## Retorna

- **Tipo**: `Content`
- **Descripción**: El contenido correspondiente al locale especificado. Si no se encuentra el locale, se devuelve el contenido del locale predeterminado.

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

### Locale Faltante:

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

### Usando Tipos de Contenido Personalizados:

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
  - Si un locale está definido parcialmente, la función no combina contenidos. Recupera estrictamente el valor del locale especificado o recurre al predeterminado.
- **Aplicación de TypeScript:**
  - Si los locales en `languageContent` no coinciden con la configuración del proyecto, TypeScript aplicará la definición de todos los locales requeridos, asegurando que el contenido sea completo y seguro en cuanto a tipos.
