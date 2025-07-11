---
createdAt: 2024-08-11
updatedAt: 2025-07-11
title: CLI
description: Узнайте, как использовать Intlayer CLI для управления вашим многоязычным сайтом. Следуйте шагам в этой онлайн-документации, чтобы настроить ваш проект за несколько минут.
keywords:
  - CLI
  - Интерфейс командной строки
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

## Запуск команд intlayer

### Сборка словарей

Для сборки ваших словарей вы можете выполнить команды:

```bash
npx intlayer build
```

или в режиме наблюдения

```bash
npx intlayer build --watch
```

Эта команда по умолчанию найдет ваши файлы объявлений контента, соответствующие шаблону `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`, и соберет словари в директории `.intlayer`.

##### Псевдонимы:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

### Отправка словарей

```bash
npx intlayer dictionary push
```

Если установлен [редактор intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md), вы также можете отправлять словари в редактор. Эта команда позволит сделать словари доступными в [редакторе](https://intlayer.org/dashboard). Таким образом, вы можете делиться своими словарями с командой и редактировать содержимое без изменения кода вашего приложения.

##### Псевдонимы:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### Аргументы:

**Опции словаря:**

- **`-d`, `--dictionaries`**: идентификаторы словарей для отправки. Если не указано, будут отправлены все словари.

  > Пример: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

**Опции конфигурации:**

- **`--base-dir`**: Укажите базовый каталог проекта. Для получения конфигурации intlayer команда будет искать файл `intlayer.config.{ts,js,json,cjs,mjs}` в базовом каталоге.

  > Пример: `npx intlayer dictionary push --env-file .env.production.local`

**Опции переменных окружения:**

- **`--env`**: Укажите окружение (например, `development`, `production`). Полезно, если вы используете переменные окружения в вашем конфигурационном файле intlayer.
- **`--env-file`**: Укажите пользовательский файл окружения для загрузки переменных. Полезно, если вы используете переменные окружения в вашем конфигурационном файле intlayer.

  > Пример: `npx intlayer dictionary push --env-file .env.production.local`
  > Пример: `npx intlayer dictionary push --env production`

**Опции вывода:**

- **`-r`, `--delete-locale-dictionary`**: Пропустить вопрос о удалении каталогов локалей после загрузки словарей и удалить их. По умолчанию, если словарь определён локально, он перезапишет содержимое удалённых словарей.

  > Пример: `npx intlayer dictionary push -r`
  > Пример: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: Пропустить вопрос о удалении каталогов локалей после загрузки словарей и сохранить их. По умолчанию, если словарь определён локально, он перезапишет содержимое удалённых словарей.

  > Пример: `npx intlayer dictionary push -k`
  > Пример: `npx intlayer dictionary push --keep-locale-dictionary`

**Опции логирования:**

- **`--verbose`**: Включить подробное логирование для отладки.

**Опции Git:**

- **`--git-diff`**: Запускать только для словарей, которые содержат изменения от базовой ветки (по умолчанию `origin/main`) до текущей ветки (по умолчанию: `HEAD`).
- **`--git-diff-base`**: Указать базовую ссылку для git diff (по умолчанию `origin/main`).
- **`--git-diff-current`**: Указать текущую ссылку для git diff (по умолчанию `HEAD`).
- **`--uncommitted`**: Включить незафиксированные изменения.
- **`--unpushed`**: Включить неотправленные изменения.
- **`--untracked`**: Включить неотслеживаемые файлы.

  > Пример: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`
  > Пример: `npx intlayer dictionary push --uncommitted --unpushed --untracked`

### Загрузка удалённых словарей

```bash
npx intlayer pull
```

Если установлен [редактор intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md), вы также можете загружать словари из редактора. Таким образом, вы можете перезаписать содержимое ваших словарей в соответствии с потребностями вашего приложения.

##### Псевдонимы:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### Аргументы:

**Опции словаря:**

- **`-d, --dictionaries`**: Идентификаторы словарей для загрузки. Если не указано, будут загружены все словари.
  > Пример: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

**Опции конфигурации:**

- **`--base-dir`**: Укажите базовый каталог для проекта. Для получения конфигурации intlayer команда будет искать файл `intlayer.config.{ts,js,json,cjs,mjs}` в базовом каталоге.

  > Пример: `npx intlayer dictionary push --env-file .env.production.local`

**Опции переменных окружения:**

- **`--env`**: Укажите окружение (например, `development`, `production`).
- **`--env-file`**: Укажите пользовательский файл окружения для загрузки переменных.
- **`--base-dir`**: Укажите базовый каталог для проекта. Для получения конфигурации intlayer команда будет искать файл `intlayer.config.{ts,js,json,cjs,mjs}` в базовом каталоге.

  > Пример: `npx intlayer dictionary push --env-file .env.production.local`
  > Пример: `npx intlayer dictionary push --env production`

**Опции вывода:**

- **`--new-dictionaries-path`**: Путь к каталогу, в который будут сохранены новые словари. Если не указано, новые словари будут сохранены в каталоге `./intlayer-dictionaries` проекта. Если в содержимом вашего словаря указано поле `filePath`, словари не будут учитывать этот аргумент и будут сохранены в указанном каталоге `filePath`.

**Опции логирования:**

- **`--verbose`**: Включить подробное логирование для отладки.

##### Пример:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Заполнение / аудит / перевод словарей

```bash
npx intlayer fill
```

Эта команда анализирует ваши файлы декларации контента на предмет возможных проблем, таких как отсутствующие переводы, структурные несоответствия или несоответствия типов. Если будут обнаружены какие-либо проблемы, **intlayer fill** предложит или применит обновления для поддержания ваших словарей в согласованном и полном состоянии.

##### Псевдонимы:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### Аргументы:

**Опции списка файлов:**

- **`-f, --file [files...]`**: Список конкретных файлов декларации контента для аудита. Если не указано, будут проверены все обнаруженные файлы с расширениями `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` на основе вашей конфигурации.

  > Пример: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: Фильтрация словарей по ключам. Если не указано, будут проверены все словари.

  > Пример: `npx intlayer dictionary fill -k key1 key2`

- **`--excluded-keys [excludedKeys...]`**: Исключение словарей по ключам. Если не указано, будут проверены все словари.

  > Пример: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--path-filter [pathFilters...]`**: Фильтрация словарей по шаблону glob для путей к файлам.

  > Пример: `npx intlayer dictionary fill --path-filter "src/home/**"`

**Опции вывода записей:**

- **`--source-locale [sourceLocale]`**: Исходная локаль для перевода. Если не указано, будет использована локаль по умолчанию из вашей конфигурации.

- **`--output-locales [outputLocales...]`**: Целевые локали для перевода. Если не указано, будут использованы все локали из вашей конфигурации, кроме исходной локали.

- **`--mode [mode]`**: Режим перевода: 'complete' (полный), 'review' (проверка) или 'missing-only' (только отсутствующие). По умолчанию — 'missing-only'.

**Опции Git:**

- **`--git-diff`**: Запускать только для словарей, которые содержат изменения от базы (по умолчанию `origin/main`) до текущей ветки (по умолчанию: `HEAD`).
- **`--git-diff-base`**: Указать базовую ссылку для git diff (по умолчанию `origin/main`).
- **`--git-diff-current`**: Указать текущую ссылку для git diff (по умолчанию `HEAD`).
- **`--uncommitted`**: Включать неподтверждённые изменения.
- **`--unpushed`**: Включать непушенные изменения.
- **`--untracked`**: Включать неотслеживаемые файлы.

  > Пример: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`
  > Пример: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**Опции ИИ:**

- **`--model [model]`**: Модель ИИ для использования при переводе (например, `gpt-3.5-turbo`).
- **`--provider [provider]`**: Провайдер ИИ для использования при переводе.
- **`--temperature [temperature]`**: Параметр температуры для модели ИИ.
- **`--api-key [apiKey]`**: Укажите собственный API-ключ для сервиса ИИ.
- **`--custom-prompt [prompt]`**: Укажите пользовательский запрос для инструкций по переводу.
- **`--application-context [applicationContext]`**: Предоставьте дополнительный контекст для перевода ИИ.

  > Пример: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "Моё приложение — магазин для кошек"`

**Опции переменных окружения:**

- **`--env`**: Указать окружение (например, `development`, `production`).
- **`--env-file [envFile]`**: Указать пользовательский файл окружения для загрузки переменных.

  > Пример: `npx intlayer fill --env-file .env.production.local`
  > Пример: `npx intlayer fill --env production`

**Опции конфигурации:**

- **`--base-dir`**: Указать базовую директорию проекта.

  > Пример: `npx intlayer fill --base-dir ./src`

**Опции логирования:**

- **`--verbose`**: Включить подробное логирование для отладки.

##### Пример:

````bash

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
````

Эта команда переведёт содержимое с английского на французский и испанский для всех файлов декларации контента в директории `src/home/`, используя модель GPT-3.5 Turbo.

### Управление конфигурацией

#### Получить конфигурацию

Команда `configuration get` извлекает текущую конфигурацию Intlayer, в частности настройки локалей. Это полезно для проверки вашей настройки.

```bash
npx intlayer configuration get
```

##### Псевдонимы:

- `npx intlayer config get`
- `npx intlayer conf get`

##### Аргументы:

- **`--env`**: Указать окружение (например, `development`, `production`).
- **`--env-file`**: Указать пользовательский файл окружения для загрузки переменных.
- **`--base-dir`**: Указать базовый каталог проекта.
- **`--verbose`**: Включить подробное логирование для отладки.

#### Отправка конфигурации

Команда `configuration push` загружает вашу конфигурацию в Intlayer CMS и редактор. Этот шаг необходим для использования удалённых словарей в визуальном редакторе Intlayer.

```bash
npx intlayer configuration push
```

##### Псевдонимы:

- `npx intlayer config push`
- `npx intlayer conf push`

##### Аргументы:

- **`--env`**: Указать окружение (например, `development`, `production`).
- **`--env-file`**: Указать пользовательский файл окружения для загрузки переменных.
- **`--base-dir`**: Указать базовый каталог проекта.
- **`--verbose`**: Включить подробное логирование для отладки.

Отправляя конфигурацию, ваш проект полностью интегрируется с Intlayer CMS, что обеспечивает бесшовное управление словарями в командах.

### Управление документацией

Команды `doc` предоставляют инструменты для управления и перевода файлов документации на несколько локалей.

#### Перевод документации

Команда `doc translate` автоматически переводит файлы документации с базовой локали на целевые локали с использованием сервисов AI-перевода.

```bash
npx intlayer doc translate
```

##### Аргументы:

**Опции списка файлов:**

- **`--doc-pattern [docPattern...]`**: Глобальные шаблоны для выбора файлов документации для перевода.

  > Пример: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: Глобальные шаблоны для исключения файлов из перевода.

  > Пример: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: Пропустить файл, если он был изменён до указанного времени.

  - Может быть абсолютным временем, например "2025-12-05" (строка или объект Date)
  - Может быть относительным временем в миллисекундах `1 * 60 * 60 * 1000` (1 час)
  - Эта опция проверяет время обновления файла с помощью метода `fs.stat`. Поэтому она может быть затронута Git или другими инструментами, которые изменяют файл.

  > Пример: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: Пропустить файл, если он был изменён в течение указанного времени.

  - Может быть абсолютным временем, например "2025-12-05" (строка или объект Date)
  - Может быть относительным временем в миллисекундах `1 * 60 * 60 * 1000` (1 час)
  - Эта опция проверяет время обновления файла с помощью метода `fs.stat`. Поэтому она может быть затронута Git или другими инструментами, которые изменяют файл.

  > Пример: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

**Опции вывода:**

- **`--locales [locales...]`**: Целевые локали для перевода документации.

  > Пример: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: Исходная локаль для перевода.

  > Пример: `npx intlayer doc translate --base-locale en`

**Опции обработки файлов:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: Количество файлов, обрабатываемых одновременно для перевода.

  > Пример: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**Опции ИИ:**

- **`--model [model]`**: Модель ИИ, используемая для перевода (например, `gpt-3.5-turbo`).
- **`--provider [provider]`**: Провайдер ИИ, используемый для перевода.
- **`--temperature [temperature]`**: Параметр температуры для модели ИИ.
- **`--api-key [apiKey]`**: Предоставьте собственный API-ключ для сервиса ИИ.
- **`--application-context [applicationContext]`**: Предоставьте дополнительный контекст для перевода ИИ.
- **`--custom-prompt [prompt]`**: Настроить базовый запрос, используемый для перевода. (Примечание: для большинства случаев рекомендуется использовать опцию `--custom-instructions`, так как она обеспечивает лучший контроль над поведением перевода.)

  > Пример: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "Моё приложение — магазин для кошек"`

**Опции переменных окружения:**

- **`--env`**: Указать окружение (например, `development`, `production`).
- **`--env-file [envFile]`**: Указать пользовательский файл окружения для загрузки переменных.
- **`--base-dir`**: Указать базовую директорию проекта.

  > Пример: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**Опции логирования:**

- **`--verbose`**: Включить подробное логирование для отладки.

  > Пример: `npx intlayer doc translate --verbose`

**Опции пользовательских инструкций:**

- **`--custom-instructions [customInstructions]`**: Пользовательские инструкции, добавляемые в запрос. Полезно для применения специфических правил по форматированию, переводу URL и т.д.

  - Может быть абсолютное время, например "2025-12-05" (строка или объект Date)
  - Может быть относительное время в миллисекундах `1 * 60 * 60 * 1000` (1 час)
  - Эта опция проверяет время обновления файла с помощью метода `fs.stat`. Поэтому она может быть затронута Git или другими инструментами, которые изменяют файл.

  > Пример: `npx intlayer doc translate --custom-instructions "Избегайте перевода URL и сохраняйте формат markdown"`
  > Пример: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Опции Git:**

- **`--git-diff`**: Запускать только для словарей, которые содержат изменения от базы (по умолчанию `origin/main`) до текущей ветки (по умолчанию: `HEAD`).
- **`--git-diff-base`**: Указать базовую ссылку для git diff (по умолчанию `origin/main`).
- **`--git-diff-current`**: Указать текущую ссылку для git diff (по умолчанию `HEAD`).
- **`--uncommitted`**: Включать незафиксированные изменения.
- **`--unpushed`**: Включать неотправленные изменения.
- **`--untracked`**: Включать неотслеживаемые файлы.

  > Пример: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`
  > Пример: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> Обратите внимание, что путь выходного файла будет определяться заменой следующих шаблонов
>
> - `/{{baseLocale}}/` заменяется на `/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` заменяется на `\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` заменяется на `_{{locale}}.`
> - `{{baseLocale}}_` заменяется на `{{locale}}_`
> - `.{{baseLocaleName}}.` заменяется на `.{{localeName}}.`
>
> Если шаблон не найден, к расширению файла будет добавлено `.{{locale}}`. Например, `./my/file.md` будет переведён в `./my/file.fr.md` для французской локали.

#### Проверка документации

Команда `doc review` анализирует файлы документации на качество, согласованность и полноту между разными локалями.

```bash
npx intlayer doc review
```

Её можно использовать для проверки уже переведённых файлов и для проверки корректности перевода.

В большинстве случаев,

- предпочтительно использовать `doc translate`, когда переведённая версия этого файла недоступна.
- предпочтительно использовать `doc review`, когда переведённая версия этого файла уже существует.

> Обратите внимание, что процесс проверки (review) потребляет больше входных токенов, чем процесс перевода (translate) для полной проверки одного и того же файла. Однако процесс проверки оптимизирует проверяемые части (чанки) и пропускает неизменённые участки.

##### Аргументы:

Команда `doc review` принимает те же аргументы, что и `doc translate`, позволяя вам проверять конкретные файлы документации и применять проверки качества.

Если вы активировали одну из опций git, команда будет проверять только ту часть файлов, которая изменяется. Скрипт будет обрабатывать файл по частям (чанкам) и проверять каждый чанк. Если в чанке нет изменений, скрипт пропустит его, чтобы ускорить процесс проверки и снизить стоимость использования API AI-провайдера.

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

## CLI SDK

CLI SDK — это библиотека, которая позволяет использовать Intlayer CLI в вашем собственном коде.

```bash packageManager="npm"
npm install @intlayer/cli --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/cli --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli --save-dev
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

| Версия | Дата       | Изменения                                    |
| ------ | ---------- | -------------------------------------------- |
| 5.5.11 | 2025-07-11 | Обновлена документация параметров команд CLI |
| 5.5.10 | 2025-06-29 | Инициализация истории                        |
