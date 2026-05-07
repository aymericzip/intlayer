---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Dokument übersetzen
description: Erfahren Sie, wie Sie Dokumentationsdateien automatisch mit KI-Übersetzungsdiensten übersetzen können.
keywords:
  - Übersetzen
  - Dokument
  - Dokumentation
  - KI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-translate
---

# Dokument übersetzen

Der Befehl `doc translate` übersetzt Dokumentationsdateien automatisch von einer Basissprache in Zielsprachen mithilfe von KI-Übersetzungsdiensten.

## Wichtige Punkte:

- Teilt große Markdown-Dateien in Chunks auf, um innerhalb der Kontextfenster-Grenzen des KI-Modells zu bleiben.
- Wiederholt die Übersetzung, wenn das Ausgabeformat falsch ist.
- Integriert anwendungs- und dateispezifischen Kontext für verbesserte Übersetzungsgenauigkeit.
- Erhält bestehende Übersetzungen, indem sie nicht überschrieben werden.
- Verarbeitet Dateien, Chunks und Locales parallel mithilfe eines Warteschlangensystems, um die Geschwindigkeit zu erhöhen.

```bash packageManager="npm"
npx intlayer doc translate
```

```bash packageManager="yarn"
yarn intlayer doc translate
```

```bash packageManager="pnpm"
pnpm intlayer doc translate
```

```bash packageManager="bun"
bun x intlayer doc translate
```

## Argumente:

**Optionen für die Dateiliste:**

- **`--doc-pattern [docPattern...]`**: Glob-Muster, um Dokumentationsdateien zum Übersetzen auszuwählen.

  > Beispiel: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Glob-Muster, die von der Übersetzung ausgeschlossen werden sollen.

  > Beispiel: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Überspringe die Datei, wenn sie vor dem angegebenen Zeitpunkt geändert wurde.
  - Kann eine absolute Zeit wie "2025-12-05" sein (String oder Date)
  - Kann eine relative Zeit in ms sein `1 * 60 * 60 * 1000` (1 Stunde)
  - Diese Option prüft die Aktualisierungszeit der Datei mit der Methode `fs.stat`. Daher kann sie durch Git oder andere Tools, die die Datei ändern, beeinflusst werden.

  > Beispiel: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Überspringe die Datei, wenn sie innerhalb des angegebenen Zeitraums geändert wurde.
  - Kann eine absolute Zeit wie "2025-12-05" sein (String oder Date)
  - Kann eine relative Zeit in ms sein `1 * 60 * 60 * 1000` (1 Stunde)
  - Diese Option prüft die Aktualisierungszeit der Datei mit der Methode `fs.stat`. Daher kann sie durch Git oder andere Tools, die die Datei ändern, beeinflusst werden.

  > Beispiel: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: Überspringe die Datei, wenn sie bereits existiert.

  > Beispiel: `npx intlayer doc translate --skip-if-exists`

**Optionen für die Ausgabe der Einträge:**

- **`--locales [locales...]`**: Ziel-Lokalisierungen, in die die Dokumentation übersetzt werden soll.

  > Beispiel: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: Quell-Lokalisierung, aus der übersetzt werden soll.

  > Beispiel: `npx intlayer doc translate --base-locale en`

**Optionen zur Dateiverarbeitung:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Anzahl der Dateien, die gleichzeitig für die Übersetzung verarbeitet werden.

  > Beispiel: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**KI-Optionen:**

- **`--model [model]`**: Das für die Übersetzung zu verwendende KI-Modell (z. B. `gpt-3.5-turbo`).
- **`--provider [provider]`**: Der für die Übersetzung zu verwendende KI-Anbieter.
- **`--temperature [temperature]`**: Temperatureinstellung für das KI-Modell.
- **`--api-key [apiKey]`**: Eigener API-Schlüssel für den KI-Dienst.
- **`--application-context [applicationContext]`**: Zusätzlicher Kontext für die KI-Übersetzung.
- **`--data-serialization [dataSerialization]`**: Das Datenserialisierungsformat für die KI-Funktionen von Intlayer. Optionen: `json` (Standard, zuverlässig), `toon` (weniger Token, weniger konsistent).
- **`--custom-prompt [prompt]`**: Passen Sie den Basis-Prompt an, der für die Übersetzung verwendet wird. (Hinweis: Für die meisten Anwendungsfälle wird stattdessen die Option `--custom-instructions` empfohlen, da sie eine bessere Kontrolle über das Übersetzungsverhalten bietet.)

  > Beispiel: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "Meine Anwendung ist ein Katzenladen"`

**Optionen für Umgebungsvariablen:**

- **`--env`**: Geben Sie die Umgebung an (z. B. `development`, `production`).
- **`--env-file [envFile]`**: Geben Sie eine benutzerdefinierte Umgebungsdatei an, aus der Variablen geladen werden.
- **`--base-dir`**: Geben Sie das Basisverzeichnis für das Projekt an.
- **`--no-cache`**: Deaktivieren Sie den Cache.

  > Beispiel: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**Protokollierungsoptionen:**

- **`--verbose`**: Aktiviert ausführliche Protokollierung zur Fehlerbehebung. (Standardmäßig über CLI auf true gesetzt)

  > Beispiel: `npx intlayer doc translate --verbose`

**Optionen für benutzerdefinierte Anweisungen:**

- **`--custom-instructions [customInstructions]`**: Benutzerdefinierte Anweisungen, die dem Prompt hinzugefügt werden. Nützlich, um spezifische Regeln bezüglich Formatierung, URL-Übersetzung usw. anzuwenden.
  - Kann eine absolute Zeit wie "2025-12-05" sein (String oder Date)
  - Kann eine relative Zeit in ms sein `1 * 60 * 60 * 1000` (1 Stunde)
  - Diese Option überprüft die Aktualisierungszeit der Datei mittels der `fs.stat`-Methode. Daher kann sie durch Git oder andere Tools, die die Datei verändern, beeinflusst werden.

  > Beispiel: `npx intlayer doc translate --custom-instructions "URLs nicht übersetzen und das Markdown-Format beibehalten"`

  > Beispiel: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Git-Optionen:**

- **`--git-diff`**: Nur auf Wörterbücher anwenden, die Änderungen vom Basis-Branch (Standard `origin/main`) zum aktuellen Branch (Standard: `HEAD`) enthalten.
- **`--git-diff-base`**: Basis-Referenz für den Git-Diff angeben (Standard `origin/main`).
- **`--git-diff-current`**: Aktuelle Referenz für den Git-Diff angeben (Standard: `HEAD`).
- **`--uncommitted`**: Uncommittete Änderungen einbeziehen.
- **`--unpushed`**: Nicht gepushte Änderungen einbeziehen.
- **`--untracked`**: Nicht verfolgte Dateien einbeziehen.

  > Beispiel: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Beispiel: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> Beachten Sie, dass der Ausgabepfad der Datei durch Ersetzen der folgenden Muster bestimmt wird
>
> - `/{{baseLocale}}/` durch `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` durch `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` durch `_{{locale}}.`
> - `{{baseLocale}}_` durch `{{locale}}_`
> - `.{{baseLocaleName}}.` durch `.{{localeName}}.`
>
> Wenn das Muster nicht gefunden wird, wird die Ausgabedatei die Endung `.{{locale}}` erhalten. `./my/file.md` wird für die französische Locale zu `./my/file.fr.md` übersetzt.
