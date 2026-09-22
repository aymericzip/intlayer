---
createdAt: 2026-09-21
updatedAt: 2026-09-21
title: CLI - Init Infra
description: Узнайте, как использовать команду init infra CLI Intlayer для установки десктопного приложения или самостоятельного хостинга CMS Intlayer с помощью Docker (контейнер «все в одном» или стек Docker Compose).
keywords:
  - CLI
  - Инфраструктура
  - Собственный хостинг
  - Десктопное приложение
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
    changes: "Добавить команду init infra"
author: aymericzip
---

# Команда Intlayer CLI Init Infra

## Описание

Команда `init infra` настраивает инфраструктуру Intlayer на вашем компьютере. Она загружает размещенный установщик для вашей платформы (`https://intlayer.org/install.sh` на macOS / Linux, `https://intlayer.org/install.ps1` на Windows) и запускает его в подключенном терминале, поэтому меню и ход выполнения отображаются без изменений.

Установщик предлагает выбрать способ запуска Intlayer:

- **Десктопное приложение**: загружает нативное приложение для вашей ОС и процессора и открывает или устанавливает его. Десктопная сборка взаимодействует с бэкендом Intlayer Cloud.
- **Docker «все в одном» (All-in-one)**: панель управления + API + MongoDB + Redis + MinIO в едином контейнере с одним томом данных. Записывает `./intlayer.env` со сгенерированными секретами и загружает образ `intlayer/cms-all`.
- **Docker Compose**: один контейнер на сервис для масштабируемого хостинга. Записывает `docker-compose.yml` и `.env` в `./intlayer/` и загружает образы.

Размещенный установщик является единственным источником истины для процесса установки: CLI запускает его вместо повторной реализации тех же шагов, поэтому `npx intlayer init infra` и `curl -fsSL https://intlayer.org/install.sh | sh` выполняют одни и те же действия.

## Использование

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

Этот же шаг предлагается в интерактивном списке `npx intlayer init --interactive` в пункте **Инфраструктура (десктопное приложение / собственный хостинг)**.

## Опции

- `-m, --mode <mode>` - Необязательно. Пропускает меню установщика и запускает указанный режим напрямую. Допустимые значения: `desktop`, `docker` (all-in-one) или `compose`. Любое другое значение завершает работу с ошибкой.

## Примеры

### Интерактивный выбор режима

```bash
npx intlayer init infra
```

### Установка десктопного приложения

```bash
npx intlayer init infra --mode desktop
```

### Собственный хостинг в контейнере «все в одном»

```bash
npx intlayer init infra --mode docker
```

### Собственный хостинг с Docker Compose

```bash
npx intlayer init infra --mode compose
```

## Пример вывода

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

## Параметры установщика

Установщик считывает несколько переменных окружения, которые CLI передает без изменений. Задайте их в терминале перед выполнением команды:

```bash
INTLAYER_COMPOSE_DIR=./cms npx intlayer init infra --mode compose
```

| Переменная                | По умолчанию              | Применяется к | Описание                                                   |
| ------------------------- | ------------------------- | ------------- | ---------------------------------------------------------- |
| `INTLAYER_MODE`           | _(запрашивается)_         | все           | `desktop`, `docker` или `compose`, аналогично `--mode`     |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop       | Куда сохраняется установщик приложения                     |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker        | Образ «все в одном» для загрузки                           |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker        | Куда записывать файл переменных окружения                  |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker        | Имя контейнера                                             |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker        | Именованный том, монтируемый в `/data`                     |
| `INTLAYER_APP_PORT`       | `3000`                    | docker        | Порт хоста для панели управления                           |
| `INTLAYER_API_PORT`       | `3100`                    | docker        | Порт хоста для API                                         |
| `INTLAYER_S3_PORT`        | `9000`                    | docker        | Порт хоста для MinIO S3 API                                |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker        | Порт хоста для консоли MinIO                               |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose       | Куда записываются `docker-compose.yml` и `.env`            |
| `INTLAYER_SELFHOST_REF`   | `main`                    | оба           | Git ref, из которого загружаются compose-файл и шаблон env |

> Переменные портов изменяют только сопоставление со стороны **хоста**. В опубликованных образах значения `http://localhost:3000`, `http://localhost:3100` и `http://localhost:9000` скомпилированы в сборку, поэтому сохраняйте значения по умолчанию, если не собираете собственные образы: смотрите [руководство по самостоятельному хостингу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md#limitations).

## Требования

- **Десктопное приложение** требует [Node.js](https://nodejs.org): приложение включает сервер панели управления и запускает его с помощью установленного бинарного файла `node`.
- **Режимы Docker** требуют [Docker](https://docs.docker.com/get-docker/) (Docker Desktop с WSL 2 в Windows). Для режима Compose также требуется плагин `docker compose`.

## Примечания

- Повторный запуск команды безопасен: существующий файл окружения не перезаписывается, что также служит способом обновления (установщик загружает свежие образы и сохраняет ваши секреты).
- Установщик загружается во временную директорию и удаляется после завершения работы независимо от результата.
- Код завершения команды соответствует коду установщика. Если загрузка не удалась, CLI выводит эквивалентную команду `curl … | sh` (или `irm … | iex`).
- Режимам Docker требуется почтовый сервис для отправки ссылок авторизации. После завершения работы установщика настройте Resend или SMTP в созданном файле окружения: смотрите [Глобальный почтовый сервис](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md#global-mailer).

## Связанные документы

- [Руководство по самостоятельному хостингу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md) - Архитектура, первые шаги и ограничения каждого режима
- [Инициализация Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/init.md) - Родительская команда `init` и её интерактивный список
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md) - Возможности установленной панели управления
