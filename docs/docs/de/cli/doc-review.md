---
createdAt: 2024-08-11
updatedAt: 2026-06-17
title: Dokument überprüfen
description: Erfahren Sie, wie Sie Dokumentationsdateien auf Qualität, Konsistenz und Vollständigkeit in verschiedenen Sprachversionen überprüfen.
keywords:
  - Überprüfung
  - Dokument
  - Dokumentation
  - KI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
history:
  - version: 9.0.0
    date: 2026-06-17
    changes: "Option --log hinzufügen"
author: aymericzip
---

# Dokument überprüfen

Der Befehl `doc review` analysiert Dokumentationsdateien auf Qualität, Konsistenz und Vollständigkeit in verschiedenen Sprachversionen.

## Wichtige Punkte:

- Teilt große Markdown-Dateien in Chunks auf, um innerhalb der Kontextfenster-Grenzen des KI-Modells zu bleiben.
- Optimiert die zu überprüfenden Chunks und überspringt Teile, die bereits übersetzt und unverändert sind.
- Verarbeitet Dateien, Chunks und Locales parallel mithilfe eines Warteschlangensystems, um die Geschwindigkeit zu erhöhen.

```bash packageManager="npm"
npx intlayer doc review
```

```bash packageManager="yarn"
yarn intlayer doc review
```

```bash packageManager="pnpm"
pnpm intlayer doc review
```

```bash packageManager="bun"
bun x intlayer doc review
```

Er kann verwendet werden, um bereits übersetzte Dateien zu überprüfen und zu prüfen, ob die Übersetzung korrekt ist.

Für die meisten Anwendungsfälle,

- verwenden Sie bevorzugt `doc translate`, wenn die übersetzte Version dieser Datei nicht verfügbar ist.
- verwenden Sie bevorzugt den Befehl `doc review`, wenn die übersetzte Version dieser Datei bereits existiert.

> Beachten Sie, dass der Überprüfungsprozess mehr Eingabetoken verbraucht als der Übersetzungsprozess, um dieselbe Datei vollständig zu überprüfen. Der Überprüfungsprozess optimiert jedoch die zu überprüfenden Abschnitte und überspringt die Teile, die nicht geändert wurden.

## Argumente:

**Optionen für die Dateiliste:**

- **`--doc-pattern [docPattern...]`**: Glob-Muster, um Dokumentationsdateien zur Überprüfung auszuwählen.

  > Beispiel: `npx intlayer doc review --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Glob-Muster, die von der Überprüfung ausgeschlossen werden sollen.

  > Beispiel: `npx intlayer doc review --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Überspringe die Datei, wenn sie vor dem angegebenen Zeitpunkt geändert wurde.
  - Kann eine absolute Zeit wie "2025-12-05" sein (String oder Date)
  - Kann eine relative Zeit in ms sein `1 * 60 * 60 * 1000` (1 Stunde)
  - Diese Option prüft die Aktualisierungszeit der Datei mit der Methode `fs.stat`. Daher kann sie durch Git oder andere Tools, die die Datei ändern, beeinflusst werden.

  > Beispiel: `npx intlayer doc review --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Überspringe die Datei, wenn sie innerhalb des angegebenen Zeitraums geändert wurde.
  - Kann eine absolute Zeit wie "2025-12-05" sein (String oder Date)
  - Kann eine relative Zeit in ms sein `1 * 60 * 60 * 1000` (1 Stunde)
  - Diese Option prüft die Aktualisierungszeit der Datei mit der Methode `fs.stat`. Daher kann sie durch Git oder andere Tools, die die Datei ändern, beeinflusst werden.

  > Beispiel: `npx intlayer doc review --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: Überspringe die Datei, wenn sie bereits existiert.

  > Beispiel: `npx intlayer doc review --skip-if-exists`

**Überprüfungsmodus-Optionen:**

- **`--log`**: Nur-Protokollierungsmodus. Nicht mit KI übersetzen; stattdessen die Blöcke, die Aufmerksamkeit erfordern (mit Zeilennummern und Inhalt), für die Basis- und Ziel-Locales protokollieren, um einem anderen Agenten bei der Generierung der Übersetzungen zu helfen.

  > Beispiel: `npx intlayer doc review --log`

**Optionen für die Ausgabe der Einträge:**

- **`--locales [locales...]`**: Ziel-Lokalisierungen, für die die Dokumentation überprüft werden soll.

  > Beispiel: `npx intlayer doc review --locales fr es de`

