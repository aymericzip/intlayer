---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del componente IntlayerProvider | react-intlayer
description: Vea cómo usar el componente IntlayerProvider para el paquete react-intlayer
keywords:
  - IntlayerProvider
  - react
  - Intlayer
  - intlayer
  - Internacionalización
  - Documentación
slugs:
  - doc
  - packages
  - react-intlayer
  - IntlayerProvider
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Documento inicial
---

# Documentación del componente IntlayerProvider

El componente `IntlayerProvider` es el proveedor principal de Intlayer en aplicaciones React. Proporciona el contexto de Intlayer a todos sus hijos.

## Uso

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ children }) => <IntlayerProvider>{children}</IntlayerProvider>;
```

## Propiedades

| Propiedad         | Tipo                              | Descripción                                           |
| ----------------- | --------------------------------- | ----------------------------------------------------- |
| `locale`          | `LocalesValues`                   | El locale inicial a usar.                             |
| `defaultLocale`   | `LocalesValues`                   | El locale por defecto a usar como fallback.           |
| `setLocale`       | `(locale: LocalesValues) => void` | Una función personalizada para establecer el locale.  |
| `disableEditor`   | `boolean`                         | Indica si desactivar el editor.                       |
| `isCookieEnabled` | `boolean`                         | Indica si habilitar cookies para almacenar el locale. |
