---
docName: configuration
url: https://intlayer.org/doc/concept/configuration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md
createdAt: 2024-08-13
updatedAt: 2025-06-29
title: Configuración
description: Aprenda cómo configurar Intlayer para su aplicación. Comprenda los diferentes ajustes y opciones disponibles para personalizar Intlayer según sus necesidades.
keywords:
  - Configuración
  - Ajustes
  - Personalización
  - Intlayer
  - Opciones
---

# Documentación de Configuración de Intlayer

## Descripción General

Los archivos de configuración de Intlayer permiten la personalización de varios aspectos del plugin, como la internacionalización, middleware y manejo de contenido. Este documento proporciona una descripción detallada de cada propiedad en la configuración.

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

## Ejemplo de archivo de configuración

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  middleware: {
    noPrefix: false,
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "This is a test application",
  },
  build: {
    activateDynamicImport: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    contentDir: ["src", "../ui-library"],
  },
  middleware: {
    noPrefix: false,
  },
  editor: {
    applicationURL: "https://example.com",
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "This is a test application",
  },
  build: {
    activateDynamicImport: true,
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
{
  "internationalization": {
    "locales": ["en"],
  },
  "content": {
    "typesDir": "content/types",
  },
  "middleware": {
    "noPrefix": false,
  },
}
```

---

## Referencia de Configuración

Las siguientes secciones describen las diversas configuraciones disponibles para Intlayer.

---

### Configuración de Internacionalización

Define configuraciones relacionadas con la internacionalización, incluyendo los idiomas disponibles y el idioma predeterminado para la aplicación.

#### Propiedades

- **locales**:

  - _Tipo_: `string[]`
  - _Por defecto_: `['en']`
  - _Descripción_: La lista de idiomas soportados en la aplicación.
  - _Ejemplo_: `['en', 'fr', 'es']`

- **requiredLocales**:

  - _Tipo_: `string[]`
  - _Por defecto_: `[]`
  - _Descripción_: La lista de idiomas requeridos en la aplicación.
  - _Ejemplo_: `[]`
  - _Nota_: Si está vacío, todos los idiomas son requeridos en modo `estricto`.
  - _Nota_: Asegúrese de que los idiomas requeridos también estén definidos en el campo `locales`.

- **strictMode**:

  - _Tipo_: `string`
  - _Por defecto_: `inclusive`
  - _Descripción_: Asegura implementaciones sólidas de contenido internacionalizado usando TypeScript.
  - _Nota_: Si se establece en "strict", la función de traducción `t` requerirá que cada idioma declarado esté definido. Si falta un idioma o si un idioma no está declarado en su configuración, lanzará un error.
  - _Nota_: Si se establece en "inclusive", la función de traducción `t` requerirá que cada idioma declarado esté definido. Si falta un idioma, mostrará una advertencia. Pero aceptará si un idioma no está declarado en su configuración, pero existe.
  - _Nota_: Si se establece en "loose", la función de traducción `t` aceptará cualquier idioma existente.

- **defaultLocale**:

  - _Tipo_: `string`
  - _Por defecto_: `'en'`
  - _Descripción_: El idioma predeterminado utilizado como respaldo si no se encuentra el idioma solicitado.
  - _Ejemplo_: `'en'`
  - _Nota_: Esto se utiliza para determinar el idioma cuando no se especifica ninguno en la URL, cookie o encabezado.

---

### Configuración del Editor

Define configuraciones relacionadas con el editor integrado, incluyendo el puerto del servidor y el estado activo.

#### Propiedades

- **applicationURL**:

  - _Tipo_: `string`
  - _Por defecto_: `http://localhost:3000`
  - _Descripción_: La URL de la aplicación. Se utiliza para restringir el origen del editor por razones de seguridad.
  - _Ejemplo_:
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Nota_: La URL de la aplicación. Se utiliza para restringir el origen del editor por razones de seguridad. Si se establece en `'*'`, el editor es accesible desde cualquier origen.

- **port**:

  - _Tipo_: `number`
  - _Por defecto_: `8000`
  - _Descripción_: El puerto utilizado por el servidor del editor visual.

- **editorURL**:

  - _Tipo_: `string`
  - _Por defecto_: `'http://localhost:8000'`
  - _Descripción_: La URL del servidor del editor. Se utiliza para restringir el origen del editor por razones de seguridad.
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Nota_: La URL del servidor del editor para acceder desde la aplicación. Se utiliza para restringir los orígenes que pueden interactuar con la aplicación por razones de seguridad. Si se establece en `'*'`, el editor es accesible desde cualquier origen. Debe configurarse si el puerto cambia o si el editor está alojado en un dominio diferente.

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
  - _Descripción_: clientId y clientSecret permiten que los paquetes de Intlayer se autentiquen con el backend utilizando autenticación oAuth2. Se utiliza un token de acceso para autenticar al usuario relacionado con el proyecto. Para obtener un token de acceso, vaya a https://intlayer.org/dashboard/project y cree una cuenta.
  - _Ejemplo_: `true`
  - _Nota_: Importante: El clientId y clientSecret deben mantenerse en secreto y no compartirse públicamente. Asegúrese de mantenerlos en un lugar seguro, como variables de entorno.

- **clientSecret**:

  - _Tipo_: `string` | `undefined`
  - _Por defecto_: `undefined`
  - _Descripción_: clientId y clientSecret permiten que los paquetes de Intlayer se autentiquen con el backend utilizando autenticación oAuth2. Se utiliza un token de acceso para autenticar al usuario relacionado con el proyecto. Para obtener un token de acceso, vaya a https://intlayer.org/dashboard/project y cree una cuenta.
  - _Ejemplo_: `true`
  - _Nota_: Importante: El clientId y clientSecret deben mantenerse en secreto y no compartirse públicamente. Asegúrese de mantenerlos en un lugar seguro, como variables de entorno.

- **hotReload**:

  - _Tipo_: `boolean`
  - _Por defecto_: `false`
  - _Descripción_: Indica si la aplicación debe recargar automáticamente las configuraciones de idioma cuando se detecta un cambio.
  - _Ejemplo_: `true`
  - _Nota_: Por ejemplo, cuando se agrega o actualiza un nuevo diccionario, la aplicación actualizará el contenido para mostrar en la página.
  - _Nota_: Debido a que la recarga automática necesita una conexión continua al servidor, solo está disponible para clientes del plan `enterprise`.

- **dictionaryPriorityStrategy**:
  - _Tipo_: `string`
  - _Por defecto_: `'local_first'`
  - _Descripción_: La estrategia para priorizar diccionarios en caso de que existan diccionarios locales y remotos. Si se establece en `'distant_first'`, la aplicación priorizará los diccionarios remotos sobre los locales. Si se establece en `'local_first'`, la aplicación priorizará los diccionarios locales sobre los remotos.
  - _Ejemplo_: `'distant_first'`

### Configuración de Middleware

Configuraciones que controlan el comportamiento del middleware, incluyendo cómo la aplicación maneja cookies, encabezados y prefijos de URL para la gestión de idiomas.

#### Propiedades

- **headerName**:

  - _Tipo_: `string`
  - _Por defecto_: `'x-intlayer-locale'`
  - _Descripción_: El nombre del encabezado HTTP utilizado para determinar el idioma.
  - _Ejemplo_: `'x-custom-locale'`
  - _Nota_: Esto es útil para la determinación de idioma basada en API.

  - _Tipo_: `string`
  - _Por defecto_: `'intlayer-locale'`
  - _Descripción_: El nombre de la cookie utilizada para almacenar la configuración regional.
  - _Ejemplo_: `'custom-locale'`
  - _Nota_: Se utiliza para mantener la configuración regional entre sesiones.

- **prefixDefault**:

  - _Tipo_: `boolean`
  - _Por defecto_: `true`
  - _Descripción_: Indica si se debe incluir la configuración regional predeterminada en la URL.
  - _Ejemplo_: `false`
  - _Nota_: Si es `false`, las URLs para la configuración regional predeterminada no tendrán un prefijo de configuración regional.

- **basePath**:

  - _Tipo_: `string`
  - _Por defecto_: `''`
  - _Descripción_: La ruta base para las URLs de la aplicación.
  - _Ejemplo_: `'/my-app'`
  - _Nota_: Esto afecta cómo se construyen las URLs para la aplicación.

- **serverSetCookie**:

  - _Tipo_: `string`
  - _Por defecto_: `'always'`
  - _Descripción_: Regla para establecer la cookie de configuración regional en el servidor.
  - _Opciones_: `'always'`, `'never'`
  - _Ejemplo_: `'never'`
  - _Nota_: Controla si la cookie de configuración regional se establece en cada solicitud o nunca.

- **noPrefix**:
  - _Tipo_: `boolean`
  - _Por defecto_: `false`
  - _Descripción_: Indica si se debe omitir el prefijo de configuración regional en las URLs.
  - _Ejemplo_: `true`
  - _Nota_: Si es `true`, las URLs no contendrán información de configuración regional.

### Configuración de Contenido

Configuraciones relacionadas con el manejo de contenido dentro de la aplicación, incluyendo nombres de directorios, extensiones de archivos y configuraciones derivadas.

#### Propiedades

- **watch**:

  - _Tipo_: `boolean`
  - _Por defecto_: `process.env.NODE_ENV === 'development'`
  - _Descripción_: Indica si Intlayer debe observar cambios en los archivos de declaración de contenido en la aplicación para reconstruir los diccionarios relacionados.

- **fileExtensions**:

  - _Tipo_: `string[]`
  - _Por defecto_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Descripción_: Extensiones de archivo a buscar al construir diccionarios.
  - _Ejemplo_: `['.data.ts', '.data.js', '.data.json']`
  - _Nota_: Personalizar las extensiones de archivo puede ayudar a evitar conflictos.

- **baseDir**:

  - _Tipo_: `string`
  - _Por defecto_: `process.cwd()`
  - _Descripción_: El directorio base para el proyecto.
  - _Ejemplo_: `'/path/to/project'`
  - _Nota_: Esto se utiliza para resolver todos los directorios relacionados con Intlayer.

- **dictionaryOutput**:

  - _Tipo_: `string[]`
  - _Por defecto_: `['intlayer']`
  - _Descripción_: El tipo de salida de diccionario a usar, por ejemplo, `'intlayer'` o `'i18next'`.

- **contentDir**:

  - _Tipo_: `string[]`
  - _Por defecto_: `['src']`
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
  - _Descripción_: El directorio para almacenar diccionarios de localización.
  - _Ejemplo_: `'translations'`

- **i18nextResourcesDir**:

  - _Tipo_: `string`
  - _Por defecto_: `'i18next_dictionary'`
  - _Descripción_: El directorio para almacenar diccionarios de i18n.
  - _Ejemplo_: `'translations'`
  - _Nota_: Asegúrate de que este directorio esté configurado para el tipo de salida i18next.

- **typesDir**:

  - _Tipo_: `string`
  - _Por defecto_: `'types'`
  - _Descripción_: El directorio para almacenar tipos de diccionario.
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
  - _Nota_: Esta configuración aún no se utiliza, pero está planeada para futuras implementaciones.

### Configuración del Logger

Configuraciones que controlan el logger, incluyendo el prefijo a usar.

#### Propiedades

- **mode**:

  - _Tipo_: `string`
  - _Por defecto_: `default`
  - _Descripción_: Indica el modo del logger.
  - _Opciones_: `default`, `verbose`, `disabled`
  - _Ejemplo_: `default`
  - _Nota_: El modo del logger. El modo verbose registrará más información, pero puede usarse con fines de depuración. El modo disabled desactivará el logger.

- **prefix**:

  - _Tipo_: `string`
  - _Por defecto_: `'[intlayer] '`
  - _Descripción_: El prefijo del logger.
  - _Ejemplo_: `'[my custom prefix] '`
  - _Nota_: El prefijo del logger.

### Configuración de AI

Configuraciones que controlan las características de AI de Intlayer, incluyendo el proveedor, modelo y clave API.

Esta configuración es opcional si estás registrado en el [Panel de Intlayer](https://intlayer.org/dashboard/project) usando una clave de acceso. Intlayer gestionará automáticamente la solución de AI más eficiente y rentable para tus necesidades. Usar las opciones predeterminadas asegura un mejor mantenimiento a largo plazo, ya que Intlayer se actualiza continuamente para usar los modelos más relevantes.

Si prefieres usar tu propia clave API o un modelo específico, puedes definir tu configuración personalizada de AI. Esta configuración de AI se usará globalmente en todo tu entorno Intlayer. Los comandos CLI usarán estas configuraciones como valores predeterminados para los comandos (por ejemplo, `fill`), así como el SDK, el Editor Visual y el CMS. Puedes sobrescribir estos valores predeterminados para casos específicos usando parámetros de comando.

Intlayer admite múltiples proveedores de AI para mayor flexibilidad y elección. Los proveedores actualmente soportados son:

- **OpenAI** (predeterminado)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**

#### Propiedades

- **provider**:

  - _Tipo_: `string`
  - _Por defecto_: `'openai'`
  - _Descripción_: El proveedor a usar para las características de AI de Intlayer.
  - _Opciones_: `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`
  - _Ejemplo_: `'anthropic'`
  - _Nota_: Diferentes proveedores pueden requerir diferentes claves API y tener diferentes modelos de precios.

- **model**:

  - _Tipo_: `string`
  - _Por defecto_: Ninguno
  - _Descripción_: El modelo a usar para las características de AI de Intlayer.
  - _Ejemplo_: `'gpt-4o-2024-11-20'`
  - _Nota_: El modelo específico a usar varía según el proveedor.

- **temperature**:

  - _Tipo_: `number`
  - _Por defecto_: Ninguno
  - _Descripción_: La temperatura controla la aleatoriedad de las respuestas de la AI.
  - _Ejemplo_: `0.1`
  - _Nota_: Una temperatura más alta hará que la AI sea más creativa y menos predecible.

- **apiKey**:

  - _Tipo_: `string`
  - _Por defecto_: Ninguno
  - _Descripción_: Tu clave API para el proveedor seleccionado.
  - _Ejemplo_: `process.env.OPENAI_API_KEY`
  - _Nota_: Importante: Las claves API deben mantenerse en secreto y no compartirse públicamente. Asegúrate de mantenerlas en un lugar seguro, como variables de entorno.

- **applicationContext**:

  - _Tipo_: `string`
  - _Por defecto_: Ninguno
  - _Descripción_: Proporciona contexto adicional sobre tu aplicación al modelo de AI, ayudándolo a generar traducciones más precisas y contextualmente apropiadas. Esto puede incluir información sobre el dominio de tu aplicación, audiencia objetivo, tono o terminología específica.

### Configuración de Compilación

Ajustes que controlan cómo Intlayer optimiza y compila la internacionalización de tu aplicación.

Las opciones de compilación se aplican a los plugins `@intlayer/babel` y `@intlayer/swc`.

> En modo desarrollo, Intlayer utiliza una importación estática centralizada para los diccionarios para simplificar la experiencia de desarrollo.

> Al optimizar la compilación, Intlayer reemplazará todas las llamadas de diccionarios para optimizar el chunking. De esta manera, el bundle final importará solo los diccionarios que se utilizan.

- **Nota**: `@intlayer/babel` está disponible por defecto en el paquete `vite-intlayer`, pero `@intlayer/swc` no está instalado por defecto en el paquete `next-intlayer` ya que los plugins SWC aún son experimentales en Next.js.

#### Propiedades

- **optimize**:

  - _Tipo_: `boolean`
  - _Valor por defecto_: `process.env.NODE_ENV === 'production'`
  - _Descripción_: Controla si la compilación debe ser optimizada.
  - _Ejemplo_: `true`
  - _Nota_: Permitirá importar solo los diccionarios que se utilizan en el bundle. Pero todas las importaciones permanecerán como importación estática para evitar el procesamiento asíncrono al cargar los diccionarios.
  - _Nota_: Cuando está habilitado, Intlayer optimizará el chunking del diccionario reemplazando todas las llamadas de `useIntlayer` con `useDictionary` y `getIntlayer` con `getDictionary`.
  - _Nota_: Asegúrate de que todas las claves estén declaradas estáticamente en las llamadas `useIntlayer`. por ejemplo: `useIntlayer('navbar')`.

- **activateDynamicImport**:

  - _Tipo_: `boolean`
  - _Valor por defecto_: `false`
  - _Descripción_: Controla si el contenido del diccionario debe importarse dinámicamente por idioma.
  - _Ejemplo_: `true`
  - _Nota_: Permitirá importar dinámicamente el contenido del diccionario solo para el idioma actual.
  - _Nota_: Las importaciones dinámicas dependen de React Suspense y pueden afectar ligeramente el rendimiento del renderizado. Pero si está deshabilitado, todos los idiomas se cargarán a la vez, incluso si no se utilizan.
  - _Nota_: Cuando está habilitado, Intlayer optimizará el chunking del diccionario reemplazando todas las llamadas de `useIntlayer` con `useDynamicDictionary`.
  - _Nota_: Esta opción será ignorada si `optimize` está deshabilitado.
  - _Nota_: Asegúrate de que todas las claves estén declaradas estáticamente en las llamadas `useIntlayer`. por ejemplo: `useIntlayer('navbar')`.

- **traversePattern**:
  - _Tipo_: `string[]`
  - _Valor por defecto_: `['**/*.{js,ts,mjs,cjs,jsx,tsx,mjx,cjx,vue,svelte,svte}', '!**/node_modules/**']`
  - _Descripción_: Patrones que definen qué archivos deben ser recorridos durante la optimización.
  - _Ejemplo_: `['src/**/*.{ts,tsx}', '../ui-library/**/*.{ts,tsx}', '!**/node_modules/**']`
  - _Nota_: Usa esto para limitar la optimización a archivos de código relevantes y mejorar el rendimiento de la compilación.
  - _Nota_: Esta opción será ignorada si `optimize` está deshabilitado.
  - _Nota_: Usa patrón glob.
