---
createdAt: 2025-02-07
updatedAt: 2026-10-08
priority: 8
title: "Условный контент в Intlayer"
description: "Показывайте разный контент в зависимости от булева условия с узлом cond() в Intlayer: объявляется один раз и вычисляется при рендеринге."
keywords:
  - Условный контент
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
  - condition
author: aymericzip
---

# Условный Контент / Условие в Intlayer

## Как Работает Условие

В Intlayer условный контент достигается с помощью функции `cond`, которая сопоставляет определенные условия (обычно булевы значения) с соответствующим контентом. Этот подход позволяет динамически выбирать контент на основе заданного условия. При интеграции с React Intlayer или Next Intlayer соответствующий контент автоматически выбирается в зависимости от условия, предоставленного во время выполнения.

## Настройка Условного Контента

В Intlayer условный контент достигается с помощью функции `cond`, которая сопоставляет определенные условия (обычно булевы значения) с соответствующим контентом. Этот подход позволяет динамически выбирать контент на основе заданного условия. При интеграции с React Intlayer или Next Intlayer соответствующий контент автоматически выбирается в зависимости от условия, переданного во время выполнения.

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

Чтобы использовать условный контент с `vanilla-intlayer`, извлеките его через `useIntlayer`. Вот пример:

## Использование Условного Контента с React Intlayer

<Tabs group="framework">
  <Tab label="React" value="react">

Чтобы использовать условный контент в компоненте React, импортируйте и примените хук `useIntlayer` из пакета `react-intlayer`. Этот хук извлекает контент по указанному ключу и позволяет передать условие для выбора нужного вывода.

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

Чтобы использовать условный контент в клиентских компонентах Next.js, извлеките его через хук `useIntlayer`. Вот пример:

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

Чтобы использовать условный контент в компонентах Vue, извлеките его через `useIntlayer`. Вот пример:

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

Чтобы использовать условный контент в компонентах Svelte, извлеките его через хранилище `useIntlayer`. Доступ к хранилищу осуществляется через `$`. Вот пример:

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

Чтобы использовать условный контент в компонентах Preact, извлеките его через хук `useIntlayer`. Вот пример:

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

Чтобы использовать условный контент в компонентах SolidJS, извлеките его через хук `useIntlayer`. Вот пример:

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

Чтобы использовать условный контент в компонентах Angular, извлеките его через `useIntlayer`. Вот пример:

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

To utilize conditional content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

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

## Дополнительные Ресурсы

Для получения более подробной информации о настройке и использовании обратитесь к следующим ресурсам:

- [Документация Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md)
- [Документация React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_create_react_app.md)
- [Документация Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_15.md)

Эти ресурсы предоставляют дополнительные сведения о настройке и использовании Intlayer в различных средах и фреймворках.
