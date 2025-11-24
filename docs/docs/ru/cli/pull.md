---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Загрузка словарей
description: Узнайте, как загружать словари из редактора Intlayer и CMS.
keywords:
  - Загрузка
  - Словари
  - CLI
  - Intlayer
  - Редактор
  - CMS
slugs:
  - doc
  - concept
  - cli
  - pull
---

# Загрузка удалённых словарей

```bash
npx intlayer pull
```

Если установлен [редактор intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md), вы также можете загружать словари из редактора. Таким образом, вы можете перезаписать содержимое ваших словарей в соответствии с потребностями вашего приложения.

## Псевдонимы:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

## Аргументы:

**Опции словаря:**

- **`-d, --dictionaries`**: Идентификаторы словарей для загрузки. Если не указано, будут загружены все словари.

  > Пример: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: Идентификаторы словарей для загрузки (псевдоним для --dictionaries).

  > Пример: `npx intlayer dictionary pull --dictionary my-dictionary-id my-other-dictionary-id`

**Опции конфигурации:**

- **`--base-dir`**: Укажите базовый каталог проекта. Для получения конфигурации intlayer команда будет искать файл `intlayer.config.{ts,js,json,cjs,mjs}` в базовом каталоге.

  > Пример: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Отключить кэш.

  > Пример: `npx intlayer build --no-cache`

**Опции переменных окружения:**

- **`--env`**: Укажите окружение (например, `development`, `production`).
- **`--env-file`**: Укажите пользовательский файл окружения для загрузки переменных.
- **`--base-dir`**: Укажите базовый каталог проекта. Для получения конфигурации intlayer команда будет искать файл `intlayer.config.{ts,js,json,cjs,mjs}` в базовом каталоге.

  > Пример: `npx intlayer dictionary push --env-file .env.production.local`

  > Пример: `npx intlayer dictionary push --env production`

**Опции вывода:**

- **`--new-dictionaries-path`** : Путь к каталогу, в котором будут сохранены новые словари. Если не указано, новые словари будут сохранены в каталоге `./intlayer-dictionaries` проекта. Если в содержимом вашего словаря указано поле `filePath`, словари не будут учитывать этот аргумент и будут сохранены в указанном каталоге `filePath`.

**Опции логирования:**

- **`--verbose`**: Включить подробное логирование для отладки. (по умолчанию включено при использовании CLI)

## Пример:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```
