---
createdAt: 2026-09-23
updatedAt: 2026-11-13
priority: 5
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
  - version: 9.8.1
    date: 2026-11-13
    changes: "Instala y registra los plugins de lint / Prettier, actualiza las entradas del servidor MCP"
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

El comando `upgrade` lista los paquetes de Intlayer declarados en cada `package.json` de tu proyecto, incluidos los workspaces de un monorepo, y los actualiza a la última versión publicada: integraciones de framework, `eslint-plugin-intlayer`, `prettier-plugin-intlayer`, `intlayer-editor`, `@intlayer/mcp` y cualquier otro paquete `@intlayer/*`. Después actualiza las herramientas relacionadas.

## Argumentos:

- `--project-root [projectRoot]` - Opcional. El directorio raíz del proyecto. Por defecto, el comando comienza desde el `package.json` más cercano encima del directorio de trabajo actual.
- `--dry-run` - Opcional. Lista los paquetes y su versión de destino sin modificar ningún archivo.
- `--tag <tag>` - Opcional. El dist-tag de npm al que actualizar (por ejemplo `canary`). Por defecto es `latest`.
- `--no-eslint` - Opcional. No instala ni registra las reglas de lint de Intlayer.
- `--no-prettier` - Opcional. No instala ni registra el plugin de Prettier de Intlayer.

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

5. **Plugins de lint y Prettier** - Si el proyecto usa ESLint / oxlint o Prettier, instala `eslint-plugin-intlayer` / `prettier-plugin-intlayer` si faltan y los registra: `...intlayer.configs.recommended` en la config flat de ESLint, las reglas en `.oxlintrc.json` y el plugin en la config de Prettier (JSON, YAML, JavaScript o TypeScript). Si una config no se puede editar de forma segura, se muestra el fragmento para pegarlo.
6. **Servidor MCP** - Apunta las entradas MCP stdio de Intlayer del proyecto (`.mcp.json`, `.cursor/mcp.json`, `.vscode/mcp.json`…) a `@intlayer/mcp@<tag>`, para que `npx` inicie el servidor actualizado en lugar de una copia en caché.

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
