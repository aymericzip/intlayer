---
createdAt: 2025-08-23
updatedAt: 2026-09-27
priority: 8
title: "CMS de Intlayer: externaliza tu contenido multilingüe"
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

![Interfaz del CMS de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.webp)

## Tabla de Contenidos

<TOC/>

## Entendiendo los diccionarios distantes

Intlayer diferencia entre diccionarios 'locales' y 'distantes'.

- Un diccionario 'local' es un diccionario que se declara en tu proyecto Intlayer. Como el archivo de declaración de un botón, o tu barra de navegación. Externalizar tu contenido no tiene sentido en este caso porque se supone que este contenido no debe cambiar con frecuencia.

- Un diccionario 'distante' es un diccionario que se gestiona a través del CMS de Intlayer. Puede ser útil para permitir que tu equipo gestione el contenido directamente en tu sitio web, y también tiene como objetivo utilizar funciones de pruebas A/B y optimización automática para SEO.

## Editor visual vs CMS

El editor [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) es una herramienta que te permite gestionar tu contenido en un editor visual para diccionarios locales. Una vez que se realiza un cambio, el contenido será reemplazado en la base de código. Eso significa que la aplicación se reconstruirá y la página se recargará para mostrar el nuevo contenido.

- [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md)

En contraste, el CMS de Intlayer es una herramienta que te permite gestionar tu contenido en un editor visual para diccionarios distantes. Una vez que se realiza un cambio, el contenido **no** afectará tu base de código. Y el sitio web mostrará automáticamente el contenido modificado.

## Integración

Para más detalles sobre cómo instalar el paquete, consulta la sección correspondiente a continuación:

### Integración con Next.js

Para la integración con Next.js, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_15.md).

- [Next.js 15 i18n - Guía completa para traducir tu aplicación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_15.md)

### Integración con Create React App

Para la integración con Create React App, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_create_react_app.md).

- [i18n en Create React App: guía completa de traducción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_create_react_app.md)

### Integración con Vite + React

Para la integración con Vite + React, consulta la [guía de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+react.md).

- [Vite + React i18n - Guía completa para traducir tu aplicación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+react.md)

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

- [documentación de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)

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

## Acceso programático con el SDK `@intlayer/api`

Más allá de la CLI y del editor visual, Intlayer ofrece un SDK tipado en el paquete [`@intlayer/api`](https://www.npmjs.com/package/@intlayer/api). Te permite usar el CMS como una **base de datos de contenido headless**: puedes obtener proyectos, obtener diccionarios y enviarlos o actualizarlos directamente desde tu propia aplicación, tus scripts o tu pipeline de CI.

El SDK gestiona la autenticación por ti. Mientras tu `clientId` y tu `clientSecret` estén disponibles (en tu configuración de Intlayer o en tu entorno), obtiene y renueva automáticamente un token de acceso OAuth2 y firma cada petición.

### Instalación

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="bun"
bun add @intlayer/api
```

### Cómo funciona: autenticador + endpoints

El SDK está dividido a propósito en **dos imports separados**, para mantener tu bundle pequeño:

1. `createIntlayerCMS`: crea un **autenticador** ligero. Solo lleva las credenciales y el token de acceso gestionado; no sabe nada sobre ningún dominio específico.
2. `dictionaryEndpoint`, `projectEndpoint`, …, **vinculadores de endpoint** por dominio, cada uno importado desde su propia ruta (`@intlayer/api/dictionary`, `@intlayer/api/project`, …). Pasas el autenticador al endpoint que necesitas.

Debido a que cada endpoint se importa por separado, tu bundle incluye solo los dominios que realmente usas: importar `dictionaryEndpoint` nunca incluye el cliente de proyecto, de IA ni de ningún otro dominio.

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

// La configuración es opcional: si se omite, las credenciales se leen desde
// `@intlayer/config/built`, que resuelve las variables de entorno INTLAYER_CLIENT_ID e
// INTLAYER_CLIENT_SECRET.
export const cmsAuthenticator = createIntlayerCMS();
```

> [!WARNING]
> Las credenciales del CMS (`clientId` / `clientSecret`) otorgan **acceso de escritura** a tu contenido. Solo crea el autenticador en el **lado del servidor** (server actions, route handlers, scripts, CI). Nunca lo importes en código del lado del cliente ni expongas tus credenciales al navegador.

Si prefieres no depender de la configuración en tiempo de build, pasa las credenciales explícitamente:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

export const cmsAuthenticator = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    // Opcional, para backends auto-alojados:
    // backendURL: process.env.INTLAYER_BACKEND_URL,
  },
});
```

> Obtén tus credenciales creando una nueva clave de acceso en el [Panel de Intlayer - Proyectos](https://app.intlayer.org/projects).

### Obtener proyectos

```typescript fileName="projects.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { projectEndpoint } from "@intlayer/api/project";

