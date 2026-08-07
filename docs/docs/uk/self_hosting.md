---
createdAt: 2026-06-30
updatedAt: 2026-06-30
title: Розгортання Intlayer на власному сервері
description: Запустіть повний екземпляр Intlayer на власній інфраструктурі за допомогою однієї команди. Обліковий запис Intlayer Cloud не потрібен.
keywords:
  - Самостійне розгортання
  - Docker
  - Docker Compose
  - Intlayer
  - CMS
  - Встановлення
  - Інфраструктура
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Розгортання Intlayer на власному сервері

Intlayer може повністю працювати на вашій власній інфраструктурі — обліковий запис Intlayer Cloud не потрібен. Одна команда запускає готовий до виробництва стек:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Інсталятор завантажує `docker-compose.yml` та `.env`, автоматично генерує необхідні секрети та запускає всі контейнери за допомогою `docker compose up -d`.

## Зміст

<TOC/>

---

## Архітектура

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

Chromium (використовується для генерації скріншотів Puppeteer) вбудований в образ бекенду — окремий контейнер не потрібен.

---

## Передумови

- **Docker** ≥ 24 та **Docker Compose** ≥ v2. Якщо чогось бракує, інсталятор виводить посилання на встановлення та завершує роботу.
- Порти `3000`, `3100`, `8025`, `9000` та `9001` доступні на хості.
- Хост Linux або macOS (або WSL2 на Windows).

---

## Швидкий старт

Витягніть і запустіть опубліковану image, надавши ваші облікові дані та секрети MongoDB Atlas:

```sh
docker run -d --name intlayer \
  -p 3000:3000 \
  -p 3100:3100 \
  -p 9000:9000 \
  -p 9001:9001 \
  -v intlayer-data:/data \
  -e DB_ID="<atlas-user>" \
  -e DB_MDP="<atlas-password>" \
  -e DB_CLUSTER="<cluster>.xxxxx.mongodb.net" \
  -e BETTER_AUTH_SECRET="$(openssl rand -hex 32)" \
  -e S3_SECRET_ACCESS_KEY="$(openssl rand -hex 16)" \
  -e RESEND_API_KEY="<your-resend-key>" \
  aymericzip/intlayer-selfhost
```

Потім відкрийте **http://localhost:3000**.

