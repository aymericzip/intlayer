---
createdAt: 2026-04-02
updatedAt: 2026-04-02
title: Dominios personalizados
description: Aprenda a configurar el enrutamiento de locales basado en dominios en Intlayer para servir diferentes locales desde nombres de host dedicados.
keywords:
  - Dominios personalizados
  - Enrutamiento por dominio
  - Enrutamiento
  - Internacionalización
  - i18n
slugs:
  - doc
  - concept
  - custom_domains
history:
  - version: 8.5.0
    date: 2026-04-02
    changes: "Se agregó el enrutamiento de locales basado en dominios a través de la configuración routing.domains."
---

# Dominios personalizados

Intlayer admite el enrutamiento de locales basado en dominios, lo que le permite servir locales específicos desde nombres de host dedicados. Por ejemplo, los visitantes chinos pueden ser dirigidos a `intlayer.zh` en lugar de `intlayer.org/zh`.

## Cómo funciona

El mapa `domains` en `routing` asocia cada locale con un nombre de host. Intlayer utiliza este mapa en dos lugares:

1. **Generación de URL** (`getLocalizedUrl`): cuando el locale de destino vive en un dominio _diferente_ al de la página actual, se devuelve una URL absoluta (por ejemplo, `https://intlayer.zh/about`). Cuando ambos dominios coinciden, se devuelve una URL relativa (por ejemplo, `/fr/about`).
2. **Proxy del servidor** (Next.js y Vite): las solicitudes entrantes se redirigen o reescriben en función del dominio en el que llegan.

### Dominios exclusivos frente a compartidos

La distinción clave es la **exclusividad**:

- **Dominio exclusivo** — solo un locale se asigna a ese nombre de host (por ejemplo, `zh → intlayer.zh`). El dominio en sí identifica el locale, por lo que no se añade ningún prefijo de locale a la ruta. `https://intlayer.zh/about` sirve contenido en chino.
- **Dominio compartido** — varios locales se asignan al mismo nombre de host (por ejemplo, `en` y `fr` se asignan a `intlayer.org`). Se aplica el enrutamiento estándar basado en prefijos. `intlayer.org/fr/about` sirve contenido en francés.

## Configuración

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.CHINESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
    domains: {
      // Dominio compartido — en y fr usan enrutamiento por prefijo en intlayer.org
      en: "intlayer.org",
      // Dominio exclusivo — zh tiene su propio nombre de host, no se necesita el prefijo /zh/
      zh: "intlayer.zh",
    },
  },
};

export default config;
```

Los locales que no figuran en `domains` continúan usando el enrutamiento estándar por prefijo sin ninguna anulación de dominio.

## Generación de URL

`getLocalizedUrl` produce automáticamente el tipo de URL correcto según el contexto de la llamada.

### Locale en el mismo dominio (URL relativa)

```ts
// Página actual: intlayer.org/about
getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.org" });
// → "/fr/about"

getLocalizedUrl("/about", "en", { currentDomain: "intlayer.org" });
// → "/about"  (locale predeterminado, sin prefijo)
```

### Locale en un dominio diferente (URL absoluta)

```ts
// Página actual: intlayer.org/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.org" });
// → "https://intlayer.zh/about"  (dominio exclusivo, sin prefijo /zh/)
```

### Servir desde el propio dominio del locale

```ts
// Página actual: intlayer.zh/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.zh" });
// → "/about"  (ya está en el dominio correcto — URL relativa)

getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.zh" });
// → "https://intlayer.org/fr/about"  (enlace entre dominios de vuelta a intlayer.org)
```

### Autodetección del dominio actual

`currentDomain` es opcional. Cuando se omite, `getLocalizedUrl` lo resuelve en este orden:

1. El nombre de host de una URL de entrada absoluta (por ejemplo, `https://intlayer.org/about` → `intlayer.org`).
2. `window.location.hostname` en entornos de navegador.
3. Si ninguno está disponible (SSR sin opción explícita), se devuelve una URL relativa para locales del mismo dominio y no se produce ninguna URL absoluta — este es el respaldo seguro.

