---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Push словників
description: Дізнайтеся, як передати ваші словники до редактора Intlayer та CMS.
keywords:
  - Push
  - Словники
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - push
---

# Push словників

```bash
npx intlayer dictionary push
```

Якщо [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) встановлено, ви також можете передавати словники до редактора. Ця команда дозволяє зробити словники доступними в [редакторі](https://app.intlayer.org/). Таким чином ви можете ділитися своїми словниками з командою та редагувати вміст без редагування коду вашого додатка.

## Псевдоніми:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

## Аргументи:

**Параметри словників:**

- **`-d`, `--dictionaries`**: ідентифікатори словників для завантаження (pull). Якщо не вказано, будуть відправлені всі словники.

  > Example: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: ідентифікатори словників для завантаження (аліас для --dictionaries).

  > Example: `npx intlayer dictionary push --dictionary my-dictionary-id my-other-dictionary-id`

**Параметри конфігурації:**

- **`--base-dir`**: Вказати базову директорію проекту. Щоб отримати конфігурацію intlayer, команда шукатиме файл `intlayer.config.{ts,js,json,cjs,mjs}` у базовій директорії.

  > Example: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Вимкнути кеш.

  > Приклад: `npx intlayer build --no-cache`

**Параметри змінних середовища:**

- **`--env`**: Вказати оточення (наприклад, `development`, `production`). Корисно, якщо ви використовуєте змінні середовища у вашому конфігураційному файлі intlayer.
- **`--env-file`**: Вказати власний файл змінних оточення, з якого будуть завантажені змінні. Корисно, якщо ви використовуєте змінні середовища у вашому конфігураційному файлі intlayer.

  > Приклад: `npx intlayer dictionary push --env-file .env.production.local`

  > Приклад: `npx intlayer dictionary push --env production`

**Параметри виведення:**

- **`-r`, `--delete-locale-dictionary`**: Пропустити запит, який просить видалити директорії локалей після того, як словники буде відправлено, і видалити їх. За замовчуванням, якщо словник визначено локально, він перезапише віддалений вміст словників.

  > Example: `npx intlayer dictionary push -r`

  > Example: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: Пропустити запит, який просить видалити директорії локалей після того, як словники буде відправлено, і зберегти їх. За замовчуванням, якщо словник визначено локально, він перезапише віддалений вміст словників.

  > Example: `npx intlayer dictionary push -k`

  > Example: `npx intlayer dictionary push --keep-locale-dictionary`

**Параметри підготовки:**

- **`--build`**: Збирати словники перед пушем, щоб забезпечити актуальність вмісту. True примусово виконає збірку, false пропустить її, undefined дозволить використовувати кеш збірки.

**Log options:**

- **`--verbose`**: Увімкнути детальне логування для налагодження. (за замовчуванням true при використанні CLI)

**Git options:**

- **`--git-diff`**: Запускати лише для словників, які містять зміни від базової ревізії (за замовчуванням `origin/main`) до поточної гілки (за замовчуванням: `HEAD`).
- **`--git-diff-base`**: Вказати базову ревізію для git diff (за замовчуванням `origin/main`).
- **`--git-diff-current`**: Вказати поточну ревізію для git diff (за замовчуванням `HEAD`).
- **`--uncommitted`**: Включити незакомічені зміни.
- **`--unpushed`**: Включити незапушені зміни.
- **`--untracked`**: Включити невідстежувані файли.

  > Приклад: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Приклад: `npx intlayer dictionary push --uncommitted --unpushed --untracked`
