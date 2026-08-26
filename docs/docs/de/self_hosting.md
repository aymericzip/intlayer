---
createdAt: 2026-06-30
updatedAt: 2026-06-30
title: "Intlayer selbst hosten"
description: "Betreiben Sie eine komplette Intlayer-Instanz auf Ihrer eigenen Infrastruktur mit einem einzigen Befehl. Kein Intlayer Cloud-Konto erforderlich."
keywords:
  - Selbst-Hosting
  - Docker
  - Docker Compose
  - Intlayer
  - CMS
  - Installation
  - Infrastruktur
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Intlayer selbst hosten

Intlayer kann vollständig auf Ihrer eigenen Infrastruktur ausgeführt werden – kein Intlayer Cloud-Konto erforderlich. Ein einziger Befehl startet einen produktionsbereiten Stack:

Ein Befehl installiert alles:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Der Installer lädt eine `docker-compose.yml` und eine `.env` herunter, generiert automatisch die erforderlichen Secrets und startet alle Container mit `docker compose up -d`.

Die einzige externe Abhängigkeit ist **MongoDB**: Das Backend verbindet sich mit einem MongoDB **Atlas**-Cluster, den Sie bereitstellen. Alles andere läuft im Container.

## Inhaltsverzeichnis

<TOC/>

---

## Architektur

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

Chromium (wird für die Erzeugung von Puppeteer-Screenshots verwendet) ist im Backend-Image gebündelt – es wird kein separater Container benötigt.

---

## Voraussetzungen

- **Docker** ≥ 24 und **Docker Compose** ≥ v2. Fehlt eines davon, gibt der Installer den Installationslink aus und beendet sich.
- Ports `3000`, `3100`, `8025`, `9000` und `9001` auf dem Host verfügbar.
- Ein Linux- oder macOS-Host (oder WSL2 unter Windows).

Alles andere – Bun, Redis, MinIO, Chromium – wird im Image mitgeliefert.

---

## Schnelleinstieg

### 1. Run the installer

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Es überprüft, ob Docker installiert und aktiv ist, schreibt `./intlayer.env` mit bereits generierten `BETTER_AUTH_SECRET` und `S3_SECRET_ACCESS_KEY` und lädt das Image herunter. Es startet den Container nicht — das Backend kann ohne deine Datenbankanmeldeinformationen nicht booten.

Das erneute Ausführen des Installers ist sicher: Eine vorhandene `intlayer.env` wird nie überschrieben, daher fungiert sie auch als Upgrade-Pfad.

### 2. Füllen Sie Ihre Anmeldedaten aus

Öffnen Sie `intlayer.env` und vervollständigen Sie die mit `TODO` gekennzeichneten Werte:

```sh fileName="intlayer.env"
DB_ID=<atlas-user>
DB_MDP=<atlas-password>
DB_CLUSTER=<cluster>.xxxxx.mongodb.net
RESEND_API_KEY=<your-resend-key>
```

