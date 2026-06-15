---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Вложенность словаря
description: Узнайте, как использовать вложенность контента в Intlayer для эффективного повторного использования и структурирования многоязычного контента. Следуйте этой документации, чтобы без проблем реализовать вложенность в вашем проекте.
keywords:
  - Nesting
  - Повторное использование контента
  - Документация
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - nesting
author: aymericzip
---

# Вложенность / Ссылки на Подконтент

## Как работает вложенность

<Tabs group="framework">
  <Tab label="React" value="react">

To use nested content in a React component, leverage the `useIntlayer` hook from the `react-intlayer` package. This hook retrieves the correct content based on the specified key. Here's an example of how to use it:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use nested content in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

To use nested content in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { fullNestedContent, partialNestedContent } = useIntlayer(
  "key_of_my_second_dictionary"
);
</script>

<template>
  <div>
    <p>Full Nested Content: {{ JSON.stringify(fullNestedContent) }}</p>
    <p>Partial Nested Value: {{ partialNestedContent }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To use nested content in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("key_of_my_second_dictionary");
</script>

<div>
  <p>Full Nested Content: {JSON.stringify($content.fullNestedContent)}</p>
  <p>Partial Nested Value: {$content.partialNestedContent}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To use nested content in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

To use nested content in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const NestComponent: Component = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To use nested content in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-nest",
  template: `
    <div>
      <p>
        Full Nested Content: {{ JSON.stringify(content().fullNestedContent) }}
      </p>
      <p>Partial Nested Value: {{ content().partialNestedContent }}</p>
    </div>
  `,
})
export class NestComponent {
  content = useIntlayer("key_of_my_second_dictionary");
  JSON = JSON;
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To use nested content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("key_of_my_second_dictionary").onChange(
  (newContent) => {
    document.getElementById("nested")!.textContent =
      newContent.partialNestedContent;
  }
);

// Initial render
document.getElementById("nested")!.textContent = content.partialNestedContent;
```

  </Tab>
</Tabs>
## Настройка вложенности

<Tabs group="framework">
  <Tab label="React" value="react">

To use nested content in a React component, leverage the `useIntlayer` hook from the `react-intlayer` package. This hook retrieves the correct content based on the specified key. Here's an example of how to use it:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

To use nested content in Next.js Client Components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

To use nested content in Vue components, retrieve it via the `useIntlayer` hook. Here's an example:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { fullNestedContent, partialNestedContent } = useIntlayer(
  "key_of_my_second_dictionary"
);
</script>

<template>
  <div>
    <p>Full Nested Content: {{ JSON.stringify(fullNestedContent) }}</p>
    <p>Partial Nested Value: {{ partialNestedContent }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

To use nested content in Svelte components, retrieve it via the `useIntlayer` hook. The store is accessed with `$`. Here's an example:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("key_of_my_second_dictionary");
</script>

<div>
  <p>Full Nested Content: {JSON.stringify($content.fullNestedContent)}</p>
  <p>Partial Nested Value: {$content.partialNestedContent}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

To use nested content in Preact components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

To use nested content in SolidJS components, retrieve it via the `useIntlayer` hook. Here's an example:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const NestComponent: Component = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>Full Nested Content: {JSON.stringify(fullNestedContent)}</p>
      <p>Partial Nested Value: {partialNestedContent}</p>
    </div>
  );
};

export default NestComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

To use nested content in Angular components, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-nest",
  template: `
    <div>
      <p>
        Full Nested Content: {{ JSON.stringify(content().fullNestedContent) }}
      </p>
      <p>Partial Nested Value: {{ content().partialNestedContent }}</p>
    </div>
  `,
})
export class NestComponent {
  content = useIntlayer("key_of_my_second_dictionary");
  JSON = JSON;
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

To use nested content with `vanilla-intlayer`, retrieve it via the `useIntlayer` hook. Here's an example:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("key_of_my_second_dictionary").onChange(
  (newContent) => {
    document.getElementById("nested")!.textContent =
      newContent.partialNestedContent;
  }
);

// Initial render
document.getElementById("nested")!.textContent = content.partialNestedContent;
```

  </Tab>
</Tabs>

## Использование вложенности с React Intlayer

Чтобы использовать вложенный контент в React-компоненте, используйте хук `useIntlayer` из пакета `react-intlayer`. Этот хук извлекает правильный контент на основе указанного ключа. Вот пример его использования:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Полный вложенный контент: {JSON.stringify(fullNestedContent)}
        {/* Вывод: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Частичное вложенное значение: {partialNestedContent}
        {/* Вывод: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

## Дополнительные ресурсы

Для получения более подробной информации о настройке и использовании обратитесь к следующим ресурсам:

- [Документация Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md)
- [Документация React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_create_react_app.md)
- [Документация Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_15.md)

Эти ресурсы предоставляют дополнительные сведения о настройке и использовании Intlayer в различных средах и с различными фреймворками.
