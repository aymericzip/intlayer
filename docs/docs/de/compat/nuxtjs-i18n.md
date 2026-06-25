---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migration von NuxtJS I18n zu Intlayer"
description: "Erfahren Sie, wie Sie Ihre Nuxt.js-Anwendung von @nuxtjs/i18n zu Intlayer mithilfe des Compat-Adapters migrieren."
keywords:
  - nuxtjs-i18n
  - nuxt
  - vue
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Verlauf initialisiert"
author: aymericzip
---

# Migration von NuxtJS I18n zu Intlayer

Die Migration Ihrer Nuxt-Anwendung von `@nuxtjs/i18n` zu Intlayer ist ein nahtloser Prozess mithilfe des Nuxt-Adapter-Moduls.

## Was zu tun ist

Um das Projekt zu initialisieren, führen Sie aus:

```bash
npx intlayer init
```

Dadurch wird `intlayer.config.ts` eingerichtet. Fügen Sie dann das Intlayer Nuxt-Modul (z.B. `@intlayer/nuxt-i18n`) in Ihrem `nuxt.config.ts`-Module-Array hinzu. Dies wendet automatisch die Compat-Konfiguration für Ihre Anwendung an.

## Was im Hintergrund geschieht

`@nuxtjs/i18n` umhüllt `vue-i18n` und stellt Nuxt-spezifische Routing-Composables bereit (`useLocalePath`, `useSwitchLocalePath`, `<NuxtLinkLocale>`).

Im Hintergrund:

- **Übersetzungen:** Basiert nativ auf dem `@intlayer/vue-i18n`-Compat-Layer für alle Zeichenketten-Übersetzungsaufgaben (vollständige Unterstützung von `vue-i18n`-Formaten, Pipe-Pluralen und Reaktivität).
- **Routing:** Spiegelt die Routing-Composables mithilfe der lokalisierten URL-Helfer von Intlayer.
- **Konfiguration:** Liest die `availableLocales` und Standardeinstellungen direkt aus Ihrer `intlayer.config.ts`, um Nuxt-Seiten automatisch zu koordinieren.
