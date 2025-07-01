---
docName: dictionary__function_fetching
url: https://intlayer.org/doc/concept/content/function-fetching
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/function_fetching.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Получение данных через функции
description: Узнайте, как объявлять и использовать получение данных через функции на вашем многоязычном сайте. Следуйте шагам в этой онлайн-документации, чтобы настроить ваш проект за несколько минут.
keywords:
  - Получение данных через функции
  - Интернационализация
  - Документация
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Получение данных через функции

Intlayer позволяет объявлять функции контента в ваших модулях контента, которые могут быть как синхронными, так и асинхронными. При сборке приложения Intlayer выполняет эти функции, чтобы получить результат функции. Возвращаемое значение должно быть объектом JSON или простым значением, таким как строка или число.

> Внимание: получение данных через функции в настоящее время недоступно в объявлениях контента в формате JSON и в файлах удалённых объявлений контента.

## Объявления функций

Вот пример простой синхронной функции, получающей контент:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "This is the content rendered by a function",
  },
} satisfies Dictionary;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Это контент, сгенерированный функцией",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Это контент, сгенерированный функцией",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "Это контент, сгенерированный функцией"
  }
}
```

В этом примере ключ `text` содержит функцию, которая возвращает строку. Этот контент может быть отображён в ваших React-компонентах с использованием пакетов интерпретатора Intlayer, таких как `react-intlayer`.

## Асинхронное получение данных функцией

Помимо синхронных функций, Intlayer поддерживает асинхронные функции, что позволяет получать данные из внешних источников или имитировать получение данных с помощью мок-данных.

Ниже приведён пример асинхронной функции, которая имитирует запрос к серверу:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Ждём 200 мс, чтобы имитировать запрос к серверу
  return await setTimeout(200).then(() => "Это контент, полученный с сервера");
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
  // Ждём 200 мс, чтобы имитировать запрос к серверу
  await setTimeout(200);
  return "Это контент, полученный с сервера";
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
  // Ждём 200 мс, чтобы имитировать запрос к серверу
  await setTimeout(200);
  return "Это контент, полученный с сервера";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
Невозможно получить контент из JSON-файла, используйте вместо этого файл .ts или .js
```

В этом случае функция `fakeFetch` имитирует задержку, чтобы смоделировать время отклика сервера. Intlayer выполняет асинхронную функцию и использует результат в качестве содержимого для ключа `text`.

## Использование контента на основе функций в React-компонентах

Чтобы использовать контент на основе функций в React-компоненте, необходимо импортировать `useIntlayer` из `react-intlayer` и вызвать его с идентификатором контента для получения содержимого. Вот пример:

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Вывод: Это содержимое, сгенерированное функцией */}
      <p>{asyncFunctionContent.text}</p>
      {/* Вывод: Это содержимое, полученное с сервера */}
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
      {/* Вывод: Это содержимое, сгенерированное функцией */}
      <p>{asyncFunctionContent.text}</p>
      {/* Вывод: Это содержимое, полученное с сервера */}
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
      {/* Вывод: Это содержимое, сгенерированное функцией */}
      <p>{asyncFunctionContent.text}</p>
      {/* Вывод: Это содержимое, полученное с сервера */}
    </div>
  );
};

module.exports = MyComponent;
```

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
