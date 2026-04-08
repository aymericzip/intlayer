---
createdAt: 2025-11-25
updatedAt: 2026-04-08
title: Optimización del tamaño y rendimiento del bundle i18n
description: Reduzca el tamaño del bundle de su aplicación optimizando el contenido de internacionalización (i18n). Aprenda a aprovechar el tree shaking y la carga diferida para los diccionarios con Intlayer.
keywords:
  - Optimización de bundle
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
  - version: 8.7.0
    date: 2026-04-08
    changes: "Se añadieron las opciones `minify` y `purge` a la configuración de construcción"
---

# Optimización del tamaño y rendimiento del bundle i18n

Uno de los desafíos más comunes con las soluciones i18n tradicionales que dependen de archivos JSON es la gestión del tamaño del contenido. Si los desarrolladores no separan manualmente el contenido en namespaces, los usuarios a menudo terminan descargando traducciones para cada página y potencialmente para cada idioma solo para ver una sola página.

Por ejemplo, una aplicación con 10 páginas traducidas a 10 idiomas podría resultar en que un usuario descargue el contenido de 100 páginas, aunque solo necesite **una** (la página actual en el idioma actual). Esto conduce a un desperdicio de ancho de banda y tiempos de carga más lentos.

**Intlayer resuelve este problema a través de la optimización en tiempo de compilación.** Analiza su código para detectar qué diccionarios se usan realmente por componente y reinyecta solo el contenido necesario en su bundle.

## Tabla de contenidos

<TOC />

## Escanee su bundle

Analizar su bundle es el primer paso para identificar archivos JSON "pesados" y oportunidades de división de código (code-splitting). Estas herramientas generan un mapa de árbol visual del código compilado de su aplicación, lo que le permite ver exactamente qué librerías están consumiendo más espacio.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite utiliza Rollup internamente. El complemento `rollup-plugin-visualizer` genera un archivo HTML interactivo que muestra el tamaño de cada módulo en su gráfico.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Abrir automáticamente el informe en su navegador
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

Para proyectos que utilizan App Router y Turbopack, Next.js proporciona un analizador experimental integrado que no requiere dependencias adicionales.

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

Si está utilizando el empaquetador Webpack predeterminado en Next.js, use el analizador de bundle oficial. Actívelo configurando una variable de entorno durante su construcción.

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
  // Su configuración de Next.js
});
```

**Uso:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Webpack estándar

Para Create React App (ejected), Angular o configuraciones personalizadas de Webpack, use el estándar de la industria `webpack-bundle-analyzer`.

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

Intlayer utiliza un **enfoque por componente**. A diferencia de los archivos JSON globales, su contenido se define junto o dentro de sus componentes. Durante el proceso de construcción, Intlayer:

1.  **Analiza** su código para encontrar llamadas a `useIntlayer`.
2.  **Construye** el contenido del diccionario correspondiente.
3.  **Reemplaza** la llamada a `useIntlayer` con código optimizado basado en su configuración.

Esto garantiza que:

- Si un componente no se importa, su contenido no se incluye en el bundle (eliminación de código muerto).
- Si un componente se carga de forma diferida (lazy-loading), su contenido también se carga de forma diferida.

## Configuración por plataforma

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js requiere el complemento `@intlayer/swc` para manejar la transformación, ya que Next.js utiliza SWC para las construcciones.

> Este complemento no se instala de forma predeterminada porque los complementos de SWC todavía son experimentales para Next.js. Podría cambiar en el futuro.

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

 </Tab>
 <Tab value="vite">

### Vite

Vite utiliza el complemento `@intlayer/babel`, que se incluye como dependencia de `vite-intlayer`. La optimización está habilitada de forma predeterminada. No hay nada más que hacer.

 </Tab>
 <Tab value="webpack">

### Webpack

Para habilitar la optimización del bundle con Intlayer en Webpack, debe instalar y configurar el complemento Babel (`@intlayer/babel`) o SWC (`@intlayer/swc`) adecuado.

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

```typescript fileName="babel.config.js"
const { getOptimizePluginOptions } = require("@intlayer/babel");

module.exports = {
  plugins: [[intlayerOptimizeBabelPlugin, getOptimizePluginOptions()]],
};
```

 </Tab>
</Tabs>

## Configuración

Puede controlar cómo Intlayer optimiza su bundle a través de la propiedad `build` en su `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    /**
     * Minificar los diccionarios para reducir el tamaño del bundle.
     */
     minify: true;

    /**
     * Purgar las claves no utilizadas en los diccionarios
     */
     purge: true;

    /**
     * Indica si la construcción debe verificar los tipos de TypeScript
     */
    checkTypes: false;
  },
};

export default config;
```

> Se recomienda mantener la opción predeterminada para `optimize` en la gran mayoría de los casos.

> Consulte la documentación de configuración para más detalles: [Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)

### Opciones de construcción

Las siguientes opciones están disponibles bajo el objeto de configuración `build`:

| Propiedad      | Tipo      | Predeterminado | Descripción                                                                                                                                                                                                             |
| :------------- | :-------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean` | `undefined`    | Controla si la optimización de la construcción está habilitada. Si es `true`, Intlayer reemplaza las llamadas a diccionarios con inyecciones optimizadas. Si es `false`, la optimización se deshabilita. Ideal en prod. |
| **`minify`**   | `boolean` | `false`        | Si se deben minificar los diccionarios para reducir el tamaño del bundle.                                                                                                                                               |
| **`purge`**    | `boolean` | `false`        | Si se deben purgar las claves no utilizadas en los diccionarios.                                                                                                                                                        |

