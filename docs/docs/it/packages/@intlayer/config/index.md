# @intlayer/config: Pacchetto NPM per recuperare la configurazione di Intlayer

**Intlayer** è una suite di pacchetti progettata specificamente per gli sviluppatori JavaScript. È compatibile con framework come React, React e Express.js.

Il pacchetto **`@intlayer/config`** è un pacchetto NPM che consente di recuperare la configurazione di Intlayer e definire le variabili di ambiente relative all'ambiente corrente.

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

### Leggere la configurazione di Intlayer utilizzando il file system

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

### Leggere la configurazione di Intlayer utilizzando le variabili di ambiente

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

> Questa funzione non restituirà nulla se le variabili di ambiente non sono definite.

### Definire le variabili di ambiente

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

> Consulta la [documentazione sulla configurazione di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md) per maggiori dettagli.

2. Definisci le variabili di ambiente.

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// Formatta tutti i valori di configurazione come variabili di ambiente
const env = formatEnvVariable();

// Imposta ogni variabile di ambiente formattata in process.env
Object.assign(process.env, env);
```

3. Importa il file di configurazione.

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```
