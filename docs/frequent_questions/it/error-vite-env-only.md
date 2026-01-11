---
createdAt: 2026-01-11
updatedAt: 2026-01-11
title: `vite-env-only` e Intlayer – falso positivo errore `node:fs` negato
description: Perché vite-env-only segnala un import `node:fs` negato con Intlayer + React-Router + Vite e cosa fare.
keywords:
  - intlayer
  - vite
  - react-router
  - vite-env-only
  - node:fs
  - import denied
  - alias
  - client bundle
slugs:
  - frequent-questions
  - vite-env-only-node-fs-false-positive
---

# vite-env-only nega `node:fs` con Intlayer

Se hai usato il plugin **vite-env-only** (come suggerito nelle vecchie indicazioni di React-Router v7) e vedi:

```bash

Error: [vite-env-only] Import denied

* Denied by specifier pattern: /^node:/
* Importer: index.html
* Import: "node:fs"

```

…anche se non c’è **`node:fs` nel tuo bundle client**, questo è un **falso positivo**.

## Cosa lo causa

`vite-env-only` esegue un controllo basato su Babel **all'inizio della risoluzione del grafo di Vite**, _prima_ di:

- aliasing (inclusi i mapping browser vs node di Intlayer),
- dead-code elimination,
- risoluzione SSR vs client,
- moduli virtuali come quelli di React-Router.

I pacchetti Intlayer contengono codice che può funzionare sia su Node sia sul browser. In una fase _intermedia_, un modulo built-in di Node come `node:fs` può apparire nel grafo **prima** che Vite lo rimuova dal build client. `vite-env-only` lo rileva e genera un errore immediato, anche se il bundle finale non lo contiene.

## React-Router e le convenzioni sui moduli lato server

Nella documentazione di React-Router sulle **convenzioni per i moduli lato server**  
(https://reactrouter.com/api/framework-conventions/server-modules), il team **suggerisce esplicitamente di usare `vite-env-only`** per evitare che import specifici del server trapelino nel bundle client.

Tuttavia, quelle convenzioni si basano su aliasing di Vite, conditional exports e tree-shaking per rimuovere il codice server-only. Sebbene aliasing e conditional exports siano già applicati, alcune utilità basate su Node sono ancora presenti in pacchetti come `@intlayer/core` in quella fase (anche se non vengono mai importate nel client). Poiché il tree-shaking non è ancora stato eseguito, quelle funzioni vengono comunque analizzate da Babel, e `vite-env-only` rileva i loro import `node:` e segnala un falso positivo — anche se vengono correttamente eliminati dal bundle client finale.

## Come risolvere / aggirare

### Consigliato: Rimuovere `vite-env-only`

Rimuovi semplicemente il plugin. In molti casi non ti serve — Vite gestisce già le importazioni client vs server tramite la propria risoluzione.

Questo risolve il falso errore su `node:fs` senza modifiche a Intlayer.

### Verificare il build finale invece

Se vuoi comunque assicurarti che non ci siano built-in di Node nel client, falla **dopo la build**, per esempio:

```bash
pnpm build
grep -R "node:" dist/
```

Se non ci sono risultati, i tuoi bundle client sono puliti.

## Riepilogo

- `vite-env-only` può generare un errore su `node:fs` perché esegue il controllo troppo presto.
- Le convenzioni sui server modules di Vite + Intlayer + React-Router normalmente rimuovono correttamente i riferimenti server-only.
- Rimuovere il plugin o verificare l'_output finale_ è generalmente la soluzione migliore.
