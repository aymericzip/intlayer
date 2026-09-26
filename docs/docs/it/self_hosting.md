---
createdAt: 2026-06-30
updatedAt: 2026-09-21
priority: 8
title: Auto-hosting di Intlayer
description: "Esegui Intlayer sulla tua infrastruttura: come app desktop, singolo container Docker all-in-one o stack scalabile Docker Compose. Nessun account Intlayer Cloud richiesto."
keywords:
  - Auto-hosting
  - Docker
  - Docker Compose
  - Applicazione desktop
  - Intlayer
  - CMS
  - Installazione
  - Infrastruttura
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Auto-hosting di Intlayer

Intlayer può essere eseguito sulla tua infrastruttura, nessun account Intlayer Cloud richiesto. Sono disponibili tre configurazioni, tutte gestite dallo stesso programma di installazione (`install.sh`, `install.ps1` su Windows o `npx intlayer init infra`):

| Setup                    | What it is                                                                              | Pick it for                               |
| ------------------------ | --------------------------------------------------------------------------------------- | ----------------------------------------- |
| **Applicazione desktop** | Dashboard nativa per macOS, Linux e Windows                                             | Un client locale, nulla da ospitare       |
| **Docker all-in-one**    | Dashboard, API, MongoDB, Redis e MinIO in un **singolo contenitore**                    | Test e installazioni su singola macchina  |
| **Docker Compose**       | **Un contenitore per servizio**, ogni archivio dati sostituibile con un'offerta gestita | Produzione, scalabilità, database gestiti |

## Table of Contents

<TOC/>

## Immagini e pacchetti pubblicati

