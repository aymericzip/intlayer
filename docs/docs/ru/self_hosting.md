---
createdAt: 2026-06-30
updatedAt: 2026-06-30
title: Самостоятельный хостинг Intlayer
description: Запустите полноценный экземпляр Intlayer на собственной инфраструктуре с помощью одной команды. Аккаунт Intlayer Cloud не требуется.
keywords:
  - Самостоятельный хостинг
  - Docker
  - Docker Compose
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

Intlayer может полностью работать на вашей собственной инфраструктуре — аккаунт Intlayer Cloud не требуется. Одна команда запускает готовый к production стек:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Установщик загружает `docker-compose.yml` и `.env`, автоматически генерирует необходимые секреты и запускает все контейнеры с помощью `docker compose up -d`.

## Оглавление

<TOC/>

---

## Архитектура

```
                ┌─────────────────────────────┐
 браузер ──────▶ │ приложение  (TanStack Start)  :3000│ ──┐
                └─────────────────────────────┘   │ VITE_BACKEND_URL
                ┌─────────────────────────────┐   │
                │  бэкенд (Fastify/Bun)  :3100│ ◀─┘
                └──────────────┬──────────────┘
          ┌──────────┬─────────┼──────────┬───────────┐
          ▼          ▼         ▼          ▼           ▼
     mongo:27017  redis:6379  minio:9000  mailpit:1025  Chromium
     (RS из 1 узла)          (API S3)     (SMTP)        (в образе)
                             minio:9001   mailpit:8025
                             (консоль)    (веб-интерфейс)
```

Chromium (используемый для генерации скриншотов Puppeteer) включен в образ бэкенда — отдельный контейнер не требуется.

---

## Предварительные требования

- **Docker** ≥ 24 и **Docker Compose** ≥ v2. Если что-либо из этого отсутствует, установщик выведет ссылку для установки и завершит работу.
- Порты `3000`, `3100`, `8025`, `9000` и `9001` должны быть доступны на хосте.
- Хост на Linux или macOS (или WSL2 на Windows).

---

## Быстрый старт

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Что делает установщик:

1.  Проверяет наличие `docker` и `docker compose`.
2.  Загружает `docker-compose.yml` и `.env.example` в `./intlayer/`.
3.  Если файл `.env` отсутствует, копирует пример и генерирует случайные секреты для `BETTER_AUTH_SECRET`, `S3_ACCESS_KEY_ID` и `S3_SECRET_ACCESS_KEY` с помощью `openssl rand`.
4.  Запускает `docker compose pull` + `docker compose up -d`.
5.  Выводит URL: панель управления `:3000`, API `:3100`, интерфейс электронной почты `:8025`, консоль MinIO `:9001`.

После запуска стека откройте **http://localhost:3000** и создайте свою первую учетную запись.

---

## Сервисы

| Сервис      | Образ                                 | Порт(ы) хоста                         | Назначение                                                        |
| ----------- | ------------------------------------- | ------------------------------------- | ----------------------------------------------------------------- |
| **app**     | построен из `apps/app/Dockerfile`     | `3000`                                | Панель управления TanStack Start (пользовательский интерфейс CMS) |
| **backend** | построен из `apps/backend/Dockerfile` | `3100`                                | REST API Fastify (эндпоинт `/health`)                             |
| **mongo**   | `mongo:7`                             | внутренний                            | Репликационный набор из одного узла (`rs0`)                       |
| **redis**   | `redis:7-alpine`                      | внутренний                            | Очереди заданий (BullMQ) и кеширование (ioredis)                  |
| **minio**   | `minio/minio`                         | `9000` (S3), `9001` (консоль)         | S3-совместимое объектное хранилище для аватаров и скриншотов      |
| **mailpit** | `axllent/mailpit`                     | `1025` (SMTP), `8025` (веб-интерфейс) | Локальный приемник транзакционных электронных писем               |

Внутренние порты (mongo, redis) по умолчанию не открыты на хосте.

> Порт MinIO `9000` должен быть доступен из браузера, поскольку загруженные активы (аватары, скриншоты) загружаются непосредственно из `S3_PUBLIC_URL=http://localhost:9000/intlayer`.

---

## Переменные окружения

Установщик генерирует готовый к использованию файл `.env`. В таблице ниже описана каждая переменная.

### Обязательные (автоматически генерируемые или запрашиваемые)

| Переменная             | Пример                                          | Описание                                                    |
| ---------------------- | ----------------------------------------------- | ----------------------------------------------------------- |
| `NODE_ENV`             | `production`                                    | Среда выполнения                                            |
| `PORT`                 | `3100`                                          | Порт прослушивания бэкенда                                  |
| `BACKEND_URL`          | `http://localhost:3100`                         | Публичный URL API бэкенда                                   |
| `APP_URL`              | `http://localhost:3000`                         | Публичный URL панели управления                             |
| `DOMAIN`               | `localhost`                                     | Домен для файлов cookie                                     |
| `MONGODB_URI`          | `mongodb://mongo:27017/intlayer?replicaSet=rs0` | Полный URI для подключения к MongoDB                        |
| `REDIS_URL`            | `redis://redis:6379`                            | URL для подключения к Redis                                 |
| `BETTER_AUTH_SECRET`   | _(сгенерирован)_                                | 32-байтный секрет для подписи сессий                        |
| `MAIL_PROVIDER`        | `smtp`                                          | Транспорт для почты: `smtp` или `resend`                    |
| `MAIL_SMTP_HOST`       | `mailpit`                                       | Имя хоста SMTP (имя контейнера Mailpit)                     |
| `MAIL_SMTP_PORT`       | `1025`                                          | Порт SMTP                                                   |
| `MAIL_FROM`            | `Intlayer <no-reply@localhost>`                 | Адрес отправителя                                           |
| `S3_ENDPOINT`          | `http://minio:9000`                             | S3-совместимый эндпоинт                                     |
| `S3_PUBLIC_URL`        | `http://localhost:9000/intlayer`                | Публичный URL для загрузки активов браузером                |
| `S3_BUCKET_NAME`       | `intlayer`                                      | Имя корзины                                                 |
| `S3_ACCESS_KEY_ID`     | _(сгенерирован)_                                | Ключ доступа MinIO                                          |
| `S3_SECRET_ACCESS_KEY` | _(сгенерирован)_                                | Секретный ключ MinIO                                        |
| `VITE_BACKEND_URL`     | `http://localhost:3100`                         | URL бэкенда, встроенный в панель управления во время сборки |
| `VITE_DOMAIN`          | `localhost`                                     | Домен, встроенный в панель управления во время сборки       |

