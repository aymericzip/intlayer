---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del paquete next-intlayer
description: Integración específica para Next.js de Intlayer, que proporciona middleware y providers para App Router y Page Router.
keywords:
  - next-intlayer
  - nextjs
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentación unificada para todas las exportaciones
---

# Paquete next-intlayer

El paquete `next-intlayer` proporciona las herramientas necesarias para integrar Intlayer en aplicaciones Next.js. Soporta tanto el App Router como el Page Router, incluyendo middleware para el enrutamiento basado en locale.

## Instalación

```bash
npm install next-intlayer
```

## Exportaciones

### Middleware

| Función              | Descripción                                                                          |
| -------------------- | ------------------------------------------------------------------------------------ |
| `intlayerMiddleware` | Middleware de Next.js para manejar el enrutamiento basado en locale y redirecciones. |

### Proveedores

| Componente               | Descripción                                                               |
| ------------------------ | ------------------------------------------------------------------------- |
| `IntlayerClientProvider` | Proveedor para componentes del lado del cliente en Next.js.               |
| `IntlayerServerProvider` | Proveedor para componentes del lado del servidor en Next.js (App Router). |

### Hooks (lado del cliente)

Reexporta la mayoría de los hooks desde `react-intlayer`.

| Hook            | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| `useIntlayer`   | Selecciona un diccionario por su clave y devuelve su contenido. |
| `useDictionary` | Selecciona un diccionario por su clave y devuelve su contenido. |
| `useLocale`     | Devuelve la locale actual y una función para establecerla.      |
| `useI18n`       | Devuelve los valores actuales del contexto de Intlayer.         |

### Functions (lado del servidor)

| Function               | Description                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `t`                    | Versión del lado del servidor de la función de traducción para Next.js App Router. |
| `generateStaticParams` | Genera parámetros estáticos para las rutas dinámicas de Next.js.                   |

### Tipos

| Tipo                 | Descripción                                           |
| -------------------- | ----------------------------------------------------- |
| `NextPageIntlayer`   | Tipo para páginas de Next.js con soporte de Intlayer. |
| `NextLayoutIntlayer` | Tipo para layouts de Next.js con soporte de Intlayer. |
