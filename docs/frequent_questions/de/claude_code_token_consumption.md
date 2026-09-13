---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: Wie man den Token-Verbrauch von Claude Code bei Übersetzungen begrenzt
description: Warum das Übersetzen mit Claude Code Tokens verbrennt, was Intlayer stattdessen tut (bereits übersetzte Schlüssel filtern, JSON aufteilen, Markdown blockweise übersetzen) und wie Sie Ihr Claude-Abonnement mit claude setup-token wiederverwenden.
keywords:
  - claude code
  - tokens
  - token-verbrauch
  - setup-token
  - i18n
  - internationalisierung
  - übersetzung
  - fill
  - mcp
  - agent
slugs:
  - frequent-questions
  - claude-code-token-consumption
author: aymericzip
---

# Wie man den Token-Verbrauch von Claude Code bei Übersetzungen begrenzt

## Problembeschreibung

Claude Code (oder jeden anderen Programmier-Agenten) mit der Übersetzung Ihrer Inhalte zu beauftragen, ist der teuerste Weg. Bei jedem Durchlauf muss der Agent:

- Die gesamte JSON- oder Inhaltsdatei in seinen Kontext laden, selbst die Schlüssel, die bereits übersetzt sind.
- Die zugehörigen Dateien durchsuchen, um herauszufinden, wo sich der Inhalt befindet und wie er strukturiert ist.
- Ermitteln, welche Locales fehlen und generiert werden müssen.
- Ihre benutzerdefinierten Anweisungen jedes Mal erneut lesen ("URLs auf diese Weise anpassen", "Markennamen auf Englisch belassen", "Du-Form verwenden").
- Die gesamte Datei neu schreiben, einschließlich der Teile, die sich nicht geändert haben.

All das wird bei jedem Durchlauf erneut übermittelt, sodass die Kosten mit `Größe des Inhalts × Anzahl der Locales × Anzahl der Durchläufe` ansteigen, und jede Abweichung bei Formatierung oder Schlüsseln muss manuell überprüft werden.

## Was Intlayer stattdessen tut

Der Vorteil von Intlayer besteht darin, diese Arbeit außerhalb des Agenten mit einer speziell für Übersetzungen entwickelten Pipeline zu erledigen:

- **Filtert bestehende Übersetzungen**, um den Token-Verbrauch zu begrenzen. Bereits übersetzte Schlüssel in Ihrem JSON werden entfernt und nur die fehlenden an das Modell gesendet.
- **Übersetzt Markdown blockweise.** Für die Dokumentation vergleichen [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/doc-translate.md) und [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/doc-review.md) jeden Block mit dem Basisdokument und überspringen Blöcke, die bereits übersetzt oder unverändert sind.
- **Teilt Ihr JSON in Chunks auf**, falls es zu groß ist, um im optimalen Bereich des Kontextfensters zu bleiben.
- **Flacht Ihr JSON ab und rekonstruiert es**, um den Token-Verbrauch zu optimieren.
- **Fügt benutzerdefinierte Prompts ein** für spezifische Regeln bezüglich Marke und Wording (`applicationContext`, `--custom-instructions`), sodass Sie diese einmal schreiben, anstatt sie in jeder Konversation zu wiederholen.
- **Validiert die Struktur**, um Konsistenz zu gewährleisten und Schlüssel-Drift zu verhindern, und bewahrt Formatierungen (Markdown, HTML, Einfügungen, Pluralformen).
- **Implementiert Wiederholungsversuche (Retry-Management)**, wenn die Ausgabe fehlerhaft ist.
- **Reiht Anfragen ein und parallelisiert sie** über Dateien, Abschnitte und Locales hinweg, um die Geschwindigkeit zu maximieren.

Nichts davon belastet den Kontext des Agenten. Die Faustregel: Lassen Sie den Agenten entscheiden, **was** internationalisiert werden soll, und überlassen Sie Intlayer die wiederkehrende Arbeit.

## Lösung

### 1. Extraktion an `intlayer extract` delegieren

Anstatt den Agenten jede Komponente manuell umschreiben zu lassen, lassen Sie ihn den Befehl [`extract`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md) ausführen. Dieser verschiebt hartcodierte Zeichenketten in eine `.content`-Datei neben der Komponente, ohne die gesamte Datei in den Kontext des Agenten zu laden.

```bash
npx intlayer extract --file src/components/Header.tsx
```

### 2. Übersetzung an `intlayer fill` delegieren