const cmsAuthenticator = createIntlayerCMS();

// Listar los proyectos accesibles con tus credenciales
const { data: projects } =
  await projectEndpoint(cmsAuthenticator).getProjects();

// Leer los insights de localización agregados del proyecto seleccionado
const { data: insights } =
  await projectEndpoint(cmsAuthenticator).getProjectInsights();
```

### Obtener diccionarios

```typescript fileName="read-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// Listar todos los diccionarios remotos del proyecto
const { data: dictionaries } =
  await dictionaryEndpoint(cmsAuthenticator).getDictionaries();

// O obtener un único diccionario por su clave
const { data: dictionary } = await dictionaryEndpoint(
  cmsAuthenticator
).getDictionary("my-first-dictionary-key");
```

### Enviar y actualizar diccionarios

Usa el CMS como base de datos para escribir contenido:

```typescript fileName="write-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// Crear un nuevo diccionario
await dictionaryEndpoint(cmsAuthenticator).addDictionary({
  key: "my-first-dictionary-key",
  content: { title: "Hello world" },
});

// Hacer upsert de un lote de diccionarios (crearlos o actualizarlos en una sola llamada)
await dictionaryEndpoint(cmsAuthenticator).pushDictionaries([
  { key: "home", content: { title: "Home" } },
  { key: "about", content: { title: "About" } },
]);

// Actualizar un diccionario existente
await dictionaryEndpoint(cmsAuthenticator).updateDictionary({
  id: "<dictionary-id>",
  key: "home",
  content: { title: "Updated title" },
});
```

> Consejo: reutiliza el endpoint vinculado para no repetirte:
>
> ```typescript codeFormat="typescript"
> const dictionary = dictionaryEndpoint(cmsAuthenticator);
> await dictionary.pushDictionaries([myDictionary]);
> const { data } = await dictionary.getDictionaries();
> ```

### Extrayendo un método único

Cada método de endpoint ya está autenticado y es independiente (maneja su propio token), por lo que puedes extraer uno y pasarlo, por ejemplo para inyectarlo como una dependencia:

```typescript fileName="push.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const dictionary = dictionaryEndpoint(createIntlayerCMS());

// Ya autenticado, refresca el token automáticamente en cada llamada
export const pushDictionaries = dictionary.pushDictionaries;

