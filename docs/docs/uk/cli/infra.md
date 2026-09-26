---
createdAt: 2026-09-21
updatedAt: 2026-09-21
priority: 5
title: CLI - Init Infra
description: Дізнайтеся, як використовувати команду init infra CLI Intlayer для встановлення десктопного застосунку або запуску Intlayer CMS на власній інфраструктурі за допомогою Docker (all-in-one контейнер або стек Docker Compose).
keywords:
  - CLI
  - Інфраструктура
  - Власний хостинг
  - Десктопний застосунок
  - Docker
  - Docker Compose
  - CMS
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - infra
history:
  - version: 9.5.6
    date: 2026-09-21
    changes: "Додати команду init infra"
author: aymericzip
---

# Команда Intlayer CLI Init Infra

## Опис

Команда `init infra` налаштовує інфраструктуру Intlayer на вашому комп'ютері. Вона завантажує інсталятор для вашої платформи (`https://intlayer.org/install.sh` на macOS / Linux, `https://intlayer.org/install.ps1` на Windows) і запускає його у вашому терміналі, тому меню інсталятора та вивід прогресу відображаються без змін.

Інсталятор запитує, як саме ви хочете запускати Intlayer:

- **Десктопний застосунок**: завантажує нативну панель керування для вашої ОС та процесора і відкриває або встановлює її. Десктопна версія взаємодіє з бекендом Intlayer Cloud.
- **All-in-one Docker**: панель керування + API + MongoDB + Redis + MinIO в одному контейнері з одним томом даних. Записує `./intlayer.env` зі згенерованими секретами та завантажує образ `intlayer/cms-all`.
- **Docker Compose**: один контейнер на сервіс для масштабованого власного хостингу. Записує `docker-compose.yml` та `.env` у `./intlayer/` і завантажує образи.

Розміщений інсталятор є єдиним джерелом правди для процесу встановлення: CLI запускає його замість повторної реалізації тих самих кроків, тому `npx intlayer init infra` та `curl -fsSL https://intlayer.org/install.sh | sh` роблять абсолютно те саме.

## Використання

```bash packageManager="npm"
npx intlayer init infra [options]
```

```bash packageManager="yarn"
yarn intlayer init infra [options]
```

```bash packageManager="pnpm"
pnpm intlayer init infra [options]
```

```bash packageManager="bun"
bun x intlayer init infra [options]
```

Цей самий крок пропонується в інтерактивному списку `npx intlayer init --interactive` у пункті **Інфраструктура (десктопний застосунок / власний хостинг)**.

## Опції

- `-m, --mode <mode>` - Необов'язково. Пропускає меню інсталятора та запускає вибраний режим безпосередньо. Допустимі значення: `desktop`, `docker` (all-in-one) або `compose`. Будь-яке інше значення завершує роботу з помилкою.

## Приклади

### Інтерактивний вибір режиму

```bash
npx intlayer init infra
```

### Встановлення десктопного застосунку

```bash
npx intlayer init infra --mode desktop
```

### Власний хостинг з all-in-one контейнером

```bash
npx intlayer init infra --mode docker
```

### Власний хостинг з Docker Compose

```bash
npx intlayer init infra --mode compose
```

## Приклад виводу

```bash
npx intlayer init infra --mode compose
◇  Installer downloaded
▸ Fetching docker-compose.yml into ./intlayer
▸ Writing ./intlayer/.env
▸ Pulling images

  Everything is installed. Two steps left.

  1. Configure a mailer in:

       ./intlayer/.env

     Either RESEND_API_KEY (resend.com) or the MAIL_SMTP_* block — the first
     account cannot be verified without a working mailer.
  2. Start the stack:

       cd ./intlayer && docker compose up -d

  Then open http://localhost:3000 — first boot initialises the
  datastores, so give it a minute. The first account you create becomes the
  super admin.

    Logs      docker compose logs -f
    Stop      docker compose down
    Upgrade   docker compose pull && docker compose up -d
```

## Налаштування інсталятора

Інсталятор зчитує кілька змінних середовища, які CLI передає без змін. Задайте їх у командній оболонці перед запуском команди:

```bash
INTLAYER_COMPOSE_DIR=./cms npx intlayer init infra --mode compose
```

| Змінна                    | За замовчуванням          | Застосовується до | Опис                                                             |
| ------------------------- | ------------------------- | ----------------- | ---------------------------------------------------------------- |
| `INTLAYER_MODE`           | _(запитується)_           | всі               | `desktop`, `docker` або `compose`, аналогічно до `--mode`        |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop           | Куди зберігається інсталятор застосунку                          |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker            | Образ all-in-one для завантаження                                |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker            | Куди записувати файл середовища                                  |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker            | Назва контейнера                                                 |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker            | Іменований том, змонтований у `/data`                            |
| `INTLAYER_APP_PORT`       | `3000`                    | docker            | Порт хоста для панелі керування                                  |
| `INTLAYER_API_PORT`       | `3100`                    | docker            | Порт хоста для API                                               |
| `INTLAYER_S3_PORT`        | `9000`                    | docker            | Порт хоста для MinIO S3 API                                      |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker            | Порт хоста для консолі MinIO                                     |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose           | Куди записуються `docker-compose.yml` та `.env`                  |
| `INTLAYER_SELFHOST_REF`   | `main`                    | обидва            | Git-посилання, з якого завантажуються compose-файл та шаблон env |

> Змінні портів змінюють лише сторону **хоста** у відображенні. Опубліковані образи мають значення `http://localhost:3000`, `http://localhost:3100` та `http://localhost:9000`, скомпільовані в пакет панелі керування, тому залишайте значення за замовчуванням, якщо не збираєте власні образи: див. [посібник із власного хостингу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md#limitations).

## Вимоги

- **Десктопний застосунок** потребує [Node.js](https://nodejs.org): застосунок містить сервер панелі керування та запускає його за допомогою системного бінарного файлу `node`.
- **Режими Docker** потребують [Docker](https://docs.docker.com/get-docker/) (Docker Desktop із бекендом WSL 2 на Windows). Для режиму Compose також потрібен плагін `docker compose`.

## Примітки

- Повторний запуск команди є безпечним: наявний файл середовища ніколи не перезаписується, що також слугує шляхом оновлення (інсталятор завантажує найновіші образи та зберігає ваші секрети).
- Інсталятор завантажується в тимчасовий каталог і видаляється після завершення незалежно від результату.
- Код виходу команди відповідає коду інсталятора. Якщо завантаження не вдалося, CLI виводить еквівалентну команду `curl … | sh` (або `irm … | iex`).
- Режимам Docker все ще потрібен поштовий сервіс для надсилання листів для входу. Після завершення роботи інсталятора налаштуйте Resend або SMTP у згенерованому файлі середовища: див. [Глобальний поштовий сервіс](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md#global-mailer).

## Пов'язані посилання

- [Посібник із власного хостингу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md) - Архітектура, перші кроки та обмеження кожного режиму
- [Ініціалізація Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/init.md) - Батьківська команда `init` та її інтерактивний чеклист
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md) - Можливості щойно встановленої панелі керування
