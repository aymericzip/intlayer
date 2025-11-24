---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Dokument überprüfen
description: Erfahren Sie, wie Sie Dokumentationsdateien auf Qualität, Konsistenz und Vollständigkeit in verschiedenen Sprachversionen überprüfen.
keywords:
  - Überprüfung
  - Dokument
  - Dokumentation
  - KI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
---

# Dokument überprüfen

Der Befehl `doc review` analysiert Dokumentationsdateien auf Qualität, Konsistenz und Vollständigkeit in verschiedenen Sprachversionen.

```bash
npx intlayer doc review
```

Er kann verwendet werden, um bereits übersetzte Dateien zu überprüfen und zu prüfen, ob die Übersetzung korrekt ist.

Für die meisten Anwendungsfälle,

- verwenden Sie bevorzugt `doc translate`, wenn die übersetzte Version dieser Datei nicht verfügbar ist.
- verwenden Sie bevorzugt den Befehl `doc review`, wenn die übersetzte Version dieser Datei bereits existiert.

> Beachten Sie, dass der Überprüfungsprozess mehr Eingabetoken verbraucht als der Übersetzungsprozess, um dieselbe Datei vollständig zu überprüfen. Der Überprüfungsprozess optimiert jedoch die zu überprüfenden Abschnitte und überspringt die Teile, die nicht geändert wurden.

## Argumente:

Der Befehl `doc review` akzeptiert dieselben Argumente wie `doc translate`, sodass Sie bestimmte Dokumentationsdateien überprüfen und Qualitätsprüfungen anwenden können.

Wenn Sie eine der Git-Optionen aktiviert haben, überprüft der Befehl nur die Teile der Dateien, die geändert werden. Das Skript verarbeitet die Datei in Abschnitten (Chunks) und überprüft jeden Abschnitt. Wenn in einem Abschnitt keine Änderungen vorhanden sind, überspringt das Skript diesen, um den Überprüfungsprozess zu beschleunigen und die Kosten für die AI-Provider-API zu begrenzen.

Für eine vollständige Liste der Argumente siehe die [Dokumentation zum Befehl „Translate Document“](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/doc-translate.md).
