---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del paquete react-native-intlayer
description: Soporte para React Native de Intlayer, que proporciona providers y polyfills.
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
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentación unificada para todas las exportaciones
---

# Paquete react-native-intlayer

El paquete `react-native-intlayer` proporciona las herramientas necesarias para integrar Intlayer en aplicaciones React Native. Incluye un provider y polyfills para el soporte de locales.

## Instalación

```bash
npm install react-native-intlayer
```

## Exportaciones

### Proveedor

| Componente         | Descripción                                                                           |
| ------------------ | ------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Componente Provider que envuelve tu aplicación y proporciona el contexto de Intlayer. |

Importación:

```tsx
import "react-native-intlayer";
```

### Polyfill

| Función            | Descripción                                                                         |
| ------------------ | ----------------------------------------------------------------------------------- |
| `intlayerPolyfill` | Función que aplica los polyfills necesarios para que React Native soporte Intlayer. |

Importación:

```tsx
import "react-native-intlayer";
```

### Configuración de Metro

El paquete `react-native-intlayer` proporciona utilidades de configuración de Metro para garantizar que Intlayer funcione correctamente con React Native.

| Función                   | Descripción                                                                                     |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | Función asíncrona que prepara Intlayer y fusiona la configuración de Metro.                     |
| `configMetroIntlayerSync` | Función síncrona que fusiona la configuración de Metro sin preparar los recursos de Intlayer.   |
| `exclusionList`           | Crea un patrón RegExp para el blockList de Metro para excluir archivos de contenido del bundle. |

Importación:

```tsx
import "react-native-intlayer/metro";
```
