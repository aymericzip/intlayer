---
createdAt: 2026-09-23
updatedAt: 2026-09-23
priority: 8
title: ¿Es Intlayer más ligero que Paraglide?
description: Paraglide parece casi gratuito en los benchmarks de i18n porque su código se genera en tu repositorio. Aquí te mostramos a dónde va realmente ese peso, por qué la resolución de locale por nodo tiene un coste y cómo la carga dinámica de Intlayer envía un solo idioma en lugar de todos.
keywords:
  - Paraglide
  - Intlayer
  - Internacionalización
  - i18n
  - Bundle size
  - Tree shaking
  - Benchmark
  - Blog
slugs:
  - blog
  - is-intlayer-lighter-than-paraglide
author: aymericzip
---

# ¿Es Intlayer más ligero que Paraglide?

Sí.

`Paraglide` tiene una sólida reputación por ser la solución de i18n más ligera del mercado, y a primera vista el [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md) coincide: el tamaño de su biblioteca es cercano a cero. Pero un tamaño de biblioteca de cero no significa que se envíen cero bytes. Significa que los bytes residen en un lugar donde la métrica no mira.

<TOC/>

## Puntos clave

**El tamaño de la biblioteca está oculto, no eliminado:**

Paraglide genera su runtime y funciones de mensajes dentro de tu codebase. Ese código se envía al navegador, pero se contabiliza como _tu_ código, no como el de la biblioteca.

**Prescindir de un provider no es una ganancia gratuita:**

Cada llamada a `m.my_key()` resuelve el locale por su cuenta, leyendo la cookie o el storage en cada nodo renderizado, en lugar de leerlo una sola vez desde un contexto.

**Sin carga dinámica:**

Paraglide importa todos los idiomas de un mensaje dentro del bundle de tu cliente. Intlayer con `importMode: 'dynamic'` o `'fetch'` carga únicamente el idioma que se está renderizando.

**El tree shaking no está garantizado:**

En algunos de nuestros benchmarks, el tree shaking anunciado por Paraglide no surtió efecto. Comprueba tu propio bundle.

## ¿A dónde va el peso de Paraglide?

En los informes de benchmark, la métrica "tamaño de la biblioteca" mide el provider y los hooks de cada biblioteca de i18n en un componente vacío, antes de agregar cualquier contenido.

| Biblioteca (TanStack Start)   | Tamaño lib (gz) | Tamaño lib (min) |
| ----------------------------- | --------------- | ---------------- |
| `@inlang/paraglide-js@2.15.1` | 1.8 KB          | 4.5 KB           |
| `react-intlayer@9.5.1`        | 5.0 KB          | 15.2 KB          |

Visto de forma aislada, Paraglide gana. Pero Paraglide es un compilador: lee tus archivos `messages/*.json` y escribe una carpeta `paraglide/` en tu repositorio, la cual contiene un archivo `runtime.js` (detección de locale, estrategias de cookies y storage, localización de URLs) y una función de JavaScript por cada mensaje.

```bash
src/paraglide/
├── runtime.js      # detección de locale, estrategias, helpers de URL
├── server.js
├── messages.js     # reexporta cada mensaje
└── messages/
    ├── _index.js
    ├── en.js
    └── fr.js
```

Debido a que este código se encuentra en tu carpeta `src/` y lo importas mediante una ruta relativa, el bundler lo atribuye a tu aplicación y no a un paquete en `node_modules`. La columna del tamaño de la biblioteca muestra casi nada, mientras que la misma lógica se sigue enviando en el bundle de tu página.

Generar código no es una mala idea en sí misma: el runtime generado solo incluye la lógica que tu configuración necesita (estrategia de prefijo, cookie frente a local storage, etc.). Intlayer alcanza el mismo resultado de forma diferente, inyectando variables de entorno en tiempo de compilación para que el bundler elimine las ramas que tu configuración no utiliza. Ambos enfoques terminan siendo de 3 a 10 veces más ligeros que `i18next` o `next-intl`.

Por lo tanto, la comparación justa no es el tamaño de la biblioteca. Es **el JavaScript que realmente se envía por página**.

## Peso por página, medido

Aplicación TanStack Start, 10 páginas, medido en las rutas `en` y `fr`, comprimido con gzip:

