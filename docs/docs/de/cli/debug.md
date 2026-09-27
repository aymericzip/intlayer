---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 5
title: "Die Intlayer CLI debuggen"
description: "Fehlerbehebung für die Intlayer CLI: installierte Version prüfen, ausführliche Logs aktivieren und häufige Befehls- und Konfigurationsfehler beheben."
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
author: aymericzip
---

# Intlayer-Befehl debuggen

## 1. **Stellen Sie sicher, dass Sie die neueste Version verwenden**

Führen Sie aus:

```bash packageManager="npm"
npx intlayer --version                  # aktuelle lokale Intlayer-Version
npx intlayer@latest --version           # aktuellste Intlayer-Version
```

```bash packageManager="yarn"
yarn intlayer --version                  # aktuelle lokale Intlayer-Version
yarn intlayer@latest --version           # aktuellste Intlayer-Version
```

```bash packageManager="pnpm"
pnpm intlayer --version                  # aktuelle lokale Intlayer-Version
pnpm intlayer@latest --version           # aktuellste Intlayer-Version
```

```bash packageManager="bun"
bun x intlayer --version                  # aktuelle lokale Intlayer-Version
bun x intlayer@latest --version           # aktuellste Intlayer-Version
```

## 2. **Überprüfen Sie, ob der Befehl registriert ist**

Sie können dies überprüfen mit:

```bash packageManager="npm"
npx intlayer --help                     # Zeigt die Liste der verfügbaren Befehle und Nutzungsinformationen
npx intlayer dictionary build --help    # Zeigt die Liste der verfügbaren Optionen für einen Befehl
```

```bash packageManager="yarn"
yarn intlayer --help                     # Zeigt die Liste der verfügbaren Befehle und Nutzungsinformationen
yarn intlayer dictionary build --help    # Zeigt die Liste der verfügbaren Optionen für einen Befehl
```

```bash packageManager="pnpm"
pnpm intlayer --help                     # Zeigt die Liste der verfügbaren Befehle und Nutzungsinformationen
pnpm intlayer dictionary build --help    # Zeigt die Liste der verfügbaren Optionen für einen Befehl
```

```bash packageManager="bun"
bun x intlayer --help                     # Zeigt die Liste der verfügbaren Befehle und Nutzungsinformationen
bun x intlayer dictionary build --help    # Zeigt die Liste der verfügbaren Optionen für einen Befehl
```

## 3. **Starten Sie Ihr Terminal neu**

Manchmal ist ein Neustart des Terminals erforderlich, damit neue Befehle erkannt werden.

## 4. **Leeren Sie den npx-Cache (wenn Sie mit einer älteren Version festhängen)**

```bash
npx clear-npx-cache
```
