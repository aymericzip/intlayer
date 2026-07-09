---
createdAt: 2025-08-23
updatedAt: 2026-07-08
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
  - version: 9.0.0
    date: 2026-07-08
    changes: "Se trasladó la sección «Sincronización en vivo» a su propia página (live-sync.md), dejando aquí una breve introducción y un enlace"
  - version: 9.0.0
    date: 2026-06-30
    changes: "Añadida sección de Auto-alojamiento: bootstrap Docker Compose, inventario de servicios, configuración SDK, características opcionales y notas de actualización"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Añadida documentación de sincronización en vivo"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Reemplazado el campo `hotReload` por `liveSync`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historial inicial"
author: aymericzip
---

# Documentación del Sistema de Gestión de Contenidos (CMS) de Intlayer

<iframe title="Editor Visual + CMS para tu Aplicación Web: Explicación de Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

El CMS de Intlayer es una aplicación que te permite externalizar el contenido de un proyecto Intlayer.

Para ello, Intlayer introduce el concepto de 'diccionarios distantes'.

![Interfaz del CMS de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Tabla de Contenidos

<TOC/>

---

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
bun x intlayer login
```

Esto abrirá tu navegador predeterminado para completar el proceso de autenticación y recibir las credenciales necesarias (Client ID y Client Secret) para usar los servicios de Intlayer.

En tu archivo de configuración de Intlayer, puedes personalizar los ajustes del CMS:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Si no tienes un ID de cliente y un secreto de cliente, puedes obtenerlos creando un nuevo cliente en el [Panel de Intlayer - Proyectos](https://app.intlayer.org/projects).

> Para ver todos los parámetros disponibles, consulta la [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).

## Uso del CMS

### Enviar tu configuración

Para configurar el Intlayer CMS, puedes usar los comandos del [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/es/cli/index.md).

```bash packageManager="npm"
npx intlayer config push
```

```bash packageManager="yarn"
yarn intlayer config push
```

```bash packageManager="pnpm"
pnpm intlayer config push
```

```bash packageManager="bun"
bun x intlayer config push
```

> Si usas variables de entorno en tu archivo de configuración `intlayer.config.ts`, puedes especificar el entorno deseado usando el argumento `--env`:

```bash packageManager="npm"
npx intlayer config push --env production
```

```bash packageManager="yarn"
yarn intlayer config push --env production
```

```bash packageManager="pnpm"
pnpm intlayer config push --env production
```

```bash packageManager="bun"
bun x intlayer config push --env production
```

Este comando sube tu configuración al Intlayer CMS.

### Subir un diccionario

Para transformar tus diccionarios de localización en un diccionario remoto, puedes usar los comandos del [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/es/cli/index.md).

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key
```

> Si usas variables de entorno en tu archivo de configuración `intlayer.config.ts`, puedes especificar el entorno deseado usando el argumento `--env`:

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key --env production
```

Este comando sube tus diccionarios de contenido inicial, haciéndolos disponibles para su obtención y edición asíncrona a través de la plataforma Intlayer.

### Editar el diccionario

Luego podrás ver y gestionar tu diccionario en el [Intlayer CMS](https://app.intlayer.org/content).

## Sincronización en vivo

La sincronización en vivo permite que tu aplicación refleje los cambios de contenido del CMS en runtime. No se requiere reconstrucción ni redepliegue. Cuando está habilitada, las actualizaciones se transmiten a un servidor de sincronización en vivo que actualiza los diccionarios que tu aplicación lee.

Para la guía de configuración completa (activación, inicio del servidor Live Sync, flujo de trabajo de desarrollo local y restricciones), consulta la [documentación de Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/live-sync.md).

## Auto-alojamiento

Intlayer puede ejecutarse completamente en tu propia infraestructura — no se requiere cuenta de Intlayer Cloud. Un solo comando arranca toda la pila (panel de control, API, base de datos, almacenamiento de objetos y correo electrónico) mediante Docker Compose:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Esto descarga un `docker-compose.yml` y un `.env`, genera automáticamente los secretos necesarios (`BETTER_AUTH_SECRET`, credenciales de MinIO) y arranca todos los contenedores con `docker compose up -d`. Volver a ejecutar el mismo comando en una instalación existente realiza una actualización progresiva sin pérdida de datos.

### Servicios iniciados

| Servicio                   | Puerto(s)                            | Propósito                                             |
| -------------------------- | ------------------------------------ | ----------------------------------------------------- |
| **app** (panel de control) | `3000`                               | Interfaz CMS TanStack Start                           |
| **backend** (API)          | `3100`                               | API REST Fastify                                      |
| **MongoDB 7**              | interno                              | Base de datos principal (replica set de un solo nodo) |
| **Redis 7**                | interno                              | Colas de trabajos y caché                             |
| **MinIO**                  | `9000` (S3), `9001` (consola)        | Almacenamiento de objetos compatible con S3           |
| **Mailpit**                | `1025` (SMTP), `8025` (interfaz web) | Sumidero local de correo transaccional                |

Chromium (para la generación de capturas de pantalla con Puppeteer) está incluido en la imagen del backend — no se necesita ningún contenedor adicional.

### Conectar tu proyecto a una instancia auto-alojada

Apunta tu configuración de Intlayer a tu propio backend y panel de control en lugar de `intlayer.org`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * URL del panel de control CMS auto-alojado.
     * Por defecto: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // ej. http://localhost:3000

    /**
     * URL de la API backend auto-alojada.
     * Por defecto: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // ej. http://localhost:3100
  },
};

export default config;
```

Establece las variables de entorno correspondientes en tu proyecto:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

Crea credenciales de acceso en tu panel de control auto-alojado en `http://localhost:3000/projects`.

### SDK `@intlayer/api`: apuntar a un backend auto-alojado

Al usar el SDK de forma programática, pasa `backendURL` explícitamente a `createIntlayerCMS`:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cms = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    backendURL: process.env.INTLAYER_BACKEND_URL, // http://localhost:3100
  },
});

