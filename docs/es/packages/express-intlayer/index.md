# express-intlayer: Paquete JavaScript para internacionalizar (i18n) una aplicación Express.js

**Intlayer** es un conjunto de paquetes diseñado específicamente para desarrolladores de JavaScript. Es compatible con frameworks como React, Next.js y Express.js.

**El paquete `express-intlayer`** te permite internacionalizar tu aplicación Express.js. Proporciona un middleware para detectar la configuración regional preferida del usuario y devuelve el diccionario correspondiente para el usuario.

## ¿Por qué internacionalizar tu backend?

Internacionalizar tu backend es esencial para atender eficazmente a una audiencia global. Permite que tu aplicación entregue contenido y mensajes en el idioma preferido de cada usuario. Esta capacidad mejora la experiencia del usuario y amplía el alcance de tu aplicación, haciéndola más accesible y relevante para personas de diferentes orígenes lingüísticos.

### Casos de uso práctico

- **Mostrar errores del backend en el idioma del usuario**: Cuando ocurre un error, mostrar mensajes en el idioma nativo del usuario mejora la comprensión y reduce la frustración. Esto es especialmente útil para mensajes de error dinámicos que podrían mostrarse en componentes de front-end como toasts o modales.

- **Recuperación de contenido multilingüe**: Para aplicaciones que obtienen contenido de una base de datos, la internacionalización garantiza que puedas servir este contenido en varios idiomas. Esto es crucial para plataformas como sitios de comercio electrónico o sistemas de gestión de contenido que necesitan mostrar descripciones de productos, artículos y otros contenidos en el idioma preferido por el usuario.

- **Enviar correos electrónicos multilingües**: Ya sea correos electrónicos transaccionales, campañas de marketing o notificaciones, enviar correos electrónicos en el idioma del destinatario puede aumentar significativamente la participación y efectividad.

- **Notificaciones push multilingües**: Para aplicaciones móviles, enviar notificaciones push en el idioma preferido del usuario puede mejorar la interacción y retención. Este toque personal puede hacer que las notificaciones se sientan más relevantes y accionables.

- **Otras comunicaciones**: Cualquier forma de comunicación desde el backend, como mensajes SMS, alertas del sistema o actualizaciones de la interfaz de usuario, se beneficia de estar en el idioma del usuario, asegurando claridad y mejorando la experiencia general del usuario.

Al internacionalizar el backend, tu aplicación no solo respeta las diferencias culturales, sino que también se alinea mejor con las necesidades del mercado global, lo que constituye un paso clave para escalar tus servicios en todo el mundo.

## ¿Por qué integrar Intlayer?

- **Entorno seguro por tipo**: Aprovechar TypeScript para asegurar que todas tus definiciones de contenido sean precisas y sin errores.

## Instalación

Instala el paquete necesario utilizando tu gestor de paquetes preferido:

```bash
npm install express-intlayer
```

```bash
yarn add express-intlayer
```

```bash
pnpm add express-intlayer
```

### Configura Intlayer

Intlayer proporciona un archivo de configuración para configurar tu proyecto. Coloca este archivo en la raíz de tu proyecto.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Para una lista completa de los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

## Ejemplo de uso

Configura tu aplicación Express para usar `express-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
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
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
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
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
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
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### Compatibilidad

`express-intlayer` es completamente compatible con:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/index.md) para aplicaciones React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/next-intlayer/index.md) para aplicaciones Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/vite-intlayer/index.md) para aplicaciones Vite

También funciona sin problemas con cualquier solución de internacionalización en diversos entornos, incluidas navegadores y solicitudes de API. Puedes personalizar el middleware para detectar la configuración regional a través de encabezados o cookies:

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

Por defecto, `express-intlayer` interpretará el encabezado `Accept-Language` para determinar el idioma preferido del cliente.

## Funciones proporcionadas por el paquete `express-intlayer`

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/express-intlayer/t.md)
