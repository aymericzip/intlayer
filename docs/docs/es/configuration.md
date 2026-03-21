---
createdAt: 2024-08-13
updatedAt: 2026-03-20
title: Configuración (Configuration)
description: Aprenda a configurar Intlayer para su aplicación. Entienda los diversos ajustes y opciones disponibles para personalizar Intlayer según sus necesidades.
keywords:
  - Configuración
  - Ajustes
  - Personalización
  - Intlayer
  - Opciones
slugs:
  - doc
  - concept
  - configuration
history:
  - version: 8.4.0
    date: 2026-03-20
    changes: Se añadió la notación de objeto por localidad para 'compiler.output' y 'dictionary.fill'
  - version: 8.3.0
    date: 2026-03-11
    changes: Se movió 'baseDir' de la configuración 'content' a la configuración 'system'
  - version: 8.2.0
    date: 2026-03-09
    changes: Se actualizaron las opciones del compilador (compiler), se añadió soporte para 'output' y 'noMetadata'
  - version: 8.1.7
    date: 2026-02-25
    changes: Se actualizaron las opciones del compilador
  - version: 8.1.5
    date: 2026-02-23
    changes: Se añadió la opción del compilador 'build-only' y el prefijo del diccionario
  - version: 8.0.6
    date: 2026-02-12
    changes: Se añadió soporte para los proveedores Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face y Together.ai
  - version: 8.0.5
    date: 2026-02-06
    changes: Se añadió `dataSerialization` a la configuración de IA
  - version: 8.0.0
    date: 2026-01-24
    changes: Se renombró el modo de importación `live` a `fetch` para describir mejor el mecanismo subyacente.
  - version: 8.0.0
    date: 2026-01-22
    changes: Se movió la configuración de compilación `importMode` a la configuración `dictionary`.
  - version: 8.0.0
    date: 2026-01-22
    changes: Se añadió la opción `rewrite` a la configuración de enrutamiento
  - version: 8.0.0
    date: 2026-01-18
    changes: Se separó la configuración del sistema de la configuración de contenido. Se movieron las rutas internas a la propiedad `system`. Se añadió `codeDir` para separar los archivos de contenido y la transformación de código.
  - version: 8.0.0
    date: 2026-01-18
    changes: Se añadieron las opciones de diccionario `location` y `schema`
  - version: 7.5.1
    date: 2026-01-10
    changes: Se añadió soporte para los formatos de archivo JSON5 y JSONC
  - version: 7.5.0
    date: 2025-12-17
    changes: Se añadió la opción `buildMode`
  - version: 7.0.0
    date: 2025-10-25
    changes: Se añadió la configuración `dictionary`
  - version: 7.0.0
    date: 2025-10-21
    changes: Se reemplazó `middleware` por la configuración de enrutamiento `routing`
  - version: 7.0.0
    date: 2025-10-12
    changes: Se añadió la opción `formatCommand`
  - version: 6.2.0
    date: 2025-10-12
    changes: Se actualizó la opción `excludedPath`
  - version: 6.0.2
    date: 2025-09-23
    changes: Se añadió la opción `outputFormat`
  - version: 6.0.0
    date: 2025-09-21
    changes: Se eliminó el campo `dictionaryOutput` y el campo `i18nextResourcesDir`
  - version: 6.0.0
    date: 2025-09-16
    changes: Se añadió el modo de importación `live`
  - version: 6.0.0
    date: 2025-09-04
    changes: Se reemplazó el campo `hotReload` por `liveSync`, y se añadieron los campos `liveSyncPort` y `liveSyncURL`
  - version: 5.6.1
    date: 2025-07-25
    changes: Se reemplazó `activateDynamicImport` por la opción `importMode`
  - version: 5.6.0
    date: 2025-07-13
    changes: Se cambió el contentDir predeterminado de `['src']` a `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: Se añadieron los comandos `docs`
---

# Documentación de Configuración de Intlayer

## Resumen

Los archivos de configuración de Intlayer le permiten personalizar diversos aspectos del complemento, como la internacionalización (internationalization), el middleware y el manejo de contenido. Esta documentación proporciona una descripción detallada de cada propiedad en la configuración.

---

## Tabla de Contenidos

<TOC/>

---

## Formatos de archivos de configuración compatibles

Intlayer acepta los formatos de archivo de configuración JSON, JS, MJS y TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.json5`
- `intlayer.config.jsonc`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Ejemplo de archivo de configuración

````typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";
import { nextjsRewrite } from "intlayer/routing";
import { z } from "zod";

/**
 * Ejemplo de archivo de configuración de Intlayer que muestra todas las opciones disponibles.
 */
