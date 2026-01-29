---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: i18n Hono - Cómo traducir su aplicación Hono – guía 2026
description: Descubra cómo hacer que su backend Hono sea multilingüe. Siga la documentación para internacionalizar (i18n) y traducirlo.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Hono
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - hono
applicationTemplate: https://github.com/aymericzip/intlayer-hono-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Añadir comando init
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicio del historial
---

# Traduzca su sitio web backend Hono usando Intlayer | Internacionalización (i18n)

`hono-intlayer` es un potente middleware de internacionalización (i18n) para aplicaciones Hono, diseñado para hacer que sus servicios de backend sean accesibles globalmente al proporcionar respuestas localizadas basadas en las preferencias del cliente.

### Casos de Uso Prácticos

- **Mostrar Errores de Backend en el Idioma del Usuario**: Cuando ocurre un error, mostrar mensajes en el idioma nativo del usuario mejora la comprensión y reduce la frustración. Esto es especialmente útil para mensajes de error dinámicos que podrían mostrarse en componentes front-end como toasts o modales.

- **Recuperar Contenido Multilingüe**: Para aplicaciones que extraen contenido de una base de datos, la internacionalización asegura que pueda servir este contenido en múltiples idiomas. Esto es crucial para plataformas como sitios de comercio electrónico o sistemas de gestión de contenido que necesitan mostrar descripciones de productos, artículos y otro contenido en el idioma preferido por el usuario.

- **Enviar Correos Electrónicos Multilingües**: Ya sean correos electrónicos transaccionales, campañas de marketing o notificaciones, enviar correos electrónicos en el idioma del destinatario puede aumentar significativamente el compromiso y la efectividad.

- **Notificaciones Push Multilingües**: Para aplicaciones móviles, enviar notificaciones push en el idioma preferido de un usuario puede mejorar la interacción y la retención. Este toque personal puede hacer que las notificaciones se sientan más relevantes y accionables.

- **Otras Comunicaciones**: Cualquier forma de comunicación desde el backend, como mensajes SMS, alertas del sistema o actualizaciones de la interfaz de usuario, se beneficia de estar en el idioma del usuario, asegurando la claridad y mejorando la experiencia general del usuario.

Al internacionalizar el backend, su aplicación no solo respeta las diferencias culturales, sino que también se alinea mejor con las necesidades del mercado global, lo que lo convierte en un paso clave para escalar sus servicios en todo el mundo.

## Primeros Pasos

### Instalación

Para comenzar a usar `hono-intlayer`, instale el paquete usando npm:

```bash packageManager="npm"
npm install intlayer hono-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
bunx intlayer init
```

### Configuración

Configure los ajustes de internacionalización creando un `intlayer.config.ts` en la raíz de su proyecto:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Declare Su Contenido

Cree y gestione sus declaraciones de contenido para almacenar traducciones:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Sus declaraciones de contenido pueden definirse en cualquier lugar de su aplicación siempre que se incluyan en el directorio `contentDir` (por defecto, `./src`). Y coincidan con la extensión del archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Para más detalles, consulte la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

### Configuración de la Aplicación Hono

Configure su aplicación Hono para usar `hono-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// Cargar el controlador de solicitudes de internacionalización
app.use("*", intlayer());

// Rutas
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// Cargar el controlador de solicitudes de internacionalización
app.use("*", intlayer());

// Rutas
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenido renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const { Hono } = require("hono");
const { intlayer, t, getDictionary, getIntlayer } = require("hono-intlayer");
const dictionaryExample = require("./index.content");

const app = new Hono();

// Cargar el controlador de solicitudes de internacionalización
app.use("*", intlayer());

// Rutas
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenido renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

module.exports = app;
```

### Compatibilidad

`hono-intlayer` es totalmente compatible con:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/index.md) para aplicaciones React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/index.md) para aplicaciones Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/index.md) para aplicaciones Vite

También funciona a la perfección con cualquier solución de internacionalización en diversos entornos, incluidos navegadores y solicitudes de API. Puede personalizar el middleware para detectar el idioma a través de encabezados o cookies:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Otras opciones de configuración
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Otras opciones de configuración
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Otras opciones de configuración
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

Por defecto, `hono-intlayer` interpretará el encabezado `Accept-Language` para determinar el idioma preferido del cliente.

> Para más información sobre configuración y temas avanzados, visite nuestra [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

### Configurar TypeScript

`hono-intlayer` aprovecha las sólidas capacidades de TypeScript para mejorar el proceso de internacionalización. El tipado estático de TypeScript asegura que se tenga en cuenta cada clave de traducción, reduciendo el riesgo de falta de traducciones y mejorando la mantenibilidad.

![Autocompletado](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Error de traducción](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Asegúrese de que los tipos autogenerados (por defecto en ./types/intlayer.d.ts) se incluyan en su archivo tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Sus configuraciones de TypeScript existentes
  "include": [
    // ... Sus configuraciones de TypeScript existentes
    ".intlayer/**/*.ts", // Incluir los tipos autogenerados
  ],
}
```

### Extensión de VS Code

Para mejorar su experiencia de desarrollo con Intlayer, puede instalar la extensión oficial **Intlayer VS Code Extension**.

[Instalar desde el VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión proporciona:

- **Autocompletado** para claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Vistas previas en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulte la [documentación de la extensión Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto le permite evitar subirlos a su repositorio de Git.

Para hacer esto, puede añadir las siguientes instrucciones a su archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```
