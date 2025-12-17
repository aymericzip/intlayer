---
createdAt: 2025-02-07
updatedAt: 2025-12-13
title: Archivo de Contenido
description: Aprende a personalizar las extensiones para tus archivos de declaración de contenido. Sigue esta documentación para implementar condiciones de manera eficiente en tu proyecto.
keywords:
  - Archivo de Contenido
  - Documentación
  - Intlayer
slugs:
  - doc
  - concept
  - content
history:
  - version: 7.5.0
    date: 2025-12-13
    changes: Añadido soporte para formatos ICU e i18next
  - version: 6.0.0
    date: 2025-09-20
    changes: Añadida documentación de campos
  - version: 5.5.10
    date: 2025-06-29
    changes: Historial inicial
---

# Archivo de Contenido

<iframe title="i18n, Markdown, JSON… una única solución para gestionarlo todo | Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## ¿Qué es un Archivo de Contenido?

Un archivo de contenido en Intlayer es un archivo que contiene definiciones de diccionarios.  
Estos archivos declaran el contenido de texto de tu aplicación, traducciones y recursos.  
Los archivos de contenido son procesados por Intlayer para generar diccionarios.

Los diccionarios serán el resultado final que tu aplicación importará usando el hook `useIntlayer`.

### Conceptos Clave

#### Diccionario

Un diccionario es una colección estructurada de contenido organizada por claves. Cada diccionario contiene:

- **Clave**: Un identificador único para el diccionario
- **Contenido**: Los valores reales del contenido (texto, números, objetos, etc.)
- **Metadatos**: Información adicional como título, descripción, etiquetas, etc.

#### Archivo de Contenido

