---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: Bundle Autónomo
description: Aprenda a crear un bundle JavaScript autónomo del contenido de la aplicación.
keywords:
  - Standalone
  - Bundle
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - standalone
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "Inicialización de la documentación del comando standalone"
---

# Bundle Autónomo

El comando `standalone` le permite crear un bundle JavaScript autónomo que contiene Intlayer y cualquier otro paquete especificado. Esto es particularmente útil para usar Intlayer en entornos sin un gestor de paquetes o empaquetador, como una aplicación de HTML/JS pura.

el bundle utiliza [esbuild](https://esbuild.github.io/) para combinar los paquetes solicitados y sus dependencias en un solo archivo que se puede importar fácilmente en cualquier proyecto web.

## Uso

```bash
npx intlayer standalone --packages [paquetes...] [opciones]
```

## Opciones

- `-o, --outfile [outfile]` - Opcional. El nombre del archivo de salida. Por defecto es `intlayer-bundle.js`.
- `--packages [paquetes...]` - Requerido. Una lista de paquetes para incluir en el bundle (por ejemplo, `intlayer`, `vanilla-intlayer`).
- `--version [version]` - Opcional. La versión de los paquetes a empaquetar. Si no se especifica, se usa por defecto la versión del CLI de Intlayer.
- `--minify` - Opcional. Si se debe minificar la salida. Por defecto es `true`.
- `--platform [platform]` - Opcional. La plataforma de destino para el bundle (por ejemplo, `browser`, `node`). Por defecto es `browser`.
- `--format [format]` - Opcional. El formato de salida para el bundle (por ejemplo, `esm`, `cjs`, `iife`). Por defecto es `esm`.

## Opciones Comunes

- `--env-file [envFile]` - Archivo de entorno.
- `-e, --env [env]` - Entorno.
- `--base-dir [baseDir]` - Directorio base.
- `--no-cache` - Desactivar caché.
- `--verbose` - Salida detallada.

## Ejemplos:

### Crear un bundle para Vanilla JS:

```bash
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

Esto creará un archivo `intlayer.js` que contiene los paquetes `intlayer` y `vanilla-intlayer`, minificado y en formato ESM, listo para ser usado en un navegador a través de una etiqueta `<script>`.

### Empaquetar una versión específica:

```bash
npx intlayer standalone --packages intlayer --version 8.6.4
```

### Empaquetar con un formato diferente:

```bash
npx intlayer standalone --packages intlayer --format iife
```

## Qué hace:

1. **Crea un entorno temporal** - Configura un directorio temporal para gestionar las dependencias.
2. **Instala paquetes** - Utiliza `npm` o `bun` (si está disponible) para instalar los paquetes solicitados y sus dependencias.
3. **Genera un punto de entrada** - Crea un archivo de entrada temporal que exporta todos los paquetes solicitados y los expone como variables globales al ejecutarse en un navegador.
4. **Empaqueta con esbuild** - Utiliza esbuild para empaquetar todo en un solo archivo, aplicando la minificación y el formato solicitados.
5. **Genera el archivo** - Escribe el bundle resultante en la ruta de salida especificada.

## Variables Globales

Cuando el bundle se carga en un navegador, expone los paquetes solicitados como variables globales en el objeto `window`. Los nombres de las variables se derivan de los nombres de los paquetes (por ejemplo, `intlayer` se convierte en `Intlayer`, `vanilla-intlayer` se convierte en `VanillaIntlayer`).

```javascript
// Accediendo a Intlayer desde el bundle
const { getLocaleName } = window.Intlayer;
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;
```
