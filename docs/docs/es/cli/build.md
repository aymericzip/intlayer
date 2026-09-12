---
createdAt: 2024-08-11
updatedAt: 2026-09-12
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
history:
  - version: 9.5.2
    date: 2026-09-12
    changes: "Añadir el flag `--ci`"
  - version: 8.1.5
    date: 2026-02-23
    changes: "Añadir opción checkTypes"
author: aymericzip
---

# Construir Diccionarios

Para construir tus diccionarios, puedes ejecutar los comandos:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

o en modo watch

```bash packageManager="npm"
npx intlayer build --watch
```

```bash packageManager="yarn"
yarn intlayer build --watch
```

```bash packageManager="pnpm"
pnpm intlayer build --watch
```

```bash packageManager="bun"
bun x intlayer build --watch
```

Este comando encontrará tus archivos de declaración de contenido por defecto en `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`. Y construirá los diccionarios en el directorio `.intlayer`.

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

- **`--ci`**: Ejecuta el comando en cada proyecto Intlayer del monorepo (o solo en el actual si se ejecuta desde un directorio de proyecto). Se pueden inyectar credenciales por proyecto mediante `INTLAYER_PROJECT_CREDENTIALS`, un objeto JSON que asocia cada ruta de proyecto a `{ "clientId", "clientSecret" }`.

  > Ejemplo: `npx intlayer build --ci`

- **`--check-types`**: Comprueba los tipos de los archivos de declaración de contenido.

  > Ejemplo: `npx intlayer build --check-types`