Ejemplo de archivo de contenido:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  conditionalContent: string;
  markdownContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hola Mundo",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Contenido en español",
    }),
    quantityContent: enu({
      "<-1": "Menos de menos un coche",
      "-1": "Menos un coche",
      "0": "Sin coches",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
    }),
    conditionalContent: cond({
      true: "La validación está habilitada",
      false: "La validación está deshabilitada",
    }),
    insertionContent: insert("¡Hola {{name}}!"),
    nestedContent: nest(
      "navbar", // La clave del diccionario para anidar
      "login.button" // [Opcional] La ruta al contenido para anidar
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# Ejemplo de Markdown"),

    /*
     * Solo disponible usando `react-intlayer` o `next-intlayer`
     */
    jsxContent: <h1>Mi título</h1>,
  },
} satisfies Dictionary<Content>; // [opcional] Dictionary es genérico y te permite reforzar el formato de tu diccionario
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "Contenido en francés",
      es: "Contenido en español",
    }),
    quantityContent: enu({
      "<-1": "Menos de menos un coche",
      "-1": "Menos un coche",
      "0": "Sin coches",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
    }),
    conditionalContent: cond({
      true: "La validación está habilitada",
      false: "La validación está deshabilitada",
    }),
    insertionContent: insert("¡Hola {{name}}!"),
    nestedContent: nest(
      "navbar", // La clave del diccionario para anidar
      "login.button" // [Opcional] La ruta al contenido para anidar
    ),
    markdownContent: md("# Ejemplo de Markdown"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Solo disponible usando `react-intlayer` o `next-intlayer`
    jsxContent: <h1>Mi título</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hola Mundo",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      es: "Contenido en español",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
    }),
    quantityContent: enu({
      "<-1": "Menos de menos un coche",
      "-1": "Menos un coche",
      "0": "Ningún coche",
      "1": "Un coche",
      ">5": "Algunos coches",
      ">19": "Muchos coches",
    }),
    conditionalContent: cond({
      true: "La validación está habilitada",
      false: "La validación está deshabilitada",
    }),
    insertionContent: insert("¡Hola {{name}}!"),
    nestedContent: nest(
      "navbar", // La clave del diccionario para anidar
      "login.button" // [Opcional] La ruta al contenido para anidar
    ),
    markdownContent: md("# Ejemplo de Markdown"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Solo disponible usando `react-intlayer` o `next-intlayer`
    jsxContent: <h1>Mi título</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "Hola Mundo",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "French content",
        "es": "Spanish content",
      },
    },
    "quantityContent": {
      "nodeType": "enumeración",
      "enumeration": {
        "0": "Sin coches",
        "1": "Un coche",
        "<-1": "Menos que menos un coche",
        "-1": "Menos un coche",
        ">5": "Algunos coches",
        ">19": "Muchos coches",
      },
    },
    "conditionalContent": {
      "nodeType": "condición",
      "condition": {
        "true": "La validación está habilitada",
        "false": "La validación está deshabilitada",
      },
    },
    "insertionContent": {
      "nodeType": "inserción",
      "insertion": "¡Hola {{name}}!",
    },
    "nestedContent": {
      "nodeType": "anidado",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Ejemplo de Markdown",
    },
    "fileContent": {
      "nodeType": "archivo",
      "file": "./path/to/file.txt",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["Mi título"],
      },
    },
  },
}
```

#### Nodos de Contenido

Los nodos de contenido son los bloques de construcción del contenido del diccionario. Pueden ser:

- **Valores primitivos**: cadenas, números, booleanos, null, undefined
- **Nodos tipados**: Tipos especiales de contenido como traducciones, condiciones, markdown, etc.
- **Funciones**: Contenido dinámico que puede evaluarse en tiempo de ejecución [ver Obtención de Funciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/function_fetching.md)
- **Contenido anidado**: Referencias a otros diccionarios

#### Tipos de Contenido

Intlayer soporta varios tipos de contenido a través de nodos tipados:

- **Contenido de Traducción**: Texto multilingüe con valores específicos por localidad [ver Contenido de Traducción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/translation_content.md)
- **Contenido Condicional**: Contenido condicional basado en expresiones booleanas [ver Contenido Condicional](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/condition_content.md)
- **Contenido de Enumeración**: Contenido que varía según valores enumerados [ver Contenido de Enumeración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/enumeration_content.md)
- **Contenido de Inserción**: Contenido que puede ser insertado en otro contenido [ver Contenido de Inserción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/insertion_content.md)

- **Contenido Markdown**: Contenido de texto enriquecido en formato Markdown [ver Contenido Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/markdown_content.md)
- **Contenido Anidado**: Referencias a otros diccionarios [ver Contenido Anidado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/nested_content.md)
- **Contenido de Género**: Contenido que varía según el género [ver Contenido de Género](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/gender_content.md)
- **Contenido de Archivo**: Referencias a archivos externos [ver Contenido de Archivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/file_content.md)

## Estructura del Diccionario

Un diccionario en Intlayer se define mediante el tipo `Dictionary` y contiene varias propiedades que controlan su comportamiento:

### Propiedades Requeridas

#### `key` (string)

El identificador del diccionario. Si varios diccionarios tienen la misma clave, Intlayer los fusionará automáticamente.

> Use la convención de nomenclatura kebab-case (por ejemplo, `"about-page-meta"`).

#### Content (string | number | boolean | object | array | function)

La propiedad `content` contiene los datos reales del diccionario y soporta:

- **Valores primitivos**: cadenas, números, booleanos, null, undefined
- **Nodos tipados**: Tipos de contenido especiales usando las funciones auxiliares de Intlayer
- **Objetos anidados**: Estructuras de datos complejas
- **Arrays**: Colecciones de contenido
- **Funciones**: Evaluación dinámica de contenido

### Propiedades Opcionales

#### `title` (string)

Título legible para humanos del diccionario que ayuda a identificarlo en editores y sistemas CMS. Esto es particularmente útil cuando se gestionan grandes cantidades de diccionarios o cuando se trabaja con interfaces de gestión de contenido.

**Ejemplo:**

```typescript
{
  key: "about-page-meta",
  title: "Metadatos de la Página Acerca de",
  content: { /* ... */ }
}
```

#### `description` (string)

Descripción detallada que explica el propósito del diccionario, las pautas de uso y cualquier consideración especial. Esta descripción también se utiliza como contexto para la generación de traducciones asistida por IA, lo que la hace valiosa para mantener la calidad y consistencia de las traducciones.

**Ejemplo:**

```typescript
{
  key: "about-page-meta",
  description: [
    "Este diccionario gestiona los metadatos de la Página Acerca de",
    "Considera buenas prácticas para SEO:",
    "- El título debe tener entre 50 y 60 caracteres",
    "- La descripción debe tener entre 150 y 160 caracteres",
  ].join('\n'),
  content: { /* ... */ }
}
```

#### `tags` (string[])

Array de cadenas para categorizar y organizar diccionarios. Las etiquetas proporcionan contexto adicional y pueden usarse para filtrar, buscar u organizar diccionarios en editores y sistemas CMS.

**Ejemplo:**

```typescript
{
  key: "about-page-meta",
  tags: ["metadata", "about-page", "seo"],
  content: { /* ... */ }
}
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Especifica el formateador a utilizar para el contenido del diccionario. Esto permite usar diferentes sintaxis de formateo de mensajes.

