---
docName: ci_cd
url: https://intlayer.org/doc/concept/ci-cd
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/CI_CD.md
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: CI/CD-Integration
description: Erfahren Sie, wie Sie Intlayer in Ihre CI/CD-Pipeline integrieren können, um Inhalte automatisch zu verwalten und bereitzustellen.
keywords:
  - CI/CD
  - Kontinuierliche Integration
  - Kontinuierliche Bereitstellung
  - Automatisierung
  - Internationalisierung
  - Dokumentation
  - Intlayer
---

# Automatische Generierung von Übersetzungen in einer CI/CD-Pipeline

Intlayer ermöglicht die automatische Generierung von Übersetzungen für Ihre Inhaltsdeklarationsdateien. Es gibt mehrere Möglichkeiten, dies je nach Ihrem Workflow zu erreichen.

## Verwendung des CMS

Mit Intlayer können Sie einen Workflow übernehmen, bei dem nur eine einzige Sprache lokal deklariert wird, während alle Übersetzungen remote über das CMS verwaltet werden. Dies ermöglicht es, Inhalte und Übersetzungen vollständig vom Code zu trennen, bietet mehr Flexibilität für Inhaltsredakteure und ermöglicht das Hot-Reloading von Inhalten (keine Notwendigkeit, die Anwendung neu zu erstellen, um Änderungen anzuwenden).

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
    dictionaryPriorityStrategy: "distant_first", // Remote-Inhalte haben Priorität

    applicationURL: process.env.APPLICATION_URL, // Anwendungs-URL, die vom CMS verwendet wird

    clientId: process.env.INTLAYER_CLIENT_ID, // CMS-Zugangsdaten
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
  ai: {
    applicationContext: "Dies ist eine Testanwendung", // Hilft, eine konsistente Übersetzungsgenerierung sicherzustellen
  },
};

export default config;
```

Weitere Informationen zum CMS finden Sie in der [offiziellen Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md).

## Verwendung von Husky

Sie können die Übersetzungsgenerierung in Ihren lokalen Git-Workflow mit [Husky](https://typicode.github.io/husky/) integrieren.

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

    applicationContext: "Dies ist eine Testanwendung", // Hilft, eine konsistente Übersetzungsgenerierung sicherzustellen
  },
};

export default config;
```

```bash fileName=".husky/pre-push"
npx intlayer build                          # Sicherstellen, dass Wörterbücher aktuell sind
npx intlayer fill --unpushed --mode fill    # Nur fehlende Inhalte ausfüllen, bestehende nicht aktualisieren
```

> Weitere Informationen zu Intlayer CLI-Befehlen und deren Verwendung finden Sie in der [CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md).

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

Intlayer bietet einen CLI-Befehl, um Wörterbuchinhalte automatisch auszufüllen und zu überprüfen. Dies kann in Ihren CI/CD-Workflow mit GitHub Actions integriert werden.

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
          commit-message: chore: auto-fill missing translations [skip ci]
          branch: auto-translations
          title: chore: update missing translations
          labels: translation, automated
```

> Wie bei Husky können Sie im Fall eines Monorepos das Argument `--base-dir` verwenden, um jede App nacheinander zu behandeln.

> Standardmäßig filtert das Argument `--git-diff` Wörterbücher, die Änderungen von der Basis (Standard `origin/main`) zum aktuellen Branch (Standard: `HEAD`) enthalten.

> Weitere Informationen zu Intlayer CLI-Befehlen und deren Verwendung finden Sie in der [CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md).
