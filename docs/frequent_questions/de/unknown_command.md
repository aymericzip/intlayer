---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Unbekannter Befehl
description: Erfahren Sie, wie Sie den Fehler "unbekannter Befehl" beheben können.
keywords:
  - unbekannt
  - befehl
  - fehler
  - intlayer
  - fill
  - build
  - verbose
  - terminal
  - neustart
  - lokal
slugs:
  - doc
  - faq
  - unknown-command
---

# Fehler: unbekannter Befehl fill / build / etc.

Wenn `npx intlayer fill --verbose` ausgibt:

```
error: unknown command 'fill'
```

aber Sie sicher sind, dass der Befehl `fill` _existieren sollte_, folgen Sie diesen Schritten zur Behebung:

## 1. **Stellen Sie sicher, dass Sie die neueste Version verwenden**

Führen Sie aus:

```bash
npx intlayer --version                  # aktuelle lokal installierte intlayer Version
npx intlayer@latest --version           # aktuellste intlayer Version
```

Dies erzwingt, dass `npx` die neueste Version lädt. Versuchen Sie es dann erneut:

```bash
npx intlayer@latest build --verbose
```

## 2. **Überprüfen Sie, ob der Befehl registriert ist**

Sie können dies prüfen mit:

```bash
npx intlayer --help                     # zeigt Informationen zu den Befehlen an
```

Sehen Sie nach, ob der Befehl in der Befehlsliste erscheint.

Gehen Sie ins Repository und bestätigen Sie, dass Ihr Befehl exportiert und im CLI-Einstiegspunkt registriert ist. Intlayer verwendet `commander` als Framework.

Code bezüglich der CLI:
https://github.com/aymericzip/intlayer/blob/main/packages/%40intlayer/cli/src/cli.ts

## 4. **Starten Sie Ihr Terminal neu**

Manchmal ist ein Neustart des Terminals erforderlich, damit neue Befehle erkannt werden.

## 5. **Wenn Sie `intlayer` entwickeln, bauen Sie es neu und verlinken Sie es**

Wenn Sie `intlayer` lokal entwickeln:

```bash
# Im intlayer-Verzeichnis
npm install
npm run build
npm link
```

Dann in einem anderen Terminal:

```bash
intlayer fill --verbose
```

Dies verwendet die lokale Version, an der Sie gerade arbeiten.

## 6. **Leeren Sie den npx-Cache (falls Sie mit einer älteren Version festhängen)**

```bash
npx clear-npx-cache
```

Oder löschen Sie manuell zwischengespeicherte intlayer-Pakete:

```bash
rm -rf ~/.npm/_npx
```

Überprüfen Sie das Äquivalent, wenn Sie pnpm, yarn, bun oder einen anderen Paketmanager verwenden.
