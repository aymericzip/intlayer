---
createdAt: 2026-06-11
updatedAt: 2026-06-11
title: Website scannen
description: Erfahren Sie, wie Sie den Intlayer-CLI-Scanbefehl verwenden, um die Seitengröße zu messen und die i18n/SEO-Gesundheit einer beliebigen Website zu überprüfen.
keywords:
  - Scan
  - SEO
  - i18n
  - Audit
  - CLI
  - Intlayer
  - Seitengröße
  - Bundle
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 8.13.0
    date: 2026-06-11
    changes: "Befehl scan hinzugefügt"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Website scannen

Der Befehl `scan` ruft eine öffentliche URL ab, misst die Gesamtseitengröße und überprüft die i18n- und SEO-Gesundheit der Seite. Er erstellt einen bewerteten Bericht (0–100), der HTML-Attribute, kanonische Links, hreflang-Tags, robots.txt, sitemap.xml, lokalisierte interne Links und das Gewicht der Lokalisierungsdaten im JavaScript-Bundle abdeckt.

Es sind keine zusätzlichen Abhängigkeiten erforderlich. Wenn [puppeteer](https://pptr.dev/) installiert ist, kann der Scan träge geladene (lazy-loaded) JavaScript-Chunks erfassen, um eine präzisere Bundle-Analyse durchzuführen. Andernfalls fällt er auf die Überprüfung der im HTML deklarierten, direkt geladenen Skripte zurück.

## Verwendung

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

### Beispiel

```bash packageManager="npm"
npx intlayer scan https://example.com
```

Beispielausgabe:

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

## Optionen

### `<url>` (erforderlich)

Die vollständige URL, die gescannt werden soll (z. B. `https://example.com`).

### `--no-deep`

Deaktiviert den tieferen, auf Rendering basierenden Scan.

Standardmäßig versucht der Befehl, [puppeteer](https://pptr.dev/) zu verwenden, um die Seite in einem kopflosen (headless) Browser zu rendern, träge geladene JavaScript-Chunks zu erfassen und die tatsächliche Übertragungsgröße zu messen. Wenn puppeteer nicht installiert ist, fällt der Befehl automatisch in den Basismodus zurück.

Übergeben Sie `--no-deep`, um den Basismodus zu erzwingen, selbst wenn puppeteer verfügbar ist.

> Beispiel: `npx intlayer scan https://example.com --no-deep`

### `--json`

Gibt das vollständige Scan-Ergebnis als JSON-Objekt anstelle eines formatierten Berichts aus. Nützlich für die programmatische Verwendung oder CI-Pipelines.

> Beispiel: `npx intlayer scan https://example.com --json`

### Standard-Konfigurationsoptionen

- **`--base-dir`** — Basisverzeichnis zur Lokalisierung der Datei `intlayer.config.*`.
- **`-e, --env`** — Zielumgebung (z. B. `development`, `production`).
- **`--env-file`** — Pfad zu einer benutzerdefinierten `.env`-Datei.
- **`--no-cache`** — Konfigurationscache deaktivieren.
- **`--verbose`** — Ausführliche Protokollierung aktivieren (Standardwert im CLI-Modus).
- **`--prefix`** — Benutzerdefiniertes Protokollpräfix.

## Was überprüft wird

| Überprüfung               | Beschreibung                                                    | Gewichtung der Bewertung |
| ------------------------- | --------------------------------------------------------------- | ------------------------ |
| `html lang`               | Das Attribut `<html lang="…">` ist vorhanden                    | 9                        |
| `html dir`                | Das Attribut `<html dir="…">` ist vorhanden                     | 3                        |
| `canonical`               | `<link rel="canonical">` ist vorhanden                          | 10                       |
| `hreflang`                | `<link rel="alternate" hreflang="…">`-Tags sind vorhanden       | 9                        |
| `x-default hreflang`      | Ein `x-default` hreflang-Alternativlink ist vorhanden           | 7                        |
| `localized links`         | Mindestens ein interner Link enthält ein Sprachsegment          | 5                        |
| `all links localized`     | Jeder interne Link enthält ein Sprachsegment                    | 5                        |
| `current locale`          | Die Sprache der Seite kann erkannt werden                       | 3                        |
| `robots.txt present`      | `/robots.txt` gibt eine 200-Antwort zurück                      | 10                       |
| `robots.txt locale paths` | Kein Sprachpfad wird in robots.txt blockiert                    | 10                       |
| `sitemap.xml present`     | `/sitemap.xml` gibt eine 200-Antwort zurück                     | 10                       |
| `sitemap locale coverage` | Jede erkannte Sprache erscheint in der Sitemap                  | 10                       |
| `sitemap alternates`      | Die Sitemap enthält `hreflang`-Alternativlinks                  | 5                        |
| `sitemap x-default`       | Die Sitemap enthält einen `x-default` hreflang                  | 5                        |
| `unused bundle content`   | Das JS-Bundle enthält keine übermäßigen ungenutzten Sprachdaten | 9                        |

Die endgültige Bewertung ist die gewichtete Summe aller erfolgreichen Überprüfungen, ausgedrückt als Prozentsatz (0–100).

## Verwendung der Scan-Funktion im Code (programmatisch)

Die Funktion `scan` wird auch aus `@intlayer/cli` exportiert, sodass sie in Ihren eigenen Skripten aufgerufen werden kann:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Für den Zugriff auf niedrigerer Ebene gibt `scanWebsite` aus `@intlayer/chokidar/scan` ein strukturiertes `ScanResult`-Objekt zurück:

```ts
import { scanWebsite } from "@intlayer/chokidar/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
