---
createdAt: 2026-06-12
updatedAt: 2026-06-26
title: Diccionarios dinámicos
description: Resumen de las funciones de diccionarios dinámicos de Intlayer — colecciones y variantes — para crear contenido i18n flexible y dirigido en tiempo de ejecución.
keywords:
  - Diccionarios dinámicos
  - Colecciones
  - Variantes
  - Intlayer
  - Internacionalización
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Lanzamiento de la función de diccionarios dinámicos"
  - version: 9.1.0
    date: 2026-06-26
    changes: "Fusión de los registros dinámicos en las variantes — `variant` ahora acepta una cadena o un objeto"
author: aymericzip
---

# Diccionarios dinámicos

Intlayer admite dos mecanismos para expresar contenido que va más allá de un único diccionario estático por clave. Cada uno se declara mediante un **campo de metadatos de nivel superior** en el archivo de contenido; no se necesita ninguna función envolvente.

| Función                                                                                                          | Campo de metadatos                     | Selector en `useIntlayer`                      |
| ---------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ---------------------------------------------- |
| [Colecciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/collections.md) | `item: N`                              | `{ item: N }`                                  |
| [Variantes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/variants.md)      | `variant: "name"` _o_ `variant: { … }` | `{ variant: "name" }` _o_ `{ variant: { … } }` |

Ambos se combinan con el argumento de locale y admiten la carga selectiva / diferida mediante `importMode`.

## Cuándo usar cada uno

- **Colecciones** — lista ordenada de elementos gestionados en archivos separados (entradas de FAQ, artículos de blog, productos).
- **Variantes** — alternativas de contenido con nombre o estructuradas:
  - una variante de **cadena** para pruebas A/B, banners de temporada o feature flags;
  - una variante de **objeto** para registros de CMS, contenido específico de usuario o cualquier contenido direccionado por un conjunto de campos (los antiguos «registros dinámicos»).

> Las versiones anteriores exponían un campo `meta` separado para el contenido indexado por registro. Se ha fusionado en `variant`: pase un **objeto** a `variant` en lugar de usar `meta`.

## Desambiguación del selector

Una clave puede declarar ambas dimensiones a la vez (p. ej. una colección cuyos elementos tienen cada uno una variante). Se resuelven en el orden:

```
variant → item
```

Así, `{ variant: "promo" }` en una clave variante × item devuelve todos los elementos promo como un array, y añadir `{ item: 2 }` lo reduce a una sola entrada.
