---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Intlayer Compat Adapter"
description: "Migrieren Sie Ihre bestehende i18n-Lösung mit null Reibung zu Intlayer mithilfe von Compat-Adaptern."
keywords:
  - compat
  - migration
  - Internationalisierung
  - i18n
  - Intlayer
slugs:
  - doc
  - compatibility
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Verlauf initialisiert"
author: aymericzip
---

# Intlayer Compat Adapter

Die Migration einer großen Anwendung zu einer neuen Internationalisierungsbibliothek kann entmutigend sein. Um diesen Übergang zu erleichtern, bietet Intlayer **Compat-Adapter** für die beliebtesten i18n-Bibliotheken im Ökosystem.

Diese Adapter-Pakete stellen die **exakt gleiche öffentliche API** wie Ihre bestehenden i18n-Bibliotheken bereit, delegieren jedoch die gesamte Übersetzungsarbeit zur Laufzeit an Intlayer.

## Funktionsweise

Wenn Sie einen Compat-Adapter verwenden, müssen Sie die Imports Ihrer Anwendung nicht umschreiben oder ändern, wie Sie Ihre Übersetzungs-Hooks und -Komponenten verwenden. Stattdessen aliasieren Intlayers Bundler-Plugins automatisch Ihre bestehenden Imports auf die Intlayer Compat-Pakete.

Zum Beispiel ersetzt ein Entwickler `import { useTranslation } from 'react-i18next'` durch `import { useTranslation } from '@intlayer/react-i18next'` (dies geschieht automatisch über das Bundler-Plugin), und die Anwendung funktioniert weiterhin, wobei Übersetzungen nun aus Intlayer-Wörterbüchern bereitgestellt werden. Schlüssel werden auch gegen Ihre Intlayer-Wörterbücher typisiert!

## Verfügbare Compat-Adapter

Wählen Sie Ihre bestehende Bibliothek unten aus, um zu sehen, wie Sie nahtlos migrieren können:

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/vue-i18n" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/transloco" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/react-intl" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/svelte-i18n" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/react-i18next" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/polyglot" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/nuxtjs-i18n" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/ngx-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/next-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/next-intl" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/next-i18next" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/i18next" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/lingui" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compat/i18n-js" />
</TechGrid>
