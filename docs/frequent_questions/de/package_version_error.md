---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Ich erhalte einen Fehler im Zusammenhang mit Sub-Paketen `@intlayer/*`
description: Fehlerbehebung im Zusammenhang mit Sub-Paketen `@intlayer/*`.
keywords:
  - @intlayer/*
  - Sub-Pakete
  - intlayer
slugs:
  - frequent-questions
  - package-version-error
---

# Ich erhalte einen Fehler im Zusammenhang mit Sub-Paketen `@intlayer/*`

Dieses Problem tritt normalerweise nach einem Update der Intlayer-Pakete auf.

Beispiel für eine Fehlermeldung:

```bash
Error: Cannot find module '@intlayer/types'
```

```bash
TypeError: (0 , __intlayer_config_client.colorize) is not a function

at import { colorize } from '@intlayer/config';
```

```bash
✖ ERROR  Kein passender Export in "node_modules/@intlayer/config/dist/esm/client.mjs" für den Import "clearModuleCache"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:9:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |          ~~~~~~~~~~~~~~~~

✖ FEHLER Kein passender Export in "node_modules/@intlayer/config/dist/esm/client.mjs" für den Import "configESMxCJSRequire"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:27:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |                            ~~~~~~~~~~~~~~~~~~~~
```

## Grund

Basispakete wie `intlayer`, `react-intlayer`, `react-native-intlayer`, `vue-intlayer` verwenden dieselben Sub-Pakete wie `@intlayer/config`, `@intlayer/core`, `@intlayer/types` erneut, um Code-Duplikationen zu vermeiden.

Zwischen zwei Versionen ist nicht garantiert, dass die Exporte der Sub-Pakete gleich sind. Um dieses Problem zu begrenzen, fixiert intlayer die Version der Sub-Pakete auf die Version des Hauptpakets.

> Beispiel: `intlayer@1.0.0` verwendet `@intlayer/config@1.0.0`, `@intlayer/core@1.0.0`, `@intlayer/types@1.0.0`

> (Außer `@intlayer/swc`) sind `@intlayer/*` Sub-Pakete nicht für die direkte Verwendung gedacht. Daher empfehlen wir, diese nicht direkt zu installieren.

## Lösung

1. Stellen Sie sicher, dass die Versionen des Hauptpakets und der Sub-Pakete identisch sind.

```json5
{
  "dependencies": {
    "intlayer": "7.0.1",
    "react-intlayer": "7.0.0", // Falsche Version, es sollte 7.0.1 sein
  },
  "devDependencies": {
    "intlayer-editor": "7.0.1",
  },
}
```

2. Versuchen Sie, die Lockdatei und den node_modules-Ordner zu entfernen und die Abhängigkeiten neu zu installieren.

Manchmal behält der Paketmanager eine alte Version der Sub-Pakete im Cache der Lockdatei. Um dies zu beheben, können Sie versuchen, die Lockdatei und den node_modules-Ordner zu entfernen und die Abhängigkeiten neu zu installieren.

```bash
rm -rf package-lock.json node_modules
npm install
```

3. Überprüfen Sie die globale Installation

Wir empfehlen, `intlayer` oder `intlayer-cli` global zu installieren, um auf die CLI-Befehle zugreifen zu können. Wenn die globale Version nicht mit der lokalen Version übereinstimmt, kann der Paketmanager die falsche Version verwenden.

**Überprüfen, ob ein Paket global installiert ist**

```bash
npm list -g --depth=0
```

```bash
npm list -g --depth=0 | grep intlayer
```

```bash
yarn global list
```

```bash
pnpm list -g --depth=0
```

**Beheben Sie mögliche globale Abhängigkeitskonflikte**

```bash
npm uninstall -g intlayer intlayer-cli
```

```bash
yarn global remove intlayer intlayer-cli
```

```bash
pnpm remove -g intlayer intlayer-cli
```

5. Versuchen Sie, den Cache zu bereinigen

In einigen Umgebungen wie Docker, GitHub Actions oder Webhosting-Plattformen wie Vercel kann ein Cache vorhanden sein. Sie können versuchen, den Cache zu bereinigen und die Installation erneut durchzuführen.

Sie können auch versuchen, den Cache Ihres Paketmanagers mit folgendem Befehl zu bereinigen:

```bash
npm cache clean --force
```

```bash
yarn cache clean
```

```bash
pnpm cache clean
```
