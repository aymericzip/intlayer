# Documentación de Configuración de Intlayer

## Resumen

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

## Archivo de configuración de ejemplo

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Configuración de ejemplo para Intlayer
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// Configuración de ejemplo para Intlayer
const config = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
  },
};

module.exports = config;
```

```json5 fileName=".intlayerrc" codeFormat="json"
// Configuración de ejemplo para Intlayer
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

Las siguientes secciones describen los diversos ajustes de configuración disponibles para Intlayer.

---

### Configuración de Internacionalización

Define los ajustes relacionados con la internacionalización, incluyendo los locales disponibles y el locale predeterminado para la aplicación.

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
  - _Nota_: Si está vacío, todos los locales son requeridos en modo `estricto`.
  - _Nota_: Asegúrese de que los locales requeridos también estén definidos en el campo `locales`.

- **strictMode**:

  - _Tipo_: `string`
  - _Por defecto_: `inclusive`
  - _Descripción_: Asegura implementaciones fuertes de contenido internacionalizado usando TypeScript.
  - _Nota_: Si se establece en "estricto", la función de traducción `t` requerirá que cada locale declarado esté definido. Si falta un locale, o si un locale no está declarado en su configuración, lanzará un error.
  - _Nota_: Si se establece en "inclusivo", la función de traducción `t` requerirá que cada locale declarado esté definido. Si falta un locale, lanzará una advertencia. Pero aceptará si un locale no está declarado en su configuración, pero existe.
  - _Nota_: Si se establece en "flexible", la función de traducción `t` aceptará cualquier locale existente.

- **defaultLocale**:
  - _Tipo_: `string`
  - _Por defecto_: `'en'`
  - _Descripción_: El locale predeterminado usado como respaldo si el locale solicitado no se encuentra.
  - _Ejemplo_: `'en'`
  - _Nota_: Esto se utiliza para determinar el locale cuando no se especifica ninguno en la URL, cookie o encabezado.

---

### Configuración del Editor

Define los ajustes relacionados con el editor integrado, incluyendo el puerto del servidor y el estado activo.

#### Propiedades

- **applicationURL**:

  - _Tipo_: `string`
  - _Por defecto_: `'*'`
  - _Descripción_: La URL de la aplicación. Se utiliza para restringir el origen del editor por razones de seguridad.
  - _Ejemplo_:
    - `'*'`
    - `'http://localhost:3000'`
    - `'https://example.com'`
    - `process.env.INTLAYER_EDITOR_URL`
  - _Nota_: Si se establece en `'*'`, el editor es accesible desde cualquier origen.

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
    - `''*'`
  - _Nota_: Si se establece en `'*'`, el editor es accesible desde cualquier origen. Debe configurarse si se cambia el puerto o si el editor se aloja en un dominio diferente.

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
  - _Nota_: Si es verdadero, el editor podrá interactuar con la aplicación. Si es falso, el editor no podrá interactuar con la aplicación.

- **clientId**:

  - _Tipo_: `string` | `undefined`
  - _Por defecto_: `undefined`
  - _Descripción_: clientId y clientSecret permiten que los paquetes de Intlayer se autentiquen con el backend usando autenticación oAuth2.
  - _Ejemplo_: `true`
  - _Nota_: Importante: El clientId y clientSecret deben mantenerse en secreto y no compartirse públicamente.

- **clientSecret**:

  - _Tipo_: `string` | `undefined`
  - _Por defecto_: `undefined`
  - _Descripción_: clientId y clientSecret permiten que los paquetes de Intlayer se autentiquen con el backend usando autenticación oAuth2.
  - _Ejemplo_: `true`
  - _Nota_: Importante: El clientId y clientSecret deben mantenerse en secreto y no compartirse públicamente.

- **hotReload**:

  - _Tipo_: `boolean`
  - _Por defecto_: `false`
  - _Descripción_: Indica si la aplicación debe recargar automáticamente las configuraciones de locales cuando se detecta un cambio.
  - _Ejemplo_: `true`
  - _Nota_: Debido a que la recarga en caliente necesita una conexión continua al servidor, solo está disponible para clientes del plan `enterprise`.

- **dictionaryPriorityStrategy**:
  - _Tipo_: `string`
  - _Por defecto_: `'local_first'`
  - _Descripción_: La estrategia para priorizar diccionarios en caso de que existan diccionarios locales y remotos.
  - _Ejemplo_: `'distant_first'`

### Configuración de Middleware

Ajustes que controlan el comportamiento del middleware, incluyendo cómo la aplicación maneja cookies, encabezados y prefijos de URL para la gestión de locales.

#### Propiedades

- **headerName**:

  - _Tipo_: `string`
  - _Por defecto_: `'x-intlayer-locale'`
  - _Descripción_: El nombre del encabezado HTTP utilizado para determinar el locale.
  - _Ejemplo_: `'x-custom-locale'`
  - _Nota_: Esto es útil para la determinación de locales basada en API.

