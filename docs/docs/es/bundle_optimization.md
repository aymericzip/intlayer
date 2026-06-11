---
createdAt: 2025-11-25
updatedAt: 2026-06-07
title: Optimización del tamaño y rendimiento del paquete i18n
description: Reduce el tamaño del paquete de tu aplicación optimizando el contenido de internacionalización (i18n). Aprende cómo aprovechar el tree shaking y el lazy loading para diccionarios con Intlayer.
keywords:
  - Optimización de paquete
  - Automatización de contenido
  - Contenido dinámico
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 8.12.0
    date: 2026-06-07
    changes: "Añadidos `intlayerPurgeBabelPlugin` y `intlayerMinifyBabelPlugin` para Babel/Webpack; aclaración del flujo de plugins"
  - version: 8.7.0
    date: 2026-04-08
    changes: "Añadidas las opciones `minify` y `purge` a la configuración de compilación"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Optimización del tamaño y rendimiento del paquete i18n

Uno de los desafíos más comunes con las soluciones i18n tradicionales basadas en archivos JSON es la gestión del tamaño del contenido. Si los desarrolladores no separan manualmente el contenido en espacios de nombres (namespaces), a menudo los usuarios terminan descargando traducciones para cada página y potencialmente para todos los idiomas solo para ver una página en concreto.

Por ejemplo, una aplicación con 10 páginas traducidas a 10 idiomas podría provocar que un usuario descargue el contenido de 100 páginas, aunque solo necesite **una** (la página actual en el idioma actual). Esto genera un desperdicio de ancho de banda y tiempos de carga más lentos.

**Intlayer resuelve este problema a través de la optimización en el momento de la compilación.** Analiza tu código para detectar qué diccionarios se utilizan realmente por cada componente y reinyecta en tu paquete (bundle) solo el contenido necesario.

## Tabla de contenidos

<TOC />

## Analiza tu paquete

Analizar tu paquete es el primer paso para identificar archivos JSON "pesados" y oportunidades de división de código (code-splitting). Estas herramientas generan un treemap visual del código compilado de tu aplicación, permitiéndote ver exactamente qué bibliotecas consumen más espacio.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite utiliza Rollup bajo el capó. El complemento `rollup-plugin-visualizer` genera un archivo HTML interactivo que muestra el tamaño de cada módulo en tu gráfico de dependencias.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Abre automáticamente el informe en tu navegador
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

 </Tab>
 <Tab value="nextjs (turbopack)">

### Next.js (Turbopack)

Para proyectos que usan App Router y Turbopack, Next.js incluye un analizador experimental incorporado que no requiere dependencias adicionales.

```bash packageManager='npm'
npx next experimental-analyze
```

```bash packageManager='yarn'
yarn next experimental-analyze
```

```bash packageManager='pnpm'
pnpm next experimental-analyze
```

```bash packageManager='bun'
bun next experimental-analyze
```

 </Tab>
 <Tab value="nextjs (Webpack)">

### Next.js (Webpack)

Si estás usando el bundler predeterminado de Webpack en Next.js, usa el analizador de paquetes oficial. Actívalo definiendo una variable de entorno durante la compilación.

```bash packageManager='npm'
npm install -D @next/bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D @next/bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D @next/bundle-analyzer
```

```bash packageManager='bun'
bun add -d @next/bundle-analyzer
```

```javascript fileName="next.config.js"
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // Tu configuración de Next.js
});
```

**Uso:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Webpack estándar

Para Create React App (ejected), Angular, o configuraciones de Webpack personalizadas, utiliza el estándar de la industria `webpack-bundle-analyzer`.

```bash packageManager='npm'
npm install -D webpack-bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D webpack-bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D webpack-bundle-analyzer
```

```bash packageManager='bun'
bun add -d webpack-bundle-analyzer
```

```typescript fileName="webpack.config.ts
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-analyzer.html",
      openAnalyzer: false,
    }),
  ],
};
```

 </Tab>
</Tabs>

## Cómo funciona

Intlayer utiliza un **enfoque por componente**. A diferencia de los archivos JSON globales, el contenido se define junto a o dentro de tus componentes. Durante el proceso de compilación, Intlayer:

1. **Analiza** tu código para encontrar llamadas a `useIntlayer`.
2. **Construye** el contenido del diccionario correspondiente.
3. **Reemplaza** la llamada a `useIntlayer` con un código optimizado basado en tu configuración.

Esto asegura que:

- Si un componente no se importa, su contenido no se incluye en el paquete (Eliminación de código muerto o Dead Code Elimination).
- Si un componente se carga mediante lazy loading, su contenido también se carga dinámicamente.

## Referencia de Plugins

