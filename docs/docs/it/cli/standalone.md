---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: Bundle Standalone
description: Impara come creare un bundle JavaScript standalone del contenuto dell'applicazione.
keywords:
  - Standalone
  - Bundle
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - standalone
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "Inizializzazione della documentazione del comando standalone"
---

# Bundle Standalone

Il comando `standalone` ti consente di creare un bundle JavaScript standalone contenente Intlayer e qualsiasi altro pacchetto specificato. Questo è particolarmente utile per utilizzare Intlayer in ambienti senza un gestore di pacchetti o un bundler, come una semplice applicazione HTML/JS.

Il bundle utilizza [esbuild](https://esbuild.github.io/) per combinare i pacchetti richiesti e le loro dipendenze in un singolo file che può essere facilmente importato in qualsiasi progetto web.

## Utilizzo

```bash
npx intlayer standalone --packages [pacchetti...] [opzioni]
```

## Opzioni

- `-o, --outfile [outfile]` - Opzionale. Il nome del file di output. Predefinito: `intlayer-bundle.js`.
- `--packages [pacchetti...]` - Obbligatorio. Un elenco di pacchetti da includere nel bundle (es. `intlayer`, `vanilla-intlayer`).
- `--version [version]` - Opzionale. La versione dei pacchetti da raggruppare. Se non specificata, viene utilizzata per impostazione predefinita la versione della CLI di Intlayer.
- `--minify` - Opzionale. Indica se minificare l'output. Predefinito: `true`.
- `--platform [platform]` - Opzionale. La piattaforma di destinazione per il bundle (es. `browser`, `node`). Predefinito: `browser`.
- `--format [format]` - Opzionale. Il formato di output per il bundle (es. `esm`, `cjs`, `iife`). Predefinito: `esm`.

## Opzioni Comuni

- `--env-file [envFile]` - File di ambiente.
- `-e, --env [env]` - Ambiente.
- `--base-dir [baseDir]` - Directory di base.
- `--no-cache` - Disabilita cache.
- `--verbose` - Output dettagliato.

## Esempi:

### Creare un bundle per Vanilla JS:

```bash
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

Questo creerà un file `intlayer.js` contenente sia i pacchetti `intlayer` che `vanilla-intlayer`, minificato e in formato ESM, pronto per essere utilizzato in un browser tramite un tag `<script>`.

### Raggruppare una versione specifica:

```bash
npx intlayer standalone --packages intlayer --version 8.6.4
```

### Raggruppare con un formato diverso:

```bash
npx intlayer standalone --packages intlayer --format iife
```

## Cosa fa:

1. **Crea un ambiente temporaneo** - Configura una directory temporanea per gestire le dipendenze.
2. **Installa i pacchetti** - Utilizza `npm` o `bun` (se disponibile) per installare i pacchetti richiesti e le loro dipendenze.
3. **Genera un punto di ingresso** - Crea un file di ingresso temporaneo che esporta tutti i pacchetti richiesti e li espone come variabili globali durante l'esecuzione in un browser.
4. **Raggruppa con esbuild** - Utilizza esbuild per raggruppare tutto in un singolo file, applicando minificazione e formattazione come richiesto.
5. **Genera il file** - Scrive il bundle risultante nel percorso di output specificato.

## Variabili Globali

Quando il bundle viene caricato in un browser, espone i pacchetti richiesti come variabili globali sull'oggetto `window`. I nomi delle variabili derivano dai nomi dei pacchetti (es. `intlayer` diventa `Intlayer`, `vanilla-intlayer` diventa `VanillaIntlayer`).

```javascript
// Accesso a Intlayer dal bundle
const { getLocaleName } = window.Intlayer;
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;
```
