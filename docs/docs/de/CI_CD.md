---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: CI/CD-Integration
description: Erfahren Sie, wie Sie Intlayer in Ihre CI/CD-Pipeline für automatisiertes Content-Management und Deployment integrieren.
keywords:
  - CI/CD
  - Kontinuierliche Integration
  - Kontinuierliche Bereitstellung
  - Automatisierung
  - Internationalisierung
  - Dokumentation
  - Intlayer
slugs:
  - doc
  - concept
  - ci-cd
---

# Automatische Generierung von Übersetzungen in einer CI/CD-Pipeline

Intlayer ermöglicht die automatische Generierung von Übersetzungen für Ihre Content-Deklarationsdateien. Es gibt verschiedene Möglichkeiten, dies je nach Ihrem Workflow zu erreichen.

## Verwendung des CMS

Mit Intlayer können Sie einen Workflow übernehmen, bei dem nur eine einzige Locale lokal deklariert wird, während alle Übersetzungen remote über das CMS verwaltet werden. Dies ermöglicht es, Inhalte und Übersetzungen vollständig von der Codebasis zu trennen, bietet mehr Flexibilität für Content-Editoren und ermöglicht ein Hot Content Reloading (kein Neubauen der Anwendung erforderlich, um Änderungen anzuwenden).

### Beispielkonfiguration

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Optionale Locales werden remote verwaltet
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    dictionaryPriorityStrategy: "distant_first", // Remote-Inhalte haben Vorrang

    applicationURL: process.env.APPLICATION_URL, // Anwendungs-URL, die vom CMS verwendet wird

    clientId: process.env.INTLAYER_CLIENT_ID, // CMS-Zugangsdaten
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "Dies ist eine Testanwendung", // Hilft, eine konsistente Übersetzungserstellung sicherzustellen
  },
};

export default config;
```

Um mehr über das CMS zu erfahren, siehe die [offizielle Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md).

## Verwendung von Husky

Sie können die Übersetzungserstellung in Ihren lokalen Git-Workflow mit [Husky](https://typicode.github.io/husky/) integrieren.

### Beispielkonfiguration

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH], // Optionale Sprachen werden remote verwaltet
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY, // Verwenden Sie Ihren eigenen API-Schlüssel

    applicationContext: "Dies ist eine Testanwendung", // Hilft, eine konsistente Übersetzungserstellung sicherzustellen
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # Um sicherzustellen, dass die Wörterbücher aktuell sind
npx intlayer fill --unpushed --mode fill    # Füllt nur fehlende Inhalte, aktualisiert keine bestehenden
```

> Für weitere Informationen zu den Intlayer-CLI-Befehlen und deren Verwendung siehe die [CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md).

> Wenn Sie mehrere Apps in Ihrem Repository haben, die separate Intlayer-Instanzen verwenden, können Sie das Argument `--base-dir` wie folgt verwenden:

```bash fileName=".husky/pre-push"
# App 1
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode fill

# App 2
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode fill
```

## Verwendung von GitHub Actions

Intlayer stellt einen CLI-Befehl zum automatischen Ausfüllen und Überprüfen von Wörterbuchinhalten bereit. Dies kann in Ihren CI/CD-Workflow mit GitHub Actions integriert werden.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
on:
  push:
    branches: [ main ]
    paths:
      - 'src/**'
  pull_request:
    branches: [ main ]
    paths:
      - 'src/**'
  workflow_dispatch: {}

concurrency:
  group: 'autofill-${{ github.ref }}'
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      INTLAYER_CLIENT_ID: ${{ secrets.INTLAYER_CLIENT_ID }}
      INTLAYER_CLIENT_SECRET: ${{ secrets.INTLAYER_CLIENT_SECRET }}
      OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}

    steps:
      - name: ⬇️ Repository auschecken
        uses: actions/checkout@v3
        with:
          persist-credentials: true

      - name: 🟢 Node.js einrichten
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: 📦 Abhängigkeiten installieren
        run: npm ci

      - name: ⚙️ Intlayer-Projekt bauen
        run: npx intlayer build

      - name: 🤖 Fehlende Übersetzungen automatisch ausfüllen
        run: npx intlayer fill --git-diff --mode fill

      - name: 📤 Übersetzungs-PR erstellen oder aktualisieren
        uses: peter-evans/create-pull-request@v4
        with:
          commit-message: chore: fehlende Übersetzungen automatisch ausfüllen [skip ci]
          branch: auto-translations
          title: chore: fehlende Übersetzungen aktualisieren
          labels: translation, automated
```

> Wie bei Husky können Sie im Fall eines Monorepos das Argument `--base-dir` verwenden, um jede App nacheinander zu behandeln.

> Standardmäßig filtert das Argument `--git-diff` Wörterbücher, die Änderungen vom Basiszweig (Standard `origin/main`) zum aktuellen Zweig (Standard: `HEAD`) enthalten.

> Für weitere Informationen zu den Intlayer-CLI-Befehlen und deren Verwendung lesen Sie bitte die [CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md).

## Dokumentationsverlauf

- 5.5.10 - 2025-06-29: Initialer Verlauf
