---
createdAt: 2026-09-23
updatedAt: 2026-11-13
priority: 5
title: CLI - Aggiorna i pacchetti Intlayer
description: Scopri come utilizzare il comando upgrade della CLI di Intlayer per elencare ogni pacchetto Intlayer del tuo progetto o monorepo e aggiornarli alla versione più recente.
keywords:
  - CLI
  - Upgrade
  - Aggiornamento
  - Pacchetti
  - Monorepo
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - upgrade
history:
  - version: 9.8.1
    date: 2026-11-13
    changes: "Installa e registra i plugin di lint / Prettier, aggiorna le voci del server MCP"
  - version: 9.5.8
    date: 2026-09-23
    changes: "Aggiungi il comando upgrade"
author: aymericzip
---

# Aggiorna i pacchetti Intlayer

```bash packageManager="npm"
npx intlayer upgrade
```

```bash packageManager="yarn"
yarn intlayer upgrade
```

```bash packageManager="pnpm"
pnpm intlayer upgrade
```

```bash packageManager="bun"
bun x intlayer upgrade
```

Il comando `upgrade` elenca i pacchetti Intlayer dichiarati in ogni `package.json` del progetto, compresi i workspace di un monorepo, e li aggiorna all'ultima versione pubblicata: integrazioni di framework, `eslint-plugin-intlayer`, `prettier-plugin-intlayer`, `intlayer-editor`, `@intlayer/mcp` e ogni altro pacchetto `@intlayer/*`. Poi aggiorna gli strumenti collegati.

## Argomenti:

- `--project-root [projectRoot]` - Opzionale. La directory principale del progetto. Per impostazione predefinita, il comando parte dal `package.json` più vicino sopra la directory di lavoro corrente.
- `--dry-run` - Opzionale. Elenca i pacchetti e la loro versione di destinazione senza modificare alcun file.
- `--tag <tag>` - Opzionale. Il dist-tag npm a cui aggiornare (ad esempio `canary`). Il valore predefinito è `latest`.
- `--no-eslint` - Opzionale. Non installa né registra le regole di lint di Intlayer.
- `--no-prettier` - Opzionale. Non installa né registra il plugin Prettier di Intlayer.

## Cosa fa:

1. **Elenca i pacchetti Intlayer** - Esegue la scansione di ogni `package.json` del progetto (ignorando `node_modules` e gli output di build) alla ricerca di dipendenze e devDependencies `intlayer`, `@intlayer/*`, `*-intlayer` e `intlayer-*`.
2. **Recupera la versione di destinazione** - Legge dal registro npm la versione del dist-tag selezionato (`latest` per impostazione predefinita) di ciascun pacchetto.
3. **Riscrive i range** - Aggiorna ogni intervallo obsoleto direttamente nel file, mantenendo il relativo operatore (`^`, `~` o nessuno) e l'indentazione del file.
4. **Installa una sola volta** - Esegue una singola installazione dalla root del workspace (la directory più vicina con un lock file), utilizzando il gestore di pacchetti proprietario del lock file:

| Lock file                     | Comando        |
| ----------------------------- | -------------- |
| `bun.lock` / `bun.lockb`      | `bun install`  |
| `pnpm-lock.yaml`              | `pnpm install` |
| `yarn.lock`                   | `yarn install` |
| `package-lock.json` o no lock | `npm install`  |

Se non è presente alcun lock file, viene utilizzato il campo `packageManager` di `package.json` (ad esempio `"bun@1.2.0"`) prima di ricorrere a npm.

Gli intervalli che non puntano al registro, come `workspace:*`, `file:`, `link:`, `catalog:` o URL git, non vengono mai modificati.

5. **Plugin di lint e Prettier** - Se il progetto usa ESLint / oxlint o Prettier, installa `eslint-plugin-intlayer` / `prettier-plugin-intlayer` se mancano e li registra: `...intlayer.configs.recommended` nella config flat di ESLint, le regole in `.oxlintrc.json` e il plugin nella config di Prettier (JSON, YAML, JavaScript o TypeScript). Una config che non può essere modificata in sicurezza riceve invece lo snippet da incollare.
6. **Server MCP** - Punta le voci MCP stdio di Intlayer del progetto (`.mcp.json`, `.cursor/mcp.json`, `.vscode/mcp.json`…) a `@intlayer/mcp@<tag>`, così `npx` avvia il server aggiornato invece di una copia in cache.

## Esempi:

### Elenca gli aggiornamenti disponibili senza applicarli:

```bash packageManager="npm"
npx intlayer upgrade --dry-run
```

```bash packageManager="yarn"
yarn intlayer upgrade --dry-run
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --dry-run
```

```bash packageManager="bun"
bun x intlayer upgrade --dry-run
```

### Aggiorna alla versione canary:

```bash packageManager="npm"
npx intlayer upgrade --tag canary
```

```bash packageManager="yarn"
yarn intlayer upgrade --tag canary
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --tag canary
```

```bash packageManager="bun"
bun x intlayer upgrade --tag canary
```

## Output di esempio:

```bash
npx intlayer upgrade
Intlayer packages:
  package.json
    intlayer ^9.0.0 → ^9.5.7
  apps/web/package.json
    next-intlayer ^9.5.7 (latest)
    vite-intlayer ~9.2.0 → ~9.5.7
Running bun install...
✓ Upgraded 2 Intlayer dependencies to latest
```

## Note:

- Esegui il comando dalla directory principale del repository per aggiornare ogni workspace. Eseguilo da un workspace per aggiornare solo quel workspace.
- I pacchetti la cui versione non può essere recuperata (offline, pacchetto privato o non pubblicato) vengono elencati e lasciati invariati.
- Se l'installazione fallisce, gli intervalli aggiornati vengono conservati in `package.json`. Esegui manualmente il comando di installazione del tuo gestore di pacchetti.
