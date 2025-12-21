---
createdAt: 2024-08-13
updatedAt: 2025-09-16
title: Configuración
description: Aprende cómo configurar Intlayer para tu aplicación. Entiende las diversas configuraciones y opciones disponibles para personalizar Intlayer según tus necesidades.
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
  - version: 7.5.0
    date: 2025-12-17
    changes: Añadir opción `buildMode`
  - version: 6.0.0
    date: 2025-09-16
    changes: Añadido modo de importación `live`
  - version: 6.0.0
    date: 2025-09-04
    changes: Reemplazar el campo `hotReload` por `liveSync` y agregar los campos `liveSyncPort` y `liveSyncURL`
  - version: 5.6.1
    date: 2025-07-25
    changes: Reemplazar `activateDynamicImport` por la opción `importMode`
  - version: 5.6.0
    date: 2025-07-13
    changes: Cambiar el valor predeterminado de contentDir de `['src']` a `['.']`
  - version: 5.5.11
    date: 2025-06-29
    changes: Agregar comandos `docs`
---

# Documentación de Configuración de Intlayer

## Visión General

Los archivos de configuración de Intlayer permiten la personalización de varios aspectos del plugin, como la internacionalización, middleware y manejo de contenido. Este documento proporciona una descripción detallada de cada propiedad en la configuración.

---

## Tabla de Contenidos

<TOC/>

---

## Soporte de Archivos de Configuración

Intlayer acepta formatos de archivo de configuración JSON, JS, MJS y TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Archivo de configuración de ejemplo

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH], // locales soportados
  },
  content: {
    autoFill: "./{{fileName}}.content.json", // archivo de contenido para autocompletar
    contentDir: ["src", "../ui-library"], // directorios de contenido
  },
  middleware: {
    noPrefix: false, // si se debe usar prefijo en middleware
  },
  editor: {
    applicationURL: "https://example.com", // URL de la aplicación para el editor
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY, // clave API para AI
    applicationContext: "This is a test application", // contexto de la aplicación para AI
  },
  build: {
    importMode: "dynamic", // modo de importación para build
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH], // locales soportados
  },
  content: {
    contentDir: ["src", "../ui-library"], // directorios de contenido
  },
  middleware: {
    noPrefix: false, // si se debe usar prefijo en middleware
  },
  editor: {
    applicationURL: "https://example.com", // URL de la aplicación para el editor
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY, // clave API para AI
    applicationContext: "Esta es una aplicación de prueba", // contexto de la aplicación para AI
  },
  build: {
    importMode: "dynamic", // modo de importación para la construcción
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"], // locales soportados
  },
  "content": {
    "contentDir": ["src", "../ui-library"], // directorios de contenido
  },
  "middleware": {
    "noPrefix": false, // si se debe usar prefijo en middleware
  },
  "editor": {
    "applicationURL": "https://example.com", // URL de la aplicación para el editor
  },
  "ai": {
    "apiKey": "XXXX",
    "applicationContext": "Esta es una aplicación de prueba",
  },
  "build": {
    "importMode": "dynamic",
  },
}
```

---

## Referencia de Configuración

Las siguientes secciones describen las diversas configuraciones disponibles para Intlayer.

---

### Configuración de Internacionalización

Define configuraciones relacionadas con la internacionalización, incluyendo los locales disponibles y el local predeterminado para la aplicación.

#### Propiedades

- **locales**:
  - _Tipo_: `string[]`
  - _Por defecto_: `['en']`
  - _Descripción_: La lista de locales soportados en la aplicación.
  - _Ejemplo_: `['en', 'fr', 'es']`

- **requiredLocales**:
  - _Tipo_: `string[]`
  - _Por defecto_: `[]`
  - _Descripción_: La lista de locales requeridos en la aplicación.
  - _Ejemplo_: `[]`
  - _Nota_: Si está vacío, todos los locales son obligatorios en modo `strict`.
  - _Nota_: Asegúrese de que los locales requeridos también estén definidos en el campo `locales`.
- **strictMode**:
  - _Tipo_: `string`
  - _Por defecto_: `inclusive`
  - _Descripción_: Garantiza implementaciones sólidas de contenido internacionalizado usando typescript.
  - _Nota_: Si se establece en "strict", la función de traducción `t` requerirá que cada uno de los locales declarados esté definido. Si falta un locale, o si un locale no está declarado en su configuración, lanzará un error.
  - _Nota_: Si se establece en "inclusive", la función de traducción `t` requerirá que cada uno de los locales declarados esté definido. Si falta un locale, lanzará una advertencia. Pero aceptará si un locale no está declarado en su configuración, pero existe.
  - _Nota_: Si se establece en "loose", la función de traducción `t` aceptará cualquier locale existente.

- **defaultLocale**:
  - _Tipo_: `string`
  - _Por defecto_: `'en'`
  - _Descripción_: El locale predeterminado que se usa como respaldo si no se encuentra el locale solicitado.
  - _Ejemplo_: `'en'`
  - _Nota_: Esto se usa para determinar el locale cuando no se especifica ninguno en la URL, cookie o encabezado.

---

### Configuración del Editor

Define configuraciones relacionadas con el editor integrado, incluyendo el puerto del servidor y el estado activo.

#### Propiedades

- **applicationURL**:
  - _Tipo_: `string`
  - _Por defecto_: `http://localhost:3000`
  - _Descripción_: La URL de la aplicación. Se usa para restringir el origen del editor por razones de seguridad.
  - _Ejemplo_:
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Nota_: La URL de la aplicación. Se usa para restringir el origen del editor por razones de seguridad. Si se establece en `'*'`, el editor es accesible desde cualquier origen.

