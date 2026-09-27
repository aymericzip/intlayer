---
createdAt: 2026-06-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer scan: audyt i18n i SEO strony"
description: Dowiedz się, jak używać polecenia scan w Intlayer CLI, aby zmierzyć rozmiar strony i przeprowadzić audyt zdrowia i18n/SEO dowolnej witryny.
keywords:
  - Scan
  - SEO
  - i18n
  - Audyt
  - CLI
  - Intlayer
  - Rozmiar strony
  - Bundle
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 9.5.11
    date: 2026-09-26
    changes: "Wykrywanie strategii routingu i stosu i18n (biblioteki, TMS); dodanie sprawdzania wzajemności hreflang, og:locale oraz przełącznika języków; obsługa map witryn z robots.txt, indeksów map witryn i map skompresowanych gzip"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Dodanie flagi `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Dodano polecenie scan"
author: aymericzip
---

# Skanuj stronę internetową

Polecenie `scan` pobiera publiczny adres URL, mierzy całkowity rozmiar strony i przeprowadza audyt zdrowia i18n oraz SEO strony. Generuje ono raport z punktacją (0–100) obejmujący atrybuty HTML, linki kanoniczne, tagi hreflang i ich linki zwrotne, robots.txt, mapy witryn, zlokalizowane linki wewnętrzne oraz wagę językową w pakiecie JavaScript.

Raportuje również, w jaki sposób witryna koduje język w swoich adresach URL (strategia routingu) oraz jakiego frameworka, biblioteki i18n, systemu zarządzania tłumaczeniami (TMS) lub proxy tłumaczeń używa. Te same testy napędzają [internetowy skaner SEO i18n](https://intlayer.org/i18n-seo-scanner) oraz rozszerzenie Intlayer do przeglądarki Chrome.

Nie są wymagane żadne dodatkowe zależności. Kiedy zainstalowany jest [puppeteer](https://pptr.dev/), skanowanie może przechwytywać opóźnieniej ładowane (lazy-loaded) fragmenty kodu JavaScript dla dokładniejszej analizy pakietu; w przeciwnym razie wraca do inspekcji skryptów ładowanych natychmiast, zadeklarowanych w kodzie HTML.

## Użycie

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

### Przykład

```bash packageManager="npm"
npx intlayer scan https://example.com
```

Przykładowe dane wyjściowe:

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

## Opcje

### `<url>` (wymagane)

Pełny adres URL do zeskanowania (np. `https://example.com`).

### `--no-deep`

Wyłącza głębsze skanowanie oparte na renderowaniu strony.

