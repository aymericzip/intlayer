---
createdAt: 2026-09-21
updatedAt: 2026-09-21
title: CLI - Init Infra
description: Scopri come utilizzare il comando init infra della CLI di Intlayer per installare l'applicazione desktop o auto-ospitare il CMS Intlayer con Docker (contenitore all-in-one o stack Docker Compose).
keywords:
  - CLI
  - Infrastruttura
  - Auto-hosting
  - Applicazione desktop
  - Docker
  - Docker Compose
  - CMS
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - infra
history:
  - version: 9.5.6
    date: 2026-09-21
    changes: "Aggiungi il comando init infra"
author: aymericzip
---

# Comando Intlayer CLI Init Infra

## Descrizione

Il comando `init infra` configura l'infrastruttura Intlayer sul tuo computer. Scarica il programma di installazione ospitato per la tua piattaforma (`https://intlayer.org/install.sh` su macOS / Linux, `https://intlayer.org/install.ps1` su Windows) e lo esegue con il terminale collegato, in modo che il menu e l'avanzamento siano mostrati senza modifiche.

Il programma di installazione chiede come desideri eseguire Intlayer:

- **Applicazione desktop**: scarica la dashboard nativa per il tuo sistema operativo e CPU e la apre o la installa. La versione desktop comunica con il backend Intlayer Cloud.
- **Docker all-in-one**: dashboard + API + MongoDB + Redis + MinIO in un unico contenitore supportato da un volume. Scrive `./intlayer.env` con i segreti generati e scarica l'immagine `intlayer/cms-all`.
- **Docker Compose**: un contenitore per servizio, per un auto-hosting scalabile. Scrive `docker-compose.yml` e `.env` in `./intlayer/` e scarica le immagini.

Il programma di installazione ospitato è l'unica fonte di verità per il flusso di configurazione: la CLI lo esegue invece di reimplementare gli stessi passaggi, quindi `npx intlayer init infra` e `curl -fsSL https://intlayer.org/install.sh | sh` fanno esattamente la stessa cosa.

## Utilizzo

```bash packageManager="npm"
npx intlayer init infra [options]
```

```bash packageManager="yarn"
yarn intlayer init infra [options]
```

```bash packageManager="pnpm"
pnpm intlayer init infra [options]
```

```bash packageManager="bun"
bun x intlayer init infra [options]
```

Lo stesso passaggio è offerto nell'elenco di controllo di `npx intlayer init --interactive`, sotto **Infrastruttura (applicazione desktop / auto-hosting)**.

## Opzioni

- `-m, --mode <mode>` - Opzionale. Salta il menu del programma di installazione ed esegue direttamente una modalità. Valori accettati: `desktop`, `docker` (all-in-one) o `compose`. Qualsiasi altro valore genera un errore elencando le modalità accettate.

## Esempi

### Scegli la modalità in modo interattivo

```bash
npx intlayer init infra
```

### Installa l'applicazione desktop

```bash
npx intlayer init infra --mode desktop
```

### Auto-ospita con il contenitore all-in-one

```bash
npx intlayer init infra --mode docker
```

### Auto-ospita con Docker Compose

```bash
npx intlayer init infra --mode compose
```

## Esempio di output

```bash
npx intlayer init infra --mode compose
◇  Installer downloaded
▸ Fetching docker-compose.yml into ./intlayer
▸ Writing ./intlayer/.env
▸ Pulling images

  Everything is installed. Two steps left.

  1. Configure a mailer in:

       ./intlayer/.env

     Either RESEND_API_KEY (resend.com) or the MAIL_SMTP_* block — the first
     account cannot be verified without a working mailer.
  2. Start the stack:

       cd ./intlayer && docker compose up -d

  Then open http://localhost:3000 — first boot initialises the
  datastores, so give it a minute. The first account you create becomes the
  super admin.

    Logs      docker compose logs -f
    Stop      docker compose down
    Upgrade   docker compose pull && docker compose up -d
```

## Impostazioni del programma di installazione

Il programma di installazione legge alcune variabili di ambiente, che la CLI trasmette senza modifiche. Impostale nella tua shell prima di eseguire il comando:

```bash
INTLAYER_COMPOSE_DIR=./cms npx intlayer init infra --mode compose
```

| Variabile                 | Predefinito               | Si applica a | Descrizione                                                        |
| ------------------------- | ------------------------- | ------------ | ------------------------------------------------------------------ |
| `INTLAYER_MODE`           | _(richiesto)_             | tutte        | `desktop`, `docker` o `compose`, uguale a `--mode`                 |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop      | Dove viene salvato il programma di installazione dell'app          |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker       | Immagine all-in-one da scaricare                                   |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker       | Dove scrivere il file di ambiente                                  |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker       | Nome del contenitore                                               |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker       | Volume con nome montato in `/data`                                 |
| `INTLAYER_APP_PORT`       | `3000`                    | docker       | Porta host per la dashboard                                        |
| `INTLAYER_API_PORT`       | `3100`                    | docker       | Porta host per l'API                                               |
| `INTLAYER_S3_PORT`        | `9000`                    | docker       | Porta host per l'API S3 MinIO                                      |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker       | Porta host per la console MinIO                                    |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose      | Dove vengono scritti `docker-compose.yml` e `.env`                 |
| `INTLAYER_SELFHOST_REF`   | `main`                    | entrambe     | Rif Git da cui vengono recuperati il file compose e il modello env |

> Le variabili di porta modificano solo il lato **host** della mappatura. Le immagini pubblicate includono `http://localhost:3000`, `http://localhost:3100` e `http://localhost:9000` compilati nel pacchetto della dashboard, quindi mantieni i valori predefiniti a meno che non crei le tue immagini: consulta la [guida all'auto-hosting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/self_hosting.md#limitations).

## Requisiti

- **L'applicazione desktop** richiede [Node.js](https://nodejs.org): l'app incorpora il server della dashboard e lo avvia con il binario `node` del computer.
- **Le modalità Docker** richiedono [Docker](https://docs.docker.com/get-docker/) (Docker Desktop con backend WSL 2 su Windows). La modalità Compose richiede inoltre il plug-in `docker compose`.

## Note

- La riesecuzione del comando è sicura: un file di ambiente esistente non viene mai sovrascritto, fungendo anche da percorso di aggiornamento (il programma di installazione scarica le immagini più recenti e mantiene i segreti).
- Il programma di installazione viene scaricato in una directory temporanea ed eliminato al termine, qualunque sia il risultato.
- Il codice di uscita del comando corrisponde a quello del programma di installazione. Se il download fallisce, la CLI stampa il comando equivalente `curl … | sh` (o `irm … | iex`) in modo da poter eseguire direttamente il programma di installazione.
- Le modalità Docker richiedono comunque un gestore di posta elettronica per l'invio delle email di accesso. Al termine dell'installazione, configura Resend o SMTP nel file di ambiente generato: consulta [Mailer globale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/self_hosting.md#global-mailer).

## Correlati

- [Guida all'auto-hosting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/self_hosting.md) - Architettura, primi passi e limitazioni di ciascuna modalità
- [Inizializza Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/init.md) - Il comando principale `init` e il suo elenco di controllo interattivo
- [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) - Funzionalità della dashboard appena installata