- **port**:
  - _Tipo_: `number`
  - _Por defecto_: `8000`
  - _Descripción_: El puerto utilizado por el servidor del editor visual.

- **editorURL**:
  - _Tipo_: `string`
  - _Por defecto_: `'http://localhost:8000'`
  - _Descripción_: La URL del servidor del editor. Se usa para restringir el origen del editor por razones de seguridad.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Nota_: La URL del servidor del editor a la que se accede desde la aplicación. Se usa para restringir los orígenes que pueden interactuar con la aplicación por razones de seguridad. Si se establece en `'*'`, el editor es accesible desde cualquier origen. Debe configurarse si se cambia el puerto o si el editor está alojado en un dominio diferente.

- **cmsURL**:
  - _Tipo_: `string`
  - _Por defecto_: `'https://intlayer.org'`
  - _Descripción_: La URL del CMS de Intlayer.
  - _Ejemplo_: `'https://intlayer.org'`
  - _Nota_: La URL del CMS de Intlayer.

- **backendURL**:
  - _Tipo_: `string`
  - _Por defecto_: `https://back.intlayer.org`
  - _Descripción_: La URL del servidor backend.
  - _Ejemplo_: `http://localhost:4000`

- **enabled**:
  - _Tipo_: `boolean`
  - _Por defecto_: `true`
  - _Descripción_: Indica si la aplicación interactúa con el editor visual.
  - _Ejemplo_: `process.env.NODE_ENV !== 'production'`
  - _Nota_: Si es verdadero, el editor podrá interactuar con la aplicación. Si es falso, el editor no podrá interactuar con la aplicación. En cualquier caso, el editor solo puede ser habilitado por el editor visual. Deshabilitar el editor para entornos específicos es una forma de reforzar la seguridad.

