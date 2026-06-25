---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migration von Vue I18n zu Intlayer"
description: "Erfahren Sie, wie Sie Ihre Vue-Anwendung von vue-i18n zu Intlayer mithilfe des Compat-Adapters migrieren."
keywords:
  - vue-i18n
  - vue
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Verlauf initialisiert"
author: aymericzip
---

# Migration von Vue I18n zu Intlayer

Wenn Ihre Vue-Anwendung derzeit `vue-i18n` verwendet, können Sie zu Intlayer migrieren, ohne Ihre Komponenten umzuschreiben oder Hooks zu übersetzen. Intlayer bietet einen Compat-Adapter, der die API von `vue-i18n` perfekt spiegelt und dabei die leistungsstarken Funktionen von Intlayer im Hintergrund nutzt.

## Was zu tun ist

Um zu beginnen, führen Sie einfach den Initialisierungsbefehl in Ihrem Projekt aus:

```bash
npx intlayer init
```

Während der Initialisierung richtet Intlayer Ihre Konfigurationsdatei (`intlayer.config.ts`) ein und bereitet Ihr Projekt für die Migration vor. Sie müssen lediglich das Intlayer-Plugin zu Ihrer Vite-Konfiguration hinzufügen, um die `vue-i18n`-Imports automatisch zu aliasieren.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

## Was im Hintergrund geschieht

Das `vueI18nVitePlugin` injiziert einen Modul-Alias in Ihren Bundler. Jeder Import von `vue-i18n` in Ihrem Codebase wird transparent zu `@intlayer/vue-i18n` weitergeleitet.

**Im Hintergrund behandelt der Adapter die komplexe `vue-i18n`-Syntax nativ:**

- **Interpolation & Plurale:** Löst `{name}`- und Listen-`{0}`-Interpolationen auf. Pipe-Plurale (`"car | cars"`) werden basierend auf positionaler Semantik in Intlayer-Enumerations-/Plural-Knoten umgewandelt.
- **Formate:** Funktionen wie `d()` und `n()` umhüllen `Intl` im Hintergrund und berücksichtigen die in Ihren Optionen definierten `datetimeFormats` und `numberFormats`.
- **Globaler & lokaler Zustand:** `global.locale` wird einem `WritableComputedRef` zugeordnet, das vom Intlayer-Client unterstützt wird, sodass sich die Reaktivität genau wie erwartet verhält (z.B. `locale.value = 'fr'`).
- **Direktiven:** Die `v-t`-Direktive ist registriert und funktioniert normal.

Ihre Anwendung rendert weiterhin genau wie zuvor, aber der Inhalt wird von Ihren Intlayer-Wörterbüchern bereitgestellt, was Ihnen Typsicherheit, bessere Bundle-Optimierung und nahtlose CMS-Integration bietet.
