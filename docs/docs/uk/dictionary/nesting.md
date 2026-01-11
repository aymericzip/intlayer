---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Вкладення словника
description: Дізнайтесь, як використовувати вкладення контенту в Intlayer, щоб ефективно повторно використовувати та структурувати багатомовний контент. Дотримуйтесь цієї документації, щоб безшовно реалізувати вкладення у вашому проєкті.
keywords:
  - Вкладення
  - Повторне використання контенту
  - Документація
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - nesting
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Вкладення / Посилання на підконтент

## Як працює вкладення

У Intlayer вкладення реалізується за допомогою функції `nest`, яка дозволяє посилатися на контент з іншого словника та повторно його використовувати. Замість дублювання контенту ви можете вказати на існуючий модуль контенту за його ключем.

## Налаштування вкладення

Щоб налаштувати вкладення у вашому проєкті Intlayer, спочатку визначте базовий контент, який ви хочете повторно використовувати. Далі, у окремому модулі контенту, використайте функцію `nest` для імпорту цього контенту.

### Базовий словник

Нижче наведено приклад базового словника, який можна вкладати в інший словник:

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

### Посилання за допомогою nest

Тепер створіть інший модуль вмісту, який використовує функцію `nest` для посилання на наведений вище вміст. Ви можете посилатися на весь вміст або на конкретне вкладене значення:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat="typescript"
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // Посилання на весь словник:
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // Посилання на конкретне вкладене значення:
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

Як другий параметр ви можете вказати шлях до вкладеного значення в цьому вмісті. Якщо шлях не вказано, повертається весь вміст зазначеного словника.

## Використання вкладення з React Intlayer

Щоб використовувати вкладений вміст у React-компоненті, скористайтеся хуком `useIntlayer` з пакету `react-intlayer`. Цей хук отримує відповідний вміст на основі вказаного ключа. Ось приклад того, як його використовувати:

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
        Full Nested Content: {JSON.stringify(fullNestedContent)}
        {/* Вивід: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Часткове вкладене значення: {partialNestedContent}
        {/* Вивід: 0 */}
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
        Повний вкладений вміст: {JSON.stringify(fullNestedContent)}
        {/* Вивід: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Часткове вкладене значення: {partialNestedContent}
        {/* Вивід: 0 */}
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
        Full Nested Content: {JSON.stringify(fullNestedContent)}
        {/* Вивід: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Partial Nested Value: {partialNestedContent}
        {/* Вивід: 0 */}
      </p>
    </div>
  );
};

module.exports = NestComponent;
```

## Додаткові ресурси

Для детальнішої інформації щодо конфігурації та використання зверніться до наступних ресурсів:

- [Документація Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
- [Документація React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_create_react_app.md)
- [Документація Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_15.md)

Ці ресурси надають додаткові відомості щодо налаштування та використання Intlayer в різних середовищах та з різними фреймворками.
