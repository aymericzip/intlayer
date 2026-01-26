---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del plugin intlayerPrune para Vite | vite-intlayer
description: Vea cómo usar el plugin intlayerPrune del paquete vite-intlayer
keywords:
  - intlayerPrune
  - vite
  - plugin
  - tree-shaking
  - Intlayer
  - intlayer
  - Internacionalización
  - Documentación
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Inicialización de la documentación
---

# Documentación del plugin intlayerPrune para Vite

El plugin `intlayerPrune` para Vite se utiliza para aplicar tree-shaking y eliminar los diccionarios no utilizados del bundle de tu aplicación. Esto ayuda a reducir el tamaño final del bundle incluyendo únicamente el contenido multilingüe necesario.

## Uso

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer, intlayerPrune } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerPrune()],
});
```

## Descripción

El plugin analiza tu código fuente para identificar qué claves de diccionario se usan realmente. A continuación elimina cualquier contenido no utilizado de los archivos de diccionario empaquetados. Esto es especialmente útil en proyectos grandes con muchos diccionarios donde solo se utiliza un subconjunto en páginas o componentes específicos.
