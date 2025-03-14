# Содержимое файла / Встраивание файлов в Intlayer

## Как работает встраивание файлов

В Intlayer функция `file` позволяет встраивать содержимое внешнего файла в словарь. Этот подход обеспечивает распознавание исходного файла Intlayer, что позволяет легко интегрировать его с визуальным редактором и CMS Intlayer. В отличие от прямого использования методов `import`, `require` или чтения файлов через `fs`, использование `file` связывает файл со словарем, позволяя Intlayer отслеживать и динамически обновлять содержимое при редактировании файла.

## Настройка содержимого файла

Чтобы встроить содержимое файла в ваш проект Intlayer, используйте функцию `file` в модуле содержимого. Ниже приведены примеры различных реализаций.

### Реализация на TypeScript

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"), // Встраивание содержимого файла
  },
} satisfies Dictionary;

export default myFileContent;
```

### Реализация на ECMAScript Module (ESM)

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"), // Встраивание содержимого файла
  },
};

export default myFileContent;
```

### Реализация на CommonJS

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"), // Встраивание содержимого файла
  },
};

module.exports = myFileContent;
```

### Конфигурация JSON

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myFile": {
      "nodeType": "file",
      "value": "./path/to/file.txt", // Путь к файлу
    },
  },
}
```

## Использование содержимого файла в React Intlayer

Чтобы использовать встроенное содержимое файла в компоненте React, импортируйте и используйте хук `useIntlayer` из пакета `react-intlayer`. Это позволяет извлекать содержимое по указанному ключу и отображать его динамически.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key"); // Получение содержимого файла

  return (
    <div>
      <pre>{myFile}</pre> {/* Отображение содержимого файла */}
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key"); // Получение содержимого файла

  return (
    <div>
      <pre>{myFile}</pre> {/* Отображение содержимого файла */}
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key"); // Получение содержимого файла

  return (
    <div>
      <pre>{myFile}</pre> {/* Отображение содержимого файла */}
    </div>
  );
};

module.exports = FileComponent;
```

## Пример многоязычного Markdown

Чтобы поддерживать редактируемые Markdown-файлы на нескольких языках, вы можете использовать `file` в сочетании с `t()` и `md()` для определения различных языковых версий содержимого Markdown.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        ru: file("src/components/test.ru.md"), // Русская версия
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
        ru: file("src/components/test.ru.md"), // Русская версия
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
        ru: file("src/components/test.ru.md"), // Русская версия
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};
```

Эта настройка позволяет динамически извлекать содержимое в зависимости от языковых предпочтений пользователя. При использовании в визуальном редакторе или CMS Intlayer система распознает, что содержимое поступает из указанных Markdown-файлов, и обеспечивает их редактируемость.

## Как Intlayer обрабатывает содержимое файлов

Функция `file` основана на модуле Node.js `fs` для чтения содержимого указанного файла и вставки его в словарь. При использовании в сочетании с визуальным редактором или CMS Intlayer система может отслеживать связь между словарем и файлом. Это позволяет Intlayer:

- Распознавать, что содержимое происходит из определенного файла.
- Автоматически обновлять содержимое словаря при редактировании связанного файла.
- Обеспечивать синхронизацию между файлом и словарем, сохраняя целостность содержимого.

## Дополнительные ресурсы

Для получения дополнительной информации о настройке и использовании встраивания файлов в Intlayer обратитесь к следующим ресурсам:

- [Документация Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md)
- [Документация React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_create_react_app.md)
- [Документация Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md)
- [Документация Markdown Content](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/markdown.md)
- [Документация Translation Content](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/translation.md)

Эти ресурсы предоставляют дополнительную информацию о встраивании файлов, управлении содержимым и интеграции Intlayer с различными фреймворками.