> Dashboard доступний на `localhost`. Див. [Обмеження](#limitations) — користувацькі домени не підтримуються опублікованою image.

---

## Швидкий старт

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Що робить інсталятор:

1.  Перевіряє наявність `docker` та `docker compose`.
2.  Завантажує `docker-compose.yml` та `.env.example` до `./intlayer/`.
3.  Якщо файл `.env` не існує, копіює приклад та генерує випадкові секрети для `BETTER_AUTH_SECRET`, `S3_ACCESS_KEY_ID` та `S3_SECRET_ACCESS_KEY` за допомогою `openssl rand`.
4.  Запускає `docker compose pull` + `docker compose up -d`.
5.  Виводить URL-адреси: дашборд `:3000`, API `:3100`, інтерфейс електронної пошти `:8025`, консоль MinIO `:9001`.

Після запуску стека відкрийте **http://localhost:3000** та створіть свій перший обліковий запис.

---

## Сервіси

| Сервіс      | Образ                               | Порт(и) хосту                         | Призначення                                                |
| ----------- | ----------------------------------- | ------------------------------------- | ---------------------------------------------------------- |
| **app**     | зібрано з `apps/app/Dockerfile`     | `3000`                                | Панель приладів TanStack Start (інтерфейс CMS)             |
| **backend** | зібрано з `apps/backend/Dockerfile` | `3100`                                | REST API Fastify (кінцева точка `/health`)                 |
| **mongo**   | `mongo:7`                           | внутрішній                            | Однонодовий реплікасет (`rs0`)                             |
| **redis**   | `redis:7-alpine`                    | внутрішній                            | Черги завдань (BullMQ) та кешування (ioredis)              |
| **minio**   | `minio/minio`                       | `9000` (S3), `9001` (консоль)         | Об'єктне сховище, сумісне з S3, для аватарів та скріншотів |
| **mailpit** | `axllent/mailpit`                   | `1025` (SMTP), `8025` (веб-інтерфейс) | Локальний приймач транзакційних електронних листів         |

Внутрішні порти (mongo, redis) за замовчуванням не доступні з хосту.

> Порт MinIO `9000` має бути доступним для браузера, оскільки завантажені ресурси (аватари, скріншоти) завантажуються безпосередньо з `S3_PUBLIC_URL=http://localhost:9000/intlayer`.

---

## Змінні середовища

### Обов'язково

| Variable               | Example                      | Description                                                                                                                                            |
| ---------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `DB_ID`                | `intlayer`                   | MongoDB Atlas користувач                                                                                                                               |
| `DB_MDP`               | _(ваш пароль)_               | MongoDB Atlas пароль                                                                                                                                   |
| `DB_CLUSTER`           | `cluster0.xxxxx.mongodb.net` | MongoDB Atlas cluster хост (використовується в URI `mongodb+srv://`)                                                                                   |
| `BETTER_AUTH_SECRET`   | _(згенерований)_             | 32-байтовий secret для підписання сеансу                                                                                                               |
| `S3_SECRET_ACCESS_KEY` | _(згенерований)_             | Secret для bundled MinIO                                                                                                                               |
| `RESEND_API_KEY`       | _(ваш ключ)_                 | Transactional email через Resend. Обов'язково для першого запуску, якщо ви не налаштуєте глобальний SMTP mailer (див. [Global mailer](#global-mailer)) |

### Обов'язкові (автоматично генеруються або запитуються)

| Змінна                 | Приклад                                         | Опис                                                    |
| ---------------------- | ----------------------------------------------- | ------------------------------------------------------- |
| `NODE_ENV`             | `production`                                    | Середовище виконання                                    |
| `PORT`                 | `3100`                                          | Порт прослуховування бекенду                            |
| `BACKEND_URL`          | `http://localhost:3100`                         | Публічна URL-адреса API бекенду                         |
| `APP_URL`              | `http://localhost:3000`                         | Публічна URL-адреса дашборду                            |
| `DOMAIN`               | `localhost`                                     | Домен для cookie                                        |
| `MONGODB_URI`          | `mongodb://mongo:27017/intlayer?replicaSet=rs0` | Повний URI підключення до MongoDB                       |
| `REDIS_URL`            | `redis://redis:6379`                            | URL підключення до Redis                                |
| `BETTER_AUTH_SECRET`   | _(згенеровано)_                                 | 32-байтовий секрет для підпису сесії                    |
| `MAIL_PROVIDER`        | `smtp`                                          | Транспорт пошти: `smtp` або `resend`                    |
| `MAIL_SMTP_HOST`       | `mailpit`                                       | Ім'я хосту SMTP (ім'я контейнера Mailpit)               |
| `MAIL_SMTP_PORT`       | `1025`                                          | Порт SMTP                                               |
| `MAIL_FROM`            | `Intlayer <no-reply@localhost>`                 | Адреса відправника                                      |
| `S3_ENDPOINT`          | `http://minio:9000`                             | Кінцева точка, сумісна з S3                             |
| `S3_PUBLIC_URL`        | `http://localhost:9000/intlayer`                | Публічна URL-адреса для завантаження ресурсів браузером |
| `S3_BUCKET_NAME`       | `intlayer`                                      | Ім'я кошика                                             |
| `S3_ACCESS_KEY_ID`     | _(згенеровано)_                                 | Ключ доступу MinIO                                      |
| `S3_SECRET_ACCESS_KEY` | _(згенеровано)_                                 | Секретний ключ MinIO                                    |
| `VITE_BACKEND_URL`     | `http://localhost:3100`                         | URL-адреса бекенду, вбудована в дашборд під час збірки  |
| `VITE_DOMAIN`          | `localhost`                                     | Домен, вбудований в дашборд під час збірки              |

### Необов'язкові (функції погіршуються, якщо відсутні)

| Змінна                                                   | Функція                                                                             |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `OPENAI_API_KEY`                                         | Переклад та аудит контенту за допомогою ШІ                                          |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_*` | Управління рахунками та підписками                                                  |
| `RESEND_API_KEY`                                         | Транзакційна електронна пошта через Resend (перевизначає Mailpit, якщо встановлено) |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`               | Вхід через GitHub OAuth                                                             |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`               | Вхід через Google OAuth                                                             |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`               | Вхід через GitLab OAuth                                                             |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`         | Вхід через Microsoft OAuth                                                          |
| `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`           | Вхід через LinkedIn OAuth                                                           |
| `ATLASSIAN_CLIENT_ID`, `ATLASSIAN_CLIENT_SECRET`         | Вхід через Atlassian OAuth                                                          |

---

### Глобальний поштовик

За замовчуванням усі транзакційні електронні листи відправляються через Resend з використанням `RESEND_API_KEY`. Самостійно розгорнуті розгортання можуть натомість маршрутизувати **кожну** електронну пошту — включаючи не-організаційні листи, такі як скидання паролів і магічні посилання — через глобальний поштовик, налаштований за допомогою змінних середовища.

Встановіть `MAIL_PROVIDER`, щоб активувати це. Коли не встановлено, використовується поштовик за замовчуванням Resend.

| Змінна               | Приклад                        | Опис                                                                                                 |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| `MAIL_PROVIDER`      | `smtp`                         | Глобальний транспорт: `smtp` або `resend`. Залиште не встановленим для використання за замовчуванням |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Заголовок відправника. Приймає просту адресу або формат `Name <email>`                               |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | Хост SMTP (обов'язково, коли `MAIL_PROVIDER=smtp`)                                                   |
| `MAIL_SMTP_PORT`     | `587`                          | Порт SMTP (за замовчуванням `587`)                                                                   |
| `MAIL_SMTP_SECURE`   | `false`                        | Неявний TLS. Встановіть `true` для порту `465`                                                       |
| `MAIL_SMTP_USER`     | _(ваш користувач)_             | Ім'я користувача SMTP (необов'язково; пропустіть для незаповнених реле)                              |
| `MAIL_SMTP_PASSWORD` | _(ваш пароль)_                 | Пароль SMTP                                                                                          |

> Пріоритет: власний поштовик організації (налаштований з панелі керування **Organization**) має пріоритет над глобальним поштовиком, який у свою чергу має пріоритет над ключем Resend за замовчуванням.

---

## Підключення вашого проекту Intlayer

Після запуску стека направте свій проект на самостійно розгорнутий бекенд та дашборд замість `intlayer.org`.

### Конфігурація проекту

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * URL самостійно розгорнутого дашборду CMS.
     * За замовчуванням: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // наприклад, http://localhost:3000

    /**
     * URL самостійно розгорнутого бекенд API.
     * За замовчуванням: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // наприклад, http://localhost:3100
  },
};

export default config;
```