Die Datei enthält auch auskommentierte Blöcke für optionale Funktionen — [SMTP mailer](#global-mailer), `OPENAI_API_KEY` und die OAuth-Provider. Kommentieren Sie aus, was Sie benötigen.

> Die Datei wird von `docker run --env-file` gelesen, das Anführungszeichen nicht entfernt und alles nach `=` als Wert behandelt. Schreiben Sie nackte Werte und behalten Sie Kommentare auf eigenen Zeilen.

### 3. Container starten

Dies ist der Befehl, den das Installationsprogramm nach Abschluss ausdruckt:

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

Öffnen Sie dann **http://localhost:3000**. Der erste Start initialisiert die Datenspeicher, geben Sie ihm also eine Minute Zeit.

> Das Dashboard wird auf `localhost` bereitgestellt. Siehe [Limitations](#limitations) — benutzerdefinierte Domains werden vom veröffentlichten Image nicht unterstützt.

### Installer-Einstellungen

Das Installationsprogramm liest einige Umgebungsvariablen. Da diese in `sh` weitergeleitet werden, übergeben Sie sie der Shell anstelle von `curl`:

```sh
curl -fsSL https://intlayer.org/install.sh | INTLAYER_ENV_FILE=./config/intlayer.env sh
```

| Variable                  | Standard                                      | Beschreibung                         |
| ------------------------- | --------------------------------------------- | ------------------------------------ |
| `INTLAYER_IMAGE`          | `ghcr.io/aymericzip/intlayer-selfhost:latest` | Zu pullendes Image                   |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`                              | Wo die env-Datei geschrieben wird    |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                                    | Container-Name                       |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`                               | Named Volume eingebunden bei `/data` |
| `INTLAYER_APP_PORT`       | `3000`                                        | Host-Port für das Dashboard          |
| `INTLAYER_API_PORT`       | `3100`                                        | Host-Port für die API                |
| `INTLAYER_S3_PORT`        | `9000`                                        | Host-Port für die MinIO S3 API       |
| `INTLAYER_CONSOLE_PORT`   | `9001`                                        | Host-Port für die MinIO-Konsole      |

> Die vier Port-Variablen ändern nur die **Host**-Seite des Mappings, das im `docker run`-Befehl ausgegeben wird. Das veröffentlichte Image hat `http://localhost:3000`, `http://localhost:3100` und `http://localhost:9000` zur Build-Zeit in das Dashboard-Bundle kompiliert, daher führt deren Neuanordnung dazu, dass der Browser auf die alten Ports zeigt. Behalten Sie die Standardwerte bei, es sei denn, Sie erstellen Ihr eigenes Image — siehe [Einschränkungen](#limitations).

---

## Erstmalige Einrichtung

Bei einer frischen Instanz (leere Datenbank) leitet Sie das Öffnen des Dashboards zur Seite **`/init`** weiter:

1. Erstellen Sie das erste Konto. Da die users-Collection leer ist, wird dieses Konto automatisch zum **super admin** befördert.
2. Eine Verifizierungs-E-Mail wird gesendet (über Resend). E-Mail-Verifizierung ist **erforderlich** — deshalb muss `RESEND_API_KEY` vor dem Start gesetzt werden.
3. Klicken Sie auf den Link in der E-Mail und melden Sie sich an.

Sobald ein Admin existiert, leitet `/init` zur Standard-Anmeldeseite weiter.

---

## Dienste

| Service     | Image                                | Host port(s)                                   | Zweck                                                     |
| :---------- | :----------------------------------- | :--------------------------------------------- | :-------------------------------------------------------- |
| **app**     | built from `apps/app/Dockerfile`     | `3000`                                         | TanStack Start Dashboard (CMS-Benutzeroberfläche)         |
| **backend** | built from `apps/backend/Dockerfile` | `3100`                                         | Fastify REST API (`/health` Endpunkt)                     |
| **mongo**   | `mongo:7`                            | intern                                         | Einzelknoten-Replica Set (`rs0`)                          |
| **redis**   | `redis:7-alpine`                     | intern                                         | Job-Warteschlangen (BullMQ) und Caching (ioredis)         |
| **minio**   | `minio/minio`                        | `9000` (S3), `9001` (Konsole)                  | S3-kompatibler Objektspeicher für Avatare und Screenshots |
| **mailpit** | `axllent/mailpit`                    | `1025` (SMTP), `8025` (Web-Benutzeroberfläche) | Lokale Transaktions-E-Mail-Senke                          |

> MinIO-Port `9000` muss vom Browser erreichbar sein, da hochgeladene Assets (Avatare, Screenshots) direkt von `S3_PUBLIC_URL=http://localhost:9000/intlayer` geladen werden.

---

## Umgebungsvariablen

### Erforderlich

| Variable               | Beispiel                     | Beschreibung                                                                                                                                                         |
| ---------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DB_ID`                | `intlayer`                   | MongoDB Atlas Benutzer                                                                                                                                               |
| `DB_MDP`               | _(dein Passwort)_            | MongoDB Atlas Passwort                                                                                                                                               |
| `DB_CLUSTER`           | `cluster0.xxxxx.mongodb.net` | MongoDB Atlas Cluster Host (verwendet in der `mongodb+srv://` URI)                                                                                                   |
| `BETTER_AUTH_SECRET`   | _(generiert)_                | 32-Byte Secret für Session-Signierung                                                                                                                                |
| `S3_SECRET_ACCESS_KEY` | _(generiert)_                | Secret für das gebündelte MinIO                                                                                                                                      |
| `RESEND_API_KEY`       | _(dein Schlüssel)_           | Transaktionale E-Mail via Resend. Erforderlich für das erste Setup, es sei denn, du konfigurierst einen globalen SMTP Mailer (siehe [Global mailer](#global-mailer)) |

### Erforderlich (automatisch generiert oder abgefragt)

| Variable               | Beispiel                                        | Beschreibung                                                     |
| :--------------------- | :---------------------------------------------- | :--------------------------------------------------------------- |
| `NODE_ENV`             | `production`                                    | Laufzeitumgebung                                                 |
| `PORT`                 | `3100`                                          | Backend-Listenport                                               |
| `BACKEND_URL`          | `http://localhost:3100`                         | Öffentliche URL der Backend-API                                  |
| `APP_URL`              | `http://localhost:3000`                         | Öffentliche URL des Dashboards                                   |
| `DOMAIN`               | `localhost`                                     | Cookie-Domain                                                    |
| `MONGODB_URI`          | `mongodb://mongo:27017/intlayer?replicaSet=rs0` | Vollständige MongoDB-Verbindungs-URI                             |
| `REDIS_URL`            | `redis://redis:6379`                            | Redis-Verbindungs-URL                                            |
| `BETTER_AUTH_SECRET`   | _(generiert)_                                   | 32-Byte-Secret für die Session-Signierung                        |
| `MAIL_PROVIDER`        | `smtp`                                          | Mail-Transport: `smtp` oder `resend`                             |
| `MAIL_SMTP_HOST`       | `mailpit`                                       | SMTP-Hostname (Mailpit Container-Name)                           |
| `MAIL_SMTP_PORT`       | `1025`                                          | SMTP-Port                                                        |
| `MAIL_FROM`            | `Intlayer <no-reply@localhost>`                 | Absenderadresse                                                  |
| `S3_ENDPOINT`          | `http://minio:9000`                             | S3-kompatibler Endpunkt                                          |
| `S3_PUBLIC_URL`        | `http://localhost:9000/intlayer`                | Öffentliche URL für das Laden von Browser-Assets                 |
| `S3_BUCKET_NAME`       | `intlayer`                                      | Bucket-Name                                                      |
| `S3_ACCESS_KEY_ID`     | _(generiert)_                                   | MinIO-Zugangsschlüssel                                           |
| `S3_SECRET_ACCESS_KEY` | _(generiert)_                                   | MinIO-Geheimschlüssel                                            |
| `VITE_BACKEND_URL`     | `http://localhost:3100`                         | Backend-URL, die zur Build-Zeit in das Dashboard integriert wird |
| `VITE_DOMAIN`          | `localhost`                                     | Domain, die zur Build-Zeit in das Dashboard integriert wird      |

### Optional (Funktionen funktionieren bei Abwesenheit eingeschränkt)

| Variable                                                 | Funktion                                                             |
| :------------------------------------------------------- | :------------------------------------------------------------------- |
| `OPENAI_API_KEY`                                         | KI-gestützte Übersetzung und Inhaltsprüfung                          |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_*` | Abrechnung und Abonnementverwaltung                                  |
| `RESEND_API_KEY`                                         | Transaktions-E-Mail über Resend (überschreibt Mailpit, wenn gesetzt) |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`               | GitHub OAuth-Login                                                   |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`               | Google OAuth-Login                                                   |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`               | GitLab OAuth-Login                                                   |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`         | Microsoft OAuth-Login                                                |
| `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`           | LinkedIn OAuth-Login                                                 |
| `ATLASSIAN_CLIENT_ID`, `ATLASSIAN_CLIENT_SECRET`         | Atlassian OAuth-Login                                                |

### Global mailer

By default, all transactional emails are sent through Resend using `RESEND_API_KEY`. Self-hosted deployments can instead route **every** email — including non-organization emails such as password resets and magic links — through a global mailer configured with environment variables.

Set `MAIL_PROVIDER` to activate it. When unset, the default Resend mailer is used.

| Variable             | Example                        | Description                                                       |
| -------------------- | ------------------------------ | ----------------------------------------------------------------- |
| `MAIL_PROVIDER`      | `smtp`                         | Global transport: `smtp` or `resend`. Leave unset to use defaults |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Sender header. Accepts a bare address or `Name <email>` format    |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host (required when `MAIL_PROVIDER=smtp`)                    |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (defaults to `587`)                                     |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. Set `true` for port `465`                           |
| `MAIL_SMTP_USER`     | _(your user)_                  | SMTP username (optional; omit for unauthenticated relays)         |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | SMTP password                                                     |

> Precedence: an organization's own mailer (configured from the **Organization** dashboard) takes priority over the global mailer, which in turn takes priority over the default Resend key.

---

## Ihr Intlayer-Projekt verbinden

Sobald der Stack läuft, verweisen Sie Ihr Projekt auf das selbst gehostete Backend und Dashboard anstelle von `intlayer.org`.

### Projektkonfiguration

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * URL des selbst gehosteten CMS-Dashboards.
     * Standard: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // e.g. http://localhost:3000

    /**
     * URL der selbst gehosteten Backend-API.
     * Standard: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // e.g. http://localhost:3100
  },
};

export default config;
```

Setzen Sie die Umgebungsvariablen in der `.env` Ihres Projekts:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

Erstellen Sie Zugangsdaten in Ihrem selbst gehosteten Dashboard unter **Projects → Access keys** unter `http://localhost:3000/projects`.

### `@intlayer/api` SDK

Wenn Sie das `@intlayer/api` SDK programmatisch verwenden, übergeben Sie `backendURL` explizit:

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

## Upgrade

Ein erneutes Ausführen des Installers auf einer bestehenden Bereitstellung führt ein Rolling-Upgrade durch:

```sh
docker compose pull
docker compose up -d
```

---

## Backup und Wiederherstellung

Alle persistenten Daten befinden sich in drei benannten Docker-Volumes.

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

### Wiederherstellung

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar xzf /backup/mongo-data.tar.gz -C /

# Wiederholen Sie dies für redis-data und minio-data
```

---

## Einschränkungen

- **MongoDB muss extern sein (Atlas).** Das Backend verbindet sich nur über `mongodb+srv://` (zusammengesetzt aus `DB_ID` / `DB_MDP` / `DB_CLUSTER`), daher kann ein einfaches `mongodb://host:27017` — einschließlich des eigenen `mongod` des Containers — nicht verwendet werden. Stellen Sie einen MongoDB Atlas Cluster bereit.
- **Keine benutzerdefinierte Domain.** Alle browsergestützten `VITE_*` URLs werden zur Build-Zeit in die App inline eingefügt, und das veröffentlichte Image wird mit `localhost` Werten ausgeliefert. Das Dashboard muss unter `http://localhost:3000` aufgerufen werden; das Serving auf einer öffentlichen Domain würde ein Neubau des Images mit den eingebetteten Ziel-URLs erfordern und wird out-of-the-box nicht unterstützt.
- **E-Mail erfordert einen funktionierenden Mailer.** Das Setup beim ersten Durchlauf erzwingt eine E-Mail-Verifizierung, daher muss entweder `RESEND_API_KEY` oder ein [globaler SMTP Mailer](#global-mailer) (`MAIL_PROVIDER=smtp` + `MAIL_SMTP_*`) konfiguriert sein. Nach der ersten Anmeldung eines Administrators kann jede Organisation auch ihren eigenen SMTP oder Resend Mailer vom Dashboard aus konfigurieren.

---

## Fehlerbehebung

### Backend-Absturzschleifen beim ersten Start

MongoDB und Redis müssen fehlerfrei sein, bevor das Backend startet. Die Compose-Datei verwendet `depends_on` mit `condition: service_healthy`. Wenn Sie wiederholte Backend-Neustarts sehen, überprüfen Sie, ob die `mongo`- und `redis`-Healthchecks erfolgreich sind:

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

Suchen Sie nach `MongoDB connection error` oben im Log.

### E-Mail wird nicht gesendet

Standardmäßig werden alle ausgehenden E-Mails von Mailpit abgefangen. Öffnen Sie `http://localhost:8025`, um gesendete Nachrichten anzuzeigen. Um echte E-Mails zu senden, setzen Sie `MAIL_PROVIDER=resend` und `RESEND_API_KEY=<Ihr-Schlüssel>` in `.env` und starten Sie dann das Backend neu:

### MinIO-Bucket fehlt

Wenn der `minio-init`-One-Shot-Service nicht ausgeführt wurde (oder vor der Bereitschaft von MinIO lief), erstellen Sie den Bucket manuell:

```sh
docker compose run --rm minio-init
```

---

## Nützliche Links

- [Intlayer CMS-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)
- [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)
- [CMS SDK — `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Docker Image (aymercizip/intlayer-selfhost)](https://hub.docker.com/repository/docker/aymercizip/intlayer-selfhost/general)
