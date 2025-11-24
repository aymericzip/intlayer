---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Отправка словарей
description: Узнайте, как отправлять ваши словари в редактор и CMS Intlayer.
keywords:
  - Отправка
  - Словари
  - CLI
  - Intlayer
  - Редактор
  - CMS
slugs:
  - doc
  - concept
  - cli
  - push
---

# Отправка словарей

```bash
npx intlayer dictionary push
```

Если установлен [редактор intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md), вы также можете отправлять словари в редактор. Эта команда позволит сделать словари доступными в [редакторе](https://intlayer.org/dashboard). Таким образом, вы можете делиться своими словарями с командой и редактировать контент без изменения кода вашего приложения.

## Псевдонимы:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

## Аргументы:

**Опции словарей:**

- **`-d`, `--dictionaries`**: идентификаторы словарей для отправки. Если не указано, будут отправлены все словари.

  > Пример: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: идентификаторы словарей для отправки (псевдоним для --dictionaries).

  > Пример: `npx intlayer dictionary push --dictionary my-dictionary-id my-other-dictionary-id`

**Опции конфигурации:**

- **`--base-dir`**: Укажите базовый каталог проекта. Для получения конфигурации intlayer команда будет искать файл `intlayer.config.{ts,js,json,cjs,mjs}` в базовом каталоге.

  > Пример: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Отключить кэш.

  > Пример: `npx intlayer build --no-cache`

**Опции переменных окружения:**

- **`--env`**: Указать окружение (например, `development`, `production`). Полезно, если вы используете переменные окружения в вашем файле конфигурации intlayer.
- **`--env-file`**: Указать пользовательский файл окружения для загрузки переменных. Полезно, если вы используете переменные окружения в вашем файле конфигурации intlayer.

  > Пример: `npx intlayer dictionary push --env-file .env.production.local`

  > Пример: `npx intlayer dictionary push --env production`

**Опции вывода:**

- **`-r`, `--delete-locale-dictionary`**: Пропустить вопрос о том, удалять ли каталоги локалей после отправки словарей, и удалить их. По умолчанию, если словарь определён локально, он перезапишет содержимое удалённых словарей.

  > Пример: `npx intlayer dictionary push -r`

  > Пример: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: Пропустить вопрос о том, удалять ли каталоги локалей после отправки словарей, и сохранить их. По умолчанию, если словарь определён локально, он перезапишет содержимое удалённых словарей.

  > Пример: `npx intlayer dictionary push -k`

  > Пример: `npx intlayer dictionary push --keep-locale-dictionary`

**Опции подготовки:**

- **`--build`**: Собрать словари перед отправкой, чтобы гарантировать актуальность содержимого. Значение true принудительно запускает сборку, false пропускает сборку, undefined позволяет использовать кэш сборки.

**Опции логирования:**

- **`--verbose`**: Включить подробное логирование для отладки. (по умолчанию true при использовании CLI)

**Опции Git:**

- **`--git-diff`**: Запускать только для словарей, которые содержат изменения от базовой ветки (по умолчанию `origin/main`) до текущей ветки (по умолчанию: `HEAD`).
- **`--git-diff-base`**: Указать базовую ссылку для git diff (по умолчанию `origin/main`).
- **`--git-diff-current`**: Указать текущую ссылку для git diff (по умолчанию `HEAD`).
- **`--uncommitted`**: Включить незафиксированные изменения.
- **`--unpushed`**: Включить неотправленные изменения.
- **`--untracked`**: Включить неотслеживаемые файлы.

  > Пример: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Пример: `npx intlayer dictionary push --uncommitted --unpushed --untracked`
