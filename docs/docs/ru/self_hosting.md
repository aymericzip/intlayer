---
createdAt: 2026-06-30
updatedAt: 2026-09-21
priority: 8
title: Самостоятельный хостинг Intlayer
description: "Запускайте Intlayer на собственной инфраструктуре: как десктопное приложение, единый Docker-контейнер «все в одном» или масштабируемый стек Docker Compose. Аккаунт Intlayer Cloud не требуется."
keywords:
  - Собственный хостинг
  - Docker
  - Docker Compose
  - Десктопное приложение
  - Intlayer
  - CMS
  - Установка
  - Инфраструктура
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Самостоятельный хостинг Intlayer

Intlayer может работать на вашей собственной инфраструктуре без необходимости создания учетной записи Intlayer Cloud. Доступны три конфигурации, устанавливаемые одним и тем же установщиком (`install.sh`, `install.ps1` в Windows или `npx intlayer init infra`):

| Setup                     | What it is                                                                                | Pick it for                                        |
| ------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **Десктопное приложение** | Нативная панель управления для macOS, Linux и Windows                                     | Локальный клиент, ничего не нужно хостить          |
| **Docker «все в одном»**  | Панель управления, API, MongoDB, Redis и MinIO в **едином контейнере**                    | Пробные и небольшие локальные установки            |
| **Docker Compose**        | **Один контейнер на сервис**, каждое хранилище данных можно заменить управляемым сервисом | Продакшн, масштабирование, управляемые базы данных |

## Table of Contents

<TOC/>

## Опубликованные образы и пакеты

