---
docName: package__intlayer-cli
url: https://intlayer.org/doc/package/intlayer-cli
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer-cli/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-cli - Kommandozeilenwerkzeug für Internationalisierung
description: Kommandozeilen-Interface-Paket für Intlayer, das Werkzeuge zum Verwalten von Übersetzungen, Erstellen von Wörterbüchern und Automatisieren von Internationalisierungs-Workflows bereitstellt.
keywords:
  - intlayer
  - CLI
  - Kommandozeile
  - Internationalisierung
  - i18n
  - Werkzeuge
  - NPM
  - Automatisierung
---

# intlayer-cli: NPM-Paket zur Nutzung der Intlayer-CLI

**Intlayer** ist eine Sammlung von Paketen, die speziell für JavaScript-Entwickler entwickelt wurden. Es ist kompatibel mit Frameworks wie React, React und Express.js.

**`intlayer-cli`** ist ein NPM-Paket, das das Paket `@intlayer/cli` verwendet und die `intlayer`-Kommandozeilen-Schnittstellen verfügbar macht.

> Beachten Sie, dass dieses Paket nicht benötigt wird, wenn das [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/de/packages/intlayer/index.md) Paket installiert ist. Im Vergleich zum `intlayer`-Paket ist das `intlayer-cli`-Paket ein leichteres Paket, das nur das CLI-Werkzeug enthält, ohne Abhängigkeiten von `@intlayer/core`.

## Installation

Installieren Sie das erforderliche Paket mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

## Verwendung

Hier ein Beispiel, wie das `intlayer-cli`-Paket verwendet wird:

```bash
npx intlayer dictionaries build
```

## CLI-Befehle

Intlayer stellt ein CLI-Tool zur Verfügung, um:

- Ihre Inhaltsdeklarationen zu prüfen und fehlende Übersetzungen zu ergänzen
- Wörterbücher aus Ihren Inhaltsdeklarationen zu erstellen
- entfernte Wörterbücher von Ihrem CMS in Ihr Lokalisierungsprojekt zu übertragen und abzurufen

Weitere Informationen finden Sie unter [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md).

## Dokumentationsverlauf

- 5.5.10 - 2025-06-29: Initialer Verlauf