const config: IntlayerConfig = {
  /**
   * Configuración de los ajustes de internacionalización.
   */
  internationalization: {
    /**
     * Lista de localidades (locales) admitidas en la aplicación.
     * Predeterminado: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * Lista de localidades obligatorias que deben definirse en cada diccionario.
     * Si está vacío, todas las localidades son obligatorias en modo `strict`.
     * Predeterminado: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Nivel de rigor para el contenido internacionalizado.
     * - "strict": Error si falta alguna localidad declarada o si no está declarada.
     * - "inclusive": Advertencia si falta una localidad declarada.
     * - "loose": Acepta cualquier localidad existente.
     * Predeterminado: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * Localidad predeterminada utilizada como recurso en caso de que no se encuentre la localidad solicitada.
     * Predeterminado: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Ajustes que controlan las operaciones de diccionarios y el comportamiento de respaldo.
   */
  dictionary: {
    /**
     * Controla cómo se importan los diccionarios.
     * - "static": Importado estáticamente en el momento de la compilación.
     * - "dynamic": Importado dinámicamente utilizando Suspense.
     * - "fetch": Recuperado dinámicamente mediante el Live Sync API.
     * Predeterminado: "static"
     */
    importMode: "static",

    /**
     * Estrategia para rellenar automáticamente las traducciones faltantes mediante IA.
     * Puede ser un valor booleano o un patrón de ruta para guardar el contenido rellenado.
     * Predeterminado: true
     */
    fill: true,

    /**
     * Ubicación física de los archivos de diccionario.
     * - "local": Almacenado en el sistema de archivos local.
     * - "remote": Almacenado en el CMS de Intlayer.
     * - "hybrid": Almacenado tanto localmente como en el CMS de Intlayer.
     * - "plugin" (o cualquier cadena personalizada): Proporcionada por un complemento o fuente personalizada.
     * Predeterminado: "local"
     */
    location: "local",

    /**
     * Si el contenido debe transformarse automáticamente (p. ej., Markdown a HTML).
     * Predeterminado: false
     */
    contentAutoTransformation: false,
  },

  /**
   * Configuración de enrutamiento y middleware.
   */
  routing: {
    /**
     * Estrategia de enrutamiento de localidades.
     * - "prefix-no-default": Prefija todo excepto la localidad predeterminada (p. ej., /dashboard, /fr/dashboard).
     * - "prefix-all": Prefija todas las localidades (p. ej., /en/dashboard, /fr/dashboard).
     * - "no-prefix": Sin localidad en la URL.
     * - "search-params": Utiliza ?locale=...
     * Predeterminado: "prefix-no-default"
     */
    mode: "prefix-no-default",

    /**
     * Dónde almacenar la localidad seleccionada por el usuario.
     * Opciones: 'cookie', 'localStorage', 'sessionStorage', 'header' o una combinación de estos.
     * Predeterminado: ['cookie', 'header']
     */
    storage: ["cookie", "header"],

    /**
     * Ruta base para las URL de la aplicación.
     * Predeterminado: ""
     */
    basePath: "",

    /**
     * Reglas de reescritura de URL personalizadas para rutas específicas por localidad.
     */
    rewrite: nextjsRewrite({
      "/[locale]/about": {
        en: "/[locale]/about",
        fr: "/[locale]/a-propos",
      },
    }),
  },

  /**
   * Ajustes relacionados con la búsqueda y procesamiento de archivos de contenido.
   */
  content: {
    /**
     * Extensiones de archivo para escanear en busca de diccionarios.
     * Predeterminado: ['.content.ts', '.content.js', '.content.json', etc.]
     */
    fileExtensions: [".content.ts", ".content.js", ".content.json"],

    /**
     * Directorios donde se encuentran los archivos .content.
     * Predeterminado: ["."]
     */
    contentDir: ["src"],

    /**
     * Ubicación del código fuente.
     * Se usa para la optimización de la compilación y transformación del código.
     * Predeterminado: ["."]
     */
    codeDir: ["src"],

    /**
     * Patrones excluidos del escaneo.
     * Predeterminado: ['node_modules', '.intlayer', etc.]
     */
    excludedPath: ["node_modules"],

    /**
     * Si se deben monitorear los cambios y reconstruir los diccionarios durante el desarrollo.
     * Predeterminado: true en modo de desarrollo
     */
    watch: true,

    /**
     * Comando utilizado para formatear los archivos .content recién creados / actualizados.
     */
    formatCommand: 'npx prettier --write "{{file}}"',
  },

  /**
   * Configuración del Editor Visual (Visual Editor).
   */
  editor: {
    /**
     * Si el editor visual está habilitado.
     * Predeterminado: false
     */
    enabled: true,

    /**
     * La URL de su aplicación para la validación de origen.
     * Predeterminado: ""
     */
    applicationURL: "http://localhost:3000",

    /**
     * Puerto para el servidor del editor local.
     * Predeterminado: 8000
     */
    port: 8000,

    /**
     * URL pública del editor.
     * Predeterminado: "http://localhost:8000"
     */
    editorURL: "http://localhost:8000",

    /**
     * URL del CMS de Intlayer.
     * Predeterminado: "https://app.intlayer.org"
     */
    cmsURL: "https://app.intlayer.org",

    /**
     * URL de la API del Backend.
     * Predeterminado: "https://back.intlayer.org"
     */
    backendURL: "https://back.intlayer.org",

    /**
     * Activa la sincronización de contenido en tiempo real.
     * Predeterminado: false
     */
    liveSync: true,
  },

  /**
   * Ajustes de traducción y construcción basados en IA.
   */
  ai: {
    /**
     * Proveedor de IA que se utilizará.
     * Opciones: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama', 'openrouter', 'alibaba', 'fireworks', 'groq', 'huggingface', 'bedrock', 'googlevertex', 'togetherai'
     * Predeterminado: 'openai'
     */
    provider: "openai",

    /**
     * Modelo del proveedor seleccionado que se utilizará.
     */
    model: "gpt-4o",

    /**
     * Clave de API del proveedor.
     */
    apiKey: process.env.OPENAI_API_KEY,

    /**
     * Contexto global para guiar a la IA al generar traducciones.
     */
    applicationContext: "Esta es una aplicación de reserva de viajes.",

    /**
     * URL de ruta base para la API de IA.
     */
    baseURL: "http://localhost:3000",

    /**
     * Serialización de datos (Data Serialization)
     *
     * Opciones:
     * - "json": Por defecto, robusto; consume más tokens.
     * - "toon": consume menos tokens, puede no ser tan consistente como el JSON.
     *
     * Predeterminado: "json"
     */
    dataSerialization: "json",
  },

  /**
   * Ajustes de compilación y optimización.
   */
  build: {
    /**
     * Modo de ejecución de compilación.
     * - "auto": Se compila automáticamente durante la compilación de la aplicación.
     * - "manual": Requiere un comando de compilación explícito.
     * Predeterminado: "auto"
     */
    mode: "auto",

    /**
     * Si se debe optimizar el paquete final eliminando los diccionarios no utilizados.
     * Predeterminado: true en producción
     */
    optimize: true,

    /**
     * Formato de salida para los archivos de diccionario generados.
     * Predeterminado: ['cjs', 'esm']
     */
    outputFormat: ["cjs", "esm"],

    /**
     * Indica si la compilación debe verificar los tipos de TypeScript.
     * Predeterminado: false
     */
    checkTypes: false,
  },

  /**
   * Configuración del registrador (Logger).
   */
  log: {
    /**
     * Nivel de registro.
     * - "default": Registro estándar.
     * - "verbose": Registro detallado de depuración.
     * - "disabled": Desactiva el registro.
     * Predeterminado: "default"
     */
    mode: "default",

    /**
     * Prefijo para todos los mensajes de registro.
     * Predeterminado: "[intlayer]"
     */
    prefix: "[intlayer]",
  },

  /**
   * Configuración del sistema (para uso avanzado)
   */
  system: {
    /**
     * Directorio para almacenar diccionarios localizados.
     */
    dictionariesDir: ".intlayer/dictionary",

    /**
     * Directorio para el aumento de módulos de TypeScript (module augmentation).
     */
    moduleAugmentationDir: ".intlayer/types",

    /**
     * Directorio para almacenar diccionarios no fusionados.
     */
    unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

    /**
     * Directorio para almacenar tipos de diccionarios.
     */
    typesDir: ".intlayer/types",

    /**
     * Directorio donde se almacenan los archivos principales de la aplicación.
     */
    mainDir: ".intlayer/main",

    /**
     * Directorio donde se almacenan los archivos de configuración.
     */
    configDir: ".intlayer/config",

    /**
     * Directorio donde se almacenan los archivos de caché.
     */
    cacheDir: ".intlayer/cache",
  },

  /**
   * Configuración del Compilador (Para uso avanzado)
   */
  compiler: {
    /**
     * Indica si el compilador (compiler) debe estar habilitado.
     *
     * - false: Deshabilita el compilador.
     * - true: Habilita el compilador.
     * - "build-only": Omite el compilador durante el desarrollo y acelera el tiempo de arranque.
     *
     * Predeterminado: false
     */
    enabled: true,

    /**
     * Define la ruta para los archivos de salida. Reemplaza `outputDir`.
     *
     * - Las rutas con `./` se resuelven en relación con el directorio del componente.
     * - Las rutas con `/` se resuelven en relación con la raíz del proyecto (`baseDir`).
     *
     * - Al incluir la variable `{{locale}}` en la ruta, se activará la creación de diccionarios separados por idioma.
     *
     * Ejemplo:
     * ```ts
     * {
     *   // Crear archivos .content.ts multilingües al lado del componente
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Equivalente usando cadena de plantilla
     * }
     * ```
     *
     * ```ts
     * {
     *   // Crear JSON centralizados por idioma en la raíz del proyecto
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Equivalente usando cadena de plantilla
     * }
     * ```
     *
     * Lista de variables:
     *   - `fileName`: Nombre del archivo.
     *   - `key`: Clave de contenido.
     *   - `locale`: Localidad del contenido.
     *   - `extension`: Extensión del archivo.
     *   - `componentFileName`: Nombre del archivo del componente.
     *   - `componentExtension`: Extensión del archivo del componente.
     *   - `format`: Formato del diccionario.
     *   - `componentFormat`: Formato del diccionario del componente.
     *   - `componentDirPath`: Ruta del directorio del componente.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Indica si los componentes deben guardarse después de ser transformados.
     * De esta manera, el compilador puede ejecutarse solo una vez para transformar la aplicación y luego puede eliminarse.
     */
    saveComponents: false,

    /**
     * Solo inserta el contenido en el archivo generado. Útil para salida de JSON por idioma para i18next o ICU MessageFormat.
     */
    noMetadata: false,

    /**
     * Prefijo de clave de diccionario
     */
    dictionaryKeyPrefix: "", // Agregue un prefijo opcional a las claves de diccionario extraídas
  },

  /**
   * Esquemas personalizados (Schemas) para validar el contenido de los diccionarios.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Configuración de complementos (Plugins).
   */
  plugins: [],
};

export default config;
````

---

## Referencia de Configuración

En las siguientes secciones se describen las diversas opciones de configuración disponibles en Intlayer.

---

### Configuración de Internacionalización (Internationalization Configuration)

Define los ajustes relacionados con la internacionalización, incluidas las localidades disponibles y la localidad predeterminada de la aplicación.

| Campo             | Tipo       | Descripción                                                                                                                      | Ejemplo              | Nota                                                                                                                                                                                                                                                                                                                        |
| ----------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | `string[]` | Lista de localidades admitidas en la aplicación. Predeterminado: `[Locales.ENGLISH]`                                             | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                                                             |
| `requiredLocales` | `string[]` | Lista de localidades obligatorias en la aplicación. Predeterminado: `[]`                                                         | `[]`                 | Si está vacío, todas las localidades son obligatorias en modo `strict`. Asegúrese de que las localidades obligatorias también estén definidas en el campo `locales`.                                                                                                                                                        |
| `strictMode`      | `string`   | Garantiza una implementación robusta del contenido internacionalizado mediante el uso de TypeScript. Predeterminado: `inclusive` |                      | Si es `"strict"`: la función `t` requiere que se defina cada localidad declarada; arroja un error si alguna de ellas falta o no está declarada. Si es `"inclusive"`: advierte sobre las localidades que faltan pero acepta las localidades existentes no declaradas. Si es `"loose"`: acepta cualquier localidad existente. |
| `defaultLocale`   | `string`   | Localidad predeterminada utilizada como reserva si no se encuentra la localidad solicitada. Predeterminado: `Locales.ENGLISH`    | `'en'`               | Se utiliza para determinar la localidad cuando no se especifica ninguna en la URL, galleta (cookie) o cabecera.                                                                                                                                                                                                             |

---

### Configuración del Editor (Editor Configuration)

Define los ajustes relacionados con el editor integrado, incluido el puerto del servidor y su estado de actividad.

| Campo                        | Tipo                      | Descripción                                                                                                                                                                                                      | Ejemplo                                                                               | Nota                                                                                                                                                                                                                                               |
| ---------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | `string`                  | URL de su aplicación. Predeterminado: `''`                                                                                                                                                                       | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Se utiliza para restringir los orígenes del editor por razones de seguridad. Si se establece en `'*'`, se puede acceder al editor desde cualquier origen.                                                                                          |
| `port`                       | `number`                  | Puerto utilizado por el servidor del Editor Visual. Predeterminado: `8000`                                                                                                                                       |                                                                                       |                                                                                                                                                                                                                                                    |
| `editorURL`                  | `string`                  | URL del servidor del editor. Predeterminado: `'http://localhost:8000'`                                                                                                                                           | `'http://localhost:3000'`, `'https://example.com'`, `process.env.INTLAYER_EDITOR_URL` | Se utiliza para restringir los orígenes que pueden interactuar con la aplicación. Si se establece en `'*'`, es accesible desde cualquier origen. Debe establecerse si cambia el puerto o si el editor está alojado en un dominio diferente.        |
| `cmsURL`                     | `string`                  | URL del CMS de Intlayer. Predeterminado: `'https://intlayer.org'`                                                                                                                                                | `'https://intlayer.org'`                                                              |                                                                                                                                                                                                                                                    |
| `backendURL`                 | `string`                  | URL del servidor backend. Predeterminado: `https://back.intlayer.org`                                                                                                                                            | `http://localhost:4000`                                                               |                                                                                                                                                                                                                                                    |
| `enabled`                    | `boolean`                 | Indica si la aplicación interactuará con el editor visual. Predeterminado: `true`                                                                                                                                | `process.env.NODE_ENV !== 'production'`                                               | Si es `false`, el editor no puede interactuar con la aplicación. Deshabilitarlo en entornos específicos mejora la seguridad.                                                                                                                       |
| `clientId`                   | `string &#124; undefined` | Permite que los paquetes intlayer se autentiquen con el backend utilizando oAuth2. Para recibir un token de acceso, vaya a [intlayer.org/project](https://app.intlayer.org/project). Predeterminado: `undefined` |                                                                                       | Manténgalo en secreto; almacénelo en variables de entorno.                                                                                                                                                                                         |
| `clientSecret`               | `string &#124; undefined` | Permite que los paquetes intlayer se autentiquen con el backend utilizando oAuth2. Para recibir un token de acceso, vaya a [intlayer.org/project](https://app.intlayer.org/project). Predeterminado: `undefined` |                                                                                       | Manténgalo en secreto; almacénelo en variables de entorno.                                                                                                                                                                                         |
| `dictionaryPriorityStrategy` | `string`                  | Estrategia para priorizar los diccionarios cuando existan diccionarios locales y remotos. Predeterminado: `'local_first'`                                                                                        | `'distant_first'`                                                                     | `'distant_first'`: Prioriza los remotos sobre los locales. `'local_first'`: Prioriza los locales sobre los remotos.                                                                                                                                |
| `liveSync`                   | `boolean`                 | Indica si el servidor de aplicaciones debe recargar el contenido en caliente cuando se detecta un cambio en el CMS / Editor Visual / Backend. Predeterminado: `true`                                             | `true`                                                                                | Cuando se agrega/actualiza un diccionario, la aplicación actualiza el contenido de la página. Live sync externaliza el contenido a otro servidor, lo que puede afectar ligeramente el rendimiento. Se recomienda alojar ambos en la misma máquina. |
| `liveSyncPort`               | `number`                  | Puerto del servidor Live Sync. Predeterminado: `4000`                                                                                                                                                            | `4000`                                                                                |                                                                                                                                                                                                                                                    |
| `liveSyncURL`                | `string`                  | URL del servidor Live Sync. Predeterminado: `'http://localhost:{liveSyncPort}'`                                                                                                                                  | `'https://example.com'`                                                               | Apunta a localhost de forma predeterminada; puede cambiarse a un servidor remoto de Live Sync.                                                                                                                                                     |

### Configuración de Enrutamiento (Routing Configuration)

Ajustes que controlan el comportamiento del enrutamiento, incluida la estructura de la URL, el almacenamiento de localidades y el manejo del middleware.

| Campo      | Tipo                                                                                                                                                 | Descripción                                                                                                                                                                              | Ejemplo                                                                                                                                                                                                  | Nota                                                                                                                                                                                                                                                                                          |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | `'prefix-no-default' &#124; 'prefix-all' &#124; 'no-prefix' &#124; 'search-params'`                                                                  | Modo de enrutamiento de URL para el manejo de localidades. Predeterminado: `'prefix-no-default'`                                                                                         | `'prefix-no-default'`: `/dashboard` (en) o `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: la localidad se maneja mediante otros medios. `'search-params'`: `/dashboard?locale=fr` | No afecta la gestión de galletas (cookies) o el almacenamiento de localidades.                                                                                                                                                                                                                |
| `storage`  | `false &#124; 'cookie' &#124; 'localStorage' &#124; 'sessionStorage' &#124; 'header' &#124; CookiesAttributes &#124; StorageAttributes &#124; Array` | Configuración para almacenar la localidad en el cliente. Predeterminado: `['cookie', 'header']`                                                                                          | `'localStorage'`, `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                                            | Consulte la tabla de Opciones de Almacenamiento más abajo.                                                                                                                                                                                                                                    |
| `basePath` | `string`                                                                                                                                             | Ruta base para las URL de la aplicación. Predeterminado: `''`                                                                                                                            | `'/my-app'`                                                                                                                                                                                              | Si la aplicación está en `https://example.com/my-app`, basePath es `'/my-app'` y las URL se convierten en `https://example.com/my-app/en`.                                                                                                                                                    |
| `rewrite`  | `Record<string, StrictModeLocaleMap<string>>`                                                                                                        | Reglas de reescritura de URL personalizadas que anulan el modo de enrutamiento predeterminado para rutas específicas. Admite parámetros dinámicos `[param]`. Predeterminado: `undefined` | Ver ejemplo abajo                                                                                                                                                                                        | Las reglas de reescritura tienen prioridad sobre `mode`. Funciona con Next.js y Vite. `getLocalizedUrl()` aplica automáticamente las reglas correspondientes. Ver [Reescrituras de URL Personalizadas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/custom_url_rewrites.md). |

**Ejemplo de `rewrite`**:

```typescript
routing: {
  mode: "prefix-no-default", // Estrategia de respaldo
  rewrite: nextjsRewrite({
    "/about": {
      en: "/about",
      fr: "/a-propos",
    },
    "/product/[slug]": {
      en: "/product/[slug]",
      fr: "/produit/[slug]",
    },
    "/blog/[category]/[id]": {
      en: "/blog/[category]/[id]",
      fr: "/journal/[category]/[id]",
    },
  }),
}
```

#### Opciones de Almacenamiento (Storage Options)

| Valor              | Descripción                                                                                               | Nota                                                                                                                                                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'cookie'`         | Guarda la localidad en las cookies (galletas); accesible tanto por el lado del cliente como del servidor. | Para el cumplimiento de GDPR, asegúrese de obtener el consentimiento adecuado del usuario. Personalizable mediante `CookiesAttributes` (`{ type: 'cookie', name: 'custom-locale', secure: true, httpOnly: false }`). |
| `'localStorage'`   | Guarda la localidad en el navegador sin fecha de caducidad (solo del lado del cliente).                   | No caduca a menos que se borre explícitamente. El proxy de Intlayer no puede acceder a él. Personalizable mediante `StorageAttributes` (`{ type: 'localStorage', name: 'custom-locale' }`).                          |
| `'sessionStorage'` | Guarda la localidad durante la sesión de la página (solo del lado del cliente).                           | Se borra cuando se cierra la pestaña/ventana. El proxy de Intlayer no puede acceder a él. Personalizable mediante `StorageAttributes` (`{ type: 'sessionStorage', name: 'custom-locale' }`).                         |
| `'header'`         | Guarda o transmite la localidad mediante cabeceras HTTP (solo del lado del servidor).                     | Útil para llamadas de API. El lado del cliente no puede acceder a él. Personalizable mediante `StorageAttributes` (`{ type: 'header', name: 'custom-locale' }`).                                                     |

#### Atributos de Galleta (Cookie Attributes)

Cuando se utiliza el almacenamiento mediante galletas (cookies), se pueden configurar atributos adicionales:

| Campo      | Tipo                                  | Descripción                                                        |
| ---------- | ------------------------------------- | ------------------------------------------------------------------ |
| `name`     | `string`                              | Nombre de la galleta (cookie). Predeterminado: `'INTLAYER_LOCALE'` |
| `domain`   | `string`                              | Dominio de la galleta. Predeterminado: `undefined`                 |
| `path`     | `string`                              | Ruta de la galleta. Predeterminado: `undefined`                    |
| `secure`   | `boolean`                             | Requiere HTTPS. Predeterminado: `undefined`                        |
| `httpOnly` | `boolean`                             | Bandera HTTP-only. Predeterminado: `undefined`                     |
| `sameSite` | `'strict' &#124; 'lax' &#124; 'none'` | Política de SameSite.                                              |
| `expires`  | `Date &#124; number`                  | Fecha de expiración o número de días. Predeterminado: `undefined`  |

#### Atributos de Almacenamiento de Localidad (Locale Storage Attributes)

Cuando se utiliza localStorage o sessionStorage:

| Campo  | Tipo                                     | Descripción                                                               |
| ------ | ---------------------------------------- | ------------------------------------------------------------------------- |
| `type` | `'localStorage' &#124; 'sessionStorage'` | Tipo de almacenamiento.                                                   |
| `name` | `string`                                 | Nombre de la clave de almacenamiento. Predeterminado: `'INTLAYER_LOCALE'` |

#### Ejemplos de Configuración

Aquí se muestran algunos ejemplos comunes de configuración para la nueva estructura de enrutamiento v7:

**Configuración Básica (Predeterminada)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**Configuración compatible con GDPR**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default",
    storage: [
      {
        type: "localStorage",
        name: "user-locale",
      },
      {
        type: "cookie",
        name: "user-locale",
        secure: true,
        sameSite: "strict",
        httpOnly: false,
      },
    ],
    basePath: "",
  },
};

export default config;
```

**Modo Parámetros de Búsqueda (Search Parameters Mode)**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "search-params",
    storage: "localStorage",
    basePath: "",
  },
};

export default config;
```

**Modo sin prefijo (No Prefix Mode) con almacenamiento personalizado**:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";
// intlayer.config.ts
const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
  routing: {
    mode: "no-prefix",
    storage: {
      type: "sessionStorage",
      name: "app-locale",
    },
    basePath: "/my-app",
  },
};

