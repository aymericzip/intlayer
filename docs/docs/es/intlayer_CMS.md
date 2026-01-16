---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Intlayer CMS | Externaliza tu contenido en el Intlayer CMS
description: Externaliza tu contenido en el Intlayer CMS para delegar la gestión de tu contenido a tu equipo.
keywords:
  - CMS
  - Editor Visual
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
history:
  - version: 6.0.1
    date: 2025-09-22
    changes: Añadida documentación de sincronización en vivo
  - version: 6.0.0
    date: 2025-09-04
    changes: Reemplazado el campo `hotReload` por `liveSync`
  - version: 5.5.10
    date: 2025-06-29
    changes: Historial inicial
---

# Documentación del Sistema de Gestión de Contenidos (CMS) de Intlayer

<iframe title="Editor Visual + CMS para tu Aplicación Web: Explicación de Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

El CMS de Intlayer es una aplicación que te permite externalizar el contenido de un proyecto Intlayer.

Para ello, Intlayer introduce el concepto de 'diccionarios distantes'.

![Interfaz del CMS de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Entendiendo los diccionarios distantes

Intlayer diferencia entre diccionarios 'locales' y 'distantes'.

- Un diccionario 'local' es un diccionario que se declara en tu proyecto Intlayer. Como el archivo de declaración de un botón, o tu barra de navegación. Externalizar tu contenido no tiene sentido en este caso porque se supone que este contenido no debe cambiar con frecuencia.

- Un diccionario 'distante' es un diccionario que se gestiona a través del CMS de Intlayer. Puede ser útil para permitir que tu equipo gestione el contenido directamente en tu sitio web, y también tiene como objetivo utilizar funciones de pruebas A/B y optimización automática para SEO.

## Editor visual vs CMS

El editor [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) es una herramienta que te permite gestionar tu contenido en un editor visual para diccionarios locales. Una vez que se realiza un cambio, el contenido será reemplazado en la base de código. Eso significa que la aplicación se reconstruirá y la página se recargará para mostrar el nuevo contenido.

En contraste, el CMS de Intlayer es una herramienta que te permite gestionar tu contenido en un editor visual para diccionarios distantes. Una vez que se realiza un cambio, el contenido **no** afectará tu base de código. Y el sitio web mostrará automáticamente el contenido modificado.

## Integración

Para más detalles sobre cómo instalar el paquete, consulta la sección correspondiente a continuación:

### Integración con Next.js

Para la integración con Next.js, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_15.md).

### Integración con Create React App

Para la integración con Create React App, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_create_react_app.md).

### Integración con Vite + React

Para la integración con Vite + React, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+react.md).

## Configuración

Ejecuta el siguiente comando para iniciar sesión en el Intlayer CMS:

```bash packageManager="npm"
npx intlayer login
```

```bash packageManager="yarn"
yarn intlayer login
```

```bash packageManager="pnpm"
pnpm intlayer login
```

```bash packageManager="bun"
bunx intlayer login
```

Esto abrirá tu navegador predeterminado para completar el proceso de autenticación y recibir las credenciales necesarias (Client ID y Client Secret) para usar los servicios de Intlayer.

