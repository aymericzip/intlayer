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
    changes: CI-Befehl hinzufügen
---

# CI-Befehl

```bash
npx intlayer ci <command...>
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

```bash
npx intlayer ci fill --verbose --mode complete
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
