---
createdAt: 2025-02-07
updatedAt: 2026-10-08
priority: 8
title: "Умовний контент в Intlayer"
description: "Показуйте різний контент залежно від булевої умови за допомогою вузла cond() в Intlayer: оголошується один раз і обчислюється під час рендерингу."
keywords:
  - Умовний вміст
  - Динамічне відображення
  - Документація
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - condition
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Ініціалізація історії"
author: aymericzip
---

# Умовний вміст / Умова в Intlayer

## Як працює умова

В Intlayer умовний контент реалізується за допомогою функції `cond`, яка відображає конкретні умови (зазвичай булеві значення) на відповідний контент. Такий підхід дозволяє динамічно вибирати контент залежно від заданої умови. Під час інтеграції з React Intlayer або Next Intlayer відповідний контент автоматично обирається відповідно до умови, переданої під час виконання.

## Налаштування умовного контенту

Щоб налаштувати умовний контент у вашому проекті Intlayer, створіть модуль контенту, який містить ваші умовні визначення. Нижче наведено приклади в різних форматах.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "мій контент, коли це true",
      false: "мій контент, коли це false",
      fallback: "мій контент, коли перевірка умови не спрацювала", // Необов'язково
    }),
  },
} satisfies Dictionary;

export default myConditionalContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myCondition": {
      "nodeType": "condition",
      "condition": {
        "true": "мій контент, коли це true",
        "false": "мій контент, коли це false",
        "fallback": "мій контент, коли умова не виконується", // Необов'язково
      },
    },
  },
}
```

> Якщо не вказано fallback, останній заданий ключ буде використано як fallback, якщо умова не проходить.

## Використання умовного контенту в React Intlayer

<Tabs group="framework">
  <Tab label="React" value="react">

Щоб використовувати умовний контент у компоненті React, імпортуйте та застосовуйте хук `useIntlayer` із пакета `react-intlayer`. Цей хук отримує контент за вказаним ключем і дозволяє передати умову для вибору відповідного результату.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Output: my content when it's true */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Output: my content when it's false */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Output: my content when the condition fails */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Output: my content when the condition fails */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Щоб використовувати умовний контент у клієнтських компонентах Next.js, отримайте його за допомогою хука `useIntlayer`. Ось приклад:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>{myCondition(true)}</p>
      <p>{myCondition(false)}</p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

Щоб використовувати умовний контент у компонентах Vue, отримайте його за допомогою хука `useIntlayer`. Ось приклад:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { myCondition } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ myCondition(true) }}</p>
    <p>{{ myCondition(false) }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Щоб використовувати умовний контент у компонентах Svelte, отримайте його за допомогою хука `useIntlayer`. Доступ до сховища здійснюється через `$`. Ось приклад:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.myCondition(true)}</p>
  <p>{$content.myCondition(false)}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Щоб використовувати умовний контент у компонентах Preact, отримайте його за допомогою хука `useIntlayer`. Ось приклад:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>{myCondition(true)}</p>
      <p>{myCondition(false)}</p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

Щоб використовувати умовний контент у компонентах SolidJS, отримайте його за допомогою хука `useIntlayer`. Ось приклад:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const ConditionalComponent: Component = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>{myCondition(true)}</p>
      <p>{myCondition(false)}</p>
    </div>
  );
};

export default ConditionalComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

Щоб використовувати умовний контент у компонентах Angular, отримайте його за допомогою хука `useIntlayer`. Ось приклад:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-conditional",
  template: `
    <div>
      <p>{{ content().myCondition(true) }}</p>
      <p>{{ content().myCondition(false) }}</p>
    </div>
  `,
})
export class ConditionalComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

Щоб використовувати умовний контент із `vanilla-intlayer`, отримайте його за допомогою хука `useIntlayer`. Ось приклад:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("true-content")!.textContent =
    newContent.myCondition(true);
  document.getElementById("false-content")!.textContent =
    newContent.myCondition(false);
});

// Initial render
document.getElementById("true-content")!.textContent =
  content.myCondition(true);
document.getElementById("false-content")!.textContent =
  content.myCondition(false);
```

  </Tab>
</Tabs>

## Додаткові ресурси

Для детальнішої інформації щодо конфігурації та використання зверніться до наведених ресурсів:

- [Документація Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md)
- [Документація React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_create_react_app.md)
- [Документація Intlayer для Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_15.md)

Ці ресурси надають додаткову інформацію щодо налаштування та використання Intlayer у різних середовищах та фреймворках.