- **clientId**:
  - _Tipo_: `string` | `undefined`
  - _Por defecto_: `undefined`
  - _Descripción_: clientId y clientSecret permiten que los paquetes de intlayer se autentiquen con el backend utilizando la autenticación oAuth2. Un token de acceso se usa para autenticar al usuario relacionado con el proyecto. Para obtener un token de acceso, visite https://intlayer.org/dashboard/project y cree una cuenta.
  - _Ejemplo_: `true`
  - _Nota_: Importante: El clientId y clientSecret deben mantenerse en secreto y no compartirse públicamente. Asegúrese de guardarlos en un lugar seguro, como variables de entorno.

- **clientSecret**:
  - _Tipo_: `string` | `undefined`
  - _Por defecto_: `undefined`
  - _Descripción_: clientId y clientSecret permiten que los paquetes de intlayer se autentiquen con el backend utilizando la autenticación oAuth2. Se utiliza un token de acceso para autenticar al usuario relacionado con el proyecto. Para obtener un token de acceso, vaya a https://intlayer.org/dashboard/project y cree una cuenta.
  - _Ejemplo_: `true`
  - _Nota_: Importante: El clientId y clientSecret deben mantenerse en secreto y no compartirse públicamente. Por favor, asegúrese de mantenerlos en un lugar seguro, como variables de entorno.

- **dictionaryPriorityStrategy**:
  - _Tipo_: `string`
  - _Por defecto_: `'local_first'`
  - _Descripción_: La estrategia para priorizar los diccionarios en caso de que estén presentes tanto diccionarios locales como remotos. Si se establece en `'distant_first'`, la aplicación priorizará los diccionarios remotos sobre los locales. Si se establece en `'local_first'`, la aplicación priorizará los diccionarios locales sobre los remotos.
  - _Ejemplo_: `'distant_first'`

- **liveSync**:
  - _Tipo_: `boolean`
  - _Por defecto_: `false`
  - _Descripción_: Indica si el servidor de la aplicación debe recargar en caliente el contenido de la aplicación cuando se detecta un cambio en el CMS / Editor Visual / Backend.
  - _Ejemplo_: `true`
  - _Nota_: Por ejemplo, cuando se añade o actualiza un nuevo diccionario, la aplicación actualizará el contenido para mostrarlo en la página.
  - _Nota_: La sincronización en vivo necesita externalizar el contenido de la aplicación a otro servidor. Esto significa que puede afectar ligeramente el rendimiento de la aplicación. Para limitar esto, recomendamos alojar la aplicación y el servidor de sincronización en vivo en la misma máquina. Además, la combinación de sincronización en vivo y `optimize` puede generar un número considerable de solicitudes al servidor de sincronización en vivo. Dependiendo de su infraestructura, recomendamos probar ambas opciones y su combinación.

- **liveSyncPort**:
  - _Tipo_: `number`
  - _Por defecto_: `4000`
  - _Descripción_: El puerto del servidor de sincronización en vivo.
  - _Ejemplo_: `4000`
  - _Nota_: El puerto del servidor de sincronización en vivo.

- **liveSyncURL**:
  - _Tipo_: `string`
  - _Por defecto_: `'http://localhost:{liveSyncPort}'`
  - _Descripción_: La URL del servidor de sincronización en vivo.
  - _Ejemplo_: `'https://example.com'`
  - _Nota_: Apunta a localhost por defecto, pero puede cambiarse a cualquier URL en el caso de un servidor de sincronización en vivo remoto.

### Configuración del Middleware

Configuraciones que controlan el comportamiento del middleware, incluyendo cómo la aplicación maneja cookies, encabezados y prefijos de URL para la gestión de locales.

#### Propiedades

- **headerName**:
  - _Tipo_: `string`
  - _Por defecto_: `'x-intlayer-locale'`
  - _Descripción_: El nombre del encabezado HTTP usado para determinar el locale.
  - _Ejemplo_: `'x-custom-locale'`
  - _Nota_: Esto es útil para la determinación del locale basada en API.

- **cookieName**:
  - _Tipo_: `string`
  - _Por defecto_: `'intlayer-locale'`
  - _Descripción_: El nombre de la cookie usada para almacenar el locale.
  - _Ejemplo_: `'custom-locale'`
  - _Nota_: Se utiliza para mantener la localización a través de las sesiones.

