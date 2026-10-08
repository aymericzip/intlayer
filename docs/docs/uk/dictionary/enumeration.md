---
createdAt: 2025-08-23
updatedAt: 2026-10-08
priority: 8
title: "Перелічення: повідомлення залежно від кількості"
description: "Використовуйте перелічення Intlayer, щоб показувати різний контент залежно від числа чи діапазону, з вузлом enu() та умовами на кшталт '<-1' чи '>5'."
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
    changes: "Ініціалізація історії"
author: aymericzip
---

# Перелічення / Утворення множини

## Як працює перелічення

В Intlayer перелічення реалізується за допомогою функції `enu`, яка зіставляє конкретні ключі з відповідним вмістом. Ці ключі можуть представляти числові значення, діапазони або власні ідентифікатори. При використанні з React Intlayer або Next Intlayer відповідний вміст автоматично вибирається на основі локалі застосунку та визначених правил.

## Налаштування перерахувань

Щоб налаштувати перерахування у вашому проєкті Intlayer, потрібно створити модуль контенту, який містить визначення перерахувань. Ось приклад простого перерахування для кількості автомобілів:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> Порядок оголошення має значення в перерахуваннях Intlayer. Перше допустиме оголошення, те, яке буде обрано. Якщо застосовуються кілька умов, упевніться, що вони розташовані в правильному порядку, щоб уникнути непередбачуваної поведінки.

> Якщо не вказано fallback, функція поверне `undefined`, якщо жоден ключ не підходить.

## Використання перерахувань з React Intlayer

<Tabs group="framework">
  <Tab label="React" value="react">

Щоб використовувати перелічення у компоненті React, ви можете скористатися хуком `useIntlayer` із пакета `react-intlayer`. Цей хук отримує потрібний контент на основі вказаного ключа. Ось приклад використання:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Output: No cars
        }
      </p>
      <p>
        {
          numberOfCar(6) // Output: Some cars
        }
      </p>
      <p>
        {
          numberOfCar(20) // Output: Many cars
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Output: Fallback value
        }
      </p>
    </div>
  );
};
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Щоб використовувати перелічення у клієнтських компонентах Next.js, отримайте його за допомогою хука `useIntlayer`. Ось приклад:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>{numberOfCar(6)}</p>
    </div>
  );
};

export default CarComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

Щоб використовувати перелічення у компонентах Vue, отримайте його за допомогою хука `useIntlayer`. Ось приклад:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { numberOfCar } = useIntlayer("car_count");
</script>

<template>
  <div>
    <p>{{ numberOfCar(6) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Щоб використовувати перелічення у компонентах Svelte, отримайте його за допомогою хука `useIntlayer`. Доступ до сховища здійснюється через `$`. Ось приклад:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("car_count");
</script>

<div>
  <p>{$content.numberOfCar(6)}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Щоб використовувати перелічення у компонентах Preact, отримайте його за допомогою хука `useIntlayer`. Ось приклад:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>{numberOfCar(6)}</p>
    </div>
  );
};

export default CarComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

Щоб використовувати перелічення у компонентах SolidJS, отримайте його за допомогою хука `useIntlayer`. Ось приклад:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const CarComponent: Component = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>{numberOfCar(6)}</p>
    </div>
  );
};

export default CarComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

