---
createdAt: 2026-07-08
updatedAt: 2026-07-08
title: Sincronización en vivo | Refleja los cambios de contenido del CMS en tiempo real
description: Permite que tu aplicación refleje los cambios de contenido del CMS de Intlayer en tiempo de ejecución, sin necesidad de reconstruir ni volver a implementar.
keywords:
  - Sincronización en vivo
  - Live Sync
  - CMS
  - Editor Visual
  - Internacionalización
  - Documentación
  - Intlayer
  - Next.js
  - Vite
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Trasladado desde la documentación del CMS de Intlayer a su propia página"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Añadida documentación de sincronización en vivo"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Reemplazado el campo `hotReload` por `liveSync`"
author: aymericzip
---

# Sincronización en vivo

La sincronización en vivo permite que tu aplicación refleje los cambios de contenido del CMS en runtime. No se requiere reconstrucción ni redepliegue. Cuando está habilitada, las actualizaciones se transmiten a un servidor de sincronización en vivo que actualiza los diccionarios que tu aplicación lee.

## Tabla de contenidos

<TOC/>

---

## Activar la sincronización en vivo

> Live Sync requiere una conexión continua al servidor y está disponible en el plan enterprise.

Habilita Live Sync actualizando tu configuración de Intlayer:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
  dictionary: {
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
    importMode: "fetch",
  },
};

export default config;
```

Inicie el servidor Live Sync para envolver su aplicación:

Ejemplo usando Next.js:

```json5 fileName="package.json"
{
  "scripts": {
    // ... otros scripts
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --with 'next start'",
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
    "start": "npx intlayer live --with 'vite start'",
  },
}
```

El servidor Live Sync envuelve su aplicación y aplica automáticamente el contenido actualizado a medida que llega.

Para recibir notificaciones de cambios desde el CMS, el servidor Live Sync mantiene una conexión SSE con el backend. Cuando el contenido cambia en el CMS, el backend envía la actualización al servidor Live Sync, que escribe los nuevos diccionarios. Su aplicación reflejará la actualización en la siguiente navegación o recarga del navegador, sin necesidad de reconstrucción.

Diagrama de flujo (CMS/Backend -> Servidor Live Sync -> Servidor de Aplicación -> Frontend):

![Esquema de lógica de Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

Cómo funciona:

![Esquema de flujo Live Sync CMS/Backend/Servidor Live Sync/Servidor de Aplicación/Frontend](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

## Flujo de trabajo de desarrollo (local)

docs/ko/intlayer_CMS.md

- En desarrollo, todos los diccionarios remotos se obtienen cuando la aplicación se inicia, para que puedas probar actualizaciones rápidamente.
- Para probar Live Sync localmente con Next.js, envuelve tu servidor de desarrollo:

```json5 fileName="package.json"
{
  "scripts": {
    // ... otros scripts
    "dev": "npx intlayer live --with 'next dev'",
    // "dev": "npx intlayer live --with 'vite dev'", // Para Vite
  },
}
```

Habilita la optimización para que Intlayer aplique las transformaciones de importación en vivo durante el desarrollo:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  dictionary: {
    importMode: "fetch",
  },
  build: {
    optimize: true,
  },
};

export default config;
```

Esta configuración envuelve tu servidor de desarrollo con el servidor Live Sync, obtiene los diccionarios remotos al iniciar y transmite actualizaciones desde el CMS vía SSE. Actualiza la página para ver los cambios.

## Notas y restricciones

- Añade el origen de live sync a la política de seguridad de tu sitio (CSP). Asegúrate de que la URL de live sync esté permitida en `connect-src` (y en `frame-ancestors` si es relevante).
- Live Sync no funciona con salida estática. Para Next.js, la página debe ser dinámica para recibir actualizaciones en runtime (por ejemplo, usa `generateStaticParams`, `generateMetadata`, `getServerSideProps` o `getStaticProps` adecuadamente para evitar restricciones de solo estático).
- En el CMS, cada diccionario tiene una bandera `live`. Solo los diccionarios con `live=true` se obtienen a través de la API de live sync; los demás se importan dinámicamente y permanecen sin cambios en tiempo de ejecución.
- La bandera `live` se evalúa para cada diccionario en el momento de la compilación. Si el contenido remoto no estaba marcado como `live=true` durante la compilación, debes recompilar para habilitar Live Sync para ese diccionario.
- El servidor de live sync debe poder escribir en `.intlayer`. En contenedores, asegura el acceso de escritura a `/.intlayer`.

## Enlaces útiles

- [CMS de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)
- [Editor Visual de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md)
- [Referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)
- [Guía de Auto-alojamiento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md)
