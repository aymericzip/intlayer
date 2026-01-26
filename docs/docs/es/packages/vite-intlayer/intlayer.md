---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del plugin Vite de intlayer | vite-intlayer
description: Vea cómo usar el plugin intlayer para el paquete vite-intlayer
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Internacionalización
  - Documentación
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documento inicial
---

# Documentación del plugin Vite de intlayer

El plugin `intlayer` de Vite integra la configuración de Intlayer en el proceso de build. Gestiona los alias de diccionarios, inicia el watcher de diccionarios en modo de desarrollo y prepara los diccionarios para el build.

## Uso

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Descripción

El plugin realiza las siguientes tareas:

1. **Preparar diccionarios**: Compila los diccionarios en archivos optimizados al inicio del proceso de build o dev.
2. **Modo de vigilancia**: En modo de desarrollo, vigila los cambios en los archivos de diccionario y los recompila automáticamente.
3. **Alias**: Proporciona alias para acceder a los diccionarios en tu aplicación.
4. **Tree-shaking**: Soporta el tree-shaking de traducciones no usadas a través del plugin `intlayerPrune`.
