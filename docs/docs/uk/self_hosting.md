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

Інсталятор генерує готовий до використання файл `.env`. Таблиця нижче описує кожну змінну.

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

## Використання зворотного проксі (Nginx / Caddy)

Для виробничих розгортань розмістіть зворотний проксі перед контейнерами застосунку та бекенду замість прямого їх виставлення.

### Приклад Nginx

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

Оновіть наступні змінні `.env`, щоб вони відповідали вашим публічним доменам:

```sh
BACKEND_URL=https://api.example.com
APP_URL=https://cms.example.com
DOMAIN=example.com
VITE_BACKEND_URL=https://api.example.com
VITE_DOMAIN=example.com
```

> Змінні `VITE_*` вбудовуються в образ дашборду під час збірки. Якщо ви зміните їх після збірки образу, вам потрібно перезібрати образ `app` (`docker compose build app`) або використовувати ін'єкцію конфігурації під час виконання.

---

## Усунення несправностей

### Бекенд циклічно перезапускається під час першого запуску

MongoDB та Redis повинні бути справними, перш ніж бекенд почне працювати. Файл compose використовує `depends_on` з `condition: service_healthy`. Якщо ви бачите багаторазові перезапуски бекенду, перевірте, чи проходять перевірки стану `mongo` та `redis`:

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

### Дашборд не може дістатися до API

Переконайтеся, що `VITE_BACKEND_URL` відповідає URL-адресі, за якою бекенд доступний з **браузера** (не мережі Docker). Якщо ви змінили порт бекенду або додали зворотний проксі, перезіберіть образ дашборду:

```sh
docker compose build app
docker compose up -d app
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
