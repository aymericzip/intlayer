---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Intlayer-Befehl nicht definiert
description: Erfahren Sie, wie Sie den Fehler "intlayer command undefined" beheben können.
keywords:
  - intlayer
  - befehl
  - undefiniert
  - fehler
  - vscode
  - erweiterung
  - plugin
  - framework
  - next.js
  - vite
slugs:
  - doc
  - faq
  - intlayer-command-undefined
---

# Intlayer-Befehl nicht definiert

## Übersicht

Die Intlayer-CLI bietet eine bequeme Möglichkeit, Ihre Intlayer-Inhalte zu verwalten, einschließlich dem Erstellen von Wörterbüchern, dem Übertragen von Übersetzungen und mehr. Sie ist jedoch nicht zwingend erforderlich, damit Ihr Projekt funktioniert. Wenn Sie das Bundler-Plugin verwenden (wie `withIntlayer()` für Next.js oder `intlayerPlugin()` für Vite), erstellt Intlayer automatisch Wörterbücher während des App-Builds oder beim Start des Entwicklungsservers. Im Entwicklungsmodus überwacht es außerdem Änderungen und erstellt die Inhaltsdeklarationsdateien automatisch neu.

Sie können auf die Intlayer-Befehle auf verschiedene Weise zugreifen:

- Direkt über den `intlayer` CLI-Befehl
- Über die [VSCode-Erweiterung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/vs_code_extension.md)
- Über das `@intlayer/cli` SDK

## Problem

Beim Versuch, den Befehl `intlayer` zu verwenden, kann folgende Fehlermeldung auftreten:

```bash
'intlayer' wird nicht als interner oder externer Befehl,
programmierbares Programm oder Batchdatei erkannt.
```

## Lösungen

Versuchen Sie diese Lösungen in der angegebenen Reihenfolge:

1. **Überprüfen Sie, ob der Befehl installiert ist**

```bash
npx intlayer -h
```

Erwartete Ausgabe:

```bash
Usage: intlayer [options] [command]

Intlayer CLI

Options:
    -V, --version            gibt die Versionsnummer aus
    -h, --help               zeigt die Hilfe für den Befehl an

Commands:
    dictionary|dictionaries  Operationen für Wörterbücher
    configuration|config     Konfigurationsoperationen
    help [command]           zeigt die Hilfe für den Befehl an
```

2. **Installieren Sie das Paket intlayer-cli global**

```bash
npm install intlayer-cli -g -g
```

> Es sollte nicht notwendig sein, wenn Sie das `intlayer`-Paket bereits installiert haben

3. **Installieren Sie das Paket global**

```bash
npm install intlayer -g
```

4. **Starten Sie Ihr Terminal neu**  
   Manchmal ist ein Neustart des Terminals erforderlich, damit neue Befehle erkannt werden.

5. **Bereinigen und neu installieren**  
   Wenn die oben genannten Lösungen nicht funktionieren:

```bash
rm -rf node_modules package-lock.json
npm install
```

6. **Überprüfen Sie die Installationsdateien**  
   Wenn das Problem weiterhin besteht, prüfen Sie, ob diese Dateien vorhanden sind:

   - `node_modules/intlayer/dist/cjs/cli.cjs`
   - `node_modules/intlayer/package.json` (sollte ein `bin`-Feld mit Verweis auf `./dist/cjs/cli.cjs` enthalten)

7. **Überprüfen Sie die PATH-Umgebungsvariable**  
   Stellen Sie sicher, dass das globale npm-Bin-Verzeichnis in Ihrem PATH enthalten ist:

```bash
# Für Unix-basierte Systeme (macOS/Linux)
echo $PATH
# Sollte etwas wie /usr/local/bin oder ~/.npm-global/bin enthalten

# Für Windows
echo %PATH%
# Sollte das npm globale Bin-Verzeichnis enthalten
```

8. **Verwenden Sie npx mit vollem Pfad**  
   Wenn der Befehl immer noch nicht gefunden wird, versuchen Sie npx mit dem vollständigen Pfad zu verwenden:

```bash
npx ./node_modules/intlayer/ dictionaries build
```

9. **Überprüfen Sie auf Konflikte bei Installationen**

```bash
# Liste aller global installierten Pakete
npm list -g --depth=0

# Entfernen Sie alle konfliktierenden globalen Installationen
npm uninstall -g intlayer
npm uninstall -g intlayer-cli
# Dann neu installieren
npm install -g intlayer
```

10. **Überprüfen Sie die Node.js- und npm-Versionen**  
    Stellen Sie sicher, dass Sie kompatible Versionen verwenden:

```bash
node --version
npm --version
```

    Wenn Sie eine veraltete Version verwenden, sollten Sie ein Update von Node.js und npm in Betracht ziehen.

11. **Überprüfen Sie Berechtigungsprobleme**  
    Wenn Sie Berechtigungsfehler erhalten:

    ```bash
    # Für Unix-basierte Systeme
    sudo npm install -g intlayer

    # Oder ändern Sie das Standardverzeichnis von npm
    mkdir ~/.npm-global
    npm config set prefix '~/.npm-global'
    # Fügen Sie dies zu Ihrer ~/.profile oder ~/.bashrc hinzu:
    export PATH=~/.npm-global/bin:$PATH
    ```