| Artifact             | Docker Hub                                                                | GHCR mirror                                | Contents                                                                         |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| All-in-one container | [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all)           | `ghcr.io/aymericzip/intlayer/cms-all`      | app + backend + MongoDB 8 + Redis + MinIO + Chromium                             |
| Dashboard (frontend) | [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend) | `ghcr.io/aymericzip/intlayer/cms-frontend` | TanStack Start dashboard on Bun                                                  |
| API (backend)        | [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend)   | `ghcr.io/aymericzip/intlayer/cms-backend`  | Fastify REST API on Bun + Chromium                                               |
| Desktop app          | [GitHub releases](https://github.com/aymericzip/intlayer/releases/latest) | n/a                                        | `.dmg` (macOS), `.deb` / `.rpm` / `.AppImage` (Linux), `.exe` / `.msi` (Windows) |

Tutte e tre le immagini sono compilate dallo stesso [`docker/selfhost/Dockerfile`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost) e pubblicate a ogni rilascio. Lo stack Compose scarica anche le immagini ufficiali `mongo:8`, `redis:8-alpine` e `quay.io/minio/minio`.

## Configurazione

Il programma di installazione chiede quale configurazione desideri, controlla i prerequisiti (proponendo di installare Docker), scrive il file di ambiente con i segreti già generati e scarica le immagini. Non avvia nulla autonomamente: le modalità Docker richiedono prima un mailer, quindi termina stampando il comando da eseguire. Rieseguirlo è sicuro: un file di ambiente esistente non viene mai sovrascritto, fungendo anche da percorso di aggiornamento.

<Tabs group="mode">
<Tab label="Applicazione desktop" value="desktop">

La dashboard di Intlayer come applicazione nativa, creata con Tauri. Effettua l'accesso a Intlayer Cloud (`https://app.intlayer.org`), quindi non c'è nulla da ospitare. È la scelta giusta quando si desidera un client locale anziché una scheda del browser.

### Installazione

Il programma di installazione scarica il pacchetto per il sistema operativo e la CPU in uso, quindi lo apre (macOS), lo installa (`dpkg` / `rpm` su Linux) o avvia la procedura guidata (Windows). Puoi anche scaricarlo manualmente dalla [pagina dei rilasci](https://github.com/aymericzip/intlayer/releases/latest).

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode desktop
```

</Tab>
<Tab label="Windows" value="windows">

In PowerShell:

```powershell
$env:INTLAYER_MODE = "desktop"; irm https://intlayer.org/install.ps1 | iex
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

```bash
npx intlayer init infra --mode desktop
```

</Tab>
</Tabs>

### Requisiti

- **Node.js**: l'applicazione incorpora il server della dashboard e lo avvia con il binario `node` della macchina. Installalo da [nodejs.org](https://nodejs.org) se l'app non si avvia.

> La versione desktop pubblicata comunica con il backend Intlayer Cloud. Indirizzarla verso un backend auto-ospitato richiede di ricompilare l'app con `VITE_BACKEND_URL` impostato sulla tua API, vedi [Limitazioni](#limitations).

</Tab>
<Tab label="Docker all-in-one" value="docker">

Tutto viene eseguito all'interno del singolo contenitore `intlayer/cms-all`, supervisionato da [s6-overlay](https://github.com/just-containers/s6-overlay), con ciascun archivio dati persistito in un unico volume.

```
                ┌─────────────────────────────┐
 browser ──────▶ │  app  (TanStack Start)  :3000│ ──┐
 (localhost)    └─────────────────────────────┘   │ VITE_BACKEND_URL (baked at build)
                ┌─────────────────────────────┐   │
                │  backend (Fastify/Bun)  :3100│ ◀─┘
                └──────────────┬──────────────┘
          ┌──────────┬─────────┼──────────────┐
          ▼          ▼         ▼               ▼
      mongo:27017  redis:6379  minio:9000   Chromium
      /data/mongo  /data/redis /data/minio  (in-image)
      (1-node RS)              minio:9001
```

| Servizio    | Porta/e host                  | Scopo                                                            |
| ----------- | ----------------------------- | ---------------------------------------------------------------- |
| **app**     | `3000`                        | Dashboard (interfaccia utente CMS)                               |
| **backend** | `3100`                        | REST API (endpoint `/health`)                                    |
| **mongo**   | interno                       | MongoDB 8, replica set a nodo singolo `rs0`                      |
| **redis**   | interno                       | Code di lavoro (BullMQ) e memorizzazione nella cache             |
| **minio**   | `9000` (S3), `9001` (console) | Archiviazione oggetti compatibile con S3 per avatar e screenshot |

L'ordine di avvio è regolato dalle dipendenze s6 (`mongod` → avvio replica-set, `minio` → creazione bucket, poi `backend`, quindi `app`), e i servizi si riavviano in caso di chiusura, garantendo il ripristino autonomo al primo avvio.

### Prerequisiti

- **Docker** ≥ 24: il programma di installazione offre di installarlo (tramite [get.docker.com](https://get.docker.com) su Linux, Homebrew su macOS). Su Windows, installa prima [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (backend WSL 2).
- Porte `3000`, `3100`, `9000` e `9001` libere sull'host. MinIO `9000` deve rimanere raggiungibile dal browser, che carica le risorse direttamente da `S3_PUBLIC_URL`.
- Un mailer: una chiave API [Resend](https://resend.com) o un relay SMTP.

### 1. Installazione

Scrive `./intlayer.env` con `BETTER_AUTH_SECRET` e `S3_SECRET_ACCESS_KEY` generati, e scarica `intlayer/cms-all:latest`.

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode docker
```

</Tab>
<Tab label="Windows" value="windows">

In PowerShell:

```powershell
$env:INTLAYER_MODE = "docker"; irm https://intlayer.org/install.ps1 | iex
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

```bash
npx intlayer init infra --mode docker
```

</Tab>
</Tabs>

### 2. Configurare un mailer

Apri `intlayer.env` e inserisci Resend **oppure** SMTP (dettagli in [Mailer globale](#global-mailer)):

```sh fileName="intlayer.env"
# Option A: Resend
RESEND_API_KEY=<your-resend-key>

# Option B: SMTP (takes over from Resend as soon as MAIL_SMTP_HOST is set)
MAIL_SMTP_HOST=smtp.example.com
MAIL_SMTP_PORT=587
MAIL_SMTP_USER=<user>
MAIL_SMTP_PASSWORD=<password>
MAIL_FROM=Intlayer <no-reply@example.com>
```

### 3. Avviare

Questo è il comando stampato dal programma di installazione:

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
docker run -d --name intlayer \
  --restart unless-stopped \
  -p 3000:3000 -p 3100:3100 -p 9000:9000 -p 9001:9001 \
  -v intlayer-data:/data \
  --env-file ./intlayer.env \
  intlayer/cms-all:latest
```

</Tab>
<Tab label="Windows" value="windows">

```powershell
docker run -d --name intlayer `
  --restart unless-stopped `
  -p 3000:3000 -p 3100:3100 -p 9000:9000 -p 9001:9001 `
  -v intlayer-data:/data `
  --env-file ./intlayer.env `
  intlayer/cms-all:latest
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

La CLI esegue il programma di installazione, che stampa il comando `docker run …` mostrato nelle altre schede. Copialo nel tuo terminale una volta configurato il mailer.

</Tab>
</Tabs>

Apri **http://localhost:3000** e segui la [Configurazione iniziale](#first-run-setup). Il primo avvio inizializza il replica set e il bucket, quindi attendi un minuto.

### Backup e aggiornamento

Tutto lo stato risiede nel volume `intlayer-data` (`/data/mongo`, `/data/redis`, `/data/minio`).

```sh
# Backup (stop the container first so MongoDB's files are consistent)
docker stop intlayer
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar czf /backup/intlayer-data.tar.gz /data
docker start intlayer

# Restore
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar xzf /backup/intlayer-data.tar.gz -C /
```

Per aggiornare, riesegui l'installatore (scarica l'immagine più recente e mantiene `intlayer.env`), quindi esegui `docker rm -f intlayer` e rilancia il comando di avvio. Per utilizzare un MongoDB gestito anziché quello integrato, imposta `MONGODB_URI` in `intlayer.env`.

</Tab>
<Tab label="Docker Compose" value="compose">

Un contenitore per servizio su una rete privata Compose. La dashboard e l'API utilizzano le immagini pubblicate `intlayer/cms-frontend` e `intlayer/cms-backend`; gli archivi dati utilizzano le immagini ufficiali `mongo`, `redis` e `minio`.

```
                ┌───────────────────┐
 browser ──────▶ │  app        :3000 │ ── SSR ──▶ http://backend:3100
 (localhost)    └───────────────────┘
                ┌───────────────────┐
 browser ──────▶ │  backend    :3100 │
 (localhost)    └─────────┬─────────┘
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
     mongo:27017     redis:6379      minio:9000 ◀── browser (assets)
     (1-node RS)                     minio:9001
```

| Servizio     | Immagine                | Ruolo                                                                   |
| ------------ | ----------------------- | ----------------------------------------------------------------------- |
| `app`        | `intlayer/cms-frontend` | Dashboard su `:3000`; attende che il backend sia integro                |
| `backend`    | `intlayer/cms-backend`  | API su `:3100` con Chromium; attende Mongo, Redis e il bucket MinIO     |
| `mongo`      | `mongo:8`               | Replica set a nodo singolo `rs0`, inizializzato dal proprio healthcheck |
| `redis`      | `redis:8-alpine`        | Code e cache, persistenza append-only                                   |
| `minio`      | `quay.io/minio/minio`   | Archiviazione S3 su `:9000`, console su `:9001`                         |
| `minio-init` | `quay.io/minio/mc`      | Attività una tantum: crea il bucket e la policy di download anonimo     |

I dati sono conservati nei volumi `intlayer_mongo-data`, `intlayer_redis-data` e `intlayer_minio-data`. Il collegamento dei servizi (`MONGODB_URI`, `REDIS_URL`, `S3_ENDPOINT`, l'URL interno del backend usato dal rendering lato server) è fissato nel file compose e ha la precedenza su `.env`, che include solo i segreti e le integrazioni opzionali.

### Prerequisiti

- **Docker** ≥ 24 con il plugin Compose: l'installatore offre di installarlo su Linux e macOS. Su Windows, installa prima [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (backend WSL 2).
- Porte `3000`, `3100`, `9000` e `9001` libere sull'host.
- Un mailer: una chiave API [Resend](https://resend.com) o un relay SMTP.

### 1. Installazione

Scrive `docker-compose.yml` e un `.env` con i segreti generati in `./intlayer/`, e scarica le immagini.

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode compose
```

Or by hand:

```sh
mkdir intlayer && cd intlayer
curl -fsSLO https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/docker-compose.yml
curl -fsSL  https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/.env.template -o .env
# fill in BETTER_AUTH_SECRET and S3_SECRET_ACCESS_KEY (openssl rand -hex 32)
```

</Tab>
<Tab label="Windows" value="windows">

In PowerShell:

```powershell
$env:INTLAYER_MODE = "compose"; irm https://intlayer.org/install.ps1 | iex
```

Or by hand:

```powershell
mkdir intlayer; cd intlayer
irm https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/docker-compose.yml -OutFile docker-compose.yml
irm https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/.env.template -OutFile .env
# fill in BETTER_AUTH_SECRET and S3_SECRET_ACCESS_KEY
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

```bash
npx intlayer init infra --mode compose
```

</Tab>
</Tabs>

### 2. Configurare un mailer

Inserisci Resend **oppure** SMTP in `intlayer/.env`, esattamente come per il container all-in-one (vedi [Mailer globale](#global-mailer)).

### 3. Avviare

```sh
cd intlayer && docker compose up -d
```

Apri **http://localhost:3000** e segui la [Configurazione iniziale](#first-run-setup).

### Datastore gestiti

Elimina dal file compose il servizio che stai sostituendo (insieme alla sua voce in `depends_on` in `backend`), quindi sovrascrivi la variabile corrispondente:

```yaml fileName="docker-compose.yml"
services:
  backend:
    environment:
      MONGODB_URI: mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/intlayer
      REDIS_URL: rediss://default:password@redis.example.com:6380
      S3_ENDPOINT: https://s3.eu-west-1.amazonaws.com
      S3_PUBLIC_URL: https://intlayer-assets.s3.eu-west-1.amazonaws.com
```

`S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` / `S3_BUCKET_NAME` mantengono il loro significato con qualsiasi provider compatibile con S3.

### Scalabilità

`app` e `backend` sono privi di stato (stateless). Dietro un bilanciatore di carico, `docker compose up -d --scale backend=3` funziona dopo aver rimosso le mappature fisse delle porte host e quando il proxy indirizza i servizi per nome. I processi in background sono coordinati tramite Redis (BullMQ), consentendo a più repliche del backend di condividere la coda in sicurezza.

### Compilazione dai sorgenti

Da un clone del repository, una sovrascrittura commuta i due servizi Intlayer da `image:` a `build:`:

```sh
cd docker/selfhost
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

Questo è anche il modo in cui produrre immagini per un dominio personalizzato: passa i valori `VITE_*` come argomenti di build (vedi [Limitazioni](#limitations)).

### Backup e aggiornamento

```sh
# Backup one volume (repeat for intlayer_redis-data and intlayer_minio-data)
docker compose stop
docker run --rm -v intlayer_mongo-data:/data -v "$(pwd)":/backup busybox tar czf /backup/mongo-data.tar.gz /data
docker compose start

# Upgrade, volumes are kept
docker compose pull && docker compose up -d
```

</Tab>
</Tabs>

### Impostazioni del programma di installazione

Senza `--mode` (o `INTLAYER_MODE`), il programma di installazione mostra un menu: `desktop`, `docker` (all-in-one) o `compose`. Legge anche alcune variabili di ambiente. Poiché viene reindirizzato nella shell, passale alla shell anziché a `curl`:

```sh
curl -fsSL https://intlayer.org/install.sh | INTLAYER_COMPOSE_DIR=./cms sh -s -- --mode compose
```

```powershell
$env:INTLAYER_MODE = "compose"; $env:INTLAYER_COMPOSE_DIR = ".\cms"; irm https://intlayer.org/install.ps1 | iex
```

| Variable                  | Default                   | Applies to | Description                                                |
| ------------------------- | ------------------------- | ---------- | ---------------------------------------------------------- |
| `INTLAYER_MODE`           | _(asked)_                 | all        | `desktop`, `docker` or `compose`, same as `--mode`         |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop    | Where the app installer is saved                           |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker     | All-in-one image to pull                                   |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker     | Where to write the environment file                        |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker     | Container name                                             |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker     | Named volume mounted at `/data`                            |
| `INTLAYER_APP_PORT`       | `3000`                    | docker     | Host port for the dashboard                                |
| `INTLAYER_API_PORT`       | `3100`                    | docker     | Host port for the API                                      |
| `INTLAYER_S3_PORT`        | `9000`                    | docker     | Host port for the MinIO S3 API                             |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker     | Host port for the MinIO console                            |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose    | Where `docker-compose.yml` and `.env` are written          |
| `INTLAYER_SELFHOST_REF`   | `main`                    | both       | Git ref the compose file and env template are fetched from |

> Le variabili di porta modificano solo il lato **host** della mappatura. Le immagini pubblicate includono `http://localhost:3000`, `http://localhost:3100` e `http://localhost:9000` compilati nel pacchetto della dashboard, quindi mantieni i valori predefiniti a meno che non crei le tue immagini, vedi [Limitazioni](#limitations).

## Configurazione iniziale

Su una nuova istanza (database vuoto), l'apertura della dashboard reindirizza alla pagina **`/init`**:

1. Crea il primo account. Poiché la raccolta degli utenti è vuota, questo account viene automaticamente promosso a **super admin**.
2. Viene inviata un'email di verifica tramite Resend o il relay SMTP. La verifica dell'email è **obbligatoria**, motivo per cui un gestore di posta deve essere configurato prima di iniziare.
3. Fai clic sul link nell'email, quindi accedi.

Una volta che esiste un amministratore, `/init` reindirizza alla pagina di accesso standard.

## Variabili di ambiente

Entrambe le modalità Docker leggono lo stesso file (`intlayer.env` per il container, `.env` per Compose), generato da [`docker/selfhost/.env.template`](https://github.com/aymericzip/intlayer/blob/main/docker/selfhost/.env.template).

### Richieste

| Variable               | Example       | Description                                                                                                                                   |
| ---------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | _(generated)_ | 32-byte secret for session signing                                                                                                            |
| `S3_SECRET_ACCESS_KEY` | _(generated)_ | Secret for the bundled MinIO                                                                                                                  |
| `RESEND_API_KEY`       | _(your key)_  | Transactional email via Resend. Required for first-run setup unless an SMTP relay is configured instead (see [Global mailer](#global-mailer)) |

### Fissate dal deployment

These are set by the image (all-in-one) or by the compose file, and only need overriding for a non-standard topology.

| Variable           | All-in-one                                          | Docker Compose                   | Description                                                                   |
| ------------------ | --------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------- |
| `PORT`             | `3100`                                              | `3100`                           | Backend listening port                                                        |
| `APP_URL`          | `http://localhost:3000`                             | `http://localhost:3000`          | Public URL of the dashboard                                                   |
| `BACKEND_URL`      | `http://localhost:3100`                             | `http://localhost:3100`          | Public URL of the backend API                                                 |
| `DOMAIN`           | `localhost`                                         | `localhost`                      | Cookie domain                                                                 |
| `SELF_HOSTED`      | `true`                                              | `true`                           | Disables the cloud-only API endpoints (billing, subscriptions, marketplace)   |
| `MONGODB_URI`      | `mongodb://127.0.0.1:27017/intlayer?replicaSet=rs0` | `mongodb://mongo:27017/…`        | MongoDB connection string, any `mongodb://` or `mongodb+srv://` cluster works |
| `REDIS_URL`        | `redis://127.0.0.1:6379`                            | `redis://redis:6379`             | Redis                                                                         |
| `S3_ENDPOINT`      | `http://127.0.0.1:9000`                             | `http://minio:9000`              | MinIO (server-to-server)                                                      |
| `S3_PUBLIC_URL`    | `http://localhost:9000/intlayer`                    | `http://localhost:9000/intlayer` | Public URL for browser asset loading                                          |
| `S3_BUCKET_NAME`   | `intlayer`                                          | `intlayer`                       | Bucket name                                                                   |
| `S3_ACCESS_KEY_ID` | `intlayer`                                          | `intlayer`                       | MinIO access key                                                              |

Il servizio `app` di Compose riceve inoltre `INTLAYER_BACKEND_INTERNAL_URL=http://backend:3100`: il browser raggiunge l'API su `localhost:3100`, ma il rendering lato server viene eseguito all'interno della rete Compose e deve usare il nome del servizio.

### Opzionali (le funzionalità degradano dolcemente se assenti)

| Variable                                         | Feature                                   |
| ------------------------------------------------ | ----------------------------------------- |
| `OPENAI_API_KEY`                                 | AI-assisted translation and content audit |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`       | GitHub OAuth login                        |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`       | Google OAuth login                        |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`       | GitLab OAuth login                        |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | Microsoft OAuth login                     |

### Mailer globale

Ogni email transazionale, comprese le email esterne all'organizzazione come reimpostazioni password e link magici, passa attraverso uno dei due trasporti globali:

- **Resend**, usando `RESEND_API_KEY`.
- **SMTP**, usando le variabili `MAIL_SMTP_*`. Non appena `MAIL_SMTP_HOST` viene impostato, viene usato SMTP e `RESEND_API_KEY` viene ignorato.

`MAIL_PROVIDER` serve solo a forzare un trasporto quando entrambi sono configurati (ad esempio `MAIL_PROVIDER=resend` per mantenere Resend pur in presenza di un host SMTP).

| Variable             | Example                        | Description                                                                  |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Sender header for either transport. Accepts a bare address or `Name <email>` |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host. Setting it selects the SMTP transport                             |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (defaults to `587`)                                                |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. Set `true` for port `465`                                      |
| `MAIL_SMTP_USER`     | _(your user)_                  | SMTP username (optional; omit for unauthenticated relays)                    |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | SMTP password                                                                |
| `MAIL_PROVIDER`      | `resend`                       | Optional override: `smtp` or `resend`. Leave unset to auto-select            |

> Precedenza: il mailer di un'organizzazione (configurato dalla dashboard **Organizzazione**) ha la precedenza sul mailer globale, che a sua volta ha la precedenza sulla chiave predefinita di Resend.

## Connettere il tuo progetto Intlayer

Una volta avviato lo stack, fai puntare il tuo progetto al backend e alla dashboard auto-ospitati invece di `intlayer.org`.

### Configurazione del progetto

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * URL of the self-hosted CMS dashboard.
     * Default: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // e.g. http://localhost:3000

    /**
     * URL of the self-hosted backend API.
     * Default: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // e.g. http://localhost:3100
  },
};

export default config;
```

Set the environment variables in your project's `.env`:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

Crea credenziali di accesso nella dashboard auto-ospitata in **Progetti → Chiavi di accesso** all'indirizzo `http://localhost:3000/projects`.

### SDK `@intlayer/api`

Quando si utilizza l'SDK `@intlayer/api` a livello di codice, passare `backendURL` in modo esplicito:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cms = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    backendURL: process.env.INTLAYER_BACKEND_URL, // http://localhost:3100
  },
});

const { data: dictionaries } = await dictionaryEndpoint(cms).getDictionaries();
```

## Limitazioni

- **Nessun dominio personalizzato e nessuna rimappatura delle porte.** Tutti gli URL `VITE_*` visibili dal browser sono incorporati nella dashboard in fase di compilazione e le immagini pubblicate (nonché l'app desktop) vengono fornite con i valori di `localhost` / Intlayer Cloud. La dashboard deve essere accessibile su `http://localhost:3000`, l'API su `:3100` e MinIO su `:9000`. Servirla su un dominio pubblico, o puntare l'app desktop a un backend auto-ospitato, richiede la ricompilazione con gli URL di destinazione integrati (`--build-arg VITE_BACKEND_URL=… VITE_SITE_URL=… VITE_DOMAIN=…` su `docker/selfhost/Dockerfile`, o tramite `docker-compose.build.yml`) e non è supportato nativamente.
- **La posta richiede un mailer funzionante.** La configurazione iniziale impone la verifica dell'email, pertanto è necessario configurare `RESEND_API_KEY` oppure un [relay SMTP](#global-mailer) (`MAIL_SMTP_*`). Dopo l'accesso del primo amministratore, ciascuna organizzazione può configurare il proprio mailer SMTP o Resend dalla dashboard.
- **L'applicazione desktop richiede Node.js** sulla macchina per avviare il relativo server incorporato.

## Link utili

- [Documentazione Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)
- [Riferimento di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)
- [SDK CMS: `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Rilasci dell'applicazione desktop](https://github.com/aymericzip/intlayer/releases/latest)
- Docker Hub: [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all), [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend), [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend), con mirror su GHCR sotto `ghcr.io/aymericzip/intlayer/`
- [`docker/selfhost/`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost): Dockerfile, `docker-compose.yml` e `.env.template`