const { data: dictionaries } = await dictionaryEndpoint(cms).getDictionaries();
```

### Características opcionales

Estas características requieren cuentas externas y funcionan correctamente cuando sus claves no están presentes en el `.env` auto-alojado:

| Característica                         | Variable(s) de entorno                          |
| -------------------------------------- | ----------------------------------------------- |
| Traducción / auditoría con IA          | `OPENAI_API_KEY`                                |
| Facturación                            | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, … |
| OAuth de GitHub                        | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`      |
| OAuth de Google                        | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`      |
| OAuth de GitLab / Microsoft / LinkedIn | `GITLAB_*`, `MICROSOFT_*`, `LINKEDIN_*`         |
| Correo transaccional via Resend        | `RESEND_API_KEY` (por defecto: Mailpit SMTP)    |

### Persistencia de datos y actualizaciones

Tres volúmenes de Docker contienen todo el estado persistente: `mongo-data`, `redis-data` y `minio-data`. Sobreviven a los reinicios y actualizaciones de contenedores. Volver a ejecutar el instalador descarga las últimas imágenes y realiza un `docker compose up -d` progresivo.

Puertos expuestos en el host:

| Puerto | Servicio                                                            |
| ------ | ------------------------------------------------------------------- |
| `3000` | Panel de control                                                    |
| `3100` | API Backend                                                         |
| `8025` | Interfaz web de correo Mailpit                                      |
| `9000` | API S3 de MinIO (necesaria para la carga de assets en el navegador) |
| `9001` | Consola de MinIO                                                    |

Para una referencia completa de todas las variables de entorno disponibles y opciones avanzadas (proxy inverso, dominios personalizados, respaldo/restauración), consulta la [Guía de Auto-alojamiento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md).

---

## Depuración

Si encuentras problemas con el CMS, verifica lo siguiente:

- La aplicación está en ejecución.

- La configuración de [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) está correctamente establecida en tu archivo de configuración de Intlayer.
  - Campos requeridos:
    - La URL de la aplicación debe coincidir con la que estableciste en la configuración del editor (`applicationURL`).
    - La URL del CMS

- Asegúrate de que la configuración del proyecto se haya enviado al CMS de Intlayer.

- El editor visual utiliza un iframe para mostrar tu sitio web. Asegúrate de que la Política de Seguridad de Contenidos (CSP) de tu sitio web permita la URL del CMS como `frame-ancestors` ('https://app.intlayer.org' por defecto). Verifica la consola del editor para cualquier error.