| Artifact             | Docker Hub                                                                | GHCR mirror                                | Contents                                                                         |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| All-in-one container | [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all)           | `ghcr.io/aymericzip/intlayer/cms-all`      | app + backend + MongoDB 8 + Redis + MinIO + Chromium                             |
| Dashboard (frontend) | [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend) | `ghcr.io/aymericzip/intlayer/cms-frontend` | TanStack Start dashboard on Bun                                                  |
| API (backend)        | [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend)   | `ghcr.io/aymericzip/intlayer/cms-backend`  | Fastify REST API on Bun + Chromium                                               |
| Desktop app          | [GitHub releases](https://github.com/aymericzip/intlayer/releases/latest) | n/a                                        | `.dmg` (macOS), `.deb` / `.rpm` / `.AppImage` (Linux), `.exe` / `.msi` (Windows) |

Все три образа собираются из одного и того же [`docker/selfhost/Dockerfile`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost) и публикуются при каждом релизе. Стек Compose также загружает официальные образы `mongo:8`, `redis:8-alpine` и `quay.io/minio/minio`.

## Настройка

Установщик запрашивает желаемую конфигурацию, проверяет предварительные требования (предлагая установить Docker), записывает файл переменных окружения с уже сгенерированными секретами и загружает образы. Он никогда ничего не запускает сам: режимам Docker сначала требуется почтовый сервис, поэтому в конце выводится команда для запуска. Повторный запуск безопасен: существующий файл окружения не перезаписывается, что делает его также способом обновления.

<Tabs group="mode">
<Tab label="Десктопное приложение" value="desktop">

Панель управления Intlayer в виде нативного приложения, созданного на Tauri. Оно подключается к Intlayer Cloud (`https://app.intlayer.org`), поэтому хостить ничего не требуется. Это отличный выбор, если вы предпочитаете локальный клиент вместо вкладки браузера.

### Установка

Установщик загружает пакет для вашей ОС и процессора, а затем открывает его (macOS), устанавливает (`dpkg` / `rpm` в Linux) или запускает мастер установки (Windows). Вы также можете загрузить его вручную со [страницы релизов](https://github.com/aymericzip/intlayer/releases/latest).

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

### Требования

- **Node.js**: приложение содержит сервер панели управления и запускает его с помощью бинарного файла `node`, установленного в системе. Установите его с [nodejs.org](https://nodejs.org), если приложение не запускается.

> Опубликованная десктопная сборка взаимодействует с бэкендом Intlayer Cloud. Подключение её к собственному бэкенду требует пересборки приложения с переменной `VITE_BACKEND_URL`, указывающей на ваш API, смотрите [Ограничения](#limitations).

</Tab>
<Tab label="Docker «все в одном»" value="docker">

Все работает внутри одного контейнера `intlayer/cms-all` под управлением [s6-overlay](https://github.com/just-containers/s6-overlay), а все хранилища данных сохраняются в едином томе.

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

| Сервис      | Порт(ы) хоста                 | Назначение                                                   |
| ----------- | ----------------------------- | ------------------------------------------------------------ |
| **app**     | `3000`                        | Панель управления (интерфейс CMS)                            |
| **backend** | `3100`                        | REST API (эндпоинт `/health`)                                |
| **mongo**   | внутренний                    | MongoDB 8, набор реплик из одного узла `rs0`                 |
| **redis**   | внутренний                    | Очереди задач (BullMQ) и кэширование                         |
| **minio**   | `9000` (S3), `9001` (консоль) | S3-совместимое объектное хранилище для аватаров и скриншотов |

Порядок запуска определяется зависимостями s6 (`mongod` → инициализация replica-set, `minio` → создание бакета, затем `backend`, затем `app`), а службы перезапускаются при завершении, поэтому первый запуск восстанавливается автоматически.

### Предварительные требования

- **Docker** ≥ 24: установщик предлагает установить его (через [get.docker.com](https://get.docker.com) в Linux, Homebrew в macOS). В Windows сначала установите [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (бэкенд WSL 2).
- Свободные порты `3000`, `3100`, `9000` и `9001` на хосте. MinIO `9000` должен быть доступен браузеру, загружающему ресурсы напрямую из `S3_PUBLIC_URL`.
- Почтовый сервис: API-ключ [Resend](https://resend.com) или SMTP-реле.

### 1. Установка

Записывает `./intlayer.env` со сгенерированными `BETTER_AUTH_SECRET` и `S3_SECRET_ACCESS_KEY` и загружает `intlayer/cms-all:latest`.

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

### 2. Настройка почтового сервиса

Откройте `intlayer.env` и укажите Resend **или** SMTP (подробнее в разделе [Глобальный почтовый сервис](#global-mailer)):

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

### 3. Запуск

Эту команду выводит установщик:

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

CLI запускает установщик, выводящий команду `docker run …`, показанную на других вкладках. Скопируйте её в терминал после настройки почты.

</Tab>
</Tabs>

Откройте **http://localhost:3000** и выполните шаги [Первоначальной настройки](#first-run-setup). При первом запуске инициализируются набор реплик и бакет, поэтому подождите минуту.

### Резервное копирование и обновление

Все данные хранятся в томе `intlayer-data` (`/data/mongo`, `/data/redis`, `/data/minio`).

```sh
# Backup (stop the container first so MongoDB's files are consistent)
docker stop intlayer
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar czf /backup/intlayer-data.tar.gz /data
docker start intlayer

# Restore
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar xzf /backup/intlayer-data.tar.gz -C /
```

Для обновления повторно запустите установщик (он загрузит свежий образ и сохранит `intlayer.env`), затем выполните `docker rm -f intlayer` и снова запустите команду старта. Чтобы использовать управляемую MongoDB вместо встроенной, задайте `MONGODB_URI` в `intlayer.env`.

</Tab>
<Tab label="Docker Compose" value="compose">

Один контейнер на сервис в изолированной сети Compose. Панель управления и API используют опубликованные образы `intlayer/cms-frontend` и `intlayer/cms-backend`; базы данных используют официальные образы `mongo`, `redis` и `minio`.

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

| Сервис       | Образ                   | Роль                                                                        |
| ------------ | ----------------------- | --------------------------------------------------------------------------- |
| `app`        | `intlayer/cms-frontend` | Панель управления на `:3000`; ожидает готовности бэкенда                    |
| `backend`    | `intlayer/cms-backend`  | API на `:3100` с Chromium; ожидает Mongo, Redis и бакет MinIO               |
| `mongo`      | `mongo:8`               | Набор реплик из одного узла `rs0`, инициализируемый собственным healthcheck |
| `redis`      | `redis:8-alpine`        | Очереди и кэш, постоянство только для добавления                            |
| `minio`      | `quay.io/minio/minio`   | Хранилище S3 на `:9000`, консоль на `:9001`                                 |
| `minio-init` | `quay.io/minio/mc`      | Однократный запуск: создает бакет и политику анонимного скачивания          |

Данные сохраняются в томах `intlayer_mongo-data`, `intlayer_redis-data` и `intlayer_minio-data`. Подключение служб (`MONGODB_URI`, `REDIS_URL`, `S3_ENDPOINT`, внутренний URL бэкенда для SSR) зафиксировано в файле compose и имеет приоритет над `.env`, содержащим только секреты и дополнительные интеграции.

### Предварительные требования

- **Docker** ≥ 24 с плагином Compose: установщик предлагает установить его в Linux и macOS. В Windows сначала установите [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (бэкенд WSL 2).
- Свободные порты `3000`, `3100`, `9000` и `9001` на хосте.
- Почтовый сервис: API-ключ [Resend](https://resend.com) или SMTP-реле.

### 1. Установка

Записывает `docker-compose.yml` и `.env` со сгенерированными секретами в `./intlayer/` и загружает образы.

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

### 2. Настройка почтового сервиса

Заполните Resend **или** SMTP в `intlayer/.env` точно так же, как для контейнера «все в одном» (см. [Глобальный почтовый сервис](#global-mailer)).

### 3. Запуск

```sh
cd intlayer && docker compose up -d
```

Откройте **http://localhost:3000** и выполните шаги [Первоначальной настройки](#first-run-setup).

### Управляемые хранилища данных

Удалите заменяемый сервис из compose-файла (а также его упоминание в `depends_on` у `backend`), затем переопределите соответствующую переменную:

```yaml fileName="docker-compose.yml"
services:
  backend:
    environment:
      MONGODB_URI: mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/intlayer
      REDIS_URL: rediss://default:password@redis.example.com:6380
      S3_ENDPOINT: https://s3.eu-west-1.amazonaws.com
      S3_PUBLIC_URL: https://intlayer-assets.s3.eu-west-1.amazonaws.com
```

`S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` / `S3_BUCKET_NAME` сохраняют свое значение для любого S3-совместимого провайдера.

### Масштабирование

`app` и `backend` не сохраняют состояние (stateless). За балансировщиком нагрузки команда `docker compose up -d --scale backend=3` работает после удаления жестких сопоставлений портов хоста, когда прокси обращается к службам по имени. Фоновые задачи координируются через Redis (BullMQ), поэтому несколько реплик бэкенда безопасно разделяют очередь.

### Сборка из исходного кода

При клонировании репозитория файл переопределения переключает оба сервиса Intlayer с `image:` на `build:`:

```sh
cd docker/selfhost
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

Таким же образом создаются образы для пользовательского домена: передайте значения `VITE_*` как аргументы сборки (см. [Ограничения](#limitations)).

### Резервное копирование и обновление

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

### Параметры установщика

Без флага `--mode` (или `INTLAYER_MODE`) установщик отображает меню: `desktop`, `docker` (все в одном) или `compose`. Он также считывает несколько переменных окружения. Поскольку запуск происходит через пайплайн в оболочке, передавайте их оболочке, а не `curl`:

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

> Переменные портов изменяют только сторону **хоста** сопоставления. В опубликованных образах `http://localhost:3000`, `http://localhost:3100` и `http://localhost:9000` встроены в сборку панели управления, поэтому сохраняйте значения по умолчанию, если не собираете собственные образы, смотрите [Ограничения](#limitations).

## Первоначальная настройка

На новом экземпляре (пустая база данных) открытие панели перенаправляет на страницу **`/init`**:

1. Создайте первую учетную запись. Поскольку коллекция пользователей пуста, эта учетная запись автоматически становится **суперадминистратором**.
2. Письмо с подтверждением отправляется через Resend или ваше SMTP-реле. Подтверждение электронной почты является **обязательным**, поэтому почтовый сервис должен быть настроен до начала работы.
3. Перейдите по ссылке в письме и войдите в систему.

Когда администратор уже существует, `/init` перенаправляет на стандартную страницу входа.

## Переменные окружения

Оба режима Docker читают один и тот же файл (`intlayer.env` для контейнера, `.env` для Compose), сгенерированный из [`docker/selfhost/.env.template`](https://github.com/aymericzip/intlayer/blob/main/docker/selfhost/.env.template).

### Обязательные

| Variable               | Example       | Description                                                                                                                                   |
| ---------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | _(generated)_ | 32-byte secret for session signing                                                                                                            |
| `S3_SECRET_ACCESS_KEY` | _(generated)_ | Secret for the bundled MinIO                                                                                                                  |
| `RESEND_API_KEY`       | _(your key)_  | Transactional email via Resend. Required for first-run setup unless an SMTP relay is configured instead (see [Global mailer](#global-mailer)) |

### Фиксированные развертыванием

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

Служба `app` в Compose дополнительно получает `INTLAYER_BACKEND_INTERNAL_URL=http://backend:3100`: браузер обращается к API через `localhost:3100`, но SSR выполняется внутри сети Compose и должен использовать имя службы.

### Необязательные (функции мягко деградируют при отсутствии)

| Variable                                         | Feature                                   |
| ------------------------------------------------ | ----------------------------------------- |
| `OPENAI_API_KEY`                                 | AI-assisted translation and content audit |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`       | GitHub OAuth login                        |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`       | Google OAuth login                        |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`       | GitLab OAuth login                        |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | Microsoft OAuth login                     |

### Глобальный почтовый сервис

Каждое транзакционное письмо, включая внеорганизационные письма (сброс пароля, магические ссылки), проходит через один из двух глобальных транспортов:

- **Resend**, с использованием `RESEND_API_KEY`.
- **SMTP**, с использованием переменных `MAIL_SMTP_*`. Как только задана `MAIL_SMTP_HOST`, используется SMTP, а `RESEND_API_KEY` игнорируется.

`MAIL_PROVIDER` требуется только для принудительного выбора транспорта, когда настроены оба (например, `MAIL_PROVIDER=resend`, чтобы сохранить Resend при наличии SMTP-хоста).

| Variable             | Example                        | Description                                                                  |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Sender header for either transport. Accepts a bare address or `Name <email>` |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host. Setting it selects the SMTP transport                             |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (defaults to `587`)                                                |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. Set `true` for port `465`                                      |
| `MAIL_SMTP_USER`     | _(your user)_                  | SMTP username (optional; omit for unauthenticated relays)                    |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | SMTP password                                                                |
| `MAIL_PROVIDER`      | `resend`                       | Optional override: `smtp` or `resend`. Leave unset to auto-select            |

> Приоритет: собственный почтовый сервис организации (настроенный в панели управления **Организация**) имеет приоритет над глобальным почтовым сервисом, который, в свою очередь, имеет приоритет над ключом Resend по умолчанию.

## Подключение вашего проекта Intlayer

После запуска стека настройте свой проект на использование собственного бэкенда и панели управления вместо `intlayer.org`.

### Конфигурация проекта

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

Создайте учетные данные доступа в панели управления собственного сервера в разделе **Проекты → Ключи доступа** по адресу `http://localhost:3000/projects`.

### SDK `@intlayer/api`

При программном использовании SDK `@intlayer/api` передавайте `backendURL` явно:

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

## Ограничения

- **Без пользовательского домена и без переназначения портов.** Все URL-адреса `VITE_*` для браузера встроены в панель управления во время сборки, а опубликованные образы (и десктопное приложение) поставляются со значениями `localhost` / Intlayer Cloud. Панель управления должна быть доступна по адресу `http://localhost:3000`, API — по адресу `:3100`, а MinIO — по адресу `:9000`. Размещение на публичном домене или подключение десктопного приложения к собственному бэкенду требует пересборки с внедренными целевыми URL (`--build-arg VITE_BACKEND_URL=… VITE_SITE_URL=… VITE_DOMAIN=…` в `docker/selfhost/Dockerfile` или через `docker-compose.build.yml`) и не поддерживается по умолчанию.
- **Для работы почты требуется рабочий почтовый сервис.** При первой настройке требуется подтверждение электронной почты, поэтому необходимо настроить `RESEND_API_KEY` или [SMTP-реле](#global-mailer) (`MAIL_SMTP_*`). После входа первого администратора каждая организация может настроить собственный SMTP или Resend из панели управления.
- **Десктопному приложению требуется Node.js** на компьютере для запуска встроенного сервера.

## Полезные ссылки

- [Документация Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md)
- [Справочник по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md)
- [CMS SDK: `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Релизы десктопного приложения](https://github.com/aymericzip/intlayer/releases/latest)
- Docker Hub: [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all), [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend), [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend), зеркало на GHCR: `ghcr.io/aymericzip/intlayer/`
- [`docker/selfhost/`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost): Dockerfile, `docker-compose.yml` и `.env.template`
