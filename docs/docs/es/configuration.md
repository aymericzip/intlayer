---
createdAt: 2024-08-13
updatedAt: 2026-04-08
title: Configuración (Configuration)
description: Aprenda a configure Intlayer para su aplicación. Entienda los diversos ajustes y opciones disponibles para personalizar Intlayer según sus necesidades.
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
  - version: 8.7.0
    date: 2026-04-08
    changes: "Se añadieron las opciones `prune` y `minify` a la configuración de compilación"
  - version: 8.7.0
    date: 2026-04-03
    changes: "Se añadió la opción `currentDomain`"
  - version: 8.4.0
    date: 2026-03-20
    changes: "Se añadió la notación de objeto por localidad para 'compiler.output' y 'dictionary.fill'"
  - version: 8.3.0
    date: 2026-03-11
    changes: "Se movió 'baseDir' de la configuración 'content' a la configuración 'system'"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Se actualizaron las opciones del compilador (compiler), se añadió soporte para 'output' y 'noMetadata'"
  - version: 8.1.7
    date: 2026-02-25
    changes: "Se actualizaron las opciones del compilador"
  - version: 8.1.5
    date: 2026-02-23
    changes: "Se añadió la opción del compilador 'build-only' y el prefijo del diccionario"
  - version: 8.0.6
    date: 2026-02-12
    changes: "Se añadió soporte para los proveedores Open Router, Alibaba, Amazon, Google Vertex Bedrock, Fireworks, Groq, Hugging Face y Together.ai"
  - version: 8.0.5
    date: 2026-02-06
    changes: "Se añadió `dataSerialization` a la configuración de IA"
  - version: 8.0.0
    date: 2026-01-24
    changes: "Se renombró el modo de importación `live` a `fetch` para describir mejor el mecanismo subyacente."
  - version: 8.0.0
    date: 2026-01-22
    changes: "Se movió la configuración de compilación `importMode` a la configuración `dictionary`."
  - version: 8.0.0
    date: 2026-01-22
    changes: "Se añadió la opción `rewrite` a la configuración de enrutamiento"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Se separó la configuración del sistema de la configuración de contenido. Se movieron las rutas internas a la propiedad `system`. Se añadió `codeDir` para separar los archivos de contenido y la transformación de código."
  - version: 8.0.0
    date: 2026-01-18
    changes: "Se añadieron las opciones de diccionario `location` y `schema`"
  - version: 7.5.1
    date: 2026-01-10
    changes: "Se añadió soporte para los formatos de archivo JSON5 y JSONC"
  - version: 7.5.0
    date: 2025-12-17
    changes: "Se añadió la opción `buildMode`"
  - version: 7.0.0
    date: 2025-10-25
    changes: "Se añadió la configuración `dictionary`"
  - version: 7.0.0
    date: 2025-10-21
    changes: "Se reemplazó `middleware` por la configuración de enrutamiento `routing`"
  - version: 7.0.0
    date: 2025-10-12
    changes: "Se añadió la opción `formatCommand`"
  - version: 6.2.0
    date: 2025-10-12
    changes: "Se actualizó la opción `excludedPath`"
  - version: 6.0.2
    date: 2025-09-23
    changes: "Se añadió la opción `outputFormat`"
  - version: 6.0.0
    date: 2025-09-21
    changes: "Se eliminó el campo `dictionaryOutput` y el campo `i18nextResourcesDir`"
  - version: 6.0.0
    date: 2025-09-16
    changes: "Se añadió el modo de importación `live`"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Se reemplazó el campo `hotReload` por `liveSync`, y se añadieron los campos `liveSyncPort` y `liveSyncURL`"
  - version: 5.6.1
    date: 2025-07-25
    changes: "Se reemplazó `activateDynamicImport` por la opción `importMode`"
  - version: 5.6.0
    date: 2025-07-13
    changes: "Se cambió el contentDir predeterminado de `['src']` a `['.']`"
  - version: 5.5.11
    date: 2025-06-29
    changes: "Se añadieron los comandos `docs`"
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
   * Configuración de los ajustes de internacionalización (internationalization).
   */
  internationalization: {
    /**
     * Lista de localidades (locales) admitidas en la aplicación.
     * Predeterminado: [Locales.ENGLISH]
     */
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],

    /**
     * Lista de localidades obligatorias (required) que deben definirse en cada diccionario.
     * Si está vacío, todas las localidades son obligatorias en modo `strict`.
     * Predeterminado: []
     */
    requiredLocales: [Locales.ENGLISH],

    /**
     * Nivel de rigor (strictness) para el contenido internacionalizado.
     * - "strict": Error si falta alguna localidad declarada o si no está declarada.
     * - "inclusive": Advertencia si falta una localidad declarada.
     * - "loose": Acepta cualquier localidad existente.
     * Predeterminado: "inclusive"
     */
    strictMode: "inclusive",

    /**
     * Localidad predeterminada utilizada como recurso (fallback) en caso de que no se encuentre la localidad solicitada.
     * Predeterminado: Locales.ENGLISH
     */
    defaultLocale: Locales.ENGLISH,
  },

  /**
   * Ajustes que controlan las operaciones de diccionarios (dictionary) y el comportamiento de respaldo.
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
   * Configuración de enrutamiento (routing) y middleware.
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

    /**
     * Mapea las localidades a los nombres de host de dominio para el enrutamiento basado en dominios.
     * Las URL para estas localidades serán absolutas (p. ej., https://intlayer.cn/).
     * El dominio implica la localidad, por lo que no se añade ningún prefijo de localidad a la ruta.
     * Predeterminado: undefined
     */
    domains: {
      en: "intlayer.org",
      zh: "intlayer.cn",
    },
  },

  /**
   * Ajustes relacionados con la búsqueda y procesamiento de archivos de contenido (content).
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
     * Ubicación del código fuente (code).
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
     * Activa la sincronización de contenido en tiempo real (Live Sync).
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
     * Clave de API del proveedor (API key).
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
   * Ajustes de compilación (build) y optimización.
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
     * Si se debe optimizar el paquete final (bundle) eliminando los diccionarios no utilizados.
     * Predeterminado: true en producción
     */
    optimize: true,

    /**
     * Minificar los diccionarios para reducir el tamaño del bundle.
     * Predeterminado: true
     *
     * Nota:
     * - Esta opción será ignorada si `optimize` está desactivado.
     * - Esta opción será ignorada si `editor.enabled` es verdadero.
     */
    minify: true,

    /**
     * Purgar las claves no utilizadas en los diccionarios.
     * Predeterminado: true
     *
     * Nota:
     * - Esta opción será ignorada si `optimize` está desactivado.
     */
    purge: true,

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
     * Nivel de registro (logging).
     * - "default": Registro estándar.
     * - "verbose": Registro detallado de depuración (debug).
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
   * Configuración del sistema (System Configuration - Para uso avanzado)
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
   * Configuración del Compilador (Compiler Configuration - Para uso avanzado)
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
     * - Al incluir la variable `{{locale}}` en la ruta, se activará la creación de diccionarios separados por idioma (locale).
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
     *
     * - Si es `true`, el compilador reescribirá el archivo del componente en el disco. Por lo tanto, la transformación será permanente y el compilador omitirá la transformación en el próximo proceso. De esta manera, el compilador puede transformar la aplicación y luego puede ser eliminado.
     *
     * - Si es `false`, el compilador inyectará la llamada a la función `useIntlayer()` en el código solo en la salida del build, y mantendrá intacta la base de código original. La transformación se realizará solo en memoria.
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
   * Esquemas personalizados (schemas) para validar el contenido de los diccionarios.
   */
  schemas: {
    "my-schema": z.object({
      title: z.string(),
    }),
  },

  /**
   * Configuración de complementos (plugins).
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

| Campo             | Descripción                                                                                            | Tipo       | Predeterminado      | Ejemplo              | Nota                                                                                                                                                                                                                                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------ | ---------- | ------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locales`         | Lista de localidades (locales) admitidas en la aplicación.                                             | `string[]` | `[Locales.ENGLISH]` | `['en', 'fr', 'es']` |                                                                                                                                                                                                                                                                                                                                           |
| `requiredLocales` | Lista de localidades obligatorias en la aplicación.                                                    | `string[]` | `[]`                | `[]`                 | • Si está vacío, todas las localidades son obligatorias en modo `strict`.<br/>• Asegúrese de que las localidades obligatorias también estén definidas en el campo `locales`.                                                                                                                                                              |
| `strictMode`      | Garantiza una implementación robusta del contenido internacionalizado mediante el uso de TypeScript.   | `string`   | `'inclusive'`       |                      | • Si es `"strict"`: la función `t` requiere que se defina cada localidad declarada; arroja un error si alguna de ellas falta o no está declarada.<br/>• Si es `"inclusive"`: advierte sobre las localidades que faltan pero acepta las localidades existentes no declaradas.<br/>• Si es `"loose"`: acepta cualquier localidad existente. |
| `defaultLocale`   | Localidad predeterminada utilizada como recurso (fallback) si no se encuentra la localidad solicitada. | `string`   | `Locales.ENGLISH`   | `'en'`               | Se utiliza para determinar la localidad cuando no se especifica ninguna en la URL, galleta (cookie) o cabecera.                                                                                                                                                                                                                           |

---

### Configuración del Editor (Editor Configuration)

Define los ajustes relacionados con el editor integrado, incluido el puerto del servidor y su estado de actividad.

| Campo                        | Descripción                                                                                                                                                                          | Tipo                              | Predeterminado                      | Ejemplo                                                                                         | Nota                                                                                                                                                                                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `applicationURL`             | URL de su aplicación para la validación de origen (origin).                                                                                                                          | `string`                          | `undefined`                         | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Se utiliza para restringir los orígenes del editor por razones de seguridad.<br/>• Si se establece en `'*'`, se puede acceder al editor desde cualquier origen.                                                                                                |
| `port`                       | Puerto utilizado por el servidor del Editor Visual.                                                                                                                                  | `number`                          | `8000`                              |                                                                                                 |                                                                                                                                                                                                                                                                  |
| `editorURL`                  | URL del servidor del editor.                                                                                                                                                         | `string`                          | `'http://localhost:8000'`           | `'http://localhost:3000'` <br/> `'https://example.com'` <br/> `process.env.INTLAYER_EDITOR_URL` | • Se utiliza para restringir los orígenes que pueden interactuar con la aplicación.<br/>• Si se establece en `'*'`, es accesible desde cualquier origen.<br/>• Debe establecerse si cambia el puerto o si el editor está alojado en un dominio diferente.        |
| `cmsURL`                     | URL del CMS de Intlayer.                                                                                                                                                             | `string`                          | `'https://app.intlayer.org'`        | `'https://app.intlayer.org'`                                                                    |                                                                                                                                                                                                                                                                  |
| `backendURL`                 | URL del servidor backend.                                                                                                                                                            | `string`                          | `https://back.intlayer.org`         | `http://localhost:4000`                                                                         |                                                                                                                                                                                                                                                                  |
| `enabled`                    | Indica si la aplicación interactuará con el editor visual.                                                                                                                           | `boolean`                         | `false`                             | `process.env.NODE_ENV !== 'production'`                                                         | • Si es `false`, el editor no puede interactuar con la aplicación.<br/>• Deshabilitarlo en entornos específicos mejora la seguridad.                                                                                                                             |
| `clientId`                   | Permite que los paquetes intlayer se autentiquen con el backend utilizando oAuth2. Para recibir un token de acceso, vaya a [intlayer.org/project](https://app.intlayer.org/project). | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Manténgalo en secreto; almacénelo en variables de entorno.                                                                                                                                                                                                       |
| `clientSecret`               | Permite que los paquetes intlayer se autentiquen con el backend utilizando oAuth2. Para recibir un token de acceso, vaya a [intlayer.org/project](https://app.intlayer.org/project). | `string` &#124; <br/> `undefined` | `undefined`                         |                                                                                                 | Manténgalo en secreto; almacénelo en variables de entorno.                                                                                                                                                                                                       |
| `dictionaryPriorityStrategy` | Estrategia de prioridad de diccionarios cuando existan diccionarios locales y remotos.                                                                                               | `string`                          | `'local_first'`                     | `'distant_first'`                                                                               | • `'distant_first'`: Prioriza los remotos sobre los locales.<br/>• `'local_first'`: Prioriza los locales sobre los remotos.                                                                                                                                      |
| `liveSync`                   | Indica si el servidor de aplicaciones debe recargar el contenido en caliente cuando se detecta un cambio en el CMS <br/> Editor Visual <br/> Backend.                                | `boolean`                         | `true`                              | `true`                                                                                          | • Cuando se agrega/actualiza un diccionario, la aplicación actualiza el contenido de la página.<br/>• Live sync externaliza el contenido a otro servidor, lo que puede afectar ligeramente el rendimiento.<br/>• Se recomienda alojar ambos en la misma máquina. |
| `liveSyncPort`               | Puerto del servidor de sincronización en vivo (live sync).                                                                                                                           | `number`                          | `4000`                              | `4000`                                                                                          |                                                                                                                                                                                                                                                                  |
| `liveSyncURL`                | URL del servidor de sincronización en vivo (live sync).                                                                                                                              | `string`                          | `'http://localhost:{liveSyncPort}'` | `'https://example.com'`                                                                         | Apunta a localhost de forma predeterminada; puede cambiarse a un servidor remoto de Live Sync.                                                                                                                                                                   |

---

### Configuración de Enrutamiento (Routing Configuration)

Ajustes que controlan el comportamiento del enrutamiento, incluida la estructura de la URL, el almacenamiento de localidades y el manejo del middleware.

| Campo      | Descripción                                                                                                                                                  | Tipo                                                                                                                                                                                                         | Predeterminado         | Ejemplo                                                                                                                                                                                         | Nota                                                                                                                                                                                                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`     | Modo de enrutamiento de URL para el manejo de localidades (locales).                                                                                         | `'prefix-no-default'` &#124; <br/> `'prefix-all'` &#124; <br/> `'no-prefix'` &#124; <br/> `'search-params'`                                                                                                  | `'prefix-no-default'`  | `'prefix-no-default'`: `/dashboard` (en) o `/fr/dashboard` (fr). `'prefix-all'`: `/en/dashboard`. `'no-prefix'`: localidad manejada por otros medios. `'search-params'`: `/dashboard?locale=fr` | No afecta la gestión de galletas (cookies) o el almacenamiento de localidades.                                                                                                                                                                                                                                    |
| `storage`  | Configuración para almacenar la localidad (locale) en el cliente.                                                                                            | `false` &#124; <br/> `'cookie'` &#124; <br/> `'localStorage'` &#124; <br/> `'sessionStorage'` &#124; <br/> `'header'` &#124; <br/> `CookiesAttributes` &#124; <br/> `StorageAttributes` &#124; <br/> `Array` | `['cookie', 'header']` | `'localStorage'` <br/> `[{ type: 'cookie', name: 'custom-locale', secure: true }]`                                                                                                              | Consulte la tabla de Opciones de Almacenamiento más abajo.                                                                                                                                                                                                                                                        |
| `basePath` | Ruta base para las URL de la aplicación.                                                                                                                     | `string`                                                                                                                                                                                                     | `''`                   | `'/my-app'`                                                                                                                                                                                     | Si la aplicación está en `https://example.com/my-app`, basePath es `'/my-app'` y las URL se convierten en `https://example.com/my-app/en`.                                                                                                                                                                        |
| `rewrite`  | Reglas de reescritura de URL personalizadas que anulan el modo de enrutamiento predeterminado para rutas específicas. Admite parámetros dinámicos `[param]`. | `Record<string, StrictModeLocaleMap<string>>`                                                                                                                                                                | `undefined`            | Ver ejemplo abajo                                                                                                                                                                               | • Las reglas de reescritura tienen prioridad sobre `mode`.<br/>• Funciona con Next.js y Vite.<br/>• `getLocalizedUrl()` aplica automáticamente las reglas correspondientes.<br/>• Ver [Reescrituras de URL Personalizadas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/custom_url_rewrites.md). |

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

| Campo      | Tipo                                                  | Descripción                                                        |
| ---------- | ----------------------------------------------------- | ------------------------------------------------------------------ |
| `name`     | `string`                                              | Nombre de la galleta (cookie). Predeterminado: `'INTLAYER_LOCALE'` |
| `domain`   | `string`                                              | Dominio de la galleta. Predeterminado: `undefined`                 |
| `path`     | `string`                                              | Ruta de la galleta. Predeterminado: `undefined`                    |
| `secure`   | `boolean`                                             | Requiere HTTPS. Predeterminado: `undefined`                        |
| `httpOnly` | `boolean`                                             | Bandera HTTP-only. Predeterminado: `undefined`                     |
| `sameSite` | `'strict'` &#124; <br/> `'lax'` &#124; <br/> `'none'` | Política de SameSite.                                              |
| `expires`  | `Date` &#124; <br/> `number`                          | Fecha de expiración o número de días. Predeterminado: `undefined`  |

#### Atributos de Almacenamiento de Localidad (Locale Storage Attributes)

Cuando se utiliza localStorage o sessionStorage:

| Campo  | Tipo                                             | Descripción                                                               |
| ------ | ------------------------------------------------ | ------------------------------------------------------------------------- |
| `type` | `'localStorage'` &#124; <br/> `'sessionStorage'` | Tipo de almacenamiento.                                                   |
| `name` | `string`                                         | Nombre de la clave de almacenamiento. Predeterminado: `'INTLAYER_LOCALE'` |

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

| Campo            | Descripción                                                                                                                | Tipo       | Predeterminado                                                                                                                                                            | Ejemplo                                                                                                                                                                               | Nota                                                                                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `watch`          | Indica si Intlayer debe vigilar los cambios en los archivos de declaración de contenido para reconstruir los diccionarios. | `boolean`  | `true`                                                                                                                                                                    |                                                                                                                                                                                       |                                                                                                                                                            |
| `fileExtensions` | Extensiones de archivo que se buscarán al compilar diccionarios.                                                           | `string[]` | `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.json5', '.content.jsonc', '.content.tsx', '.content.jsx']`                     | `['.data.ts', '.data.js', '.data.json']`                                                                                                                                              | La personalización puede ayudar a evitar conflictos.                                                                                                       |
| `contentDir`     | Ruta del directorio donde se almacenan los archivos de definición de contenido (`.content.*`).                             | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library', require.resolve("@my-package/content"), '@my-package/content']`                                                                                          | Se utiliza para monitorear archivos de contenido y reconstruir diccionarios.                                                                               |
| `codeDir`        | Ruta del directorio donde se almacena el código, relativa al directorio base.                                              | `string[]` | `['.']`                                                                                                                                                                   | `['src', '../../ui-library']`                                                                                                                                                         | • Se utiliza para monitorear archivos de código para su transformación (podado, optimización).<br/>• Separar de `contentDir` puede mejorar el rendimiento. |
| `excludedPath`   | Directorios excluidos de la búsqueda de contenido.                                                                         | `string[]` | `['**/node_modules/**', '**/dist/**', '**/build/**', '**/.intlayer/**', '**/.next/**', '**/.nuxt/**', '**/.expo/**', '**/.vercel/**', '**/.turbo/**', '**/.tanstack/**']` |                                                                                                                                                                                       | Todavía no se utiliza; previsto para implementación futura.                                                                                                |
| `formatCommand`  | Comando para dar formato a los archivos de contenido cuando Intlayer los escribe localmente.                               | `string`   | `undefined`                                                                                                                                                               | `'npx prettier --write "{{file}}" --log-level silent'` (Prettier), `'npx biome format "{{file}}" --write --log-level none'` (Biome), `'npx eslint --fix "{{file}}" --quiet'` (ESLint) | • `{{file}}` se reemplaza por la ruta del archivo.<br/>• Si no se define, Intlayer lo detecta automáticamente (prueba prettier, biome, eslint).            |

---

### Configuración del Diccionario (Dictionary Configuration)

Parámetros que controlan las operaciones de diccionarios, incluido el comportamiento de relleno automático y la generación de contenido.

| Campo                       | Descripción                                                                                                                                                           | Tipo                                                                                                            | Predeterminado | Ejemplo                                                                                     | Nota                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fill`                      | Controla cómo se generan los archivos de salida del relleno automático (traducción por IA).                                                                           | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `true`         | `{ en: '/locales/en/{{key}}.json', fr: ({ key }) => '/locales/fr/${key}.json', es: false }` | • `true`: ruta predeterminada (el mismo archivo que la fuente).<br/>• `false`: deshabilitar.<br/>• El patrón de cadena/función genera archivos por localidad.<br/>• Objeto por localidad: cada localidad corresponde a su propio patrón; `false` ignora esa localidad.<br/>• La inclusión de `{{locale}}` activa la generación por localidad.<br/>• `fill` a nivel de diccionario siempre tiene prioridad sobre esta configuración global. |
| `description`               | Ayuda a comprender el propósito del diccionario en el editor y el CMS. También se utiliza como contexto para la generación de traducciones por IA.                    | `string`                                                                                                        | `undefined`    | `'User profile section'`                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `locale`                    | Transforma el diccionario en un formato por localidad. Cada campo declarado se convierte en un nodo de traducción. Si no está, el diccionario se trata como bilingüe. | `LocalesValues`                                                                                                 | `undefined`    | `'en'`                                                                                      | Úselo cuando el diccionario sea específico para una sola localidad en lugar de contener traducciones para varias.                                                                                                                                                                                                                                                                                                                          |
| `contentAutoTransformation` | Transforma automáticamente cadenas de contenido en nodos tipados (markdown, HTML o inserción).                                                                        | `boolean` &#124; <br/> `{ markdown?: boolean; html?: boolean; insertion?: boolean }`                            | `false`        | `true`                                                                                      | • Markdown : `### Title` → `md('### Title')`.<br/>• HTML : `<div>Title</div>` → `html('<div>Title</div>')`.<br/>• Inserción : `Hello {{name}}` → `insert('Hello {{name}}')`.                                                                                                                                                                                                                                                               |
| `location`                  | Indica dónde se almacenan los archivos de diccionario y cómo se sincronizan con el CMS.                                                                               | `'local'` &#124; <br/> `'remote'` &#124; <br/> `'hybrid'` &#124; <br/> `'plugin'` &#124; <br/> `string`         | `'local'`      | `'hybrid'`                                                                                  | • `'local'` : solo se gestiona localmente.<br/>• `'remote'` : solo se gestiona de forma remota (CMS).<br/>• `'hybrid'` : se gestiona tanto local como remotamente.<br/>• `'plugin'` o cadena personalizada: gestionado por un plugin o fuente personalizada.                                                                                                                                                                               |
| `importMode`                | Controla cómo se importan los diccionarios.                                                                                                                           | `'static'` &#124; <br/> `'dynamic'` &#124; <br/> `'fetch'`                                                      | `'static'`     | `'dynamic'`                                                                                 | • `'static'`: importado estáticamente.<br/>• `'dynamic'`: importado dinámicamente mediante Suspense.<br/>• `'fetch'`: recuperado vía live sync API; recurre a `'dynamic'` si falla.<br/>• Depende de los plugins `@intlayer/babel` y `@intlayer/swc`.<br/>• Las claves deben declararse estáticamente.<br/>• Se ignora si `optimize` está desactivado.<br/>• No afecta a `getIntlayer`, `getDictionary`, etc.                              |
| `priority`                  | Prioridad del diccionario. Los valores más altos ganan sobre los más bajos al resolver conflictos entre diccionarios.                                                 | `number`                                                                                                        | `undefined`    | `1`                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `live`                      | Depreciado — use `importMode: 'fetch'` en su lugar. Indicaba si el contenido del diccionario se recuperaba dinámicamente a través de la API live sync.                | `boolean`                                                                                                       | `undefined`    |                                                                                             | Renombrado a `importMode: 'fetch'` en v8.0.0.                                                                                                                                                                                                                                                                                                                                                                                              |
| `schema`                    | Generado automáticamente por Intlayer para la validación del esquema JSON.                                                                                            | `'https://intlayer.org/schema.json'`                                                                            | auto-generado  |                                                                                             | No editar manualmente.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `title`                     | Ayuda a identificar el diccionario en el editor y el CMS.                                                                                                             | `string`                                                                                                        | `undefined`    | `'User Profile'`                                                                            |                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `tags`                      | Categoriza los diccionarios y proporciona contexto o instrucciones para el editor y la IA.                                                                            | `string[]`                                                                                                      | `undefined`    | `['user', 'profile']`                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `version`                   | Versión del diccionario remoto; ayuda a rastrear la versión que se está utilizando actualmente.                                                                       | `string`                                                                                                        | `undefined`    | `'1.0.0'`                                                                                   | • Gestionable en el CMS.<br/>• No editar localmente.                                                                                                                                                                                                                                                                                                                                                                                       |

**Ejemplo de `fill`** :

```ts
dictionary: {
  fill: {
    en: "/locales/en/{{key}}.content.json",
    fr: ({ key }) => `/locales/fr/${key}.content.json`,
    es: false,
  },
};
```

---

### Configuración del Registrador (Logger Configuration)

Parámetros para personalizar la salida de registros (logs) de Intlayer.

| Campo    | Descripción                     | Tipo                                                           | Predeterminado  | Ejemplo                 | Nota                                                                                                                 |
| -------- | ------------------------------- | -------------------------------------------------------------- | --------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `mode`   | Indica el modo del registrador. | `'default'` &#124; <br/> `'verbose'` &#124; <br/> `'disabled'` | `'default'`     | `'verbose'`             | • `'verbose'`: registra más información para depuración.<br/>• `'disabled'`: desactiva completamente el registrador. |
| `prefix` | El prefijo del registrador.     | `string`                                                       | `'[intlayer] '` | `'[my custom prefix] '` |                                                                                                                      |

---

### Configuración de IA (AI Configuration)

Ajustes que controlan las funciones de IA de Intlayer, incluidos el proveedor, el modelo y la clave API.

Esta configuración es opcional si está registrado en el [Dashboard de Intlayer](https://app.intlayer.org/project) con una clave de acceso. Intlayer gestionará automáticamente la solución de IA más eficiente y económica para sus necesidades. El uso de las opciones predeterminadas garantiza una mejor mantenibilidad a largo plazo, ya que Intlayer se actualiza continuamente para usar los modelos más relevantes.

Si prefiere usar su propia clave API o un modelo específico, puede definir su configuración de IA personalizada.
Esta configuración de IA se usará globalmente en su entorno de Intlayer. Los comandos de la CLI usarán estos ajustes de forma predeterminada para comandos como `fill`, así como el SDK, el Editor Visual y el CMS. Puede anular estos valores predeterminados para casos de uso específicos mediante parámetros de comando.

Intlayer admite múltiples proveedores de IA para una flexibilidad máxima. Los proveedores admitidos actualmente son:

- **OpenAI** (Predeterminado)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Google AI Studio**
- **Google Vertex**
- **Meta Llama**
- **Ollama**
- **OpenRouter**
- **Alibaba Cloud**
- **Fireworks**
- **Hugging Face**
- **Groq**
- **Amazon Bedrock**
- **Together.ai**

| Campo                | Descripción                                                                                                                              | Tipo                                                                                                                                                                                                                                                                                                                                                                                           | Predeterminado | Ejemplo                                                       | Nota                                                                                                                                                                                           |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`           | El proveedor que se usará para las funciones de IA de Intlayer.                                                                          | `'openai'` &#124; <br/> `'anthropic'` &#124; <br/> `'mistral'` &#124; <br/> `'deepseek'` &#124; <br/> `'gemini'` &#124; <br/> `'ollama'` &#124; <br/> `'openrouter'` &#124; <br/> `'alibaba'` &#124; <br/> `'fireworks'` &#124; <br/> `'groq'` &#124; <br/> `'huggingface'` &#124; <br/> `'bedrock'` &#124; <br/> `'googleaistudio'` &#124; <br/> `'googlevertex'` &#124; <br/> `'togetherai'` | `undefined`    | `'anthropic'`                                                 | Diferentes proveedores requieren diferentes llaves de API y tienen distintos precios.                                                                                                          |
| `model`              | El modelo que se usará para las funciones de IA.                                                                                         | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Ninguno        | `'gpt-4o-2024-11-20'`                                         | El modelo específico varía según el proveedor.                                                                                                                                                 |
| `temperature`        | Controla la aleatoriedad de las respuestas de la IA.                                                                                     | `number`                                                                                                                                                                                                                                                                                                                                                                                       | Ninguno        | `0.1`                                                         | Temperatura más alta = más creativo y menos predecible.                                                                                                                                        |
| `apiKey`             | Su llave API para el proveedor seleccionado.                                                                                             | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Ninguno        | `process.env.OPENAI_API_KEY`                                  | Manténgalo en secreto; almacénelo en variables de entorno.                                                                                                                                     |
| `applicationContext` | Contexto adicional sobre su aplicación para ayudar a la IA a generar traducciones más precisas (dominio, audiencia, tono, terminología). | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Ninguno        | `'Mi contexto de aplicación'`                                 | Puede usarse para añadir reglas (p. ej.: `"No debes transformar las urls"`).                                                                                                                   |
| `baseURL`            | La URL base para la API de IA.                                                                                                           | `string`                                                                                                                                                                                                                                                                                                                                                                                       | Ninguno        | `'https://api.openai.com/v1'` <br/> `'http://localhost:5000'` | Puede apuntar a un endpoint de API de IA local o personalizado.                                                                                                                                |
| `dataSerialization`  | Formato de serialización de datos para las funciones de IA.                                                                              | `'json'` &#124; <br/> `'toon'`                                                                                                                                                                                                                                                                                                                                                                 | `undefined`    | `'toon'`                                                      | • `'json'`: estándar, fiable; usa más tokens.<br/>• `'toon'`: menos tokens, menos consistente.<br/>• Se pasan parámetros adicionales al modelo como contexto (esfuerzo de razonamiento, etc.). |

---

### Configuración de Compilación (Build Configuration)

Parámetros que controlan cómo Intlayer optimiza y construye la internacionalización de su aplicación.

Las opciones de compilación se aplican a los complementos `@intlayer/babel` y `@intlayer/swc`.

> En modo de desarrollo, Intlayer utiliza importaciones estáticas para los diccionarios a fin de simplificar la experiencia de desarrollo.

> Cuando se optimiza, Intlayer reemplazará las llamadas a diccionarios para optimizar el chunking, de modo que el bundle final solo importe los diccionarios que realmente se usan.

| Campo             | Descripción                                                                      | Tipo                             | Predeterminado                                                                                                                                                                    | Ejemplo                                                                       | Nota                                                                                                                                                                                                                                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`            | Controla el modo de compilación.                                                 | `'auto'` &#124; <br/> `'manual'` | `'auto'`                                                                                                                                                                          | `'manual'`                                                                    | • `'auto'`: compilación activada automáticamente durante la compilación de la aplicación.<br/>• `'manual'`: solo se ejecuta cuando se lanza explícitamente el comando de compilación.<br/>• Se puede usar para desactivar compilaciones de diccionarios (p. ej. para evitar ejecución en entornos de Node.js).                |
| `optimize`        | Controla si la compilación debe optimizarse.                                     | `boolean`                        | `undefined`                                                                                                                                                                       | `process.env.NODE_ENV === 'production'`                                       | • Si no se define, la optimización se dispara al compilar el framework (Vite/Next.js).<br/>• `true` fuerza la optimización incluso en modo dev.<br/>• `false` la desactiva.<br/>• Activo, reemplaza las llamadas a diccionarios para optimizar el chunking.<br/>• Depende de los plugins `@intlayer/babel` y `@intlayer/swc`. |
| `minify`          | Minificar los diccionarios para reducir el tamaño del bundle.                    | `boolean`                        | `true`                                                                                                                                                                            |                                                                               | • Indica si el bundle debe ser minificado.<br/>• Por defecto: `true` en producción.<br/>• Esta opción será ignorada si `optimize` está desactivado.<br/>• Esta opción será ignorada si `editor.enabled` es verdadero.                                                                                                         |
| `purge`           | Purgar las claves no utilizadas en los diccionarios.                             | `boolean`                        | `true`                                                                                                                                                                            |                                                                               | • Indica si el bundle debe ser purgado.<br/>• Por defecto: `true` en producción.<br/>• Esta opción será ignorada si `optimize` está desactivado.                                                                                                                                                                              |
| `checkTypes`      | Indica si la compilación debe verificar tipos de TypeScript y registrar errores. | `boolean`                        | `false`                                                                                                                                                                           |                                                                               | Puede ralentizar la compilación.                                                                                                                                                                                                                                                                                              |
| `outputFormat`    | Controla el formato de salida de los diccionarios.                               | `('esm' &#124; 'cjs')[]`         | `['esm', 'cjs']`                                                                                                                                                                  | `['cjs']`                                                                     |                                                                                                                                                                                                                                                                                                                               |
| `traversePattern` | Patrones que definen qué archivos recorrer durante la optimización.              | `string[]`                       | `['**/*.{tsx,ts,js,mjs,cjs,jsx,vue,svelte,svte}', '!**/node_modules/**', '!**/dist/**', '!**/.intlayer/**', '!**/*.config.*', '!**/*.test.*', '!**/*.spec.*', '!**/*.stories.*']` | `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']` | • Limite la optimización a los archivos relevantes para mejorar el rendimiento de compilación.<br/>• Se ignora si `optimize` está desactivado.<br/>• Usa patrones glob (glob patterns).                                                                                                                                       |

---

### Configuración del Sistema (System Configuration)

Estos ajustes son para casos de uso avanzados y configuración interna de Intlayer.

| Campo                     | Descripción                                         | Tipo     | Predeterminado                    | Ejemplo | Nota |
| ------------------------- | --------------------------------------------------- | -------- | --------------------------------- | ------- | ---- |
| `dictionariesDir`         | Directorio de diccionarios compilados.              | `string` | `'.intlayer/dictionary'`          |         |      |
| `moduleAugmentationDir`   | Directorio de aumento de módulos TypeScript.        | `string` | `'.intlayer/types'`               |         |      |
| `unmergedDictionariesDir` | Directorio de diccionarios no fusionados.           | `string` | `'.intlayer/unmerged_dictionary'` |         |      |
| `typesDir`                | Directorio de tipos generados.                      | `string` | `'.intlayer/types'`               |         |      |
| `mainDir`                 | Directorio del archivo principal de Intlayer.       | `string` | `'.intlayer/main'`                |         |      |
| `configDir`               | Directorio de archivos de configuración compilados. | `string` | `'.intlayer/config'`              |         |      |
| `cacheDir`                | Directorio de archivos de caché.                    | `string` | `'.intlayer/cache'`               |         |      |

---

### Configuración del Compilador (Compiler Configuration)

Ajustes que controlan el compilador de Intlayer, que extrae diccionarios directamente de sus componentes.

| Campo                 | Descripción                                                                                                                                                                                                                                                                                                            | Tipo                                                                                                            | Predeterminado | Ejemplo                                                                                                                                                  | Nota                                                                                                                                                                                                                                                                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`             | Indica si el compilador debe habilitarse para extraer diccionarios.                                                                                                                                                                                                                                                    | `boolean` &#124; <br/> `'build-only'`                                                                           | `true`         | `'build-only'`                                                                                                                                           | `'build-only'` se salta el compilador durante el desarrollo para acelerar las compilaciones; solo se ejecuta en comandos de build.                                                                                                                                                                                                     |
| `dictionaryKeyPrefix` | Prefijo para las claves de diccionarios extraídas.                                                                                                                                                                                                                                                                     | `string`                                                                                                        | `''`           | `'mi-prefijo-'`                                                                                                                                          | Se añade a la clave generada (basada en el nombre del archivo) para evitar conflictos.                                                                                                                                                                                                                                                 |
| `saveComponents`      | Indica si los componentes deben guardarse después de ser transformados.                                                                                                                                                                                                                                                | `boolean`                                                                                                       | `false`        |                                                                                                                                                          | • Si es `true`, el compilador reescribirá el archivo del componente en el disco. La transformación será permanente y el compilador podrá ser eliminado.<br/>• Si es `false`, el compilador inyectará la llamada a la función `useIntlayer()` en el código solo en la salida del build, y mantendrá intacta la base de código original. |
| `output`              | Define la ruta de archivos de salida. Reemplaza `outputDir`. Soporta variables de plantilla: `{{fileName}}`, <br/> `{{key}}`, <br/> `{{locale}}`, <br/> `{{extension}}`, <br/> `{{componentFileName}}`, <br/> `{{componentExtension}}`, <br/> `{{format}}`, <br/> `{{componentFormat}}`, <br/> `{{componentDirPath}}`. | `boolean` &#124; <br/> `FilePathPattern` &#124; <br/> `Partial<Record<Locale, boolean &#124; FilePathPattern>>` | `undefined`    | `'./{{fileName}}{{extension}}'` <br/> `'/locales/{{locale}}/{{key}}.json'` <br/> `{ en: ({ key }) => './locales/en/${key}.json', fr: '...', es: false }` | • Las rutas `./` se resuelven respecto al directorio del componente.<br/>• Las rutas `/` respecto a la raíz.<br/>• `{{locale}}` dispara la generación separada por localidad.<br/>• Soporta notación de objeto por localidad.                                                                                                          |
| `noMetadata`          | Si es `true`, el compilador omite los metadatos del diccionario (clave, envoltorio de contenido) de la salida.                                                                                                                                                                                                         | `boolean`                                                                                                       | `false`        | `false` → `{"key":"mi-clave","content":{"key":"valor"}}` <br/> `true` → `{"key":"valor"}`                                                                | • Útil para salidas JSON i18next o ICU MessageFormat.<br/>• Funciona bien con el plugin `loadJSON`.                                                                                                                                                                                                                                    |
| `dictionaryKeyPrefix` | Prefijo de clave de diccionario                                                                                                                                                                                                                                                                                        | `string`                                                                                                        | `''`           |                                                                                                                                                          | Agregue un prefijo opcional para las llaves de los diccionarios extraídos                                                                                                                                                                                                                                                              |

---

### Esquemas Personalizados (Custom Schemas)

| Campo     | Descripción                                                                       | Tipo                        |
| --------- | --------------------------------------------------------------------------------- | --------------------------- |
| `schemas` | Permet de definir des schémas Zod pour valider la structure de vos dictionnaires. | `Record<string, ZodSchema>` |

---

### Plugins

| Campo     | Descripción                           | Tipo               |
| --------- | ------------------------------------- | ------------------ |
| `plugins` | Liste des plugins Intlayer à activer. | `IntlayerPlugin[]` |
