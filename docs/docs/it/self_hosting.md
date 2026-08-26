---
createdAt: 2026-06-30
updatedAt: 2026-06-30
title: Self-Hosting Intlayer
description: Esegui un'istanza Intlayer completa sulla tua infrastruttura con un singolo comando. Non è richiesto alcun account Intlayer Cloud.
keywords:
  - Self-Hosting
  - Docker
  - Docker Compose
  - Intlayer
  - CMS
  - Installation
  - Infrastructure
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Self-Hosting Intlayer

Intlayer può essere eseguito interamente sulla tua infrastruttura — non è richiesto alcun account Intlayer Cloud. Un singolo comando avvia uno stack pronto per la produzione:

Un comando installa tutto:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

L'installer scarica un `docker-compose.yml` e un `.env`, genera automaticamente i segreti richiesti e avvia tutti i container con `docker compose up -d`.

L'unica dipendenza esterna è **MongoDB**: il backend si connette a un cluster MongoDB **Atlas**, che fornisci tu. Tutto il resto viene eseguito all'interno del container.

## Indice dei Contenuti

<TOC/>

---

## Architettura

```
                ┌─────────────────────────────┐
 browser ──────▶ │  app  (TanStack Start)  :3000│ ──┐
                └─────────────────────────────┘   │ VITE_BACKEND_URL
                ┌─────────────────────────────┐   │
                │  backend (Fastify/Bun)  :3100│ ◀─┘
                └──────────────┬──────────────┘
          ┌──────────┬─────────┼──────────┬───────────┐
          ▼          ▼         ▼          ▼           ▼
     mongo:27017  redis:6379  minio:9000  mailpit:1025  Chromium
     (1-node RS)             (S3 API)     (SMTP)        (in-image)
                             minio:9001   mailpit:8025
                             (console)    (web UI)
```

Chromium (utilizzato per la generazione di screenshot con Puppeteer) è incluso nell'immagine del backend — non è necessario un container separato.

---

## Prerequisiti

- **Docker** ≥ 24 e **Docker Compose** ≥ v2. Se uno dei due manca, l'installer stampa il link di installazione ed esce.
- Porte `3000`, `3100`, `8025`, `9000` e `9001` disponibili sull'host.
- Un host Linux o macOS (o WSL2 su Windows).

Tutto il resto — Bun, Redis, MinIO, Chromium — è incluso nell'immagine.

---

## Quick start

### 1. Eseguire l'installer

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Verifica che Docker sia installato e in esecuzione, scrive `./intlayer.env` con `BETTER_AUTH_SECRET` e `S3_SECRET_ACCESS_KEY` già generati, e scarica l'immagine. Non avvia il container — il backend non può avviarsi senza le credenziali del database.

Rieseguire l'installer è sicuro: un `intlayer.env` esistente non viene mai sovrascritto, quindi funge anche da percorso di aggiornamento.

### 2. Compila le tue credenziali

Apri `intlayer.env` e completa i valori contrassegnati come `TODO`:

```sh fileName="intlayer.env"
DB_ID=<atlas-user>
DB_MDP=<atlas-password>
DB_CLUSTER=<cluster>.xxxxx.mongodb.net
RESEND_API_KEY=<your-resend-key>
```

