# Documentación de Configuración de Intlayer

## Descripción General

Los archivos de configuración de Intlayer permiten la personalización de varios aspectos del complemento, como la internacionalización, middleware y manejo de contenido. Este documento proporciona una descripción detallada de cada propiedad en la configuración.

---

## Soporte para Archivos de Configuración

Intlayer acepta los formatos de archivos de configuración JSON, JS, MJS y TS:

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
    locales: [Locales.ESPAÑOL],
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
const config = {
  internationalization: {
    locales: [Locales.ESPAÑOL],
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
{
  "internationalization": {
    "locales": ["es"],
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

Define la configuración relacionada con la internacionalización, incluyendo los locales disponibles y el locale predeterminado para la aplicación.

#### Propiedades

- **locales**:
  - _Tipo_: `string[]`
  - _Predeterminado_: `['es']`
  - _Descripción_: La lista de locales soportados en la aplicación.
  - _Ejemplo_: `['es', 'fr', 'en']`
- **strictMode**:

  - _Tipo_: `string`
  - _Predeterminado_: `required_only`
  - _Descripción_: Asegura implementaciones sólidas de contenido internacionalizado usando typescript.
  - _Nota_: Si se establece en "strict", la función de traducción `t` requerirá que cada locale declarado esté definido. Si falta un locale, o si un locale no está declarado en su configuración, lanzará un error.
  - _Nota_: Si se establece en "required_only", la función de traducción `t` requerirá que cada locale declarado esté definido. Si falta un locale, lanzará una advertencia. Pero aceptará si un locale no está declarado en su configuración, pero existe.
  - _Nota_: Si se establece en "loose", la función de traducción `t` aceptará cualquier locale existente.

- **defaultLocale**:
  - _Tipo_: `string`
  - _Predeterminado_: `'es'`
  - _Descripción_: El locale predeterminado utilizado como fallback si el locale solicitado no se encuentra.
  - _Ejemplo_: `'es'`
  - _Nota_: Esto se usa para determinar el locale cuando ninguno está especificado en la URL, cookie, o cabecera.

---

### Configuración del Editor

Define configuraciones relacionadas con el editor integrado, incluyendo el puerto del servidor y el estado activo.

#### Propiedades

- **backendURL**:

  - _Tipo_: `string`
  - _Predeterminado_: `https://back.intlayer.org`
  - _Descripción_: La URL del servidor backend.
  - _Ejemplo_: `http://localhost:4000`

- **enabled**:

  - _Tipo_: `boolean`
  - _Predeterminado_: `true`
  - _Descripción_: Indica si el editor está activo.
  - _Ejemplo_: `true`
  - _Nota_: Puede establecerse utilizando NODE_ENV, o otra variable de entorno dedicada.

- **clientId**:

  - _Tipo_: `string` | `undefined`
  - _Predeterminado_: `undefined`
  - _Descripción_: clientId y clientSecret permiten a los paquetes de intlayer autenticarse con el backend usando autenticación oAuth2. Se usa un token de acceso para autenticar al usuario relacionado con el proyecto. Para obtener un token de acceso, dirígete a https://back.intlayer.org/dashboard/project y crea una cuenta.
  - _Ejemplo_: `true`
  - _Nota_: Importante: El clientId y el clientSecret deben mantenerse en secreto y no compartirse públicamente. Asegúrate de mantenerlos en un lugar seguro, como variables de entorno.

- **clientSecret**:
  - _Tipo_: `string` | `undefined`
  - _Predeterminado_: `undefined`
  - _Descripción_: clientId y clientSecret permiten a los paquetes de intlayer autenticarse con el backend usando autenticación oAuth2. Se usa un token de acceso para autenticar al usuario relacionado con el proyecto. Para obtener un token de acceso, dirígete a https://back.intlayer.org/dashboard/project y crea una cuenta.
  - _Ejemplo_: `true`
  - _Nota_: Importante: El clientId y el clientSecret deben mantenerse en secreto y no compartirse públicamente. Asegúrate de mantenerlos en un lugar seguro, como variables de entorno.

### Configuración de Middleware

Configuraciones que controlan el comportamiento del middleware, incluyendo cómo la aplicación maneja cookies, cabeceras, y prefijos de URL para la gestión de locales.

#### Propiedades

- **headerName**:
  - _Tipo_: `string`
  - _Predeterminado_: `'x-intlayer-locale'`
  - _Descripción_: El nombre de la cabecera HTTP utilizada para determinar el locale.
  - _Ejemplo_: `'x-custom-locale'`
  - _Nota_: Esto es útil para la determinación del locale basada en API.
- **cookieName**:
  - _Tipo_: `string`
  - _Predeterminado_: `'intlayer-locale'`
  - _Descripción_: El nombre de la cookie utilizada para almacenar el locale.
  - _Ejemplo_: `'custom-locale'`
  - _Nota_: Usado para persistir el locale a través de sesiones.
- **prefixDefault**:
  - _Tipo_: `boolean`
  - _Predeterminado_: `true`
  - _Descripción_: Si incluir el locale predeterminado en la URL.
  - _Ejemplo_: `false`
  - _Nota_: Si `false`, las URLs para el locale predeterminado no tendrán un prefijo de locale.
- **basePath**:
  - _Tipo_: `string`
  - _Predeterminado_: `''`
  - _Descripción_: La ruta base para las URLs de la aplicación.
  - _Ejemplo_: `'/mi-aplicacion'`
  - _Nota_: Esto afecta cómo se construyen las URLs para la aplicación.
- **serverSetCookie**:
  - _Tipo_: `string`
  - _Predeterminado_: `'always'`
  - _Descripción_: Regla para establecer la cookie de locale en el servidor.
  - _Opciones_: `'always'`, `'never'`
  - _Ejemplo_: `'never'`
  - _Nota_: Controla si la cookie de locale se establece en cada solicitud o nunca.
- **noPrefix**:
  - _Tipo_: `boolean`
  - _Predeterminado_: `false`
  - _Descripción_: Si omitir el prefijo de locale de las URLs.
  - _Ejemplo_: `true`
  - _Nota_: Si `true`, las URLs no contendrán información de locale.

---

### Configuración de Contenido

Configuraciones relacionadas con el manejo de contenido dentro de la aplicación, incluyendo nombres de directorios, extensiones de archivos y configuraciones derivadas.

#### Propiedades

- **watch**:
  - _Tipo_: `boolean`
  - _Predeterminado_: `process.env.NODE_ENV === 'development'`
  - _Descripción_: Indica si Intlayer debe observar cambios en los archivos de declaración de contenido en la aplicación para reconstruir los diccionarios relacionados.
- **fileExtensions**:
  - _Tipo_: `string[]`
  - _Predeterminado_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Descripción_: Extensiones de archivo a buscar al construir diccionarios.
  - _Ejemplo_: `['.data.ts', '.data.js', '.data.json']`
  - _Nota_: Personalizar las extensiones de archivo puede ayudar a evitar conflictos.
- **baseDir**:
  - _Tipo_: `string`
  - _Predeterminado_: `process.cwd()`
  - _Descripción_: El directorio base para el proyecto.
  - _Ejemplo_: `'/ruta/al/proyecto'`
  - _Nota_: Esto se usa para resolver todos los directorios relacionados con Intlayer.
- **dictionaryOutput**:
  - _Tipo_: `string[]`
  - _Predeterminado_: `['intlayer']`
  - _Descripción_: El tipo de salida del diccionario a utilizar, p.ej., `'intlayer'` o `'i18next'`.
- **contentDirName**:
  - _Tipo_: `string`
  - _Predeterminado_: `'src'`
  - _Descripción_: El nombre del directorio donde se almacena el contenido.
  - _Ejemplo_: `'data'`, `'content'`, `'locales'`
  - _Nota_: Si no está en el nivel del directorio base, actualiza el `contentDir`.
- **contentDir**:

  - _Tipo_: `string`
  - _DerivedFrom_: `'baseDir'` / `'contentDirName'`
  - _Descripción_: La ruta del directorio donde se almacena el contenido.

- **resultDirName**:
  - _Tipo_: `string`
  - _Predeterminado_: `'.intlayer'`
  - _Descripción_: El nombre del directorio donde se almacenan los resultados.
  - _Ejemplo_: `'outputOFIntlayer'`
  - _Nota_: Si este directorio no está en el nivel base, actualiza `resultDir`.
- **resultDir**:

  - _Tipo_: `string`
  - _DerivedFrom_: `'baseDir'` / `'resultDirName'`
  - _Descripción_: La ruta del directorio para almacenar resultados intermedios o de salida.

- **moduleAugmentationDirName**:

  - _Tipo_: `string`
  - _Predeterminado_: `'types'`
  - _Descripción_: Directorio para la augmentación de módulos, permitiendo mejores sugerencias de IDE y verificación de tipos.
  - _Ejemplo_: `'intlayer-types'`
  - _Nota_: Asegúrate de incluir esto en `tsconfig.json`.

- **moduleAugmentationDir**:

  - _Tipo_: `string`
  - _DerivedFrom_: `'baseDir'` / `'moduleAugmentationDirName'`
  - _Descripción_: La ruta para la augmentación de módulos y definiciones de tipos adicionales.

- **dictionariesDirName**:
  - _Tipo_: `string`
  - _Predeterminado_: `'dictionary'`
  - _Descripción_: Directorio para almacenar diccionarios.
  - _Ejemplo_: `'translations'`
  - _Nota_: Si no está en el nivel del directorio de resultados, actualiza `dictionariesDir`.
- **dictionariesDir**:

  - _Tipo_: `string`
  - _DerivedFrom_: `'resultDir'` / `'dictionariesDirName'`
  - _Descripción_: El directorio para almacenar diccionarios de localización.

- **i18nDictionariesDirName**:
  - _Tipo_: `string`
  - _Predeterminado_: `'i18n_dictionary'`
  - _Descripción_: Directorio para almacenar diccionarios i18n.
  - _Ejemplo_: `'translations'`
  - _Nota_: Si no está en el nivel del directorio de resultados, actualiza `i18nDictionariesDir`.
  - _Nota_: Asegúrate de que la salida de los diccionarios i18n incluya i18next para construir los diccionarios para i18next.
- **i18nDictionariesDir**:

  - _Tipo_: `string`
  - _DerivedFrom_: `'resultDir'` / `'i18nDictionariesDirName'`
  - _Descripción_: El directorio para almacenar diccionarios i18n.
  - _Nota_: Asegúrate de que este directorio esté configurado para el tipo de salida de i18next.

- **typeDirName**:

  - _Tipo_: `string`
  - _Predeterminado_: `'types'`
  - _Descripción_: Directorio para almacenar tipos de diccionario.
  - _Ejemplo_: `'intlayer-types'`
  - _Nota_: Si no está en el nivel del directorio de resultados, actualiza `typesDir`.

- **typesDir**:

  - _Tipo_: `string`
  - _DerivedFrom_: `'resultDir'` / `'typeDirName'`
  - _Descripción_: El directorio para almacenar tipos de diccionario.

- **mainDirName**:
  - _Tipo_: `string`
  - _Predeterminado_: `'main'`
  - _Descripción_: Directorio para almacenar archivos principales.
  - _Ejemplo_: `'intlayer-main'`
  - _Nota_: Si no está en el nivel del directorio de resultados, actualiza `mainDir`.
- **mainDir**:
  - _Tipo_: `string`
  - _DerivedFrom_: `'resultDir'` / `'mainDirName'`
  - _Descripción_: El directorio donde se almacenan los archivos principales de la aplicación.
- **excludedPath**:
  - _Tipo_: `string[]`
  - _Predeterminado_: `['node_modules']`
  - _Descripción_: Directorios excluidos de la búsqueda de contenido.
  - _Nota_: Esta configuración aún no se utiliza, pero está planeada para una futura implementación.

### Configuración del Registrador

Configuraciones que controlan el registrador, incluyendo el nivel de logging y el prefijo a usar.

#### Propiedades

- **enabled**:
  - _Tipo_: `boolean`
  - _Predeterminado_: `true`
  - _Descripción_: Indica si el registrador está habilitado.
  - _Ejemplo_: `true`
  - _Nota_: Puede establecerse utilizando NODE_ENV, o otra variable de entorno dedicada.
- **level**:
  - _Tipo_: `'info' | 'warn' | 'debug' | 'log'`
  - _Predeterminado_: `'log'`
  - _Descripción_: El nivel del registrador.
  - _Ejemplo_: `'info'`
  - _Nota_: El nivel del registrador. Puede ser 'log', 'info', 'warn', 'error', o 'debug'.
- **prefix**:
  - _Tipo_: `string`
  - _Predeterminado_: `'[intlayer] '`
  - _Descripción_: El prefijo del registrador.
  - _Ejemplo_: `'[mi prefijo personalizado] '`
  - _Nota_: El prefijo del registrador.
