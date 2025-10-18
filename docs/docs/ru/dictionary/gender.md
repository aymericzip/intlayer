---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: Контент на основе пола
description: Узнайте, как использовать контент на основе пола в Intlayer для динамического отображения содержимого в зависимости от пола. Следуйте этой документации, чтобы эффективно реализовать контент, специфичный для пола, в вашем проекте.
keywords:
  - Контент на основе пола
  - Динамическое отображение
  - Документация
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - gender
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: Введение контента, основанного на поле
---

# Контент на основе пола / Пол в Intlayer

## Как работает пол

В Intlayer контент на основе пола реализуется с помощью функции `gender`, которая сопоставляет конкретные значения пола ('male', 'female') с соответствующим содержимым. Такой подход позволяет динамически выбирать контент в зависимости от указанного пола. При интеграции с React Intlayer или Next Intlayer соответствующий контент автоматически выбирается в соответствии с полом, переданным во время выполнения.

## Настройка контента на основе пола

Чтобы настроить контент на основе пола в вашем проекте Intlayer, создайте модуль контента, который включает определения, специфичные для пола. Ниже приведены примеры в различных форматах.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "мой контент для мужчин",
      female: "мой контент для женщин",
      fallback: "мой контент, когда пол не указан", // Необязательно
    }),
  },
} satisfies Dictionary;

export default myGenderContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { gender } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "мой контент для мужчин",
      female: "мой контент для женщин",
      fallback: "мой контент, когда пол не указан", // Необязательно
    }),
  },
};

export default myGenderContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { gender } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "мой контент для мужчин",
      female: "мой контент для женщин",
      fallback: "мой контент, когда пол не указан", // Необязательно
    }),
  },
};

module.exports = myGenderContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myGender": {
      "nodeType": "gender",
      "gender": {
        "male": "мой контент для мужчин",
        "female": "мой контент для женщин",
        "fallback": "мой контент, когда пол не указан", // Необязательно
      },
    },
  },
}
```

> Если не указан fallback, в качестве fallback будет взят последний объявленный ключ, если пол не указан или не соответствует ни одному из определённых полов.

## Использование контента на основе пола с React Intlayer

Чтобы использовать контент, зависящий от пола, внутри React-компонента, импортируйте и используйте хук `useIntlayer` из пакета `react-intlayer`. Этот хук получает контент по указанному ключу и позволяет передать пол для выбора соответствующего варианта вывода.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Вывод: мой контент для мужчин */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Вывод: мой контент для женщин */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Вывод: мой контент для мужчин */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Вывод: мой контент для женщин */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Вывод: мой контент, когда пол не указан */
          myGender("")
        }
      </p>
      <p>
        {
          /* Вывод: мой контент, когда пол не указан */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Вывод: мой контент для мужчин */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Вывод: мой контент для женщин */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Вывод: мой контент для мужчин */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Вывод: мой контент для женщин */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Вывод: мой контент, когда пол не указан */
          myGender("")
        }
      </p>
      <p>
        {
          /* Вывод: мой контент, когда пол не указан */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Вывод: мой контент для мужчин */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Вывод: мой контент для женщин */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Вывод: мой контент для мужчин */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Вывод: мой контент для женщин */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Вывод: мой контент, когда пол не указан */
          myGender("")
        }
      </p>
      <p>
        {
          /* Вывод: мой контент, когда пол не указан */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

module.exports = GenderComponent;
```

## Дополнительные ресурсы

Для получения более подробной информации о настройке и использовании обратитесь к следующим ресурсам:

- [Документация Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md)
- [Документация React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_create_react_app.md)
- [Документация Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_15.md)

Эти ресурсы предлагают дополнительные сведения о настройке и использовании Intlayer в различных средах и фреймворках.
