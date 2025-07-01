---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Personalizzazione delle Estensioni dei Contenuti
description: Scopri come personalizzare le estensioni per i tuoi file di dichiarazione dei contenuti. Segui questa documentazione per implementare condizioni in modo efficiente nel tuo progetto.
keywords:
  - Personalizzazione delle Estensioni dei Contenuti
  - Documentazione
  - Intlayer
slugs:
  - doc
  - concept
  - content
---

# Personalizzazione delle Estensioni dei Contenuti

## Estensioni dei File di Contenuto

Intlayer ti permette di personalizzare le estensioni per i tuoi file di dichiarazione dei contenuti. Questa personalizzazione offre flessibilità nella gestione di progetti su larga scala e aiuta a evitare conflitti con altri moduli.

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
- `.content.cjx`

Queste estensioni predefinite sono adatte alla maggior parte delle applicazioni. Tuttavia, quando hai esigenze specifiche, puoi definire estensioni personalizzate per semplificare il processo di build e ridurre il rischio di conflitti con altri componenti.

### Personalizzazione delle Estensioni dei Contenuti

Per personalizzare le estensioni dei file che Intlayer utilizza per identificare i file di dichiarazione dei contenuti, puoi specificarle nel file di configurazione di Intlayer. Questo approccio è utile per progetti su larga scala in cui limitare l'ambito del processo di watch migliora le prestazioni della build.

Ecco un esempio di come definire estensioni di contenuto personalizzate nella tua configurazione:

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

- **Prestazioni della Build**: Ridurre l'ambito dei file monitorati può migliorare significativamente le prestazioni della build in progetti di grandi dimensioni.
- **Evitare Conflitti**: Le estensioni personalizzate aiutano a prevenire conflitti con altri file JavaScript o TypeScript nel tuo progetto.
- **Organizzazione**: Le estensioni personalizzate ti permettono di organizzare i file di dichiarazione dei contenuti in base alle esigenze del tuo progetto.

### Linee Guida per le Estensioni Personalizzate

Quando personalizzi le estensioni dei file di contenuto, tieni a mente le seguenti linee guida:

- **Unicità**: Scegli estensioni uniche all'interno del tuo progetto per evitare conflitti.
- **Nomenclatura Coerente**: Usa convenzioni di denominazione coerenti per una migliore leggibilità e manutenzione del codice.
- **Evitare Estensioni Comuni**: Evita di usare estensioni comuni come `.ts` o `.js` per prevenire conflitti con altri moduli o librerie.

## Conclusione

- **Evitare Conflitti**: Le estensioni personalizzate aiutano a prevenire conflitti con altri file JavaScript o TypeScript nel tuo progetto.
- **Organizzazione**: Le estensioni personalizzate ti permettono di organizzare i file di dichiarazione dei contenuti in base alle esigenze del tuo progetto.

### Linee Guida per le Estensioni Personalizzate

Quando personalizzi le estensioni dei file di contenuto, tieni a mente le seguenti linee guida:

- **Unicità**: Scegli estensioni uniche all'interno del tuo progetto per evitare conflitti.
- **Nomenclatura Coerente**: Usa convenzioni di denominazione coerenti per una migliore leggibilità e manutenzione del codice.
- **Evitare Estensioni Comuni**: Evita di usare estensioni comuni come `.ts` o `.js` per prevenire conflitti con altri moduli o librerie.

## Conclusione

Personalizzare le estensioni dei file di contenuto in Intlayer è una funzionalità preziosa per ottimizzare le prestazioni ed evitare conflitti in applicazioni su larga scala. Seguendo le linee guida descritte in questa documentazione, puoi gestire efficacemente le tue dichiarazioni di contenuto e garantire un'integrazione fluida con le altre parti del tuo progetto.

## Storico Documentazione

- 5.5.10 - 2025-06-29: Inizio storico
