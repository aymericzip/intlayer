# Intlayer CLI

## Установка пакета

Установите необходимые пакеты с помощью npm:

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
```

> Если пакет `intlayer` уже установлен, CLI устанавливается автоматически. Этот шаг можно пропустить.

## Пакет intlayer-cli

Пакет `intlayer-cli` предназначен для транспиляции ваших [объявлений intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md) в словари.

Этот пакет транспилирует все файлы intlayer, такие как `src/**/*.content.{ts|js|mjs|cjs|json}`. [Смотрите, как объявлять файлы деклараций Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Для интерпретации словарей intlayer вы можете использовать интерпретаторы, такие как [react-intlayer](https://www.npmjs.com/package/react-intlayer) или [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Поддержка конфигурационных файлов

Intlayer поддерживает несколько форматов конфигурационных файлов:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Чтобы узнать, как настроить доступные локали или другие параметры, обратитесь к [документации по конфигурации здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

## Запуск команд intlayer

### Сборка словарей

Для сборки ваших словарей вы можете выполнить команды:

```bash
npx intlayer dictionaries build
```

или в режиме наблюдения

```bash
npx intlayer dictionaries build --watch
```

Эта команда найдет ваши файлы деклараций контента по умолчанию как `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` и соберет словари в директорию `.intlayer`.

### Отправка словарей

```bash
npx intlayer dictionary push
```

Если установлен [редактор intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_visual_editor.md), вы также можете отправить словари в редактор. Эта команда позволит сделать словари доступными для [редактора](https://intlayer.org/dashboard). Таким образом, вы можете делиться своими словарями с командой и редактировать контент без изменения кода вашего приложения.

##### Аргументы:

- `-d`, `--dictionaries`: идентификаторы словарей для отправки. Если не указано, будут отправлены все словари.
  > Пример: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: пропустить вопрос о необходимости удаления локальных директорий после отправки словарей и удалить их. По умолчанию, если словарь определен локально, он перезапишет содержимое удаленных словарей.
  > Пример: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: пропустить вопрос о необходимости удаления локальных директорий после отправки словарей и сохранить их. По умолчанию, если словарь определен локально, он перезапишет содержимое удаленных словарей.
  > Пример: `npx intlayer dictionary push -k`

### Загрузка удаленных словарей

```bash
npx intlayer dictionary pull
```

Если установлен [редактор intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_visual_editor.md), вы также можете загрузить словари из редактора. Таким образом, вы можете перезаписать содержимое ваших словарей для нужд вашего приложения.

##### Аргументы:

- `-d, --dictionaries`: идентификаторы словарей для загрузки. Если не указано, будут загружены все словари.
  > Пример: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`: путь к директории, куда будут сохранены новые словари. Если не указано, новые словари будут сохранены в директории `./intlayer-dictionaries` проекта. Если в содержимом словаря указано поле `filePath`, словари не будут учитывать этот аргумент и будут сохранены в указанной директории `filePath`.

##### Пример:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Аудит словарей

```bash
npx intlayer audit
```

Эта команда анализирует ваши файлы деклараций контента на наличие потенциальных проблем, таких как отсутствующие переводы, структурные несоответствия или несоответствия типов. Если будут найдены проблемы, **intlayer audit** предложит или применит обновления для поддержания ваших словарей в согласованном и полном состоянии.

##### Аргументы:

- **`-f, --files [files...]`**  
  Список конкретных файлов деклараций контента для аудита. Если не указано, будут проверены все обнаруженные файлы `*.content.{ts,js,mjs,cjs,tsx,jsx,json}`.

- **`--exclude [excludedGlobs...]`**  
  Шаблоны для исключения из аудита (например, `--exclude "src/test/**"`).

- **`-m, --model [model]`**  
  Модель ChatGPT для использования в аудите (например, `gpt-3.5-turbo`).

- **`-p, --custom-prompt [prompt]`**  
  Предоставьте собственный запрос для инструкций по аудиту.

- **`-l, --async-limit [asyncLimit]`**  
  Максимальное количество файлов для обработки одновременно.

- **`-k, --open-ai-api-key [openAiApiKey]`**  
  Предоставьте собственный API-ключ OpenAI для обхода аутентификации OAuth2.

##### Пример:

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

Эта команда проигнорирует любые файлы в `tests/**` и использует модель `gpt-3.5-turbo` для аудита обнаруженных файлов деклараций контента. Если будут найдены проблемы, такие как отсутствующие переводы, они будут исправлены на месте с сохранением исходной структуры файла.

### Управление конфигурацией

#### Получение конфигурации

Команда `get configuration` извлекает текущую конфигурацию для Intlayer, в частности настройки локалей. Это полезно для проверки вашей настройки.

```bash
npx intlayer config get
```

##### Аргументы:

- **`--env`**: Укажите среду (например, `development`, `production`).
- **`--env-file`**: Укажите пользовательский файл окружения для загрузки переменных.
- **`--verbose`**: Включите подробный лог для отладки.

#### Отправка конфигурации

Команда `push configuration` загружает вашу конфигурацию в CMS и редактор Intlayer. Этот шаг необходим для использования удаленных словарей в визуальном редакторе Intlayer.

```bash
npx intlayer config push
```

##### Аргументы:

- **`--env`**: Укажите среду (например, `development`, `production`).
- **`--env-file`**: Укажите пользовательский файл окружения для загрузки переменных.
- **`--verbose`**: Включите подробный лог для отладки.

Отправив конфигурацию, ваш проект полностью интегрируется с CMS Intlayer, что позволяет бесшовно управлять словарями в команде.

## Использование команд intlayer в вашем `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer dictionaries build",
  "intlayer:watch": "npx intlayer dictionaries build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```
