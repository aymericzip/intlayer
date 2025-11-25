---
createdAt: 2025-11-25
updatedAt: 2025-11-25
title: Optimización del Tamaño y Rendimiento del Bundle i18n
description: Reduce el tamaño del bundle de la aplicación optimizando el contenido de internacionalización (i18n). Aprende a aprovechar tree shaking y lazy loading para diccionarios con Intlayer.
keywords:
  - Optimización de Bundle
  - Automatización de Contenido
  - Contenido Dinámico
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 6.0.0
    date: 2025-11-25
    changes: Historial inicial
---

# Optimización del Tamaño y Rendimiento del Bundle i18n

Uno de los desafíos más comunes con las soluciones tradicionales de i18n que dependen de archivos JSON es gestionar el tamaño del contenido. Si los desarrolladores no separan manualmente el contenido en namespaces, los usuarios a menudo terminan descargando las traducciones de todas las páginas y potencialmente de todos los idiomas solo para ver una sola página.

Por ejemplo, una aplicación con 10 páginas traducidas a 10 idiomas podría hacer que un usuario descargue el contenido de 100 páginas, aunque solo necesite **una** (la página actual en el idioma actual). Esto conduce a un desperdicio de ancho de banda y tiempos de carga más lentos.

> Para detectarlo, puedes usar analizadores de bundle como `rollup-plugin-visualizer` (vite), `@next/bundle-analyzer` (next.js) o `webpack-bundle-analyzer` (React CRA / Angular / etc).

**Intlayer resuelve este problema mediante la optimización en tiempo de compilación.** Analiza tu código para detectar qué diccionarios se usan realmente por componente y reinserta solo el contenido necesario en tu bundle.

## Tabla de Contenidos

<TOC />

## Cómo Funciona

Intlayer utiliza un **enfoque por componente**. A diferencia de los archivos JSON globales, tu contenido se define junto a tus componentes o dentro de ellos. Durante el proceso de compilación, Intlayer:

1.  **Analiza** tu código para encontrar llamadas a `useIntlayer`.
2.  **Construye** el contenido del diccionario correspondiente.
3.  **Reemplaza** la llamada a `useIntlayer` con código optimizado basado en tu configuración.

Esto garantiza que:

- Si un componente no se importa, su contenido no se incluye en el bundle (Eliminación de Código Muerto).
- Si un componente se carga de forma lazy, su contenido también se carga de forma lazy.

## Configuración por Plataforma

### Next.js

Next.js requiere el plugin `@intlayer/swc` para manejar la transformación, ya que Next.js utiliza SWC para las compilaciones.

> Este plugin está instalado por defecto porque los plugins SWC aún son experimentales para Next.js. Esto podría cambiar en el futuro.

### Vite

Vite utiliza el plugin `@intlayer/babel` que está incluido como dependencia de `vite-intlayer`. La optimización está habilitada por defecto.

### Webpack

Para habilitar la optimización del bundle con Intlayer en Webpack, necesitas instalar y configurar el plugin adecuado de Babel (`@intlayer/babel`) o SWC (`@intlayer/swc`).

### Expo / Lynx

La optimización del bundle **no está disponible aún** para esta plataforma. El soporte será añadido en una versión futura.

## Configuración

Puedes controlar cómo Intlayer optimiza tu bundle a través de la propiedad `build` en tu archivo `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  build: {
    optimize: true,
    importMode: "static", // o 'dynamic'
    traversePattern: ["**/*.{js,ts,mjs,cjs,jsx,tsx}", "!**/node_modules/**"],
  },
};

export default config;
```

> Se recomienda mantener la opción por defecto para `optimize` en la mayoría de los casos.

> Consulta la documentación de configuración para más detalles: [Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)

### Opciones de Build

Las siguientes opciones están disponibles bajo el objeto de configuración `build`:

