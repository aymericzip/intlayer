---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentation des astro-intlayer-Pakets
description: Astro-Integration für Intlayer, die die Einrichtung für sprachenbasiertes Routing und Wörterbuchverwaltung bereitstellt.
keywords:
  - astro-intlayer
  - astro
  - Internationalisierung
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Vereinheitlichte Dokumentation für alle Exporte
---

# astro-intlayer-Paket

Das `astro-intlayer`-Paket stellt die notwendigen Werkzeuge bereit, um Intlayer in Astro-Anwendungen zu integrieren. Es konfiguriert sprachenbasiertes Routing und die Verwaltung von Wörterbüchern.

## Installation

```bash
npm install astro-intlayer
```

## Exporte

### Integration

Das Paket `astro-intlayer` stellt eine Astro-Integration bereit, um Intlayer in Ihrem Projekt einzurichten.

Importieren:

```tsx
import "astro-intlayer";
```

oder zur Datei `astro.config.mjs` hinzufügen:

```ts
export default defineConfig({
  integrations: [intlayer()],
});
```

| Funktion   | Beschreibung                                                 |
| ---------- | ------------------------------------------------------------ |
| `intlayer` | Astro-Integration, die Intlayer in Ihrem Projekt einrichtet. |
