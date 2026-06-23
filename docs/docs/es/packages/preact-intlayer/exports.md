---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del paquete preact-intlayer
description: Integración específica para Preact de Intlayer, proporcionando providers y hooks para aplicaciones Preact.
keywords:
  - preact-intlayer
  - preact
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - preact-intlayer
  - exports
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Añadida utilidad usePathname"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Documentación unificada para todas las exportaciones"
author: aymericzip
---

# Paquete preact-intlayer

El paquete `preact-intlayer` proporciona las herramientas necesarias para integrar Intlayer en aplicaciones Preact. Incluye providers y hooks para manejar contenido multilingüe.

## Instalación

```bash
npm install preact-intlayer
```

## Exportaciones

### Proveedor

| Componente         | Descripción                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------- |
| `IntlayerProvider` | El proveedor principal que envuelve tu aplicación y proporciona el contexto de Intlayer. |

### Hooks

| Hook            | Descripción                                                                                                                        | Documento relacionado                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Basado en `useDictionary`, pero inyecta una versión optimizada del diccionario a partir de la declaración generada.                | -                                                                                                                    |
| `useDictionary` | Procesa objetos que parecen diccionarios (key, content). Procesa traducciones `t()`, enumeraciones, etc.                           | -                                                                                                                    |
| `useLocale`     | Devuelve la locale actual y una función para establecerla.                                                                         | -                                                                                                                    |
| `usePathname`   | Hook que devuelve la ruta actual habiendo eliminado el segmento del idioma. Reactivo a la navegación del navegador vía `popstate`. | [usePathname](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/preact-intlayer/usePathname.md) |
| `t`             | Selecciona contenido según la locale actual.                                                                                       | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/translation.md)               |

### Componentes

| Componente         | Descripción                                                  |
| ------------------ | ------------------------------------------------------------ |
| `MarkdownProvider` | Proveedor para el contexto de renderizado de Markdown.       |
| `MarkdownRenderer` | Renderiza contenido Markdown con componentes personalizados. |
