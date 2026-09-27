---
createdAt: 2026-06-11
updatedAt: 2026-09-26
priority: 5
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
  - version: 9.5.11
    date: 2026-09-26
    changes: "Detecteer de routeringsstrategie en de i18n-stack (bibliotheken, TMS); voeg controles toe voor hreflang-wederkerigheid, og:locale en taalkiezer; volg robots.txt sitemaps, sitemap-indexen en gzip-gecomprimeerde sitemaps"
  - version: 9.5.2
    date: 2026-09-12
    changes: "`--ci`-vlag toegevoegd"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Scan commando toegevoegd"
author: aymericzip
---

# Website Scannen

Het `scan`-commando haalt een openbare URL op, meet de totale paginagrootte en controleert de i18n- en SEO-status van de pagina. Het genereert een score-rapport (0-100) dat HTML-attributen, canonieke links, hreflang-tags en hun retourlinks, robots.txt, sitemaps, gelokaliseerde interne links en het gewicht van de taalbestanden in de JavaScript-bundel dekt.

Het rapporteert ook hoe de site de locale codeert in zijn URL's (routeringsstrategie) en welk framework, welke i18n-bibliotheek, welk vertaalbeheersysteem (TMS) of welke vertaalproxy het gebruikt. Dezelfde controles drijven de [online i18n SEO-scanner](https://intlayer.org/i18n-seo-scanner) en de Intlayer Chrome-extensie aan.

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

- **`--base-dir`**: Basismap die wordt gebruikt om het bestand `intlayer.config.*` te vinden.
- **`-e, --env`**: Doelomgeving (bijv. `development`, `production`).
- **`--env-file`**: Pad naar een aangepast `.env`-bestand.
- **`--no-cache`**: Configuratiecache uitschakelen.
- **`--ci`**: Voert het commando uit in elk Intlayer-project van de monorepo (of alleen in het huidige bij uitvoering vanuit een projectmap). Inloggegevens per project kunnen worden geïnjecteerd via `INTLAYER_PROJECT_CREDENTIALS`, een JSON-object dat elk projectpad koppelt aan `{ "clientId", "clientSecret" }`.
- **`--verbose`**: Gedetailleerde logboekregistratie inschakelen (standaard in CLI-modus).
- **`--prefix`**: Aangepaste logboekprefix.

## Routeringsstrategie

Het locale-patroon dat wordt gedeeld door de hreflang-alternatieven van de pagina onthult hoe de site zijn locales routeert. Zonder alternatieven wordt alleen de gescande URL gebruikt (lage betrouwbaarheid).

| Strategie           | Voorbeeld                               |
| ------------------- | --------------------------------------- |
| `prefix-all`        | `/en/about`, `/fr/about`                |
| `prefix-no-default` | `/about` (standaardlocale), `/fr/about` |
| `search-params`     | `/about?lang=fr`                        |
| `subdomain`         | `fr.example.com`                        |
| `domain`            | `example.fr`, `example.de`              |
| `no-prefix`         | Eén URL voor elke locale (cookie)       |

Controles van links, canonieke URL's, robots.txt en sitemaps interpreteren elke URL via deze strategie. Een link zonder voorvoegsel is bijvoorbeeld correct op de standaardlocale van een `prefix-no-default`-site, en een link zonder `?lang=` verlaat de locale op een `search-params`-site.

## Gedetecteerde stack

Frameworks, i18n-bibliotheken (Intlayer, i18next, react-i18next, next-i18next, next-intl, use-intl, react-intl, vue-i18n, @nuxtjs/i18n, Lingui, svelte-i18n, Paraglide, ngx-translate, Transloco, Polylang, WPML…), vertaalbeheersystemen (Crowdin, Phrase, Lokalise, locize, Transifex, Tolgee, Localazy, SimpleLocalize, Localizely, Smartling, Intlayer CMS) en vertaalproxy's (Weglot, Localize, GTranslate…) worden geïdentificeerd vanuit de HTML, de geladen bronnen en de JavaScript-bundels. De diepe modus leest ook window globale variabelen en cookies.

## Wat wordt er gecontroleerd

| Controle                        | Beschrijving                                                                                          | Score gewicht |
| ------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------- |
| `html lang`                     | `<html lang>` is aanwezig en is een geldige BCP 47-tag                                                | 9             |
| `html dir`                      | `dir="rtl"` is ingesteld voor van rechts naar links geschreven talen (`ltr` is de standaard)          | 3             |
| `locale signals consistent`     | `<html lang>`, de URL-locale en het zelfreferentie hreflang-item komen overeen                        | 5             |
| `og:locale`                     | `og:locale` is ingesteld en komt overeen met `<html lang>`                                            | 3             |
| `canonical`                     | Er bestaat een canonieke link en deze verwijst niet naar een andere taalversie                        | 10            |
| `hreflang`                      | hreflang-tags bestaan, met geldige codes, absolute URL's, zonder duplicaten en met een zelfreferentie | 9             |
| `x-default hreflang`            | Er bestaat een `x-default` hreflang-alternatief                                                       | 7             |
| `hreflang alternates link back` | Alternatieven antwoorden met 200, worden niet omgeleid, linken terug en declareren de taal            | 8             |
| `localized links`               | Interne links verwijzen naar de paginalocale                                                          | 8             |
| `all links keep the locale`     | Geen enkele interne link wisselt of verliest de locale                                                | 6             |
| `language switcher`             | Er bestaan doorzoekbare `<a href>`-links naar de andere taalversies                                   | 6             |
| `robots.txt present`            | `/robots.txt` retourneert een 200-respons                                                             | 10            |
| `robots.txt localized URLs`     | Noch de site, noch de gelokaliseerde URL's zijn geblokkeerd voor Googlebot                            | 8             |
| `sitemap present`               | Een sitemap is gevonden (robots.txt `Sitemap:`-richtlijnen, `/sitemap.xml`, `/sitemap_index.xml`)     | 10            |
| `sitemap locale coverage`       | Elke locale wordt vermeld, en items met alternatieven vermelden zichzelf                              | 9             |
| `sitemap alternates`            | De sitemap bevat `hreflang` alternatieve links                                                        | 8             |
| `sitemap x-default`             | De sitemap bevat een `x-default` hreflang                                                             | 7             |
| `unused bundle content`         | De hoofd-JS-bundel levert geen vertalingen van andere locales mee                                     | 8             |

Een waarschuwing levert de helft van het gewicht op. De eindscore is de gewogen som van de uitgevoerde controles, uitgedrukt als een percentage (0–100). Mislukte controles tonen de eerst gevonden problemen; gebruik `--json` voor de volledige details.

## De scanfunctie programmatisch gebruiken

De `scan`-functie wordt ook geëxporteerd vanuit `@intlayer/cli` zodat deze vanuit uw eigen scripts kan worden aangeroepen:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Voor toegang op een lager niveau retourneert `scanWebsite` van `@intlayer/engine/scan` een gestructureerd `ScanResult`-object:

```ts
import { scanWebsite } from "@intlayer/engine/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
