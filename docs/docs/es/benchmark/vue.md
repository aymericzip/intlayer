---
createdAt: 2026-04-20
updatedAt: 2026-04-21
title: La mejor solución i18n para Vue en 2026 - Informe de Benchmark
description: Compara bibliotecas de internacionalización (i18n) para Vue como vue-i18n, fluent-vue e Intlayer. Informe de rendimiento detallado sobre el tamaño del paquete, fugas y reactividad.
keywords:
  - benchmark
  - i18n
  - intl
  - vue
  - rendimiento
  - intlayer
slugs:
  - doc
  - benchmark
  - vue
author: Aymeric PINEAU
applicationTemplate: https://github.com/intlayer-org/benchmark-i18n-vue-template
history:
  - version: 8.7.12
    date: 2026-01-06
    changes: "Inicialización del benchmark"
---

# Bibliotecas i18n para Vue — Informe de Benchmark 2026

Esta página es un informe de benchmark para soluciones de i18n en Vue.

## Tabla de Contenidos

<Toc/>

## Benchmark Interactivo

<I18nBenchmark framework="vite-vue" vertical/>

## Referencia de resultados:

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> [Ver datos completos del benchmark](https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md)

Vea el repositorio completo del benchmark [aquí](https://github.com/intlayer-org/benchmark-i18n/tree/main).

## Introducción

Las soluciones de internacionalización se encuentran entre las dependencias más pesadas en una aplicación Vue. El riesgo principal es enviar contenido innecesario: traducciones para otras páginas y otros idiomas en el paquete de una sola ruta.

A medida que su aplicación crece, ese problema puede aumentar rápidamente el JavaScript enviado al cliente y ralentizar la navegación.

En la práctica, para las implementaciones menos optimizadas, una página internacionalizada puede terminar siendo varias veces más pesada que la versión sin i18n.

El otro impacto es en la experiencia del desarrollador (DX): cómo se declara el contenido, los tipos, la organización de los namespaces, la carga dinámica y la reactividad cuando cambia el idioma.

## TL;DR

- **Intlayer**: La solución más ligera (v8.7.12) con segmentación (scoping) y carga dinámica nativas.
- **vue-i18n**: El estándar de la industria con un ecosistema rico, pero puede ser significativamente más pesado y difícil de optimizar para el code-splitting en aplicaciones grandes.
- **fluent-vue**: Organización innovadora de mensajes pero carece de seguridad de tipos y resulta ser una solución extremadamente pesada.

## Pruebe su aplicación

Para detectar rápidamente problemas de fugas de i18n, he configurado un escáner gratuito disponible [aquí](https://intlayer.org/i18n-seo-scanner).

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## El problema

Dos palancas son esenciales para limitar el costo de una aplicación multilingüe:

- Dividir el contenido por página / namespace para no cargar diccionarios completos cuando no se necesitan.
- Cargar el idioma correcto dinámicamente, solo cuando sea necesario.

Comprender las limitaciones técnicas de estos enfoques:

**Carga dinámica**

Sin carga dinámica, la mayoría de las soluciones mantienen los mensajes en memoria desde el primer renderizado, lo que añade una sobrecarga significativa para aplicaciones con muchas rutas e idiomas.

Con la carga dinámica, se acepta un compromiso: menos JS inicial, pero a veces una solicitud adicional al cambiar de idioma.

**División de contenido (Splitting)**

Las sintaxis construidas en torno a `const { t } = useI18n()` + `t('a.b.c')` son muy convenientes pero a menudo fomentan el mantenimiento de grandes objetos JSON en tiempo de ejecución. Ese modelo dificulta el tree-shaking a menos que la biblioteca ofrezca una estrategia real de división por página.

## Metodología

Para este benchmark, comparamos las siguientes bibliotecas:

- `Base App` (Sin biblioteca i18n)
- `vue-intlayer` (v8.7.12)
- `vue-i18n` (v11.4.0)
- `fluent-vue` (v3.8.2)

El framework es `Vue` con una aplicación multilingüe de **10 páginas** y **10 idiomas**.

Comparamos **cuatro estrategias de carga**:

| Estrategia         | Sin namespaces (global)                     | Con namespaces (scoped)                                            |
| :----------------- | :------------------------------------------ | :----------------------------------------------------------------- |
| **Carga estática** | **Static**: Todo en memoria al inicio.      | **Scoped static**: Dividido por namespace; todo cargado al inicio. |
| **Carga dinámica** | **Dynamic**: Carga bajo demanda por idioma. | **Scoped dynamic**: Carga granular por namespace e idioma.         |

## Resumen de estrategias

- **Static**: Simple; sin latencia de red después de la carga inicial. Desventaja: gran tamaño del paquete.
- **Dynamic**: Reduce el peso inicial (lazy-loading). Ideal cuando se tienen muchos idiomas.
- **Scoped static**: Mantiene el código organizado (separación lógica) sin solicitudes de red adicionales complejas.
- **Scoped dynamic**: El mejor enfoque para el _code splitting_ y el rendimiento. Minimiza la memoria cargando solo lo que la vista actual y el idioma activo necesitan.

### Lo que medí:

Ejecuté la misma aplicación multilingüe en un navegador real para cada stack y luego anoté lo que realmente pasó por la red y cuánto tiempo tomó. Los tamaños se informan **después de la compresión web normal**, ya que eso es más cercano a lo que la gente realmente descarga.

- **Tamaño de la biblioteca de internacionalización**: Después de la agrupación, tree-shaking y minificación, el tamaño de la biblioteca i18n es el tamaño del código de los providers + composables en un componente vacío. No incluye la carga de archivos de traducción. Responde a cuán "cara" es la biblioteca antes de que entre el contenido.

- **JavaScript por página**: Para cada ruta del benchmark, cuánto script extrae el navegador para esa visita, promediado entre las páginas de la suite (y entre idiomas). Las páginas pesadas son páginas lentas.

- **Fuga de otros idiomas (Leakage)**: Es el contenido de la misma página pero en otro idioma que se cargaría por error en la página auditada. Este contenido es innecesario y debe evitarse (ej. contenido de la página `/fr/about` en el paquete de la página `/en/about`).

- **Fuga de otras rutas**: La misma idea para **otras pantallas** de la aplicación: si sus textos se cargan cuando solo se abrió una página (ej. contenido de la página `/en/about` en el paquete de la página `/en/contact`). Una puntuación alta indica una división débil o paquetes demasiado amplios.

- **Tamaño promedio del paquete del componente**: Los elementos de interfaz comunes se miden **uno a la vez**, en lugar de ocultarse dentro de una cifra gigante de la aplicación. Muestra si la internacionalización infla silenciosamente los componentes cotidianos. Por ejemplo, si su componente se vuelve a renderizar, cargará todos esos datos desde la memoria. Adjuntar un JSON gigante a cualquier componente es como conectar un gran almacén de datos no utilizados que ralentizará el rendimiento de sus componentes.

- **Capacidad de respuesta al cambio de idioma**: Cambio el idioma utilizando el propio control de la aplicación y mido cuánto tiempo pasa hasta que la página ha cambiado claramente, lo que un visitante notaría.

- **Trabajo de renderizado tras un cambio de idioma**: Un seguimiento más detallado: cuánto esfuerzo le costó a la interfaz volver a dibujarse para el nuevo idioma una vez iniciado el cambio. Útil cuando el tiempo "percibido" y el costo del framework divergen.

- **Tiempo de carga inicial de la página**: Desde la navegación hasta que el navegador considera que la página está completamente cargada para los escenarios probados. Bueno para comparar arranques en frío.

- **Tiempo de hidratación (Hydration)**: Tiempo que pasa el cliente convirtiendo el HTML del servidor en una interfaz interactiva. Un guion en las tablas significa que esa implementación no proporcionó una cifra de hidratación fiable en este benchmark.

## Resultados en detalle

### 1 — Soluciones a evitar

> No hay una solución clara a evitar en el ecosistema de Vue.

### 2 — Soluciones aceptables

**(vue-i18n)** (`vue-i18n@11.4.0`):

- **vue-i18n** es sin duda la biblioteca de i18n más utilizada para Vue, tiene muchas características y un ecosistema enorme. Pero bajo el capó la solución es bastante pesada. Aunque vue-i18n integra carga diferida para los mensajes, carece de una función de segmentación (scoping). En el caso de una aplicación Vue SPA clásica no hay problema, pero para una aplicación Nuxt que utiliza @nuxt/i18n, esto lleva a incluir los mensajes de todas las páginas en una sola. Para una aplicación Nuxt grande con más de 10 páginas, puede volverse realmente problemático.

El paquete es muy pesado (~24.3kb, aproximadamente 9 veces `vue-intlayer`).

**(fluent-vue)** (`fluent-vue@0.5.0`):

- **fluent-vue** ofrece un intento de innovación a través del formato .ftl. La organización de los mensajes es excelente, más fácil de comenzar. Pero en la práctica, la falta de seguridad de tipos aumenta el riesgo de error y puede volverse rápidamente costoso de depurar. Además, esa solución carga los mensajes mediante un plugin de vite que obliga a cargar todo el contenido en todos los idiomas en cada página. Adicionalmente, es una solución extremadamente pesada (~92.7kb, aproximadamente 34 veces `vue-intlayer`).

### 3 — Recomendaciones

**(Intlayer)** (`vue-intlayer@8.7.12`):

No juzgaré personalmente `vue-intlayer` por objetividad, ya que es mi propia solución.