### Необязательные (функции работают с ограничениями, если отсутствуют)

| Переменная                                               | Функция                                                                                   |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `OPENAI_API_KEY`                                         | Перевод и аудит контента с помощью ИИ                                                     |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_*` | Управление счетами и подписками                                                           |
| `RESEND_API_KEY`                                         | Транзакционные электронные письма через Resend (переопределяет Mailpit, если установлено) |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`               | Вход через GitHub OAuth                                                                   |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`               | Вход через Google OAuth                                                                   |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`               | Вход через GitLab OAuth                                                                   |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`         | Вход через Microsoft OAuth                                                                |
| `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`           | Вход через LinkedIn OAuth                                                                 |
| `ATLASSIAN_CLIENT_ID`, `ATLASSIAN_CLIENT_SECRET`         | Вход через Atlassian OAuth                                                                |

---

## Подключение вашего проекта Intlayer

После запуска стека направьте свой проект на самохостинговый бэкенд и панель управления вместо `intlayer.org`.

### Конфигурация проекта

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * URL самохостинговой панели управления CMS.
     * По умолчанию: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // e.g. http://localhost:3000

    /**
     * URL самохостингового API бэкенда.
     * По умолчанию: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // e.g. http://localhost:3100
  },
};

export default config;
```

Установите переменные окружения в файле `.env` вашего проекта:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

Создайте учетные данные доступа на вашей самохостинговой панели управления в разделе **Проекты → Ключи доступа** по адресу `http://localhost:3000/projects`.

### SDK `@intlayer/api`

При программном использовании SDK `@intlayer/api` явно передайте `backendURL`:

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

## Обновление

Повторный запуск установщика на существующем развертывании выполняет скользящее обновление:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Это загружает последние образы и перезапускает контейнеры с помощью `docker compose pull && docker compose up -d`. Существующие тома (`mongo-data`, `redis-data`, `minio-data`) сохраняются — потери данных нет.

Для обновления вручную из директории `./intlayer/`:

```sh
docker compose pull
docker compose up -d
```

---

## Резервное копирование и восстановление

Все постоянные данные хранятся в трех именованных томах Docker.

### Резервное копирование

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

### Восстановление

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar xzf /backup/mongo-data.tar.gz -C /

# Повторите для redis-data и minio-data
```

---

## Использование обратного прокси (Nginx / Caddy)

Для production развертываний разместите обратный прокси перед контейнерами приложения и бэкенда вместо того, чтобы открывать их напрямую.

### Пример Nginx

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

Обновите следующие переменные `.env`, чтобы они соответствовали вашим публичным доменам:

```sh
BACKEND_URL=https://api.example.com
APP_URL=https://cms.example.com
DOMAIN=example.com
VITE_BACKEND_URL=https://api.example.com
VITE_DOMAIN=example.com
```

> Переменные `VITE_*` встраиваются в образ панели управления во время сборки. Если вы измените их после сборки образа, вам потребуется пересобрать образ `app` (`docker compose build app`) или использовать инъекцию runtime-конфигурации.

---

## Устранение неполадок

### Бэкенд циклически перезапускается при первом запуске

MongoDB и Redis должны быть работоспособны до запуска бэкенда. Файл compose использует `depends_on` с `condition: service_healthy`. Если вы видите повторяющиеся перезапуски бэкенда, убедитесь, что проверки работоспособности `mongo` и `redis` проходят:

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

### Панель управления не может связаться с API

Убедитесь, что `VITE_BACKEND_URL` соответствует URL, по которому бэкенд доступен из **браузера** (а не из сети Docker). Если вы изменили порт бэкенда или добавили обратный прокси, пересоберите образ панели управления:

```sh
docker compose build app
docker compose up -d app
```

### Электронные письма не отправляются

По умолчанию вся исходящая почта перехватывается Mailpit. Откройте `http://localhost:8025`, чтобы увидеть отправленные сообщения. Для отправки реальных писем установите `MAIL_PROVIDER=resend` и `RESEND_API_KEY=<your-key>` в `.env`, затем перезапустите бэкенд:

```sh
docker compose restart backend
```

### Отсутствует корзина MinIO

Если одноразовый сервис `minio-init` не запустился (или запустился до того, как MinIO был готов), создайте корзину вручную:

```sh
docker compose run --rm minio-init
```

---

## Полезные ссылки

- [Документация Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md)
- [Справочник по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md)
- [CMS SDK — `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Docker Image (aymercizip/intlayer-selfhost)](https://hub.docker.com/repository/docker/aymercizip/intlayer-selfhost/general)
