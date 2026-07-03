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

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

L'installer scarica un `docker-compose.yml` e un `.env`, genera automaticamente i segreti richiesti e avvia tutti i container con `docker compose up -d`.

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

---

## Avvio rapido

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

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

Le porte interne (mongo, redis) non sono esposte all'host per impostazione predefinita.

> La porta `9000` di MinIO deve essere raggiungibile dal browser perché gli asset caricati (avatar, screenshot) vengono caricati direttamente da `S3_PUBLIC_URL=http://localhost:9000/intlayer`.

---

## Variabili d'ambiente

L'installer genera un `.env` pronto all'uso. La tabella seguente descrive ogni variabile.

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

Eseguire nuovamente l'installer su un'implementazione esistente esegue un aggiornamento rolling:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Questo scarica le immagini più recenti e riavvia i container con `docker compose pull && docker compose up -d`. I volumi esistenti (`mongo-data`, `redis-data`, `minio-data`) vengono preservati — nessuna perdita di dati.

Per aggiornare manualmente dalla directory `./intlayer/`:

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

## Utilizzo di un reverse proxy (Nginx / Caddy)

Per le implementazioni in produzione, posiziona un reverse proxy davanti ai container dell'app e del backend invece di esporli direttamente.

### Esempio Nginx

```nginx
server {
    listen 80;
    server_name cms.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3100;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Aggiorna le seguenti variabili `.env` per corrispondere ai tuoi domini pubblici:

```sh
BACKEND_URL=https://api.example.com
APP_URL=https://cms.example.com
DOMAIN=example.com
VITE_BACKEND_URL=https://api.example.com
VITE_DOMAIN=example.com
```

> Le variabili `VITE_*` sono integrate nell'immagine della dashboard al momento della compilazione. Se le modifichi dopo che l'immagine è stata compilata, devi ricostruire l'immagine `app` (`docker compose build app`) o utilizzare l'iniezione della configurazione a runtime.

---

## Risoluzione dei problemi

### Il backend si riavvia in loop al primo avvio

MongoDB e Redis devono essere sani prima che il backend si avvii. Il file compose utilizza `depends_on` con `condition: service_healthy`. Se vedi ripetuti riavvii del backend, verifica che i controlli di integrità di `mongo` e `redis` passino:

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

### La dashboard non riesce a raggiungere l'API

Verifica che `VITE_BACKEND_URL` corrisponda all'URL dove il backend è raggiungibile dal **browser** (non dalla rete Docker). Se hai cambiato la porta del backend o aggiunto un reverse proxy, ricostruisci l'immagine della dashboard:

```sh
docker compose build app
docker compose up -d app
```

### Email non inviate

Per impostazione predefinita, tutte le email in uscita vengono catturate da Mailpit. Apri `http://localhost:8025` per vedere i messaggi inviati. Per inviare email reali, imposta `MAIL_PROVIDER=resend` e `RESEND_API_KEY=<la-tua-chiave>` in `.env`, quindi riavvia il backend:

```sh
docker compose restart backend
```

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
