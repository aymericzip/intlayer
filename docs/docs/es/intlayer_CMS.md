---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: CMS Intlayer | Externe tu contenido en el CMS Intlayer
description: Externe tu contenido en el CMS Intlayer para delegar la gestión de tu contenido a tu equipo.
keywords:
  - CMS
  - Editor visual
  - Internacionalización
  - Documentación
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cms
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
---

# Documentación del Sistema de Gestión de Contenidos (CMS) de Intlayer

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

El CMS de Intlayer es una aplicación que te permite externalizar el contenido de un proyecto de Intlayer.

Para ello, Intlayer introduce el concepto de 'diccionarios remotos'.

![Interfaz del CMS de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Entendiendo los diccionarios remotos

Intlayer diferencia entre diccionarios 'locales' y 'remotos'.

- Un diccionario 'local' es un diccionario que se declara en tu proyecto de Intlayer. Como el archivo de declaración de un botón o tu barra de navegación. Externalizar este contenido no tiene sentido en este caso porque este contenido no está destinado a cambiar con frecuencia.

- Un diccionario 'remoto' es un diccionario que se gestiona a través del CMS de Intlayer. Puede ser útil para permitir que tu equipo gestione el contenido directamente en tu sitio web, y también tiene como objetivo utilizar funciones de pruebas A/B y optimización automática de SEO.

## Editor visual vs CMS

El [Editor Visual de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) es una herramienta que te permite gestionar tu contenido en un editor visual para diccionarios locales. Una vez realizado un cambio, el contenido será reemplazado en la base de código. Esto significa que la aplicación se reconstruirá y la página se recargará para mostrar el nuevo contenido.

En contraste, el CMS de Intlayer es una herramienta que te permite gestionar tu contenido en un editor visual para diccionarios remotos. Una vez realizado un cambio, el contenido **no** impactará tu base de código. Y el sitio web mostrará automáticamente el contenido cambiado.

## Integración

Para más detalles sobre cómo instalar el paquete, consulta la sección correspondiente a continuación:

### Integración con Next.js

Para la integración con Next.js, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_15.md).

### Integración con Create React App

Para la integración con Create React App, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_create_react_app.md).

### Integración con Vite + React

Para la integración con Vite + React, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+react.md).

## Configuración