### Minificación

Minificar diccionarios elimina espacios en blanco innecesarios, comentarios y reduce el tamaño del contenido JSON. Esto es especialmente útil para diccionarios grandes.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Nota: La minificación se ignora si `optimize` está deshabilitado o si el Editor Visual está habilitado (ya que el editor necesita el contenido completo para permitir la edición).

### Purgado

El purgado garantiza que solo las claves realmente utilizadas en su código se incluyan en el bundle final de diccionarios. Esto puede reducir significativamente el tamaño de su bundle si tiene diccionarios grandes con muchas claves que no se usan en todas las partes de su aplicación.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

> Nota: El purgado se ignora si `optimize` está deshabilitado.

### Modo de importación

Para aplicaciones grandes, que incluyen varias páginas y configuraciones regionales, sus archivos JSON pueden representar una parte significativa del tamaño de su bundle. Intlayer le permite controlar cómo se cargan los diccionarios.

El modo de importación puede definirse por defecto globalmente en su archivo `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

Así como para cada diccionario en sus archivos `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5}}`.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Sobrescribir el modo de importación predeterminado
  content: {
    // ...
  },
};

export default appContent;
```

| Propiedad        | Tipo                               | Predeterminado | Descripción                                                                                                                     |
| :--------------- | :--------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'`     | **Obsoleto**: Use `dictionary.importMode` en su lugar. Determina cómo se cargan los diccionarios (ver detalles a continuación). |

La configuración `importMode` dicta cómo se inyecta el contenido del diccionario en su componente.
Puede definirlo globalmente en el archivo `intlayer.config.ts` bajo el objeto `dictionary`, o puede sobrescribirlo para un diccionario específico en su archivo `.content.ts`.

### 1. Modo estático (`default`)

En modo estático, Intlayer reemplaza `useIntlayer` con `useDictionary` e inyecta el diccionario directamente en el bundle de JavaScript.

- **Pros:** Renderizado instantáneo (síncrono), cero solicitudes de red adicionales durante la hidratación.
- **Contras:** El bundle incluye traducciones para **todos** los idiomas disponibles para ese componente específico.
- **Ideal para:** Aplicaciones de una sola página (SPA).

**Ejemplo de código transformado:**

```tsx
// Su código
const content = useIntlayer("my-key");

// Código optimizado (Estatico)
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      fr: "Mon titre",
    },
  },
});
```

### 2. Modo dinámico

En modo dinámico, Intlayer reemplaza `useIntlayer` con `useDictionaryAsync`. Esto utiliza `import()` (mecanismo similar a Suspense) para cargar de forma diferida específicamente el JSON para la configuración regional actual.

- **Pros:** **Tree shaking a nivel de locale.** Un usuario que vea la versión en inglés _solo_ descargará el diccionario en inglés. El diccionario en francés nunca se carga.
- **Contras:** Activa una solicitud de red (obtención de activos) por componente durante la hidratación.
- **Ideal para:** Bloques de texto grandes, artículos o aplicaciones que admiten muchos idiomas donde el tamaño del bundle es crítico.

**Ejemplo de código transformado:**

```tsx
// Su código
const content = useIntlayer("my-key");

// Código optimizado (Dinámico)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  fr: () =>
    import(".intlayer/dynamic_dictionary/my-key/fr.json").then(
      (mod) => mod.default
    ),
});
```

> Al usar `importMode: 'dynamic'`, si tiene 100 componentes que usan `useIntlayer` en una sola página, el navegador intentará 100 descargas separadas. Para evitar esta "cascada" de solicitudes, agrupe el contenido en menos archivos `.content` (por ejemplo, un diccionario por sección de la página) en lugar de uno por componente átomo.

### 3. Modo Fetch

Se comporta de manera similar al modo dinámico, pero intenta obtener diccionarios de la API de Live Sync de Intlayer primero. Si la llamada a la API falla o el contenido no está marcado para actualizaciones en vivo, recurre a la importación dinámica.

> Consulte la documentación del CMS para más detalles: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)

> En modo fetch, no se pueden usar el purgado y la minificación.

## Resumen: Estático vs Dinámico

| Característica           | Modo estático                                             | Modo dinámico                             |
| :----------------------- | :-------------------------------------------------------- | :---------------------------------------- |
| **Tamaño del bundle JS** | Más grande (incluye todos los idiomas para el comp.)      | Más pequeño (solo código, sin contenido)  |
| **Carga inicial**        | Instantánea (El contenido está en el bundle)              | Ligero retraso (Obtiene el JSON)          |
| **Solicitudes de red**   | 0 solicitudes adicionales                                 | 1 solicitud por diccionario               |
| **Tree Shaking**         | A nivel de componente                                     | A nivel de componente + A nivel de locale |
| **Mejor caso de uso**    | Componentes de interfaz de usuario, aplicaciones pequeñas | Páginas con mucho texto, muchos idiomas   |
