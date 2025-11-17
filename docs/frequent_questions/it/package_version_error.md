---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Ricevo un errore relativo ai sotto-pacchetti @intlayer/*
description: Risolvi l'errore relativo ai sotto-pacchetti @intlayer/*.
keywords:
  - @intlayer/*
  - sotto-pacchetti
  - intlayer
slugs:
  - frequent-questions
  - package-version-error
---

# Ricevo un errore relativo ai sotto-pacchetti `@intlayer/*`

Questo problema si verifica solitamente dopo un aggiornamento dei pacchetti Intlayer.

Esempio di messaggio di errore:

```bash
Error: Cannot find module '@intlayer/types'
```

```bash
TypeError: (0 , __intlayer_config_client.colorize) is not a function

at import { colorize } from '@intlayer/config';
```

```bash
✖ ERROR  No matching export in "node_modules/@intlayer/config/dist/esm/client.mjs" for import "clearModuleCache"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:9:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |          ~~~~~~~~~~~~~~~~

✖ ERRORE  Nessuna esportazione corrispondente in "node_modules/@intlayer/config/dist/esm/client.mjs" per l'importazione "configESMxCJSRequire"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:27:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |                            ~~~~~~~~~~~~~~~~~~~~
```

## Motivo

I pacchetti base come `intlayer`, `react-intlayer`, `react-native-intlayer`, `vue-intlayer` riutilizzano gli stessi sotto-pacchetti come `@intlayer/config`, `@intlayer/core`, `@intlayer/types` per evitare la duplicazione del codice.

Tra due versioni, le esportazioni dei sotto-pacchetti non sono garantite essere le stesse. Per limitare questo problema, intlayer fissa la versione dei sotto-pacchetti alla versione del pacchetto principale.

> Es: `intlayer@1.0.0` utilizza `@intlayer/config@1.0.0`, `@intlayer/core@1.0.0`, `@intlayer/types@1.0.0`

> (Ad eccezione di `@intlayer/swc`), i sotto-pacchetti `@intlayer/*` non sono pensati per essere usati direttamente. Quindi consigliamo di non installarli direttamente.

## Risoluzione

1. Assicurarsi che le versioni del pacchetto principale e dei sotto-pacchetti siano le stesse.

```json5
{
  "dependencies": {
    "intlayer": "7.0.1",
    "react-intlayer": "7.0.0", // Versione errata, dovrebbe essere 7.0.1
  },
  "devDependencies": {
    "intlayer-editor": "7.0.1",
  },
}
```

2. Provare a rimuovere il lockfile e la cartella node_modules e reinstallare le dipendenze.

A volte, il package manager mantiene una vecchia versione dei sotto-pacchetti nel lockfile in cache. Per risolvere questo problema, puoi provare a rimuovere il lockfile e la cartella node_modules e reinstallare le dipendenze.

```bash
rm -rf package-lock.json node_modules
npm install
```

3. Controllare l'installazione globale

Consigliamo di installare `intlayer` o `intlayer-cli` globalmente per accedere ai comandi CLI. Se la versione globale non è la stessa della versione locale, il package manager potrebbe considerare la versione sbagliata.

**Controllare se un pacchetto è installato globalmente**

```bash
npm list -g --depth=3 | grep intlayer
```

```bash
yarn global list --depth=3 | grep intlayer
```

```bash
pnpm list -g --depth=3 | grep intlayer
```

```bash
bun pm ls -g --depth=3 | grep intlayer
```

**Risolvi potenziali conflitti di dipendenze globali**

```bash
npm uninstall -g intlayer intlayer-cli
```

```bash
yarn global remove intlayer intlayer-cli
```

```bash
pnpm remove -g intlayer intlayer-cli
```

5. Prova a pulire la cache

Per alcuni ambienti come docker, github actions o piattaforme di hosting web come Vercel, può essere presente una cache. Puoi provare a pulire la cache e ripetere l’installazione.

Puoi anche provare a pulire la cache del tuo package manager con il seguente comando:

```bash
npm cache clean --force
```

```bash
yarn cache clean
```

```bash
pnpm cache clean
```