// Uso
await pushDictionaries([{ key: "home", content: { title: "Home" } }]);
```

## Live sync

Live Sync permite que tu aplicación refleje los cambios de contenido del CMS en tiempo de ejecución, sin necesidad de reconstruir o redeplegar. Cuando está habilitado, las actualizaciones se transmiten a un servidor Live Sync que actualiza los diccionarios que tu aplicación lee.

Para la guía de configuración completa (configuración, iniciar el servidor Live Sync, el flujo de trabajo de desarrollo local y limitaciones), consulta la [documentación de Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/live-sync.md).

- [documentación de Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/live-sync.md)

## Auto-hospedaje

Intlayer puede ejecutarse completamente en tu propia infraestructura. Una sola línea arranca el stack completo (dashboard, API, base de datos, almacenamiento de objetos y correo electrónico) con Docker Compose:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Para la guía de configuración completa, referencia de variables de entorno, instrucciones de actualización y procedimientos de copia de seguridad/restauración, consulta la [Guía de Auto-hospedaje](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md).

## Depuración

Si encuentras problemas con el CMS, verifica lo siguiente:

- La aplicación está en ejecución.

- La configuración de [`editor`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md#editor-configuration) está correctamente establecida en tu archivo de configuración de Intlayer.
  - Campos requeridos:
    - La URL de la aplicación debe coincidir con la que estableciste en la configuración del editor (`applicationURL`).
    - La URL del CMS

- Asegúrate de que la configuración del proyecto se haya enviado al CMS de Intlayer.

- El editor visual utiliza un iframe para mostrar tu sitio web. Asegúrate de que la Política de Seguridad de Contenidos (CSP) de tu sitio web permita la URL del CMS como `frame-ancestors` ('https://app.intlayer.org' por defecto). Verifica la consola del editor para cualquier error.

## Preguntas frecuentes

<FAQ>

<Question title="¿Cuál es la diferencia entre el CMS de Intlayer y el editor visual?">

El [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md) edita diccionarios locales y escribe el cambio de vuelta en tu base de código, así que la aplicación se reconstruye y el cambio pasa por tu revisión y despliegue habituales. El CMS edita diccionarios remotos: el cambio no toca tu base de código y el sitio en ejecución lo recoge sin un despliegue. Los equipos suelen usar ambos, el editor para el contenido del que son responsables los desarrolladores y el CMS para el contenido que marketing cambia cada semana.

- [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md)

</Question>
<Question title="¿Cuánto añade la i18n al tamaño de mi bundle?">

Mucho menos que una configuración basada en espacios de nombres, porque una página nunca descarga un catálogo que no renderiza. El marcado renderizado en el servidor resuelve su contenido en el servidor, y el compilador de tiempo de compilación reemplaza las llamadas a `useIntlayer` por las entradas de diccionario exactas que usa un componente, de modo que se descartan las claves sin usar y los idiomas sin usar. Los [diccionarios dinámicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md) reparten el resto por idioma. Frente a las alternativas habituales, Intlayer reduce el tamaño del bundle y de la página hasta en un 50%. Consulta la [optimización del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md) y el [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/index.md).

- [diccionarios dinámicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/index.md)
- [optimización del bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md)
- [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/index.md)

</Question>
<Question title="¿Puedo migrar desde `i18next`, `next-intl` o `react-i18next` sin reescribir mis componentes?">

Sí, y hay dos caminos. Puedes migrar el contenido de forma progresiva con la [guía de migración de i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_i18next_to_intlayer.md) o la [guía de migración de next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_next-intl_to_intlayer.md). O puedes mantener tu API actual por completo: los [adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md) exponen exactamente la misma API que `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` y `Lingui`, pero servida por diccionarios de Intlayer, así que cambian los imports y el código de los componentes no.

- [guía de migración de i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_i18next_to_intlayer.md)
- [guía de migración de next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/migration_from_next-intl_to_intlayer.md)
- [adaptadores de compatibilidad](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/index.md)

</Question>
<Question title="¿Puedo conservar mis archivos de traducción JSON existentes?">

Sí. El [plugin de sincronización JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md) mantiene tus archivos `/messages/{locale}/{namespace}.json` como fuente de verdad y genera diccionarios de Intlayer a partir de ellos, en ambas direcciones. Un [plugin de sincronización PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-po.md) hace lo mismo para los catálogos gettext, y los [archivos por idioma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/per_locale_file.md) te permiten dividir el contenido por idioma en lugar de agrupar los idiomas en un solo archivo.

- [plugin de sincronización JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-json.md)
- [plugin de sincronización PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/plugins/sync-po.md)
- [archivos por idioma](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/per_locale_file.md)

</Question>
<Question title="¿Tengo que trasladar mi contenido clave por clave?">

No. Ejecuta `npx intlayer extract` e Intlayer lee tus archivos fuente, extrae las cadenas visibles para el usuario y escribe un archivo `.content` junto a cada uno, así que revisas un diff en lugar de copiar cadenas a un catálogo una por una. Consulta el [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md).

- [comando extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md)

Para una canalización totalmente automatizada, el [compilador de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md) hace lo mismo en tiempo de compilación sobre código JSX, TSX, Vue y Svelte, generando los diccionarios en cada cambio para que no haya ninguna clave que mantener a mano. Funciona por análisis estático, así que las cadenas que solo existen en tiempo de ejecución quedan fuera de su alcance, y necesita unas pocas anotaciones para distinguir el texto visible para el usuario de la lógica de la aplicación.

- [compilador de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compiler.md)

</Question>
<Question title="¿Qué herramientas para editores y agentes de IA están disponibles?">

Cinco piezas, todas opcionales:

- **[Extensión de VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md)**: salta de una clave `useIntlayer` al archivo de contenido que la declara, extrae contenido de un componente y ejecuta build, fill, test, push y pull desde la paleta de comandos o desde una pestaña de Intlayer dedicada.
- **[Servidor LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/lsp.md)**: el mismo conocimiento en cualquier editor que hable LSP, con ir a la definición, buscar todas las referencias, vistas previas al pasar el cursor de un valor traducido, autocompletado de claves y campos, y un aviso cuando una clave no está declarada en ninguna parte. También resuelve las llamadas a `i18next`, `react-i18next`, `next-intl` y `use-intl`, lo que ayuda durante la migración.
- **[Servidor MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/mcp_server.md)**: expone la documentación y la CLI de Intlayer a Cursor, VS Code, Claude Desktop, Claude Code y ChatGPT, para que un asistente responda a partir de la documentación actual en lugar de adivinar, y pueda ejecutar comandos como `intlayer fill` por sí mismo.
- **[Habilidades para agentes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/agent_skills.md)**: habilidades específicas como `intlayer-config`, `intlayer-cli` e `intlayer-content`, además de una por framework, que enseñan a un agente tu configuración de enrutamiento y los tipos de nodo de contenido.
- **[Plugin de ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/eslint.md)**: `no-raw-text` marca las cadenas codificadas de forma fija, con reglas adicionales para claves de diccionario estáticas y contenido sin usar.

</Question>
<Question title="¿Qué contenido debería trasladarse al CMS?">

Contenido que cambia a menudo y que no pertenece a una publicación: los textos de la página de aterrizaje, la redacción de los precios, los anuncios, cualquier cosa de la que sea responsable un equipo de marketing. El contenido que forma parte de la interfaz, como las etiquetas de los botones y los errores de formulario, es mejor dejarlo como diccionarios locales, donde se revisa junto con el código que lo usa.

</Question>
<Question title="¿Qué ocurre si el CMS no está accesible?">

La aplicación recurre a la declaración local del diccionario, así que un fallo de red o una caída degrada al contenido entregado con tu build en lugar de a una página vacía. Por eso importa mantener una declaración local para cada diccionario remoto.

</Question>
<Question title="¿Puedo autoalojar el CMS?">

Sí. El CMS puede ejecutarse en tu propia infraestructura, que es la respuesta habitual cuando el contenido no debe salir de tu red. Consulta [autoalojar Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md).

- [autoalojar Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md)

</Question>
<Question title="¿Los editores de contenido necesitan a un desarrollador para publicar un cambio?">

No. Ese es el objetivo de los diccionarios remotos: un editor cambia el texto en el CMS y el sitio lo refleja, con la [sincronización en vivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/live.md) aplicando la actualización en tiempo de ejecución en lugar de esperar a una build.

- [sincronización en vivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/live.md)

</Question>
<Question title="¿Puedo automatizar el CMS en lugar de usar la interfaz?">

Sí. El SDK `@intlayer/api` expone los mismos endpoints que la interfaz, así que puedes obtener proyectos, leer diccionarios y enviar actualizaciones desde un script o una canalización. La sección anterior muestra el autenticador y los endpoints.

</Question>
<Question title="¿El CMS admite pruebas A/B de traducciones?">

Sí. Los diccionarios remotos admiten [variantes de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/variants.md), y las [analíticas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/analytics.md) informan de cómo se expone cada variante, así que un cambio de redacción se puede medir en lugar de debatir.

- [variantes de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/variants.md)
- [analíticas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/analytics.md)

</Question>
<Question title="¿El CMS es gratuito?">

La biblioteca, la CLI, el compilador y el editor visual de Intlayer son gratuitos y de código abierto bajo la licencia Apache 2.0. El CMS alojado es un servicio de pago opcional, y en su lugar puede [autoalojarse](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md).

- [autoalojarse](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md)

</Question>

</FAQ>
