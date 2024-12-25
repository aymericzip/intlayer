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

> Если пакет `intlayer` уже установлен, cli устанавливается автоматически. Вы можете пропустить этот шаг.

## пакет intlayer-cli

Пакет `intlayer-cli` предназначен для преобразования ваших [объявлений intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/get_started.md) в словари.

Этот пакет преобразует все файлы intlayer, такие как `src/**/*.content.{ts|js|mjs|cjs|json}`. [Смотрите, как объявить ваши файлы декларации Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Чтобы интерпретировать словари intlayer, вы можете использовать интерпретаторы, такие как [react-intlayer](https://www.npmjs.com/package/react-intlayer) или [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Поддержка файлов конфигурации

Intlayer принимает несколько форматов файлов конфигурации:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Чтобы узнать, как конфигурировать доступные локали или другие параметры, обратитесь к [документации по конфигурации здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

## Запуск команд intlayer

### Создание словарей

Чтобы создать ваши словари, вы можете запустить команды:

```bash
npx intlayer build
```

или в режиме наблюдения

```bash
npx intlayer build --watch
```

Эта команда найдет ваши файлы деклараций контента по умолчанию как `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. И создаст словари в директории `.intlayer`.

### Публикация словарей

```bash
npx intlayer push
```

Если [редактор intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_editor.md) установлен, вы также можете отправить словари в редактор. Эта команда позволит сделать словари доступными для [редактора](https://intlayer.org/dashboard). Таким образом, вы можете делиться своими словарями с вашей командой и редактировать ваш контент без изменения кода вашего приложения.

##### Аргументы:

- `-d`, `--dictionaries`: идентификаторы словарей для загрузки. Если не указано, все словари будут отправлены.
  > Пример: `npx intlayer push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: Пропустить вопрос о том, нужно ли удалить директории локалей, как только словари будут отправлены, и удалить их. По умолчанию, если словарь определен локально, он перезапишет содержимое удаленных словарей.
  > Пример: `npx intlayer push -r`
- `-k`, `--keepLocaleDictionary`: Пропустить вопрос о том, нужно ли удалить директории локалей, как только словари будут отправлены, и сохранить их. По умолчанию, если словарь определен локально, он перезапишет содержимое удаленных словарей.
  > Пример: `npx intlayer push -k`

### Загрузка удаленных словарей

```bash
npx intlayer pull
```

Если [редактор intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_editor.md) установлен, вы также можете загрузить словари из редактора. Таким образом, вы можете перезаписать содержимое ваших словарей в соответствии с потребностями вашего приложения.

##### Аргументы:

- `-d, --dictionaries`: Идентификаторы словарей для загрузки. Если не указано, все словари будут загружены.
  > Пример: `npx intlayer pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : Путь к директории, где будут сохранены новые словари. Если не указано, новые словари будут сохранены в директории `./intlayer-dictionaries` проекта. Если в вашем контенте словаря указано поле `filePath`, словари не будут учитывать этот аргумент и будут сохранены в указанной директории `filePath`.

##### Пример:

```bash
npx intlayer pull --newDictionariesPath ./my-dictionaries-dir/
```

### Аудит словарей

```bash
npx intlayer audit
```

Эта команда анализирует ваши файлы деклараций контента на предмет потенциальных проблем, таких как отсутствующие переводы, структурные несоответствия или несовпадения типов. Если будут обнаружены какие-либо проблемы, **intlayer audit** предложит или применит обновления, чтобы поддерживать ваши словари последовательными и полными.

##### Аргументы:

- **`-f, --files [files...]`**  
  Список конкретных файлов деклараций контента для аудита. Если не указано, будут проверены все обнаруженные `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` файлы.

- **`--exclude [excludedGlobs...]`**  
  Шаблон globs для исключения из аудита (например, `--exclude "src/test/**"`).

- **`-m, --model [model]`**  
  Модель ChatGPT для использования для аудита (например, `gpt-3.5-turbo`).

- **`-p, --custom-prompt [prompt]`**  
  Укажите пользовательский запрос для ваших инструкций по аудиту.

- **`-l, --async-limit [asyncLimit]`**  
  Максимальное количество файлов, обрабатываемых одновременно.

- **`-k, --open-ai-api-key [openAiApiKey]`**  
  Укажите ваш собственный ключ API OpenAI для обхода аутентификации OAuth2.

##### Пример:

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

Эта команда проигнорирует любые файлы под `tests/**` и использует модель `gpt-3.5-turbo` для аудита обнаруженных файлов деклараций контента. Если будут обнаружены какие-либо проблемы, такие как отсутствующие переводы, они будут исправлены на месте, сохраняя оригинальную структуру файлов.

## Используйте команды intlayer в вашем `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:audit": "npx intlayer audit"
}
```