- `'intlayer'`: El formateador Intlayer por defecto.
- `'icu'`: Usa el formateo de mensajes ICU.
- `'i18next'`: Usa el formateo de mensajes i18next.

**Ejemplo:**

```typescript
{
  key: "my-dictionary",
  format: "icu",
  content: {
    message: "Hello {name}, you have {count, plural, one {# message} other {# messages}}"
  }
}
```

#### `locale` (LocalesValues)

Transforma el diccionario en un diccionario por localización donde cada campo declarado en el contenido se transformará automáticamente en un nodo de traducción. Cuando esta propiedad está establecida:

- El diccionario se trata como un diccionario de un solo idioma
- Cada campo se convierte en un nodo de traducción para ese idioma específico
- NO debes usar nodos de traducción (`t()`) en el contenido cuando uses esta propiedad
- Si falta, el diccionario se tratará como un diccionario multilingüe

> Consulta [Declaración de contenido por idioma en Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/per_locale_file.md) para más información.

**Ejemplo:**

```json
// Diccionario por idioma
{
  "key": "about-page",
  "locale": "en",
  "content": {
    "title": "About Us", // Esto se convierte en un nodo de traducción para 'en'
    "description": "Learn more about our company"
  }
}
```

#### `autoFill` (AutoFill)

Instrucciones para rellenar automáticamente el contenido del diccionario desde fuentes externas. Esto puede configurarse globalmente en `intlayer.config.ts` o por diccionario. Soporta múltiples formatos:

- **`true`**: Habilita el auto-relleno para todas las locales
- **`string`**: Ruta a un solo archivo o plantilla con variables
- **`object`**: Rutas de archivos por localización

**Ejemplos:**

```json
// Habilitar para todas las locales
{
  "autoFill": true
}
// Archivo único
{
  "autoFill": "./translations/aboutPage.content.json"
}
// Plantilla con variables
{
  "autoFill": "/messages/{{locale}}/{{key}}/{{fileName}}.content.json"
}
// Configuración detallada por localización
{
  "autoFill": {
    "en": "./translations/en/aboutPage.content.json",
    "fr": "./translations/fr/aboutPage.content.json",
    "es": "./translations/es/aboutPage.content.json"
  }
}
```

**Variables disponibles:**

- `{{locale}}` – Código de la localización (por ejemplo, `fr`, `es`)
- `{{fileName}}` – Nombre del archivo (por ejemplo, `example`)
- `{{key}}` – Clave del diccionario (por ejemplo, `example`)

> Consulta [Configuración de Auto-Relleno en Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/autoFill.md) para más información.

##### `priority` (número)

Indica la prioridad del diccionario para la resolución de conflictos. Cuando varios diccionarios tienen la misma clave, el diccionario con el número de prioridad más alto sobrescribirá a los demás. Esto es útil para gestionar jerarquías de contenido y sobreescrituras.

**Ejemplo:**

