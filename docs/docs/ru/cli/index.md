---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: CLI
description: Узнайте, как использовать Intlayer CLI для управления вашим многоязычным сайтом. Следуйте шагам в этой онлайн-документации, чтобы настроить ваш проект за несколько минут.
keywords:
  - CLI
  - Командная строка
  - Интернационализация
  - Документация
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 7.2.3
    date: 2025-11-22
    changes: Добавлена команда transform
  - version: 7.1.0
    date: 2025-11-05
    changes: Добавлена опция skipIfExists для команды translate
  - version: 6.1.4
    date: 2025-01-27
    changes: Добавлены псевдонимы для аргументов и команд CLI
  - version: 6.1.3
    date: 2025-10-05
    changes: Добавлена опция build для команд
  - version: 6.1.2
    date: 2025-09-26
    changes: Добавлена команда version
  - version: 6.1.0
    date: 2025-09-26
    changes: Установлена опция verbose по умолчанию в true через CLI
  - version: 6.1.0
    date: 2025-09-23
    changes: Добавлена команда watch и опция with
  - version: 6.0.1
    date: 2025-09-23
    changes: Добавлена команда editor
  - version: 6.0.0
    date: 2025-09-17
    changes: Добавлены команды content test и list
  - version: 5.5.11
    date: 2025-07-11
    changes: Обновлена документация параметров команд CLI
  - version: 5.5.10
    date: 2025-06-29
    changes: Инициализация истории
---

# Intlayer CLI

---

## Содержание

<TOC/>

---

## Установка пакета

Установите необходимые пакеты с помощью npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> Если пакет `intlayer` уже установлен, CLI устанавливается автоматически. Вы можете пропустить этот шаг.

## Пакет intlayer-cli

Пакет `intlayer-cli` предназначен для транспиляции ваших [объявлений intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md) в словари.

Этот пакет транспилирует все файлы intlayer, такие как `src/**/*.content.{ts|js|mjs|cjs|json}`. [Смотрите, как объявлять ваши файлы объявлений Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Для интерпретации словарей intlayer вы можете использовать интерпретаторы, такие как [react-intlayer](https://www.npmjs.com/package/react-intlayer) или [next-intlayer](https://www.npmjs.com/package/next-intlayer)

## Поддержка конфигурационных файлов

Intlayer поддерживает несколько форматов конфигурационных файлов:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Чтобы узнать, как настроить доступные локали или другие параметры, обратитесь к [документации по конфигурации здесь](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

## Запуск команд intlayer

### Аутентификация

- **[Вход](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/login.md)** - Аутентификация в Intlayer CMS и получение учетных данных доступа

### Основные команды

- **[Сборка словарей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/build.md)** - Сборка ваших словарей из файлов декларации контента
- **[Отслеживание словарей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/watch.md)** - Отслеживание изменений и автоматическая сборка словарей
- **[Проверка версии CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/version.md)** - Проверка установленной версии Intlayer CLI

### Управление словарями

- **[Отправка словарей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/push.md)** - Отправка словарей в редактор и CMS Intlayer
- **[Загрузка словарей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/pull.md)** - Загрузка словарей из редактора и CMS Intlayer
- **[Заполнение словарей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/fill.md)** - Заполнение, аудит и перевод словарей с помощью ИИ
- **[Тестирование отсутствующих переводов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/test.md)** - Тестирование и выявление отсутствующих переводов
- **[Список файлов декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/list.md)** - Список всех файлов декларации контента в вашем проекте

### Управление компонентами

- **[Преобразование компонентов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/transform.md)** - Преобразование существующих компонентов для использования Intlayer

### Конфигурация

- **[Управление конфигурацией](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/configuration.md)** - Получение и отправка вашей конфигурации Intlayer в CMS

### Управление документацией

- **[Перевод документа](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/doc-translate.md)** - Автоматический перевод файлов документации с помощью ИИ
- **[Проверка документа](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/doc-review.md)** - Проверка файлов документации на качество и согласованность

### Редактор и Live Sync

- **[Команды редактора](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/editor.md)** - Используйте команды редактора Intlayer
- **[Команды Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/live.md)** - Используйте Live Sync для отражения изменений контента CMS во время выполнения

### Инструменты разработки

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/sdk.md)** - Используйте Intlayer CLI SDK в вашем собственном коде
- **[Команда отладки Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/debug.md)** - Отладка и устранение проблем с Intlayer CLI

## Использование команд intlayer в вашем `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:transform": "npx intlayer transform",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Примечание**: Вы также можете использовать более короткие псевдонимы:
>
> - `npx intlayer list` вместо `npx intlayer content list`
> - `npx intlayer test` вместо `npx intlayer content test`
