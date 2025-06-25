---
docName: dictionary__insertion
url: /doc/concept/content/insertion
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/insertion.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: Вставка
description: Узнайте, как объявлять и использовать заполнители вставки в вашем контенте. В этой документации описаны шаги для динамической вставки значений в предопределенные структуры контента.
keywords:
  - Вставка
  - Динамический контент
  - Заполнители
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Вставка контента / Вставка в Intlayer

## Как работает вставка

В Intlayer вставка контента осуществляется с помощью функции `insertion`, которая идентифицирует поля-заполнители в строке (например, `{{name}}` или `{{age}}`), которые могут быть динамически заменены во время выполнения. Этот подход позволяет создавать гибкие строки-шаблоны, где конкретные части контента определяются данными, переданными из вашего приложения.

При интеграции с React Intlayer или Next Intlayer вы можете просто предоставить объект данных, содержащий значения для каждого заполнителя, и Intlayer автоматически отобразит контент с замененными заполнителями.

## Настройка вставки контента

Чтобы настроить вставку контента в вашем проекте Intlayer, создайте модуль контента, который включает ваши определения вставки. Ниже приведены примеры в различных форматах.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { insert, type Dictionary } from "intlayer";

const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("Привет, меня зовут {{name}}, и мне {{age}} лет!"),
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
    myInsertion: insert("Привет, меня зовут {{name}}, и мне {{age}} лет!"),
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
    myInsertion: insert("Привет, меня зовут {{name}}, и мне {{age}} лет!"),
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
      "insertion": "Привет, меня зовут {{name}}, и мне {{age}} лет!",
    },
  },
}
```

## Использование вставки контента с React Intlayer

Чтобы использовать вставку контента в компоненте React, импортируйте и используйте хук `useIntlayer` из пакета `react-intlayer`. Этот хук извлекает контент для указанного ключа и позволяет передать объект, который сопоставляет каждый заполнитель в вашем контенте со значением, которое вы хотите отобразить.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const InsertionComponent: FC = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Вывод: "Привет, меня зовут John, и мне 30 лет!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Вы можете повторно использовать ту же вставку с другими значениями */
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
          /* Вывод: "Привет, меня зовут John, и мне 30 лет!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Вы можете повторно использовать ту же вставку с другими значениями */
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
          /* Вывод: "Привет, меня зовут John, и мне 30 лет!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Вы можете повторно использовать ту же вставку с другими значениями */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

module.exports = InsertionComponent;
```

## Дополнительные ресурсы

Для получения более подробной информации о настройке и использовании обратитесь к следующим ресурсам:

- [Документация Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md)
- [Документация React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_create_react_app.md)
- [Документация Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md)

Эти ресурсы предоставляют дополнительные сведения о настройке и использовании Intlayer в различных средах и фреймворках.
