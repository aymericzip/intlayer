---
createdAt: 2024-08-11
updatedAt: 2026-01-06
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
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: JSON-Ausgabeoption zum Listen-Befehl hinzugefügt
---

# Inhaltsdeklarationsdateien auflisten

```bash
npx intlayer content list
```

## Aliase:

- `npx intlayer list`

Dieser Befehl zeigt alle Inhaltsdeklarationsdateien in Ihrem Projekt an, einschließlich ihrer Wörterbuchschlüssel und Dateipfade. Er ist nützlich, um einen Überblick über alle Ihre Inhaltsdateien zu erhalten und zu überprüfen, ob sie von Intlayer korrekt erkannt werden.

## Argumente:

- **`--json`**: Gibt die Ergebnisse als JSON statt als formatierten Text aus. Nützlich für Skripte und programmatischen Zugriff.

  > Beispiel: `npx intlayer content list --json`

## Beispiele:

### Inhaltsdeklarationsdateien auflisten:

```bash
npx intlayer content list
```

### Ausgabe als JSON:

```bash
npx intlayer content list --json
```

## Beispielausgabe:

### Formatierte Ausgabe:

```bash
npx intlayer content list
Inhaltsdeklarationsdateien:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Gesamtanzahl der Inhaltsdeklarationsdateien: 3
```

### JSON-Ausgabe:

```bash
$ npx intlayer content list --json

[{"key":"home-page","path":"src/components/HomePage/homePage.content.ts"},{"key":"server-component","path":"src/components/ServerComponent/serverComponent.content.ts"},{"key":"client-component","path":"src/components/ClientComponent/clientComponent.content.ts"}]
```

Dieser Befehl gibt aus:

- Eine formatierte Liste aller Inhaltsdeklarationsdateien mit ihren Schlüsseln und relativen Dateipfaden
- Die Gesamtanzahl der gefundenen Inhaltsdeklarationsdateien

Die Ausgabe hilft Ihnen zu überprüfen, ob alle Ihre Inhaltsdateien korrekt konfiguriert und vom Intlayer-System erkannt werden.
