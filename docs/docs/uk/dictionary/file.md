---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Файл
description: Дізнайтеся, як вбудовувати зовнішні файли у ваш content dictionary за допомогою функції `file`. Ця документація пояснює, як Intlayer пов’язує та динамічно керує вмістом файлів.
keywords:
  - Файл
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - file
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
---

# Вміст файлу / Вбудовування файлів в Intlayer

В Intlayer функція `file` дозволяє вбудовувати вміст зовнішніх файлів у dictionary. Такий підхід гарантує, що Intlayer розпізнає файл-джерело, що забезпечує плавну інтеграцію з Intlayer Visual Editor та CMS.

## Чому використовувати `file` замість `import`, `require` або `fs`?

На відміну від методів читання файлів `import`, `require` або `fs`, використання `file` пов’язує файл зі словником, що дозволяє Intlayer відстежувати та оновлювати вміст динамічно під час редагування файлу. Внаслідок цього використання `file` забезпечує кращу інтеграцію з Intlayer Visual Editor та CMS.

## Налаштування вмісту файлу

Щоб вбудувати вміст файлу у ваш проект Intlayer, використовуйте функцію `file` у модулі контенту. Нижче наведені приклади, що демонструють різні реалізації.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
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

## Використання вмісту файлу в React Intlayer

Щоб використовувати вбудований вміст файлу в React-компоненті, імпортуйте і використовуйте хук `useIntlayer` з пакета `react-intlayer`. Це отримує вміст за вказаним ключем і дозволяє відображати його динамічно.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
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

## Приклад багатомовного Markdown

Щоб підтримувати багатомовні редаговані Markdown-файли, ви можете використовувати `file` у поєднанні з `t()` та `md()` для визначення версій вмісту Markdown різними мовами.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { file, t, md, type Dictionary } from "intlayer";

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
} satisfies Dictionary;

export default myMultilingualContent;
```

Ця конфігурація дозволяє динамічно отримувати вміст залежно від мовних налаштувань користувача. При використанні в Intlayer Visual Editor або CMS система розпізнає, що вміст походить із зазначених Markdown-файлів, і забезпечить їхню можливість редагування.

## Різні типи шляхів

Коли ви використовуєте функцію `file`, можна застосовувати різні типи шляхів, щоб вказати файл для вставки.

- `file("./path/to/file.txt")` - Відносний шлях відносно поточного файлу
- `file("path/to/file.txt")` - Відносний шлях відносно кореневої директорії проєкту
- `file("/users/username/path/to/file.txt")` - Абсолютний шлях

## Як Intlayer обробляє вміст файлу

Функція `file` базується на модулі `fs` у Node.js для читання вмісту вказаного файлу та вставлення його до словника. У поєднанні з Intlayer Visual Editor або CMS Intlayer може відстежувати зв’язок між словником і файлом. Це дозволяє Intlayer:

- Розпізнавати, що вміст походить із конкретного файлу.
- Автоматично оновлювати вміст словника при редагуванні пов’язаного файлу.
- Забезпечте синхронізацію між файлом та словником, зберігаючи цілісність вмісту.

## Додаткові ресурси

Для детальнішої інформації щодо налаштування та використання вставки файлів в Intlayer зверніться до наступних ресурсів:

- [Документація Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
- [Документація Intlayer для React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_create_react_app.md)
- [Документація Intlayer для Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_15.md)
- [Документація з Markdown-контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/markdown.md)
- [Документація з перекладу контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/translation.md)

Ці ресурси надають додаткові відомості про вбудовування файлів, керування контентом та інтеграцію Intlayer із різними фреймворками.
