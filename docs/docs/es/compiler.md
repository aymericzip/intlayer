---
createdAt: 2025-09-09
updatedAt: 2026-03-12
title: Intlayer Compiler | Extracción Automática de Contenido para i18n
description: Automatiza tu proceso de internacionalización con el Intlayer Compiler. Extrae contenido directamente de tus componentes para una i18n más rápida y eficiente en Vite, Next.js y más.
keywords:
  - Intlayer
  - Compiler
  - Internacionalización
  - i18n
  - Automatización
  - Extracción
  - Velocidad
  - Vite
  - Next.js
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - compiler
history:
  - version: 8.2.0
    date: 2026-03-10
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.7
    date: 2026-02-25
    changes: "Actualizar opciones del compilador"
  - version: 7.3.1
    date: 2025-11-27
    changes: "Lanzamiento del Compiler"
---

# Intlayer Compiler | Extracción Automática de Contenido para i18n

## ¿Qué es el Intlayer Compiler?

El **Intlayer Compiler** es una herramienta poderosa diseñada para automatizar el proceso de internacionalización (i18n) en tus aplicaciones. Escanea tu código fuente (JSX, TSX, Vue, Svelte) en busca de declaraciones de contenido, las extrae y genera automáticamente los archivos de diccionario necesarios. Esto te permite mantener tu contenido junto a tus componentes mientras Intlayer se encarga de la gestión y sincronización de tus diccionarios.

## ¿Por qué usar el Intlayer Compiler?

- **Automatización**: Elimina el copiado manual de contenido en los diccionarios.
- **Velocidad**: Extracción de contenido optimizada que asegura que tu proceso de build siga siendo rápido.
- **Experiencia del desarrollador**: Mantén las declaraciones de contenido justo donde se usan, mejorando la mantenibilidad.
- **Actualizaciones en vivo**: Soporta Hot Module Replacement (HMR) para retroalimentación instantánea durante el desarrollo.

Consulta el artículo del blog [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/compiler_vs_declarative_i18n.md) para una comparación más profunda.

## ¿Por qué no usar el Intlayer Compiler?

Si bien el compilador ofrece una excelente experiencia de "funciona sin más", también introduce algunos compromisos de los que debes ser consciente:

- **Ambigüedad heurística**: El compilador debe adivinar qué es contenido orientado al usuario frente a la lógica de la aplicación (por ejemplo, `className="active"`, códigos de estado, IDs de productos). En bases de código complejas, esto puede llevar a falsos positivos o cadenas omitidas que requieren anotaciones manuales y excepciones.
- **Extracción solo estática**: La extracción basada en compilador se basa en análisis estático. Las cadenas que solo existen en tiempo de ejecución (códigos de error de API, campos CMS, etc.) no pueden ser descubiertas o traducidas por el compilador solo, por lo que aún necesitas una estrategia i18n de tiempo de ejecución complementaria.

Para una comparación arquitectónica más profunda, consulta el artículo del blog [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/compiler_vs_declarative_i18n.md).

Como alternativa, para automatizar tu proceso i18n mientras mantienes el control total de tu contenido, Intlayer también proporciona un comando de auto-extracción `intlayer extract` (consulta la [documentación CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/extract.md)), o el comando `Intlayer: extract content to Dictionary` de la extensión Intlayer VS Code (consulta la [documentación de la extensión VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/vs_code_extension.md)).

## Uso

<Tabs>
 <Tab value='vite'>

### Vite

Para aplicaciones basadas en Vite (React, Vue, Svelte, etc.), la forma más sencilla de usar el compilador es a través del plugin `vite-intlayer`.

#### Instalación

```bash
npm install vite-intlayer
```

#### Configuración