- **cookieName**:

  - _Tipo_: `string`
  - _Por defecto_: `'intlayer-locale'`
  - _Descripción_: El nombre de la cookie utilizada para almacenar el locale.
  - _Ejemplo_: `'custom-locale'`
  - _Nota_: Se utiliza para persistir el locale entre sesiones.

- **prefixDefault**:

  - _Tipo_: `boolean`
  - _Por defecto_: `true`
  - _Descripción_: Si se incluye el locale predeterminado en la URL.
  - _Ejemplo_: `false`
  - _Nota_: Si es `false`, las URLs para el locale predeterminado no tendrán un prefijo de locale.

- **basePath**:

  - _Tipo_: `string`
  - _Por defecto_: `''`
  - _Descripción_: La ruta base para las URLs de la aplicación.
  - _Ejemplo_: `'/my-app'`
  - _Nota_: Esto afecta cómo se construyen las URLs para la aplicación.

- **serverSetCookie**:

  - _Tipo_: `string`
  - _Por defecto_: `'always'`
  - _Descripción_: Regla para establecer la cookie de locale en el servidor.
  - _Opciones_: `'always'`, `'never'`
  - _Ejemplo_: `'never'`
  - _Nota_: Controla si la cookie de locale se establece en cada solicitud o nunca.

- **noPrefix**:
  - _Tipo_: `boolean`
  - _Por defecto_: `false`
  - _Descripción_: Si se omite el prefijo de locale en las URLs.
  - _Ejemplo_: `true`
  - _Nota_: Si es `true`, las URLs no contendrán información de locale.

---

### Configuración de Contenido

Ajustes relacionados con el manejo de contenido dentro de la aplicación, incluyendo nombres de directorios, extensiones de archivos y configuraciones derivadas.

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

- **contentDirName**:

  - _Tipo_: `string`
  - _Por defecto_: `'src'`
  - _Descripción_: El nombre del directorio donde se almacena el contenido.
  - _Ejemplo_: `'data'`, `'content'`, `'locales'`
  - _Nota_: Si no está en el nivel del directorio base, actualice el `contentDir`.

- **contentDir**:

  - _Tipo_: `string`
  - _Derivado de_: `'baseDir'` / `'contentDirName'`
  - _Descripción_: La ruta del directorio donde se almacena el contenido.

- **resultDirName**:

  - _Tipo_: `string`
  - _Por defecto_: `'.intlayer'`
  - _Descripción_: El nombre del directorio donde se almacenan los resultados.
  - _Ejemplo_: `'outputOFIntlayer'`
  - _Nota_: Si este directorio no está en el nivel base, actualice `resultDir`.

- **resultDir**:

  - _Tipo_: `string`
  - _Derivado de_: `'baseDir'` / `'resultDirName'`
  - _Descripción_: La ruta del directorio para almacenar resultados intermedios o de salida.

- **moduleAugmentationDirName**:

  - _Tipo_: `string`
  - _Por defecto_: `'types'`
  - _Descripción_: Directorio para la ampliación de módulos, permitiendo mejores sugerencias en el IDE y verificación de tipos.
  - _Ejemplo_: `'intlayer-types'`
  - _Nota_: Asegúrese de incluir esto en `tsconfig.json`.

- **moduleAugmentationDir**:

  - _Tipo_: `string`
  - _Derivado de_: `'baseDir'` / `'moduleAugmentationDirName'`
  - _Descripción_: La ruta para la ampliación de módulos y definiciones de tipos adicionales.

- **dictionariesDirName**:

  - _Tipo_: `string`
  - _Por defecto_: `'dictionary'`
  - _Descripción_: Directorio para almacenar diccionarios.
  - _Ejemplo_: `'translations'`
  - _Nota_: Si no está en el nivel del directorio de resultados, actualice `dictionariesDir`.

- **dictionariesDir**:

  - _Tipo_: `string`
  - _Derivado de_: `'resultDir'` / `'dictionariesDirName'`
  - _Descripción_: El directorio para almacenar diccionarios de localización.

- **i18nextResourcesDirName**:

  - _Tipo_: `string`
  - _Por defecto_: `'i18next_dictionary'`
  - _Descripción_: Directorio para almacenar diccionarios i18n.
  - _Ejemplo_: `'translations'`
  - _Nota_: Si no está en el nivel del directorio de resultados, actualice `i18nextResourcesDir`.
  - _Nota_: Asegúrese de que la salida de diccionarios i18n incluya i18next para construir los diccionarios para i18next.

- **i18nextResourcesDir**:

  - _Tipo_: `string`
  - _Derivado de_: `'resultDir'` / `'i18nextResourcesDirName'`
  - _Descripción_: El directorio para almacenar diccionarios i18n.
  - _Nota_: Asegúrese de que este directorio esté configurado para el tipo de salida i18next.