- **prefixDefault**:
  - _Tipo_: `boolean`
  - _Por defecto_: `false`
  - _Descripción_: Indica si se debe incluir la localización por defecto en la URL.
  - _Ejemplo_: `true`
  - _Nota_:
    - Si es `true` y `defaultLocale = 'en'`: ruta = `/en/dashboard` o `/fr/dashboard`
    - Si es `false` y `defaultLocale = 'en'`: ruta = `/dashboard` o `/fr/dashboard`

- **basePath**:
  - _Tipo_: `string`
  - _Por defecto_: `''`
  - _Descripción_: La ruta base para las URLs de la aplicación.
  - _Ejemplo_: `'/my-app'`
  - _Nota_:
    - Si la aplicación está alojada en `https://example.com/my-app`
    - La ruta base es `'/my-app'`
    - La URL será `https://example.com/my-app/en`
    - Si no se establece la ruta base, la URL será `https://example.com/en`

- **serverSetCookie**:
  - _Tipo_: `string`
  - _Por defecto_: `'always'`
  - _Descripción_: Regla para establecer la cookie de localización en el servidor.
  - _Opciones_: `'always'`, `'never'`
  - _Ejemplo_: `'never'`
  - _Nota_: Controla si la cookie de localización se establece en cada solicitud o nunca.

- **noPrefix**:
  - _Tipo_: `boolean`
  - _Por defecto_: `false`
  - _Descripción_: Indica si se omite el prefijo de localización en las URLs.
  - _Ejemplo_: `true`
  - _Nota_:
    - Si es `true`: No hay prefijo en la URL
    - Si es `false`: Hay prefijo en la URL
    - Ejemplo con `basePath = '/my-app'`:
      - Si `noPrefix = false`: La URL será `https://example.com/my-app/en`
      - Si `noPrefix = true`: La URL será `https://example.com`

---

### Configuración de Contenido

Configuraciones relacionadas con el manejo de contenido dentro de la aplicación, incluyendo nombres de directorios, extensiones de archivos y configuraciones derivadas.

#### Propiedades

- **autoFill**:
  - _Tipo_: `boolean | string | { [key in Locales]?: string }`
  - _Por defecto_: `undefined`
  - _Descripción_: Indica cómo debe completarse automáticamente el contenido usando IA. Puede declararse globalmente en el archivo `intlayer.config.ts`.
  - _Ejemplo_: true
  - _Ejemplo_: `'./{{fileName}}.content.json'`
  - _Ejemplo_: `{ fr: './{{fileName}}.fr.content.json', es: './{{fileName}}.es.content.json' }`
  - _Nota_: La configuración de auto completado. Puede ser:
    - booleano: Habilitar auto completado para todas las locales
    - cadena: Ruta a un solo archivo o plantilla con variables
    - objeto: Rutas de archivo por locale

- **watch**:
  - _Tipo_: `boolean`
  - _Por defecto_: `process.env.NODE_ENV === 'development'`
  - _Descripción_: Indica si Intlayer debe vigilar cambios en los archivos de declaración de contenido en la aplicación para reconstruir los diccionarios relacionados.

- **fileExtensions**:
  - _Tipo_: `string[]`
  - _Por defecto_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Descripción_: Extensiones de archivo que se buscan al construir los diccionarios.
  - _Ejemplo_: `['.data.ts', '.data.js', '.data.json']`
  - _Nota_: Personalizar las extensiones de archivo puede ayudar a evitar conflictos.

- **baseDir**:
  - _Tipo_: `string`
  - _Por defecto_: `process.cwd()`
  - _Descripción_: El directorio base para el proyecto.
  - _Ejemplo_: `'/ruta/al/proyecto'`
  - _Nota_: Esto se usa para resolver todos los directorios relacionados con Intlayer.

