---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Gestionar Configuración
description: Aprende cómo obtener y enviar tu configuración de Intlayer al CMS.
keywords:
  - Configuración
  - Config
  - CLI
  - Intlayer
  - CMS
slugs:
  - doc
  - concept
  - cli
  - configuration
---

# Gestionar Configuración

## Obtener Configuración

El comando `configuration get` recupera la configuración actual de Intlayer, particularmente los ajustes de localización. Esto es útil para verificar tu configuración.

```bash
npx intlayer configuration get
```

## Alias:

- `npx intlayer config get`
- `npx intlayer conf get`

## Argumentos:

- **`--env`**: Especifica el entorno (por ejemplo, `development`, `production`).
- **`--env-file`**: Proporciona un archivo de entorno personalizado para cargar variables desde él.
- **`--base-dir`**: Especifica el directorio base para el proyecto.
- **`--verbose`**: Habilita el registro detallado para depuración. (por defecto en true usando CLI)
- **`--no-cache`**: Desactiva la caché.

## Enviar Configuración

El comando `configuration push` sube tu configuración al CMS y editor de Intlayer. Este paso es necesario para habilitar el uso de diccionarios remotos en el Editor Visual de Intlayer.

```bash
npx intlayer configuration push
```

## Alias:

- `npx intlayer config push`
- `npx intlayer conf push`

## Argumentos:

- **`--env`**: Especifica el entorno (por ejemplo, `development`, `production`).
- **`--env-file`**: Proporciona un archivo de entorno personalizado para cargar variables.
- **`--base-dir`**: Especifica el directorio base para el proyecto.
- **`--verbose`**: Habilita el registro detallado para depuración. (por defecto en true usando CLI)
- **`--no-cache`**: Desactiva la caché.

Al enviar la configuración, tu proyecto queda completamente integrado con el CMS de Intlayer, permitiendo una gestión fluida de diccionarios entre equipos.
