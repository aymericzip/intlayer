# vite-intlayer: Pacchetto NPM per internazionalizzare (i18n) un'applicazione Vite

**Intlayer** è una suite di pacchetti progettati specificamente per sviluppatori JavaScript. È compatibile con framework come React, React e Express.js.

**Il pacchetto `vite-intlayer`** consente di internazionalizzare la tua applicazione Vite. Include il plugin Vite per impostare la configurazione tramite variabili ambientali nel [bundler Vite](https://vitejs.dev/guide/why.html#why-bundle-for-production). Fornisce anche middleware per rilevare la lingua preferita dell'utente e reindirizzarlo all'URL appropriato come specificato nella [configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).

## Perché internazionalizzare la tua applicazione Vite?

Internazionalizzare la tua applicazione Vite è essenziale per servire efficacemente un pubblico globale. Permette alla tua applicazione di fornire contenuti e messaggi nella lingua preferita di ciascun utente. Questa capacità migliora l'esperienza dell'utente e amplia la portata della tua applicazione rendendola più accessibile e pertinente a persone di diversi background linguistici.

## Configurazione

Il pacchetto `vite-intlayer` funziona perfettamente con il [pacchetto `react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/react-intlayer/index.md) e il [pacchetto `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/it/packages/intlayer/index.md). Dai un'occhiata alla documentazione pertinente per ulteriori informazioni.

## Installazione

Installa il pacchetto necessario utilizzando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install vite-intlayer
```

```bash packageManager="yarn"
yarn add vite-intlayer
```

```bash packageManager="pnpm"
pnpm add vite-intlayer
```

## Esempio di utilizzo

Guarda un esempio di come includere i plugin nella tua configurazione vite.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> Il plugin Vite `intlayerPlugin()` viene utilizzato per integrare Intlayer con Vite. Garantisce la creazione di file di dichiarazione dei contenuti e li monitora in modalità sviluppo. Definisce le variabili ambientali di Intlayer all'interno dell'applicazione Vite. Inoltre, fornisce alias per ottimizzare le prestazioni.

> Il `intLayerMiddlewarePlugin()` aggiunge il routing lato server alla tua applicazione. Questo plugin rileverà automaticamente la lingua corrente in base all'URL e imposterà il cookie della lingua appropriato. Se non viene specificata alcuna lingua, il plugin determinerà la lingua più appropriata in base alle preferenze linguistiche del browser dell'utente. Se non viene rilevata alcuna lingua, reindirizzerà alla lingua predefinita.

## Masterizzare l'internazionalizzazione della tua applicazione Vite

Intlayer offre molte funzionalità per aiutarti a internazionalizzare la tua applicazione Vite.

**Per saperne di più su queste funzionalità, consulta la guida [Internazionalizzazione React (i18n) con Intlayer e Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_vite+react.md) per applicazioni Vite e React.**
