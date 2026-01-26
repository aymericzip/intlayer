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
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentación unificada para todas las exportaciones
---

# Paquete next-intlayer

El paquete `next-intlayer` proporciona las herramientas necesarias para integrar Intlayer en aplicaciones Next.js. Soporta tanto el App Router como el Page Router, incluyendo middleware para el enrutamiento basado en la locale.

## Instalación

```bash
npm install next-intlayer
```

## Exportaciones

### Middleware

Import:

```tsx
import "next-intlayer/middleware";
```

| Función              | Descripción                                                                                                                                                                                     | Documento relacionado                                                                                                            |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerMiddleware` | Middleware de Next.js para manejar el enrutamiento y las redirecciones basadas en locale. Detecta la locale a partir de cabeceras/cookies y redirige a la ruta correspondiente para esa locale. | [intlayerMiddleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/intlayerMiddleware.md) |

### Ayudantes de configuración

Import:

```tsx
import "next-intlayer/server";
```

| Función            | Descripción                                                                                                                                                                                                               | Documento relacionado |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `withIntlayer`     | Ayudante asíncrono para envolver la configuración de Next.js, asegurando que los diccionarios de Intlayer estén preparados antes de la compilación. Prepara los archivos de contenido y configura plugins de webpack/SWC. | -                     |
| `withIntlayerSync` | Ayudante síncrono para envolver la configuración de Next.js, ideal para configuraciones donde la asincronía no es posible/deseada. No prepara los diccionarios al iniciar el servidor.                                    | -                     |

### Proveedores

Importar:

```tsx
import "next-intlayer";
```

o

```tsx
import "next-intlayer/server";
```

| Componente               | Descripción                                                                                                                                  | Doc relacionado |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `IntlayerClientProvider` | Proveedor para componentes del lado del cliente en el App Router de Next.js. Envuelve a `IntlayerProvider` de react-intlayer.                | -               |
| `IntlayerServerProvider` | Proveedor para componentes del lado del servidor en Next.js (App Router). Proporciona el contexto de locale en el servidor.                  | -               |
| `IntlayerServer`         | Envoltorio del lado del servidor para contenido de Intlayer en el App Router. Asegura el manejo adecuado de locale en los Server Components. | -               |

### Hooks (lado del cliente)

Importar:

```tsx
import "next-intlayer";
```

Reexporta la mayoría de los hooks desde `react-intlayer`.

| Hook                   | Descripción                                                                                                                                               | Documento relacionado                                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Hook del lado del cliente que selecciona un diccionario por su key y devuelve su contenido. Usa la locale del contexto si no se proporciona.              | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Hook que transforma un objeto diccionario y devuelve el contenido para la locale actual. Procesa las traducciones `t()`, enumeraciones, etc.              | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Hook que maneja diccionarios asíncronos. Acepta un mapa de diccionarios basado en promesas y lo resuelve para la locale actual.                           | -                                                                                                                       |
| `useDictionaryDynamic` | Hook que maneja diccionarios dinámicos cargados por clave. Usa React Suspense internamente para los estados de carga.                                     | -                                                                                                                       |
| `useLocale`            | Hook del lado del cliente para obtener la locale actual y una función para cambiarla. Mejorado para Next.js App Router con soporte de navegación.         | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useLocale.md)         |
| `useRewriteURL`        | Hook del lado del cliente para gestionar reescrituras de URL. Actualiza automáticamente la URL si existe una regla de reescritura localizada más legible. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/next-intlayer/useRewriteURL.md)  |
| `useLocalePageRouter`  | Hook específico del Page Router de Next.js para la gestión de locales. Maneja redirecciones y recargas de página al cambiar el locale.                    | -                                                                                                                       |
| `useI18n`              | Hook que proporciona una función de traducción `t()` para acceder a contenido anidado por clave. Emula el patrón de i18next/next-intl.                    | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Hook que proporciona un objeto `Intl` vinculado a la locale. Inyecta automáticamente la locale actual y utiliza un caché optimizado.                      | -                                                                                                                       |
| `useLoadDynamic`       | Hook para cargar diccionarios dinámicos usando React Suspense. Acepta una key y una promise, y almacena en caché los resultados.                          | -                                                                                                                       |

### Funciones (lado del servidor)

Importar:

```tsx
import "next-intlayer/server";
```

| Función                | Descripción                                                                                                                                                       | Doc relacionado                                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `t`                    | Versión del lado del servidor de la función de traducción para Next.js App Router. Devuelve la traducción de contenido multilingüe para la locale del servidor.   | [traducción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/dictionary/translation.md) |
| `getLocale`            | Función auxiliar para extraer la locale actual de los headers y cookies de Next.js. Diseñada para Server Components, Server Actions o Route Handlers.             | -                                                                                                             |
| `generateStaticParams` | Genera parámetros estáticos para las rutas dinámicas de Next.js basadas en los locales configurados. Devuelve un array de objetos locale para el pre-renderizado. | -                                                                                                             |
| `locale`               | Función para obtener o establecer el locale en el contexto del servidor (App Router). Proporciona gestión de locales en Server Components.                        | -                                                                                                             |

### Tipos

Importar:

```tsx
import "next-intlayer";
```

| Tipo                   | Descripción                                                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `NextPageIntlayer`     | Tipo para páginas de Next.js con soporte de Intlayer. Tipo genérico que incluye el parámetro `locale`.                              |
| `Next14PageIntlayer`   | Tipo para páginas de Next.js 14 con soporte de Intlayer.                                                                            |
| `Next15PageIntlayer`   | Tipo para páginas de Next.js 15 con soporte de Intlayer.                                                                            |
| `NextLayoutIntlayer`   | Tipo para layouts de Next.js con soporte de Intlayer. Tipo genérico que incluye el parámetro `locale`.                              |
| `Next14LayoutIntlayer` | Tipo para layouts de Next.js 14 con soporte de Intlayer.                                                                            |
| `Next15LayoutIntlayer` | Tipo para layouts de Next.js 15 con soporte de Intlayer.                                                                            |
| `LocalParams`          | Tipo para parámetros de ruta de Next.js con locale. Objeto con la propiedad `locale`.                                               |
| `LocalPromiseParams`   | Tipo para parámetros de ruta de Next.js con locale (versión asíncrona). Promise que resuelve a un objeto con la propiedad `locale`. |