export default config;
```

**Reescritura de URL personalizada con rutas dinámicas**:

```typescript
// intlayer.config.ts
import { nextjsRewrite } from "intlayer/routing";

const config: IntlayerConfig = {
  internationalization: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  routing: {
    mode: "prefix-no-default", // Estrategia de respaldo para rutas que no se reescriben
    storage: "cookie",
    rewrite: nextjsRewrite({
      "/about": {
        en: "/about",
        fr: "/a-propos",
      },
      "/product/[slug]": {
        en: "/product/[slug]",
        fr: "/produit/[slug]",
      },
      "/blog/[category]/[id]": {
        en: "/blog/[category]/[id]",
        fr: "/journal/[category]/[id]",
      },
    }),
  },
};

export default config;
```

---

### Configuración de Contenido (Content Configuration)

Ajustes relacionados con el procesamiento de contenido dentro de la aplicación (nombres de directorio, extensiones de archivo y configuraciones derivadas).

| Campo            | Tipo       | Descripción                                                                                                                                                                                                                 | Ejemplo                             | Nota                                                                                                                                                        |
| ---------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | `boolean`  | Indica si Intlayer debe vigilar los cambios en los archivos de declaración de contenido para reconstruir los diccionarios. Predeterminado: `process.env.NODE_ENV === 'development'`                                         |                                     |                                                                                                                                                             |
| `fileExtensions` | `string[]` | Extensiones de archivo utilizadas para escanear archivos de declaración de contenido. Predeterminado: `['.content.ts', '.content.js', '.content.mjs', '.content.cjs', '.content.json', '.content.json5', '.content.jsonc']` | `['.content.ts', '.content.js']`    |                                                                                                                                                             |
| `contentDir`     | `string[]` | Rutas a los directorios donde se encuentran los archivos de declaración de contenido. Predeterminado: `['.']`                                                                                                               | `['src/content']`                   |                                                                                                                                                             |
| `codeDir`        | `string[]` | Rutas a los directorios donde se encuentran los archivos de código fuente de su aplicación. Predeterminado: `['.']`                                                                                                         | `['src']`                           | Se utiliza para optimizar la compilación y garantizar que la transformación del código y la recarga en caliente solo se apliquen a los archivos necesarios. |
| `excludedPath`   | `string[]` | Rutas excluidas del escaneo de contenido. Predeterminado: `['node_modules', '.intlayer', '.next', 'dist', 'build']`                                                                                                         | `['src/styles']`                    |                                                                                                                                                             |
| `formatCommand`  | `string`   | Comando que se ejecutará para formatear los archivos de contenido recién creados o actualizados. Predeterminado: `undefined`                                                                                                | `'npx prettier --write "{{file}}"'` | Se utiliza durante la extracción del contenido o mediante el editor visual.                                                                                 |

---

### Configuración de Diccionario (Dictionary Configuration)

Ajustes que controlan las operaciones de diccionarios, incluyendo el comportamiento de relleno automático y la generación de contenido.

Esta configuración de diccionario tiene dos propósitos principales:

1. **Valores predeterminados**: Definir valores predeterminados al crear archivos de declaración de contenido.
2. **Comportamiento de respaldo**: Proporcionar valores de respaldo cuando no se definen campos específicos, lo que le permite definir el comportamiento de las operaciones de diccionario de forma global.

Para obtener más información sobre los archivos de declaración de contenido y cómo se aplican los valores de configuración, consulte la [documentación de archivos de contenido](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/content_file.md).

| Campo                       | Tipo                                                                                            | Descripción                                                                                                            | Ejemplo           | Nota                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fill`                      | `boolean &#124; FilePathPattern &#124; Partial<Record<Locale, boolean &#124; FilePathPattern>>` | Controla cómo se generan los archivos de salida del relleno automático (traducción por IA). Predeterminado: `true`     | Ver ejemplo abajo | `true`: Ruta predeterminada (mismo archivo que la fuente). `false`: Deshabilitado. Las plantillas de cadena/función generan archivos por localidad. Objeto por localidad: cada localidad se asigna a su propio patrón; `false` omite esa localidad. Incluir `{{locale}}` activa la generación por localidad. El `fill` a nivel de diccionario siempre tiene prioridad sobre esta configuración global. |
| `importMode`                | `'static' &#124; 'dynamic' &#124; 'fetch'`                                                      | Controla cómo se importan los diccionarios. Predeterminado: `'static'`                                                 | `'dynamic'`       | `'static'`: Importado estáticamente. `'dynamic'`: Importado dinámicamente mediante Suspense. `'fetch'`: Recuperado dinámicamente mediante el Live Sync API. No afecta a `getIntlayer`, `getDictionary`, `useDictionary`, etc.                                                                                                                                                                          |
| `location`                  | `'local' &#124; 'remote' &#124; 'hybrid' &#124; string`                                         | Dónde se almacenan los diccionarios. Predeterminado: `'local'`                                                         | `'remote'`        | `'local'`: sistema de archivos. `'remote'`: CMS de Intlayer. `'hybrid'`: ambos.                                                                                                                                                                                                                                                                                                                        |
| `contentAutoTransformation` | `boolean`                                                                                       | Si los archivos de contenido deben transformarse automáticamente (p. ej., de Markdown a HTML). Predeterminado: `false` | `true`            | Útil para procesar campos Markdown mediante @intlayer/markdown.                                                                                                                                                                                                                                                                                                                                        |

