---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Wie baut man Wörterbücher?
description: Lernen Sie, wie man Wörterbücher erstellt.
keywords:
  - bauen
  - wörterbücher
  - intlayer
  - befehl
  - beobachten
  - vscode
  - plugin
  - framework
  - next.js
  - vite
slugs:
  - frequent-questions
  - build-dictionaries
---

# Wörterbücher erstellen

## Wie man Wörterbücher erstellt

Intlayer stellt ein Kommandozeilen-Tool zur Verfügung, um Wörterbücher zu erstellen.

```bash
npx intlayer dictionaries build
```

Dieser Befehl:

- Durchsucht alle Inhaltsdeklarationsdateien (`.content.{ts,tsx,js,mjs,cjs,json,...}`) in Ihrem Projekt.
- Generiert Wörterbücher und speichert sie im Ordner `.intlayer/dictionary`.

### Beobachtungsmodus

Wenn Sie Wörterbücher automatisch aktualisieren möchten, sobald Änderungen an Inhaltsdeklarationsdateien vorgenommen werden, führen Sie den folgenden Befehl aus:

```bash
npx intlayer dictionaries build --watch
```

In diesem Modus durchsucht und erstellt Intlayer Wörterbücher, sobald Änderungen an Inhaltsdeklarationsdateien vorgenommen werden, und aktualisiert automatisch den Ordner `.intlayer/dictionary`.

### Verwendung der VSCode-Erweiterung

Sie können auch die [Intlayer VSCode-Erweiterung](https://github.com/aymericzip/intlayer/tree/main/docs/de/vs_code_extension.md) verwenden, um Ihre Intlayer-Erfahrung in VSCode zu verbessern.

### Verwendung des Plugins für Ihr bevorzugtes Anwendungsframework

Wenn Sie ein Framework wie Next.js (Webpack / Turbopack), Vite oder React Native, Lynx usw. verwenden, stellt Intlayer ein Plugin bereit, mit dem Sie Intlayer in Ihre Anwendung integrieren können.

Intlayer erstellt die Wörterbücher vor dem Build Ihrer Anwendung.
Ebenso überwacht Intlayer im Entwicklungsmodus Änderungen an Ihren Inhaltsdeklarationsdateien und erstellt die Wörterbücher automatisch neu.

Lesen Sie daher die spezifische Dokumentation Ihres Frameworks, um zu erfahren, wie Sie das Plugin integrieren können.