La optimización de compilación de Intlayer se divide en varios complementos discretos, cada uno con una responsabilidad única. Entender lo que hace cada uno evita la confusión al configurarlos.

### Plugins de Babel (`@intlayer/babel`)

Se utilizan directamente en `babel.config.js` para configuraciones basadas en Webpack (Next.js con Babel, CRA, Webpack personalizado, etc.).

| Plugin                        | Qué hace                                                                                                                                    |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `intlayerExtractBabelPlugin`  | Analiza archivos `.content.ts` y escribe los diccionarios compilados en `.intlayer/`                                                        |
| `intlayerOptimizeBabelPlugin` | Reescribe `useIntlayer('key')` → `useDictionary(hash)` e inyecta la declaración `import` del diccionario correspondiente                    |
| `intlayerPurgeBabelPlugin`    | Analiza todos los archivos fuente y elimina **los campos de contenido no utilizados** de los archivos JSON `.intlayer/**/*.json`            |
| `intlayerMinifyBabelPlugin`   | **Renombra las claves de campos de contenido** por alias alfabéticos cortos (`title` → `a`) tanto en archivos JSON como en el código fuente |

> **El orden de los plugins es importante.** En tu `babel.config.js`, los complementos de purga (purge) y minificación (minify) deben aparecer **antes** del complemento de optimización. La fase de optimización reemplaza `useIntlayer('key')` con una llamada opaca `useDictionary(hash)`, lo que borra la información de clave del diccionario que las fases de purga y minificación necesitan para saber qué campos se usan.

Cada complemento de Babel cuenta con una función auxiliar de opciones que lee tu `intlayer.config.ts` una vez en tiempo de carga y devuelve los valores pre-resueltos:

| Helper de opciones           | Utilizado con                 |
| :--------------------------- | :---------------------------- |
| `getExtractPluginOptions()`  | `intlayerExtractBabelPlugin`  |
| `getOptimizePluginOptions()` | `intlayerOptimizeBabelPlugin` |
| `getPurgePluginOptions()`    | `intlayerPurgeBabelPlugin`    |
| `getMinifyPluginOptions()`   | `intlayerMinifyBabelPlugin`   |

### Plugins de Vite (`vite-intlayer`)

Los usuarios de Vite **nunca los configuran directamente**. Se vinculan de forma automática al invocar `withIntlayer()` en `vite.config.ts`. Las variables `build.purge` y `build.minify` en `intlayer.config.ts` alternan el comportamiento correspondiente sin necesidad de registrar ningún otro complemento.

| Plugin interno de Vite | Comportamiento equivalente                                                                                   |
| :--------------------- | :----------------------------------------------------------------------------------------------------------- |
| Analizador de uso      | Igual que la fase de análisis del `intlayerPurgeBabelPlugin`                                                 |
| Poda de diccionarios   | Igual que la fase de escritura JSON del `intlayerPurgeBabelPlugin`                                           |
| Minificar diccionario  | Igual que la fase de escritura JSON del `intlayerMinifyBabelPlugin`                                          |
| Transformación Babel   | Igual que la fase de renombramiento en código de `intlayerMinifyBabelPlugin` + `intlayerOptimizeBabelPlugin` |

## Configuración por plataforma

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js requiere el complemento `@intlayer/swc` para la fase de optimización (reescritura de importaciones) ya que Next.js emplea SWC en las compilaciones.

> Este complemento no se instala por defecto ya que los complementos SWC son experimentales en Next.js. Podría cambiar en el futuro.

```bash packageManager="npm"
npm install -D @intlayer/swc
```

```bash packageManager="yarn"
yarn add -D @intlayer/swc
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/swc
```

```bash packageManager="bun"
bun add -d @intlayer/swc
```

Una vez instalado, Intlayer detectará y utilizará automáticamente el complemento.

Para las fases de **purga y minificación** (eliminación de campos y renombramiento), instala de manera adicional `@intlayer/babel` y añade los complementos de Babel. Debido a que Next.js usa SWC para la transformación pero aún evalúa `babel.config.js` para la configuración, estos complementos de Babel se ejecutan en un paso previo antes de SWC.

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```javascript fileName="babel.config.js"
const {
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  getPurgePluginOptions,
  getMinifyPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Purga: eliminar los campos de contenido no usados de .intlayer/**/*.json
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    // Minificar: renombrar claves de campos en el JSON y el código fuente
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    // Nota: intlayerOptimizeBabelPlugin NO es necesario aquí porque
    // @intlayer/swc se encarga de reescribir useIntlayer → useDictionary.
  ],
};
```

 </Tab>
 <Tab value="vite">

### Vite

