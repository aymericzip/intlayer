---
createdAt: 2026-06-30
updatedAt: 2026-09-21
priority: 8
title: Autoalojamiento de Intlayer
description: "Ejecute Intlayer en su propia infraestructura: como aplicación de escritorio, un contenedor Docker todo en uno o un stack escalable de Docker Compose. No se requiere cuenta de Intlayer Cloud."
keywords:
  - Autoalojamiento
  - Docker
  - Docker Compose
  - Aplicación de escritorio
  - Intlayer
  - CMS
  - Instalación
  - Infraestructura
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Autoalojamiento de Intlayer

Intlayer puede ejecutarse en su propia infraestructura, sin necesidad de una cuenta de Intlayer Cloud. Hay tres configuraciones disponibles, todas gestionadas por el mismo instalador (`install.sh`, `install.ps1` en Windows o `npx intlayer init infra`):

| Setup                        | What it is                                                                             | Pick it for                                          |
| ---------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **Aplicación de escritorio** | Panel nativo para macOS, Linux y Windows                                               | Un cliente local, nada que alojar                    |
| **Docker todo en uno**       | Panel, API, MongoDB, Redis y MinIO en un **solo contenedor**                           | Pruebas e instalaciones pequeñas en una sola máquina |
| **Docker Compose**           | **Un contenedor por servicio**, cada almacén reemplazable por un servicio administrado | Producción, escalado, bases de datos gestionadas     |

## Table of Contents

<TOC/>

## Imágenes y paquetes publicados

