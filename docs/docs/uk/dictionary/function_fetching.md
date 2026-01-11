---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Отримання через функції
description: Дізнайтеся, як оголосити та використовувати отримання через функції у вашому мультимовному вебсайті. Дотримуйтесь кроків у цій онлайн-документації, щоб налаштувати проєкт за кілька хвилин.
keywords:
  - Отримання через функції
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
  - function-fetching
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Отримання через функції

Intlayer дозволяє вам оголошувати функції контенту в ваших контент-модулях, які можуть бути синхронними або асинхронними. Під час збірки застосунку Intlayer виконує ці функції, щоб отримати результат функції. Значення, що повертається, має бути JSON-об'єктом або простим значенням, таким як рядок або число.

> Увага: функціональне отримання контенту наразі недоступне в JSON-оголошеннях контенту та у віддалених деклараційних файлах контенту.

## Оголошення функцій

Ось приклад простого синхронного отримання контенту за допомогою функції:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "Це контент, який повертається функцією",
  },
} satisfies Dictionary;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Це вміст, відрендерований функцією",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Це вміст, відрендерований функцією",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "Це вміст, відрендерений функцією"
  }
}
```

У цьому прикладі ключ `text` містить функцію, яка повертає рядок. Цей контент можна відобразити у ваших React-компонентах за допомогою пакетів інтерпретатора Intlayer, таких як `react-intlayer`.

## Асинхронне отримання даних функцією

На додаток до синхронних функцій, Intlayer також підтримує асинхронні функції, що дозволяє отримувати дані з зовнішніх джерел або імітувати отримання даних за допомогою мок-даних.

Нижче наведений приклад асинхронної функції, яка імітує звернення до сервера:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Почекайте 200 мс, щоб симулювати запит до сервера
  return await setTimeout(200).then(() => "Це вміст, отриманий із сервера");
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies Dictionary;

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { setTimeout } from "node:timers/promises";

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // Почекайте 200 мс, щоб симулювати запит до сервера
  await setTimeout(200);
  return "Це вміст, отриманий із сервера";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { setTimeout } = require("node:timers/promises");

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // Почекайте 200 мс, щоб змоделювати запит до сервера
  await setTimeout(200);
  return "Це вміст, отриманий із сервера";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
Неможливо отримати вміст із JSON-файлу, використовуйте натомість .ts або .js файл
```

У цьому випадку функція `fakeFetch` імітує затримку, щоб симулювати час відповіді сервера. Intlayer виконує асинхронну функцію і використовує результат як вміст для ключа `text`.

## Використання контенту на основі функцій у React-компонентах

Щоб використовувати контент на основі функцій у React-компоненті, потрібно імпортувати `useIntlayer` з `react-intlayer` і викликати його з ідентифікатором контенту, щоб отримати вміст. Ось приклад:

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Вивід: Це вміст, відрендерений функцією */}
      <p>{asyncFunctionContent.text}</p>
      {/* Вивід: Це вміст, отриманий із сервера */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Вивід: Це вміст, відрендерений функцією */}
      <p>{asyncFunctionContent.text}</p>
      {/* Вивід: Це вміст, отриманий із сервера */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Вивід: Це вміст, відрендерений функцією */}
      <p>{asyncFunctionContent.text}</p>
      {/* Вивід: Це вміст, отриманий з сервера */}
    </div>
  );
};

module.exports = MyComponent;
```
