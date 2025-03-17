# Offizielle VS Code Erweiterung für Intlayer

## Übersicht

**Intlayer** ist die offizielle Visual Studio Code Erweiterung für **Intlayer**, entwickelt, um die Entwicklererfahrung bei der Arbeit mit lokalisierten Inhalten in **React, Next.js und JavaScript** Projekten zu verbessern.

Mit dieser Erweiterung können Entwickler **schnell zu ihren Inhaltswörterbüchern navigieren**, Lokalisierungsdateien verwalten und ihren Workflow mit leistungsstarken Automatisierungsbefehlen optimieren.

## Funktionen

### Sofortige Navigation

**Gehe-zu-Definition-Unterstützung** – Verwenden Sie `Cmd+Klick` (Mac) oder `Ctrl+Klick` (Windows/Linux) auf einen `useIntlayer` Schlüssel, um die entsprechende Inhaltsdatei sofort zu öffnen.  
**Nahtlose Integration** – Funktioniert mühelos mit **react-intlayer** und **next-intlayer** Projekten.  
**Mehrsprachige Unterstützung** – Unterstützt lokalisierte Inhalte in verschiedenen Sprachen.  
**VS Code Integration** – Integriert sich reibungslos in die Navigation und Befehlsübersicht von VS Code.

### Wörterbuchverwaltungsbefehle

Verwalten Sie Ihre Inhaltswörterbücher direkt in VS Code:

- **Wörterbücher erstellen** (`extension.buildDictionaries`) – Generieren Sie Inhaltsdateien basierend auf Ihrer Projektstruktur.
- **Wörterbücher hochladen** (`extension.pushDictionaries`) – Laden Sie die neuesten Wörterbuchinhalte in Ihr Repository hoch.
- **Wörterbücher herunterladen** (`extension.pullDictionaries`) – Synchronisieren Sie die neuesten Wörterbuchinhalte aus Ihrem Repository mit Ihrer lokalen Umgebung.

### Inhaltsdeklarationsgenerator

Erstellen Sie mühelos strukturierte Wörterbuchdateien in verschiedenen Formaten:

- **TypeScript (`.ts`)** – `extension.createDictionaryFile.ts`
- **ES Module (`.esm`)** – `extension.createDictionaryFile.esm`
- **CommonJS (`.cjs`)** – `extension.createDictionaryFile.cjs`
- **JSON (`.json`)** – `extension.createDictionaryFile.json`

## Installation

Sie können **Intlayer** direkt aus dem VS Code Marketplace installieren:

1. Öffnen Sie **VS Code**.
2. Gehen Sie zum **Erweiterungs-Marktplatz**.
3. Suchen Sie nach **"Intlayer"**.
4. Klicken Sie auf **Installieren**.

Alternativ können Sie es über die Befehlszeile installieren:

```sh
code --install-extension intlayer
```

## Verwendung

### Schnelle Navigation

1. Öffnen Sie ein Projekt, das **react-intlayer** verwendet.
2. Suchen Sie einen Aufruf von `useIntlayer()`, wie zum Beispiel:

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Cmd-Klick** (`⌘+Klick` auf macOS) oder **Ctrl-Klick** (auf Windows/Linux) auf den Schlüssel (z. B. `"app"`).
4. VS Code öffnet automatisch die entsprechende Wörterbuchdatei, z. B. `src/app.content.ts`.

### Verwaltung von Inhaltswörterbüchern

#### Wörterbücher erstellen

Generieren Sie alle Wörterbuchinhaltsdateien mit:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

Suchen Sie nach **Wörterbücher erstellen** und führen Sie den Befehl aus.

#### Wörterbücher hochladen

Laden Sie die neuesten Wörterbuchinhalte hoch:

1. Öffnen Sie die **Befehlsübersicht**.
2. Suchen Sie nach **Wörterbücher hochladen**.
3. Wählen Sie die Wörterbücher aus, die hochgeladen werden sollen, und bestätigen Sie.

#### Wörterbücher herunterladen

Synchronisieren Sie die neuesten Wörterbuchinhalte:

1. Öffnen Sie die **Befehlsübersicht**.
2. Suchen Sie nach **Wörterbücher herunterladen**.
3. Wählen Sie die Wörterbücher aus, die heruntergeladen werden sollen.

### Anpassung der Wörterbuchdateipfade

Standardmäßig folgt die Erweiterung der Standardprojektstruktur von **Intlayer**. Sie können jedoch benutzerdefinierte Pfade konfigurieren:

1. Öffnen Sie **Einstellungen (`Cmd + ,` auf macOS / `Ctrl + ,` auf Windows/Linux)`**.
2. Suchen Sie nach `Intlayer`.
3. Passen Sie die Einstellung für den Inhaltsdateipfad an.

## Entwicklung & Beitrag

Möchten Sie beitragen? Wir freuen uns über Beiträge aus der Community!

Repo-URL: https://github.com/aymericzip/intlayer-vs-code-extension

### Erste Schritte

Klonen Sie das Repository und installieren Sie die Abhängigkeiten:

```sh
git clone https://github.com/aymericzip/intlayer-vs-code-extension.git
cd intlayer-vs-code-extension
npm install
```

> Verwenden Sie den `npm` Paketmanager für die Kompatibilität mit dem `vsce` Paket, um die Erweiterung zu erstellen und zu veröffentlichen.

### Im Entwicklungsmodus ausführen

1. Öffnen Sie das Projekt in **VS Code**.
2. Drücken Sie `F5`, um ein neues **Erweiterungs-Entwicklungsfenster** zu starten.

### Einen Pull Request einreichen

Wenn Sie die Erweiterung verbessern, reichen Sie einen PR auf [GitHub](https://github.com/aymericzip/intlayer-vs-code-extension) ein.

## Feedback & Probleme

Haben Sie einen Fehler gefunden oder eine Funktionsanfrage? Öffnen Sie ein Issue in unserem **GitHub Repository**:

[GitHub Issues](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## Lizenz

Intlayer wird unter der **MIT-Lizenz** veröffentlicht.
