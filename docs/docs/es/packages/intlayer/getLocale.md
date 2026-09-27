---
createdAt: 2026-01-21
updatedAt: 2026-09-27
priority: 5
title: Documentación de la función getLocale | intlayer
description: "Usa getLocale para detectar la locale a partir de una cadena como una URL o una ruta, con respaldo a tu locale por defecto."
keywords:
  - getLocale
  - traducción
  - Intlayer
  - intlayer
  - Internacionalización
  - Documentación
slugs:
  - doc
  - packages
  - intlayer
  - getLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Inicialización de la documentación"
author: aymericzip
---

# Documentación de la función getLocale

La función `getLocale` te permite detectar la locale a partir de una cadena dada, como una URL o una ruta.

## Uso

```ts
import { getLocale } from "intlayer";

const locale = getLocale("/fr/about");

// Salida: 'fr'
```

## Parámetros

| Parámetro | Tipo     | Descripción                                                     |
| --------- | -------- | --------------------------------------------------------------- |
| `path`    | `string` | La ruta o cadena de caracteres desde la cual extraer la locale. |

## Devuelve

La locale detectada, o la locale predeterminada si no se detecta ninguna.
