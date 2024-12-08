# Documentación de Configuración de Intlayer

## Descripción General

Los archivos de configuración de Intlayer permiten la personalización de varios aspectos del plugin, como la internacionalización, middleware y manejo de contenido. Este documento proporciona una descripción detallada de cada propiedad en la configuración.

---

## Formatos de Archivo de Configuración Soportados

Intlayer acepta formatos de archivos de configuración JSON, JS, MJS y TS:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Ejemplo de archivo de configuración

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

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

```javascript
// intlayer.config.cjs

const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
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

```json5
// .intlayerrc

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

Define configuraciones relacionadas con la internacionalización, incluidos los idiomas disponibles y el idioma predeterminado para la aplicación.

#### Propiedades

- **locales**:
  - _Tipo_: `string[]`
  - _Predeterminado_: `['en']`
  - _Descripción_: La lista de idiomas soportados en la aplicación.
  - _Ejemplo_: `['en', 'fr', 'es']`
- **strictMode**:

  - _Tipo_: `string`
  - _Predeterminado_: `required_only`
  - _Descripción_: Asegura implementaciones fuertes de contenido internacionalizado usando TypeScript.
  - _Nota_: Si se establece en "strict", la función de traducción `t` requerirá que cada idioma declarado esté definido. Si falta un idioma o no está declarado en tu configuración, lanzará un error.
  - _Nota_: Si se establece en "required_only", la función de traducción `t` requerirá que cada idioma declarado esté definido. Si falta un idioma, emitirá una advertencia, pero aceptará si un idioma no está declarado en tu configuración, pero existe.
  - _Nota_: Si se establece en "loose", la función de traducción `t` aceptará cualquier idioma existente.

- **defaultLocale**:
  - _Tipo_: `string`
  - _Predeterminado_: `'en'`
  - _Descripción_: El idioma predeterminado usado como respaldo si no se encuentra el idioma solicitado.
  - _Ejemplo_: `'en'`
  - _Nota_: Esto se utiliza para determinar el idioma cuando no se especifica en la URL, cookie o encabezado.

---

### Configuración del Editor

Define configuraciones relacionadas con el editor integrado, incluido el puerto del servidor y el estado activo.

#### Propiedades

- **backendURL**:

  - _Type_: `string`
  - _Default_: `https://back.intlayer.org`
  - _Description_:
  - _Example_: `http://localhost:4000`

- **enabled**:

  - _Tipo_: `boolean`
  - _Predeterminado_: `true`
  - _Descripción_: Indica si el editor está activo.
  - _Ejemplo_: `true`
  - _Nota_: Puede configurarse usando NODE_ENV, u otra variable de entorno dedicada.

- **clientId**:

  - _Tipo_: `string` | `undefined`
  - _Predeterminado_: `undefined`
  - _Descripción_: El clientId y el clientSecret permiten a los paquetes intlayer autenticarse con el backend utilizando oAuth2. Un acceso a un token se utiliza para autenticarse en el proyecto. Para obtener un acceso a un token, vaya a https://back.intlayer.org/dashboard/project y cree una cuenta.
  - _Ejemplo_: `true`
  - _Nota_: Importante: El clientId y el clientSecret deben mantenerse seguros y no compartirse públicamente. Asegúrese de mantenerlos en un entorno seguro, como un archivo de configuración.

- **clientSecret**:
  - _Tipo_: `string` | `undefined`
  - _Predeterminado_: `undefined`
  - _Descripción_: El clientId y el clientSecret permiten a los paquetes intlayer autenticarse con el backend utilizando oAuth2. Un acceso a un token se utiliza para autenticarse en el proyecto. Para obtener un acceso a un token, vaya a https://back.intlayer.org/dashboard/project y cree una cuenta.
  - _Ejemplo_: `true`
  - _Nota_: Importante: El clientId y el clientSecret deben mantenerse seguros y no compartirse públicamente. Asegúrese de mantenerlos en un entorno seguro, como un archivo de configuración.

### Configuración de Middleware

Configuraciones que controlan el comportamiento del middleware, incluido cómo la aplicación maneja las cookies, encabezados y prefijos de URL para la gestión de idiomas.

#### Propiedades

- **headerName**:
  - _Tipo_: `string`
  - _Predeterminado_: `'x-intlayer-locale'`
  - _Descripción_: El nombre del encabezado HTTP utilizado para determinar el idioma.
  - _Ejemplo_: `'x-custom-locale'`
  - _Nota_: Esto es útil para la determinación de idioma basada en API.
- **cookieName**:
  - _Tipo_: `string`
  - _Predeterminado_: `'intlayer-locale'`
  - _Descripción_: El nombre de la cookie utilizada para almacenar el idioma.
  - _Ejemplo_: `'custom-locale'`
  - _Nota_: Utilizado para persistir el idioma entre sesiones.
- **prefixDefault**:
  - _Tipo_: `boolean`
  - _Predeterminado_: `true`
  - _Descripción_: Si se debe incluir el idioma predeterminado en la URL.
  - _Ejemplo_: `false`
  - _Nota_: Si `false`, las URL para el idioma predeterminado no tendrán un prefijo de idioma.
- **basePath**:
  - _Tipo_: `string`
  - _Predeterminado_: `''`
  - _Descripción_: La ruta base para las URL de la aplicación.
  - _Ejemplo_: `'/my-app'`
  - _Nota_: Esto afecta cómo se construyen las URL para la aplicación.
- **serverSetCookie**:
  - _Tipo_: `string`
  - _Predeterminado_: `'always'`
  - _Descripción_: Regla para establecer la cookie de idioma en el servidor.
  - _Opciones_: `'always'`, `'never'`
  - _Ejemplo_: `'never'`
  - _Nota_: Controla si la cookie de idioma se establece en cada solicitud o nunca.
