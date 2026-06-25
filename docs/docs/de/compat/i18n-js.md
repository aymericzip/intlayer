---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migration von i18n-js zu Intlayer"
description: "Erfahren Sie, wie Sie Ihre Anwendung von i18n-js zu Intlayer mithilfe des Compat-Adapters migrieren."
keywords:
  - i18n-js
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - i18n-js
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Verlauf initialisiert"
author: aymericzip
---

# Migration von i18n-js zu Intlayer

Der Übergang von der `i18n-js`-Bibliothek zu Intlayer ist eine hochoptimierte Migration, die darauf ausgelegt ist, umfangreiche Übersetzungskonfigurationen in Intlayers strukturiertes Dateiauflösungssystem auszulagern.

## Was zu tun ist

Führen Sie den folgenden Setup-Befehl in Ihrem Repository aus:

```bash
npx intlayer init
```

Wenn `intlayer.config.ts` vorbereitet ist, können Sie Intlayers Alias zu Ihrer Bundler-Konfiguration hinzufügen, sodass alle Imports von `i18n-js` auf das Compat-Paket `@intlayer/i18n-js` abzielen.

## Was im Hintergrund geschieht

`i18n-js` greift auf Namespaces über Ausdrücke wie `i18n.t('scope.key', {name})` zusammen mit Locale-Fallbacks und spezifischen Plural-Zuordnungen zu.

Im Hintergrund:

- **Interpolation:** Der Compat-Adapter analysiert problemlos `%{name}`-Zuordnungen in Ihren angestrebten Laufzeit-Wörterbuch-Wert.
- **Pluralisierung:** Ersetzt `one/other`-Unterschlüssel und ordnet sie den leistungsstarken zugrunde liegenden Plural-Mechanismen von Intlayer zu (`Intl.PluralRules`), wodurch manuelle Zuordnungen abstrahiert werden.
- **Locales:** Anstatt monolithische Sprach-Payloads beim Start zu laden, werden Wörterbücher optimal basierend auf dem aktuellen Kontext bereitgestellt, der über die native Intlayer-Konfiguration eingerichtet wird.
