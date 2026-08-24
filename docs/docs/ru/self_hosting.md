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

Извлеките и запустите опубликованный образ, указав учетные данные и секреты MongoDB Atlas:

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

Затем откройте **http://localhost:3000**.

> Dashboard доступен на `localhost`. См. [Ограничения](#limitations) — опубликованный образ не поддерживает пользовательские домены.

---

## Быстрый старт

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

> Порт MinIO `9000` должен быть доступен из браузера, поскольку загруженные активы (аватары, скриншоты) загружаются непосредственно из `S3_PUBLIC_URL=http://localhost:9000/intlayer`.

---

## Переменные окружения

### Обязательно

| Переменная             | Пример                       | Описание                                                                                                                                                      |
| ---------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DB_ID`                | `intlayer`                   | Пользователь MongoDB Atlas                                                                                                                                    |
| `DB_MDP`               | _(ваш пароль)_               | Пароль MongoDB Atlas                                                                                                                                          |
| `DB_CLUSTER`           | `cluster0.xxxxx.mongodb.net` | Хост кластера MongoDB Atlas (используется в URI `mongodb+srv://`)                                                                                             |
| `BETTER_AUTH_SECRET`   | _(сгенерировано)_            | 32-байтовый секрет для подписания сессии                                                                                                                      |
| `S3_SECRET_ACCESS_KEY` | _(сгенерировано)_            | Секрет для встроенного MinIO                                                                                                                                  |
| `RESEND_API_KEY`       | _(ваш ключ)_                 | Транзакционные письма через Resend. Требуется для первоначальной настройки, если вы не настроили глобальный SMTP mailer (см. [Global mailer](#global-mailer)) |

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

### Глобальная почтовая система

По умолчанию все транзакционные письма отправляются через Resend с использованием `RESEND_API_KEY`. Самостоятельно размещенные развертывания могут вместо этого маршрутизировать **все** письма — включая письма, не связанные с организацией, такие как сброс пароля и магические ссылки — через глобальную почтовую систему, настроенную с помощью переменных окружения.

Установите `MAIL_PROVIDER` для её активации. Если она не установлена, используется почтовая система Resend по умолчанию.

| Переменная           | Пример                         | Описание                                                                                                    |
| -------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `MAIL_PROVIDER`      | `smtp`                         | Глобальная доставка: `smtp` или `resend`. Оставьте не установленной для использования значений по умолчанию |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Заголовок отправителя. Принимает простой адрес или формат `Name <email>`                                    |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP-хост (обязателен, когда `MAIL_PROVIDER=smtp`)                                                          |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP-порт (по умолчанию `587`)                                                                              |
| `MAIL_SMTP_SECURE`   | `false`                        | Неявный TLS. Установите `true` для порта `465`                                                              |
| `MAIL_SMTP_USER`     | _(ваше имя пользователя)_      | Имя пользователя SMTP (необязательно; опустите для неаутентифицированных релеев)                            |
| `MAIL_SMTP_PASSWORD` | _(ваш пароль)_                 | Пароль SMTP                                                                                                 |

> Приоритет: собственная почтовая система организации (настроенная из панели управления **Organization**) имеет приоритет над глобальной почтовой системой, которая, в свою очередь, имеет приоритет над стандартным ключом Resend.

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

Это загружает последние образы и перезапускает контейнеры с помощью `docker compose pull && docker compose up -d`. Существующие тома (`mongo-data`, `redis-data`, `minio-data`) сохраняются — потери данных нет.

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

## Ограничения

- **MongoDB должна быть внешней (Atlas).** Backend подключается только через `mongodb+srv://` (собирается из `DB_ID` / `DB_MDP` / `DB_CLUSTER`), поэтому обычный `mongodb://host:27017` — включая встроенный `mongod` контейнера — не может быть использован. Предоставьте кластер MongoDB Atlas.
- **Нет пользовательского домена.** Все URL-адреса `VITE_*`, обращенные к браузеру, встраиваются в приложение во время сборки, и опубликованный образ поставляется со значениями `localhost`. Доступ к панели управления должен осуществляться через `http://localhost:3000`; подача его на общедоступный домен потребует перестройки образа с встроенными целевыми URL-адресами и не поддерживается из коробки.
- **Email требует работающего mailer.** Начальная настройка требует проверки электронной почты, поэтому должны быть настроены либо `RESEND_API_KEY`, либо [глобальный SMTP mailer](#global-mailer) (`MAIL_PROVIDER=smtp` + `MAIL_SMTP_*`). После входа первого администратора каждая организация также может настроить свой собственный SMTP или Resend mailer из панели управления.

---

## Устранение неполадок

### Бэкенд циклически перезапускается при первом запуске

MongoDB и Redis должны быть работоспособны до запуска бэкенда. Файл compose использует `depends_on` с `condition: service_healthy`. Если вы видите повторяющиеся перезапуски бэкенда, убедитесь, что проверки работоспособности `mongo` и `redis` проходят:

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

Найдите `MongoDB connection error` ближе к началу логов.

### Панель управления не может связаться с API

Убедитесь, что `VITE_BACKEND_URL` соответствует URL, по которому бэкенд доступен из **браузера** (а не из сети Docker). Если вы изменили порт бэкенда или добавили обратный прокси, пересоберите образ панели управления:

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
