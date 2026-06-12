---
createdAt: 2026-06-11
updatedAt: 2026-06-11
title: Website Scannen
description: Leer hoe u het Intlayer CLI scan-commando gebruikt om de paginagrootte te meten en de i18n/SEO-status van een website te controleren.
keywords:
  - Scan
  - SEO
  - i18n
  - Audit
  - CLI
  - Intlayer
  - Paginagrootte
  - Bundle
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 8.13.0
    date: 2026-06-11
    changes: "Scan commando toegevoegd"
author: aymericzip
---

# Website Scannen

Het `scan`-commando haalt een openbare URL op, meet de totale paginagrootte en controleert de i18n- en SEO-status van de pagina. Het genereert een score-rapport (0-100) dat HTML-attributen, canonieke links, hreflang-tags, robots.txt, sitemap.xml, gelokaliseerde interne links en het gewicht van de taalbestanden in de JavaScript-bundel dekt.

Er zijn geen extra afhankelijkheden vereist. Wanneer [puppeteer](https://pptr.dev/) is geïnstalleerd, kan de scan asynchroon geladen (lazy-loaded) JavaScript-chunks detecteren voor een nauwkeurigere bundelanalyse; anders valt het terug op het inspecteren van direct geladen scripts die in de HTML zijn gedeclareerd.

## Gebruik

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

### Voorbeeld

```bash packageManager="npm"
npx intlayer scan https://example.com
```

Voorbeelduitvoer:

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

## Opties

### `<url>` (vereist)

De volledige URL die moet worden gescand (bijv. `https://example.com`).

### `--no-deep`

Schakelt de diepere, op rendering gebaseerde scan uit.

Standaard probeert het commando [puppeteer](https://pptr.dev/) te gebruiken om de pagina in een headless browser te renderen, asynchroon geladen JavaScript-chunks te detecteren en de werkelijke overdrachtsgrootte te meten. Als puppeteer niet is geïnstalleerd, valt het commando automatisch terug op de basismodus.

Gebruik `--no-deep` om de basismodus te forceren, zelfs als puppeteer beschikbaar is.

> Voorbeeld: `npx intlayer scan https://example.com --no-deep`

### `--json`

Exporteert het volledige scanresultaat als een JSON-object in plaats van een geformatteerd rapport. Handig voor programmatisch gebruik of in CI-pipelines.

> Voorbeeld: `npx intlayer scan https://example.com --json`

### Standaard configuratie-opties

- **`--base-dir`** — Basismap die wordt gebruikt om het bestand `intlayer.config.*` te vinden.
- **`-e, --env`** — Doelomgeving (bijv. `development`, `production`).
- **`--env-file`** — Pad naar een aangepast `.env`-bestand.
- **`--no-cache`** — Configuratiecache uitschakelen.
- **`--verbose`** — Gedetailleerde logboekregistratie inschakelen (standaard in CLI-modus).
- **`--prefix`** — Aangepaste logboekprefix.

## Wat wordt er gecontroleerd

| Controle                  | Beschrijving                                                | Score gewicht |
| ------------------------- | ----------------------------------------------------------- | ------------- |
| `html lang`               | Het attribuut `<html lang="…">` is aanwezig                 | 9             |
| `html dir`                | Het attribuut `<html dir="…">` is aanwezig                  | 3             |
| `canonical`               | `<link rel="canonical">` is aanwezig                        | 10            |
| `hreflang`                | `<link rel="alternate" hreflang="…">`-tags zijn aanwezig    | 9             |
| `x-default hreflang`      | Er bestaat een `x-default` hreflang alternatief             | 7             |
| `localized links`         | Ten minste één interne link bevat een taalsegment           | 5             |
| `all links localized`     | Elke interne link bevat een taalsegment                     | 5             |
| `current locale`          | De paginataal kan worden gedetecteerd                       | 3             |
| `robots.txt present`      | `/robots.txt` retourneert een 200 response                  | 10            |
| `robots.txt locale paths` | Geen enkel taalpad is geblokkeerd in robots.txt             | 10            |
| `sitemap.xml present`     | `/sitemap.xml` retourneert een 200 response                 | 10            |
| `sitemap locale coverage` | Elke gedetecteerde taal verschijnt in de sitemap            | 10            |
| `sitemap alternates`      | De sitemap bevat `hreflang` alternatieve links              | 5             |
| `sitemap x-default`       | De sitemap bevat een `x-default` hreflang                   | 5             |
| `unused bundle content`   | De JS-bundel bevat geen overmatige ongebruikte taalgegevens | 9             |

De eindscore is de gewogen som van alle geslaagde controles uitgedrukt als een percentage (0–100).

## De scanfunctie programmatisch gebruiken

De `scan`-functie wordt ook geëxporteerd vanuit `@intlayer/cli` zodat deze vanuit uw eigen scripts kan worden aangeroepen:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Voor toegang op een lager niveau retourneert `scanWebsite` van `@intlayer/chokidar/scan` een gestructureerd `ScanResult`-object:

```ts
import { scanWebsite } from "@intlayer/chokidar/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
