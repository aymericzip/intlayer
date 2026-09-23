---
createdAt: 2026-09-22
updatedAt: 2026-09-22
title: Chrome-Erweiterung, i18n & SEO Scanner
description: Untersuchen Sie das i18n-Setup einer beliebigen Website mit der Intlayer Chrome-Erweiterung. Erkennen Sie Framework, i18n-Bibliothek, Locales, Hreflang- und SEO-Tags und führen Sie ein vollständiges i18n-SEO-Audit durch.
keywords:
  - Chrome-Erweiterung
  - i18n Scanner
  - hreflang Checker
  - Mehrsprachiges SEO
  - Intlayer
  - Lokalisierung
  - Entwicklungstools
slugs:
  - doc
  - chrome-extension
history:
  - version: 9.5.6
    date: 2026-09-22
    changes: "Historie initialisiert"
author: aymericzip
---

# Chrome-Erweiterung: i18n & SEO Scanner

## Übersicht

[**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) ist die offizielle Chrome-Erweiterung für **Intlayer**. Öffnen Sie sie auf einer beliebigen Website, um zu sehen, wie die Website Internationalisierung handhabt: welches Framework und welche i18n-Bibliothek verwendet wird, welche Locales bereitgestellt werden und ob die mehrsprachigen SEO-Tags korrekt eingerichtet sind.

Sie funktioniert auf jeder Website, unabhängig davon, ob sie Intlayer verwendet oder nicht.

![Intlayer Chrome-Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension.png?raw=true)

Erweiterungslink: [https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc)

## Funktionen

- **Technologieerkennung**: identifiziert das Framework (Next.js, Nuxt, Astro, SvelteKit, Angular, Vue.js, Qwik, React, Gatsby, WordPress) und die i18n-Bibliothek (Intlayer, i18next, Vue I18n, @nuxtjs/i18n, Angular @angular/localize, next-intl / next-i18next, Weglot, Localize, WPML, Polylang). Jede Erkennung zeigt die Hinweise an, die sie ausgelöst haben, wie z. B. eine globale Variable, ein Cookie oder einen DOM-Marker.
- **Locales**: listet die im `lang`-Attribut gefundenen Locales, Hreflang- und `og:locale`-Tags, den URL-Locale-Präfix sowie Locale-Cookies oder Storage-Einträge auf.
- **SEO-i18n-Tags**: prüft `html lang`, `html dir`, den kanonischen Link, Hreflang-Tags, `x-default`, `og:locale` und das Verhältnis lokalisierter interner Links.
- **Vollständiges Audit**: führt dasselbe Audit wie der [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner) aus und zeigt eine Live-Bewertung an.

## Installation

Installieren Sie [**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) aus dem Chrome Web Store und pinnen Sie die Erweiterung an Ihre Symbolleiste.

Die Erweiterung funktioniert in Chrome und in jedem auf Chromium basierenden Browser, der Chrome Web Store-Erweiterungen unterstützt (Edge, Brave, Arc, Opera).

## Verwendung

### Eine Seite analysieren

1. Öffnen Sie die Website, die Sie untersuchen möchten.
2. Klicken Sie auf das **Intlayer i18n Scanner**-Symbol in der Symbolleiste.
3. Das Popup zeigt die Abschnitte **Erkannte Technologien**, **Locales** und **SEO-i18n-Tags** für die aktuelle Seite.

Die Erkennung läuft lokal in Ihrem Browser und nur auf dem aktuellen Tab.

### Ein vollständiges Audit durchführen

![Intlayer Chrome-Erweiterung Audit-Score](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_audit_score.png?raw=true)

Scrollen Sie zum Abschnitt **Vollständiges Audit** und klicken Sie auf **Vollständiges i18n-Audit ausführen**. Die Ergebnisse werden gestreamt, sobald jede Prüfung abgeschlossen ist, gruppiert nach:

- **Seite**: `html lang`- und `dir`-Attribute, aktuelles Locale, Hreflang-Tags, `x-default`, kanonischer Link, lokalisierte interne Links, Sprachauswahl, Flaggen-Icons und ungenutzte Locale-Inhalte im JavaScript-Bundle.
- **Robots.txt**: Vorhandensein und ob Locale-Pfade crawlbar bleiben.
- **Sitemap**: Vorhandensein, alle aufgelisteten Locales, alternative Links und `x-default`.
- **Domain**: Anzahl der auf der gesamten Website entdeckten Locales.

Jede Prüfung wird als bestanden, Warnung oder fehlgeschlagen markiert, und die Punktzahl fasst den gesamten i18n-SEO-Zustand der Seite zusammen.

## Datenschutz und Berechtigungen

Die Erweiterung fordert minimale Berechtigungen an:

- **activeTab** und **scripting**: Der Detektor läuft nur auf dem Tab, den Sie gerade betrachten, und nur, wenn Sie das Popup öffnen.
- **back.intlayer.org**: Wird nur verwendet, wenn Sie ein vollständiges Audit ausführen. Die URL der aktuellen Seite wird zur Analyse an die Intlayer-API gesendet.

Es wird kein Browserverlauf erfasst und nichts läuft im Hintergrund.

## FAQ

<FAQ>

<Question title="Muss die Website Intlayer verwenden?">

Nein. Die Erweiterung untersucht jede Website, unabhängig davon, welches Framework oder welche i18n-Bibliothek verwendet wird.

</Question>
<Question title="Warum wird eine Technologie nicht erkannt?">

Die Erkennung basiert auf dem, was die Seite im Browser offenlegt: globale Variablen, Cookies, Meta-Tags und DOM-Marker. Einige Produktions-Builds entfernen diese Marker, sodass eine Bibliothek verwendet werden kann, ohne eine sichtbare Spur zu hinterlassen.

</Question>
<Question title="Wie behebe ich die vom Audit gefundenen Probleme?">

Die meisten Prüfungen entsprechen einer Routing- oder Metadaten-Einstellung. Mit Intlayer werden hreflang, kanonischer Link, `x-default`, lokalisierte Links, sitemap und robots.txt aus Ihrer [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) generiert. Weitere Informationen finden Sie im Integrationsleitfaden für Ihr Framework, z. B. [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md), [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nuxt.md) oder [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_tanstack.md).

</Question>

</FAQ>

## Verwandte Tools

- [VS Code Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md)
- [MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md)
- [LSP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/lsp.md)
