---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: La mejor solución i18n para Next.js en 2026 - Informe de Benchmark
description: Compara librerías de internacionalización (i18n) para Next.js como next-intl, next-i18next e Intlayer. Informe detallado de rendimiento sobre tamaño del bundle, fugas y reactividad.
keywords:
  - benchmark
  - i18n
  - intl
  - nextjs
  - rendimiento
  - intlayer
slugs:
  - doc
  - benchmark
  - nextjs
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Inicio del benchmark"
---

# Librerías i18n para Next.js — Informe de Benchmark 2026

Esta página es un informe comparativo de soluciones i18n en Next.js.

## Tabla de Contenidos

<Toc/>

## Benchmark Interactivo

<I18nBenchmark framework="nextjs" vertical/>

## Referencia de resultados:

<iframe 
  src="https://github.com/intlayer-org/benchmark-i18n/blob/main/report/scripts/summarize-nextjs.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> https://github.com/intlayer-org/benchmark-i18n/blob/main/report/scripts/summarize-nextjs.md

Consulta el repositorio completo del benchmark [aquí](https://github.com/intlayer-org/benchmark-i18n).

## Introducción

Las librerías de internacionalización tienen un gran impacto en tu aplicación. El principal riesgo es cargar contenido para cada página y cada idioma cuando el usuario solo visita una página.

A medida que tu aplicación crece, el tamaño del bundle puede aumentar exponencialmente, lo que puede perjudicar notablemente el rendimiento.

Como ejemplo, en los peores casos, una vez internacionalizada, tu página puede terminar siendo casi 4 veces más grande.

Otro impacto de las librerías i18n es la ralentización del desarrollo. Transformar componentes en contenido bilingüe o multilingüe requiere mucho tiempo.

Debido a que el problema es difícil, existen muchas soluciones: algunas enfocadas en la DX (experiencia del desarrollador), otras en el rendimiento o la escalabilidad, y así sucesivamente.

Intlayer intenta optimizar en todas estas dimensiones.

## Pon a prueba tu aplicación

Para sacar a la luz estos problemas, he creado un escáner gratuito que puedes probar [aquí](https://intlayer.org/i18n-seo-scanner).

<iframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## El problema

Existen dos formas principales de limitar el impacto de una aplicación multilingüe en tu bundle:

- Dividir tu JSON (o contenido) en archivos / variables / namespaces para que el bundler pueda aplicar tree-shaking al contenido no utilizado en una página determinada.
- Cargar dinámicamente el contenido de tu página solo en el idioma del usuario.

Limitaciones técnicas de estos enfoques:

**Carga dinámica**

Incluso cuando declaras rutas como `[locale]/page.tsx`, con Webpack o Turbopack, e incluso si se define `generateStaticParams`, el bundler no trata `locale` como una constante estática. Eso significa que puede incluir el contenido de todos los idiomas en cada página. La forma principal de limitar esto es cargar el contenido a través de un import dinámico (por ejemplo, `import('./locales/${locale}.json')`).

Lo que sucede en tiempo de compilación es que Next.js emite un bundle JS por idioma (por ejemplo, `./locales_fr_12345.js`). Una vez que el sitio se envía al cliente, cuando la página se ejecuta, el navegador realiza una petición HTTP adicional para el archivo JS necesario (por ejemplo, `./locales_fr_12345.js`).

> Otra forma de abordar el mismo problema es usar `fetch()` para cargar el JSON dinámicamente. Así es como funciona `Tolgee` cuando el JSON reside en `/public`, o `next-translate`, que se basa en `getStaticProps` para cargar el contenido. El flujo es el mismo: el navegador realiza una petición HTTP adicional para cargar el recurso.

**División de contenido (Content splitting)**

Si usas una sintaxis como `const t = useTranslation()` + `t('mi-objeto.mi-subobjeto.mi-clave')`, normalmente todo el JSON tiene que estar en el bundle para que la librería pueda analizarlo y resolver la clave. Gran parte de ese contenido se envía incluso cuando no se utiliza en la página.

Para mitigar esto, algunas librerías te piden declarar por página qué namespaces cargar (por ejemplo, `next-i18next`, `next-intl`, `lingui`, `next-translate`, `next-international`).

Por el contrario, `Paraglide` añade un paso adicional antes de la compilación para convertir el JSON en símbolos planos como `const en_my_var = () => 'mi valor'`. En teoría, esto permite el tree-shaking del contenido no utilizado en la página. Como veremos, este método todavía tiene sus compromisos.

Finalmente, `Intlayer` aplica una optimización en tiempo de compilación para que `useIntlayer('mi-clave')` se reemplace directamente con el contenido correspondiente.

## Metodología

Para este benchmark, comparamos las siguientes librerías:

- `Base App` (Sin librería i18n)
- `next-intlayer` (v8.7.5)
- `next-i18next` (v16.0.5)
- `next-intl` (v4.9.1)
- `@lingui/core` (v5.3.0)
- `next-translate` (v3.1.2)
- `next-international` (v1.3.1)
- `@inlang/paraglide-js` (v2.15.1)
- `tolgee` (v7.0.0)
- `@lingo.dev/compiler` (v0.4.0)
- `wuchale` (v0.22.11)
- `gt-next` (v6.16.5)

Utilicé la versión `16.2.4` de `Next.js` con el App Router.

Construí una aplicación multilingüe con **10 páginas** y **10 idiomas**.

Comparé **cuatro estrategias de carga**:

| Estrategia         | Sin namespaces (global)                     | Con namespaces (segmentado)                                        |
| :----------------- | :------------------------------------------ | :----------------------------------------------------------------- |
| **Carga estática** | **Static**: Todo en memoria al inicio.      | **Scoped static**: Dividido por namespace; todo cargado al inicio. |
| **Carga dinámica** | **Dynamic**: Carga bajo demanda por idioma. | **Scoped dynamic**: Carga granular por namespace e idioma.         |

## Resumen de estrategias

- **Static**: Simple; sin latencia de red tras la carga inicial. Desventaja: gran tamaño de bundle.
- **Dynamic**: Reduce el peso inicial (lazy-loading). Ideal cuando se tienen muchos idiomas.
- **Scoped static**: Mantiene el código organizado (separación lógica) sin peticiones de red adicionales complejas.
- **Scoped dynamic**: El mejor enfoque para el _code splitting_ y el rendimiento. Minimiza el uso de memoria cargando solo lo que la vista actual y el idioma activo necesitan.

### Qué he medido:

He ejecutado la misma aplicación multilingüe en un navegador real para cada stack y he anotado qué se enviaba realmente por la red y cuánto tiempo tardaba. Los tamaños se reportan **después de la compresión web normal**, ya que es lo más cercano a lo que los usuarios descargan realmente.

- **Tamaño de la librería de internacionalización**: Después del bundling, tree-shaking y minificación, el tamaño de la librería i18n es el tamaño de los proveedores (ej. `NextIntlClientProvider`) + el código de los hooks (ej. `useTranslations`) en un componente vacío. No incluye la carga de los archivos de traducción. Responde a cuánto "cuesta" la librería antes de que entre el contenido.

- **JavaScript por página**: Para cada ruta del benchmark, cuánto script descarga el navegador para esa visita, promediado entre las páginas de la suite (y entre idiomas donde el informe los agrupa). Las páginas pesadas son páginas lentas.

- **Fuga desde otros idiomas (Leakage from other locales)**: Es el contenido de la misma página pero en otro idioma que se carga por error en la página auditada. Este contenido es innecesario y debe evitarse (ej. el contenido de la página `/fr/about` en el paquete de la página `/en/about`).

- **Fuga desde otras rutas**: La misma idea para **otras pantallas** de la aplicación: si sus textos se incluyen cuando solo has abierto una página (ej. el contenido de la página `/en/about` en el paquete de la página `/en/contact`). Una puntuación alta sugiere una división débil o paquetes excesivamente amplios.

- **Tamaño medio de bundle por componente**: Las piezas comunes de la interfaz se miden **una por una** en lugar de esconderse dentro de una cifra gigante de la aplicación. Muestra si la internacionalización infla silenciosamente los componentes cotidianos. Por ejemplo, si tu componente se vuelve a renderizar, cargará todos esos datos desde la memoria. Adjuntar un JSON gigante a cualquier componente es como conectar un gran almacén de datos no utilizados que ralentizará el rendimiento de tus componentes.

- **Responsividad al cambiar de idioma**: Cambio el idioma usando el control propio de la aplicación y cronometro cuánto tiempo pasa hasta que la página ha cambiado claramente, lo que un visitante notaría, no un paso de laboratorio microscópico.

- **Trabajo de renderizado tras un cambio de idioma**: Un seguimiento más específico: cuánto esfuerzo le costó a la interfaz volver a dibujarse para el nuevo idioma una vez que el cambio está en marcha. Útil cuando el tiempo "percibido" y el coste del framework divergen.

- **Tiempo de carga inicial de la página**: Desde la navegación hasta que el navegador considera la página completamente cargada para los escenarios que probé. Útil para comparar arranques en frío (cold starts).

- **Tiempo de hidratación**: Cuando la aplicación lo expone, cuánto tiempo tarda el cliente en convertir el HTML del servidor en algo en lo que realmente se puede hacer clic. Un guion en las tablas significa que esa implementación no proporcionó una cifra de hidratación fiable en este benchmark.

## Resultados en detalle

### 1 — Soluciones a evitar

Algunas soluciones, como `gt-next` o `lingo.dev`, deben evitarse claramente. Combinan el bloqueo del proveedor (vendor lock-in) con la contaminación de tu base de código. A pesar de pasar muchas horas intentando implementarlas, nunca logré que funcionaran, ni en TanStack Start ni en Next.js.

Problemas encontrados:

**(General Translation)** (`gt-next@6.16.5`):

- Para una aplicación de 110kb, `gt-react` añade más de 440kb extra.
- `Quota Exceeded, please upgrade your plan` en la primerísima compilación con General Translation.
- Las traducciones no se renderizan; obtengo el error `Error: <T> used on the client-side outside of <GTProvider>`, lo que parece ser un bug de la librería.
- Mientras implementaba **gt-tanstack-start-react**, también encontré un [problema](https://github.com/generaltranslation/gt/issues/1210#event-24510646961) con la librería: `does not provide an export named 'printAST' - @formatjs/icu-messageformat-parser`, que hacía que la aplicación se rompiera. Tras informar de este problema, el mantenedor lo solucionó en 24 horas.
- La librería bloquea el renderizado estático de las páginas de Next.js.

**(Lingo.dev)** (`@lingo.dev/compiler@0.4.0`):

- Cuota de IA excedida, bloqueando la compilación por completo, por lo que no puedes desplegar en producción sin pagar.
- El compilador omitía casi el 40% del contenido traducido. Tuve que reescribir todos los `.map` en bloques de componentes planos para que funcionara.
- Su CLI tiene fallos y solía resetear el archivo de configuración sin motivo.
- Al compilar, borraba totalmente los JSON generados cuando se añadía nuevo contenido. Como resultado, un puñado de claves podía eliminar más de 300 claves existentes.

### 2 — Soluciones experimentales

**(Wuchale)** (`wuchale@0.22.11`):

La idea detrás de `Wuchale` es interesante pero aún no es viable. Experimenté problemas de reactividad y tuve que forzar el renderizado del proveedor para que la aplicación funcionara. La documentación también es bastante confusa, lo que dificulta la adopción.

**(Paraglide)** (`@inlang/paraglide-js@2.15.1`):

`Paraglide` ofrece un enfoque innovador y bien pensado. Aun así, en este benchmark, el tree-shaking que su empresa anuncia no funcionó para mis configuraciones de Next.js o TanStack Start. El flujo de trabajo y la DX son más complejos que otras opciones. Personalmente, no me gusta tener que regenerar archivos JS antes de cada push, lo que crea un riesgo constante de conflictos de fusión a través de las PR. La herramienta también parece más enfocada en Vite que en Next.js.
Finalmente, en comparación con otras soluciones, Paraglide no usa un almacén (ej. contexto de React) para recuperar el idioma actual y renderizar el contenido. Por cada nodo analizado, solicita el idioma al localStorage / cookie, etc. Esto provoca la ejecución de lógica innecesaria que afecta a la reactividad del componente.

### 3 — Soluciones aceptables

**(Tolgee)** (`tolgee@7.0.0`):

`Tolgee` aborda muchos de los problemas mencionados anteriormente. Me resultó más difícil de adoptar que herramientas similares. No proporciona seguridad de tipos (type safety), lo que también dificulta detectar claves faltantes en tiempo de compilación. Tuve que envolver las funciones de Tolgee con las mías propias para añadir la detección de claves faltantes.

**(Next Intl)** (`next-intl@4.9.1`):

`next-intl` es la opción más de moda y la que más recomiendan los agentes de IA, pero en mi opinión, equivocadamente. Empezar es fácil. En la práctica, optimizar para limitar la fuga es complejo. Combinar carga dinámica + nombres de espacios + tipos de TypeScript ralentiza mucho el desarrollo. El paquete también es bastante pesado (~13kb para `NextIntlClientProvider` + `useTranslations`, que es más del doble de `next-intlayer`). **next-intl** solía bloquear el renderizado estático de las páginas de Next.js. Proporciona un asistente llamado `setRequestLocale()`. Eso parece haberse abordado parcialmente para archivos centralizados como `en.json` / `fr.json`, pero el renderizado estático sigue fallando cuando el contenido se divide en namespaces como `en/shared.json` / `fr/shared.json` / `es/shared.json`.

**(Next I18next)** (`next-i18next@16.0.5`):

`next-i18next` es probablemente la opción más popular porque fue una de las primeras soluciones i18n para aplicaciones JavaScript. Tiene muchos plugins comunitarios. Comparte las mismas desventajas principales que `next-intl`. El paquete es especialmente pesado (~18kb para `I18nProvider` + `useTranslation`, casi el triple que `next-intlayer`).

Los formatos de los mensajes también difieren: `next-intl` usa ICU MessageFormat, mientras que `i18next` usa su propio formato.

**(Next International)** (`next-international@1.3.1`):

`next-international` también aborda los problemas anteriores, pero no difiere mucho de `next-intl` o `next-i18next`. Incluye `scopedT()` para traducciones específicas de un namespace, pero su uso apenas tiene impacto en el tamaño del bundle.

**(Lingui)** (`@lingui/core@5.3.0`):

A menudo se elogia a `Lingui`. Personalmente, encontré el flujo de trabajo `lingui extract` / `lingui compile` más complejo que otras alternativas, sin una ventaja clara. También noté sintaxis inconsistentes que confunden a las IAs (ej. `t()`, `t''`, `i18n.t()`, `<Trans>`).

### 4 — Recomendaciones

**(Next Translate)** (`next-translate@3.1.2`):

`next-translate` es mi recomendación principal si te gusta una API de estilo `t()`. Es elegante a través de `next-translate-plugin`, cargando namespaces mediante `getStaticProps` con un cargador de Webpack / Turbopack. También es la opción más ligera aquí (~2.5kb). Para la segmentación por espacios de nombres, definirnamespaces por página o ruta en la configuración está bien pensado y es más fácil de mantener que las principales alternativas como **next-intl** o **next-i18next**. En la versión `3.1.2`, noté que el renderizado estático no funcionaba; Next.js recurría al renderizado dinámico.

**(Intlayer)** (`next-intlayer@8.7.5`):

No seré yo quien juzgue personalmente a `next-intlayer` por objetividad, ya que es mi propia solución.

### Nota personal

Esta nota es personal y no afecta los resultados del benchmark. En el mundo del i18n, a menudo se ve un consenso en torno al patrón `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>`.

En las aplicaciones React, inyectar una función como un `ReactNode` es, en mi opinión, un antipatrón. También añade una complejidad evitable y una sobrecarga de ejecución de JavaScript (aunque sea apenas perceptible).
