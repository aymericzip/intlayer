---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-cli - Strumento da Linea di Comando per l'Internazionalizzazione
description: Pacchetto interfaccia a linea di comando per Intlayer che fornisce strumenti per gestire traduzioni, costruire dizionari e automatizzare i flussi di lavoro di internazionalizzazione.
keywords:
  - intlayer
  - CLI
  - linea di comando
  - internazionalizzazione
  - i18n
  - strumenti
  - NPM
  - automazione
slugs:
  - doc
  - package
  - intlayer-cli
---

# intlayer-cli: Pacchetto NPM per usare la CLI di Intlayer

**Intlayer** è una suite di pacchetti progettata specificamente per sviluppatori JavaScript. È compatibile con framework come React, React e Express.js.

Il pacchetto **`intlayer-cli`** è un pacchetto NPM che utilizza il pacchetto `@intlayer/cli` e lo rende disponibile alle interfacce a linea di comando `intlayer`.

> Nota che questo pacchetto non è necessario se è installato il pacchetto [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/it/packages/intlayer/index.md). Rispetto al pacchetto `intlayer`, il pacchetto `intlayer-cli` è un pacchetto più leggero che contiene solo lo strumento CLI, senza dipendenze da `@intlayer/core`.

## Installazione

Installa il pacchetto necessario usando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

## Utilizzo

Ecco un esempio di come utilizzare il pacchetto `intlayer-cli`:

```bash
npx intlayer dictionaries build
```

## Comandi CLI

Intlayer fornisce uno strumento CLI per:

- verificare le tue dichiarazioni di contenuto e completare le traduzioni mancanti
- costruire dizionari dalle tue dichiarazioni di contenuto
- inviare e ricevere dizionari remoti dal tuo CMS al progetto locale

Consulta [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md) per maggiori informazioni.

## Cronologia della documentazione

- 5.5.10 - 2025-06-29: Inizio cronologia
