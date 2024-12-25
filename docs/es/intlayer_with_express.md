# Comenzando a internacionalizar (i18n) con Intlayer y Express

`express-intlayer` es un potente middleware de internacionalización (i18n) para aplicaciones de Express, diseñado para hacer que tus servicios de backend sean accesibles globalmente proporcionando respuestas localizadas basadas en las preferencias del cliente.

## ¿Por qué internacionalizar tu backend?

Internacionalizar tu backend es esencial para servir de manera efectiva a una audiencia global. Permite que tu aplicación entregue contenido y mensajes en el idioma preferido de cada usuario. Esta capacidad mejora la experiencia del usuario y amplía el alcance de tu aplicación al hacerla más accesible y relevante para personas de diferentes orígenes lingüísticos.

### Casos de Uso Prácticos

- **Mostrar Errores del Backend en el Idioma del Usuario**: Cuando ocurre un error, mostrar mensajes en el idioma nativo del usuario mejora la comprensión y reduce la frustración. Esto es especialmente útil para mensajes de error dinámicos que podrían mostrarse en componentes de front-end como toasts o modales.

- **Recuperar Contenido Multilingüe**: Para aplicaciones que obtienen contenido de una base de datos, la internacionalización asegura que puedas servir este contenido en múltiples idiomas. Esto es crucial para plataformas como sitios de comercio electrónico o sistemas de gestión de contenido que necesitan mostrar descripciones de productos, artículos y otro contenido en el idioma preferido por el usuario.

- **Enviar Correos Electrónicos Multilingües**: Ya sea correos electrónicos transaccionales, campañas de marketing o notificaciones, enviar correos electrónicos en el idioma del destinatario puede aumentar significativamente la participación y efectividad.

- **Notificaciones Push Multilingües**: Para aplicaciones móviles, enviar notificaciones push en el idioma preferido de un usuario puede mejorar la interacción y la retención. Este toque personal puede hacer que las notificaciones se sientan más relevantes y accionables.

- **Otras Comunicaciones**: Cualquier forma de comunicación desde el backend, como mensajes SMS, alertas del sistema o actualizaciones de la interfaz de usuario, se beneficia de estar en el idioma del usuario, asegurando claridad y mejorando la experiencia general del usuario.

Al internacionalizar el backend, tu aplicación no solo respeta las diferencias culturales, sino que también se alinea mejor con las necesidades del mercado global, lo que lo convierte en un paso clave para escalar tus servicios en todo el mundo.

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

Configura las opciones de internacionalización creando un `intlayer.config.ts` en la raíz de tu proyecto:

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

### Configuración de la Aplicación Express

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

// Cargar el manejador de solicitudes de internacionalización
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

// Cargar el manejador de solicitudes de internacionalización
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

- `react-intlayer` para aplicaciones React
- `next-intlayer` para aplicaciones Next.js

También funciona sin problemas con cualquier solución de internacionalización en diversos entornos, incluidos navegadores y solicitudes de API. Puedes personalizar el middleware para detectar el locale a través de encabezados o cookies:

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

> Para más información sobre configuración y temas avanzados, visita nuestra [documentación](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

## Impulsado por TypeScript

`express-intlayer` aprovecha las robustas capacidades de TypeScript para mejorar el proceso de internacionalización. La tipificación estática de TypeScript asegura que cada clave de traducción esté contabilizada, reduciendo el riesgo de traducciones faltantes y mejorando la mantenibilidad.

> Asegúrate de que los tipos generados (por defecto en ./types/intlayer.d.ts) estén incluidos en tu archivo tsconfig.json.
