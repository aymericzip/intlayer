---
docName: dictionary__nesting
url: https://intlayer.org/doc/concept/content/nesting
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/nesting.md
createdAt: 2025-02-7
updatedAt: 2025-02-7
title: Вложенность словаря
description: Узнайте, как использовать вложенность контента в Intlayer для эффективного повторного использования и структурирования многоязычного контента. Следуйте этой документации, чтобы без проблем реализовать вложенность в вашем проекте.
keywords:
  - Nesting
  - Повторное использование контента
  - Документация
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Вложенность / Ссылки на Подконтент

## Как работает вложенность

В Intlayer вложенность достигается с помощью функции `nest`, которая позволяет ссылаться и повторно использовать контент из другого словаря. Вместо дублирования контента вы можете указать на существующий модуль контента по его ключу.

## Настройка вложенности

Чтобы настроить вложенность в вашем проекте Intlayer, сначала определите базовый контент, который вы хотите повторно использовать. Затем в отдельном модуле контента используйте функцию `nest` для импорта этого контента.

### Базовый словарь

Ниже приведен пример базового словаря для вложения в другой словарь:

```typescript fileName="firstDictionary.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary } from "intlayer";

const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
} satisfies Dictionary;

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

module.exports = firstDictionary;
```

```json fileName="firstDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_first_dictionary",
  "content": {
    "content": "content",
    "subContent": {
      "contentNumber": 0,
      "contentString": "string"
    }
  }
}
```

### Ссылка с помощью Nest

Теперь создайте другой модуль контента, который использует функцию `nest` для ссылки на вышеуказанный контент. Вы можете ссылаться на весь контент или на определенное вложенное значение:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat="typescript"
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // Ссылка на весь словарь:
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // Ссылка на определенное вложенное значение:
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
} satisfies Dictionary;

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.mjs" contentDeclarationFormat="esm"
import { nest } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { nest } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

module.exports = myNestingContent;
```

```json fileName="secondDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_second_dictionary",
  "content": {
    "fullNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary"
      }
    },
    "partialNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary",
        "path": "subContent.contentNumber"
      }
    }
  }
}
```

В качестве второго параметра вы можете указать путь к вложенному значению внутри этого контента. Если путь не указан, возвращается весь контент ссылочного словаря.

## Использование вложенности с React Intlayer

Чтобы использовать вложенный контент в React-компоненте, используйте хук `useIntlayer` из пакета `react-intlayer`. Этот хук извлекает правильный контент на основе указанного ключа. Вот пример его использования:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Полный вложенный контент: {JSON.stringify(fullNestedContent)}
        {/* Вывод: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Частичное вложенное значение: {partialNestedContent}
        {/* Вывод: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Полный вложенный контент: {JSON.stringify(fullNestedContent)}
        {/* Вывод: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Частичное вложенное значение: {partialNestedContent}
        {/* Вывод: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.cjx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Полный вложенный контент: {JSON.stringify(fullNestedContent)}
        {/* Вывод: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Частичное вложенное значение: {partialNestedContent}
        {/* Вывод: 0 */}
      </p>
    </div>
  );
};

module.exports = NestComponent;
```

## Дополнительные ресурсы

Для получения более подробной информации о настройке и использовании обратитесь к следующим ресурсам:

- [Документация Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md)
- [Документация React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_create_react_app.md)
- [Документация Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_15.md)

Эти ресурсы предоставляют дополнительные сведения о настройке и использовании Intlayer в различных средах и с различными фреймворками.