| Artifact             | Docker Hub                                                                | GHCR mirror                                | Contents                                                                         |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| All-in-one container | [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all)           | `ghcr.io/aymericzip/intlayer/cms-all`      | app + backend + MongoDB 8 + Redis + MinIO + Chromium                             |
| Dashboard (frontend) | [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend) | `ghcr.io/aymericzip/intlayer/cms-frontend` | TanStack Start dashboard on Bun                                                  |
| API (backend)        | [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend)   | `ghcr.io/aymericzip/intlayer/cms-backend`  | Fastify REST API on Bun + Chromium                                               |
| Desktop app          | [GitHub releases](https://github.com/aymericzip/intlayer/releases/latest) | n/a                                        | `.dmg` (macOS), `.deb` / `.rpm` / `.AppImage` (Linux), `.exe` / `.msi` (Windows) |

Las tres imágenes se compilan a partir del mismo [`docker/selfhost/Dockerfile`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost) y se publican con cada versión. El stack de Compose también descarga las imágenes oficiales `mongo:8`, `redis:8-alpine` y `quay.io/minio/minio`.

## Configuración

El instalador pregunta qué configuración desea, verifica los requisitos previos (ofreciendo instalar Docker), escribe el archivo de entorno con los secretos ya generados y descarga las imágenes. Nunca inicia nada por sí solo: los modos Docker necesitan primero un servicio de correo, por lo que finaliza mostrando el comando a ejecutar. Volver a ejecutarlo es seguro: un archivo de entorno existente nunca se sobrescribe, por lo que también es la vía de actualización.

<Tabs group="mode">
<Tab label="Aplicación de escritorio" value="desktop">

El panel de Intlayer como aplicación nativa, construida con Tauri. Inicia sesión en Intlayer Cloud (`https://app.intlayer.org`), por lo que no hay nada que alojar. Es la opción ideal cuando prefiere un cliente local en lugar de una pestaña del navegador.

### Instalación

El instalador descarga el paquete correspondiente a su sistema operativo y CPU y luego lo abre (macOS), lo instala (`dpkg` / `rpm` en Linux) o ejecuta el asistente de instalación (Windows). También puede descargarlo manualmente desde la [página de releases](https://github.com/aymericzip/intlayer/releases/latest).

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

### Requisitos

- **Node.js**: la aplicación incorpora el servidor del panel y lo inicia con el binario `node` de la máquina. Instálelo desde [nodejs.org](https://nodejs.org) si la aplicación no se inicia.

> La compilación de escritorio publicada se comunica con el backend de Intlayer Cloud. Apuntarla a un backend autoalojado requiere reconstruir la aplicación con `VITE_BACKEND_URL` configurado en su API, consulte [Limitaciones](#limitations).

</Tab>
<Tab label="Docker todo en uno" value="docker">

Todo se ejecuta dentro de un único contenedor `intlayer/cms-all`, supervisado por [s6-overlay](https://github.com/just-containers/s6-overlay), con cada almacén de datos persistido en un solo volumen.

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

| Servicio    | Puerto(s) del host            | Propósito                                                            |
| ----------- | ----------------------------- | -------------------------------------------------------------------- |
| **app**     | `3000`                        | Panel de control (interfaz de usuario CMS)                           |
| **backend** | `3100`                        | API REST (endpoint `/health`)                                        |
| **mongo**   | interno                       | MongoDB 8, conjunto de réplicas de un solo nodo `rs0`                |
| **redis**   | interno                       | Colas de trabajo (BullMQ) y almacenamiento en caché                  |
| **minio**   | `9000` (S3), `9001` (consola) | Almacenamiento de objetos compatible con S3 para avatares y capturas |

El orden de inicio está regulado por las dependencias de s6 (`mongod` → inicio de replica-set, `minio` → creación del bucket, luego `backend`, luego `app`), y los servicios se reinician si fallan, por lo que el primer inicio se recupera solo.

### Requisitos previos

- **Docker** ≥ 24: el instalador ofrece instalarlo (mediante [get.docker.com](https://get.docker.com) en Linux, Homebrew en macOS). En Windows, instale primero [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (backend WSL 2).
- Puertos `3000`, `3100`, `9000` y `9001` libres en el host. MinIO `9000` debe ser accesible desde el navegador, ya que carga los recursos directamente desde `S3_PUBLIC_URL`.
- Un servicio de correo: una clave API de [Resend](https://resend.com) o un relay SMTP.

### 1. Instalación

Escribe `./intlayer.env` con `BETTER_AUTH_SECRET` y `S3_SECRET_ACCESS_KEY` generados, y descarga `intlayer/cms-all:latest`.

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

### 2. Configurar un servicio de correo

Abra `intlayer.env` y configure Resend **o** SMTP (detalles en [Servicio de correo global](#global-mailer)):

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

### 3. Iniciar

Este es el comando que imprime el instalador:

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

La CLI ejecuta el instalador, que muestra el comando `docker run …` visto en las otras pestañas. Cópielo en su terminal una vez configurado el servicio de correo.

</Tab>
</Tabs>

Abra **http://localhost:3000** y siga la [Configuración inicial](#first-run-setup). El primer inicio inicializa el conjunto de réplicas y el bucket, por lo que puede tardar un minuto.

### Copia de seguridad y actualización

Todo el estado reside en el volumen `intlayer-data` (`/data/mongo`, `/data/redis`, `/data/minio`).

```sh
# Backup (stop the container first so MongoDB's files are consistent)
docker stop intlayer
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar czf /backup/intlayer-data.tar.gz /data
docker start intlayer

# Restore
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar xzf /backup/intlayer-data.tar.gz -C /
```

Para actualizar, vuelva a ejecutar el instalador (descarga la imagen más reciente y mantiene `intlayer.env`), luego ejecute `docker rm -f intlayer` y lance nuevamente el comando de inicio. Para utilizar un MongoDB administrado en lugar del integrado, configure `MONGODB_URI` en `intlayer.env`.

</Tab>
<Tab label="Docker Compose" value="compose">

Un contenedor por servicio en una red privada de Compose. El panel y la API utilizan las imágenes publicadas `intlayer/cms-frontend` e `intlayer/cms-backend`; los almacenes de datos utilizan las imágenes oficiales `mongo`, `redis` y `minio`.

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

| Servicio     | Imagen                  | Rol                                                                            |
| ------------ | ----------------------- | ------------------------------------------------------------------------------ |
| `app`        | `intlayer/cms-frontend` | Panel en `:3000`; espera a que el backend esté listo                           |
| `backend`    | `intlayer/cms-backend`  | API en `:3100` con Chromium; espera a Mongo, Redis y el bucket de MinIO        |
| `mongo`      | `mongo:8`               | Conjunto de réplicas de un solo nodo `rs0`, iniciado por su propio healthcheck |
| `redis`      | `redis:8-alpine`        | Colas y caché, persistencia append-only                                        |
| `minio`      | `quay.io/minio/minio`   | Almacenamiento S3 en `:9000`, consola en `:9001`                               |
| `minio-init` | `quay.io/minio/mc`      | Tarea única: crea el bucket y la política de descarga anónima                  |

Los datos se conservan en los volúmenes `intlayer_mongo-data`, `intlayer_redis-data` e `intlayer_minio-data`. La conexión entre servicios (`MONGODB_URI`, `REDIS_URL`, `S3_ENDPOINT`, la URL interna del backend utilizada por el renderizado del lado del servidor) está fija en el archivo compose y prevalece sobre `.env`, que solo contiene secretos e integraciones opcionales.

### Requisitos previos

- **Docker** ≥ 24 con el plugin de Compose: el instalador ofrece instalarlo en Linux y macOS. En Windows, instale primero [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (backend WSL 2).
- Puertos `3000`, `3100`, `9000` y `9001` libres en el host.
- Un servicio de correo: una clave API de [Resend](https://resend.com) o un relay SMTP.

### 1. Instalación

Escribe `docker-compose.yml` y un `.env` con los secretos generados en `./intlayer/`, y descarga las imágenes.

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

### 2. Configurar un servicio de correo

Complete Resend **o** SMTP en `intlayer/.env`, exactamente igual que para el contenedor todo en uno (consulte [Servicio de correo global](#global-mailer)).

### 3. Iniciar

```sh
cd intlayer && docker compose up -d
```

Abra **http://localhost:3000** y siga la [Configuración inicial](#first-run-setup).

### Almacenes de datos gestionados

Elimine del archivo compose el servicio que desea reemplazar (así como su entrada en `depends_on` dentro de `backend`), y luego sobrescriba la variable correspondiente:

```yaml fileName="docker-compose.yml"
services:
  backend:
    environment:
      MONGODB_URI: mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/intlayer
      REDIS_URL: rediss://default:password@redis.example.com:6380
      S3_ENDPOINT: https://s3.eu-west-1.amazonaws.com
      S3_PUBLIC_URL: https://intlayer-assets.s3.eu-west-1.amazonaws.com
```

`S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` / `S3_BUCKET_NAME` mantienen su significado frente a cualquier proveedor compatible con S3.

### Escalabilidad

`app` y `backend` son stateless (sin estado). Detrás de un balanceador de carga, `docker compose up -d --scale backend=3` funciona una vez eliminados los mapeos fijos de puertos del host y cuando el proxy direcciona los servicios por nombre. Las tareas en segundo plano se coordinan a través de Redis (BullMQ), por lo que varias réplicas del backend comparten la cola de forma segura.

### Compilación desde el código fuente

Desde una copia del repositorio, una configuración de anulación cambia los dos servicios de Intlayer de `image:` a `build:`:

```sh
cd docker/selfhost
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

Así es también como se generan imágenes para un dominio personalizado: pase los valores `VITE_*` como build args (consulte [Limitaciones](#limitations)).

### Copia de seguridad y actualización

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

### Configuración del instalador

Sin `--mode` (o `INTLAYER_MODE`), el instalador muestra un menú: `desktop`, `docker` (todo en uno) o `compose`. También lee algunas variables de entorno. Al pasarse por tubería a la shell, declárelas en la shell en lugar de pasarlas a `curl`:

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

> Las variables de puerto solo cambian el lado del **host** del mapeo. Las imágenes publicadas tienen `http://localhost:3000`, `http://localhost:3100` y `http://localhost:9000` compiladas en el paquete del panel, por lo que mantenga los valores predeterminados a menos que construya sus propias imágenes, consulte [Limitaciones](#limitations).

## Configuración inicial

En una instancia nueva (base de datos vacía), al abrir el panel se le redirige a la página **`/init`**:

1. Cree la primera cuenta. Al estar vacía la colección de usuarios, esta cuenta se asciende automáticamente a **superadministrador**.
2. Se envía un correo electrónico de verificación a través de Resend o de su relay SMTP. La verificación del correo es **obligatoria**, por lo que se debe configurar un servicio de correo antes de comenzar.
3. Haga clic en el enlace del correo y luego inicie sesión.

Una vez que existe un administrador, `/init` redirige a la página de inicio de sesión estándar.

## Variables de entorno

Ambos modos Docker leen el mismo archivo (`intlayer.env` para el contenedor, `.env` para Compose), generado a partir de [`docker/selfhost/.env.template`](https://github.com/aymericzip/intlayer/blob/main/docker/selfhost/.env.template).

### Requeridas

| Variable               | Example       | Description                                                                                                                                   |
| ---------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | _(generated)_ | 32-byte secret for session signing                                                                                                            |
| `S3_SECRET_ACCESS_KEY` | _(generated)_ | Secret for the bundled MinIO                                                                                                                  |
| `RESEND_API_KEY`       | _(your key)_  | Transactional email via Resend. Required for first-run setup unless an SMTP relay is configured instead (see [Global mailer](#global-mailer)) |

### Fijadas por el despliegue

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

El servicio `app` de Compose recibe adicionalmente `INTLAYER_BACKEND_INTERNAL_URL=http://backend:3100`: el navegador accede a la API en `localhost:3100`, pero el renderizado del lado del servidor se ejecuta dentro de la red Compose y debe usar el nombre del servicio.

### Opcionales (las funciones se degradan suavemente si están ausentes)

| Variable                                         | Feature                                   |
| ------------------------------------------------ | ----------------------------------------- |
| `OPENAI_API_KEY`                                 | AI-assisted translation and content audit |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`       | GitHub OAuth login                        |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`       | Google OAuth login                        |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`       | GitLab OAuth login                        |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | Microsoft OAuth login                     |

### Servicio de correo global

Cada correo electrónico transaccional, incluidos los correos no pertenecientes a la organización (como restablecimientos de contraseña y enlaces mágicos), pasa a través de uno de dos transportes globales:

- **Resend**, usando `RESEND_API_KEY`.
- **SMTP**, usando las variables `MAIL_SMTP_*`. Tan pronto como se define `MAIL_SMTP_HOST`, se utiliza SMTP y se ignora `RESEND_API_KEY`.

`MAIL_PROVIDER` solo es necesario para forzar un transporte cuando ambos están configurados (por ejemplo, `MAIL_PROVIDER=resend` para mantener Resend aunque esté presente un host SMTP).

| Variable             | Example                        | Description                                                                  |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Sender header for either transport. Accepts a bare address or `Name <email>` |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host. Setting it selects the SMTP transport                             |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (defaults to `587`)                                                |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. Set `true` for port `465`                                      |
| `MAIL_SMTP_USER`     | _(your user)_                  | SMTP username (optional; omit for unauthenticated relays)                    |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | SMTP password                                                                |
| `MAIL_PROVIDER`      | `resend`                       | Optional override: `smtp` or `resend`. Leave unset to auto-select            |

> Prioridad: el servicio de correo propio de una organización (configurado en el panel de **Organización**) tiene prioridad sobre el servicio de correo global, que a su vez tiene prioridad sobre la clave predeterminada de Resend.

## Conectar su proyecto Intlayer

Una vez que el stack esté funcionando, apunte su proyecto al backend y al panel autoalojados en lugar de `intlayer.org`.

### Configuración del proyecto

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

Cree credenciales de acceso en su panel autoalojado en **Proyectos → Claves de acceso** en `http://localhost:3000/projects`.

### SDK `@intlayer/api`

Al usar el SDK `@intlayer/api` de forma programática, pase `backendURL` explícitamente:

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

## Limitaciones

- **Sin dominio personalizado ni reasignación de puertos.** Todas las URLs `VITE_*` visibles para el navegador se integran en el panel durante la compilación, y las imágenes publicadas (y la aplicación de escritorio) se entregan con valores de `localhost` / Intlayer Cloud. Se debe acceder al panel en `http://localhost:3000`, a la API en `:3100` y a MinIO en `:9000`. Servirlo en un dominio público, o apuntar la aplicación de escritorio a un backend autoalojado, requiere recompilar con las URLs de destino integradas (`--build-arg VITE_BACKEND_URL=… VITE_SITE_URL=… VITE_DOMAIN=…` en `docker/selfhost/Dockerfile`, o mediante `docker-compose.build.yml`) y no se admite de forma predeterminada.
- **El correo electrónico requiere un servicio funcional.** La configuración inicial exige la verificación por correo electrónico, por lo que se debe configurar `RESEND_API_KEY` o un [relay SMTP](#global-mailer) (`MAIL_SMTP_*`). Después de que el primer administrador inicie sesión, cada organización puede configurar su propio servicio SMTP o Resend desde el panel.
- **La aplicación de escritorio necesita Node.js** en la máquina para iniciar su servidor integrado.

## Enlaces útiles

- [Documentación de Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)
- [Referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)
- [SDK de CMS: `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Releases de la aplicación de escritorio](https://github.com/aymericzip/intlayer/releases/latest)
- Docker Hub: [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all), [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend), [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend), alojado en GHCR bajo `ghcr.io/aymericzip/intlayer/`
- [`docker/selfhost/`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost): Dockerfile, `docker-compose.yml` y `.env.template`
