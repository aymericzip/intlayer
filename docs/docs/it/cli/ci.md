---
createdAt: 2026-01-06
updatedAt: 2026-01-06
title: Comando CI
description: Impara come usare il comando Intlayer CI per eseguire comandi Intlayer con credenziali auto-iniettate nelle pipeline CI/CD e nei monorepo.
keywords:
  - CI
  - CI/CD
  - Automatizzazione
  - Monorepo
  - Credenziali
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - ci
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: Aggiungere comando CI
---

# Comando CI

```bash
npx intlayer ci <command...>
```

Il comando CI è progettato per l'automazione e le pipeline CI/CD. Inietta automaticamente le credenziali dalla variabile d'ambiente `INTLAYER_PROJECT_CREDENTIALS` e può eseguire comandi Intlayer su più progetti in un monorepo.

## Come funziona

Il comando CI opera in due modalità:

1. **Modalità progetto singolo**: Se la directory di lavoro corrente corrisponde a uno dei percorsi del progetto in `INTLAYER_PROJECT_CREDENTIALS`, esegue il comando solo per quel progetto specifico.

2. **Modalità iterazione**: Se non viene rilevato un contesto di progetto specifico, itera su tutti i progetti configurati ed esegue il comando per ciascuno.

## Variabile d'ambiente

Il comando richiede che la variabile d'ambiente `INTLAYER_PROJECT_CREDENTIALS` sia impostata. Questa variabile deve contenere un oggetto JSON che mappa i percorsi del progetto alle loro credenziali:

```json
{
  "packages/app": {
    "clientId": "your-client-id-1",
    "clientSecret": "your-client-secret-1"
  },
  "packages/admin": {
    "clientId": "your-client-id-2",
    "clientSecret": "your-client-secret-2"
  }
}
```

## Rilevamento del gestore di pacchetti

Il comando CI rileva automaticamente quale gestore di pacchetti viene utilizzato (npm, yarn, pnpm o bun) in base alla variabile d'ambiente `npm_config_user_agent` e utilizza il comando appropriato per eseguire Intlayer.

## Argomenti

- **`<command...>`**: Il comando Intlayer da eseguire (ad esempio, `fill`, `push`, `build`). Puoi passare qualsiasi comando Intlayer e i suoi argomenti.

  > Esempio: `npx intlayer ci fill --verbose`
  >
  > Esempio: `npx intlayer ci push`
  >
  > Esempio: `npx intlayer ci build`

## Esempi

### Eseguire un comando in modalità progetto singolo

Se ti trovi in una directory di progetto che corrisponde a uno dei percorsi in `INTLAYER_PROJECT_CREDENTIALS`:

```bash
cd packages/app
npx intlayer ci fill
```

Questo eseguirà il comando `fill` con le credenziali iniettate automaticamente per il progetto `packages/app`.

### Eseguire un comando su tutti i progetti

Se ti trovi in una directory che non corrisponde a nessun percorso di progetto, il comando itererà su tutti i progetti configurati:

```bash
cd /path/to/monorepo
npx intlayer ci push
```

Questo eseguirà il comando `push` per ogni progetto configurato in `INTLAYER_PROJECT_CREDENTIALS`.

### Passare flag aggiuntivi

Puoi passare qualsiasi flag al comando Intlayer sottostante:

```bash
npx intlayer ci fill --verbose --mode complete
```

### Utilizzare nelle pipeline CI/CD

Nella tua configurazione CI/CD (ad esempio, GitHub Actions, GitLab CI), imposta `INTLAYER_PROJECT_CREDENTIALS` come segreto:

```yaml
# Esempio GitHub Actions
env:
  INTLAYER_PROJECT_CREDENTIALS: ${{ secrets.INTLAYER_PROJECT_CREDENTIALS }}

steps:
  - name: Riempire dizionari
    run: npx intlayer ci fill
```

## Gestione degli errori

- Se `INTLAYER_PROJECT_CREDENTIALS` non è impostata, il comando terminerà con un errore.
- Se `INTLAYER_PROJECT_CREDENTIALS` non è un JSON valido, il comando terminerà con un errore.
- Se un percorso di progetto non esiste, verrà saltato con un avviso.
- Se un progetto fallisce, il comando terminerà con un codice di stato diverso da zero.

## Casi d'uso

- **Automatizzazione monorepo**: Eseguire comandi Intlayer su più progetti in un monorepo
- **Pipeline CI/CD**: Automatizzare la gestione dei dizionari nei flussi di lavoro di integrazione continua
- **Operazioni in batch**: Eseguire la stessa operazione su più progetti Intlayer contemporaneamente
- **Gestione dei segreti**: Gestire in modo sicuro le credenziali per più progetti utilizzando variabili d'ambiente

## Best practice di sicurezza

- Archivia `INTLAYER_PROJECT_CREDENTIALS` come segreti crittografati nella tua piattaforma CI/CD
- Non committare mai le credenziali nel controllo versione
- Usa credenziali specifiche dell'ambiente per diversi ambienti di distribuzione
- Ruota le credenziali regolarmente
