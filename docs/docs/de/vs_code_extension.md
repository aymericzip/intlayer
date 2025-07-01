---
createdAt: 2025-03-17
updatedAt: 2025-06-29
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
---

# Offizielle VS Code Erweiterung

## Überblick

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) ist die offizielle Visual Studio Code Erweiterung für **Intlayer**, entwickelt, um die Entwicklererfahrung bei der Arbeit mit lokalisierten Inhalten in Ihren Projekten zu verbessern.

![Intlayer VS Code Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

Erweiterungslink: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Funktionen

### Sofortige Navigation

**Gehe zu Definition Unterstützung** – Verwenden Sie `Cmd+Click` (Mac) oder `Ctrl+Click` (Windows/Linux) auf einem `useIntlayer` Schlüssel, um die entsprechende Inhaltsdatei sofort zu öffnen.  
**Nahtlose Integration** – Funktioniert mühelos mit **react-intlayer** und **next-intlayer** Projekten.  
**Mehrsprachige Unterstützung** – Unterstützt lokalisierte Inhalte in verschiedenen Sprachen.  
**VS Code Integration** – Integriert sich nahtlos in die Navigation und das Befehlsmenü von VS Code.

### Befehle zur Verwaltung von Wörterbüchern

Verwalten Sie Ihre Inhaltswörterbücher direkt aus VS Code:

- **Wörterbücher erstellen** (`extension.buildDictionaries`) – Generiert Inhaltsdateien basierend auf Ihrer Projektstruktur.
- **Wörterbücher hochladen** (`extension.pushDictionaries`) – Lädt die neuesten Wörterbuchinhalte in Ihr Repository hoch.
- **Wörterbücher herunterladen** (`extension.pullDictionaries`) – Synchronisiert die neuesten Wörterbuchinhalte aus Ihrem Repository mit Ihrer lokalen Umgebung.

### Generator für Inhaltsdeklarationen

Erstellen Sie mühelos strukturierte Wörterbuchdateien in verschiedenen Formaten:

- **TypeScript (`.ts`)** – `extension.createDictionaryFile.ts`
- **ES Modul (`.esm`)** – `extension.createDictionaryFile.esm`
- **CommonJS (`.cjs`)** – `extension.createDictionaryFile.cjs`
- **JSON (`.json`)** – `extension.createDictionaryFile.json`

## Installation

Sie können **Intlayer** direkt aus dem VS Code Marketplace installieren:

1. Öffnen Sie **VS Code**.
2. Gehen Sie zum **Extensions Marketplace**.
3. Suchen Sie nach **"Intlayer"**.
4. Klicken Sie auf **Installieren**.

Alternativ können Sie es über die Kommandozeile installieren:

```sh
code --install-extension intlayer
```

## Verwendung

### Schnelle Navigation

1. Öffnen Sie ein Projekt, das **react-intlayer** verwendet.
2. Finden Sie einen Aufruf von `useIntlayer()`, zum Beispiel:

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Befehl-Klick** (`⌘+Klick` auf macOS) oder **Strg-Klick** (auf Windows/Linux) auf den Schlüssel (z. B. `"app"`).
4. VS Code öffnet automatisch die entsprechende Wörterbuchdatei, z. B. `src/app.content.ts`.

### Verwaltung von Inhaltswörterbüchern

#### Wörterbücher erstellen

Generieren Sie alle Wörterbuchinhaltsdateien mit:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

Suchen Sie nach **Wörterbücher erstellen** und führen Sie den Befehl aus.

#### Wörterbücher hochladen

Laden Sie den neuesten Wörterbuchinhalt hoch:

1. Öffnen Sie die **Befehls-Palette**.
2. Suchen Sie nach **Wörterbücher hochladen**.
3. Wählen Sie die hochzuladenden Wörterbücher aus und bestätigen Sie.

#### Wörterbücher herunterladen

Synchronisieren Sie den neuesten Wörterbuchinhalt:

1. Öffnen Sie die **Befehls-Palette**.
2. Suchen Sie nach **Wörterbücher herunterladen**.
3. Wählen Sie die herunterzuladenden Wörterbücher aus.

## Entwicklung & Beitrag

Möchten Sie beitragen? Wir begrüßen Beiträge aus der Community!

Repo-URL: https://github.com/aymericzip/intlayer-vs-code-extension

### Erste Schritte

Klonen Sie das Repository und installieren Sie die Abhängigkeiten:

```sh
git clone https://github.com/aymericzip/intlayer-vs-code-extension.git
cd intlayer-vs-code-extension
npm install
```

> Verwenden Sie den `npm`-Paketmanager für die Kompatibilität mit dem `vsce`-Paket zum Erstellen und Veröffentlichen der Erweiterung.

### Im Entwicklungsmodus ausführen

1. Öffnen Sie das Projekt in **VS Code**.
2. Drücken Sie `F5`, um ein neues **Extension Development Host**-Fenster zu starten.

### Pull Request einreichen

Wenn Sie die Erweiterung verbessern, reichen Sie bitte einen PR auf [GitHub](https://github.com/aymericzip/intlayer-vs-code-extension) ein.

## Feedback & Probleme

Haben Sie einen Fehler gefunden oder eine Funktionsanfrage? Öffnen Sie ein Issue in unserem **GitHub-Repository**:

[GitHub Issues](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## Lizenz

Intlayer wird unter der **MIT-Lizenz** veröffentlicht.

## Dokumentationsverlauf

- 5.5.10 - 2025-06-29: Historie initialisiert
