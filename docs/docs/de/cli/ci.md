---
createdAt: 2026-01-06
updatedAt: 2026-01-06
title: CI-Befehl
description: Erfahren Sie, wie Sie den Intlayer CI-Befehl verwenden, um Intlayer-Befehle mit automatisch injizierten Anmeldedaten in CI/CD-Pipelines und Monorepos auszuführen.
keywords:
  - CI
  - CI/CD
  - Automatisierung
  - Monorepo
  - Anmeldedaten
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - ci
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: "CI-Befehl hinzufügen"
author: aymericzip
---

# CI-Befehl

```bash packageManager="npm"
npx intlayer ci <command...>
```

```bash packageManager="yarn"
yarn intlayer ci <command...>
```

```bash packageManager="pnpm"
pnpm intlayer ci <command...>
```

```bash packageManager="bun"
bun x intlayer ci <command...>
```

Der CI-Befehl ist für Automatisierung und CI/CD-Pipelines konzipiert. Er injiziert automatisch Anmeldedaten aus der Umgebungsvariable `INTLAYER_PROJECT_CREDENTIALS` und kann Intlayer-Befehle über mehrere Projekte in einem Monorepo ausführen.

## Funktionsweise

Der CI-Befehl arbeitet in zwei Modi:

1. **Einzelprojektmodus**: Wenn das aktuelle Arbeitsverzeichnis mit einem der Projektpfade in `INTLAYER_PROJECT_CREDENTIALS` übereinstimmt, führt er den Befehl nur für dieses spezifische Projekt aus.

2. **Iterationsmodus**: Wenn kein spezifischer Projektkontext erkannt wird, iteriert er über alle konfigurierten Projekte und führt den Befehl für jedes aus.

## Umgebungsvariable

Der Befehl erfordert, dass die Umgebungsvariable `INTLAYER_PROJECT_CREDENTIALS` gesetzt ist. Diese Variable sollte ein JSON-Objekt enthalten, das Projektpfade ihren Anmeldedaten zuordnet:

```json
{
  "packages/app": {
    "clientId": "your-client-id-1",
    "clientSecret": "your-client-secret-1"
  },
  "packages/admin": {
    "clientId": "your-client-id-2",
    "clientSecret": "your-client-secret-2"
  }
}
```

## Paketmanager-Erkennung

Der CI-Befehl erkennt automatisch, welcher Paketmanager verwendet wird (npm, yarn, pnpm oder bun), basierend auf der Umgebungsvariable `npm_config_user_agent`, und verwendet den entsprechenden Befehl zur Ausführung von Intlayer.

## Argumente

- **`<command...>`**: Der auszuführende Intlayer-Befehl (z. B. `fill`, `push`, `build`). Sie können jeden Intlayer-Befehl und seine Argumente übergeben.

  > Beispiel: `npx intlayer ci fill --verbose`
  >
  > Beispiel: `npx intlayer ci push`
  >
  > Beispiel: `npx intlayer ci build`

## Beispiele

### Befehl im Einzelprojektmodus ausführen

Wenn Sie sich in einem Projektverzeichnis befinden, das mit einem der Pfade in `INTLAYER_PROJECT_CREDENTIALS` übereinstimmt:

```bash
cd packages/app
npx intlayer ci fill
```

Dies führt den Befehl `fill` mit automatisch injizierten Anmeldedaten für das Projekt `packages/app` aus.

### Befehl für alle Projekte ausführen

Wenn Sie sich in einem Verzeichnis befinden, das mit keinem Projektpfad übereinstimmt, iteriert der Befehl über alle konfigurierten Projekte:

```bash
cd /path/to/monorepo
npx intlayer ci push
```

Dies führt den Befehl `push` für jedes in `INTLAYER_PROJECT_CREDENTIALS` konfigurierte Projekt aus.

### Zusätzliche Flags übergeben

Sie können beliebige Flags an den zugrunde liegenden Intlayer-Befehl übergeben:

```bash packageManager="npm"
npx intlayer ci fill --verbose --mode complete
```

```bash packageManager="yarn"
yarn intlayer ci fill --verbose --mode complete
```

```bash packageManager="pnpm"
pnpm intlayer ci fill --verbose --mode complete
```

