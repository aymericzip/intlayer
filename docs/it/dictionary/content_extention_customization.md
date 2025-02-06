# Personalizzazione delle Estensioni dei Contenuti

## Estensioni dei File di Contenuto

Intlayer consente di personalizzare le estensioni per i file di dichiarazione dei contenuti. Questa personalizzazione fornisce flessibilità nella gestione di progetti su larga scala e aiuta a evitare conflitti con altri moduli.

### Estensioni Predefinite

Per impostazione predefinita, Intlayer osserva tutti i file con le seguenti estensioni per le dichiarazioni di contenuto:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

Queste estensioni predefinite sono adatte per la maggior parte delle applicazioni. Tuttavia, quando hai esigenze specifiche, puoi definire estensioni personalizzate per semplificare il processo di build e ridurre il rischio di conflitti con altri componenti.

### Personalizzazione delle Estensioni dei Contenuti

Per personalizzare le estensioni dei file che Intlayer utilizza per identificare i file di dichiarazione dei contenuti, puoi specificarle nel file di configurazione di Intlayer. Questo approccio è vantaggioso per i progetti su larga scala, dove limitare l'ambito del processo di osservazione migliora le prestazioni di build.

Ecco un esempio di come definire estensioni personalizzate per i contenuti nella tua configurazione:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    fileExtensions: [".my_content.ts", ".my_content.tsx"], // Le tue estensioni personalizzate
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.cjs", ".my_content.cjx"], // Le tue estensioni personalizzate
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.mjs", ".my_content.mjx"], // Le tue estensioni personalizzate
  },
};

module.exports = config;
```

In questo esempio, la configurazione specifica due estensioni personalizzate: `.my_content.ts` e `.my_content.tsx`. Intlayer osserverà solo i file con queste estensioni per costruire i dizionari.

### Vantaggi delle Estensioni Personalizzate

- **Prestazioni di Build**: Ridurre l'ambito dei file osservati può migliorare significativamente le prestazioni di build nei progetti di grandi dimensioni.
- **Evitare Conflitti**: Le estensioni personalizzate aiutano a prevenire conflitti con altri file JavaScript o TypeScript nel tuo progetto.
- **Organizzazione**: Le estensioni personalizzate consentono di organizzare i tuoi file di dichiarazione dei contenuti secondo le esigenze del tuo progetto.

### Linee Guida per Estensioni Personalizzate

Quando personalizzi le estensioni dei file di contenuto, tieni a mente le seguenti linee guida:

- **Unicità**: Scegli estensioni che siano uniche all'interno del tuo progetto per evitare conflitti.
- **Naming Consistente**: Utilizza convenzioni di naming coerenti per una migliore leggibilità e manutenzione del codice.
- **Evitare Estensioni Comuni**: Evita di usare estensioni comuni come `.ts` o `.js` per prevenire conflitti con altri moduli o librerie.

## Conclusione

Personalizzare le estensioni dei file di contenuto in Intlayer è una funzionalità preziosa per ottimizzare le prestazioni e evitare conflitti nelle applicazioni su larga scala. Seguendo le linee guida delineate in questa documentazione, puoi gestire efficacemente le tue dichiarazioni di contenuto e garantire un'integrazione fluida con altre parti del tuo progetto.
