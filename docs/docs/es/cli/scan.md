---
createdAt: 2026-06-11
updatedAt: 2026-06-11
title: Escanear sitio web
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
  - version: 8.13.0
    date: 2026-06-11
    changes: "Agregar comando scan"
author: aymericzip
---

# Escanear sitio web

El comando `scan` obtiene una URL pública, mide el tamaño total de la página y audita la salud de i18n y SEO de la página. Produce un informe puntuado (0–100) que cubre atributos HTML, enlaces canónicos, etiquetas hreflang, robots.txt, sitemap.xml, enlaces internos localizados y el peso de las locales en el bundle de JavaScript.

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
🔍 Scanned https://example.com (basic mode)

Score: 90/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: en, fr, es, de, …

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ localized internal links
  ⚠ all internal links localized
  ✓ current locale detected
  ✓ robots.txt present
  ✓ robots.txt keeps locale paths crawlable
  ✓ sitemap.xml present
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

- **`--base-dir`** — Directorio base utilizado para localizar el archivo `intlayer.config.*`.
- **`-e, --env`** — Entorno de destino (por ejemplo, `development`, `production`).
- **`--env-file`** — Ruta a un archivo `.env` personalizado.
- **`--no-cache`** — Desactivar la caché de configuración.
- **`--verbose`** — Activar el registro detallado (por defecto en modo CLI).
- **`--prefix`** — Prefijo de registro personalizado.

## Qué se comprueba

| Comprobación              | Descripción                                                         | Peso de la puntuación |
| ------------------------- | ------------------------------------------------------------------- | --------------------- |
| `html lang`               | El atributo `<html lang="…">` está presente                         | 9                     |
| `html dir`                | El atributo `<html dir="…">` está presente                          | 3                     |
| `canonical`               | `<link rel="canonical">` está presente                              | 10                    |
| `hreflang`                | Las etiquetas `<link rel="alternate" hreflang="…">` están presentes | 9                     |
| `x-default hreflang`      | Existe una alternativa hreflang `x-default`                         | 7                     |
| `localized links`         | Al menos un enlace interno incluye un segmento de idioma            | 5                     |
| `all links localized`     | Cada enlace interno incluye un segmento de idioma                   | 5                     |
| `current locale`          | Se puede detectar el idioma de la página                            | 3                     |
| `robots.txt present`      | `/robots.txt` devuelve una respuesta 200                            | 10                    |
| `robots.txt locale paths` | Ninguna ruta de idioma está bloqueada en robots.txt                 | 10                    |
| `sitemap.xml present`     | `/sitemap.xml` devuelve una respuesta 200                           | 10                    |
| `sitemap locale coverage` | Cada idioma detectado aparece en el sitemap                         | 10                    |
| `sitemap alternates`      | El sitemap contiene enlaces alternativos `hreflang`                 | 5                     |
| `sitemap x-default`       | El sitemap contiene un hreflang `x-default`                         | 5                     |
| `unused bundle content`   | El bundle JS no contiene datos de idiomas no utilizados excesivos   | 9                     |

La puntuación final es la suma ponderada de todas las comprobaciones aprobadas expresada como un porcentaje (0–100).

## Uso programático de la función de escaneo

La función `scan` también se exporta desde `@intlayer/cli` para que pueda llamarse desde sus propios scripts:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Para un acceso de nivel inferior, `scanWebsite` de `@intlayer/chokidar/scan` devuelve un objeto `ScanResult` estructurado:

```ts
import { scanWebsite } from "@intlayer/chokidar/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