En tu archivo de configuración de Intlayer, puedes personalizar los ajustes del CMS:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... otros ajustes de configuración
  editor: {
    /**
     * Requerido
     *
     * La URL de la aplicación.
     * Esta es la URL objetivo del editor visual.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Requerido
     *
     * Se requieren el ID del cliente y el secreto del cliente para habilitar el editor.
     * Permiten identificar al usuario que está editando el contenido.
     * Se pueden obtener creando un nuevo cliente en el Panel de Intlayer - Proyectos (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opcional
     *
     * En caso de que estés alojando el CMS de Intlayer por tu cuenta, puedes establecer la URL del CMS.
     *
     * La URL del CMS de Intlayer.
     * Por defecto, está configurada como https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opcional
     *
     * En caso de que estés alojando el CMS de Intlayer por tu cuenta, puedes establecer la URL del backend.
     *
     * La URL del CMS de Intlayer.
     * Por defecto, está configurada como https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... otros ajustes de configuración
  editor: {
    /**
     * Requerido
     *
     * La URL de la aplicación.
     * Esta es la URL objetivo del editor visual.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Requerido
     *
     * Se requieren el ID del cliente y el secreto del cliente para habilitar el editor.
     * Permiten identificar al usuario que está editando el contenido.
     * Se pueden obtener creando un nuevo cliente en el Panel de Intlayer - Proyectos (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opcional
     *
     * En caso de que estés alojando el CMS de Intlayer por tu cuenta, puedes establecer la URL del CMS.
     *
     * La URL del CMS de Intlayer.
     * Por defecto, está configurada como https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opcional
     *
     * En caso de que estés alojando el CMS de Intlayer por tu cuenta, puedes establecer la URL del backend.
     *
     * La URL del CMS de Intlayer.
     * Por defecto, está configurada como https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
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
     * Requerido
     *
     * La URL de la aplicación.
     * Esta es la URL objetivo del editor visual.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Requerido
     *
     * Se requieren el ID del cliente y el secreto del cliente para habilitar el editor.
     * Permiten identificar al usuario que está editando el contenido.
     * Se pueden obtener creando un nuevo cliente en el Panel de Intlayer - Proyectos (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opcional
     *
     * En caso de que estés alojando el CMS de Intlayer por tu cuenta, puedes establecer la URL del CMS.
     *
     * La URL del CMS de Intlayer.
     * Por defecto, está configurada como https://intlayer.org
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opcional
     *
     * En caso de que estés alojando el CMS de Intlayer por tu cuenta, puedes establecer la URL del backend.
     *
     * La URL del CMS de Intlayer.
     * Por defecto, está configurada como https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> Si no tienes un ID de cliente y un secreto de cliente, puedes obtenerlos creando un nuevo cliente en el [Panel de Intlayer - Proyectos](https://intlayer.org/dashboard/projects).

> Para ver todos los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

## Usando el CMS

### Sube tu configuración

Para configurar el CMS de Intlayer, puedes usar los comandos del [CLI de Intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/es/intlayer_cli.md).

```bash
npx intlayer config push
```

> Si usas variables de entorno en tu archivo de configuración `intlayer.config.ts`, puedes especificar el entorno deseado usando el argumento `--env`:

```bash
npx intlayer config push --env production
```

Este comando sube tu configuración al CMS de Intlayer.

### Sube un diccionario

Para transformar tus diccionarios locales en un diccionario remoto, puedes usar los comandos del [CLI de Intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/es/intlayer_cli.md).

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> Si usas variables de entorno en tu archivo de configuración `intlayer.config.ts`, puedes especificar el entorno deseado usando el argumento `--env`:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

Este comando sube tus diccionarios de contenido iniciales, haciéndolos disponibles para su obtención y edición asincrónica a través de la plataforma de Intlayer.

### Edita el diccionario

Luego podrás ver y gestionar tu diccionario en el [CMS de Intlayer](https://intlayer.org/dashboard/content).

## Recarga en caliente

El CMS de Intlayer es capaz de recargar en caliente los diccionarios cuando se detecta un cambio.

Sin la recarga en caliente, será necesario un nuevo build de la aplicación para mostrar el nuevo contenido.
Al activar la configuración [`liveSync`](https://intlayer.org/doc/concept/configuration#editor-configuration), la aplicación reemplazará automáticamente el contenido actualizado cuando sea detectado.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... otros ajustes de configuración
  editor: {
    // ... otros ajustes de configuración

    /**
     * Indica si la aplicación debe recargar en caliente las configuraciones locales cuando se detecta un cambio.
     * Por ejemplo, cuando se agrega o actualiza un nuevo diccionario, la aplicación actualizará el contenido para mostrar en la página.
     *
     * Debido a que la recarga en caliente necesita una conexión continua con el servidor, solo está disponible para clientes del plan `enterprise`.
     *
     * Por defecto: false
     */
    liveSync: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... otros ajustes de configuración
  editor: {
    // ... otros ajustes de configuración

    /**
     * Indica si la aplicación debe recargar en caliente las configuraciones locales cuando se detecta un cambio.
     * Por ejemplo, cuando se agrega o actualiza un nuevo diccionario, la aplicación actualizará el contenido para mostrar en la página.
     *
     * Debido a que la recarga en caliente necesita una conexión continua con el servidor, solo está disponible para clientes del plan `enterprise`.
     *
     * Por defecto: false
     */
    liveSync: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... otros ajustes de configuración
  editor: {
    // ... otros ajustes de configuración

    /**
     * Indica si la aplicación debe recargar en caliente las configuraciones locales cuando se detecta un cambio.
     * Por ejemplo, cuando se agrega o actualiza un nuevo diccionario, la aplicación actualizará el contenido para mostrar en la página.
     *
     * Debido a que la recarga en caliente necesita una conexión continua con el servidor, solo está disponible para clientes del plan `enterprise`.
     *
     * Por defecto: false
     */
    liveSync: true,
  },
};

module.exports = config;
```

La recarga en caliente reemplaza el contenido tanto en el lado del servidor como en el cliente.

- En el lado del servidor, debes asegurarte de que el proceso de la aplicación tenga acceso de escritura al directorio `.intlayer/dictionaries`.
- En el lado del cliente, la recarga en caliente permite que la aplicación recargue el contenido en el navegador sin necesidad de recargar la página. Sin embargo, esta función solo está disponible para componentes de cliente.
  > Debido a que la recarga en caliente necesita una conexión continua con el servidor utilizando un `EventListener`, solo está disponible para clientes del plan `enterprise`.

## Depuración

Si encuentras algún problema con el CMS, verifica lo siguiente:

- La aplicación está en ejecución.

- La configuración del [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) está correctamente establecida en tu archivo de configuración de Intlayer.
  - Campos requeridos:
    - La URL de la aplicación debe coincidir con la que configuraste en la configuración del editor (`applicationURL`).
    - La URL del CMS.

- Asegúrate de que la configuración del proyecto fue subida al CMS de Intlayer.
- El editor visual utiliza un iframe para mostrar tu sitio web. Asegúrate de que la Política de Seguridad de Contenidos (CSP) de tu sitio web permita la URL del CMS como `frame-ancestors` ('https://intlayer.org' por defecto). Revisa la consola del editor para detectar cualquier error.

## Historial del documento

- 5.5.10 - 2025-06-29: Historial inicial
