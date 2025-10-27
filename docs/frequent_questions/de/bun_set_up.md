---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Ich erhalte einen "Modul nicht gefunden"-Fehler bei der Verwendung von bun
description: Fehlerbehebung bei der Verwendung von bun.
keywords:
  - bun
  - modul nicht gefunden
  - intlayer
  - konfiguration
  - paketmanager
slugs:
  - doc
  - faq
  - bun-set-up
---

# Ich erhalte einen "Modul nicht gefunden"-Fehler bei der Verwendung von bun

## Problembeschreibung

Bei der Verwendung von bun kann folgender Fehler auftreten:

```bash
Cannot find package 'intlayer' from '/workspace/packages/@intlayer/config/dist/cjs/utils/ESMxCJSHelpers.cjs' undefined
```

## Grund

Intlayer verwendet intern `require`. Und bun beschränkt die `require`-Funktion darauf, nur die Pakete des `@intlayer/config`-Pakets aufzulösen, anstatt das gesamte Projekt.

## Lösung

### Geben Sie die `require`-Funktion in der Konfiguration an

```ts
const config: IntlayerConfig = {
  build: {
    require, // Die require-Funktion bereitstellen
  },
};

export default config;
```

```ts fileName="next.config.ts" codeFormat="typescript"
import { withIntlayer } from "next-intlayer/server";

const configuration = withIntlayer({
  require, // Die require-Funktion bereitstellen
});

export default configuration;
```
