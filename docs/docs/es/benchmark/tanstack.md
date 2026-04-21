---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: La mejor solución i18n para TanStack Start en 2026 - Informe de Benchmark
description: Compara librerías de internacionalización para TanStack Start como react-i18next, use-intl e Intlayer. Informe detallado de rendimiento sobre tamaño del bundle, fugas y reactividad.
keywords:
  - benchmark
  - i18n
  - intl
  - tanstack
  - rendimiento
  - intlayer
slugs:
  - doc
  - benchmark
  - tanstack
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-tanstack-start-template
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Inicio del benchmark"
---

# Librerías i18n para TanStack Start — Informe de Benchmark 2026

Esta página es un informe comparativo de soluciones i18n en TanStack Start.

## Tabla de Contenidos

<Toc/>

## Benchmark Interactivo

<I18nBenchmark framework="tanstack" vertical/>

## Referencia de resultados:

<iframe 
  src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md" 
  width="100%" 
  height="600px"
  style="border:none;">
</iframe>

> https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md

Consulta el repositorio completo del benchmark [aquí](https://github.com/intlayer-org/benchmark-i18n/tree/main).

## Introducción

Las soluciones de internacionalización se encuentran entre las dependencias más pesadas en una aplicación de React. En TanStack Start, el riesgo principal es enviar contenido innecesario: traducciones de otras páginas y de otros idiomas en el paquete de una sola ruta.

A medida que tu aplicación crece, ese problema puede disparar rápidamente la cantidad de JavaScript enviado al cliente y ralentizar la navegación.

En la práctica, en las implementaciones menos optimizadas, una página internacionalizada puede terminar siendo varias veces más pesada que la versión sin i18n.

El otro impacto es en la experiencia del desarrollador: cómo declaras el contenido, los tipos, la organización de los namespaces, la carga dinámica y la reactividad cuando cambia el idioma.

## Pon a prueba tu aplicación

Para detectar rápidamente problemas de fuga de i18n, he configurado un escáner gratuito disponible [aquí](https://intlayer.org/i18n-seo-scanner).

<iframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## El problema

Dos palancas son esenciales para limitar el coste de una aplicación multilingüe:

- Dividir el contenido por página / namespace para no cargar diccionarios completos cuando no se necesitan.
- Cargar el idioma adecuado de forma dinámica, solo cuando sea necesario.

Entendiendo las limitaciones técnicas de estos enfoques:

**Carga dinámica**

Sin carga dinámica, la mayoría de las soluciones mantienen los mensajes en memoria desde el primer renderizado, lo que añade una sobrecarga significativa para aplicaciones con muchas rutas e idiomas.

Con la carga dinámica, aceptas un compromiso: menos JS inicial, pero a veces una petición extra al cambiar de idioma.

**División de contenido (Content splitting)**

Las sintaxis basadas en `const t = useTranslation()` + `t('a.b.c')` son muy cómodas pero a menudo fomentan el mantenimiento de grandes objetos JSON en tiempo de ejecución. Ese modelo dificulta el tree-shaking a menos que la librería ofrezca una estrategia real de división por página.

## Metodología

Para este benchmark, comparamos las siguientes librerías:

- `Base App` (Sin librería i18n)
- `react-intlayer` (v8.7.5-canary.0)
- `react-i18next` (v17.0.2)
- `use-intl` (v4.9.1)
- `@lingui/core` (v5.3.0)
- `@inlang/paraglide-js` (v2.15.1)
- `tolgee` (v7.0.0)
- `react-intl` (v10.1.1)
- `wuchale` (v0.22.11)
- `gt-react` (vlatest)
- `lingo.dev` (v0.133.9)

El framework es `TanStack Start` con una aplicación multilingüe de **10 páginas** y **10 idiomas**.

Comparamos **cuatro estrategias de carga**:

| Estrategia         | Sin namespaces (global)                     | Con namespaces (segmentado)                                        |
| :----------------- | :------------------------------------------ | :----------------------------------------------------------------- |
| **Carga estática** | **Static**: Todo en memoria al inicio.      | **Scoped static**: Dividido por namespace; todo cargado al inicio. |
| **Carga dinámica** | **Dynamic**: Carga bajo demanda por idioma. | **Scoped dynamic**: Carga granular por namespace e idioma.         |

## Resumen de estrategias

- **Static**: Simple; sin latencia de red tras la carga inicial. Desventaja: gran tamaño de bundle.
- **Dynamic**: Reduce el peso inicial (lazy-loading). Ideal cuando se tienen muchos idiomas.
- **Scoped static**: Mantiene el código organizado (separación lógica) sin peticiones de red adicionales complejas.
- **Scoped dynamic**: El mejor enfoque para el _code splitting_ y el rendimiento. Minimiza el uso de memoria cargando solo lo que la vista actual y el idioma activo necesitan.

## Resultados en detalle

### 1 — Soluciones a evitar

Algunas soluciones, como `gt-react` o `lingo.dev`, son claramente opciones de las que alejarse. Combinan el bloqueo del proveedor con la contaminación de tu base de código. Peor aún: a pesar de pasar muchas horas intentando implementarlas, nunca logré que funcionaran correctamente en TanStack Start (similar a Next.js con `gt-next`).

Problemas encontrados:

**(General Translation)** (`gt-react@latest`):

- Para una app de unos 110kb, `gt-react` puede añadir más de 440kb extra (orden de magnitud visto en la implementación de Next.js en este mismo benchmark).
- `Quota Exceeded, please upgrade your plan` en la primerísima compilación con General Translation.
- Las traducciones no se renderizan; obtengo el error `Error: <T> used on the client-side outside of <GTProvider>`, lo que parece ser un bug de la librería.
- Mientras implementaba **gt-tanstack-start-react**, también encontré un [problema](https://github.com/generaltranslation/gt/issues/1210#event-24510646961) con la librería: `does not provide an export named 'printAST' - @formatjs/icu-messageformat-parser`, que hacía que la aplicación se rompiera. Tras informar de este problema, el mantenedor lo solucionó en 24 horas.
- Estas librerías usan un antipatrón a través de la función `initializeGT()`, impidiendo que el bundle se limpie adecuadamente mediante tree-shaking.

**(Lingo.dev)** (`lingo.dev@0.133.9`):

- Cuota de IA excedida (o dependencia del servidor bloqueada), lo que hace que la compilación / producción sea arriesgada sin pagar.
- El compilador omitía casi el 40% del contenido traducido. Tuve que reescribir todos los `.map` en bloques de componentes planos para que funcionara.
- Su CLI tiene fallos y solía resetear el archivo de configuración sin motivo.
- Al compilar, borraba totalmente los JSON generados cuando se añadía nuevo contenido. Como resultado, podrías terminar con solo unas pocas claves eliminando cientos de claves existentes.
- Tuve problemas de reactividad con la librería en TanStack Start: al cambiar de idioma, tuve que forzar el renderizado del proveedor para que funcionara.

### 2 — Soluciones experimentales

**(Wuchale)** (`wuchale@0.22.11`):

La idea detrás de `Wuchale` es interesante pero todavía no es una solución viable. Experimenté problemas de reactividad con la librería y tuve que forzar el renderizado del proveedor para que la aplicación funcionara en TanStack Start. La documentación también es bastante confusa, lo que dificulta la adopción.

### 3 — Soluciones aceptables

**(Paraglide)** (`@inlang/paraglide-js@2.15.1`):

`Paraglide` ofrece un enfoque innovador y bien pensado. Aun así, en este benchmark, el tree-shaking que su empresa publicita no funcionó para mi implementación en Next.js ni para TanStack Start. El flujo de trabajo y la DX también son más complejos que otras opciones. Personalmente, no soy fan de tener que regenerar archivos JS antes de cada push, lo que crea un riesgo constante de conflictos de fusión para los desarrolladores a través de las PR.

**(Tolgee)** (`tolgee@7.0.0`):

`Tolgee` aborda muchos de los problemas mencionados anteriormente. Me resultó más difícil empezar con ella que con otras herramientas con enfoques similares. No proporciona seguridad de tipos, lo que también dificulta mucho detectar claves faltantes en tiempo de compilación. Tuve que envolver las API de Tolgee con las mías propias para añadir la detección de claves faltantes.

En TanStack Start también tuve problemas de reactividad: al cambiar de idioma, tuve que forzar el renderizado del proveedor y suscribirme a eventos de cambio de idioma para que la carga en otro idioma se comportara correctamente.

**(use-intl)** (`use-intl@4.9.1`):

`use-intl` es la pieza "intl" más de moda en el ecosistema de React (de la misma familia que `next-intl`) y a menudo la recomiendan los agentes de IA, pero en mi opinión, equivocadamente en una configuración donde el rendimiento es lo primero. Empezar es bastante sencillo. En la práctica, el proceso para optimizar y limitar la fuga es bastante complejo. Del mismo modo, combinar la carga dinámica + namespaces + tipos de TypeScript ralentiza mucho el desarrollo.

En TanStack Start evitas las trampas específicas de Next.js (`setRequestLocale`, renderizado estático), pero el problema principal es el mismo: sin una disciplina estricta, el bundle transporta rápidamente demasiados mensajes y el mantenimiento de los namespaces por ruta se vuelve pesado.

**(react-i18next)** (`react-i18next@17.0.2`):

`react-i18next` es probablemente la opción más popular porque fue una de las primeras en satisfacer las necesidades i18n de las aplicaciones JavaScript. También tiene un amplio conjunto de plugins comunitarios para problemas específicos.

Aun así, comparte las mismas desventajas principales que los stacks basados en `t('a.b.c')`: las optimizaciones son posibles pero consumen mucho tiempo, y los proyectos grandes corren el riesgo de caer en malas prácticas (namespaces + carga dinámica + tipos).

Los formatos de los mensajes también divergen: `use-intl` usa ICU MessageFormat, mientras que `i18next` usa su propio formato, lo que complica las herramientas o las migraciones si se mezclan.

**(Lingui)** (`@lingui/core@5.3.0`):

A menudo se elogia a `Lingui`. Personalmente, encontré el flujo de trabajo en torno a `lingui extract` / `lingui compile` más complejo que otros enfoques, sin una ventaja clara en este benchmark de TanStack Start. También noté sintaxis inconsistentes que confunden a las IAs (ej. `t()`, `t''`, `i18n.t()`, `<Trans>`).

**(react-intl)** (`react-intl@10.1.1`):

`react-intl` es una implementación de alto rendimiento del equipo de Format.js. La DX sigue siendo verbosa: `const intl = useIntl()` + `intl.formatMessage({ id: "xx.xx" })` añade complejidad, trabajo extra de JavaScript y vincula la instancia global de i18n a muchos nodos en el árbol de React.

### 4 — Recomendaciones

Este benchmark de TanStack Start no tiene un equivalente directo a `next-translate` (plugin de Next.js + `getStaticProps`). Para los equipos que realmente quieren una API `t()` con un ecosistema maduro, `react-i18next` y `use-intl` siguen siendo opciones "razonables", pero prepárate para invertir mucho tiempo optimizando para evitar fugas.

**(Intlayer)** (`react-intlayer@8.7.5-canary.0`):

No seré yo quien juzgue personalmente a `react-intlayer` por objetividad, ya que es mi propia solución.

### Nota personal

Esta nota es personal y no afecta los resultados del benchmark. Aun así, en el mundo del i18n, a menudo se ve un consenso en torno a un patrón como `const t = useTranslation('xx')` + `<>{t('xx.xx')}</>` para el contenido traducido.

En las aplicaciones React, inyectar una función como un `ReactNode` es, en mi opinión, un antipatrón. También añade una complejidad evitable y una sobrecarga de ejecución de JavaScript (aunque sea apenas perceptible).
