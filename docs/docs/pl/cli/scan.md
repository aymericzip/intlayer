---
createdAt: 2026-06-11
updatedAt: 2026-06-11
title: Skanuj stronę internetową
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
  - version: 8.13.0
    date: 2026-06-11
    changes: "Dodano polecenie scan"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Skanuj stronę internetową

Polecenie `scan` pobiera publiczny adres URL, mierzy całkowity rozmiar strony i przeprowadza audyt zdrowia i18n oraz SEO strony. Generuje ono raport z punktacją (0–100) obejmujący atrybuty HTML, linki kanoniczne, tagi hreflang, robots.txt, sitemap.xml, zlokalizowane linki wewnętrzne oraz wagę językową w pakiecie (bundle) JavaScript.

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

- **`--base-dir`** — Katalog bazowy używany do zlokalizowania pliku `intlayer.config.*`.
- **`-e, --env`** — Środowisko docelowe (np. `development`, `production`).
- **`--env-file`** — Ścieżka do niestandardowego pliku `.env`.
- **`--no-cache`** — Wyłącza pamięć podręczną konfiguracji.
- **`--verbose`** — Włącza pełne logowanie (domyślne w trybie CLI).
- **`--prefix`** — Niestandardowy prefiks logów.

## Co podlega sprawdzeniu

| Sprawdzenie               | Opis                                                             | Waga punktowa |
| ------------------------- | ---------------------------------------------------------------- | ------------- |
| `html lang`               | Obecność atrybutu `<html lang="…">`                              | 9             |
| `html dir`                | Obecność atrybutu `<html dir="…">`                               | 3             |
| `canonical`               | Obecność tagu `<link rel="canonical">`                           | 10            |
| `hreflang`                | Obecność tagów `<link rel="alternate" hreflang="…">`             | 9             |
| `x-default hreflang`      | Istnienie alternatywy hreflang `x-default`                       | 7             |
| `localized links`         | Przynajmniej jeden link wewnętrzny zawiera segment języka        | 5             |
| `all links localized`     | Każdy link wewnętrzny zawiera segment języka                     | 5             |
| `current locale`          | Możliwość wykrycia języka strony                                 | 3             |
| `robots.txt present`      | `/robots.txt` zwraca odpowiedź 200                               | 10            |
| `robots.txt locale paths` | Brak blokowania ścieżek językowych w robots.txt                  | 10            |
| `sitemap.xml present`     | `/sitemap.xml` zwraca odpowiedź 200                              | 10            |
| `sitemap locale coverage` | Każdy wykryty język pojawia się w mapie witryny                  | 10            |
| `sitemap alternates`      | Mapa witryny zawiera linki alternatywne `hreflang`               | 5             |
| `sitemap x-default`       | Mapa witryny zawiera hreflang `x-default`                        | 5             |
| `unused bundle content`   | Pakiet JS nie zawiera nadmiernych nieużywanych danych językowych | 9             |

Wynik końcowy to ważona suma wszystkich pomyślnie zaliczonych sprawdzeń wyrażona w procentach (0–100).

## Programistyczne korzystanie z funkcji skanowania

Funkcja `scan` jest również eksportowana z `@intlayer/cli`, dzięki czemu można ją wywoływać z poziomu własnych skryptów:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

W przypadku dostępu niskopoziomowego funkcja `scanWebsite` z modułu `@intlayer/chokidar/scan` zwraca ustrukturyzowany obiekt `ScanResult`:

```ts
import { scanWebsite } from "@intlayer/chokidar/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