En tu archivo de configuración de Intlayer, puedes personalizar los ajustes del CMS:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... otras configuraciones
  editor: {
    /**
     * Requerido
     *
     * La URL de la aplicación.
     * Esta es la URL a la que apunta el editor visual.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Requerido
     *
     * El ID de cliente y el secreto de cliente son necesarios para habilitar el editor.
     * Permiten identificar al usuario que está editando el contenido.
     * Se pueden obtener creando un nuevo cliente en el Panel de Intlayer - Proyectos (https://app.intlayer.org/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opcional
     *
     * En caso de que esté alojando el Intlayer CMS por su cuenta, puede configurar la URL del CMS.
     *
     * La URL del Intlayer CMS.
     * Por defecto, está configurada a https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opcional
     *
     * En caso de que esté alojando el Intlayer CMS por su cuenta, puede configurar la URL del backend.
     *
     * La URL del Intlayer CMS.
     * Por defecto, está configurada a https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... otras configuraciones
  editor: {
    /**
     * Requerido
     *
     * La URL de la aplicación.
     * Esta es la URL a la que apunta el editor visual.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Requerido
     *
     * El ID de cliente y el secreto de cliente son necesarios para habilitar el editor.
     * Permiten identificar al usuario que está editando el contenido.
     * Se pueden obtener creando un nuevo cliente en el Panel de Intlayer - Proyectos (https://app.intlayer.org/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opcional
     *
     * En caso de que esté alojando el Intlayer CMS por su cuenta, puede configurar la URL del CMS.
     *
     * La URL del CMS de Intlayer.
     * Por defecto, está configurada a https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opcional
     *
     * En caso de que estés alojando el CMS de Intlayer por tu cuenta, puedes configurar la URL del backend.
     *
     * La URL del CMS de Intlayer.
     * Por defecto, está configurada a https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... otras configuraciones
  editor: {
    /**
     * Requerido
     *
     * La URL de la aplicación.
     * Esta es la URL a la que apunta el editor visual.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Requerido
     *
     * El ID de cliente y el secreto de cliente son necesarios para habilitar el editor.
     * Permiten identificar al usuario que está editando el contenido.
     * Se pueden obtener creando un nuevo cliente en el Panel de Intlayer - Proyectos (https://app.intlayer.org/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Opcional
     *
     * En caso de que estés alojando el CMS de Intlayer por tu cuenta, puedes configurar la URL del CMS.
     *
     * La URL del CMS de Intlayer.
     * Por defecto, está configurada a https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Opcional
     *
     * En caso de que estés alojando el Intlayer CMS por tu cuenta, puedes configurar la URL del backend.
     *
     * La URL del Intlayer CMS.
     * Por defecto, está configurada en https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> Si no tienes un ID de cliente y un secreto de cliente, puedes obtenerlos creando un nuevo cliente en el [Panel de Intlayer - Proyectos](https://app.intlayer.org/projects).

> Para ver todos los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

## Uso del CMS

### Enviar tu configuración

Para configurar el Intlayer CMS, puedes usar los comandos del [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/es/intlayer_cli.md).

```bash
npx intlayer config push
```

> Si usas variables de entorno en tu archivo de configuración `intlayer.config.ts`, puedes especificar el entorno deseado usando el argumento `--env`:

```bash
npx intlayer config push --env production
```

Este comando sube tu configuración al Intlayer CMS.

### Subir un diccionario

Para transformar tus diccionarios de localización en un diccionario remoto, puedes usar los comandos del [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/es/intlayer_cli.md).

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> Si usas variables de entorno en tu archivo de configuración `intlayer.config.ts`, puedes especificar el entorno deseado usando el argumento `--env`:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

Este comando sube tus diccionarios de contenido inicial, haciéndolos disponibles para su obtención y edición asíncrona a través de la plataforma Intlayer.

### Editar el diccionario

Luego podrás ver y gestionar tu diccionario en el [Intlayer CMS](https://app.intlayer.org/content).

## Sincronización en vivo

La sincronización en vivo permite que tu aplicación refleje los cambios de contenido del CMS en tiempo de ejecución. No se requiere reconstrucción ni redepliegue. Cuando está habilitada, las actualizaciones se transmiten a un servidor de sincronización en vivo que actualiza los diccionarios que tu aplicación lee.

> Live Sync requiere una conexión continua al servidor y está disponible en el plan enterprise.

Habilita Live Sync actualizando tu configuración de Intlayer:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... otras configuraciones
  editor: {
    /**
     * Habilita la recarga en caliente de las configuraciones de localización cuando se detectan cambios.
     * Por ejemplo, cuando se añade o actualiza un diccionario, la aplicación actualiza
     * el contenido mostrado en la página.
     *
     * Debido a que la recarga en caliente requiere una conexión continua al servidor,
     * solo está disponible para clientes del plan `enterprise`.
     *
     * Por defecto: false
     */
    liveSync: true,
  },
  build: {
    /**
     * Controla cómo se importan los diccionarios:
     *
     * - "live": Los diccionarios se obtienen dinámicamente usando la API de Live Sync.
     *   Reemplaza useIntlayer por useDictionaryDynamic.
     *
     * Nota: El modo live usa la API de Live Sync para obtener los diccionarios. Si la llamada a la API
     * falla, los diccionarios se importan dinámicamente.
     * Nota: Solo los diccionarios con contenido remoto y la bandera "live" usan el modo live.
     * Los demás usan el modo dinámico para mejorar el rendimiento.
     */
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... otras configuraciones
  editor: {
    /**
     * Habilita la recarga en caliente de las configuraciones de localización cuando se detectan cambios.
     * Por ejemplo, cuando se añade o actualiza un diccionario, la aplicación actualiza
     * el contenido mostrado en la página.
     *
     * Debido a que la recarga en caliente requiere una conexión continua con el servidor,
     * solo está disponible para clientes del plan `enterprise`.
     *
     * Por defecto: false
     */
    liveSync: true,
  },
  build: {
    /**
     * Controla cómo se importan los diccionarios:
     *
     * - "live": Los diccionarios se obtienen dinámicamente usando la API de Live Sync.
     *   Reemplaza useIntlayer por useDictionaryDynamic.
     *
     * Nota: El modo live usa la API de Live Sync para obtener los diccionarios. Si la llamada a la API
     * falla, los diccionarios se importan dinámicamente.
     * Nota: Solo los diccionarios con contenido remoto y la bandera "live" usan el modo en vivo.
     * Otros usan el modo dinámico para mejorar el rendimiento.
     */
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... otras configuraciones
  editor: {
    /**
     * Habilita la recarga en caliente de las configuraciones de localización cuando se detectan cambios.
     * Por ejemplo, cuando se añade o actualiza un diccionario, la aplicación actualiza
     * el contenido mostrado en la página.
     *
     * Debido a que la recarga en caliente requiere una conexión continua con el servidor,
     * solo está disponible para clientes del plan `enterprise`.
     *
     * Por defecto: false
     */
    liveSync: true,

    /**
     * El puerto del servidor Live Sync.
     *
     * Predeterminado: 4000
     */
    liveSyncPort: 4000,

    /**
     * La URL del servidor Live Sync.
     *
     * Predeterminado: http://localhost:{liveSyncPort}
     */
    liveSyncURL: "https://live.example.com",
  },
  build: {
    /**
     * Controla cómo se importan los diccionarios:
     *
     * - "live": Los diccionarios se obtienen dinámicamente usando la API de Live Sync.
     *   Reemplaza useIntlayer por useDictionaryDynamic.
     *
     * Nota: El modo en vivo usa la API de Live Sync para obtener los diccionarios. Si la llamada a la API
     * falla, los diccionarios se importan dinámicamente.
     * Nota: Solo los diccionarios con contenido remoto y la bandera "live" usan el modo en vivo.
     * Otros usan el modo dinámico para mejorar el rendimiento.
     */
    importMode: "live",
  },
};

module.exports = config;
```

Inicie el servidor Live Sync para envolver su aplicación:

Ejemplo usando Next.js:

```json5 fileName="package.json"
{
  "scripts": {
    // ... otros scripts
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --process 'next start'",
  },
}
```

Ejemplo usando Vite:

```json5 fileName="package.json"
{
  "scripts": {
    // ... otros scripts
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --process 'vite start'",
  },
}
```

El servidor Live Sync envuelve su aplicación y aplica automáticamente el contenido actualizado a medida que llega.

Para recibir notificaciones de cambios desde el CMS, el servidor Live Sync mantiene una conexión SSE con el backend. Cuando el contenido cambia en el CMS, el backend envía la actualización al servidor Live Sync, que escribe los nuevos diccionarios. Su aplicación reflejará la actualización en la siguiente navegación o recarga del navegador, sin necesidad de reconstrucción.

Diagrama de flujo (CMS/Backend -> Servidor Live Sync -> Servidor de Aplicación -> Frontend):

![Esquema de lógica de Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

Cómo funciona:

![Esquema de flujo Live Sync CMS/Backend/Servidor Live Sync/Servidor de Aplicación/Frontend](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

### Flujo de trabajo de desarrollo (local)

docs/ko/intlayer_CMS.md

- En desarrollo, todos los diccionarios remotos se obtienen cuando la aplicación se inicia, para que puedas probar actualizaciones rápidamente.
- Para probar Live Sync localmente con Next.js, envuelve tu servidor de desarrollo:

```json5 fileName="package.json"
{
  "scripts": {
    // ... otros scripts
    "dev": "npx intlayer live --process 'next dev'",
    // "dev": "npx intlayer live --process 'vite dev'", // Para Vite
  },
}
```

Habilita la optimización para que Intlayer aplique las transformaciones de importación en vivo durante el desarrollo:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

module.exports = config;
```

Esta configuración envuelve tu servidor de desarrollo con el servidor Live Sync, obtiene los diccionarios remotos al iniciar y transmite actualizaciones desde el CMS vía SSE. Actualiza la página para ver los cambios.

Notas y restricciones:

- Añade el origen de live sync a la política de seguridad de tu sitio (CSP). Asegúrate de que la URL de live sync esté permitida en `connect-src` (y en `frame-ancestors` si es relevante).
- Live Sync no funciona con salida estática. Para Next.js, la página debe ser dinámica para recibir actualizaciones en tiempo de ejecución (por ejemplo, usa `generateStaticParams`, `generateMetadata`, `getServerSideProps` o `getStaticProps` adecuadamente para evitar restricciones de solo estático).

Esta configuración envuelve tu servidor de desarrollo con el servidor Live Sync, obtiene diccionarios remotos al iniciar y transmite actualizaciones desde el CMS vía SSE. Actualiza la página para ver los cambios.

Notas y restricciones:

- Añade el origen de live sync a la política de seguridad de tu sitio (CSP). Asegúrate de que la URL de live sync esté permitida en `connect-src` (y en `frame-ancestors` si es relevante).
- Live Sync no funciona con salida estática. Para Next.js, la página debe ser dinámica para recibir actualizaciones en tiempo de ejecución (por ejemplo, usa `generateStaticParams`, `generateMetadata`, `getServerSideProps` o `getStaticProps` adecuadamente para evitar restricciones de solo estático).
- La URL de la aplicación debe coincidir con la que configuraste en la configuración del editor (`applicationURL`).
- La URL del CMS

- Asegúrate de que la configuración del proyecto se haya enviado al CMS de Intlayer.

- El editor visual utiliza un iframe para mostrar tu sitio web. Asegúrate de que la Política de Seguridad de Contenidos (CSP) de tu sitio web permita la URL del CMS como `frame-ancestors` ('https://app.intlayer.org' por defecto). Revisa la consola del editor para cualquier error.