```typescript
// Diccionario base
{
  key: "welcome-message",
  priority: 1,
  content: { message: "¡Bienvenido!" }
}

// Diccionario de sobreescritura
{
  key: "welcome-message",
  priority: 10,
  content: { message: "¡Bienvenido a nuestro servicio premium!" }
}
// Esto anulará el diccionario base
```

### Propiedades del CMS

##### `version` (cadena)

Identificador de versión para diccionarios remotos. Ayuda a rastrear qué versión del diccionario se está utilizando actualmente, especialmente útil cuando se trabaja con sistemas de gestión de contenido remotos.

##### `live` (booleano)

Para diccionarios remotos, indica si el diccionario debe obtenerse en vivo en tiempo de ejecución. Cuando está habilitado:

- Requiere que `importMode` esté configurado como "live" en `intlayer.config.ts`
- Requiere que un servidor en vivo esté en ejecución
- El diccionario se obtendrá en tiempo de ejecución usando la API de sincronización en vivo
- Si está en vivo pero la obtención falla, se recurre al valor dinámico
- Si no está en vivo, el diccionario se transforma en tiempo de compilación para un rendimiento óptimo

### Propiedades del Sistema (Generadas automáticamente)

Estas propiedades son generadas automáticamente por Intlayer y no deben ser modificadas manualmente:

##### `$schema` (string)

Esquema JSON utilizado para la validación de la estructura del diccionario. Añadido automáticamente por Intlayer para asegurar la integridad del diccionario.

##### `id` (string)

Para diccionarios remotos, este es el identificador único del diccionario en el servidor remoto. Se usa para obtener y gestionar contenido remoto.

##### `localId` (LocalDictionaryId)

Identificador único para diccionarios locales. Generado automáticamente por Intlayer para ayudar a identificar el diccionario y determinar si es local o remoto, junto con su ubicación.

##### `localIds` (LocalDictionaryId[])

Para diccionarios fusionados, este arreglo contiene los IDs de todos los diccionarios que fueron fusionados juntos. Útil para rastrear la fuente del contenido fusionado.

##### `filePath` (string)

La ruta del archivo del diccionario local, indicando de qué archivo `.content` se generó el diccionario. Ayuda con la depuración y el seguimiento de la fuente.

##### `versions` (string[])

Para diccionarios remotos, este arreglo contiene todas las versiones disponibles del diccionario. Ayuda a rastrear qué versiones están disponibles para su uso.

##### `autoFilled` (true)

Indica si el diccionario ha sido auto-rellenado desde fuentes externas. En caso de conflictos, los diccionarios base sobrescribirán a los diccionarios auto-rellenados.

##### `location` ('distant' | 'locale')

Indica la ubicación del diccionario:

- `'locale'`: Diccionario local (proveniente de archivos de contenido)
- `'distant'`: Diccionario remoto (proveniente de una fuente externa)

## Tipos de Nodos de Contenido

Intlayer proporciona varios tipos especializados de nodos de contenido que extienden los valores primitivos básicos:

### Contenido de Traducción (`t`)

Contenido multilingüe que varía según la localidad:

```typescript
import { t } from "intlayer";

// TypeScript/JavaScript
multilingualContent: t({
  en: "Welcome to our website",
  fr: "Bienvenue sur notre site web",
  es: "Bienvenido a nuestro sitio web",
});
```

### Contenido Condicional (`cond`)

Contenido que cambia basado en condiciones booleanas:

```typescript
import { cond } from "intlayer";

conditionalContent: cond({
  true: "User is logged in",
  false: "Please log in to continue",
});
```

### Contenido de Enumeración (`enu`)

Contenido que varía según valores enumerados:

```typescript
import { enu } from "intlayer";

statusContent: enu({
  pending: "Su solicitud está pendiente",
  approved: "Su solicitud ha sido aprobada",
  rejected: "Su solicitud ha sido rechazada",
});
```

### Contenido de Inserción (`insert`)

Contenido que puede ser insertado en otro contenido:

```typescript
import { insert } from "intlayer";

insertionContent: insert("Este texto puede ser insertado en cualquier lugar");
```

### Contenido Anidado (`nest`)

