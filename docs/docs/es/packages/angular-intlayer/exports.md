---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del paquete angular-intlayer
description: Integración específica de Intlayer para Angular, proporcionando providers y servicios para aplicaciones Angular.
keywords:
  - angular-intlayer
  - angular
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
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

# Paquete angular-intlayer

El paquete `angular-intlayer` proporciona las herramientas necesarias para integrar Intlayer en aplicaciones Angular. Incluye providers y servicios para gestionar contenido multilingüe.

## Instalación

```bash
npm install angular-intlayer
```

## Exportaciones

Importar:

```tsx
import "angular-intlayer";
```

### Configuración

| Función           | Descripción                                             |
| ----------------- | ------------------------------------------------------- |
| `provideIntlayer` | Función para proveer Intlayer en tu aplicación Angular. |

### Hooks

| Hook                   | Descripción                                                                                                                           | Documento relacionado                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Basado en `useDictionary`, pero inyecta una versión optimizada del diccionario a partir de la declaración generada.                   | -                                                                                                                     |
| `useDictionary`        | Procesa objetos que parecen diccionarios (clave, contenido). Procesa traducciones `t()`, enumeraciones, etc.                          | -                                                                                                                     |
| `useDictionaryAsync`   | Igual que `useDictionary`, pero maneja diccionarios asíncronos.                                                                       | -                                                                                                                     |
| `useDictionaryDynamic` | Igual que `useDictionary`, pero maneja diccionarios dinámicos.                                                                        | -                                                                                                                     |
| `useLocale`            | Devuelve la locale actual y una función para establecerla.                                                                            | -                                                                                                                     |
| `usePathname`          | Devuelve la ruta actual como un `Signal<string>` con el segmento de idioma eliminado. Reactivo a `popstate` a través de `DestroyRef`. | [usePathname](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/angular-intlayer/usePathname.md) |
| `useIntl`              | Devuelve el objeto Intl para la locale actual.                                                                                        | -                                                                                                                     |
| `useLoadDynamic`       | Hook para cargar diccionarios dinámicos.                                                                                              | -                                                                                                                     |

### Componentes

| Componente                  | Descripción                                          |
| --------------------------- | ---------------------------------------------------- |
| `IntlayerMarkdownComponent` | Componente Angular que renderiza contenido Markdown. |
