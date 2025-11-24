---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Construir Diccionarios
description: Aprende cómo construir tus diccionarios de Intlayer a partir de archivos de declaración de contenido.
keywords:
  - Construir
  - Diccionarios
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - build
---

# Construir Diccionarios

Para construir tus diccionarios, puedes ejecutar los comandos:

```bash
npx intlayer build
```

o en modo watch

```bash
npx intlayer build --watch
```

Este comando encontrará tus archivos de declaración de contenido por defecto en `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. Y construirá los diccionarios en el directorio `.intlayer`.

## Alias:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

## Argumentos:

- **`--base-dir`**: Especifica el directorio base para el proyecto. Para obtener la configuración de intlayer, el comando buscará el archivo `intlayer.config.{ts,js,json,cjs,mjs}` en el directorio base.

  > Ejemplo: `npx intlayer build --base-dir ./src`

- **`--env`**: Especifica el entorno (por ejemplo, `development`, `production`). Útil en caso de que uses variables de entorno en tu archivo de configuración de intlayer.

  > Ejemplo: `npx intlayer build --env production`

- **`--env-file`**: Proporciona un archivo de entorno personalizado desde el cual cargar variables. Útil en caso de que uses variables de entorno en tu archivo de configuración de intlayer.

  > Ejemplo: `npx intlayer build --env-file .env.production.local`

- **`--with`**: Inicia un comando en paralelo con la construcción.

  > Ejemplo: `npx intlayer build --with "next dev --turbopack"`

- **`--skip-prepare`**: Omitir el paso de preparación.

  > Ejemplo: `npx intlayer build --skip-prepare`

- **`--no-cache`**: Deshabilitar la caché.

  > Ejemplo: `npx intlayer build --no-cache`
