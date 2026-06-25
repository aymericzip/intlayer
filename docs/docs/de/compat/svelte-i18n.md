---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migration von Svelte I18n zu Intlayer"
description: "Erfahren Sie, wie Sie Ihre Svelte-Anwendung von svelte-i18n zu Intlayer mithilfe des Compat-Adapters migrieren."
keywords:
  - svelte-i18n
  - svelte
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - svelte-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Verlauf initialisiert"
author: aymericzip
---

# Migration von Svelte I18n zu Intlayer

Das Verschieben Ihrer Svelte-Anwendung von `svelte-i18n` zu Intlayer dauert mit dem Compat-Adapter nur einen Moment.

## Was zu tun ist

Führen Sie einfach den Initialisierungsbefehl in Ihrem Projekt aus:

```bash
npx intlayer init
```

Dadurch wird `intlayer.config.ts` generiert. Stellen Sie sicher, dass Ihre SvelteKit/Vite-Plugins mit Intlayers Alias-Plugin umhüllt sind, um `svelte-i18n` nahtlos auf `@intlayer/svelte-i18n` abzubilden.

## Was im Hintergrund geschieht

Svelte-i18n basiert auf häufig verwendeten Stores (`$_`, `$t`, `$format` etc.) und ICU MessageFormat.

Im Hintergrund:

- **Stores:** Intlayer proxyt die `svelte-i18n`-Stores. `$_` wird zu einem abgeleiteten Store der aktuellen Locale, der einen Intlayer-Resolver zurückgibt.
- **Schlüssel:** Ihre flachen Schlüssel (z.B. `$_('home.title')`) werden so ausgewertet, dass das erste Pfadsegment das Intlayer-Wörterbuch repräsentiert.
- **ICU-Syntax:** Vollständig durch den gemeinsamen ICU-Resolver behandelt (äquivalentes `intl-messageformat`-Parsing).
- **Formatter:** `$date`-, `$time`- und `$number`-Aufrufe leiten sicher zu Intlayers nativen Kern-Formatierern weiter.
- **Babel/SWC-Analyse:** Der Intlayer-Analyzer liest die Svelte-Store-Aufrufer (`$_`) in Ihren `.svelte`-Quelldateien vor der Kompilierung, um automatisch die relevanten Wörterbuch-Chunks zu erstellen.
