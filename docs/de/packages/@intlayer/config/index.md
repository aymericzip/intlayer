# @intlayer/config: NPM-Paket zum Abrufen der Intlayer-Konfiguration

**Intlayer** ist eine Suite von Paketen, die speziell für JavaScript-Entwickler entwickelt wurde. Es ist mit Frameworks wie React, React und Express.js kompatibel.

Das **`@intlayer/config`** Paket ist ein NPM-Paket, das es Ihnen ermöglicht, die Konfiguration von Intlayer abzurufen und die Umgebungsvariablen für die aktuelle Umgebung zu definieren.

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

### Lesen Sie die Konfiguration von Intlayer mit dem Dateisystem

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

> Diese Funktion verwendet `fs` Pakete und funktioniert nur auf der Serverseite.

### Lesen Sie die Konfiguration von Intlayer mit Umgebungsvariablen

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

### Definieren Sie die Umgebungsvariablen

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

> Siehe [Intlayer-Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) für weitere Details.

2. Definieren Sie die Umgebungsvariablen.

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// Formatieren Sie alle Konfigurationswerte als Umgebungsvariablen
const env = formatEnvVariable();

// Setzen Sie jede formatierte Umgebungsvariable in process.env
Object.assign(process.env, env);
```

3. Importieren Sie die Konfigurationsdatei.

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```
