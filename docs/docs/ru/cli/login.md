---
createdAt: 2025-12-16
updatedAt: 2025-12-16
title: CLI - Вход
description: Узнайте, как использовать команду login в Intlayer CLI для аутентификации в Intlayer CMS и получения учетных данных доступа.
keywords:
  - CLI
  - Login
  - Authentication
  - CMS
  - Intlayer
  - Credentials
slugs:
  - doc
  - concept
  - cli
  - login
---

# Команда входа Intlayer CLI

---

## Описание

Команда `login` Intlayer CLI позволяет аутентифицироваться в Intlayer CMS. Эта команда автоматически открывает ваш браузер по умолчанию, чтобы завершить процесс аутентификации и получить необходимые учетные данные (Client ID и Client Secret) для использования сервисов Intlayer.

## Использование

```bash
npx intlayer login [options]
```

или

```bash
intlayer login [options]
```

## Параметры

### `--cms-url <url>`

Укажите URL Intlayer CMS, к которой нужно подключиться для аутентификации.

- **Тип**: `string`
- **По умолчанию**: Значение, настроенное в `intlayer.config.*` или `https://intlayer.org`
- **Пример**:

```bash
npx intlayer login --cms-url https://intlayer.org
```

### Параметры конфигурации

Вы также можете использовать общие параметры конфигурации:

- `--env-file <path>`: Путь к файлу окружения
- `-e, --env <env>`: Среда выполнения
- `--base-dir <dir>`: Базовый каталог проекта
- `--verbose`: Включить подробный вывод (по умолчанию: true)
- `--prefix <prefix>`: Префикс для логов

## Как это работает

1. **Запуск локального сервера**: команда запускает локальный HTTP-сервер на случайном порту, чтобы получить учетные данные от CMS

Укажите URL Intlayer CMS, к которой нужно подключиться для аутентификации.

- **Тип**: `string`
- **По умолчанию**: Значение, настроенное в `intlayer.config.*` или `https://intlayer.org`
- **Пример**:

```bash
npx intlayer login --cms-url https://intlayer.org
```

### Параметры конфигурации

Вы также можете использовать общие параметры конфигурации:

- `--env-file <path>`: Путь к файлу окружения
- `-e, --env <env>`: Среда выполнения
- `--base-dir <dir>`: Базовая директория проекта
- `--verbose`: Включить подробный вывод (по умолчанию: true)
- `--prefix <prefix>`: Префикс для логов

## Как это работает

1. **Запуск локального сервера**: команда запускает локальный HTTP-сервер на случайном порту для получения учетных данных от CMS
2. **Открытие браузера**: команда автоматически открывает ваш браузер по умолчанию на URL входа в CMS
3. **Аутентификация**: завершите аутентификацию в браузере, используя вашу учетную запись Intlayer
4. **Получение учетных данных**: локальный сервер получает Client ID и Client Secret от CMS
5. **Инструкции**: команда отображает инструкции по настройке учетных данных в вашем проекте

## Вывод

После успешного входа команда выведет:

1. **Полученные учетные данные** (Client ID и Client Secret)
2. **Инструкции для файла `.env`**:

```bash
INTLAYER_CLIENT_ID=your_client_id
INTLAYER_CLIENT_SECRET=your_client_secret
```

3. **Инструкции для конфигурационного файла Intlayer**:

```typescript
{
  editor: {
    cmsURL: 'https://intlayer.org',
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
```

## Ручная настройка

Если браузер не откроется автоматически, вы можете вручную перейти по URL, отображаемому в терминале.

## Примеры

### Вход с указанием пользовательского URL CMS

```bash
npx intlayer login --cms-url https://custom-cms.example.com
```

### Вход с указанием файла окружения

```bash
npx intlayer login --env-file .env.production
```

### Вход в verbose-режиме

```bash
npx intlayer login --verbose
```

## Устранение неполадок

### Браузер не открылся

Если браузер не откроется автоматически, скопируйте URL, показанный в терминале, и откройте его вручную в браузере.

### Проблемы с подключением

Если возникают проблемы с подключением, проверьте:

1. Что URL CMS указан корректно
2. Что ваше интернет-соединение работает корректно
3. Что брандмауэры не блокируют соединение

### Учетные данные не получены

Если учетные данные не получены:

1. Убедитесь, что вы завершили процесс аутентификации в браузере
2. Проверьте, что локальный порт не заблокирован
3. Повторите команду

## Следующие шаги

После завершения входа:

1. Добавьте учетные данные в файл `.env`
2. Настройте файл `intlayer.config.*`, указав учетные данные
3. Используйте команды CLI для управления словарями:
   - [`npx intlayer push`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/push.md) - Отправить словари в CMS
   - [`npx intlayer pull`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/pull.md) - Получить словари из CMS
   - [`npx intlayer fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/fill.md) - Заполнить отсутствующие переводы

## См. также

- [Документация CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md)
- [Конфигурация Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md)
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md)
