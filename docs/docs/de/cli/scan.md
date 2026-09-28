---
createdAt: 2026-06-11
updatedAt: 2026-09-27
priority: 5
title: "intlayer scan: i18n und SEO einer Website prüfen"
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
  - version: 9.5.11
    date: 2026-09-26
    changes: "Routing-Strategie und i18n-Stack (Bibliotheken, TMS) erkennen; Überprüfungen für hreflang-Gegenseitigkeit, og:locale und Sprachumschalter hinzufügen; robots.txt-Sitemaps, Sitemap-Indizes und gzip-komprimierten Sitemaps folgen"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Flag `--ci` hinzugefügt"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Befehl scan hinzugefügt"
author: aymericzip
---

# Website scannen

Der Befehl `scan` ruft eine öffentliche URL ab, misst die Gesamtseitengröße und überprüft die i18n- und SEO-Gesundheit der Seite. Er erstellt einen bewerteten Bericht (0–100), der HTML-Attribute, kanonische Links, hreflang-Tags und deren Rückverweise, robots.txt, Sitemaps, lokalisierte interne Links und das Gewicht der Lokalisierungsdaten im JavaScript-Bundle abdeckt.

Er berichtet außerdem darüber, wie die Website die Locale in ihren URLs kodiert (Routing-Strategie) und welches Framework, welche i18n-Bibliothek, welches Translation-Management-System (TMS) oder welcher Übersetzungsproxy verwendet wird. Dieselben Überprüfungen treiben den [Online-i18n-SEO-Scanner](https://intlayer.org/i18n-seo-scanner) und die Intlayer Chrome-Erweiterung an.

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

- **`--base-dir`**: Basisverzeichnis zur Lokalisierung der Datei `intlayer.config.*`.
- **`-e, --env`**: Zielumgebung (z. B. `development`, `production`).
- **`--env-file`**: Pfad zu einer benutzerdefinierten `.env`-Datei.
- **`--no-cache`**: Konfigurationscache deaktivieren.
- **`--ci`**: Führt den Befehl in jedem Intlayer-Projekt des Monorepos aus (oder nur im aktuellen, wenn er aus einem Projektverzeichnis gestartet wird). Projektspezifische Zugangsdaten können über `INTLAYER_PROJECT_CREDENTIALS` eingefügt werden, ein JSON-Objekt, das jedem Projektpfad `{ "clientId", "clientSecret" }` zuordnet.
- **`--verbose`**: Ausführliche Protokollierung aktivieren (Standardwert im CLI-Modus).
- **`--prefix`**: Benutzerdefiniertes Protokollpräfix.

## Routing-Strategie

Das Locale-Muster, das sich die hreflang-Alternativen der Seite teilen, zeigt, wie die Website ihre Locales routet. Ohne Alternativen wird nur die gescannte URL verwendet (geringe Konfidenz).

| Strategie           | Beispiel                                |
| ------------------- | --------------------------------------- |
| `prefix-all`        | `/en/about`, `/fr/about`                |
| `prefix-no-default` | `/about` (Standard-Locale), `/fr/about` |
| `search-params`     | `/about?lang=fr`                        |
| `subdomain`         | `fr.example.com`                        |
| `domain`            | `example.fr`, `example.de`              |
| `no-prefix`         | Eine URL für jede Locale (Cookie)       |

Überprüfungen von Links, kanonischen URLs, robots.txt und Sitemaps lesen jede URL über diese Strategie. Beispielsweise ist ein Link ohne Präfix auf der Standard-Locale einer `prefix-no-default`-Website korrekt, während ein Link ohne `?lang=` auf einer `search-params`-Website die Locale verlässt.

## Erkannter Stack

Frameworks, i18n-Bibliotheken (Intlayer, i18next, react-i18next, next-i18next, next-intl, use-intl, react-intl, vue-i18n, @nuxtjs/i18n, Lingui, svelte-i18n, Paraglide, ngx-translate, Transloco, Polylang, WPML…), Translation-Management-Systeme (Crowdin, Phrase, Lokalise, locize, Transifex, Tolgee, Localazy, SimpleLocalize, Localizely, Smartling, Intlayer CMS) und Übersetzungsproxys (Weglot, Localize, GTranslate…) werden aus dem HTML, den geladenen Ressourcen und den JavaScript-Bundles identifiziert. Der Tiefenmodus liest auch globale window-Variablen und Cookies aus.

## Was überprüft wird

| Überprüfung                     | Beschreibung                                                                                              | Gewichtung der Bewertung |
| ------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------ |
| `html lang`                     | `<html lang>` ist vorhanden und ein gültiger BCP 47-Tag                                                   | 9                        |
| `html dir`                      | `dir="rtl"` ist für von rechts nach links geschriebene Sprachen gesetzt (`ltr` ist der Standardwert)      | 3                        |
| `locale signals consistent`     | `<html lang>`, die URL-Locale und der eigene hreflang-Eintrag stimmen überein                             | 5                        |
| `og:locale`                     | `og:locale` ist gesetzt und stimmt mit `<html lang>` überein                                              | 3                        |
| `canonical`                     | Ein kanonischer Link existiert und verweist nicht auf eine andere Sprachversion                           | 10                       |
| `hreflang`                      | hreflang-Tags existieren, mit gültigen Codes, absoluten URLs, ohne Duplikate und mit einer Selbstreferenz | 9                        |
| `x-default hreflang`            | Ein `x-default` hreflang-Alternativlink ist vorhanden                                                     | 7                        |
| `hreflang alternates link back` | Alternativen antworten mit 200, werden nicht weitergeleitet, verlinken zurück und deklarieren die Sprache | 8                        |
| `localized links`               | Interne Links verweisen auf die Locale der Seite                                                          | 8                        |
| `all links keep the locale`     | Kein interner Link wechselt oder verliert die Locale                                                      | 6                        |
| `language switcher`             | Crawlbare `<a href>`-Links zu den anderen Sprachversionen existieren                                      | 6                        |
| `robots.txt present`            | `/robots.txt` gibt eine 200-Antwort zurück                                                                | 10                       |
| `robots.txt localized URLs`     | Weder die Website noch ihre lokalisierten URLs sind für den Googlebot blockiert                           | 8                        |
| `sitemap present`               | Eine Sitemap wird gefunden (robots.txt `Sitemap:`-Direktiven, `/sitemap.xml`, `/sitemap_index.xml`)       | 10                       |
| `sitemap locale coverage`       | Jede Locale ist aufgeführt, und Einträge mit Alternativen führen sich selbst auf                          | 9                        |
| `sitemap alternates`            | Die Sitemap enthält `hreflang`-Alternativlinks                                                            | 8                        |
| `sitemap x-default`             | Die Sitemap enthält einen `x-default` hreflang                                                            | 7                        |
| `unused bundle content`         | Das Haupt-JS-Bundle liefert keine Übersetzungen anderer Locales aus                                       | 8                        |

Eine Warnung erhält die Hälfte der Gewichtung. Die endgültige Bewertung ist die gewichtete Summe der ausgeführten Überprüfungen, ausgedrückt als Prozentsatz (0–100). Fehlgeschlagene Überprüfungen geben die ersten gefundenen Probleme aus; verwenden Sie `--json` für alle Details.

## Verwendung der Scan-Funktion im Code (programmatisch)

Die Funktion `scan` wird auch aus `@intlayer/cli` exportiert, sodass sie in Ihren eigenen Skripten aufgerufen werden kann:

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

Für den Zugriff auf niedrigerer Ebene gibt `scanWebsite` aus `@intlayer/engine/scan` ein strukturiertes `ScanResult`-Objekt zurück:

```ts
import { scanWebsite } from "@intlayer/engine/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
