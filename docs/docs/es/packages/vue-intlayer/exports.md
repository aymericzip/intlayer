---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Paquete vue-intlayer - Documentación
description: Integración específica para Vue de Intlayer, que proporciona plugins y composables para aplicaciones Vue.
keywords:
  - vue-intlayer
  - vue
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Documentación unificada para todas las exportaciones"
author: aymericzip
---

# Paquete vue-intlayer

El paquete `vue-intlayer` proporciona las herramientas necesarias para integrar Intlayer en aplicaciones Vue. Incluye un plugin de Vue y composables para manejar contenido multilingüe.

## Instalación

```bash
npm install vue-intlayer
```

## Exportaciones

### Plugin

Importar:

```tsx
import "vue-intlayer";
```

| Función           | Descripción                                            |
| ----------------- | ------------------------------------------------------ |
| `installIntlayer` | Plugin de Vue para instalar Intlayer en tu aplicación. |

### Composables

Importación:

```tsx
import "vue-intlayer";
```

| Composable             | Descripción                                                                                                                                         | Documento relacionado                                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Basado en `useDictionary`, pero inyecta una versión optimizada del diccionario a partir de la declaración generada.                                 | -                                                                                                                     |
| `useDictionary`        | Procesa objetos que se parecen a diccionarios (clave, contenido). Procesa traducciones `t()`, enumeraciones, etc.                                   | -                                                                                                                     |
| `useDictionaryAsync`   | Igual que `useDictionary`, pero maneja diccionarios asíncronos.                                                                                     | -                                                                                                                     |
| `useDictionaryDynamic` | Igual que `useDictionary`, pero maneja diccionarios dinámicos.                                                                                      | -                                                                                                                     |
| `useLocale`            | Devuelve la locale actual y una función para establecerla.                                                                                          | -                                                                                                                     |
| `useRewriteURL`        | Composable del lado del cliente para gestionar reescrituras de URL. Actualiza automáticamente la URL si existe una regla de reescritura localizada. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/vue-intlayer/useRewriteURL.md) |
| `useIntl`              | Devuelve el objeto Intl para la locale actual.                                                                                                      | -                                                                                                                     |
| `useLoadDynamic`       | Composable para cargar diccionarios dinámicos.                                                                                                      | -                                                                                                                     |

### Funciones

Importación:

```tsx
import "vue-intlayer";
```

| Function        | Descripción                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| `getDictionary` | Procesa objetos que parecen diccionarios (key, content). Procesa traducciones `t()`, enumeraciones, etc.            |
| `getIntlayer`   | Basado en `getDictionary`, pero inyecta una versión optimizada del diccionario a partir de la declaración generada. |

### Markdown

Importación:

```tsx
import "vue-intlayer/markdown";
```

| Función | Descripción |
| `installIntlayerMarkdown` | Plugin de Vue para instalar Intlayer Markdown en tu aplicación. |
