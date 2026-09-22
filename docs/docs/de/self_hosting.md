---
createdAt: 2026-06-30
updatedAt: 2026-09-21
title: Intlayer selbst hosten
description: "Führen Sie Intlayer auf Ihrer eigenen Infrastruktur aus: als Desktop-App, einzelner All-in-One-Docker-Container oder skalierbarer Docker Compose-Stack. Kein Intlayer Cloud-Konto erforderlich."
keywords:
  - Self-Hosting
  - Docker
  - Docker Compose
  - Desktop-App
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

Intlayer kann auf Ihrer eigenen Infrastruktur ausgeführt werden, kein Intlayer Cloud-Konto erforderlich. Drei Setups stehen zur Verfügung, die alle über dasselbe Installationsprogramm verwaltet werden (`install.sh`, `install.ps1` unter Windows oder `npx intlayer init infra`):

| Setup                 | What it is                                                                            | Pick it for                                    |
| --------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **Desktop-App**       | Natives Dashboard für macOS, Linux und Windows                                        | Ein lokaler Client, nichts zu hosten           |
| **All-in-One Docker** | Dashboard, API, MongoDB, Redis und MinIO in einem **einzigen Container**              | Tests und kleine Single-Box-Installationen     |
| **Docker Compose**    | **Ein Container pro Dienst**, jeder Datenspeicher durch ein Managed-Angebot ersetzbar | Produktion, Skalierung, verwaltete Datenbanken |

## Table of Contents

<TOC/>

## Veröffentlichte Images und Pakete

