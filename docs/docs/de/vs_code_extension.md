---
createdAt: 2025-03-17
updatedAt: 2025-09-30
title: Offizielle VS Code Erweiterung
description: Erfahren Sie, wie Sie die Intlayer-Erweiterung in VS Code verwenden, um Ihren Entwicklungsworkflow zu verbessern. Navigieren Sie schnell zwischen lokalisierten Inhalten und verwalten Sie Ihre Wörterbücher effizient.
keywords:
  - VS Code Erweiterung
  - Intlayer
  - Lokalisierung
  - Entwicklungstools
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - doc
  - vs-code-extension
history:
  - version: 6.1.5
    date: 2025-09-30
    changes: Demo-GIF hinzugefügt
  - version: 6.1.0
    date: 2025-09-24
    changes: Abschnitt zur Umgebungs-Auswahl hinzugefügt
  - version: 6.0.0
    date: 2025-09-22
    changes: Intlayer-Tab / Befehle zum Ausfüllen & Testen
  - version: 5.5.10
    date: 2025-06-29
    changes: Historie initialisiert
---

# Offizielle VS Code Erweiterung

## Übersicht

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) ist die offizielle Visual Studio Code Erweiterung für **Intlayer**, die entwickelt wurde, um die Entwicklererfahrung beim Arbeiten mit lokalisierten Inhalten in Ihren Projekten zu verbessern.

![Intlayer VS Code Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif?raw=true)

Erweiterungslink: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Funktionen

![Wörterbücher füllen](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_fill_active_dictionary.gif?raw=true)

- **Sofortige Navigation** – Schneller Sprung zur richtigen Inhaltsdatei beim Klicken auf einen `useIntlayer`-Schlüssel.
- **Wörterbücher füllen** – Füllen Sie Wörterbücher mit Inhalten aus Ihrem Projekt.

![Befehle auflisten](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_list_commands.gif?raw=true)

- **Einfacher Zugriff auf Intlayer-Befehle** – Erstellen, pushen, pullen, füllen und testen Sie Inhaltswörterbücher mühelos.

![Inhaltsdatei erstellen](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_create_content_file.gif?raw=true)

- **Generator für Inhaltsdeklarationen** – Erstellen Sie Wörterbuch-Inhaltsdateien in verschiedenen Formaten (`.ts`, `.esm`, `.cjs`, `.json`).

![Wörterbücher testen](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_test_missing_dictionary.gif?raw=true)

- **Wörterbücher testen** – Testen Sie Wörterbücher auf fehlende Übersetzungen.

![Wörterbuch neu aufbauen](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_rebuild_dictionary.gif?raw=true)

- **Halten Sie Ihre Wörterbücher aktuell** – Halten Sie Ihre Wörterbücher mit den neuesten Inhalten aus Ihrem Projekt auf dem neuesten Stand.

![Intlayer-Tab (Aktivitätsleiste)](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_search_dictionary.gif?raw=true)

- **Intlayer-Tab (Aktivitätsleiste)** – Durchsuchen und durchsuchen Sie Wörterbücher über einen dedizierten Seiten-Tab mit Symbolleiste und Kontextaktionen (Build, Pull, Push, Fill, Refresh, Test, Create File).

## Verwendung

### Schnelle Navigation

1. Öffnen Sie ein Projekt, das **react-intlayer** verwendet.
2. Suchen Sie einen Aufruf von `useIntlayer()`, zum Beispiel:

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Befehl-Klick** (`⌘+Klick` auf macOS) oder **Strg-Klick** (auf Windows/Linux) auf den Schlüssel (z. B. `"app"`).
4. VS Code öffnet automatisch die entsprechende Wörterbuchdatei, z. B. `src/app.content.ts`.

### Intlayer-Tab (Aktivitätsleiste)

Verwenden Sie den Seiten-Tab, um Wörterbücher zu durchsuchen und zu verwalten:

- Öffnen Sie das Intlayer-Symbol in der Aktivitätsleiste.
- Geben Sie in **Suche** ein, um Wörterbücher und Einträge in Echtzeit zu filtern.
- Durchsuchen Sie in **Wörterbücher** Umgebungen, Wörterbücher und Dateien. Verwenden Sie die Symbolleiste für Erstellen, Abrufen, Senden, Füllen, Aktualisieren, Testen und Wörterbuchdatei erstellen. Rechtsklick für Kontextaktionen (Abrufen/Senden bei Wörterbüchern, Füllen bei Dateien). Die aktuelle Editor-Datei wird bei Bedarf automatisch im Baum angezeigt.

### Zugriff auf die Befehle

Sie können auf die Befehle über die **Befehlspalette** zugreifen.

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

- **Wörterbücher erstellen**
- **Wörterbücher hochladen**
- **Wörterbücher herunterladen**
- **Wörterbücher füllen**
- **Wörterbücher testen**
- **Wörterbuchdatei erstellen**

### Laden von Umgebungsvariablen

Intlayer empfiehlt, Ihre AI-API-Schlüssel sowie die Intlayer-Client-ID und das Secret in Umgebungsvariablen zu speichern.

Die Erweiterung kann Umgebungsvariablen aus Ihrem Arbeitsbereich laden, um Intlayer-Befehle im richtigen Kontext auszuführen.

- **Ladereihenfolge (nach Priorität)**: `.env.<env>.local` → `.env.<env>` → `.env.local` → `.env`
- **Nicht destruktiv**: vorhandene `process.env`-Werte werden nicht überschrieben.
- **Geltungsbereich**: Dateien werden vom konfigurierten Basisverzeichnis aus aufgelöst (standardmäßig das Stammverzeichnis des Arbeitsbereichs).

#### Auswahl der aktiven Umgebung

- **Befehls-Palette**: Öffnen Sie die Palette und führen Sie `Intlayer: Select Environment` aus, wählen Sie dann die Umgebung aus (z. B. `development`, `staging`, `production`). Die Erweiterung versucht, die erste verfügbare Datei in der oben genannten Prioritätsliste zu laden und zeigt eine Benachrichtigung wie „Env geladen von .env.<env>.local“ an.
- **Einstellungen**: Gehen Sie zu `Einstellungen → Erweiterungen → Intlayer` und setzen Sie:
  - **Umgebung**: der Umgebungsname, der zur Auflösung von `.env.<env>*` Dateien verwendet wird.
  - (Optional) **Env-Datei**: ein expliziter Pfad zu einer `.env`-Datei. Wenn angegeben, hat dieser Vorrang vor der ermittelten Liste.

#### Monorepos und benutzerdefinierte Verzeichnisse

Wenn sich Ihre `.env`-Dateien außerhalb des Arbeitsbereichs-Stammverzeichnisses befinden, legen Sie das **Basisverzeichnis** unter `Einstellungen → Erweiterungen → Intlayer` fest. Der Loader sucht dann nach `.env`-Dateien relativ zu diesem Verzeichnis.
