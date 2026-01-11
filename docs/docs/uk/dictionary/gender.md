---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: Гендерно-орієнтований контент
description: Дізнайтеся, як використовувати гендерно-орієнтований контент в Intlayer для динамічного відображення вмісту залежно від гендеру. Слідуйте цій документації, щоб ефективно реалізувати гендерно-специфічний контент у вашому проєкті.
keywords:
  - Гендерно-орієнтований контент
  - Динамічний рендеринг
  - Документація
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
    changes: Додано підтримку гендерно-залежного контенту
---

# Гендерно-орієнтований контент / Гендер в Intlayer

## Як працює гендерна логіка

У Intlayer контент, залежний від гендера, реалізується за допомогою функції `gender`, яка зіставляє конкретні значення гендера ('male', 'female') з відповідним вмістом. Такий підхід дозволяє динамічно обирати контент залежно від заданого гендера. При інтеграції з React Intlayer або Next Intlayer відповідний вміст автоматично вибирається відповідно до гендера, переданого під час виконання.

## Налаштування контенту, залежного від гендера

Щоб налаштувати контент залежно від гендера у вашому проекті Intlayer, створіть модуль контенту, який містить ваші визначення для конкретних гендерів. Нижче наведені приклади в різних форматах.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "мій контент для чоловіків",
      female: "мій контент для жінок",
      fallback: "мій контент, коли стать не вказана", // Необов'язково
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
      male: "мій контент для чоловіків",
      female: "мій контент для жінок",
      fallback: "мій контент, коли стать не вказана", // Необов'язково
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
      male: "мій контент для чоловіків",
      female: "мій контент для жінок",
      fallback: "мій контент, коли стать не вказана", // Необов'язково
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
        "male": "мій контент для чоловіків",
        "female": "мій контент для жінок",
        "fallback": "мій контент, коли стать не вказана", // Необов'язково
      },
    },
  },
}
```

> Якщо не вказано fallback, останній оголошений ключ буде використано як fallback, якщо стать не вказана або не відповідає жодній визначеній статі.

## Використання контенту за гендером у React Intlayer

Щоб використовувати контент, залежний від гендеру, у React-компоненті, імпортуйте й застосуйте хук `useIntlayer` з пакету `react-intlayer`. Цей хук отримує контент за вказаним ключем і дозволяє передати гендер, щоб обрати відповідний варіант виводу.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Вивід: мій контент для чоловіків */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Вивід: мій контент для жіночої аудиторії */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Вивід: мій контент для чоловічої аудиторії */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Вивід: мій контент для жіночої аудиторії */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Вивід: мій контент, коли стать не вказана */
          myGender("")
        }
      </p>
      <p>
        {
          /* Вивід: мій контент, коли стать не вказана */
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
          /* Вивід: мій контент для чоловіків */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Вивід: мій контент для жінок */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Вивід: мій контент для чоловіків */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Вивід: мій контент для жінок */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Вивід: мій контент, коли стать не вказана */
          myGender("")
        }
      </p>
      <p>
        {
          /* Вивід: мій контент, коли стать не вказана */
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
          /* Вивід: мій контент для чоловічих користувачів */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Вивід: мій контент для жіночих користувачів */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Вивід: мій контент для чоловічих користувачів */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Вивід: мій контент для жіночих користувачів */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Вивід: мій контент, коли gender не вказано */
          myGender("")
        }
      </p>
      <p>
        {
          /* Вивід: мій контент, коли gender не вказано */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

module.exports = GenderComponent;
```

## Додаткові ресурси

Для детальнішої інформації щодо налаштування та використання зверніться до таких ресурсів:

- [Документація Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
- [Документація React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_create_react_app.md)
- [Документація Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_15.md)

Ці ресурси надають додаткові відомості щодо налаштування та використання Intlayer у різних середовищах та фреймворках.
