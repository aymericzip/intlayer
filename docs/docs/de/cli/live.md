---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Live-Sync-Befehle
description: Erfahren Sie, wie Sie Live Sync verwenden, um CMS-Inhaltsänderungen zur Laufzeit widerzuspiegeln.
keywords:
  - Live Sync
  - CMS
  - Laufzeit
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - live
---

# Live-Sync-Befehle

Live Sync ermöglicht es Ihrer App, CMS-Inhaltsänderungen zur Laufzeit widerzuspiegeln. Kein Neuaufbau oder erneutes Bereitstellen erforderlich. Wenn aktiviert, werden Updates an einen Live-Sync-Server gestreamt, der die Wörterbücher aktualisiert, die Ihre Anwendung liest. Weitere Details finden Sie unter [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md).

```json fileName="package.json"
"scripts": {
  "intlayer:live:start": "npx intlayer live start --with 'next dev --turbopack'"
}
```

## Argumente:

**Konfigurationsoptionen:**

- **`--base-dir`**: Geben Sie das Basisverzeichnis für das Projekt an. Um die Intlayer-Konfiguration abzurufen, sucht der Befehl im Basisverzeichnis nach der Datei `intlayer.config.{ts,js,json,cjs,mjs}`.

- **`--no-cache`**: Deaktivieren Sie den Cache.

  > Beispiel: `npx intlayer dictionary push --env-file .env.production.local`

**Protokolloptionen:**

- **`--verbose`**: Aktivieren Sie ausführliche Protokollierung zur Fehlerbehebung. (Standardmäßig über CLI auf true gesetzt)
