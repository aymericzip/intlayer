---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Вставлення
description: Дізнайтеся, як оголошувати та використовувати заповнювачі (placeholders) для вставлення вмісту. Ця документація проведе вас крок за кроком по процесу динамічного вставлення значень у заздалегідь визначені структури вмісту.
keywords:
  - Вставлення
  - Динамічний вміст
  - Заповнювачі
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - insertion
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Вміст вставлень / Вставлення в Intlayer

## Як працює вставлення

В Intlayer вставки контенту реалізуються за допомогою функції `insertion`, яка виявляє поля-плейсхолдери в рядку (наприклад `{{name}}` або `{{age}}`), що можуть бути динамічно замінені під час виконання. Такий підхід дозволяє створювати гнучкі, шаблоноподібні рядки, де конкретні частини вмісту визначаються даними, переданими з вашого застосунку.

При інтеграції з React Intlayer або Next Intlayer достатньо передати об'єкт даних, що містить значення для кожного плейсхолдера, і Intlayer автоматично відрендерить вміст із заміненими плейсхолдерами.

## Налаштування Insertion-контенту

Щоб налаштувати insertion-контент у вашому проєкті Intlayer, створіть модуль контенту, який містить визначення вставок. Нижче наведено приклади в різних форматах.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { insert, type Dictionary } from "intlayer";

const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("Привіт, мене звати {{name}} і мені {{age}} років!"),
  },
} satisfies Dictionary;

export default myInsertionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { insert } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("Привіт, мене звати {{name}} і мені {{age}} років!"),
  },
};

export default myInsertionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { insert } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "Hello, my name is {{name}} and I am {{age}} years old!"
    ),
  },
};

module.exports = myInsertionContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myInsertion": {
      "nodeType": "insertion",
      "insertion": "Hello, my name is {{name}} and I am {{age}} years old!",
    },
  },
}
```

## Використання вставного контенту з React Intlayer

Щоб використовувати insertion контент у React-компоненті, імпортуйте та використайте хук `useIntlayer` з пакету `react-intlayer`. Цей хук отримує контент для вказаного ключа і дозволяє передати об'єкт, який зіставляє кожен заповнювач (placeholder) у вашому контенті зі значенням, яке ви хочете відобразити.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const InsertionComponent: FC = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Виведе: "Hello, my name is John and I am 30 years old!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Ви можете повторно використовувати ту саму вставку з різними значеннями */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Вивід: "Привіт, мене звати John і мені 30 років!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Ви можете повторно використовувати ту саму вставку з іншими значеннями */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Вивід: "Привіт, мене звуть John і мені 30 років!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Ви можете повторно використовувати той самий insertion з різними значеннями */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

module.exports = InsertionComponent;
```

## Додаткові ресурси

Для більш детальної інформації щодо конфігурації та використання, зверніться до наступних ресурсів:

- [Документація Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
- [Документація Intlayer для React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_create_react_app.md)
- [Документація Intlayer для Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_15.md)

Ці ресурси надають додаткову інформацію щодо налаштування та використання Intlayer у різних середовищах та фреймворках.
