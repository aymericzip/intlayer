# Перечисление / Склонение

## Как работает перечисление

В Intlayer перечисление достигается с помощью функции `enu`, которая сопоставляет определенные ключи с их соответствующим контентом. Эти ключи могут представлять числовые значения, диапазоны или пользовательские идентификаторы. При использовании с React Intlayer или Next Intlayer подходящий контент автоматически выбирается на основе локали приложения и заданных правил.

## Настройка перечисления

Для настройки перечисления в вашем проекте Intlayer необходимо создать модуль контента, включающий определения перечисления. Вот пример простого перечисления для количества автомобилей:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Меньше минус одного автомобиля",
      "-1": "Минус один автомобиль",
      "0": "Нет автомобилей",
      "1": "Один автомобиль",
      ">5": "Несколько автомобилей",
      ">19": "Много автомобилей",
      "fallback": "Резервное значение", // Опционально
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
      "<-1": "Меньше минус одного автомобиля",
      "-1": "Минус один автомобиль",
      "0": "Нет автомобилей",
      "1": "Один автомобиль",
      ">5": "Несколько автомобилей",
      ">19": "Много автомобилей",
      "fallback": "Резервное значение", // Опционально
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
      "<-1": "Меньше минус одного автомобиля",
      "-1": "Минус один автомобиль",
      "0": "Нет автомобилей",
      "1": "Один автомобиль",
      ">5": "Несколько автомобилей",
      ">19": "Много автомобилей",
      "fallback": "Резервное значение", // Опционально
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
        "<-1": "Меньше минус одного автомобиля",
        "-1": "Минус один автомобиль",
        "0": "Нет автомобилей",
        "1": "Один автомобиль",
        ">5": "Несколько автомобилей",
        ">19": "Много автомобилей",
        "fallback": "Резервное значение" // Опционально
      }
    }
  }
}
```

В этом примере функция `enu` маппирует различные условия на конкретный контент. При использовании в React-компоненте Intlayer автоматически выбирает подходящий контент на основе заданной переменной.

> Порядок декларации имеет значение в перечислениях Intlayer. Первая подходящая декларация будет выбранной. Если применимо несколько условий, убедитесь, что они упорядочены правильно, чтобы избежать неожиданных результатов.

> Если резервный вариант не объявлен, функция вернет `undefined`, если ни один из ключей не соответствует.

## Использование перечисления с React Intlayer

Чтобы использовать перечисление в React-компоненте, можно использовать хук `useIntlayer` из пакета `react-intlayer`. Этот хук извлекает правильный контент на основе указанного ID. Вот пример использования:

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
          numberOfCar(0.01) // Вывод: Резервное значение
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
          numberOfCar(0.01) // Вывод: Резервное значение
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
          numberOfCar(0.01) // Вывод: Резервное значение
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

В этом примере компонент динамически изменяет свой вывод в зависимости от количества автомобилей. Соответствующий контент выбирается автоматически, в зависимости от указанного диапазона.

## Дополнительные ресурсы

Для получения более подробной информации о настройке и использовании обратитесь к следующим ресурсам:

- [Документация Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md)
- [Документация React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_create_react_app.md)
- [Документация Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md)

Эти ресурсы предоставляют дополнительные сведения о настройке и использовании Intlayer в различных средах и с различными фреймворками.
