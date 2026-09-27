---
createdAt: 2026-06-11
updatedAt: 2026-09-26
priority: 5
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
  - version: 9.5.11
    date: 2026-09-26
    changes: "Detekce strategie směrování a i18n stacku (knihovny, TMS); přidání kontrol reciprocity hreflang, og:locale a přepínače jazyků; sledování souborů sitemap z robots.txt, indexů sitemap a sitemap komprimovaných pomocí gzip"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Přidán příznak `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Přidán obsah příkazu scan"
author: aymericzip
---

# Scan Website

Příkaz `scan` načte veřejnou URL, změří celkovou velikost stránky a provede audit i18n a SEO zdraví stránky. Vygeneruje bodovaný report (0–100) zahrnující HTML atributy, kanonické odkazy, tagy hreflang a jejich zpětné odkazy, robots.txt, soubory sitemap, lokalizované interní odkazy a velikost lokalizačních dat v JavaScript balíčku (bundle).

Rovněž hlásí, jak web kóduje locale ve svých URL adresách (strategie směrování) a jaký framework, i18n knihovnu, systém pro správu překladů (TMS) nebo překladovou proxy používá. Stejné kontroly pohánějí [online i18n SEO scanner](https://intlayer.org/i18n-seo-scanner) a rozšíření Intlayer pro prohlížeč Chrome.

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
🔍 Scanned https://example.com/fr (basic mode)

Score: 91/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: fr, en, es, de
Routing: locale prefix except for the default locale (every hreflang alternate but "en" starts with a locale segment, default locale: en)

Stack:
  Framework Next.js 15.1.0 (window.next.version)
  i18n library next-intl (JavaScript bundle contains "X-NEXT-INTL-LOCALE")
  TMS Crowdin (loads https://distributions.crowdin.net/…)

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

- **`--base-dir`**: Základní adresář pro nalezení souboru `intlayer.config.*`.
- **`-e, --env`**: Cílové prostředí (např. `development`, `production`).
- **`--env-file`**: Cesta k vlastnímu souboru `.env`.
- **`--no-cache`**: Zakáže mezipaměť konfigurace.
- **`--ci`**: Spustí příkaz v každém projektu Intlayer v monorepu (nebo jen v aktuálním, pokud je spuštěn z adresáře projektu). Přihlašovací údaje pro jednotlivé projekty lze vložit přes `INTLAYER_PROJECT_CREDENTIALS`, JSON objekt mapující cestu projektu na `{ "clientId", "clientSecret" }`.
- **`--verbose`**: Povolí podrobné protokolování (výchozí v režimu CLI).
- **`--prefix`**: Vlastní prefix protokolu.

## Strategie směrování

Vzor pro locale sdílený alternativami hreflang stránky odhaluje, jak web směruje své locale. Bez alternativ se použije pouze skenovaná URL adresa (nízká spolehlivost).

| Strategie           | Příklad                                |
| ------------------- | -------------------------------------- |
| `prefix-all`        | `/en/about`, `/fr/about`               |
| `prefix-no-default` | `/about` (výchozí locale), `/fr/about` |
| `search-params`     | `/about?lang=fr`                       |
| `subdomain`         | `fr.example.com`                       |
| `domain`            | `example.fr`, `example.de`             |
| `no-prefix`         | Jedna URL pro každou locale (cookie)   |

Kontroly odkazů, kanonických odkazů, robots.txt a souborů sitemap interpretují každou URL adresu prostřednictvím této strategie. Například odkaz bez prefixu je správný ve výchozí locale webu typu `prefix-no-default`, zatímco odkaz bez `?lang=` opouští danou locale na webu s `search-params`.

## Detekovaný stack

Frameworky, i18n knihovny (Intlayer, i18next, react-i18next, next-i18next, next-intl, use-intl, react-intl, vue-i18n, @nuxtjs/i18n, Lingui, svelte-i18n, Paraglide, ngx-translate, Transloco, Polylang, WPML…), systémy pro správu překladů (Crowdin, Phrase, Lokalise, locize, Transifex, Tolgee, Localazy, SimpleLocalize, Localizely, Smartling, Intlayer CMS) a překladové proxy (Weglot, Localize, GTranslate…) jsou identifikovány z HTML, načtených prostředků a JavaScriptových balíčků. Hloubkový režim čte také globální proměnné window a cookies.

## Co se kontroluje

| Kontrola                        | Popis                                                                                           | Váha v hodnocení |
| ------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------- |
| `html lang`                     | `<html lang>` je přítomen a je platným tagem BCP 47                                             | 9                |
| `html dir`                      | `dir="rtl"` je nastaveno pro jazyky psané zprava doleva (`ltr` je výchozí)                      | 3                |
| `locale signals consistent`     | `<html lang>`, locale z URL a vlastní záznam hreflang se vzájemně shodují                       | 5                |
| `og:locale`                     | `og:locale` je nastaveno a shoduje se s `<html lang>`                                           | 3                |
| `canonical`                     | Kanonický odkaz existuje a neodkazuje na jinou jazykovou verzi                                  | 10               |
| `hreflang`                      | Tagy hreflang existují, s platnými kódy, absolutními URL, bez duplicit a s odkazem na sebe sama | 9                |
| `x-default hreflang`            | Existuje alternativní odkaz `x-default` hreflang                                                | 7                |
| `hreflang alternates link back` | Alternativy odpovídají kódem 200, nejsou přesměrovány, odkazují zpět a deklarují jazyk          | 8                |
| `localized links`               | Interní odkazy směřují na locale stránky                                                        | 8                |
| `all links keep the locale`     | Žádný interní odkaz nepřepíná ani neztrácí locale                                               | 6                |
| `language switcher`             | Existují procházitelné odkazy `<a href>` na ostatní jazykové verze                              | 6                |
| `robots.txt present`            | `/robots.txt` vrací odpověď 200                                                                 | 10               |
| `robots.txt localized URLs`     | Web ani jeho lokalizované URL adresy nejsou blokovány pro Googlebot                             | 8                |
| `sitemap present`               | Je nalezena mapa webu (direktivy `Sitemap:` v robots.txt, `/sitemap.xml`, `/sitemap_index.xml`) | 10               |
| `sitemap locale coverage`       | Každá locale je uvedena a položky s alternativami uvádějí také samy sebe                        | 9                |
| `sitemap alternates`            | Mapa webu obsahuje alternativní odkazy `hreflang`                                               | 8                |
| `sitemap x-default`             | Mapa webu obsahuje hreflang `x-default`                                                         | 7                |
| `unused bundle content`         | Hlavní JS balíček nenese nadbytečné překlady jiných locale                                      | 8                |

Varování získává polovinu váhy hodnocení. Konečné skóre je vážený součet všech spuštěných kontrol vyjádřený v procentech (0–100). Neúspěšné kontroly vypisují první zjištěné problémy; použijte `--json` pro úplné podrobnosti.

## Použití funkce scan programově

Funkce `scan` je také exportována z `@intlayer/cli`, takže ji lze volat z vašich vlastních skriptů:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Pro přístup na nižší úrovni vrací funkce `scanWebsite` z `@intlayer/engine/scan` strukturovaný objekt `ScanResult`:

```ts
import { scanWebsite } from "@intlayer/engine/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
