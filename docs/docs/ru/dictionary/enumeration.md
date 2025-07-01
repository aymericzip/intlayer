---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Перечисление
description: Узнайте, как объявлять и использовать перечисления на вашем многоязычном сайте. Следуйте шагам в этой онлайн-документации, чтобы настроить ваш проект за несколько минут.
keywords:
  - Перечисление
  - Интернационализация
  - Документация
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - ru
  - dictionary
  - enumeration
---

# Перечисление / Множественное число

## Как работает перечисление

В Intlayer перечисление реализуется с помощью функции `enu`, которая сопоставляет определённые ключи с соответствующим содержимым. Эти ключи могут представлять числовые значения, диапазоны или пользовательские идентификаторы. При использовании с React Intlayer или Next Intlayer соответствующее содержимое автоматически выбирается на основе локали приложения и заданных правил.

## Настройка перечисления

Чтобы настроить перечисление в вашем проекте Intlayer, необходимо создать модуль содержимого, включающий определения перечислений. Вот пример простого перечисления для количества автомобилей:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Меньше чем минус один автомобиль",
      "-1": "Минус один автомобиль",
      "0": "Нет автомобилей",
      "1": "Один автомобиль",
      ">5": "Несколько автомобилей",
      ">19": "Много автомобилей",
      "fallback": "Запасное значение", // Необязательно
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
      "<-1": "Меньше чем минус один автомобиль",
      "-1": "Минус один автомобиль",
      "0": "Нет автомобилей",
      "1": "Один автомобиль",
      ">5": "Несколько автомобилей",
      ">19": "Много автомобилей",
      "fallback": "Запасное значение", // Необязательно
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
      "<-1": "Меньше чем минус один автомобиль",
      "-1": "Минус один автомобиль",
      "0": "Нет автомобилей",
      "1": "Один автомобиль",
      ">5": "Несколько автомобилей",
      ">19": "Много автомобилей",
      "fallback": "Запасное значение", // Необязательно
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
        "<-1": "Меньше чем минус один автомобиль",
        "-1": "Минус один автомобиль",
        "0": "Нет автомобилей",
        "1": "Один автомобиль",
        ">5": "Несколько автомобилей",
        ">19": "Много автомобилей",
        "fallback": "Запасное значение" // Необязательно
      }
    }
  }
}
```

В этом примере `enu` сопоставляет различные условия с конкретным содержимым. При использовании в React-компоненте Intlayer может автоматически выбирать соответствующее содержимое на основе переданной переменной.

> Порядок объявления важен в перечислениях Intlayer. Первое подходящее объявление будет выбрано. Если применяются несколько условий, убедитесь, что они расположены в правильном порядке, чтобы избежать непредвиденного поведения.

> Если запасное значение не объявлено, функция вернёт `undefined`, если ни один ключ не совпадает.

## Использование перечислений с React Intlayer

Для использования перечислений в React-компоненте вы можете воспользоваться хуком `useIntlayer` из пакета `react-intlayer`. Этот хук получает правильное содержимое на основе указанного идентификатора. Вот пример того, как его использовать:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Вывод: Нет автомобилей
        }
      </p>
      <p>
        {
          numberOfCar(6) // Вывод: Несколько автомобилей
        }
      </p>
      <p>
        {
          numberOfCar(20) // Вывод: Много автомобилей
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Вывод: Запасное значение
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
          numberOfCar(0) // Вывод: Нет машин
        }
      </p>
      <p>
        {
          numberOfCar(6) // Вывод: Несколько машин
        }
      </p>
      <p>
        {
          numberOfCar(20) // Вывод: Много машин
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Вывод: Значение по умолчанию
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
          numberOfCar(0) // Вывод: Нет машин
        }
      </p>
      <p>
        {
          numberOfCar(6) // Вывод: Несколько машин
        }
      </p>
      <p>
        {
          numberOfCar(20) // Вывод: Много машин
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Вывод: Значение по умолчанию
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

В этом примере компонент динамически изменяет свой вывод в зависимости от количества машин. Правильный контент выбирается автоматически в зависимости от указанного диапазона.

## Дополнительные ресурсы

Для получения более подробной информации о настройке и использовании обратитесь к следующим ресурсам:

- [Документация Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md)
- [Документация React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_create_react_app.md)
- [Документация Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_15.md)

Эти ресурсы предоставляют дополнительную информацию о настройке и использовании Intlayer в различных средах и с разными фреймворками.

## История документа

- 5.5.10 - 2025-06-29: Инициализация истории
