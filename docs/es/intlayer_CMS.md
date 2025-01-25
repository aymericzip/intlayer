# Intlayer Sistema de Gestión de Contenidos (CMS)

El Intlayer CMS es una aplicación que te permite externalizar tu contenido de un proyecto de Intlayer.

Para ello, Intlayer introduce el concepto de 'diccionarios distantes'.

## Entendiendo los diccionarios distantes

Intlayer hace una diferencia entre 'diccionarios locales' y 'diccionarios distantes'.

- Un 'diccionario local' es un diccionario que se declara en tu proyecto de Intlayer. Como el archivo de declaración de un botón o tu barra de navegación. Externalizar tu contenido no tiene sentido en este caso porque este contenido no se supone que cambie a menudo.

- Un 'diccionario distante' es un diccionario que se gestiona a través del Intlayer CMS. Podría ser útil permitir que tu equipo gestione tu contenido directamente en tu sitio web, y también tiene como objetivo utilizar funciones de pruebas A/B y optimización automática de SEO.

## Editor visual vs CMS

El [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_visual_editor.md) editor es una herramienta que te permite gestionar tu contenido en un editor visual para diccionarios locales. Una vez que se realiza un cambio, el contenido se reemplazará en la base de código. Esto significa que la aplicación se reconstruirá y la página se recargará para mostrar el nuevo contenido.

En contraste, el Intlayer CMS es una herramienta que te permite gestionar tu contenido en un editor visual para diccionarios distantes. Una vez que se realiza un cambio, el contenido **no** impactará tu base de código. Y el sitio web mostrará automáticamente el contenido cambiado.

## Integración

Para más detalles sobre cómo instalar el paquete, consulta la sección relevante a continuación:

### Integración con Next.js

Para la integración con Next.js, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_nextjs_15.md).

### Integración con Create React App

Para la integración con Create React App, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_create_react_app.md).

### Integración con Vite + React

Para la integración con Vite + React, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_with_vite+react.md).

## Configuración

### 1. Habilitar el Editor en tu archivo intlayer.config.ts

En tu archivo de configuración de Intlayer, puedes personalizar la configuración del editor:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... otros ajustes de configuración
  editor: {
    /**
     * El ID del cliente y el secreto del cliente son necesarios para habilitar el editor.
     * Permiten identificar al usuario que está editando el contenido.
     * Pueden obtenerse creando un nuevo cliente en el Intlayer Dashboard - Projects (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * Opcional
     * Por defecto es `true`. Si es `false`, el editor está inactivo y no se puede acceder.
     * Se puede usar para desactivar el editor para entornos específicos por razones de seguridad, como producción.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... otros ajustes de configuración
  editor: {
    /**
     * El ID del cliente y el secreto del cliente son necesarios para habilitar el editor.
     * Permiten identificar al usuario que está editando el contenido.
     * Pueden obtenerse creando un nuevo cliente en el Intlayer Dashboard - Projects (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * Opcional
     * Por defecto es `true`. Si es `false`, el editor está inactivo y no se puede acceder.
     * Se puede usar para desactivar el editor para entornos específicos por razones de seguridad, como producción.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... otros ajustes de configuración
  editor: {
    /**
     * El ID del cliente y el secreto del cliente son necesarios para habilitar el editor.
     * Permiten identificar al usuario que está editando el contenido.
     * Pueden obtenerse creando un nuevo cliente en el Intlayer Dashboard - Projects (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * Opcional
     * Por defecto es `true`. Si es `false`, el editor está inactivo y no se puede acceder.
     * Se puede usar para desactivar el editor para entornos específicos por razones de seguridad, como producción.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> Si no tienes un ID de cliente y un secreto de cliente, puedes obtenerlos creando un nuevo cliente en el [Intlayer Dashboard - Projects](https://intlayer.org/dashboard/projects).

> Para ver todos los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/es/configuration.md).

## Usando el CMS

Cuando el editor está instalado, puedes ver cada campo indexado por Intlayer al pasar el cursor sobre tu contenido.

![Pasando el cursor sobre el contenido](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Si tu contenido está delineado, puedes mantener presionado para mostrar el cajón de edición.