| Propiedad             | Tipo                            | Valor por defecto               | Descripción                                                                                                                                                                                                                                                  |
| :-------------------- | :------------------------------ | :------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`**        | `boolean`                       | `undefined`                     | Controla si la optimización de la build está habilitada. Si es `true`, Intlayer reemplaza las llamadas al diccionario con inyecciones optimizadas. Si es `false`, la optimización está deshabilitada. Idealmente se debe establecer en `true` en producción. |
| **`importMode`**      | `'static' , 'dynamic' , 'live'` | `'static'`                      | Determina cómo se cargan los diccionarios (ver detalles a continuación).                                                                                                                                                                                     |
| **`traversePattern`** | `string[]`                      | `['**/*.{js,ts,jsx,tsx}', ...]` | Patrones glob que definen qué archivos Intlayer debe escanear para la optimización. Úsalo para excluir archivos no relacionados y acelerar las builds.                                                                                                       |
| **`outputFormat`**    | `'esm', 'cjs'`                  | `'esm', 'cjs'`                  | Controla el formato de salida de los diccionarios construidos.                                                                                                                                                                                               |

## Modos de Importación

La configuración `importMode` dicta cómo se inyecta el contenido del diccionario en tu componente.

### 1. Modo Estático (`default`)

En modo estático, Intlayer reemplaza `useIntlayer` por `useDictionary` e inyecta el diccionario directamente en el bundle de JavaScript.

- **Ventajas:** Renderizado instantáneo (síncrono), sin solicitudes de red adicionales durante la hidratación.
- **Desventajas:** El bundle incluye traducciones para **todos** los idiomas disponibles para ese componente específico.
- **Ideal para:** Aplicaciones de una sola página (SPA).

**Ejemplo de código transformado:**

```tsx
// Tu código
const content = useIntlayer("my-key");

// Código optimizado (Estático)
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

### 2. Modo Dinámico

En modo dinámico, Intlayer reemplaza `useIntlayer` por `useDictionaryAsync`. Esto utiliza `import()` (mecanismo similar a Suspense) para cargar perezosamente específicamente el JSON para la localidad actual.

- **Ventajas:** **Eliminación de código a nivel de localidad.** Un usuario que vea la versión en inglés solo descargará el diccionario en inglés. El diccionario en francés nunca se carga.
- **Desventajas:** Genera una solicitud de red (descarga de recurso) por componente durante la hidratación.
- **Ideal para:** Bloques grandes de texto, artículos o aplicaciones que soportan muchos idiomas donde el tamaño del bundle es crítico.

**Ejemplo de código transformado:**

```tsx
// Tu código
const content = useIntlayer("my-key");

// Código optimizado (Dinámico)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/en.json").then((mod) => mod.default),
  fr: () =>
    import(".intlayer/dynamic_dictionary/fr.json").then((mod) => mod.default),
});
```

> Al usar `importMode: 'dynamic'`, si tienes 100 componentes usando `useIntlayer` en una sola página, el navegador intentará realizar 100 solicitudes separadas. Para evitar esta "cascada" de peticiones, agrupa el contenido en menos archivos `.content` (por ejemplo, un diccionario por sección de página) en lugar de uno por componente átomo.

> Actualmente, `importMode: 'dynamic'` no está completamente soportado para Vue y Svelte. Se recomienda usar `importMode: 'static'` para estos frameworks hasta futuras actualizaciones.

### 3. Modo Live

Se comporta de manera similar al modo Dinámico, pero intenta obtener primero los diccionarios desde la API de Intlayer Live Sync. Si la llamada a la API falla o el contenido no está marcado para actualizaciones en vivo, vuelve a la importación dinámica.

> Consulta la documentación del CMS para más detalles: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)

## Resumen: Estático vs Dinámico

| Característica           | Modo Estático                                             | Modo Dinámico                            |
| :----------------------- | :-------------------------------------------------------- | :--------------------------------------- |
| **Tamaño del Bundle JS** | Más grande (incluye todos los idiomas para el componente) | Más pequeño (solo código, sin contenido) |

Se comporta de manera similar al modo Dinámico pero intenta obtener los diccionarios primero desde la API de Intlayer Live Sync. Si la llamada a la API falla o el contenido no está marcado para actualizaciones en vivo, vuelve a la importación dinámica.

> Consulte la documentación del CMS para más detalles: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)

## Resumen: Estático vs Dinámico

| Característica           | Modo Estático                                             | Modo Dinámico                             |
| :----------------------- | :-------------------------------------------------------- | :---------------------------------------- |
| **Tamaño del Bundle JS** | Más grande (incluye todos los idiomas para el componente) | Más pequeño (solo código, sin contenido)  |
| **Carga Inicial**        | Instantánea (El contenido está en el bundle)              | Ligera demora (Obtiene JSON)              |
| **Solicitudes de Red**   | 0 solicitudes adicionales                                 | 1 solicitud por diccionario               |
| **Tree Shaking**         | A nivel de componente                                     | A nivel de componente + a nivel de idioma |
| **Mejor Caso de Uso**    | Componentes UI, Aplicaciones pequeñas                     | Páginas con mucho texto, Muchos idiomas   |