```ts
// Navegador — window.location.hostname === 'intlayer.org'
getLocalizedUrl("/about", "zh");
// → "https://intlayer.zh/about"  (detectado automáticamente desde window)

// Desde una URL absoluta — dominio detectado automáticamente
getLocalizedUrl("https://intlayer.org/about", "zh");
// → "https://intlayer.zh/about"
```

### `getMultilingualUrls` con dominios

`getMultilingualUrls` llama a `getLocalizedUrl` para cada locale, por lo que produce una mezcla de URL relativas y absolutas según el dominio de quien lo llama:

```ts
// currentDomain: 'intlayer.org'
getMultilingualUrls("/about", { currentDomain: "intlayer.org" });
// {
//   en: "/about",
//   fr: "/fr/about",
//   es: "/es/about",
//   zh: "https://intlayer.zh/about",
// }
```

Estas URL absolutas están listas para usarse en etiquetas `<link rel="alternate" hreflang="...">` para SEO.

## Comportamiento del Proxy

### Next.js

El middleware `intlayerProxy` maneja automáticamente el enrutamiento de dominios. Agréguelo a su `middleware.ts`:

```typescript fileName="middleware.ts"
export { intlayerProxy as default } from "next-intlayer/proxy";

export const config = {
  matcher: "/((?!api|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
```

**Redirección** — la solicitud llega al dominio equivocado para un prefijo de locale dado:

```
GET intlayer.org/zh/about
→ 301 https://intlayer.zh/about
```

**Reescritura** — la solicitud llega al dominio exclusivo del locale sin un prefijo:

```
GET intlayer.zh/about
→ reescritura a /zh/about  (solo enrutamiento interno de Next.js, la URL se mantiene limpia)
```

### Vite

El complemento Vite `intlayerProxy` aplica la misma lógica durante el desarrollo:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

> **Nota**: en el desarrollo local normalmente se encuentra en `localhost`, por lo que las redirecciones entre dominios apuntarán a los dominios en vivo en lugar de a otro puerto local. Use una anulación en el archivo hosts (por ejemplo, `127.0.0.1 intlayer.zh`) o un proxy inverso si necesita probar el enrutamiento multidominio localmente.

## Selector de locale

El hook `useLocale` de `next-intlayer` maneja la navegación consciente del dominio automáticamente. Cuando un usuario cambia a un locale en un dominio diferente, el hook realiza una navegación de página completa (`window.location.href`) en lugar de un push del enrutador del lado del cliente, porque el enrutador de Next.js no puede cruzar orígenes.

```tsx fileName="components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { availableLocales, locale, setLocale } = useLocale();

  return (
    <ul>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <button
            onClick={() => setLocale(localeEl)}
            aria-current={localeEl === locale ? "true" : undefined}
          >
            {l.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};
```

No se requiere configuración adicional — `useLocale` detecta `window.location.hostname` internamente y decide entre `router.replace` (mismo dominio) y `window.location.href` (dominio cruzado).

## SEO: Enlaces alternativos `hreflang`

El enrutamiento basado en dominios se usa comúnmente junto con `hreflang` para indicar a los motores de búsqueda qué URL indexar para cada idioma. Use `getMultilingualUrls` para generar el conjunto completo de URL alternativas:

```tsx fileName="app/[locale]/layout.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const alternates = getMultilingualUrls("/", {
    currentDomain: process.env.NEXT_PUBLIC_DOMAIN, // ej. "intlayer.org"
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
};
```

Esto produce:

```html
<link rel="alternate" hreflang="en" href="https://intlayer.org/" />
<link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/" />
<link rel="alternate" hreflang="es" href="https://intlayer.org/es/" />
<link rel="alternate" hreflang="zh" href="https://intlayer.zh/" />
```

## Utilidades principales

| Utilidad                                          | Descripción                                                                                            |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `getLocalizedUrl(url, locale, { currentDomain })` | Devuelve una URL relativa o absoluta dependiendo de si el locale de destino está en el dominio actual. |
| `getMultilingualUrls(url, { currentDomain })`     | Devuelve un mapa de URL localizadas por locale, mezclando relativas y absolutas según sea necesario.   |
| `getPrefix(locale, { domains })`                  | Devuelve un prefijo vacío para locales de dominio exclusivo, de lo contrario, un prefijo normal.       |
