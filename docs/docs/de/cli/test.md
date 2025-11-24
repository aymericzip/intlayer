---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Fehlende Übersetzungen testen
description: Erfahren Sie, wie Sie fehlende Übersetzungen in Ihren Wörterbüchern testen und identifizieren.
keywords:
  - Test
  - Fehlende Übersetzungen
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - test
---

# Fehlende Übersetzungen testen

```bash
npx intlayer content test
```

## Aliase:

- `npx intlayer test`

Dieser Befehl analysiert Ihre Content-Deklarationsdateien, um fehlende Übersetzungen in allen konfigurierten Sprachen zu identifizieren. Er liefert einen umfassenden Bericht, der zeigt, welche Übersetzungsschlüssel für welche Sprachen fehlen, und hilft Ihnen so, die Konsistenz Ihres mehrsprachigen Contents zu gewährleisten.

## Beispielausgabe:

```bash
pnpm intlayer content test
Missing translations:
 - home-page                      - tr         - src/components/HomePage/homePage.content.ts
 - server-component               - es, tr     - src/components/ServerComponent/serverComponent.content.ts
 - client-component               - pl, tr     - src/components/ClientComponent/clientComponent.content.ts
Locales: en, ru, ja, fr, ko, zh, es, de, ar, it, en-GB, pt, hi, tr, pl
Erforderliche Sprachen: en
Fehlende Sprachen: pl, tr, es
Fehlende erforderliche Sprachen: -
Insgesamt fehlende Sprachen: 3
Insgesamt fehlende erforderliche Sprachen: 0
```

## Argumente:

**Konfigurationsoptionen:**

- **`--env`**: Geben Sie die Umgebung an (z. B. `development`, `production`).
- **`--env-file [envFile]`**: Geben Sie eine benutzerdefinierte Umgebungsdatei an, aus der Variablen geladen werden.
- **`--base-dir`**: Geben Sie das Basisverzeichnis für das Projekt an.

> Beispiel: `npx intlayer content test --base-dir ./src --env-file .env.production.local`

- **`--no-cache`**: Deaktiviert den Cache.

  > Beispiel: `npx intlayer build --no-cache`

**Vorbereitungsoptionen:**

- **`--build`**: Baut die Wörterbücher vor dem Pushen, um sicherzustellen, dass der Inhalt aktuell ist. True erzwingt den Build, false überspringt den Build, undefined erlaubt die Verwendung des Build-Caches.

**Protokolloptionen:**

- **`--verbose`**: Aktiviert ausführliche Protokollierung zur Fehlerbehebung. (Standardmäßig true bei Verwendung der CLI)

  > Beispiel: `npx intlayer content test --verbose`

## Beispiel:

```bash
npx intlayer content test --verbose
```

Die Ausgabe hilft Ihnen schnell zu erkennen, welche Übersetzungen noch abgeschlossen werden müssen, damit Ihre Anwendung in allen konfigurierten Sprachen korrekt funktioniert.
