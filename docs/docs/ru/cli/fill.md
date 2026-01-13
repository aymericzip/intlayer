---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Заполнение словарей
description: Узнайте, как заполнять, проверять и переводить ваши словари с помощью ИИ.
keywords:
  - Заполнение
  - Проверка
  - Перевод
  - Словари
  - CLI
  - Intlayer
  - ИИ
slugs:
  - doc
  - concept
  - cli
  - fill
---

# Заполнение / проверка / перевод словарей

```bash
npx intlayer fill
```

Эта команда анализирует ваши файлы деклараций контента на предмет возможных проблем, таких как отсутствующие переводы, структурные несоответствия или несоответствия типов. Если будут обнаружены какие-либо проблемы, **intlayer fill** предложит или применит обновления для поддержания ваших словарей в согласованном и полном состоянии.

Ключевые моменты:

- Разделяет большие JSON-файлы на части, чтобы оставаться в пределах окна контекста модели ИИ.
- Повторяет перевод, если формат вывода неверен.
- Включает контекст, специфичный для приложения и файла, для повышения точности перевода.
- Сохраняет существующие переводы, не перезаписывая их.
- Обрабатывает файлы, части и локали параллельно с использованием системы очередей для увеличения скорости.

## Псевдонимы:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

## Примеры вывода:

```bash
npx intlayer fill

Preparing Intlayer (v7.5.14)
Done 76ms
@intlayer/ai found - Run process locally
Provider: (default) - Model: (default) - API Key: ✓
Affected dictionary keys for processing: app, comp-test, hello-world, lang-switcher
 - [comp-test]      No locales to fill, Skipping comp-test.content.json
 - [app]            Processing app.content.tsx
 - [app]            Filling missing metadata for app.content.tsx
 - [hello-world]    Processing test.content.ts
 - [hello-world]   [French (fr)]      Preparing test.content.ts
 - [hello-world]   [Spanish (es)]     Preparing test.content.ts
 - [lang-switcher]  Processing langSwitcher.content.ts
 - [lang-switcher]  Filling missing metadata for langSwitcher.content.ts
 - [hello-world]    Translation completed successfully for test.content.ts
 - [lang-switcher] [Spanish (es)]     Preparing langSwitcher.content.ts
 - [app]           [French (fr)]      Preparing app.content.tsx
 - [app]           [Spanish (es)]     Preparing app.content.tsx
 - [hello-world]    Content declaration written to test.content.ts
 - [app]            Translation completed successfully for app.content.tsx
 - [app]            Content declaration written to app.content.tsx
 - [lang-switcher]  Translation completed successfully for langSwitcher.content.ts
 - [lang-switcher]  Content declaration written to langSwitcher.content.ts
```

## Аргументы:

**Опции списка файлов:**

- **`-f, --file [files...]`**: Список конкретных файлов деклараций контента для проверки. Если не указано, будут проверены все обнаруженные файлы `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` на основе вашей конфигурации.

  > Пример: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: Фильтрация словарей по ключам. Если не указано, будут проверены все словари.

  > Пример: `npx intlayer dictionary fill -k key1 key2`

- **`--key [keys...]`**: Фильтрация словарей по ключам (псевдоним для --keys).

  > Пример: `npx intlayer dictionary fill --key key1 key2`

- **`--excluded-keys [excludedKeys...]`**: Исключение словарей на основе ключей. Если не указано, будут проверены все словари.

  > Пример: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--excluded-key [excludedKeys...]`**: Исключение словарей на основе ключей (псевдоним для --excluded-keys).

  > Пример: `npx intlayer dictionary fill --excluded-key key1 key2`

- **`--path-filter [pathFilters...]`**: Фильтрация словарей на основе шаблона glob для путей файлов.

  > Пример: `npx intlayer dictionary fill --path-filter "src/home/**"`

**Опции вывода записей:**

- **`--source-locale [sourceLocale]`**: Исходная локаль для перевода. Если не указано, будет использована локаль по умолчанию из вашей конфигурации.

- **`--output-locales [outputLocales...]`**: Целевые локали для перевода. Если не указано, будут использованы все локали из вашей конфигурации, кроме исходной локали.

- **`--mode [mode]`**: Режим перевода: `complete`, `review`. По умолчанию `complete`. `complete` заполнит весь отсутствующий контент, `review` заполнит отсутствующий контент и проверит существующие ключи.

**Опции Git:**

- **`--git-diff`**: Запускать только для словарей, которые содержат изменения от базы (по умолчанию `origin/main`) до текущей ветки (по умолчанию: `HEAD`).
- **`--git-diff-base`**: Указать базовую ссылку для git diff (по умолчанию `origin/main`).
- **`--git-diff-current`**: Указать текущую ссылку для git diff (по умолчанию `HEAD`).
- **`--uncommitted`**: Включить неподтверждённые изменения.
- **`--unpushed`**: Включить непушенные изменения.
- **`--untracked`**: Включить неотслеживаемые файлы.

  > Пример: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Пример: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**Опции ИИ:**

- **`--model [model]`**: Модель ИИ для использования при переводе (например, `gpt-3.5-turbo`).
- **`--provider [provider]`**: Провайдер ИИ для использования при переводе.
- **`--temperature [temperature]`**: Параметр температуры для модели ИИ.
- **`--api-key [apiKey]`**: Предоставить собственный API-ключ для сервиса ИИ.
- **`--custom-prompt [prompt]`**: Предоставить пользовательский запрос для инструкций по переводу.
- **`--application-context [applicationContext]`**: Предоставить дополнительный контекст для перевода ИИ.

  > Пример: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "Моё приложение — магазин для кошек"`

  **Опции переменных окружения:**

- **`--env`**: Указать окружение (например, `development`, `production`).
- **`--env-file [envFile]`**: Указать пользовательский файл окружения для загрузки переменных.

  > Пример: `npx intlayer fill --env-file .env.production.local`

  > Пример: `npx intlayer fill --env production`

**Опции конфигурации:**

- **`--base-dir`**: Указать базовую директорию для проекта.

  > Пример: `npx intlayer fill --base-dir ./src`

- **`--no-cache`**: Отключить кэш.

  > Пример: `npx intlayer build --no-cache`

**Опции подготовки:**

- **`--build`**: Собрать словари перед пушем, чтобы гарантировать актуальность контента. Значение true принудительно запускает сборку, false пропускает сборку, undefined позволяет использовать кэш сборки.

- **`--skip-metadata`**: Пропустить заполнение отсутствующих метаданных (описание, заголовок, теги) для словарей.

**Опции логирования:**

- **`--verbose`**: Включить подробное логирование для отладки. (по умолчанию true при использовании CLI)

## Пример:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Эта команда переведет контент с английского на французский и испанский для всех файлов декларации контента в директории `src/home/` с использованием модели GPT-3.5 Turbo.