Referencias a otros diccionarios:

```typescript
import { nest } from "intlayer";

nestedContent: nest("about-page");
```

### Contenido Markdown (`md`)

Contenido de texto enriquecido en formato Markdown:

```typescript
import { md } from "intlayer";

markdownContent: md(
  "# Bienvenido\n\nEste es un texto en **negrita** con [enlaces](https://example.com)"
);
```

### Contenido según género (`gender`)

Contenido que varía según el género:

```typescript
import { gender } from "intlayer";

genderContent: gender({
  male: "Él es un desarrollador",
  female: "Ella es una desarrolladora",
  other: "Ellos son desarrolladores",
});
```

### Contenido de archivo (`file`)

Referencias a archivos externos:

```typescript
import { file } from "intlayer";

fileContent: file("./path/to/content.txt");
```

## Creación de archivos de contenido

### Estructura básica de un archivo de contenido

Un archivo de contenido exporta un objeto por defecto que cumple con el tipo `Dictionary`:

```typescript
// example.content.ts
import { t, cond, nest, md, insert, file } from "intlayer";

export default {
  key: "welcome-page",
  title: "Contenido de la página de bienvenida",
  description:
    "Contenido para la página principal de bienvenida que incluye la sección hero y características",
  tags: ["página", "bienvenida", "página principal"],
  content: {
    hero: {
      title: t({
        en: "Welcome to Our Platform",
        fr: "Bienvenue sur Notre Plateforme",
        es: "Bienvenido a Nuestra Plataforma",
      }),
      subtitle: t({
        en: "Build amazing applications with ease",
        fr: "Construisez des applications incroyables avec facilité",
        es: "Construye aplicaciones increíbles con facilidad",
      }),
      cta: cond({
        true: t({
          en: "Get Started",
          fr: "Commencer",
          es: "Comenzar",
        }),
        false: t({
          en: "Sign Up",
          fr: "S'inscrire",
          es: "Registrarse",
        }),
      }),
    },
    features: [
      {
        title: t({
          en: "Easy to Use",
          fr: "Facile à Utiliser",
          es: "Fácil de Usar",
        }),
        description: t({
          en: "Intuitive interface for all skill levels",
          fr: "Interface intuitive pour tous les niveaux",
          es: "Interfaz intuitiva para todos los niveles",
        }),
      },
    ],
    documentation: nest("documentation"),
    readme: file("./README.md"),
  },
} satisfies Dictionary;
```

### Archivo de Contenido JSON

También puedes crear archivos de contenido en formato JSON:

```json
{
  "key": "welcome-page",
  "title": "Contenido de la Página de Bienvenida",
  "description": "Contenido para la página principal de bienvenida",
  "tags": ["page", "welcome"],
  "content": {
    "hero": {
      "title": {
        "nodeType": "translation",
        "translation": {
          "en": "Bienvenido a Nuestra Plataforma",
          "fr": "Bienvenue sur Notre Plateforme"
        }
      },
      "subtitle": {
        "nodeType": "translation",
        "translation": {
          "en": "Cree aplicaciones increíbles con facilidad",
          "fr": "Construisez des applications incroyables avec facilité"
        }
      }
    }
  }
}
```

### Archivos de Contenido por Localización

Para diccionarios por localización, especifique la propiedad `locale`:

```typescript
// welcome-page.en.content.ts
export default {
  key: "welcome-page",
  locale: "en",
  content: {
    hero: {
      title: "Bienvenido a Nuestra Plataforma",
      subtitle: "Cree aplicaciones increíbles con facilidad",
    },
  },
} satisfies Dictionary;
```

```typescript
// welcome-page.fr.content.ts
export default {
  key: "welcome-page",
  locale: "fr",
  content: {
    hero: {
      title: "Bienvenue sur Notre Plateforme",
      subtitle: "Construisez des applications incroyables avec facilité",
    },
  },
} satisfies Dictionary;
```

## Extensiones de Archivos de Contenido

