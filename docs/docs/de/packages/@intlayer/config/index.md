---
docName: package__@intlayer_config
url: https://intlayer.org/doc/package/@intlayer_config
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/@intlayer/config/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/config - Konfigurationsverwaltung für Intlayer
description: NPM-Paket zum Abrufen der Intlayer-Konfiguration und zum Definieren von Umgebungsvariablen für Internationalisierungseinstellungen in verschiedenen Umgebungen.
keywords:
  - intlayer
  - konfiguration
  - umgebung
  - einstellungen
  - i18n
  - JavaScript
  - NPM
  - variablen
---

# @intlayer/config: NPM-Paket zum Abrufen der Intlayer-Konfiguration

**Intlayer** ist eine Sammlung von Paketen, die speziell für JavaScript-Entwickler entwickelt wurden. Es ist kompatibel mit Frameworks wie React, React und Express.js.

Das **`@intlayer/config`**-Paket ist ein NPM-Paket, mit dem Sie die Konfiguration von Intlayer abrufen und die Umgebungsvariablen für die aktuelle Umgebung definieren können.

## Installation

Installieren Sie das erforderliche Paket mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install @intlayer/config
```

```bash packageManager="pnpm"
pnpm add @intlayer/config
```

```bash packageManager="yarn"
yarn add @intlayer/config
```

## Verwendung

### Lesen der Intlayer-Konfiguration über das Dateisystem

Beispiel:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config";

const config: IntlayerConfig = getConfiguration();

console.log(config);
// Ausgabe:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> Diese Funktion verwendet das `fs`-Paket und funktioniert nur auf der Serverseite.

### Lesen der Intlayer-Konfiguration über Umgebungsvariablen

Beispiel:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config/client";

const config: IntlayerConfig = getConfiguration({
  env: "production",
});

console.log(config);
// Ausgabe:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> Diese Funktion gibt nichts zurück, wenn die Umgebungsvariablen nicht definiert sind.

### Definieren der Umgebungsvariablen

1. Erstellen Sie eine Konfigurationsdatei.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    /* ... */
  },
  middleware: {
    /* ... */
  },
  content: {
    /* ... */
  },
  editor: {
    /* ... */
  },
};

export default config;
```

> Siehe [Intlayer Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) für weitere Details.

2. Definieren Sie die Umgebungsvariablen.

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// Formatiere alle Konfigurationswerte als Umgebungsvariablen
const env = formatEnvVariable();

// Setze jede formatierte Umgebungsvariable in process.env
Object.assign(process.env, env);
```

3. Importieren Sie die Konfigurationsdatei.

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```

## Dokumentationsverlauf

- 5.5.10 - 2025-06-29: Historie initialisiert