| Configuración                      | JS pág prom (gz) | Sobre la base | Fuga de locale | Fuga de otras páginas |
| ---------------------------------- | ---------------- | ------------- | -------------- | --------------------- |
| Base (sin i18n)                    | 111.0 KB         | -             | 0.0%           | 0.0%                  |
| `paraglide` (cualquier estrategia) | 125.1 KB         | +14.1 KB      | 49.7%          | 0.0%                  |
| `intlayer` (`importMode: static`)  | 125.8 KB         | +14.8 KB      | 50.0%          | 0.0%                  |
| `intlayer` (`importMode: dynamic`) | **118.6 KB**     | **+7.6 KB**   | **0.0%**       | **0.0%**              |

Next.js 16 App Router, misma aplicación:

| Configuración    | JS pág prom (gz) | Sobre la base |
| ---------------- | ---------------- | ------------- |
| Base (sin i18n)  | 141.0 KB         | -             |
| `paraglide-next` | 155.3 KB         | +14.3 KB      |
| `next-intlayer`  | **141.3 KB**     | **+0.3 KB**   |

<I18nBenchmark framework="tanstack" vertical/>

> Datos completos en el [informe de benchmark de TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md) y en el [informe de benchmark de Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/nextjs.md). Cada bundle se puede inspeccionar en el [repositorio del benchmark](https://github.com/intlayer-org/benchmark-i18n).

Dos conclusiones destacan con claridad:

- En modo `static`, Intlayer envía prácticamente el mismo contenido que Paraglide (125.8 KB frente a 125.1 KB). Esto es lo esperado: ambos incluyen todos los idiomas de los mensajes que utiliza una página.
- Paraglide permanece en 125.1 KB independientemente de la estrategia, porque carece de un modo dinámico. Cada línea en la tabla anterior equivale a la opción estática.

## Sin Provider: una buena idea que no lo es

Paraglide no requiere provider. Importas un mensaje y lo ejecutas:

```tsx fileName="Hero.tsx"
import { m } from "../paraglide/messages.js";

export const Hero = () => (
  <section>
    <h1>{m.hero_title()}</h1>
    <p>{m.hero_description()}</p>
    <button>{m.hero_cta()}</button>
  </section>
);
```

Sin contexto, sin wrapper, sin hook. Parece más sencillo. Sin embargo, el locale tiene que provenir de algún lugar. Cada función de mensaje generada se parece a esto (simplificado):

```js fileName="paraglide/messages/_index.js"
export const hero_title = (inputs = {}, options = {}) => {
  const locale = options.locale ?? getLocale(); // se resuelve en cada llamada

  if (locale === "en") return en.hero_title(inputs);
  if (locale === "fr") return fr.hero_title(inputs);
  // ...una rama por idioma
};
```

Y `getLocale()` recorre las estrategias configuradas (cookie, local storage, URL, locale base) para determinar el locale activo. De modo que cada nodo de texto que renderizas (`<>{m.my_key()}</>`) ejecuta su propia resolución de locale, lo que incluye leer `document.cookie` en el navegador. Una página con 200 cadenas traducidas resuelve el locale 200 veces por renderizado, y nuevamente en cada re-renderizado.

Una biblioteca basada en un provider lee el locale **una sola vez**, lo almacena en un contexto (o en una señal, o en un store), y cada nodo lee un valor que ya está en memoria. El provider cuesta unos pocos cientos de bytes. Omitirlo cuesta ciclos de CPU en cada renderizado, lo cual se refleja en el benchmark: los tiempos de carga de página y de cambio de idioma de Paraglide quedan sistemáticamente por detrás de Intlayer en TanStack Start (22.1 ms frente a 14.6 ms en carga de página, 4.3 ms frente a 3.2 ms en reactividad E2E).

## Experiencia de desarrollo

La fuente de verdad de Paraglide es JSON, pero nunca importas el JSON directamente. Importas el archivo `.js` generado:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "hero_title": "Ship your app in every language"
}
```

```json fileName="messages/es.json"
{
  "hero_title": "Publica tu app en todos los idiomas"
}
```

```tsx fileName="Hero.tsx"
// Solo existe después de que el compilador lo regenere desde el JSON
import { m } from "../paraglide/messages.js";

export const Hero = () => <h1>{m.hero_title()}</h1>;
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      es: "Publica tu app en todos los idiomas",
      en: "Ship your app in every language",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