Щоб використовувати перелічення у компонентах Angular, отримайте його за допомогою хука `useIntlayer`. Ось приклад:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-car",
  template: `
    <div>
      <p>{{ content().numberOfCar(6) }}</p>
    </div>
  `,
})
export class CarComponent {
  content = useIntlayer("car_count");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

Щоб використовувати перелічення з `vanilla-intlayer`, отримайте його за допомогою хука `useIntlayer`. Ось приклад:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("car_count").onChange((newContent) => {
  document.getElementById("cars")!.textContent = newContent.numberOfCar(6);
});

// Initial render
document.getElementById("cars")!.textContent = content.numberOfCar(6);
```

  </Tab>
</Tabs>

## Додаткові ресурси

Для детальнішої інформації про налаштування та використання зверніться до наступних ресурсів:

- [Документація Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
- [Документація Intlayer для React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_create_react_app.md)
- [Документація Intlayer для Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_15.md)

Ці ресурси надають додаткову інформацію про налаштування та використання Intlayer в різних середовищах і з різними фреймворками.

### Використання порядкового перелічення

<Tabs group="framework">
  <Tab label="React" value="react">

Щоб використовувати це в компоненті React, викличте перелічення з останньою цифрою числа для отримання правильного суфікса, а потім передайте повне число як значення вставки:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const RankingComponent: FC<{ count: number }> = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");

  // Get the last digit to determine the correct suffix
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>
        {
          ordinal(lastDigit)({ count }) // e.g., "5th place" for count=5
        }
      </p>
    </div>
  );
};
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Щоб використовувати це в клієнтських компонентах Next.js, викличте перелічення з останньою цифрою числа для отримання правильного суфікса, а потім передайте повне число як значення вставки:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const RankingComponent: FC<{ count: number }> = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>{ordinal(lastDigit)({ count })}</p>
    </div>
  );
};

export default RankingComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

Щоб використовувати це в компонентах Vue, викличте перелічення з останньою цифрою числа для отримання правильного суфікса, а потім передайте повне число як значення вставки:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

defineProps<{ count: number }>();

const { ordinal } = useIntlayer("ranking_component");
</script>

<template>
  <div>
    <p>{{ ordinal(Math.abs(count) % 10)({ count }) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Щоб використовувати це в компонентах Svelte, викличте перелічення з останньою цифрою числа для отримання правильного суфікса, а потім передайте повне число як значення вставки:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

export let count: number;

const content = useIntlayer("ranking_component");
$: lastDigit = Math.abs(count) % 10;
</script>

<div>
  <p>{$content.ordinal(lastDigit)({ count })}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Щоб використовувати це в компонентах Preact, викличте перелічення з останньою цифрою числа для отримання правильного суфікса, а потім передайте повне число як значення вставки:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const RankingComponent: FC<{ count: number }> = ({ count }) => {
  const { ordinal } = useIntlayer("ranking_component");
  const lastDigit = Math.abs(count) % 10;

  return (
    <div>
      <p>{ordinal(lastDigit)({ count })}</p>
    </div>
  );
};

export default RankingComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

Щоб використовувати це в компонентах SolidJS, викличте перелічення з останньою цифрою числа для отримання правильного суфікса, а потім передайте повне число як значення вставки:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const RankingComponent: Component<{ count: number }> = (props) => {
  const { ordinal } = useIntlayer("ranking_component");

  return (
    <div>
      <p>{ordinal(Math.abs(props.count) % 10)({ count: props.count })}</p>
    </div>
  );
};

export default RankingComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

Щоб використовувати це в компонентах Angular, викличте перелічення з останньою цифрою числа для отримання правильного суфікса, а потім передайте повне число як значення вставки:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component, Input } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-ranking",
  template: `
    <div>
      <p>{{ content().ordinal(lastDigit())({ count }) }}</p>
    </div>
  `,
})
export class RankingComponent {
  @Input() count!: number;

  content = useIntlayer("ranking_component");

  lastDigit() {
    return Math.abs(this.count) % 10;
  }
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

Щоб використовувати це з `vanilla-intlayer`, викличте перелічення з останньою цифрою числа для отримання правильного суфікса, а потім передайте повне число як значення вставки:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("ranking_component");
const lastDigit = Math.abs(5) % 10;

document.getElementById("ranking")!.textContent = content.ordinal(lastDigit)({
  count: 5,
});
```

  </Tab>
</Tabs>

## Additional Resources

Для отримання детальнішої інформації про налаштування та використання зверніться до наступних ресурсів:

- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
- [React Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_create_react_app.md)
- [Next Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_15.md)

Ці ресурси надають глибше розуміння налаштування та використання Intlayer у різних середовищах та фреймворках.
