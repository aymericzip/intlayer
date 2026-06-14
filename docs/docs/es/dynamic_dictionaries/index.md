---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: Diccionarios Dinámicos
description: Descripción general de las tres funciones de diccionario dinámico de Intlayer — colecciones, variantes y registros dinámicos — para crear contenido i18n flexible y controlado en tiempo de ejecución.
keywords:
  - Diccionarios Dinámicos
  - Colecciones
  - Variantes
  - Registros Dinámicos
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
author: aymericzip
---

# Diccionarios Dinámicos

Intlayer admite tres mecanismos para expresar contenido que va más allá de un único diccionario estático por clave. Cada uno se declara a través de un **campo de metadatos de nivel superior** en el archivo de contenido; no se necesita ninguna función contenedora (wrapper).

| Característica                                                                                                               | Campo de metadatos | Selector en `useIntlayer` |
| ---------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------------- |
| [Colecciones](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/collections.md)             | `item: N`          | `{ item: N }`             |
| [Variantes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/variants.md)                  | `variant: "name"`  | `{ variant: "name" }`     |
| [Registros Dinámicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dynamic_dictionaries/dynamic_content.md) | `meta: { id, … }`  | `{ id, … }`               |

Los tres se componen con el argumento de configuración regional y admiten la carga selectiva / diferida mediante `importMode`.

## Cuándo usar cada uno

- **Colecciones**: lista ordenada de elementos gestionados en archivos separados (entradas de preguntas frecuentes, publicaciones de blog, productos).
- **Variantes**: alternativas de contenido nombradas para pruebas A/B, banners estacionales o indicadores de funciones (feature flags).
- **Registros dinámicos**: contenido obtenido en tiempo de ejecución mediante un ID opaco (registros de CMS, copia específica del usuario).

## Desambiguación de selectores

Cuando hay múltiples selectores presentes en un diccionario, el orden de resolución es:

```
variant → meta → item
```
