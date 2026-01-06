---
createdAt: 2024-08-11
updatedAt: 2026-01-06
title: Listar archivos de declaración de contenido
description: Aprende cómo listar todos los archivos de declaración de contenido en tu proyecto.
keywords:
  - Listar
  - Declaración de Contenido
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - list
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: Agregar opción de salida JSON al comando list
---

# Listar archivos de declaración de contenido

```bash
npx intlayer content list
```

## Alias:

- `npx intlayer list`

Este comando muestra todos los archivos de declaración de contenido en tu proyecto, mostrando sus claves de diccionario y rutas de archivo. Es útil para obtener una visión general de todos tus archivos de contenido y verificar que sean correctamente detectados por Intlayer.

## Argumentos:

- **`--json`**: Muestra los resultados como JSON en lugar de texto formateado. Útil para scripting y acceso programático.

  > Ejemplo: `npx intlayer content list --json`

## Ejemplos:

### Listar archivos de declaración de contenido:

```bash
npx intlayer content list
```

### Salida como JSON:

```bash
npx intlayer content list --json
```

## Salida de ejemplo:

### Salida formateada:

```bash
npx intlayer content list
Archivos de declaración de contenido:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Total de archivos de declaración de contenido: 3
```

### Salida JSON:

```bash
$ npx intlayer content list --json

[{"key":"home-page","path":"src/components/HomePage/homePage.content.ts"},{"key":"server-component","path":"src/components/ServerComponent/serverComponent.content.ts"},{"key":"client-component","path":"src/components/ClientComponent/clientComponent.content.ts"}]
```

Este comando mostrará:

- Una lista formateada de todos los archivos de declaración de contenido con sus claves y rutas de archivo relativas
- El conteo total de archivos de declaración de contenido encontrados

La salida te ayuda a verificar que todos tus archivos de contenido estén correctamente configurados y sean detectables por el sistema Intlayer.
