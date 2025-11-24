---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Inhaltsdeklarationsdateien auflisten
description: Erfahren Sie, wie Sie alle Inhaltsdeklarationsdateien in Ihrem Projekt auflisten können.
keywords:
  - Auflisten
  - Inhaltsdeklaration
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - list
---

# Inhaltsdeklarationsdateien auflisten

```bash
npx intlayer content list
```

## Aliase:

- `npx intlayer list`

Dieser Befehl zeigt alle Inhaltsdeklarationsdateien in Ihrem Projekt an, einschließlich ihrer Wörterbuchschlüssel und Dateipfade. Er ist nützlich, um einen Überblick über alle Ihre Inhaltsdateien zu erhalten und zu überprüfen, ob sie von Intlayer korrekt erkannt werden.

## Beispiel:

```bash
npx intlayer content list
```

## Beispielausgabe:

```bash
npx intlayer content list
Inhaltsdeklarationsdateien:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Gesamtanzahl der Inhaltsdeklarationsdateien: 3
```

Dieser Befehl gibt aus:

- Eine formatierte Liste aller Inhaltsdeklarationsdateien mit ihren Schlüsseln und relativen Dateipfaden
- Die Gesamtanzahl der gefundenen Inhaltsdeklarationsdateien

Die Ausgabe hilft Ihnen zu überprüfen, ob alle Ihre Inhaltsdateien korrekt konfiguriert und vom Intlayer-System erkannt werden.
