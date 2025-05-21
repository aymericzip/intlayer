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

- `-d`, `--dictionaries`: ID словарей для отправки. Если не указано, будут отправлены все словари.
  > Пример: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Пропускает вопрос об удалении директории локали после отправки словаря и удаляет. По умолчанию, если словарь определен локально, он перезаписывает содержимое удаленного словаря.
  > Пример: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: Пропускает вопрос об удалении директории локали после отправки словаря и сохраняет. По умолчанию, если словарь определен локально, он перезаписывает содержимое удаленного словаря.
  > Пример: `npx intlayer dictionary push -k`
- `--env`: Указывает окружение (например, `development`, `production`).
- `--env-file`: Предоставляет пользовательский файл окружения для загрузки переменных.
- `--base-dir`: Указывает базовую директорию проекта.
- `--verbose`: Включает подробное логирование для отладки.
- `--git-diff`: Выполняет только словари с неотправленными изменениями в git-репозитории.
- `--git-diff-base`: Указывает базовую ссылку для git diff.
- `--git-diff-current`: Указывает текущую ссылку для git diff.
- `--uncommitted`: Включает незакоммиченные изменения.
- `--unpushed`: Включает неотправленные изменения.
- `--untracked`: Включает неотслеживаемые файлы.

### Получение удаленных словарей

```bash
npx intlayer dictionary pull
```

Если у вас установлен [Визуальный редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_visual_editor.md), вы также можете получить словари из редактора. Это позволяет перезаписать содержимое словарей в соответствии с потребностями вашего приложения.

##### Аргументы:

- `-d, --dictionaries`: ID словарей для получения. Если не указано, будут получены все словари.
  > Пример: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`: Путь к директории, где будут храниться новые словари. Если не указано, новые словари будут храниться в директории `./intlayer-dictionaries` проекта. Если в содержимом словаря указано поле `filePath`, словарь будет храниться в указанной директории `filePath`, игнорируя этот аргумент.
- `--env`: Указывает окружение (например, `development`, `production`).
- `--env-file`: Предоставляет пользовательский файл окружения для загрузки переменных.
- `--base-dir`: Указывает базовую директорию проекта.
- `--verbose`: Включает подробное логирование для отладки.

##### Пример:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### Аудит словарей

```bash
npx intlayer audit
```

Эта команда анализирует файлы объявления контента для поиска потенциальных проблем, таких как отсутствующие переводы, структурные несоответствия или несовместимости типов. Если проблемы найдены, **intlayer audit** предлагает или применяет обновления для поддержания словарей согласованными и полными.

##### Аргументы:

- **`-f, --files [files...]`**  
  Список конкретных файлов объявления контента для аудита. Если не указано, будут проверены все найденные файлы `*.content.{ts,js,mjs,cjs,tsx,jsx,json}`.

- **`--exclude [excludedGlobs...]`**  
  Шаблоны glob для исключения из аудита (например, `--exclude "src/test/**"`).

- **`--source-locale [sourceLocale]`**  
  Исходная локаль для перевода. Если не указано, будет использована локаль по умолчанию из конфигурации.

- **`--output-locales [outputLocales...]`**  
  Целевые локали для перевода. Если не указано, будут использованы все локали из конфигурации, кроме исходной локали.

- **`--mode [mode]`**  
  Режим перевода: 'complete', 'review' или 'missing-only'. По умолчанию 'missing-only'.

- **`--git-diff`**  
  Выполняет только словари с неотправленными изменениями в git-репозитории.

- **`--git-diff-base`**  
  Указывает базовую ссылку для git diff.

- **`--git-diff-current`**  
  Указывает текущую ссылку для git diff.

- **`--uncommitted`**  
  Включает незакоммиченные изменения.

- **`--unpushed`**  
  Включает неотправленные изменения.

- **`--untracked`**  
  Включает неотслеживаемые файлы.

- **`--keys [keys...]`**  
  Фильтрует словари на основе указанных ключей.

- **`--excluded-keys [excludedKeys...]`**  
  Исключает словари на основе указанных ключей.

- **`--path-filter [pathFilters...]`**  
  Фильтрует словари на основе шаблонов glob пути к файлу.

- **`--model [model]`**  
  Модель ИИ для использования при переводе (например, `gpt-3.5-turbo`).

- **`--provider [provider]`**  
  Провайдер ИИ для использования при переводе.

- **`--temperature [temperature]`**  
  Настройка температуры для модели ИИ.

- **`--api-key [apiKey]`**  
  Предоставляет собственный API-ключ для сервиса ИИ.

- **`--custom-prompt [prompt]`**  
  Предоставляет пользовательский промпт для инструкций по переводу.

- **`--application-context [applicationContext]`**  
  Предоставляет дополнительный контекст для перевода ИИ.

- **`--env`**  
  Указывает окружение (например, `development`, `production`).

- **`--env-file [envFile]`**  
  Предоставляет пользовательский файл окружения для загрузки переменных.

- **`--base-dir`**  
  Указывает базовую директорию проекта.

- **`--verbose`**  
  Включает подробное логирование для отладки.

##### Пример:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

Эта команда переводит содержимое всех файлов объявления контента в директории `src/home/` с английского на французский и испанский языки, используя модель GPT-3.5 Turbo.

### Управление конфигурацией

#### Получение конфигурации

Команда `get configuration` получает текущую конфигурацию Intlayer, особенно настройки локали. Это полезно для проверки конфигурации.

```bash
npx intlayer config get
```

##### Аргументы:

- **`--env`**: Указывает окружение (например, `development`, `production`).
- **`--env-file`**: Предоставляет пользовательский файл окружения для загрузки переменных.
- **`--base-dir`**: Указывает базовую директорию проекта.
- **`--verbose`**: Включает подробное логирование для отладки.

#### Отправка конфигурации

Команда `push configuration` загружает конфигурацию в CMS и редактор Intlayer. Этот шаг необходим для использования удаленных словарей в Визуальном редакторе Intlayer.

```bash
npx intlayer config push
```

##### Аргументы:

- **`--env`**: Указывает окружение (например, `development`, `production`).
- **`--env-file`**: Предоставляет пользовательский файл окружения для загрузки переменных.
- **`--base-dir`**: Указывает базовую директорию проекта.
- **`--verbose`**: Включает подробное логирование для отладки.

При отправке конфигурации ваш проект полностью интегрируется с CMS Intlayer, обеспечивая безупречное управление словарями между командами.

## Использование команд intlayer в `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer dictionaries build",
  "intlayer:watch": "npx intlayer dictionaries build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```

## Отладка команды intlayer

### 1. **Убедитесь, что используете последнюю версию**

Выполните:

```bash
npx intlayer --version                  # текущая локальная версия intlayer
npx intlayer@latest --version          # последняя версия intlayer
```

### 2. **Проверьте, зарегистрирована ли команда**

Вы можете проверить с помощью:

```bash
npx intlayer --help      # Показывает список доступных команд и информацию об использовании
man npx intlayer         # Отображает справочную страницу команды, если доступна
```

### 3. **Перезапустите терминал**

Иногда требуется перезапуск терминала для распознавания новых команд.

### 4. **Очистите кэш npx (если застряли на старой версии)**

```bash
npx clear-npx-cache
```
