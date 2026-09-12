---
createdAt: 2024-08-11
updatedAt: 2026-09-12
title: Observar Diccionarios
description: Aprende cómo observar cambios en tus archivos de declaración de contenido y construir diccionarios automáticamente.
keywords:
  - Observar
  - Diccionarios
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - watch
author: aymericzip
---

# Observar Diccionarios

```bash packageManager="npm"
npx intlayer watch
```

```bash packageManager="yarn"
yarn intlayer watch
```

```bash packageManager="pnpm"
pnpm intlayer watch
```

```bash packageManager="bun"
bun x intlayer watch
```

Este comando observará los cambios en tus archivos de declaración de contenido y construirá los diccionarios en el directorio `.intlayer`.
Este comando es el equivalente a `npx intlayer build --watch --skip-prepare`.

## Alias:

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

## Argumentos:

- **`--with`**: Inicia un comando en paralelo con la observación.

  > Ejemplo: `npx intlayer watch --with "next dev --turbopack"`

- **`--ci`**: Ejecuta el comando en cada proyecto Intlayer del monorepo (o solo en el actual si se ejecuta desde un directorio de proyecto). Se pueden inyectar credenciales por proyecto mediante `INTLAYER_PROJECT_CREDENTIALS`, un objeto JSON que asocia cada ruta de proyecto a `{ "clientId", "clientSecret" }`.

  > Ejemplo: `npx intlayer watch --ci`