**Ejemplo de `fill`**:

```ts
dictionary: {
  fill: {
    en: '/locales/en/{{key}}.content.json',
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  }
}
```

---

### Configuración de IA (AI Configuration)

Define los ajustes para las características potenciadas por IA de Intlayer, como la construcción de traducciones.

| Campo                | Tipo                   | Descripción                                                                                  | Ejemplo                                     | Nota                                                                                          |
| -------------------- | ---------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `provider`           | `string`               | Proveedor de IA que se utilizará.                                                            | `'openai'`, `'anthropic'`, `'googlevertex'` |                                                                                               |
| `model`              | `string`               | Modelo de IA que se utilizará.                                                               | `'gpt-4o'`, `'claude-3-5-sonnet-20240620'`  |                                                                                               |
| `apiKey`             | `string`               | Clave de API para el proveedor seleccionado.                                                 | `process.env.OPENAI_API_KEY`                |                                                                                               |
| `applicationContext` | `string`               | Contexto adicional sobre su aplicación para mejorar la precisión de la traducción por la IA. | `'Plataforma de estudio para niños.'`       |                                                                                               |
| `baseURL`            | `string`               | URL base opcional para las llamadas de API.                                                  |                                             | Útil si utiliza un proxy o un despliegue local de IA.                                         |
| `dataSerialization`  | `'json' &#124; 'toon'` | Define cómo se envían los datos a la IA. Predeterminado: `'json'`                            | `'json'`                                    | `'json'`: más robusto y preciso. `'toon'`: consume menos tokens pero puede ser menos estable. |

