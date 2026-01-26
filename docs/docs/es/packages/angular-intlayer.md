---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del paquete angular-intlayer
description: Integración específica de Intlayer para Angular, que proporciona providers y servicios para aplicaciones Angular.
keywords:
  - angular-intlayer
  - angular
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentación unificada para todas las exportaciones
---

# Paquete angular-intlayer

El paquete `angular-intlayer` proporciona las herramientas necesarias para integrar Intlayer en aplicaciones Angular. Incluye providers y servicios para manejar contenido multilingüe.

## Instalación

```bash
npm install angular-intlayer
```

## Exportaciones

### Configuración

| Función           | Descripción                                                  |
| ----------------- | ------------------------------------------------------------ |
| `provideIntlayer` | Función para proporcionar Intlayer en su aplicación Angular. |

### Servicios

| Servicio          | Descripción                                                                  |
| ----------------- | ---------------------------------------------------------------------------- |
| `IntlayerService` | Servicio que selecciona un diccionario por su clave y devuelve el contenido. |
| `LocaleService`   | Servicio que devuelve el locale actual y una función para establecerlo.      |

### Componentes

| Componente                  | Descripción                                          |
| --------------------------- | ---------------------------------------------------- |
| `IntlayerMarkdownComponent` | Componente Angular que renderiza contenido Markdown. |
