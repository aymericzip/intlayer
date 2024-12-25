# Перечисление / Плюрализация

## Как работает перечисление

В Intlayer перечисление достигается с помощью функции `enu`, которая сопоставляет определенные ключи с их соответствующим содержимым. Эти ключи могут представлять числовые значения, диапазоны или пользовательские идентификаторы. При использовании с React Intlayer или Next Intlayer соответствующее содержимое автоматически выбирается в зависимости от локали приложения и заданных правил.

## Настройка перечисления

Чтобы настроить перечисление в вашем проекте Intlayer, вам нужно создать модуль содержимого, который включает определения перечисления. Вот пример простого перечисления для количества автомобилей:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type DeclarationContent } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Меньше чем минус один автомобиль",
      "-1": "Минус один автомобиль",
      "0": "Нет автомобилей",
      "1": "Один автомобиль",
      ">5": "Некоторое количество автомобилей",
      ">19": "Много автомобилей",
    }),
  },
} satisfies DeclarationContent;

export default carEnumeration;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Меньше чем минус один автомобиль",
      "-1": "Минус один автомобиль",
      "0": "Нет автомобилей",
      "1": "Один автомобиль",
      ">5": "Некоторое количество автомобилей",
      ">19": "Много автомобилей",
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu, type DeclarationContent } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Меньше чем минус один автомобиль",
      "-1": "Минус один автомобиль",
      "0": "Нет автомобилей",
      "1": "Один автомобиль",
      ">5": "Некоторое количество автомобилей",
      ">19": "Много автомобилей",
    }),
  },
};

module.exports = carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "<-1": "Меньше чем минус один автомобиль",
      "-1": "Минус один автомобиль",
      "0": "Нет автомобилей",
      "1": "Один автомобиль",
      ">5": "Некоторое количество автомобилей",
      ">19": "Много автомобилей"
    }
  }
}
```

В этом примере `enu` сопоставляет различные условия с конкретным содержимым. При использовании в компоненте React Intlayer может автоматически выбирать соответствующее содержимое на основе заданной переменной.

## Использование перечисления с React Intlayer

Чтобы использовать перечисление в компоненте React, вы можете воспользоваться хуком `useIntlayer` из пакета `react-intlayer`. Этот хук извлекает правильное содержимое на основе указанного идентификатора. Вот пример того, как это использовать:

```typescript fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* Вывод: Нет автомобилей */}
      <p>{content.numberOfCar(6)}</p> {/* Вывод: Некоторое количество автомобилей */}
      <p>{content.numberOfCar(20)}</p> {/* Вывод: Некоторое количество автомобилей */}
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* Вывод: Нет автомобилей */}
      <p>{content.numberOfCar(6)}</p>{" "}
      {/* Вывод: Некоторое количество автомобилей */}
      <p>{content.numberOfCar(20)}</p>{" "}
      {/* Вывод: Некоторое количество автомобилей */}
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* Вывод: Нет автомобилей */}
      <p>{content.numberOfCar(6)}</p>{" "}
      {/* Вывод: Некоторое количество автомобилей */}
      <p>{content.numberOfCar(20)}</p>{" "}
      {/* Вывод: Некоторое количество автомобилей */}
    </div>
  );
};

module.exports = CarComponent;
```

В этом примере компонент динамически настраивает свой вывод в зависимости от количества автомобилей. Правильное содержимое выбирается автоматически в зависимости от указанного диапазона.

## Важные заметки

- Порядок объявления имеет решающее значение в перечислениях Intlayer. Первое допустимое объявление будет выбрано.
- Если несколько условий применимы, убедитесь, что они расположены в правильном порядке, чтобы избежать непредвиденного поведения.

## Лучшие практики для перечисления

Для того чтобы ваши перечисления работали как ожидалось, следуйте этим лучшим практикам:

- **Согласованное именование**: Используйте четкие и согласованные идентификаторы для модулей перечисления, чтобы избежать путаницы.
- **Документация**: Документируйте ключи перечисления и их ожидаемые выводы для обеспечения поддерживаемости в будущем.
- **Обработка ошибок**: Реализуйте обработку ошибок для управления случаями, когда не найдено допустимое перечисление.
- **Оптимизация производительности**: Для больших приложений уменьшите количество отслеживаемых расширений файлов для улучшения производительности.

## Дополнительные ресурсы

Для получения более подробной информации о настройке и использовании обратитесь к следующим ресурсам:

- [Документация Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md)
- [Документация React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_create_react_app.md)
- [Документация Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md)

Эти ресурсы предоставляют дополнительные сведения о настройке и использовании Intlayer в различных средах и с различными фреймворками.
