# Documentación: `getTranslationContent` Función en `intlayer`

## Descripción:

La función `getTranslationContent` recupera el contenido correspondiente a una localidad específica de un conjunto de contenido de idioma personalizable. Si la localidad especificada no se encuentra, se devuelve de forma predeterminada el contenido para la localidad predeterminada configurada en el proyecto.

## Parámetros:

- `languageContent: CustomizableLanguageContent<Content>`

  - **Descripción**: Un objeto que contiene traducciones para varias localidades. Cada clave representa una localidad, y su valor es el contenido correspondiente.
  - **Tipo**: `CustomizableLanguageContent<Content>`
    - `Content` puede ser cualquier tipo, y por defecto es `string`.

- `locale: Locales`

  - **Descripción**: La localidad para la cual se debe recuperar el contenido.
  - **Tipo**: `Locales`

## Retorna:

- **Tipo**: `Content`
- **Descripción**: El contenido correspondiente a la localidad especificada. Si la localidad no se encuentra, se devuelve el contenido de la localidad predeterminada.

## Ejemplo de Uso:

### Uso Básico:

```typescript
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

### Localidad Faltante:

```typescript
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

### Usando Tipos de Contenido Personalizados:

```typescript
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

## Casos Límite:

- **Localidad No Encontrada:**
  - Cuando la `locale` no se encuentra en el `languageContent`, la función devuelve el contenido para la localidad predeterminada.
- **Contenido de Idioma Incompleto:**

  - Si una localidad está parcialmente definida, la función no fusiona contenidos. Recupera estrictamente el valor de la localidad especificada o retrocede a la predeterminada.

- **Aplicación de TypeScript:**
  - Si las localidades en `languageContent` no coinciden con la configuración del proyecto, TypeScript hará cumplir que todas las localidades requeridas estén definidas, asegurando que el contenido sea completo y seguro en tipos.

## Enlaces:

- [Documentación de funciones en español](https://github.com/aymericzip/intlayer/blob/main/docs/es/getTranslationContent.md)
- [Guía de uso en español](https://github.com/aymericzip/intlayer/blob/main/docs/es/usage.md)