Vite utiliza el complemento `@intlayer/babel`, el cual está incluido como una dependencia de `vite-intlayer`. El flujo de optimización completo —reescritura de importaciones, purga y minificación— está activado por defecto y no requiere registrar complementos extra.

Activa la purga y la minificación fijando las variables pertinentes en `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // eliminar campos no usados de los JSON empaquetados
    minify: true, // renombrar las claves de campos a alias cortos
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (y Next.js con Babel)

Instala `@intlayer/babel`:

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```bash packageManager="yarn"
yarn add -D @intlayer/babel
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/babel
```

```bash packageManager="bun"
bun add -d @intlayer/babel
```

Agrega los cuatro plugins a `babel.config.js` en el orden correcto:

```javascript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  plugins: [
    // Extract: compilar archivos .content.ts → .intlayer/**/*.json
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge: eliminar los campos no usados de .intlayer/**/*.json
    //    (lee la variable build.purge de intlayer.config.ts)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify: renombrar las claves en el JSON y el código fuente
    //    (lee la variable build.minify de intlayer.config.ts)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize: reescribe useIntlayer('key') → useDictionary(hash)
    //    Debe ir al último porque elimina la clave del diccionario.
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## Configuración

Puedes controlar cómo Intlayer optimiza el tamaño de tu paquete mediante la propiedad `build` en tu `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    // Reemplaza llamadas a useIntlayer() con importaciones directas de diccionario
    // al momento de compilar. undefined = auto (activo en prod), true = siempre, false = nunca.
    optimize: undefined,

    // Renombra las claves de campos de contenido en los diccionarios a alias cortos
    // alfabéticos (ej. title → a). Reduce el tamaño de JSON; requiere optimize.
    minify: true,

    // Elimina los campos de contenido a los que no se acceda en el código fuente.
    // Requiere optimize.
    purge: true,
  },
};

export default config;
```

> Se recomienda mantener el valor por defecto (`undefined`) para `optimize` en la gran mayoría de los casos.

> Consulta la referencia de configuración para ver todas las opciones: [Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)

### Opciones de compilación (Build Options)

| Propiedad      | Tipo                   | Por defecto | Descripción                                                                                                                                                                                    |
| :------------- | :--------------------- | :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean \| undefined` | `undefined` | Habilita el paso de reescritura de importación. `undefined` = activo solo en compilaciones de producción. `false` también deshabilita purga y minificación.                                    |
| **`minify`**   | `boolean`              | `false`     | Renombra las claves de campos en los JSON a alias alfabéticos cortos. También reescribe los accesos a propiedades que coincidan en el código fuente. No surte efecto si `optimize` es `false`. |
| **`purge`**    | `boolean`              | `false`     | Elimina los campos a los que nunca se acceda en código estático desde los archivos JSON compilados. No surte efecto si `optimize` es `false`.                                                  |

### Minificación (renombramiento de campos)

`build.minify` **no** minifica tu código JavaScript; eso lo hace el bundler. Lo que hace es reducir el tamaño de los JSON resultantes al reemplazar toda clave definida por el usuario por un alias alfabético:

```
// Antes de minificar
{ "title": "Hola", "subtitle": "Mundo" }

// Después de minificar
{ "a": "Hola", "b": "Mundo" }
```

Este mismo renombramiento se propaga en tus accesos a propiedades en el código, por lo que `content.title` pasa a ser `content.a` durante la compilación. El comportamiento en tiempo de ejecución sigue siendo idéntico.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> La minificación se omite cuando `optimize` es `false` o cuando `editor.enabled` es `true` (el Editor Visual requiere de los nombres de los campos originales para editarlos).

> La minificación también se omite con diccionarios de `importMode: 'fetch'`, dado que esos JSON son provistos por una API de terceros bajo sus nombres de campos originales; renombrarlo en el cliente perjudicaría a esa sincronización.

### Purga (eliminación de campos no utilizados)

`build.purge` analiza qué campos de contenido son visitados en tu código fuente y elimina al resto en el JSON compilado.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**Ejemplo:** en un diccionario con 5 campos de los cuales solo se emplean 2:

```
// Antes de la purga
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// Después de la purga (solo título y subtítulo son consumidos)
{ "title": "…", "subtitle": "…" }
```

> La purga se omite cuando `optimize` es `false` o cuando `editor.enabled` es `true`.

> La purga también se omite por protección cuando un archivo del código fuente sea irreparable y no logre ejecutarse `useIntlayer` al mismo tiempo que una destructuración. Por lo cual todo el diccionario pasaría a formar parte por completo y sin purgar.

### Modo de Importación

Para aplicaciones grandes que incluyen múltiples páginas e idiomas, el contenido JSON puede ocupar un espacio significativo en tu paquete (bundle). Intlayer te permite controlar cómo se cargan los diccionarios usando la opción `importMode`.

### Definición global

El modo de importación puede ser definido de manera global en tu archivo `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // El valor predeterminado es 'static'
  },
};