---

### Configuración de Compilación (Build Configuration)

Ajustes para el proceso de compilación y optimización de Intlayer.

| Campo          | Tipo                     | Descripción                                                                                                                       | Ejemplo | Nota |
| -------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ------- | ---- |
| `mode`         | `'auto' &#124; 'manual'` | Indica si Intlayer debe ejecutarse automáticamente durante los pasos de precompilación de la aplicación. Predeterminado: `'auto'` |         |      |
| `optimize`     | `boolean`                | Indica si los diccionarios compilados deben optimizarse para el tiempo de ejecución. Predeterminado: `true` en producción         |         |      |
| `outputFormat` | `('cjs' &#124; 'esm')[]` | Formato de salida para los archivos de diccionario generados. Predeterminado: `['cjs', 'esm']`                                    |         |      |
| `checkTypes`   | `boolean`                | Indica si Intlayer debe verificar los tipos en los archivos generados. Predeterminado: `false`                                    |         |      |

---

### Configuración del Sistema (System Configuration)

Estos ajustes están destinados a casos de uso avanzados y para la configuración interna de Intlayer.

| Campo                     | Tipo     | Descripción                                         | Predeterminado                    |
| ------------------------- | -------- | --------------------------------------------------- | --------------------------------- |
| `dictionariesDir`         | `string` | Directorio de diccionarios compilados.              | `'.intlayer/dictionary'`          |
| `moduleAugmentationDir`   | `string` | Directorio de aumento de módulos de TypeScript.     | `'.intlayer/types'`               |
| `unmergedDictionariesDir` | `string` | Directorio de diccionarios no fusionados.           | `'.intlayer/unmerged_dictionary'` |
| `typesDir`                | `string` | Directorio de tipos generados.                      | `'.intlayer/types'`               |
| `mainDir`                 | `string` | Directorio principal de archivos de Intlayer.       | `'.intlayer/main'`                |
| `configDir`               | `string` | Directorio de archivos de configuración compilados. | `'.intlayer/config'`              |
| `cacheDir`                | `string` | Directorio de archivos de caché.                    | `'.intlayer/cache'`               |

