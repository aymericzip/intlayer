---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Cómo traducir tu Express backend – guía i18n 2025
description: Descubre cómo hacer que tu backend de vite sea multilingüe. Sigue la documentación para internacionalizar (i18n) y traducirlo.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Express
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - express
---

# Traduce tu Express backend con Intlayer | Internacionalización (i18n)

`express-intlayer` es un middleware potente de internacionalización (i18n) para aplicaciones Express, diseñado para hacer que tus servicios backend sean accesibles globalmente al proporcionar respuestas localizadas basadas en las preferencias del cliente.

## ¿Por qué internacionalizar tu backend?

Internacionalizar tu backend es esencial para atender eficazmente a una audiencia global. Permite que tu aplicación entregue contenido y mensajes en el idioma preferido de cada usuario. Esta capacidad mejora la experiencia del usuario y amplía el alcance de tu aplicación al hacerla más accesible y relevante para personas de diferentes contextos lingüísticos.

### Casos prácticos

- **Mostrar errores del backend en el idioma del usuario**: Cuando ocurre un error, mostrar mensajes en el idioma nativo del usuario mejora la comprensión y reduce la frustración. Esto es especialmente útil para mensajes de error dinámicos que podrían mostrarse en componentes del frontend como toasts o modales.

- **Recuperar contenido multilingüe**: Para aplicaciones que obtienen contenido de una base de datos, la internacionalización asegura que puedas servir este contenido en múltiples idiomas. Esto es crucial para plataformas como sitios de comercio electrónico o sistemas de gestión de contenido que necesitan mostrar descripciones de productos, artículos y otros contenidos en el idioma preferido por el usuario.
- **Enviar Correos Electrónicos Multilingües**: Ya sean correos transaccionales, campañas de marketing o notificaciones, enviar correos en el idioma del destinatario puede aumentar significativamente el compromiso y la efectividad.

- **Notificaciones Push Multilingües**: Para aplicaciones móviles, enviar notificaciones push en el idioma preferido del usuario puede mejorar la interacción y la retención. Este toque personal puede hacer que las notificaciones se sientan más relevantes y accionables.

- **Otras Comunicaciones**: Cualquier forma de comunicación desde el backend, como mensajes SMS, alertas del sistema o actualizaciones de la interfaz de usuario, se beneficia de estar en el idioma del usuario, asegurando claridad y mejorando la experiencia general del usuario.
  Al internacionalizar el backend, tu aplicación no solo respeta las diferencias culturales, sino que también se alinea mejor con las necesidades del mercado global, convirtiéndose en un paso clave para escalar tus servicios a nivel mundial.

## Comenzando

### Instalación

Para comenzar a usar `express-intlayer`, instala el paquete usando npm:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

### Configuración

Configura los ajustes de internacionalización creando un archivo `intlayer.config.ts` en la raíz de tu proyecto:

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

### Declara Tu Contenido

Crea y gestiona tus declaraciones de contenido para almacenar traducciones:

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

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
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
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
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
        "es": "Ejemplo de contenido devuelto en español",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Tus declaraciones de contenido pueden definirse en cualquier lugar de tu aplicación siempre que se incluyan en el directorio `contentDir` (por defecto, `./src`). Y coincidan con la extensión de archivo de declaración de contenido (por defecto, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Para más detalles, consulta la [documentación de declaración de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/get_started.md).

### Configuración de la aplicación Express

Configura tu aplicación Express para usar `express-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t, getDictionary, getIntlayer } from "express-intlayer";
import dictionaryExample from "./index.content";

const app: Express = express();

// Cargar el manejador de internacionalización
app.use(intlayer());

// Rutas
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// Iniciar servidor
app.listen(3000, () => console.log(`Escuchando en el puerto 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t, getDictionary, getIntlayer } from "express-intlayer";
import dictionaryExample from "./index.content";

const app = express();

// Cargar el manejador de solicitudes de internacionalización
app.use(intlayer());

// Rutas
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// Iniciar servidor
app.listen(3000, () => console.log(`Escuchando en el puerto 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t, getDictionary, getIntlayer } = require("express-intlayer");
const dictionaryExample = require("./index.content");

const app = express();

// Cargar el manejador de internacionalización
app.use(intlayer());

// Rutas
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// Iniciar servidor
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### Compatibilidad

`express-intlayer` es totalmente compatible con:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/index.md) para aplicaciones React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/index.md) para aplicaciones Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/index.md) para aplicaciones Vite
  También funciona perfectamente con cualquier solución de internacionalización en diversos entornos, incluidos navegadores y solicitudes API. Puedes personalizar el middleware para detectar la configuración regional a través de encabezados o cookies:

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

Por defecto, `express-intlayer` interpretará la cabecera `Accept-Language` para determinar el idioma preferido del cliente.

> Para más información sobre configuración y temas avanzados, visita nuestra [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

### Configurar TypeScript

`express-intlayer` aprovecha las robustas capacidades de TypeScript para mejorar el proceso de internacionalización. El tipado estático de TypeScript garantiza que cada clave de traducción esté contemplada, reduciendo el riesgo de traducciones faltantes y mejorando el mantenimiento.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Asegúrate de que los tipos autogenerados (por defecto en ./types/intlayer.d.ts) estén incluidos en tu archivo tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Tus configuraciones existentes de TypeScript
  "include": [
    // ... Tus configuraciones existentes de TypeScript
    ".intlayer/**/*.ts", // Incluir los tipos autogenerados
  ],
}
```

### Extensión para VS Code

Para mejorar tu experiencia de desarrollo con Intlayer, puedes instalar la **Extensión oficial de Intlayer para VS Code**.

[Instalar desde el Marketplace de VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensión ofrece:

- **Autocompletado** para las claves de traducción.
- **Detección de errores en tiempo real** para traducciones faltantes.
- **Previsualizaciones en línea** del contenido traducido.
- **Acciones rápidas** para crear y actualizar traducciones fácilmente.

Para más detalles sobre cómo usar la extensión, consulta la [documentación de la Extensión Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar comprometerlos en tu repositorio Git.

Para ello, puedes añadir las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```

## Historial del documento

- 5.5.10 - 2025-06-29: Historial inicial
