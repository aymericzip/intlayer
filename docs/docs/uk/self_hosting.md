---
createdAt: 2026-06-30
updatedAt: 2026-09-21
title: Власний хостинг Intlayer
description: "Запускайте Intlayer на власній інфраструктурі: як десктопний застосунок, єдиний Docker-контейнер all-in-one або масштабований стек Docker Compose. Обліковий запис Intlayer Cloud не потрібен."
keywords:
  - Власний хостинг
  - Docker
  - Docker Compose
  - Десктопний застосунок
  - Intlayer
  - CMS
  - Встановлення
  - Інфраструктура
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Власний хостинг Intlayer

Intlayer може працювати на вашій власній інфраструктурі без необхідності створювати обліковий запис Intlayer Cloud. Доступні три конфігурації, які встановлюються одним інсталятором (`install.sh`, `install.ps1` на Windows або `npx intlayer init infra`):

| Setup                     | What it is                                                                       | Pick it for                                  |
| ------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------- |
| **Десктопний застосунок** | Нативна панель керування для macOS, Linux та Windows                             | Локальний клієнт, нічого не потрібно хостити |
| **All-in-one Docker**     | Панель керування, API, MongoDB, Redis та MinIO в **одному контейнері**           | Пробні та невеликі локальні інсталяції       |
| **Docker Compose**        | **Один контейнер на сервіс**, кожне сховище можна замінити керованою базою даних | Продакшн, масштабування, керовані бази даних |

## Table of Contents

<TOC/>

## Опубліковані образи та пакети

