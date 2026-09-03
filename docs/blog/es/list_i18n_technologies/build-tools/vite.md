---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Vite i18n: imports glob, chunks y mensajes en tiempo de compilación"
description: Lo que realmente es específico de Vite en i18n. Catálogos lazy con import.meta.glob, por qué la división por ruta rara vez divide, carencias de HMR y plugins al compilar.
keywords:
  - vite i18n
  - import.meta.glob
  - vite code splitting
  - lazy load traducciones
  - vite plugin i18n
  - rollup chunks
slugs:
  - blog
  - i18n-technologies
  - build-tools
  - vite
author: aymericzip
---

# Vite i18n: los aspectos propios de Vite, no de tu framework

La mayoría de los tutoriales de "Vite i18n" son en realidad tutoriales de React o Vue que casualmente usan Vite. Este artículo aborda la capa inferior: cómo se importan los catálogos, qué hace Rollup con ellos y por qué la carga diferida (lazy loading) que escribiste probablemente no sea tan diferida como crees.

## Tabla de contenidos

<TOC/>

## La importación estática es la opción predeterminada, y es síncrona

La configuración más elemental importa cada catálogo en la parte superior de un módulo.

```ts fileName="src/i18n.ts"
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ja from "./locales/ja.json";
```

Eso introduce tres catálogos en el chunk de entrada principal, en cada página, para cada visitante. Es admisible para dos idiomas y un centenar de cadenas. Con diez idiomas se convierte en el mayor costo innecesario de todo el bundle.

## `import.meta.glob` y el parámetro que casi todos configuran mal

La importación por patrones (glob import) de Vite es la solución estándar.

```ts
const catalogs = import.meta.glob("./locales/*.json");

export const loadCatalog = async (locale: string) => {
  const load = catalogs[`./locales/${locale}.json`];
  return (await load()) as Record<string, string>;
};
```

La carga diferida viene activada por defecto: cada entrada es una función que retorna una importación dinámica, y Rollup emite un chunk por archivo. Añadir `{ eager: true }` incrusta todos los catálogos directamente en el módulo que importa, exactamente lo contrario de lo que buscabas evitar.

```ts
// Todos los idiomas en el chunk de entrada. Casi nunca es lo deseado.
const catalogs = import.meta.glob("./locales/*.json", { eager: true });
```

La trampa radica en que ambas variantes funcionan en desarrollo, ya que Vite sirve módulos individuales sin empaquetar. La diferencia solo se hace visible en la carpeta `dist`. Compruébalo con `npx vite build && npx vite preview` y analiza qué contiene realmente el chunk de entrada.

## La división por ruta rara vez divide los catálogos

Este es el comportamiento que suele sorprender a los desarrolladores. Divides los catálogos por vista:

```
locales/en/home.json
locales/en/checkout.json
```

Luego dos rutas distintas importan `checkout.json`, y Rollup eleva ese archivo a un chunk compartido que se descarga en ambas páginas. La partición de Rollup se guía por el grafo de módulos y no por el nombre de tus carpetas: cualquier módulo alcanzable desde más de un punto de entrada pasa a ser común. Agregar una tercera ruta no cambia nada, y una cuarta puede provocar una reorganización imprevista.

Por lo tanto, la división de idiomas por ruta solo se sostiene si el grafo de importaciones es estrictamente disjunto. Si el tamaño de tu bundle importa, verifícalo con datos y no con suposiciones:

```bash
npx vite build && npx vite-bundle-visualizer
```

Si necesitas forzar los límites de empaquetado, `build.rollupOptions.output.manualChunks` es el mecanismo de escape, con el costo de requerir mantenimiento manual.

## Los catálogos no recargan en caliente (HMR)

Modificas un componente y Vite lo actualiza al instante. Modificas `locales/fr.json` y, según cómo haya sido importado, no ocurre nada. El JSON importado dinámicamente carece de un límite HMR nativo, por lo que el grafo de dependencias no sabe cómo invalidar los módulos consumidores.

Muchos equipos sortean esto reiniciando el servidor de desarrollo ante cada cambio de texto, sin percatarse de que es evitable. La solución corresponde al plugin de i18n: debe aceptar la actualización de HMR e inyectar los nuevos mensajes en la aplicación en ejecución. Al evaluar una librería, verifica si su plugin de Vite implementa esto, pues representa una fricción diaria de desarrollo.

## `define` incrusta el idioma de forma irreversible

Es tentador resolver el idioma por defecto durante la compilación:

```ts fileName="vite.config.ts"
export default defineConfig({
  define: {
    __DEFAULT_LOCALE__: JSON.stringify(process.env.LOCALE ?? "en"),
  },
});
```

