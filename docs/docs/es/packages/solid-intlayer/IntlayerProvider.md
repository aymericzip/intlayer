---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del componente IntlayerProvider | solid-intlayer
description: Ver cómo usar el componente IntlayerProvider del paquete solid-intlayer
keywords:
  - IntlayerProvider
  - proveedor
  - Intlayer
  - intlayer
  - Internacionalización
  - Documentación
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - IntlayerProvider
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentación unificada para todas las exportaciones
---

# Documentación del componente IntlayerProvider

El `IntlayerProvider` es el componente raíz que proporciona el contexto de internacionalización a tu aplicación Solid. Gestiona el estado de la locale actual y asegura que todos los componentes hijos puedan acceder a las traducciones.

## Uso

```tsx
import { IntlayerProvider } from "solid-intlayer";

const App = () => (
  <IntlayerProvider>
    <MyComponent />
  </IntlayerProvider>
);
```

## Descripción

El `IntlayerProvider` desempeña los siguientes roles:

1. **Gestión de estado**: Inicializa y almacena la locale actual, usando signals para reactividad.
2. **Resolución de locale**: Determina la locale inicial basándose en cookies, las preferencias del navegador o la configuración por defecto.
3. **Inyección de contexto**: Hace que la locale y la función `setLocale` estén disponibles para cualquier componente a través de hooks como `useIntlayer` o `useLocale`.
4. **Persistencia**: Sincroniza automáticamente los cambios de locale con cookies o local storage para mantener la preferencia del usuario entre sesiones.

## Propiedades

- **locale** (opcional): Establece manualmente la locale actual.
- **defaultLocale** (opcional): Sobrescribe el locale predeterminado de la configuración.
- **setLocale** (opcional): Proporciona una función personalizada para establecer el locale.
- **disableEditor** (opcional): Deshabilita la integración del editor visual.
- **isCookieEnabled** (opcional): Habilita o deshabilita la persistencia mediante cookies.
