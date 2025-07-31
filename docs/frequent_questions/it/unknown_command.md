---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Comando sconosciuto
description: Scopri come risolvere l'errore di comando sconosciuto.
keywords:
  - sconosciuto
  - comando
  - errore
  - intlayer
  - fill
  - build
  - verbose
  - terminale
  - riavviare
  - locale
slugs:
  - doc
  - faq
  - unknown-command
---

# errore: comando sconosciuto fill / build / ecc.

Se `npx intlayer fill --verbose` restituisce:

```
error: unknown command 'fill'
```

ma sei sicuro che il comando `fill` _dovrebbe_ esistere, ecco i passaggi per risolvere il problema:

## 1. **Assicurati di usare l'ultima versione**

Esegui:

```bash
npx intlayer --version                  # versione intlayer locale attuale
npx intlayer@latest --version           # versione intlayer più recente disponibile
```

Questo forza `npx` a scaricare la versione più recente. Poi riprova:

```bash
npx intlayer@latest build --verbose
```

## 2. **Controlla se il comando è registrato**

Puoi controllare con:

```bash
npx intlayer --help                     # fornisce informazioni relative ai comandi
```

Verifica se il comando appare nella lista dei comandi.

Vai nel repository e conferma che il tuo comando sia esportato e registrato nel punto di ingresso della CLI. Intlayer utilizza `commander` come framework.

Codice relativo alla CLI:
https://github.com/aymericzip/intlayer/blob/main/packages/%40intlayer/cli/src/cli.ts

## 4. **Riavvia il terminale**

A volte è necessario riavviare il terminale per riconoscere nuovi comandi.

## 5. **Se stai sviluppando `intlayer`, ricostruiscilo e collegalo**

Se stai sviluppando `intlayer` localmente:

```bash
# Nella directory di intlayer
npm install
npm run build
npm link
```

Poi in un altro terminale:

```bash
intlayer fill --verbose
```

Questo utilizza la versione locale su cui stai lavorando.

## 6. **Pulisci la cache di npx (se sei bloccato con una versione più vecchia)**

```bash
npx clear-npx-cache
```

Oppure elimina manualmente i pacchetti intlayer memorizzati nella cache:

```bash
rm -rf ~/.npm/_npx
```

Verifica l'equivalente se usi pnpm, yarn, bun o un altro gestore di pacchetti