Actualiza tu `vite.config.ts` para incluir el plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Añade el plugin del compilador
  ],
});
```

See complete tutorial: [Intlayer Compiler with Vite+React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react_compiler.md)

#### Soporte de Framework

El plugin de Vite detecta y maneja automáticamente diferentes tipos de archivos:

- **React / JSX / TSX**: Manejado de forma nativa.
- **Vue**: Requiere `@intlayer/vue-compiler`.
- **Svelte**: Requiere `@intlayer/svelte-compiler`.

Asegúrate de instalar el paquete de compilador adecuado para tu framework:

```bash
# Para Vue
npm install @intlayer/vue-compiler

# Para Svelte
npm install @intlayer/svelte-compiler
```

 </Tab>
 <Tab value='nextjs'>

### Next.js (Babel)

Para Next.js u otras aplicaciones basadas en Webpack que usan Babel, puedes configurar el compilador usando el plugin `@intlayer/babel`.

#### Instalación

```bash
npm install @intlayer/babel
```

#### Configuración

Actualiza tu `babel.config.js` (o `babel.config.json`) para incluir el plugin de extracción. Proporcionamos un helper `getExtractPluginOptions` para cargar automáticamente tu configuración de Intlayer.

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Extract content from components into dictionaries
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    // Optimize imports by replacing useIntlayer with direct dictionary imports
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

Esta configuración asegura que el contenido declarado en tus componentes se extraiga automáticamente y se utilice para generar diccionarios durante tu proceso de compilación.

See complete tutorial: [Intlayer Compiler with Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_compiler.md)

 </Tab>
</Tabs>

### Configuración personalizada

Para personalizar el comportamiento del compilador, puedes actualizar el archivo `intlayer.config.ts` en la raíz de tu proyecto.

````ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  compiler: {
    /**
     * Indica si el compilador debe estar habilitado.
     * Establécelo en 'build-only' para omitir el compilador durante el desarrollo y acelerar los tiempos de inicio.
     */
    enabled: true,

    /**
     * Define la ruta de los archivos de salida. Reemplaza `outputDir`.
     *
     * - Las rutas `./` se resuelven de forma relativa al directorio del componente.
     * - Las rutas `/` se resuelven de forma relativa a la raíz del proyecto (`baseDir`).
     *
     * - Incluir la variable `{{locale}}` en la ruta activará la generación de diccionarios separados por locale.
     *
     * Ejemplo:
     * ```ts
     * {
     *   // Crear archivos .content.ts multilingües cerca del componente
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Equivalente usando una cadena de plantilla
     * }
     * ```
     *
     * ```ts
     * {
     *   // Crear JSON centralizados por locale en la raíz del proyecto
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Equivalente usando una cadena de plantilla
     * }
     * ```
     *
     * Lista de variables:
     *   - `fileName`: El nombre del archivo.
     *   - `key`: La clave del contenido.
     *   - `locale`: El locale del contenido.
     *   - `extension`: La extensión del archivo.
     *   - `componentFileName`: El nombre del archivo del componente.
     *   - `componentExtension`: La extensión del archivo del componente.
     *   - `format`: El formato del diccionario.
     *   - `componentFormat`: El formato del diccionario del componente.
     *   - `componentDirPath`: La ruta del directorio del componente.
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Indica si los componentes deben guardarse después de ser transformados.
     *
     * - Si es `true`, el compilador reescribirá el archivo del componente en el disco. Por lo tanto, la transformación será permanente y el compilador omitirá la transformación en el próximo proceso. De esta manera, el compilador puede transformar la aplicación y luego puede ser eliminado.
     *
     * - Si es `false`, el compilador inyectará la llamada a la función `useIntlayer()` en el código solo en la salida del build, y mantendrá intacta la base de código original. La transformación se realizará solo en memoria.
     */
    saveComponents: false,

    /**
     * Insertar solo contenido en el archivo generado, útil para salidas JSON de i18next o ICU MessageFormat por locale.
     *
     * - `output: ({ locale, key }) => `./locale/${locale}/${key}.json`,`
     */
    noMetadata: false,

    /**
     * Prefijo de clave de diccionario
     */
    dictionaryKeyPrefix: "", // Añadir un prefijo opcional para las claves de diccionario extraídas
  },
};

export default config;
````

### Referencia de configuración del compilador

Las siguientes propiedades pueden configurarse en el bloque `compiler` de tu archivo `intlayer.config.ts`:

- **enabled**:
  - _Tipo_: `boolean | 'build-only'`
  - _Por defecto_: `true`
  - _Descripción_: Indica si el compilador debe estar habilitado.

- **dictionaryKeyPrefix**:
  - _Tipo_: `string`
  - _Por defecto_: `''`
  - _Descripción_: Prefijo para las claves de diccionario extraídas.

- **transformPattern**:
  - _Tipo_: `string | string[]`
  - _Por defecto_: `['**/*.{js,ts,mjs,cjs,jsx,tsx,vue,svelte}', '!**/node_modules/**']`
  - _Descripción_: (Obsoleto: usa `build.traversePattern` en su lugar) Patrones para recorrer el código a optimizar.

- **excludePattern**:
  - _Tipo_: `string | string[]`
  - _Por defecto_: `['**/node_modules/**']`
  - _Descripción_: (Obsoleto: usa `build.traversePattern` en su lugar) Patrones para excluir de la optimización.

- **output**:
  - _Tipo_: `FilePathPattern`
  - _Por defecto_: `({ key }) => 'compiler/${key}.content.json'`
  - _Descripción_: Define la ruta de los archivos de salida. Reemplaza `outputDir`. Maneja variables dinámicas como `{{locale}}`, `{{key}}`, `{{fileName}}`, `{{extension}}`, `{{format}}`, `{{dirPath}}`, `{{componentFileName}}`, `{{componentExtension}}`, `{{componentFormat}}`. Se puede configurar como una cadena usando el formato `'my/{{var}}/path'` o como una función.
  - _Nota_: `./**/*` Las rutas se resuelven de forma relativa al componente. `/**/*` las rutas se resuelven de forma relativa al `baseDir` de Intlayer.
  - _Note_: Si el locale se establece en la ruta, generará diccionarios por locale.
  - _Ejemplo_: `output: ({ locale, key }) => 'compiler/${locale}/${key}.json'`

- **noMetadata**:
  - _Tipo_: `boolean`
  - _Por defecto_: `false`
  - _Descripción_: Indica si los metadatos deben guardarse en el archivo. Si es verdadero, el compilador no guardará los metadatos de los diccionarios (clave, contenedor de contenido). Útil para las salidas JSON de i18next o ICU MessageFormat por locale.
  - _Nota_: Útil si se usa con el plugin `loadJSON`.
  - _Ejemplo_:
    Si es `true`:
    ```json
    {
      "key": "value"
    }
    ```
    Si es `false`:
    ```json
    {
      "key": "value",
      "content": {
        "key": "value"
      }
    }
    ```

- **saveComponents**:
  - _Tipo_: `boolean`
  - _Por defecto_: `false`
  - _Descripción_: Indica si los componentes deben guardarse después de ser transformados.
    - Si es `true`, el compilador reescribirá el archivo del componente en el disco. La transformación será permanente y el compilador podrá ser eliminado.
    - Si es `false`, el compilador inyectará la llamada a la función `useIntlayer()` en el código solo en la salida del build, y mantendrá intacta la base de código original. La transformación se realizará solo en memoria.

### Rellenar traducciones faltantes

Intlayer proporciona una herramienta CLI para ayudarte a rellenar las traducciones faltantes. Puedes usar el comando `intlayer` para probar y rellenar las traducciones faltantes de tu código.

```bash
npx intlayer test         # Probar si faltan traducciones
```

```bash
npx intlayer fill         # Rellenar traducciones faltantes
```

### Extracción

Intlayer proporciona una herramienta CLI para extraer contenido de tu código. Puedes usar el comando `intlayer extract` para extraer contenido de tu código.

```bash
npx intlayer extract
```

> Para más detalles, consulta la [documentación de la CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md)