`define` ejecuta un reemplazo textual puro al compilar. El valor presente en el build es el que se distribuye, obligándote a realizar un build por cada idioma. Esa es una estrategia válida, adoptada por ejemplo por el sistema i18n nativo de Angular, pero no es lo adecuado si una única implementación debe atender todos los idiomas.

Para variables que deban variar por petición del usuario, evita `define` y resuélvelas en tiempo de ejecución.

## Mover el análisis de mensajes a tiempo de compilación

Cualquier opción madura en este ecosistema termina adoptando la misma estrategia: dejar de procesar mensajes en el navegador.

| Plugin                       | Lo que traslada a tiempo de compilación                                     |
| :--------------------------- | :-------------------------------------------------------------------------- |
| `@intlify/unplugin-vue-i18n` | Compila mensajes de vue-i18n a funciones de render (bundle de solo runtime) |
| Lingui (macro + plugin)      | Extrae y compila catálogos, sustituye macros por IDs de mensajes            |
| Paraglide (inlang)           | Compila cada mensaje en su propia función tree-shakable                     |
| `vite-intlayer`              | Construye diccionarios por componente, purga y minifica claves inactivas    |

La ventaja compartida es doble: el compilador de mensajes en runtime desaparece del bundle final y las entradas no utilizadas pueden eliminarse de forma estática. El costo asociado es que tanto tu servidor de desarrollo como tu CI requieren el plugin, y un comando `tsc` aislado o un ejecutor de pruebas ajeno a Vite requerirá configuración adicional.

vue-i18n es el caso más claro. Sin `@intlify/unplugin-vue-i18n` distribuyes un compilador que invoca `new Function`, lo que suma bytes superfluos y genera conflictos con la directiva Content Security Policy (CSP).

## SSR: nunca almacenes el idioma en variables de módulo

Si implementas SSR, sea mediante un framework o con `vite-plugin-ssr`, la regla inquebrantable es esta: una variable a nivel de módulo que guarde el idioma actual se comparte entre todas las solicitudes concurrentes que atienda ese proceso del servidor.

```ts
// Inofensivo en el navegador. Una fuga de datos entre peticiones en un servidor.
export let currentLocale = "en";
```

Dos usuarios que consulten el servidor al mismo tiempo competirán en una condición de carrera, y uno recibirá la respuesta en el idioma del otro. Esto no se reproduce en desarrollo porque eres el único visitante. Resuelve el idioma por cada petición y transmítelo explícitamente mediante contexto o mediante el almacenamiento de petición de tu framework.

## El plugin de Vite de Intlayer

Intlayer registra un único plugin que gestiona la compilación de diccionarios, la observación de cambios en desarrollo y la canalización de optimización.

```ts fileName="vite.config.ts"
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [react(), intlayer()],
});
```

La reescritura de importaciones, purga y minificación vienen activadas por defecto. Los dos parámetros clave se configuran en `intlayer.config.ts`:

```ts fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // descarta campos de contenido que ningún componente lea
    minify: true, // renombra las claves de contenido a identificadores breves
  },
};

export default config;
```

Dado que el contenido se declara por componente y no en gigantescos archivos por idioma, el proceso de purga dispone de un grafo de dependencias real sobre el que operar, haciendo segura la poda de código. El compromiso es el mencionado: el plugin es obligatorio en cualquier entorno donde se compile el código, incluidos CI y runners de tests. Más detalles en [optimización de bundles](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md).

## Errores habituales

- **`{ eager: true }` en un glob pensado para carga diferida.** Funciona en desarrollo, incluye todos los idiomas en producción.
- **Creer que la estructura de directorios genera chunks independientes.** Rollup sigue imports, no carpetas. Mide el build.
- **Reiniciar el servidor de desarrollo para ver cambios de texto.** Es indicio de un handler de HMR ausente, no algo normal.
- **Incrustar el idioma en `define`.** Te obliga a compilar un bundle distinto por cada idioma.
- **Guardar el estado de idioma a nivel de módulo en SSR.** Fuga entre peticiones indetectable en desarrollo local.
- **Evaluar rendimiento sobre el servidor de desarrollo.** Los módulos sin empaquetar no guardan relación con el bundle empaquetado.

## Para profundizar

- [Optimización del bundle: purga, minificación y lo que llega al navegador](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md)
- [Informes de benchmark entre frameworks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/index.md)
- [Referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)
- [Configurar Intlayer con Vite y React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_vite+react.md)
- [Adaptador de compatibilidad i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/compat/i18next.md)
- [React i18n: cómo funciona el modelo de providers](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/list_i18n_technologies/frameworks/react.md)
- [Vue i18n: cómo funciona y dónde tropieza](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/list_i18n_technologies/frameworks/vue.md)
- [i18n por componente vs centralizada](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/per-component_vs_centralized_i18n.md)
