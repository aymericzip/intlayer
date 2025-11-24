---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Wörterbücher füllen
description: Erfahren Sie, wie Sie Ihre Wörterbücher mit KI füllen, prüfen und übersetzen.
keywords:
  - Füllen
  - Prüfen
  - Übersetzen
  - Wörterbücher
  - CLI
  - Intlayer
  - KI
slugs:
  - doc
  - concept
  - cli
  - fill
---

# Wörterbücher füllen / prüfen / übersetzen

```bash
npx intlayer fill
```

Dieser Befehl analysiert Ihre Content-Deklarationsdateien auf potenzielle Probleme wie fehlende Übersetzungen, strukturelle Inkonsistenzen oder Typabweichungen. Wenn Probleme gefunden werden, schlägt **intlayer fill** Aktualisierungen vor oder wendet sie an, um Ihre Wörterbücher konsistent und vollständig zu halten.

## Aliase:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

## Argumente:

**Optionen für die Dateiliste:**

- **`-f, --file [files...]`**: Eine Liste spezifischer Content-Deklarationsdateien, die geprüft werden sollen. Wenn nicht angegeben, werden alle entdeckten `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` basierend auf Ihrer Konfigurationsdatei geprüft.

  > Beispiel: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: Filtert Wörterbücher basierend auf Schlüsseln. Wenn nicht angegeben, werden alle Wörterbücher geprüft.

  > Beispiel: `npx intlayer dictionary fill -k key1 key2`

- **`--key [keys...]`**: Filtert Wörterbücher basierend auf Schlüsseln (Alias für --keys).

  > Beispiel: `npx intlayer dictionary fill --key key1 key2`

- **`--excluded-keys [excludedKeys...]`**: Schließt Wörterbücher basierend auf Schlüsseln aus. Wenn nicht angegeben, werden alle Wörterbücher geprüft.

  > Beispiel: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--excluded-key [excludedKeys...]`**: Filtert Wörterbücher basierend auf Schlüsseln heraus (Alias für --excluded-keys).

  > Beispiel: `npx intlayer dictionary fill --excluded-key key1 key2`

- **`--path-filter [pathFilters...]`**: Filtert Wörterbücher basierend auf einem Glob-Muster für Dateipfade.

  > Beispiel: `npx intlayer dictionary fill --path-filter "src/home/**"`

**Optionen für die Ausgabe von Einträgen:**

- **`--source-locale [sourceLocale]`**: Die Quell-Locale, von der übersetzt werden soll. Wenn nicht angegeben, wird die Standard-Locale aus Ihrer Konfiguration verwendet.

- **`--output-locales [outputLocales...]`**: Ziel-Locale(n), in die übersetzt werden soll. Wenn nicht angegeben, werden alle Locale aus Ihrer Konfiguration verwendet, außer der Quell-Locale.

- **`--mode [mode]`**: Übersetzungsmodus: `complete`, `review`. Standard ist `complete`. `complete` füllt alle fehlenden Inhalte aus, `review` füllt fehlende Inhalte aus und überprüft vorhandene Schlüssel.

**Git-Optionen:**

- **`--git-diff`**: Nur auf Wörterbüchern ausführen, die Änderungen vom Basis-Branch (Standard `origin/main`) zum aktuellen Branch (Standard: `HEAD`) enthalten.
- **`--git-diff-base`**: Gibt die Basis-Referenz für den Git-Diff an (Standard `origin/main`).
- **`--git-diff-current`**: Gibt die aktuelle Referenz für den Git-Diff an (Standard: `HEAD`).
- **`--uncommitted`**: Uncommittete Änderungen einschließen.
- **`--unpushed`**: Nicht gepushte Änderungen einschließen.
- **`--untracked`**: Nicht verfolgte Dateien einschließen.

  > Beispiel: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Beispiel: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**KI-Optionen:**

- **`--model [model]`**: Das für die Übersetzung zu verwendende KI-Modell (z.B. `gpt-3.5-turbo`).
- **`--provider [provider]`**: Der KI-Anbieter, der für die Übersetzung verwendet wird.
- **`--temperature [temperature]`**: Temperatureinstellung für das KI-Modell.
- **`--api-key [apiKey]`**: Geben Sie Ihren eigenen API-Schlüssel für den KI-Dienst an.
- **`--custom-prompt [prompt]`**: Geben Sie eine benutzerdefinierte Eingabeaufforderung für Ihre Übersetzungsanweisungen an.
- **`--application-context [applicationContext]`**: Geben Sie zusätzlichen Kontext für die KI-Übersetzung an.

  > Beispiel: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "Meine Anwendung ist ein Katzenladen"`

**Optionen für Umgebungsvariablen:**

- **`--env`**: Gibt die Umgebung an (z.B. `development`, `production`).
- **`--env-file [envFile]`**: Gibt eine benutzerdefinierte Umgebungsdatei an, aus der Variablen geladen werden.

  > Beispiel: `npx intlayer fill --env-file .env.production.local`

  > Beispiel: `npx intlayer fill --env production`

**Konfigurationsoptionen:**

- **`--base-dir`**: Gibt das Basisverzeichnis für das Projekt an.

  > Beispiel: `npx intlayer fill --base-dir ./src`

- **`--no-cache`**: Deaktiviert den Cache.

  > Beispiel: `npx intlayer build --no-cache`

**Vorbereitungsoptionen:**

- **`--build`**: Baut die Wörterbücher vor dem Pushen, um sicherzustellen, dass der Inhalt aktuell ist. True erzwingt den Build, false überspringt den Build, undefined erlaubt die Verwendung des Build-Caches.

- **`--skip-metadata`**: Überspringt das Ausfüllen fehlender Metadaten (Beschreibung, Titel, Tags) für Wörterbücher.

**Protokollierungsoptionen:**

- **`--verbose`**: Aktiviert ausführliche Protokollierung zur Fehlerbehebung. (Standardmäßig true bei Verwendung der CLI)

## Beispiel:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Dieser Befehl übersetzt Inhalte von Englisch nach Französisch und Spanisch für alle Inhaltsdeklarationsdateien im Verzeichnis `src/home/` unter Verwendung des GPT-3.5 Turbo Modells.
