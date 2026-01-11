---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Перелічення
description: Дізнайтеся, як оголошувати та використовувати перелічення на вашому багатомовному сайті. Дотримуйтеся кроків у цій онлайн-документації, щоб налаштувати проект за кілька хвилин.
keywords:
  - Перелічення
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
  - enumeration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Перелічення / Утворення множини

## Як працює перелічення

В Intlayer перелічення реалізується за допомогою функції `enu`, яка зіставляє конкретні ключі з відповідним вмістом. Ці ключі можуть представляти числові значення, діапазони або власні ідентифікатори. При використанні з React Intlayer або Next Intlayer відповідний вміст автоматично вибирається на основі локалі застосунку та визначених правил.

## Налаштування перерахувань

Щоб налаштувати перерахування у вашому проєкті Intlayer, потрібно створити модуль контенту, який містить визначення перерахувань. Ось приклад простого перерахування для кількості автомобілів:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Менше ніж -1 автомобіля",
      "-1": "Мінус один автомобіль",
      "0": "Жодних автомобілів",
      "1": "Один автомобіль",
      ">5": "Кілька автомобілів",
      ">19": "Багато автомобілів",
      "fallback": "Значення за замовчуванням", // Необов'язково
    }),
  },
} satisfies Dictionary;

export default carEnumeration;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Менше ніж -1 автомобіля",
      "-1": "Мінус один автомобіль",
      "0": "Жодних автомобілів",
      "1": "Один автомобіль",
      ">5": "Кілька автомобілів",
      ">19": "Багато автомобілів",
      "fallback": "Значення за замовчуванням", // Необов'язково
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Менше ніж мінус одна машина",
      "-1": "Мінус одна машина",
      "0": "Немає машин",
      "1": "Одна машина",
      ">5": "Декілька машин",
      ">19": "Багато машин",
      "fallback": "Значення за замовчуванням", // Необов'язково
    }),
  },
};

module.exports = carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Менше ніж мінус одна машина",
        "-1": "Minus one car",
        "0": "No cars",
        "1": "One car",
        ">5": "Some cars",
        ">19": "Many cars",
        "fallback": "Fallback value" // Optional
      }
    }
  }
}
```

У цьому прикладі `enu` відображає різні умови на конкретний вміст. При використанні в React-компоненті Intlayer може автоматично вибирати відповідний вміст на основі заданої змінної.

> Порядок оголошення має значення в перерахуваннях Intlayer. Перше допустиме оголошення — те, яке буде обрано. Якщо застосовуються кілька умов, упевніться, що вони розташовані в правильному порядку, щоб уникнути непередбачуваної поведінки.

> Якщо не вказано fallback, функція поверне `undefined`, якщо жоден ключ не підходить.

## Використання перерахувань з React Intlayer

Щоб використовувати enumeration в React-компоненті, ви можете скористатися хуком `useIntlayer` з пакета `react-intlayer`. Цей хук повертає правильний контент на основі вказаного ID. Ось приклад використання:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Вивід: Немає авто
        }
      </p>
      <p>
        {
          numberOfCar(6) // Вивід: Декілька авто
        }
      </p>
      <p>
        {
          numberOfCar(20) // Вивід: Багато авто
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Вивід: Значення за замовчуванням
        }
      </p>
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Вивід: Немає автомобілів
        }
      </p>
      <p>
        {
          numberOfCar(6) // Вивід: Кілька автомобілів
        }
      </p>
      <p>
        {
          numberOfCar(20) // Вивід: Багато автомобілів
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Вивід: Резервне значення
        }
      </p>
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Вивід: Немає автомобілів
        }
      </p>
      <p>
        {
          numberOfCar(6) // Вивід: Декілька автомобілів
        }
      </p>
      <p>
        {
          numberOfCar(20) // Вивід: Багато автомобілів
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Вивід: Значення за замовчуванням
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

У цьому прикладі компонент динамічно підлаштовує свій вивід залежно від кількості автомобілів. Правильний вміст вибирається автоматично залежно від заданого діапазону.

## Додаткові ресурси

Для детальнішої інформації про налаштування та використання зверніться до наступних ресурсів:

- [Документація Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
- [Документація Intlayer для React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_create_react_app.md)
- [Документація Intlayer для Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_15.md)

Ці ресурси надають додаткову інформацію про налаштування та використання Intlayer в різних середовищах і з різними фреймворками.
