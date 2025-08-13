---
createdAt: 2025-05-20
updatedAt: 2025-08-13
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

Intlayer ermöglicht die automatische Generierung von Übersetzungen für Ihre Content-Deklarationsdateien. Es gibt verschiedene Möglichkeiten, dies je nach Ihrem Workflow zu realisieren.

## Verwendung des CMS

Mit Intlayer können Sie einen Workflow verwenden, bei dem nur eine einzige Locale lokal deklariert wird, während alle Übersetzungen remote über das CMS verwaltet werden. Dies ermöglicht es, Inhalte und Übersetzungen vollständig von der Codebasis zu trennen, bietet mehr Flexibilität für Content-Editoren und ermöglicht ein Hot Content Reloading (kein erneutes Bauen der Anwendung erforderlich, um Änderungen anzuwenden).

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

Um mehr über das CMS zu erfahren, lesen Sie die [offizielle Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md).

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
npx intlayer build                          # Um sicherzustellen, dass die Wörterbücher auf dem neuesten Stand sind
npx intlayer fill --unpushed --mode fill    # Nur fehlende Inhalte ausfüllen, bestehende nicht aktualisieren
```

> Für weitere Informationen zu den Intlayer CLI-Befehlen und deren Verwendung siehe die [CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md).

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

Intlayer bietet einen CLI-Befehl zum automatischen Ausfüllen und Überprüfen von Wörterbuchinhalten. Dies kann in Ihren CI/CD-Workflow mit GitHub Actions integriert werden.

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
# Auslöserbedingungen für diesen Workflow
on:
  pull_request:
    branches:
      - "main"

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: "autofill-${{ github.ref }}"
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      # OpenAI
      AI_MODEL: openai
      AI_PROVIDER: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}

    steps:
      # Schritt 1: Hole den neuesten Code aus dem Repository
      - name: ⬇️ Repository auschecken
        uses: actions/checkout@v4
        with:
          persist-credentials: true # Anmeldeinformationen zum Erstellen von PRs beibehalten
          fetch-depth: 0 # Vollständige Git-Historie für Differenzanalyse abrufen

      # Schritt 2: Node.js-Umgebung einrichten
      - name: 🟢 Node.js einrichten
        uses: actions/setup-node@v4
        with:
          node-version: 20 # Node.js 20 LTS für Stabilität verwenden

      # Schritt 3: Projektabhängigkeiten installieren
      - name: 📦 Abhängigkeiten installieren
        run: npm install

      # Schritt 4: Intlayer CLI global für Übersetzungsmanagement installieren
      - name: 📦 Intlayer installieren
        run: npm install -g intlayer-cli

      # Schritt 5: Intlayer-Projekt bauen, um Übersetzungsdateien zu generieren
      - name: ⚙️ Intlayer-Projekt bauen
        run: npx intlayer build

      # Schritt 6: KI verwenden, um fehlende Übersetzungen automatisch auszufüllen
      - name: 🤖 Fehlende Übersetzungen automatisch ausfüllen
        run: npx intlayer fill --git-diff --mode fill --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY

      # Schritt 7: Prüfen, ob Änderungen vorliegen und diese committen
      - name: � Auf Änderungen prüfen
        id: check-changes
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            echo "has-changes=true" >> $GITHUB_OUTPUT
          else
            echo "has-changes=false" >> $GITHUB_OUTPUT
          fi

      # Schritt 8: Änderungen committen und pushen, falls vorhanden
      - name: 📤 Änderungen committen und pushen
        if: steps.check-changes.outputs.has-changes == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "chore: fehlende Übersetzungen automatisch ausfüllen [skip ci]"
          git push origin HEAD:${{ github.head_ref }}
```

Um die Umgebungsvariablen einzurichten, gehen Sie zu GitHub → Einstellungen → Geheimnisse und Variablen → Aktionen und fügen Sie das Geheimnis hinzu.

> Wie bei Husky können Sie im Fall eines Monorepos das Argument `--base-dir` verwenden, um jede App nacheinander zu behandeln.

> Standardmäßig filtert das Argument `--git-diff` Wörterbücher, die Änderungen vom Basiszweig (Standard `origin/main`) zum aktuellen Zweig (Standard: `HEAD`) enthalten.

> Für weitere Informationen zu den Intlayer CLI-Befehlen und deren Verwendung lesen Sie bitte die [CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md).

## Dokumentationshistorie

| Version | Datum      | Änderungen              |
| ------- | ---------- | ----------------------- |
| 5.5.10  | 2025-06-29 | Historie initialisieren |
