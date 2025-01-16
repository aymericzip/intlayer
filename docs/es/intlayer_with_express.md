# Comenzando con la internacionalización (i18n) usando Intlayer y Express

`express-intlayer` es un poderoso middleware de internacionalización (i18n) para aplicaciones de Express, diseñado para hacer que sus servicios backend sean accesibles globalmente al proporcionar respuestas localizadas basadas en las preferencias del cliente.

## ¿Por qué internacionalizar su backend?

Internacionalizar su backend es esencial para servir eficazmente a una audiencia global. Permite que su aplicación entregue contenido y mensajes en el idioma preferido de cada usuario. Esta capacidad mejora la experiencia del usuario y amplía el alcance de su aplicación al hacerla más accesible y relevante para personas de diferentes orígenes lingüísticos.

### Casos de uso práctico

- **Mostrar errores del backend en el idioma del usuario**: Cuando ocurre un error, mostrar mensajes en el idioma nativo del usuario mejora la comprensión y reduce la frustración. Esto es especialmente útil para mensajes de error dinámicos que podrían mostrarse en componentes del front-end como toasts o modales.

- **Recuperar contenido multilingüe**: Para aplicaciones que extraen contenido de una base de datos, la internacionalización asegura que pueda servir este contenido en múltiples idiomas. Esto es crucial para plataformas como sitios de comercio electrónico o sistemas de gestión de contenido que necesitan mostrar descripciones de productos, artículos y otro contenido en el idioma preferido por el usuario.

- **Enviar correos electrónicos multilingües**: Ya se trate de correos electrónicos transaccionales, campañas de marketing o notificaciones, enviar correos electrónicos en el idioma del destinatario puede aumentar significativamente la participación y efectividad.

- **Notificaciones push multilingües**: Para aplicaciones móviles, enviar notificaciones push en el idioma preferido del usuario puede mejorar la interacción y retención. Este toque personal puede hacer que las notificaciones se sientan más relevantes y accionables.

- **Otras comunicaciones**: Cualquier forma de comunicación desde el backend, como mensajes SMS, alertas del sistema o actualizaciones de la interfaz de usuario, se beneficia de estar en el idioma del usuario, asegurando claridad y mejorando la experiencia general del usuario.

Al internacionalizar el backend, su aplicación no solo respeta las diferencias culturales, sino que también se alinea mejor con las necesidades del mercado global, lo que la convierte en un paso clave para escalar sus servicios en todo el mundo.

## Comenzando

### Instalación

Para comenzar a usar `express-intlayer`, instale el paquete usando npm:

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

Configure los ajustes de internacionalización creando un `intlayer.config.ts` en la raíz de su proyecto:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internacionalizacion: {
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
  internacionalizacion: {
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
  internacionalizacion: {
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

Configure su aplicación Express para usar `express-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Cargar el manejador de solicitud de internacionalización
app.use(intlayer());

// Rutas
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Ejemplo de contenido devuelto en inglés",
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
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// Cargar el manejador de solicitud de internacionalización
app.use(intlayer());

// Rutas
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Ejemplo de contenido devuelto en inglés",
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
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// Cargar el manejador de solicitud de internacionalización
app.use(intlayer());

// Rutas
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Ejemplo de contenido devuelto en inglés",
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

`express-intlayer` es completamente compatible con:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/react-intlayer/index.md) para aplicaciones React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/next-intlayer/index.md) para aplicaciones Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/es/packages/vite-intlayer/index.md) para aplicaciones Vite

También funciona sin problemas con cualquier solución de internacionalización en diversos entornos, incluidos navegadores y solicitudes API. Puede personalizar el middleware para detectar el idioma a través de encabezados o cookies:

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

> Para más información sobre configuración y temas avanzados, visite nuestra [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

## Impulsado por TypeScript

`express-intlayer` aprovecha las robustas capacidades de TypeScript para mejorar el proceso de internacionalización. El tipado estático de TypeScript asegura que cada clave de traducción esté contabilizada, reduciendo el riesgo de traducciones faltantes y mejorando la mantenibilidad.

> Asegúrese de que los tipos generados (por defecto en ./types/intlayer.d.ts) estén incluidos en su archivo tsconfig.json.
