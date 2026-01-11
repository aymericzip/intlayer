---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Отримати словники
description: Дізнайтеся, як витягувати словники з редактора Intlayer та CMS.
keywords:
  - Витягування
  - Словники
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

# Отримання віддалених словників

```bash
npx intlayer pull
```

Якщо встановлено [редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md), ви також можете витягувати словники з редактора. Таким чином ви можете перезаписати вміст ваших словників відповідно до потреб вашого застосунку.

## Псевдоніми:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

## Аргументи:

**Опції словника:**

- **`-d, --dictionaries`**: Ідентифікатори словників, які потрібно витягнути. Якщо не вказано, будуть витягнуті всі словники.

  > Приклад: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: Ідентифікатори словників, які потрібно витягнути (аліас для --dictionaries).

  > Приклад: `npx intlayer dictionary pull --dictionary my-dictionary-id my-other-dictionary-id`

**Параметри конфігурації:**

- **`--base-dir`**: Вказати базову директорію проекту. Щоб отримати конфігурацію intlayer, команда шукатиме файл `intlayer.config.{ts,js,json,cjs,mjs}` у базовій директорії.

  > Приклад: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Вимкнути кеш.

  > Приклад: `npx intlayer build --no-cache`

**Параметри змінних середовища:**

- **`--env`**: Вказати середовище (наприклад, `development`, `production`).
- **`--env-file`**: Надати власний файл середовища для завантаження змінних.
- **`--base-dir`**: Вказати базову директорію для проекту. Щоб отримати конфігурацію intlayer, команда шукатиме файл `intlayer.config.{ts,js,json,cjs,mjs}` у базовій директорії.

  > Приклад: `npx intlayer dictionary push --env-file .env.production.local`

  > Приклад: `npx intlayer dictionary push --env production`

**Параметри виводу:**

- **`--new-dictionaries-path`** : Шлях до директорії, у якій будуть збережені нові словники. Якщо не вказано, нові словники будуть збережені в директорії `./intlayer-dictionaries` проекту. Якщо у вмісті вашого словника вказано поле `filePath`, словники не враховуватимуть цей аргумент і будуть збережені у вказаній директорії `filePath`.

**Параметри логування:**

- **`--verbose`**: Увімкнути детальне логування для налагодження. (за замовчуванням true у CLI)

## Приклад:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```
