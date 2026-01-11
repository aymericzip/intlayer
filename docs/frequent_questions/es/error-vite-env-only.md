---
createdAt: 2026-01-11
updatedAt: 2026-01-11
title: `vite-env-only` y Intlayer – error falso positivo `node:fs` import denegado
description: Por qué vite-env-only informa una importación `node:fs` denegada con Intlayer + React-Router + Vite y qué hacer.
keywords:
  - intlayer
  - vite
  - react-router
  - vite-env-only
  - node:fs
  - import denied
  - alias
  - client bundle
slugs:
  - frequent-questions
  - vite-env-only-node-fs-false-positive
---

# `vite-env-only` deniega `node:fs` con Intlayer

Si usaste el plugin **vite-env-only** (como se menciona en sugerencias antiguas de React-Router v7) y ves:

```bash

Error: [vite-env-only] Import denied

* Denied by specifier pattern: /^node:/
* Importer: index.html
* Import: "node:fs"

```

…aunque **no haya `node:fs` en tu client bundle**, esto es un **falso positivo**.

## Qué lo causa

`vite-env-only` ejecuta una comprobación basada en Babel **temprano en la resolución del grafo de Vite**, _antes de_:

- aliasing (incluyendo los mappings browser vs node de Intlayer),
- dead-code elimination,
- SSR vs client resolution,
- módulos virtuales como los de React-Router.

Los paquetes de Intlayer contienen código que puede funcionar tanto en Node como en el navegador. En una etapa _intermedia_, una API integrada de Node como `node:fs` puede aparecer en el grafo **antes** de que Vite la elimine del client build. `vite-env-only` detecta eso y lanza un error de inmediato, aunque el bundle final no lo incluya.

## React-Router y convenciones de módulos del servidor

(https://reactrouter.com/api/framework-conventions/server-modules), el equipo **sugiere explícitamente usar `vite-env-only`** para evitar que las importaciones exclusivas del servidor se filtren en el bundle del cliente.

Sin embargo, esas convenciones dependen del aliasing de Vite, las exportaciones condicionales y el tree-shaking para eliminar el código exclusivo del servidor. Aunque el aliasing y las exportaciones condicionales ya se aplican, algunas utilidades basadas en Node aún están presentes en paquetes como `@intlayer/core` en esa etapa (aunque nunca se importan en el cliente). Como el tree-shaking no se ha ejecutado todavía, esas funciones todavía son parseadas por Babel, y `vite-env-only` detecta sus importaciones `node:` y produce un falso positivo — aunque se purgan correctamente del bundle final del cliente.

## Cómo solucionarlo / soluciones alternativas

### Recomendado: Eliminar `vite-env-only`

Simplemente elimina el plugin. En muchos casos no lo necesitas — Vite ya gestiona las importaciones cliente vs servidor mediante su propia resolución.

Esto soluciona la denegación falsa de `node:fs` sin cambios en Intlayer.

### Valida la compilación final en su lugar

Si aún quieres asegurarte de que no haya módulos integrados de Node en el cliente, hazlo **después del build**, p. ej.:

```bash
pnpm build
grep -R "node:" dist/
```

Si no hay resultados, tus bundles del cliente están limpios.

## Resumen

- `vite-env-only` puede arrojar un error sobre `node:fs` porque comprueba demasiado pronto.
- Vite + Intlayer + las convenciones de server modules de React-Router normalmente eliminan correctamente las referencias exclusivas del servidor.
- Eliminar el plugin o verificar el _resultado final_ suele ser la mejor solución.
