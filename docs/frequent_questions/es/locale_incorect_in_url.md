---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Localización incorrecta obtenida desde la URL
description: Aprende cómo solucionar la localización incorrecta obtenida desde la URL.
keywords:
  - localización
  - url
  - intlayer
  - next.js
  - vite
  - framework
  - middleware
  - configuración
  - prefixDefault
  - noPrefix
slugs:
  - doc
  - faq
  - locale-incorect-in-url
---

# Localización incorrecta obtenida desde la URL

## Descripción del problema

Al intentar acceder al parámetro de localización desde la URL, podrías encontrar un problema donde el valor de la localización es incorrecto:

```js
const { locale } = await params;
console.log(locale); // devuelve "about" en lugar de la localización esperada
```

## Solución

### 1. Verificar la estructura de archivos

Asegúrate de que la ruta del enrutador de tu aplicación Next.js siga esta estructura:

```bash
src/app/[locale]/about/page.tsx
```

### 2. Verificar la configuración del Middleware

El problema suele ocurrir cuando el middleware no está presente o no se activa. El archivo del middleware debe estar ubicado en:

```bash
src/middleware.ts
```

Este middleware es responsable de reescribir las rutas cuando `prefixDefault` está configurado como `false`. Por ejemplo, reescribe `/en/about` a `/about`.

### 3. Patrones de URL según la configuración

#### Configuración predeterminada (`prefixDefault: false`, `noPrefix: false`)

- Inglés: `/about`
- Francés: `/fr/about`
- Español: `/es/about`

#### Con `prefixDefault: true`

- Inglés: `/en/about`
- Francés: `/fr/about`
- Español: `/es/about`

#### Con `noPrefix: true`

- Inglés: `/about`
- Francés: `/about`
- Español: `/about`

src/app/[locale]/about/page.tsx

```
#### Con `prefixDefault: true`

- Inglés: `/en/about`
- Francés: `/fr/about`
- Español: `/es/about`

#### Con `noPrefix: true`

- Inglés: `/about`
- Francés: `/about`
- Español: `/about`

Para más detalles sobre estas opciones de configuración, consulte la [Documentación de Configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md).
```
