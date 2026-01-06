---
createdAt: 2025-12-30
updatedAt: 2026-01-06
title: Listar proyectos de Intlayer
description: Aprende cómo listar todos los proyectos de Intlayer en un directorio o repositorio git.
keywords:
  - Lista
  - Proyectos
  - CLI
  - Intlayer
  - Git
slugs:
  - doc
  - concept
  - cli
  - list-projects
---

# Listar proyectos de Intlayer

```bash
npx intlayer projects list
```

Este comando busca y lista todos los proyectos de Intlayer encontrando directorios que contienen archivos de configuración de Intlayer. Es útil para descubrir todos los proyectos de Intlayer en un monorepo, workspace o repositorio git.

## Alias:

- `npx intlayer projects-list`
- `npx intlayer pl`

## Argumentos:

- **`--base-dir [path]`**: Especifica el directorio base desde el cual buscar. Por defecto es el directorio de trabajo actual.

  > Ejemplo: `npx intlayer projects list --base-dir /path/to/workspace`

  > Ejemplo: `npx intlayer projects list --base-dir /path/to/workspace`

- **`--git-root`**: Buscar desde el directorio raíz de git en lugar del directorio base. Esto es útil para encontrar todos los proyectos de Intlayer en un monorepo o repositorio git.

  > Ejemplo: `npx intlayer projects list --git-root`

- **`--json`**: Muestra los resultados como JSON en lugar de texto formateado. Útil para scripting y acceso programático.

  > Ejemplo: `npx intlayer projects list --json`

## Cómo funciona:

El comando busca archivos de configuración de Intlayer en el directorio especificado (o en la raíz del git si se usa `--git-root`). Busca los siguientes patrones de archivos de configuración:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Cada directorio que contenga uno de estos archivos se considera un proyecto de Intlayer y se listará en la salida.

## Ejemplos:

### Listar proyectos en el directorio actual:

```bash
npx intlayer projects list
```

### Listar proyectos en un directorio específico:

```bash
npx intlayer projects list --base-dir ./packages
```

### Listar todos los proyectos en el repositorio git:

```bash
npx intlayer projects list --git-root
```

### Usar el alias corto:

```bash
npx intlayer pl --git-root
```

### Salida como JSON:

```bash
npx intlayer projects list --json
```

## Ejemplo de salida:

### Salida formateada:

```bash
$ npx intlayer projects list --git-root

Found 3 Intlayer project(s):

  - /Users/user/workspace/packages/app
  - /Users/user/workspace/packages/admin
  - /Users/user/workspace/packages/shared
```

### Salida JSON:

```bash
$ npx intlayer projects list --json

["/Users/user/workspace/packages/app","/Users/user/workspace/packages/admin","/Users/user/workspace/packages/shared"]
```

## Casos de uso:

- **Gestión de monorepos**: Descubrir todos los proyectos Intlayer en una estructura monorepo
- **Descubrimiento de proyectos**: Encontrar todos los proyectos habilitados con Intlayer en un workspace
- **CI/CD**: Verificar proyectos Intlayer en flujos de trabajo automatizados
- **Documentación**: Generar documentación que liste todos los proyectos que usan Intlayer

La salida proporciona rutas absolutas a cada directorio de proyecto, lo que facilita la navegación hacia ellos o la automatización de operaciones sobre múltiples proyectos Intlayer.
