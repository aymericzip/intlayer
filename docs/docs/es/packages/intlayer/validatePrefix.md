---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación de la función validatePrefix | intlayer
description: Vea cómo usar la función validatePrefix del paquete intlayer
keywords:
  - validatePrefix
  - traducción
  - Intlayer
  - intlayer
  - Internacionalización
  - Documentación
slugs:
  - doc
  - packages
  - intlayer
  - validatePrefix
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documento inicial
---

# Documentación de la función validatePrefix

La función `validatePrefix` comprueba si un prefijo dado es un prefijo de locale válido según la configuración.

## Uso

```ts
import { validatePrefix } from "intlayer";

const isValid = validatePrefix("/fr");

// Output: true
```

## Parámetros

| Parámetro | Tipo     | Descripción           |
| --------- | -------- | --------------------- |
| `prefix`  | `string` | El prefijo a validar. |

## Devuelve

`true` si el prefijo es válido, `false` en caso contrario.