Il file contiene anche blocchi commentati per le funzionalità opzionali — [SMTP mailer](#global-mailer), `OPENAI_API_KEY` e i provider OAuth. Decommentali secondo le tue necessità.

> Il file viene letto da `docker run --env-file`, che non rimuove le virgolette e tratta tutto ciò che segue `=` come valore. Scrivi valori senza virgolette e mantieni i commenti su righe separate.

### 3. Avvia il container

Questo è il comando che l'installer stampa quando termina:

```sh
docker run -d --name intlayer \
  --restart unless-stopped \
  -p 3000:3000 \
  -p 3100:3100 \
  -p 9000:9000 \
  -p 9001:9001 \
  -v intlayer-data:/data \
  --env-file ./intlayer.env \
  ghcr.io/aymericzip/intlayer-selfhost:latest
```

Quindi apri **http://localhost:3000**. Il primo avvio inizializza i datastore, quindi concedi un minuto.

> La dashboard è servita su `localhost`. Vedi [Limitazioni](#limitations) — i domini personalizzati non sono supportati dall'immagine pubblicata.

### Impostazioni del installer

Il installer legge alcune variabili d'ambiente. Poiché viene piped in `sh`, passale alla shell piuttosto che a `curl`:

```sh
curl -fsSL https://intlayer.org/install.sh | INTLAYER_ENV_FILE=./config/intlayer.env sh
```

| Variable                  | Default                                       | Description                          |
| ------------------------- | --------------------------------------------- | ------------------------------------ |
| `INTLAYER_IMAGE`          | `ghcr.io/aymericzip/intlayer-selfhost:latest` | Immagine da scaricare                |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`                              | Dove scrivere il file env            |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                                    | Nome del container                   |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`                               | Volume denominato montato su `/data` |
| `INTLAYER_APP_PORT`       | `3000`                                        | Porta host per il dashboard          |
| `INTLAYER_API_PORT`       | `3100`                                        | Porta host per l'API                 |
| `INTLAYER_S3_PORT`        | `9000`                                        | Porta host per l'API S3 MinIO        |
| `INTLAYER_CONSOLE_PORT`   | `9001`                                        | Porta host per la console MinIO      |

> Le quattro variabili di porta cambiano solo il lato **host** del mapping stampato nel comando `docker run`. L'immagine pubblicata ha `http://localhost:3000`, `http://localhost:3100` e `http://localhost:9000` compilati nel bundle dashboard al momento della compilazione, quindi rimappare i porta lascia il browser che punta alle porte vecchie. Mantieni i valori predefiniti a meno che non stai costruendo la tua immagine — vedi [Limitations](#limitations).

---

## Avvio rapido

Cosa fa l'installer:

1.  Verifica che `docker` e `docker compose` siano presenti.
2.  Scarica `docker-compose.yml` e `.env.example` in `./intlayer/`.
3.  Se non esiste un `.env`, copia l'esempio e genera segreti casuali per `BETTER_AUTH_SECRET`, `S3_ACCESS_KEY_ID` e `S3_SECRET_ACCESS_KEY` tramite `openssl rand`.
4.  Esegue `docker compose pull` + `docker compose up -d`.
5.  Stampa gli URL: dashboard `:3000`, API `:3100`, interfaccia utente email `:8025`, console MinIO `:9001`.

Dopo che lo stack è attivo, apri **http://localhost:3000** e crea il tuo primo account.

---

## Servizi

| Servizio    | Immagine                             | Porta/e host                   | Scopo                                                         |
| ----------- | ------------------------------------ | ------------------------------ | ------------------------------------------------------------- |
| **app**     | built from `apps/app/Dockerfile`     | `3000`                         | Dashboard TanStack Start (UI del CMS)                         |
| **backend** | built from `apps/backend/Dockerfile` | `3100`                         | API REST Fastify (endpoint `/health`)                         |
| **mongo**   | `mongo:7`                            | internal                       | Replica set a nodo singolo (`rs0`)                            |
| **redis**   | `redis:7-alpine`                     | internal                       | Code di lavoro (BullMQ) e caching (ioredis)                   |
| **minio**   | `minio/minio`                        | `9000` (S3), `9001` (console)  | Storage di oggetti compatibile con S3 per avatar e screenshot |
| **mailpit** | `axllent/mailpit`                    | `1025` (SMTP), `8025` (web UI) | Sink di email transazionali locale                            |

> La porta `9000` di MinIO deve essere raggiungibile dal browser perché gli asset caricati (avatar, screenshot) vengono caricati direttamente da `S3_PUBLIC_URL=http://localhost:9000/intlayer`.

---

## Variabili d'ambiente

### Obbligatorio

| Variabile              | Esempio                      | Descrizione                                                                                                                                                         |
| ---------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DB_ID`                | `intlayer`                   | Utente MongoDB Atlas                                                                                                                                                |
| `DB_MDP`               | _(la tua password)_          | Password MongoDB Atlas                                                                                                                                              |
| `DB_CLUSTER`           | `cluster0.xxxxx.mongodb.net` | Host del cluster MongoDB Atlas (utilizzato nell'URI `mongodb+srv://`)                                                                                               |
| `BETTER_AUTH_SECRET`   | _(generato)_                 | Secret a 32 byte per la firma delle sessioni                                                                                                                        |
| `S3_SECRET_ACCESS_KEY` | _(generato)_                 | Secret per il MinIO bundle                                                                                                                                          |
| `RESEND_API_KEY`       | _(la tua chiave)_            | Email transazionale via Resend. Obbligatorio per la configurazione iniziale a meno che non configuri un mailer SMTP globale (vedi [Mailer globale](#global-mailer)) |

### Obbligatorie (generate automaticamente o richieste)

| Variabile              | Esempio                                         | Descrizione                                                             |
| ---------------------- | ----------------------------------------------- | ----------------------------------------------------------------------- |
| `NODE_ENV`             | `production`                                    | Ambiente di runtime                                                     |
| `PORT`                 | `3100`                                          | Porta di ascolto del backend                                            |
| `BACKEND_URL`          | `http://localhost:3100`                         | URL pubblico dell'API del backend                                       |
| `APP_URL`              | `http://localhost:3000`                         | URL pubblico della dashboard                                            |
| `DOMAIN`               | `localhost`                                     | Dominio del cookie                                                      |
| `MONGODB_URI`          | `mongodb://mongo:27017/intlayer?replicaSet=rs0` | URI di connessione completo di MongoDB                                  |
| `REDIS_URL`            | `redis://redis:6379`                            | URL di connessione di Redis                                             |
| `BETTER_AUTH_SECRET`   | _(generated)_                                   | Segreto di 32 byte per la firma della sessione                          |
| `MAIL_PROVIDER`        | `smtp`                                          | Trasporto email: `smtp` o `resend`                                      |
| `MAIL_SMTP_HOST`       | `mailpit`                                       | Hostname SMTP (nome del container Mailpit)                              |
| `MAIL_SMTP_PORT`       | `1025`                                          | Porta SMTP                                                              |
| `MAIL_FROM`            | `Intlayer <no-reply@localhost>`                 | Indirizzo del mittente                                                  |
| `S3_ENDPOINT`          | `http://minio:9000`                             | Endpoint compatibile con S3                                             |
| `S3_PUBLIC_URL`        | `http://localhost:9000/intlayer`                | URL pubblico per il caricamento degli asset del browser                 |
| `S3_BUCKET_NAME`       | `intlayer`                                      | Nome del bucket                                                         |
| `S3_ACCESS_KEY_ID`     | _(generated)_                                   | Chiave di accesso MinIO                                                 |
| `S3_SECRET_ACCESS_KEY` | _(generated)_                                   | Chiave segreta MinIO                                                    |
| `VITE_BACKEND_URL`     | `http://localhost:3100`                         | URL del backend integrato nella dashboard al momento della compilazione |
| `VITE_DOMAIN`          | `localhost`                                     | Dominio integrato nella dashboard al momento della compilazione         |

### Opzionali (le funzionalità degradano elegantemente se assenti)

| Variabile                                                | Funzionalità                                                              |
| -------------------------------------------------------- | ------------------------------------------------------------------------- |
| `OPENAI_API_KEY`                                         | Traduzione assistita da AI e audit del contenuto                          |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_*` | Gestione della fatturazione e degli abbonamenti                           |
| `RESEND_API_KEY`                                         | Email transazionali tramite Resend (sostituisce Mailpit quando impostato) |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`               | Accesso OAuth di GitHub                                                   |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`               | Accesso OAuth di Google                                                   |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`               | Accesso OAuth di GitLab                                                   |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`         | Accesso OAuth di Microsoft                                                |
| `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`           | Accesso OAuth di LinkedIn                                                 |
| `ATLASSIAN_CLIENT_ID`, `ATLASSIAN_CLIENT_SECRET`         | Accesso OAuth di Atlassian                                                |

### Mailer globale

Per impostazione predefinita, tutti i messaggi email transazionali vengono inviati tramite Resend utilizzando `RESEND_API_KEY`. I deploy self-hosted possono invece instradare **ogni** email — incluse le email non organizzative come i reset delle password e i magic link — attraverso un mailer globale configurato con variabili di ambiente.

Imposta `MAIL_PROVIDER` per attivarlo. Quando non impostato, viene utilizzato il mailer predefinito di Resend.

| Variabile            | Esempio                        | Descrizione                                                                      |
| -------------------- | ------------------------------ | -------------------------------------------------------------------------------- |
| `MAIL_PROVIDER`      | `smtp`                         | Trasporto globale: `smtp` o `resend`. Lascia non impostato per usare i default   |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Intestazione del mittente. Accetta un indirizzo bare o il formato `Name <email>` |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | Host SMTP (obbligatorio quando `MAIL_PROVIDER=smtp`)                             |
| `MAIL_SMTP_PORT`     | `587`                          | Porta SMTP (per impostazione predefinita `587`)                                  |
| `MAIL_SMTP_SECURE`   | `false`                        | TLS implicito. Imposta `true` per la porta `465`                                 |
| `MAIL_SMTP_USER`     | _(il tuo utente)_              | Nome utente SMTP (opzionale; ometti per relay non autenticati)                   |
| `MAIL_SMTP_PASSWORD` | _(la tua password)_            | Password SMTP                                                                    |

> Precedenza: il mailer personalizzato di un'organizzazione (configurato dal dashboard **Organization**) ha priorità rispetto al mailer globale, che a sua volta ha priorità rispetto alla chiave Resend predefinita.

---

## Collegamento del tuo progetto Intlayer

Una volta che lo stack è in esecuzione, punta il tuo progetto al backend e alla dashboard self-hosted invece di `intlayer.org`.

### Configurazione del progetto

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * URL della dashboard CMS self-hosted.
     * Predefinito: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // e.g. http://localhost:3000

    /**
     * URL dell'API del backend self-hosted.
     * Predefinito: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // e.g. http://localhost:3100
  },
};

export default config;
```

Imposta le variabili d'ambiente nel `.env` del tuo progetto:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

Crea le credenziali di accesso nella tua dashboard self-hosted sotto **Progetti → Chiavi di accesso** all'indirizzo `http://localhost:3000/projects`.

### SDK `@intlayer/api`

Quando si utilizza l'SDK `@intlayer/api` in modo programmatico, passa `backendURL` esplicitamente:

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

---

## Aggiornamento

Questo scarica le immagini più recenti e riavvia i container con `docker compose pull && docker compose up -d`. I volumi esistenti (`mongo-data`, `redis-data`, `minio-data`) vengono preservati — nessuna perdita di dati.

```sh
docker compose pull
docker compose up -d
```

---

## Backup e ripristino

Tutti i dati persistenti risiedono in tre volumi Docker nominati.

### Backup

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/mongo-data.tar.gz /data

docker run --rm \
  -v intlayer_redis-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/redis-data.tar.gz /data

docker run --rm \
  -v intlayer_minio-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/minio-data.tar.gz /data
```

### Ripristino

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar xzf /backup/mongo-data.tar.gz -C /

# Ripetere per redis-data e minio-data
```

---

## Limitazioni

- **MongoDB deve essere esterno (Atlas).** Il backend si connette solo su `mongodb+srv://` (costruito da `DB_ID` / `DB_MDP` / `DB_CLUSTER`), quindi un semplice `mongodb://host:27017` — incluso il `mongod` incluso nel container — non può essere utilizzato. Fornire un cluster MongoDB Atlas.
- **Nessun dominio personalizzato.** Tutti gli URL `VITE_*` rivolti al browser sono inline nell'app al momento della compilazione, e l'immagine pubblicata contiene valori `localhost`. Il dashboard deve essere accessibile su `http://localhost:3000`; servarlo su un dominio pubblico richiederebbe di ricompilare l'immagine con gli URL di destinazione incorporati e non è supportato out of the box.
- **Email richiede un mailer funzionante.** La configurazione al primo avvio applica la verifica email, quindi `RESEND_API_KEY` o un [mailer SMTP globale](#global-mailer) (`MAIL_PROVIDER=smtp` + `MAIL_SMTP_*`) deve essere configurato. Dopo che il primo amministratore ha effettuato l'accesso, ogni organizzazione può anche configurare il proprio mailer SMTP o Resend dal dashboard.

---

## Risoluzione dei problemi

### Il backend si riavvia in loop al primo avvio

MongoDB e Redis devono essere sani prima che il backend si avvii. Il file compose utilizza `depends_on` con `condition: service_healthy`. Se vedi ripetuti riavvii del backend, verifica che i controlli di integrità di `mongo` e `redis` passino:

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

Cerca `MongoDB connection error` vicino alla parte superiore del log.

### La dashboard non riesce a raggiungere l'API

Verifica che `VITE_BACKEND_URL` corrisponda all'URL dove il backend è raggiungibile dal **browser** (non dalla rete Docker). Se hai cambiato la porta del backend o aggiunto un reverse proxy, ricostruisci l'immagine della dashboard:

### Bucket MinIO mancante

Se il servizio one-shot `minio-init` non è stato eseguito (o è stato eseguito prima che MinIO fosse pronto), crea il bucket manualmente:

```sh
docker compose run --rm minio-init
```

---

## Link utili

- [Documentazione Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)
- [Riferimento alla configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)
- [SDK CMS — `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md#programmatic-access-con-l-sdk-intlayerapi)
- [Docker Image (aymercizip/intlayer-selfhost)](https://hub.docker.com/repository/docker/aymercizip/intlayer-selfhost/general)