- **`--base-locale [baseLocale]`**: Quell-Lokalisierung (Basisdokument), mit der verglichen werden soll.

  > Beispiel: `npx intlayer doc review --base-locale en`

**Optionen zur Dateiverarbeitung:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Anzahl der Dateien, die gleichzeitig für die Überprüfung verarbeitet werden.

  > Beispiel: `npx intlayer doc review --nb-simultaneous-file-processed 5`

**KI-Optionen:**

- **`--model [model]`**: Das für die Überprüfung zu verwendende KI-Modell (z. B. `gpt-3.5-turbo`).
- **`--provider [provider]`**: Der für die Überprüfung zu verwendende KI-Anbieter.
- **`--temperature [temperature]`**: Temperatureinstellung für das KI-Modell.
- **`--api-key [apiKey]`**: Eigener API-Schlüssel für den KI-Dienst.
- **`--application-context [applicationContext]`**: Zusätzlicher Kontext für die KI-Überprüfung.
- **`--data-serialization [dataSerialization]`**: Das Datenserialisierungsformat für die KI-Funktionen von Intlayer. Optionen: `json` (Standard, zuverlässig), `toon` (weniger Token, weniger konsistent).
- **`--custom-prompt [prompt]`**: Passen Sie den Basis-Prompt an, der für die Überprüfung verwendet wird. (Hinweis: Für die meisten Anwendungsfälle wird stattdessen die Option `--custom-instructions` empfohlen, da sie eine bessere Kontrolle bietet.)

  > Beispiel: `npx intlayer doc review --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "Meine Anwendung ist ein Katzenladen"`

**Optionen für Umgebungsvariablen:**

- **`--env`**: Geben Sie die Umgebung an (z. B. `development`, `production`).
- **`--env-file [envFile]`**: Geben Sie eine benutzerdefinierte Umgebungsdatei an, aus der Variablen geladen werden.
- **`--base-dir`**: Geben Sie das Basisverzeichnis für das Projekt an.
- **`--no-cache`**: Deaktivieren Sie den Cache.

  > Beispiel: `npx intlayer doc review --base-dir ./docs --env-file .env.production.local`

**Protokollierungsoptionen:**

- **`--verbose`**: Aktiviert ausführliche Protokollierung zur Fehlerbehebung. (Standardmäßig über CLI auf true gesetzt)

  > Beispiel: `npx intlayer doc review --verbose`

**Optionen für benutzerdefinierte Anweisungen:**

- **`--custom-instructions [customInstructions]`**: Benutzerdefinierte Anweisungen, die dem Prompt hinzugefügt werden. Nützlich, um spezifische Regeln bezüglich Formatierung, URL-Übersetzung usw. anzuwenden.

  > Beispiel: `npx intlayer doc review --custom-instructions "URLs nicht übersetzen und das Markdown-Format beibehalten"`

  > Beispiel: `npx intlayer doc review --custom-instructions "$(cat ./instructions.md)"`

**Git-Optionen:**

- **`--git-diff`**: Nur auf Dateien anwenden, die Änderungen vom Basis-Branch (Standard `origin/main`) zum aktuellen Branch (Standard: `HEAD`) enthalten.
- **`--git-diff-base`**: Basis-Referenz für den Git-Diff angeben (Standard `origin/main`).
- **`--git-diff-current`**: Aktuelle Referenz für den Git-Diff angeben (Standard: `HEAD`).
- **`--uncommitted`**: Uncommittete Änderungen einbeziehen.
- **`--unpushed`**: Nicht gepushte Änderungen einbeziehen.
- **`--untracked`**: Nicht verfolgte Dateien einbeziehen.

  > Beispiel: `npx intlayer doc review --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Beispiel: `npx intlayer doc review --uncommitted --unpushed --untracked`

> Beachten Sie, dass der Ausgabepfad der Datei durch Ersetzen der folgenden Muster bestimmt wird:
>
> - `/{{baseLocale}}/` durch `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` durch `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` durch `_{{locale}}.`
> - `{{baseLocale}}_` durch `{{locale}}_`
> - `.{{baseLocaleName}}.` durch `.{{localeName}}.`
>
> Wenn das Muster nicht gefunden wird, wird die Ausgabedatei die Endung `.{{locale}}` erhalten. `./my/file.md` wird überprüft und für die französische Locale zu `./my/file.fr.md` aktualisiert.
