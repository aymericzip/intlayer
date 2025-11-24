---
createdAt: 2024-08-11
updatedAt: 2025-11-22
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
---

# Listar archivos de declaración de contenido

```bash
npx intlayer content list
```

## Alias:

- `npx intlayer list`

Este comando muestra todos los archivos de declaración de contenido en tu proyecto, mostrando sus claves de diccionario y rutas de archivo. Es útil para obtener una visión general de todos tus archivos de contenido y verificar que sean correctamente detectados por Intlayer.

## Ejemplo:

```bash
npx intlayer content list
```

## Salida de ejemplo:

```bash
npx intlayer content list
Archivos de declaración de contenido:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Total de archivos de declaración de contenido: 3
```

Este comando mostrará:

- Una lista formateada de todos los archivos de declaración de contenido con sus claves y rutas de archivo relativas
- El conteo total de archivos de declaración de contenido encontrados

La salida te ayuda a verificar que todos tus archivos de contenido estén correctamente configurados y sean detectables por el sistema Intlayer.
