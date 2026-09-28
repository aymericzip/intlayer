---
createdAt: 2026-06-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer scan: auditar la i18n y el SEO de un sitio"
description: Aprenda a usar el comando scan de Intlayer CLI para medir el tamaño de la página y auditar la salud de i18n/SEO de cualquier sitio web.
keywords:
  - Scan
  - SEO
  - i18n
  - Auditoría
  - CLI
  - Intlayer
  - Tamaño de página
  - Bundle
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 9.5.11
    date: 2026-09-26
    changes: "Detecta la estrategia de enrutamiento y la stack i18n (librerías, TMS); añade comprobaciones de reciprocidad hreflang, og:locale y selector de idioma; sigue sitemaps de robots.txt, índices de sitemaps y sitemaps comprimidos con gzip"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Añadir el flag `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Agregar comando scan"
author: aymericzip
---

# Escanear sitio web

El comando `scan` obtiene una URL pública, mide el tamaño total de la página y audita la salud de i18n y SEO de la página. Produce un informe puntuado (0–100) que cubre atributos HTML, enlaces canónicos, etiquetas hreflang y sus enlaces de retorno, robots.txt, sitemaps, enlaces internos localizados y el peso de las locales en el bundle de JavaScript.

También informa cómo el sitio codifica la locale en sus URLs (estrategia de enrutamiento) y qué framework, librería i18n, sistema de gestión de traducciones (TMS) o proxy de traducción utiliza. Las mismas comprobaciones impulsan el [escáner SEO i18n en línea](https://intlayer.org/i18n-seo-scanner) y la extensión de Chrome de Intlayer.

No se requieren dependencias adicionales. Cuando [puppeteer](https://pptr.dev/) está instalado, el escaneo puede capturar fragmentos de JavaScript cargados de forma diferida para un análisis de bundle más preciso; de lo contrario, recurre a inspeccionar los scripts cargados de forma activa declarados en el HTML.

## Uso

```bash packageManager="npm"
npx intlayer scan <url>
```

```bash packageManager="yarn"
yarn intlayer scan <url>
```

```bash packageManager="pnpm"
pnpm intlayer scan <url>
```

```bash packageManager="bun"
bun x intlayer scan <url>
```

### Ejemplo

```bash packageManager="npm"
npx intlayer scan https://example.com
```

Ejemplo de salida:

```
🔍 Scanned https://example.com/fr (basic mode)

Score: 91/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: fr, en, es, de
Routing: locale prefix except for the default locale (every hreflang alternate but "en" starts with a locale segment, default locale: en)

Stack:
  Framework Next.js 15.1.0
  i18n library next-intl
  TMS Crowdin
Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ locale signals consistent (lang, URL, hreflang)
  ⚠ og:locale meta tag
      Missing <meta property="og:locale">: social previews default to en_US
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ hreflang alternates link back
  ✓ unused bundle locale content
  ✓ localized internal links
  ⚠ all internal links keep the locale
      2 internal links leave the "fr" locale (0 to another locale, 2 without locale)
        <a href="/pricing">Tarifs</a>
  ✓ crawlable language switcher
  ✓ robots.txt present
  ✓ robots.txt keeps localized URLs crawlable
  ✓ sitemap present
  ✓ sitemap lists every locale
  ✓ sitemap has alternate links
  ✓ sitemap has x-default

Bundle locale weight:
  Translations shipped: 120.50 KB
  Unused (other locales): 45.20 KB (37%)
```

## Opciones

### `<url>` (requerido)

La URL completa a escanear (por ejemplo, `https://example.com`).

### `--no-deep`

Desactiva el escaneo profundo basado en renderizado.

