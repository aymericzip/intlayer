---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Intlayer-Befehl debuggen
description: Erfahren Sie, wie Sie Intlayer CLI-Probleme debuggen und beheben können.
keywords:
  - Debuggen
  - Fehlerbehebung
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - debug
---

# Intlayer-Befehl debuggen

## 1. **Stellen Sie sicher, dass Sie die neueste Version verwenden**

Führen Sie aus:

```bash
npx intlayer --version                  # aktuelle lokale Intlayer-Version
npx intlayer@latest --version           # aktuellste Intlayer-Version
```

## 2. **Überprüfen Sie, ob der Befehl registriert ist**

Sie können dies überprüfen mit:

```bash
npx intlayer --help                     # Zeigt die Liste der verfügbaren Befehle und Nutzungsinformationen
npx intlayer dictionary build --help    # Zeigt die Liste der verfügbaren Optionen für einen Befehl
```

## 3. **Starten Sie Ihr Terminal neu**

Manchmal ist ein Neustart des Terminals erforderlich, damit neue Befehle erkannt werden.

## 4. **Leeren Sie den npx-Cache (wenn Sie mit einer älteren Version festhängen)**

```bash
npx clear-npx-cache
```