- **noPrefix**:
  - _Tipo_: `boolean`
  - _Predeterminado_: `false`
  - _Descripción_: Si se debe omitir el prefijo de idioma en las URL.
  - _Ejemplo_: `true`
  - _Nota_: Si `true`, las URL no contendrán información de idioma.

---

### Configuración de Contenido

Configuraciones relacionadas con el manejo de contenido dentro de la aplicación, incluidos nombres de directorios, extensiones de archivos y configuraciones derivadas.

#### Propiedades

- **watch**:
  - _Tipo_: `boolean`
  - _Predeterminado_: `process.env.NODE_ENV === 'development'`
  - _Descripción_: Indica si Intlayer debe monitorear los archivos de declaración de contenido en la aplicación para reconstruir los diccionarios relacionados.
- **fileExtensions**:
  - _Tipo_: `string[]`
  - _Predeterminado_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Descripción_: Extensiones de archivos a buscar al construir diccionarios.
  - _Ejemplo_: `['.data.ts', '.data.js', '.data.json']`
  - _Nota_: Personalizar las extensiones de archivo puede ayudar a evitar conflictos.
- **baseDir**:
  - _Tipo_: `string`
  - _Predeterminado_: `process.cwd()`
  - _Descripción_: El directorio base para el proyecto.
  - _Ejemplo_: `'/path/to/project'`
  - _Nota_: Esto se usa para resolver todos los directorios relacionados con Intlayer.
- **dictionaryOutput**:
  - _Tipo_: `string[]`
  - _Predeterminado_: `['intlayer']`
  - _Descripción_: El tipo de salida de diccionario a usar, por ejemplo, `'intlayer'` o `'i18next'`.
- **contentDirName**:
  - _Tipo_: `string`
  - _Predeterminado_: `'src'`
  - _Descripción_: El nombre del directorio donde se almacena el contenido.
  - _Ejemplo_: `'data'`, `'content'`, `'locales'`
  - _Nota_: Si no está en el nivel del directorio base, actualiza el `contentDir`.
- **contentDir**:
  - _Tipo_: `string`
  - _DerivadoDe_: `'baseDir'` / `'contentDirName'`
  - _Descripción_: La ruta del directorio donde se almacena el contenido.
- **resultDirName**:
  - _Tipo_: `string`
  - _Predeterminado_: `'.intlayer'`
  - _Descripción_: El nombre del directorio donde se almacenan los resultados.
  - _Ejemplo_: `'outputOFIntlayer'`
  - _Nota_: Si este directorio no está en el nivel base, actualiza `resultDir`.
- **resultDir**:
  - _Tipo_: `string`
  - _DerivadoDe_: `'baseDir'` / `'resultDirName'`
  - _Descripción_: La ruta del directorio para almacenar resultados intermedios o finales.
- **moduleAugmentationDirName**:
  - _Tipo_: `string`
  - _Predeterminado_: `'types'`
  - _Descripción_: Directorio para la ampliación de módulos, permitiendo mejores sugerencias del IDE y verificación de tipos.
  - _Ejemplo_: `'intlayer-types'`
  - _Nota_: Asegúrate de incluir esto en `tsconfig.json`.
- **moduleAugmentationDir**:
  - _Tipo_: `string`
  - _DerivadoDe_: `'baseDir'` / `'moduleAugmentationDir

Name'`

- _Descripción_: La ruta para la ampliación de módulos y definiciones de tipos adicionales.
- **dictionariesDirName**:
  - _Tipo_: `string`
  - _Predeterminado_: `'dictionary'`
  - _Descripción_: Directorio para almacenar diccionarios.
  - _Ejemplo_: `'translations'`
  - _Nota_: Si no está en el nivel del directorio de resultados, actualiza `dictionariesDir`.
- **dictionariesDir**:
  - _Tipo_: `string`
  - _DerivadoDe_: `'resultDir'` / `'dictionariesDirName'`
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
  - _DerivadoDe_: `'resultDir'` / `'i18nDictionariesDirName'`
  - _Descripción_: El directorio para almacenar diccionarios i18n.
  - _Nota_: Asegúrate de que este directorio esté configurado para el tipo de salida i18next.
- **typeDirName**:
  - _Tipo_: `string`
  - _Predeterminado_: `'types'`
  - _Descripción_: Directorio para almacenar tipos de diccionario.
  - _Ejemplo_: `'intlayer-types'`
  - _Nota_: Si no está en el nivel del directorio de resultados, actualiza `typesDir`.
- **typesDir**:
  - _Tipo_: `string`
  - _DerivadoDe_: `'resultDir'` / `'typeDirName'`
  - _Descripción_: El directorio para almacenar tipos de diccionario.
- **mainDirName**:
  - _Tipo_: `string`
  - _Predeterminado_: `'main'`
  - _Descripción_: Directorio para almacenar archivos principales.
  - _Ejemplo_: `'intlayer-main'`
  - _Nota_: Si no está en el nivel del directorio de resultados, actualiza `mainDir`.
- **mainDir**:
  - _Tipo_: `string`
  - _DerivadoDe_: `'resultDir'` / `'mainDirName'`
  - _Descripción_: El directorio donde se almacenan los archivos principales de la aplicación.
- **excludedPath**:
  - _Tipo_: `string[]`
  - _Predeterminado_: `['node_modules']`
  - _Descripción_: Directorios excluidos de la búsqueda de contenido.
  - _Nota_: Esta configuración aún no se utiliza, pero está planificada para implementaciones futuras.
