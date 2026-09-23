---
createdAt: 2026-09-23
updatedAt: 2026-09-23
title: CLI - Actualizar paquetes de Intlayer
description: Aprenda a usar el comando upgrade de Intlayer CLI para listar cada paquete de Intlayer de su proyecto o monorepo y actualizarlos a la última versión.
keywords:
  - CLI
  - Upgrade
  - Actualizar
  - Paquetes
  - Monorepo
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - upgrade
history:
  - version: 9.5.8
    date: 2026-09-23
    changes: "Agregar el comando upgrade"
author: aymericzip
---

# Actualizar paquetes de Intlayer

```bash packageManager="npm"
npx intlayer upgrade
```

```bash packageManager="yarn"
yarn intlayer upgrade
```

```bash packageManager="pnpm"
pnpm intlayer upgrade
```

```bash packageManager="bun"
bun x intlayer upgrade
```

El comando `upgrade` lista los paquetes de Intlayer declarados en cada `package.json` de su proyecto, incluidos los workspaces de un monorepo, y los actualiza a la última versión publicada. Ejecuta el mismo paso de actualización de paquetes que `intlayer init`, de forma independiente.

## Argumentos:

- `--project-root [projectRoot]` - Opcional. El directorio raíz del proyecto. Por defecto, el comando comienza desde el `package.json` más cercano encima del directorio de trabajo actual.
- `--dry-run` - Opcional. Lista los paquetes y su versión de destino sin modificar ningún archivo.
- `--tag <tag>` - Opcional. El dist-tag de npm al que actualizar (por ejemplo `canary`). Por defecto es `latest`.

## Qué hace:

1. **Lista los paquetes de Intlayer** - Escanea cada `package.json` del proyecto (omitiendo `node_modules` y salidas de build) en busca de dependencias y devDependencies `intlayer`, `@intlayer/*`, `*-intlayer` e `intlayer-*`.
2. **Obtiene la versión de destino** - Lee la versión del dist-tag seleccionado (`latest` por defecto) de cada paquete desde el registro de npm.
3. **Reescribe los rangos** - Actualiza cada rango desactualizado directamente en el archivo, conservando su operador (`^`, `~` o ninguno) y la indentación del archivo.
4. **Instala una sola vez** - Ejecuta una sola instalación desde la raíz del workspace (el directorio más cercano con un lock file), usando el gestor de paquetes propietario del lock file:

| Lock file                      | Comando        |
| ------------------------------ | -------------- |
| `bun.lock` / `bun.lockb`       | `bun install`  |
| `pnpm-lock.yaml`               | `pnpm install` |
| `yarn.lock`                    | `yarn install` |
| `package-lock.json` o sin lock | `npm install`  |

Si no hay ningún lock file, se utiliza el campo `packageManager` de `package.json` (por ejemplo `"bun@1.2.0"`) antes de recurrir a npm.

Los rangos que no apuntan al registro, como `workspace:*`, `file:`, `link:`, `catalog:` o URLs de git, nunca se modifican.

## Ejemplos:

### Listar las actualizaciones disponibles sin aplicarlas:

```bash packageManager="npm"
npx intlayer upgrade --dry-run
```

```bash packageManager="yarn"
yarn intlayer upgrade --dry-run
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --dry-run
```

```bash packageManager="bun"
bun x intlayer upgrade --dry-run
```

### Actualizar a la versión canary:

```bash packageManager="npm"
npx intlayer upgrade --tag canary
```

```bash packageManager="yarn"
yarn intlayer upgrade --tag canary
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --tag canary
```

```bash packageManager="bun"
bun x intlayer upgrade --tag canary
```

## Salida de ejemplo:

```bash
npx intlayer upgrade
Intlayer packages:
  package.json
    intlayer ^9.0.0 → ^9.5.7
  apps/web/package.json
    next-intlayer ^9.5.7 (latest)
    vite-intlayer ~9.2.0 → ~9.5.7
Running bun install...
✓ Upgraded 2 Intlayer dependencies to latest
```

## Notas:

- Ejecute el comando desde la raíz de su repositorio para actualizar todos los workspaces. Ejecútelo desde un workspace para actualizar únicamente ese workspace.
- Los paquetes cuya versión no se puede obtener (sin conexión, paquete privado o no publicado) se listan y se dejan sin cambios.
- Si la instalación falla, los rangos actualizados se conservan en `package.json`. Ejecute manualmente el comando de instalación de su gestor de paquetes.