| Artifact             | Docker Hub                                                                | GHCR mirror                                | Contents                                                                         |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| All-in-one container | [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all)           | `ghcr.io/aymericzip/intlayer/cms-all`      | app + backend + MongoDB 8 + Redis + MinIO + Chromium                             |
| Dashboard (frontend) | [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend) | `ghcr.io/aymericzip/intlayer/cms-frontend` | TanStack Start dashboard on Bun                                                  |
| API (backend)        | [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend)   | `ghcr.io/aymericzip/intlayer/cms-backend`  | Fastify REST API on Bun + Chromium                                               |
| Desktop app          | [GitHub releases](https://github.com/aymericzip/intlayer/releases/latest) | n/a                                        | `.dmg` (macOS), `.deb` / `.rpm` / `.AppImage` (Linux), `.exe` / `.msi` (Windows) |

Усі три образи створюються з одного [`docker/selfhost/Dockerfile`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost) і публікуються з кожним релізом. Стек Compose також завантажує офіційні образи `mongo:8`, `redis:8-alpine` та `quay.io/minio/minio`.

## Налаштування

Інсталятор запитує бажану конфігурацію, перевіряє вимоги (пропонуючи встановити Docker), записує файл середовища зі згенерованими секретами та завантажує образи. Він нічого не запускає самостійно: режимам Docker спочатку потрібен поштовий сервіс, тому в кінці виводиться команда для запуску. Повторний запуск безпечний: наявний файл середовища ніколи не перезаписується, що робить його також шляхом оновлення.

<Tabs group="mode">
<Tab label="Десктопний застосунок" value="desktop">

Панель керування Intlayer як нативний застосунок, створений на Tauri. Вона підключається до Intlayer Cloud (`https://app.intlayer.org`), тому нічого не потрібно хостити. Це правильний вибір, коли потрібен локальний клієнт замість вкладки браузера.

### Встановлення

Інсталятор завантажує пакет для вашої ОС та процесора, а потім відкриває його (macOS), встановлює (`dpkg` / `rpm` на Linux) або запускає майстер встановлення (Windows). Ви також можете завантажити його вручну зі [сторінки релізів](https://github.com/aymericzip/intlayer/releases/latest).

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

### Вимоги

- **Node.js**: застосунок містить сервер панелі керування і запускає його системним бінарним файлом `node`. Встановіть його з [nodejs.org](https://nodejs.org), якщо застосунок не запускається.

> Опублікована збірка взаємодіє з бекендом Intlayer Cloud. Підключення до власного бекенду вимагає перебудови застосунку з `VITE_BACKEND_URL`, спрямованим на ваш API, див. [Обмеження](#limitations).

</Tab>
<Tab label="All-in-one Docker" value="docker">

Усе працює всередині єдиного контейнера `intlayer/cms-all` під керуванням [s6-overlay](https://github.com/just-containers/s6-overlay), а кожне сховище зберігається в одному томі даних.

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

| Сервіс      | Порт(и) хоста                 | Призначення                                           |
| ----------- | ----------------------------- | ----------------------------------------------------- |
| **app**     | `3000`                        | Панель керування (інтерфейс CMS)                      |
| **backend** | `3100`                        | REST API (ендпоінт `/health`)                         |
| **mongo**   | внутрішній                    | MongoDB 8, набір реплік з одного вузла `rs0`          |
| **redis**   | внутрішній                    | Черги завдань (BullMQ) та кешування                   |
| **minio**   | `9000` (S3), `9001` (консоль) | S3-сумісне сховище об'єктів для аватарів і скріншотів |

Порядок запуску визначається залежностями s6 (`mongod` → ініціалізація replica-set, `minio` → створення бакета, далі `backend`, далі `app`), а сервіси перезапускаються при виході, тому перший запуск відновлюється автоматично.

### Попередні вимоги

- **Docker** ≥ 24: інсталятор пропонує встановити його (через [get.docker.com](https://get.docker.com) на Linux, Homebrew на macOS). На Windows спершу встановіть [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (бекенд WSL 2).
- Вільні порти `3000`, `3100`, `9000` та `9001` на хості. MinIO `9000` має залишатися доступним для браузера, який завантажує ресурси прямо з `S3_PUBLIC_URL`.
- Поштовий сервіс: API-ключ [Resend](https://resend.com) або реле SMTP.

### 1. Встановлення

Записує `./intlayer.env` зі згенерованими `BETTER_AUTH_SECRET` та `S3_SECRET_ACCESS_KEY` і завантажує `intlayer/cms-all:latest`.

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

### 2. Налаштування поштового сервісу

Відкрийте `intlayer.env` і вкажіть Resend **або** SMTP (детальніше у розділі [Глобальний поштовий сервіс](#global-mailer)):

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

Це команда, яку виводить інсталятор:

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

CLI запускає інсталятор, який виводить команду `docker run …`, показану на інших вкладках. Скопіюйте її в термінал після налаштування пошти.

</Tab>
</Tabs>

Відкрийте **http://localhost:3000** та виконайте кроки [Першого запуску](#first-run-setup). Перший запуск ініціалізує набір реплік та бакет, зачекайте хвилину.

### Резервне копіювання та оновлення

Усі дані зберігаються в томі `intlayer-data` (`/data/mongo`, `/data/redis`, `/data/minio`).

```sh
# Backup (stop the container first so MongoDB's files are consistent)
docker stop intlayer
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar czf /backup/intlayer-data.tar.gz /data
docker start intlayer

# Restore
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar xzf /backup/intlayer-data.tar.gz -C /
```

Для оновлення повторно запустіть інсталятор (він завантажить найновіший образ і збереже `intlayer.env`), потім виконайте `docker rm -f intlayer` і запустіть команду старту знову. Щоб використовувати керовану MongoDB замість інтегрованої, задайте `MONGODB_URI` в `intlayer.env`.

</Tab>
<Tab label="Docker Compose" value="compose">

Один контейнер на сервіс у приватній мережі Compose. Панель керування та API використовують опубліковані образи `intlayer/cms-frontend` та `intlayer/cms-backend`; сховища даних використовують офіційні образи `mongo`, `redis` та `minio`.

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

| Сервіс       | Образ                   | Роль                                                                   |
| ------------ | ----------------------- | ---------------------------------------------------------------------- |
| `app`        | `intlayer/cms-frontend` | Панель керування на `:3000`; очікує готовності бекенда                 |
| `backend`    | `intlayer/cms-backend`  | API на `:3100` з Chromium; очікує Mongo, Redis та бакет MinIO          |
| `mongo`      | `mongo:8`               | Набір реплік з одного вузла `rs0`, ініціалізований власним healthcheck |
| `redis`      | `redis:8-alpine`        | Черги та кешування, збереження append-only                             |
| `minio`      | `quay.io/minio/minio`   | Сховище S3 на `:9000`, консоль на `:9001`                              |
| `minio-init` | `quay.io/minio/mc`      | Одноразовий запуск: створює бакет і політику анонімного завантаження   |

Дані зберігаються в томах `intlayer_mongo-data`, `intlayer_redis-data` та `intlayer_minio-data`. З'єднання сервісів (`MONGODB_URI`, `REDIS_URL`, `S3_ENDPOINT`, внутрішня URL-адреса бекенда для SSR) зафіксовано у файлі compose і має перевагу над `.env`, що містить лише секрети та додаткові інтеграції.

### Попередні вимоги

- **Docker** ≥ 24 із плагіном Compose: інсталятор пропонує встановити його на Linux та macOS. На Windows спершу встановіть [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (бекенд WSL 2).
- Вільні порти `3000`, `3100`, `9000` та `9001` на хості.
- Поштовий сервіс: API-ключ [Resend](https://resend.com) або реле SMTP.

### 1. Встановлення

Записує `docker-compose.yml` та `.env` зі згенерованими секретами в `./intlayer/` і завантажує образи.

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

### 2. Налаштування поштового сервісу

Вкажіть Resend **або** SMTP у `intlayer/.env` так само, як для контейнера all-in-one (див. [Глобальний поштовий сервіс](#global-mailer)).

### 3. Запуск

```sh
cd intlayer && docker compose up -d
```

Відкрийте **http://localhost:3000** та виконайте кроки [Першого запуску](#first-run-setup).

### Керовані сховища даних

Видаліть сервіс, який ви замінюєте, з файлу compose (а також його запис у `depends_on` в `backend`), після чого перевизначте відповідну змінну:

```yaml fileName="docker-compose.yml"
services:
  backend:
    environment:
      MONGODB_URI: mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/intlayer
      REDIS_URL: rediss://default:password@redis.example.com:6380
      S3_ENDPOINT: https://s3.eu-west-1.amazonaws.com
      S3_PUBLIC_URL: https://intlayer-assets.s3.eu-west-1.amazonaws.com
```

`S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` / `S3_BUCKET_NAME` зберігають своє значення для будь-якого S3-сумісного провайдера.

### Масштабування

`app` та `backend` є stateless (без стану). За балансувальником навантаження команда `docker compose up -d --scale backend=3` працює після видалення фіксованих портів хоста, коли проксі адресує сервіси за назвою. Фонові завдання координуються через Redis (BullMQ), тому кілька реплік бекенда безпечно розділяють чергу.

### Збірка з вихідного коду

З клонованого репозиторію файл перевизначення перемикає обидва сервіси Intlayer з `image:` на `build:`:

```sh
cd docker/selfhost
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

Саме так ви створюєте образи для власного домену: передайте значення `VITE_*` як аргументи збірки (див. [Обмеження](#limitations)).

### Резервне копіювання та оновлення

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

### Налаштування інсталятора

Без прапорця `--mode` (або `INTLAYER_MODE`) інсталятор показує меню: `desktop`, `docker` (all-in-one) або `compose`. Він також зчитує кілька змінних середовища. Оскільки запуск відбувається через пайплайн у командну оболонку, передавайте їх оболонці, а не `curl`:

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

> Змінні портів змінюють лише сторону **хоста** у відображенні. Опубліковані образи мають значення `http://localhost:3000`, `http://localhost:3100` та `http://localhost:9000`, скомпільовані в пакет панелі керування, тому зберігайте значення за замовчуванням, якщо не збираєте власні образи, див. [Обмеження](#limitations).

## Перший запуск

На новому екземплярі (порожня база даних) відкриття панелі керування перенаправляє на сторінку **`/init`**:

1. Створіть перший обліковий запис. Оскільки колекція користувачів порожня, цей акаунт автоматично стає **суперадміністратором**.
2. Лист для підтвердження надсилається через Resend або ваше реле SMTP. Підтвердження електронної пошти є **обов'язковим**, тому поштовий сервіс має бути налаштований до старту.
3. Перейдіть за посиланням у листі, після чого увійдіть.

Коли адміністратор вже існує, `/init` перенаправляє на стандартну сторінку входу.

## Змінні середовища

Обидва режими Docker читають один файл (`intlayer.env` для контейнера, `.env` для Compose), згенерований з [`docker/selfhost/.env.template`](https://github.com/aymericzip/intlayer/blob/main/docker/selfhost/.env.template).

### Обов'язкові

| Variable               | Example       | Description                                                                                                                                   |
| ---------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | _(generated)_ | 32-byte secret for session signing                                                                                                            |
| `S3_SECRET_ACCESS_KEY` | _(generated)_ | Secret for the bundled MinIO                                                                                                                  |
| `RESEND_API_KEY`       | _(your key)_  | Transactional email via Resend. Required for first-run setup unless an SMTP relay is configured instead (see [Global mailer](#global-mailer)) |

### Фіксовані розгортанням

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

Сервіс Compose `app` додатково отримує `INTLAYER_BACKEND_INTERNAL_URL=http://backend:3100`: браузер звертається до API через `localhost:3100`, але серверний рендеринг виконується всередині мережі Compose і повинен використовувати ім'я сервісу.

### Необов'язкові (функціональність м'яко деградує за їх відсутності)

| Variable                                         | Feature                                   |
| ------------------------------------------------ | ----------------------------------------- |
| `OPENAI_API_KEY`                                 | AI-assisted translation and content audit |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`       | GitHub OAuth login                        |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`       | Google OAuth login                        |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`       | GitLab OAuth login                        |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | Microsoft OAuth login                     |

### Глобальний поштовий сервіс

Кожен транзакційний лист, включно з позаорганізаційними листами (скидання пароля, магічні посилання), проходить через один із двох глобальних транспортів:

- **Resend**, з використанням `RESEND_API_KEY`.
- **SMTP**, з використанням змінних `MAIL_SMTP_*`. Щойно встановлено `MAIL_SMTP_HOST`, використовується SMTP, а `RESEND_API_KEY` ігнорується.

`MAIL_PROVIDER` потрібен лише для примусового вибору транспорту, коли налаштовано обидва (наприклад, `MAIL_PROVIDER=resend`, щоб зберегти Resend за наявності SMTP-хоста).

| Variable             | Example                        | Description                                                                  |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Sender header for either transport. Accepts a bare address or `Name <email>` |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host. Setting it selects the SMTP transport                             |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (defaults to `587`)                                                |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. Set `true` for port `465`                                      |
| `MAIL_SMTP_USER`     | _(your user)_                  | SMTP username (optional; omit for unauthenticated relays)                    |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | SMTP password                                                                |
| `MAIL_PROVIDER`      | `resend`                       | Optional override: `smtp` or `resend`. Leave unset to auto-select            |

> Пріоритет: власний поштовий сервіс організації (налаштований на панелі **Організація**) має пріоритет над глобальним поштовим сервісом, який у свою чергу має пріоритет над ключем Resend за замовчуванням.

## Підключення вашого проєкту Intlayer

Після запуску стека спрямуйте свій проєкт на власний бекенд і панель керування замість `intlayer.org`.

### Конфігурація проєкту

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

Створіть облікові дані доступу у вашій панелі керування в розділі **Проєкти → Ключі доступу** за адресою `http://localhost:3000/projects`.

### SDK `@intlayer/api`

При програмному використанні SDK `@intlayer/api` передавайте `backendURL` явно:

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

## Обмеження

- **Без власного домену та без перепризначення портів.** Усі URL `VITE_*` для браузера вбудовано в панель керування під час збірки, а опубліковані образи (і десктопний застосунок) постачаються зі значеннями `localhost` / Intlayer Cloud. Доступ до панелі має здійснюватися за адресою `http://localhost:3000`, до API — за `:3100`, а до MinIO — за `:9000`. Розгортання на публічному домені або підключення десктопного застосунку до власного бекенду вимагає перебудови з вбудованими цільовими URL (`--build-arg VITE_BACKEND_URL=… VITE_SITE_URL=… VITE_DOMAIN=…` у `docker/selfhost/Dockerfile` або через `docker-compose.build.yml`) і не підтримується за замовчуванням.
- **Для роботи пошти потрібен робочий поштовий сервіс.** Перший запуск вимагає перевірки електронної пошти, тому необхідно налаштувати `RESEND_API_KEY` або [реле SMTP](#global-mailer) (`MAIL_SMTP_*`). Після входу першого адміністратора кожна організація може налаштувати власний SMTP або Resend з панелі керування.
- **Десктопному застосунку потрібен Node.js** на комп'ютері для запуску вбудованого сервера.

## Корисні посилання

- [Документація Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)
- [Довідник конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)
- [CMS SDK: `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Релізи десктопного застосунку](https://github.com/aymericzip/intlayer/releases/latest)
- Docker Hub: [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all), [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend), [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend), дзеркало на GHCR під `ghcr.io/aymericzip/intlayer/`
- [`docker/selfhost/`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost): Dockerfile, `docker-compose.yml` та `.env.template`