```

  </Tab>
</Tabs>

Ese ciclo de trabajo tiene un coste:

- Cada cambio en un archivo JSON requiere una regeneración antes de que la importación se resuelva o los tipos se actualicen.
- La carpeta generada `paraglide/` o bien se incluye en el control de versiones, lo que genera conflictos de merge en archivos generados en cada PR que toque textos, o bien se ignora en git, lo que exige un paso de generación previo a cada verificación de tipos, test y tarea de CI.
- Cada cadena de texto se convierte en una llamada a función. Las constantes pasan a ser `m.key()` por todas partes, incluso donde un valor plano sería suficiente.

## Tree Shaking: revisa tu bundle

La principal promesa de Paraglide es que los mensajes no utilizados se eliminan mediante tree shaking, dado que cada mensaje representa una exportación independiente. En el benchmark de Svelte + Vite, funciona tal como se describe.

En otros entornos, no fue así. En nuestras pruebas con [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/nextjs.md), las páginas de Paraglide pesan 14 KB más que la aplicación base, mientras que `next-intlayer` solo añade 0.3 KB. Pruebas anteriores en TanStack Start demostraron que mensajes de otras páginas también terminaban incorporándose en el bundle de la ruta.

El tree shaking depende de tu bundler (Turbopack, Rolldown, Rollup), de la forma en que se importan los mensajes (`import { m }` frente a `import * as m`) y del análisis de efectos secundarios. Si eliges Paraglide por su tamaño, abre tu visualizador de bundle y comprueba que se cumpla en tu aplicación.

## Sin carga dinámica

Este es el límite estructural. Paraglide no dispone de un mecanismo para cargar un solo idioma a la vez: cada función de mensaje importa de manera estática la implementación de cada idioma, por lo que todos los idiomas acaban en el bundle de tu cliente.

Con 2 idiomas, se desperdicia la mitad de los datos de traducción, lo cual coincide con el ~50% de fuga de locale medido anteriormente. Con 10 idiomas, el 90%. Con 30 idiomas, el 97%.

Pasar a una carga dinámica tampoco solucionaría el problema: al tener una función por mensaje, cargar cada función de forma diferida implicaría miles de peticiones individuales.

Intlayer te permite elegir la estrategia, ya sea de forma global o por diccionario:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic", // 'static' | 'dynamic' | 'fetch'
  },
};

export default config;
```

| `importMode` | Qué se envía al cliente                                     | vs. Paraglide                        |
| ------------ | ----------------------------------------------------------- | ------------------------------------ |
| `static`     | Todos los idiomas de los diccionarios que usa la página     | Teóricamente el mismo contenido      |
| `dynamic`    | Solo el idioma actual, cargado bajo demanda por diccionario | **N veces más ligero** con N idiomas |
| `fetch`      | Solo el idioma actual, obtenido desde la Live Sync API      | **N veces más ligero** con N idiomas |

Mediante la [transformación en compilación](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md) y el modo `importMode: 'static'`, Intlayer carga, en teoría, exactamente el mismo contenido que Paraglide. Con `'dynamic'` o `'fetch'`, carga únicamente lo que requiere el idioma actual: para una aplicación en N idiomas, la carga de traducción es N veces menor que la de Paraglide.

## Dónde sigue encajando Paraglide

<AccordionGroup>
<Accordion header="Svelte + Vite con pocos idiomas">

Si tu stack es Svelte con Vite y manejas dos o tres idiomas, el tree shaking funciona como se anuncia y la sobrecarga de idiomas se mantiene baja.

</Accordion>
<Accordion header="Flujo de trabajo existente con inlang">

Si tu equipo ya utiliza el ecosistema inlang (Fink, Sherlock, plugins de formato de mensajes), Paraglide se integra con él de forma nativa.

</Accordion>
</AccordionGroup>

## Pruébalo en tu aplicación

Comprueba el tamaño y las fugas de locale de tu aplicación en producción con el [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner) gratuito:

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

Para configurar Intlayer:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

## Lecturas complementarias

- [Benchmark de i18n en TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md)
- [Benchmark de i18n en Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/nextjs.md)
- [Optimización de bundles e `importMode`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/bundle_optimization.md)
- [Cómo elegir una biblioteca de i18n para React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/how_to_pick_react_i18n_library.md)
- [Los argumentos a favor y en contra de la i18n basada en compiladores](https://github.com/aymericzip/intlayer/blob/main/docs/blog/es/compiler_vs_declarative_i18n.md)