- **typeDirName**:

  - _Tipo_: `string`
  - _Por defecto_: `'types'`
  - _Descripción_: Directorio para almacenar tipos de diccionario.
  - _Ejemplo_: `'intlayer-types'`
  - _Nota_: Si no está en el nivel del directorio de resultados, actualice `typesDir`.

- **typesDir**:

  - _Tipo_: `string`
  - _Derivado de_: `'resultDir'` / `'typeDirName'`
  - _Descripción_: El directorio para almacenar tipos de diccionario.

- **mainDirName**:

  - _Tipo_: `string`
  - _Por defecto_: `'main'`
  - _Descripción_: Directorio para almacenar archivos principales.
  - _Ejemplo_: `'intlayer-main'`
  - _Nota_: Si no está en el nivel del directorio de resultados, actualice `mainDir`.

- **mainDir**:

  - _Tipo_: `string`
  - _Derivado de_: `'resultDir'` / `'mainDirName'`
  - _Descripción_: El directorio donde se almacenan los archivos principales de la aplicación.

- **excludedPath**:
  - _Tipo_: `string[]`
  - _Por defecto_: `['node_modules']`
  - _Descripción_: Directorios excluidos de la búsqueda de contenido.
  - _Nota_: Esta configuración aún no se utiliza, pero está planificada para futuras implementaciones.

### Configuración del Logger

Ajustes que controlan el logger, incluyendo el prefijo a usar.

#### Propiedades

- **mode**:

  - _Tipo_: `string`
  - _Por defecto_: `default`
  - _Descripción_: Indica el modo del logger.
  - _Opciones_: `default`, `verbose`, `disabled`
  - _Ejemplo_: `default`
  - _Nota_: El modo verbose registrará más información, pero puede usarse para propósitos de depuración. El modo disabled desactivará el logger.

- **prefix**:
  - _Tipo_: `string`
  - _Por defecto_: `'[intlayer] '`
  - _Descripción_: El prefijo del logger.
  - _Ejemplo_: `'[my custom prefix] '`
  - _Nota_: El prefijo del logger.

### Configuración de IA

Configuración que controla las características de IA de Intlayer, incluyendo el proveedor, el modelo y la clave API.

Esta configuración es opcional si estás registrado en el [Panel de Control de Intlayer](https://intlayer.org/dashboard/project) usando una clave de acceso. Intlayer gestionará automáticamente la solución de IA más eficiente y rentable para tus necesidades. El uso de las opciones predeterminadas garantiza una mejor mantenibilidad a largo plazo ya que Intlayer actualiza continuamente para usar los modelos más relevantes.

Si prefieres usar tu propia clave API o un modelo específico, puedes definir tu configuración de IA personalizada.
Esta configuración de IA se utilizará globalmente en tu entorno Intlayer. Los comandos CLI usarán estos ajustes como valores predeterminados para los comandos (por ejemplo `fill`), así como el SDK, el Editor Visual y el CMS. Puedes anular estos valores predeterminados para casos de uso específicos usando parámetros de comando.

Intlayer admite múltiples proveedores de IA para mayor flexibilidad y opciones. Los proveedores actualmente soportados son:

- **OpenAI** (predeterminado)
- **Anthropic Claude**
- **Mistral AI**
- **DeepSeek**
- **Google Gemini**
- **Meta Llama**

#### Propiedades

- **provider** :

  - _Tipo_ : `string`
  - _Predeterminado_ : `'openai'`
  - _Descripción_ : El proveedor a utilizar para las características de IA de Intlayer.
  - _Opciones_ : `'openai'`, `'anthropic'`, `'mistral'`, `'deepseek'`, `'gemini'`
  - _Ejemplo_ : `'anthropic'`
  - _Nota_ : Diferentes proveedores pueden requerir diferentes claves API y tener diferentes modelos de precios.

- **model** :

  - _Tipo_ : `string`
  - _Predeterminado_ : Ninguno
  - _Descripción_ : El modelo a utilizar para las características de IA de Intlayer.
  - _Ejemplo_ : `'gpt-4o-2024-11-20'`
  - _Nota_ : El modelo específico a utilizar varía según el proveedor.

- **temperature** :

  - _Tipo_ : `number`
  - _Predeterminado_ : Ninguno
  - _Descripción_ : La temperatura controla la aleatoriedad de las respuestas de la IA.
  - _Ejemplo_ : `0.1`
  - _Nota_ : Una temperatura más alta hará que la IA sea más creativa y menos predecible.

- **apiKey** :
  - _Tipo_ : `string`
  - _Predeterminado_ : Ninguno
  - _Descripción_ : Tu clave API para el proveedor seleccionado.
  - _Ejemplo_ : `process.env.OPENAI_API_KEY`
  - _Nota_ : Importante: Las claves API deben mantenerse en secreto y no compartirse públicamente. Por favor, asegúrate de guardarlas en una ubicación segura, como variables de entorno.