- **dictionaryOutput**:
  - _Tipo_: `string[]`
  - _Por defecto_: `['intlayer']`
  - _Descripción_: El tipo de salida del diccionario a usar, por ejemplo, `'intlayer'` o `'i18next'`.

- **contentDir**:
  - _Tipo_: `string[]`
  - _Por defecto_: `['.']`
  - _Ejemplo_: `['src', '../../ui-library', require.resolve("@my-package/content")]`
  - _Descripción_: La ruta del directorio donde se almacena el contenido.

- **dictionariesDir**:
  - _Tipo_: `string`
  - _Por defecto_: `'.intlayer/dictionaries'`
  - _Descripción_: La ruta del directorio para almacenar resultados intermedios o de salida.

- **moduleAugmentationDir**:
  - _Tipo_: `string`
  - _Por defecto_: `'.intlayer/types'`
  - _Descripción_: Directorio para la ampliación de módulos, permitiendo mejores sugerencias en el IDE y verificación de tipos.
  - _Ejemplo_: `'intlayer-types'`
  - _Nota_: Asegúrate de incluir esto en `tsconfig.json`.

- **unmergedDictionariesDir**:
  - _Tipo_: `string`
  - _Por defecto_: `'.intlayer/unmerged_dictionary'`
  - _Descripción_: El directorio para almacenar diccionarios no fusionados.
  - _Ejemplo_: `'translations'`

- **dictionariesDir**:
  - _Tipo_: `string`
  - _Por defecto_: `'.intlayer/dictionary'`
  - _Descripción_: El directorio para almacenar los diccionarios de localización.
  - _Ejemplo_: `'translations'`

- **i18nextResourcesDir**:
  - _Tipo_: `string`
  - _Por defecto_: `'i18next_dictionary'`
  - _Descripción_: El directorio para almacenar los diccionarios i18n.
  - _Ejemplo_: `'translations'`
  - _Nota_: Asegúrese de que este directorio esté configurado para el tipo de salida i18next.

- **typesDir**:
  - _Tipo_: `string`
  - _Por defecto_: `'types'`
  - _Descripción_: El directorio para almacenar los tipos de diccionario.
  - _Ejemplo_: `'intlayer-types'`

- **mainDir**:
  - _Tipo_: `string`
  - _Por defecto_: `'main'`
  - _Descripción_: El directorio donde se almacenan los archivos principales de la aplicación.
  - _Ejemplo_: `'intlayer-main'`

- **excludedPath**:
  - _Tipo_: `string[]`
  - _Por defecto_: `['node_modules']`
  - _Descripción_: Directorios excluidos de la búsqueda de contenido.
  - _Nota_: Esta configuración aún no se utiliza, pero está planificada para una implementación futura.

### Configuración del Logger

Configuraciones que controlan el logger, incluyendo el prefijo a usar.

#### Propiedades

- **mode**:
  - _Tipo_: `string`
  - _Por defecto_: `default`
  - _Descripción_: Indica el modo del logger.
  - _Opciones_: `default`, `verbose`, `disabled`
  - _Ejemplo_: `default`
  - _Nota_: El modo del logger. El modo verbose registrará más información, pero puede usarse para propósitos de depuración. El modo disabled desactivará el logger.

- **prefix**:
  - _Tipo_: `string`
  - _Por defecto_: `'[intlayer] '`
  - _Descripción_: El prefijo del logger.
  - _Ejemplo_: `'[my custom prefix] '`
  - _Nota_: El prefijo del registrador.

### Configuración de IA

Configuraciones que controlan las funciones de IA de Intlayer, incluyendo el proveedor, modelo y clave API.

