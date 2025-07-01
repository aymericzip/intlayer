---
docName: package__@intlayer_config
url: https://intlayer.org/doc/package/@intlayer_config
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/@intlayer/config/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/config - Gestione della Configurazione per Intlayer
description: Pacchetto NPM per recuperare la configurazione di Intlayer e definire le variabili d'ambiente per le impostazioni di internazionalizzazione in diversi ambienti.
keywords:
  - intlayer
  - configurazione
  - ambiente
  - impostazioni
  - i18n
  - JavaScript
  - NPM
  - variabili
---

# @intlayer/config: Pacchetto NPM per recuperare la configurazione di Intlayer

**Intlayer** è una suite di pacchetti progettata specificamente per sviluppatori JavaScript. È compatibile con framework come React, React e Express.js.

Il pacchetto **`@intlayer/config`** è un pacchetto NPM che consente di recuperare la configurazione di Intlayer e definire le variabili d'ambiente relative all'ambiente corrente.

## Installazione

Installa il pacchetto necessario utilizzando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install @intlayer/config
```

```bash packageManager="pnpm"
pnpm add @intlayer/config
```

```bash packageManager="yarn"
yarn add @intlayer/config
```

## Utilizzo

### Leggere la configurazione di Intlayer usando il file system

Esempio:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config";

const config: IntlayerConfig = getConfiguration();

console.log(config);
// Output:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> Questa funzione utilizza i pacchetti `fs` e funzionerà solo lato server.

### Leggere la configurazione di Intlayer utilizzando le variabili d'ambiente

Esempio:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config/client";

const config: IntlayerConfig = getConfiguration({
  env: "production",
});

console.log(config);
// Output:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> Questa funzione non restituirà nulla se le variabili d'ambiente non sono definite.

### Definire le variabili d'ambiente

1. Crea un file di configurazione.

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

> Consulta la [documentazione della configurazione di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md) per maggiori dettagli.

2. Definisci le variabili d'ambiente.

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// Format all configuration values as environment variables
const env = formatEnvVariable();

// Set each formatted environment variable in process.env
Object.assign(process.env, env);
```

3. Importa il file di configurazione.

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```

## Cronologia del documento

- 5.5.10 - 2025-06-29: Inizio cronologia
