# @intlayer/api: Pacchetto NPM per interagire con l'API di Intlayer

**Intlayer** è un insieme di pacchetti progettati specificamente per sviluppatori JavaScript. È compatibile con framework come React, React e Express.js.

Il pacchetto **`@intlayer/api`** è un SDK (Software Development Kit) per interagire con l'API di Intlayer. Fornisce un insieme di funzioni per auditare la dichiarazione dei contenuti, interagire con organizzazioni, progetti e utenti, ecc.

## Utilizzo

```ts
import { intlayerAPI } from "@intlayer/api";

intlayerAPI.user.getUser({
  ids: ["user-id-1", "user-id-2"], // ID degli utenti
});
```

## Installazione

Installa il pacchetto necessario utilizzando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```
