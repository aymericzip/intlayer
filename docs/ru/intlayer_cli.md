# Intlayer CLI

## Установить пакет

Установите необходимые пакеты с помощью npm:

```bash
npm install intlayer-cli
```

```bash
yarn add intlayer-cli
```

```bash
pnpm add intlayer-cli
```

> Примечание: если пакет `intlayer` уже установлен, cli устанавливается автоматически. Вы можете пропустить этот шаг.

## пакет intlayer-cli

Пакет `intlayer-cli` предназначен для трансляции ваших [intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md) объявлений в словари.

Этот пакет будет транслировать все файлы intlayer, такие как `src/**/*.content.{ts|js|mjs|cjs|json}`. [Смотрите, как объявить ваши файлы деклараций Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Для интерпретации словарей intlayer вы можете использовать интерпретаторы, такие как [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/react-intlayer/README.md) или [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/next-intlayer/README.md)

## Поддержка конфигурационного файла

Intlayer принимает несколько форматов конфигурационного файла:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Чтобы узнать, как настроить доступные локали или другие параметры, обратитесь к [документации по конфигурации здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

## Запуск команд intlayer

### Построить словари

Чтобы построить ваши словари, вы можете выполнить команды:

```bash
npx intlayer build
```

или в режиме наблюдения

```bash
npx intlayer build --watch
```

Эта команда найдет ваши файлы контента деклараций по умолчанию как `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. И создаст словари в директории `.intlayer`.

### Отправить словари

```bash
npx intlayer push
```

Если [редактор intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_editor.md) установлен, вы также можете отправить словари в редактор. Эта команда позволит сделать словари доступными для редактора на [https://intlayer.org/dashboard/content](https://intlayer.org/dashboard/content). Таким образом, вы можете делиться своими словарями с вашей командой и редактировать ваш контент без редактирования кода вашего приложения.

##### Аргументы:

- `-d`, `--dictionaries`: идентификаторы словарей для извлечения. Если не указано, будут отправлены все словари.
  > Пример: `npx intlayer push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: пропустить вопрос о том, следует ли удалить локальные директории после того, как словари отправлены, и удалить их. По умолчанию, если словарь определен локально, он перезапишет содержимое удаленных словарей.
  > Пример: `npx intlayer push -r`
- `-k`, `--keepLocaleDictionary`: пропустить вопрос о том, следует ли удалить локальные директории после того, как словари отправлены, и оставить их. По умолчанию, если словарь определен локально, он перезапишет содержимое удаленных словарей.
  > Пример: `npx intlayer push -k`

### Извлечь удаленные словари

```bash
npx intlayer pull
```

Если [редактор intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_editor.md) установлен, вы также можете извлечь словари из редактора. Таким образом, вы можете перезаписать содержимое ваших словарей для нужд вашего приложения.

##### Аргументы:

- `-d, --dictionaries`: Идентификаторы словарей для извлечения. Если не указано, все словари будут извлечены.
  > Пример: `npx intlayer pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : Путь к директории, где будут сохранены новые словари. Если не указано, новые словари будут сохранены в директории `./intlayer-dictionaries` проекта. Если в вашем содержимом словаря указано поле `filePath`, словари не будут учитывать этот аргумент и будут сохранены в указанной директории `filePath`.
  > Пример: `npx intlayer pull --newDictionariesPath ./my-dictionaries`

## Используйте команды intlayer в вашем `package.json`:

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull"
}
```