Intlayer te permite personalizar las extensiones para tus archivos de declaración de contenido. Esta personalización ofrece flexibilidad para gestionar proyectos a gran escala y ayuda a evitar conflictos con otros módulos.

### Extensiones Predeterminadas

Por defecto, Intlayer vigila todos los archivos con las siguientes extensiones para declaraciones de contenido:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

Estas extensiones predeterminadas son adecuadas para la mayoría de las aplicaciones. Sin embargo, cuando tienes necesidades específicas, puedes definir extensiones personalizadas para optimizar el proceso de compilación y reducir el riesgo de conflictos con otros componentes.

> Para personalizar las extensiones de archivo que Intlayer utiliza para identificar los archivos de declaración de contenido, puedes especificarlas en el archivo de configuración de Intlayer. Este enfoque es beneficioso para proyectos a gran escala donde limitar el alcance del proceso de vigilancia mejora el rendimiento de la compilación.

## Conceptos Avanzados

### Fusión de Diccionarios

Cuando múltiples diccionarios tienen la misma clave, Intlayer los fusiona automáticamente. El comportamiento de la fusión depende de varios factores:

- **Prioridad**: Los diccionarios con valores de `priority` más altos sobrescriben a aquellos con valores más bajos
- **Auto-relleno vs Base**: Los diccionarios base sobrescriben a los diccionarios auto-rellenados
- **Ubicación**: Los diccionarios locales sobrescriben a los diccionarios remotos (cuando las prioridades son iguales)

### Seguridad de Tipos

Intlayer proporciona soporte completo de TypeScript para archivos de contenido:

```typescript
// Define tu tipo de contenido
interface WelcomePageContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
}

// Úsalo en tu diccionario
export default {
  key: "welcome-page",
  content: {
    // TypeScript proporcionará autocompletado y verificación de tipos
    hero: {
      title: "Welcome",
      subtitle: "Build amazing apps",
      cta: "Get Started",
    },
  },
} satisfies Dictionary<WelcomePageContent>;
```

### Imbricación de Nodos

Puedes sin problema imbricar funciones dentro de otras.

Ejemplo:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` devuelve `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenido compuesto imbricando condición, enumeración y contenido multilingüe
    // `getIntlayer('page','en').advancedContent(true)(10)` devuelve 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` devuelve `['Hola', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenido compuesto que imbrica condición, enumeración y contenido multilingüe
    // `getIntlayer('page','en').advancedContent(true)(10)` devuelve 'Se encontraron múltiples artículos'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` devuelve `['Hola', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenido compuesto que imbrica condición, enumeración y contenido multilingüe
    // `getIntlayer('page','en').advancedContent(true)(10)` devuelve 'Se encontraron múltiples artículos'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Contenido compuesto que imbrica condición, enumeración y contenido multilingüe
    // `getIntlayer('page','en').advancedContent(true)(10) devuelve 'Se encontraron múltiples artículos'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            "en": "Hi",
            "fr": "Salut",
            "es": "Hola",
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        "true": {
          "nodeType": "enumeration",
          "enumeration": {
            "0": {
              "nodeType": "translation",
              "translation": {
                "en": "No items found",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "No valid data available",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

### Mejores Prácticas

1. **Convenciones de Nomenclatura**:
   - Usa kebab-case para las claves del diccionario (`"about-page-meta"`)
   - Agrupa contenido relacionado bajo el mismo prefijo de clave

2. **Organización del Contenido**:
   - Mantén el contenido relacionado junto en el mismo diccionario
   - Usa objetos anidados para organizar estructuras de contenido complejas
   - Aprovecha las etiquetas para la categorización
   - Usa `autoFill` para completar automáticamente las traducciones faltantes

3. **Rendimiento**:
   - Ajusta la configuración del contenido para limitar el alcance de los archivos observados
   - Usa diccionarios en vivo solo cuando sean necesarias actualizaciones en tiempo real (por ejemplo, pruebas A/B, etc.)
   - Asegúrate de que el plugin de transformación de compilación (`@intlayer/swc` o `@intlayer/babel`) esté habilitado para optimizar el diccionario en tiempo de compilación