Domyślnie polecenie próbuje użyć biblioteki [puppeteer](https://pptr.dev/) do wyrenderowania strony w przeglądarce bezinterfejsowej (headless browser), przechwycenia opóźnioniej ładowanych fragmentów kodu JavaScript i zmierzenia rzeczywistego rozmiaru transferu. Jeśli puppeteer nie jest zainstalowany, polecenie automatycznie przechodzi w tryb podstawowy.

Przekaż `--no-deep`, aby wymusić tryb podstawowy, nawet gdy puppeteer jest dostępny.

> Przykład: `npx intlayer scan https://example.com --no-deep`

### `--json`

Wypisuje pełny wynik skanowania jako obiekt JSON zamiast sformatowanego raportu. Przydatne do użycia programistycznego lub w potokach CI.

> Przykład: `npx intlayer scan https://example.com --json`

### Standardowe opcje konfiguracji

- **`--base-dir`**: Katalog bazowy używany do zlokalizowania pliku `intlayer.config.*`.
- **`-e, --env`**: Środowisko docelowe (np. `development`, `production`).
- **`--env-file`**: Ścieżka do niestandardowego pliku `.env`.
- **`--no-cache`**: Wyłącza pamięć podręczną konfiguracji.
- **`--ci`**: Uruchamia polecenie w każdym projekcie Intlayer w monorepo (lub tylko w bieżącym, gdy uruchomione z katalogu projektu). Dane uwierzytelniające dla poszczególnych projektów można wstrzyknąć przez `INTLAYER_PROJECT_CREDENTIALS`, obiekt JSON mapujący ścieżkę projektu na `{ "clientId", "clientSecret" }`.
- **`--verbose`**: Włącza pełne logowanie (domyślne w trybie CLI).
- **`--prefix`**: Niestandardowy prefiks logów.

## Strategia routingu

Wzorzec językowy współdzielony przez alternatywy hreflang strony ujawnia, jak witryna kieruje swoimi językami. Bez alternatyw używany jest wyłącznie skanowany URL (niska pewność).

| Strategia           | Przykład                                    |
| ------------------- | ------------------------------------------- |
| `prefix-all`        | `/en/about`, `/fr/about`                    |
| `prefix-no-default` | `/about` (domyślny język), `/fr/about`      |
| `search-params`     | `/about?lang=fr`                            |
| `subdomain`         | `fr.example.com`                            |
| `domain`            | `example.fr`, `example.de`                  |
| `no-prefix`         | Jeden adres URL dla każdego języka (cookie) |

Sprawdzanie linków, linków kanonicznych, robots.txt i mapy witryny interpretuje każdy URL przez pryzmat tej strategii. Na przykład link bez prefiksu jest prawidłowy w domyślnym języku witryny `prefix-no-default`, a link bez `?lang=` opuszcza język w witrynie typu `search-params`.

## Wykryty stos

Frameworki, biblioteki i18n (Intlayer, i18next, react-i18next, next-i18next, next-intl, use-intl, react-intl, vue-i18n, @nuxtjs/i18n, Lingui, svelte-i18n, Paraglide, ngx-translate, Transloco, Polylang, WPML…), systemy zarządzania tłumaczeniami (Crowdin, Phrase, Lokalise, locize, Transifex, Tolgee, Localazy, SimpleLocalize, Localizely, Smartling, Intlayer CMS) oraz serwery proxy tłumaczeń (Weglot, Localize, GTranslate…) są identyfikowane na podstawie kodu HTML, załadowanych zasobów i pakietów JavaScript. Tryb głęboki odczytuje także zmienne globalne window oraz pliki cookie.

## Co podlega sprawdzeniu

| Sprawdzenie                     | Opis                                                                                                            | Waga punktowa |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------- |
| `html lang`                     | `<html lang>` jest obecny i stanowi prawidłowy tag BCP 47                                                       | 9             |
| `html dir`                      | `dir="rtl"` jest ustawione dla języków pisanych od prawej do lewej (`ltr` jest wartością domyślną)              | 3             |
| `locale signals consistent`     | `<html lang>`, język z adresu URL oraz wpis hreflang z odniesieniem do siebie są zgodne                         | 5             |
| `og:locale`                     | `og:locale` jest ustawione i jest zgodne z `<html lang>`                                                        | 3             |
| `canonical`                     | Link kanoniczny istnieje i nie wskazuje na inną wersję językową                                                 | 10            |
| `hreflang`                      | Tagi hreflang istnieją, mają prawidłowe kody, bezwzględne adresy URL, brak duplikatów i posiadają samoodwołanie | 9             |
| `x-default hreflang`            | Istnieje alternatywa hreflang `x-default`                                                                       | 7             |
| `hreflang alternates link back` | Alternatywy odpowiadają kodem 200, nie są przekierowywane, linkują z powrotem i deklarują język                 | 8             |
| `localized links`               | Linki wewnętrzne wskazują na język strony                                                                       | 8             |
| `all links keep the locale`     | Żaden link wewnętrzny nie przełącza ani nie gubi języka                                                         | 6             |
| `language switcher`             | Dostępne do indeksowania linki `<a href>` do pozostałych wersji językowych istnieją                             | 6             |
| `robots.txt present`            | `/robots.txt` zwraca odpowiedź 200                                                                              | 10            |
| `robots.txt localized URLs`     | Ani witryna, ani jej zlokalizowane adresy URL nie są zablokowane dla Googlebota                                 | 8             |
| `sitemap present`               | Znaleziono mapę witryny (dyrektywy robots.txt `Sitemap:`, `/sitemap.xml`, `/sitemap_index.xml`)                 | 10            |
| `sitemap locale coverage`       | Każdy język jest wymieniony, a wpisy z alternatywami wymieniają również siebie                                  | 9             |
| `sitemap alternates`            | Mapa witryny zawiera linki alternatywne `hreflang`                                                              | 8             |
| `sitemap x-default`             | Mapa witryny zawiera hreflang `x-default`                                                                       | 7             |
| `unused bundle content`         | Główny pakiet JS nie zawiera tłumaczeń dla innych języków                                                       | 8             |

Ostrzeżenie daje połowę wagi punktowej. Ostateczny wynik jest ważoną sumą wykonanych sprawdzeń wyrażoną w procentach (0–100). Niepowodzenia w testach wyświetlają pierwsze znalezione problemy; użyj `--json`, aby uzyskać pełne szczegóły.

## Programistyczne korzystanie z funkcji skanowania

Funkcja `scan` jest również eksportowana z `@intlayer/cli`, dzięki czemu można ją wywoływać z poziomu własnych skryptów:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

W przypadku dostępu niskopoziomowego funkcja `scanWebsite` z modułu `@intlayer/engine/scan` zwraca ustrukturyzowany obiekt `ScanResult`:

```ts
import { scanWebsite } from "@intlayer/engine/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
