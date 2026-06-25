---
createdAt: 2026-01-21
updatedAt: 2026-06-25
title: Documentación del paquete react-native-intlayer
description: Soporte para React Native de Intlayer, que proporciona providers, hooks, polyfills y configuración de Metro.
keywords:
  - react-native-intlayer
  - react-native
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - react-native-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Re-exportar la API completa de react-intlayer (hooks, utilidades, subpaths de format/html/markdown) para que una aplicación React Native solo dependa de react-native-intlayer"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Documentación unificada para todas las exportaciones"
author: aymericzip
---

# Paquete react-native-intlayer

El paquete `react-native-intlayer` proporciona las herramientas necesarias para integrar Intlayer en aplicaciones React Native. Re-exporta la API completa de `react-intlayer` (hooks y utilidades) con un `IntlayerProvider` listo para React Native, además de los polyfills y la configuración de Metro que requiere React Native.

> En una aplicación React Native, importa **todo** desde `react-native-intlayer`. No necesitas instalar ni importar `react-intlayer` directamente.

## Instalación

```bash
npm install react-native-intlayer
```

## Exportaciones

### Proveedor

| Componente         | Descripción                                                                                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Componente Provider que envuelve tu aplicación y proporciona el contexto de Intlayer. Aplica automáticamente los polyfills necesarios. |

```tsx
import { IntlayerProvider } from "react-native-intlayer";
```

### Hooks y utilidades

Estos se re-exportan desde `react-intlayer`, por lo que puedes importarlos directamente desde `react-native-intlayer`:

| Exportación                                                                                                       | Descripción                                                   |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `useIntlayer`                                                                                                     | Accede al contenido localizado para una clave de diccionario. |
| `useLocale`                                                                                                       | Lee y cambia el locale actual.                                |
| `useDictionary`, `useDictionaryAsync`, `useDictionaryDynamic`, `useLoadDynamic`                                   | Carga el contenido del diccionario de diversas formas.        |
| `useI18n`                                                                                                         | Hook compatible con i18next.                                  |
| `t`                                                                                                               | Ayudante de traducción en línea.                              |
| `getIntlayer`, `getDictionary`                                                                                    | Obtención de contenido imperativa.                            |
| `localeCookie`, `localeInStorage`, `setLocaleCookie`, `setLocaleInStorage`, `useLocaleCookie`, `useLocaleStorage` | Ayudantes de persistencia de locale.                          |

```tsx
import { useIntlayer, useLocale, t } from "react-native-intlayer";
```

### Polyfill

| Función            | Descripción                                                                         |
| ------------------ | ----------------------------------------------------------------------------------- |
| `intlayerPolyfill` | Función que aplica los polyfills necesarios para que React Native soporte Intlayer. |

```tsx
import { intlayerPolyfill } from "react-native-intlayer";
```

> El polyfill se aplica automáticamente cuando importas `IntlayerProvider`. Llama a `intlayerPolyfill` manualmente solo si necesitas los polyfills antes de que se monte el provider.

### Formateadores

Los hooks de formato numérico, de fecha y otros basados en Intl están disponibles desde el subpath `/format`:

```tsx
import { useNumber, useDate } from "react-native-intlayer/format";
```

### Renderizado de Markdown y HTML

```tsx
import { MarkdownProvider } from "react-native-intlayer/markdown";
import { HTMLProvider } from "react-native-intlayer/html";
```

### Configuración de Metro

El paquete `react-native-intlayer` proporciona utilidades de configuración de Metro para garantizar que Intlayer funcione correctamente con React Native.

| Función                   | Descripción                                                                                     |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | Función asíncrona que prepara Intlayer y fusiona la configuración de Metro.                     |
| `configMetroIntlayerSync` | Función síncrona que fusiona la configuración de Metro sin preparar los recursos de Intlayer.   |
| `exclusionList`           | Crea un patrón RegExp para el blockList de Metro para excluir archivos de contenido del bundle. |

```tsx
import { configMetroIntlayer } from "react-native-intlayer/metro";
```
