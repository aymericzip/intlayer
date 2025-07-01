---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Файл
description: Узнайте, как встраивать внешние файлы в ваш словарь контента с помощью функции `file`. Эта документация объясняет, как Intlayer связывает и динамически управляет содержимым файлов.
keywords:
  - Файл
  - Интернационализация
  - Документация
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - file
---

# Содержимое файла / Встраивание файлов в Intlayer

## Как работает встраивание файлов

В Intlayer функция `file` позволяет встраивать содержимое внешних файлов в словарь. Такой подход гарантирует, что Intlayer распознает исходный файл, обеспечивая бесшовную интеграцию с визуальным редактором Intlayer и CMS. В отличие от прямого использования `import`, `require` или методов чтения файлов через `fs`, использование `file` связывает файл со словарем, позволяя Intlayer отслеживать и динамически обновлять содержимое при редактировании файла.

## Настройка содержимого файла

Чтобы встроить содержимое файла в ваш проект Intlayer, используйте функцию `file` в модуле контента. Ниже приведены примеры, демонстрирующие различные реализации.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
};

export default myFileContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Объявление словаря с использованием функции file для встраивания содержимого файла
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
};

module.exports = myFileContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myFile": {
      "nodeType": "file",
      "value": "./path/to/file.txt",
    },
  },
}
```

## Использование содержимого файла в React Intlayer

Чтобы использовать встроенное содержимое файла в React-компоненте, импортируйте и используйте хук `useIntlayer` из пакета `react-intlayer`. Этот хук извлекает содержимое по указанному ключу и позволяет динамически отображать его.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

module.exports = FileComponent;
```

## Пример многоязычного Markdown

Для поддержки многоязычных редактируемых файлов Markdown вы можете использовать `file` в сочетании с `t()` и `md()`, чтобы определить разные языковые версии файла с содержимым Markdown.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        ru: file("src/components/test.ru.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
} satisfies Dictionary;

export default myMultilingualContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file, t, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        ru: file("src/components/test.ru.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};

export default myMultilingualContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file, t, md } = require("intlayer");

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};
```

Эта настройка позволяет динамически получать контент в зависимости от предпочтений языка пользователя. При использовании в Intlayer Visual Editor или CMS система распознает, что контент поступает из указанных Markdown-файлов, и гарантирует, что они остаются редактируемыми.

## Как Intlayer обрабатывает содержимое файлов

Функция `file` основана на модуле `fs` Node.js для чтения содержимого указанного файла и вставки его в словарь. При использовании совместно с Intlayer Visual Editor или CMS Intlayer может отслеживать связь между словарём и файлом. Это позволяет Intlayer:

- Распознавать, что контент происходит из конкретного файла.
- Автоматически обновлять содержимое словаря при редактировании связанного файла.
- Обеспечивать синхронизацию между файлом и словарём, сохраняя целостность содержимого.

## Дополнительные ресурсы

Для получения более подробной информации о настройке и использовании встраивания файлов в Intlayer обратитесь к следующим ресурсам:

- [Документация Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md)
- [Документация React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_create_react_app.md)
- [Документация Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_15.md)
- [Документация по содержимому Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/markdown.md)
- [Документация по содержимому перевода](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/translation.md)

Эти ресурсы предоставляют дополнительные сведения о встраивании файлов, управлении содержимым и интеграции Intlayer с различными фреймворками.

## История документа

- 5.5.10 - 2025-06-29: Инициализация истории
