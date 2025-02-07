# Вложение / Ссылки на вложенный контент

## Как работает вложение

В Intlayer вложение достигается с помощью функции `nest`, которая позволяет ссылаться и повторно использовать контент из другого словаря. Вместо дублирования контента вы можете указать на существующий модуль контента по его ключу.

## Настройка вложения

Чтобы настроить вложение в вашем проекте Intlayer, сначала определите базовое содержимое, которое вы хотите повторно использовать. Затем в отдельном модуле содержимого используйте функцию `nest` для импорта этого содержимого.

### Базовый словарь

Ниже приведен пример базового словаря с вложенным контентом:

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

### Ссылки с помощью Nest

Теперь создайте другой модуль содержимого, который использует функцию `nest`, чтобы ссылаться на указанное выше содержимое. Вы можете ссылаться на весь контент или на конкретное вложенное значение:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat="typescript"
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // Ссылается на весь словарь:
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // Ссылается на определенное вложенное значение:
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

В качестве второго параметра вы можете указать путь к вложенному значению внутри этого контента. Если путь не предоставлен, возвращается весь контент ссылочного словаря.

## Использование вложения с React Intlayer

Чтобы использовать вложенный контент в React-компоненте, используйте хук `useIntlayer` из пакета `react-intlayer`. Этот хук получает правильный контент на основе указанного ключа. Вот пример использования:

```tsx fileName="/**/ru/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Полное вложенное содержание: {JSON.stringify(fullNestedContent)}
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

```javascript fileName="/**/ru/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Полное вложенное содержание: {JSON.stringify(fullNestedContent)}
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

```javascript fileName="/**/ru/*.cjx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Полное вложенное содержание: {JSON.stringify(fullNestedContent)}
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

Чтобы получить более подробную информацию о настройке и использовании, обратитесь к следующим ресурсам:

- [Документация Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md)
- [Документация React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_create_react_app.md)
- [Документация Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md)

Эти ресурсы предоставляют дополнительную информацию о настройке и использовании Intlayer в различных средах и с разными фреймворками.