export default config;
```

### Definición individual

Puedes sobrescribir el modo de importación para diccionarios individuales en sus propios archivos `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}`.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Sobrescribe el valor global
  content: {
    // ...
  },
};

export default appContent;
```

| Propiedad        | Tipo                               | Por Defecto | Descripción                                                                                                                         |
| :--------------- | :--------------------------------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'`  | **Obsoleto**: Utiliza `dictionary.importMode` en su lugar. Determina cómo se cargan los diccionarios (ver detalles a continuación). |

La configuración `importMode` dicta la manera en que los contenidos del diccionario se inyectan en tu componente. Puedes fijarlo de forma global dentro del objeto `dictionary` en `intlayer.config.ts`, o para cada archivo en particular.

### 1. Modo Estático (`default`)

En el modo estático, Intlayer reemplaza `useIntlayer` por `useDictionary` e inserta el diccionario directamente en el paquete de JavaScript.

- **Ventajas:** Renderizado instantáneo (sincrónico), cero llamadas de red extra durante la hidratación (hydration).
- **Desventajas:** El paquete contendrá las traducciones de **todos** los idiomas posibles que ese componente pudiese alcanzar.
- **Mejor para:** Aplicaciones de una sola página (SPA).

**Ejemplo de código transformado:**

```tsx
// Tu código fuente
const content = useIntlayer("my-key");

// Ilustración del código optimizado después de la transformación (Static)
// Este código solo es de referencia y puede variar de forma interna
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    },
  },
});
```

### 2. Modo Dinámico

En el modo dinámico, Intlayer sustituye `useIntlayer` con `useDictionaryAsync`. Para ello emplea importaciones dinámicas `import()` como mecanismo de Lazy Loading cargando el archivo de su propio lenguaje de modo pertinente.

- **Ventajas:** **Tree shaking a nivel de idioma.** El usuario que navega tu portal en español, solo descargará el JSON en español. El JSON en francés jamás será consumido.
- **Desventajas:** Dispara una llamada HTTP adicional (asset) desde cada uno de los elementos presentes al hidratarse.
- **Mejor para:** Textos pesados o portales globales donde prime la velocidad y reducir el gasto del paquete o (bundle size).

**Ejemplo de código transformado:**

```tsx
// Tu código fuente
const content = useIntlayer("my-key");

// Ilustración de código dinámico procesado
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  es: () =>
    import(".intlayer/dynamic_dictionary/my-key/es.json").then(
      (mod) => mod.default
    ),
});
```

> Al usar `importMode: 'dynamic'`, debes tener en cuenta que, si hay 100 componentes distintos llamando a `useIntlayer` en una pantalla, el navegador hará 100 descargas diminutas por separado. Trata de limitar dichas peticiones, creando, por ejemplo, archivos de diccionario que abarquen más de un átomo o grupo y unifica su llamado por vista. Varios archivos de contenido pueden tener a su vez la misma clave dictada fusionándose automáticamente.

### 3. Modo Fetch

Trabaja de un modo afín al Dinámico, con la disyuntiva de tratar de consultar su modelo hacia la API remota de "Intlayer Live Sync". Confiando de primera mano sobre este y recayendo en la importación dinámica en el fallo de este.

**Ejemplo de código transformado:**

```tsx
// Tu código fuente
const content = useIntlayer("my-key");

// Código Fetch procesado de modo ilustrativo
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  es: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/es").then((res) =>
      res.json()
    ),
});
```

> Aprende más desde la guía del CMS: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)

> Recordamos que con el modo "Fetch", el código original prevalecerá y sus elementos no se purgarán ni formarán parte de una minificación preestablecida.

## Resumen: Estático vs Dinámico

| Característica              | Modo Estático                               | Modo Dinámico                                 |
| :-------------------------- | :------------------------------------------ | :-------------------------------------------- |
| **Tamaño JS del paquete**   | Alto (Integra todos los locales existentes) | Pequeño (Baja solo su modelo correspondiente) |
| **Carga Inicial**           | Instantánea                                 | Ligera demora o espera                        |
| **Llamadas de red (Fetch)** | 0 adicionales                               | 1 por key del diccionario                     |
| **Tree Shaking**            | Presente desde el componente                | Desde el componente + Local                   |
| **Mejor uso para:**         | Elementos visuales, Apps ligeras            | Enormes bloques de texto, Múltiples regiones  |
