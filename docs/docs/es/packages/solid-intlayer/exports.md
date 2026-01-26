---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del paquete solid-intlayer
description: Integración específica para Solid de Intlayer, que proporciona providers y hooks para aplicaciones Solid.
keywords:
  - solid-intlayer
  - solidjs
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# Paquete solid-intlayer

El paquete `solid-intlayer` proporciona las herramientas necesarias para integrar Intlayer en aplicaciones Solid. Incluye providers y hooks para gestionar contenido multilingüe.

## Instalación

```bash
npm install solid-intlayer
```

## Exportaciones

### Proveedor

Importar:

```tsx
import "solid-intlayer";
```

| Componente         | Descripción                                                                              | Documento relacionado                                                                                                         |
| ------------------ | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | El proveedor principal que envuelve tu aplicación y proporciona el contexto de Intlayer. | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/solid-intlayer/IntlayerProvider.md) |

### Hooks

Importar:

```tsx
import "solid-intlayer";
```

| Hook                   | Descripción                                                                                                                                   | Documento relacionado                                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Basado en `useDictionary`, pero inyecta una versión optimizada del diccionario a partir de la declaración generada.                           | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/solid-intlayer/useIntlayer.md)     |
| `useDictionary`        | Procesa objetos que parecen diccionarios (clave, contenido). Procesa traducciones `t()`, enumeraciones, etc.                                  | -                                                                                                                       |
| `useDictionaryAsync`   | Igual que `useDictionary`, pero maneja diccionarios asíncronos.                                                                               | -                                                                                                                       |
| `useDictionaryDynamic` | Igual que `useDictionary`, pero maneja diccionarios dinámicos.                                                                                | -                                                                                                                       |
| `useLocale`            | Devuelve el locale actual y una función para establecerlo.                                                                                    | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/solid-intlayer/useLocale.md)         |
| `useRewriteURL`        | Hook del lado del cliente para gestionar reescrituras de URL. Actualiza automáticamente la URL si existe una regla de reescritura localizada. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/solid-intlayer/useRewriteURL.md) |
| `useIntl`              | Devuelve el objeto Intl para el locale actual.                                                                                                | -                                                                                                                       |
| `useLoadDynamic`       | Hook para cargar diccionarios dinámicos.                                                                                                      | -                                                                                                                       |
| `t`                    | Selecciona contenido según la locale actual.                                                                                                  | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/translation.md)                  |

### Componentes

Importar:

```tsx
import "solid-intlayer";
```

| Componente         | Descripción                                            |
| ------------------ | ------------------------------------------------------ |
| `MarkdownProvider` | Proveedor para el contexto de renderizado de Markdown. |
