---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: CLI
description: Узнайте, как использовать Intlayer CLI для управления вашим многоязычным сайтом. Следуйте шагам в этой онлайн-документации, чтобы настроить проект за несколько минут.
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
---

# Intlayer CLI

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

Пакет `intlayer-cli` предназначен для транспиляции ваших [объявлений intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md) в словари.

Этот пакет транспилирует все файлы intlayer, такие как `src/**/*.content.{ts|js|mjs|cjs|json}`. [Смотрите, как объявлять ваши файлы объявлений Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Для интерпретации словарей intlayer вы можете использовать интерпретаторы, такие как [react-intlayer](https://www.npmjs.com/package/react-intlayer) или [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Поддержка конфигурационных файлов

Intlayer поддерживает несколько форматов конфигурационных файлов:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Чтобы узнать, как настроить доступные локали или другие параметры, обратитесь к [документации по конфигурации здесь](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

## CLI SDK

CLI SDK — это библиотека, которая позволяет использовать Intlayer CLI в вашем собственном коде.

```bash packageManager="npm"
npm install @intlayer/cli -D
```

```bash packageManager="yarn"
yarn add @intlayer/cli -D
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli -D
```

Пример использования:

```ts
import {
  push,
  pull,
  fill,
  build,
  docTranslate,
  docReview,
} from "@intlayer/cli";

push();
// ...
pull();
// ...
fill();
// ...
build();
// ...
docTranslate();
// ...
docReview();
// ...
```

## Выполнение команд intlayer

### Сборка словарей

Для сборки ваших словарей вы можете выполнить команды:

```bash
npx intlayer build
```

или в режиме наблюдения

```bash
npx intlayer build --watch
```

Эта команда по умолчанию найдет ваши файлы с декларациями контента по пути `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` и соберет словари в директории `.intlayer`.

##### Псевдонимы:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

### Отправка словарей

```bash
npx intlayer dictionary push
```

Если установлен [редактор intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md), вы также можете отправлять словари в редактор. Эта команда позволит сделать словари доступными в [редакторе](https://intlayer.org/dashboard). Таким образом, вы можете делиться своими словарями с командой и редактировать контент без изменения кода вашего приложения.

##### Псевдонимы:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### Аргументы:

- `-d`, `--dictionaries`: идентификаторы словарей для отправки. Если не указано, будут отправлены все словари.
  > Пример: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Пропустить вопрос об удалении каталогов локалей после отправки словарей и удалить их. По умолчанию, если словарь определён локально, он перезапишет содержимое удалённых словарей.
  > Пример: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: Пропустить вопрос об удалении каталогов локалей после отправки словарей и сохранить их. По умолчанию, если словарь определён локально, он перезапишет содержимое удалённых словарей.
  > Пример: `npx intlayer dictionary push -k`
- `--env`: Указать окружение (например, `development`, `production`).
- `--env-file`: Указать пользовательский файл окружения для загрузки переменных.
- `--base-dir`: Указать базовый каталог проекта.
- `--verbose`: Включить подробное логирование для отладки.
- `--git-diff`: Запускать только для словарей, которые содержат изменения от базы (по умолчанию `origin/main`) до текущей ветки (по умолчанию: `HEAD`).
- `--git-diff-base`: Указать базовую ссылку для git diff (по умолчанию `origin/main`).
- `--git-diff-current`: Указать текущую ссылку для git diff (по умолчанию `HEAD`).
- `--uncommitted`: Включить незафиксированные изменения.
- `--unpushed`: Включить неотправленные изменения.
- `--untracked`: Включить неотслеживаемые файлы.

### Получение удалённых словарей

```bash
npx intlayer pull
```

Если установлен [редактор intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md), вы также можете загружать словари из редактора. Таким образом, вы можете перезаписать содержимое ваших словарей в соответствии с потребностями вашего приложения.

##### Псевдонимы:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### Аргументы:

- `-d, --dictionaries`: Идентификаторы словарей для загрузки. Если не указано, будут загружены все словари.
  > Пример: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : Путь к директории, в которую будут сохранены новые словари. Если не указано, новые словари будут сохранены в директории `./intlayer-dictionaries` проекта. Если в содержимом вашего словаря указано поле `filePath`, словари не будут учитывать этот аргумент и будут сохранены в указанной директории `filePath`.
- `--env`: Указать окружение (например, `development`, `production`).
- `--env-file`: Указать пользовательский файл окружения для загрузки переменных.
- `--base-dir`: Указать базовую директорию проекта.
- `--verbose`: Включить подробное логирование для отладки.

##### Пример:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Заполнить / проверить / перевести словари

```bash
npx intlayer fill
```

Эта команда анализирует ваши файлы декларации контента на предмет возможных проблем, таких как отсутствующие переводы, структурные несоответствия или несоответствия типов. Если будут обнаружены какие-либо проблемы, **intlayer fill** предложит или применит обновления для поддержания ваших словарей в согласованном и полном состоянии.

##### Псевдонимы:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### Аргументы:

- `-f, --file [files...]`
  Список конкретных файлов декларации контента для проверки. Если не указано, будут проверены все обнаруженные файлы с расширениями `*.content.{ts,js,mjs,cjs,tsx,jsx,json}`.

- `--exclude [excludedGlobs...]`
  Шаблоны glob для исключения из проверки (например, `--exclude "src/test/**"`).

- `--source-locale [sourceLocale]`
  Исходная локаль для перевода. Если не указано, будет использована локаль по умолчанию из вашей конфигурации.

- `--output-locales [outputLocales...]`
  Целевые локали для перевода. Если не указано, будут использованы все локали из вашей конфигурации, кроме исходной локали.

- `--mode [mode]`
  Режим перевода: 'complete' (полный), 'review' (проверка) или 'missing-only' (только отсутствующие). По умолчанию — 'missing-only'.

- `--git-diff`
  Фильтрует словари, которые содержат изменения от базы (по умолчанию `origin/main`) до текущей ветки (по умолчанию: `HEAD`).

- `--git-diff-base`
  Указывает базовую ссылку для git diff (по умолчанию `origin/main`).

- `--git-diff-current`
  Указывает текущую ссылку для git diff (по умолчанию `HEAD`).

- `--uncommitted`
  Фильтрует словари, которые содержат неподтверждённые изменения.

- `--unpushed`

Фильтрует словари, которые содержат непушенные изменения.

- `--untracked`
  Фильтрует словари, которые содержат неотслеживаемые файлы.

- `--keys [keys...]`
  Фильтрует словари на основе указанных ключей.

- `--excluded-keys [excludedKeys...]`
  Исключает словари на основе указанных ключей.

- `--path-filter [pathFilters...]`
  Фильтрует словари на основе глобального шаблона для путей файлов.

- `--model [model]`
  Модель ИИ, используемая для перевода (например, `gpt-3.5-turbo`).

- `--provider [provider]`
  Провайдер ИИ, используемый для перевода.

- `--temperature [temperature]`
  Настройка температуры для модели ИИ.

- `--api-key [apiKey]`
  Предоставьте собственный API-ключ для сервиса ИИ.

- `--custom-prompt [prompt]`
  Предоставьте пользовательский запрос для инструкций по переводу.
- `--application-context [applicationContext]`
  Предоставляет дополнительный контекст для перевода ИИ.

- `--env`
  Указывает окружение (например, `development`, `production`).

- `--env-file [envFile]`
  Указывает пользовательский файл окружения для загрузки переменных.

- `--base-dir`
  Указывает базовую директорию проекта.

- `--verbose`
  Включает подробное логирование для отладки.

##### Пример:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Эта команда переведет содержимое с английского на французский и испанский для всех файлов деклараций контента в директории `src/home/` с использованием модели GPT-3.5 Turbo.

### Управление конфигурацией

#### Получить конфигурацию

Команда `configuration get` получает текущую конфигурацию для Intlayer, в частности настройки локалей. Это полезно для проверки вашей настройки.

```bash
npx intlayer configuration get
```

##### Псевдонимы:

- `npx intlayer config get`
- `npx intlayer conf get`

##### Аргументы:

- **`--env`**: Укажите окружение (например, `development`, `production`).
- **`--env-file`**: Укажите пользовательский файл окружения для загрузки переменных.
- **`--base-dir`**: Укажите базовую директорию проекта.
- **`--verbose`**: Включите подробное логирование для отладки.

#### Отправка конфигурации

Команда `configuration push` загружает вашу конфигурацию в Intlayer CMS и редактор. Этот шаг необходим для использования удалённых словарей в Intlayer Visual Editor.

```bash
bash
npx intlayer configuration push
```

##### Псевдонимы:

- `npx intlayer config push`
- `npx intlayer conf push`

##### Аргументы:

- **`--env`**: Укажите окружение (например, `development`, `production`).
- **`--env-file`**: Укажите пользовательский файл окружения для загрузки переменных.
- **`--base-dir`**: Укажите базовую директорию проекта.
- **`--verbose`**: Включите подробное логирование для отладки.

При отправке конфигурации ваш проект полностью интегрируется с Intlayer CMS, что обеспечивает бесшовное управление словарями в командах.

### Управление документацией

Команды `doc` предоставляют инструменты для управления и перевода файлов документации на несколько локалей.

#### Перевод документации

Команда `doc translate` автоматически переводит файлы документации с базового языка на целевые языки с использованием сервисов AI-перевода.

```bash
npx intlayer doc translate
```

##### Аргументы:

- **`--doc-pattern [docPattern...]`**: Глобальные шаблоны для выбора файлов документации для перевода.
  > Пример: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`
- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Глобальные шаблоны для исключения файлов из перевода.
  > Пример: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`
- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Количество файлов, обрабатываемых одновременно для перевода.
  > Пример: `npx intlayer doc translate --nb-simultaneous-file-processed 5`
- **`--locales [locales...]`**: Целевые языки для перевода документации.
  > Пример: `npx intlayer doc translate --locales fr es de`
- **`--base-locale [baseLocale]`**: Исходный язык для перевода.
  > Пример: `npx intlayer doc translate --base-locale en`
- **`--model [model]`**: Модель ИИ, используемая для перевода (например, `gpt-3.5-turbo`).
- **`--provider [provider]`**: Провайдер ИИ, используемый для перевода.
- **`--temperature [temperature]`**: Параметр температуры для модели ИИ.
- **`--api-key [apiKey]`**: Предоставьте свой собственный API-ключ для сервиса ИИ.
- **`--custom-prompt [prompt]`**: Предоставьте пользовательский запрос для инструкций по переводу.
- **`--application-context [applicationContext]`**: Предоставьте дополнительный контекст для перевода ИИ.
- **`--env`**: Укажите окружение (например, `development`, `production`).
- **`--env-file [envFile]`**: Укажите пользовательский файл окружения для загрузки переменных.
- **`--base-dir`**: Укажите базовый каталог проекта.
- **`--verbose`**: Включите подробное логирование для отладки.
- **`--custom-instructions [customInstructions]`**: Пользовательские инструкции, добавляемые в подсказку. Полезно для применения специфических правил форматирования, перевода URL и т.д.

##### Пример:

```bash
npx intlayer doc translate
  --doc-pattern "docs/ru/**/*.md"
  --base-locale en --locales fr es
  --model chatgpt-4o-latest
  --custom-instructions "$(cat ./instructions.md)"
```

> Обратите внимание, что путь к выходному файлу будет определяться заменой следующих шаблонов
>
> - `/{{baseLocale}}/` на `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` на `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` на `_{{locale}}.`
> - `{{baseLocale}}_` на `{{locale}}_`
> - `.{{baseLocaleName}}.` на `.{{localeName}}.`
>
> Если шаблон не найден, в имени выходного файла будет добавлено `.{{locale}}` перед расширением. Например, `./my/file.md` будет переведён в `./my/file.ru.md` для русского языка.

#### Проверка документации

Команда `doc review` анализирует файлы документации на качество, согласованность и полноту для разных локалей.

```bash
npx intlayer doc review
```

##### Аргументы:

Команда `doc review` принимает те же аргументы, что и `doc translate`, позволяя проверять конкретные файлы документации и применять проверки качества.

##### Пример:

```bash
npx intlayer doc review
 --doc-pattern "docs/ru/**/*.md"
 --locales fr es de
 --model chatgpt-4o-latest
 --custom-instructions "$(cat ./instructions.md)"
```

## Использование команд intlayer в вашем `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

## Отладка команды intlayer

### 1. **Убедитесь, что используете последнюю версию**

Выполните:

```bash
npx intlayer --version                  # текущая версия intlayer для локали
npx intlayer@latest --version           # последняя доступная версия intlayer
```

### 2. **Проверьте, зарегистрирована ли команда**

Вы можете проверить с помощью:

```bash
npx intlayer --help                     # Показывает список доступных команд и информацию по использованию
npx intlayer dictionary build --help    # Показывает список доступных опций для команды
```

### 3. **Перезапустите терминал**

Иногда для распознавания новых команд требуется перезапуск терминала.

### 4. **Очистите кэш npx (если вы застряли на старой версии)**

```bash
npx clear-npx-cache
```

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