Встановіть змінні середовища у файлі `.env` вашого проекту:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<ваш-client-id>
INTLAYER_CLIENT_SECRET=<ваш-client-secret>
```

Створіть облікові дані доступу у вашому самостійно розгорнутому дашборді в розділі **Проекти → Ключі доступу** за адресою `http://localhost:3000/projects`.

### SDK `@intlayer/api`

При програмному використанні SDK `@intlayer/api` передайте `backendURL` явно:

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

## Оновлення

Повторний запуск інсталятора на існуючому розгортанні виконує послідовне оновлення:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Це завантажує останні образи та перезапускає контейнери за допомогою `docker compose pull && docker compose up -d`. Існуючі томи (`mongo-data`, `redis-data`, `minio-data`) зберігаються — без втрати даних.

Щоб оновити вручну з каталогу `./intlayer/`:

```sh
docker compose pull
docker compose up -d
```

---

## Резервне копіювання та відновлення

Всі постійні дані зберігаються в трьох іменованих томах Docker.

### Резервне копіювання

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

### Відновлення

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar xzf /backup/mongo-data.tar.gz -C /

# Повторіть для redis-data та minio-data
```

---

## Обмеження

- **MongoDB має бути зовнішньою (Atlas).** Backend підключається лише через `mongodb+srv://` (побудований на основі `DB_ID` / `DB_MDP` / `DB_CLUSTER`), тому звичайний `mongodb://host:27017` — включаючи вбудований `mongod` контейнера — не може бути використаний. Надайте кластер MongoDB Atlas.
- **Немає користувацького домену.** Усі `VITE_*` URL-адреси, видимі браузером, вбудовуються в додаток під час збирання, а опублікований образ поставляється зі значеннями `localhost`. Доступ до панелі керування має здійснюватися через `http://localhost:3000`; обслуговування її на публічному домені потребувало б перебудови образу з цільовими URL-адресами вбудованими та не підтримується з коробки.
- **Email вимагає працюючого mailer.** Перша установка примушує перевірку електронної пошти, тому має бути налаштований або `RESEND_API_KEY`, або [глобальний SMTP mailer](#global-mailer) (`MAIL_PROVIDER=smtp` + `MAIL_SMTP_*`). Після того як перший адміністратор увійде, кожна організація також може налаштувати власний SMTP або Resend mailer з панелі керування.

---

## Усунення несправностей

### Бекенд циклічно перезапускається під час першого запуску

MongoDB та Redis повинні бути справними, перш ніж бекенд почне працювати. Файл compose використовує `depends_on` з `condition: service_healthy`. Якщо ви бачите багаторазові перезапуски бекенду, перевірте, чи проходять перевірки стану `mongo` та `redis`:

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

### Електронні листи не надсилаються

За замовчуванням усі вихідні електронні листи захоплюються Mailpit. Відкрийте `http://localhost:8025`, щоб побачити надіслані повідомлення. Щоб надсилати реальні електронні листи, встановіть `MAIL_PROVIDER=resend` та `RESEND_API_KEY=<ваш-ключ>` у `.env`, а потім перезапустіть бекенд:

```sh
docker compose restart backend
```

### Відсутній кошик MinIO

Якщо одноразовий сервіс `minio-init` не запустився (або запустився до того, як MinIO був готовий), створіть кошик вручну:

```sh
docker compose run --rm minio-init
```

---

## Корисні посилання

- [Документація Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)
- [Довідка щодо конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)
- [CMS SDK — `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md#програмний-доступ-за-допомогою-intlayerapi-sdk)
- [Docker Image (aymercizip/intlayer-selfhost)](https://hub.docker.com/repository/docker/aymercizip/intlayer-selfhost/general)
