---
docName: intlayer_with_express
url: https://intlayer.org/doc/environment/express
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_express.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Traduce su Express backend (i18n)
description: Descubre cómo hacer que tu backend de vite sea multilingüe. Sigue la documentación para internacionalizar (i18n) y traducirlo.
keywords:
  - Internacionalización
  - Documentación
  - Intlayer
  - Express
  - JavaScript
  - Backend
---

# Comenzando con la internacionalización (i18n) con Intlayer y Express

`express-intlayer` es un middleware de internacionalización (i18n) potente para aplicaciones Express, diseñado para hacer que tus servicios backend sean accesibles globalmente al proporcionar respuestas localizadas basadas en las preferencias del cliente.

## ¿Por qué Internacionalizar tu Backend?

Internacionalizar tu backend es esencial para atender eficazmente a una audiencia global. Permite que tu aplicación entregue contenido y mensajes en el idioma preferido de cada usuario. Esta capacidad mejora la experiencia del usuario y amplía el alcance de tu aplicación al hacerla más accesible y relevante para personas de diferentes contextos lingüísticos.

### Casos Prácticos

- **Mostrar Errores del Backend en el Idioma del Usuario**: Cuando ocurre un error, mostrar mensajes en el idioma nativo del usuario mejora la comprensión y reduce la frustración. Esto es especialmente útil para mensajes de error dinámicos que podrían mostrarse en componentes del frontend como toasts o modales.

- **Recuperar Contenido Multilingüe**: Para aplicaciones que obtienen contenido de una base de datos, la internacionalización asegura que puedas servir este contenido en múltiples idiomas. Esto es crucial para plataformas como sitios de comercio electrónico o sistemas de gestión de contenido que necesitan mostrar descripciones de productos, artículos y otros contenidos en el idioma preferido por el usuario.

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
// Configuración de internacionalización
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
// Configuración de internacionalización
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
// Configuración de internacionalización
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

### Configuración de la Aplicación Express

Configura tu aplicación Express para usar `express-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
// Configuración de Express con internacionalización
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Cargar el manejador de solicitudes de internacionalización
app.use(intlayer());

// Rutas
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

// Iniciar servidor
app.listen(3000, () => console.log(`Escuchando en el puerto 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
// Configuración de Express con internacionalización
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// Cargar el manejador de solicitudes de internacionalización
app.use(intlayer());

// Rutas
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// Iniciar servidor
app.listen(3000, () => console.log(`Escuchando en el puerto 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
// Configuración de Express con internacionalización
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// Cargar el manejador de solicitudes de internacionalización
app.use(intlayer());

// Rutas
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// Iniciar servidor
app.listen(3000, () => console.log(`Escuchando en el puerto 3000`));
```

### Compatibilidad

`express-intlayer` es totalmente compatible con:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/index.md) para aplicaciones React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/index.md) para aplicaciones Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vite-intlayer/index.md) para aplicaciones Vite

También funciona perfectamente con cualquier solución de internacionalización en diversos entornos, incluidos navegadores y solicitudes API. Puedes personalizar el middleware para detectar el idioma a través de encabezados o cookies:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
// Configuración personalizada del middleware
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
// Configuración personalizada del middleware
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
// Configuración personalizada del middleware
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

Por defecto, `express-intlayer` interpretará el encabezado `Accept-Language` para determinar el idioma preferido del cliente.

> Para más información sobre configuración y temas avanzados, visita nuestra [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

### Configurar TypeScript

`express-intlayer` aprovecha las capacidades robustas de TypeScript para mejorar el proceso de internacionalización. El tipado estático de TypeScript asegura que cada clave de traducción esté contabilizada, reduciendo el riesgo de traducciones faltantes y mejorando el mantenimiento.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Asegúrate de que los tipos autogenerados (por defecto en ./types/intlayer.d.ts) estén incluidos en tu archivo tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Tu configuración existente de TypeScript
  "include": [
    // ... Tu configuración existente de TypeScript
    ".intlayer/**/*.ts", // Incluir los tipos autogenerados
  ],
}
```

### Configuración de Git

Se recomienda ignorar los archivos generados por Intlayer. Esto te permite evitar que se incluyan en tu repositorio Git.

Para hacerlo, puedes agregar las siguientes instrucciones a tu archivo `.gitignore`:

```plaintext fileName=".gitignore"
# Ignorar los archivos generados por Intlayer
.intlayer
```
