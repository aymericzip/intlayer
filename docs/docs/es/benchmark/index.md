---
createdAt: 2026-04-20
updatedAt: 2026-04-20
title: Comparativa de librerías i18n
description: Descubre cómo se compara Intlayer con otras librerías i18n en términos de rendimiento y tamaño del bundle.
keywords:
  - benchmark
  - i18n
  - intl
  - nextjs
  - tanstack
  - intlayer
slugs:
  - doc
  - benchmark
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Inicio del benchmark"
---

# Benchmark Bloom — Informe

Benchmark Bloom es una suite de pruebas de rendimiento que mide el impacto real de las librerías i18n (internacionalización) en múltiples frameworks de React y estrategias de carga.

Encuentra los informes detallados y la documentación técnica para cada framework a continuación:

- [**Informe de Benchmark de Next.js**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/nextjs.md)
- [**Informe de Benchmark de TanStack Start**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/benchmark/tanstack.md)

---

## Resultados Actuales

Consulta el [**panel interactivo del benchmark**](https://intlayer.org/benchmark) para ver comparativas en vivo y datos resumidos.
| `scoped-dynamic` | Alta (fuga casi nula) | Alta |

Pasar de `static` a `scoped-dynamic` suele reducir el contenido no utilizado entre un 60 y un 90 %, pero requiere significativamente más configuración. Librerías como Intlayer automatizan el patrón `scoped-dynamic` para que los desarrolladores obtengan la eficiencia sin el código repetitivo.

### Interpretación de las cifras de fuga (leakage)

Una fuga de página del **35 %** significa que el 35 % del JavaScript descargado para esa página contiene cadenas de otras páginas, contenido que el usuario no puede ver en esa página. En una página de 400 KB, eso supone unos 140 KB de datos evitables.

Una fuga de idioma (locale leakage) del **10 %** significa que el 10 % del bundle contiene traducciones en idiomas que el usuario actual no está utilizando.

### Reactividad frente a tiempo de renderizado

- **Reactividad E2E**: mide la experiencia completa del usuario: red, sobrecarga del framework, actualización del DOM.
- **Tiempo del React Profiler**: aísla el coste de volver a renderizar el árbol de React.

Una librería puede tener un tiempo de Profiler bajo pero un tiempo E2E alto si el cambio de idioma implica una petición de red (obtención del nuevo archivo de idioma). Por el contrario, una librería puede tener un tiempo de Profiler alto pero seguir sintiéndose rápida si agrupa las actualizaciones de forma eficiente.
