---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del paquete vue-intlayer
description: Integración específica para Vue de Intlayer, proporcionando plugins y composables para aplicaciones Vue.
keywords:
  - vue-intlayer
  - vue
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentación unificada para todas las exportaciones
---

# Paquete vue-intlayer

El paquete `vue-intlayer` proporciona las herramientas necesarias para integrar Intlayer en aplicaciones Vue. Incluye un plugin de Vue y composables para manejar contenido multilingüe.

## Instalación

```bash
npm install vue-intlayer
```

## Exportaciones

### Plugin

| Función           | Descripción                                            |
| ----------------- | ------------------------------------------------------ |
| `installIntlayer` | Plugin de Vue para instalar Intlayer en tu aplicación. |

### Composables

| Composable      | Descripción                                                     |
| --------------- | --------------------------------------------------------------- |
| `useIntlayer`   | Selecciona un diccionario por su clave y devuelve el contenido. |
| `useDictionary` | Selecciona un diccionario por su clave y devuelve el contenido. |
| `useLocale`     | Devuelve la locale actual y una función para establecerla.      |
| `useIntl`       | Devuelve el objeto Intl para la locale actual.                  |

### Funciones

| Función         | Descripción                           |
| --------------- | ------------------------------------- |
| `getDictionary` | Recupera un diccionario.              |
| `getIntlayer`   | Recupera contenido de un diccionario. |

### Markdown

| Función                   | Descripción                                                     |
| ------------------------- | --------------------------------------------------------------- |
| `installIntlayerMarkdown` | Plugin de Vue para instalar Intlayer Markdown en tu aplicación. |