Por defecto, el comando intenta utilizar [puppeteer](https://pptr.dev/) para renderizar la página en un navegador sin interfaz gráfica, capturar fragmentos de JavaScript cargados de forma diferida y medir el tamaño real de transferencia. Si puppeteer no está instalado, el comando recurre automáticamente al modo básico.

Pase `--no-deep` para forzar el modo básico incluso cuando puppeteer esté disponible.

> Ejemplo: `npx intlayer scan https://example.com --no-deep`

### `--json`

Muestra el resultado completo del escaneo como un objeto JSON en lugar de un informe formateado. Útil para el consumo programático o pipelines de CI.

> Ejemplo: `npx intlayer scan https://example.com --json`

### Opciones de configuración estándar

- **`--base-dir`**: Directorio base utilizado para localizar el archivo `intlayer.config.*`.
- **`-e, --env`**: Entorno de destino (por ejemplo, `development`, `production`).
- **`--env-file`**: Ruta a un archivo `.env` personalizado.
- **`--no-cache`**: Desactivar la caché de configuración.
- **`--ci`**: Ejecuta el comando en cada proyecto Intlayer del monorepo (o solo en el actual si se ejecuta desde un directorio de proyecto). Se pueden inyectar credenciales por proyecto mediante `INTLAYER_PROJECT_CREDENTIALS`, un objeto JSON que asocia cada ruta de proyecto a `{ "clientId", "clientSecret" }`.
- **`--verbose`**: Activar el registro detallado (por defecto en modo CLI).
- **`--prefix`**: Prefijo de registro personalizado.

## Estrategia de enrutamiento

El patrón de locale compartido por las alternativas hreflang de la página revela cómo el sitio enruta sus locales. Sin alternativas, solo se utiliza la URL escaneada (baja confianza).

| Estrategia          | Ejemplo                                    |
| ------------------- | ------------------------------------------ |
| `prefix-all`        | `/en/about`, `/fr/about`                   |
| `prefix-no-default` | `/about` (locale por defecto), `/fr/about` |
| `search-params`     | `/about?lang=fr`                           |
| `subdomain`         | `fr.example.com`                           |
| `domain`            | `example.fr`, `example.de`                 |
| `no-prefix`         | Una URL para cada locale (cookie)          |

Las comprobaciones de enlaces, canónicos, robots.txt y sitemaps leen cada URL mediante esta estrategia. Por ejemplo, un enlace sin prefijo es correcto en la locale por defecto de un sitio `prefix-no-default`, y un enlace sin `?lang=` abandona la locale en un sitio `search-params`.

## Stack detectada

Frameworks, librerías i18n (Intlayer, i18next, react-i18next, next-i18next, next-intl, use-intl, react-intl, vue-i18n, @nuxtjs/i18n, Lingui, svelte-i18n, Paraglide, ngx-translate, Transloco, Polylang, WPML…), sistemas de gestión de traducción (Crowdin, Phrase, Lokalise, locize, Transifex, Tolgee, Localazy, SimpleLocalize, Localizely, Smartling, Intlayer CMS) y proxies de traducción (Weglot, Localize, GTranslate…) se identifican a partir del HTML, los recursos cargados y los bundles de JavaScript. El modo profundo también lee variables globales de window y cookies.

## Qué se comprueba

| Comprobación                    | Descripción                                                                                           | Peso de la puntuación |
| ------------------------------- | ----------------------------------------------------------------------------------------------------- | --------------------- |
| `html lang`                     | `<html lang>` está presente y es una etiqueta BCP 47 válida                                           | 9                     |
| `html dir`                      | `dir="rtl"` está configurado para idiomas de derecha a izquierda (`ltr` es el valor por defecto)      | 3                     |
| `locale signals consistent`     | `<html lang>`, la locale de la URL y la entrada hreflang propia coinciden                             | 5                     |
| `og:locale`                     | `og:locale` está configurado y coincide con `<html lang>`                                             | 3                     |
| `canonical`                     | Existe un enlace canónico y no apunta a otra versión de idioma                                        | 10                    |
| `hreflang`                      | Existen etiquetas hreflang, con códigos válidos, URLs absolutas, sin duplicados y con auto-referencia | 9                     |
| `x-default hreflang`            | Existe una alternativa hreflang `x-default`                                                           | 7                     |
| `hreflang alternates link back` | Las alternativas responden con un 200, no están redirigidas, devuelven el enlace y declaran el idioma | 8                     |
| `localized links`               | Los enlaces internos apuntan a la locale de la página                                                 | 8                     |
| `all links keep the locale`     | Ningún enlace interno cambia o descarta la locale                                                     | 6                     |
| `language switcher`             | Existen enlaces `<a href>` rastreables hacia las otras versiones de idioma                            | 6                     |
| `robots.txt present`            | `/robots.txt` devuelve una respuesta 200                                                              | 10                    |
| `robots.txt localized URLs`     | Ni el sitio ni sus URLs localizadas están bloqueadas para Googlebot                                   | 8                     |
| `sitemap present`               | Se encuentra un sitemap (directivas `Sitemap:` en robots.txt, `/sitemap.xml`, `/sitemap_index.xml`)   | 10                    |
| `sitemap locale coverage`       | Cada locale está listada, y las entradas con alternativas se listan a sí mismas                       | 9                     |
| `sitemap alternates`            | El sitemap contiene enlaces alternativos `hreflang`                                                   | 8                     |
| `sitemap x-default`             | El sitemap contiene un hreflang `x-default`                                                           | 7                     |
| `unused bundle content`         | El bundle principal de JS no envía traducciones de otras locales                                      | 8                     |

Una advertencia otorga la mitad del peso. La puntuación final es la suma ponderada de las comprobaciones ejecutadas, expresada como un porcentaje (0–100). Las comprobaciones fallidas imprimen los primeros problemas encontrados; use `--json` para obtener los detalles completos.

## Uso programático de la función de escaneo

La función `scan` también se exporta desde `@intlayer/cli` para que pueda llamarse desde sus propios scripts:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Para un acceso de nivel inferior, `scanWebsite` de `@intlayer/engine/scan` devuelve un objeto `ScanResult` estructurado:

```ts
import { scanWebsite } from "@intlayer/engine/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