Esta configuración es opcional si estás registrado en el [Panel de Control de Intlayer](https://intlayer.org/dashboard/project) usando una clave de acceso. Intlayer gestionará automáticamente la solución de IA más eficiente y rentable para tus necesidades. Usar las opciones predeterminadas asegura un mejor mantenimiento a largo plazo, ya que Intlayer se actualiza continuamente para usar los modelos más relevantes.

Si prefieres usar tu propia clave API o un modelo específico, puedes definir tu configuración personalizada de IA.
Esta configuración de IA se utilizará globalmente en todo su entorno Intlayer. Los comandos CLI usarán estas configuraciones como valores predeterminados para los comandos (por ejemplo, `fill`), así como el SDK, el Editor Visual y el CMS. Puede anular estos valores predeterminados para casos de uso específicos utilizando parámetros de comando.

Intlayer admite múltiples proveedores de IA para una mayor flexibilidad y elección. Los proveedores actualmente soportados son:

- **OpenAI** (predeterminado)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**

#### Propiedades

- **provider**:
  - _Tipo_: `string`
  - _Predeterminado_: `'openai'`
  - _Descripción_: El proveedor a utilizar para las funciones de IA de Intlayer.
  - _Opciones_: `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`, `'ollama'`
  - _Ejemplo_: `'anthropic'`
  - _Nota_: Diferentes proveedores pueden requerir diferentes claves API y tener distintos modelos de precios.

- **model**:
  - _Tipo_: `string`
  - _Por defecto_: Ninguno
  - _Descripción_: El modelo a utilizar para las funciones de IA de Intlayer.
  - _Ejemplo_: `'gpt-4o-2024-11-20'`
  - _Nota_: El modelo específico a utilizar varía según el proveedor.

- **temperature**:
  - _Tipo_: `number`
  - _Por defecto_: Ninguno
  - _Descripción_: La temperatura controla la aleatoriedad de las respuestas de la IA.
  - _Ejemplo_: `0.1`
  - _Nota_: Una temperatura más alta hará que la IA sea más creativa y menos predecible.

- **apiKey**:
  - _Tipo_: `string`
  - _Por defecto_: Ninguno
  - _Descripción_: Su clave API para el proveedor seleccionado.
  - _Ejemplo_: `process.env.OPENAI_API_KEY`
  - _Nota_: Importante: Las claves API deben mantenerse en secreto y no compartirse públicamente. Por favor, asegúrese de guardarlas en un lugar seguro, como variables de entorno.

- **applicationContext**:
  - _Tipo_: `string`
  - _Por defecto_: Ninguno
  - _Descripción_: Proporciona contexto adicional sobre su aplicación al modelo de IA, ayudándole a generar traducciones más precisas y contextualmente apropiadas. Esto puede incluir información sobre el dominio de su aplicación, público objetivo, tono o terminología específica.

- **baseURL**:
  - _Tipo_: `string`
  - _Por defecto_: Ninguno
  - _Descripción_: La URL base para la API de IA.
  - _Ejemplo_: `'https://api.openai.com/v1'`
  - _Nota_: Puede usarse para apuntar a un endpoint de API de IA local o personalizado.

### Configuración de compilación

Configuraciones que controlan cómo Intlayer optimiza y construye la internacionalización de su aplicación.

Las opciones de compilación se aplican a los plugins `@intlayer/babel` y `@intlayer/swc`.

> En modo de desarrollo, Intlayer utiliza importaciones estáticas para los diccionarios para simplificar la experiencia de desarrollo.

> Cuando está optimizado, Intlayer reemplazará las llamadas a diccionarios para optimizar el particionado, de modo que el paquete final solo importe los diccionarios que realmente se usan.

#### Propiedades

- **mode**:
  - _Tipo_: `'auto' | 'manual'`
  - _Por defecto_: `'auto'`
  - _Descripción_: Controla el modo de la compilación.
  - _Ejemplo_: `'manual'`
  - _Nota_: Si 'auto', la compilación se habilitará automáticamente cuando se construya la aplicación.
  - _Nota_: Si 'manual', la compilación se establecerá solo cuando se ejecute el comando de compilación.
  - _Nota_: Puede usarse para deshabilitar la compilación de diccionarios, por ejemplo cuando se debe evitar la ejecución en un entorno Node.js.

- **optimize**:
  - _Tipo_: `boolean`
  - _Por defecto_: `process.env.NODE_ENV === 'production'`
  - _Descripción_: Controla si la compilación debe ser optimizada.
  - _Ejemplo_: `true`
  - _Nota_: Cuando está habilitado, Intlayer reemplazará todas las llamadas a diccionarios para optimizar el particionado. De esta forma, el paquete final solo importará los diccionarios que se usan. Todas las importaciones permanecerán como importaciones estáticas para evitar el procesamiento asíncrono al cargar los diccionarios.
  - _Nota_: Intlayer reemplazará todas las llamadas a `useIntlayer` con el modo definido por la opción `importMode` y `getIntlayer` con `getDictionary`.
  - _Nota_: Esta opción depende de los plugins `@intlayer/babel` y `@intlayer/swc`.
  - _Nota_: Asegúrese de que todas las claves estén declaradas estáticamente en las llamadas a `useIntlayer`. Por ejemplo, `useIntlayer('navbar')`.

- **importMode**:
  - _Tipo_: `'static' | 'dynamic' | 'live'`
  - _Por defecto_: `'static'`
  - _Descripción_: Controla cómo se importan los diccionarios.
  - _Ejemplo_: `'dynamic'`
  - _Nota_: Modos disponibles:
    - "static": Los diccionarios se importan de forma estática. Reemplaza `useIntlayer` con `useDictionary`.
    - "dynamic": Los diccionarios se importan dinámicamente usando Suspense. Reemplaza `useIntlayer` con `useDictionaryDynamic`.
    - "live": Los diccionarios se obtienen dinámicamente usando la API de sincronización en vivo. Reemplaza `useIntlayer` con `useDictionaryFetch`.
  - _Nota_: Las importaciones dinámicas dependen de Suspense y pueden afectar ligeramente el rendimiento del renderizado.
  - _Nota_: Si está deshabilitado, todos los locales se cargarán a la vez, incluso si no se usan.
  - _Nota_: Esta opción depende de los plugins `@intlayer/babel` y `@intlayer/swc`.
  - _Nota_: Asegúrese de que todas las claves estén declaradas estáticamente en las llamadas a `useIntlayer`. Por ejemplo, `useIntlayer('navbar')`.
  - _Nota_: Esta opción será ignorada si `optimize` está deshabilitado.
  - _Nota_: Si se establece en "live", solo los diccionarios que incluyen contenido remoto y están marcados con la bandera "live" serán transformados en modo en vivo. Los demás se importarán dinámicamente en modo "dynamic" para optimizar el número de consultas fetch y el rendimiento de carga.
  - _Nota_: El modo en vivo utilizará la API de sincronización en vivo para obtener los diccionarios. Si la llamada a la API falla, los diccionarios se importarán dinámicamente en modo "dynamic".
  - _Nota_: Esta opción no afectará a las funciones `getIntlayer`, `getDictionary`, `useDictionary`, `useDictionaryAsync` y `useDictionaryDynamic`.

- **traversePattern**:
  - _Tipo_: `string[]`
  - _Por defecto_: `['**\/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx}', '!**\/node_modules/**']`
  - _Descripción_: Patrones que definen qué archivos deben ser recorridos durante la optimización.
    - _Ejemplo_: `['src/**\/*.{ts,tsx}', '../ui-library/**\/*.{ts,tsx}', '!**/node_modules/**']`
  - _Nota_: Utilice esto para limitar la optimización a archivos de código relevantes y mejorar el rendimiento de la compilación.
  - _Nota_: Esta opción será ignorada si `optimize` está deshabilitado.
  - _Nota_: Use patrón glob.