Bitten Sie den Agenten niemals direkt zu übersetzen. Der Befehl [`fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/fill.md) wendet die oben beschriebene Pipeline an: Er sendet nur die fehlenden Schlüssel, teilt sie auf, verarbeitet die Locales parallel und schreibt das Ergebnis direkt in Ihre Inhaltsdateien zurück.

```bash
npx intlayer fill
```

Einige Flags halten den Durchlauf schlank:

- `--git-diff` (oder `--uncommitted`) verarbeitet nur die im aktuellen Branch geänderten Wörterbücher.
- `--file` oder `--keys` zielt auf bestimmte Inhaltsdateien ab.
- `--output-locales fr es` beschränkt den Durchlauf auf die Locales, die Sie aktuell wirklich benötigen.
- `--skip-metadata` überspringt die Generierung von Titel, Beschreibung und Tags.
- `--data-serialization toon` sendet eine kompaktere Nutzlast an das Modell (weniger Tokens, leicht weniger vorhersehbare Ausgabe).

```bash
npx intlayer fill --git-diff --output-locales fr es --skip-metadata
```

### 3. Markdown mit `doc translate` und `doc review` übersetzen

Einen Agenten mit der Übersetzung einer `.md`-Datei zu beauftragen bedeutet, das gesamte Dokument für jedes Locale bei jeder Änderung einzufügen. Die Befehle [`doc translate`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/doc-translate.md) und [`doc review`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/doc-review.md) arbeiten stattdessen blockweise.

Verwenden Sie `doc translate`, wenn die übersetzte Datei noch nicht existiert. Der Befehl teilt das Markdown auf, übersetzt es parallel und erstellt die Zieldateien:

```bash
npx intlayer doc translate --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

Verwenden Sie `doc review`, wenn die übersetzte Datei bereits existiert. Der Befehl vergleicht jeden Block mit dem Basisdokument, überspringt Blöcke, die bereits übersetzt oder unverändert sind, und sendet nur die abweichenden Blöcke:

```bash
npx intlayer doc review --doc-pattern "docs/**/*.md" --base-locale en --locales fr es
```

Beide Befehle übernehmen Ihre Regeln einmalig, anstatt sie in jedem Prompt wiederholen zu müssen:

```bash
npx intlayer doc translate --custom-instructions "Do not translate URLs. Keep the markdown structure and the code blocks untouched."
```

Zwei Modi von `doc review` sind nützlich, wenn der Agent ohne KI-Aufrufe seitens Intlayer eingebunden bleiben soll:

- `--mode report` gibt die Blöcke aus, die Aufmerksamkeit erfordern, samt Zeilennummern, sodass der Agent nur diese Blöcke bearbeitet.
- `--mode synthesis` gibt lediglich an, welche Dokumente aktuell sind und welche noch bearbeitbare Blöcke enthalten.

```bash
npx intlayer doc review --mode report --locales fr
```

### 4. Den Agenten die CLI über den MCP-Server aufrufen lassen

Mit dem [Intlayer MCP-Server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md) antwortet der Agent auf Basis der aktuellen Dokumentation und führt `intlayer fill` oder `intlayer doc review` selbst aus, anstatt die Logik in der Konversation neu zu implementieren.

```bash
claude mcp add intlayer npx -y @intlayer/mcp
```

Die Installation der [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/agent_skills.md) mit `npx intlayer init skills` verhindert zudem, dass der Agent die Intlayer-API erraten und die Dokumentation bei jeder Aufgabe neu lesen muss.

### 5. Das Claude-Abonnement mit `claude setup-token` wiederverwenden

Das Einrichten von i18n in Ihrer interaktiven Claude Code-Sitzung behält den gesamten Konversationsverlauf im Kontext. Verlagern Sie diese arbeitsintensive Aufgabe stattdessen in eine kurze Headless-Sitzung.

Generieren Sie ein langlebiges Token aus Ihrem Claude-Abonnement:

```bash
claude setup-token
```

Speichern Sie es als `CLAUDE_CODE_OAUTH_TOKEN` (in einer `.env`-Datei oder in Ihren CI-Secrets) und nutzen Sie es für eine einmalige Sitzung, die die Intlayer-Befehle ausführt:

```bash
CLAUDE_CODE_OAUTH_TOKEN=... claude -p "Run npx intlayer extract on src/components, then npx intlayer fill --uncommitted"
```

Die Sitzung enthält lediglich diesen Prompt und die Ausgabe des Befehls, nicht Ihre gesamte Konversation. Dasselbe Token funktioniert auch in der [Claude Code GitHub Action](https://github.com/anthropics/claude-code-action), um `intlayer fill` bei jedem Pull Request auszuführen.

> Das von `claude setup-token` ausgegebene Token authentifiziert ausschließlich Claude Code. Es kann nicht als Anthropic-API-Schlüssel in `ai.apiKey` verwendet werden. Für die eigentliche Übersetzung nutzt `intlayer fill` Ihr [Intlayer-Konto](https://app.intlayer.org) (kostenloser Tarif enthalten) oder Ihren eigenen in [`ai`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md#ai-configuration) konfigurierten Provider-Schlüssel.

## Zusammenfassung

| Aufgabe                           | Wer führt sie aus        | Tokens im Kontext des Agenten |
| --------------------------------- | ------------------------ | ----------------------------- |
| Entscheiden, was lokalisiert wird | Claude Code              | Gering                        |
| Zeichenketten extrahieren         | `intlayer extract`       | Keine                         |
| Inhalte übersetzen                | `intlayer fill`          | Keine                         |
| Dokumentation übersetzen          | `intlayer doc translate` | Keine                         |
| Dokumentation aktualisieren       | `intlayer doc review`    | Keine                         |
| Befehle ausführen                 | Headless Claude Code     | Prompt + Befehlsausgabe       |