---

### Configuración del Compilador (Compiler Configuration)

Ajustes para el compilador de Intlayer (`intlayer compiler`).

| Campo                 | Tipo                     | Descripción                                                                                         | Predeterminado |
| --------------------- | ------------------------ | --------------------------------------------------------------------------------------------------- | -------------- |
| `enabled`             | `boolean`                | Indica si el compilador está activo.                                                                | `false`        |
| `output`              | `string &#124; Function` | Ruta de salida para los diccionarios extraídos.                                                     |                |
| `saveComponents`      | `boolean`                | Indica si los archivos de origen originales deben ser sobrescritos con las versiones transformadas. | `false`        |
| `noMetadata`          | `boolean`                | Si es `true`, el compilador no incluirá metadatos en los archivos generados.                        | `false`        |
| `dictionaryKeyPrefix` | `string`                 | Prefijo opcional de clave de diccionario.                                                           | `''`           |

---

### Configuración del Registrador (Logger Configuration)

Ajustes para personalizar la salida de registros de Intlayer.

| Campo    | Tipo                                           | Descripción                            | Predeterminado |
| -------- | ---------------------------------------------- | -------------------------------------- | -------------- |
| `mode`   | `'default' &#124; 'verbose' &#124; 'disabled'` | Modo de registro.                      | `'default'`    |
| `prefix` | `string`                                       | Prefijo para los mensajes de registro. | `'[intlayer]'` |

---

### Esquemas Personalizados (Custom Schemas)

| Campo     | Tipo                        | Descripción                                                                     |
| --------- | --------------------------- | ------------------------------------------------------------------------------- |
| `schemas` | `Record<string, ZodSchema>` | Permite definir esquemas de Zod para validar la estructura de sus diccionarios. |

---

### Complementos (Plugins)

| Campo     | Tipo               | Descripción                                         |
| --------- | ------------------ | --------------------------------------------------- |
| `plugins` | `IntlayerPlugin[]` | Lista de complementos de Intlayer que se activarán. |