| Artifact             | Docker Hub                                                                | GHCR mirror                                | Contents                                                                         |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| All-in-one container | [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all)           | `ghcr.io/aymericzip/intlayer/cms-all`      | app + backend + MongoDB 8 + Redis + MinIO + Chromium                             |
| Dashboard (frontend) | [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend) | `ghcr.io/aymericzip/intlayer/cms-frontend` | TanStack Start dashboard on Bun                                                  |
| API (backend)        | [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend)   | `ghcr.io/aymericzip/intlayer/cms-backend`  | Fastify REST API on Bun + Chromium                                               |
| Desktop app          | [GitHub releases](https://github.com/aymericzip/intlayer/releases/latest) | n/a                                        | `.dmg` (macOS), `.deb` / `.rpm` / `.AppImage` (Linux), `.exe` / `.msi` (Windows) |

Alle drei Images werden aus derselben Datei [`docker/selfhost/Dockerfile`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost) erstellt und bei jeder Version veröffentlicht. Der Compose-Stack ruft außerdem die offiziellen Images `mongo:8`, `redis:8-alpine` und `quay.io/minio/minio` ab.

## Einrichtung

Das Installationsprogramm fragt nach dem gewünschten Setup, prüft die Voraussetzungen (bietet die Installation von Docker an), schreibt die Umgebungsdatei mit bereits generierten Secrets und lädt die Images herunter. Es startet nichts von selbst: Die Docker-Modi benötigen zuerst einen Mailer, daher endet es mit der Ausgabe des auszuführenden Befehls. Eine erneute Ausführung ist sicher: Eine vorhandene Umgebungsdatei wird nie überschrieben, was es auch zum Upgrade-Pfad macht.

<Tabs group="mode">
<Tab label="Desktop-App" value="desktop">

Das Intlayer-Dashboard als native Anwendung, erstellt mit Tauri. Es meldet sich bei der Intlayer Cloud (`https://app.intlayer.org`) an, sodass nichts gehostet werden muss. Es ist die richtige Wahl, wenn Sie einen lokalen Client statt eines Browser-Tabs bevorzugen.

### Installation

Das Installationsprogramm lädt das Paket für Ihr Betriebssystem und Ihre CPU herunter und öffnet es (macOS), installiert es (`dpkg` / `rpm` unter Linux) oder startet den Setup-Assistenten (Windows). Sie können es auch manuell von der [Releases-Seite](https://github.com/aymericzip/intlayer/releases/latest) herunterladen.

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

### Anforderungen

- **Node.js**: Die App bettet den Dashboard-Server ein und startet ihn mit der maschineneigenen `node`-Binärdatei. Installieren Sie es von [nodejs.org](https://nodejs.org), falls die App nicht startet.

> Der veröffentlichte Desktop-Build kommuniziert mit dem Intlayer Cloud-Backend. Das Verweisen auf ein selbst gehostetes Backend erfordert das erneute Erstellen der App mit der auf Ihre API festgelegten `VITE_BACKEND_URL`, siehe [Einschränkungen](#limitations).

</Tab>
<Tab label="All-in-One Docker" value="docker">

Alles läuft im einzelnen `intlayer/cms-all`-Container, überwacht von [s6-overlay](https://github.com/just-containers/s6-overlay), wobei jeder Datenspeicher auf einem einzigen Volume persistiert wird.

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

| Dienst      | Host-Port(s)                  | Zweck                                                     |
| ----------- | ----------------------------- | --------------------------------------------------------- |
| **app**     | `3000`                        | Dashboard (CMS-Benutzeroberfläche)                        |
| **backend** | `3100`                        | REST-API (`/health`-Endpunkt)                             |
| **mongo**   | intern                        | MongoDB 8, Single-Node-Replica-Set `rs0`                  |
| **redis**   | intern                        | Job-Warteschlangen (BullMQ) und Caching                   |
| **minio**   | `9000` (S3), `9001` (Konsole) | S3-kompatibler Objektspeicher für Avatare und Screenshots |

Die Startreihenfolge wird durch s6-Abhängigkeiten gesteuert (`mongod` → Replica-Set-Init, `minio` → Bucket-Erstellung, dann `backend`, dann `app`), und Dienste starten bei Beendigung neu, sodass der erste Start sich von selbst erholt.

### Voraussetzungen

- **Docker** ≥ 24: Das Installationsprogramm bietet die Installation an (über [get.docker.com](https://get.docker.com) unter Linux, Homebrew unter macOS). Installieren Sie unter Windows zuerst [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (WSL 2-Backend).
- Ports `3000`, `3100`, `9000` und `9001` auf dem Host frei. MinIO `9000` muss für den Browser erreichbar bleiben, da Assets direkt von `S3_PUBLIC_URL` geladen werden.
- Ein Mailer: Ein [Resend](https://resend.com)-API-Schlüssel oder ein SMTP-Relay.

### 1. Installation

Schreibt `./intlayer.env` mit generiertem `BETTER_AUTH_SECRET` und `S3_SECRET_ACCESS_KEY` und ruft `intlayer/cms-all:latest` ab.

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

### 2. Mailer konfigurieren

Öffnen Sie `intlayer.env` und tragen Sie Resend **oder** SMTP ein (Details unter [Globaler Mailer](#global-mailer)):

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

### 3. Starten

Dies ist der vom Installationsprogramm ausgegebene Befehl:

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

Die CLI führt das Installationsprogramm aus, das den in den anderen Tabs gezeigten Befehl `docker run …` ausgibt. Kopieren Sie ihn nach der Konfiguration des Mailers in Ihr Terminal.

</Tab>
</Tabs>

Öffnen Sie **http://localhost:3000** und folgen Sie der [Ersteinrichtung](#first-run-setup). Der erste Start initialisiert das Replica-Set und den Bucket, geben Sie ihm eine Minute Zeit.

### Backup und Upgrade

Der gesamte Zustand liegt im Volume `intlayer-data` (`/data/mongo`, `/data/redis`, `/data/minio`).

```sh
# Backup (stop the container first so MongoDB's files are consistent)
docker stop intlayer
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar czf /backup/intlayer-data.tar.gz /data
docker start intlayer

# Restore
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar xzf /backup/intlayer-data.tar.gz -C /
```

Führen Sie zum Aktualisieren das Installationsprogramm erneut aus (es lädt das neueste Image und behält `intlayer.env`), führen Sie dann `docker rm -f intlayer` aus und starten Sie den Startbefehl erneut. Um ein verwaltetes MongoDB statt des gebündelten zu verwenden, setzen Sie `MONGODB_URI` in `intlayer.env`.

</Tab>
<Tab label="Docker Compose" value="compose">

Ein Container pro Dienst in einem privaten Compose-Netzwerk. Das Dashboard und die API verwenden die veröffentlichten Images `intlayer/cms-frontend` und `intlayer/cms-backend`; die Datenspeicher verwenden die offiziellen Images `mongo`, `redis` und `minio`.

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

| Dienst       | Image                   | Rolle                                                                                 |
| ------------ | ----------------------- | ------------------------------------------------------------------------------------- |
| `app`        | `intlayer/cms-frontend` | Dashboard auf `:3000`; wartet, bis das Backend gesund ist                             |
| `backend`    | `intlayer/cms-backend`  | API auf `:3100` mit Chromium; wartet auf Mongo, Redis und den MinIO-Bucket            |
| `mongo`      | `mongo:8`               | Single-Node-Replica-Set `rs0`, initialisiert durch eigenen Healthcheck                |
| `redis`      | `redis:8-alpine`        | Warteschlangen und Caching, Append-Only-Persistenz                                    |
| `minio`      | `quay.io/minio/minio`   | S3-Speicher auf `:9000`, Konsole auf `:9001`                                          |
| `minio-init` | `quay.io/minio/mc`      | Einmalige Ausführung: Erstellt den Bucket und dessen Richtlinie für anonyme Downloads |

Die Daten werden in den Volumes `intlayer_mongo-data`, `intlayer_redis-data` und `intlayer_minio-data` gespeichert. Die Dienstverbindungen (`MONGODB_URI`, `REDIS_URL`, `S3_ENDPOINT`, die interne Backend-URL für serverseitiges Rendering) sind in der Compose-Datei festgelegt und haben Vorrang vor `.env`, das nur Secrets und optionale Integrationen enthält.

### Voraussetzungen

- **Docker** ≥ 24 mit dem Compose-Plugin: Das Installationsprogramm bietet die Installation unter Linux und macOS an. Installieren Sie unter Windows zuerst [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (WSL 2-Backend).
- Ports `3000`, `3100`, `9000` und `9001` auf dem Host frei.
- Ein Mailer: Ein [Resend](https://resend.com)-API-Schlüssel oder ein SMTP-Relay.

### 1. Installation

Schreibt `docker-compose.yml` und ein `.env` mit den generierten Secrets nach `./intlayer/` und lädt die Images herunter.

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

### 2. Mailer konfigurieren

Tragen Sie Resend **oder** SMTP in `intlayer/.env` ein, genau wie beim All-in-One-Container (siehe [Globaler Mailer](#global-mailer)).

### 3. Starten

```sh
cd intlayer && docker compose up -d
```

Öffnen Sie **http://localhost:3000** und folgen Sie der [Ersteinrichtung](#first-run-setup).

### Verwaltete Datenspeicher

Löschen Sie den Dienst, den Sie ersetzen, aus der Compose-Datei (sowie seinen Eintrag in `depends_on` bei `backend`), und überschreiben Sie die entsprechende Variable:

```yaml fileName="docker-compose.yml"
services:
  backend:
    environment:
      MONGODB_URI: mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/intlayer
      REDIS_URL: rediss://default:password@redis.example.com:6380
      S3_ENDPOINT: https://s3.eu-west-1.amazonaws.com
      S3_PUBLIC_URL: https://intlayer-assets.s3.eu-west-1.amazonaws.com
```

`S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` / `S3_BUCKET_NAME` behalten ihre Bedeutung gegenüber jedem S3-kompatiblen Anbieter.

### Skalierung

`app` und `backend` sind zustandslos (stateless). Hinter einem Load Balancer funktioniert `docker compose up -d --scale backend=3`, sobald die festen Host-Portzuordnungen entfernt wurden und der Proxy die Dienste über den Namen adressiert. Hintergrundaufgaben werden über Redis (BullMQ) koordiniert, sodass mehrere Backend-Replikate die Warteschlange sicher teilen.

### Erstellung aus dem Quellcode

Aus einem Checkout des Repositorys schaltet ein Override die beiden Intlayer-Dienste von `image:` auf `build:` um:

```sh
cd docker/selfhost
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

Auf diese Weise erstellen Sie auch Images für eine benutzerdefinierte Domain: Übergeben Sie die `VITE_*`-Werte als Build-Argumente (siehe [Einschränkungen](#limitations)).

### Backup und Upgrade

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

### Installationsprogramm-Einstellungen

Ohne `--mode` (oder `INTLAYER_MODE`) zeigt das Installationsprogramm ein Menü an: `desktop`, `docker` (All-in-One) oder `compose`. Es liest auch einige Umgebungsvariablen. Da es in die Shell geleitet wird, übergeben Sie diese an die Shell und nicht an `curl`:

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

> Die Portvariablen ändern nur die **Host**-Seite des Mappings. Die veröffentlichten Images haben `http://localhost:3000`, `http://localhost:3100` und `http://localhost:9000` im Dashboard-Bundle kompiliert. Behalten Sie die Standardwerte bei, es sei denn, Sie erstellen eigene Images, siehe [Einschränkungen](#limitations).

## Ersteinrichtung

Bei einer neuen Instanz (leere Datenbank) leitet das Öffnen des Dashboards auf die Seite **`/init`** weiter:

1. Erstellen Sie das erste Konto. Da die Benutzersammlung leer ist, wird dieses Konto automatisch zum **Super-Admin** ernannt.
2. Eine Bestätigungs-E-Mail wird über Resend oder Ihr SMTP-Relay gesendet. Die E-Mail-Bestätigung ist **obligatorisch**, weshalb vor dem Start ein Mailer konfiguriert werden muss.
3. Klicken Sie auf den Link in der E-Mail und melden Sie sich an.

Sobald ein Admin existiert, leitet `/init` auf die Standard-Anmeldeseite weiter.

## Umgebungsvariablen

Beide Docker-Modi lesen dieselbe Datei (`intlayer.env` für den Container, `.env` für Compose), die aus [`docker/selfhost/.env.template`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/self_hosting.md) generiert wird.

### Erforderlich

| Variable               | Example       | Description                                                                                                                                   |
| ---------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | _(generated)_ | 32-byte secret for session signing                                                                                                            |
| `S3_SECRET_ACCESS_KEY` | _(generated)_ | Secret for the bundled MinIO                                                                                                                  |
| `RESEND_API_KEY`       | _(your key)_  | Transactional email via Resend. Required for first-run setup unless an SMTP relay is configured instead (see [Global mailer](#global-mailer)) |

### Durch das Deployment festgelegt

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

Der Compose-Dienst `app` erhält zusätzlich `INTLAYER_BACKEND_INTERNAL_URL=http://backend:3100`: Der Browser erreicht die API über `localhost:3100`, aber das serverseitige Rendering läuft innerhalb des Compose-Netzwerks und muss den Dienstnamen verwenden.

### Optional (Funktionen fallen ohne sie sauber aus)

| Variable                                         | Feature                                   |
| ------------------------------------------------ | ----------------------------------------- |
| `OPENAI_API_KEY`                                 | AI-assisted translation and content audit |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`       | GitHub OAuth login                        |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`       | Google OAuth login                        |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`       | GitLab OAuth login                        |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | Microsoft OAuth login                     |

### Globaler Mailer

Jede transaktionale E-Mail, einschließlich E-Mails außerhalb der Organisation wie Passwort-Resets und Magic Links, läuft über einen von zwei globalen Transporten:

- **Resend**, unter Verwendung von `RESEND_API_KEY`.
- **SMTP**, unter Verwendung der Variablen `MAIL_SMTP_*`. Sobald `MAIL_SMTP_HOST` gesetzt ist, wird SMTP verwendet und `RESEND_API_KEY` ignoriert.

`MAIL_PROVIDER` wird nur benötigt, um einen Transport zu erzwingen, wenn beide konfiguriert sind (z. B. `MAIL_PROVIDER=resend`, um Resend beizubehalten, während ein SMTP-Host vorhanden ist).

| Variable             | Example                        | Description                                                                  |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Sender header for either transport. Accepts a bare address or `Name <email>` |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host. Setting it selects the SMTP transport                             |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (defaults to `587`)                                                |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. Set `true` for port `465`                                      |
| `MAIL_SMTP_USER`     | _(your user)_                  | SMTP username (optional; omit for unauthenticated relays)                    |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | SMTP password                                                                |
| `MAIL_PROVIDER`      | `resend`                       | Optional override: `smtp` or `resend`. Leave unset to auto-select            |

> Rangfolge: Der eigene Mailer einer Organisation (im Dashboard unter **Organisation** konfiguriert) hat Vorrang vor dem globalen Mailer, der wiederum Vorrang vor dem standardmäßigen Resend-Schlüssel hat.

## Verbinden Ihres Intlayer-Projekts

Sobald der Stack läuft, verweisen Sie mit Ihrem Projekt auf das selbst gehostete Backend und Dashboard anstelle von `intlayer.org`.

### Projektkonfiguration

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

Erstellen Sie Zugangsdaten in Ihrem selbst gehosteten Dashboard unter **Projekte → Zugriffsschlüssel** unter `http://localhost:3000/projects`.

### `@intlayer/api`-SDK

Wenn Sie das `@intlayer/api`-SDK programmatisch verwenden, übergeben Sie `backendURL` explizit:

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

## Einschränkungen

- **Keine benutzerdefinierte Domain und kein Port-Remapping.** Alle für den Browser sichtbaren `VITE_*`-URLs sind während des Builds in das Dashboard eingebunden, und die veröffentlichten Images (sowie die Desktop-App) werden mit `localhost` / Intlayer Cloud-Werten ausgeliefert. Auf das Dashboard muss unter `http://localhost:3000`, die API unter `:3100` und MinIO unter `:9000` zugegriffen werden. Die Bereitstellung auf einer öffentlichen Domain oder das Ausrichten der Desktop-App auf ein selbst gehostetes Backend erfordert das Neuerstellen mit integrierten Ziel-URLs (`--build-arg VITE_BACKEND_URL=… VITE_SITE_URL=… VITE_DOMAIN=…` auf `docker/selfhost/Dockerfile` oder über `docker-compose.build.yml`) und wird nicht standardmäßig unterstützt.
- **E-Mail erfordert einen funktionierenden Mailer.** Die Ersteinrichtung erzwingt die E-Mail-Verifizierung, daher muss entweder `RESEND_API_KEY` oder ein [SMTP-Relay](#global-mailer) (`MAIL_SMTP_*`) konfiguriert werden. Nachdem sich der erste Admin angemeldet hat, kann jede Organisation auch ihren eigenen SMTP- oder Resend-Mailer im Dashboard konfigurieren.
- **Die Desktop-App benötigt Node.js** auf dem Computer, um ihren eingebetteten Server zu starten.

## Nützliche Links

- [Intlayer CMS-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)
- [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)
- [CMS SDK: `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Releases der Desktop-App](https://github.com/aymericzip/intlayer/releases/latest)
- Docker Hub: [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all), [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend), [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend), gespiegelt auf GHCR unter `ghcr.io/aymericzip/intlayer/`
- [`docker/selfhost/`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost): Dockerfile, `docker-compose.yml` und `.env.template`
