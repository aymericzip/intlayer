# Personalizzazione delle Estensioni dei Contenuti

## Estensioni dei File di Contenuto

Intlayer consente di personalizzare le estensioni per i file di dichiarazione dei contenuti. Questa personalizzazione offre flessibilità nella gestione di progetti su larga scala e aiuta a evitare conflitti con altri moduli.

### Estensioni Predefinite

Per impostazione predefinita, Intlayer monitora tutti i file con le seguenti estensioni per le dichiarazioni di contenuto:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.cintent.cjx`

Queste estensioni predefinite sono adatte per la maggior parte delle applicazioni. Tuttavia, quando hai esigenze specifiche, puoi definire estensioni personalizzate per ottimizzare il processo di build e ridurre il rischio di conflitti con altri componenti.

### Personalizzazione delle Estensioni dei Contenuti

Per personalizzare le estensioni dei file che Intlayer utilizza per identificare i file di dichiarazione dei contenuti, puoi specificarle nel file di configurazione di Intlayer. Questo approccio è utile per progetti su larga scala, dove limitare l'ambito del processo di monitoraggio migliora le prestazioni di build.

Ecco un esempio di come definire estensioni personalizzate nel file di configurazione:

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

In questo esempio, la configurazione specifica due estensioni personalizzate: `.my_content.ts` e `.my_content.tsx`. Intlayer monitorerà solo i file con queste estensioni per costruire i dizionari.

### Vantaggi delle Estensioni Personalizzate

- **Prestazioni di Build**: Ridurre l'ambito dei file monitorati può migliorare significativamente le prestazioni di build in progetti di grandi dimensioni.
- **Evitare Conflitti**: Le estensioni personalizzate aiutano a prevenire conflitti con altri file JavaScript o TypeScript nel tuo progetto.
- **Organizzazione**: Le estensioni personalizzate ti consentono di organizzare i file di dichiarazione dei contenuti in base alle esigenze del tuo progetto.

### Linee Guida per le Estensioni Personalizzate

Quando personalizzi le estensioni dei file di contenuto, tieni presente le seguenti linee guida:

- **Unicità**: Scegli estensioni uniche all'interno del tuo progetto per evitare conflitti.
- **Nomenclatura Coerente**: Usa convenzioni di denominazione coerenti per una migliore leggibilità e manutenzione del codice.
- **Evitare Estensioni Comuni**: Evita di utilizzare estensioni comuni come `.ts` o `.js` per prevenire conflitti con altri moduli o librerie.

## Conclusione

Personalizzare le estensioni dei file di contenuto in Intlayer è una funzionalità preziosa per ottimizzare le prestazioni e prevenire conflitti in applicazioni su larga scala. Seguendo le linee guida descritte in questa documentazione, puoi gestire efficacemente le dichiarazioni di contenuto e garantire un'integrazione fluida con altre parti del tuo progetto.