```bash packageManager="bun"
bun x intlayer ci fill --verbose --mode complete
```

### Verwendung in CI/CD-Pipelines

In Ihrer CI/CD-Konfiguration (z. B. GitHub Actions, GitLab CI) setzen Sie `INTLAYER_PROJECT_CREDENTIALS` als Geheimnis:

```yaml
# GitHub Actions Beispiel
env:
  INTLAYER_PROJECT_CREDENTIALS: ${{ secrets.INTLAYER_PROJECT_CREDENTIALS }}

steps:
  - name: Wörterbücher füllen
    run: npx intlayer ci fill
```

## Gerüstete GitHub Actions

Wenn Sie `intlayer init` ausführen, erkennt Intlayer Ihren Paketmanager (npm, yarn, pnpm oder bun) und erstellt zwei GitHub Actions-Workflows unter `.github/workflows/` mit Befehlen, die diesem Paketmanager entsprechen:

- **`intlayer-fill.yml`** — Bei jedem Pull Request werden die Wörterbücher erstellt und `intlayer fill --git-diff --mode complete` ausgeführt, um fehlende Übersetzungen für die geänderten Wörterbücher zu generieren, und dann wird das Ergebnis auf den PR-Branch committed.
- **`intlayer-test.yml`** — Bei jedem Pull Request werden die Wörterbücher erstellt und `intlayer test` ausgeführt, wobei die Prüfung fehlschlägt, wenn erforderliche Lokalisierungen fehlende Übersetzungen haben.

Vorhandene Workflow-Dateien werden niemals überschrieben. Um das Scaffolding vollständig zu überspringen, führen Sie aus:

```bash
npx intlayer init --no-github-actions
```

### AI-Zugriff für den Fill-Workflow bereitstellen

Die gerüstete `intlayer-fill.yml` erfordert AI-Zugriff. Es stehen zwei Optionen zur Verfügung (konfiguriert im `env`-Block des Workflows):

1. **Ihr eigener AI-Provider-Schlüssel** — Fügen Sie ein `AI_API_KEY`-Secret in Ihren Repository-Einstellungen hinzu (Settings → Secrets and variables → Actions). Der Workflow leitet ihn über `--provider`, `--model` und `--api-key` weiter.
2. **Intlayer CMS-Zugangsschlüssel** — Fügen Sie `INTLAYER_CLIENT_ID` und `INTLAYER_CLIENT_SECRET`-Secrets hinzu und verbinden Sie sie mit Ihrem `intlayer.config` `editor`-Abschnitt. CMS-Zugangsschlüssel gewähren AI-Zugriff über das Intlayer-Backend.

Der `intlayer-test.yml`-Workflow erfordert keinen AI-Zugriff.

## Fehlerbehandlung

- Wenn `INTLAYER_PROJECT_CREDENTIALS` nicht gesetzt ist, beendet sich der Befehl mit einem Fehler.
- Wenn `INTLAYER_PROJECT_CREDENTIALS` kein gültiges JSON ist, beendet sich der Befehl mit einem Fehler.
- Wenn ein Projektpfad nicht existiert, wird er mit einer Warnung übersprungen.
- Wenn ein Projekt fehlschlägt, beendet sich der Befehl mit einem Statuscode ungleich null.

## Anwendungsfälle

- **Monorepo-Automatisierung**: Intlayer-Befehle über mehrere Projekte in einem Monorepo ausführen
- **CI/CD-Pipelines**: Automatisierung der Wörterbuchverwaltung in Continuous-Integration-Workflows
- **Massenoperationen**: Dieselbe Operation gleichzeitig für mehrere Intlayer-Projekte durchführen
- **Geheimnisverwaltung**: Sichere Verwaltung von Anmeldedaten für mehrere Projekte mithilfe von Umgebungsvariablen

## Sicherheitsbest Practices

- Speichern Sie `INTLAYER_PROJECT_CREDENTIALS` als verschlüsselte Geheimnisse in Ihrer CI/CD-Plattform
- Committen Sie niemals Anmeldedaten in die Versionskontrolle
- Verwenden Sie umgebungsspezifische Anmeldedaten für verschiedene Bereitstellungsumgebungen
- Rotieren Sie Anmeldedaten regelmäßig
