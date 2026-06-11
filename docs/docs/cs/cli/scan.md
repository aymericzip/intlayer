---
createdAt: 2026-06-11
updatedAt: 2026-06-11
title: Scan Website
description: Naučte se používat příkaz scan v Intlayer CLI pro měření velikosti stránky a audit i18n/SEO zdraví jakéhokoli webu.
keywords:
  - Scan
  - SEO
  - i18n
  - Audit
  - CLI
  - Intlayer
  - Velikost stránky
  - Bundle
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 8.13.0
    date: 2026-06-11
    changes: "Přidán obsah příkazu scan"
---

# Scan Website

Příkaz `scan` načte veřejnou URL, změří celkovou velikost stránky a provede audit i18n a SEO zdraví stránky. Vygeneruje bodovaný report (0–100) zahrnující HTML atributy, kanonické odkazy, tagy hreflang, robots.txt, sitemap.xml, lokalizované interní odkazy a velikost lokalizačních dat v JavaScript balíčku (bundle).

Nejsou vyžadovány žádné další závislosti. Pokud je nainstalován [puppeteer](https://pptr.dev/), může scan zachytit asynchronně načítané (lazy-loaded) JavaScriptové části pro přesnější analýzu balíčku; v opačném případě se vrátí k inspekci staticky načítaných skriptů deklarovaných v HTML.

## Použití

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

### Příklad

```bash packageManager="npm"
npx intlayer scan https://example.com
```

Příklad výstupu:

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

## Volby

### `<url>` (vyžadováno)

Plně kvalifikovaná URL adresa pro scan (např. `https://example.com`).

### `--no-deep`

Zakáže hlubší scan založený na renderování stránky.

Ve výchozím nastavení se příkaz pokusí použít [puppeteer](https://pptr.dev/) k vykreslení stránky v prohlížeči bez uživatelského rozhraní (headless browser), zachycení asynchronně načítaných JS částí a měření skutečné velikosti přenosu. Pokud puppeteer není nainstalován, příkaz se automaticky vrátí k základnímu režimu.

Předáním `--no-deep` vynutíte základní režim, i když je puppeteer k dispozici.

> Příklad: `npx intlayer scan https://example.com --no-deep`

### `--json`

Vypíše kompletní výsledek scanu jako JSON objekt namísto formátovaného reportu. Užitečné pro programové zpracování nebo v CI kanálech.

> Příklad: `npx intlayer scan https://example.com --json`

### Standardní volby konfigurace

- **`--base-dir`** — Základní adresář pro nalezení souboru `intlayer.config.*`.
- **`-e, --env`** — Cílové prostředí (např. `development`, `production`).
- **`--env-file`** — Cesta k vlastnímu souboru `.env`.
- **`--no-cache`** — Zakáže mezipaměť konfigurace.
- **`--verbose`** — Povolí podrobné protokolování (výchozí v režimu CLI).
- **`--prefix`** — Vlastní prefix protokolu.

## Co se kontroluje

| Kontrola                  | Popis                                                                 | Váha v hodnocení |
| ------------------------- | --------------------------------------------------------------------- | ---------------- |
| `html lang`               | Je přítomen atribut `<html lang="…">`                                 | 9                |
| `html dir`                | Je přítomen atribut `<html dir="…">`                                  | 3                |
| `canonical`               | Je přítomen tag `<link rel="canonical">`                              | 10               |
| `hreflang`                | Jsou přítomny tagy `<link rel="alternate" hreflang="…">`              | 9                |
| `x-default hreflang`      | Existuje alternativní odkaz `x-default` hreflang                      | 7                |
| `localized links`         | Alespoň jeden interní odkaz obsahuje segment jazyka                   | 5                |
| `all links localized`     | Každý interní odkaz obsahuje segment jazyka                           | 5                |
| `current locale`          | Jazyk stránky lze detekovat                                           | 3                |
| `robots.txt present`      | `/robots.txt` vrací odpověď 200                                       | 10               |
| `robots.txt locale paths` | V souboru robots.txt není blokována žádná cesta jazyka                | 10               |
| `sitemap.xml present`     | `/sitemap.xml` vrací odpověď 200                                      | 10               |
| `sitemap locale coverage` | Každý detekovaný jazyk se zobrazuje v mapě webu                       | 10               |
| `sitemap alternates`      | Mapa webu obsahuje alternativní odkazy `hreflang`                     | 5                |
| `sitemap x-default`       | Mapa webu obsahuje hreflang `x-default`                               | 5                |
| `unused bundle content`   | JS balíček neobsahuje nadměrné množství nepoužitých lokalizačních dat | 9                |

Konečné skóre je vážený součet všech úspěšných kontrol vyjádřený v procentech (0–100).

## Použití funkce scan programově

Funkce `scan` je také exportována z `@intlayer/cli`, takže ji lze volat z vašich vlastních skriptů:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Pro přístup na nižší úrovni vrací funkce `scanWebsite` z `@intlayer/chokidar/scan` strukturovaný objekt `ScanResult`:

```ts
import { scanWebsite } from "@intlayer/chokidar/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
